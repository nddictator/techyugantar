/**
 * Copy for the SadasyaSetu product page. "Available today" lists only what the product
 * does now; anything still being built belongs in `ROADMAP`.
 */

export const PAINS = [
  { icon: "📄", title: "Forms go missing", text: "Paper travels from the MPP to the BMC to the head office, and some never arrive." },
  { icon: "⌨️", title: "Typed twice", text: "Every form is written by hand, then typed again into Excel or the ERP." },
  { icon: "🏦", title: "Payments bounce", text: "A wrong IFSC or account number holds up the member's milk payment." },
  { icon: "🔍", title: "Audit stress", text: "Who approved which member, and when? The register and the file rarely agree." },
];

export const STEPS = [
  {
    title: "Fill in the village",
    text: "The facilitator fills the form on the SadasyaSetu app at the MPP, with photos of the Aadhaar, passbook and member. Drafts are kept on the phone when there is no network.",
  },
  {
    title: "Check and approve online",
    text: "The Area Manager, CS & Legal and Finance each see their own queue, with the documents beside the form. Send back with a reason, or approve in a click.",
  },
  {
    title: "Print and register",
    text: "The approved member gets a member code automatically. Print signed forms one at a time or hundreds at once, and export the register for your ERP.",
  },
];

export const AVAILABLE = [
  "Membership application, filled on the phone with the member's photo and signature",
  "KYC documents: Aadhaar, passbook and photographs, stored encrypted",
  "Bank details checked by IFSC against every branch in India",
  "Household members, nominee declaration and milk production details",
  "Approval by stage, with the reviewer, time and reason kept for audit",
  "Signed membership form as a PDF, printed singly or in bulk",
  "Member codes, the member register and Excel exports",
  "Your network: plants, MCCs, BMCs, routes, MPPs and LGD villages",
];

export const ROADMAP = [
  "Share certificates and the share register",
  "Share transfer, nomination change and member exit",
  "AGM notices and attendance",
  "Patronage bonus and dividend lists",
  "Hindi portal for the head office team",
];

export const FEATURES = [
  {
    title: "Everything about one member, on one page",
    text: "Reviewers check the form step by step with a checklist, with the Aadhaar and passbook photos alongside.",
    points: [
      "Approve or send back with a reason the facilitator sees on the phone",
      "Every change and every approval in the audit log",
      "Keyboard shortcuts for teams that review hundreds a day",
    ],
    image: "/images/sadasyasetu/form.webp",
    alt: "A member's form with the review checklist",
  },
  {
    title: "Your approval stages, your way",
    text: "Area Manager, CS & Legal, Finance, or your own stages. Rename, reorder or add them without any code.",
    points: ["Choose which roles act at each stage", "Choose whose signature prints on the form", "Late forms are flagged before they become a problem"],
    image: "/images/sadasyasetu/stages.webp",
    alt: "Approval stages editor",
  },
  {
    title: "Every bank branch in India, on day one",
    text: "About 1.8 lakh branches from RBI's list. Type the IFSC and the bank and branch fill in, so payments do not bounce.",
    points: ["All-India villages from the government's LGD directory", "Pick only the states and districts you work in"],
    image: "/images/sadasyasetu/banks.webp",
    alt: "Bank branches found by IFSC",
  },
  {
    title: "Know where every form is, every day",
    text: "The home page shows what is waiting, what is late and who has it, with performance by facilitator, MCC, BMC, route or MPP.",
    points: ["A setup checklist that ticks itself off as you go", "Browser notifications when a form reaches you", "Your logo and one of eight colour themes"],
    image: "/images/sadasyasetu/numbers.webp",
    alt: "Dashboard with forms by stage and recent forms",
  },
];

export const TRUST = [
  { title: "Encrypted documents", text: "Aadhaar, passbook and photos are encrypted when stored. Lists show only the last four digits." },
  { title: "Full audit trail", text: "Who saw, changed or approved each form, and when, kept for your auditors and the board." },
  { title: "Each team sees its own", text: "Roles decide what each person can see and do. Admins sign in with a second step." },
  { title: "Your data stays separate", text: "Every organization's data is kept apart at the database level, not just in the screens." },
  { title: "Nightly backups", text: "The database and documents are backed up every night, with a copy on a second machine." },
  { title: "Your data is yours", text: "Export your members and forms whenever you like. If you leave, you take everything with you." },
];

export const PLANS = [
  {
    name: "Shuruaat",
    hindi: "शुरुआत",
    members: "Up to 5,000 members",
    price: "₹48,000",
    monthly: "about ₹4,000 a month",
    points: ["Mobile app for facilitators", "Approval portal", "Printed forms and register", "50 GB of documents"],
  },
  {
    name: "Vikas",
    hindi: "विकास",
    members: "Up to 25,000 members",
    price: "₹1,20,000",
    monthly: "about ₹10,000 a month",
    points: ["Everything in Shuruaat", "Your own approval stages", "Bulk printing and exports", "100 GB of documents"],
    best: true,
  },
  {
    name: "Vistar",
    hindi: "विस्तार",
    members: "Up to 75,000 members",
    price: "₹2,40,000",
    monthly: "about ₹20,000 a month",
    points: ["Everything in Vikas", "Priority support", "Imports from your ERP's files", "200 GB of documents"],
  },
  {
    name: "Large MPOs",
    hindi: "",
    members: "More than 75,000 members",
    price: "Let's talk",
    monthly: "a plan built around you",
    points: ["Everything in Vistar", "Custom modules", "Dedicated onboarding", "Storage as you need"],
  },
];

export const PRICING_NOTES = [
  { title: "One-time setup: ₹25,000 to ₹50,000", text: "Your network loaded from your ERP files, branding, approval stages, staff training and go-live support." },
  { title: "Pay yearly, get 2 months free", text: "Or pay quarterly. SMS and WhatsApp are billed as used, at cost." },
  { title: "Growing fast?", text: "Prefer to pay as you grow? Ask for ₹12 per approved member, with a ₹30,000 yearly minimum." },
];

export const FAQS = [
  { question: "Does the app work where there is no network?", answer: "Facilitators can keep filling the form at the MPP: the draft stays on the phone and is sent once the phone finds a network." },
  { question: "Can we keep our own approval process?", answer: "Yes. You decide the stages, who acts at each, and whose signature prints on the form. You can change them later too." },
  { question: "We already have an ERP for milk collection. Does this replace it?", answer: "No. SadasyaSetu handles members and their paperwork. Your network comes in from your ERP's files, and approved members go back out as an export." },
  { question: "How long does it take to start?", answer: "Usually one to two weeks: we load your network, set up stages and branding, and train your team." },
  { question: "Where is our data kept, and can we get it back?", answer: "On servers in India, separate from every other organization's data, backed up nightly. You can export it at any time." },
  { question: "Is it available in Hindi?", answer: "The membership form and the printed form are bilingual. A Hindi head office portal is on the roadmap." },
];
