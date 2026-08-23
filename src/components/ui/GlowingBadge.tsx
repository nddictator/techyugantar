import type { ReactNode } from "react";
import { cx } from "./utils";

type GlowingBadgeProps = {
  children: ReactNode;
  className?: string;
  /** Pulsing status dot before the label. */
  pulse?: boolean;
};

/** Pill badge with a rotating conic-gradient ring, for status/eyebrow labels. */
export default function GlowingBadge({ children, className, pulse = true }: GlowingBadgeProps) {
  return (
    <div className={cx("relative inline-flex overflow-hidden rounded-full p-px", className)}>
      <span
        className="motion-safe:animate-[badge-ring-spin_3.5s_linear_infinite] absolute -inset-1/2"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, #399D91 15%, #22D3EE 30%, transparent 45%)",
        }}
        aria-hidden
      />
      <span className="relative inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black dark:bg-gray-dark dark:text-white">
        {pulse && (
          <span className="motion-safe:animate-[badge-dot-blink_2s_ease-in-out_infinite] h-1.5 w-1.5 rounded-full bg-primary" />
        )}
        {children}
      </span>
      <style>{`
        @keyframes badge-ring-spin { to { transform: rotate(360deg); } }
        @keyframes badge-dot-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
