---
title: "Next.js App Router in Production: What Nobody Tells You"
excerpt: "Server Components, streaming SSR, and the new caching model sound great in docs — but here are the race conditions, hydration mismatches, and layout shift bugs we hit in a real e-commerce project."
author: "Tech Yugantar — Engineering Team"
date: "2025-11-02"
tags: ["next.js"]
image: "/images/blog/blog-nextjs-approuter.jpg"
---

The App Router's pitch — Server Components by default, streaming, colocated data fetching — is genuinely good architecture. What the docs undersell is how much of that architecture depends on discipline you have to enforce yourself.

These are the issues we hit shipping an e-commerce storefront on the App Router, roughly in the order they surprised us, with the fixes we now apply on every project.

## Caching: know which defaults you're on

Caching is the part of the App Router that has changed the most between versions, and the part most likely to produce "works locally, wrong in production" bugs.

In Next.js 13 and 14, `fetch()` in a Server Component was **cached by default**, indefinitely, unless you opted out. Fantastic for a marketing page, a footgun for a product listing that's supposed to reflect live inventory. Next.js 15 flipped that: `fetch` is **not cached** by default, and GET Route Handlers aren't either. Upgrading in either direction changes behaviour silently — pages that were fast become slow, or pages that were fresh become stale.

Our rule now: **never rely on the default.** Every data fetch states its intent explicitly.

```ts
// Static, revalidated by tag when the CMS changes
fetch(`${CMS}/pages/home`, { cache: "force-cache", next: { tags: ["page:home"] } });

// Always fresh — stock levels, prices at checkout
fetch(`${API}/stock/${sku}`, { cache: "no-store" });

// Fresh within a minute is fine
fetch(`${API}/categories`, { next: { revalidate: 60 } });
```

A code reviewer can see the caching behaviour of every request without knowing which Next.js version the project is on.

## The client-side router cache

There's a second cache that catches teams out: the client-side router cache. Next.js keeps visited route segments in memory in the browser so back/forward navigation is instant. After a mutation — adding an item to the cart, updating an address — navigating to a page the user already saw can show the old version.

The fix is to invalidate after every mutation. In a Server Action, `revalidatePath` or `revalidateTag` refreshes both the server cache and the client router cache for affected routes. From client code, `router.refresh()` re-fetches the current route's Server Components without losing client state. We treat "mutation without revalidation" as a bug during review.

## Accidentally dynamic routes

Calling `cookies()`, `headers()` or reading `searchParams` anywhere in a route opts that route into dynamic rendering. That's correct when you need it, and a performance regression when it happens by accident — say, a shared header component that reads a cookie to show the cart count, imported into every page, quietly turning the whole storefront from static to rendered-per-request.

We check the build output's route table on every release — static routes are marked separately from dynamic ones — and isolate per-user bits like the cart badge into small Client Components or `Suspense` boundaries, so the rest of the page can stay static.

Also note that in Next.js 15, `params`, `searchParams`, `cookies()` and `headers()` are asynchronous and must be awaited. The codemod handles most of the migration; the rest shows up as type errors, which is the good kind of breakage.

## Hydration mismatches move upstream

With Server Components, the classic "client renders something different from the server" bug doesn't disappear — it moves to the boundary between Server and Client Components. Anything reading `Date.now()`, `Math.random()`, `window`, `localStorage`, or a theme or locale preference inside a Client Component will render one thing on the server and another in the browser.

Our rule: resolve anything environment-dependent on the server and pass it down as a prop. When something genuinely can only be known in the browser — a saved theme in `localStorage`, the user's time zone — render a neutral placeholder first and update after mount, or use `suppressHydrationWarning` only on the single element whose content legitimately differs, like a timestamp.

Formatting is a sneaky source of this. A price formatted with `toLocaleString()` on a server running in one locale and a browser in another produces different strings. We always pass an explicit locale and currency.

## Streaming and layout shift

`loading.tsx` and `Suspense` boundaries are the App Router's headline feature, and they make slow data feel fast — until the skeleton doesn't match the loaded content's dimensions. We had a product grid where the skeleton was a fixed-height placeholder and the real cards varied in height by tag count, producing a visible jump on every navigation and a poor Cumulative Layout Shift score.

The fix was boring: build skeletons from the same layout components as the real content, constrain card heights, and reserve space for images with `aspect-ratio` instead of guessing. A skeleton is part of the design, not an afterthought.

Placement matters too. A `loading.tsx` at the top of a route replaces the whole page while anything inside it loads. Smaller `Suspense` boundaries around just the slow sections — reviews, recommendations — keep the rest of the page visible and interactive.

## Out-of-order responses

Parallel routes (`@modal`, `@sidebar` slots) and client components that fetch based on user input both run into the same race: a slow response for an old request arrives *after* a fast response for a newer one and overwrites it. We saw it with a quick-view modal — click product A, then quickly product B, and the modal sometimes showed A's details under B's title.

React 18 removed the old "can't update state on an unmounted component" warning, so this race is now completely silent. The fix is to make sure only the latest request can update state, either by aborting the stale one or ignoring its result:

```tsx
useEffect(() => {
  const controller = new AbortController();
  fetch(`/api/products/${productId}`, { signal: controller.signal })
    .then((res) => res.json())
    .then(setProduct)
    .catch((err) => {
      if (err.name !== "AbortError") setError(err);
    });
  return () => controller.abort();
}, [productId]);
```

Better still, move the fetch into a Server Component or a data library that handles cancellation and de-duplication for you, and keep `useEffect` fetching for the rare cases that genuinely need it.

## Error boundaries per segment

Each route segment can have its own `error.tsx`. Without them, one failing data source — the recommendations API timing out — takes down the whole product page. With a boundary around the recommendations section, the product still renders and only that section shows a fallback with a retry button. We add boundaries wherever a section depends on a third-party service, and a `global-error.tsx` for the root layout as a last resort.

## Middleware isn't your auth layer

Middleware is a convenient place to redirect signed-out users, but it isn't where authorization belongs. In 2025 a vulnerability allowed Middleware to be bypassed on affected self-hosted versions, and apps that relied on it alone were exposed. Every Server Action, Route Handler and Server Component that touches protected data verifies the session itself. Middleware is a first filter, not the security boundary.

## Our App Router checklist

1. Every `fetch` states its caching intent explicitly.
2. Every mutation revalidates the paths or tags it affects.
3. The build's route table is checked for routes that became dynamic by accident.
4. Environment-dependent values are resolved on the server; formatting uses explicit locales.
5. Skeletons match the real layout; `Suspense` boundaries wrap slow sections, not whole pages.
6. Client-side fetches cancel or ignore stale responses.
7. Sections that depend on external services have their own error boundaries.
8. Authorization happens next to the data, not only in Middleware.

None of this makes the App Router the wrong choice — we ship on it by default. It just means the mental model in the docs is the happy path, and production traffic finds the edges.
