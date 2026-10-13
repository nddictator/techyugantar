"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { ProjectScreens } from "@/types/project";
import { SPRING_PHYSICS, SPRING_SURFACE } from "@/components/ui/utils";

type Props = {
  screens: ProjectScreens;
  title: string;
  /** Platform chips shown in the browser bar, e.g. ["Web admin", "Android", "iOS"]. */
  platforms?: string[];
  /** Above-the-fold usage (case study hero): animate on mount and load eagerly. */
  priority?: boolean;
  className?: string;
};

/**
 * Multi-device product shot: the web app in a browser frame with the mobile
 * app in a phone frame layered over its corner. The phone drifts against the
 * scroll for depth; both rise in on entry.
 */
export default function DeviceShowcase({ screens, title, platforms, priority, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const phoneY = useSpring(useTransform(scrollYProgress, [0, 1], ["10%", "-6%"]), SPRING_PHYSICS);
  const webY = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  const trigger = priority
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.3 } };

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : "hidden"}
      {...trigger}
      className={`relative pb-[9%] pr-[6%] ${className}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-[8%] bottom-0 h-1/2 rounded-full bg-teal-500/20 blur-[90px]" />

      {/* Browser */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 40, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1 } }}
        transition={SPRING_SURFACE}
        className="relative overflow-hidden rounded-[18px] border border-black/[0.07] bg-white shadow-[0_30px_80px_rgba(6,8,15,0.14)] dark:border-white/[0.09] dark:bg-gray-dark dark:shadow-[0_40px_120px_rgba(0,0,0,0.75)]"
      >
        <div className="flex items-center gap-1.5 border-b border-black/[0.05] bg-cream-100 px-4 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
          <span className="mx-auto truncate rounded-md border border-black/[0.06] bg-white px-3 py-0.5 text-[11px] text-gray-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-400">
            {screens.webLabel ?? title}
          </span>
          {platforms && (
            <span className="hidden gap-1 sm:flex">
              {platforms.map((p) => (
                <span key={p} className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-teal-700 dark:text-teal-200">
                  {p}
                </span>
              ))}
            </span>
          )}
        </div>
        <div className="relative aspect-[1919/1001] overflow-hidden">
          <motion.div className="absolute inset-[-3%_0]" style={reduce ? undefined : { y: webY }}>
            <Image
              src={screens.web}
              alt={`${title} — web admin console`}
              fill
              priority={priority}
              sizes="(max-width: 992px) 100vw, 900px"
              className="object-cover object-left-top"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Phone */}
      <motion.div
        style={reduce ? undefined : { y: phoneY }}
        className="absolute bottom-0 right-0 w-[27%] min-w-[96px] max-w-[260px]"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, x: 40, rotate: 4 }, show: { opacity: 1, x: 0, rotate: 0 } }}
          transition={{ ...SPRING_SURFACE, delay: 0.15 }}
          className="relative rounded-[14%/6.5%] border border-white/10 bg-[#121316] p-[4%] shadow-[0_30px_70px_rgba(6,8,15,0.35)] ring-1 ring-black/10 dark:shadow-[0_40px_90px_rgba(0,0,0,0.85)]"
        >
          <div className="relative aspect-[720/1600] overflow-hidden rounded-[11%/5%]">
            <Image
              src={screens.mobile}
              alt={`${title} — customer mobile app`}
              fill
              priority={priority}
              sizes="(max-width: 992px) 30vw, 260px"
              className="object-cover object-top"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
