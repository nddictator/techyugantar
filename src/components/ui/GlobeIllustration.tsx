"use client";
import { useId } from "react";

// ── Globe math ─────────────────────────────────────────────────────────────
const CX = 250, CY = 250, R = 200;
const FORESHORTN = 0.33; // how "deep" lat ellipses appear (viewing angle ~70°)

// Latitude lines — horizontal ellipses
const LAT_DEGS = [-60, -40, -20, 0, 20, 40, 60];
const latLines = LAT_DEGS.map((deg) => {
  const phi = (deg * Math.PI) / 180;
  return {
    key: `lat${deg}`,
    cy: CY - R * Math.sin(phi),
    rx: R * Math.cos(phi),
    ry: R * Math.cos(phi) * FORESHORTN,
    opacity: Math.abs(deg) >= 60 ? 0.28 : Math.abs(deg) >= 40 ? 0.45 : 0.65,
  };
});

// Longitude lines — Q-bezier paths connecting North → equator point → South
// All lines pass through North Pole (CX, CY-R) and South Pole (CX, CY+R).
// The "control point" x at the equator = CX + R*sin(θ), which determines the curve.
const LON_DEGS = [-80, -60, -40, -20, 0, 20, 40, 60, 80];
const lonLines = LON_DEGS.map((deg) => {
  const theta = (deg * Math.PI) / 180;
  const ctrlX = CX + R * Math.sin(theta);
  return {
    key: `lon${deg}`,
    d: `M ${CX},${CY - R} Q ${ctrlX.toFixed(1)},${CY} ${CX},${CY + R}`,
    opacity: Math.abs(deg) < 5 ? 0.3 : Math.abs(deg) > 70 ? 0.3 : 0.55,
  };
});

// City markers — approximate SVG coords projected onto the front hemisphere
// (Varanasi is our home, so it gets a special glow)
const CITIES = [
  { x: 307, y: 175, label: "Varanasi",  home: true  },  // India
  { x: 178, y: 140, label: "London",    home: false },   // UK
  { x:  95, y: 185, label: "New York",  home: false },   // USA
  { x: 225, y: 268, label: "Lagos",     home: false },   // Nigeria
  { x: 290, y: 205, label: "Dubai",     home: false },   // UAE
];

// Sweep animation: orbit the globe along the 40° longitude
const SWEEP_THETA = (40 * Math.PI) / 180;
const SWEEP_RX = R * Math.sin(SWEEP_THETA) * FORESHORTN; // foreshortened width
// Ellipse circumference approximation (Ramanujan)
const sweepCircumf = Math.PI * (
  3 * (SWEEP_RX + R) - Math.sqrt((3 * SWEEP_RX + R) * (SWEEP_RX + 3 * R))
);
const SWEEP_DASH = 70;
const SWEEP_GAP  = Math.max(sweepCircumf - SWEEP_DASH, 0).toFixed(1);

