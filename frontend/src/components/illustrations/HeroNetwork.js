const NODES = [
  { id: "next", label: "Next.js", x: 60, y: 70, color: "#F8FAFC" },
  { id: "django", label: "Django", x: 300, y: 60, color: "#10B981" },
  { id: "ai", label: "AI / LLM", x: 70, y: 230, color: "#06B6D4" },
  { id: "mobile", label: "Flutter", x: 312, y: 240, color: "#818CF8" },
];

const EDGES = [
  { d: "M110 86 L200 128", packet: "#06B6D4", dur: "3.2s" },
  { d: "M200 128 L300 80", packet: "#10B981", dur: "2.6s" },
  { d: "M110 238 L200 156", packet: "#818CF8", dur: "3.8s" },
  { d: "M200 156 L310 246", packet: "#F59E0B", dur: "3s" },
  { d: "M104 108 L104 206", packet: "#6366F1", dur: "4.2s" },
  { d: "M296 100 L310 214", packet: "#06B6D4", dur: "3.5s" },
];

const HeroNetwork = () => (
  <svg viewBox="0 0 420 320" fill="none" className="w-full h-auto" aria-hidden="true">
    <defs>
      <linearGradient id="coreGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
      <radialGradient id="coreGlow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
      </radialGradient>
      <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <circle cx="200" cy="142" r="110" fill="url(#coreGlow)" opacity="0.35" />
    <circle cx="200" cy="142" r="128" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" className="spin-slow" style={{ transformOrigin: "200px 142px" }} strokeDasharray="3 9" />
    <circle cx="200" cy="142" r="88" stroke="rgba(99,102,241,0.2)" strokeWidth="1" fill="none" />

    {EDGES.map((e, i) => (
      <g key={i}>
        <path d={e.d} stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" fill="none" className="dash-flow" />
        <circle r="3" fill={e.packet} filter="url(#softGlow)">
          <animateMotion dur={e.dur} repeatCount="indefinite" path={e.d} />
        </circle>
      </g>
    ))}

    <g filter="url(#softGlow)">
      <rect x="158" y="106" width="84" height="72" rx="14" fill="#0D1117" stroke="url(#coreGrad)" strokeWidth="1.5" />
      <rect x="176" y="120" width="48" height="8" rx="4" fill="url(#coreGrad)" opacity="0.9" />
      <rect x="176" y="134" width="34" height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
      <rect x="176" y="144" width="42" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
      <rect x="176" y="154" width="26" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
    </g>

    {NODES.map((n) => (
      <g key={n.id}>
        <rect x={n.x} y={n.y} width={n.label.length * 7.4 + 30} height="34" rx="10" fill="#0D1117" stroke="rgba(255,255,255,0.12)" />
        <circle cx={n.x + 15} cy={n.y + 17} r="4" fill={n.color} filter="url(#softGlow)" />
        <text x={n.x + 26} y={n.y + 21} fontSize="11" fontFamily="JetBrains Mono, monospace" fill="#CBD5E1">{n.label}</text>
      </g>
    ))}

    <g>
      <rect x="150" y="262" width="120" height="30" rx="15" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.35)" />
      <circle cx="164" cy="277" r="3.5" fill="#10B981">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <text x="176" y="281" fontSize="10.5" fontFamily="JetBrains Mono, monospace" fill="#6EE7B7">99.99% uptime</text>
    </g>
  </svg>
);

export default HeroNetwork;
