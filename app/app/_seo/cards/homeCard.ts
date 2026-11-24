import { siteConfig } from "../site";
import type { ShareCardProps } from "./ShareCard";

/** Alt text for the home page card. */
export const homeCardAlt = `${siteConfig.name}: ${siteConfig.tagline}`;

/** Content of the home page card, shared by opengraph-image and twitter-image. */
export const homeCard: ShareCardProps = {
  title: siteConfig.name,
  subtitle: siteConfig.tagline,
  numeral: "25:00",
  badges: ["Free", "No ads", "No signup"],
};
