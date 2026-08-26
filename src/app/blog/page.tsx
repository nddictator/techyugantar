import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
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

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/blog"
              className={`inline-flex items-center justify-center rounded-xs px-4 py-2 text-sm capitalize duration-300 ${
                !tag
                  ? "bg-primary text-white"
                  : "bg-gray-light text-black dark:bg-[#2C303B] dark:text-white hover:bg-primary hover:text-white"
              }`}
            >
              All
            </a>
            {tags.map((t) => (
              <a
                key={t}
                href={`/blog?tag=${t}`}
                className={`inline-flex items-center justify-center rounded-xs px-4 py-2 text-sm capitalize duration-300 ${
                  tag === t
                    ? "bg-primary text-white"
                    : "bg-gray-light text-black dark:bg-[#2C303B] dark:text-white hover:bg-primary hover:text-white"
                }`}
              >
                {t}
              </a>
            ))}
          </div>

          <div className="-mx-4 flex flex-wrap justify-center">
            {posts.map((blog) => (
              <div
                key={blog.slug}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog blog={blog} />
              </div>
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
