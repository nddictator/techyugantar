// ─────────────────────────────────────────────────────────────────────────────
// CENTRALIZED TESTIMONIALS DATA
// Edit this file to update all testimonials across the site.
// ─────────────────────────────────────────────────────────────────────────────

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  city: string;
  avatar: string; // initials fallback
  avatarBg: string; // tailwind bg color class
  quote: string;
  rating: number;
  project: string; // type of project
};

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Agarwal",
    role: "Founder & CEO",
    company: "MedConnect India",
    city: "Lucknow, UP",
    avatar: "RA",
    avatarBg: "bg-blue-500",
    quote:
      "Tech Yugantar built our entire telemedicine platform from scratch — doctor booking, video consultation, and prescription management. Delivered in 3 months, bug-free. Our patient count crossed 10,000 within the first quarter of launch.",
    rating: 5,
    project: "Healthcare Web App",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Co-Founder",
    company: "EduNest Learning",
    city: "Kanpur, UP",
    avatar: "PS",
    avatarBg: "bg-pink-500",
    quote:
      "We needed a school ERP that worked in rural India with poor connectivity. Tech Yugantar built an offline-first PWA that teachers could use on basic Android phones. The attention to real-world constraints was extraordinary.",
    rating: 5,
    project: "School ERP System",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Director",
    company: "Verma Traders Pvt. Ltd.",
    city: "Varanasi, UP",
    avatar: "AV",
    avatarBg: "bg-orange-500",
    quote:
      "Our textile business ran on Excel for 20 years. Tech Yugantar replaced it with a custom inventory and billing system in 6 weeks. Our accounts team now closes monthly books in 2 hours instead of 3 days.",
    rating: 5,
    project: "ERP & Inventory System",
  },
  {
    id: 4,
    name: "Neha Gupta",
    role: "Marketing Head",
    company: "GreenCart Organics",
    city: "Delhi, NCR",
    avatar: "NG",
    avatarBg: "bg-green-500",
    quote:
      "Our e-commerce site needed to handle 5,000 orders a day during Diwali. Tech Yugantar re-architected our backend and we handled 12,000 orders on peak day with zero downtime. They knew exactly what they were doing.",
    rating: 5,
    project: "E-commerce Platform",
  },
  {
    id: 5,
    name: "Suresh Mehta",
    role: "CTO",
    company: "PayEase FinTech",
    city: "Pune, Maharashtra",
    avatar: "SM",
    avatarBg: "bg-violet-500",
    quote:
      "Building a payment gateway requires extreme attention to security. Tech Yugantar delivered PCI-DSS compliant APIs with full audit logs and rate limiting. Code quality was senior-level, documentation was pristine.",
    rating: 5,
    project: "FinTech Backend API",
  },
  {
    id: 6,
    name: "Ananya Patel",
    role: "Founder",
    company: "SalonSpark",
    city: "Ahmedabad, Gujarat",
    avatar: "AP",
    avatarBg: "bg-rose-500",
    quote:
      "They built our Flutter app for iOS and Android in 8 weeks. Appointment booking, stylist management, loyalty points — everything in one app. Our salon bookings increased 40% in the first month post-launch.",
    rating: 5,
    project: "Flutter Mobile App",
  },
  {
    id: 7,
    name: "Kiran Reddy",
    role: "CEO",
    company: "PropZone Realty",
    city: "Hyderabad, Telangana",
    avatar: "KR",
    avatarBg: "bg-amber-500",
    quote:
      "Our real estate platform needed AI-powered property recommendations. Tech Yugantar integrated an LLM pipeline that analyses user preference and surfaces relevant listings. Client engagement time doubled.",
    rating: 5,
    project: "AI-Powered Real Estate Platform",
  },
  {
    id: 8,
    name: "Vivek Nair",
    role: "Operations Manager",
    company: "SpiceRoute Restaurants",
    city: "Bengaluru, Karnataka",
    avatar: "VN",
    avatarBg: "bg-teal-500",
    quote:
      "We have 12 restaurant branches. Tech Yugantar built us a centralized order and kitchen management system. Now every order from Zomato, Swiggy, and our own website flows into one dashboard. Reduced order errors by 80%.",
    rating: 5,
    project: "Restaurant Management System",
  },
  {
    id: 9,
    name: "Deepika Singh",
    role: "Founder",
    company: "LegalEase India",
    city: "Mumbai, Maharashtra",
    avatar: "DS",
    avatarBg: "bg-indigo-500",
    quote:
      "We needed a document management and client portal for our law firm. Tech Yugantar built it with role-based access, e-signature, and secure file storage. They understood compliance requirements without us having to explain twice.",
    rating: 5,
    project: "Legal Tech SaaS",
  },
  {
    id: 10,
    name: "Mohit Joshi",
    role: "Product Lead",
    company: "TechBridge Solutions",
    city: "Jaipur, Rajasthan",
    avatar: "MJ",
    avatarBg: "bg-cyan-500",
    quote:
      "We hired Tech Yugantar as our dedicated backend team for 6 months. Communication was crystal clear — daily standups on WhatsApp, weekly demos, Notion board always updated. It felt like having an in-house team without the overhead.",
    rating: 5,
    project: "Dedicated Dev Team",
  },
];

export default testimonialsData;
