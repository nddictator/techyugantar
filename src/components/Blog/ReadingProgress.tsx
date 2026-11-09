"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Aurora reading-progress bar fixed under the header, driven by page scroll. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      data-testid="reading-progress"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.6)]"
    />
  );
}
