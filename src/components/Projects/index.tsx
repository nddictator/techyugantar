"use client";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import GlowingBadge from "@/components/ui/GlowingBadge";
import SingleProject from "./SingleProject";
import { projectsData } from "./projectsData";

export default function Projects() {
  const [p1, p2, p3, p4, p5] = projectsData;

  return (
    <section id="projects" className="relative py-20 md:py-28 overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-teal-400/5 blur-3xl" />

      <div className="container relative">
        {/* ── Section header ──────────────────────────────────────────── */}
        <Reveal>
          <div className="mb-14 text-center">
            <div className="inline-flex mb-5">
              <GlowingBadge>Work &amp; Case Studies</GlowingBadge>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white mb-4 tracking-tight">
              Our Featured{" "}
              <span className="bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="max-w-xl mx-auto text-body-color dark:text-body-color-dark text-base md:text-lg leading-relaxed">
              Modern UI, seamless animations, and scalable architecture — we turn big ideas into shipped software.
            </p>
          </div>
        </Reveal>

        {/* ── Bento Grid ─────────────────────────────────────────────────
          Desktop layout (4-col grid):
            Row 1: [ P1 ── col-span-2 ── ] [ P2 ── col-span-2 ── ]
            Row 2: [ P3 col-1 ] [ P4 ─ col-span-2 center ─ ] [ P5 col-1 ]
        ─────────────────────────────────────────────────────────────── */}
        <Stagger className="flex flex-col gap-5" staggerDelay={0.1}>

          {/* Row 1 — Two equal peers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <StaggerItem>
              <SingleProject project={p1} imageHeight="h-[260px]" />
            </StaggerItem>
            <StaggerItem>
              <SingleProject project={p2} imageHeight="h-[260px]" />
            </StaggerItem>
          </div>

          {/* Row 2 — Small | Center (wide) | Small */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-stretch">
            <StaggerItem className="md:col-span-1">
              <SingleProject project={p3} imageHeight="h-[180px]" compact />
            </StaggerItem>
            <StaggerItem className="md:col-span-2">
              <SingleProject project={p4} imageHeight="h-[180px]" centerFeatured />
            </StaggerItem>
            <StaggerItem className="md:col-span-1">
              <SingleProject project={p5} imageHeight="h-[180px]" compact />
            </StaggerItem>
          </div>

        </Stagger>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <Link
              href="/projects"
              className="
                inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm
                border border-primary/30 text-primary hover:text-white
                hover:bg-gradient-to-r hover:from-primary hover:to-teal-400
                hover:border-transparent hover:shadow-[0_0_24px_rgba(57,157,145,0.4)]
                transition-all duration-300 group
              "
            >
              View All Projects
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
