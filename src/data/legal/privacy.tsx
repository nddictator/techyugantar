import type { LegalDoc } from "@/components/Legal/LegalDocument";

// Draft policy for Tech Yugantar as a software development company.
// Review with the founders / legal counsel before relying on it.
const privacyDoc: LegalDoc = {
  kicker: "Legal · Privacy",
  title: "Privacy Policy",
  intro:
    "How Tech Yugantar collects, uses and protects personal data when you visit techyugantar.in, contact us, or work with us on a software project.",
  effectiveDate: "October 12, 2026",
  appliesTo: "techyugantar.in & client engagements",
  summary: [
    "We only collect what you give us (e.g. via the contact form) plus basic analytics and server logs.",
    "We never sell your personal data or use it for third-party advertising.",
    "Data inside client projects is handled under your contract / NDA — we act on your instructions.",
    "You can ask us to access, correct or delete your data at any time by emailing info@techyugantar.in.",
  ],
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      body: (
        <>
          <p>
            <strong>Tech Yugantar</strong> (&ldquo;Tech Yugantar&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a software
            development company based in Varanasi, Uttar Pradesh, India. We design and build web applications, mobile
            apps, ERP systems and AI-powered products for startups and businesses.
          </p>
          <p>
            For personal data we collect about website visitors, prospective clients and our own clients&rsquo; contact
            persons, we are the <strong>data fiduciary</strong> (data controller). For personal data contained in systems
            we build or maintain for a client, the client is the data fiduciary and we act as a{" "}
            <strong>data processor</strong> on their behalf (see &ldquo;Client project data&rdquo; below).
          </p>
        </>
      ),
    },
    {
      id: "data-we-collect",
      title: "Data we collect",
      body: (
        <>
          <h3>Information you give us</h3>
          <ul>
            <li>
              <strong>Contact &amp; enquiry forms</strong> — your name, email address and message, and anything else you
              choose to share about your project (company, budget, timelines).
            </li>
            <li>
              <strong>Email, WhatsApp and calls</strong> — when you reach us directly, we receive your contact details and
              the content of the conversation.
            </li>
            <li>
              <strong>Client engagements</strong> — billing details (company name, address, GSTIN), points of contact and
              the project information needed to deliver the work.
            </li>
          </ul>
          <h3>Information collected automatically</h3>
          <ul>
            <li>
              <strong>Analytics</strong> — if enabled, Google Analytics records pages visited, approximate location
              (city/country), device and browser type, and referral source using cookies.
            </li>
            <li>
              <strong>Server logs</strong> — our hosting provider records IP address, request time and user agent for
              security and troubleshooting.
            </li>
          </ul>
          <p>We do not knowingly collect sensitive personal data such as financial account passwords, health records or biometric data through this website.</p>
        </>
      ),
    },
    {
      id: "how-we-use",
      title: "How we use your data",
      body: (
        <>
          <ul>
            <li>To reply to your enquiry, prepare proposals and estimates, and schedule calls.</li>
            <li>To deliver, support and invoice the services you engage us for.</li>
            <li>To understand how the website is used so we can improve it.</li>
            <li>To keep the website and our systems secure and prevent spam or abuse.</li>
            <li>To meet legal, tax and accounting obligations under Indian law.</li>
          </ul>
          <p>
            We process data on the basis of your <strong>consent</strong> (e.g. when you submit a form), to{" "}
            <strong>perform a contract</strong> with you, or for <strong>legitimate uses</strong> permitted by law. We do
            not sell personal data or use it for third-party advertising.
          </p>
        </>
      ),
    },
    {
      id: "client-data",
      title: "Client project data",
      body: (
        <>
          <p>
            When we build or maintain software for a client, we may have access to that client&rsquo;s databases,
            repositories, staging environments or end-user data. In those cases:
          </p>
          <ul>
            <li>We process the data only on the client&rsquo;s documented instructions and for the purpose of the engagement.</li>
            <li>Access is limited to team members working on the project and is revoked when the engagement ends.</li>
            <li>Confidentiality is governed by the master services agreement, statement of work and/or NDA signed with the client.</li>
            <li>On completion or termination, we return or delete client data as agreed in the contract.</li>
          </ul>
          <p>
            End users of an application we built should contact the business that operates that application for privacy
            requests; we will assist our client in responding.
          </p>
        </>
      ),
    },
    {
      id: "sharing",
      title: "Service providers we use",
      body: (
        <>
          <p>We share personal data only with providers that help us run the business, under appropriate confidentiality terms:</p>
          <ul>
            <li><strong>Website hosting &amp; delivery</strong> (e.g. Netlify / Vercel) — serving the site and storing logs.</li>
            <li><strong>Email delivery</strong> (Resend) — forwarding contact-form messages to our inbox.</li>
            <li><strong>Analytics</strong> (Google Analytics) — aggregated usage statistics.</li>
            <li><strong>Communication</strong> (Google Workspace, WhatsApp) — email and chat with prospects and clients.</li>
            <li><strong>Accounting &amp; payments</strong> — invoicing and payment processing for engagements.</li>
          </ul>
          <p>We may also disclose data where required by law, court order or a government authority.</p>
        </>
      ),
    },
    {
      id: "transfers",
      title: "International transfers",
      body: (
        <p>
          Some of our providers store data on servers outside India (for example in the US or EU). Where data is
          transferred, we rely on providers with recognised security standards and contractual safeguards, and we do not
          transfer data to any country restricted by the Government of India.
        </p>
      ),
    },
    {
      id: "retention",
      title: "Data retention",
      body: (
        <ul>
          <li><strong>Enquiries that don&rsquo;t become projects</strong> — up to 24 months, then deleted.</li>
          <li><strong>Client contracts, invoices and related records</strong> — 8 years, as required by Indian tax and company law.</li>
          <li><strong>Client project data</strong> — for the duration of the engagement, then returned or deleted as per the contract.</li>
          <li><strong>Server logs</strong> — typically up to 90 days.</li>
        </ul>
      ),
    },
    {
      id: "cookies",
      title: "Cookies",
      body: (
        <>
          <p>
            The website uses a small number of cookies and local storage entries: one to remember your light/dark theme
            preference, and — if analytics is enabled — Google Analytics cookies (such as <code>_ga</code>) to measure
            traffic. We do not use advertising or cross-site tracking cookies.
          </p>
          <p>You can block or delete cookies in your browser settings; the site will continue to work.</p>
        </>
      ),
    },
    {
      id: "security",
      title: "Security",
      body: (
        <p>
          We use HTTPS across the site, restrict access to personal and client data on a need-to-know basis, use strong
          authentication on our tools and code repositories, and follow secure development practices. No system is
          perfectly secure, but if we become aware of a breach affecting your data we will notify you and the relevant
          authorities as required by law.
        </p>
      ),
    },
    {
      id: "your-rights",
      title: "Your rights",
      body: (
        <>
          <p>
            Under the Digital Personal Data Protection Act, 2023 and other applicable laws (including the GDPR where it
            applies to you), you may:
          </p>
          <ul>
            <li>Ask for a summary of the personal data we hold about you and how we use it.</li>
            <li>Ask us to correct, complete or update inaccurate data.</li>
            <li>Ask us to delete your data, where we are not required to keep it by law.</li>
            <li>Withdraw consent you have given, at any time.</li>
            <li>Nominate another person to exercise these rights on your behalf.</li>
            <li>Raise a grievance with us, and if unresolved, with the Data Protection Board of India.</li>
          </ul>
          <p>
            Email <a href="mailto:info@techyugantar.in">info@techyugantar.in</a> with your request. We may need to verify
            your identity and will respond within 30 days.
          </p>
        </>
      ),
    },
    {
      id: "children",
      title: "Children",
      body: (
        <p>
          This website and our services are intended for businesses and adults. We do not knowingly collect personal data
          from anyone under 18. If you believe a child has sent us personal data, contact us and we will delete it.
        </p>
      ),
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: (
        <p>
          We may update this policy as our services or the law change. The &ldquo;Effective&rdquo; date at the top shows
          when it was last revised. Significant changes will be highlighted on this page.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Contact & grievance officer",
      body: (
        <>
          <p>For privacy questions, requests or complaints, contact our Grievance Officer:</p>
          <p>
            <strong>Tech Yugantar</strong>
            <br />
            Varanasi, Uttar Pradesh 221001, India
            <br />
            Email: <a href="mailto:info@techyugantar.in">info@techyugantar.in</a>
          </p>
        </>
      ),
    },
  ],
};

export default privacyDoc;
