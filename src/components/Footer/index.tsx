"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import {
  FiGithub, FiLinkedin, FiTwitter, FiInstagram,
  FiMail, FiMapPin, FiArrowUpRight,
} from "react-icons/fi";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";

// ── Data ─────────────────────────────────────────────────────────────────────

const quickLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services",    href: "/services" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Projects", href: "/projects" },
  { label: "Blog",     href: "/blog" },
  { label: "Support",  href: "/contact" },
];

const services = [
  { label: "Web Development",  href: "/services" },
  { label: "Mobile Apps",      href: "/services" },
  { label: "AI Integration",   href: "/services" },
  { label: "SaaS Products",    href: "/services" },
  { label: "Backend Systems",  href: "/services" },
  { label: "UI / UX Design",   href: "/services" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use",   href: "/terms" },
  { label: "Sitemap",        href: "/sitemap.xml" },
];

const domains = [
  { emoji: "🏥", name: "Healthcare" },
  { emoji: "📚", name: "School ERP" },
  { emoji: "🛒", name: "E-Commerce" },
  { emoji: "🚀", name: "Startups & SaaS" },
  { emoji: "💆", name: "Salon & Spa" },
  { emoji: "🍽️", name: "Restaurant & Food" },
  { emoji: "🏢", name: "Real Estate" },
  { emoji: "💳", name: "FinTech & Payments" },
];

const socials = [
  { label: "GitHub",    href: "https://github.com/techyugantar",                           icon: FiGithub },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/tech-yugantar-6b1147431/",      icon: FiLinkedin },
  { label: "Facebook",  href: "https://www.facebook.com/profile.php?id=61590556752766",   icon: FaFacebook },
  { label: "Twitter",   href: "https://twitter.com/techyugantar",                          icon: FiTwitter },
  { label: "Instagram", href: "https://instagram.com/techyugantar",                        icon: FiInstagram },
];

// ── Reusable column header ────────────────────────────────────────────────────
function ColHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
      {children}
    </h3>
  );
}

// ── Reusable link item ────────────────────────────────────────────────────────
function FooterLink({ href, children, external = false }: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
      >
        {children}
        {external && (
          <FiArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        )}
      </Link>
    </li>
  );
}

// ── Main footer ───────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="relative bg-zinc-950 text-zinc-300 overflow-hidden">

      {/* ── Top gradient shimmer line (Launch UI signature) ─────────────── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* ── Ambient glow blob ────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[280px] w-[600px] rounded-full bg-primary/10 blur-[120px]"
      />

      {/* ── Subtle grid pattern overlay ──────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="container relative py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">

          {/* Brand column — wider */}
          <Reveal className="lg:col-span-3">
            <Link href="/" className="mb-6 inline-block">
              {/* Always show the light logo since footer is always dark */}
              <Image
                src="/images/logo/logo.png"
                alt="Tech Yugantar"
                width={150}
                height={32}
                className="w-36"
              />
            </Link>

            <p className="mb-2 text-sm font-medium text-zinc-300">
              Architecting the Digital Era
            </p>
            <p className="mb-8 max-w-xs text-sm leading-relaxed text-zinc-500">
              We design and build world-class software — web apps, mobile, AI, and SaaS — from Varanasi, India. Your vision, our execution.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 backdrop-blur-sm transition-colors duration-200 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>

            {/* Contact pill */}
            <div className="mt-8 space-y-3">
              <a
                href="mailto:info@techyugantar.in"
                className="flex items-center gap-2.5 text-sm text-zinc-500 transition-colors duration-200 hover:text-white"
              >
                <FiMail className="h-4 w-4 shrink-0 text-primary" />
                info@techyugantar.in
              </a>
              <div className="flex items-center gap-2.5 text-sm text-zinc-500">
                <FiMapPin className="h-4 w-4 shrink-0 text-primary" />
                Varanasi, Uttar Pradesh, India
              </div>
            </div>
          </Reveal>

          {/* Quick Links */}
          <Reveal delay={0.05} className="lg:col-span-2">
            <ColHeader>Quick Links</ColHeader>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>
              ))}
            </ul>
          </Reveal>

          {/* Services */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <ColHeader>Services</ColHeader>
            <ul className="space-y-3">
              {services.map((l) => (
                <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>
              ))}
            </ul>
          </Reveal>


          {/* Industries / Domains */}
          <Reveal delay={0.12} className="lg:col-span-2">
            <ColHeader>Industries</ColHeader>
            <ul className="grid grid-cols-1 gap-y-2.5">
              {domains.map(({ emoji, name }) => (
                <li key={name}>
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors duration-200 cursor-default">
                    <span className="text-sm leading-none">{emoji}</span>
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* CTA / Get in touch */}
          <Reveal delay={0.15} className="lg:col-span-3">
            <ColHeader>Start a Project</ColHeader>
            <p className="mb-6 text-sm leading-relaxed text-zinc-500">
              Ready to build something great? Let's talk about your idea.
            </p>

            <Link
              href="/contact"
              className="
                mb-4 inline-flex items-center gap-2 rounded-full
                border border-t-primary/60 border-white/10
                bg-gradient-to-b from-primary/60 to-primary px-5 py-2.5
                text-sm font-semibold text-white shadow-[0_0_20px_rgba(57,157,145,0.35)]
                transition-all duration-300 hover:shadow-[0_0_28px_rgba(57,157,145,0.55)] hover:scale-105
              "
            >
              Get a Quote
              <FiArrowUpRight className="h-4 w-4" />
            </Link>

            {/* WhatsApp CTA */}
            <div className="mt-3">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}?text=${encodeURIComponent("Hi Tech Yugantar, I'd like to know more about your services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors duration-200 hover:text-[#25D366]"
              >
                <FaWhatsapp className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Legal */}
            <div className="mt-8 border-t border-white/5 pt-6">
              <ul className="space-y-2.5">
                {legal.map((l) => (
                  <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="relative border-t border-white/[0.06]">
        {/* Thin gradient line above bottom bar */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

            {/* Copyright */}
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()}{" "}
              <a
                href="https://techyugantar.in"
                className="font-medium text-zinc-300 transition-colors duration-200 hover:text-white"
              >
                Tech Yugantar
              </a>
              . All rights reserved.
            </p>

            {/* Status dot + tagline */}
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-sm text-zinc-500">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for new projects
              </span>
              <span className="hidden sm:block text-sm text-zinc-600">
                Made with ♥ in Varanasi
              </span>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}
