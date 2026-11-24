import { buildLlmsTxt } from "../_seo/llms";

/** GET /llms.txt. Prerendered at build time (no request-time APIs). */
export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
