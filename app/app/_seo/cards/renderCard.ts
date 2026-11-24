import { createElement } from "react";
import { ImageResponse } from "next/og";
import { loadCardFonts } from "./fonts";
import { ShareCard, type ShareCardProps } from "./ShareCard";

/** Standard 1.91:1 Open Graph / Twitter large card size. */
export const cardSize = { width: 1200, height: 630 } as const;

/** Output format of every generated card. */
export const cardContentType = "image/png";

/**
 * Render a share card as an ImageResponse. A page's opengraph-image.tsx is:
 *
 *   export const alt = "...";
 *   export const size = { width: 1200, height: 630 };
 *   export const contentType = "image/png";
 *   export default () => renderCard({ title, subtitle });
 *
 * Next reads `size` and `contentType` statically, so they must be literals in the route file.
 */
export async function renderCard(props: ShareCardProps): Promise<ImageResponse> {
  const fonts = await loadCardFonts();
  return new ImageResponse(createElement(ShareCard, props), {
    ...cardSize,
    ...(fonts.length > 0 ? { fonts } : {}),
  });
}
