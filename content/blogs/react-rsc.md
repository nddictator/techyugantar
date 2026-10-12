---
title: "React Server Components Are Not a Silver Bullet"
excerpt: "The hype is real, but so are the footguns. We audit six common RSC anti-patterns — including the waterfall trap, context API breakage, and why your bundle size might actually increase."
author: "Tech Yugantar — Engineering Team"
date: "2025-09-26"
tags: ["react"]
image: "/images/blog/blog-react-rsc.jpg"
---

Server Components remove JavaScript from the client bundle and let you fetch data right next to your database. That's a real, measurable win. It's also easy to misuse in ways that make an app slower, leakier, or harder to reason about.

After auditing several App Router codebases — our own and ones clients brought to us — the same six problems keep appearing. Here they are, with the fix for each.

## A quick refresher on the boundary

Server Components run only on the server. Their code never ships to the browser, they can be `async`, and they can read from a database directly. They can't use state, effects, event handlers or browser APIs.

Client Components are marked with `"use client"`. They render on the server for the initial HTML too, then hydrate and run in the browser, so their code — and everything they import — ships in the bundle.

The directive marks a **boundary**, not a single component: everything a Client Component imports becomes client code as well. Almost every problem below comes from misunderstanding where that boundary sits.

## 1. The sequential waterfall trap

The most common mistake: a Server Component awaits a fetch, then renders a child Server Component that awaits another fetch, which renders another. Each `await` blocks the next component from even starting its request, turning three parallel calls into a serial chain.

```tsx
// Slow: each request waits for the one before it
export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);
  return (
    <>
      <ProductDetails product={product} />
      <Reviews productId={id} />          {/* awaits getReviews inside */}
      <Recommendations productId={id} />  {/* awaits getRecs inside */}
    </>
  );
}
```

Two fixes, depending on what the page needs.

**Start everything at once** when the requests don't depend on each other:

```tsx
const [product, reviews, recs] = await Promise.all([
  getProduct(id),
  getReviews(id),
  getRecommendations(id),
]);
```

**Stream the slow parts** when some data matters more than the rest. Wrap secondary sections in `Suspense` so the product renders immediately and reviews arrive when they're ready:

```tsx
<ProductDetails product={product} />
<Suspense fallback={<ReviewsSkeleton />}>
  <Reviews productId={id} />
</Suspense>
```

Requests made by siblings inside separate `Suspense` boundaries run in parallel, and the user sees the most important content first instead of waiting on the slowest query.

## 2. Context doesn't reach Server Components

`createContext` and `useContext` only work in Client Components. A Server Component can't read context at all. Teams migrating an existing app hit this constantly: a theme or auth context that worked fine before suddenly isn't available to anything rendered on the server.

What works:

- **Providers stay Client Components** and wrap the tree in the root layout. Server Components passed into them as `children` still render on the server — the provider just doesn't affect them.
- **Server-side "context" is a function call.** Instead of reading the current user from context, a Server Component calls a cached `getCurrentUser()` that reads the session cookie. Wrapped in React's `cache`, it runs once per request no matter how many components call it.
- **Pass explicit props** from the nearest Server Component that has the value down to the Client Components that need it.

## 3. "use client" placed too high

Putting `"use client"` at the top of a layout or page because one button inside it needs an `onClick` turns the entire subtree — and every library it imports — into client code. We've seen apps where nearly everything ended up client-side, quietly undoing the whole point of the migration.

Push the boundary down to the leaves. Keep the page a Server Component and extract only the interactive part:

```tsx
// page.tsx — Server Component
export default async function Page() {
  const post = await getPost();
  return (
    <article>
      <h1>{post.title}</h1>
      <Markdown content={post.body} />   {/* heavy parser stays on the server */}
      <LikeButton postId={post.id} />    {/* the only client code */}
    </article>
  );
}
```

A useful pattern for client wrappers — a carousel, a collapsible panel — is to accept Server Components as `children`. The wrapper is client code; what you put inside it doesn't have to be.

## 4. Bundle size can go up, not down

Server Components shrink the bundle only if the heavy code actually stays on the server. Three things undo that:

- **A high boundary** (problem 3) drags large libraries — markdown parsers, date libraries, syntax highlighters, charting libraries — into the client bundle.
- **Large props crossing the boundary.** Everything a Server Component passes to a Client Component is serialized into the RSC payload embedded in the page. Pass a 2,000-item array to a client table and that data ships in the HTML *and* the payload. Pass the 20 rows that are visible, or paginate.
- **Duplicate client imports.** Two client islands importing different versions or different entry points of the same library.

We build bundle analysis into every project's launch checklist, comparing the client JavaScript per route before and after migration. Assuming it shrank isn't the same as measuring it.

## 5. Leaking server data to the client

The flip side of serialization: anything passed as a prop to a Client Component is visible to the browser. Passing a whole database row "for convenience" can expose fields the UI never displays — internal flags, email addresses of other users, or worse.

```tsx
// Leaks every column of the user row into the page payload
<ProfileCard user={user} />

// Pass only what the component renders
<ProfileCard name={user.name} avatarUrl={user.avatarUrl} />
```

We keep data access in modules marked with `import "server-only"`, return purpose-built DTOs rather than raw rows, and never let secrets near a component boundary. Environment variables without the `NEXT_PUBLIC_` prefix stay server-side; a mistaken client import of a server-only module fails the build instead of leaking.

## 6. Mutating data during render

A Server Component's job is to render. Writing to the database during render — incrementing a view counter, marking a notification as read — is unpredictable: renders can be repeated, prefetched, cached or streamed, so the write may happen several times, or at the wrong moment.

Mutations belong in **Server Actions** (or Route Handlers), triggered by a user action, followed by `revalidatePath` or `revalidateTag` so the affected UI refreshes:

```tsx
"use server";

export async function markAllRead() {
  const user = await requireUser();
  await db.notification.updateMany({ where: { userId: user.id }, data: { read: true } });
  revalidatePath("/notifications");
}
```

And because a Server Action is a public endpoint, it authenticates and authorizes on its own every time, exactly like an API route.

## Defaulting everything to the server

The opposite mistake is less common but real: treating every component as a Server Component without asking whether it needs interactivity, then bolting on awkward workarounds — URL parameters for what should be local UI state, full page refreshes for a toggle. A filter panel with instant feedback, a rich form, a drag-and-drop board — these are Client Components, and that's fine. Server Components are a default, not a rule.

## The audit checklist

When we review an App Router codebase, we look for:

1. Independent fetches chained with sequential awaits.
2. Context assumed to reach Server Components.
3. `"use client"` higher in the tree than necessary.
4. Large data or heavy libraries crossing into client bundles.
5. Whole database objects passed as props to Client Components.
6. Writes happening during render instead of in Server Actions.

Server Components are a genuine architectural improvement. But "delete `useEffect`, add `async`" isn't a migration strategy — it's how you end up with a slower, leakier app that technically uses the newer feature.
