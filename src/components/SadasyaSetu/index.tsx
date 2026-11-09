import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { GlowingBadge, SpotlightCard, SpringLink, TiltCard } from "@/components/ui";
import DemoForm from "./DemoForm";
import FaqList from "./FaqList";
import {
  AVAILABLE,
  FEATURES,
  PAINS,
  PLANS,
  PRICING_NOTES,
  ROADMAP,
  STEPS,
  TRUST,
} from "./content";

const GRADIENT = { backgroundImage: "linear-gradient(135deg,#399D91,#22D3EE)" };

/** The demo video lives in Firebase Storage, not in the repo; an env value can point elsewhere. */
const VIDEO_URL =
  process.env.NEXT_PUBLIC_SADASYASETU_VIDEO_URL ||
  "https://firebasestorage.googleapis.com/v0/b/ad-reward-9a7c1.firebasestorage.app/o/video%2FSadasyaSetu-portal-demo.mp4?alt=media&token=c8f89030-d1db-41eb-9abb-ccff1d1681c6";

function Eyebrow({ children }: { children: string }) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-400">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

function Heading({ eyebrow, title, accent, text, center }: { eyebrow: string; title: string; accent?: string; text?: string; center?: boolean }) {
  return (
    <Reveal>
      <div className={center ? "mx-auto mb-12 max-w-2xl text-center" : "mb-12 max-w-2xl"}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          {title}{" "}
          {accent ? (
            <span className="bg-clip-text text-transparent" style={GRADIENT}>
              {accent}
            </span>
          ) : null}
        </h2>
        {text ? <p className="mt-4 text-base text-gray-500 dark:text-zinc-400 md:text-lg">{text}</p> : null}
      </div>
    </Reveal>
  );
}

