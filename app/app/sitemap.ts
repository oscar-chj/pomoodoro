import type { MetadataRoute } from "next";
import { routes } from "./_seo/routes";
import { absoluteUrl } from "./_seo/site";

/** sitemap.xml generated from the route list in _seo/routes.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: absoluteUrl(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
