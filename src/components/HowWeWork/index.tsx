"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useLenis } from "lenis/react";
import { FiArrowRight } from "react-icons/fi";
import {
  LuBlocks, LuClipboardList, LuCode, LuFlaskConical, LuPalette, LuPhoneCall, LuRefreshCw, LuRocket,
} from "react-icons/lu";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { SPRING_HOVER, SPRING_REVEAL, SPRING_SURFACE } from "@/components/ui/utils";
import SectionHeading from "./SectionHeading";

// ── Process steps ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    n: "01",
    Icon: LuPhoneCall,
    title: "Discovery Call",
    summary: "We listen before we build.",
    desc: "You share your idea, goals, and constraints. We ask the right questions to understand scope, timeline, and budget — no templates, no generic forms.",
    tag: "Day 1",
    deliverables: ["Scope & goals", "Timeline + budget fit"],
  },
  {
    n: "02",
    Icon: LuClipboardList,
    title: "Requirement Analysis",
    summary: "Everything documented — nothing assumed.",
    desc: "We prepare a detailed SRS covering user stories, functional requirements, API contracts, and edge cases. You sign off before development begins.",
    tag: "Week 1",
    deliverables: ["SRS document", "User stories", "API contracts"],
  },
  {
    n: "03",
    Icon: LuBlocks,
    title: "Architecture & Planning",
    summary: "Design the system before writing a line of code.",
    desc: "Tech stack selection, database schema, system architecture, and a full sprint roadmap with milestones. You see the blueprint before work starts.",
    tag: "Week 1–2",
    deliverables: ["Tech stack", "Database schema", "Sprint roadmap"],
  },
  {
    n: "04",
    Icon: LuPalette,
    title: "UI / UX Design",
    summary: "From wireframe to pixel-perfect Figma — your approval first.",
    desc: "We design every screen, user flow, and component in Figma. You review and approve before development. Zero surprises in the final product.",
    tag: "Week 2–3",
    deliverables: ["Wireframes", "Hi-fi Figma screens", "User flows"],
  },
  {
    n: "05",
    Icon: LuCode,
    title: "Agile Development",
    summary: "Two-week sprints. Real demos. Full visibility.",
    desc: "We ship working features every sprint. You attend demo calls, give feedback, and see your product come to life — not just progress reports in a doc.",
    tag: "Ongoing",
    deliverables: ["Working builds", "Sprint demos"],
  },
  {
    n: "06",
    Icon: LuFlaskConical,
    title: "Quality Assurance",
    summary: "Automated + manual testing across every surface.",
    desc: "Unit tests, integration tests, cross-browser and device testing, and a full QA round before any build reaches production. We find bugs so your users don't.",
    tag: "Per Sprint",
    deliverables: ["Automated tests", "Cross-device QA"],
  },
  {
    n: "07",
    Icon: LuRocket,
    title: "Deployment & Launch",
    summary: "Zero-downtime launch with full monitoring.",
    desc: "CI/CD pipeline, staging environment validation, then production launch. We set up error tracking, uptime monitoring, and make sure everything runs smoothly.",
    tag: "Launch Day",
    deliverables: ["CI/CD pipeline", "Staging", "Monitoring"],
  },
  {
    n: "08",
    Icon: LuRefreshCw,
    title: "Support & Growth",
    summary: "30-day warranty. Then grow together.",
    desc: "30 days of post-launch support included. After that — ongoing retainer sprints, feature additions, or performance scaling as your product grows.",
    tag: "Post-Launch",
    deliverables: ["30-day warranty", "Retainer sprints"],
  },
];

type Step = (typeof STEPS)[number];

