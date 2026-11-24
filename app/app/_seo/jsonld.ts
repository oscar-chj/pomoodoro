import { faqs, type FaqItem } from "./faq";
import { absoluteUrl, siteConfig } from "./site";

/** A JSON-LD node. Values are plain JSON so it can always be serialised. */
export interface JsonLdNode {
  readonly "@context": "https://schema.org";
  readonly "@type": string;
  readonly [key: string]: unknown;
}

/** Features listed in the WebApplication schema. Only things the app does today. */
export const featureList: readonly string[] = [
  "Pomodoro focus timer with focus, short break and long break stages",
  "Adjustable session lengths from 1 to 180 minutes",
  "Long break after every fourth focus session",
  "Optional sound cues, which can be turned off",
  "Keyboard shortcuts, which can be turned off",
  "No account or signup required",
  "Settings stored locally in your browser",
];

/** schema.org WebSite node. */
export function buildWebSite(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: "en",
  };
}

/** schema.org WebApplication node, free to use. */
export function buildWebApplication(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": absoluteUrl("/#app"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern web browser with JavaScript enabled",
    inLanguage: "en",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [...featureList],
  };
}

/** schema.org FAQPage node. Defaults to the shared FAQ so it matches the visible page. */
export function buildFaqPage(items: readonly FaqItem[] = faqs): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
