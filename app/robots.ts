import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.devday26.com";
const isProduction =
  process.env.VERCEL_ENV === "production" || siteUrl === "https://www.devday26.com";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}