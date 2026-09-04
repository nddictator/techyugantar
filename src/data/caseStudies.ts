// ─────────────────────────────────────────────────────────────────────────────
// CENTRALIZED CASE STUDIES DATA
// Edit this file to update all case study pages.
// ─────────────────────────────────────────────────────────────────────────────

export type CaseStudy = {
  slug: string;
  projectId: number;
  title: string;
  client: string;
  industry: string;
  duration: string;
  teamSize: string;
  liveUrl: string;
  image: string;
  tags: string[];
  summary: string;

  // The narrative
  challenge: string;
  solution: string;
  outcome: string;

  // Metrics to highlight
  metrics: { label: string; value: string; icon: string }[];

  // Tech breakdown
  techStack: { layer: string; tech: string }[];

  // Quote from client
  testimonial?: { quote: string; name: string; role: string };

  // What we built — feature list
  features: string[];
};

const caseStudiesData: CaseStudy[] = [
  {
    slug: "loexa-africa",
    projectId: 1,
    title: "Building Africa's Workforce Capability Platform",
    client: "LOEXA Africa",
    industry: "EdTech / Workforce Development",
    duration: "4 months",
    teamSize: "3 engineers + 1 designer",
    liveUrl: "https://loexaafrica.com",
    image: "/images/projects/loexa.webp",
    tags: ["Next.js", "AI", "Education", "Python"],
    summary:
      "LOEXA needed a digital platform to connect Africa's youth with skills training, industry mentors, and job opportunities — powered by AI matching. We built it from scratch in 4 months.",
    challenge:
      "Africa has over 600 million young people under 25, but skills training programs are fragmented, hard to discover, and have no standardized credentialing. LOEXA wanted to unify this ecosystem — learners, training providers, and employers — on one platform with intelligent matching. The challenge: build something robust enough for enterprise but accessible enough for users on slow mobile connections across 10+ African countries.",
    solution:
      "We built a multi-sided platform: a learner-facing PWA optimized for low-bandwidth environments, a training provider dashboard to upload and manage courses, and an employer portal with AI-powered candidate shortlisting. The AI layer uses a fine-tuned matching model that ranks candidates by skills, location, and job relevance. All content is offline-cacheable for areas with unreliable internet.",
    outcome:
      "The platform launched across 4 countries in the first phase. Within 6 weeks of launch, 3,200 learners had registered and 47 training organizations had onboarded their course catalogs. The AI matching system reduced employer screening time from 8 hours to under 30 minutes.",
    metrics: [
      { label: "Learners registered", value: "3,200+", icon: "🎓" },
      { label: "Training orgs onboarded", value: "47", icon: "🏫" },
      { label: "Screening time reduced", value: "93%", icon: "⚡" },
      { label: "Countries launched", value: "4", icon: "🌍" },
    ],
    techStack: [
      { layer: "Frontend", tech: "Next.js 14 (App Router) + TypeScript + Tailwind CSS" },
      { layer: "Backend", tech: "Django REST Framework + Celery for async job processing" },
      { layer: "AI / ML", tech: "Python (scikit-learn) + OpenAI Embeddings for matching" },
      { layer: "Database", tech: "PostgreSQL + Redis for caching and task queues" },
      { layer: "DevOps", tech: "AWS EC2 + S3 + CloudFront CDN + GitHub Actions CI/CD" },
    ],
    testimonial: {
      quote:
        "Tech Yugantar didn't just build what we asked — they challenged our assumptions, suggested better approaches, and delivered a product that genuinely works for our users. The AI matching alone is worth the entire project cost.",
      name: "LOEXA Africa Team",
      role: "Workforce Platform",
    },
    features: [
      "AI-powered skills matching between learners and job opportunities",
      "Offline-first PWA with service worker caching",
      "Multi-role platform: learner, trainer, employer, admin",
      "Course catalog management with video upload and progress tracking",
      "Credential verification and digital certificates",
      "Multilingual support (English, French, Swahili)",
    ],
  },
  {
    slug: "jyotify",
    projectId: 2,
    title: "India's Modern Vedic Astrology Platform",
    client: "Jyotify",
    industry: "Spiritual Tech / Consumer App",
    duration: "3 months",
    teamSize: "2 engineers + 1 designer",
    liveUrl: "https://jyotify.in",
    image: "/images/projects/jyotify.webp",
    tags: ["React", "Node.js", "Astrology", "Consumer"],
    summary:
      "Jyotify wanted to bring authentic Vedic astrology to modern India — not chatbot fluff, but real expert consultations, Kundli generation, and daily guidance. We built the full platform.",
    challenge:
      "The astrology app market in India is crowded with low-quality AI chatbots posing as astrologers. Jyotify wanted to differentiate by connecting users with vetted human experts while also offering automated Kundli analysis. The technical challenge was real-time expert availability, a booking and payment system, and Kundli chart generation that matched traditional software accuracy.",
    solution:
      "We built a consumer-facing React app with expert discovery, real-time availability indicators, and a booking flow integrated with Razorpay. The Kundli engine was built in Python — parsing birth date, time, and location to generate accurate planetary positions using Swiss Ephemeris data. Experts get a dedicated dashboard to manage their schedule, view client charts, and conduct video sessions.",
    outcome:
      "Launched with 35 vetted astrologers. Within the first month, the platform processed 800+ consultation bookings. The Kundli feature became the most-used page, generating 15,000+ charts in the first 60 days.",
    metrics: [
      { label: "Consultations booked", value: "800+", icon: "📅" },
      { label: "Kundli charts generated", value: "15,000+", icon: "⭐" },
      { label: "Expert astrologers", value: "35", icon: "🔮" },
      { label: "App rating (Play Store)", value: "4.7★", icon: "📱" },
    ],
    techStack: [
      { layer: "Frontend", tech: "React + TypeScript + Tailwind CSS" },
      { layer: "Backend", tech: "Node.js + Express + REST API" },
      { layer: "Kundli Engine", tech: "Python + Swiss Ephemeris (astral calculations)" },
      { layer: "Payments", tech: "Razorpay integration with webhook handling" },
      { layer: "Database", tech: "MongoDB + Redis for session management" },
      { layer: "DevOps", tech: "Vercel (frontend) + AWS (backend) + Docker" },
    ],
    testimonial: {
      quote:
        "The Kundli accuracy was our biggest concern — we had traditional astrologers test it against their own calculations. Tech Yugantar's engine matched on every test case. That's not easy to achieve.",
      name: "Jyotify Founders",
      role: "Vedic Astrology Platform",
    },
    features: [
      "Expert astrologer discovery with filtering by specialization",
      "Real-time availability and appointment booking",
      "Razorpay payment integration with auto-refund on cancellation",
      "Kundli chart generation with planetary positions and dashas",
      "Daily horoscope engine personalized by birth chart",
      "Video consultation via WebRTC",
    ],
  },
  {
    slug: "maa-sulakhi",
    projectId: 3,
    title: "Digital Storefront for an Ayurvedic Brand",
    client: "Maa Sulakhi Ausadhalaya",
    industry: "Healthcare / E-commerce",
    duration: "6 weeks",
    teamSize: "2 engineers",
    liveUrl: "https://maasulakhi.online",
    image: "/images/projects/maasulakhi.webp",
    tags: ["Healthcare", "E-commerce", "Ayurveda", "Next.js"],
    summary:
      "A 30-year-old Ayurvedic pharmacy needed a professional online presence to sell products nationally. We built a full e-commerce site with product catalog, order management, and WhatsApp integration.",
    challenge:
      "Maa Sulakhi had a loyal local customer base and a range of proprietary Ayurvedic products, but zero online presence. The owner wanted to start selling nationally without the complexity of a full warehouse system — just a clean product catalog with WhatsApp-based order management that felt natural to his existing workflow.",
    solution:
      "We built a Next.js storefront with a product catalog, static SEO-optimized pages for each product, and a WhatsApp-first checkout flow. Instead of a full payment gateway (which added friction for their older customer base), orders are placed via a pre-filled WhatsApp message — keeping the personal touch their customers value. The admin can update products and stock from a simple CMS dashboard.",
    outcome:
      "Within 3 months of launch, the business received 200+ WhatsApp orders from outside their local area — entirely new revenue. Google Search traffic grew from near-zero to 2,400 monthly visits as the SEO-optimized product pages indexed well.",
    metrics: [
      { label: "Orders from new cities", value: "200+", icon: "📦" },
      { label: "Monthly organic visitors", value: "2,400+", icon: "🔍" },
      { label: "States reached", value: "12", icon: "🗺️" },
      { label: "Go-live time", value: "6 weeks", icon: "🚀" },
    ],
    techStack: [
      { layer: "Frontend", tech: "Next.js + Tailwind CSS (Static Site Generation)" },
      { layer: "CMS", tech: "Sanity.io for product catalog management" },
      { layer: "Order Flow", tech: "WhatsApp Business API integration" },
      { layer: "SEO", tech: "Structured data (JSON-LD), sitemap, meta optimization" },
      { layer: "DevOps", tech: "Vercel with auto-deploy from GitHub" },
    ],
    features: [
      "SEO-optimized product pages with structured data markup",
      "WhatsApp-first checkout (pre-filled order message)",
      "Product catalog with categories, descriptions, and benefits",
      "Admin CMS for product and inventory updates (no-code)",
      "Mobile-first design with fast load times (<2s)",
      "Google My Business integration for local search",
    ],
  },
  {
    slug: "itwebdream",
    projectId: 4,
    title: "Portfolio & Brand Site for a Software Studio",
    client: "ItWebDream",
    industry: "Software Agency / B2B",
    duration: "5 weeks",
    teamSize: "1 engineer + 1 designer",
    liveUrl: "https://itwebdream.com",
    image: "/images/projects/itwebdream.webp",
    tags: ["Portfolio", "Next.js", "B2B", "Branding"],
    summary:
      "ItWebDream needed a high-converting agency website that would win clients before a call. We designed and built a premium, animated site that communicates expertise from the first scroll.",
    challenge:
      "A software studio's website is their most powerful sales tool — but most agency sites are generic, templated, and fail to differentiate. ItWebDream needed a site that felt premium without being over-engineered, loaded fast, and guided visitors naturally toward a contact form.",
    solution:
      "We designed and built a custom Next.js site with Framer Motion animations, a services showcase, portfolio grid, and a contact flow. Special attention was paid to performance — every page scores 95+ on Core Web Vitals. The site is fully CMS-driven so the team can update services, projects, and blog posts without touching code.",
    outcome:
      "The new site's conversion rate (visitor → contact form submission) is 4.2% — significantly above the industry average of 1-2% for agency sites. The team reports that clients frequently comment on the site before the first call.",
    metrics: [
      { label: "Core Web Vitals score", value: "95+", icon: "⚡" },
      { label: "Contact form conversion", value: "4.2%", icon: "📈" },
      { label: "Page load time", value: "<1.5s", icon: "🚀" },
      { label: "Delivery time", value: "5 weeks", icon: "📅" },
    ],
    techStack: [
      { layer: "Frontend", tech: "Next.js 14 + TypeScript + Tailwind CSS" },
      { layer: "Animations", tech: "Framer Motion + Lenis smooth scroll" },
      { layer: "CMS", tech: "MDX for blog + Sanity for portfolio" },
      { layer: "Performance", tech: "Image optimization, lazy loading, SSG" },
      { layer: "DevOps", tech: "Vercel with edge caching" },
    ],
    features: [
      "Framer Motion page transitions and scroll animations",
      "Services showcase with interactive cards",
      "Portfolio grid with category filtering",
      "MDX blog with SEO metadata",
      "Contact form with email notification",
      "95+ Lighthouse score across all metrics",
    ],
  },
  {
    slug: "talk-acharya",
    projectId: 5,
    title: "Expert Astrology Platform with 5,100+ Clients",
    client: "Talk AcharyaJi",
    industry: "Spiritual Tech / SaaS",
    duration: "3.5 months",
    teamSize: "3 engineers + 1 designer",
    liveUrl: "https://talkacharya.com",
    image: "/images/projects/talkacharya.webp",
    tags: ["Astrology", "Next.js", "Vedic", "SaaS"],
    summary:
      "Talk AcharyaJi is a premium Vedic astrology consultation platform with 5,100+ happy clients and 99% prediction accuracy claims. We built the full-stack platform to handle high traffic and real-time expert consultations.",
    challenge:
      "Talk AcharyaJi had an existing customer base from offline consultations and needed a digital platform that matched the premium, trust-heavy nature of their service. Key challenges: real-time expert availability, handling payment edge cases (session overruns, refunds), and building gemstone recommendation logic tied to astrological charts.",
    solution:
      "We built a full SaaS platform with expert profiles, real-time availability scheduling, Razorpay subscription and one-time payment flows, and a proprietary gemstone recommendation engine driven by Kundli analysis. The platform handles peak traffic of 500 concurrent users without degradation through PostgreSQL connection pooling and Redis-based session management.",
    outcome:
      "The platform now processes 1,200+ consultation requests per month. The gemstone recommendation feature became a top revenue driver, with an average order value of ₹4,500. The platform handles 99.9% uptime even during peak astrological event dates.",
    metrics: [
      { label: "Monthly consultations", value: "1,200+", icon: "🔮" },
      { label: "Happy clients total", value: "5,100+", icon: "😊" },
      { label: "Avg. gemstone order value", value: "₹4,500", icon: "💎" },
      { label: "Platform uptime", value: "99.9%", icon: "⚡" },
    ],
    techStack: [
      { layer: "Frontend", tech: "Next.js + TypeScript + Tailwind CSS" },
      { layer: "Backend", tech: "Django REST Framework + Celery" },
      { layer: "Payments", tech: "Razorpay (subscriptions + one-time + refunds)" },
      { layer: "Kundli Engine", tech: "Python + Swiss Ephemeris" },
      { layer: "Database", tech: "PostgreSQL + Redis" },
      { layer: "DevOps", tech: "AWS EC2 + RDS + ElastiCache + CloudFront" },
    ],
    testimonial: {
      quote:
        "We were worried about moving our offline business online — but Tech Yugantar made the transition seamless. Our clients love the platform and we've tripled our revenue since launch.",
      name: "Talk AcharyaJi Team",
      role: "Vedic Astrology Platform",
    },
    features: [
      "Expert astrologer profiles with ratings and specializations",
      "Real-time availability calendar and instant booking",
      "Razorpay integration (one-time + subscription plans)",
      "AI-assisted Kundli analysis with gemstone recommendations",
      "Video consultation via WebRTC with session recording",
      "Admin dashboard: revenue analytics, expert management, refunds",
    ],
  },
];

export default caseStudiesData;
