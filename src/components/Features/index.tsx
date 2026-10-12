"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { SPRING_HOVER } from "@/components/ui/utils";
import featuresData from "./featuresData";
import type { Feature } from "@/types/feature";

const byId = (id: number) => featuresData.find((f) => f.id === id)!;

// ── Tile visuals ──────────────────────────────────────────────────────────────

/** Docs → Embeddings → LLM → Answer, with a packet travelling the wire. */
function AiPipeline() {
  const reduce = useReducedMotion();
  const steps = ["Your docs", "Embeddings", "LLM", "Answer"];
  return (
    <div className="relative mt-8 rounded-xl border border-black/[0.06] bg-cream-100/70 p-5 dark:border-white/[0.06] dark:bg-black/30">
      <div className="relative flex items-center justify-between gap-2">
        <div aria-hidden className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-teal-500/10 via-teal-400/50 to-teal-500/10" />
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute top-1/2 h-1.5 w-8 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-teal-300 to-transparent"
            initial={{ left: "4%" }}
            animate={{ left: ["4%", "88%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
          />
        )}
        {steps.map((s, i) => (
          <span
            key={s}
            className={`relative z-10 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold sm:text-xs ${
              i === steps.length - 1
                ? "border-teal-400/40 bg-teal-500/15 text-teal-700 dark:text-teal-200"
                : "border-black/[0.08] bg-white text-gray-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-5 space-y-2 font-mono text-[11px] leading-relaxed text-gray-500 dark:text-zinc-500">
        <p><span className="text-teal-600 dark:text-teal-400">›</span> “Which invoices are overdue this month?”</p>
        <p className="text-gray-700 dark:text-zinc-300">
          <span className="text-amber-500">✦</span> 14 invoices · ₹3.2L outstanding · 3 flagged high-risk
        </p>
      </div>
    </div>
  );
}

/** 30-day deploy/uptime strip. */
function UptimeStrip() {
  return (
    <div className="mt-6 flex items-end gap-[3px]" aria-hidden>
      {Array.from({ length: 36 }).map((_, i) => (
        <span
          key={i}
          className={`h-7 flex-1 rounded-[2px] ${i === 22 ? "bg-amber-400/70" : "bg-teal-500/50 dark:bg-teal-400/40"}`}
        />
      ))}
    </div>
  );
}

function Tags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="mt-5 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-full border border-black/[0.06] bg-black/[0.02] px-2.5 py-0.5 text-[11px] font-medium text-gray-600
            dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function TileBody({ feature, large }: { feature: Feature; large?: boolean }) {
  return (
    <>
      <motion.div
        whileHover={{ rotate: -6, scale: 1.08 }}
        transition={SPRING_HOVER}
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
      >
        {feature.icon}
      </motion.div>
      <h3
        className={`font-display mb-2 font-semibold tracking-tight text-gray-900 dark:text-white ${
          large ? "text-2xl sm:text-3xl" : "text-lg"
        }`}
      >
        {feature.title}
      </h3>
      <p className={`leading-relaxed text-gray-500 dark:text-zinc-400 ${large ? "max-w-md text-base" : "text-sm"}`}>
        {feature.paragraph}
      </p>
    </>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

const Features = () => {
  const ai = byId(6);
  const frontend = byId(1);
  const django = byId(2);
  const mobile = byId(5);
  const node = byId(3);
  const apis = byId(4);
  const cloud = byId(7);

  return (
    <section id="features" className="relative overflow-hidden py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-teal-500/[0.06] blur-3xl" />

      <div className="container relative">
        {/* Asymmetric header: statement left, context right */}
        <Reveal>
          <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">01 — Capabilities</p>
              <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-gray-900 dark:text-white md:text-5xl">
                Our Tech Stack &amp; Expertise
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base leading-relaxed text-gray-500 dark:text-zinc-400 md:text-lg">
                We pick the right tool for the job — from blazing-fast Next.js frontends to Django backends,
                Flutter apps, Node.js real-time services, and AI pipelines.
              </p>
              <Link
                href="/services"
                className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                Explore all services
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </Reveal>

        {/*
          lg (4 cols):
            [ AI ── 2×2 ──────── ] [ Frontend ── 2 ── ]
            [                    ] [ Django ] [ Mobile ]
            [ Node ] [ APIs ]      [ Cloud ── 2 ──── ]
        */}
        <BentoGrid className="lg:grid-rows-[auto_auto_auto]">
          <BentoItem className="sm:col-span-2 lg:row-span-2" tag="Featured">
            <div className="flex h-full flex-col">
              <TileBody feature={ai} large />
              <Tags tags={ai.tags} />
              <div className="mt-auto">
                <AiPipeline />
              </div>
            </div>
          </BentoItem>

          <BentoItem className="sm:col-span-2">
            <TileBody feature={frontend} />
            <Tags tags={frontend.tags} />
          </BentoItem>

          <BentoItem>
            <TileBody feature={django} />
            <Tags tags={django.tags} />
          </BentoItem>

          <BentoItem>
            <TileBody feature={mobile} />
            <Tags tags={mobile.tags} />
          </BentoItem>

          <BentoItem>
            <TileBody feature={node} />
            <Tags tags={node.tags} />
          </BentoItem>

          <BentoItem>
            <TileBody feature={apis} />
            <Tags tags={apis.tags} />
          </BentoItem>

          <BentoItem className="sm:col-span-2">
            <TileBody feature={cloud} />
            <Tags tags={cloud.tags} />
            <UptimeStrip />
          </BentoItem>
        </BentoGrid>
      </div>
    </section>
  );
};

export default Features;
