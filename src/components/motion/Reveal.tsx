"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const tagMap = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
  as?: keyof typeof tagMap;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  amount = 0.2,
  as = "div",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const Tag = tagMap[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ type: "spring", stiffness: 90, damping: 18, delay }}
    >
      {children}
    </Tag>
  );
}
