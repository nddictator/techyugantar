import { Check, ArrowUpRight, FileSignature, Timer, Users } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/motion/Reveal";
import { scrollToId } from "@/lib/site";

const MODELS = [
  {
    id: "model-card-fixed",
    icon: FileSignature,
    name: "Fixed Price",
    best: "Well-defined projects with a clear scope — an MVP, a specific feature set, or a defined ERP module.",
    how: "We scope the full requirement upfront, quote a fixed cost and timeline, and deliver against that spec.",
    points: ["Detailed scoping document", "Fixed cost & timeline upfront", "Milestone-based payments", "Post-launch bug-fix window"],
    featured: false,
  },
  {
    id: "model-card-tm",
    icon: Timer,
    name: "Time & Material",
    best: "Evolving products where requirements change as you learn — ongoing features, iterative builds.",
    how: "A dedicated team works in sprints, billed by actual time worked, with full flexibility to reprioritize.",
    points: ["Sprint-based delivery", "Flexible, evolving scope", "Transparent time tracking", "Direct access to dev team"],
    featured: true,
  },
  {
    id: "model-card-pod",
    icon: Users,
    name: "Dedicated Team",
    best: "Long-term partnerships — an extension of your in-house team for continuous product development.",
    how: "A dedicated pod of developers works exclusively on your product under your direction, billed monthly.",
    points: ["Developers reserved for you", "Direct daily communication", "Scales with your roadmap", "No hiring overhead"],
    featured: false,
  },
];

const EngagementModels = () => (
  <section id="pricing" data-testid="engagement-section" className="relative py-24 sm:py-32 bg-[#090C12] border-y border-white/5">
    <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="Engagement Models"
        title={<>Three ways to <span className="text-gradient">work with us</span></>}
        sub="Custom software doesn't fit a public price list. Tell us about your project and we'll recommend the right fit."
      />
      <div className="grid md:grid-cols-3 gap-5 items-stretch">
        {MODELS.map((m, i) => {
          const Icon = m.icon;
          return (
            <Reveal key={m.id} delay={i * 0.1} className="h-full">
              <div
                data-testid={m.id}
                className={`relative h-full rounded-2xl p-7 flex flex-col transition-all duration-500 hover:-translate-y-1.5 ${
                  m.featured
                    ? "bg-gradient-to-b from-indigo-500/[0.14] to-slate-900/60 border border-indigo-500/40 shadow-[0_0_50px_-12px_rgba(99,102,241,0.45)]"
                    : "glass-card hover:border-white/20"
                }`}
              >
                {m.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-1 text-[11px] font-bold text-white tracking-wide shadow-lg shadow-indigo-500/30">
                    MOST POPULAR
                  </span>
                )}
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl mb-5 ${m.featured ? "bg-indigo-500/20 text-indigo-300" : "bg-white/5 text-slate-300"}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-3">{m.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-1.5"><span className="text-slate-300 font-semibold">Best for: </span>{m.best}</p>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{m.how}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {m.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${m.featured ? "text-indigo-400" : "text-emerald-400"}`} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <button
                  data-testid={`${m.id}-cta`}
                  onClick={() => scrollToId("#contact")}
                  className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    m.featured
                      ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02]"
                      : "border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 hover:border-white/25"
                  }`}
                >
                  Get a Custom Quote
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default EngagementModels;
