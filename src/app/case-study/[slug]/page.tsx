import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import caseStudiesData from "@/data/caseStudies";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import ParallaxShowcase from "@/components/CaseStudy/ParallaxShowcase";
import DeviceShowcase from "@/components/Projects/DeviceShowcase";
import ProductApps from "@/components/CaseStudy/ProductApps";

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
    title: `${cs.title} — Case Study`,
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

const hostOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Numbered editorial chapter: sticky label on the left, prose on the right. */
function Chapter({ index, label, title, children }: { index: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="grid gap-6 border-t border-black/[0.07] py-14 dark:border-white/[0.08] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {index} — {label}
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white">
              {title}
            </h2>
          </div>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </Reveal>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = caseStudiesData.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const cs = caseStudiesData[index];
  const next = caseStudiesData[(index + 1) % caseStudiesData.length];

  const meta = [
    { k: "Client", v: cs.client },
    { k: "Industry", v: cs.industry },
    { k: "Timeline", v: cs.duration },
    { k: "Team", v: cs.teamSize },
    { k: "Platforms", v: cs.platforms?.join(" · ") },
  ]
    .filter((m): m is { k: string; v: string } => Boolean(m.v))
    .slice(0, 4);

  // Chapters are numbered in order, skipping any section without content.
  const hasStack = Boolean(cs.techStack?.length);
  const chapterNo = (n: number) => String(n).padStart(2, "0");

  return (
    <main className="relative overflow-hidden pb-24">
      <div aria-hidden className="pointer-events-none absolute -top-48 right-[-10%] h-[620px] w-[820px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(ellipse at center, rgba(45,212,191,0.16), transparent 70%)" }} />

      {/* ── Editorial hero ───────────────────────────────────────────── */}
      <section className="container relative pt-36 md:pt-44">
        <Link
          href="/projects"
          className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-primary dark:text-zinc-400"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> All projects
        </Link>

        <Stagger immediate>
          <StaggerItem>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Case study · {cs.client}
            </p>
          </StaggerItem>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <StaggerItem className="lg:col-span-8">
              <h1 className="font-display text-4xl font-semibold leading-[1.03] tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-[4.25rem]">
                {cs.title}
              </h1>
            </StaggerItem>
            <StaggerItem className="lg:col-span-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-zinc-400 md:text-lg">{cs.summary}</p>
            </StaggerItem>
          </div>

          <StaggerItem>
            <dl className={`mt-12 grid grid-cols-2 border-y border-black/[0.07] dark:border-white/[0.08] ${meta.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
              {meta.map((m, i) => (
                <div
                  key={m.k}
                  className={`py-5 pr-4 ${i > 0 ? "md:border-l md:pl-6" : ""} ${i % 2 === 1 ? "border-l pl-4 md:pl-6" : ""} border-black/[0.07] dark:border-white/[0.08]`}
                >
                  <dt className="mb-1 text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500">{m.k}</dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-zinc-100">{m.v}</dd>
                </div>
              ))}
            </dl>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {cs.liveUrl && (
              <Link
                href={cs.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(45,212,191,0.35)] transition-shadow duration-300 hover:shadow-[0_0_44px_rgba(45,212,191,0.55)]"
              >
                Visit live site ↗
              </Link>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-900 dark:border-white/[0.12] dark:bg-white/[0.05] dark:text-zinc-200 dark:hover:text-white"
              >
                Build something similar
              </Link>
              <div className="ml-auto hidden flex-wrap gap-2 md:flex">
                {cs.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-black/[0.07] px-3 py-1 text-xs text-gray-500 dark:border-white/[0.08] dark:text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      {/* ── Showcase ─────────────────────────────────────────────────── */}
      <section className="container relative mt-16">
        {cs.screens ? (
          <DeviceShowcase screens={cs.screens} title={cs.client} platforms={cs.platforms} priority />
        ) : (
          <ParallaxShowcase src={cs.image} alt={cs.title} url={cs.liveUrl ? hostOf(cs.liveUrl) : cs.client} />
        )}
      </section>

      {/* ── Metrics ──────────────────────────────────────────────────── */}
      <section className="container relative mt-24">
        <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/[0.07] bg-black/[0.07] dark:border-white/[0.08] dark:bg-white/[0.08] lg:grid-cols-4">
          {cs.metrics.map((m, i) => (
            <StaggerItem key={m.label} className="bg-cream p-6 dark:bg-obsidian md:p-8">
              <span aria-hidden className="mb-5 flex items-center gap-2 font-mono text-[11px] text-gray-400 dark:text-zinc-500">
                {String(i + 1).padStart(2, "0")}
                <span className="h-px w-6 bg-primary/50" />
              </span>
              <p className="font-display text-4xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-5xl">
                <span className="text-aurora">{m.value}</span>
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">{m.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── The apps (multi-app products) ────────────────────────────── */}
      {cs.apps && cs.apps.length > 0 && (
        <section className="container relative mt-24" data-testid="case-study-apps">
          <Reveal>
            <div className="mb-14 grid gap-6 border-t border-black/[0.07] pt-14 dark:border-white/[0.08] lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">The product</p>
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl">
                  One platform, <span className="text-aurora">{cs.apps.length === 2 ? "two" : cs.apps.length === 3 ? "three" : cs.apps.length} apps.</span>
                </h2>
              </div>
              <p className="text-base leading-relaxed text-gray-500 dark:text-zinc-400 lg:col-span-5">
                Each side of the business gets its own app, built for how that person actually works — all running on the same backend.
              </p>
            </div>
          </Reveal>
          <ProductApps apps={cs.apps} />
        </section>
      )}

      {/* ── Story chapters ───────────────────────────────────────────── */}
      <section className="container relative mt-24">
        <Chapter index="01" label="Challenge" title="The problem worth solving">
          <p className="text-lg leading-[1.8] text-gray-600 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.9] first-letter:text-primary dark:text-zinc-300">
            {cs.challenge}
          </p>
        </Chapter>

        <Chapter index="02" label="Solution" title="What we designed and built">
          <p className="text-lg leading-[1.8] text-gray-600 dark:text-zinc-300">{cs.solution}</p>
          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
            {cs.features.map((feat) => (
              <StaggerItem key={feat}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-black/[0.06] bg-white/70 px-4 py-3.5 backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.03]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">✓</span>
                  <p className="text-sm text-gray-700 dark:text-zinc-300">{feat}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Chapter>

        {hasStack && (
        <Chapter index="03" label="Stack" title="Under the hood">
          <dl className="divide-y divide-black/[0.06] dark:divide-white/[0.07]">
            {cs.techStack!.map((row) => (
              <div key={row.layer} className="grid gap-1 py-4 sm:grid-cols-[140px_1fr] sm:gap-6">
                <dt className="font-mono text-xs uppercase tracking-wider text-primary sm:pt-0.5">{row.layer}</dt>
                <dd className="text-[15px] text-gray-700 dark:text-zinc-300">{row.tech}</dd>
              </div>
            ))}
          </dl>
        </Chapter>
        )}

        <Chapter index={chapterNo(hasStack ? 4 : 3)} label="Outcome" title="What changed">
          <p className="text-lg leading-[1.8] text-gray-600 dark:text-zinc-300">{cs.outcome}</p>
        </Chapter>
      </section>

      {/* ── Pull quote ───────────────────────────────────────────────── */}
      {cs.testimonial && (
        <section className="container relative mt-10" data-testid="case-study-testimonial">
          <Reveal>
            <figure className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/[0.04] px-6 py-14 text-center md:px-16 dark:bg-primary/[0.06]">
              <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
              <span aria-hidden className="font-display block text-7xl leading-none text-primary/30">&ldquo;</span>
              <blockquote className="font-display mx-auto mt-2 max-w-3xl text-2xl font-medium leading-snug tracking-tight text-gray-900 dark:text-white md:text-3xl">
                {cs.testimonial.quote}
              </blockquote>
              <figcaption className="mt-8 text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">{cs.testimonial.name}</span>
                <span className="text-gray-500 dark:text-zinc-400"> · {cs.testimonial.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        </section>
      )}

      {/* ── Next case study ──────────────────────────────────────────── */}
      <section className="container relative mt-24">
        <Reveal>
          <Link
            href={`/case-study/${next.slug}`}
            className="group grid items-center gap-8 rounded-3xl border border-black/[0.07] p-6 transition-colors duration-300 hover:border-primary/40 md:grid-cols-12 md:p-10 dark:border-white/[0.08]"
          >
            <div className="md:col-span-7">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500">Next case study</p>
              <p className="font-display text-3xl font-semibold leading-tight tracking-tight text-gray-900 transition-colors group-hover:text-primary dark:text-white md:text-4xl">
                {next.title}
              </p>
              <p className="mt-3 text-sm text-gray-500 dark:text-zinc-400">{next.client} · {next.industry}</p>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-black/[0.06] md:col-span-5 dark:border-white/[0.08]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={next.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="container relative mt-16">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 border-t border-black/[0.07] pt-12 md:flex-row md:items-center dark:border-white/[0.08]">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                Want a similar result for your business?
              </h2>
              <p className="mt-2 text-gray-500 dark:text-zinc-400">Tell us your idea — we&apos;ll scope it, plan it, and build it.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-shadow duration-300 hover:shadow-[0_0_48px_rgba(45,212,191,0.6)]"
            >
              Start a Project →
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
