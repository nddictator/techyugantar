export type ProjectScreens = {
  /** Wide shot — a web screenshot, or a store banner for app-only products. */
  web: string;
  /** Phone screenshot (portrait), shown in a device frame over the wide shot. */
  mobile: string;
  /** Label for the browser address bar when there is no public URL. */
  webLabel?: string;
  /** "browser" wraps the wide shot in browser chrome; "plain" shows it as a card (store banners). */
  webFrame?: "browser" | "plain";
  /** CSS aspect ratios of the source images, e.g. "1919/1001". */
  webAspect?: string;
  mobileAspect?: string;
  /** Optional second phone (a companion app) shown behind the main one. */
  mobileBack?: string;
  mobileBackAspect?: string;
};

/** One app in a multi-app product, for the case study's "apps" section. */
export type ProductApp = {
  name: string;
  /** Who uses it, e.g. "For customers". */
  audience: string;
  description: string;
  highlights: string[];
  screens: { src: string; alt: string; aspect?: string }[];
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
