"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowRight, FiCheck, FiClock, FiLoader, FiMail, FiMapPin, FiShield } from "react-icons/fi";
import NewsLatterBox from "./NewsLatterBox";
import { Reveal } from "@/components/motion";
import { SPRING_HOVER, SPRING_REVEAL } from "@/components/ui/utils";

const PROJECT_TYPES = ["Web app", "Mobile app", "ERP / internal tool", "AI integration", "E-commerce", "Something else"];
const BUDGETS = ["Under ₹1L", "₹1L – ₹5L", "₹5L – ₹15L", "₹15L+", "Not sure yet"];

const inputClass =
  "peer w-full rounded-xl border border-black/[0.08] bg-white/80 px-4 pb-2.5 pt-6 text-[15px] text-gray-900 outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-transparent focus:border-primary/60 focus:shadow-[0_0_0_4px_rgba(20,184,166,0.12)] dark:border-white/[0.08] dark:bg-black/20 dark:text-white";
const labelClass =
  "pointer-events-none absolute left-4 top-4 origin-left text-[15px] text-gray-400 transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] dark:text-zinc-500";

function FloatingField({
  id,
  label,
  type = "text",
  textarea,
  autoComplete,
  defaultValue,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} name={id} required rows={5} placeholder={label} defaultValue={defaultValue} className={`${inputClass} resize-none`} />
      ) : (
        <input id={id} name={id} type={type} required placeholder={label} autoComplete={autoComplete} className={inputClass} />
      )}
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
    </div>
  );
}

/** Single-select chip group backed by a hidden input so FormData picks it up. */
function ChipGroup({ name, legend, options }: { name: string; legend: string; options: string[] }) {
  const [value, setValue] = useState("");
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-gray-700 dark:text-zinc-300">{legend}</legend>
      <input type="hidden" name={name} value={value} />
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <motion.button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => setValue(active ? "" : opt)}
              whileTap={{ scale: 0.95 }}
              transition={SPRING_HOVER}
              className={`relative rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-200 ${
                active
                  ? "border-primary/50 text-teal-700 dark:text-teal-200"
                  : "border-black/[0.08] text-gray-600 hover:border-black/20 hover:text-gray-900 dark:border-white/[0.1] dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white"
              }`}
            >
              {active && (
                <motion.span
                  layoutId={`chip-${name}`}
                  transition={SPRING_HOVER}
                  className="absolute inset-0 rounded-full bg-primary/10"
                />
              )}
              <span className="relative">{opt}</span>
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
}

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  // The pricing calculator links here with ?msg=<estimate summary>; prefill the message with it.
  const [prefill, setPrefill] = useState("");
  useEffect(() => {
    const msg = new URLSearchParams(window.location.search).get("msg");
    if (msg) setPrefill(msg.slice(0, 2000));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Tech Yugantar! I'd like to discuss a project. Can we connect?",
  )}`;

  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-teal-500/[0.07] blur-3xl" />

      <div className="container relative grid gap-6 lg:grid-cols-12">
        {/* ── Project form ─────────────────────────────────────────────── */}
        <Reveal className="lg:col-span-8">
          <div className="relative overflow-hidden rounded-3xl border border-black/[0.07] bg-white/70 p-7 backdrop-blur-xl sm:p-10 dark:border-white/[0.08] dark:bg-white/[0.03]">
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">Start a project</p>
            <h2 className="font-display mb-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              Tell us what you&apos;re building
            </h2>
            <p className="mb-8 text-gray-500 dark:text-zinc-400">
              We reply within <span className="font-medium text-gray-900 dark:text-white">24 business hours</span> — with
              questions, a rough plan, or a time to talk.
            </p>

            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={SPRING_REVEAL}
                  className="flex flex-col items-start gap-4 rounded-2xl border border-primary/25 bg-primary/[0.05] p-8"
                  role="status"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ ...SPRING_HOVER, delay: 0.1 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-teal-400 to-teal-600 text-white shadow-[0_0_30px_rgba(45,212,191,0.45)]"
                  >
                    <FiCheck className="h-6 w-6" aria-hidden />
                  </motion.span>
                  <div>
                    <p className="font-display text-xl font-semibold text-gray-900 dark:text-white">Message received.</p>
                    <p className="mt-1 text-gray-500 dark:text-zinc-400">
                      Thanks for reaching out — someone from the team will get back to you within one business day.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-7"
                >
                  {/* Honeypot — hidden from people, catches bots */}
                  <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FloatingField id="name" label="Your name" autoComplete="name" />
                    <FloatingField id="email" label="Work email" type="email" autoComplete="email" />
                  </div>

                  <ChipGroup name="projectType" legend="What are you building?" options={PROJECT_TYPES} />
                  <ChipGroup name="budget" legend="Rough budget" options={BUDGETS} />

                  <FloatingField key={prefill} id="message" label="A few lines about the project, goals and timeline" textarea defaultValue={prefill} />

                  {status === "error" && (
                    <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-600 dark:text-red-400">
                      Something went wrong. Please try again, or email us at{" "}
                      <a href="mailto:info@techyugantar.in" className="font-medium underline">info@techyugantar.in</a>.
                    </p>
                  )}

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      transition={SPRING_HOVER}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-shadow duration-300 hover:shadow-[0_0_48px_rgba(45,212,191,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <>
                          <FiLoader className="h-4 w-4 animate-spin" aria-hidden /> Sending…
                        </>
                      ) : (
                        <>
                          Send project inquiry
                          <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                        </>
                      )}
                    </motion.button>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-zinc-500">
                      {["Free consultation", "NDA on request", "No-obligation quote"].map((t) => (
                        <li key={t} className="flex items-center gap-1.5">
                          <FiCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* ── Sidebar ──────────────────────────────────────────────────── */}
        <Reveal delay={0.1} className="space-y-6 lg:col-span-4">
          {/* WhatsApp — hidden when no number is configured, rather than linking nowhere */}
          {whatsappNumber && (
          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            transition={SPRING_HOVER}
            className="group relative block overflow-hidden rounded-2xl border border-[#25D366]/25 bg-[#25D366]/[0.06] p-7 backdrop-blur-xl"
          >
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#25D366]/20 blur-3xl" />
            <div className="relative flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-[0_0_24px_rgba(37,211,102,0.35)]">
                <FaWhatsapp className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-gray-900 dark:text-white">Chat on WhatsApp</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
                  Prefer a quick chat? Most messages get a reply within 2 hours.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1aa851] dark:text-[#4ade80]">
                  Start a chat
                  <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </div>
          </motion.a>
          )}

          {/* Details */}
          <div className="rounded-2xl border border-black/[0.07] bg-white/70 p-7 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03]">
            <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Contact details</p>
            <ul className="space-y-4 text-sm">
              {[
                { Icon: FiMail, text: "info@techyugantar.in", href: "mailto:info@techyugantar.in" },
                { Icon: FiMapPin, text: "Varanasi, Uttar Pradesh, India" },
                { Icon: FiClock, text: "Mon–Sat, 9 AM – 7 PM IST" },
                { Icon: FiShield, text: "NDA available on request" },
              ].map(({ Icon, text, href }) => (
                <li key={text} className="flex items-center gap-3 text-gray-600 dark:text-zinc-300">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/15">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {href ? (
                    <a href={href} className="transition-colors hover:text-primary">{text}</a>
                  ) : (
                    text
                  )}
                </li>
              ))}
            </ul>
          </div>

          <NewsLatterBox />
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
