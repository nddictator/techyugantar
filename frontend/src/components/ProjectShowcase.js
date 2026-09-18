import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/motion/Reveal";

const PROJECTS = [
  {
    id: "project-card-loexa",
    name: "LOEXA Africa",
    url: "https://loexaafrica.com/",
    img: "https://techyugantar.in/_next/image?url=%2Fimages%2Fprojects%2Floexa.webp&w=1080&q=75",
    desc: "Building Africa's future workforce — a capability-building ecosystem connecting education, AI, and industry.",
    tags: ["Next.js", "AI", "Education"],
    wide: true,
  },
  {
    id: "project-card-jyotify",
    name: "Jyotify",
    url: "https://jyotify.in/",
    img: "https://techyugantar.in/_next/image?url=%2Fimages%2Fprojects%2Fjyotify.webp&w=1080&q=75",
    desc: "Expert Vedic astrology, Kundli analysis, and spiritual guidance platform.",
    tags: ["React", "Node.js", "Astrology"],
    wide: false,
  },
  {
    id: "project-card-sulakhi",
    name: "Maa Sulakhi Ausadhalaya",
    url: "https://maasulakhi.online/",
    img: "https://techyugantar.in/_next/image?url=%2Fimages%2Fprojects%2Fmaasulakhi.webp&w=1080&q=75",
    desc: "Healing naturally with Ayurvedic wisdom — a D2C healthcare storefront.",
    tags: ["Healthcare", "Ayurveda", "E-commerce"],
    wide: false,
  },
  {
    id: "project-card-itwebdream",
    name: "ItWebDream",
    url: "https://itwebdream.com/",
    img: "https://techyugantar.in/_next/image?url=%2Fimages%2Fprojects%2Fitwebdream.webp&w=1080&q=75",
    desc: "A full-stack software studio designing and building web, mobile, and backend products.",
    tags: ["Portfolio", "Full-stack", "Next.js"],
    wide: false,
  },
  {
    id: "project-card-acharya",
    name: "Talk AcharyaJi",
    url: "https://talkacharya.com/",
    img: "https://techyugantar.in/_next/image?url=%2Fimages%2Fprojects%2Ftalkacharya.webp&w=1080&q=75",
    desc: "Accurate predictions for love, career & marriage — 5100+ happy clients, 99% accuracy.",
    tags: ["Astrology", "Vedic", "Realtime"],
    wide: true,
  },
];

const ProjectCard = ({ p, i }) => (
  <Reveal delay={(i % 3) * 0.08} className={p.wide ? "sm:col-span-2 lg:col-span-3" : "sm:col-span-1 lg:col-span-3"}>
    <motion.a
      data-testid={p.id}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group block glass-card rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:shadow-[0_20px_70px_-20px_rgba(99,102,241,0.4)] transition-all duration-500"
    >
      <div className="relative overflow-hidden aspect-[16/8]">
        <img
          src={p.img}
          alt={`${p.name} — project by Tech Yugantar`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
        <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/70 backdrop-blur border border-white/15 text-slate-200 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors duration-300">{p.name}</h3>
          <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors duration-300" />
        </div>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{p.desc}</p>
        <div className="flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="text-[11px] font-code font-medium text-slate-400 border border-white/10 bg-white/[0.04] rounded-full px-2.5 py-1">{t}</span>
          ))}
        </div>
      </div>
    </motion.a>
  </Reveal>
);

const ProjectShowcase = () => (
  <section id="work" data-testid="projects-section" className="relative py-24 sm:py-32 bg-[#090C12] border-y border-white/5">
    <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-600/8 blur-[130px]" />
    <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="Work & Case Studies"
        title={<>Featured <span className="text-gradient">projects</span></>}
        sub="Modern UI, seamless animations, and scalable architecture — we turn big ideas into shipped software."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-5">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectShowcase;