// ── Step row ──────────────────────────────────────────────────────────────────
function StepRow({ step, isActive, isDone, onEnter }: { step: Step; isActive: boolean; isDone: boolean; onEnter: () => void }) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      id={`step-${step.n}`}
      // A thin band across the middle of the viewport decides which step is "current".
      onViewportEnter={onEnter}
      viewport={{ margin: "-45% 0px -45% 0px" }}
      className="relative scroll-mt-32 pl-12 md:pl-20"
    >
      {/* Rail node */}
      <span aria-hidden className="absolute left-[11px] top-8 flex h-[18px] w-[18px] -translate-x-1/2 items-center justify-center md:left-[19px]">
        <motion.span
          animate={{ scale: isActive ? 1 : 0.6 }}
          transition={SPRING_HOVER}
          className={`h-full w-full rounded-full border-2 transition-colors duration-300 ${
            isDone || isActive
              ? "border-primary bg-primary shadow-[0_0_18px_rgba(45,212,191,0.6)]"
              : "border-black/15 bg-cream dark:border-white/20 dark:bg-obsidian"
          }`}
        />
      </span>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={SPRING_REVEAL}
      >
        <SpotlightCard
          className={`p-6 transition-[border-color,box-shadow] duration-500 md:p-8 ${
            isActive
              ? "border-primary/30! shadow-[0_20px_60px_rgba(45,212,191,0.12)]"
              : ""
          }`}
        >
          <div className="flex items-start justify-between gap-6">
            <span
              aria-hidden
              className={`font-display text-5xl font-semibold leading-none tracking-tight text-transparent transition-colors duration-500 md:text-6xl ${
                isActive ? "[-webkit-text-stroke:1.5px_var(--color-primary)]" : "[-webkit-text-stroke:1.5px_rgba(120,120,120,0.35)]"
              }`}
            >
              {step.n}
            </span>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-black/[0.08] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-gray-500 dark:border-white/[0.1] dark:text-zinc-400">
                {step.tag}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                <step.Icon aria-hidden className="h-[18px] w-[18px]" />
              </span>
            </div>
          </div>

          <h3 className="font-display mt-6 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            <span className="sr-only">Step {step.n}: </span>
            {step.title}
          </h3>
          <p className="mt-1.5 text-sm font-medium text-primary">{step.summary}</p>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-gray-500 dark:text-zinc-400">{step.desc}</p>

          <ul className="mt-6 flex flex-wrap gap-2 border-t border-black/[0.06] pt-5 dark:border-white/[0.06]" aria-label="What you get">
            {step.deliverables.map((d) => (
              <li
                key={d}
                className="inline-flex items-center gap-1.5 rounded-lg bg-black/[0.03] px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-white/[0.04] dark:text-zinc-300"
              >
                <span aria-hidden className="h-1 w-1 rounded-full bg-primary" />
                {d}
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </motion.div>
    </motion.li>
  );
}

// ── Sticky progress panel (desktop) ───────────────────────────────────────────
function ProgressPanel({ active, onJump }: { active: number; onJump: (i: number) => void }) {
  const reduce = useReducedMotion();
  const step = STEPS[active];

  return (
    <div className="sticky top-32">
      <div className="flex items-baseline gap-3">
        <div className="relative h-[5.5rem] w-[7rem] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={step.n}
              initial={reduce ? false : { y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
              transition={SPRING_SURFACE}
              className="font-display absolute inset-0 text-[5.5rem] font-semibold leading-none tracking-tight text-aurora"
            >
              {step.n}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="font-mono text-sm text-gray-400 dark:text-zinc-600">/ {String(STEPS.length).padStart(2, "0")}</span>
      </div>

      <nav aria-label="Process steps" className="mt-8">
        <ol className="space-y-0.5">
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.n}>
                <button
                  type="button"
                  onClick={() => onJump(i)}
                  aria-current={isActive ? "step" : undefined}
                  className={`relative flex w-full items-center gap-4 rounded-xl px-4 py-2.5 text-left text-sm transition-colors duration-300 ${
                    isActive ? "text-gray-900 dark:text-white" : "text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="process-active-step"
                      transition={SPRING_HOVER}
                      className="absolute inset-0 rounded-xl border border-black/[0.06] bg-white/80 shadow-[0_8px_24px_rgba(6,8,15,0.06)] backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-none"
                    />
                  )}
                  <span className={`relative font-mono text-xs ${isActive ? "text-primary" : ""}`}>{s.n}</span>
                  <span className="relative font-medium">{s.title}</span>
                  <span className="relative ml-auto font-mono text-[11px] text-gray-400 dark:text-zinc-600">{s.tag}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <Link
        href="/contact"
        className="group mt-8 inline-flex items-center gap-2 px-4 text-sm font-semibold text-primary"
      >
        Start with step 01
        <FiArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HowWeWork() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const lenis = useLenis();

  // Rail fill tracks how far the reader has scrolled through the steps.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] });
  const railFill = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });

  const jumpTo = (i: number) => {
    const el = document.getElementById(`step-${STEPS[i].n}`);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -128, immediate: !!reduce });
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section className="relative py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[560px] w-[560px] rounded-full bg-teal-500/[0.06] blur-3xl" />

      <div className="container relative">
        <SectionHeading
          kicker="01 — The process"
          title={
            <>
              From idea to <span className="text-aurora">shipped product.</span>
            </>
          }
          description="Every engagement follows the same eight steps. You always know where your project stands, what you'll receive, and what comes next."
        />

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="hidden lg:col-span-4 lg:block">
            <ProgressPanel active={active} onJump={jumpTo} />
          </div>

          <div className="relative lg:col-span-8">
            {/* Rail: faint track + scroll-driven aurora fill */}
            <div aria-hidden className="absolute bottom-0 left-[11px] top-8 w-px bg-black/[0.08] md:left-[19px] dark:bg-white/[0.08]" />
            <motion.div
              aria-hidden
              style={{ scaleY: reduce ? 1 : railFill }}
              className="absolute bottom-0 left-[11px] top-8 w-px origin-top bg-gradient-to-b from-teal-300 via-primary to-cyan-400 shadow-[0_0_12px_rgba(45,212,191,0.7)] md:left-[19px]"
            />

            <ol ref={listRef} className="space-y-6 md:space-y-8">
              {STEPS.map((step, i) => (
                <StepRow
                  key={step.n}
                  step={step}
                  isActive={i === active}
                  isDone={i < active}
                  onEnter={() => setActive(i)}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
