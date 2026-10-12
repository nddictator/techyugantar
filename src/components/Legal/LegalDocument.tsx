"use client";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SPRING_HOVER } from "@/components/ui/utils";

export type LegalSection = { id: string; title: string; body: ReactNode };

export type LegalDoc = {
  kicker: string;
  title: string;
  intro: string;
  effectiveDate: string;
  appliesTo: string;
  /** Plain-language bullets shown above the full text. */
  summary: string[];
  sections: LegalSection[];
};

/**
 * Shared layout for Privacy / Terms: scroll progress hairline, sticky table of
 * contents with a spring-tracked active pill, and long-form prose styled for
 * reading rather than scanning.
 */
export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  const [active, setActive] = useState(doc.sections[0]?.id);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const els = doc.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [doc.sections]);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-teal-400 to-cyan-400"
        style={{ scaleX: progress }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-36 pb-14 md:pt-44">
        <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[720px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse at center, rgba(45,212,191,0.16), transparent 70%)" }} />
        <div className="container relative">
          <Stagger immediate className="max-w-3xl">
            <StaggerItem>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">{doc.kicker}</p>
            </StaggerItem>
            <StaggerItem>
              <h1 className="font-display mb-6 text-5xl font-semibold leading-[1.02] tracking-tight text-gray-900 dark:text-white md:text-6xl">
                {doc.title}
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-zinc-400">{doc.intro}</p>
            </StaggerItem>
            <StaggerItem>
              <dl className="flex flex-wrap gap-x-10 gap-y-4 border-t border-black/[0.06] pt-6 text-sm dark:border-white/[0.08]">
                <div>
                  <dt className="mb-1 text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500">Effective</dt>
                  <dd className="font-medium text-gray-800 dark:text-zinc-200">{doc.effectiveDate}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500">Applies to</dt>
                  <dd className="font-medium text-gray-800 dark:text-zinc-200">{doc.appliesTo}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500">Questions</dt>
                  <dd>
                    <a href="mailto:info@techyugantar.in" className="font-medium text-primary hover:underline">
                      info@techyugantar.in
                    </a>
                  </dd>
                </div>
              </dl>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="container grid gap-12 lg:grid-cols-12">
          {/* Sticky TOC */}
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">On this page</p>
              <ul className="space-y-0.5 border-l border-black/[0.06] dark:border-white/[0.08]">
                {doc.sections.map((s, i) => {
                  const isActive = active === s.id;
                  return (
                    <li key={s.id} className="relative">
                      {isActive && (
                        <motion.span
                          layoutId="legal-toc-active"
                          transition={SPRING_HOVER}
                          className="absolute inset-y-0 -left-px w-px bg-primary"
                        />
                      )}
                      <a
                        href={`#${s.id}`}
                        className={`block py-1.5 pl-4 text-sm transition-colors duration-200 ${
                          isActive
                            ? "font-medium text-gray-900 dark:text-white"
                            : "text-gray-500 hover:text-gray-800 dark:text-zinc-500 dark:hover:text-zinc-200"
                        }`}
                      >
                        <span className="mr-2 font-mono text-[11px] text-gray-400 dark:text-zinc-600">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div className="lg:col-span-9">
            {/* Plain-language summary */}
            <Reveal>
              <div className="relative mb-14 overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 md:p-8 dark:bg-primary/[0.06]">
                <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">In short</p>
                <ul className="grid gap-3 md:grid-cols-2">
                  {doc.summary.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-700 dark:text-zinc-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div className="max-w-3xl">
              {doc.sections.map((s, i) => (
                <article key={s.id} id={s.id} className="scroll-mt-28 border-t border-black/[0.06] py-10 first:border-t-0 first:pt-0 dark:border-white/[0.08]">
                  <h2 className="font-display mb-5 flex items-baseline gap-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    <span className="font-mono text-sm font-normal text-primary">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  <div
                    className="space-y-4 text-[15px] leading-[1.75] text-gray-600 dark:text-zinc-400
                      [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline
                      [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-gray-900 dark:[&_h3]:text-white
                      [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-gray-900 dark:[&_strong]:text-zinc-100
                      [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:marker:text-primary"
                  >
                    {s.body}
                  </div>
                </article>
              ))}
            </div>

            {/* Contact card */}
            <Reveal>
              <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-black/[0.06] bg-white/70 p-6 backdrop-blur-xl md:flex-row md:items-center md:p-8 dark:border-white/[0.08] dark:bg-white/[0.03]">
                <div>
                  <p className="font-display text-xl font-semibold text-gray-900 dark:text-white">Something unclear?</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
                    Write to us and a real person will reply — usually within two business days.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(45,212,191,0.35)]"
                >
                  Contact us →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
