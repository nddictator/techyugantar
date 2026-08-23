"use client";

import { useEffect, useRef } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { useReducedMotion } from "motion/react";
import { cx } from "./utils";

/** cobe 2.0.1's shipped .d.ts omits `onRender`, which the library's own README documents and implements at runtime. */
type COBEOptionsWithRender = COBEOptions & {
  onRender: (state: Record<string, unknown>) => void;
};

/** Rough coordinates for a handful of global hubs — decorative "worldwide reach" markers, not a literal office map. Varanasi is the largest as the home base. */
const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [25.3176, 82.9739], size: 0.14 }, // Varanasi, India
  { location: [28.6139, 77.209], size: 0.06 }, // Delhi
  { location: [37.7749, -122.4194], size: 0.06 }, // San Francisco
  { location: [40.7128, -74.006], size: 0.06 }, // New York
  { location: [51.5074, -0.1278], size: 0.06 }, // London
  { location: [1.3521, 103.8198], size: 0.06 }, // Singapore
  { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
  { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
];

type GlobeProps = {
  className?: string;
  size?: number;
};

/** Auto-rotating, drag-to-spin WebGL globe (cobe) — swap-in for the flat hairline grid where a "global reach" visual reads better. */
export default function Globe({ className, size = 480 }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const phiRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.32,
      dark: 1,
      diffuse: 1.6,
      mapSamples: 16000,
      mapBrightness: 9,
      baseColor: [0.4, 0.55, 0.55],
      markerColor: [57 / 255, 157 / 255, 145 / 255],
      glowColor: [0.3, 0.65, 0.6],
      markers: MARKERS,
      onRender: (state) => {
        if (pointerInteracting.current === null && !prefersReducedMotion) {
          phiRef.current += 0.0032;
        }
        state.phi = phiRef.current + pointerMovement.current;
        state.width = size * 2;
        state.height = size * 2;
      },
    } satisfies COBEOptionsWithRender as COBEOptions);

    requestAnimationFrame(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });

    return () => globe.destroy();
  }, [size, prefersReducedMotion]);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current === null) return;
    pointerMovement.current = (clientX - pointerInteracting.current) / 200;
  };

  return (
    <div className={cx("relative", className)} style={{ width: size, maxWidth: "100%", aspectRatio: "1 / 1" }}>
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(57,157,145,0.35), transparent 65%)" }}
      />
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => updatePointerInteraction(e.clientX - pointerMovement.current * 200)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
        className="h-full w-full opacity-0 transition-opacity duration-1000 [contain:layout_paint_size]"
        style={{ cursor: "grab" }}
      />
    </div>
  );
}
