import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/exercises/", // Explicitly allow exercises directory
      ],

      disallow: [
        "/api/", // Prevent crawling of API routes
        "/admin/", // Prevent crawling of admin pages if you have any
        "/_next/", // Prevent crawling of Next.js system files
        "/private/", // Prevent crawling of private pages if you have any
      ],
    },
    sitemap: "https://gymbrah.com/sitemap.xml",
  };
}
