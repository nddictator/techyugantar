import Terms from "@/components/Terms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for using techyugantar.in and engaging Tech Yugantar for software development — estimates, payments, intellectual property, confidentiality and liability.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://techyugantar.in/terms" },
  openGraph: {
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Tech Yugantar" }],
    title: "Terms of Service | Tech Yugantar",
    description: "The terms on which Tech Yugantar provides software development services.",
    url: "https://techyugantar.in/terms",
    siteName: "Tech Yugantar",
  },
};

const TermsPage = () => {
  return <Terms />;
};

export default TermsPage;
