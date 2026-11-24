/**
 * Single source of truth for everything SEO / social / AI-discovery related.
 * Every metadata, JSON-LD, sitemap, robots, llms.txt and image-card module
 * reads from here. Change copy or the domain in one place only.
 */

/** Trim, add https:// to a bare host, strip trailing slashes. Returns undefined if unusable. */
function normalizeSiteUrl(raw: string | undefined): string | undefined {
  const value = raw?.trim();
  if (!value) return undefined;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const { protocol, host } = new URL(withProtocol);
    if (!host || (protocol !== "http:" && protocol !== "https:")) return undefined;
    return withProtocol.replace(/\/+$/, "");
  } catch {
    return undefined;
  }
}

/**
 * Site origin: NEXT_PUBLIC_SITE_URL, else Vercel's VERCEL_PROJECT_PRODUCTION_URL
 * (host without protocol, server/build only), else localhost.
 * Only imported by server modules, so the VERCEL_* variable is readable here.
 * In a client bundle it would be undefined and the chain would fall through.
 */
function resolveSiteUrl(): string {
  return (
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    "http://localhost:3000"
  );
}

export const siteConfig = {
  name: "Pomoodoro",
  tagline: "A soft, distraction-free focus timer.",
  description:
    "Pomoodoro is a free, ad-free, no-signup Pomodoro focus timer. Adjustable session lengths, keyboard shortcuts, and your settings stay in your browser.",
  /** Set NEXT_PUBLIC_SITE_URL in the deploy environment once the domain is bought. */
  url: resolveSiteUrl(),
  locale: "en_US",
  themeColor: "#fdf0f0",
  keywords: [
    "pomodoro timer",
    "focus timer",
    "pomodoro timer for ADHD",
    "free pomodoro timer no ads",
    "pomodoro timer no signup",
    "study timer",
    "custom pomodoro timer",
  ],
  /** Brand colours reused by generated social cards and icons. */
  brand: {
    background: "#fdf0f0",
    foreground: "#4a4048",
    accent: "#e8a0a8",
  },
} as const;

/** Build an absolute URL from a path. */
export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
