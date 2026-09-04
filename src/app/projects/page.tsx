import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects | Tech Yugantar",
  description: "Explore our full portfolio of web, mobile and AI projects — from education platforms to healthcare apps.",
  alternates: { canonical: "https://techyugantar.in/projects" },
  openGraph: {
    title: "Projects | Tech Yugantar",
    description: "Our full portfolio of shipped software products.",
    url: "https://techyugantar.in/projects",
    siteName: "Tech Yugantar",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumb
        pageName="Our Projects"
        description="Real products. Real clients. Shipped and live — from African EdTech platforms to India's top astrology apps."
      />
      <ProjectsClient />
    </>
  );
}
