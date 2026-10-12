import Link from "next/link";
import { LuBriefcase, LuCalendar, LuLightbulb, LuMapPin, LuShieldCheck } from "react-icons/lu";

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
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"><LuLightbulb aria-hidden className="h-5 w-5" /></span>
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
        {[
          { Icon: LuCalendar, text: "Free 30-min discovery call" },
          { Icon: LuShieldCheck, text: "NDA on request" },
          { Icon: LuBriefcase, text: "Fixed-price or hourly" },
          { Icon: LuMapPin, text: "Based in Varanasi, India" },
        ].map(({ Icon, text }) => (
          <span key={text} className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-zinc-500">
            <Icon aria-hidden className="h-3.5 w-3.5 text-primary" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
