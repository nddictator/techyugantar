"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Stagger, StaggerItem } from "@/components/motion";
import TiltCard from "@/components/ui/TiltCard";
import LiveChart from "@/components/ui/LiveChart";

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
  { label: "Node.js",    icon: "🟩" },
];

const AVATARS = [
  { bg: "#14B8A6", letter: "A" },
  { bg: "#22D3EE", letter: "J" },
  { bg: "#5EEAD4", letter: "M" },
  { bg: "#FBBF24", letter: "R" },
  { bg: "#F472B6", letter: "S" },
];

const SPRING = { type: "spring" as const, stiffness: 55, damping: 20 };

export default function Hero() {
  return (
    <>
      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-cream text-gray-900 dark:bg-obsidian dark:text-white"
      >
        {/* ── Hairline grid ─────────────────────────────────────────────── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right,var(--grid) 1px,transparent 1px),linear-gradient(to bottom,var(--grid) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 75% 60% at 50% 30%, black 30%, transparent 82%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 30%, black 30%, transparent 82%)",
            ["--grid" as string]: "rgba(15,23,35,0.045)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden dark:block"
          style={{
            backgroundImage:
              "linear-gradient(to right,rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.05) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 75% 60% at 50% 30%, black 30%, transparent 82%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 30%, black 30%, transparent 82%)",
          }}
        />

        {/* ── Aurora glow meshes ────────────────────────────────────────── */}
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 motion-safe:animate-[aurora-drift_14s_ease-in-out_infinite]">
          <div className="h-[560px] w-[900px] rounded-full blur-[130px]"
            style={{ background: "radial-gradient(ellipse at center, rgba(45,212,191,0.22), transparent 70%)" }} />
        </div>
        <div aria-hidden className="pointer-events-none absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute top-1/3 -right-40 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.10), transparent 70%)" }} />

        {/* ── Content ───────────────────────────────────────────────────── */}
        <div className="container relative flex flex-col items-center pt-36 pb-10 text-center">
          <Stagger immediate staggerDelay={0.1}>
            {/* Announcement pill */}
            <StaggerItem>
              <Link
                href="/projects"
                className="mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-sm backdrop-blur-sm transition-colors
                  border border-black/[0.08] bg-white/70 text-gray-600 hover:text-gray-900 shadow-sm
                  dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:text-white dark:shadow-none"
                data-testid="hero-announcement-pill"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
                </span>
                Now serving 50+ businesses globally
                <svg className="h-3.5 w-3.5 text-gray-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </StaggerItem>

            {/* Headline */}
            <StaggerItem>
              <h1 className="font-display mb-6 text-5xl font-semibold leading-[1.02] tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl xl:text-[5.75rem]">
                We Build Software
                <br />
                <span className="text-aurora">That Ships.</span>
              </h1>
            </StaggerItem>

            {/* Subtext */}
            <StaggerItem>
              <p className="mb-10 max-w-2xl text-base leading-relaxed text-gray-500 dark:text-zinc-400 sm:text-lg">
                Tech Yugantar crafts world-class web apps, mobile products, and AI systems —
                from Varanasi to the global stage. Your vision, our precision.
              </p>
            </StaggerItem>

            {/* CTAs */}
            <StaggerItem>
              <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  data-testid="hero-start-project-btn"
                  className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white
                    bg-gradient-to-b from-teal-400 to-teal-600
                    shadow-[0_0_30px_rgba(45,212,191,0.4)] hover:shadow-[0_0_48px_rgba(45,212,191,0.6)]
                    hover:scale-[1.04] active:scale-95 transition-all duration-300"
                >
                  Start a Project
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <Link
                  href="/projects"
                  data-testid="hero-view-work-btn"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300
                    border border-black/[0.08] bg-white text-gray-700 hover:text-gray-900 shadow-sm hover:shadow
                    dark:border-white/[0.12] dark:bg-white/[0.05] dark:text-zinc-200 dark:hover:bg-white/[0.09] dark:hover:text-white dark:shadow-none"
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
                    <div key={i} style={{ background: av.bg }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold text-white shadow-md border-cream dark:border-obsidian">
                      {av.letter}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="mb-0.5 flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">
                    Trusted by <span className="font-semibold text-gray-800 dark:text-zinc-200">50+</span> businesses
                  </p>
                </div>
              </div>
            </StaggerItem>
          </Stagger>

          {/* ── Browser mockup + floating illustration ─────────────────── */}
          <motion.div
            className="relative w-full max-w-5xl"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.8 }}
          >
            <TiltCard maxTilt={3} perspective={1800} className="w-full">
              <div className="overflow-hidden rounded-2xl border bg-white shadow-[0_30px_90px_rgba(0,0,0,0.14)]
                border-black/[0.06] dark:border-white/[0.08] dark:bg-gray-dark dark:shadow-[0_50px_140px_rgba(0,0,0,0.9)]">
                <div className="flex items-center gap-2 border-b px-4 py-3 border-black/[0.05] bg-cream-100
                  dark:border-white/[0.06] dark:bg-white/[0.03]">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400 dark:bg-red-500/90" />
                    <div className="h-3 w-3 rounded-full bg-amber-400 dark:bg-amber-500/90" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400 dark:bg-emerald-500/90" />
                  </div>
                  <div className="mx-auto flex h-6 w-52 items-center justify-center gap-1.5 rounded-md px-3
                    border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-white/[0.04]">
                    <svg className="h-2.5 w-2.5 text-gray-400 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[11px] text-gray-500 dark:text-zinc-400">techyugantar.in</span>
                  </div>
                </div>

                <div className="relative h-[340px] overflow-hidden md:h-[440px]">
                  <Image
                    src="/images/projects/loexa.webp"
                    alt="Tech Yugantar — featured project preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 1024px"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-gray-dark dark:to-transparent" />

                  {/* Client rating badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute left-4 top-4 flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 shadow-lg backdrop-blur-md"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400">Client Rating</p>
                      <p className="text-sm font-bold text-white">4.9 / 5.0</p>
                    </div>
                  </motion.div>

                  {/* Projects shipped badge */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6, type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute right-4 top-4 flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 shadow-lg backdrop-blur-md"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/20 text-teal-300">
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

            {/* Floating LiveChart card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.8, type: "spring", stiffness: 140, damping: 18 }}
              className="absolute -bottom-10 -left-4 hidden w-64 md:block lg:-left-16 motion-safe:animate-[float-soft_6s_ease-in-out_infinite]"
            >
              <LiveChart />
            </motion.div>

            <div aria-hidden className="pointer-events-none mx-auto mt-0 h-20 w-3/4 -translate-y-4 rounded-full bg-teal-500/10 blur-3xl dark:bg-teal-500/20" />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent dark:from-gray-dark dark:to-transparent" />
      </section>

      {/* ── Tech stack ticker ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-y py-4 border-black/[0.05] bg-white dark:border-white/[0.05] dark:bg-gray-dark">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent dark:from-gray-dark" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent dark:from-gray-dark" />
        <div className="flex animate-[ticker_32s_linear_infinite] whitespace-nowrap" style={{ width: "max-content" }}>
          {[...STACK, ...STACK].map((item, i) => (
            <div key={i} className="mx-6 flex items-center gap-2.5 text-sm font-medium text-gray-500 dark:text-zinc-500">
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
