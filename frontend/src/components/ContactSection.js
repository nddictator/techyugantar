import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, MessageCircle, Mail, MapPin, Clock, ShieldCheck, PhoneCall, FileText } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/motion/Reveal";
import { WHATSAPP_URL } from "@/lib/site";

const PROJECT_TYPES = ["Web App", "Mobile App", "AI / LLM Feature", "ERP / SaaS Platform", "E-Commerce", "Other"];
const BUDGETS = ["< $2k", "$2k – $5k", "$5k – $15k", "$15k+"];

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("Web App");
  const [budget, setBudget] = useState("$2k – $5k");
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    const text = `Hi Tech Yugantar! I'm ${name} (${email}).\nProject type: ${type}\nBudget: ${budget}\n\n${message}`;
    window.open(`https://wa.me/918858271765?text=${encodeURIComponent(text)}`, "_blank");
    toast.success("Opening WhatsApp — your inquiry is ready to send. We reply within 24 business hours.");
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative py-24 sm:py-32 bg-[#07090E] bg-aurora overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-80 w-[760px] rounded-full bg-indigo-600/12 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Start a Project"
          title={<>Tell us about <span className="text-gradient">your idea</span></>}
          sub="We'll get back to you within 24 business hours."
        />
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <Reveal>
            <form data-testid="contact-form" onSubmit={submit} className="glass-card rounded-3xl p-6 sm:p-9">
              <div className="flex flex-wrap items-center gap-3 mb-7">
                {["Free consultation call", "NDA on request", "No obligation quote"].map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-3 py-1.5">
                    <ShieldCheck className="w-3 h-3" /> {b}
                  </span>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input data-testid="contact-input-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className={inputCls} />
                <input data-testid="contact-input-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" className={inputCls} />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">Project Type</label>
                <div className="flex flex-wrap gap-2" data-testid="contact-input-project-type">
                  {PROJECT_TYPES.map((t) => (
                    <button
                      type="button"
                      key={t}
                      data-testid={`contact-type-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      onClick={() => setType(t)}
                      className={`rounded-full px-4 py-2 text-xs font-medium border transition-all duration-300 ${type === t ? "bg-indigo-500/20 border-indigo-500/60 text-indigo-200" : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-slate-200"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">Budget Range</label>
                <div className="flex flex-wrap gap-2" data-testid="contact-input-budget">
                  {BUDGETS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      data-testid={`contact-budget-${b.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
                      onClick={() => setBudget(b)}
                      className={`rounded-full px-4 py-2 text-xs font-medium border font-code transition-all duration-300 ${budget === b ? "bg-cyan-500/15 border-cyan-500/60 text-cyan-200" : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-slate-200"}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                data-testid="contact-input-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your project — goals, timeline, anything that matters."
                rows={4}
                className={`${inputCls} resize-none mb-6`}
              />
              <motion.button
                data-testid="contact-submit-button"
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-7 py-4 text-sm sm:text-base font-semibold text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow duration-300"
              >
                <Send className="w-4 h-4" />
                Send Project Inquiry →
              </motion.button>
            </form>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.1}>
              <a
                data-testid="contact-whatsapp-button"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group block glass-card rounded-2xl p-6 hover:border-emerald-500/40 hover:shadow-[0_0_50px_-14px_rgba(16,185,129,0.5)] transition-all duration-500"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                    <MessageCircle className="w-6 h-6" />
                  </span>
                  <div>
                    <div className="text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">Chat on WhatsApp</div>
                    <div className="text-sm text-slate-400">Most inquiries get a response within 2 hours.</div>
                  </div>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="glass-card rounded-2xl p-6 space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact Details</div>
                <a href="mailto:info@techyugantar.in" className="flex items-center gap-3 text-sm text-slate-300 hover:text-indigo-300 transition-colors">
                  <Mail className="w-4 h-4 text-indigo-400" /> info@techyugantar.in
                </a>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400" /> Varanasi, Uttar Pradesh, India
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Clock className="w-4 h-4 text-indigo-400" /> Mon–Sat, 9 AM – 7 PM IST
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <PhoneCall className="w-4 h-4 text-indigo-400" /> +91 88582 71765
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
                  <FileText className="w-6 h-6" />
                </span>
                <div>
                  <div className="text-base font-bold text-slate-100 mb-1">Enterprise-grade delivery</div>
                  <p className="text-sm text-slate-400 leading-relaxed">Multi-tenant architecture, secure data isolation, and scalable API design — from MVP to ERP.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
