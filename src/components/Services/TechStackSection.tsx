"use client";

import { motion } from "motion/react";
import SectionTitle from "../Common/SectionTitle";
import techStackData from "./techStackData";

const TechStackSection = () => {
  return (
    <section id="tech-stack" className="relative py-16 md:py-20 lg:py-28">
      {/* Subtle divider line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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
                    className="group flex min-w-[130px] flex-col items-center gap-3 rounded-xl border border-white/[0.08] bg-zinc-950/60 px-6 py-5 shadow-lg ring-1 ring-inset ring-white/[0.04] transition-colors duration-300 hover:border-primary/30 hover:bg-zinc-900/60"
                  >
                    <span className="text-primary transition-colors duration-300 group-hover:text-primary/80">
                      {item.icon}
                    </span>
                    <span className="text-center text-sm font-medium text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200">
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
