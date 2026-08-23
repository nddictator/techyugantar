import {
  SiDjango,
  SiFastapi,
  SiFlutter,
  SiIcloud,
  SiReact,
} from "react-icons/si";
import { HiSparkles } from "react-icons/hi2";

export type ServiceItem = {
  id: number;
  icon: React.ReactNode;
  name: string;
  description: string;
  whoFor: string;
  deliverables: string[];
};

const servicesData: ServiceItem[] = [
  {
    id: 1,
    icon: <SiReact size={32} className="fill-current" />,
    name: "Web Development",
    description:
      "Full-stack web applications built with Next.js/React on the frontend and Django/DRF on the backend — fast, SEO-friendly, and built to scale.",
    whoFor: "Startups and enterprises that need a custom web platform, not a template.",
    deliverables: [
      "Responsive, SEO-optimized frontend",
      "REST API backend with Django/DRF",
      "Admin tooling and role-based access",
      "Production deployment and handoff",
    ],
  },
  {
    id: 2,
    icon: <SiFlutter size={32} className="fill-current" />,
    name: "Android & iOS App Development",
    description:
      "Cross-platform mobile apps built with Flutter from a single codebase, so you ship to both the App Store and Play Store without maintaining two separate teams.",
    whoFor: "Businesses that need a mobile presence without doubling their development cost.",
    deliverables: [
      "Single Flutter codebase for iOS + Android",
      "App Store / Play Store-ready builds",
      "API and push-notification integration",
      "Ongoing maintenance and updates",
    ],
  },
  {
    id: 3,
    icon: <SiIcloud size={32} className="fill-current" />,
    name: "ERP & Enterprise Software",
    description:
      "Custom ERP systems and internal tools that replace spreadsheets and manual processes with a single, multi-tenant platform built for your workflows.",
    whoFor: "Businesses outgrowing manual processes or off-the-shelf software that doesn't fit.",
    deliverables: [
      "Multi-tenant architecture with secure data isolation",
      "Role-based access and permissions",
      "Reporting and analytics dashboards",
      "Workflow automation",
    ],
  },
  {
    id: 4,
    icon: <SiDjango size={32} className="fill-current" />,
    name: "Backend & API Development",
    description:
      "Secure, well-documented backend systems using Django/DRF for full-featured platforms and FastAPI/Flask for lightweight, high-concurrency microservices.",
    whoFor: "Products that need real backend architecture, not a bolted-on API.",
    deliverables: [
      "REST API design and implementation",
      "PostgreSQL database architecture",
      "Authentication and authorization",
      "API documentation",
    ],
  },
  {
    id: 5,
    icon: <HiSparkles size={32} className="fill-current" />,
    name: "AI & LLM Integration",
    description:
      "Practical AI features built into your existing product — not a science project. We integrate OpenAI and LangChain to automate real workflows.",
    whoFor: "Businesses that want AI to remove manual work, not just be a demo.",
    deliverables: [
      "Chatbot / AI assistant integration",
      "Document and data processing pipelines",
      "Custom LLM workflow integration",
    ],
  },
  {
    id: 6,
    icon: <SiFastapi size={32} className="fill-current" />,
    name: "Cloud & DevOps",
    description:
      "Infrastructure that doesn't fall over under load — deployment pipelines and cloud setup on AWS and Google Cloud, containerized with Docker.",
    whoFor: "Teams that need reliable, repeatable deployments instead of manual server setup.",
    deliverables: [
      "Containerized deployments (Docker)",
      "CI/CD pipeline setup",
      "Cloud infrastructure on AWS / Google Cloud",
    ],
  },
];

export default servicesData;
