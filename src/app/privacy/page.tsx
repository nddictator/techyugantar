import Privacy from "@/components/Privacy";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Tech Yugantar",
  description:
    "Tech Yugantar's privacy policy explains how we collect, use, and protect your personal data, including advertising identifiers and reward transaction records, across our applications and services.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "https://techyugantar.in/privacy",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://techyugantar.in/privacy",
    siteName: "Tech Yugantar",
    title: "Privacy Policy | Tech Yugantar",
    description:
      "How Tech Yugantar collects, uses, and protects your personal data across our applications and services.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tech Yugantar Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Tech Yugantar",
    description: "How Tech Yugantar collects, uses, and protects your data.",
  },
};
const PrivacyPage = () => {
    return (
        <Privacy />
    );
};

export default PrivacyPage;