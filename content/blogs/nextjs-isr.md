---
title: "Next.js ISR + Webhooks: The Content Architecture Behind Fast Storefronts"
excerpt: "How we reduced page build times from 22 minutes to 38 seconds for a 90,000-product catalogue using On-Demand ISR, edge caching, and a webhook fan-out pattern with Redis."
author: "Tech Yugantar — Engineering Team"
date: "2025-07-15"
tags: ["next.js"]
image: "/images/blog/blog-nextjs-isr.jpg"
---

Full static generation doesn't scale to a large, frequently changing catalogue. Rebuilding 90,000 product pages because one product's price changed is the kind of build time that turns "deploy on save" into "deploy once a day, carefully".

This is the content architecture we moved a large storefront to: pages that load like static files, prices that update within seconds of a change, and deploys that no longer drag the whole catalogue along.

## The problem with time-based revalidation

Standard ISR with a fixed interval (`revalidate = 3600`) means every page is *eventually* correct. That has two costs:

1. **Staleness.** A price change can sit on the live site for up to an hour. For a flash sale, or a product that just went out of stock, that's real money and real support tickets.
2. **Waste.** Every page regenerates on its schedule whether or not anything changed. In a catalogue where most products don't change in a given hour, that's a lot of database load and compute for zero benefit.

Time is a poor proxy for "something changed". The system that knows what changed is the commerce backend — so that's where invalidation should come from.

## Don't pre-build what nobody visits

The biggest single build-time win came from changing *what* gets built at deploy time. Instead of generating all 90,000 product pages during the build, `generateStaticParams` returns only the products that actually get traffic — bestsellers and recently viewed items, a few thousand pages. Everything else is generated on the first request and cached from then on.

```ts
// app/products/[slug]/page.tsx
export const dynamicParams = true; // generate unknown slugs on first request

export async function generateStaticParams() {
  const popular = await catalog.topProducts({ limit: 2000 });
  return popular.map((p) => ({ slug: p.slug }));
}
```

The first visitor to a long-tail product waits a moment longer while it renders; every visitor after that gets a cached page. Combined with on-demand invalidation below, this is where most of the 22-minutes-to-38-seconds improvement came from.

## Tag every data dependency

On-demand revalidation only works if Next.js knows which cached data each page depends on. We tag every data fetch with what it represents:

```ts
async function getProduct(slug: string) {
  const res = await fetch(`${API}/products/${slug}`, {
    cache: "force-cache",
    next: { tags: [`product:${slug}`, "products"] },
  });
  if (!res.ok) throw new Error(`Product ${slug} failed: ${res.status}`);
  return res.json();
}
```

Two details matter. Since Next.js 15, `fetch` is no longer cached by default, so caching has to be opted into explicitly — `force-cache` here. And for data that doesn't come from `fetch` (a direct database query, say), `unstable_cache` accepts the same `tags` option.

Tag design deserves thought. A product's price appears on its own page, but also on category listings, search results and "related products" carousels. Those pages carry tags too — `category:shoes`, `collection:summer` — so a product change can invalidate everything that displays it, not just its detail page.

## On-demand revalidation, driven by webhooks

The commerce platform fires a webhook on every product update. A Route Handler receives it and invalidates exactly the affected tags:

```ts
import crypto from "node:crypto";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-webhook-signature") ?? "";
  const expected = crypto
    .createHmac("sha256", process.env.WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  const valid =
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!valid) return new Response("Invalid signature", { status: 401 });

  const { productSlug, categorySlugs = [] } = JSON.parse(body);
  revalidateTag(`product:${productSlug}`);
  for (const c of categorySlugs) revalidateTag(`category:${c}`);

  return Response.json({ revalidated: true });
}
```

**Verify the signature.** A revalidation endpoint without authentication lets anyone on the internet force your whole catalogue to regenerate in a loop. We use the HMAC signature the platform provides and compare it in constant time.

`revalidateTag` marks the cached data as stale. The next request still gets the existing page instantly while a fresh one is generated in the background — stale-while-revalidate — so no visitor waits on a cold render. A price change typically shows up on the live site within a couple of seconds of the webhook firing.

## Fan-out for bulk updates

Bulk operations — a seasonal price update touching 8,000 SKUs at once — can't fire 8,000 synchronous revalidations without overwhelming the endpoint and spiking CPU across the regeneration pipeline. For those, the webhook handler doesn't revalidate directly. It pushes affected tags into Redis and returns immediately:

```ts
// In the webhook handler, for bulk events
await redis.sadd("revalidate:pending", ...tags);
```

A worker drains the set in batches on a schedule:

```ts
async function drainRevalidationQueue() {
  const tags = await redis.spop("revalidate:pending", 200);
  if (!tags?.length) return;
  await fetch(`${SITE_URL}/api/revalidate-batch`, {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.REVALIDATE_TOKEN}` },
    body: JSON.stringify({ tags }),
  });
}
```

Using a Redis **set** instead of a list gives us de-duplication for free: if the same product is updated five times in a minute, its tag is revalidated once. Batches are rate-limited so a bulk import becomes a smooth trickle of regenerations instead of a storm.

## Keep a safety net

Webhooks get missed — the platform has an outage, a deploy drops a request, a network blip loses a delivery. So pages also keep a long time-based `revalidate` (we use 24 hours) as a backstop. On-demand invalidation handles freshness; the timer guarantees nothing stays wrong forever. We also log every webhook and every revalidation, so "why is this price wrong?" has an answer in seconds.

## Self-hosting needs a shared cache

On Vercel, the ISR cache is shared across all instances automatically. Self-hosted on several containers, each Next.js instance keeps its own cache by default — so a revalidation that reaches instance A leaves instance B serving the old page.

The fix is a custom cache handler (the `cacheHandler` option in `next.config.js`) backed by shared storage such as Redis, so every instance reads and invalidates the same cache. If you self-host ISR behind a load balancer and skip this step, you'll see "the price is right on refresh… sometimes".

## Edge caching on top

Product pages are served through a CDN with `stale-while-revalidate` semantics as well, so most requests never reach the Next.js server at all. The CDN cache is purged for the same URLs when tags are revalidated, keeping the two layers consistent.

## Why build times actually dropped

The 22-minutes-to-38-seconds improvement isn't from ISR alone. It came from not rebuilding pages that nobody visits or that didn't change: deploys pre-render a small, high-traffic subset, everything else renders on demand, and ongoing content changes flow through tag-based invalidation between deploys. Code changes ship in under a minute; content changes ship in seconds; and neither waits on the other.

The core lesson, independent of the specific tools: treat "what changed" as a first-class signal your infrastructure can act on, instead of falling back to time or a full rebuild as the only invalidation strategies available.
