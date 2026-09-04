import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Services from "@/components/Services";
import TechStackSection from "@/components/Services/TechStackSection";
import StackRecommender from "@/components/Services/StackRecommender";
import EngagementRecap from "@/components/Services/EngagementRecap";
import FAQ from "@/components/FAQ";
import JsonLdScript from "@/components/JsonLdScript";
import servicesData from "@/components/Services/servicesData";
import { buildBreadcrumbSchema, buildServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services | Web, Mobile, ERP & AI Development",
  description:
    "Tech Yugantar builds web apps (Next.js/Django), Android & iOS apps (Flutter), custom ERP systems, backend APIs, AI/LLM integrations, and cloud infrastructure — from Varanasi, India.",
  keywords: [
    "software development services Varanasi",
    "ERP software development India",
    "Flutter app development company",
    "Django development company",
    "Next.js development services",
    "AI integration services",
    "cloud DevOps services India",
  ],
  alternates: {
    canonical: "https://techyugantar.in/services",
  },
  openGraph: {
    title: "Services | Tech Yugantar",
    description:
      "Web, mobile, ERP, backend, AI, and cloud/DevOps — the full stack of software services Tech Yugantar delivers.",
    url: "https://techyugantar.in/services",
    siteName: "Tech Yugantar",
    type: "website",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
]);

const serviceSchemas = buildServiceSchema(
  servicesData.map(({ name, description }) => ({ name, description }))
);

const ServicesPage = () => {
  return (
    <>
      <JsonLdScript schema={breadcrumbSchema} />
      {serviceSchemas.map((schema, index) => (
        <JsonLdScript key={servicesData[index].id} schema={schema} />
      ))}

      <Breadcrumb
        pageName="Services"
        description="Web, mobile, ERP, backend, AI, and the cloud infrastructure to run it all — here's what we build and the technologies behind it."
      />
      <Services />
      <TechStackSection />
      <StackRecommender />
      <EngagementRecap />
      <FAQ />
    </>
  );
};

export default ServicesPage;
