import { ImageResponse } from "next/og";
import { siteConfig } from "./_seo/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Generated 32x32 favicon: accent disc with a play triangle. */
export default function Icon() {
  const { accent, foreground } = siteConfig.brand;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: accent,
        }}
      >
        <svg width="14" height="16" viewBox="0 0 14 16" style={{ marginLeft: 2 }}><path d="M1 1 L13 8 L1 15 Z" fill={foreground} /></svg></div>
    ),
    size,
  );
}
