"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ProductApp } from "@/types/project";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { SPRING_HOVER, SPRING_REVEAL, SPRING_SURFACE } from "@/components/ui/utils";

// Fan positions for up to three screens: centre phone in front, the others
// tucked behind and tilted out. Hover spreads the fan a little further.
const FAN = [
  { rest: { x: "0%", rotate: 0, scale: 1 }, hover: { x: "0%", rotate: 0, scale: 1.02 }, z: 30 },
  { rest: { x: "-58%", rotate: -8, scale: 0.88 }, hover: { x: "-72%", rotate: -11, scale: 0.9 }, z: 20 },
  { rest: { x: "58%", rotate: 8, scale: 0.88 }, hover: { x: "72%", rotate: 11, scale: 0.9 }, z: 10 },
];

function ScreenFan({ screens }: { screens: ProductApp["screens"] }) {
  const reduce = useReducedMotion();
  // A lone screen gets more room than the front phone of a fan.
  const width = screens.length === 1 ? "w-[52%] max-w-[270px]" : "w-[40%] max-w-[210px]";
  return (
    <motion.div
      initial="rest"
      whileHover={reduce ? undefined : "hover"}
      animate="rest"
      className="relative mx-auto flex w-full max-w-[520px] justify-center py-6"
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-[15%] bottom-0 top-1/3 rounded-full bg-teal-500/15 blur-[80px]" />
      {screens.slice(0, 3).map((s, i) => (
        <motion.div
          key={s.src}
          variants={{ rest: FAN[i].rest, hover: FAN[i].hover }}
          transition={SPRING_HOVER}
          style={{ zIndex: FAN[i].z }}
          className={`${width} ${i === 0 ? "relative" : "absolute top-6"}`}
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...SPRING_SURFACE, delay: i * 0.08 }}
          >
            <PhoneFrame src={s.src} alt={s.alt} aspect={s.aspect} sizes="(max-width: 768px) 40vw, 210px" />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/** "One platform, N apps" — each app with its audience, story and a fan of its screens. */
export default function ProductApps({ apps }: { apps: ProductApp[] }) {
  return (
    <div className="space-y-20 md:space-y-28">
      {apps.map((app, i) => (
        <div key={app.name} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={SPRING_REVEAL}
            className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}
          >
            <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
              <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
              <span className="h-px w-8 bg-primary/40" />
              <span className="text-gray-400 dark:text-zinc-500">{app.audience}</span>
            </p>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">{app.name}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-gray-500 dark:text-zinc-400">{app.description}</p>
            <ul className="mt-6 space-y-2.5">
              {app.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-gray-700 dark:text-zinc-300">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
          <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
            <ScreenFan screens={app.screens} />
          </div>
        </div>
      ))}
    </div>
  );
}
