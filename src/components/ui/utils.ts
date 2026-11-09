export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// ── Motion tokens ─────────────────────────────────────────────────────────────
// Single source of truth for every spring on the site. Reach for these instead
// of inline stiffness/damping values so the whole product moves the same way.

/** Hover / tap feedback on buttons, links and cards. */
export const SPRING_HOVER = { type: "spring", stiffness: 400, damping: 25 } as const;

/** Modal, card and section reveals. */
export const SPRING_REVEAL = { type: "spring", stiffness: 260, damping: 20 } as const;

/** Large, heavy surfaces (hero mockups, drawers) — same feel, more weight. */
export const SPRING_SURFACE = { type: "spring", stiffness: 260, damping: 28, mass: 1.2 } as const;

/** Delay between siblings in a staggered entrance. */
export const STAGGER = 0.08;

/** Upward drift distance for staggered entrances. */
export const REVEAL_Y = 20;

/** Default interaction spring for hover/tap lifts across every shared primitive. */
export const SPRING_INTERACTION = { stiffness: SPRING_HOVER.stiffness, damping: SPRING_HOVER.damping } as const;

/** Softer spring for magnetic pull and 3D tilt, which need more travel and less snap. */
export const SPRING_PHYSICS = { stiffness: 200, damping: 20, mass: 0.5 } as const;
