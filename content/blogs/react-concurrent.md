---
title: "Concurrent React: useTransition, useDeferredValue and When to Reach for Each"
excerpt: "Concurrent features are not just for huge lists. We show how we used useTransition to eliminate input jank on a complex filtering UI and useDeferredValue to keep charts responsive during re-renders."
author: "Tech Yugantar — Frontend Team"
date: "2025-05-22"
tags: ["react"]
image: "/images/blog/blog-react-concurrent.jpg"
---

Both hooks exist to solve the same underlying problem — an expensive re-render blocking the browser from responding to input — but they approach it from opposite ends. Picking the wrong one produces code that runs fine and doesn't actually fix the jank.

This post covers the mental model, the two patterns we use most, the pitfall that makes `useDeferredValue` silently do nothing, and what to reach for when neither hook is the answer.

## The mental model: urgent vs. non-urgent renders

Before concurrent rendering, every React update was urgent. Once a render started, it ran to completion, and if it took 200 milliseconds, the browser couldn't paint or respond to a keystroke for those 200 milliseconds. Users feel that as a frozen input or a delayed click.

Concurrent React lets you label some updates as **non-urgent**. React renders them in the background, in small chunks, yielding to the browser between chunks. If something urgent arrives mid-render — a keystroke, a click — React pauses or throws away the background work, handles the urgent update first, and comes back to the rest later.

Neither hook makes the work itself faster. They change *when* React is allowed to interrupt it. That's often exactly the fix, because most perceived slowness is really about responsiveness to input, not raw computation time — and it's what the Core Web Vitals metric INP (Interaction to Next Paint) measures.

## useTransition: you control what's urgent

`useTransition` marks a **state update** as non-urgent. We used it on a filtering UI where selecting a filter chip re-ran an expensive filter-and-sort over several thousand rows. Wrapping the filter update in `startTransition` let the chip's own selected state update instantly, while the expensive list render happened in the background and could be pre-empted by the next click.

```tsx
const [activeChip, setActiveChip] = useState<Filter>("all");
const [activeFilter, setActiveFilter] = useState<Filter>("all");
const [isPending, startTransition] = useTransition();

function selectFilter(filter: Filter) {
  setActiveChip(filter);            // urgent: the chip lights up immediately
  startTransition(() => {
    setActiveFilter(filter);        // non-urgent: drives the expensive list
  });
}

return (
  <>
    <FilterChips active={activeChip} onSelect={selectFilter} />
    <div style={{ opacity: isPending ? 0.6 : 1, transition: "opacity 150ms" }}>
      <ProductList filter={activeFilter} />
    </div>
  </>
);
```

Notice the two pieces of state. The chip reads the urgent one; the list reads the transition one. If both read the same state, the chip would wait for the list.

The `isPending` flag is what makes this feel intentional rather than laggy. A subtle opacity dip on the list while it's pending reads as "updating", not "broken".

### Transitions and Suspense

Transitions also change how Suspense behaves. Normally, if an update causes a component to suspend (waiting for data), React swaps in the nearest `fallback` — a spinner replacing content that was already on screen. Inside a transition, React keeps showing the old content until the new content is ready, and `isPending` tells you it's working. That's the difference between a tab switch that flashes a skeleton and one that feels instant. Framework routers, including Next.js's App Router, run navigations as transitions for this reason.

### Async transitions in React 19

React 19 lets you pass an async function to `startTransition`, and `isPending` stays true for the whole async operation — useful for "save" buttons and form submissions:

```tsx
function SaveButton({ draft }: { draft: Draft }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await saveDraft(draft);
          startTransition(() => router.refresh());
        })
      }
    >
      {isPending ? "Saving…" : "Save"}
    </button>
  );
}
```

One gotcha: state updates that happen *after* an `await` aren't automatically part of the transition, so they're wrapped in `startTransition` again, as above. For forms, `useActionState` and `useOptimistic` build on the same machinery and are often cleaner than wiring it by hand.

## useDeferredValue: you don't control the source

`useDeferredValue` is for when the expensive render is driven by a **value** whose update you can't or shouldn't mark as a transition — most commonly a controlled text input. You can't wrap the input's own `onChange` in a transition, because then typing itself would lag. Instead, you defer a copy of the value: the input updates instantly, and a deferred copy, lagging slightly behind, drives the expensive work.

```tsx
const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);
const isStale = query !== deferredQuery;

return (
  <>
    <input value={query} onChange={(e) => setQuery(e.target.value)} />
    <div style={{ opacity: isStale ? 0.6 : 1 }}>
      <SearchChart query={deferredQuery} />
    </div>
  </>
);
```

We used exactly this on a dashboard where typing in a search box re-rendered a chart with a few hundred data points per keystroke. Typing stayed perfectly smooth while the chart briefly lagged behind — a much better trade-off than both being equally janky. Comparing `query` with `deferredQuery` gives you a stale flag for a visual hint, playing the same role as `isPending`.

## The pitfall: deferring without memoizing

This is the mistake that makes `useDeferredValue` look broken. When `query` changes, the parent re-renders. If `SearchChart` isn't memoized, it re-renders too — with the *old* deferred value, but still doing all the expensive work, urgently, on every keystroke. Deferral bought you nothing.

The expensive child must be wrapped in `memo`, so it skips the urgent render when its props haven't changed:

```tsx
const SearchChart = memo(function SearchChart({ query }: { query: string }) {
  const points = useMemo(() => buildSeries(query), [query]);
  return <Chart data={points} />;
});
```

Now the urgent render (new `query`, old `deferredQuery`) skips the chart entirely, and only the background render with the new deferred value does the heavy lifting. If the React Compiler is enabled in your project, it can apply this memoization automatically — but it's worth verifying in the Profiler rather than assuming.

## The distinction that matters

- Use **`useTransition`** for state updates *you* trigger and can choose to mark low-priority. You get `isPending`, and you can group several updates into one transition.
- Use **`useDeferredValue`** for values that arrive from somewhere you don't control the update path for — props from a parent, a controlled input, a value from a third-party hook.

Reaching for `useDeferredValue` on your own update when you could have used `startTransition` works, but it's strictly worse: you lose `isPending` and the ability to batch updates explicitly.

## Debounce is not the same thing

A debounce waits a fixed time — say 300 milliseconds — after the last keystroke before doing anything. That's still the right tool when each update triggers something expensive *outside* React, like a network request you don't want to fire on every key. For expensive *rendering*, deferral is better: there's no fixed delay on fast devices, and on slow devices React automatically does as much as it can between keystrokes. We often use both: deferral for the UI, debounce for the API call.

## When neither hook is the answer

Concurrent features schedule work; they don't remove it. If a render is expensive enough, the right fix is to do less:

- **Virtualize long lists.** Rendering 5,000 rows when 20 are visible is the real problem. A virtualized list renders what's on screen.
- **Move heavy computation off the main thread.** Sorting or aggregating a large dataset can run in a Web Worker.
- **Compute on the server.** Filtering 100,000 records in the browser is often a sign the API should be doing it.
- **Fix unnecessary renders.** Context providers with unstable values and inline objects passed as props cause re-renders that no amount of scheduling fixes.

## Measure before and after

We profile every one of these changes with the React DevTools Profiler and the browser's Performance panel, and track INP in production. "It feels faster" is a good start; a lower interaction latency on a mid-range Android phone is the actual goal — that's the device most of our users have, not the laptop the feature was built on.
