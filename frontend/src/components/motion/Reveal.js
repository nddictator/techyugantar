import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 32, className = "", as = "div" }) => {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
};

export const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300 bg-indigo-500/10 border border-indigo-500/25 px-3.5 py-1.5 rounded-full">
    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
    {children}
  </span>
);

export const SectionHeading = ({ eyebrow, title, sub, align = "center" }) => (
  <div className={`mb-14 sm:mb-20 ${align === "center" ? "text-center mx-auto" : ""} max-w-3xl`}>
    <Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.12] text-slate-100">
        {title}
      </h2>
    </Reveal>
    {sub && (
      <Reveal delay={0.16}>
        <p className={`mt-5 text-base sm:text-lg text-slate-400 leading-relaxed ${align === "center" ? "mx-auto" : ""} max-w-2xl`}>
          {sub}
        </p>
      </Reveal>
    )}
  </div>
);
