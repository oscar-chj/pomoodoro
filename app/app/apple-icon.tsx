import { ImageResponse } from "next/og";
import { siteConfig } from "./_seo/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Generated 180x180 touch icon. Full-bleed background because iOS applies its own corner mask. */
export default function AppleIcon() {
  const { accent, foreground, background } = siteConfig.brand;
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
            width: 124,
            height: 124,
            borderRadius: 62,
            background: accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="56" height="64" viewBox="0 0 14 16" style={{ marginLeft: 8 }}><path d="M1 1 L13 8 L1 15 Z" fill={foreground} /></svg></div>
      </div>
    ),
    size,
  );
}
