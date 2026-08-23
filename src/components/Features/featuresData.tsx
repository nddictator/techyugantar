import { Feature } from "@/types/feature";
import { SiDjango, SiReact, SiFastapi, SiFlutter, SiIcloud } from "react-icons/si";
import { HiSparkles } from "react-icons/hi2";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <SiDjango size={35} className="fill-current" />
    ),
    title: "Python & Django Experts",
    paragraph:
      "Building robust, scalable backends using Python, Django, and DRF. We specialize in secure API development and complex business logic.",
  },
  {
    id: 2,
    icon: (
      <SiReact size={35} className="fill-current" />
    ),
    title: "Modern Frontend (Next.js/React)",
    paragraph:
      "Crafting high-performance user interfaces with Next.js 15, React, and Tailwind CSS to ensure a lightning-fast digital experience.",
  },
  {
    id: 3,
    icon: (
      <SiFastapi size={35} className="fill-current" />
    ),
    title: "High-Speed APIs (FastAPI/DRF)",
    paragraph:
      "Developing lightweight microservices for real-time data processing and high-concurrency systems using FastAPI and Flask.",
  },
  {
    id: 4,
    icon: (
      <SiFlutter size={35} className="fill-current" />
    ),
    title: "Cross-Platform Mobile (Flutter)",
    paragraph:
      "Build native-quality mobile applications for both iOS and Android from a single codebase using Flutter and Dart.",
  },
  {
    id: 5,
    icon: (
      <HiSparkles size={35} className="fill-current" />
    ),
    title: "AI & LLM Integration",
    paragraph:
      "Automating business workflows by integrating OpenAI, LangChain, and custom AI models to drive innovation and efficiency.",
  },
  {
    id: 6,
    icon: (
      <SiIcloud size={35} className="fill-current" />
    ),
    title: "Cloud Native & DevOps",
    paragraph:
      "Scaling applications with AWS and Google Cloud, using Docker and CI/CD pipelines to ensure high availability and seamless deployments.",
  },
];
export default featuresData;