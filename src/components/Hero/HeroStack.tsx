"use client";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import LiveChart from "@/components/ui/LiveChart";
import { SPRING_PHYSICS, SPRING_REVEAL, SPRING_SURFACE } from "@/components/ui/utils";

type Layer = {
  src: string;
  url: string;
  alt: string;
  /** Parallax travel in px at the pointer's furthest reach — bigger = closer to the viewer. */
  depth: number;
  rotate: number;
  className: string;
  delay: number;
};

// Back → front. Front card carries the badges and sits closest to the viewer.
const LAYERS: Layer[] = [
  {
    src: "/images/projects/jyotify.webp",
    url: "jyotify.in",
    alt: "Jyotify — Vedic astrology platform built by Tech Yugantar",
    depth: 10,
    rotate: -7,
    className: "left-0 top-0 w-[68%] opacity-70 hidden sm:block",
    delay: 0.55,
  },
  {
    src: "/images/projects/itwebdream.webp",
    url: "itwebdream.com",
    alt: "ItWebDream — software studio site built by Tech Yugantar",
    depth: 18,
    rotate: 5,
    className: "right-0 top-[8%] w-[66%] opacity-85",
    delay: 0.7,
  },
  {
    src: "/images/projects/loexa.webp",
    url: "loexaafrica.com",
    alt: "LOEXA Africa — featured project by Tech Yugantar",
    depth: 30,
    rotate: 0,
    className: "left-[8%] top-[24%] w-[84%] z-10",
    delay: 0.85,
  },
];

function BrowserFrame({ src, url, alt, priority }: { src: string; url: string; alt: string; priority?: boolean }) {
  return (
    <div
      className="overflow-hidden rounded-xl border bg-white shadow-[0_24px_70px_rgba(6,8,15,0.16)]
        border-black/[0.07] dark:border-white/[0.09] dark:bg-gray-dark dark:shadow-[0_40px_120px_rgba(0,0,0,0.85)]"
    >
      <div className="flex items-center gap-1.5 border-b px-3 py-2 border-black/[0.05] bg-cream-100 dark:border-white/[0.06] dark:bg-white/[0.03]">
        <span className="h-2 w-2 rounded-full bg-red-400/90" />
        <span className="h-2 w-2 rounded-full bg-amber-400/90" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
        <span className="mx-auto truncate rounded px-2 text-[10px] text-gray-500 dark:text-zinc-500">{url}</span>
      </div>
      <div className="relative aspect-[1024/538]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 992px) 90vw, 560px"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    </div>
  );
}

function ParallaxLayer({
  layer,
  px,
  py,
  children,
}: {
  layer: Layer;
  px: MotionValue<number>;
  py: MotionValue<number>;
  children: React.ReactNode;
}) {
  const x = useSpring(useTransform(px, (v) => v * layer.depth), SPRING_PHYSICS);
  const y = useSpring(useTransform(py, (v) => v * layer.depth), SPRING_PHYSICS);

  return (
    // Outer node owns the entrance, inner node owns the pointer parallax — two
    // separate transform channels so they never fight over `y`.
    <motion.div
      className={`absolute ${layer.className}`}
      initial={{ opacity: 0, y: 60, rotate: layer.rotate * 1.6, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, rotate: layer.rotate, scale: 1 }}
      transition={{ ...SPRING_SURFACE, delay: layer.delay }}
    >
      <motion.div style={{ x, y }}>{children}</motion.div>
    </motion.div>
  );
}

const STAR =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

/**
 * Layered stack of real shipped projects. Each window drifts with the pointer
 * at its own depth, so the stack reads as physical glass rather than a flat
 * screenshot. Pointer values come from the Hero section (-0.5 → 0.5).
 */
export default function HeroStack({ px, py }: { px: MotionValue<number>; py: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const [back, mid, front] = LAYERS;
  const chipX = useSpring(useTransform(px, (v) => v * -22), SPRING_PHYSICS);
  const chipY = useSpring(useTransform(py, (v) => v * -22), SPRING_PHYSICS);

  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[600px]">
      {/* Ambient pool of light under the stack */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[10%] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(45,212,191,0.28), transparent 70%)" }}
      />

      <ParallaxLayer layer={back} px={px} py={py}>
        <BrowserFrame src={back.src} url={back.url} alt={back.alt} />
      </ParallaxLayer>
      <ParallaxLayer layer={mid} px={px} py={py}>
        <BrowserFrame src={mid.src} url={mid.url} alt={mid.alt} />
      </ParallaxLayer>
      <ParallaxLayer layer={front} px={px} py={py}>
        <div className="relative">
          <BrowserFrame src={front.src} url={front.url} alt={front.alt} priority />

          {/* Client rating badge */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SPRING_REVEAL, delay: 1.3 }}
            className="absolute -left-4 top-10 flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 shadow-lg backdrop-blur-md sm:-left-8"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d={STAR} /></svg>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400">Client Rating</p>
              <p className="text-sm font-bold text-white">4.9 / 5.0</p>
            </div>
          </motion.div>

          {/* Projects shipped badge */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SPRING_REVEAL, delay: 1.45 }}
            className="absolute -right-3 -bottom-5 flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 shadow-lg backdrop-blur-md sm:-right-6"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/20 text-teal-300">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400">Projects Shipped</p>
              <p className="text-sm font-bold text-white">50+</p>
            </div>
          </motion.div>
        </div>
      </ParallaxLayer>

      {/* Floating analytics chip — moves against the stack for extra depth */}
      <motion.div
        className="absolute -bottom-20 -left-8 z-20 hidden w-56 lg:block xl:-left-16"
        initial={{ opacity: 0, y: 30, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...SPRING_REVEAL, delay: 1.6 }}
      >
        <motion.div style={reduce ? undefined : { x: chipX, y: chipY }}>
          <LiveChart />
        </motion.div>
      </motion.div>
    </div>
  );
}
