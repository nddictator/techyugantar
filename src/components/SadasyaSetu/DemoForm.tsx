"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";

const field =
  "w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-base text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-white/10 dark:bg-white/[0.04] dark:text-white";
const label = "grid gap-1.5 text-sm font-medium text-gray-700 dark:text-zinc-300";

type State = "idle" | "sending" | "sent" | "failed";

/** Sends a demo request to /api/demo-request, which mails it to the team. */
export default function DemoForm() {
  const [state, setState] = useState<State>("idle");
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("sending");
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setState(response.ok ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white/70 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03]">
      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="py-10 text-center"
          >
            <div className="text-4xl" aria-hidden>
              🙏
            </div>
            <h3 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">Thank you!</h3>
            <p className="mt-2 text-gray-500 dark:text-zinc-400">We will call you within one working day to fix a time.</p>
            <p lang="hi" className="mt-1 text-gray-500 dark:text-zinc-400">
              धन्यवाद! हम एक कार्य-दिवस में आपसे संपर्क करेंगे।
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} className="grid gap-4" exit={{ opacity: 0, y: -8 }}>
            {/* Real people never fill this; the server drops requests that do. */}
            <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={label}>
                Your name
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className={label}>
                Phone
                <input name="phone" type="tel" required autoComplete="tel" pattern="[0-9+ -]{10,15}" className={field} />
              </label>
            </div>
            <label className={label}>
              Organization
              <input name="organization" required placeholder="e.g. Shree Krishna Milk Producer Company" className={field} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={label}>
                Email <span className="font-normal text-gray-400">(optional)</span>
                <input name="email" type="email" autoComplete="email" className={field} />
              </label>
              <label className={label}>
                State
                <input name="state" autoComplete="address-level1" className={field} />
              </label>
            </div>
            <label className={label}>
              Members you plan to add this year
              <select name="members" className={field} defaultValue="Up to 5,000">
                <option>Up to 5,000</option>
                <option>5,000 to 25,000</option>
                <option>25,000 to 75,000</option>
                <option>More than 75,000</option>
              </select>
            </label>
            <label className={label}>
              Anything we should know? <span className="font-normal text-gray-400">(optional)</span>
              <textarea name="message" rows={3} className={field} />
            </label>
            {state === "failed" ? (
              <p className="text-sm text-red-500">
                It did not go through. Please try again, or write to info@techyugantar.in.
              </p>
            ) : null}
            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                type="submit"
                disabled={state === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="rounded-xl bg-primary px-7 py-3.5 font-semibold text-white disabled:opacity-60"
              >
                {state === "sending" ? "Sending…" : "Request a demo"}
              </motion.button>
              {whatsapp ? (
                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi, I'd like a demo of SadasyaSetu for our MPO.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  or ask on WhatsApp →
                </a>
              ) : null}
            </div>
            <p className="text-xs text-gray-400">We use these details only to contact you about SadasyaSetu.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
