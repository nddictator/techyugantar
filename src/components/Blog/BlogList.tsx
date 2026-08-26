"use client";

import { useSearchParams } from "next/navigation";
import SingleBlog from "@/components/Blog/SingleBlog";
import type { BlogMeta } from "@/lib/blog";

const BlogList = ({ allPosts, tags }: { allPosts: BlogMeta[]; tags: string[] }) => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") ?? undefined;
  const posts = tag ? allPosts.filter((post) => post.tags.includes(tag)) : allPosts;

  return (
    <>
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
          <div key={blog.slug} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
            <SingleBlog blog={blog} />
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-body-color text-center text-lg">
          No posts tagged &ldquo;{tag}&rdquo; yet.
        </p>
      )}
    </>
  );
};

export default BlogList;
