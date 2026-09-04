"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/motion";

// ── Founder story data — edit here ────────────────────────────────────────────
const founderStory = {
  name: "Tanmay Mishra",
  title: "Founder, Tech Yugantar",
  location: "Varanasi, Uttar Pradesh",
  founded: "2023",
  avatar: "TM",
  avatarBg: "bg-primary",
  story: [
    "Tech Yugantar started from a simple frustration. Growing up in Varanasi, I watched talented local businesses struggle to compete digitally — not because they lacked ambition, but because good software was either unaffordable or built by agencies that didn't understand their context.",
    "I started building freelance projects at 17. By 19, I'd shipped my first production web app. But the pattern I kept seeing was the same everywhere: clients overpaying for templated solutions, getting poor communication, and ending up with codebases nobody could maintain.",
    "Tech Yugantar was founded to flip that model. We operate like a senior engineering team — small, accountable, and deeply invested in the success of every project we take on. No juniors hidden in delivery. No offshore outsourcing. You talk to the people writing your code.",
    "We build from Varanasi, one of India's oldest cities — but we build for the world. Our clients range from African education platforms to Varanasi's own traditional businesses going digital for the first time. That range makes us better engineers.",
  ],
  quote:
    "We're not just a service provider. We're the tech team your business always needed but could never afford to hire full-time.",
};

export default function FounderStory() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />

      <div className="container">
        <Reveal>
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Our Story
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Why We Started Tech Yugantar
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Founder card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-white/[0.08] dark:bg-zinc-900/60"
          >
            {/* Avatar */}
            <div className={`mb-4 flex h-20 w-20 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg ${founderStory.avatarBg}`}>
              {founderStory.avatar}
            </div>

            <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
              {founderStory.name}
            </h3>
            <p className="mb-1 text-sm font-semibold text-primary">{founderStory.title}</p>
            <p className="mb-5 text-xs text-gray-500 dark:text-zinc-500">
              📍 {founderStory.location}
            </p>

            {/* Stats */}
            <div className="mt-auto grid w-full grid-cols-2 gap-3 border-t border-gray-100 pt-5 dark:border-white/[0.06]">
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-white/[0.04]">
                <p className="text-lg font-bold text-primary">2023</p>
                <p className="text-xs text-gray-500 dark:text-zinc-500">Founded</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-white/[0.04]">
                <p className="text-lg font-bold text-primary">50+</p>
                <p className="text-xs text-gray-500 dark:text-zinc-500">Clients served</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-white/[0.04]">
                <p className="text-lg font-bold text-primary">5+</p>
                <p className="text-xs text-gray-500 dark:text-zinc-500">Countries</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-white/[0.04]">
                <p className="text-lg font-bold text-primary">4.9★</p>
                <p className="text-xs text-gray-500 dark:text-zinc-500">Avg. rating</p>
              </div>
            </div>
          </motion.div>

          {/* Story paragraphs */}
          <div className="lg:col-span-2">
            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="relative mb-8 overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-6 dark:border-primary/15"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              <p className="mb-3 text-4xl font-serif leading-none text-primary/20">&ldquo;</p>
              <p className="text-base font-medium italic leading-relaxed text-gray-800 dark:text-zinc-200">
                {founderStory.quote}
              </p>
              <p className="mt-3 text-sm font-semibold text-primary">— {founderStory.name}</p>
            </motion.blockquote>

            {/* Story paragraphs */}
            <div className="space-y-4">
              {founderStory.story.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.08 }}
                  className="text-base leading-relaxed text-gray-700 dark:text-zinc-400"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
