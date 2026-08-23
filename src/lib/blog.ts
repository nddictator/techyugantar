import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDir = path.join(process.cwd(), "content/blogs");

export type BlogMeta = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
  image: string;
  /** Minutes, derived from word count — never a stored/fabricated figure. */
  readingTime: number;
};

export type Blog = BlogMeta & {
  content: string;
};

function readingTimeFor(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllSlugs(): string[] {
  return fs.readdirSync(blogsDir).map((file) => file.replace(/\.md$/, ""));
}

export function getAllBlogs(): BlogMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(blogsDir, `${slug}.md`), "utf8");
      const { data, content } = matter(raw);
      return { slug, ...data, readingTime: readingTimeFor(content) } as BlogMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogBySlug(slug: string): Blog {
  const raw = fs.readFileSync(path.join(blogsDir, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  return { slug, content, ...data, readingTime: readingTimeFor(content) } as Blog;
}

export function getRelatedBlogs(current: BlogMeta, limit = 3): BlogMeta[] {
  return getAllBlogs()
    .filter((post) => post.slug !== current.slug)
    .filter((post) => post.tags.some((tag) => current.tags.includes(tag)))
    .slice(0, limit);
}
