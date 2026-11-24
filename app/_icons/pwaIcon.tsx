import { ImageResponse } from "next/og";
import { siteConfig } from "../_seo/site";

/**
 * Shared artwork for the manifest icons: accent disc with a play triangle on a
 * full-bleed background (same design as app/apple-icon.tsx, scaled).
 * `discRatio` is the disc diameter as a fraction of the square. Maskable icons
 * keep it inside the 80% safe zone (disc radius 0.35 of the side < 0.4).
 */
export function pwaIcon(px: number, discRatio: number) {
  const { accent, foreground, background } = siteConfig.brand;
  const disc = Math.round(px * discRatio);
  const triH = Math.round(disc * (64 / 124));
  const triW = Math.round(disc * (56 / 124));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background,
        }}
      >
        <div
          style={{
            width: disc,
            height: disc,
            borderRadius: disc / 2,
            background: accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width={triW}
            height={triH}
            viewBox="0 0 14 16"
            style={{ marginLeft: Math.round(disc * (8 / 124)) }}
          >
            <path d="M1 1 L13 8 L1 15 Z" fill={foreground} />
          </svg>
        </div>
      </div>
    ),
    { width: px, height: px },
  );
}

/** Disc ratio used by apple-icon.tsx (124/180). */
export const ANY_RATIO = 124 / 180;
/** Disc ratio for maskable icons: radius 0.35 of the side, inside the 0.4 safe zone. */
export const MASKABLE_RATIO = 0.7;
