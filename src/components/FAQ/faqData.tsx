export type Faq = {
  id: number;
  question: string;
  answer: string;
};

/**
 * Keep every answer strictly derivable from what's actually built/offered today.
 * Do not add timeline promises, SLAs, or other specifics without real business
 * confirmation — see the redesign plan's "content the user must still supply" list.
 */
const faqData: Faq[] = [
  {
    id: 1,
    question: "What kind of software does Tech Yugantar build?",
    answer:
      "We build Android and iOS apps with Flutter, web applications with Next.js and React, backend systems with Django and DRF, and custom ERP and enterprise software. We also work on AI/LLM integrations and cloud/DevOps setup.",
  },
  {
    id: 2,
    question: "How is a project priced?",
    answer:
      "We don't publish a fixed price list — ERP systems, mobile apps, and SaaS platforms all scope differently. We work under three engagement models: Fixed Price for well-defined scopes, Time & Material for evolving products, or a Dedicated Team for long-term partnerships. Share your project and we'll recommend the right fit.",
  },
  {
    id: 3,
    question: "What does your development process look like?",
    answer:
      "Every engagement runs through the same five stages: Discovery & Scoping, Architecture & Design, Build in Sprints, QA & Testing, and Handoff & Support — so you see real progress in short increments instead of waiting for a single big reveal.",
  },
  {
    id: 4,
    question: "Where is Tech Yugantar based?",
    answer: "We're based in Varanasi, Uttar Pradesh, India.",
  },
  {
    id: 5,
    question: "How do I get a quote for my project?",
    answer:
      "Reach out through our contact page with a short description of what you're building — we'll follow up to scope it and recommend an engagement model.",
  },
];

export default faqData;
