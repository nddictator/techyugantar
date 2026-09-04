"use client";

import { motion } from "motion/react";
import SectionTitle from "../Common/SectionTitle";
import techStackData from "./techStackData";

const TechStackSection = () => {
  return (
    <section id="tech-stack" className="relative py-16 md:py-20 lg:py-28">
      {/* Subtle divider line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <SectionTitle
            title="Our Tech Stack"
            paragraph="The technologies we actually build with, day to day — organized by where they sit in a project."
            center
          />
        </motion.div>

        <div className="space-y-14">
          {techStackData.map((group, groupIndex) => (
            <div key={group.category}>
              {/* Category header */}
              <motion.div
                className="mb-6 flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  delay: groupIndex * 0.05,
                }}
              >
                <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                  {group.category}
                </h3>
                <span className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
              </motion.div>

              {/* Tech items */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {group.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: groupIndex * 0.05 + itemIndex * 0.06,
                    }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="
                      group flex min-w-[130px] flex-col items-center gap-3 rounded-xl
                      border px-6 py-5 shadow-sm transition-all duration-300
                      /* Light mode */
                      border-gray-200/80 bg-white
                      hover:border-primary/40 hover:shadow-md hover:shadow-primary/10
                      /* Dark mode */
                      dark:border-white/[0.08] dark:bg-zinc-950/60 dark:shadow-lg
                      dark:ring-1 dark:ring-inset dark:ring-white/[0.04]
                      dark:hover:border-primary/30 dark:hover:bg-zinc-900/60
                    "
                  >
                    <span className="text-primary transition-colors duration-300 group-hover:text-primary/80">
                      {item.icon}
                    </span>
                    <span
                      className="
                        text-center text-sm font-medium transition-colors duration-300
                        text-gray-600 group-hover:text-gray-900
                        dark:text-zinc-400 dark:group-hover:text-zinc-200
                      "
                    >
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
