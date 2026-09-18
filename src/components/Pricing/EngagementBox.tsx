"use client";

import Link from "next/link";
import { motion } from "motion/react";
import OfferList from "./OfferList";
import { StaggerItem } from "@/components/motion";
import type { EngagementModel } from "./engagementData";

const EngagementBox = ({ model, featured = false }: { model: EngagementModel; featured?: boolean }) => {
  const { name, bestFor, howItWorks, includes } = model;

  return (
    <StaggerItem className="w-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`group relative z-10 flex h-full flex-col overflow-hidden rounded-2xl border p-8 backdrop-blur-xl transition-colors duration-300
          ${featured
            ? "border-primary/40 bg-white shadow-[0_20px_60px_rgba(45,212,191,0.15)] dark:bg-white/[0.05]"
            : "border-black/[0.07] bg-white/70 shadow-[0_10px_40px_rgba(6,8,15,0.06)] dark:border-white/[0.08] dark:bg-white/[0.03]"}`}
      >
        {/* top shimmer */}
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-opacity duration-300 ${featured ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />

        {featured && (
          <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-teal-500/15 px-3 py-1 text-[11px] font-semibold text-teal-600 dark:text-teal-300">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 motion-safe:animate-pulse" />
            Most popular
          </span>
        )}

        <h3 className="font-display mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>

        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary/80">Best for</p>
        <p className="mb-6 text-base text-gray-600 dark:text-zinc-400">{bestFor}</p>

        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary/80">How it works</p>
        <p className="mb-7 text-base text-gray-600 dark:text-zinc-400">{howItWorks}</p>

        <div className="mb-8 grow">
          {includes.map((item) => (
            <OfferList key={item} text={item} status="active" />
          ))}
        </div>

        <Link
          href="/contact"
          className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition-all duration-300
            ${featured
              ? "text-white bg-gradient-to-b from-teal-400 to-teal-600 shadow-[0_0_24px_rgba(45,212,191,0.4)] hover:shadow-[0_0_40px_rgba(45,212,191,0.6)] hover:scale-[1.03]"
              : "text-gray-700 border border-black/[0.08] bg-white hover:text-primary hover:border-primary/40 dark:border-white/[0.12] dark:bg-white/[0.05] dark:text-zinc-200 dark:hover:text-white"}`}
        >
          Get a Custom Quote
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>
    </StaggerItem>
  );
};

export default EngagementBox;
