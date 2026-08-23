"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionTitle from "../Common/SectionTitle";
import JsonLdScript from "../JsonLdScript";
import faqData from "./faqData";
import { buildFaqSchema } from "@/lib/schema";
import { Reveal, StaggerItem, Stagger } from "@/components/motion";

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(faqData[0]?.id ?? null);

  return (
    <section id="faq" className="py-16 md:py-20 lg:py-28">
      <JsonLdScript schema={buildFaqSchema(faqData.map(({ question, answer }) => ({ question, answer })))} />
      <div className="container">
        <Reveal>
          <SectionTitle
            title="Frequently Asked Questions"
            paragraph="Quick answers about how we work, what we build, and how projects get priced."
            center
          />
        </Reveal>

        <Stagger className="mx-auto max-w-[800px]" staggerDelay={0.08}>
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <StaggerItem key={faq.id} className="mb-4">
                <div className="rounded-xs border border-body-color/10 bg-white dark:border-white/10 dark:bg-gray-dark">
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between px-6 py-5 text-left text-base font-semibold text-black dark:text-white"
                  >
                    {faq.question}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="ml-4 shrink-0 text-primary text-2xl leading-none"
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-body-color px-6 pb-5 text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};

export default FAQ;
