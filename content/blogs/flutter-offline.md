---
title: "Offline-First Flutter Apps: SQLite, Drift & Smart Sync Queues"
excerpt: "Building for Tier-2 India means your app must work on 2G. We detail our offline-first architecture using Drift ORM, conflict-resolution strategies, and background sync with WorkManager."
author: "Tech Yugantar — Mobile Team"
date: "2025-08-21"
tags: ["flutter"]
image: "/images/blog/blog-flutter-offline.jpg"
---

"Offline support" usually means a cached list view and a sad-cloud icon. Genuinely offline-first means the app is fully usable with zero connectivity, and syncing is something that happens *to* the local state, not something the UI waits on.

## Local database as the source of truth

We treat SQLite (via Drift, which gives compile-time-checked queries over `sqlite3`) as the primary data source the UI reads from — never the network directly. Every screen queries Drift; the network layer's only job is to write into Drift when data arrives, and read a queue of pending writes to push out when connectivity returns. This inversion is the actual architectural shift: the network becomes an implementation detail of sync, not something the UI is coupled to.

## The sync queue

Every local write — creating an order, updating a status — gets appended to a `pending_operations` table with a type, payload, and timestamp, in the same local transaction as the write itself. A background worker (WorkManager on Android, `BGTaskScheduler` via the `workmanager` package on iOS) drains this queue whenever connectivity is available, retrying with exponential backoff on failure and marking operations as synced only after a server acknowledgment.

```dart
@DataClassName('PendingOperation')
class PendingOperations extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get type => text()();
  TextColumn get payloadJson => text()();
  DateTimeColumn get createdAt => dateTime()();
  BoolColumn get synced => boolean().withDefault(const Constant(false))();
}
```

## Conflict resolution, chosen per data type

There's no universal answer to "what happens when the same record changed both locally and on the server." We resolve per data type: append-only records (an order placed offline) never conflict, they just sync once connectivity returns. Mutable records (a customer's profile) use last-write-wins with a server timestamp, which is wrong in theory and fine in practice for our use cases — the alternative, proper operational-transform conflict resolution, is not worth the complexity for data that's rarely edited concurrently by the same user on two devices.

## Designing for 2G, not just "offline"

The harder constraint in Tier-2 India isn't zero connectivity, it's *unreliable, slow* connectivity — a request that times out after 30 seconds is worse than one that fails immediately, because it blocks the sync queue's backoff logic from moving on. We set aggressive timeouts (5–8 seconds) and treat a timeout identically to a connection failure, letting the retry queue handle it rather than making the user wait on a spinner that might resolve eventually.

The payoff: field staff using these apps in areas with patchy signal don't experience "offline mode" as a degraded state — they experience a normal app that happens to sync quietly whenever it can.
