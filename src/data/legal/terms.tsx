import Link from "next/link";
import type { LegalDoc } from "@/components/Legal/LegalDocument";

// Draft terms for Tech Yugantar as a software development company.
// Review with the founders / legal counsel before relying on them.
const termsDoc: LegalDoc = {
  kicker: "Legal · Terms",
  title: "Terms of Service",
  intro:
    "The terms that apply when you use techyugantar.in and the general terms on which Tech Yugantar provides software development services.",
  effectiveDate: "October 12, 2026",
  appliesTo: "techyugantar.in & client engagements",
  summary: [
    "Website estimates and the pricing calculator are indicative — the signed proposal / SOW is what binds.",
    "Once fully paid, you own the custom code and designs we create for you.",
    "We keep both sides' confidential information confidential, during and after the project.",
    "These terms are governed by Indian law, with courts in Varanasi having jurisdiction.",
  ],
  sections: [
    {
      id: "acceptance",
      title: "About these terms",
      body: (
        <>
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) are an agreement between you and <strong>Tech Yugantar</strong>,
            a software development company based in Varanasi, Uttar Pradesh, India (&ldquo;we&rdquo;, &ldquo;us&rdquo;).
            By using techyugantar.in or engaging us for services, you agree to these Terms.
          </p>
          <p>
            For client work, a signed proposal, statement of work (&ldquo;SOW&rdquo;), master services agreement or NDA
            may also apply. <strong>If any of those documents conflict with these Terms, the signed document wins.</strong>
          </p>
        </>
      ),
    },
    {
      id: "services",
      title: "Our services",
      body: (
        <p>
          We provide custom software development and related services, including web and mobile app development, ERP and
          SaaS platforms, AI/LLM integrations, UI/UX design, cloud deployment, maintenance and support. The exact scope,
          deliverables, timeline and fees for each engagement are set out in the proposal or SOW agreed with you.
        </p>
      ),
    },
    {
      id: "estimates",
      title: "Estimates & proposals",
      body: (
        <>
          <p>
            Figures shown on this website — including the{" "}
            <Link href="/pricing">pricing calculator</Link> and engagement models — are{" "}
            <strong>indicative estimates only</strong> and do not form an offer. A binding price is given only in a
            written proposal or SOW after we understand your requirements.
          </p>
          <p>Unless stated otherwise, proposals are valid for 30 days from the date they are sent.</p>
        </>
      ),
    },
    {
      id: "engagement",
      title: "Engagement models & changes",
      body: (
        <ul>
          <li>
            <strong>Fixed price</strong> — delivered against an agreed scope. Work outside that scope is handled through a
            written change request with its own estimate.
          </li>
          <li>
            <strong>Time &amp; material</strong> — billed for actual time spent at the agreed rates, with regular
            reporting.
          </li>
          <li>
            <strong>Dedicated team</strong> — reserved developers billed monthly; notice periods for scaling up or down
            are set out in the SOW.
          </li>
        </ul>
      ),
    },
    {
      id: "client-responsibilities",
      title: "Your responsibilities",
      body: (
        <>
          <p>To keep the project on track, you agree to:</p>
          <ul>
            <li>Provide accurate requirements, content, brand assets and access to accounts or systems we need.</li>
            <li>Review deliverables and give feedback or approval within the timeframes agreed in the SOW.</li>
            <li>Ensure you have the rights to any content, data or materials you give us to use.</li>
            <li>Use the delivered software lawfully and in line with applicable regulations in your industry.</li>
          </ul>
          <p>Delays in feedback, approvals or access may shift timelines and, for fixed-price work, may affect cost.</p>
        </>
      ),
    },
    {
      id: "payments",
      title: "Fees & payment",
      body: (
        <ul>
          <li>Fees, milestones and payment schedules are set out in the proposal or SOW. Advance payments may be required before work starts.</li>
          <li>Invoices are payable within the period stated on them (15 days if none is stated). Prices are exclusive of GST and other applicable taxes.</li>
          <li>Third-party costs — such as hosting, domains, app-store fees, paid APIs or licences — are billed to you or paid by you directly unless the SOW says otherwise.</li>
          <li>If payment is overdue, we may pause work and withhold delivery of source code until the account is settled.</li>
        </ul>
      ),
    },
    {
      id: "ip",
      title: "Intellectual property",
      body: (
        <>
          <ul>
            <li>
              <strong>Your deliverables.</strong> On receipt of full payment for an engagement, all rights in the custom
              source code, designs and documentation we create specifically for you are transferred to you.
            </li>
            <li>
              <strong>Our pre-existing tools.</strong> We retain ownership of our pre-existing code, libraries, frameworks,
              templates and know-how. Where these are included in your deliverables, you receive a perpetual,
              non-exclusive, royalty-free licence to use them as part of that software.
            </li>
            <li>
              <strong>Open-source and third-party components</strong> remain subject to their own licences, which we will
              disclose on request.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      body: (
        <p>
          Each party will keep the other&rsquo;s non-public business, technical and financial information confidential,
          use it only for the engagement, and protect it with reasonable care. This obligation continues for three years
          after the engagement ends (or longer if a signed NDA says so), and does not apply to information that is public,
          already known, independently developed, or required to be disclosed by law.
        </p>
      ),
    },
    {
      id: "portfolio",
      title: "Portfolio & publicity",
      body: (
        <p>
          Unless you tell us otherwise in writing or an NDA prevents it, we may mention your company name, logo and a
          general description or screenshots of the public-facing work in our portfolio and case studies. We will never
          publish your confidential information or private data.
        </p>
      ),
    },
    {
      id: "warranty",
      title: "Warranty & support",
      body: (
        <>
          <p>
            We will perform services with reasonable skill and care. For fixed-price projects, we fix defects reported in
            the delivered scope free of charge during the bug-fix window stated in the SOW (30 days from go-live if none is
            stated).
          </p>
          <p>
            Ongoing maintenance, new features, and issues caused by changes made by others, third-party services, or
            hosting environments outside our control are covered under a separate support agreement. Apart from the above,
            services and the website are provided &ldquo;as is&rdquo; to the extent permitted by law.
          </p>
        </>
      ),
    },
    {
      id: "liability",
      title: "Limitation of liability",
      body: (
        <p>
          To the maximum extent permitted by law, neither party is liable for indirect, incidental or consequential
          losses, including loss of profits, revenue or data. Our total liability arising out of an engagement is limited
          to the fees you paid us for that engagement in the three months before the claim arose. Nothing in these Terms
          limits liability that cannot be limited under law.
        </p>
      ),
    },
    {
      id: "termination",
      title: "Termination",
      body: (
        <p>
          Either party may end an engagement as set out in the SOW, or with 15 days&rsquo; written notice if none is
          specified. Either party may terminate immediately if the other materially breaches these Terms and does not fix
          the breach within 15 days of notice. On termination, you pay for work completed up to the termination date, and
          we hand over the completed work for which payment has been received.
        </p>
      ),
    },
    {
      id: "website-use",
      title: "Using this website",
      body: (
        <>
          <p>You agree not to misuse techyugantar.in, including by:</p>
          <ul>
            <li>attempting to gain unauthorised access to the site, its servers or related systems;</li>
            <li>sending spam, malware, or automated requests that disrupt the site;</li>
            <li>copying or republishing our content, case studies or branding without permission.</li>
          </ul>
          <p>
            Content on this website is for general information. Links to third-party sites (including live client
            projects) are provided for convenience; we are not responsible for their content.
          </p>
        </>
      ),
    },
    {
      id: "law",
      title: "Governing law & disputes",
      body: (
        <p>
          These Terms are governed by the laws of India. The parties will first try to resolve any dispute through good-faith
          discussion. If it is not resolved within 30 days, the courts at Varanasi, Uttar Pradesh will have exclusive
          jurisdiction.
        </p>
      ),
    },
    {
      id: "changes",
      title: "Changes to these terms",
      body: (
        <p>
          We may update these Terms from time to time. The version in force when you sign a proposal or SOW applies to that
          engagement. Continued use of the website after changes means you accept the updated Terms.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Contact",
      body: (
        <p>
          <strong>Tech Yugantar</strong>
          <br />
          Varanasi, Uttar Pradesh 221001, India
          <br />
          Email: <a href="mailto:info@techyugantar.in">info@techyugantar.in</a>
        </p>
      ),
    },
  ],
};

export default termsDoc;
