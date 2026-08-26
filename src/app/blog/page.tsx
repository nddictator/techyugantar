import { Suspense } from "react";
import BlogList from "@/components/Blog/BlogList";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { getAllBlogs } from "@/lib/blog";

import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Tech Insights & Tutorials | Tech Yugantar Blog",
  description:
    "Articles on Flutter, Django, Next.js, and mobile development from the Tech Yugantar team in Varanasi — practical tutorials and insights for developers and businesses building software products.",
  keywords: [
    "tech blog",
    "software development trends",
    "flutter tutorials",
    "django tutorials",
    "next.js insights",
    "Tech Yugantar articles",
  ],
  alternates: {
    canonical: "https://techyugantar.in/blog",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://techyugantar.in/blog",
    siteName: "Tech Yugantar",
    title: "Tech Yugantar Blog — Digital Innovation Insights",
    description:
      "Expert insights into Flutter, Django, Next.js, and software engineering from the Tech Yugantar team.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tech Yugantar Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Yugantar Blog — Digital Innovation Insights",
    description: "Insights on Flutter, Django, Next.js, and software engineering.",
    images: ["/og-image.png"],
  },
};

const Blog = () => {
  const allPosts = getAllBlogs();
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));

  return (
    <>
      <Breadcrumb
        pageName="Tech Insights"
        description="Deep dives into the world of software development, modern architecture, and the future of digital business. Knowledge shared by the Tech Yugantar team."
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <Suspense fallback={null}>
            <BlogList allPosts={allPosts} tags={tags} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default Blog;
