"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import testimonialsData from "@/data/testimonials";
import Link from "next/link";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} className="h-4 w-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials, bg }: { initials: string; bg: string }) {
  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${bg}`}
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const total = testimonialsData.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  // Show 3 cards on desktop: prev, active, next
  const getVisible = () => {
    return [
      (active - 1 + total) % total,
      active,
      (active + 1) % total,
    ];
  };

  const visible = getVisible();

  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-zinc-950 dark:to-zinc-900/50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            <span className="text-base">⭐</span>
            Client Stories
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-[42px]">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-[560px] text-base leading-relaxed text-gray-600 dark:text-zinc-400">
            50+ businesses built. Real words from real founders — no cherry-picking.
          </p>
        </motion.div>

        {/* ── Desktop 3-card slider ── */}
        <div className="hidden md:block">
          <div className="relative mx-auto grid max-w-6xl grid-cols-3 gap-6">
            {visible.map((idx, pos) => {
              const t = testimonialsData[idx];
              const isCenter = pos === 1;
              return (
                <motion.div
                  key={`${idx}-${pos}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.55,
                    y: isCenter ? -8 : 0,
                    scale: isCenter ? 1 : 0.97,
                  }}
                  transition={{ type: "spring", stiffness: 80, damping: 20 }}
                  className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300
                    ${isCenter
                      ? "border-primary/30 bg-white shadow-xl shadow-primary/10 dark:border-primary/20 dark:bg-zinc-900"
                      : "border-gray-200 bg-white/60 shadow dark:border-white/[0.06] dark:bg-zinc-900/40"
                    }`}
                >
                  {/* Top accent */}
                  {isCenter && (
                    <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}

                  {/* Quote mark */}
                  <div className="mb-4 text-4xl font-serif leading-none text-primary/25">&ldquo;</div>

                  {/* Stars + project tag */}
                  <div className="mb-3 flex items-center justify-between">
                    <StarRating rating={t.rating} />
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {t.project}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-700 dark:text-zinc-300">
                    {t.quote}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 border-t border-gray-100 pt-5 dark:border-white/[0.06]">
                    <Avatar initials={t.avatar} bg={t.avatarBg} />
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{t.name}</p>
                      <p className="text-xs text-gray-500 dark:text-zinc-500">{t.role}, {t.company}</p>
                      <p className="text-xs text-gray-400 dark:text-zinc-600">{t.city}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-primary/30"
              aria-label="Previous"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-1.5">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 bg-primary"
                      : "w-2 bg-gray-300 dark:bg-zinc-600"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-primary/30"
              aria-label="Next"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ── Mobile single card ── */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="relative rounded-2xl border border-primary/20 bg-white p-6 shadow-xl dark:border-primary/20 dark:bg-zinc-900"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="mb-3 text-4xl font-serif leading-none text-primary/25">&ldquo;</div>
              <div className="mb-3 flex items-center justify-between">
                <StarRating rating={testimonialsData[active].rating} />
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {testimonialsData[active].project}
                </span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-gray-700 dark:text-zinc-300">
                {testimonialsData[active].quote}
              </p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-5 dark:border-white/[0.06]">
                <Avatar initials={testimonialsData[active].avatar} bg={testimonialsData[active].avatarBg} />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{testimonialsData[active].name}</p>
                  <p className="text-xs text-gray-500 dark:text-zinc-500">{testimonialsData[active].role}, {testimonialsData[active].company}</p>
                  <p className="text-xs text-gray-400 dark:text-zinc-600">{testimonialsData[active].city}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300" aria-label="Previous">
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-500 dark:text-zinc-500">{active + 1} / {total}</span>
            <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300" aria-label="Next">
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-sm text-gray-500 dark:text-zinc-500">
            Ready to add your name to this list?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40"
          >
            Start Your Project →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
