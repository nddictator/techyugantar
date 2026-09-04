"use client";
import { Feature } from "@/types/feature";
import { StaggerItem } from "@/components/motion";

const SingleFeature = ({ feature }: { feature: Feature & { tags?: string[] } }) => {
  const { icon, title, paragraph, tags } = feature;
  return (
    <StaggerItem className="w-full">
      <div
        className="
          group relative h-full overflow-hidden rounded-2xl p-6
          border transition-all duration-300 cursor-default
          border-gray-100 bg-white shadow-sm
          hover:border-primary/30 hover:shadow-[0_0_24px_rgba(57,157,145,0.08)]
          dark:border-white/[0.07] dark:bg-zinc-900/50
          dark:hover:border-primary/40 dark:hover:bg-zinc-900/80
          dark:hover:shadow-[0_0_32px_rgba(57,157,145,0.12)]
        "
      >
        {/* Top-edge highlight line — Launch UI signature */}
        <div className="
          pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300
          group-hover:opacity-100
          bg-gradient-to-r from-transparent via-primary/60 to-transparent
        " />

        {/* Background radial glow on hover */}
        <div className="
          pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full
          bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500
          group-hover:opacity-100 dark:bg-primary/10
        " />

        {/* Icon */}
        <div className="
          relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl
          bg-primary/10 text-primary
          transition-all duration-300
          group-hover:bg-primary/15 group-hover:scale-110
        ">
          {icon}
        </div>

        {/* Title */}
        <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-5 text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
          {paragraph}
        </p>

        {/* Tech tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="
                  inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium
                  bg-gray-100 text-gray-600
                  dark:bg-zinc-800 dark:text-zinc-400
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </StaggerItem>
  );
};

export default SingleFeature;
