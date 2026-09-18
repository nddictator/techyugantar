import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToId } from "@/lib/site";

const LINKS = [
  { label: "Services", href: "#services", testid: "nav-link-services" },
  { label: "Industries", href: "#industries", testid: "nav-link-industries" },
  { label: "Process", href: "#process", testid: "nav-link-process" },
  { label: "Work", href: "#work", testid: "nav-link-showcase" },
  { label: "Pricing", href: "#pricing", testid: "nav-link-pricing" },
];

const Logo = () => (
  <a data-testid="nav-logo" href="#top" onClick={(e) => { e.preventDefault(); scrollToId("#top"); }} className="flex items-center gap-2.5 group">
    <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 font-extrabold text-white text-sm shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/45 transition-shadow duration-300">
      TY
    </span>
    <span className="font-display font-bold tracking-tight text-lg text-slate-100">
      Tech<span className="text-gradient">Yugantar</span>
    </span>
  </a>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(href);
  };

  return (
    <motion.header
      data-testid="header-navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-slate-950/75 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-transparent border-b border-transparent"}`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <Logo />
        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              data-testid={l.testid}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-100 rounded-full hover:bg-white/5 transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden lg:block">
          <button
            data-testid="nav-cta-contact"
            onClick={(e) => go(e, "#contact")}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/45 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            Start a Project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
        <button
          data-testid="nav-mobile-menu-button"
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-white/5"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-slate-950/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {LINKS.map((l) => (
                <a key={l.href} data-testid={`${l.testid}-mobile`} href={l.href} onClick={(e) => go(e, l.href)} className="px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                  {l.label}
                </a>
              ))}
              <button data-testid="nav-cta-contact-mobile" onClick={(e) => go(e, "#contact")} className="mt-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white">
                Start a Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
