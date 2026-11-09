"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion } from "motion/react";
import { Stagger, StaggerItem } from "@/components/motion";
import HeroStack from "./HeroStack";
import { SPRING_HOVER, SPRING_REVEAL } from "@/components/ui/utils";
import type { IconType } from "react-icons";
import {
  SiDjango, SiDocker, SiFlutter, SiGraphql, SiNextdotjs, SiNodedotjs,
  SiPostgresql, SiPython, SiReact, SiRedis, SiTailwindcss, SiTypescript,
} from "react-icons/si";
// Simple Icons dropped the AWS and OpenAI marks (react-icons ≥5.6), so these come from other sets.
import { FaAws } from "react-icons/fa";
import { RiOpenaiFill } from "react-icons/ri";

const MotionLink = motion.create(Link);

// ── Tech stack ticker ─────────────────────────────────────────────────────────
const STACK: { label: string; Icon: IconType; brand?: string }[] = [
  { label: "Next.js",    Icon: SiNextdotjs },
  { label: "React",      Icon: SiReact,             brand: "#61DAFB" },
  { label: "Django",     Icon: SiDjango,            brand: "#44B78B" },
  { label: "Python",     Icon: SiPython,            brand: "#3776AB" },
  { label: "TypeScript", Icon: SiTypescript,        brand: "#3178C6" },
  { label: "Flutter",    Icon: SiFlutter,           brand: "#02569B" },
  { label: "OpenAI",     Icon: RiOpenaiFill },
  { label: "PostgreSQL", Icon: SiPostgresql,        brand: "#4169E1" },
  { label: "AWS",        Icon: FaAws, brand: "#FF9900" },
  { label: "Docker",     Icon: SiDocker,            brand: "#2496ED" },
  { label: "GraphQL",    Icon: SiGraphql,           brand: "#E10098" },
  { label: "Redis",      Icon: SiRedis,             brand: "#DC382D" },
  { label: "Tailwind",   Icon: SiTailwindcss,       brand: "#06B6D4" },
  { label: "Node.js",    Icon: SiNodedotjs,         brand: "#5FA04E" },
];

const AVATARS = [
  { bg: "#14B8A6", letter: "A" },
  { bg: "#22D3EE", letter: "J" },
  { bg: "#5EEAD4", letter: "M" },
  { bg: "#FBBF24", letter: "R" },
  { bg: "#F472B6", letter: "S" },
];


const WORDS = ["web apps", "mobile apps", "AI systems", "ERP platforms"];
const LONGEST = WORDS.reduce((a, b) => (b.length > a.length ? b : a));

const STAR =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

