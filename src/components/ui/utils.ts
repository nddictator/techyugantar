export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Default interaction spring for hover/tap lifts across every shared primitive. */
export const SPRING_INTERACTION = { stiffness: 300, damping: 24 } as const;

/** Softer spring for magnetic pull and 3D tilt, which need more travel and less snap. */
export const SPRING_PHYSICS = { stiffness: 200, damping: 20, mass: 0.5 } as const;
