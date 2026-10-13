export type ProjectScreens = {
  /** Desktop / admin screenshot, shown in a browser frame. */
  web: string;
  /** Phone screenshot (portrait), shown in a device frame over the web shot. */
  mobile: string;
  /** Label for the browser address bar when there is no public URL. */
  webLabel?: string;
};

export type Project = {
  id: number;
  title: string;
  paragraph: string;
  /** Card / OG image. */
  image: string;
  /** Public URL — omit for internal tools and app-store products without a site. */
  liveUrl?: string;
  tags: string[];
  caseStudySlug?: string; // optional — links to /case-study/[slug]
  /** Surfaces the product ships on, e.g. ["Web admin", "Android", "iOS"]. */
  platforms?: string[];
  /** Multi-device showcase (web + phone) instead of a single browser shot. */
  screens?: ProjectScreens;
};
