"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projectsData } from "@/components/Projects/projectsData";
import SingleProject from "@/components/Projects/SingleProject";
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

export default function ProjectsClient() {
  const filters = useMemo(
    () => [ALL, ...CATEGORIES.filter((c) => projectsData.some((p) => p.tags.some((t) => c.tags.includes(t)))).map((c) => c.label)],
    [],
  );

  const [active, setActive] = useState(ALL);

  const filtered = useMemo(() => {
    if (active === ALL) return projectsData;
    const cat = CATEGORIES.find((c) => c.label === active);
    return projectsData.filter((p) => p.tags.some((t) => cat?.tags.includes(t)));
  }, [active]);

  return (
    <main className="relative min-h-screen pt-12 pb-24 overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-60 left-1/3 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-teal-400/5 blur-3xl" />

      <div className="container relative">
        {/* ── Tag filter pills ─────────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="mb-10 flex flex-col gap-4 border-b border-black/[0.07] pb-6 md:flex-row md:items-center md:justify-between dark:border-white/[0.08]">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500">
            {String(filtered.length).padStart(2, "0")} {filtered.length === 1 ? "project" : "projects"}
          </p>
          <div className="flex flex-wrap gap-2">
            {filters.map((tag) => {
              const isActive = tag === active;
              return (
                <button
                  key={tag}
                  onClick={() => setActive(tag)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300
                    ${isActive
                      ? "text-white"
                      : "text-body-color dark:text-body-color-dark hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10 hover:border-primary/50"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      transition={SPRING_HOVER}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-teal-400 shadow-[0_0_16px_rgba(45,212,191,0.4)]"
                    />
                  )}
                  <span className="relative z-10">{tag}</span>
                </button>
              );
            })}
          </div>
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
                transition={{ ...SPRING_REVEAL, delay: i * 0.06 }}
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
