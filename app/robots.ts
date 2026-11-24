import type { MetadataRoute } from "next";
import { crawlers } from "./_seo/crawlers";
import { absoluteUrl, siteConfig } from "./_seo/site";

/** robots.txt: every listed crawler (search, user-fetch and training) is explicitly allowed. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...crawlers.map((c) => ({ userAgent: c.userAgent, allow: "/" })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
