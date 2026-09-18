"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Cinematic route transition. On each pathname change the outgoing view fades
 * while an aurora overlay sweeps up, then the incoming view rises into place.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="pointer-events-none fixed inset-0 z-[60] origin-bottom"
          style={{ background: "linear-gradient(180deg,#0A0B0D,#0F766E)" }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
