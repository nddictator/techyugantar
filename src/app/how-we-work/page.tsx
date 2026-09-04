import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import HowWeWork from "@/components/HowWeWork";
import HowWeCommunicate from "@/components/HowWeWork/HowWeCommunicate";
import Contact from "@/components/Contact";
import JsonLdScript from "@/components/JsonLdScript";

export const metadata: Metadata = {
  title: "How We Work | Project Delivery Process — Tech Yugantar",
  description:
    "From discovery call to post-launch support — see exactly how Tech Yugantar takes your idea through 8 structured steps to a shipped, production-ready product.",
  keywords: [
    "software development process",
    "agile development India",
    "project delivery workflow",
    "Tech Yugantar process",
    "how we build software",
    "software development lifecycle",
  ],
  alternates: {
    canonical: "https://techyugantar.in/how-we-work",
  },
  openGraph: {
    title: "How We Work | Tech Yugantar",
    description:
      "8 steps. Zero guesswork. See how we take your idea from discovery to a shipped product.",
    url: "https://techyugantar.in/how-we-work",
    siteName: "Tech Yugantar",
    type: "website",
  },
};

const processSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Tech Yugantar Project Delivery Process",
  description:
    "8-step process from discovery call to post-launch support for software development projects.",
  step: [
    { "@type": "HowToStep", name: "Discovery Call",           text: "We listen to your idea, goals, and constraints before proposing anything." },
    { "@type": "HowToStep", name: "Requirement Analysis",     text: "Detailed SRS with user stories, functional requirements, and API contracts." },
    { "@type": "HowToStep", name: "Architecture & Planning",  text: "Tech stack, database schema, system design, and sprint roadmap." },
    { "@type": "HowToStep", name: "UI / UX Design",           text: "Figma wireframes and high-fidelity designs — approved by you before development." },
    { "@type": "HowToStep", name: "Agile Development",        text: "Two-week sprints with working demo each cycle." },
    { "@type": "HowToStep", name: "Quality Assurance",        text: "Automated and manual testing across devices and browsers." },
    { "@type": "HowToStep", name: "Deployment & Launch",      text: "CI/CD pipeline, staging validation, zero-downtime production launch." },
    { "@type": "HowToStep", name: "Support & Growth",         text: "30-day post-launch warranty, then ongoing retainer sprints." },
  ],
};

export default function HowWeWorkPage() {
  return (
    <>
      <JsonLdScript schema={processSchema} />

      <Breadcrumb
        pageName="How We Work"
        description="8 steps. Zero guesswork. From your first message to a shipped, production-ready product — here's exactly how we work."
      />

      <HowWeWork />

      <HowWeCommunicate />

      <Contact />
    </>
  );
}
