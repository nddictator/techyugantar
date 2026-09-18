import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { EASE } from "@/components/motion/Reveal";
import { scrollToId } from "@/lib/site";
import HeroNetwork from "@/components/illustrations/HeroNetwork";

const Counter = ({ to, suffix = "", decimals = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val.toFixed(decimals)}{suffix}
    </span>
  );
};

const MaskedLine = ({ children, delay }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const FloatingChip = ({ className, children, delay = 0, float = 8 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay, ease: EASE }}
    className={`absolute ${className}`}
  >
    <motion.div
      animate={{ y: [0, -float, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }}
      className="glass-card rounded-xl px-3.5 py-2.5 text-xs font-code text-slate-300 flex items-center gap-2"
    >
      {children}
    </motion.div>
  </motion.div>
);

const Hero = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });
  const illX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const illY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const glowX = useTransform(sx, [-0.5, 0.5], [24, -24]);
  const glowY = useTransform(sy, [-0.5, 0.5], [18, -18]);

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      data-testid="hero-section"
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-aurora bg-mesh pt-[72px]"
    >
      <motion.div style={{ x: glowX, y: glowY }} className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[820px] rounded-full bg-indigo-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#07090E] to-transparent z-10" />

      <div className="relative z-20 mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-8 items-center w-full">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            data-testid="hero-stats-badge"
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs sm:text-sm font-medium text-indigo-300 mb-7"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Now serving 50+ businesses globally
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-400"><MapPin className="w-3 h-3" /> Varanasi, India</span>
          </motion.div>

          <h1 data-testid="hero-title" className="font-display text-4xl sm:text-5xl lg:text-[4.4rem] font-extrabold tracking-tight leading-[1.06] text-slate-100">
            <MaskedLine delay={0.45}>We Build Software</MaskedLine>
            <MaskedLine delay={0.58}>
              <span>That </span><span className="text-gradient">Ships.</span>
            </MaskedLine>
          </h1>

          <motion.p
            data-testid="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
            className="mt-6 max-w-xl text-base sm:text-lg text-slate-400 leading-relaxed"
          >
            Tech Yugantar crafts world-class web apps, mobile products, and AI systems — from Varanasi to the global stage. Your vision, our precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-cta-explore"
              onClick={() => scrollToId("#contact")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              data-testid="hero-cta-consult"
              onClick={() => scrollToId("#work")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-7 py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:bg-white/10 hover:border-white/25 transition-all duration-300"
            >
              View Our Work
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
            className="mt-12 flex items-center gap-8 sm:gap-12"
          >
            <div data-testid="hero-stat-projects">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display"><Counter to={50} suffix="+" /></div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">Projects Shipped</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div data-testid="hero-stat-rating">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display"><Counter to={4.9} decimals={1} /><span className="text-slate-500 text-lg">/5</span></div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">Client Rating</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div data-testid="hero-stat-industries">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display"><Counter to={18} suffix="+" /></div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">Industries Served</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.6, ease: EASE }}
          className="relative hidden md:block"
          data-testid="hero-interactive-canvas"
        >
          <motion.div style={{ x: illX, y: illY }} className="relative">
            <div className="glass-card rounded-3xl p-6 relative overflow-hidden noise">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-[11px] font-code text-slate-500">techyugantar — architecture.live</span>
              </div>
              <HeroNetwork />
            </div>
            <FloatingChip className="-top-5 -left-4" delay={1.2}>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              API latency · 38ms
            </FloatingChip>
            <FloatingChip className="top-1/2 -right-5" delay={1.4} float={10}>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              deploy → production ✓
            </FloatingChip>
            <FloatingChip className="-bottom-5 left-10" delay={1.6} float={6}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LLM pipeline online
            </FloatingChip>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
