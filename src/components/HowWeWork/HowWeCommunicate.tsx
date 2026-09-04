"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/motion";

const commsChannels = [
  {
    icon: "💬",
    tool: "WhatsApp",
    color: "bg-[#25D366]/10 border-[#25D366]/20 text-[#25D366]",
    badge: "Primary",
    badgeColor: "bg-[#25D366] text-white",
    description:
      "Your first and fastest line to us. We respond to WhatsApp messages within 2 hours during business hours — no support tickets, no waiting rooms.",
    use: "Quick questions, status updates, urgent issues",
  },
  {
    icon: "📋",
    tool: "Notion",
    color: "bg-gray-900/10 border-gray-900/20 text-gray-900 dark:bg-white/10 dark:border-white/20 dark:text-white",
    badge: "Project Hub",
    badgeColor: "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
    description:
      "Every project gets a shared Notion workspace: task board, sprint roadmap, design specs, and a shared doc for all decisions. You always know what's happening next.",
    use: "Task tracking, sprint planning, shared documentation",
  },
  {
    icon: "📹",
    tool: "Weekly Demo Calls",
    color: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
    badge: "Recurring",
    badgeColor: "bg-blue-500 text-white",
    description:
      "Every 2 weeks, we hop on a 30-minute video call to demo what we've built, get your feedback, and plan the next sprint. You see progress before it ships.",
    use: "Sprint reviews, feedback sessions, milestone demos",
  },
  {
    icon: "📧",
    tool: "Email",
    color: "bg-primary/10 border-primary/20 text-primary",
    badge: "Formal",
    badgeColor: "bg-primary text-white",
    description:
      "Contracts, invoices, NDA documents, and milestone summaries go through email. All key decisions are documented in writing — no verbal surprises.",
    use: "Contracts, invoices, formal project sign-offs",
  },
  {
    icon: "🐙",
    tool: "GitHub",
    color: "bg-gray-800/10 border-gray-800/20 text-gray-800 dark:bg-white/10 dark:border-white/20 dark:text-white",
    badge: "Dev Transparency",
    badgeColor: "bg-gray-800 text-white dark:bg-white dark:text-gray-900",
    description:
      "You get full access to your repository from day one. Watch commits happen in real time, review code, or hand it off to your internal team at any point.",
    use: "Code access, pull request reviews, deployment logs",
  },
  {
    icon: "🎨",
    tool: "Figma",
    color: "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400",
    badge: "Design",
    badgeColor: "bg-purple-500 text-white",
    description:
      "All UI/UX designs live in a shared Figma file. Comment directly on designs, approve screens, and request changes — before a single line of code is written.",
    use: "Wireframes, design approval, component library",
  },
];

const guarantees = [
  { icon: "⚡", text: "WhatsApp reply within 2 hours" },
  { icon: "📅", text: "Bi-weekly video demo — every sprint" },
  { icon: "🔍", text: "Full code access from day one" },
  { icon: "📄", text: "All decisions documented in writing" },
  { icon: "🔔", text: "No surprises — blockers flagged immediately" },
  { icon: "🏁", text: "30-day post-launch support included" },
];

export default function HowWeCommunicate() {
  return (
    <section className="relative py-16 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />

      <div className="container">
        {/* Header */}
        <Reveal>
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              No Black Boxes
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              How We{" "}
              <span className="bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
                Communicate
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 dark:text-zinc-400">
              Most agencies are a black box — you pay, you wait, you hope. We work differently.
              Here are the tools we use to keep you in the loop at every step.
            </p>
          </div>
        </Reveal>

        {/* Channel cards */}
        <div className="mb-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {commsChannels.map((ch, i) => (
            <motion.div
              key={ch.tool}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.07 }}
              className="relative flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/[0.08] dark:bg-zinc-900/60"
            >
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl border text-2xl ${ch.color}`}>
                  {ch.icon}
                </span>
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${ch.badgeColor}`}>
                  {ch.badge}
                </span>
              </div>

              <div>
                <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">
                  {ch.tool}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
                  {ch.description}
                </p>
              </div>

              <div className="mt-auto border-t border-gray-100 pt-4 dark:border-white/[0.06]">
                <p className="text-xs text-gray-400 dark:text-zinc-600">
                  <span className="font-semibold text-gray-600 dark:text-zinc-400">Used for: </span>
                  {ch.use}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee strip */}
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 to-teal-500/5 p-8 dark:border-primary/15">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <h3 className="mb-6 text-center text-lg font-bold text-gray-900 dark:text-white">
              Our Communication Promise
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {guarantees.map((g) => (
                <div
                  key={g.text}
                  className="flex flex-col items-center gap-2 rounded-xl bg-white/60 p-4 text-center dark:bg-white/[0.04]"
                >
                  <span className="text-2xl">{g.icon}</span>
                  <p className="text-xs font-medium leading-snug text-gray-700 dark:text-zinc-300">
                    {g.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
