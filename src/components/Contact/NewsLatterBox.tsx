"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowRight, FiCheck, FiLoader, FiMail } from "react-icons/fi";
import { SPRING_HOVER, SPRING_REVEAL } from "@/components/ui/utils";

type Status = "idle" | "sending" | "success" | "error";

/** Newsletter signup — posts to /api/newsletter, which adds the contact in Resend. */
const NewsLatterBox = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white/70 p-7 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03]">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-teal-500/15 blur-3xl" />

      <div className="relative">
        <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
          <FiMail className="h-[18px] w-[18px]" aria-hidden />
        </span>
        <h3 className="font-display mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          The build log
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
          Engineering notes, case studies and practical tips from the Tech Yugantar team — occasional, useful, no spam.
        </p>

        <AnimatePresence mode="wait" initial={false}>
          {status === "success" ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={SPRING_REVEAL}
              className="flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/[0.06] px-4 py-3 text-sm text-gray-700 dark:text-zinc-200"
              role="status"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <FiCheck className="h-4 w-4" aria-hidden />
              </span>
              You&apos;re subscribed. Watch your inbox.
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
              noValidate={false}
            >
              <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <label className="sr-only" htmlFor="nl-name">Your name</label>
              <input
                id="nl-name"
                type="text"
                name="name"
                autoComplete="given-name"
                placeholder="First name (optional)"
                className="w-full rounded-xl border border-black/[0.08] bg-white/80 px-4 py-3 text-sm text-gray-900 outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gray-400 focus:border-primary/60 focus:shadow-[0_0_0_4px_rgba(20,184,166,0.12)] dark:border-white/[0.08] dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-500"
              />
              <label className="sr-only" htmlFor="nl-email">Email address</label>
              <div className="relative">
                <input
                  id="nl-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-black/[0.08] bg-white/80 py-3 pl-4 pr-14 text-sm text-gray-900 outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gray-400 focus:border-primary/60 focus:shadow-[0_0_0_4px_rgba(20,184,166,0.12)] dark:border-white/[0.08] dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-500"
                />
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  transition={SPRING_HOVER}
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-gradient-to-b from-teal-400 to-teal-600 text-white shadow-[0_0_18px_rgba(45,212,191,0.35)] disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <FiLoader className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <FiArrowRight className="h-4 w-4" aria-hidden />
                  )}
                </motion.button>
              </div>
              {status === "error" && (
                <p role="alert" className="text-xs text-red-500 dark:text-red-400">{error}</p>
              )}
              <p className="text-xs text-gray-400 dark:text-zinc-500">You can unsubscribe at any time.</p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NewsLatterBox;
