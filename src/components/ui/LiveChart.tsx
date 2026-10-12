"use client";

import { motion, useReducedMotion } from "motion/react";
import { SPRING_HOVER, SPRING_REVEAL, cx } from "./utils";

/**
 * Self-drawing analytics illustration: an area/line trend that draws itself on
 * scroll, growing bars, a gliding value dot and a floating stat chip.
 * Theme-aware — teal stroke reads on both light and dark surfaces.
 */
const LINE = "M0,120 C40,110 60,70 100,74 C140,78 150,40 190,44 C230,48 250,20 300,28";
const BARS = [
  { x: 18, h: 38 }, { x: 58, h: 58 }, { x: 98, h: 46 },
  { x: 138, h: 74 }, { x: 178, h: 62 }, { x: 218, h: 92 }, { x: 258, h: 108 },
];

export default function LiveChart({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-2xl border p-5",
        "border-black/[0.07] bg-white/80 shadow-[0_10px_40px_rgba(6,8,15,0.08)] backdrop-blur-xl",
        "dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]",
        className,
      )}
      data-testid="live-chart-illustration"
    >
      {/* Header row */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">
            Monthly Growth
          </p>
          <p className="font-display text-2xl font-semibold text-gray-900 dark:text-white">
            +38.6%
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-teal-600 dark:text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 motion-safe:animate-pulse" />
          Live
        </span>
      </div>

      {/* Chart canvas */}
      <svg viewBox="0 0 300 140" className="h-40 w-full overflow-visible">
        <defs>
          <linearGradient id="lc-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lc-bar" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* grid */}
        {[0, 35, 70, 105, 140].map((y) => (
          <line key={y} x1="0" y1={y} x2="300" y2={y}
            className="stroke-black/[0.05] dark:stroke-white/[0.06]" strokeWidth="1" />
        ))}

        {/* bars */}
        {BARS.map((b, i) => (
          <motion.rect
            key={b.x}
            x={b.x} width="18" rx="3"
            fill="url(#lc-bar)"
            initial={reduce ? undefined : { height: 0, y: 140 }}
            whileInView={reduce ? undefined : { height: b.h, y: 140 - b.h }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...SPRING_REVEAL, delay: 0.15 + i * 0.06 }}
            height={reduce ? b.h : undefined}
            y={reduce ? 140 - b.h : undefined}
          />
        ))}

        {/* area fill */}
        <motion.path
          d={`${LINE} L300,140 L0,140 Z`}
          fill="url(#lc-area)"
          initial={reduce ? undefined : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        />

        {/* trend line */}
        <motion.path
          d={LINE}
          fill="none"
          stroke="#2DD4BF"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(45,212,191,0.5))" }}
          initial={reduce ? undefined : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />

        {/* endpoint dot */}
        <motion.circle
          cx="300" cy="28" r="4" fill="#fff" stroke="#2DD4BF" strokeWidth="2.5"
          initial={reduce ? undefined : { scale: 0, opacity: 0 }}
          whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ ...SPRING_HOVER, delay: 1.5 }}
        />
      </svg>
    </div>
  );
}
