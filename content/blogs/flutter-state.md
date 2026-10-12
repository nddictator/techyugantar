---
title: "Flutter State Management at Scale: Riverpod vs Bloc in 2025"
excerpt: "After shipping three production Flutter apps with 50k+ MAU each, we made the switch. Here is our honest, code-level comparison — architecture diagrams, boilerplate cost, and testability scores included."
author: "Tech Yugantar — Mobile Team"
date: "2025-10-14"
tags: ["flutter"]
image: "/images/blog/blog-flutter-state.jpg"
---

Bloc and Riverpod solve the same problem — predictable, testable state that lives outside the widget tree — from different angles. Neither is "wrong", but they push a codebase toward different shapes as it grows, and that difference matters far more at fifty screens than at five.

This is our honest comparison after running both in production, and the reasoning behind the defaults we use today.

## Get the layers right first

The state library is the least important architectural decision in a Flutter app. What matters more is that the layers are separated regardless of which one you choose:

- **Data layer** — API clients, local database, DTOs. No Flutter imports.
- **Repository layer** — combines data sources and exposes domain objects. This is what the state layer talks to, and what tests fake.
- **State layer** — Blocs, Cubits or Riverpod notifiers. Business rules and UI state.
- **Presentation** — widgets that render state and forward user intent. As little logic as possible.

Get this right and switching state libraries later is a contained, feature-by-feature job. Get it wrong — API calls inside widgets, business rules in `build` methods — and no library will save you.

## Bloc: explicit, ceremonial, easy to audit

Bloc's event-in, state-out model makes every state transition a named, traceable thing. For a team where several engineers touch the same feature, that explicitness pays for itself: you can read a Bloc file and know every possible state and every event that can trigger a transition, without running the app.

```dart
sealed class CheckoutState {}
final class CheckoutInitial extends CheckoutState {}
final class CheckoutLoading extends CheckoutState {}
final class CheckoutSuccess extends CheckoutState {
  CheckoutSuccess(this.order);
  final Order order;
}
final class CheckoutFailure extends CheckoutState {
  CheckoutFailure(this.message);
  final String message;
}

class CheckoutBloc extends Bloc<CheckoutEvent, CheckoutState> {
  CheckoutBloc(this._repo) : super(CheckoutInitial()) {
    on<SubmitOrder>(_onSubmitOrder, transformer: droppable());
  }

  final OrderRepository _repo;

  Future<void> _onSubmitOrder(SubmitOrder event, Emitter<CheckoutState> emit) async {
    emit(CheckoutLoading());
    try {
      final order = await _repo.submit(event.cart);
      emit(CheckoutSuccess(order));
    } on OrderException catch (e) {
      emit(CheckoutFailure(e.userMessage));
    }
  }
}
```

With Dart's sealed classes, a `switch` over `CheckoutState` in the UI is checked for exhaustiveness by the compiler — add a new state and every screen that forgets to handle it fails to compile.

The cost is boilerplate. A new feature typically means an event hierarchy, a state hierarchy, and the Bloc itself before any real logic. For simpler screens, `Cubit` — Bloc without events, just methods that emit states — removes most of that ceremony while keeping the same tooling.

### Event transformers are Bloc's hidden superpower

The `transformer:` argument above is easy to overlook and very useful. The `bloc_concurrency` package provides ready-made strategies for how events are processed:

- `droppable()` — ignore new events while one is in progress. A double-tapped "Pay" button submits once.
- `restartable()` — cancel the in-flight handler when a new event arrives. A search box only shows results for the latest query.
- `sequential()` — process events one at a time, in order.

These are concurrency bugs that every app has, solved declaratively in one line.

## Riverpod: less ceremony, more compiler help

Riverpod drops the event and state class ceremony in favour of providers that compute and expose state directly, with compile-time safety that `Provider` (its predecessor) never had — no more runtime "provider not found" crashes. With `riverpod_generator`, the same checkout flow looks like this:

