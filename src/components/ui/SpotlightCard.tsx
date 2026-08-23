"use client";

import { useCallback, useRef, type ElementType, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cx, SPRING_INTERACTION } from "./utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Small label rendered top-right, e.g. "Platform" / "Capability". */
  tag?: string;
  as?: ElementType;
};

/**
 * Glass surface with a cursor-tracking spotlight highlight and a spring hover
 * lift. The base building block for bento tiles and feature cards.
 */
export default function SpotlightCard({ children, className, tag, as: Tag = "div" }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      cardRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      cardRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
    },
    [prefersReducedMotion],
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={SPRING_INTERACTION}
      className={cx(
        "group relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(57,157,145,0.12), transparent 70%)",
        }}
      />
      {tag && (
        <span className="absolute right-5 top-5 rounded-full border border-black/10 bg-black/[0.03] px-2.5 py-1 text-[11px] font-medium text-body-color dark:border-white/10 dark:bg-white/5 dark:text-body-color-dark">
          {tag}
        </span>
      )}
      <Tag className="relative z-10">{children}</Tag>
    </motion.div>
  );
}
