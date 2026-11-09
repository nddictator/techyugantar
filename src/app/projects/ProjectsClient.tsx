"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import { projectsData } from "@/components/Projects/projectsData";
import ProjectShowcaseRow from "@/components/Projects/ProjectShowcaseRow";
import caseStudiesData from "@/data/caseStudies";
import { Reveal } from "@/components/motion";
import { SPRING_HOVER, SPRING_REVEAL } from "@/components/ui/utils";

const ALL = "All";

// Curated filters — a handful of meaningful categories instead of every raw tag.
const CATEGORIES: { label: string; tags: string[] }[] = [
  { label: "Web platforms", tags: ["Next.js", "React", "Web App", "Full-stack", "Node.js"] },
  { label: "AI", tags: ["AI"] },
  { label: "EdTech", tags: ["Education"] },
  { label: "Healthcare", tags: ["Healthcare", "Ayurveda"] },
  { label: "Astrology", tags: ["Astrology", "Vedic"] },
];

const caseStudyFor = (slug?: string) => caseStudiesData.find((c) => c.slug === slug);

export default function ProjectsClient() {
  const filters = useMemo(
    () => [
      ALL,
      ...CATEGORIES.filter((c) => projectsData.some((p) => p.tags.some((t) => c.tags.includes(t)))).map((c) => c.label),
    ],
    [],
  );
  const [active, setActive] = useState(ALL);

  const filtered = useMemo(() => {
    if (active === ALL) return projectsData;
    const cat = CATEGORIES.find((c) => c.label === active);
    return projectsData.filter((p) => p.tags.some((t) => cat?.tags.includes(t)));
  }, [active]);

  // Stats derived from the data itself — nothing hand-typed.
  const stats = useMemo(() => {
    const industries = new Set(caseStudiesData.map((c) => c.industry.split("/")[0].trim()));
    const live = projectsData.filter((p) => p.liveUrl).length;
    return [
      { value: String(projectsData.length).padStart(2, "0"), label: "Products shipped" },
      { value: String(industries.size).padStart(2, "0"), label: "Industries" },
      { value: `${Math.round((live / projectsData.length) * 100)}%`, label: "Live in production" },
      { value: String(caseStudiesData.length).padStart(2, "0"), label: "Detailed case studies" },
    ];
  }, []);

  return (
    <main className="relative overflow-x-clip pb-24">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-40 h-[560px] w-[560px] rounded-full bg-teal-500/[0.06] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-[60%] h-[480px] w-[480px] rounded-full bg-cyan-400/[0.05] blur-3xl" />

      <div className="container relative">
        {/* ── Stats strip ──────────────────────────────────────────────── */}
        <Reveal>
          <dl className="mt-12 grid grid-cols-2 border-b border-black/[0.07] md:grid-cols-4 dark:border-white/[0.08]">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-6 ${i % 2 === 1 ? "border-l pl-6" : ""} ${i > 0 ? "md:border-l md:pl-6" : ""} border-black/[0.07] dark:border-white/[0.08]`}
              >
                <dd className="font-display text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{s.value}</dd>
                <dt className="mt-1 text-sm text-gray-500 dark:text-zinc-400">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* ── Sticky filter bar ────────────────────────────────────────── */}
        <div className="z-30 -mx-4 mt-8 px-4 py-3 md:sticky md:top-20 md:bg-gradient-to-b md:from-cream md:via-cream/80 md:to-transparent md:pt-4 md:dark:from-obsidian md:dark:via-obsidian/80">
          <div className="flex flex-col gap-3 rounded-2xl border border-black/[0.07] bg-white p-2 pl-4 shadow-[0_10px_30px_rgba(6,8,15,0.08)] md:flex-row md:items-center md:justify-between dark:border-white/[0.08] dark:bg-[#0e1013] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500" aria-live="polite">
              Showing {String(filtered.length).padStart(2, "0")} {filtered.length === 1 ? "project" : "projects"}
            </p>
            <div className="-mx-2 flex gap-1.5 overflow-x-auto px-2 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0" role="tablist" aria-label="Filter projects">
              {filters.map((tag) => {
                const isActive = tag === active;
                return (
                  <button
                    key={tag}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(tag)}
                    className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="projects-filter-pill"
                        transition={SPRING_HOVER}
                        className="absolute inset-0 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 shadow-[0_0_16px_rgba(45,212,191,0.35)]"
                      />
                    )}
                    <span className="relative z-10">{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Work index ───────────────────────────────────────────────── */}
        <div className="mt-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={SPRING_REVEAL}
              >
                <ProjectShowcaseRow
                  project={project}
                  caseStudy={caseStudyFor(project.caseStudySlug)}
                  index={i}
                  total={filtered.length}
                  flip={i % 2 === 1}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="py-24 text-center text-lg text-gray-500 dark:text-zinc-400">No projects match this filter yet.</p>
          )}
        </div>

        {/* ── Closing CTA ──────────────────────────────────────────────── */}
        <Reveal>
          <div className="relative mt-16 overflow-hidden rounded-3xl border border-black/[0.07] bg-white/70 p-8 backdrop-blur-xl md:p-14 dark:border-white/[0.08] dark:bg-white/[0.03]">
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">Next up</p>
                <h2 className="font-display max-w-xl text-3xl font-semibold leading-tight tracking-tight text-gray-900 md:text-5xl dark:text-white">
                  Your product could be <span className="text-aurora">the next one here.</span>
                </h2>
                <p className="mt-4 max-w-lg text-gray-500 dark:text-zinc-400">
                  Tell us what you&apos;re building — we&apos;ll reply within one business day with questions and a rough plan.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-shadow duration-300 hover:shadow-[0_0_48px_rgba(45,212,191,0.6)]"
              >
                Start a project
                <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
