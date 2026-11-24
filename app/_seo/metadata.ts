import type { Metadata } from "next";
import { siteConfig } from "./site";

/** Title used when a page sets none (the home page). */
export const defaultTitle = `${siteConfig.name}: free focus timer, no signup`;

export interface PageMetadataInput {
  /** Page title. Rendered through the root "%s | Pomoodoro" template. */
  title?: string;
  description?: string;
  /** Path of the page, e.g. "/" or "/about". Used for canonical and og:url. */
  path?: string;
  keywords?: readonly string[];
  /** Set true to keep the page out of search results. */
  noindex?: boolean;
}

/**
 * Build per-page metadata with canonical, Open Graph, Twitter and robots.
 * Image URLs are left to the opengraph-image / twitter-image file conventions.
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  keywords = siteConfig.keywords,
  noindex = false,
}: PageMetadataInput = {}): Metadata {
  const ogTitle = title ? `${title} | ${siteConfig.name}` : defaultTitle;
  return {
    ...(title ? { title } : {}),
    description,
    keywords: [...keywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title: ogTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  };
}
