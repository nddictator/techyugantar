"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cx, SPRING_PHYSICS } from "./utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees at the pointer's furthest reach from center. */
  maxTilt?: number;
  perspective?: number;
};

/**
 * Mouse-following 3D tilt wrapper for preview windows, dashboards, and
 * mockups. Entrance settles the same spring used for interactive tilt, so
 * there's no competing animation channel — see Hero's terminal preview for
 * the original technique this was extracted from.
 */
export default function TiltCard({ children, className, maxTilt = 12, perspective = 1200 }: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(prefersReducedMotion ? 0 : maxTilt * 0.5);
  const ry = useMotionValue(prefersReducedMotion ? 0 : -maxTilt * 0.3);
  const rotateX = useSpring(rx, SPRING_PHYSICS);
  const rotateY = useSpring(ry, SPRING_PHYSICS);

  useEffect(() => {
    if (prefersReducedMotion) {
      rx.set(0);
      ry.set(0);
      return;
    }
    const timer = setTimeout(() => {
      rx.set(0);
      ry.set(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, rx, ry]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * maxTilt);
    rx.set(py * -maxTilt);
  };

  const handleMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className={cx("relative", className)} style={{ perspective }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
