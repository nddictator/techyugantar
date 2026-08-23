"use client";

import type { ReactNode } from "react";
import { Stagger, StaggerItem } from "@/components/motion";
import SpotlightCard from "./SpotlightCard";
import { cx } from "./utils";

type BentoGridProps = {
  children: ReactNode;
  className?: string;
};

/** Asymmetric grid container — pass span utilities per-item via `BentoItem`'s className. */
export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <Stagger
      staggerDelay={0.08}
      className={cx("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(0,1fr)]", className)}
    >
      {children}
    </Stagger>
  );
}

type BentoItemProps = {
  children: ReactNode;
  /** Span utilities, e.g. "lg:col-span-2 lg:row-span-2" — Tailwind needs literal classes, not computed ones. */
  className?: string;
  tag?: string;
};

export function BentoItem({ children, className, tag }: BentoItemProps) {
  return (
    <StaggerItem className={cx("h-full", className)}>
      <SpotlightCard tag={tag} className="h-full">
        {children}
      </SpotlightCard>
    </StaggerItem>
  );
}
