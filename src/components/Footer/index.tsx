"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";
import { SpringLink } from "@/components/ui/SpringButton";
import { SPRING_HOVER, SPRING_SURFACE } from "@/components/ui/utils";

// ── Data ─────────────────────────────────────────────────────────────────────

const EMAIL = "info@techyugantar.in";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

const company = [
  { label: "About",       href: "/about" },
  { label: "Our Team",    href: "/about#team" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Projects",    href: "/projects" },
  { label: "Pricing",     href: "/pricing" },
  { label: "Blog",        href: "/blog" },
  { label: "Contact",     href: "/contact" },
];

const services = [
  { label: "Web Development", href: "/services" },
  { label: "Mobile Apps",     href: "/services" },
  { label: "AI Integration",  href: "/services" },
  { label: "SaaS Products",   href: "/services" },
  { label: "Backend Systems", href: "/services" },
  { label: "UI / UX Design",  href: "/services" },
];

const connect = [
  { label: "Email", href: `mailto:${EMAIL}` },
  // TODO: add GitHub / X / Instagram once the real handles are confirmed
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tech-yugantar-6b1147431/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590556752766" },
  ...(WHATSAPP_NUMBER
    ? [{
        label: "WhatsApp",
        href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Tech Yugantar, I'd like to know more about your services.")}`,
      }]
    : []),
];

const industries = [
  "Healthcare", "School ERP", "E-Commerce", "Startups & SaaS",
  "Salon & Spa", "Restaurant & Food", "Real Estate", "FinTech & Payments",
];

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms",   href: "/terms" },
];

// ── Pieces ───────────────────────────────────────────────────────────────────

function Kicker({ children }: { children: ReactNode }) {
  return <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">{children}</h3>;
}

/** Footer link with a spring-drawn underline; external links get an arrow that nudges out. */
function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const external = /^(https?:|mailto:)/.test(href);
  const content = (
    <motion.span initial="rest" whileHover="hover" animate="rest" className="relative inline-flex items-center gap-1">
      {children}
      {external && (
        <motion.span variants={{ rest: { x: 0, y: 0, opacity: 0.4 }, hover: { x: 2, y: -2, opacity: 1 } }} transition={SPRING_HOVER}>
          <FiArrowUpRight aria-hidden className="h-3.5 w-3.5" />
        </motion.span>
      )}
      <motion.span
        aria-hidden
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={SPRING_HOVER}
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-primary-bright"
      />
    </motion.span>
  );
  const className = "text-[15px] text-zinc-400 transition-colors duration-200 hover:text-white";

  return (
    <li>
      {external ? (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={className}>
          {content}
        </a>
      ) : (
        <Link href={href} className={className}>{content}</Link>
      )}
    </li>
  );
}

/** Live local time in Varanasi — rendered client-side only to avoid a hydration mismatch. */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit", hour12: true });
    const tick = () => setTime(fmt.format(new Date()).toUpperCase());
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums text-zinc-200">{time ?? "--:--"}</span>;
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING_HOVER}
      aria-label={`Copy email address ${EMAIL}`}
      className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left backdrop-blur-md transition-colors duration-300 hover:border-primary/40 hover:bg-white/[0.06]"
    >
      <span className="text-base font-medium text-white">{EMAIL}</span>
      <span className="relative flex h-5 w-5 items-center justify-center text-zinc-500 group-hover:text-primary-bright">
        <AnimatePresence mode="popLayout" initial={false}>
          {copied ? (
            <motion.span key="ok" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={SPRING_HOVER} className="text-primary-bright">
              <FiCheck aria-hidden className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={SPRING_HOVER}>
              <FiCopy aria-hidden className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span aria-live="polite" className="sr-only">{copied ? "Email copied" : ""}</span>
    </motion.button>
  );
}

/**
 * Full-bleed outlined wordmark. A cursor-tracked aurora spotlight lights up
 * the letters under the pointer; touch and reduced-motion get a static glow.
 */
