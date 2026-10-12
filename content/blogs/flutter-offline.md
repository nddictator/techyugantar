---
title: "Offline-First Flutter Apps: SQLite, Drift & Smart Sync Queues"
excerpt: "Building for Tier-2 India means your app must work on 2G. We detail our offline-first architecture using Drift ORM, conflict-resolution strategies, and background sync with WorkManager."
author: "Tech Yugantar — Mobile Team"
date: "2025-08-21"
tags: ["flutter"]
image: "/images/blog/blog-flutter-offline.jpg"
---

"Offline support" usually means a cached list view and a sad-cloud icon. Genuinely offline-first means the app is fully usable with zero connectivity, and syncing is something that happens *to* the local state — not something the UI waits on.

We build a lot of apps for field teams: sales reps visiting shops, health workers in villages, delivery staff moving between towers with patchy coverage. For them, connectivity isn't on or off; it's unreliable, slow, and unpredictable. This is the architecture we've settled on.

## Local database as the source of truth

We treat SQLite — through Drift, which gives compile-time-checked queries and reactive streams over `sqlite3` — as the primary data source the UI reads from. Never the network directly.

Every screen queries Drift. The network layer has exactly two jobs: write incoming server data into Drift, and push a queue of pending local writes out when connectivity returns. This inversion is the real architectural shift. The network becomes an implementation detail of sync instead of something every screen is coupled to, and the whole "loading / error / retry" dance disappears from most of the UI.

Drift's `watch()` queries make this pleasant: the UI subscribes to a stream, and whenever sync writes new rows, every screen showing that data updates on its own.

```dart
Stream<List<Order>> watchTodaysOrders() {
  final start = DateTime.now().copyWith(hour: 0, minute: 0, second: 0);
  return (select(orders)
        ..where((o) => o.createdAt.isBiggerOrEqualValue(start))
        ..orderBy([(o) => OrderingTerm.desc(o.createdAt)]))
      .watch();
}
```

## IDs are generated on the device

If a record is created offline, it needs an identity before the server has ever seen it. Waiting for an auto-increment ID from the server makes offline creation impossible, and inventing a temporary ID that gets replaced later creates painful remapping bugs in every table that references it.

So every syncable record gets a UUID generated on the device at creation time. The server accepts client-provided IDs for these tables. A record has the same ID from the moment it's created to the moment it's archived, on every device and on the server.

## The sync queue

Every local write — creating an order, updating a status — appends a row to a `pending_operations` table **in the same local transaction** as the write itself. Either both happen or neither does, so the queue can never drift out of step with the data.

```dart
@DataClassName('PendingOperation')
class PendingOperations extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get opId => text()();            // UUID, sent as idempotency key
  TextColumn get type => text()();            // e.g. 'order.create'
  TextColumn get payloadJson => text()();
  DateTimeColumn get createdAt => dateTime()();
  IntColumn get attempts => integer().withDefault(const Constant(0))();
  BoolColumn get synced => boolean().withDefault(const Constant(false))();
}
```

```dart
Future<void> placeOrder(OrderDraft draft) async {
  final orderId = const Uuid().v4();
  await transaction(() async {
    await into(orders).insert(draft.toCompanion(id: orderId));
    await into(pendingOperations).insert(PendingOperationsCompanion.insert(
      opId: const Uuid().v4(),
      type: 'order.create',
      payloadJson: jsonEncode(draft.toJson(id: orderId)),
      createdAt: DateTime.now(),
    ));
  });
}
```

A sync worker drains the queue **in order** whenever connectivity is available. Order matters: "create customer" has to reach the server before "create order for that customer". Each operation is sent with its `opId` as an idempotency key, so if the server processed a request but the response was lost on a flaky connection, the retry is recognised and ignored instead of creating a duplicate. An operation is marked synced only after the server acknowledges it.

Operations that fail with a validation error (the server rejects them outright) are moved aside and surfaced to the user rather than retried forever and blocking everything behind them.

## Pulling changes from the server

Pushing is half of sync. The other half is pulling what changed on the server since the last sync. We use a cursor-based delta sync: every syncable table on the server has an `updated_at` column, and the client asks for everything changed after its last cursor.

- Responses are **paginated**, so a device that's been offline for a week doesn't try to download everything in one request on a 2G connection.
- **Deletes are tombstones**, not removed rows. A deleted record comes back with `deleted_at` set, so the client knows to remove its local copy. A hard delete on the server is invisible to a device that wasn't online at the time.
- The new cursor is saved **only after** the page has been written to Drift, in the same transaction. A crash mid-sync means re-fetching one page, never skipping one.

## Conflict resolution, chosen per data type

There's no universal answer to "what happens when the same record changed both locally and on the server?" We decide per data type:

- **Append-only records** — an order placed, a visit logged, a payment collected — never conflict. They just sync once connectivity returns. We design data models to be append-only wherever we can for exactly this reason.
- **Mutable records** with a single owner, like a user's own profile, use last-write-wins based on a server timestamp. Wrong in theory, fine in practice when the same user rarely edits the same field on two devices at once.
- **Shared, high-stakes fields** — stock counts, account balances — are never edited directly offline. The app records an *intent* ("sold 3 units") and the server applies it, so two offline devices selling stock produce the right total instead of one overwriting the other.

Proper operational-transform or CRDT-based merging exists, and it's the right answer for collaborative editors. For field apps, it's almost never worth the complexity.

## Know what "online" really means

The `connectivity_plus` package tells you whether the device has a network interface — Wi-Fi or mobile data — not whether the internet is reachable. A phone connected to a captive-portal Wi-Fi, or showing full bars with no data flowing, reports "connected".

We use connectivity changes only as a **hint** to attempt a sync. The real test is whether a lightweight request to our own API succeeds. If it doesn't, the device is offline as far as the sync worker is concerned, whatever the status bar says.

## Designing for 2G, not just "offline"

The harder constraint in Tier-2 India isn't zero connectivity — it's slow, unreliable connectivity. A request that times out after 30 seconds is worse than one that fails immediately, because it stalls the queue and the backoff logic can't move on.

- **Aggressive timeouts** of 5–8 seconds, with a timeout treated exactly like a connection failure.
- **Exponential backoff with a cap**, reset whenever connectivity changes.
- **Batching.** Ten queued operations go in one request, not ten round trips with their own TLS overhead.
- **Small payloads.** Gzip on responses, no unused fields, and images uploaded separately from the records that reference them — so a slow photo upload never blocks a tiny status update.

## Background sync, honestly

WorkManager on Android is reliable for periodic and constraint-based work ("run when connected"), within the limits of battery optimisation. iOS is stricter: background tasks scheduled through `BGTaskScheduler` (via the `workmanager` package) run when the system decides, not when you ask. You cannot depend on them.

So background sync is a bonus, not the plan. We always sync when the app comes to the foreground, after every local write if online, and on connectivity changes. Background tasks just shorten the gap in between.

## Show sync state without making it a problem

Users need to trust that their work is saved. Each record that hasn't synced yet shows a small "pending" indicator, and a single unobtrusive status in the app bar shows "All changes synced" or "3 changes waiting for network". No modal dialogs, no blocking spinners. Field staff learn quickly that pending is fine, and they stop worrying about signal.

## Test it like the real world

We test sync against the conditions it was built for: Android emulator network throttling, airplane mode toggled mid-request, the app killed during a sync, and two devices editing the same record. A sync engine that only works on office Wi-Fi isn't offline-first.

The payoff: field staff using these apps in areas with patchy signal don't experience "offline mode" as a degraded state. They experience a normal app that quietly syncs whenever it can.
