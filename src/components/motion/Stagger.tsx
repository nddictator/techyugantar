"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

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
  staggerDelay = 0.12,
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
  y = 20,
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
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
  };

  const Tag = as === "li" ? motion.li : motion.div;

  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