function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, [reduce]);

  const mask = active
    ? "radial-gradient(260px circle at var(--mx) var(--my), black 0%, transparent 70%)"
    : "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 85%)";

  const text = (
    <text x="0" y="118" textLength="1000" lengthAdjust="spacingAndGlyphs" className="font-display" style={{ fontSize: 150, fontWeight: 600, letterSpacing: "-0.02em" }}>
      TECH YUGANTAR
    </text>
  );

  return (
    // The unclipped outer box observes the viewport; the inner layer rises
    // into it. (Observing the shifted, clipped layer itself never crossed the
    // threshold, so the wordmark stayed hidden.)
    <motion.div
      ref={ref}
      aria-hidden
      onMouseMove={onMove}
      onMouseEnter={() => !reduce && setActive(true)}
      onMouseLeave={() => setActive(false)}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative mx-auto select-none overflow-hidden [--mx:50%] [--my:50%]"
    >
      <motion.div
        variants={{ hidden: { y: "60%", opacity: 0 }, show: { y: 0, opacity: 1 } }}
        transition={SPRING_SURFACE}
        className="relative"
      >
        {/* Outline layer */}
        <svg viewBox="0 0 1000 132" className="block h-auto w-full fill-transparent stroke-white/[0.09]" strokeWidth={1}>
          {text}
        </svg>
        {/* Aurora layer, revealed by the spotlight mask */}
        <svg
          viewBox="0 0 1000 132"
          className="absolute inset-0 block h-auto w-full transition-[mask-image] duration-300"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        >
          <defs>
            <linearGradient id="footer-aurora" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="45%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#67E8F9" />
            </linearGradient>
          </defs>
          <g fill="url(#footer-aurora)" fillOpacity={0.9}>{text}</g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ── Main footer ───────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-obsidian text-zinc-300">
      <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[460px] w-[760px] rounded-full blur-[130px] motion-safe:animate-[aurora-drift_16s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(ellipse at center, rgba(45,212,191,0.14), transparent 70%)" }} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 60% 70% at 80% 0%, black 10%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 80% 0%, black 10%, transparent 70%)",
        }}
      />

      <div className="container relative">
        {/* ── Closing statement ──────────────────────────────────────────── */}
        <div className="grid gap-10 pt-20 pb-14 md:pt-28 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={SPRING_SURFACE}
            className="lg:col-span-7"
          >
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-primary-bright">Start a project</p>
            <h2 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Have an idea?<br />
              <span className="text-aurora">Let&apos;s build it.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...SPRING_SURFACE, delay: 0.08 }}
            className="flex flex-col gap-4 lg:col-span-5 lg:items-end"
          >
            <SpringLink
              href="/contact"
              className="w-full rounded-full! bg-gradient-to-b from-teal-400 to-teal-600 shadow-[0_0_30px_rgba(45,212,191,0.35)] sm:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                Start a project
                <FiArrowUpRight aria-hidden className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </SpringLink>
            <CopyEmail />
          </motion.div>
        </div>

        {/* Status strip */}
        <dl className="grid grid-cols-1 gap-4 border-y border-white/[0.07] py-5 font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 sm:grid-cols-3">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            <dt className="sr-only">Status</dt>
            <dd className="text-zinc-200">Available for new projects</dd>
          </div>
          <div className="flex items-center gap-2 sm:justify-center">
            <dt>Varanasi, IN</dt>
            <dd><LocalTime /> IST</dd>
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <dt>Replies</dt>
            <dd className="text-zinc-200">Within 24 business hrs</dd>
          </div>
        </dl>

        {/* ── Link grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-block">
              <Image src="/images/logo/logo.png" alt="Tech Yugantar" width={150} height={32} className="h-auto w-36" />
            </Link>
            <p className="mt-6 font-display text-lg font-medium text-white">Architecting the Digital Era</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-500">
              We design and build world-class software — web apps, mobile, AI, and SaaS — from Varanasi, India.
            </p>
          </div>

          <nav aria-label="Company" className="md:col-span-2">
            <Kicker>Company</Kicker>
            <ul className="space-y-3">
              {company.map((l) => <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>)}
            </ul>
          </nav>

          <nav aria-label="Services" className="md:col-span-3">
            <Kicker>Services</Kicker>
            <ul className="space-y-3">
              {services.map((l) => <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>)}
            </ul>
          </nav>

          <nav aria-label="Connect" className="col-span-2 sm:col-span-1 md:col-span-3">
            <Kicker>Connect</Kicker>
            <ul className="space-y-3">
              {connect.map((l) => <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>)}
            </ul>
          </nav>
        </div>

        {/* Industries line */}
        <div className="flex flex-col gap-3 border-t border-white/[0.07] py-6 md:flex-row md:items-baseline md:gap-8">
          <p className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">Industries</p>
          <p className="text-sm leading-relaxed text-zinc-500">
            {industries.map((name, i) => (
              <span key={name} className="inline-block whitespace-nowrap">
                {name}
                {i < industries.length - 1 && <span aria-hidden className="mx-2.5 text-zinc-700">·</span>}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* ── Signature wordmark ───────────────────────────────────────────── */}
      <div className="container relative">
        <Wordmark />
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="container relative">
        <div className="flex flex-col gap-3 border-t border-white/[0.07] py-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Tech Yugantar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <ul className="flex items-center gap-5">
              {legal.map((l) => <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>)}
            </ul>
            <span className="hidden text-zinc-600 md:inline">Made in Varanasi, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
