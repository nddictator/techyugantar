"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/types/project";
import type { CaseStudy } from "@/data/caseStudies";
import { SPRING_HOVER, SPRING_SURFACE } from "@/components/ui/utils";
import DeviceShowcase from "./DeviceShowcase";

const MotionLink = motion.create(Link);
const hostOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

type Props = {
  project: Project;
  caseStudy?: CaseStudy;
  index: number;
  total: number;
  /** Put the screenshot on the right instead of the left. */
  flip?: boolean;
};

/**
 * One editorial row of the work index: a browser-framed screenshot that
 * unmasks on entry and drifts with scroll, beside the project's story,
 * outcomes and links.
 */
export default function ProjectShowcaseRow({ project, caseStudy: cs, index, total, flip }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3.5%", "3.5%"]);

  const caseHref = project.caseStudySlug ? `/case-study/${project.caseStudySlug}` : project.liveUrl;
  const metrics = cs?.metrics.slice(0, 4) ?? [];

  return (
    <article
      ref={ref}
      className="grid items-center gap-10 border-t border-black/[0.07] py-16 first:border-t-0 first:pt-4 md:py-24 lg:grid-cols-12 lg:gap-14 dark:border-white/[0.08]"
    >
      {/* ── Visual ─────────────────────────────────────────────────── */}
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        {project.screens ? (
          <Link href={caseHref ?? "#"} aria-label={`${project.title} case study`} className="block">
            <DeviceShowcase screens={project.screens} title={project.title} platforms={project.platforms} />
          </Link>
        ) : (
          <motion.div
            initial={reduce ? false : { clipPath: "inset(8% 8% 8% 8% round 20px)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 20px)", opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={SPRING_SURFACE}
          >
            <Link
              href={caseHref ?? "#"}
              aria-label={`${project.title} case study`}
              className="group relative block overflow-hidden rounded-[20px] border border-black/[0.07] bg-white shadow-[0_30px_80px_rgba(6,8,15,0.12)] dark:border-white/[0.09] dark:bg-gray-dark dark:shadow-[0_40px_120px_rgba(0,0,0,0.75)]"
            >
              <div className="flex items-center gap-1.5 border-b border-black/[0.05] bg-cream-100 px-4 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                <span className="mx-auto truncate rounded-md border border-black/[0.06] bg-white px-3 py-0.5 text-[11px] text-gray-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-400">
                  {project.liveUrl ? hostOf(project.liveUrl) : project.title}
                </span>
              </div>
              <div className="relative aspect-[16/9] overflow-hidden">
                <motion.div className="absolute inset-[-4%_0]" style={reduce ? undefined : { y: imageY }}>
                  <Image
                    src={project.image}
                    alt={`${project.title} — website built by Tech Yugantar`}
                    fill
                    sizes="(max-width: 992px) 100vw, 760px"
                    className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </motion.div>
                {/* Hover veil with CTA */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/0 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="inline-flex translate-y-2 items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-gray-900 transition-transform duration-500 group-hover:translate-y-0">
                    View case study <FiArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>

      {/* ── Story ──────────────────────────────────────────────────── */}
      <motion.div
        className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ ...SPRING_SURFACE, delay: 0.1 }}
      >
        <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.18em]">
          <span className="text-primary">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {cs && <span className="text-gray-400 dark:text-zinc-500">{cs.industry}</span>}
          {index === 0 && (
            <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] tracking-[0.15em] text-teal-700 dark:text-teal-200">
              Featured
            </span>
          )}
        </div>

        <h2 className="font-display text-4xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-5xl">
          {project.title}
        </h2>
        {cs && (
          <p className="mt-3 text-lg font-medium leading-snug text-gray-700 dark:text-zinc-300">{cs.title}</p>
        )}
        <p className="mt-4 text-[15px] leading-relaxed text-gray-500 dark:text-zinc-400">
          {cs?.summary ?? project.paragraph}
        </p>

        {metrics.length > 0 && (
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/[0.07] bg-black/[0.07] dark:border-white/[0.08] dark:bg-white/[0.08]">
            {metrics.map((m) => (
              <div key={m.label} className="bg-cream p-4 dark:bg-obsidian">
                <dd className="font-display text-2xl font-semibold tracking-tight">
                  <span className="text-aurora">{m.value}</span>
                </dd>
                <dt className="mt-1 text-xs leading-snug text-gray-500 dark:text-zinc-400">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}

        {cs?.duration && cs.teamSize && (
          <p className="mt-5 text-sm text-gray-500 dark:text-zinc-400">
            <span className="text-gray-900 dark:text-zinc-200">{cs.duration}</span> · {cs.teamSize}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-black/[0.07] px-3 py-1 text-xs text-gray-600 dark:border-white/[0.09] dark:text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.caseStudySlug && (
            <MotionLink
              href={`/case-study/${project.caseStudySlug}`}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING_HOVER}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(45,212,191,0.35)]"
            >
              Read case study
              <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </MotionLink>
          )}
          {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-900 dark:border-white/[0.12] dark:text-zinc-300 dark:hover:text-white"
          >
            Visit live site
            <FiArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
          ) : project.platforms && (
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-gray-400 dark:text-zinc-500">
              Ships on {project.platforms.join(" · ")}
            </p>
          )}
        </div>
      </motion.div>
    </article>
  );
}
