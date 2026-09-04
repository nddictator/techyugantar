"use client";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";
import TiltCard from "@/components/ui/TiltCard";
import GlowingBadge from "@/components/ui/GlowingBadge";
import { useCallback, useRef } from "react";

type Props = {
  project: Project;
  /** Taller image for the two big cards in row 1. */
  featured?: boolean;
  /** Narrower side cards in row 2 — fewer tags shown. */
  compact?: boolean;
  /** Center-wide card in row 2 — slightly accented border. */
  centerFeatured?: boolean;
  /** Explicit image container height class, e.g. "h-[260px]". */
  imageHeight?: string;
};

export default function SingleProject({
  project,
  featured = false,
  compact = false,
  centerFeatured = false,
  imageHeight = "h-[220px]",
}: Props) {
  const { title, image, paragraph, liveUrl, tags, caseStudySlug } = project;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  const maxTilt = compact ? 12 : centerFeatured ? 7 : 9;

  return (
    <TiltCard className="h-full" maxTilt={maxTilt}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`
          group relative h-full overflow-hidden rounded-2xl
          border bg-white dark:bg-dark shadow-two dark:shadow-none
          transition-colors duration-300
          ${centerFeatured
            ? "border-primary/25 dark:border-primary/20"
            : "border-black/10 dark:border-white/[0.08]"}
        `}
      >
        {/* Cursor-tracking spotlight glow */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(57,157,145,0.10), transparent 70%)",
          }}
        />

        {/* Center badge */}
        {centerFeatured && (
          <div className="absolute top-3 right-3 z-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-[11px] font-semibold text-primary border border-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Featured
            </span>
          </div>
        )}

        {/* Screenshot */}
        <Link
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative block overflow-hidden ${imageHeight}`}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-105"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-center pb-5 z-20">
            <span className="inline-flex items-center gap-2 bg-primary px-4 py-2 rounded-full text-white text-xs font-semibold
              translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
              View Live
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Info panel */}
        <div className={`relative z-10 ${compact ? "p-4" : "p-5"}`}>
          {/* Tags — show fewer in compact mode */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {(compact ? tags.slice(0, 2) : tags).map((tag, i) => (
              <GlowingBadge key={i} pulse={false} className="scale-[0.82] origin-left">
                {tag}
              </GlowingBadge>
            ))}
            {compact && tags.length > 2 && (
              <span className="inline-flex items-center rounded-full bg-black/5 dark:bg-white/5 px-2 py-0.5 text-[10px] text-body-color dark:text-body-color-dark">
                +{tags.length - 2}
              </span>
            )}
          </div>

          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`block font-bold text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors mb-1.5 leading-snug
              ${compact ? "text-base" : centerFeatured ? "text-xl" : "text-lg"}`}
          >
            {title}
          </Link>

          {!compact && (
            <p className="text-body-color dark:text-body-color-dark text-sm leading-relaxed line-clamp-2 mb-3">
              {paragraph}
            </p>
          )}
          {compact && (
            <p className="text-body-color dark:text-body-color-dark text-xs leading-relaxed line-clamp-2 mb-3">
              {paragraph}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {caseStudySlug && (
              <Link
                href={`/case-study/${caseStudySlug}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                onClick={(e) => e.stopPropagation()}
              >
                📖 Case Study
              </Link>
            )}
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-primary/30 hover:text-primary dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-400"
              onClick={(e) => e.stopPropagation()}
            >
              ↗ Live Site
            </Link>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
