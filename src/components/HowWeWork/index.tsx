"use client";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion";

// ── Process steps ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    n: "01",
    emoji: "📞",
    title: "Discovery Call",
    summary: "We listen before we build.",
    desc: "You share your idea, goals, and constraints. We ask the right questions to understand scope, timeline, and budget — no templates, no generic forms.",
    tag: "Day 1",
    color: "from-teal-500/20 to-cyan-500/10",
    border: "border-teal-500/20",
    accent: "bg-teal-500/10 text-teal-400",
  },
  {
    n: "02",
    emoji: "📋",
    title: "Requirement Analysis",
    summary: "Everything documented — nothing assumed.",
    desc: "We prepare a detailed SRS covering user stories, functional requirements, API contracts, and edge cases. You sign off before development begins.",
    tag: "Week 1",
    color: "from-blue-500/20 to-indigo-500/10",
    border: "border-blue-500/20",
    accent: "bg-blue-500/10 text-blue-400",
  },
  {
    n: "03",
    emoji: "🏗️",
    title: "Architecture & Planning",
    summary: "Design the system before writing a line of code.",
    desc: "Tech stack selection, database schema, system architecture, and a full sprint roadmap with milestones. You see the blueprint before work starts.",
    tag: "Week 1–2",
    color: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/20",
    accent: "bg-violet-500/10 text-violet-400",
  },
  {
    n: "04",
    emoji: "🎨",
    title: "UI / UX Design",
    summary: "From wireframe to pixel-perfect Figma — your approval first.",
    desc: "We design every screen, user flow, and component in Figma. You review and approve before development. Zero surprises in the final product.",
    tag: "Week 2–3",
    color: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-500/20",
    accent: "bg-pink-500/10 text-pink-400",
  },
  {
    n: "05",
    emoji: "⚡",
    title: "Agile Development",
    summary: "Two-week sprints. Real demos. Full visibility.",
    desc: "We ship working features every sprint. You attend demo calls, give feedback, and see your product come to life — not just progress reports in a doc.",
    tag: "Ongoing",
    color: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/20",
    accent: "bg-amber-500/10 text-amber-400",
  },
  {
    n: "06",
    emoji: "🧪",
    title: "Quality Assurance",
    summary: "Automated + manual testing across every surface.",
    desc: "Unit tests, integration tests, cross-browser and device testing, and a full QA round before any build reaches production. We find bugs so your users don't.",
    tag: "Per Sprint",
    color: "from-emerald-500/20 to-green-500/10",
    border: "border-emerald-500/20",
    accent: "bg-emerald-500/10 text-emerald-400",
  },
  {
    n: "07",
    emoji: "🚀",
    title: "Deployment & Launch",
    summary: "Zero-downtime launch with full monitoring.",
    desc: "CI/CD pipeline, staging environment validation, then production launch. We set up error tracking, uptime monitoring, and make sure everything runs smoothly.",
    tag: "Launch Day",
    color: "from-sky-500/20 to-cyan-500/10",
    border: "border-sky-500/20",
    accent: "bg-sky-500/10 text-sky-400",
  },
  {
    n: "08",
    emoji: "🔄",
    title: "Support & Growth",
    summary: "30-day warranty. Then grow together.",
    desc: "30 days of post-launch support included. After that — ongoing retainer sprints, feature additions, or performance scaling as your product grows.",
    tag: "Post-Launch",
    color: "from-primary/20 to-teal-500/10",
    border: "border-primary/20",
    accent: "bg-primary/10 text-primary",
  },
];

