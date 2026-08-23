---
title: "Concurrent React: useTransition, useDeferredValue and When to Reach for Each"
excerpt: "Concurrent features are not just for huge lists. We show how we used useTransition to eliminate input jank on a complex filtering UI and useDeferredValue to keep charts responsive during re-renders."
author: "Tech Yugantar — Frontend Team"
date: "2025-05-22"
tags: ["react"]
image: "/images/blog/blog-react-concurrent.jpg"
---

Both hooks exist to solve the same underlying problem — an expensive re-render blocking the browser from responding to input — but they solve it from opposite ends, and picking the wrong one produces code that works but doesn't actually fix the jank.

## useTransition: you control what's urgent

`useTransition` marks a *state update* as non-urgent, telling React it's allowed to interrupt that update's render to handle something more urgent first — like the next keystroke. We used this on a filtering UI where selecting a filter chip re-ran an expensive filter-and-sort over several thousand rows. Wrapping the filter-state update in `startTransition` meant the chip's own visual selection state updated instantly, while the expensive list re-render happened in the background and could be preempted by the next click.

```tsx
const [isPending, startTransition] = useTransition();

function selectFilter(filter: Filter) {
  startTransition(() => {
    setActiveFilter(filter); // triggers the expensive re-render, non-blocking
  });
}
```

The `isPending` flag is what makes this feel intentional rather than laggy — we show a subtle opacity dip on the list while it's pending, so the delay reads as "updating" instead of "broken."

## useDeferredValue: you don't control the source

`useDeferredValue` is for when the expensive re-render is triggered by a *value* you don't own the update for — most commonly, input from a controlled text field where you can't (and shouldn't) wrap the field's own `onChange` in a transition, because that would make typing itself feel laggy. Instead, you defer a *derived* value: the input updates instantly, and a deferred copy of it — lagging slightly behind — drives the expensive computation.

```tsx
const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);

// `query` drives the input's own value — always instant
// `deferredQuery` drives the expensive chart re-render — can lag
const results = useMemo(() => expensiveSearch(deferredQuery), [deferredQuery]);
```

We used exactly this pattern on a dashboard where typing in a search box re-rendered a chart with a few hundred data points per keystroke — deferring the value that drives the chart kept typing perfectly smooth while the chart visibly, briefly lagged behind, which is a much better trade-off than both being equally janky.

## The distinction that matters

`useTransition` is for state updates *you* trigger and can choose to mark low-priority. `useDeferredValue` is for values that arrive from somewhere you don't control the update path for. Reaching for `useDeferredValue` on your own `startTransition`-able state update works but is strictly worse — you lose the `isPending` flag and the ability to explicitly batch multiple state updates into one transition.

Neither hook makes the underlying computation faster — they only control *when* React is allowed to interrupt it, which is often the actual fix, since most perceived "slowness" is really about responsiveness to input, not raw computation time.
