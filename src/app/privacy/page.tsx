import Privacy from "@/components/Privacy";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Tech Yugantar, a software development company in Varanasi, collects, uses and protects personal data from website visitors, prospective clients and client projects.",
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
      "How Tech Yugantar collects, uses and protects personal data on its website and in client engagements.",
    images: [
      {
        url: "/og-image.webp",
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