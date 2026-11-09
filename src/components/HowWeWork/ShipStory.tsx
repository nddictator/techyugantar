"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "motion/react";
import CodeEditor from "@/components/ui/CodeEditor";
import LiveChart from "@/components/ui/LiveChart";
import NetworkMesh from "@/components/ui/NetworkMesh";
import { Reveal } from "@/components/motion";

const STAGES = [
  {
    k: "01",
    title: "We Build",
    body: "Clean, typed, reviewed code shipped in two-week sprints — you watch every commit land in real time.",
    chip: "Engineering",
  },
  {
    k: "02",
    title: "We Measure",
    body: "Every release is instrumented. Growth, latency and errors are tracked so decisions are driven by data, not guesses.",
    chip: "Analytics",
  },
  {
    k: "03",
    title: "We Scale",
    body: "Multi-tenant, distributed infrastructure that stays fast under load — from your first user to your millionth.",
    chip: "Infrastructure",
  },
];

export default function ShipStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = v < 0.34 ? 0 : v < 0.67 ? 1 : 2;
    setActive(idx);
  });

  const o0 = useTransform(scrollYProgress, [0, 0.28, 0.36], [1, 1, 0]);
  const o1 = useTransform(scrollYProgress, [0.3, 0.4, 0.62, 0.7], [0, 1, 1, 0]);
  const o2 = useTransform(scrollYProgress, [0.64, 0.74, 1], [0, 1, 1]);

  if (reduce) {
    return (
      <section className="relative overflow-hidden py-20">
        <div className="container">
          <Reveal><SectionHeader /></Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-black/[0.07] p-4 dark:border-white/[0.08]"><CodeEditor /></div>
            <div className="rounded-2xl"><LiveChart /></div>
            <div className="flex items-center rounded-2xl border border-black/[0.07] p-6 dark:border-white/[0.08]"><NetworkMesh /></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height: "300vh" }} data-testid="ship-story">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* aurora backdrop */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
            style={{ background: "radial-gradient(ellipse at center, rgba(45,212,191,0.12), transparent 70%)" }} />
        </div>

        <div className="container relative">
          <div className="mb-10 lg:mb-14"><SectionHeader /></div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Left: steps */}
            <div className="space-y-3">
              {STAGES.map((s, i) => (
                <button
                  key={s.k}
                  aria-current={active === i ? "step" : undefined}
                  data-active={active === i}
                  className={`block w-full rounded-2xl border p-6 text-left transition-all duration-500
                    ${active === i
                      ? "border-primary/40 bg-white shadow-[0_10px_40px_rgba(45,212,191,0.12)] dark:bg-white/[0.05]"
                      : "border-black/[0.06] bg-white/50 opacity-55 dark:border-white/[0.06] dark:bg-white/[0.02]"}`}
                  data-testid={`ship-stage-${i}`}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className={`font-display text-sm font-semibold ${active === i ? "text-primary" : "text-gray-400 dark:text-zinc-600"}`}>
                      {s.k}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-teal-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-teal-600 dark:text-teal-300">
                      {s.chip}
                    </span>
                  </div>
                  <h3 className="font-display mb-1.5 text-xl font-semibold text-gray-900 dark:text-white">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500 dark:text-zinc-400">{s.body}</p>
                </button>
              ))}
              {/* progress rail */}
              <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/10">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
                  style={{ scaleX: scrollYProgress, transformOrigin: "left" }} />
              </div>
            </div>

            {/* Right: cross-fading illustration stage */}
            <div className="relative h-[380px] md:h-[420px]">
              <motion.div style={{ opacity: o0 }} className="absolute inset-0 flex items-center justify-center">
                <CodeEditor className="w-full max-w-md" />
              </motion.div>
              <motion.div style={{ opacity: o1 }} className="absolute inset-0 flex items-center justify-center">
                <LiveChart className="w-full max-w-md" />
              </motion.div>
              <motion.div style={{ opacity: o2 }} className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-md rounded-3xl border border-black/[0.07] bg-white/70 p-8 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03]">
                  <NetworkMesh />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="max-w-2xl">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium
        border-black/[0.08] bg-white/70 text-gray-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
        How We Ship
      </span>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
        Build. Measure. <span className="text-aurora">Scale.</span>
      </h2>
      <p className="mt-4 text-base text-gray-500 dark:text-zinc-400">
        One continuous loop — from the first line of code to global scale. Scroll to see how a Tech Yugantar product comes to life.
      </p>
    </div>
  );
}