function Hairline() {
  return <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />;
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-[160px] lg:pb-24">
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[720px] rounded-full bg-primary/20 blur-[120px] dark:bg-primary/15" />
      <div className="pointer-events-none absolute top-40 left-[-15%] h-[420px] w-[520px] rounded-full bg-cyan-400/10 blur-[120px]" />
      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <Stagger immediate staggerDelay={0.08}>
            <StaggerItem>
              <GlowingBadge>A Tech Yugantar product · for new Milk Producer Companies</GlowingBadge>
            </StaggerItem>
            <StaggerItem>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-[3.4rem]">
                Member onboarding,{" "}
                <span className="bg-clip-text text-transparent" style={GRADIENT}>
                  without the paper pile.
                </span>
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p lang="hi" className="mt-5 text-lg font-semibold text-gray-800 dark:text-zinc-200 md:text-xl">
                सदस्य जोड़ना अब आसान — गाँव में फ़ोन पर फ़ॉर्म, ऑफ़िस में एक क्लिक में मंज़ूरी।
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-500 dark:text-zinc-400 md:text-lg">
                SadasyaSetu takes your membership form from the village to the member register: filled on a phone by the
                facilitator, checked and approved online, printed with signatures in one click. Built for MPOs, FPOs and
                dairy cooperatives.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-8 flex flex-wrap gap-3">
                <SpringLink href="#book-demo">Book a free demo →</SpringLink>
                {VIDEO_URL ? (
                  <SpringLink href="#demo-video" variant="glass">
                    ▶ Watch the 2-minute video
                  </SpringLink>
                ) : null}
              </div>
            </StaggerItem>
            <StaggerItem>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-gray-500 dark:text-zinc-400">
                {["Drafts kept offline in the village", "Every bank branch by IFSC", "All-India villages (LGD)"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.15}>
            <TiltCard maxTilt={6}>
              <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl shadow-primary/10 dark:border-white/10 dark:bg-zinc-900">
                <Image
                  src="/images/sadasyasetu/home.webp"
                  alt="SadasyaSetu home page with the getting started checklist"
                  width={1600}
                  height={1000}
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                />
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Pains() {
  return (
    <section className="relative py-16 md:py-20">
      <Hairline />
      <div className="container">
        <Heading
          eyebrow="The first year of a new MPO"
          title="Thousands of members to add."
          accent="Thousands of papers to chase."
          text="A new producer company has to bring in 5,000 to 30,000 members, fast and without mistakes, while it is still hiring its own staff."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
          {PAINS.map((pain) => (
            <StaggerItem key={pain.title} className="h-full">
              <SpotlightCard className="h-full p-6">
                <div className="text-2xl" aria-hidden>
                  {pain.icon}
                </div>
                <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">{pain.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-zinc-400">{pain.text}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="relative py-16 md:py-20">
      <Hairline />
      <div className="container">
        <Heading eyebrow="How it works" title="From the village to the register" accent="in three steps" center />
        <Stagger className="grid gap-4 md:grid-cols-3" staggerDelay={0.1}>
          {STEPS.map((step, index) => (
            <StaggerItem key={step.title} className="h-full">
              <SpotlightCard className="h-full p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg font-extrabold text-primary">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-500 dark:text-zinc-400">{step.text}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Paperwork() {
  return (
    <section className="relative py-16 md:py-20">
      <Hairline />
      <div className="container">
        <Heading
          eyebrow="Paperwork, digitised"
          title="Most of your member paperwork,"
          accent="on one platform"
          text="What a new MPO handles on paper today, kept digitally, searchable and ready for the auditor."
        />
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <SpotlightCard className="h-full p-7" tag="Live today">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Available today</h3>
              <ul className="mt-5 grid gap-3">
                {AVAILABLE.map((item) => (
                  <li key={item} className="flex gap-3 text-gray-600 dark:text-zinc-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/15 text-xs font-bold text-primary">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.1}>
            <SpotlightCard className="h-full p-7" tag="Roadmap">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Coming next</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">Being built with our first MPOs. Tell us what you need most.</p>
              <ul className="mt-5 grid gap-3">
                {ROADMAP.map((item) => (
                  <li key={item} className="flex gap-3 text-gray-600 dark:text-zinc-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-yellow/20 text-xs font-bold text-yellow">
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="relative py-16 md:py-20">
      <Hairline />
      <div className="container">
        <Heading eyebrow="Inside SadasyaSetu" title="Built for how a milk producer company" accent="actually works" center />
        <div className="grid gap-20">
          {FEATURES.map((feature, index) => (
            <div key={feature.title} className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal className={index % 2 ? "lg:order-2" : undefined}>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">{feature.title}</h3>
                <p className="mt-3 text-gray-500 dark:text-zinc-400 md:text-lg">{feature.text}</p>
                <ul className="mt-5 grid gap-2">
                  {feature.points.map((point) => (
                    <li key={point} className="flex gap-3 text-gray-600 dark:text-zinc-300">
                      <span className="text-primary">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <TiltCard maxTilt={5}>
                  <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl dark:border-white/10 dark:bg-zinc-900">
                    <Image src={feature.image} alt={feature.alt} width={1600} height={1000} sizes="(min-width: 1024px) 560px, 100vw" />
                  </div>
                </TiltCard>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Video() {
  if (!VIDEO_URL) return null;
  return (
    <section id="demo-video" className="relative scroll-mt-24 py-16 md:py-20">
      <Hairline />
      <div className="container">
        <Heading
          eyebrow="See it in two minutes"
          title="A walk through"
          accent="the portal"
          text="Sign-in, the home page, a member's form, approvals, the register, villages, banks and settings. Demo data only."
          center
        />
        <Reveal>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-black/10 bg-black shadow-2xl shadow-primary/10 dark:border-white/10">
            <video controls preload="none" playsInline poster="/images/sadasyasetu/home.webp" className="w-full">
              <source src={VIDEO_URL} type="video/mp4" />
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="relative py-16 md:py-20">
      <Hairline />
      <div className="container">
        <Heading eyebrow="Safe with your members' data" title="Aadhaar and bank details" accent="deserve care" />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
          {TRUST.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <SpotlightCard className="h-full p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-zinc-400">{item.text}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="sadasyasetu-pricing" className="relative scroll-mt-24 py-16 md:py-20">
      <Hairline />
      <div className="container">
        <Heading
          eyebrow="Pricing"
          title="Simple, transparent"
          accent="pricing"
          text="Annual plans based on the number of active members, priced for growing producer organizations. All prices are per year and exclude GST."
          center
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
          {PLANS.map((plan) => (
            <StaggerItem key={plan.name} className="h-full">
              <SpotlightCard
                className={`flex h-full flex-col p-7 ${plan.best ? "ring-2 ring-primary" : ""}`}
                tag={plan.best ? "Most popular" : undefined}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">{plan.members}</p>
                <p className="mt-5 text-3xl font-extrabold tracking-tight whitespace-nowrap text-gray-900 dark:text-white">
                  {plan.price}
                  {plan.price.startsWith("₹") ? <span className="text-base font-medium text-gray-400"> /year</span> : null}
                </p>
                <p className="text-sm text-gray-500 dark:text-zinc-400">{plan.monthly}</p>
                <ul className="mt-6 mb-7 grid flex-1 content-start gap-2 text-sm text-gray-600 dark:text-zinc-300">
                  {plan.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-primary">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <SpringLink href="#book-demo" variant={plan.best ? "primary" : "glass"} className="w-full">
                  {plan.price.startsWith("₹") ? "Request a demo" : "Contact sales"}
                </SpringLink>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {PRICING_NOTES.map((note) => (
            <Reveal key={note.title}>
              <div className="h-full rounded-2xl border border-gray-200 bg-white/60 p-5 text-sm text-gray-500 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400">
                <p className="mb-1 font-bold text-gray-900 dark:text-white">{note.title}</p>
                {note.text}
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-gray-400">All prices exclude 18% GST. Storage beyond the plan is charged separately.</p>
      </div>
    </section>
  );
}

function Pilot() {
  return (
    <section className="relative py-10">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-cyan-400/5 to-transparent p-8 md:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/25 blur-[90px]" />
            <div className="relative grid items-center gap-6 md:grid-cols-[1.5fr_auto]">
              <div>
                <Eyebrow>Free pilot</Eyebrow>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-3xl">
                  Try it at one BMC for a month, free
                </h2>
                <p className="mt-3 max-w-2xl text-gray-500 dark:text-zinc-400">
                  We set up your organization, train two facilitators and one approver, and run real forms with you. Decide
                  after you have seen it work.
                </p>
              </div>
              <SpringLink href="#book-demo">Start a free pilot →</SpringLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function SadasyaSetu() {
  return (
    <>
      <Hero />
      <Pains />
      <HowItWorks />
      <Paperwork />
      <Features />
      <Video />
      <Trust />
      <Pricing />
      <Pilot />
      <section className="relative py-16 md:py-20">
        <Hairline />
        <div className="container">
          <Heading eyebrow="Questions" title="What MPOs" accent="ask us" center />
          <FaqList />
        </div>
      </section>
      <section id="book-demo" className="relative scroll-mt-24 py-16 md:py-24">
        <Hairline />
        <div className="container grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Eyebrow>Book a demo</Eyebrow>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              See SadasyaSetu with{" "}
              <span className="bg-clip-text text-transparent" style={GRADIENT}>
                your MPO in mind
              </span>
            </h2>
            <p className="mt-4 text-gray-500 dark:text-zinc-400 md:text-lg">
              A 30-minute call on video or in person. We show the app and the portal, and answer your questions about your
              member drive.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <DemoForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
