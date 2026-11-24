import { buildLlmsFullTxt } from "../_seo/llms";

/** GET /llms-full.txt. Prerendered at build time (no request-time APIs). */
export function GET(): Response {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
