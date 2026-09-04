import Link from "next/link";

type BlogCTAProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
};

export default function BlogCTA({
  title = "Need a Team to Build This for You?",
  description = "Tech Yugantar builds production-ready web apps, mobile apps, and backend systems. Free consultation — no commitment.",
  primaryLabel = "Start a Free Consultation →",
  primaryHref = "/contact",
}: BlogCTAProps) {
  return (
    <div className="my-12 relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 to-teal-500/5 p-8 dark:border-primary/15 dark:from-primary/10 dark:to-teal-500/5">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <span className="mt-1 text-3xl">💡</span>
          <div>
            <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 whitespace-nowrap"
          >
            {primaryLabel}
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 whitespace-nowrap"
          >
            View Services
          </Link>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mt-6 flex flex-wrap gap-4 border-t border-gray-200/60 pt-5 dark:border-white/[0.07]">
        {["✅ Free 30-min discovery call", "🔒 NDA on request", "📦 Fixed-price or hourly", "🇮🇳 Based in Varanasi, India"].map((badge) => (
          <span key={badge} className="text-xs font-medium text-gray-500 dark:text-zinc-500">
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
