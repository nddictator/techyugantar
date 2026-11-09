import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion";

type BreadcrumbProps = {
  /** Short page name — used in the breadcrumb trail and kicker. */
  pageName: string;
  description: string;
  /** Editorial headline for the h1. Falls back to `pageName`. */
  headline?: string;
  /** Part of the headline to render with the aurora gradient. */
  highlight?: string;
};

function Headline({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <span className="text-aurora">{highlight}</span>
      {after}
    </>
  );
}

/**
 * Editorial page hero shared by inner pages: mono breadcrumb kicker, large
 * display headline on the left, supporting copy on the right, staggered in.
 */
const Breadcrumb = ({ pageName, description, headline, highlight }: BreadcrumbProps) => {
  return (
    <section className="relative z-10 overflow-hidden bg-cream pt-36 pb-6 dark:bg-obsidian lg:pt-44">
      {/* Hairline grid, masked toward the top-right where the glow sits */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [--g:rgba(15,23,35,0.05)] dark:[--g:rgba(255,255,255,0.05)]"
        style={{
          backgroundImage:
            "linear-gradient(to right,var(--g) 1px,transparent 1px),linear-gradient(to bottom,var(--g) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 60% 90% at 75% 0%, black 15%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 90% at 75% 0%, black 15%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[760px] rounded-full blur-[130px] motion-safe:animate-[aurora-drift_16s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(ellipse at center, rgba(45,212,191,0.17), transparent 70%)" }}
      />

      <div className="container relative">
        <Stagger immediate>
          <StaggerItem>
            <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs uppercase tracking-[0.2em]">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="text-gray-400 transition-colors hover:text-primary dark:text-zinc-500">
                    Home
                  </Link>
                </li>
                <li aria-hidden className="text-gray-300 dark:text-zinc-700">/</li>
                <li aria-current="page" className="text-primary">{pageName}</li>
              </ol>
            </nav>
          </StaggerItem>

          <div className="grid gap-8 border-b border-black/[0.07] pb-14 dark:border-white/[0.08] lg:grid-cols-12 lg:items-end">
            <StaggerItem className="lg:col-span-8">
              <h1 className="font-display text-4xl font-semibold leading-[1.04] tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-[4rem]">
                <Headline text={headline ?? pageName} highlight={highlight} />
              </h1>
            </StaggerItem>
            <StaggerItem className="lg:col-span-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-zinc-400 md:text-lg">{description}</p>
            </StaggerItem>
          </div>
        </Stagger>
      </div>
    </section>
  );
};

export default Breadcrumb;