/** Cycles through what we build. The longest word reserves the width so the line never reflows. */
function RotatingWord() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative -mb-[0.14em] inline-grid overflow-hidden pb-[0.14em] align-bottom">
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">{LONGEST}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={WORDS[index]}
          className="text-aurora col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: "70%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-70%", opacity: 0, filter: "blur(8px)" }}
          transition={SPRING_REVEAL}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  // Pointer position over the hero, normalised to -0.5 → 0.5. Drives the stack parallax.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const reduce = useReducedMotion();

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <>
      <section
        id="home"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative overflow-hidden bg-cream text-gray-900 dark:bg-obsidian dark:text-white"
      >
        {/* ── Hairline grid (one layer, theme-aware via CSS var) ─────────── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [--grid:rgba(15,23,35,0.045)] dark:[--grid:rgba(255,255,255,0.05)]"
          style={{
            backgroundImage:
              "linear-gradient(to right,var(--grid) 1px,transparent 1px),linear-gradient(to bottom,var(--grid) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 60% at 70% 35%, black 25%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 70% 35%, black 25%, transparent 80%)",
          }}
        />

        {/* ── Aurora mesh — anchored behind the stack, not the copy ─────── */}
        <div aria-hidden className="pointer-events-none absolute -top-48 right-[-10%] motion-safe:animate-[aurora-drift_14s_ease-in-out_infinite]">
          <div className="h-[620px] w-[820px] rounded-full blur-[130px]"
            style={{ background: "radial-gradient(ellipse at center, rgba(45,212,191,0.22), transparent 70%)" }} />
        </div>
        <div aria-hidden className="pointer-events-none absolute bottom-0 -left-40 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.08), transparent 70%)" }} />

        {/* ── Content ───────────────────────────────────────────────────── */}
        <div className="container relative grid min-h-[100svh] grid-cols-1 items-center gap-14 pt-32 pb-20 lg:grid-cols-12 lg:gap-8 lg:pt-28">
          <Stagger immediate className="lg:col-span-6 xl:col-span-6">
            {/* Announcement pill */}
            <StaggerItem>
              <Link
                href="/projects"
                className="mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm backdrop-blur-sm transition-colors
                  border border-black/[0.08] bg-white/70 text-gray-600 hover:text-gray-900 shadow-sm
                  dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:text-white dark:shadow-none"
                data-testid="hero-announcement-pill"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 motion-safe:animate-ping" />
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
              {/* Crawlers and screen readers get one clean sentence; the animated version is decorative. */}
              <h1 className="sr-only">We build web apps, mobile apps, AI systems and ERP platforms that ship.</h1>
              <p
                aria-hidden
                className="font-display mb-7 text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-gray-900 dark:text-white sm:text-6xl xl:text-[4.75rem]"
              >
                We build
                <br />
                <RotatingWord />
                <br />
                that ship.
              </p>
            </StaggerItem>

            {/* Subtext */}
            <StaggerItem>
              <p className="mb-10 max-w-xl text-base leading-relaxed text-gray-500 dark:text-zinc-400 sm:text-lg">
                Tech Yugantar crafts world-class web apps, mobile products, and AI systems —
                from Varanasi to the global stage. Your vision, our precision.
              </p>
            </StaggerItem>

            {/* CTAs */}
            <StaggerItem>
              <div className="mb-10 flex flex-wrap items-center gap-4">
                <MotionLink
                  href="/contact"
                  data-testid="hero-start-project-btn"
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  transition={SPRING_HOVER}
                  className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white
                    bg-gradient-to-b from-teal-400 to-teal-600
                    shadow-[0_0_30px_rgba(45,212,191,0.4)] hover:shadow-[0_0_48px_rgba(45,212,191,0.6)]
                    transition-shadow duration-300"
                >
                  Start a Project
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </MotionLink>

                <MotionLink
                  href="/projects"
                  data-testid="hero-view-work-btn"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING_HOVER}
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-[color,background-color,box-shadow] duration-300
                    border border-black/[0.08] bg-white text-gray-700 hover:text-gray-900 shadow-sm hover:shadow
                    dark:border-white/[0.12] dark:bg-white/[0.05] dark:text-zinc-200 dark:hover:bg-white/[0.09] dark:hover:text-white dark:shadow-none"
                >
                  View Our Work
                </MotionLink>
              </div>
            </StaggerItem>

            {/* Social proof */}
            <StaggerItem>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2.5">
                  {AVATARS.map((av, i) => (
                    <div key={i} style={{ background: av.bg }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold text-white shadow-md border-cream dark:border-obsidian">
                      {av.letter}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="mb-0.5 flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                        <path d={STAR} />
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

          {/* ── Layered project stack ─────────────────────────────────── */}
          <div className="lg:col-span-6 xl:col-span-6">
            <HeroStack px={px} py={py} />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent dark:from-gray-dark dark:to-transparent" />
      </section>

      {/* ── Tech stack ticker ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-y py-4 border-black/[0.05] bg-white dark:border-white/[0.05] dark:bg-gray-dark">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent dark:from-gray-dark" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent dark:from-gray-dark" />
        <div
          className="flex whitespace-nowrap motion-safe:animate-[ticker_32s_linear_infinite] hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {[...STACK, ...STACK].map(({ label, Icon, brand }, i) => (
            <div
              key={i}
              aria-hidden={i >= STACK.length || undefined}
              style={brand ? { ["--brand" as string]: brand } : undefined}
              className="group mx-7 flex items-center gap-2.5 text-sm font-medium tracking-tight text-gray-400 transition-colors duration-300
                hover:text-gray-900 dark:text-zinc-500 dark:hover:text-white"
            >
              <Icon
                aria-hidden
                className="h-[18px] w-[18px] shrink-0 transition-colors duration-300 group-hover:text-[var(--brand,currentColor)]"
              />
              {label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
