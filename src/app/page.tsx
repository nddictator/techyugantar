import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Domains from "@/components/Domains";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Trust from "@/components/Trust";
import Projects from "@/components/Projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Yugantar | Innovative Software Solutions & Digital Transformation",
  description: "Tech Yugantar provides world-class software development, specializing in Python, Django, Next.js, and AI integrations. Architecting the digital era from Varanasi, India.",
  keywords: [
    "Tech Yugantar",
    "Software Development Varanasi",
    "Django Developers India",
    "Next.js Solutions",
    "SaaS Development",
    "AI Implementation",
    "Python Experts",
    "Tech Yugantar Solutions"
  ],
  authors: [{ name: "Tech Yugantar" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://techyugantar.in",
  },
  openGraph: {
    title: "Tech Yugantar | Architecting the Digital Era",
    description: "Expert software solutions specializing in Django, React, and Flutter. Partner with Tech Yugantar to scale your digital presence.",
    url: "https://techyugantar.in",
    siteName: "Tech Yugantar",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Yugantar | Software Solutions",
    description: "Building robust and scalable digital products.",
  },
};
export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Domains />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Trust />
      <Projects />
      <Pricing />
      <Contact />
    </>
  );
}
