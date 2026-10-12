"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { SPRING_PHYSICS, SPRING_SURFACE } from "@/components/ui/utils";

/**
 * Full-bleed browser-framed project shot. Rises in on load, then eases from a
 * slight 3D tilt to flat as it scrolls through the viewport while the
 * screenshot pans inside the frame.
 */
export default function ParallaxShowcase({ src, alt, url }: { src: string; alt: string; url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.45], [10, 0]), SPRING_PHYSICS);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.45], [0.94, 1]), SPRING_PHYSICS);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <div ref={ref} className="relative" style={{ perspective: 1600 }}>
      <div aria-hidden className="pointer-events-none absolute inset-x-[10%] -bottom-10 h-40 rounded-full bg-teal-500/20 blur-[90px]" />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING_SURFACE, delay: 0.3 }}
      >
        <motion.div
          style={reduce ? undefined : { rotateX, scale, transformOrigin: "50% 100%" }}
          className="overflow-hidden rounded-2xl border bg-white shadow-[0_30px_90px_rgba(6,8,15,0.14)]
            border-black/[0.07] dark:border-white/[0.09] dark:bg-gray-dark dark:shadow-[0_50px_140px_rgba(0,0,0,0.85)]"
        >
          <div className="flex items-center gap-2 border-b px-4 py-3 border-black/[0.05] bg-cream-100 dark:border-white/[0.06] dark:bg-white/[0.03]">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
            <span className="mx-auto rounded-md border border-black/[0.06] bg-white px-3 py-0.5 text-[11px] text-gray-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-400">
              {url}
            </span>
          </div>
          <div className="relative aspect-[16/8.4] overflow-hidden">
            <motion.div className="absolute inset-[-5%_0]" style={reduce ? undefined : { y: imageY }}>
              <Image src={src} alt={alt} fill priority sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover object-top" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
