"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

// ── Constants ─────────────────────────────────────────────────────────────────
const USD_RATE = 84;

type Range = [number, number];

const PROJECT_TYPES: { id: string; emoji: string; label: string; base: Range; weeks: Range }[] = [
  { id: "landing",     emoji: "🌐", label: "Landing / Marketing Site",    base: [15000, 50000],    weeks: [2, 5]   },
  { id: "webapp",      emoji: "💻", label: "Web Application / SaaS",      base: [80000, 200000],   weeks: [8, 16]  },
  { id: "ecommerce",   emoji: "🛒", label: "E-Commerce Store",             base: [150000, 400000],  weeks: [10, 18] },
  { id: "mobile",      emoji: "📱", label: "Mobile App (iOS + Android)",   base: [120000, 300000],  weeks: [10, 18] },
  { id: "erp",         emoji: "⚙️", label: "ERP / Enterprise System",      base: [300000, 1000000], weeks: [16, 36] },
  { id: "ai",          emoji: "🤖", label: "AI-Powered Product",           base: [200000, 800000],  weeks: [12, 24] },
  { id: "specialized", emoji: "🏥", label: "Domain-Specific Software",     base: [150000, 500000],  weeks: [10, 22] },
];

const PLATFORMS: { id: string; label: string; note: string; add: Range }[] = [
  { id: "web",     label: "Web (Browser)",      note: "Responsive for all devices",   add: [0, 0]           },
  { id: "android", label: "Android App",        note: "Google Play Store ready",      add: [40000, 80000]   },
  { id: "ios",     label: "iOS App",            note: "App Store ready",              add: [40000, 80000]   },
  { id: "admin",   label: "Admin / Back-office",note: "Internal management panel",    add: [20000, 45000]   },
];

const FEATURES: { id: string; emoji: string; label: string; add: Range }[] = [
  { id: "auth",        emoji: "🔐", label: "User Auth & Role Management",  add: [10000, 22000]  },
  { id: "payment",     emoji: "💳", label: "Payment Gateway Integration",  add: [12000, 28000]  },
  { id: "admin",       emoji: "📊", label: "Analytics & Reports Dashboard",add: [20000, 50000]  },
  { id: "realtime",    emoji: "⚡", label: "Real-time (Chat / Notifications)", add: [25000, 60000] },
  { id: "ai",          emoji: "🤖", label: "AI / LLM / Chatbot",           add: [50000, 150000] },
  { id: "multilang",   emoji: "🌍", label: "Multi-language Support",       add: [12000, 30000]  },
  { id: "multitenant", emoji: "🏢", label: "Multi-tenant Architecture",    add: [40000, 95000]  },
  { id: "thirdparty",  emoji: "🔗", label: "Third-party API Integrations", add: [8000, 22000]   },
  { id: "files",       emoji: "📁", label: "File & Document Management",   add: [12000, 28000]  },
  { id: "maps",        emoji: "🗺️", label: "Maps & Geolocation",           add: [15000, 38000]  },
  { id: "booking",     emoji: "📅", label: "Booking / Appointment System", add: [20000, 48000]  },
  { id: "notifications", emoji: "🔔", label: "Push Notifications (Mobile)", add: [10000, 22000] },
];

const SCALE_OPTIONS = [
  { id: "small",  label: "< 100 users",    note: "Internal tools, MVP",          mul: [1.0, 1.0]   },
  { id: "medium", label: "100 – 10K users",note: "Growing startup / SME",        mul: [1.1, 1.2]   },
  { id: "large",  label: "10K+ users",     note: "High-traffic, scalable arch",  mul: [1.3, 1.55]  },
] as const;

const DESIGN_OPTIONS = [
  { id: "has-figma",   label: "I have Figma designs",       note: "Ready-to-implement files",    mul: [0.9, 0.9]   },
  { id: "rough",       label: "Rough sketches / references", note: "Some direction provided",     mul: [1.0, 1.0]   },
  { id: "need-design", label: "Design from scratch",         note: "Full UI/UX by us",            mul: [1.1, 1.18]  },
];