// ── Step Card ─────────────────────────────────────────────────────────────────
function StepCard({
  step,
  index,
  align,
}: {
  step: typeof STEPS[0];
  index: number;
  align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 60, damping: 18, delay: index * 0.08 }}
      className={`group relative h-full rounded-2xl p-6 border transition-all duration-300
        bg-white shadow-sm hover:shadow-md
        dark:bg-zinc-900/60 dark:hover:bg-zinc-900
        border-gray-100 hover:border-primary/20
        dark:border-white/[0.07] dark:hover:border-primary/30
        ${align === "right" ? "md:text-left" : "md:text-right"}
      `}
    >
      {/* Top highlight shimmer on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Gradient background blob */}
      <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

      <div className="relative">
        {/* Emoji */}
        <div className={`mb-3 text-3xl ${align === "right" ? "" : "md:ml-auto md:mr-0 w-fit"}`}>
          {step.emoji}
        </div>

        {/* Time tag */}
        <span className={`mb-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${step.accent}`}>
          {step.tag}
        </span>

        {/* Title */}
        <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
          {step.title}
        </h3>

        {/* Summary */}
        <p className="mb-2 text-sm font-medium text-primary">
          {step.summary}
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HowWeWork() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-28">
      {/* Section background */}
      <div className="pointer-events-none absolute inset-0
        bg-gradient-to-b from-gray-50 via-white to-gray-50
        dark:from-zinc-950 dark:via-zinc-900/40 dark:to-zinc-950" />

      {/* Top shimmer */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container relative">

        {/* Header */}
        <Reveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium
              border-gray-200 bg-white text-gray-600
              dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Our Process
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              From Idea to{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg,#399D91,#22D3EE)" }}>
                Shipped Product
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 dark:text-zinc-400">
              8 steps. Zero guesswork. You always know exactly where your project stands and what comes next.
            </p>
          </div>
        </Reveal>

        {/* ── Timeline ─────────────────────────────────────────────────────── */}
        <div className="relative">

          {/* ── DESKTOP alternating layout ─────────────────────────────────── */}
          <div className="hidden md:block">
            {/* Central vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/25 to-transparent" />

            <div className="space-y-12">
              {STEPS.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={step.n} className="relative grid grid-cols-[1fr_80px_1fr] items-center gap-0">

                    {/* Left card or empty */}
                    <div className="pr-8">
                      {isLeft && <StepCard step={step} index={i} align="left" />}
                    </div>

                    {/* Center badge */}
                    <div className="flex flex-col items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.08 + 0.05 }}
                        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full
                          border-2 font-bold text-sm shadow-[0_0_16px_rgba(57,157,145,0.25)]
                          bg-white border-primary text-primary
                          dark:bg-zinc-900 dark:border-primary dark:text-primary"
                      >
                        {step.n}
                        {/* Pulse ring */}
                        <span className="absolute inset-0 animate-ping rounded-full border border-primary/30 opacity-60" />
                      </motion.div>
                    </div>

                    {/* Right card or empty */}
                    <div className="pl-8">
                      {!isLeft && <StepCard step={step} index={i} align="right" />}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* ── MOBILE vertical list ───────────────────────────────────────── */}
          <div className="md:hidden">
            {/* Left border line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent" />

            <div className="space-y-8">
              {STEPS.map((step, i) => (
                <div key={step.n} className="relative flex gap-6">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.06 }}
                    className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full
                      border-2 font-bold text-xs shadow-md
                      bg-white border-primary text-primary
                      dark:bg-zinc-900 dark:border-primary dark:text-primary"
                  >
                    {step.n}
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 70, damping: 18, delay: i * 0.06 + 0.05 }}
                    className="flex-1 rounded-2xl border p-5
                      bg-white border-gray-100 shadow-sm
                      dark:bg-zinc-900/60 dark:border-white/[0.07]"
                  >
                    <div className="mb-2 text-2xl">{step.emoji}</div>
                    <span className={`mb-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${step.accent}`}>
                      {step.tag}
                    </span>
                    <h3 className="mb-1 text-base font-bold text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="mb-1 text-xs font-medium text-primary">{step.summary}</p>
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-zinc-400">{step.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA at bottom */}
        <Reveal className="mt-16 text-center" delay={0.1}>
          <p className="mb-4 text-sm text-gray-500 dark:text-zinc-400">
            Ready to start your project?
          </p>
          <a
            href="/contact"
            className="
              inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white
              bg-gradient-to-b from-primary/80 to-primary
              shadow-[0_0_24px_rgba(57,157,145,0.35)]
              hover:shadow-[0_0_40px_rgba(57,157,145,0.55)] hover:scale-105
              transition-all duration-300
            "
          >
            Book a Discovery Call
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </Reveal>

      </div>

      {/* Bottom shimmer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
