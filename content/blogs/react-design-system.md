---
title: "Designing a React Component Library That Teams Actually Use"
excerpt: "Internal design systems fail because of DX, not design. We cover our token architecture, Storybook-driven development workflow, and the versioning strategy that stopped breaking changes cold."
author: "Tech Yugantar — Frontend Team"
date: "2025-08-03"
tags: ["react"]
image: "/images/blog/blog-react-design-system.jpg"
---

Most internal component libraries die within a year — not because the components are badly built, but because using them is more friction than copy-pasting a `<div>` with some Tailwind classes. The technical quality of the components is rarely the bottleneck.

## Tokens first, components second

We start every design system with design tokens — color, spacing, radius, typography — as a flat, versioned JSON file that both Figma (via Tokens Studio) and the codebase consume. Components are built strictly on top of tokens, never with a hardcoded hex value or magic pixel number. This sounds obvious and is the single most-skipped step: without it, "rebrand the primary color" becomes a find-and-replace across forty component files instead of a one-line token change.

## Storybook as the actual spec

A component's Storybook story isn't documentation *of* the component — for us, it's the executable spec the component is built against, written before the implementation. Every prop combination that matters gets a story, `play` functions assert on interaction behavior, and a component isn't "done" until its stories pass in CI. This flips the usual order (build component, document it if there's time) and means the documentation can never silently drift out of date, because it's the thing enforcing correctness.

## The versioning strategy that stopped breaking changes

The failure mode we kept hitting: a "small" prop rename in the button component broke twelve consuming apps overnight because everyone was on `^2.4.0` and got the change on their next `npm install`. We now ship every breaking change behind a **codemod**, not just a changelog entry — a small script (built on `jscodeshift`) that consuming teams run to auto-migrate their usage, published alongside the new major version. Teams stopped resisting upgrades once upgrading stopped meaning a manual grep-and-fix afternoon.

```bash
npx @techyugantar/ui-codemod v3-button-variant-rename ./src
```

## DX is the actual product

The technical measure we optimize for isn't bundle size or accessibility score (both matter, but both were already fine) — it's time from "I need a button" to "I have a working button in my PR." That means good TypeScript autocomplete, sensible defaults that need zero configuration for the common case, and error messages that name the actual prop that's wrong instead of a generic React prop-types warning three components deep.

A design system is infrastructure, and infrastructure that's annoying to use gets worked around, not adopted. Every decision above was really about removing a reason for an engineer to reach for a raw `<div>` instead.
