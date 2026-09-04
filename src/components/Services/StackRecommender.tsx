"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

type Stack = {
  id: string;
  label: string;
  icon: string;
  description: string;
  tags: string[];
  color: string;
};

type StackCombo = {
  title: string;
  tagline: string;
  bestFor: string[];
  frontend: string;
  backend: string;
  database: string;
  mobile?: string;
  devops: string;
  pros: string[];
  badge: string;
  badgeColor: string;
  gradient: string;
};

const useCases: Stack[] = [
  {
    id: "saas",
    label: "SaaS / Web App",
    icon: "🌐",
    description: "A scalable multi-tenant web application",
    tags: ["web", "saas"],
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: "🛒",
    description: "Online store with payments & inventory",
    tags: ["ecommerce", "web"],
    color: "from-orange-500/20 to-yellow-500/10",
  },
  {
    id: "mobile",
    label: "Mobile App",
    icon: "📱",
    description: "iOS + Android app from a single codebase",
    tags: ["mobile", "app"],
    color: "from-purple-500/20 to-pink-500/10",
  },
  {
    id: "erp",
    label: "ERP / Internal Tool",
    icon: "🏭",
    description: "Business operations & workflow automation",
    tags: ["erp", "enterprise"],
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "cms",
    label: "Content / Blog",
    icon: "✍️",
    description: "Content-heavy site or publishing platform",
    tags: ["cms", "blog", "seo"],
    color: "from-rose-500/20 to-pink-500/10",
  },
  {
    id: "api",
    label: "API / Microservices",
    icon: "⚡",
    description: "High-performance backend or data pipeline",
    tags: ["api", "backend"],
    color: "from-amber-500/20 to-orange-500/10",
  },
];

const recommendations: Record<string, StackCombo> = {
  saas: {
    title: "Next.js + Django + PostgreSQL",
    tagline: "The proven SaaS powerhouse",
    bestFor: ["Multi-tenant apps", "Dashboard products", "B2B platforms", "Subscription services"],
    frontend: "Next.js (App Router) + TypeScript + Tailwind CSS",
    backend: "Django REST Framework + Celery for async tasks",
    database: "PostgreSQL (primary) + Redis (caching & queues)",
    devops: "Docker + AWS / Google Cloud + CI/CD pipeline",
    pros: [
      "Server-side rendering for fast load & SEO",
      "Django's admin saves weeks of internal tooling",
      "PostgreSQL handles complex relational data well",
      "Scales horizontally with ease",
    ],
    badge: "Most Popular",
    badgeColor: "bg-blue-500/15 text-blue-600 border-blue-500/30 dark:text-blue-400",
    gradient: "from-blue-500/10 via-transparent to-cyan-500/5",
  },
  ecommerce: {
    title: "Next.js + Laravel + MySQL",
    tagline: "Fast storefront, powerful backend",
    bestFor: ["Online stores", "Marketplaces", "Product catalogs", "Checkout flows"],
    frontend: "Next.js + TypeScript + Tailwind CSS",
    backend: "Laravel (PHP) — battle-tested for e-commerce",
    database: "MySQL (primary) + Redis (sessions & cart)",
    devops: "Docker + AWS + CloudFront CDN",
    pros: [
      "Laravel has mature e-commerce ecosystem (Cashier, Sanctum)",
      "Next.js gives blazing fast product pages",
      "MySQL is rock-solid for transactional data",
      "Easy payment gateway integrations",
    ],
    badge: "E-commerce Ready",
    badgeColor: "bg-orange-500/15 text-orange-600 border-orange-500/30 dark:text-orange-400",
    gradient: "from-orange-500/10 via-transparent to-yellow-500/5",
  },
  mobile: {
    title: "Flutter + Node.js + Firebase",
    tagline: "Ship to iOS & Android simultaneously",
    bestFor: ["Consumer apps", "Startup MVPs", "Real-time features", "Cross-platform products"],
    frontend: "Flutter (single codebase → iOS + Android)",
    backend: "Node.js + Express / FastAPI for REST API",
    database: "Firebase (real-time) + PostgreSQL (structured data)",
    mobile: "Flutter with Provider / Riverpod state management",
    devops: "Firebase Hosting + Google Cloud Run",
    pros: [
      "One codebase, two stores — half the dev cost",
      "Firebase handles real-time sync out of the box",
      "Node.js is fast for I/O-heavy mobile backends",
      "Push notifications & analytics built in",
    ],
    badge: "Best for Mobile",
    badgeColor: "bg-purple-500/15 text-purple-600 border-purple-500/30 dark:text-purple-400",
    gradient: "from-purple-500/10 via-transparent to-pink-500/5",
  },
  erp: {
    title: "React + Django + PostgreSQL",
    tagline: "Enterprise-grade, built to last",
    bestFor: ["Internal dashboards", "Workflow automation", "Role-based tools", "Reporting systems"],
    frontend: "React + TypeScript — rich, interactive UI",
    backend: "Django + DRF — powerful ORM & admin panel",
    database: "PostgreSQL — handles complex schemas & reports",
    devops: "Docker + On-premise or Private Cloud",
    pros: [
      "Django admin gives you a full back-office for free",
      "PostgreSQL handles multi-tenant data isolation cleanly",
      "React makes complex dashboards manageable",
      "Battle-tested in production ERPs worldwide",
    ],
    badge: "Enterprise Pick",
    badgeColor: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:text-emerald-400",
    gradient: "from-emerald-500/10 via-transparent to-teal-500/5",
  },
  cms: {
    title: "Next.js + WordPress (Headless) + MySQL",
    tagline: "SEO-first content delivery",
    bestFor: ["Blogs & news sites", "Marketing sites", "Content teams", "SEO-heavy products"],
    frontend: "Next.js — static generation for perfect Core Web Vitals",
    backend: "WordPress (Headless CMS) via REST or GraphQL",
    database: "MySQL — WordPress-native, battle-tested",
    devops: "Vercel / Netlify + CDN edge caching",
    pros: [
      "Content editors love the WordPress interface",
      "Next.js SSG gives near-instant page loads",
      "Built-in SEO with metadata & structured data",
      "Deploy globally via CDN for sub-100ms responses",
    ],
    badge: "SEO Champion",
    badgeColor: "bg-rose-500/15 text-rose-600 border-rose-500/30 dark:text-rose-400",
    gradient: "from-rose-500/10 via-transparent to-pink-500/5",
  },
  api: {
    title: "FastAPI + PostgreSQL + Redis",
    tagline: "Maximum throughput, minimal overhead",
    bestFor: ["REST APIs", "Data pipelines", "ML backends", "Microservices"],
    frontend: "Any frontend or direct API consumers",
    backend: "FastAPI (Python) — async, auto-documented, blazing fast",
    database: "PostgreSQL (persistence) + Redis (caching & pub/sub)",
    devops: "Docker + Kubernetes + AWS / GCP",
    pros: [
      "Automatic OpenAPI docs — zero extra effort",
      "Async request handling for high concurrency",
      "Type-safe with Pydantic — fewer bugs in production",
      "Scales to thousands of requests per second",
    ],
    badge: "High Performance",
    badgeColor: "bg-amber-500/15 text-amber-600 border-amber-500/30 dark:text-amber-400",
    gradient: "from-amber-500/10 via-transparent to-orange-500/5",
  },
};

const StackCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) => (
  <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
    <span className="mt-0.5 text-base">{icon}</span>
    <div className="min-w-0">
      <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-widest text-primary/70">
        {label}
      </p>
      <p className="text-sm leading-snug text-gray-700 dark:text-zinc-300">{value}</p>
    </div>
  </div>
);

export default function StackRecommender() {
  const [selected, setSelected] = useState<string | null>(null);
  const rec = selected ? recommendations[selected] : null;

  return (
    <section className="relative py-16 md:py-20 lg:py-28">
      {/* Top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />

      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Stack Advisor
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-[42px]">
            Which Stack Is Right for You?
          </h2>
          <p className="mx-auto max-w-[560px] text-base leading-relaxed text-gray-600 dark:text-zinc-400">
            Tell us what you&apos;re building — we&apos;ll show you the best technology combination and why.
          </p>
        </motion.div>

        {/* Use-case selector */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {useCases.map((uc, i) => (
            <motion.button
              key={uc.id}
              onClick={() => setSelected(uc.id === selected ? null : uc.id)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 90, damping: 20, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={`
                group relative flex flex-col items-center gap-2 rounded-2xl border px-3 py-5
                text-center transition-all duration-300 cursor-pointer
                ${
                  selected === uc.id
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/15 dark:bg-primary/15"
                    : "border-gray-200 bg-white hover:border-primary/40 hover:shadow-md dark:border-white/[0.08] dark:bg-zinc-950/60 dark:hover:border-primary/30"
                }
              `}
            >
              <span className="text-3xl">{uc.icon}</span>
              <span
                className={`text-xs font-semibold leading-tight ${
                  selected === uc.id
                    ? "text-primary"
                    : "text-gray-700 group-hover:text-gray-900 dark:text-zinc-400 dark:group-hover:text-zinc-200"
                }`}
              >
                {uc.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Recommendation panel */}
        <AnimatePresence mode="wait">
          {rec ? (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 90, damping: 22 }}
              className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-white/[0.08] dark:bg-zinc-950/70"
            >
              {/* Gradient bg accent */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${rec.gradient} opacity-60`}
              />

              <div className="relative p-6 md:p-10">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    {/* Badge */}
                    <span
                      className={`mb-3 inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${rec.badgeColor}`}
                    >
                      {rec.badge}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                      {rec.title}
                    </h3>
                    <p className="mt-1 text-sm text-primary font-medium">{rec.tagline}</p>
                  </div>

                  {/* Best for tags */}
                  <div className="flex flex-wrap gap-2">
                    {rec.bestFor.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-gray-200 bg-gray-100/80 px-3 py-1 text-xs font-medium text-gray-600 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stack breakdown */}
                <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <StackCard label="Frontend" value={rec.frontend} icon="🖥️" />
                  <StackCard label="Backend" value={rec.backend} icon="⚙️" />
                  <StackCard label="Database" value={rec.database} icon="🗄️" />
                  {rec.mobile && (
                    <StackCard label="Mobile" value={rec.mobile} icon="📱" />
                  )}
                  <StackCard label="DevOps" value={rec.devops} icon="🚀" />
                </div>

                {/* Why this stack */}
                <div className="mb-8">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary/70">
                    Why this stack works
                  </p>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {rec.pros.map((pro) => (
                      <li
                        key={pro}
                        className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-zinc-300"
                      >
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">
                          ✓
                        </span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-gray-500 dark:text-zinc-500">
                    Not quite right?{" "}
                    <Link
                      href="/contact"
                      className="font-semibold text-primary hover:underline"
                    >
                      Talk to us
                    </Link>{" "}
                    — every project is unique.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90"
                  >
                    Build with this stack
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 py-16 text-center dark:border-white/[0.08] dark:bg-white/[0.02]"
            >
              <span className="mb-3 text-5xl">👆</span>
              <p className="text-base font-medium text-gray-500 dark:text-zinc-500">
                Select what you&apos;re building above to see our recommendation
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
