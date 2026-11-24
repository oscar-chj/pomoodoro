/** Why a crawler visits: search index, live fetch for a user's question, or model training. */
export type CrawlerPurpose = "search" | "user-fetch" | "training";

export interface Crawler {
  /** The exact `User-agent` token used in robots.txt. */
  readonly userAgent: string;
  readonly operator: string;
  readonly purpose: CrawlerPurpose;
}

/**
 * Crawlers explicitly allowed in robots.txt. The owner wants maximum AI visibility,
 * so training crawlers are allowed too. To block one, remove its line.
 */
export const crawlers: ReadonlyArray<Crawler> = [
  // OpenAI
  { userAgent: "GPTBot", operator: "OpenAI", purpose: "training" },
  { userAgent: "OAI-SearchBot", operator: "OpenAI", purpose: "search" },
  { userAgent: "ChatGPT-User", operator: "OpenAI", purpose: "user-fetch" },
  // Anthropic
  { userAgent: "ClaudeBot", operator: "Anthropic", purpose: "training" },
  { userAgent: "Claude-SearchBot", operator: "Anthropic", purpose: "search" },
  { userAgent: "Claude-User", operator: "Anthropic", purpose: "user-fetch" },
  // Perplexity
  { userAgent: "PerplexityBot", operator: "Perplexity", purpose: "search" },
  { userAgent: "Perplexity-User", operator: "Perplexity", purpose: "user-fetch" },
  // Google
  { userAgent: "Googlebot", operator: "Google", purpose: "search" },
  { userAgent: "Google-Extended", operator: "Google", purpose: "training" },
  // Microsoft
  { userAgent: "Bingbot", operator: "Microsoft", purpose: "search" },
  // Apple
  { userAgent: "Applebot", operator: "Apple", purpose: "search" },
  { userAgent: "Applebot-Extended", operator: "Apple", purpose: "training" },
  // Others
  { userAgent: "DuckDuckBot", operator: "DuckDuckGo", purpose: "search" },
  { userAgent: "Meta-ExternalAgent", operator: "Meta", purpose: "training" },
  { userAgent: "Amazonbot", operator: "Amazon", purpose: "search" },
  { userAgent: "MistralAI-User", operator: "Mistral", purpose: "user-fetch" },
  { userAgent: "cohere-ai", operator: "Cohere", purpose: "training" },
  { userAgent: "CCBot", operator: "Common Crawl", purpose: "training" },
];
