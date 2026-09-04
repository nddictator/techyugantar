import {
  SiDjango,
  SiDocker,
  SiFastapi,
  SiFlask,
  SiFlutter,
  SiGooglecloud,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiTypescript,
  SiVuedotjs,
  SiKubernetes,
  SiNginx,
  SiGit,
  SiFirebase,
  SiGraphql,
  SiWordpress,
} from "react-icons/si";
import { DiAws } from "react-icons/di";
import { HiSparkles } from "react-icons/hi2";

export type TechCategory = {
  category: string;
  items: { name: string; icon: React.ReactNode }[];
};

const techStackData: TechCategory[] = [
  {
    category: "Backend",
    items: [
      { name: "Python", icon: <SiPython size={28} className="fill-current" /> },
      { name: "Django / DRF", icon: <SiDjango size={28} className="fill-current" /> },
      { name: "FastAPI", icon: <SiFastapi size={28} className="fill-current" /> },
      { name: "Flask", icon: <SiFlask size={28} className="fill-current" /> },
      { name: "Node.js", icon: <SiNodedotjs size={28} className="fill-current" /> },
      { name: "PHP", icon: <SiPhp size={28} className="fill-current" /> },
      { name: "Laravel", icon: <SiLaravel size={28} className="fill-current" /> },
      { name: "GraphQL", icon: <SiGraphql size={28} className="fill-current" /> },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "Next.js", icon: <SiNextdotjs size={28} className="fill-current" /> },
      { name: "React", icon: <SiReact size={28} className="fill-current" /> },
      { name: "Vue.js", icon: <SiVuedotjs size={28} className="fill-current" /> },
      { name: "TypeScript", icon: <SiTypescript size={28} className="fill-current" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={28} className="fill-current" /> },
    ],
  },
  {
    category: "Mobile",
    items: [
      { name: "Flutter", icon: <SiFlutter size={28} className="fill-current" /> },
      { name: "React Native", icon: <SiReact size={28} className="fill-current" /> },
      { name: "Firebase", icon: <SiFirebase size={28} className="fill-current" /> },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "PostgreSQL", icon: <SiPostgresql size={28} className="fill-current" /> },
      { name: "MySQL", icon: <SiMysql size={28} className="fill-current" /> },
      { name: "MongoDB", icon: <SiMongodb size={28} className="fill-current" /> },
      { name: "Redis", icon: <SiRedis size={28} className="fill-current" /> },
    ],
  },
  {
    category: "AI & Integrations",
    items: [
      { name: "OpenAI / LangChain", icon: <HiSparkles size={28} className="fill-current" /> },
      { name: "WordPress / CMS", icon: <SiWordpress size={28} className="fill-current" /> },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", icon: <DiAws size={32} className="fill-current" /> },
      { name: "Google Cloud", icon: <SiGooglecloud size={28} className="fill-current" /> },
      { name: "Docker", icon: <SiDocker size={28} className="fill-current" /> },
      { name: "Kubernetes", icon: <SiKubernetes size={28} className="fill-current" /> },
      { name: "Nginx", icon: <SiNginx size={28} className="fill-current" /> },
      { name: "Git", icon: <SiGit size={28} className="fill-current" /> },
    ],
  },
];

export default techStackData;
