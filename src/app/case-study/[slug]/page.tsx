import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import caseStudiesData from "@/data/caseStudies";

export function generateStaticParams() {
  return caseStudiesData.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudiesData.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${cs.title} | Case Study — Tech Yugantar`,
    description: cs.summary,
    alternates: { canonical: `https://techyugantar.in/case-study/${slug}` },
    openGraph: {
      type: "article",
      url: `https://techyugantar.in/case-study/${slug}`,
      title: cs.title,
      description: cs.summary,
      images: [{ url: cs.image, width: 1200, height: 800, alt: cs.title }],
    },
  };
}

function MetricCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-5 text-center shadow-sm dark:border-white/[0.08] dark:bg-zinc-900">
      <span className="mb-1 text-3xl">{icon}</span>
      <span className="text-2xl font-extrabold text-primary">{value}</span>
      <span className="text-xs font-medium text-gray-500 dark:text-zinc-500">{label}</span>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudiesData.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <main className="pt-[150px] pb-20">
      <div className="container">
        {/* Back link */}
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-primary dark:text-zinc-400"
        >
          ← Back to Projects
        </Link>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-4xl lg:text-[42px]">
              {cs.title}
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-zinc-400">
              {cs.summary}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-5 text-sm text-gray-500 dark:text-zinc-500">
              <span>🏢 <strong className="text-gray-700 dark:text-zinc-300">{cs.client}</strong></span>
              <span>🏷️ <strong className="text-gray-700 dark:text-zinc-300">{cs.industry}</strong></span>
              <span>⏱️ <strong className="text-gray-700 dark:text-zinc-300">{cs.duration}</strong></span>
              <span>👥 <strong className="text-gray-700 dark:text-zinc-300">{cs.teamSize}</strong></span>
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href={cs.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
              >
                View Live Site ↗
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
              >
                Build Something Similar
              </Link>
            </div>
          </div>

          {/* Project image */}
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-white/[0.08]">
            <Image
              src={cs.image}
              alt={cs.title}
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

        {/* ── Metrics ──────────────────────────────────────────────────────── */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cs.metrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>

        {/* ── Story ────────────────────────────────────────────────────────── */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Challenge */}
          <div className="rounded-2xl border border-red-100 bg-red-50/50 p-7 dark:border-red-500/10 dark:bg-red-500/5">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">The Challenge</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-zinc-400">{cs.challenge}</p>
          </div>

          {/* Solution */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-7 dark:border-blue-500/10 dark:bg-blue-500/5">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Our Solution</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-zinc-400">{cs.solution}</p>
          </div>

          {/* Outcome */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-7 dark:border-emerald-500/10 dark:bg-emerald-500/5">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">📈</span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">The Outcome</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-zinc-400">{cs.outcome}</p>
          </div>
        </div>

        {/* ── Tech Stack ───────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Tech Stack</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/[0.08]">
            <table className="w-full text-sm">
              <tbody>
                {cs.techStack.map((row, i) => (
                  <tr
                    key={row.layer}
                    className={`${
                      i % 2 === 0
                        ? "bg-white dark:bg-zinc-900"
                        : "bg-gray-50/80 dark:bg-zinc-900/50"
                    }`}
                  >
                    <td className="w-32 px-6 py-4 font-semibold text-primary">{row.layer}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-zinc-300">{row.tech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">What We Built</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {cs.features.map((feat) => (
              <div
                key={feat}
                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 dark:border-white/[0.07] dark:bg-zinc-900/60"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">✓</span>
                <p className="text-sm text-gray-700 dark:text-zinc-300">{feat}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Testimonial ──────────────────────────────────────────────────── */}
        {cs.testimonial && (
          <div className="mb-16 relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-8 dark:border-primary/15 dark:bg-primary/5">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <p className="mb-3 text-5xl font-serif leading-none text-primary/20">&ldquo;</p>
            <p className="mb-6 text-lg leading-relaxed font-medium text-gray-800 dark:text-zinc-200 italic">
              {cs.testimonial.quote}
            </p>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{cs.testimonial.name}</p>
              <p className="text-sm text-gray-500 dark:text-zinc-500">{cs.testimonial.role}</p>
            </div>
          </div>
        )}

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-white/[0.08] dark:bg-zinc-900 md:p-12">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Want a similar result for your business?
          </h2>
          <p className="mb-8 text-gray-600 dark:text-zinc-400">
            Tell us your idea — we&apos;ll scope it, plan it, and build it.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
            >
              Start a Project →
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
