"use client";

import { motion } from "motion/react";
import type { ServiceItem } from "./servicesData";

const ServiceCard = ({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) => {
  const { icon, name, description, whoFor, deliverables } = service;

  return (
    <motion.div
      className="group w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: (index % 3) * 0.1,
      }}
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-px shadow-xl backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-primary/10 hover:shadow-2xl dark:from-white/[0.07] dark:to-white/[0.02]">
        {/* Glow accent */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative h-full rounded-2xl bg-zinc-950/60 px-7 py-8 dark:bg-zinc-950/60">
          {/* Icon */}
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-inner ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary/25 group-hover:ring-primary/40">
            {icon}
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-bold leading-snug text-white">
            {name}
          </h3>

          {/* Description */}
          <p className="mb-5 text-sm leading-relaxed text-zinc-400">
            {description}
          </p>

          {/* Who it's for */}
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary/80">
            {whoFor}
          </p>

          {/* Divider */}
          <div className="mb-4 h-px bg-gradient-to-r from-primary/30 via-white/5 to-transparent" />

          {/* Deliverables */}
          <ul className="space-y-2">
            {deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-zinc-400"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[9px] font-bold text-primary">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
