// ─────────────────────────────────────────────────────────────────────────────
// CENTRALIZED TEAM DATA
// Edit this file to update team/founder info across the site.
// ─────────────────────────────────────────────────────────────────────────────

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatar: string; // initials fallback
  avatarBg: string;
  linkedin?: string;
  twitter?: string;
  skills: string[];
  emoji: string;
};

export type CompanyStory = {
  founded: string;
  city: string;
  mission: string;
  vision: string;
  values: { emoji: string; title: string; desc: string }[];
};

export const companyStory: CompanyStory = {
  founded: "2023",
  city: "Varanasi, Uttar Pradesh, India",
  mission:
    "To make world-class software development accessible to Indian startups and enterprises — without the agency markup, without the communication gaps, and without the excuses.",
  vision:
    "To be the most trusted software development partner for 500+ businesses across India by 2027, known for shipping reliable products on time, every time.",
  values: [
    {
      emoji: "🎯",
      title: "Delivery Over Promises",
      desc: "We set realistic timelines and hit them. Every sprint ends with a live demo — not a status update.",
    },
    {
      emoji: "🔍",
      title: "Radical Transparency",
      desc: "You see our code, our progress board, and our honest assessment of every challenge — good news and bad.",
    },
    {
      emoji: "🤝",
      title: "Client Partnership",
      desc: "We treat your product like it's our own. Your success metric is our success metric.",
    },
    {
      emoji: "⚡",
      title: "Pragmatic Engineering",
      desc: "We choose boring, proven tech that scales — not the latest hype framework that breaks in production.",
    },
    {
      emoji: "📈",
      title: "Long-Term Thinking",
      desc: "We build codebases that are maintainable 3 years from now — not just demos that impress in week one.",
    },
    {
      emoji: "🇮🇳",
      title: "India-First Mindset",
      desc: "We build for India's infrastructure — low bandwidth, diverse devices, multiple languages, UPI, and more.",
    },
  ],
};

const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Nishant Dixit",
    role: "Founder & Full-Stack Lead",
    bio: "Built his first web app at 17, shipped to production at 19. Founded Tech Yugantar to prove that tier-2 India can build tier-1 software. Leads architecture, client strategy, and Django/Next.js development.",
    avatar: "ND",
    avatarBg: "bg-primary",
    linkedin: "https://www.linkedin.com/in/tech-yugantar-6b1147431/",
    skills: ["Django", "Next.js", "PostgreSQL", "System Design"],
    emoji: "👨‍💻",
  },
  {
    id: 2,
    name: "Shreya Mishra",
    role: "UI/UX Designer & Frontend Dev",
    bio: "Obsessed with making complex software feel simple. Designs in Figma, implements in React — and bridges the gap between what's visually beautiful and technically buildable.",
    avatar: "SM",
    avatarBg: "bg-pink-500",
    skills: ["Figma", "React", "Tailwind CSS", "Motion Design"],
    emoji: "🎨",
  },
  {
    id: 3,
    name: "Arjun Pandey",
    role: "Backend Engineer",
    bio: "API performance nerd. Specializes in high-concurrency Python backends, database optimization, and building systems that don't fall over under load. If it's slow, Arjun fixes it.",
    avatar: "AP",
    avatarBg: "bg-violet-500",
    skills: ["FastAPI", "Django", "Redis", "PostgreSQL"],
    emoji: "⚙️",
  },
  {
    id: 4,
    name: "Kavya Tiwari",
    role: "Flutter Developer",
    bio: "Ships to App Store and Play Store from a single codebase — and makes it look native on both. Expert in Flutter state management, animations, and integrating complex REST APIs in mobile.",
    avatar: "KT",
    avatarBg: "bg-blue-500",
    skills: ["Flutter", "Dart", "Firebase", "REST APIs"],
    emoji: "📱",
  },
  {
    id: 5,
    name: "Ravi Kumar",
    role: "DevOps & Cloud Engineer",
    bio: "The person who makes sure everything stays up. Manages CI/CD pipelines, Docker containers, AWS deployments, and monitors production so the rest of the team can sleep at night.",
    avatar: "RK",
    avatarBg: "bg-amber-500",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    emoji: "🚀",
  },
];

export default teamData;
