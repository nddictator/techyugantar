---
title: "Designing a React Component Library That Teams Actually Use"
excerpt: "Internal design systems fail because of DX, not design. We cover our token architecture, Storybook-driven development workflow, and the versioning strategy that stopped breaking changes cold."
author: "Tech Yugantar — Frontend Team"
date: "2025-08-03"
tags: ["react"]
image: "/images/blog/blog-react-design-system.jpg"
---

Most internal component libraries die within a year — not because the components are badly built, but because using them is more friction than copy-pasting a `div` with some Tailwind classes. The technical quality of the components is rarely the bottleneck. Adoption is.

This is how we build component libraries for client teams so that using them is the path of least resistance: the token architecture, the component API conventions, the testing workflow, and the release process that stopped breaking consumers.

## Tokens first, components second

Every design system starts with design tokens — colour, spacing, radius, typography, shadows, motion — as a versioned source of truth that both Figma (via Tokens Studio) and the codebase consume. Components are built strictly on top of tokens, never with a hard-coded hex value or a magic pixel number.

This sounds obvious and is the single most-skipped step. Without it, "rebrand the primary colour" becomes a find-and-replace across forty component files instead of a one-line change.

### Three tiers of tokens

A flat list of colours isn't enough once you need dark mode or multiple brands. We use three tiers:

1. **Primitive tokens** — the raw palette: `teal-500`, `zinc-900`, `space-4`. They describe *what* a value is.
2. **Semantic tokens** — the role a value plays: `color-bg-surface`, `color-text-muted`, `color-border-focus`. Components use these.
3. **Component tokens** — optional, for values specific to one component: `button-primary-bg`.

Components never reference primitives directly. Dark mode then becomes a remapping of semantic tokens, not a second set of component styles:

```css
:root {
  --color-bg-surface: var(--zinc-50);
  --color-text-default: var(--zinc-900);
  --color-action-primary: var(--teal-600);
}
[data-theme="dark"] {
  --color-bg-surface: var(--zinc-900);
  --color-text-default: var(--zinc-100);
  --color-action-primary: var(--teal-400);
}
```

A build step (Style Dictionary works well) turns the token JSON into CSS variables, a Tailwind theme and TypeScript constants, so every platform reads from the same file.

## Component APIs: small, predictable, composable

The fastest way to lose adoption is a `Button` with thirty boolean props. Our conventions:

- **Variants, not booleans.** `variant="primary" | "secondary" | "ghost"` and `size="sm" | "md" | "lg"` instead of `isPrimary`, `isLarge`, `isOutlined` — which can contradict each other.
- **Native props pass through.** A `Button` accepts everything a `button` element accepts, typed with `React.ComponentProps<"button">`, so nobody has to ask "how do I set `type` or `aria-label`?"
- **Refs work.** Consumers can attach a ref for focus management and positioning libraries.
- **Composition over configuration.** Instead of an `icon` prop with a dozen placement options, children compose naturally.

We express variants with `class-variance-authority`, which keeps the styling rules readable and fully typed:

```tsx
const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-2",
  {
    variants: {
      variant: {
        primary: "bg-action-primary text-on-primary hover:bg-action-primary-hover",
        secondary: "border border-default bg-surface text-default hover:bg-surface-hover",
        ghost: "text-default hover:bg-surface-hover",
      },
      size: { sm: "h-8 px-3 text-sm", md: "h-10 px-4", lg: "h-12 px-6 text-lg" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof button>;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={cn(button({ variant, size }), className)} {...props} />;
}
```

For the common "make this link look like a button" case, an `asChild` prop (using Radix's `Slot`) lets the styles apply to whatever element the consumer passes in, instead of every component growing an `href` prop and a branch for Next.js `Link`.

## Accessibility is built in, not documented

If a component library says "remember to add `aria-expanded`" in its docs, half the consuming apps will forget. The components should be accessible by default, so the easy path is also the correct one.

We build interactive components — dialogs, menus, comboboxes, tabs, tooltips — on headless primitives from Radix UI or React Aria. They handle focus trapping, keyboard navigation, screen-reader announcements and the long tail of edge cases that take months to get right from scratch. Our layer adds the design tokens and API conventions on top. Every component's stories also run an automated accessibility check, so a contrast regression fails CI instead of reaching production.

## Storybook as the actual spec

A component's Storybook story isn't documentation *of* the component — for us, it's the executable spec the component is built against, written before the implementation.

- Every prop combination that matters gets a story.
- `play` functions simulate interactions — open the menu, press arrow keys, select an item — and assert on the result.
- **Visual regression tests** screenshot every story and diff it against the last approved version, so an unintended padding change in a shared component is caught in review rather than spotted by a designer three weeks later.

A component isn't "done" until its stories pass in CI. This flips the usual order (build the component, document it if there's time) and means the documentation can't silently drift out of date, because it's the thing enforcing correctness. Each story page also shows do's and don'ts and a copy-paste usage snippet, because most people read the example, not the prose.

## The versioning strategy that stopped breaking changes

The failure we kept hitting: a "small" prop rename in the button component broke twelve consuming apps overnight, because everyone was on a caret range and got the change on their next install.

Three changes fixed it:

1. **Strict semantic versioning, enforced by tooling.** Every pull request includes a Changesets entry declaring whether it's a patch, minor or major change. The release pipeline computes versions and writes the changelog from those entries — nobody hand-edits version numbers.
2. **Deprecate before you delete.** A renamed prop keeps working for at least one minor release, logging a development-only console warning that names the new prop. Teams see the warning in their own app long before anything breaks.
3. **Every breaking change ships with a codemod.** A small `jscodeshift` script that consuming teams run to migrate their code automatically, published alongside the new major version:

```bash
npx @techyugantar/ui-codemod v3-button-variant-rename ./src
```

Teams stopped resisting upgrades once upgrading stopped meaning a manual grep-and-fix afternoon.

## DX is the actual product

The measure we optimise for isn't bundle size or accessibility score — both matter, and both should already be fine. It's the time from "I need a button" to "I have a working button in my pull request". That means:

- TypeScript autocomplete that shows the available variants as you type.
- Sensible defaults that need zero configuration for the common case.
- Error messages that name the actual prop that's wrong, instead of a generic warning three components deep.
- Tree-shakeable exports, so importing one component doesn't pull in the whole library.

## Measure adoption, and listen to the workarounds

We track adoption the boring way: a script that counts imports from the design system versus raw `button`, `input` and `dialog` elements across consuming repos. When a team keeps writing raw markup for something the library offers, that's not a discipline problem — it's feedback. Usually the component is missing a variant they need or is awkward to compose, and the fix belongs in the library.

A clear contribution path helps too: teams can propose a new component or variant with a small template, and the design-system owners review it within the week. A library that only one team can change becomes a bottleneck that everyone routes around.

A design system is infrastructure, and infrastructure that's annoying to use gets worked around, not adopted. Every decision above was really about removing a reason for an engineer to reach for a raw `div` instead.
