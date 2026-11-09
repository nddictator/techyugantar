"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { REVEAL_Y, SPRING_REVEAL, STAGGER } from "@/components/ui/utils";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
  staggerDelay?: number;
  /** Animate immediately on mount instead of on scroll-into-view — use for above-the-fold content like Hero. */
  immediate?: boolean;
};

export function Stagger({
  children,
  className,
  amount = 0.2,
  staggerDelay = STAGGER,
  immediate = false,
}: StaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: staggerDelay } },
  };

  const triggerProps = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, amount } };

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={container}
      {...triggerProps}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li";
};

export function StaggerItem({
  children,
  className,
  y = REVEAL_Y,
  as = "div",
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const item: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: SPRING_REVEAL,
    },
  };

  const Tag = as === "li" ? motion.li : motion.div;

  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
