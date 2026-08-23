---
title: "Securing Next.js APIs: JWT, Middleware Edge Auth & CSRF in One Stack"
excerpt: "Edge Middleware intercepts before your lambdas even wake up. We detail our layered auth model — httpOnly cookies, JWT rotation, PKCE OAuth flow, and rate-limiting at the CDN edge with Upstash."
author: "Tech Yugantar — Engineering Team"
date: "2025-05-04"
tags: ["next.js"]
image: "/images/blog/blog-nextjs-auth.jpg"
---

Auth in Next.js spans three layers that are easy to conflate — the edge, the server, and the client — and most vulnerabilities we see in review come from a check that exists in one layer but was silently assumed to also cover another.

## Cookies over localStorage, without exception

We store the session token in an `httpOnly`, `Secure`, `SameSite=Lax` cookie, never in `localStorage`. This isn't a style preference — a token in `localStorage` is readable by any script that runs on the page, meaning a single XSS vulnerability anywhere in a large app becomes a full account-takeover primitive. An `httpOnly` cookie is invisible to JavaScript entirely, which trades a bit of client-side convenience for closing off an entire vulnerability class by construction.

## Edge Middleware as the first gate, not the only gate

Next.js Middleware runs at the edge, before a request reaches your route handlers — cheap enough to check "is there a valid session cookie at all" on every request to a protected path, redirecting unauthenticated requests before they cost you a function invocation.

```ts
export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  return NextResponse.next();
}
```

The mistake we've seen teams make: treating this check as sufficient authorization. Middleware confirms a token *exists* — it doesn't (cheaply) verify signature, expiry, or the specific permissions a request needs. Every Server Action and Route Handler re-verifies the JWT properly and checks authorization for that specific operation. Middleware is a cheap first filter, not the security boundary.

## PKCE for the OAuth flow

For third-party sign-in, we use the Authorization Code flow with PKCE even though Next.js apps are technically confidential clients with a server component — PKCE costs almost nothing to add and closes the authorization-code-interception attack class entirely, so there's no real reason to skip it even where it's not strictly required.

## CSRF, in a cookie-based world

`SameSite=Lax` cookies block CSRF for cross-site `GET` navigations already, but same-site `POST` requests from a malicious iframe embedding your own origin's form are still possible in some edge cases. We add a double-submit CSRF token for state-changing Server Actions as defense in depth — cheap to implement, and it removes CSRF from the list of things to reason carefully about during every future feature review.

## Rate-limiting before it reaches your app

Login and password-reset endpoints get rate-limited at the edge, using Upstash's Redis-backed rate limiter callable directly from Middleware — a brute-force attempt gets a `429` before it ever reaches a database query, which matters both for cost and because your application-layer rate limiting is the second line of defense, not the first.

The pattern underneath all of this: cheap checks at the edge to shed obviously-invalid traffic fast, and the real authorization decision made once, correctly, at the point closest to the data.
