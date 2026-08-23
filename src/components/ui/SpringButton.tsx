"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cx, EASE_OUT } from "./utils";

const MotionLink = motion.create(Link);

type Ripple = { id: number; x: number; y: number };
type Variant = "primary" | "glass";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary/90",
  glass:
    "border border-black/10 bg-black/[0.03] text-black backdrop-blur-md hover:bg-black/[0.06] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
};

const baseClass =
  "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-4 text-base font-semibold transition-colors duration-300 ease-in-out";

function useMagneticRipple<T extends HTMLElement>(strength: number) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  const onMouseMove = (e: MouseEvent<T>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const spawnRipple = (e: MouseEvent<T>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const id = rippleId.current++;
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 650);
  };

  return { ref, style: { x: springX, y: springY }, onMouseMove, onMouseLeave, spawnRipple, ripples };
}

function ButtonSurface({ children, ripples }: { children: ReactNode; ripples: Ripple[] }) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/40"
          style={{ left: r.x, top: r.y, width: 10, height: 10, translateX: "-50%", translateY: "-50%" }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 18, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        />
      ))}
    </>
  );
}

type SpringButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

/** Magnetic, ripple-on-click button for in-page actions (form submit, toggles). */
export function SpringButton({
  children,
  className,
  variant = "primary",
  type = "button",
  disabled,
  onClick,
}: SpringButtonProps) {
  const magnetic = useMagneticRipple<HTMLButtonElement>(variant === "primary" ? 0.3 : 0.15);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    magnetic.spawnRipple(e);
    onClick?.(e);
  };

  return (
    <motion.button
      ref={magnetic.ref}
      type={type}
      disabled={disabled}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
      className={cx(baseClass, variantClass[variant], "disabled:cursor-not-allowed disabled:opacity-60", className)}
    >
      <ButtonSurface ripples={magnetic.ripples}>{children}</ButtonSurface>
    </motion.button>
  );
}

type SpringLinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
  variant?: Variant;
};

/** Magnetic, ripple-on-click link for navigation CTAs — wraps next/link for prefetch + SPA nav. */
export function SpringLink({ children, href, className, variant = "primary" }: SpringLinkProps) {
  const magnetic = useMagneticRipple<HTMLAnchorElement>(variant === "primary" ? 0.3 : 0.15);

  return (
    <MotionLink
      href={href}
      ref={magnetic.ref}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      onClick={magnetic.spawnRipple}
      whileTap={{ scale: 0.96 }}
      className={cx(baseClass, variantClass[variant], className)}
    >
      <ButtonSurface ripples={magnetic.ripples}>{children}</ButtonSurface>
    </MotionLink>
  );
}
