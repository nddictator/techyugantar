import { Quote, Star } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/motion/Reveal";
import { scrollToId } from "@/lib/site";

const TESTIMONIALS = [
  {
    id: "testimonial-card-1",
    quote: "We hired Tech Yugantar as our dedicated backend team for 6 months. Communication was crystal clear — daily standups, weekly demos, board always updated. It felt like having an in-house team without the overhead.",
    name: "Mohit Joshi",
    role: "Product Lead, TechBridge Solutions",
    place: "Jaipur, Rajasthan",
    initials: "MJ",
    project: "Dedicated Dev Team",
  },
  {
    id: "testimonial-card-2",
    quote: "Tech Yugantar built our entire telemedicine platform from scratch — doctor booking, video consultation, and prescription management. Delivered in 3 months, bug-free. Our patient count crossed 10,000 within the first quarter.",
    name: "Rajesh Agarwal",
    role: "Founder & CEO, MedConnect India",
    place: "Lucknow, UP",
    initials: "RA",
    project: "Healthcare Web App",
  },
  {
    id: "testimonial-card-3",
    quote: "We needed a school ERP that worked in rural India with poor connectivity. Tech Yugantar built an offline-first PWA that teachers could use on basic Android phones. The attention to real-world constraints was extraordinary.",
    name: "Priya Sharma",
    role: "Co-Founder, EduNest Learning",
    place: "Kanpur, UP",
    initials: "PS",
    project: "School ERP System",
  },
];

const Testimonials = () => (
  <section data-testid="testimonials-section" className="relative py-24 sm:py-32 bg-[#07090E] bg-mesh overflow-hidden">
    <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[640px] rounded-full bg-indigo-500/8 blur-[110px]" />
    <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="Client Stories"
        title={<>What our <span className="text-gradient">clients say</span></>}
        sub="50+ businesses built. Real words from real founders — no cherry-picking."
      />
      <div className="grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.1}>
            <figure
              data-testid={t.id}
              className="group relative h-full glass-card rounded-2xl p-7 hover:border-indigo-500/35 hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
            >
              <Quote className="w-8 h-8 text-indigo-500/40 mb-4 group-hover:text-indigo-400/70 transition-colors duration-300" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-sm text-slate-300 leading-relaxed flex-1">"{t.quote}"</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-white/8 flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-bold text-white shrink-0">
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-semibold text-slate-100">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role} · {t.place}</div>
                  <div className="text-[11px] font-code text-indigo-400/80 mt-0.5">{t.project}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2} className="mt-12 text-center">
        <p className="text-slate-400 text-sm mb-4">Ready to add your name to this list?</p>
        <button
          data-testid="testimonials-cta"
          onClick={() => scrollToId("#contact")}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-6 py-3 text-sm font-semibold text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400/60 transition-all duration-300"
        >
          Start Your Project →
        </button>
      </Reveal>
    </div>
  </section>
);

export default Testimonials;
