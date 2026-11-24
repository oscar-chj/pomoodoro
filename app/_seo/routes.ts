export interface SiteRoute {
  readonly path: string;
  readonly changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  /** 0.0 to 1.0 */
  readonly priority: number;
}

/** Indexable pages. Adding a page to the sitemap is one line here. */
export const routes: ReadonlyArray<SiteRoute> = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
];
