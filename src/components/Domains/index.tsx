"use client";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

// ── Industry verticals ────────────────────────────────────────────────────────
const DOMAINS = [
  { emoji: "🏥", name: "Healthcare & MedTech",    note: "HIS, EMR, telemedicine" },
  { emoji: "📚", name: "School & College ERP",     note: "LMS, fee mgmt, timetable" },
  { emoji: "🛒", name: "E-Commerce Platforms",     note: "D2C stores, marketplaces" },
  { emoji: "🚀", name: "Startups & SaaS",          note: "MVP, landing pages, SaaS" },
  { emoji: "💆", name: "Salon & Spa Management",   note: "Bookings, POS, loyalty" },
  { emoji: "🍽️", name: "Restaurant & Food Tech",   note: "Ordering, KDS, delivery" },
  { emoji: "🏢", name: "Real Estate Portals",      note: "Listings, CRM, EMI tools" },
  { emoji: "💳", name: "FinTech & Payments",       note: "Wallets, lending, ledgers" },
  { emoji: "🚛", name: "Logistics & Transport",    note: "Fleet, tracking, routing" },
  { emoji: "✈️", name: "Travel & Hospitality",     note: "Booking, hotels, tours" },
  { emoji: "⚙️", name: "Manufacturing & Inventory",note: "ERP, WMS, QC systems" },
  { emoji: "⚖️", name: "Legal & Professional",     note: "Case mgmt, billing, docs" },
  { emoji: "🤝", name: "NGO & Non-Profit",         note: "Donations, volunteers" },
  { emoji: "💪", name: "Fitness & Wellness",       note: "Gym mgmt, class booking" },
  { emoji: "🌾", name: "AgriTech & FarmTech",      note: "Crop mgmt, market prices" },
  { emoji: "🎓", name: "EdTech Platforms",         note: "Video courses, quizzes" },
  { emoji: "🏗️", name: "Construction & Projects",  note: "Project tracking, BOQ" },
  { emoji: "🛍️", name: "Retail & POS Systems",     note: "Billing, inventory, GST" },
];

export default function Domains() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-24">

      {/* Top shimmer line — Launch UI signature */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Section background */}
      <div className="pointer-events-none absolute inset-0
        bg-gradient-to-b from-white via-gray-50 to-white
        dark:from-zinc-950 dark:via-zinc-900/60 dark:to-zinc-950" />

      <div className="container relative">

        {/* Header */}
        <Reveal>
          <div className="mb-12 text-center">
            {/* Pill badge */}
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium
              border-gray-200 bg-white text-gray-600
              dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Industries We've Built For
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              From Healthcare to Hospitality —{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg,#399D91,#22D3EE)" }}>
                We've Done It
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 dark:text-zinc-400">
              We've delivered software across 18+ industry verticals. If your domain isn't listed — we've probably done something adjacent, and we'd love to learn yours.
            </p>
          </div>
        </Reveal>

        {/* Domain grid */}
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {DOMAINS.map(({ emoji, name, note }) => (
            <StaggerItem key={name} className="w-full">
              <div
                className="
                  group relative flex flex-col items-start gap-2 rounded-xl p-4
                  border transition-all duration-300 cursor-default h-full
                  border-gray-100 bg-white shadow-sm
                  hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(57,157,145,0.1)] hover:-translate-y-0.5
                  dark:border-white/[0.06] dark:bg-zinc-900/50
                  dark:hover:border-primary/40 dark:hover:bg-zinc-900
                "
              >
                {/* Hover top glow */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <span className="text-2xl leading-none">{emoji}</span>
                <div>
                  <p className="text-sm font-semibold leading-snug text-gray-800 dark:text-zinc-200">
                    {name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-400 dark:text-zinc-500">
                    {note}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Footer note */}
        <Reveal className="mt-10 text-center" delay={0.1}>
          <p className="text-sm text-gray-400 dark:text-zinc-500">
            Don't see your industry?{" "}
            <a href="/contact" className="font-medium text-primary hover:underline">
              Tell us about your project →
            </a>
          </p>
        </Reveal>

      </div>

      {/* Bottom shimmer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
