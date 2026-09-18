import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Search, PenTool, GitBranch, ShieldCheck, Rocket } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/motion/Reveal";

const STEPS = [
  {
    id: "process-step-1",
    icon: Search,
    title: "Discovery & Scoping",
    desc: "We start by understanding your business, not just your feature list — mapping workflows, constraints, and what success actually looks like before a line of code is written.",
    deliverable: "Scoping document",
  },
  {
    id: "process-step-2",
    icon: PenTool,
    title: "Architecture & Design",
    desc: "Every project gets a real architecture pass: data models, API contracts, and system boundaries decided upfront, not improvised mid-build.",
    deliverable: "Architecture blueprint",
  },
  {
    id: "process-step-3",
    icon: GitBranch,
    title: "Build in Sprints",
    desc: "Work ships in short, reviewable increments so you see real progress and can redirect early, instead of waiting months for a single reveal.",
    deliverable: "Weekly demos",
  },
  {
    id: "process-step-4",
    icon: ShieldCheck,
    title: "QA & Testing",
    desc: "Code is reviewed and tested before it reaches you — catching issues at the source instead of leaving your users to find them.",
    deliverable: "Test reports",
  },
  {
    id: "process-step-5",
    icon: Rocket,
    title: "Handoff & Support",
    desc: "We hand over documented, maintainable code and stay reachable for support as your product evolves after launch.",
    deliverable: "Docs + support window",
  },
];

const ProcessTimeline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.65", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section id="process" data-testid="process-section" className="relative py-24 sm:py-32 bg-[#07090E] overflow-hidden">
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-[130px]" />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How We Work"
          title={<>A process built for <span className="text-gradient">velocity</span></>}
          sub="No fixed-tier packages pretending to fit every project. Here's the actual process we run for every engagement — from a one-screen MVP to a multi-tenant ERP."
        />
        <div ref={ref} className="relative">
          <div className="absolute left-[27px] sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-white/8" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-[27px] sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-cyan-400 to-emerald-400 origin-top shadow-[0_0_16px_rgba(99,102,241,0.6)]"
          />
          <div className="space-y-10 sm:space-y-14">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const left = i % 2 === 0;
              return (
                <Reveal key={s.id} delay={0.05}>
                  <div data-testid={s.id} className={`relative flex items-start gap-6 sm:gap-0 ${left ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0D1117] border border-indigo-500/30 text-indigo-300 shadow-[0_0_24px_rgba(99,102,241,0.25)] sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className={`sm:w-[calc(50%_-_3.5rem)] ${left ? "" : "sm:ml-auto"} flex-1 sm:flex-none`}>
                      <div className="glass-card rounded-2xl p-6 hover:border-indigo-500/35 transition-colors duration-400">
                        <div className="flex items-center gap-3 mb-2 sm:justify-inherit" style={{ justifyContent: "inherit" }}>
                          <span className="font-code text-xs text-indigo-400/80 tracking-widest">0{i + 1}</span>
                          <span className="text-[10px] font-code text-slate-500 border border-white/10 rounded-full px-2 py-0.5">{s.deliverable}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-100 mb-2">{s.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
