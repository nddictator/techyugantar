"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const SPRING = { type: "spring" as const, stiffness: 380, damping: 32 };

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Desktop / Tablet header ──────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 pt-4 pointer-events-none">
        {/* Outer row — full width so logo & CTA sit outside the pill */}
        <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto">

          {/* Logo */}
          <Link href="/" className="relative z-10 shrink-0">
            <Image
              src="/images/logo/logo-2.png"
              alt="Tech Yugantar"
              width={130}
              height={28}
              className="dark:hidden"
              priority
            />
            <Image
              src="/images/logo/logo.png"
              alt="Tech Yugantar"
              width={130}
              height={28}
              className="hidden dark:block"
              priority
            />
          </Link>

          {/* ── Floating pill nav ─────────────────────────────────────── */}
          <motion.nav
            layout
            transition={SPRING}
            className={`
              hidden lg:flex items-center gap-1 px-3 py-2 rounded-full relative
              border border-black/10 dark:border-white/10
              ${scrolled
                ? "bg-white/80 dark:bg-gray-dark/80 backdrop-blur-xl shadow-lg shadow-black/5"
                : "bg-white/60 dark:bg-gray-dark/60 backdrop-blur-md shadow-sm shadow-black/5"}
            `}
          >
            {menuData.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.id}
                  href={item.path!}
                  className="relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200
                    text-body-color hover:text-black dark:text-body-color-dark dark:hover:text-white"
                >
                  {/* Animated pill background for active item */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={SPRING}
                      className="absolute inset-0 rounded-full bg-primary/10 dark:bg-primary/15"
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-primary dark:text-primary" : ""}`}>
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </motion.nav>

          {/* Right: CTA + Theme + Mobile hamburger */}
          <div className="flex items-center gap-3 relative z-10 pointer-events-auto">
            <Link
              href="/contact"
              className="
                hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white
                bg-gradient-to-r from-primary to-teal-400
                shadow-[0_0_20px_rgba(57,157,145,0.35)] hover:shadow-[0_0_28px_rgba(57,157,145,0.55)]
                transition-all duration-300 hover:scale-105 active:scale-95
              "
            >
              Get a Quote
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <ThemeToggler />
            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={SPRING}
                className="block w-6 h-0.5 bg-black dark:bg-white origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={SPRING}
                className="block w-6 h-0.5 bg-black dark:bg-white"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={SPRING}
                className="block w-6 h-0.5 bg-black dark:bg-white origin-center"
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={SPRING}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white dark:bg-gray-dark shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-black/5 dark:border-white/5">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <Image src="/images/logo/logo-2.png" alt="Tech Yugantar" width={110} height={24} className="dark:hidden" />
                  <Image src="/images/logo/logo.png" alt="Tech Yugantar" width={110} height={24} className="hidden dark:block" />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
                {menuData.map((item, i) => {
                  const isActive = pathname === item.path;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...SPRING, delay: i * 0.05 }}
                    >
                      <Link
                        href={item.path!}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all
                          ${isActive
                            ? "bg-primary/10 text-primary dark:bg-primary/15"
                            : "text-body-color hover:bg-black/5 dark:text-body-color-dark dark:hover:bg-white/5"}`}
                      >
                        {item.title}
                        {isActive && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <div className="p-5 border-t border-black/5 dark:border-white/5">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold text-white
                    bg-gradient-to-r from-primary to-teal-400
                    shadow-[0_0_20px_rgba(57,157,145,0.3)] hover:shadow-[0_0_28px_rgba(57,157,145,0.5)]
                    transition-all duration-300"
                >
                  Get a Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </>
  );
}
