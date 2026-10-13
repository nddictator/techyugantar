"use client";

import type { ComponentType, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";
import { SiFigma, SiGithub, SiNotion } from "react-icons/si";
import { LuBellRing, LuCalendarDays, LuFileText, LuFlag, LuGitBranch, LuMail, LuVideo, LuZap } from "react-icons/lu";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/motion";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { cx, SPRING_REVEAL, STAGGER } from "@/components/ui/utils";
import SectionHeading from "./SectionHeading";

type Channel = {
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  tool: string;
  /** Brand colour lives on the icon only — tiles stay on-palette. */
  iconColor: string;
  badge: string;
  description: string;
  use: string;
  span: string;
  visual?: ReactNode;
};

// ── Tile visuals ──────────────────────────────────────────────────────────────
const CHAT = [
  { from: "you", text: "Can we move the launch to Friday?" },
  { from: "us", text: "Yes — staging is green. Shipping Friday 10am." },
  { from: "you", text: "Perfect, thanks!" },
];

function ChatVisual() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="flex flex-col gap-2 rounded-2xl border border-black/[0.06] bg-cream-100/70 p-4 dark:border-white/[0.06] dark:bg-black/25">
      {CHAT.map((m, i) => (
        <motion.div
          key={m.text}
          initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ ...SPRING_REVEAL, delay: 0.25 + i * 0.35 }}
          className={cx(
            "max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug",
            m.from === "us"
              ? "self-end rounded-br-md bg-primary text-white"
              : "self-start rounded-bl-md bg-white text-gray-700 shadow-sm dark:bg-white/[0.07] dark:text-zinc-200",
          )}
        >
          {m.text}
        </motion.div>
      ))}
      <p className="mt-1 self-end font-mono text-[10px] text-gray-400 dark:text-zinc-500">replied in 14 min</p>
    </div>
  );
}

const COMMITS = [
  { sha: "a3f9c21", msg: "feat: checkout flow with UPI + cards", time: "2m" },
  { sha: "7be04d8", msg: "fix: dashboard chart timezone offset", time: "41m" },
  { sha: "c12e6fa", msg: "chore: deploy preview for sprint 4 demo", time: "3h" },
];

