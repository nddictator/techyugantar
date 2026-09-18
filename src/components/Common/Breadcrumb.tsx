import Link from "next/link";

const Breadcrumb = ({
  pageName,
  description,
}: {
  pageName: string;
  description: string;
}) => {
  return (
    <section className="relative z-10 overflow-hidden bg-cream pt-32 pb-4 dark:bg-obsidian lg:pt-[160px]">
      {/* hairline grid, radially masked */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right,var(--g) 1px,transparent 1px),linear-gradient(to bottom,var(--g) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 90% at 50% 0%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 90% at 50% 0%, black 20%, transparent 80%)",
          ["--g" as string]: "rgba(15,23,35,0.05)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.05) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 90% at 50% 0%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 90% at 50% 0%, black 20%, transparent 80%)",
        }}
      />
      {/* aurora glow */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[700px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(ellipse at center, rgba(45,212,191,0.18), transparent 70%)" }} />

      <div className="container relative">
        {/* breadcrumb pill */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium backdrop-blur-sm
            border-black/[0.08] bg-white/70 text-gray-500
            dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-400"
        >
          <Link href="/" className="transition-colors hover:text-primary">Home</Link>
          <svg className="h-3 w-3 text-gray-400 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-semibold text-primary">{pageName}</span>
        </nav>

        <h1 className="font-display mb-5 max-w-3xl text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          {pageName}
        </h1>
        <p className="max-w-2xl text-base font-medium leading-relaxed text-gray-500 dark:text-zinc-400 md:text-lg">
          {description}
        </p>

        {/* accent underline */}
        <div className="mt-8 h-px w-full max-w-2xl bg-gradient-to-r from-primary/50 via-primary/15 to-transparent" />
      </div>
    </section>
  );
};

export default Breadcrumb;
