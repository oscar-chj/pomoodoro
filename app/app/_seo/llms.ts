import { features, howToSteps, keyFacts, whatIs } from "./content";
import { faqs } from "./faq";
import { absoluteUrl, siteConfig } from "./site";

/** Format a markdown link list entry. */
function link(title: string, path: string, note: string): string {
  return `- [${title}](${absoluteUrl(path)}): ${note}`;
}

function header(): string[] {
  return [`# ${siteConfig.name}`, "", `> ${siteConfig.description}`, "", whatIs, ""];
}

function factsAndFeatures(): string[] {
  return [
    "## Key facts",
    "",
    ...keyFacts.map((f) => `- ${f}`),
    "",
    "## Features",
    "",
    ...features.map((f) => `- ${f.title}: ${f.description}`),
    "",
    "## How to use",
    "",
    ...howToSteps.map((s, i) => `${i + 1}. ${s}`),
    "",
  ];
}

/**
 * Build /llms.txt (llmstxt.org format): H1, blockquote summary, then sections.
 * Kept short; the full FAQ text lives in {@link buildLlmsFullTxt}.
 */
export function buildLlmsTxt(): string {
  return [
    ...header(),
    ...factsAndFeatures(),
    "## Pages",
    "",
    link(siteConfig.name, "/", "The timer itself, with an About and FAQ section below it"),
    "",
    "## Optional",
    "",
    link("Full FAQ text", "/llms-full.txt", "All questions and answers in plain text"),
    link("Sitemap", "/sitemap.xml", "List of indexable pages"),
    "",
  ].join("\n");
}

/** Build /llms-full.txt: the llms.txt content plus every FAQ answer in full. */
export function buildLlmsFullTxt(): string {
  return [
    ...header(),
    ...factsAndFeatures(),
    "## FAQ",
    "",
    ...faqs.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
  ].join("\n");
}
