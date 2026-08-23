---
title: "Next.js App Router in Production: What Nobody Tells You"
excerpt: "Server Components, streaming SSR, and the new caching model sound great in docs — but here are the race conditions, hydration mismatches, and layout shift bugs we hit in a real e-commerce project."
author: "Tech Yugantar — Engineering Team"
date: "2025-11-02"
tags: ["next.js"]
image: "/images/blog/blog-nextjs-approuter.jpg"
---

The App Router's pitch — Server Components by default, streaming, colocated data fetching — is genuinely good architecture. What the docs undersell is how much of that architecture depends on discipline you have to enforce yourself.

## The caching model will surprise you

`fetch()` inside a Server Component is cached by default, indefinitely, unless you opt out. That's fantastic for a marketing page and a footgun for a product listing that's supposed to reflect live inventory. We got bitten once by a `fetch` that silently served an hour-old response after a Vercel redeploy reset nothing we expected it to reset. The fix isn't complicated — `cache: "no-store"` or a `revalidate` tag on anything that isn't genuinely static — but you have to know to look for it, because the default behavior is invisible until it isn't.

## Hydration mismatches move upstream

With Server Components, the classic "client renders something different than the server" bug doesn't disappear — it just moves to the boundary between Server and Client Components. Anything reading `Date.now()`, `window`, or a theme/locale cookie inside a component that straddles that boundary will mismatch. Our rule now: resolve anything environment-dependent on the server and pass it down as a prop, never re-derive it client-side in the same render pass.

## Streaming and layout shift

`loading.tsx` and `<Suspense>` boundaries are the App Router's headline feature, and they make slow data feel fast — until your skeleton doesn't match your loaded content's dimensions. We had a product grid where the skeleton was a fixed-height placeholder and the real cards varied in height by tag count, producing a visible jump on every navigation. The fix was boring: measure the real content's height range and constrain the skeleton to match, or reserve space with `aspect-ratio` instead of guessing.

## Parallel routes and race conditions

Parallel routes (`@modal`, `@sidebar` slots) are powerful for things like a photo-detail modal that also works as a full page. The race condition we hit: a fast client-side navigation could resolve a slot's data *after* the main route had already unmounted it, throwing a "Cannot update state on unmounted component" warning in dev and a silent stale render in production. `useEffect` cleanup functions on the data-fetching hook inside the slot fixed it — trivial once you know the slot has its own independent lifecycle, easy to miss until you've been burned once.

None of this makes the App Router the wrong choice — we ship on it by default now. It just means the mental model in the docs is the happy path, and production traffic finds the edges.
