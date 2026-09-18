import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import AuthorAvatar from "@/components/Blog/AuthorAvatar";
import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import RelatedPost from "@/components/Blog/RelatedPost";
import ReadingProgress from "@/components/Blog/ReadingProgress";
import { Reveal } from "@/components/motion";
import JsonLdScript from "@/components/JsonLdScript";
import { getAllSlugs, getBlogBySlug, getRelatedBlogs } from "@/lib/blog";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/schema";
import BlogCTA from "@/components/Blog/BlogCTA";

const SITE_URL = "https://techyugantar.in";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllSlugs().includes(slug) ? getBlogBySlug(slug) : null;
  if (!post) return {};

  return {
    title: `${post.title} | Tech Yugantar Blog`,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${slug}`,
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, width: 1200, height: 800, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="font-display mt-12 mb-6 text-2xl leading-tight font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p
      className="text-body-color mb-6 text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed"
      {...props}
    />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="text-body-color mb-6 list-inside list-disc space-y-2" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="text-body-color mb-6 list-inside list-decimal space-y-2" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="text-base font-medium sm:text-lg" {...props} />
  ),
  pre: (props: React.ComponentProps<"pre">) => (
    <pre
      className="mb-6 overflow-x-auto rounded-xl border border-white/[0.06] bg-[#0d0f13] p-5 text-sm leading-relaxed text-[#e2e8f0] shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
      {...props}
    />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code className="font-mono text-sm" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="text-primary dark:text-white" {...props} />
  ),
};

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) notFound();

  const post = getBlogBySlug(slug);
  const related = getRelatedBlogs(post);
  const formattedDate = new Date(post.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ]);
  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    image: post.image,
    author: post.author,
    datePublished: post.date,
  });

  return (
    <>
      <JsonLdScript schema={breadcrumbSchema} />
      <JsonLdScript schema={articleSchema} />
      <ReadingProgress />

      <section className="pt-[140px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <Link
                href="/blog"
                className="text-body-color hover:text-primary mb-6 inline-flex items-center gap-2 text-sm font-medium"
              >
                &larr; Back to blog
              </Link>

              <h1 className="mb-8 text-3xl leading-tight font-bold text-black sm:text-4xl sm:leading-tight dark:text-white">
                {post.title}
              </h1>

              <div className="border-body-color/10 mb-10 flex flex-wrap items-center justify-between gap-y-5 border-b pb-4 dark:border-white/10">
                <div className="flex flex-wrap items-center">
                  <div className="mr-10 mb-2 flex items-center">
                    <div className="mr-4">
                      <AuthorAvatar author={post.author} />
                    </div>
                    <div className="w-full">
                      <span className="text-body-color mb-1 text-base font-medium">
                        By <span>{post.author}</span>
                      </span>
                    </div>
                  </div>
                  <div className="mb-2 flex items-center gap-5">
                    <p className="text-body-color flex items-center text-base font-medium">
                      {formattedDate}
                    </p>
                    <p className="text-body-color flex items-center text-base font-medium">
                      {post.readingTime} min read
                    </p>
                  </div>
                </div>
                <div className="mb-2">
                  <Link
                    href={`/blog?tag=${post.tags[0]}`}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-teal-600 px-4 py-2 text-sm font-semibold text-white capitalize shadow-[0_0_16px_rgba(45,212,191,0.3)]"
                  >
                    {post.tags[0]}
                  </Link>
                </div>
              </div>

              <p className="text-body-color mb-10 text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mb-10 w-full overflow-hidden rounded-2xl">
                <Reveal className="relative aspect-97/60 w-full sm:aspect-97/44 overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_20px_60px_rgba(6,8,15,0.12)] dark:border-white/[0.08]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 992px) 100vw, 66vw"
                    className="object-cover object-center"
                  />
                </Reveal>
              </div>

              <article>
                <MDXRemote source={post.content} components={mdxComponents} />
              </article>

              {/* Blog CTA — converts readers to clients */}
              <BlogCTA />

              <div className="items-center justify-between sm:flex">
                <div className="mb-5">
                  <h4 className="text-body-color mb-3 text-sm font-medium">
                    Tags :
                  </h4>
                  <div className="flex items-center flex-wrap">
                    {post.tags.map((tag) => (
                      <TagButton key={tag} href={`/blog?tag=${tag}`} text={tag} />
                    ))}
                  </div>
                </div>
                <div className="mb-5">
                  <h5 className="text-body-color mb-3 text-sm font-medium sm:text-right">
                    Share this post :
                  </h5>
                  <div className="flex items-center sm:justify-end">
                    <SharePost url={`${SITE_URL}/blog/${slug}`} title={post.title} />
                  </div>
                </div>
              </div>

              {related.length > 0 && (
                <div className="border-body-color/10 mt-10 border-t pt-10 dark:border-white/10">
                  <h4 className="mb-8 text-2xl font-bold text-black dark:text-white">
                    Related Posts
                  </h4>
                  <div className="space-y-8">
                    {related.map((relatedPost) => (
                      <RelatedPost
                        key={relatedPost.slug}
                        image={relatedPost.image}
                        href={`/blog/${relatedPost.slug}`}
                        title={relatedPost.title}
                        date={new Date(relatedPost.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsPage;
