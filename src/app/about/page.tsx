import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Software Development Company in Varanasi, India",
  description:
    "Tech Yugantar is a Varanasi-based software development company building Android, iOS, and web applications for startups and enterprises. Learn about our team, approach, and the technologies we work with.",
  keywords: [
    "about Tech Yugantar",
    "software company Varanasi about",
    "software development team Varanasi",
    "tech company Uttar Pradesh",
  ],
  alternates: {
    canonical: "https://techyugantar.in/about",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://techyugantar.in/about",
    siteName: "Tech Yugantar",
    title: "About Tech Yugantar — Software Company in Varanasi",
    description:
      "Learn about Tech Yugantar, a Varanasi-based software development company serving startups to enterprise businesses.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Tech Yugantar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Tech Yugantar — Software Company in Varanasi",
    description:
      "A Varanasi-based software development company serving startups to enterprises.",
    images: ["/og-image.png"],
  },
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Tech Yugantar"
        description="We are a forward-thinking technology company dedicated to building robust, scalable software solutions that empower businesses to thrive in the digital age."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;