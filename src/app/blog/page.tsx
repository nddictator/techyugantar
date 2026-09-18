import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Reveal } from "@/components/motion";
import { getAllBlogs } from "@/lib/blog";

import { Metadata } from "next";

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

const Blog = async ({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) => {
  const { tag } = await searchParams;
  const allPosts = getAllBlogs();
  const posts = tag ? allPosts.filter((post) => post.tags.includes(tag)) : allPosts;
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));

  return (
    <>
      <Breadcrumb
        pageName="Tech Insights"
        description="Deep dives into the world of software development, modern architecture, and the future of digital business. Knowledge shared by the Tech Yugantar team."
      />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="/blog"
              className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium capitalize transition-all duration-300 ${
                !tag
                  ? "bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-[0_0_18px_rgba(45,212,191,0.35)]"
                  : "border border-black/[0.08] bg-white/70 text-gray-600 hover:border-primary/40 hover:text-primary dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              All
            </a>
            {tags.map((t) => (
              <a
                key={t}
                href={`/blog?tag=${t}`}
                className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium capitalize transition-all duration-300 ${
                  tag === t
                    ? "bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-[0_0_18px_rgba(45,212,191,0.35)]"
                    : "border border-black/[0.08] bg-white/70 text-gray-600 hover:border-primary/40 hover:text-primary dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {t}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-x-7 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((blog, i) => (
              <Reveal key={blog.slug} delay={(i % 3) * 0.08} className="w-full">
                <SingleBlog blog={blog} />
              </Reveal>
            ))}
          </div>

          {posts.length === 0 && (
            <p className="text-body-color text-center text-lg">
              No posts tagged &ldquo;{tag}&rdquo; yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
