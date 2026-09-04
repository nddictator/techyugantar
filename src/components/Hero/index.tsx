"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Stagger, StaggerItem } from "@/components/motion";
import TiltCard from "@/components/ui/TiltCard";

// ── Tech stack ticker ─────────────────────────────────────────────────────────
const STACK = [
  { label: "Next.js",    icon: "⬛" },
  { label: "React",      icon: "⚛️" },
  { label: "Django",     icon: "🎸" },
  { label: "Python",     icon: "🐍" },
  { label: "TypeScript", icon: "🔷" },
  { label: "Flutter",    icon: "💙" },
  { label: "PostgreSQL", icon: "🐘" },
  { label: "AWS",        icon: "☁️" },
  { label: "Docker",     icon: "🐳" },
  { label: "GraphQL",    icon: "🔴" },
  { label: "Redis",      icon: "🔥" },
  { label: "Tailwind",   icon: "💨" },
];

// ── Avatar data ───────────────────────────────────────────────────────────────
const AVATARS = [
  { bg: "#399D91", letter: "A" },
  { bg: "#22D3EE", letter: "J" },
  { bg: "#818CF8", letter: "M" },
  { bg: "#F59E0B", letter: "R" },
  { bg: "#F472B6", letter: "S" },
];

export default function Hero() {
  return (
    <>
      <section
        id="home"
        className="
          relative min-h-screen overflow-hidden
          bg-gray-50 text-gray-900
          dark:bg-zinc-950 dark:text-white
        "
      >
        {/* ── Grid pattern (light) ─────────────────────────────────────────── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(to right,#00000009 1px,transparent 1px)," +
              "linear-gradient(to bottom,#00000009 1px,transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* ── Grid pattern (dark) ──────────────────────────────────────────── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden dark:block"
          style={{
            backgroundImage:
              "linear-gradient(to right,#80808018 1px,transparent 1px)," +
              "linear-gradient(to bottom,#80808018 1px,transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* ── Radial glow — top-center (light) ────────────────────────────── */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 inset-x-0 flex justify-center dark:hidden"
        >
          <div
            className="w-full max-w-3xl h-[600px]"
            style={{
              background:
                "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(57,157,145,0.12), transparent 70%)",
            }}
          />
        </div>
        {/* ── Radial glow — top-center (dark) ─────────────────────────────── */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 inset-x-0 hidden dark:flex justify-center"
        >
          <div
            className="w-full max-w-3xl h-[700px]"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 50% -5%, rgba(57,157,145,0.28), transparent 70%)",
            }}
          />
        </div>

        {/* ── Side accent blobs ────────────────────────────────────────────── */}
        <div aria-hidden className="pointer-events-none absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl dark:bg-primary/8" />
        <div aria-hidden className="pointer-events-none absolute top-1/3 -right-40 w-80 h-80 rounded-full bg-cyan-400/5 blur-3xl dark:bg-cyan-400/6" />

        {/* ── Main content — centered ───────────────────────────────────────── */}
        <div className="container relative flex flex-col items-center pt-32 pb-8 text-center">

          <Stagger immediate staggerDelay={0.1}>

            {/* Announcement pill */}
            <StaggerItem>
              <Link
                href="/projects"
                className="
                  mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-sm backdrop-blur-sm
                  transition-colors
                  border border-gray-200 bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900 shadow-sm
                  dark:border-white/[0.12] dark:bg-white/[0.05] dark:text-zinc-300 dark:hover:bg-white/[0.08] dark:hover:text-white dark:shadow-none
                "
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Now serving 50+ businesses globally
                <svg className="h-3.5 w-3.5 text-gray-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </StaggerItem>

            {/* Headline */}
            <StaggerItem>
              <h1 className="mb-6 text-5xl font-extrabold leading-[1.06] tracking-tight
                text-gray-900 dark:text-white
                sm:text-6xl md:text-7xl xl:text-[5.5rem]">
                We Build Software
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #399D91 0%, #2BC0B4 35%, #22D3EE 65%, #67E8F9 100%)",
                  }}
                >
                  That Ships.
                </span>
              </h1>
            </StaggerItem>

            {/* Subtext */}
            <StaggerItem>
              <p className="mb-10 max-w-2xl text-base leading-relaxed sm:text-lg
                text-gray-500 dark:text-zinc-400">
                Tech Yugantar crafts world-class web apps, mobile products, and AI systems —
                from Varanasi to the global stage. Your vision, our precision.
              </p>
            </StaggerItem>

            {/* CTAs */}
            <StaggerItem>
              <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="
                    inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white
                    border border-t-primary/60 border-white/10
                    bg-gradient-to-b from-primary/80 to-primary
                    shadow-[0_0_24px_rgba(57,157,145,0.35)]
                    hover:shadow-[0_0_40px_rgba(57,157,145,0.55)]
                    hover:scale-105 active:scale-95
                    transition-all duration-300
                  "
                >
                  Start a Project
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <Link
                  href="/projects"
                  className="
                    inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold
                    transition-all duration-300
                    border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-sm hover:shadow
                    dark:border-white/[0.12] dark:bg-white/[0.06] dark:text-zinc-200 dark:hover:bg-white/[0.1] dark:hover:text-white dark:shadow-none
                  "
                >
                  View Our Work
                </Link>
              </div>
            </StaggerItem>

            {/* Social proof */}
            <StaggerItem>
              <div className="mb-16 flex items-center justify-center gap-4">
                <div className="flex -space-x-2.5">
                  {AVATARS.map((av, i) => (
                    <div
                      key={i}
                      style={{ background: av.bg }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold text-white shadow-md
                        border-gray-50 dark:border-zinc-950"
                    >
                      {av.letter}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="mb-0.5 flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">
                    Trusted by <span className="font-medium text-gray-800 dark:text-zinc-200">50+</span> businesses
                  </p>
                </div>
              </div>
            </StaggerItem>

          </Stagger>

          {/* ── Browser mockup ─────────────────────────────────────────────── */}
          <motion.div
            className="w-full max-w-5xl"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 55, damping: 20, delay: 0.8 }}
          >
            <TiltCard maxTilt={3} perspective={1800} className="w-full">
              <div className="overflow-hidden rounded-2xl
                border bg-white shadow-[0_24px_80px_rgba(0,0,0,0.12)]
                dark:border-white/[0.08] dark:bg-zinc-900 dark:shadow-[0_40px_120px_rgba(0,0,0,0.9)]
                border-gray-200">
                {/* Window chrome */}
                <div className="flex items-center gap-2 border-b px-4 py-3
                  border-gray-100 bg-gray-50
                  dark:border-white/[0.06] dark:bg-zinc-800/60">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400 dark:bg-red-500/90" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400 dark:bg-yellow-500/90" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400 dark:bg-emerald-500/90" />
                  </div>
                  {/* URL bar */}
                  <div className="mx-auto flex h-6 w-52 items-center justify-center gap-1.5 rounded-md px-3
                    border border-gray-200 bg-white
                    dark:border-white/[0.08] dark:bg-zinc-700/50">
                    <svg className="h-2.5 w-2.5 text-gray-400 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[11px] text-gray-500 dark:text-zinc-400">techyugantar.in</span>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="relative h-[340px] overflow-hidden md:h-[440px]">
                  <Image
                    src="/images/projects/loexa.webp"
                    alt="Tech Yugantar — featured project preview"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24
                    bg-gradient-to-t from-white to-transparent
                    dark:from-zinc-900 dark:to-transparent" />

                  {/* Floating stat badges */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4, type: "spring" as const, stiffness: 200, damping: 20 }}
                    className="absolute left-4 top-4 flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 backdrop-blur-md shadow-lg"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400">Client Rating</p>
                      <p className="text-sm font-bold text-white">4.9 / 5.0</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6, type: "spring" as const, stiffness: 200, damping: 20 }}
                    className="absolute right-4 top-4 flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 backdrop-blur-md shadow-lg"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400">Projects Shipped</p>
                      <p className="text-sm font-bold text-white">50+</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </TiltCard>

            {/* Glow under mockup */}
            <div aria-hidden className="pointer-events-none mx-auto mt-0 h-20 w-3/4 rounded-full -translate-y-4
              bg-primary/8 blur-3xl dark:bg-primary/15" />
          </motion.div>
        </div>

        {/* ── Bottom fade ───────────────────────────────────────────────────── */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32
          bg-gradient-to-t from-white to-transparent
          dark:from-[#18181b] dark:to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TECH STACK TICKER
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y py-4
        border-gray-100 bg-white
        dark:border-white/[0.05] dark:bg-[#18181b]">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10
          bg-gradient-to-r from-white to-transparent dark:from-[#18181b]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10
          bg-gradient-to-l from-white to-transparent dark:from-[#18181b]" />

        <div
          className="flex animate-[ticker_32s_linear_infinite] whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {[...STACK, ...STACK].map((item, i) => (
            <div
              key={i}
              className="mx-6 flex items-center gap-2.5 text-sm font-medium
                text-gray-500 dark:text-zinc-500"
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
              <span className="mx-2 h-1 w-1 rounded-full bg-gray-300 dark:bg-zinc-700" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
