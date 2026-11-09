"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Stagger, StaggerItem } from "@/components/motion";
import { FAQS } from "./content";

export default function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Stagger className="mx-auto grid max-w-[820px] gap-3" staggerDelay={0.06}>
      {FAQS.map((faq, index) => {
        const isOpen = open === index;
        return (
          <StaggerItem key={faq.question}>
            <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03]">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-gray-900 dark:text-white"
              >
                {faq.question}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="text-xl text-primary"
                  aria-hidden
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-500 dark:text-zinc-400">{faq.answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
