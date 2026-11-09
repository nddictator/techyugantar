"use client";

import { motion, useReducedMotion } from "motion/react";
import { SPRING_REVEAL, cx } from "./utils";

/**
 * Infrastructure / pipeline flow illustration. Nodes pulse, wires draw
 * themselves on scroll, and data packets travel between stages via SMIL
 * animateMotion. Theme-aware line + label colours.
 */
const NODES = [
  { id: "client", x: 40, y: 90, label: "Client", r: 22 },
  { id: "api", x: 175, y: 50, label: "API", r: 20 },
  { id: "svc", x: 175, y: 140, label: "Services", r: 20 },
  { id: "db", x: 320, y: 90, label: "Database", r: 22 },
];
const WIRES = [
  "M62,90 C110,90 120,50 155,50",
  "M62,90 C110,90 120,140 155,140",
  "M195,50 C240,50 250,90 298,90",
  "M195,140 C240,140 250,90 298,90",
];

export default function NetworkMesh({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={cx("relative w-full", className)} data-testid="network-mesh-illustration">
      <svg viewBox="0 0 360 180" className="h-auto w-full overflow-visible">
        <defs>
          <radialGradient id="nm-node" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0F766E" stopOpacity="0.85" />
          </radialGradient>
          <filter id="nm-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* wires */}
        {WIRES.map((d, i) => (
          <g key={i}>
            <motion.path
              d={d} fill="none"
              className="stroke-teal-500/25 dark:stroke-teal-300/25"
              strokeWidth="1.5"
              initial={reduce ? undefined : { pathLength: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.12 }}
            />
            {!reduce && (
              <circle r="3" fill="#2DD4BF" filter="url(#nm-glow)">
                <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={d} begin={`${i * 0.5}s`} />
              </circle>
            )}
          </g>
        ))}

        {/* nodes */}
        {NODES.map((n, i) => (
          <motion.g
            key={n.id}
            initial={reduce ? undefined : { scale: 0, opacity: 0 }}
            whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...SPRING_REVEAL, delay: 0.4 + i * 0.1 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle cx={n.x} cy={n.y} r={n.r} fill="url(#nm-node)"
              style={{ filter: "drop-shadow(0 0 10px rgba(45,212,191,0.4))" }} />
            <circle cx={n.x} cy={n.y} r={n.r} fill="none" stroke="#5EEAD4" strokeOpacity="0.5" strokeWidth="1"
              className="motion-safe:animate-[node-ping_2.6s_ease-out_infinite]"
              style={{ transformOrigin: `${n.x}px ${n.y}px`, animationDelay: `${i * 0.4}s` }} />
            <text x={n.x} y={n.y + n.r + 15} textAnchor="middle"
              className="fill-gray-500 text-[10px] font-medium dark:fill-zinc-400"
              fontSize="10">{n.label}</text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
