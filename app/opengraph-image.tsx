import { homeCard, homeCardAlt } from "./_seo/cards/homeCard";
import { renderCard } from "./_seo/cards/renderCard";

export const alt = homeCardAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Open Graph card for the home page (WhatsApp, Discord, Slack, iMessage, LinkedIn). */
export default function Image() {
  return renderCard(homeCard);
}
