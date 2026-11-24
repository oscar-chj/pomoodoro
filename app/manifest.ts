import type { MetadataRoute } from "next";
import { siteConfig } from "./_seo/site";

/** Web app manifest. Icons: app/icon.tsx (32x32), app/apple-icon.tsx (180x180), app/icons/* route handlers (192, 512, maskable 512). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    categories: ["productivity"],
    lang: "en",
    background_color: siteConfig.brand.background,
    theme_color: siteConfig.themeColor,
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
