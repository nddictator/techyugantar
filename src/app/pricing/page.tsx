import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from "@/components/Pricing";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engagement Models & Pricing | Tech Yugantar",
  description:
    "How Tech Yugantar structures software projects — Fixed Price, Time & Material, or Dedicated Team. Custom ERP, web, and mobile development scoped to your project, not a public price list.",
  keywords: [
    "software development pricing India",
    "fixed price development",
    "dedicated development team",
    "time and material engagement",
    "custom software quote Varanasi",
  ],
  alternates: {
    canonical: "https://techyugantar.in/pricing",
  },
  openGraph: {
    title: "Engagement Models & Pricing | Tech Yugantar",
    description:
      "Fixed Price, Time & Material, or Dedicated Team — pick how you want to engage, then get a custom quote.",
    url: "https://techyugantar.in/pricing",
    siteName: "Tech Yugantar",
    type: "website",
  },
};

const PricingPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Engagement Models"
        description="Custom software rarely fits a public price list. Here's how we structure projects at Tech Yugantar — pick the model that fits, then get a custom quote for your project."
      />
      <Pricing />
    </>
  );
};

export default PricingPage;