const TIMELINE_OPTIONS = [
  { id: "flexible", label: "Flexible (no rush)",        note: "Best quality, best price",     mul: 1.0  },
  { id: "standard", label: "Standard (2–4 months)",     note: "Normal sprint pace",            mul: 1.08 },
  { id: "fast",     label: "Expedited (< 6 weeks)",     note: "Prioritised resourcing",        mul: 1.35 },
];

// ── Price calculation ─────────────────────────────────────────────────────────
function calcPrice(
  projectId: string,
  platforms: string[],
  features: string[],
  scaleId: string,
  designId: string,
  timelineId: string,
): { min: number; max: number; weeks: Range } {
  const proj = PROJECT_TYPES.find((p) => p.id === projectId);
  if (!proj) return { min: 0, max: 0, weeks: [0, 0] };

  let [min, max] = proj.base as [number, number];
  const weeks = [...proj.weeks] as [number, number];

  // Platforms
  for (const pid of platforms) {
    const p = PLATFORMS.find((x) => x.id === pid);
    if (p) { min += p.add[0]; max += p.add[1]; }
  }

  // Features
  for (const fid of features) {
    const f = FEATURES.find((x) => x.id === fid);
    if (f) { min += f.add[0]; max += f.add[1]; }
  }

  // Scale
  const scale = SCALE_OPTIONS.find((x) => x.id === scaleId);
  if (scale) { min = Math.round(min * scale.mul[0]); max = Math.round(max * scale.mul[1]); }

  // Design
  const design = DESIGN_OPTIONS.find((x) => x.id === designId);
  if (design) { min = Math.round(min * design.mul[0]); max = Math.round(max * design.mul[1]); }

  // Timeline
  const tl = TIMELINE_OPTIONS.find((x) => x.id === timelineId);
  if (tl) {
    min = Math.round(min * tl.mul);
    max = Math.round(max * tl.mul);
    if (tl.id === "fast") { weeks[0] = Math.max(2, Math.round(weeks[0] * 0.7)); weeks[1] = Math.round(weeks[1] * 0.75); }
  }

  return { min, max, weeks };
}

function fmt(n: number, currency: "INR" | "USD") {
  if (currency === "USD") {
    const usd = Math.round(n / USD_RATE / 100) * 100;
    return `$${usd.toLocaleString("en-US")}`;
  }
  // INR — show in L/K
  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────
function StepHeader({ step, total, title, subtitle }: { step: number; total: number; title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
            initial={false}
            animate={{ width: `${(step / total) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="whitespace-nowrap text-xs font-medium text-gray-400 dark:text-zinc-500">
          {step} / {total}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">{subtitle}</p>
    </div>
  );
}

function SelectCard({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative w-full rounded-xl border p-4 text-left transition-all duration-200
        ${selected
          ? "border-primary bg-primary/5 shadow-[0_0_16px_rgba(57,157,145,0.15)] dark:bg-primary/10"
          : "border-gray-100 bg-white hover:border-primary/30 hover:bg-gray-50 dark:border-white/[0.07] dark:bg-zinc-900/50 dark:hover:border-primary/30 dark:hover:bg-zinc-900"
        }
      `}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">✓</span>
      )}
      {children}
    </button>
  );
}

function NavButtons({
  onBack, onNext, nextLabel = "Next →", backDisabled = false, nextDisabled = false,
}: {
  onBack: () => void; onNext: () => void; nextLabel?: string; backDisabled?: boolean; nextDisabled?: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={onBack}
        disabled={backDisabled}
        className="rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200
          border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900
          disabled:cursor-not-allowed disabled:opacity-40
          dark:border-white/[0.1] dark:text-zinc-400 dark:hover:border-white/[0.2] dark:hover:text-white"
      >
        ← Back
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white
          bg-gradient-to-b from-primary/80 to-primary
          shadow-[0_0_16px_rgba(57,157,145,0.3)]
          hover:shadow-[0_0_24px_rgba(57,157,145,0.5)] hover:scale-105
          disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none
          transition-all duration-200"
      >
        {nextLabel}
      </button>
    </div>
  );
}

