export type Project = {
  id: number;
  title: string;
  paragraph: string;
  image: string;
  liveUrl: string;
  tags: string[];
  caseStudySlug?: string; // optional — links to /case-study/[slug]
};
