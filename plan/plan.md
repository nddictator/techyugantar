# Tech Yugantar — Modern UI/UX Refactor Plan

## Objective
Refactor the existing live Tech Yugantar website into a modern, high-end "AI-era" experience — the kind of smoothness, motion, and hand-crafted illustration feel seen on Launch UI, Linear, Vercel, and Stripe. The site already has the right foundation (smooth scroll, animation library, dark mode). The problem is the execution feels generic. This is a polish + redesign pass on the components and pages, not a rebuild and not a content rewrite.

The three things being fixed:
1. **Motion** — replace flat fades with a consistent, spring-based animation language (smooth reveals, staggered entrances, hover physics, page transitions).
2. **Illustrations & vectors** — add custom animated SVG/CSS illustrations (globe, network, live charts, code editor, browser/mobile mockups, waves/ripples) that carry the "technical & abstract" feel Launch UI is known for.
3. **Light & dark mode** — a single, deliberate design system where every surface, illustration, and animation looks correct and intentional in both themes (no washed-out or invisible elements when switching).

## Important context: this is a live site
- All work happens on a preview copy first. Nothing ships to the live domain until it is reviewed and approved here.
- **Content stays the same.** Existing copy, case studies, blog posts, pricing, team info, and page structure are preserved. This is a visual/interaction refresh, not a messaging change. If any copy needs to change, it will be flagged separately, not changed silently.
- Existing functionality (contact form, blog, routing, SEO metadata, sitemap) keeps working exactly as it does today.

## Illustrations — how they'll be produced
Launch UI's illustration set is a paid product and cannot be copied. Instead, a matching set of **original animated illustrations** will be built in the same style (clean line-art SVG + subtle CSS/JS motion, theme-aware). Proposed set, reusing the technical themes already on the site:
- Animated **globe / connection network** (already partly present — will be polished)
- **Live line & bar charts** that draw themselves on scroll
- **Code editor** mockup with typing/commit animation
- **Browser & mobile device** mockups for showcasing work
- **Ripple / waves / grid-tiles** ambient background accents
- **Pipeline / infrastructure** flow diagram for the services/process story

Each illustration is designed once and adapts automatically to light and dark.

## Design system — LOCKED (your calls confirmed)
You approved Phase 1 order, gave me the call on color + fonts, and asked for more cinematic motion. Final choices:

### Color palette (dark-first, one polished light mode)
Evolves your existing brand (teal + amber) into a richer, more premium system rather than throwing it away.
- **Primary accent — Aurora Teal:** `#2DD4BF` (bright interactive/glow) stepping down to `#14B8A6` / `#0F766E` for depth. This is a modern, luminous evolution of your current `#399D91`.
- **Sharp secondary accent — Signal Amber:** `#FBBF24` (evolves your existing `#fbb040`), used sparingly for highlights, CTAs, and illustration sparks — the warm contrast against the cool teal.
- **Dark base:** obsidian ladder — page `#0A0B0D`, surface `#131417`, raised `#1C1E22`, with teal-tinted glow meshes for atmosphere.
- **Light base:** warm off-white `#FAFAF8` / `#F2F3EF` surfaces (not stark white) so it feels designed, not default.
- Dominant cool palette + a single sharp warm accent = distinctive, not "AI-slop" purple-on-white.

### Typography — new distinctive pairing (replacing Inter)
- **Headings — `Clash Display`:** a characterful modern grotesque with real personality for big hero statements.
- **Body — `Satoshi`:** clean, geometric, highly readable — premium without being generic.
- Both are free, high-quality typefaces; a system fallback stack is included so text never breaks.

### Aesthetic & motion
- **Aesthetic:** dark-first, premium and atmospheric — glow meshes, glassmorphism, layered depth — with an equally deliberate light mode.
- **Motion — cinematic (as requested):** orchestrated hero entrances, scroll-driven illustration animation (charts draw, network pulses, code types), layered parallax, longer luxurious springs, ambient continuous motion, and smooth page-transition overlays between routes. A reduced-motion fallback is included for accessibility.

## Scope & phasing
The site has many pages (home, services, projects, case study, about, how-we-work, pricing, blog, contact, plus legal/auth pages). Doing everything at once on a live site is risky and slow to review. Proposed order so you see results fast and can steer:

- **Phase 1 — Foundation + Homepage (first deliverable):**
  Establish the shared design system (colors, type, motion tokens, theme handling) and the reusable animated illustration + component set, then apply it to the full homepage (hero, features, domains, about, trust, projects, testimonials, pricing, contact) and the global header/footer. This is the "wow" review point.
- **Phase 2 — Key inner pages:** Services, Projects, Case Study, About, How-We-Work.
- **Phase 3 — Remaining pages:** Pricing, Blog + article pages, Contact.
- **Phase 4 — Polish pass:** legal pages (privacy/terms), auth (signin/signup), 404/error, plus a full light/dark and mobile QA sweep.

Each phase is reviewable on its own. You approve and I move to the next.

## Out of scope (unless you ask)
- No change to site content, copy, or information architecture.
- No new pages or new features/functionality.
- No backend/API changes beyond keeping the existing contact form working.
- No pushing to the live domain — that stays your call via the deploy/GitHub step.

## What you get at the end of Phase 1
A fully redesigned, animated homepage in both light and dark mode, a reusable illustration + component kit, and a locked-in design system — enough to judge the direction before the rest of the site is rolled out.

## Decisions — all confirmed ✓ — PLAN APPROVED
1. **Scope order** — Phase 1 (design system + full homepage) first. ✓
2. **Brand color** — refreshed Aurora Teal + Signal Amber palette (evolves existing brand). ✓
3. **Typography** — new pairing: Clash Display (headings) + Satoshi (body). ✓
4. **Motion intensity** — cinematic. ✓
5. **Jaw-drop focus** — no single priority; every homepage section gets full polish. ✓

**Status: APPROVED by user. Phase 1 build starts next.**
