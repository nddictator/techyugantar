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
      <div
        className="
          relative h-full overflow-hidden rounded-2xl border p-px shadow-lg
          transition-all duration-500
          /* Light mode */
          border-gray-200/80 bg-white
          hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10
          /* Dark mode */
          dark:border-white/[0.08] dark:bg-gradient-to-b dark:from-white/[0.07] dark:to-white/[0.02]
          dark:shadow-none dark:hover:border-primary/40 dark:hover:shadow-2xl dark:hover:shadow-primary/10
        "
      >
        {/* Hover glow accent — dark mode only */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:block" />

        <div
          className="
            relative h-full rounded-2xl px-7 py-8
            /* Light mode inner bg */
            bg-white
            /* Dark mode inner bg */
            dark:bg-zinc-950/60
          "
        >
          {/* Icon */}
          <div
            className="
              mb-6 flex h-14 w-14 items-center justify-center rounded-xl
              ring-1 transition-all duration-300
              /* Light mode */
              bg-primary/10 text-primary ring-primary/20
              group-hover:bg-primary/20 group-hover:ring-primary/40
              /* Dark mode */
              dark:bg-primary/15 dark:ring-primary/20
              dark:group-hover:bg-primary/25 dark:group-hover:ring-primary/40
            "
          >
            {icon}
          </div>

          {/* Title */}
          <h3
            className="
              mb-3 text-xl font-bold leading-snug
              text-gray-900 dark:text-white
            "
          >
            {name}
          </h3>

          {/* Description */}
          <p
            className="
              mb-5 text-sm leading-relaxed
              text-gray-600 dark:text-zinc-400
            "
          >
            {description}
          </p>

          {/* Who it's for */}
          <p
            className="
              mb-4 text-xs font-semibold uppercase tracking-widest
              text-primary/90 dark:text-primary/80
            "
          >
            {whoFor}
          </p>

          {/* Divider */}
          <div
            className="
              mb-4 h-px
              bg-gradient-to-r from-primary/30 via-gray-200 to-transparent
              dark:via-white/5
            "
          />

          {/* Deliverables */}
          <ul className="space-y-2">
            {deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-zinc-400"
              >
                <span
                  className="
                    mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center
                    rounded-full text-[9px] font-bold
                    bg-primary/15 text-primary
                    dark:bg-primary/20 dark:text-primary
                  "
                >
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
