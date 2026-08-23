---
title: "React Server Components Are Not a Silver Bullet"
excerpt: "The hype is real, but so are the footguns. We audit six common RSC anti-patterns — including the waterfall trap, context API breakage, and why your bundle size might actually increase."
author: "Tech Yugantar — Engineering Team"
date: "2025-09-26"
tags: ["react"]
image: "/images/blog/blog-react-rsc.jpg"
---

Server Components remove JavaScript from the client bundle and let you fetch data close to your database. That's a real, measurable win — and it's also easy to misuse in ways that make an app slower, not faster.

## The sequential waterfall trap

The most common mistake we see: a Server Component `await`s a fetch, renders a child Server Component that `await`s another fetch, which renders another. Each `await` blocks the next component from even starting its request, turning what should be three parallel network calls into a serial chain. The fix is unglamorous — hoist independent fetches to the top of the tree and pass the results down, or fire them with `Promise.all` and pass the promises through for the children to `await` themselves.

## Context doesn't cross the Server/Client boundary

`createContext` and `useContext` only work inside Client Components — a Server Component can't read a context provided further up the tree if a Client Component sits between them. Teams migrating an existing app hit this constantly: a theme or auth context that worked fine pre-RSC suddenly returns `undefined` for anything rendered on the server. The pattern that works is passing the value as an explicit prop from the nearest Server Component that has access to it, rather than relying on context to tunnel through.

## Bundle size can go up, not down

Making a component a Server Component removes *its own* code from the client bundle — but if that component imports a large client-only library and passes data down to a Client Component that then imports the same library again, you can end up shipping it twice, once server-side (unnecessarily, since it never runs there) and once client-side. Auditing your bundle after an RSC migration, not just assuming it shrank, is a step we now build into every project's launch checklist.

## Six patterns worth checking for

1. Fetches that could run in parallel but are chained via sequential `await`s
2. Context providers assumed to reach Server Components
3. `"use client"` directives placed too high in the tree, dragging server-only logic to the client
4. Large libraries imported in both a Server Component and its Client Component children
5. Mutating data in a Server Component render path instead of a Server Action
6. Treating every component as a Server Component by default without checking whether it needs interactivity

RSCs are a genuine architectural improvement, but "delete `useEffect`, add `async`" is not a migration strategy — it's how you end up with a slower app that technically uses the newer feature.
