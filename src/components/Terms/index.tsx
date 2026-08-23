"use client";

import { useState, useEffect } from "react";

export const metadata = {
  title: "Terms of Service | Reward Hub",
  description:
    "Read the Terms of Service for Reward Hub by Tech Yugantar — covering eligibility, virtual currency rules, prohibited activities, and account policies.",
  robots: { index: true, follow: true },
};

const sections = [
  { id: "about", title: "About Reward Hub" },
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "eligibility", title: "Eligibility" },
  { id: "account", title: "Account & Security" },
  { id: "prohibited", title: "Prohibited Activities" },
  { id: "coins", title: "Coins & Rewards" },
  { id: "third-party", title: "Third-Party Partners" },
  { id: "ip", title: "Intellectual Property" },
  { id: "liability", title: "Disclaimers & Liability" },
  { id: "termination", title: "Account Termination" },
  { id: "modifications", title: "Modifications" },
  { id: "governing-law", title: "Governing Law" },
  { id: "general", title: "General Provisions" },
  { id: "contact", title: "Contact" },
];

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
    {children}
  </span>
);

const SectionHeading = ({
  id,
  number,
  title,
}: {
  id: string;
  number: string;
  title: string;
}) => (
  <div id={id} className="mb-6 flex items-start gap-4 scroll-mt-28">
    <span className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold">
      {number}
    </span>
    <h2 className="text-dark pt-1 text-2xl font-bold dark:text-white">
      {title}
    </h2>
  </div>
);

const InfoCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="border-stroke dark:border-strokedark rounded-xl border bg-white p-5 dark:bg-[#1D2144]">
    <div className="mb-3 flex items-center gap-3">
      <span className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-lg text-lg">
        {icon}
      </span>
      <h4 className="text-dark font-semibold dark:text-white">{title}</h4>
    </div>
    <div className="text-body-color text-sm leading-relaxed dark:text-body-color-dark">
      {children}
    </div>
  </div>
);

