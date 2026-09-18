import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, MapPin } from "lucide-react";
import { scrollToId } from "@/lib/site";

const QUICK_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "Our Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Subscribed! Tech insights and case studies, straight to your inbox.");
    setEmail("");
  };

  return (
    <footer data-testid="footer-section" className="relative bg-[#05070B] border-t border-white/8 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[600px] rounded-full bg-indigo-600/10 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-8">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr_1fr] gap-12 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 font-extrabold text-white text-sm">TY</span>
              <span className="font-display font-bold tracking-tight text-lg text-slate-100">Tech<span className="text-gradient">Yugantar</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-5">
              Architecting the digital era — world-class web apps, mobile products, and AI systems from Varanasi to the global stage.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              Born on the Ghats of Varanasi, engineering for the globe
            </div>
            <div className="mt-4">
              <span data-testid="footer-status-pill" className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-code text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                99.99% · Systems Nominal
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">Quick Links</div>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); scrollToId(l.href); }}
                    className="text-sm text-slate-400 hover:text-indigo-300 transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">Stay in the loop</div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Tech insights, project case studies, and development tips — straight to your inbox. No spam, guaranteed.
            </p>
            <form onSubmit={subscribe} className="flex gap-2">
              <input
                data-testid="footer-newsletter-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 min-w-0 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
              />
              <button
                data-testid="footer-newsletter-submit"
                type="submit"
                className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 shrink-0"
              >
                Subscribe
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-7 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© 2026 Tech Yugantar. All rights reserved.</p>
          <p className="text-xs font-code text-slate-600">info@techyugantar.in · +91 88582 71765</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
