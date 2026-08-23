"use client";

import { useState, useEffect } from "react";


const sections = [
  { id: "who-we-are", title: "Who We Are" },
  { id: "data-we-collect", title: "Data We Collect" },
  { id: "how-we-use", title: "How We Use Your Data" },
  { id: "third-party", title: "Third-Party Providers" },
  { id: "data-transfers", title: "International Transfers" },
  { id: "data-retention", title: "Data Retention" },
  { id: "cookies", title: "Cookie Policy" },
  { id: "security", title: "Data Security" },
  { id: "gdpr", title: "GDPR Rights" },
  { id: "ccpa", title: "CCPA Rights" },
  { id: "children", title: "Children's Privacy" },
  { id: "changes", title: "Policy Changes" },
  { id: "contact", title: "Contact Us" },
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

const TableRow = ({
  cells,
  isHeader,
}: {
  cells: string[];
  isHeader?: boolean;
}) => (
  <tr
    className={
      isHeader
        ? "bg-primary/5 dark:bg-primary/10"
        : "border-stroke dark:border-strokedark border-b transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
    }
  >
    {cells.map((cell, i) => (
      <td
        key={i}
        className={`px-4 py-3 text-sm ${isHeader
            ? "text-dark font-semibold dark:text-white"
            : i === 0
              ? "text-dark font-medium dark:text-white"
              : "text-body-color dark:text-body-color-dark"
          }`}
      >
        {cell}
      </td>
    ))}
  </tr>
);

export default function Privacy() {
  const [activeSection, setActiveSection] = useState("who-we-are");
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
          <div className="bg-primary/5 dark:bg-primary/10 absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-3xl" />
          <div className="bg-primary/5 dark:bg-primary/10 absolute -right-40 -bottom-40 h-[400px] w-[400px] rounded-full blur-3xl" />
        </div>
        <div className="container">
          <div className="mx-auto max-w-[760px] text-center">
            <Badge>Legal</Badge>
            <h1 className="text-dark mt-4 mb-5 text-4xl font-extrabold leading-tight dark:text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-body-color dark:text-body-color-dark mx-auto max-w-[560px] text-lg">
              We believe in radical transparency. Here is exactly what data we
              collect, why we need it, and the rights you have over it.
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
                  <strong className="text-dark dark:text-white">
                    Plain-language summary:
                  </strong>{" "}
                  Reward Hub lets you earn points by watching ads, completing
                  surveys, and finishing micro-tasks. This policy explains what
                  data we collect to make that work, who we share it with
                  (primarily our ad networks), and what control you have. We
                  will{" "}
                  <strong className="text-dark dark:text-white">never</strong>{" "}
                  sell your personal data.
                </p>
              </div>

              {/* 1. Who We Are */}
              <div>
                <SectionHeading id="who-we-are" number="01" title="Who We Are" />
                <div className="text-body-color dark:text-body-color-dark space-y-4 text-base leading-relaxed">
                  <p>
                    Reward Hub is operated by{" "}
                    <strong className="text-dark dark:text-white">Tech Yugantar</strong>,
                    a technology company headquartered in Varanasi, Uttar Pradesh,
                    India. References to "we," "us," or "our" refer to Tech Yugantar.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InfoCard icon="✉" title="Privacy Contact">
                      privacy@techyugantar.com
                    </InfoCard>
                    <InfoCard icon="📍" title="Mailing Address">
                      Tech Yugantar, Varanasi, Uttar Pradesh – 221001, India
                    </InfoCard>
                  </div>
                </div>
              </div>

              {/* 2. Data We Collect */}
              <div>
                <SectionHeading id="data-we-collect" number="02" title="Data We Collect" />
                <div className="text-body-color dark:text-body-color-dark space-y-6 text-base leading-relaxed">
                  <p>
                    We collect data in three ways: data you give us directly, data
                    collected automatically, and data received from third parties.
                  </p>
                  <h3 className="text-dark text-lg font-semibold dark:text-white">
                    2.1 — Data You Provide Directly
                  </h3>
                  <div className="border-stroke dark:border-strokedark overflow-hidden rounded-xl border">
                    <table className="w-full">
                      <thead>
                        <TableRow cells={["Data Type", "Purpose", "Required?"]} isHeader />
                      </thead>
                      <tbody>
                        <TableRow cells={["Email Address", "Account creation & communication", "Yes"]} />
                        <TableRow cells={["Display Name", "Personalising your profile", "Yes"]} />
                        <TableRow cells={["Date of Birth", "Age verification (13+/18+)", "Yes"]} />
                        <TableRow cells={["Payment Details", "Processing gift card & payout requests", "Only at redemption"]} />
                      </tbody>
                    </table>
                  </div>
                  <h3 className="text-dark text-lg font-semibold dark:text-white">
                    2.2 — Data Collected Automatically
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { icon: "📱", title: "Device ID", desc: "Prevents multi-account fraud and attributes rewards to the correct device." },
                      { icon: "🌐", title: "IP Address", desc: "Determines your region, enforces eligibility rules, and detects VPN/proxy usage." },
                      { icon: "📣", title: "Advertising ID (GAID/IDFA)", desc: "Used by AdMob & Unity Ads to serve personalised ads and measure reward completion." },
                      { icon: "📊", title: "Session & Activity Logs", desc: "Timestamps of ad views, tasks, and points earned — forming your reward audit trail." },
                    ].map((item) => (
                      <InfoCard key={item.title} icon={item.icon} title={item.title}>
                        {item.desc}
                      </InfoCard>
                    ))}
                  </div>
                  <h3 className="text-dark text-lg font-semibold dark:text-white">
                    2.3 — Data From Third Parties
                  </h3>
                  <p>
                    If you sign in via{" "}
                    <strong className="text-dark dark:text-white">Google OAuth</strong>, we
                    receive your name, email, and profile photo — never your password.
                    Ad networks share pseudonymous impression/completion signals (not your
                    name) to reconcile reward credits. Survey partners share only a
                    completion status and a pseudonymous respondent ID.
                  </p>
                </div>
              </div>

              {/* 3. How We Use */}
              <div>
                <SectionHeading id="how-we-use" number="03" title="How We Use Your Data" />
                <div className="text-body-color dark:text-body-color-dark space-y-4 text-base leading-relaxed">
                  <div className="border-stroke dark:border-strokedark overflow-hidden rounded-xl border">
                    <table className="w-full">
                      <thead>
                        <TableRow cells={["Purpose", "Legal Basis"]} isHeader />
                      </thead>
                      <tbody>
                        {[
                          ["Managing your account", "Contract performance"],
                          ["Crediting earned rewards", "Contract performance"],
                          ["Fraud prevention (bots, VPNs, multi-accounts)", "Legitimate interest"],
                          ["Serving personalised advertisements", "Consent / Legitimate interest"],
                          ["Processing reward redemptions", "Contract performance"],
                          ["Transactional emails (alerts, confirmations)", "Contract performance"],
                          ["Promotional communications", "Consent (opt-in)"],
                          ["Improving app performance", "Legitimate interest"],
                          ["Legal compliance", "Legal obligation"],
                        ].map((row) => (
                          <TableRow key={row[0]} cells={row} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      🚫 We do <strong>not</strong> sell or rent your data to data
                      brokers, build psychological profiles for non-advertising purposes,
                      or use your data for any purpose not listed above.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Third-Party */}
              <div>
                <SectionHeading id="third-party" number="04" title="Third-Party Service Providers" />
                <div className="text-body-color dark:text-body-color-dark space-y-6 text-base leading-relaxed">
                  <p>
                    We share data with trusted third parties only to the extent
                    necessary to operate Reward Hub. Each partner is bound by a
                    Data Processing Agreement (DPA).
                  </p>
                  <h3 className="text-dark text-lg font-semibold dark:text-white">
                    4.1 — Advertising Networks
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InfoCard icon="📲" title="Google AdMob">
                      Receives: Advertising ID, hashed IP, device info.{" "}
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                        Privacy Policy ↗
                      </a>
                    </InfoCard>
                    <InfoCard icon="🎮" title="Unity Ads">
                      Receives: Advertising ID, device ID, session data.{" "}
                      <a href="https://unity.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                        Privacy Policy ↗
                      </a>
                    </InfoCard>
                  </div>
                  <div className="border-primary bg-primary/5 rounded-xl border p-4">
                    <p className="text-sm font-medium">
                      <strong className="text-dark dark:text-white">Opt out of personalised ads:</strong>
                      <br />
                      <span className="text-body-color dark:text-body-color-dark">
                        Android 12+: Settings → Google → Ads → Delete Advertising ID |
                        iOS: Settings → Privacy → Tracking | In-app: Account Settings → Ad Preferences
                      </span>
                    </p>
                  </div>
                  <h3 className="text-dark text-lg font-semibold dark:text-white">
                    4.2 — Other Partners
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <InfoCard icon="📋" title="Survey Providers">
                      Receive only a pseudonymous token — never your name or email. Their policy governs survey-page data.
                    </InfoCard>
                    <InfoCard icon="📈" title="Analytics">
                      Google Analytics 4 / Vercel Analytics. Only anonymised, aggregated usage data — no PII.
                    </InfoCard>
                    <InfoCard icon="☁️" title="Infrastructure">
                      Vercel (hosting) and Firebase/Supabase (auth & DB), each operating under their own DPAs.
                    </InfoCard>
                  </div>
                </div>
              </div>

              {/* 5. International Transfers */}
              <div>
                <SectionHeading id="data-transfers" number="05" title="International Data Transfers" />
                <div className="text-body-color dark:text-body-color-dark space-y-4 text-base leading-relaxed">
                  <p>
                    Tech Yugantar is based in{" "}
                    <strong className="text-dark dark:text-white">India</strong>. Because we
                    use partners in the US and Europe, your data may be transferred
                    internationally. Transfers are protected by:
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InfoCard icon="🇪🇺" title="EEA / UK Users">
                      Standard Contractual Clauses (SCCs) approved by the European Commission, plus adequacy decisions where applicable.
                    </InfoCard>
                    <InfoCard icon="🇺🇸" title="California (CCPA) Users">
                      See Section 10 — CCPA Rights — for your specific protections and opt-out options.
                    </InfoCard>
                  </div>
                </div>
              </div>

              {/* 6. Data Retention */}
              <div>
                <SectionHeading id="data-retention" number="06" title="Data Retention" />
                <div className="border-stroke dark:border-strokedark overflow-hidden rounded-xl border">
                  <table className="w-full">
                    <thead>
                      <TableRow cells={["Data Type", "Retention Period"]} isHeader />
                    </thead>
                    <tbody>
                      {[
                        ["Account data (email, profile)", "Active + 2 years post-deletion"],
                        ["Reward & transaction logs", "5 years (financial audit compliance)"],
                        ["Advertising IDs", "Deleted within 90 days of account deletion"],
                        ["Support communications", "3 years"],
                        ["IP address logs", "12 months rolling"],
                        ["Anonymised analytics", "Indefinitely (no personal identifier)"],
                      ].map((row) => (
                        <TableRow key={row[0]} cells={row} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 7. Cookies */}
              <div>
                <SectionHeading id="cookies" number="07" title="Cookie Policy" />
                <div className="space-y-4">
                  <div className="border-stroke dark:border-strokedark overflow-hidden rounded-xl border">
                    <table className="w-full">
                      <thead>
                        <TableRow cells={["Cookie Type", "Purpose", "Can You Opt Out?"]} isHeader />
                      </thead>
                      <tbody>
                        {[
                          ["Strictly Necessary", "Session management, auth, CSRF protection", "No — required"],
                          ["Functional", "Remembering preferences (language, theme)", "Yes, via browser"],
                          ["Analytics", "Measuring page views and feature usage", "Yes, via cookie banner"],
                          ["Advertising", "Ad serving and measurement (AdMob/Unity)", "Yes, via Ad Preferences"],
                        ].map((row) => (
                          <TableRow key={row[0]} cells={row} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-body-color dark:text-body-color-dark text-sm">
                    We display a cookie consent banner on first visit per GDPR. You can
                    update your preferences anytime via the{" "}
                    <strong className="text-dark dark:text-white">Privacy Settings</strong>{" "}
                    link in the footer.
                  </p>
                </div>
              </div>

              {/* 8. Security */}
              <div>
                <SectionHeading id="security" number="08" title="Data Security" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: "🔐", title: "TLS/HTTPS Encryption", desc: "All data in transit is encrypted end-to-end." },
                    { icon: "🔑", title: "Hashed & Salted Passwords", desc: "We never store passwords in plain text." },
                    { icon: "🛡️", title: "Server-Side Validation", desc: "All reward credits are validated server-side to prevent tampering." },
                    { icon: "🚫", title: "Rate Limiting & Anomaly Detection", desc: "Automated systems identify and block abusive traffic in real time." },
                  ].map((item) => (
                    <InfoCard key={item.title} icon={item.icon} title={item.title}>
                      {item.desc}
                    </InfoCard>
                  ))}
                </div>
              </div>

              {/* 9. GDPR */}
              <div>
                <SectionHeading id="gdpr" number="09" title="GDPR Rights (EEA / UK Users)" />
                <div className="text-body-color dark:text-body-color-dark space-y-3 text-base leading-relaxed">
                  {[
                    ["Right of Access", "Request a copy of all personal data we hold about you."],
                    ["Right to Rectification", "Request correction of inaccurate data."],
                    ["Right to Erasure", "Request deletion of your data. Note: erasure forfeits unredeemed Coins."],
                    ["Right to Restriction", "Ask us to pause processing while a dispute is resolved."],
                    ["Right to Portability", "Receive your data in a machine-readable format (JSON/CSV)."],
                    ["Right to Object", "Object to processing based on legitimate interests."],
                    ["Right to Withdraw Consent", "Withdraw consent at any time without affecting prior processing."],
                  ].map(([right, desc]) => (
                    <div key={right} className="border-stroke dark:border-strokedark flex gap-4 rounded-xl border bg-white p-4 dark:bg-[#1D2144]">
                      <span className="text-primary mt-0.5 shrink-0">✓</span>
                      <p className="text-sm">
                        <strong className="text-dark dark:text-white">{right}:</strong> {desc}
                      </p>
                    </div>
                  ))}
                  <div className="border-primary bg-primary/5 rounded-xl border p-4 text-sm">
                    Email{" "}
                    <strong className="text-dark dark:text-white">privacy@techyugantar.com</strong>{" "}
                    with subject "GDPR Rights Request." We respond within{" "}
                    <strong className="text-dark dark:text-white">30 days</strong>.
                  </div>
                </div>
              </div>

              {/* 10. CCPA */}
              <div>
                <SectionHeading id="ccpa" number="10" title="CCPA Rights (California Residents)" />
                <div className="text-body-color dark:text-body-color-dark space-y-3 text-base leading-relaxed">
                  {[
                    ["Right to Know", "Know what personal information we collect, use, share, or sell."],
                    ["Right to Delete", "Request deletion of your personal information."],
                    ["Right to Correct", "Request correction of inaccurate personal information."],
                    ["Right to Opt-Out", "We do not sell data. You may opt out of ad-partner sharing via Ad Preferences."],
                    ["Right to Non-Discrimination", "We will never discriminate against you for exercising these rights."],
                  ].map(([right, desc]) => (
                    <div key={right} className="border-stroke dark:border-strokedark flex gap-4 rounded-xl border bg-white p-4 dark:bg-[#1D2144]">
                      <span className="text-primary mt-0.5 shrink-0">✓</span>
                      <p className="text-sm">
                        <strong className="text-dark dark:text-white">{right}:</strong> {desc}
                      </p>
                    </div>
                  ))}
                  <div className="border-primary bg-primary/5 rounded-xl border p-4 text-sm">
                    Email{" "}
                    <strong className="text-dark dark:text-white">privacy@techyugantar.com</strong>{" "}
                    with subject "CCPA Request." We respond within{" "}
                    <strong className="text-dark dark:text-white">45 days</strong>.
                  </div>
                </div>
              </div>

              {/* 11. Children */}
              <div>
                <SectionHeading id="children" number="11" title="Children's Privacy" />
                <div className="text-body-color dark:text-body-color-dark space-y-3 text-base leading-relaxed">
                  <p>
                    Reward Hub is{" "}
                    <strong className="text-dark dark:text-white">not directed at children under 13</strong>.
                    We do not knowingly collect data from children under 13. If we discover a
                    child under 13 has created an account, we will delete it immediately.
                  </p>
                  <p>
                    Reward redemption (gift cards, payouts) requires users to be{" "}
                    <strong className="text-dark dark:text-white">18 or older</strong>.
                    If you are a parent or guardian and believe your child has an account,
                    contact <strong className="text-dark dark:text-white">privacy@techyugantar.com</strong>.
                  </p>
                </div>
              </div>

              {/* 12. Changes */}
              <div>
                <SectionHeading id="changes" number="12" title="Policy Changes" />
                <p className="text-body-color dark:text-body-color-dark text-base leading-relaxed">
                  When we make material changes, we will (1) update the effective date above,
                  (2) send an in-app notification or email to registered users, and (3) request
                  fresh consent where required by law. Continued use after changes take effect
                  constitutes acceptance.
                </p>
              </div>

              {/* 13. Contact */}
              <div>
                <SectionHeading id="contact" number="13" title="Contact Us" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <InfoCard icon="✉" title="Privacy Email">privacy@techyugantar.com</InfoCard>
                  <InfoCard icon="⚖️" title="Legal Email">legal@techyugantar.com</InfoCard>
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