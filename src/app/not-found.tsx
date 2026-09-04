"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-dark">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-teal-400/8 blur-3xl" />

      <div className="container relative flex min-h-screen flex-col items-center justify-center py-20 text-center">

        {/* Glowing 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="mb-6 select-none"
        >
          <span
            className="text-[130px] font-extrabold leading-none tracking-tighter sm:text-[180px]"
            style={{
              backgroundImage: "linear-gradient(135deg, #399D91 0%, #22D3EE 50%, #399D91 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 40px rgba(57,157,145,0.35))",
            }}
          >
            404
          </span>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 80 }}
          className="mb-6 text-6xl"
        >
          🔭
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
          className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
        >
          This page doesn&apos;t exist — yet.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, type: "spring", stiffness: 80 }}
          className="mb-10 max-w-lg text-base leading-relaxed text-gray-600 dark:text-zinc-400"
        >
          The page you&apos;re looking for may have moved, been renamed, or never existed.
          But don&apos;t worry — everything you need is just one click away.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, type: "spring", stiffness: 80 }}
          className="mb-14 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90"
          >
            ← Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
          >
            Contact Us
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-zinc-600">
            Or jump to
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Services", href: "/services" },
              { label: "Projects", href: "/projects" },
              { label: "Pricing", href: "/pricing" },
              { label: "Blog", href: "/blog" },
              { label: "About", href: "/about" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-primary/40 hover:text-primary dark:border-white/[0.08] dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}
