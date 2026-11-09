import type { Metadata } from "next";
import SadasyaSetu from "@/components/SadasyaSetu";

const URL = "https://techyugantar.in/sadasyasetu";
const DESCRIPTION =
  "SadasyaSetu digitises member onboarding for new milk producer companies, FPOs and dairy cooperatives: forms filled in the village on a phone, approvals online, signed forms and the member register in one click.";

export const metadata: Metadata = {
  // The site's layout adds "| Tech Yugantar".
  title: "SadasyaSetu · Member Onboarding Software for Milk Producer Companies",
  description: DESCRIPTION,
  keywords: [
    "milk producer company software",
    "MPO member onboarding",
    "FPO membership software",
    "dairy cooperative member register",
    "producer company digital forms",
    "SadasyaSetu",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "SadasyaSetu · Member onboarding, without the paper pile",
    description: DESCRIPTION,
    url: URL,
    siteName: "Tech Yugantar",
    type: "website",
    images: [{ url: "/images/sadasyasetu/home.webp", width: 1600, height: 1000 }],
  },
};

export default function SadasyaSetuPage() {
  return <SadasyaSetu />;
}
