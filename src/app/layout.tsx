import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { Providers } from "./providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://techyugantar.in"),
  title: {
    default: "Tech Yugantar | Software Development Company in Varanasi",
    template: "%s | Tech Yugantar",
  },
  description:
    "Tech Yugantar is a software development company in Varanasi building Android, iOS, and web apps for startups and enterprise businesses. Flutter, Django, React & custom ERP development.",
  keywords: [
    "Tech Yugantar",
    "software development company in Varanasi",
    "software company Varanasi",
    "android app development Varanasi",
    "ios app development Varanasi",
    "web development company Varanasi",
    "startup software solutions",
    "enterprise software India",
    "custom software development",
    "flutter app development company",
    "react development company",
    "django backend development",
    "ERP software India",
  ],
  authors: [{ name: "Tech Yugantar" }],
  creator: "Tech Yugantar",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://techyugantar.in",
    siteName: "Tech Yugantar",
    title: "Tech Yugantar | Software Development Company in Varanasi",
    description:
      "Android, iOS & web development for startups and enterprise businesses. Based in Varanasi, India — Flutter, Django, React & custom ERP.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Tech Yugantar Software Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Yugantar | Software Development Company in Varanasi",
    description:
      "Android · iOS · Web — startup to enterprise. Based in Varanasi, India.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://techyugantar.in",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <JsonLd />
      </head>

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <div className="isolate">
            <Header />
            {children}
            <Footer />
          </div>
          <ScrollToTop />
          <WhatsAppButton />
        </Providers>
      </body>

      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}