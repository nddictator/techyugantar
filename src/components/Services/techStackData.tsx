import {
  SiAmazonwebservices,
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
} from "react-icons/si";
import { HiSparkles } from "react-icons/hi2";

export type TechCategory = {
  category: string;
  items: { name: string; icon: React.ReactNode }[];
};

const techStackData: TechCategory[] = [
  {
    category: "Backend",
    items: [
      { name: "Python", icon: <SiPython size={32} className="fill-current" /> },
      { name: "Django / DRF", icon: <SiDjango size={32} className="fill-current" /> },
      { name: "FastAPI", icon: <SiFastapi size={32} className="fill-current" /> },
      { name: "Flask", icon: <SiFlask size={32} className="fill-current" /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={32} className="fill-current" /> },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "Next.js", icon: <SiNextdotjs size={32} className="fill-current" /> },
      { name: "React", icon: <SiReact size={32} className="fill-current" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={32} className="fill-current" /> },
    ],
  },
  {
    category: "Mobile",
    items: [{ name: "Flutter", icon: <SiFlutter size={32} className="fill-current" /> }],
  },
  {
    category: "AI",
    items: [{ name: "OpenAI / LangChain", icon: <HiSparkles size={32} className="fill-current" /> }],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", icon: <SiAmazonwebservices size={32} className="fill-current" /> },
      { name: "Google Cloud", icon: <SiGooglecloud size={32} className="fill-current" /> },
      { name: "Docker", icon: <SiDocker size={32} className="fill-current" /> },
    ],
  },
];

export default techStackData;
