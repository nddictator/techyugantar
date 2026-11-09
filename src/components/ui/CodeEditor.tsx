"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cx } from "./utils";

/**
 * Animated code-editor mockup. Types a short snippet line-by-line on scroll,
 * shows a blinking caret, then a "committed" status line. Theme-aware chrome.
 */
type Tok = { t: string; c: string };
const LINES: Tok[][] = [
  [{ t: "import", c: "text-fuchsia-400" }, { t: " { ship }", c: "text-zinc-300" }, { t: " from", c: "text-fuchsia-400" }, { t: " 'yugantar'", c: "text-amber-300" }],
  [],
  [{ t: "export", c: "text-fuchsia-400" }, { t: " async", c: "text-sky-400" }, { t: " function", c: "text-sky-400" }, { t: " build", c: "text-teal-300" }, { t: "() {", c: "text-zinc-300" }],
  [{ t: "  const", c: "text-fuchsia-400" }, { t: " product", c: "text-zinc-300" }, { t: " =", c: "text-zinc-500" }, { t: " await", c: "text-sky-400" }, { t: " ship({", c: "text-zinc-300" }],
  [{ t: "    stack", c: "text-teal-300" }, { t: ": [", c: "text-zinc-300" }, { t: "'next'", c: "text-amber-300" }, { t: ", ", c: "text-zinc-500" }, { t: "'django'", c: "text-amber-300" }, { t: "],", c: "text-zinc-300" }],
  [{ t: "    scale", c: "text-teal-300" }, { t: ": ", c: "text-zinc-300" }, { t: "'global'", c: "text-amber-300" }, { t: ",", c: "text-zinc-500" }],
  [{ t: "  });", c: "text-zinc-300" }],
  [{ t: "  return", c: "text-fuchsia-400" }, { t: " product;", c: "text-zinc-300" }],
  [{ t: "}", c: "text-zinc-300" }],
];

export default function CodeEditor({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(reduce ? LINES.length : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    setVisible(0);
    const id = setInterval(() => {
      setVisible((v) => {
        if (v >= LINES.length) { clearInterval(id); return v; }
        return v + 1;
      });
    }, 260);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const done = visible >= LINES.length;

  return (
    <div
      ref={ref}
      className={cx(
        "relative overflow-hidden rounded-2xl border font-mono text-[13px] leading-relaxed",
        "border-black/10 bg-[#0d0f13] shadow-[0_24px_70px_rgba(0,0,0,0.35)]",
        "dark:border-white/[0.08] dark:shadow-[0_30px_90px_rgba(0,0,0,0.7)]",
        className,
      )}
      data-testid="code-editor-illustration"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/90" />
        <span className="h-3 w-3 rounded-full bg-amber-400/90" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
        <span className="ml-3 text-[11px] text-zinc-500">build.ts</span>
        <span className="ml-auto text-[11px] text-teal-300/80">TypeScript</span>
      </div>

      {/* code body */}
      <div className="flex px-4 py-4">
        {/* line numbers */}
        <div className="mr-4 select-none text-right text-zinc-600">
          {LINES.map((_, i) => (
            <div key={i} className={i < visible ? "opacity-100" : "opacity-30"}>{i + 1}</div>
          ))}
        </div>
        {/* tokens */}
        <div className="min-w-0 flex-1">
          {LINES.map((line, i) => {
            const isCurrent = i === visible - 1 && !done;
            return (
              <div
                key={i}
                className="whitespace-pre transition-opacity duration-200"
                style={{ opacity: i < visible ? 1 : 0 }}
              >
                {line.length === 0 ? "\u00A0" : line.map((tok, j) => (
                  <span key={j} className={tok.c}>{tok.t}</span>
                ))}
                {isCurrent && (
                  <span className="ml-0.5 inline-block h-[1.05em] w-[2px] -translate-y-[2px] bg-teal-300 align-middle motion-safe:animate-[caret-blink_1s_step-end_infinite]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* status footer */}
      <div className="flex items-center gap-2 border-t border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-[11px]">
        <span
          className="flex items-center gap-1.5 transition-opacity duration-500"
          style={{ opacity: done ? 1 : 0.35 }}
        >
          <span className={cx("h-1.5 w-1.5 rounded-full", done ? "bg-emerald-400" : "bg-zinc-600")} />
          <span className="text-zinc-400">{done ? "Deployed · 0 errors · 1.2s" : "Compiling…"}</span>
        </span>
        <span className="ml-auto text-teal-300/70">main ✓</span>
      </div>
    </div>
  );
}
