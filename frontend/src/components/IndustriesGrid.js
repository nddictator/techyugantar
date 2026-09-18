import { Reveal, SectionHeading } from "@/components/motion/Reveal";
import { scrollToId } from "@/lib/site";
import {
  HeartPulse, GraduationCap, ShoppingCart, Rocket, Sparkles as SpaIcon, UtensilsCrossed,
  Building2, CreditCard, Truck, Plane, Factory, Scale, HandHeart, Dumbbell,
  Sprout, BookOpen, HardHat, Store, ArrowRight,
} from "lucide-react";

const INDUSTRIES = [
  { icon: HeartPulse, name: "Healthcare & MedTech", tag: "HIS · EMR · Telemedicine" },
  { icon: GraduationCap, name: "School & College ERP", tag: "LMS · Fees · Timetable" },
  { icon: ShoppingCart, name: "E-Commerce", tag: "D2C · Marketplaces" },
  { icon: Rocket, name: "Startups & SaaS", tag: "MVP · Landing · SaaS" },
  { icon: SpaIcon, name: "Salon & Spa", tag: "Bookings · POS · Loyalty" },
  { icon: UtensilsCrossed, name: "Restaurant & Food", tag: "Ordering · KDS · Delivery" },
  { icon: Building2, name: "Real Estate", tag: "Listings · CRM · EMI" },
  { icon: CreditCard, name: "FinTech & Payments", tag: "Wallets · Lending" },
  { icon: Truck, name: "Logistics", tag: "Fleet · Tracking" },
  { icon: Plane, name: "Travel & Hospitality", tag: "Booking · Hotels · Tours" },
  { icon: Factory, name: "Manufacturing", tag: "ERP · WMS · QC" },
  { icon: Scale, name: "Legal & Professional", tag: "Cases · Billing · Docs" },
  { icon: HandHeart, name: "NGO & Non-Profit", tag: "Donations · Volunteers" },
  { icon: Dumbbell, name: "Fitness & Wellness", tag: "Gym · Class Booking" },
  { icon: Sprout, name: "AgriTech", tag: "Crops · Market Prices" },
  { icon: BookOpen, name: "EdTech Platforms", tag: "Courses · Quizzes" },
  { icon: HardHat, name: "Construction", tag: "Tracking · BOQ" },
  { icon: Store, name: "Retail & POS", tag: "Billing · GST" },
];

const IndustriesGrid = () => (
  <section id="industries" data-testid="industries-section" className="relative py-24 sm:py-32 bg-[#090C12] border-y border-white/5">
    <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[720px] rounded-full bg-cyan-500/8 blur-[120px]" />
    <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="18+ Industries"
        title={<>From Healthcare to Hospitality — <span className="text-gradient">we've done it</span></>}
        sub="We've delivered software across 18+ industry verticals. If your domain isn't listed — we've probably done something adjacent, and we'd love to learn yours."
      />
      <div data-testid="industry-item-card" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {INDUSTRIES.map((ind, i) => {
          const Icon = ind.icon;
          return (
            <Reveal key={ind.name} delay={(i % 6) * 0.05}>
              <div className="group h-full rounded-xl border border-white/8 bg-white/[0.03] backdrop-blur px-4 py-5 text-center hover:border-indigo-500/35 hover:bg-indigo-500/[0.07] hover:-translate-y-1 transition-all duration-300 cursor-default">
                <Icon className="w-6 h-6 mx-auto mb-3 text-slate-400 group-hover:text-indigo-300 transition-colors duration-300" />
                <div className="text-[13px] font-semibold text-slate-200 leading-tight">{ind.name}</div>
                <div className="mt-1.5 text-[11px] text-slate-500 font-code">{ind.tag}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.15} className="mt-10 text-center">
        <button data-testid="industries-cta" onClick={() => scrollToId("#contact")} className="group inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200 transition-colors">
          Don't see your industry? Tell us about your project
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </Reveal>
    </div>
  </section>
);

export default IndustriesGrid;
