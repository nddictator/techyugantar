"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cx } from "./utils";

type AmbientFieldProps = {
  className?: string;
  /** Hairline grid, radially masked so it dissolves at the edges. */
  showGrid?: boolean;
  /** Slow rotating conic beam sweep. */
  showBeam?: boolean;
  /** Film-grain texture overlay. */
  showGrain?: boolean;
  /** Radial spotlight that tracks the cursor. */
  showSpotlight?: boolean;
};

/**
 * Shared ambient backdrop: cursor-follow spotlight + theme-aware hairline grid +
 * slow conic beam + grain. Mount inside any `relative` section; it fills via
 * `absolute inset-0`. Pointer tracking writes CSS vars directly (no React state)
 * so it never re-renders the tree it sits behind.
 */
export default function AmbientField({
  className,
  showGrid = true,
  showBeam = true,
  showGrain = true,
  showSpotlight = true,
}: AmbientFieldProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 60, y: 30 });
  const prefersReducedMotion = useReducedMotion();

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !showSpotlight) return;
      const rect = fieldRef.current?.getBoundingClientRect();
      if (!rect) return;
      pointerRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        fieldRef.current?.style.setProperty("--mx", `${pointerRef.current.x}%`);
        fieldRef.current?.style.setProperty("--my", `${pointerRef.current.y}%`);
        rafRef.current = null;
      });
    },
    [prefersReducedMotion, showSpotlight],
  );

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  return (
    <div
      ref={fieldRef}
      onPointerMove={handlePointerMove}
      className={cx("pointer-events-auto absolute inset-0 -z-10 overflow-hidden", className)}
      style={{ "--mx": "60%", "--my": "30%" } as React.CSSProperties}
    >
      {showSpotlight && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(560px circle at var(--mx) var(--my), rgba(57,157,145,0.14), transparent 45%)",
          }}
        />
      )}

      {showGrid && (
        <div
          className="motion-safe:animate-[ambient-grid-fade_1.2s_ease-out] absolute inset-0 [--grid-line:rgba(18,23,35,0.05)] dark:[--grid-line:rgba(255,255,255,0.06)]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 25%, black 40%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 25%, black 40%, transparent 85%)",
          }}
        />
      )}

      {showBeam && (
        <div
          className="motion-safe:animate-[ambient-beam-spin_26s_linear_infinite] absolute -inset-1/2 opacity-[0.05] dark:opacity-[0.09]"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, transparent, #399D91, transparent 30%)",
          }}
        />
      )}

      {showGrain && (
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      )}

      <style>{`
        @keyframes ambient-beam-spin { to { transform: rotate(360deg); } }
        @keyframes ambient-grid-fade { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
