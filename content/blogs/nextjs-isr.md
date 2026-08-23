---
title: "Next.js ISR + Webhooks: The Content Architecture Behind Fast Storefronts"
excerpt: "How we reduced page build times from 22 minutes to 38 seconds for a 90,000-product catalogue using On-Demand ISR, edge caching, and a webhook fan-out pattern with Redis."
author: "Tech Yugantar — Engineering Team"
date: "2025-07-15"
tags: ["next.js"]
image: "/images/blog/blog-nextjs-isr.jpg"
---

Full static generation doesn't scale to a large, frequently-changing catalogue — rebuilding 90,000 product pages because one product's price changed is the kind of build time that turns "deploy on save" into "deploy once a day, carefully."

## The problem with time-based revalidation

Standard ISR with a `revalidate: 3600` interval means every page is *eventually* correct, but a price change can sit stale for up to an hour, and — worse — every single page pays the revalidation check cost on its schedule regardless of whether anything actually changed. For a catalogue where most products don't change in a given hour, that's a lot of wasted regeneration for zero benefit.

## On-demand revalidation, driven by webhooks

The shape that actually worked: the commerce platform (in this case a headless CMS with product data) fires a webhook on every product update, which hits a Next.js Route Handler that calls `revalidatePath` or `revalidateTag` for exactly the affected page — and only that page. A price change now propagates in the time it takes the webhook to fire and the page to regenerate, typically under two seconds, instead of waiting on a fixed interval.

```ts
export async function POST(req: Request) {
  const { productSlug } = await req.json();
  revalidateTag(`product:${productSlug}`);
  return Response.json({ revalidated: true });
}
```

## Fan-out for bulk updates

Bulk operations — a seasonal price update touching 8,000 SKUs at once — can't fire 8,000 individual webhooks without overwhelming the revalidation endpoint. We queue these through Redis: the webhook handler pushes affected slugs onto a list instead of revalidating synchronously, and a worker drains the queue in batches, rate-limited to avoid a revalidation storm that would otherwise spike CPU across the whole regeneration pipeline at once.

## Why build times actually dropped

The 22-minutes-to-38-seconds number isn't from ISR alone — it's from *not rebuilding pages that didn't change* at deploy time either. Deploys now only regenerate pages whose underlying content actually changed since the last build, using the same tag-based invalidation the webhooks use, rather than a blanket full-catalogue rebuild on every push. ISR handles the ongoing content changes between deploys; the deploy pipeline handles code changes without dragging 90,000 unrelated pages along for the ride.

The core lesson, independent of the specific tools: treat "what changed" as a first-class signal your infrastructure can act on, rather than falling back to time or a full rebuild as the only invalidation strategies available.
