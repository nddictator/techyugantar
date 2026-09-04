import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from "@/components/Pricing";
import PricingCalculator from "@/components/PricingCalculator";
import { Reveal } from "@/components/motion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Calculator & Engagement Models | Tech Yugantar",
  description:
    "Estimate your project cost instantly — web apps, mobile apps, ERP, SaaS, and AI products. Development-only pricing, no hidden charges. Get a detailed quote after.",
  keywords: [
    "software development pricing India",
    "project cost estimator",
    "web development cost calculator",
    "mobile app development cost India",
    "custom ERP pricing",
    "Tech Yugantar pricing",
  ],
  alternates: { canonical: "https://techyugantar.in/pricing" },
  openGraph: {
    title: "Pricing Calculator | Tech Yugantar",
    description: "Estimate your software project cost in 5 steps. Development-only pricing.",
    url: "https://techyugantar.in/pricing",
    siteName: "Tech Yugantar",
    type: "website",
  },
};

const PricingPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Pricing & Estimates"
        description="Get a ballpark estimate for your project in under 2 minutes — then book a call for the exact quote."
      />

      {/* ── Interactive calculator ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 dark:from-zinc-950/80 dark:via-zinc-900/20 dark:to-zinc-950/80" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="container relative">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium
                border-gray-200 bg-white text-gray-600
                dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Project Cost Estimator
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                What Will Your Project{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg,#399D91,#22D3EE)" }}>
                  Cost to Build?
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-gray-500 dark:text-zinc-400">
                Answer 5 quick questions. Get a realistic estimate — development cost only, no hosting or third-party fees.
              </p>
            </div>
          </Reveal>
          <PricingCalculator />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>

      {/* ── Engagement models ──────────────────────────────────────────────── */}
      <Pricing />
    </>
  );
};

export default PricingPage;
