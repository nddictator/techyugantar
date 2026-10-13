"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import CodeEditor from "@/components/ui/CodeEditor";
import LiveChart from "@/components/ui/LiveChart";
import NetworkMesh from "@/components/ui/NetworkMesh";
import { Stagger, StaggerItem } from "@/components/motion";
import { SPRING_SURFACE } from "@/components/ui/utils";
import SectionHeading from "./SectionHeading";

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

const HEADING = {
  kicker: "02 — How we ship",
  title: (
    <>
      Build. Measure. <span className="text-aurora">Scale.</span>
    </>
  ),
  description:
    "One continuous loop — from the first line of code to global scale. This is how every sprint turns into a product that keeps getting better.",
};

// The pinned sequence needs a viewport tall and wide enough to hold the steps
// and the illustration side by side; anywhere smaller gets the stacked layout.
const PINNED_QUERY = "(min-width: 1024px) and (min-height: 720px)";

function usePinnedLayout() {
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(PINNED_QUERY);
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return pinned;
}

function Illustration({ index }: { index: number }) {
  if (index === 0) return <CodeEditor className="w-full max-w-md" />;
  if (index === 1) return <LiveChart className="w-full max-w-md" />;
  return (
    <div className="w-full max-w-md rounded-3xl border border-black/[0.07] bg-white/70 p-8 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03]">
      <NetworkMesh />
    </div>
  );
}

/** Stacked layout for phones, short screens and reduced motion. */
function StackedStory() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container">
        <SectionHeading {...HEADING} />
        <Stagger className="grid gap-6 lg:grid-cols-3">
          {STAGES.map((s, i) => (
            <StaggerItem
              key={s.k}
              className="flex flex-col overflow-hidden rounded-3xl border border-black/[0.07] bg-white/70 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03]"
            >
              <div className="flex min-h-[260px] items-center justify-center border-b border-black/[0.06] bg-cream-100/60 p-5 dark:border-white/[0.06] dark:bg-black/20">
                <Illustration index={i} />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-mono text-xs text-primary">{s.k}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400 dark:text-zinc-500">{s.chip}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-500 dark:text-zinc-400">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Scroll-pinned sequence: stages highlight and illustrations cross-fade as you scroll. */
function PinnedStory() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v < 0.34 ? 0 : v < 0.67 ? 1 : 2);
  });

  // Clicking a stage scrolls to the middle of its slice of the sequence.
  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const target = top + travel * [0.15, 0.5, 0.85][i];
    if (lenis) lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative h-[300vh]" data-testid="ship-story">
      {/* pt clears the fixed header so the pinned frame is never tucked under it */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-24 pb-8">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-2/3 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
            style={{ background: "radial-gradient(ellipse at center, rgba(45,212,191,0.12), transparent 70%)" }}
          />
        </div>

        <div className="container relative">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">{HEADING.kicker}</p>
              <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-gray-900 dark:text-white xl:text-5xl">
                {HEADING.title}
              </h2>

              <ol className="mt-10 space-y-2">
                {STAGES.map((s, i) => {
                  const isActive = active === i;
                  return (
                    <li key={s.k}>
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        aria-current={isActive ? "step" : undefined}
                        data-testid={`ship-stage-${i}`}
                        className={`block w-full rounded-2xl border p-5 text-left transition-[background-color,border-color,opacity,box-shadow] duration-500 ${
                          isActive
                            ? "border-primary/30 bg-white/80 shadow-[0_10px_40px_rgba(45,212,191,0.12)] backdrop-blur-md dark:bg-white/[0.05]"
                            : "border-transparent opacity-50 hover:opacity-80"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`font-mono text-xs ${isActive ? "text-primary" : "text-gray-400 dark:text-zinc-500"}`}>{s.k}</span>
                          <span className="font-display text-xl font-semibold text-gray-900 dark:text-white">{s.title}</span>
                          <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400 dark:text-zinc-500">{s.chip}</span>
                        </span>
                        <motion.span
                          initial={false}
                          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 30 }}
                          className="block overflow-hidden"
                        >
                          <span className="block pt-2 text-sm leading-relaxed text-gray-500 dark:text-zinc-400">{s.body}</span>
                        </motion.span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-6 h-px w-full overflow-hidden bg-black/[0.08] dark:bg-white/10">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-teal-400 to-cyan-400"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </div>

            <div className="relative h-[420px] lg:col-span-7">
              {STAGES.map((s, i) => (
                <motion.div
                  key={s.k}
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : active > i ? -24 : 24, scale: active === i ? 1 : 0.97 }}
                  transition={SPRING_SURFACE}
                  aria-hidden={active !== i}
                  className={`absolute inset-0 flex items-center justify-center ${active === i ? "" : "pointer-events-none"}`}
                >
                  <Illustration index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ShipStory() {
  const reduce = useReducedMotion();
  const pinned = usePinnedLayout();
  return pinned && !reduce ? <PinnedStory /> : <StackedStory />;
}
