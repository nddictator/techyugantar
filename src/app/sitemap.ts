import { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/blog";
import caseStudiesData from "@/data/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://techyugantar.in";

    const blogUrls: MetadataRoute.Sitemap = getAllBlogs().map((post) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    const caseStudyUrls: MetadataRoute.Sitemap = caseStudiesData.map((cs) => ({
        url: `${base}/case-study/${cs.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [
        { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
        { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${base}/how-we-work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
        { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
        { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
        ...caseStudyUrls,
        ...blogUrls,
    ];
}