const ProhibitedItem = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <div className="border-stroke dark:border-strokedark rounded-xl border bg-white p-5 dark:bg-[#1D2144]">
    <h4 className="text-dark mb-3 font-semibold dark:text-white">{title}</h4>
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="text-body-color dark:text-body-color-dark flex items-start gap-2 text-sm">
          <span className="mt-1 text-red-500 shrink-0">✕</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default function Terms() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const progress =
        (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollProgress(progress);

      const sectionEls = sections.map((s) => document.getElementById(s.id));
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i];
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 z-[999] h-[3px] w-full bg-transparent">
        <div
          className="bg-primary h-full transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-[120px] pb-16 md:pt-[150px] lg:pt-[180px]">
        <div className="absolute inset-0 -z-10">
          <div className="bg-primary/5 dark:bg-primary/10 absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full blur-3xl" />
          <div className="bg-primary/5 dark:bg-primary/10 absolute -left-40 -bottom-40 h-[400px] w-[400px] rounded-full blur-3xl" />
        </div>
        <div className="container">
          <div className="mx-auto max-w-[760px] text-center">
            <Badge>Legal</Badge>
            <h1 className="text-dark mt-4 mb-5 text-4xl font-extrabold leading-tight dark:text-white sm:text-5xl">
              Terms of Service
            </h1>
            <p className="text-body-color dark:text-body-color-dark mx-auto max-w-[560px] text-lg">
              These Terms form a legally binding agreement between you and Tech
              Yugantar. Please read them carefully before using Reward Hub.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="text-body-color dark:text-body-color-dark flex items-center gap-2">
                <span className="text-primary">✦</span> Effective: March 5, 2026
              </span>
              <span className="bg-body-color/20 h-1 w-1 rounded-full" />
              <span className="text-body-color dark:text-body-color-dark flex items-center gap-2">
                <span className="text-primary">✦</span> Owner: Tech Yugantar
              </span>
              <span className="bg-body-color/20 h-1 w-1 rounded-full" />
              <span className="text-body-color dark:text-body-color-dark flex items-center gap-2">
                <span className="text-primary">✦</span> App: Reward Hub
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <div className="flex gap-8 lg:gap-12">
            {/* Sticky sidebar TOC */}
            <aside className="hidden w-[240px] shrink-0 lg:block">
              <div className="border-stroke dark:border-strokedark sticky top-24 rounded-2xl border bg-white p-5 dark:bg-[#1D2144]">
                <p className="text-dark mb-4 text-xs font-bold uppercase tracking-widest dark:text-white">
                  On This Page
                </p>
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`block rounded-lg px-3 py-2 text-sm transition-all ${activeSection === s.id
                        ? "bg-primary text-white font-medium"
                        : "text-body-color dark:text-body-color-dark hover:bg-primary/5 hover:text-primary"
                        }`}
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="min-w-0 flex-1 space-y-14">
              {/* Callout */}
              <div className="border-primary bg-primary/5 rounded-2xl border-l-4 p-6">
                <p className="text-body-color dark:text-body-color-dark text-sm leading-relaxed">
                  <strong className="text-dark dark:text-white">Summary:</strong>{" "}
                  By creating an account on Reward Hub, you confirm that you have
                  read, understood, and agree to be bound by these Terms. If you
                  do not agree, please do not use Reward Hub.
                </p>
              </div>

              {/* 1. About */}
              <div>
                <SectionHeading id="about" number="01" title="About Reward Hub" />
                <div className="text-body-color dark:text-body-color-dark space-y-4 text-base leading-relaxed">
                  <p>
                    Reward Hub is a "Watch & Earn" platform operated by{" "}
                    <strong className="text-dark dark:text-white">Tech Yugantar</strong>{" "}
                    (Varanasi, Uttar Pradesh, India) that allows eligible users to earn
                    virtual points ("Coins") by:
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <InfoCard icon="📺" title="Watch Ads">
                      Earn Coins by watching third-party advertisements served via Google AdMob and Unity Ads.
                    </InfoCard>
                    <InfoCard icon="📋" title="Complete Surveys">
                      Earn Coins by completing surveys provided by our partner survey networks.
                    </InfoCard>
                    <InfoCard icon="⚡" title="Micro-Tasks">
                      Earn Coins by completing approved micro-tasks within the platform.
                    </InfoCard>
                  </div>
                  <p>
                    Earned Coins may be redeemed for gift cards or digital payouts, subject
                    to the conditions in Section 6.
                  </p>
                </div>
              </div>

              {/* 2. Acceptance */}
              <div>
                <SectionHeading id="acceptance" number="02" title="Acceptance of Terms" />
                <div className="text-body-color dark:text-body-color-dark space-y-3 text-base leading-relaxed">
                  <p>
                    By accessing or using Reward Hub — including creating an account,
                    earning Coins, or redeeming rewards — you agree to:
                  </p>
                  {[
                    "These Terms of Service",
                    "Our Privacy Policy",
                    "Any additional guidelines, rules, or policies published within the platform (e.g., specific campaign rules)",
                  ].map((item, i) => (
                    <div key={i} className="border-stroke dark:border-strokedark flex items-start gap-3 rounded-xl border bg-white p-4 dark:bg-[#1D2144]">
                      <span className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                        {i + 1}
                      </span>
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Eligibility */}
              <div>
                <SectionHeading id="eligibility" number="03" title="Eligibility" />
                <div className="text-body-color dark:text-body-color-dark space-y-6 text-base leading-relaxed">
                  <h3 className="text-dark text-lg font-semibold dark:text-white">
                    3.1 — Age Requirements
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="border-primary bg-primary/5 rounded-xl border p-5">
                      <div className="text-primary mb-2 text-3xl font-black">13+</div>
                      <p className="text-dark text-sm font-semibold dark:text-white">General Access</p>
                      <p className="text-body-color dark:text-body-color-dark mt-1 text-sm">
                        Minimum age to create an account and start earning Coins.
                      </p>
                    </div>
                    <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 dark:border-orange-900/30 dark:bg-orange-900/10">
                      <div className="mb-2 text-3xl font-black text-orange-500">18+</div>
                      <p className="text-sm font-semibold text-orange-700 dark:text-orange-400">Reward Redemption</p>
                      <p className="mt-1 text-sm text-orange-600 dark:text-orange-300">
                        Required to redeem Coins for gift cards or digital payouts. Users 13–17 may earn but cannot redeem.
                      </p>
                    </div>
                  </div>
                  <h3 className="text-dark text-lg font-semibold dark:text-white">
                    3.2 — Geographic Eligibility
                  </h3>
                  <p>
                    Reward Hub is accessible globally. However, certain rewards (specific
                    gift card brands, payout methods) may only be available in select
                    countries. We reserve the right to restrict access or features in
                    jurisdictions where our operations would violate local laws.
                  </p>
                  <h3 className="text-dark text-lg font-semibold dark:text-white">
                    3.3 — One Account Per Person
                  </h3>
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      🚫 Each individual may maintain only <strong>one (1) Reward Hub account</strong>.
                      Accounts are non-transferable. Registering multiple accounts is a prohibited
                      activity and will result in permanent termination of all associated accounts.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Account */}
              <div>
                <SectionHeading id="account" number="04" title="Account Registration & Security" />
                <div className="text-body-color dark:text-body-color-dark space-y-4 text-base leading-relaxed">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <InfoCard icon="✅" title="Accurate Information">
                      You must provide accurate, current, and complete information during registration. False date of birth = immediate termination.
                    </InfoCard>
                    <InfoCard icon="🔒" title="Account Security">
                      You are responsible for keeping your credentials confidential and for all activity under your account.
                    </InfoCard>
                    <InfoCard icon="🔔" title="Unauthorised Access">
                      Notify us immediately at legal@techyugantar.com if you suspect unauthorised access to your account.
                    </InfoCard>
                  </div>
                </div>
              </div>

              {/* 5. Prohibited Activities */}
              <div>
                <SectionHeading id="prohibited" number="05" title="Prohibited Activities" />
                <div className="text-body-color dark:text-body-color-dark space-y-4 text-base leading-relaxed">
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      ⚠️ Violations result in: immediate account suspension or permanent termination,
                      forfeiture of all accumulated Coins, and potential legal action.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ProhibitedItem
                      title="🤖 Automated & Fraudulent Behaviour"
                      items={[
                        "Using bots, scripts, or macros to simulate ad views or task completions",
                        "Click fraud or artificially inflating ad impression counts",
                        "Emulators or virtual devices to bypass fraud controls",
                        "Rooted/jailbroken devices used to manipulate reward attribution",
                      ]}
                    />
                    <ProhibitedItem
                      title="👤 Identity & Account Manipulation"
                      items={[
                        "Creating multiple accounts (different emails, devices, or identities)",
                        "Impersonating another person or entity",
                        "Using stolen credentials or creating accounts on others' behalf",
                        "Buying, selling, or transferring accounts or Coin balances",
                      ]}
                    />
                    <ProhibitedItem
                      title="🌐 Network & Traffic Manipulation"
                      items={[
                        "Using VPN, proxy, Tor, or IP spoofing to bypass geographic restrictions",
                        "Circumventing fraud detection systems via network tools",
                        "Artificially qualifying for geo-targeted ad campaigns or surveys",
                      ]}
                    />
                    <ProhibitedItem
                      title="📋 Survey & Task Abuse"
                      items={[
                        "Providing false, random, or inconsistent survey answers",
                        "Repeatedly abandoning surveys mid-way to game completion credits",
                        "Attempting to complete the same survey or task more than once",
                        "Sharing referral codes in violation of referral programme rules",
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* 6. Coins */}
              <div>
                <SectionHeading id="coins" number="06" title="Virtual Currency (Coins) & Rewards" />
                <div className="text-body-color dark:text-body-color-dark space-y-6 text-base leading-relaxed">
                  <h3 className="text-dark text-lg font-semibold dark:text-white">6.1 — Nature of Coins</h3>
                  <div className="border-primary bg-primary/5 rounded-2xl border p-6">
                    <h4 className="text-dark mb-3 text-lg font-bold dark:text-white">
                      ⚠️ Virtual Currency Disclaimer
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Coins have no intrinsic monetary value and do not constitute legal tender, currency, or a financial instrument.",
                        "Coins are not your property. They represent a limited, revocable licence to access certain redemption features within the platform.",
                        "Coins are non-transferable between accounts and cannot be sold, gifted, or traded outside the platform.",
                        "Coins have no cash value unless and until successfully redeemed through our approved channels.",
                        "Tech Yugantar reserves the right to adjust Coin values, redemption rates, and reward catalogues at any time, with reasonable notice.",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm">
                          <span className="text-primary mt-0.5 shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <h3 className="text-dark text-lg font-semibold dark:text-white">6.2 — Earning Coins</h3>
                  <p>
                    Coins are credited upon verified completion of eligible activities.
                    Completion is determined solely by our platform's server-side tracking.
                    Coins will not be credited for activities where completion signals were
                    not received, activities flagged by fraud detection, or activities
                    completed via prohibited means.
                  </p>
                  <div className="border-primary bg-primary/5 rounded-xl border p-4 text-sm">
                    Missing Coins? Raise a support ticket within{" "}
                    <strong className="text-dark dark:text-white">7 days</strong> of the activity.
                    We review server logs and respond within 10 business days.
                  </div>

                  <h3 className="text-dark text-lg font-semibold dark:text-white">6.3 — Coin Expiry</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InfoCard icon="⏰" title="Inactivity Expiry">
                      Coins expire after <strong>180 consecutive days</strong> of account inactivity (no logins). A warning email is sent 30 days before expiry.
                    </InfoCard>
                    <InfoCard icon="🔄" title="Reset the Clock">
                      Simply log in to your account to reset the inactivity timer and keep your Coins active.
                    </InfoCard>
                  </div>

                  <h3 className="text-dark text-lg font-semibold dark:text-white">6.4 — Redemption Rules</h3>
                  <div className="border-stroke dark:border-strokedark overflow-hidden rounded-xl border">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-primary/5 dark:bg-primary/10">
                          <td className="text-dark px-4 py-3 text-sm font-semibold dark:text-white">Requirement</td>
                          <td className="text-dark px-4 py-3 text-sm font-semibold dark:text-white">Detail</td>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Account status", "Must be in good standing (not suspended or under investigation)"],
                          ["Minimum age", "18 years or older — ID verification may be required"],
                          ["Minimum threshold", "Displayed on the Rewards page; varies by redemption method"],
                          ["Processing time", "5–10 business days (may vary by method: gift card, UPI, etc.)"],
                          ["Refunds", "Redeemed Coins are non-refundable once processed"],
                          ["Expired gift cards", "Tech Yugantar is not responsible for retailer-issued expiry policies"],
                        ].map(([req, detail]) => (
                          <tr key={req} className="border-stroke dark:border-strokedark border-b hover:bg-gray-50 dark:hover:bg-white/5">
                            <td className="text-dark px-4 py-3 text-sm font-medium dark:text-white">{req}</td>
                            <td className="text-body-color dark:text-body-color-dark px-4 py-3 text-sm">{detail}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-dark text-lg font-semibold dark:text-white">6.5 — Tax Responsibility</h3>
                  <p>
                    You are solely responsible for determining and satisfying any tax
                    obligations arising from redeemed rewards (income tax, GST, etc.).
                    Tech Yugantar does not provide tax advice.
                  </p>
                </div>
              </div>

              {/* 7. Third-Party */}
              <div>
                <SectionHeading id="third-party" number="07" title="Third-Party Ad Networks & Survey Providers" />
                <div className="text-body-color dark:text-body-color-dark space-y-4 text-base leading-relaxed">
                  <p>
                    Reward Hub integrates with Google AdMob, Unity Ads, and survey
                    providers. These third parties operate under their own terms and
                    privacy policies. Tech Yugantar is{" "}
                    <strong className="text-dark dark:text-white">not responsible</strong>{" "}
                    for the content, accuracy, or legality of third-party ads or surveys.
                  </p>
                  <p>
                    We do not guarantee a minimum number of available ads or surveys at
                    any given time. Ad availability depends on third-party inventory,
                    your geographic location, and device characteristics.
                  </p>
                </div>
              </div>

              {/* 8. IP */}
              <div>
                <SectionHeading id="ip" number="08" title="Intellectual Property" />
                <div className="text-body-color dark:text-body-color-dark space-y-4 text-base leading-relaxed">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InfoCard icon="™" title="Our Content">
                      All content, branding, software, and design elements of Reward Hub are the exclusive IP of Tech Yugantar. You may not copy, reproduce, or create derivative works without written permission.
                    </InfoCard>
                    <InfoCard icon="🔑" title="Your Licence">
                      You receive a limited, non-exclusive, non-transferable, revocable licence to access Reward Hub for personal, non-commercial use in accordance with these Terms.
                    </InfoCard>
                  </div>
                </div>
              </div>

              {/* 9. Liability */}
              <div>
                <SectionHeading id="liability" number="09" title="Disclaimers & Limitation of Liability" />
                <div className="text-body-color dark:text-body-color-dark space-y-4 text-base leading-relaxed">
                  <div className="border-stroke dark:border-strokedark rounded-xl border bg-white p-5 dark:bg-[#1D2144]">
                    <h4 className="text-dark mb-2 font-semibold dark:text-white">Service Availability</h4>
                    <p className="text-sm">
                      Reward Hub is provided "as is" and "as available." We do not guarantee
                      uninterrupted, error-free service. We may suspend or discontinue features
                      at any time for maintenance, legal reasons, or business purposes.
                    </p>
                  </div>
                  <div className="border-stroke dark:border-strokedark rounded-xl border bg-white p-5 dark:bg-[#1D2144]">
                    <h4 className="text-dark mb-3 font-semibold dark:text-white">We Are Not Liable For:</h4>
                    <ul className="space-y-2">
                      {[
                        "Loss of Coins due to account termination for violations of these Terms",
                        "Loss of Coins due to account inactivity expiry",
                        "Technical failures of third-party ad networks or survey providers",
                        "Indirect, incidental, consequential, special, or punitive damages",
                        "Loss arising from unauthorised access to your account",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <span className="mt-1 text-red-500 shrink-0">✕</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-primary bg-primary/5 rounded-xl border p-4 text-sm">
                    Our total aggregate liability for any claim shall not exceed the equivalent
                    monetary value of Coins redeemed by you in the{" "}
                    <strong className="text-dark dark:text-white">three (3) months</strong>{" "}
                    preceding the claim.
                  </div>
                </div>
              </div>

              {/* 10. Termination */}
              <div>
                <SectionHeading id="termination" number="10" title="Account Suspension & Termination" />
                <div className="text-body-color dark:text-body-color-dark space-y-6 text-base leading-relaxed">
                  <h3 className="text-dark text-lg font-semibold dark:text-white">10.1 — Termination by You</h3>
                  <p>
                    Delete your account anytime via{" "}
                    <strong className="text-dark dark:text-white">
                      Account Settings → Delete Account
                    </strong>
                    . Upon deletion, your personal data is handled per our Privacy Policy,
                    and any unredeemed Coin balance is{" "}
                    <strong className="text-dark dark:text-white">permanently forfeited</strong>.
                  </p>
                  <h3 className="text-dark text-lg font-semibold dark:text-white">10.2 — Termination by Tech Yugantar</h3>
                  <p>
                    We may suspend or permanently terminate your account, with or without
                    notice, for violating any provision of these Terms, engaging in
                    fraudulent/abusive/illegal activity, providing false registration
                    information, or harming other users, ad partners, or platform integrity.
                  </p>
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      Upon termination for cause: all accumulated Coins are immediately
                      forfeited, pending redemption requests may be cancelled and reversed,
                      and you are prohibited from creating new accounts.
                    </p>
                  </div>
                  <h3 className="text-dark text-lg font-semibold dark:text-white">10.3 — Appeal Process</h3>
                  <div className="border-primary bg-primary/5 rounded-xl border p-4 text-sm">
                    Appeal within{" "}
                    <strong className="text-dark dark:text-white">14 days</strong> of suspension by emailing{" "}
                    <strong className="text-dark dark:text-white">legal@techyugantar.com</strong>{" "}
                    with subject "Account Appeal." We respond within 15 business days.
                    Our decision on appeals is final.
                  </div>
                </div>
              </div>

              {/* 11. Modifications */}
              <div>
                <SectionHeading id="modifications" number="11" title="Modifications to These Terms" />
                <p className="text-body-color dark:text-body-color-dark text-base leading-relaxed">
                  We will provide at least{" "}
                  <strong className="text-dark dark:text-white">14 days' advance notice</strong>{" "}
                  of material changes via in-app notification and email. Your continued use
                  of Reward Hub after changes take effect constitutes your agreement to the
                  revised Terms. If you do not agree, you must delete your account before
                  the effective date.
                </p>
              </div>

              {/* 12. Governing Law */}
              <div>
                <SectionHeading id="governing-law" number="12" title="Governing Law & Dispute Resolution" />
                <div className="text-body-color dark:text-body-color-dark space-y-4 text-base leading-relaxed">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <InfoCard icon="⚖️" title="Governing Law">
                      Laws of India — IT Act 2000, Consumer Protection Act 2019, and applicable rules.
                    </InfoCard>
                    <InfoCard icon="🤝" title="Informal Resolution">
                      Contact legal@techyugantar.com first. We attempt informal resolution within 30 days.
                    </InfoCard>
                    <InfoCard icon="🏛️" title="Arbitration">
                      Binding arbitration under the Arbitration and Conciliation Act, 1996, seated in Varanasi, UP.
                    </InfoCard>
                  </div>
                  <div className="border-stroke dark:border-strokedark rounded-xl border bg-white p-4 text-sm dark:bg-[#1D2144]">
                    <strong className="text-dark dark:text-white">Class Action Waiver:</strong>{" "}
                    <span className="text-body-color dark:text-body-color-dark">
                      You waive any right to participate in class-action lawsuits or
                      class-wide arbitration. All disputes are conducted on an individual basis only.
                    </span>
                  </div>
                </div>
              </div>

              {/* 13. General */}
              <div>
                <SectionHeading id="general" number="13" title="General Provisions" />
                <div className="text-body-color dark:text-body-color-dark grid gap-4 sm:grid-cols-2 text-base">
                  {[
                    ["📄 Entire Agreement", "These Terms and the Privacy Policy constitute the entire agreement between you and Tech Yugantar regarding Reward Hub."],
                    ["✂️ Severability", "If any provision is found unenforceable, the remaining provisions continue in full force."],
                    ["🤲 No Waiver", "Our failure to enforce any right or provision shall not constitute a waiver of that right."],
                    ["⚡ Force Majeure", "Tech Yugantar is not liable for failure to perform due to circumstances beyond our reasonable control."],
                  ].map(([title, desc]) => (
                    <div key={String(title)} className="border-stroke dark:border-strokedark rounded-xl border bg-white p-4 dark:bg-[#1D2144]">
                      <p className="text-dark mb-1 text-sm font-semibold dark:text-white">{title}</p>
                      <p className="text-sm">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 14. Contact */}
              <div>
                <SectionHeading id="contact" number="14" title="Contact & Legal Notices" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <InfoCard icon="⚖️" title="Legal Email">legal@techyugantar.com</InfoCard>
                  <InfoCard icon="✉" title="Privacy Email">privacy@techyugantar.com</InfoCard>
                  <InfoCard icon="📍" title="Mailing Address">Tech Yugantar, Varanasi, UP – 221001, India</InfoCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}