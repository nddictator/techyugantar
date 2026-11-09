import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Software Development Company in Varanasi",
  description:
    "Get in touch with Tech Yugantar for custom software development — Android, iOS, web apps, and ERP solutions. Based in Varanasi, serving startups to enterprises across India.",
  keywords: [
    "contact Tech Yugantar",
    "hire software developer Varanasi",
    "software consultation",
    "hire developers India",
    "software company contact Varanasi",
  ],
  alternates: {
    canonical: "https://techyugantar.in/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://techyugantar.in/contact",
    siteName: "Tech Yugantar",
    title: "Contact Tech Yugantar — Software Company in Varanasi",
    description:
      "Ready to scale your business? Reach out to discuss Android, iOS, web, or ERP software development with our team in Varanasi.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Contact Tech Yugantar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Tech Yugantar — Software Company in Varanasi",
    description: "Reach out to discuss your software development project.",
    images: ["/og-image.webp"],
  },
};
const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact"
        headline="Let’s build something worth shipping."
        highlight="worth shipping."
        description="Tell us about your product, timeline and budget. You’ll hear back within one business day — from an engineer, not a sales script."
      />

      <Contact />
    </>
  );
};

export default ContactPage;