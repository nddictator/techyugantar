import { HiCheckBadge, HiCpuChip, HiLifebuoy, HiMagnifyingGlass, HiRocketLaunch } from "react-icons/hi2";

export type ProcessStep = {
  id: number;
  icon: React.ReactNode;
  title: string;
  paragraph: string;
};

const processData: ProcessStep[] = [
  {
    id: 1,
    icon: <HiMagnifyingGlass size={28} className="fill-current" />,
    title: "Discovery & Scoping",
    paragraph:
      "We start by understanding your business, not just your feature list — mapping workflows, constraints, and what success actually looks like before a line of code is written.",
  },
  {
    id: 2,
    icon: <HiCpuChip size={28} className="fill-current" />,
    title: "Architecture & Design",
    paragraph:
      "Every project gets a real architecture pass: data models, API contracts, and system boundaries decided upfront, not improvised mid-build.",
  },
  {
    id: 3,
    icon: <HiRocketLaunch size={28} className="fill-current" />,
    title: "Build in Sprints",
    paragraph:
      "Work ships in short, reviewable increments so you see real progress and can redirect early, instead of waiting months for a single reveal.",
  },
  {
    id: 4,
    icon: <HiCheckBadge size={28} className="fill-current" />,
    title: "QA & Testing",
    paragraph:
      "Code is reviewed and tested before it reaches you — catching issues at the source instead of leaving your users to find them.",
  },
  {
    id: 5,
    icon: <HiLifebuoy size={28} className="fill-current" />,
    title: "Handoff & Support",
    paragraph:
      "We hand over documented, maintainable code and stay reachable for support as your product evolves after launch.",
  },
];

export default processData;
