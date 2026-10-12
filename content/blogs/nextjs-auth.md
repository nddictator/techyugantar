---
title: "Securing Next.js APIs: JWT, Middleware Edge Auth & CSRF in One Stack"
excerpt: "Edge Middleware intercepts before your lambdas even wake up. We detail our layered auth model — httpOnly cookies, JWT rotation, PKCE OAuth flow, and rate-limiting at the CDN edge with Upstash."
author: "Tech Yugantar — Engineering Team"
date: "2025-05-04"
tags: ["next.js"]
image: "/images/blog/blog-nextjs-auth.jpg"
---

Auth in Next.js spans three layers that are easy to conflate — the edge, the server, and the client — and most vulnerabilities we find in code review come from a check that exists in one layer but was silently assumed to cover another.

This is the layered model we use on every Next.js App Router project, with the reasoning behind each layer.

## Cookies over localStorage, without exception

We store the session in an `httpOnly`, `Secure`, `SameSite=Lax` cookie — never in `localStorage`. This isn't a style preference. A token in `localStorage` is readable by any script on the page, so a single XSS bug anywhere in a large app becomes an account-takeover primitive. An `httpOnly` cookie is invisible to JavaScript entirely. You trade a little client-side convenience for closing off a whole vulnerability class by construction.

Setting it from a Server Action or Route Handler:

```ts
import { cookies } from "next/headers";

export async function createSession(token: string, expiresAt: Date) {
  const store = await cookies();
  store.set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}
```

## Short-lived access, rotating refresh

A JWT can't be revoked before it expires, so a long-lived one is a long-lived risk. We issue a short-lived access token (around 15 minutes) and a longer-lived refresh token, both in separate `httpOnly` cookies.

The refresh token is **rotated on every use**: each refresh issues a new one and invalidates the old one in the database. If an old refresh token is ever presented again, that's a strong sign it was stolen — we revoke the entire token family and force a fresh sign-in. That's what makes "log out of all devices" and "revoke this session" actually work, which stateless JWTs alone can't do.

## Edge Middleware as the first gate, not the only gate

Next.js Middleware runs before a request reaches your pages and route handlers, which makes it a cheap place to turn away obviously unauthenticated traffic to protected paths:

```ts
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    try {
      if (!token) throw new Error("missing");
      await jwtVerify(token, secret);
    } catch {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
```

`jose` runs in the edge runtime, so verifying the signature and expiry here is cheap enough. What Middleware should **not** be is your authorization layer. It knows the user is signed in; it doesn't know whether this user may edit invoice 482.

There's also a harder lesson here. In March 2025, a vulnerability in Next.js (CVE-2025-29927) allowed requests to skip Middleware entirely with a crafted internal header on affected self-hosted versions. Apps that did all their auth in Middleware were wide open; apps that re-checked in their handlers were fine. Keep Next.js patched — and design so that Middleware failing open isn't a breach.

## The real check lives next to the data

Every Server Action, Route Handler and Server Component that reads or writes protected data verifies the session itself and checks permission for that specific operation. We centralise this in a small data-access layer marked `server-only`, so it can never be bundled into client code:

```ts
import "server-only";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return db.user.findUnique({ where: { id: payload.sub as string } });
  } catch {
    return null;
  }
});

export async function updateInvoice(id: string, data: InvoiceInput) {
  const user = await getCurrentUser();
  if (!user) throw new AuthError("Not signed in");
  const invoice = await db.invoice.findUnique({ where: { id } });
  if (!invoice || invoice.orgId !== user.orgId) throw new AuthError("Not allowed");
  return db.invoice.update({ where: { id }, data });
}
```

React's `cache` means the session is verified once per request no matter how many components ask for it. And because authorization happens in the function that touches the database, a new page or action that calls `updateInvoice` can't forget the check.

One more trap: a Server Action is a public HTTP endpoint. Hiding the button that calls it in the UI protects nothing — anyone can call the action directly. Every action must authenticate and authorize as if it were an open API route, because it is one.

## PKCE for the OAuth flow

For third-party sign-in, we use the Authorization Code flow with PKCE even though a Next.js server is a confidential client that could rely on a client secret alone. PKCE costs almost nothing to add, protects against authorization-code interception, and is the current recommendation in the OAuth security best-practice guidance for all client types. We also validate the `state` parameter to tie the callback to the session that started the flow.

## CSRF, in a cookie-based world

Cookie-based auth means the browser attaches credentials automatically, so cross-site request forgery has to be considered for every state-changing request.

- **`SameSite=Lax`** already stops cookies being sent on cross-site `POST` requests in modern browsers.
- **Server Actions** only accept `POST`, and Next.js compares the request's `Origin` header against the host and rejects mismatches. That's built-in CSRF protection — keep it on, and only add trusted domains to `serverActions.allowedOrigins` deliberately.
- **Route Handlers** get no such protection automatically. For any custom `POST`, `PUT`, `PATCH` or `DELETE` handler that relies on cookies, we check the `Origin` header ourselves and require a CSRF token (double-submit cookie pattern) for forms that post to them.
- **Never mutate on `GET`.** A `GET` handler that deletes or changes data can be triggered by an image tag.

Defence in depth here is cheap, and it removes CSRF from the list of things to reason carefully about in every future feature review.

## Rate-limiting before it reaches your app

Sign-in, sign-up, OTP and password-reset endpoints get rate-limited as early as possible. Upstash's Redis-backed rate limiter works from Middleware and Route Handlers alike:

```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const loginLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
});

const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
const { success } = await loginLimit.limit(`login:${ip}`);
if (!success) return new NextResponse("Too many attempts", { status: 429 });
```

We limit by IP **and** by the target account, so a distributed attack on one account and one IP hammering many accounts are both slowed. Make sure the IP header you trust is the one your hosting platform sets, not one a client can spoof.

## Headers that close the rest

A few response headers, set once in `next.config.js` or Middleware, shut down whole categories of attacks:

- A **Content-Security-Policy** that restricts scripts to your own origin (with nonces for inline scripts) — the strongest XSS mitigation available.
- **`Strict-Transport-Security`** so browsers never downgrade to HTTP.
- **`X-Frame-Options: DENY`** or a CSP `frame-ancestors` rule to prevent clickjacking.
- **`Referrer-Policy: strict-origin-when-cross-origin`**.

## Never trust the client for secrets

Anything prefixed `NEXT_PUBLIC_` ships to every visitor's browser. API keys, JWT secrets and database URLs never get that prefix, and server-only modules import `server-only` so a mistaken client import fails the build instead of leaking a secret.

## The model in one paragraph

Cheap checks at the edge shed obviously invalid traffic and brute-force attempts fast. Sessions live in `httpOnly` cookies with short-lived access tokens and rotating refresh tokens. The real authorization decision is made once, correctly, in a server-only data-access layer right next to the data — so that any single layer failing, Middleware included, doesn't become a breach.