function CommitVisual() {
  return (
    <Stagger className="overflow-hidden rounded-2xl border border-black/[0.06] bg-[#0e1013] font-mono text-[12px] dark:border-white/[0.06]" amount={0.5}>
      <div aria-hidden className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5 text-[11px] text-zinc-500">
        <LuGitBranch className="h-3.5 w-3.5 text-primary-bright" aria-hidden />
        main · your-product
      </div>
      {COMMITS.map((c) => (
        <StaggerItem key={c.sha} y={8} className="flex items-center gap-3 border-b border-white/[0.04] px-4 py-2.5 last:border-b-0">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-bright shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
          <span className="text-amber-300/90">{c.sha}</span>
          <span className="truncate text-zinc-300">{c.msg}</span>
          <span className="ml-auto shrink-0 text-zinc-600">{c.time}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const CHANNELS: Channel[] = [
  {
    Icon: FaWhatsapp,
    tool: "WhatsApp",
    iconColor: "text-[#25D366]",
    badge: "Primary",
    description:
      "Your first and fastest line to us. We respond to WhatsApp messages within 2 hours during business hours — no support tickets, no waiting rooms.",
    use: "Quick questions, status updates, urgent issues",
    span: "lg:col-span-4",
    visual: <ChatVisual />,
  },
  {
    Icon: SiNotion,
    tool: "Notion",
    iconColor: "text-gray-900 dark:text-white",
    badge: "Project hub",
    description:
      "Every project gets a shared Notion workspace: task board, sprint roadmap, design specs, and a shared doc for all decisions. You always know what's happening next.",
    use: "Task tracking, sprint planning, shared documentation",
    span: "lg:col-span-2",
  },
  {
    Icon: LuVideo,
    tool: "Sprint Demo Calls",
    iconColor: "text-sky-500 dark:text-sky-400",
    badge: "Every 2 weeks",
    description:
      "Every 2 weeks, we hop on a 30-minute video call to demo what we've built, get your feedback, and plan the next sprint. You see progress before it ships.",
    use: "Sprint reviews, feedback sessions, milestone demos",
    span: "lg:col-span-2",
  },
  {
    Icon: SiFigma,
    tool: "Figma",
    iconColor: "text-[#A259FF]",
    badge: "Design",
    description:
      "All UI/UX designs live in a shared Figma file. Comment directly on designs, approve screens, and request changes — before a single line of code is written.",
    use: "Wireframes, design approval, component library",
    span: "lg:col-span-2",
  },
  {
    Icon: LuMail,
    tool: "Email",
    iconColor: "text-primary",
    badge: "Formal",
    description:
      "Contracts, invoices, NDA documents, and milestone summaries go through email. All key decisions are documented in writing — no verbal surprises.",
    use: "Contracts, invoices, formal project sign-offs",
    span: "lg:col-span-2",
  },
  {
    Icon: SiGithub,
    tool: "GitHub",
    iconColor: "text-gray-900 dark:text-white",
    badge: "Dev transparency",
    description:
      "You get full access to your repository from day one. Watch commits happen in real time, review code, or hand it off to your internal team at any point.",
    use: "Code access, pull request reviews, deployment logs",
    span: "lg:col-span-6",
    visual: <CommitVisual />,
  },
];

const STATS = [
  { value: 2, suffix: " hrs", label: "Max WhatsApp reply time in business hours" },
  { value: 14, suffix: " days", label: "Between live demos of working software" },
  { value: 30, suffix: " days", label: "Post-launch support, included" },
];

const GUARANTEES = [
  { Icon: LuZap, text: "WhatsApp reply within 2 hours" },
  { Icon: LuCalendarDays, text: "Bi-weekly video demo — every sprint" },
  { Icon: LuGitBranch, text: "Full code access from day one" },
  { Icon: LuFileText, text: "All decisions documented in writing" },
  { Icon: LuBellRing, text: "No surprises — blockers flagged immediately" },
  { Icon: LuFlag, text: "30-day post-launch support included" },
];

// ── Tile ──────────────────────────────────────────────────────────────────────
function ChannelTile({ ch }: { ch: Channel }) {
  const wide = Boolean(ch.visual);
  return (
    <SpotlightCard className={cx("h-full p-6 md:p-7", wide && "md:p-8")}>
      <div className={cx("grid h-full gap-6", wide && "md:grid-cols-2 md:items-center md:gap-10")}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.07] bg-white/80 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.05]">
              <ch.Icon aria-hidden className={cx("h-5 w-5", ch.iconColor)} />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400 dark:text-zinc-500">{ch.badge}</span>
          </div>
          <h3 className="font-display mt-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{ch.tool}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-zinc-400">{ch.description}</p>
          <p className="mt-auto pt-5 text-xs text-gray-400 dark:text-zinc-500">
            <span className="font-semibold text-gray-600 dark:text-zinc-300">Used for · </span>
            {ch.use}
          </p>
        </div>
        {ch.visual}
      </div>
    </SpotlightCard>
  );
}

export default function HowWeCommunicate() {
  return (
    <section className="relative py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-1/4 h-[480px] w-[480px] rounded-full bg-cyan-400/[0.05] blur-3xl" />

      <div className="container relative">
        <SectionHeading
          kicker="03 — Communication"
          title={
            <>
              No black boxes. <span className="text-aurora">Ever.</span>
            </>
          }
          description="Most agencies are a black box — you pay, you wait, you hope. Here are the tools we use to keep you in the loop at every step."
        />

        {/* Bento */}
        <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6" staggerDelay={STAGGER}>
          {CHANNELS.map((ch) => (
            <StaggerItem key={ch.tool} className={cx(ch.span, ch.visual && "md:col-span-2")}>
              <ChannelTile ch={ch} />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Promise panel */}
        <Reveal className="mt-4">
          <div className="relative overflow-hidden rounded-3xl border border-black/[0.07] bg-white/70 p-8 backdrop-blur-xl md:p-12 dark:border-white/[0.08] dark:bg-white/[0.03]">
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute -left-20 -bottom-24 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl" />

            <div className="relative grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">Our promise</p>
                <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl">
                  Six promises, on every project.
                </h3>
                <dl className="mt-10 grid grid-cols-3 gap-4">
                  {STATS.map((s) => (
                    <div key={s.label} className="flex flex-col-reverse">
                      <dt className="mt-1 text-xs leading-snug text-gray-500 dark:text-zinc-400">{s.label}</dt>
                      <dd className="font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl dark:text-white">
                        <CountUp value={s.value} />
                        <span className="text-base text-primary md:text-lg">{s.suffix}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <ul className="grid content-start gap-x-8 sm:grid-cols-2 lg:col-span-7">
                {GUARANTEES.map((g, i) => (
                  <li
                    key={g.text}
                    className="flex items-center gap-4 border-b border-black/[0.06] py-4 dark:border-white/[0.06]"
                  >
                    <span className="font-mono text-[11px] text-gray-400 dark:text-zinc-600">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <g.Icon aria-hidden className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-200">{g.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
