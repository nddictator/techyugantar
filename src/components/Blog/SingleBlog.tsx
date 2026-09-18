import Image from "next/image";
import Link from "next/link";
import type { BlogMeta } from "@/lib/blog";
import AuthorAvatar from "./AuthorAvatar";

const SingleBlog = ({ blog }: { blog: BlogMeta }) => {
  const { title, image, excerpt, author, tags, date, readingTime, slug } = blog;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300
      border-black/[0.07] bg-white/70 shadow-[0_10px_40px_rgba(6,8,15,0.06)] hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(45,212,191,0.12)]
      dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-primary/40">
      {/* top shimmer */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <Link href={`/blog/${slug}`} className="relative block aspect-37/22 w-full overflow-hidden">
        <span className="absolute right-5 top-5 z-20 inline-flex items-center rounded-full bg-teal-500/90 px-3 py-1 text-xs font-semibold text-white capitalize backdrop-blur-sm shadow-lg">
          {tags[0]}
        </span>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3>
          <Link
            href={`/blog/${slug}`}
            className="font-display mb-3 block text-xl font-semibold leading-snug text-gray-900 transition-colors hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
          >
            {title}
          </Link>
        </h3>
        <p className="mb-6 border-b border-black/[0.06] pb-6 text-sm font-medium leading-relaxed text-gray-500 dark:border-white/[0.08] dark:text-zinc-400">
          {excerpt}
        </p>
        <div className="mt-auto flex items-center">
          <div className="mr-5 flex items-center border-r border-black/[0.06] pr-5 dark:border-white/[0.08]">
            <div className="mr-3">
              <AuthorAvatar author={author} />
            </div>
            <div>
              <h4 className="mb-0.5 text-sm font-semibold text-gray-800 dark:text-white">{author}</h4>
              <p className="text-xs text-gray-400 dark:text-zinc-500">
                {new Date(date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
              </p>
            </div>
          </div>
          <div>
            <h4 className="mb-0.5 text-sm font-semibold text-gray-800 dark:text-white">Read time</h4>
            <p className="text-xs text-gray-400 dark:text-zinc-500">{readingTime} min</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
