import { motion } from "framer-motion";
import { MonitorSmartphone, Server, BrainCircuit, Smartphone, Zap, Boxes, CloudCog, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/motion/Reveal";
import { scrollToId } from "@/lib/site";

const SERVICES = [
  {
    id: "service-card-ai",
    icon: BrainCircuit,
    accent: "indigo",
    title: "AI & LLM Integration",
    desc: "Practical AI features — chatbots, RAG document pipelines, and workflow automation with OpenAI, LangChain, and custom models.",
    pills: ["OpenAI", "LangChain", "RAG", "Agents"],
    span: "lg:col-span-2 lg:row-span-1",
  },
  {
    id: "service-card-frontend",
    icon: MonitorSmartphone,
    accent: "cyan",
    title: "Modern Frontend",
    desc: "High-performance UIs with Next.js 15, React, and Tailwind — SSR, ISR, blazing Core Web Vitals.",
    pills: ["Next.js", "React", "TypeScript"],
    span: "",
  },
  {
    id: "service-card-python",
    icon: Server,
    accent: "emerald",
    title: "Python & Django Core",
    desc: "Robust, secure backends with Django ORM and DRF — built for complex business logic and large datasets.",
    pills: ["Django", "DRF", "PostgreSQL"],
    span: "",
  },
  {
    id: "service-card-mobile",
    icon: Smartphone,
    accent: "cyan",
    title: "Cross-Platform Mobile",
    desc: "Native-quality iOS & Android apps from a single Flutter codebase — one team, two stores.",
    pills: ["Flutter", "Dart", "Firebase"],
    span: "",
  },
  {
    id: "service-card-api",
    icon: Zap,
    accent: "amber",
    title: "High-Speed APIs",
    desc: "Lightweight microservices for real-time data and high-concurrency systems using FastAPI and Flask.",
    pills: ["FastAPI", "Redis", "Docker"],
    span: "",
  },
  {
    id: "service-card-node",
    icon: Boxes,
    accent: "indigo",
    title: "Node.js Systems",
    desc: "Event-driven, non-blocking backends for real-time apps, WebSockets, and high-concurrency APIs.",
    pills: ["Node.js", "Socket.io", "MongoDB"],
    span: "",
  },
  {
    id: "service-card-cloud",
    icon: CloudCog,
    accent: "emerald",
    title: "Cloud & DevOps",
    desc: "Production-grade infrastructure on AWS / GCP with Docker, CI/CD pipelines, and zero-downtime deploys.",
    pills: ["AWS", "CI/CD", "Nginx"],
    span: "",
  },
];

const ACCENTS = {
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", ring: "group-hover:border-indigo-500/40", glow: "group-hover:shadow-[0_0_60px_-12px_rgba(99,102,241,0.45)]" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", ring: "group-hover:border-cyan-500/40", glow: "group-hover:shadow-[0_0_60px_-12px_rgba(6,182,212,0.45)]" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", ring: "group-hover:border-emerald-500/40", glow: "group-hover:shadow-[0_0_60px_-12px_rgba(16,185,129,0.4)]" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", ring: "group-hover:border-amber-500/40", glow: "group-hover:shadow-[0_0_60px_-12px_rgba(245,158,11,0.4)]" },
};

const ServicesBento = () => (
  <section id="services" data-testid="services-section" className="relative py-24 sm:py-32 bg-[#07090E] bg-mesh">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="Capabilities"
        title={<>Everything you need, <span className="text-gradient">engineered in-house</span></>}
        sub="We pick the right tool for the job — from blazing-fast Next.js frontends to Django backends, Flutter apps, and AI pipelines."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SERVICES.map((s, i) => {
          const a = ACCENTS[s.accent];
          const Icon = s.icon;
          return (
            <Reveal key={s.id} delay={i * 0.07} className={s.span}>
              <motion.div
                data-testid={s.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`group relative h-full glass-card rounded-2xl p-6 sm:p-7 transition-all duration-500 ${a.ring} ${a.glow} overflow-hidden`}
              >
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl ${a.bg} ${a.text} mb-5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="relative text-lg sm:text-xl font-bold tracking-tight text-slate-100 mb-2.5">{s.title}</h3>
                <p className="relative text-sm text-slate-400 leading-relaxed mb-5">{s.desc}</p>
                <div className="relative flex flex-wrap gap-2">
                  {s.pills.map((p) => (
                    <span key={p} className="text-[11px] font-code font-medium text-slate-400 border border-white/10 bg-white/[0.04] rounded-full px-2.5 py-1">{p}</span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.2} className="mt-12 text-center">
        <button data-testid="services-cta" onClick={() => scrollToId("#contact")} className="group inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200 transition-colors">
          Tell us what you're building
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </Reveal>
    </div>
  </section>
);

export default ServicesBento;