// ── Main calculator ───────────────────────────────────────────────────────────
export default function PricingCalculator() {
  const [step, setStep]           = useState(0);
  const [direction, setDirection] = useState(1); // 1=forward, -1=back
  const [projectType, setProject] = useState("");
  const [platforms, setPlatforms] = useState<string[]>(["web"]);
  const [features, setFeatures]   = useState<string[]>([]);
  const [scale, setScale]         = useState("medium");
  const [design, setDesign]       = useState("rough");
  const [timeline, setTimeline]   = useState("standard");
  const [currency, setCurrency]   = useState<"INR" | "USD">("INR");

  const TOTAL_STEPS = 5;

  const go = (n: number) => { setDirection(n > step ? 1 : -1); setStep(n); };
  const next = () => go(step + 1);
  const back = () => go(step - 1);

  const toggleFeature = (id: string) =>
    setFeatures((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);

  const togglePlatform = (id: string) => {
    if (id === "web") return; // web always included
    setPlatforms((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  };

  const result = calcPrice(projectType, platforms, features, scale, design, timeline);

  // Build contact pre-fill query
  const projLabel = PROJECT_TYPES.find((p) => p.id === projectType)?.label ?? "";
  const featureLabels = features.map((f) => FEATURES.find((x) => x.id === f)?.label).filter(Boolean).join(", ");
  const preFilledMsg = encodeURIComponent(
    `Hi! I used your pricing calculator.\n\nProject: ${projLabel}\nFeatures: ${featureLabels || "Basic"}\nScale: ${scale}\nTimeline: ${timeline}\nEstimate: ${fmt(result.min, "INR")} – ${fmt(result.max, "INR")}\n\nPlease send me a detailed quote.`
  );

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-2xl border bg-white shadow-lg
        border-gray-100 dark:border-white/[0.08] dark:bg-zinc-900">

        {/* Header bar */}
        <div className="flex items-center justify-between border-b px-6 py-4
          border-gray-100 bg-gray-50 dark:border-white/[0.06] dark:bg-zinc-800/40">
          <div className="flex items-center gap-2">
            <span className="text-lg">🧮</span>
            <span className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
              Project Cost Estimator
            </span>
          </div>
          {/* Currency toggle */}
          <div className="flex items-center gap-1 rounded-full border p-1 text-xs
            border-gray-200 bg-white dark:border-white/[0.1] dark:bg-zinc-800">
            {(["INR", "USD"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`rounded-full px-3 py-1 font-medium transition-all duration-200 ${
                  currency === c
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {c === "INR" ? "₹ INR" : "$ USD"}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >

              {/* ── Step 1: Project Type ───────────────────────────────── */}
              {step === 0 && (
                <div>
                  <StepHeader step={1} total={TOTAL_STEPS}
                    title="What are you building?"
                    subtitle="Choose the closest match — we'll refine the scope after." />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {PROJECT_TYPES.map((p) => (
                      <SelectCard key={p.id} selected={projectType === p.id} onClick={() => setProject(p.id)}>
                        <span className="mb-2 block text-2xl">{p.emoji}</span>
                        <span className="block text-sm font-semibold text-gray-800 dark:text-zinc-200">{p.label}</span>
                        <span className="mt-0.5 block text-xs text-gray-400 dark:text-zinc-500">
                          {fmt(p.base[0], currency)} – {fmt(p.base[1], currency)} base
                        </span>
                      </SelectCard>
                    ))}
                  </div>
                  <NavButtons onBack={back} onNext={next} backDisabled={true} nextDisabled={!projectType} />
                </div>
              )}

              {/* ── Step 2: Platforms ──────────────────────────────────── */}
              {step === 1 && (
                <div>
                  <StepHeader step={2} total={TOTAL_STEPS}
                    title="Which platforms?"
                    subtitle="Web is always included. Add more if needed." />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {PLATFORMS.map((p) => (
                      <SelectCard key={p.id}
                        selected={platforms.includes(p.id)}
                        onClick={() => togglePlatform(p.id)}
                      >
                        <span className="block text-sm font-semibold text-gray-800 dark:text-zinc-200">{p.label}</span>
                        <span className="mt-0.5 block text-xs text-gray-400 dark:text-zinc-500">{p.note}</span>
                        {p.add[0] > 0 && (
                          <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                            +{fmt(p.add[0], currency)} – {fmt(p.add[1], currency)}
                          </span>
                        )}
                        {p.id === "web" && (
                          <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                            Always included
                          </span>
                        )}
                      </SelectCard>
                    ))}
                  </div>
                  <NavButtons onBack={back} onNext={next} />
                </div>
              )}

              {/* ── Step 3: Features ───────────────────────────────────── */}
              {step === 2 && (
                <div>
                  <StepHeader step={3} total={TOTAL_STEPS}
                    title="Which features do you need?"
                    subtitle="Select all that apply. Each adds to the estimate." />
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {FEATURES.map((f) => (
                      <SelectCard key={f.id} selected={features.includes(f.id)} onClick={() => toggleFeature(f.id)}>
                        <div className="flex items-start gap-3">
                          <span className="text-xl leading-none">{f.emoji}</span>
                          <div>
                            <span className="block text-sm font-medium text-gray-800 dark:text-zinc-200">{f.label}</span>
                            <span className="mt-0.5 block text-[11px] text-primary">
                              +{fmt(f.add[0], currency)} – {fmt(f.add[1], currency)}
                            </span>
                          </div>
                        </div>
                      </SelectCard>
                    ))}
                  </div>
                  <NavButtons onBack={back} onNext={next} />
                </div>
              )}

              {/* ── Step 4: Scale + Design ─────────────────────────────── */}
              {step === 3 && (
                <div>
                  <StepHeader step={4} total={TOTAL_STEPS}
                    title="Scale & design inputs"
                    subtitle="These affect architecture complexity and design effort." />

                  <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-zinc-300">Expected user scale</p>
                  <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {SCALE_OPTIONS.map((s) => (
                      <SelectCard key={s.id} selected={scale === s.id} onClick={() => setScale(s.id)}>
                        <span className="block text-sm font-semibold text-gray-800 dark:text-zinc-200">{s.label}</span>
                        <span className="mt-0.5 block text-xs text-gray-400 dark:text-zinc-500">{s.note}</span>
                      </SelectCard>
                    ))}
                  </div>

                  <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-zinc-300">UI / UX design</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {DESIGN_OPTIONS.map((d) => (
                      <SelectCard key={d.id} selected={design === d.id} onClick={() => setDesign(d.id)}>
                        <span className="block text-sm font-semibold text-gray-800 dark:text-zinc-200">{d.label}</span>
                        <span className="mt-0.5 block text-xs text-gray-400 dark:text-zinc-500">{d.note}</span>
                      </SelectCard>
                    ))}
                  </div>
                  <NavButtons onBack={back} onNext={next} />
                </div>
              )}

              {/* ── Step 5: Timeline ───────────────────────────────────── */}
              {step === 4 && (
                <div>
                  <StepHeader step={5} total={TOTAL_STEPS}
                    title="What's your timeline?"
                    subtitle="Rush work requires us to reprioritize — it costs more." />
                  <div className="grid grid-cols-1 gap-3">
                    {TIMELINE_OPTIONS.map((t) => (
                      <SelectCard key={t.id} selected={timeline === t.id} onClick={() => setTimeline(t.id)}>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="block text-sm font-semibold text-gray-800 dark:text-zinc-200">{t.label}</span>
                            <span className="mt-0.5 block text-xs text-gray-400 dark:text-zinc-500">{t.note}</span>
                          </div>
                          {t.mul > 1 && (
                            <span className="ml-4 shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                              +{Math.round((t.mul - 1) * 100)}%
                            </span>
                          )}
                        </div>
                      </SelectCard>
                    ))}
                  </div>
                  <NavButtons onBack={back} onNext={next} nextLabel="See Estimate →" />
                </div>
              )}

              {/* ── Result ────────────────────────────────────────────── */}
              {step === 5 && (
                <div>
                  <div className="mb-8 text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
                      💰
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Project Estimate</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
                      Development cost only — no hosting, domain, or third-party fees
                    </p>
                  </div>

                  {/* Price display */}
                  <div className="relative mb-6 overflow-hidden rounded-2xl border p-6 text-center
                    border-primary/20 bg-gradient-to-b from-primary/5 to-transparent
                    dark:border-primary/30 dark:from-primary/10">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                    <p className="mb-1 text-sm text-gray-500 dark:text-zinc-400">Starting at</p>
                    <p className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                      {fmt(result.min, currency)}
                    </p>
                    <p className="mt-1 text-base text-gray-500 dark:text-zinc-400">
                      Typically{" "}
                      <span className="font-semibold text-primary">
                        {fmt(result.min, currency)} – {fmt(result.max, currency)}
                      </span>
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-6">
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {result.weeks[0]}–{result.weeks[1]} weeks
                        </p>
                        <p className="text-xs text-gray-400 dark:text-zinc-500">Estimated timeline</p>
                      </div>
                      <div className="h-8 w-px bg-gray-200 dark:bg-zinc-700" />
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {features.length + platforms.filter(p => p !== "web").length} add-ons
                        </p>
                        <p className="text-xs text-gray-400 dark:text-zinc-500">Selected extras</p>
                      </div>
                    </div>
                  </div>

                  {/* Breakdown summary */}
                  <div className="mb-6 rounded-xl border p-4 text-sm
                    border-gray-100 bg-gray-50 dark:border-white/[0.06] dark:bg-zinc-800/40">
                    <p className="mb-2 font-semibold text-gray-700 dark:text-zinc-300">Your selections</p>
                    <div className="space-y-1 text-gray-500 dark:text-zinc-400">
                      <p>📦 {PROJECT_TYPES.find(p => p.id === projectType)?.label}</p>
                      <p>🖥 Platforms: {platforms.join(", ")}</p>
                      {features.length > 0 && <p>⚡ Features: {features.map(f => FEATURES.find(x => x.id === f)?.label).join(", ")}</p>}
                      <p>👥 Scale: {SCALE_OPTIONS.find(s => s.id === scale)?.label}</p>
                      <p>🎨 Design: {DESIGN_OPTIONS.find(d => d.id === design)?.label}</p>
                      <p>⏱ Timeline: {TIMELINE_OPTIONS.find(t => t.id === timeline)?.label}</p>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <p className="mb-6 text-center text-xs text-gray-400 dark:text-zinc-500">
                    * This is a ballpark estimate. Actual pricing is confirmed after a discovery call.
                    {currency === "USD" && " USD shown at ₹84/$ fixed rate."}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/contact?msg=${preFilledMsg}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white
                        bg-gradient-to-b from-primary/80 to-primary
                        shadow-[0_0_20px_rgba(57,157,145,0.3)]
                        hover:shadow-[0_0_32px_rgba(57,157,145,0.5)] hover:scale-105
                        transition-all duration-300"
                    >
                      📩 Get Exact Quote
                    </Link>
                    <button
                      type="button"
                      onClick={() => { go(0); setProject(""); setPlatforms(["web"]); setFeatures([]); setScale("medium"); setDesign("rough"); setTimeline("standard"); }}
                      className="flex-1 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-200
                        border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900
                        dark:border-white/[0.1] dark:text-zinc-400 dark:hover:border-white/[0.2] dark:hover:text-white"
                    >
                      🔄 Start Over
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
