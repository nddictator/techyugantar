"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projectsData } from "@/components/Projects/projectsData";
import SingleProject from "@/components/Projects/SingleProject";
import GlowingBadge from "@/components/ui/GlowingBadge";
import { Reveal } from "@/components/motion";

const ALL = "All";

export default function ProjectsClient() {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    projectsData.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return [ALL, ...Array.from(set)];
  }, []);

  const [active, setActive] = useState(ALL);

  const filtered = useMemo(
    () => (active === ALL ? projectsData : projectsData.filter((p) => p.tags.includes(active))),
    [active],
  );

  return (
    <main className="relative min-h-screen pt-8 pb-24 overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-60 left-1/3 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-teal-400/5 blur-3xl" />

      <div className="container relative">
        {/* ── Header ───────────────────────────────────────────────────────── */}
        <Reveal>
          <div className="text-center mb-14 pt-6">
            <div className="inline-flex mb-5">
              <GlowingBadge>Full Portfolio</GlowingBadge>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-black dark:text-white tracking-tight mb-5">
              All{" "}
              <span className="bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="max-w-lg mx-auto text-body-color dark:text-body-color-dark text-lg leading-relaxed">
              Every product we've designed, built, and shipped — from idea to production.
            </p>
          </div>
        </Reveal>

        {/* ── Tag filter pills ─────────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allTags.map((tag) => {
              const isActive = tag === active;
              return (
                <button
                  key={tag}
                  onClick={() => setActive(tag)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${isActive
                      ? "text-white"
                      : "text-body-color dark:text-body-color-dark hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10 hover:border-primary/50"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      transition={{ type: "spring" as const, stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-teal-400 shadow-[0_0_16px_rgba(57,157,145,0.4)]"
                    />
                  )}
                  <span className="relative z-10">{tag}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── Project grid ──────────────────────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ type: "spring" as const, stiffness: 280, damping: 26, delay: i * 0.06 }}
              >
                <SingleProject project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24 text-body-color dark:text-body-color-dark">
            <p className="text-lg">No projects match this filter yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
