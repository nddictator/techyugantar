# Tech Yugantar — Modern UI/UX Refactor (PRD)

## Problem statement
Refactor the existing live Tech Yugantar Next.js marketing site (techyugantar.in) from a generic
startup-template look into a modern, high-end "AI-era" experience (Linear / Vercel / Stripe / Launch UI feel).
Three pillars: (1) cinematic spring-based motion, (2) custom animated theme-aware illustrations,
(3) one deliberate light + dark design system. Content, copy, IA and functionality are preserved.

## Tech stack
Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · motion (framer-motion) ·
lenis smooth scroll · next-themes · cobe · Resend (contact form). App lives at `/app` root.
Runs via `yarn dev` on port 3000 (NOTE: supervisor `frontend` program expects `/app/frontend`,
which does not exist for this repo — dev server is started manually; will not auto-recover on pod reboot).

## Design system — LOCKED (approved)
- Palette: Aurora Teal `#2DD4BF`/`#14B8A6`/`#0F766E` (primary) + Signal Amber `#FBBF24` (sharp accent).
  Dark base obsidian ladder (`#0A0B0D` page → `#131417` surface → `#1C1E22` raised);
  light base warm off-white `#FAFAF8`/`#F2F3EF`. Tokens in `src/styles/index.css`.
- Typography: Clash Display (display/headings) + Satoshi (body) via Fontshare. Inter removed.
- Motion: cinematic — orchestrated hero stagger, scroll-driven illustration draw, ambient float/aurora
  drift, magnetic buttons, route PageTransition overlay; reduced-motion fallbacks throughout.

## Implemented — Phase 1 (2026-06, complete & tested)
- Global design system: fonts, Aurora Teal + Signal Amber tokens, obsidian/cream bases, keyframes
  (aurora-drift, float-soft, draw-line, node-ping, caret-blink, packet-flow), reduced-motion block.
- Illustration kit (theme-aware): `LiveChart` (self-drawing trend + growing bars), `CodeEditor`
  (line-by-line typing + status), `NetworkMesh` (pulsing pipeline nodes + SMIL packet flow).
  `PageTransition` route overlay added to layout.
- Full homepage redesign: Hero (aurora headline, glow meshes, floating LiveChart, glass badges),
  About §1 (NetworkMesh + stat chips), About §2 (CodeEditor), plus color/type polish across
  Features, Domains, Trust, Projects, Testimonials, Pricing, Contact, Header, Footer.
- Legacy teal (`#399D91`/`rgba(57,157,145)`) globally swapped to aurora across all components.
- Verified: all routes 200, no runtime/console errors, dark + light both polished, testing agent 100%
  on tested flows (nav, theme toggle, mobile drawer, CTAs, illustrations, testimonials slider).

## Known limitations / notes
- Contact form: RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL are NOT set in preview,
  so submit returns "Email is not configured" — expected, out of scope for the visual refactor.
- Supervisor frontend dir mismatch (`/app/frontend` vs `/app`) — dev server started manually.

## Implemented — Phase 2 (2026-06, complete & tested)
- Shared `Breadcrumb` fully redesigned (aurora glow + grid, Clash Display title, Home>Page pill,
  accent underline) — lifts every inner page (Services, Projects, About, How-We-Work).
- Global aurora color sweep across ALL remaining pages/components (legacy teal fully removed).
- New scroll-pinned **ShipStory** ("Build. Measure. Scale.") on `/how-we-work`: sticky 300vh
  sequence that highlights stages (We Build / We Measure / We Scale) and cross-fades
  CodeEditor → LiveChart → NetworkMesh as one narrative; progress rail; reduced-motion fallback;
  `aria-current` on active stage.
- Inner pages inherit fonts + palette: Services, Projects (+ filter), Case Study, About
  (network mesh, code editor, founder story, team), How-We-Work timeline + comms.
- Verified: all inner routes 200, no runtime/console errors, both themes clean; testing agent
  100% on tested flows (iteration_2.json).

## Backlog — remaining phases (approved plan)
- Phase 3: Pricing, Blog + article pages, Contact (deeper polish; they already inherit the system).
- Phase 4: legal (privacy/terms), auth (signin/signup), 404/error, full light/dark + mobile QA sweep.
- Nothing ships to live domain until reviewed/approved (user controls deploy via Save to GitHub).
