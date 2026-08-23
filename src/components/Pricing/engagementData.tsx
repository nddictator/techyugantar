export type EngagementModel = {
  id: number;
  name: string;
  bestFor: string;
  howItWorks: string;
  includes: string[];
};

const engagementData: EngagementModel[] = [
  {
    id: 1,
    name: "Fixed Price",
    bestFor:
      "Well-defined projects with a clear scope — an MVP, a specific feature set, or a defined ERP module.",
    howItWorks:
      "We scope the full requirement upfront, quote a fixed cost and timeline, and deliver against that spec.",
    includes: [
      "Detailed scoping document before work begins",
      "Fixed cost & timeline, agreed upfront",
      "Milestone-based payments",
      "Post-launch bug-fix window",
    ],
  },
  {
    id: 2,
    name: "Time & Material",
    bestFor:
      "Evolving products where requirements will change as you learn — ongoing feature development, iterative builds.",
    howItWorks:
      "A dedicated team works in sprints, billed by actual time worked, with full flexibility to reprioritize as you go.",
    includes: [
      "Sprint-based delivery",
      "Flexible, evolving scope",
      "Transparent time tracking",
      "Direct access to the dev team",
    ],
  },
  {
    id: 3,
    name: "Dedicated Team",
    bestFor:
      "Long-term partnerships — an extension of your in-house team for continuous product development.",
    howItWorks:
      "A dedicated pod of developers works exclusively on your product under your direction, billed monthly.",
    includes: [
      "Developers reserved exclusively for you",
      "Direct daily communication",
      "Scales up or down with your roadmap",
      "No recruitment or hiring overhead",
    ],
  },
];

export default engagementData;