// ─────────────────────────────────────────────────────────────────────────────
export default function GlobeIllustration({ className = "" }: { className?: string }) {
  const raw = useId();
  const id  = raw.replace(/[^a-z0-9]/gi, ""); // safe for SVG IDs

  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <defs>
        {/* Outer glow behind sphere */}
        <radialGradient id={`${id}og`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#399D91" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#399D91" stopOpacity="0"    />
        </radialGradient>

        {/* Sphere fill — subtle inner light */}
        <radialGradient id={`${id}sf`} cx="38%" cy="32%" r="62%">
          <stop offset="0%"   stopColor="#399D91" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#399D91" stopOpacity="0"    />
        </radialGradient>

        {/* Clip to circle */}
        <clipPath id={`${id}cl`}>
          <circle cx={CX} cy={CY} r={R} />
        </clipPath>

        {/* Glow filter for sweep + city dots */}
        <filter id={`${id}gf`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft blur only (for glow halos) */}
        <filter id={`${id}bf`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* ── Outer glow ─────────────────────────────────────────────────── */}
      <circle cx={CX} cy={CY} r={R + 70} fill={`url(#${id}og)`} />

      {/* ── Sphere fill ────────────────────────────────────────────────── */}
      <circle cx={CX} cy={CY} r={R} fill={`url(#${id}sf)`} />

      {/* ── Wireframe grid — clipped ────────────────────────────────────── */}
      <g clipPath={`url(#${id}cl)`} stroke="#399D91" fill="none">
        {/* Latitude lines */}
        {latLines.map(({ key, cy: ly, rx, ry, opacity }) => (
          <ellipse
            key={key}
            cx={CX}
            cy={ly}
            rx={rx}
            ry={ry}
            strokeWidth="0.75"
            strokeOpacity={opacity}
          />
        ))}

        {/* Longitude lines — Q bezier through poles */}
        {lonLines.map(({ key, d, opacity }) => (
          <path
            key={key}
            d={d}
            strokeWidth="0.75"
            strokeOpacity={opacity}
          />
        ))}
      </g>

      {/* ── Globe outline ───────────────────────────────────────────────── */}
      <circle
        cx={CX}
        cy={CY}
        r={R}
        stroke="#399D91"
        strokeWidth="1"
        strokeOpacity="0.5"
      />

      {/* ── Sweep arc — orbiting bright segment ─────────────────────────── */}
      {/* Halo (blurred) */}
      <ellipse
        cx={CX}
        cy={CY}
        rx={SWEEP_RX}
        ry={R}
        stroke="white"
        strokeWidth="6"
        strokeOpacity="0.25"
        strokeDasharray={`${SWEEP_DASH} ${SWEEP_GAP}`}
        clipPath={`url(#${id}cl)`}
        filter={`url(#${id}bf)`}
        style={{ animation: `globe-sweep ${sweepCircumf / 60}s linear infinite` }}
      />
      {/* Core bright arc */}
      <ellipse
        cx={CX}
        cy={CY}
        rx={SWEEP_RX}
        ry={R}
        stroke="white"
        strokeWidth="1.5"
        strokeOpacity="0.9"
        strokeDasharray={`${SWEEP_DASH} ${SWEEP_GAP}`}
        clipPath={`url(#${id}cl)`}
        filter={`url(#${id}gf)`}
        style={{ animation: `globe-sweep ${sweepCircumf / 60}s linear infinite` }}
      />

      {/* ── City dots ───────────────────────────────────────────────────── */}
      {CITIES.map(({ x, y, label, home }) => (
        <g key={label}>
          {/* Pulse ring */}
          <circle
            cx={x}
            cy={y}
            r={home ? 10 : 7}
            fill="#399D91"
            fillOpacity="0.12"
            style={{
              animation: `city-pulse ${home ? 1.8 : 2.4}s ease-out infinite`,
              transformOrigin: `${x}px ${y}px`,
            }}
          />
          {/* Dot */}
          <circle
            cx={x}
            cy={y}
            r={home ? 4 : 2.8}
            fill="#399D91"
            opacity={home ? "1" : "0.8"}
            filter={home ? `url(#${id}gf)` : undefined}
          />
          {/* Inner bright core */}
          <circle cx={x} cy={y} r={home ? 2 : 1.5} fill="white" opacity="0.9" />

          {/* Home city label */}
          {home && (
            <text
              x={x + 8}
              y={y + 4}
              className="fill-white text-[11px] font-semibold"
              fontSize="11"
              fontWeight="600"
              fill="white"
              fillOpacity="0.85"
            >
              Varanasi
            </text>
          )}
        </g>
      ))}

      {/* ── Connection arcs between cities (static, subtle) ────────────── */}
      <g stroke="#399D91" strokeWidth="0.6" strokeOpacity="0.35" fill="none" clipPath={`url(#${id}cl)`}>
        {/* Varanasi → London */}
        <path d={`M 307,175 Q 240,100 178,140`} />
        {/* Varanasi → Lagos */}
        <path d={`M 307,175 Q 260,230 225,268`} />
        {/* London → New York */}
        <path d={`M 178,140 Q 135,115 95,185`} />
        {/* Varanasi → Dubai */}
        <path d={`M 307,175 Q 298,190 290,205`} />
      </g>
    </svg>
  );
}
