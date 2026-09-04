import { Feature } from "@/types/feature";
import {
  SiDjango, SiReact, SiFastapi, SiFlutter, SiNodedotjs,
} from "react-icons/si";
import { HiSparkles, HiCloud } from "react-icons/hi2";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <SiReact size={30} className="fill-current" />,
    title: "Modern Frontend",
    paragraph:
      "High-performance UIs with Next.js 15, React, and Tailwind CSS — SSR, ISR, blazing-fast Core Web Vitals.",
    tags: ["Next.js", "React", "Tailwind", "TypeScript"],
  },
  {
    id: 2,
    icon: <SiDjango size={30} className="fill-current" />,
    title: "Python & Django",
    paragraph:
      "Robust, secure backends powered by Python, Django ORM, and DRF — built for complex business logic and large datasets.",
    tags: ["Django", "DRF", "Python", "PostgreSQL"],
  },
  {
    id: 3,
    icon: <SiNodedotjs size={30} className="fill-current" />,
    title: "Node.js & Express",
    paragraph:
      "Event-driven, non-blocking backends for real-time apps, WebSocket services, and high-concurrency APIs.",
    tags: ["Node.js", "Express", "Socket.io", "MongoDB"],
  },
  {
    id: 4,
    icon: <SiFastapi size={30} className="fill-current" />,
    title: "High-Speed APIs",
    paragraph:
      "Lightweight microservices for real-time data and high-concurrency systems using FastAPI and Flask.",
    tags: ["FastAPI", "Flask", "Redis", "Docker"],
  },
  {
    id: 5,
    icon: <SiFlutter size={30} className="fill-current" />,
    title: "Cross-Platform Mobile",
    paragraph:
      "Native-quality mobile apps for iOS & Android from a single Flutter/Dart codebase — one team, two stores.",
    tags: ["Flutter", "Dart", "Firebase", "REST APIs"],
  },
  {
    id: 6,
    icon: <HiSparkles size={30} className="fill-current" />,
    title: "AI & LLM Integration",
    paragraph:
      "Practical AI features — chatbots, document pipelines, and workflow automation using OpenAI, LangChain, and custom models.",
    tags: ["OpenAI", "LangChain", "RAG", "Python"],
  },
  {
    id: 7,
    icon: <HiCloud size={30} className="fill-current" />,
    title: "Cloud & DevOps",
    paragraph:
      "Production-grade infrastructure on AWS / GCP with Docker, CI/CD pipelines, and zero-downtime deployments.",
    tags: ["AWS", "Docker", "CI/CD", "Nginx"],
  },
];

export default featuresData;
