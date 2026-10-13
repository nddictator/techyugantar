import type { ReactNode } from "react";
import { Stagger, StaggerItem } from "@/components/motion";

type SectionHeadingProps = {
  /** Mono kicker, e.g. "01 — Process". */
  kicker: string;
  title: ReactNode;
  description: string;
};

/**
 * Editorial section heading for the process page — matches the inner-page
 * hero: mono kicker, display headline left, supporting copy right.
 */
export default function SectionHeading({ kicker, title, description }: SectionHeadingProps) {
  return (
    <Stagger className="mb-14 grid gap-6 border-b border-black/[0.07] pb-10 dark:border-white/[0.08] lg:mb-20 lg:grid-cols-12 lg:items-end">
      <StaggerItem className="lg:col-span-7">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">{kicker}</p>
        <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-gray-900 dark:text-white md:text-5xl">
          {title}
        </h2>
      </StaggerItem>
      <StaggerItem className="lg:col-span-5">
        <p className="text-base leading-relaxed text-gray-500 dark:text-zinc-400 md:text-lg">{description}</p>
      </StaggerItem>
    </Stagger>
  );
}
