"use client";

import Link from "next/link";
import { motion } from "motion/react";

const EngagementRecap = () => {
  return (
    <section className="relative py-16 md:py-20 lg:py-28">
      {/* Top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="relative mx-auto max-w-[820px]"
        >
          {/* Card */}
          <div
            className="
              relative overflow-hidden rounded-2xl border p-px
              transition-all duration-300
              /* Light mode */
              border-gray-200 bg-white shadow-xl shadow-gray-200/60
              /* Dark mode */
              dark:border-white/[0.08] dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-transparent dark:shadow-2xl
            "
          >
            {/* Inner glow overlay — dark mode only */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 dark:opacity-60" />

            <div
              className="
                relative rounded-2xl px-8 py-14 text-center
                /* Light mode */
                bg-white
                /* Dark mode */
                dark:bg-zinc-950/80 dark:backdrop-blur-sm
                md:px-14
              "
            >
              {/* Badge */}
              <div
                className="
                  mb-6 inline-flex items-center gap-2 rounded-full border
                  px-4 py-1.5 text-xs font-semibold uppercase tracking-widest
                  /* Light mode */
                  border-primary/30 bg-primary/8 text-primary
                  /* Dark mode */
                  dark:border-primary/30 dark:bg-primary/10 dark:text-primary
                "
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Engagement Models
              </div>

              <h3
                className="
                  mb-4 text-2xl font-bold leading-snug sm:text-3xl
                  text-gray-900 dark:text-white
                "
              >
                Not sure how to structure your project?
              </h3>
              <p
                className="
                  mx-auto mb-10 max-w-[560px] text-base leading-relaxed
                  text-gray-600 dark:text-zinc-400
                "
              >
                We work under three engagement models — Fixed Price, Time &
                Material, or a Dedicated Team — depending on how well-defined
                your scope is.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/pricing"
                  className="
                    group inline-flex items-center gap-2 rounded-xl border
                    px-8 py-3.5 text-sm font-semibold
                    transition-all duration-300
                    /* Light mode */
                    border-primary/40 text-primary
                    hover:border-primary hover:bg-primary/8
                    /* Dark mode */
                    dark:border-primary/40 dark:text-primary
                    dark:hover:border-primary dark:hover:bg-primary/10
                  "
                >
                  See Engagement Models
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="
                    inline-flex items-center gap-2 rounded-xl bg-primary
                    px-8 py-3.5 text-sm font-semibold text-white
                    transition-all duration-300
                    shadow-lg shadow-primary/25
                    hover:bg-primary/90 hover:shadow-primary/40
                  "
                >
                  Get a Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EngagementRecap;
