import { siteConfig } from "../site";

/** Props for {@link ShareCard}. */
export type ShareCardProps = {
  /** Large headline. */
  title: string;
  /** Supporting sentence under the headline. */
  subtitle: string;
  /** Small label above the headline, omit for none. */
  eyebrow?: string;
  /** Timer-style numeral shown as the hero, e.g. "25:00". Omit to hide. */
  numeral?: string;
  /** Short proof points rendered as pills. */
  badges?: readonly string[];
};

const { background, foreground, accent } = siteConfig.brand;

/** Fake semibold: the bundled font is Regular only, so thicken glyphs with a stroke. */
const heavy = (px: number) => ({ WebkitTextStroke: `${px}px ${foreground}` });

/**
 * Presentational 1200x630 social card. Uses only the CSS subset satori supports
 * (flexbox, no grid). Foreground on background is ~8.8:1, above WCAG AA.
 */
export function ShareCard({ title, subtitle, eyebrow, numeral, badges = [] }: ShareCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background,
        color: foreground,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {numeral ? (
          <div
            style={{
              display: "flex",
              fontSize: 190,
              lineHeight: 1,
              letterSpacing: -6,
              marginBottom: 20,
              ...heavy(5),
            }}
          >
            {numeral}
          </div>
        ) : null}
        {eyebrow ? (
          <div style={{ display: "flex", fontSize: 28, marginBottom: 8, ...heavy(0.4) }}>{eyebrow}</div>
        ) : null}
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: numeral ? 60 : 84, lineHeight: 1.1, ...heavy(1.2) }}>
          <div style={{ width: 30, height: 30, borderRadius: 15, background: accent, display: "flex" }} />
          {title}
        </div>
        <div style={{ fontSize: 32, lineHeight: 1.3, marginTop: 14, maxWidth: 900, wordSpacing: 0 }}>
          {subtitle}
        </div>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {badges.map((badge) => (
          <div
            key={badge}
            style={{
              display: "flex",
              padding: "10px 26px",
              borderRadius: 999,
              background: accent,
              fontSize: 30,
              ...heavy(0.5),
            }}
          >
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
}
