"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { FiLinkedin } from "react-icons/fi";
import teamData, { companyStory } from "@/data/team";

function Avatar({ initials, bg }: { initials: string; bg: string }) {
  return (
    <div
      className={`flex h-20 w-20 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg ${bg}`}
    >
      {initials}
    </div>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="relative py-16 md:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            The People Behind the Code
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-[42px]">
            Meet the Team
          </h2>
          <p className="mx-auto max-w-[560px] text-base leading-relaxed text-gray-600 dark:text-zinc-400">
            We&apos;re a small, senior team — no juniors hidden in the delivery, no offshore outsourcing. You work directly with the people building your product.
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamData.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.08 }}
              className={`group relative rounded-2xl border p-7 transition-all duration-300
                border-gray-200 bg-white shadow-sm hover:border-primary/30 hover:shadow-lg
                dark:border-white/[0.08] dark:bg-zinc-900/60 dark:hover:border-primary/20
                ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
              `}
            >
              {/* Top shimmer on hover */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-start gap-5">
                <div className="relative">
                  <Avatar initials={member.avatar} bg={member.avatarBg} />
                  <span className="absolute -bottom-1 -right-1 text-2xl">{member.emoji}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    {member.linkedin && (
                      <Link
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 transition-colors duration-200 hover:text-primary dark:text-zinc-500"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <FiLinkedin className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                    {member.role}
                  </p>
                </div>
              </div>

              <p className="mt-4 mb-5 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
                {member.bio}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-white/[0.06] dark:text-zinc-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="mb-10 text-center"
        >
          <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            What We Stand For
          </h3>
          <p className="text-gray-600 dark:text-zinc-400">The values that drive every decision we make.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companyStory.values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.07 }}
              className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/[0.07] dark:bg-zinc-900/40"
            >
              <span className="mt-0.5 text-2xl">{v.emoji}</span>
              <div>
                <p className="mb-1 text-sm font-bold text-gray-900 dark:text-white">{v.title}</p>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-zinc-400">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
