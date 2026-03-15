import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.devday26.com";

const staticRoutes = [
  "",
  "/modules",
  "/contact-us",
  "/our-team",
  "/event-details",
  "/register",
];

const moduleIds = [
  "coding",
  "software-eng",
  "tech-quest",
  "dev-design",
  "ai-data",
  "general",
  "electrical-eng",
  "business",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const moduleEntries: MetadataRoute.Sitemap = moduleIds.map((id) => ({
    url: `${siteUrl}/modules/${id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticEntries, ...moduleEntries];
}