import { Reveal } from "@/components/motion/Reveal";

const STACK = [
  { name: "Next.js 15", color: "#F8FAFC" },
  { name: "React", color: "#61DAFB" },
  { name: "Django 5", color: "#10B981" },
  { name: "Python", color: "#F59E0B" },
  { name: "TypeScript", color: "#3B82F6" },
  { name: "Flutter 3", color: "#06B6D4" },
  { name: "PostgreSQL", color: "#818CF8" },
  { name: "AWS Cloud", color: "#F59E0B" },
  { name: "Docker", color: "#38BDF8" },
  { name: "GraphQL", color: "#EC4899" },
  { name: "Redis", color: "#EF4444" },
  { name: "LangChain", color: "#10B981" },
  { name: "Node.js", color: "#84CC16" },
  { name: "FastAPI", color: "#14B8A6" },
];

const Badge = ({ item }) => (
  <div className="flex items-center gap-2.5 mx-5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur px-5 py-2.5 shrink-0 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-colors duration-300">
    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }} />
    <span className="text-sm font-medium text-slate-300 whitespace-nowrap font-code">{item.name}</span>
  </div>
);

const Row = ({ reverse = false, testid }) => (
  <div className="flex overflow-hidden" data-testid={testid}>
    <div className={`flex shrink-0 ${reverse ? "marquee-track-reverse" : "marquee-track"}`}>
      {[...STACK, ...STACK].map((s, i) => (
        <Badge key={i} item={reverse ? STACK[(i + 5) % STACK.length] : s} />
      ))}
    </div>
  </div>
);

const TechMarquee = () => (
  <section data-testid="tech-marquee-section" className="relative py-14 border-y border-white/5 bg-[#090C12]">
    <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#090C12] to-transparent z-10" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#090C12] to-transparent z-10" />
    <Reveal className="text-center mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Our Engineering Stack</p>
    </Reveal>
    <div className="marquee-paused space-y-4">
      <Row testid="tech-marquee-ribbon-1" />
      <Row reverse testid="tech-marquee-ribbon-2" />
    </div>
  </section>
);

export default TechMarquee;