```dart
@riverpod
class Checkout extends _$Checkout {
  @override
  FutureOr<Order?> build() => null;

  Future<void> submit(Cart cart) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => ref.read(orderRepositoryProvider).submit(cart),
    );
  }
}
```

`AsyncValue` gives you loading, data and error states for free, and the UI handles them with `when` or a pattern match. For screens that are mostly "load something, show it, let the user change it", this is dramatically less code.

### Derived state is where Riverpod pulls ahead

The real difference shows up with derived state. A product list filtered by a search query, a selected category and a price range is just a provider that watches three others:

```dart
@riverpod
List<Product> visibleProducts(Ref ref) {
  final products = ref.watch(productsProvider).valueOrNull ?? const [];
  final query = ref.watch(searchQueryProvider).toLowerCase();
  final category = ref.watch(selectedCategoryProvider);
  return products
      .where((p) => category == null || p.category == category)
      .where((p) => p.name.toLowerCase().contains(query))
      .toList();
}
```

When any input changes, only this provider and the widgets watching it rebuild. The Bloc equivalent usually means one Bloc subscribing to the streams of three others and managing those subscriptions by hand. Riverpod's `family` modifier (a provider per product ID, for example) and `autoDispose` (state cleaned up when no screen uses it) round out the picture.

## Where each one wins

We now default to **Riverpod** for new projects. The boilerplate savings compound as the app grows, derived state stays readable, and `riverpod_generator` removes most of what's left.

We still reach for **Bloc** on apps with complex, multi-step business workflows — insurance claims, multi-stage checkout, KYC onboarding — where the explicit event log is genuinely valuable. Being able to replay "here is the exact sequence of events that led to this state" from a `BlocObserver` log has saved us real support time when a customer reports something we can't reproduce.

A practical decision checklist:

1. **Lots of derived or shared state across screens?** Riverpod.
2. **Long, auditable workflows where every transition must be named?** Bloc.
3. **Team already fluent in one of them?** That outweighs most other factors.
4. **Small app, simple screens?** Either. Pick one and stay consistent.

## Testability, honestly

Both are equally testable once set up correctly — this is less of a differentiator than blog posts often claim.

Bloc's `bloc_test` package makes state sequences easy to assert:

```dart
blocTest<CheckoutBloc, CheckoutState>(
  'emits loading then success',
  build: () => CheckoutBloc(FakeOrderRepository()),
  act: (bloc) => bloc.add(SubmitOrder(testCart)),
  expect: () => [isA<CheckoutLoading>(), isA<CheckoutSuccess>()],
);
```

Riverpod tests use a `ProviderContainer` with overrides — no widgets needed:

```dart
test('submit stores the created order', () async {
  final container = ProviderContainer(overrides: [
    orderRepositoryProvider.overrideWithValue(FakeOrderRepository()),
  ]);
  addTearDown(container.dispose);

  await container.read(checkoutProvider.notifier).submit(testCart);
  expect(container.read(checkoutProvider).value, isNotNull);
});
```

The real testability gap in Flutter apps is almost always in the widget layer — screens nobody has written golden or widget tests for — not the state layer, whichever library you pick.

## How we migrated without a rewrite

The switch cost us roughly two sprints per app, done incrementally on live production apps:

1. **Add Riverpod alongside Bloc.** Wrap the app in a `ProviderScope`; existing `BlocProvider`s keep working.
2. **Expose repositories as providers first.** Both old Blocs and new notifiers can now read the same instances.
3. **Migrate leaf features**, starting with simple read-only screens, then forms, leaving the most complex workflows for last — or deciding to keep them on Bloc.
4. **Delete Bloc dependencies** only once no feature uses them.

Running both libraries side by side during the transition is the only way we'd recommend doing it on an app with real users. A big-bang state-management rewrite is a big-bang regression waiting to happen.
