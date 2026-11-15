import { EXAMS, SECTIONS } from "@/lib/exams";
import { buildLlmsTxt } from "@/lib/llms.mjs";
import { PORTFOLIO_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** /llms.txt (llmstxt.org): a short markdown map of the site for LLM crawlers, built from the same data as the pages. */
export function GET() {
  const md = buildLlmsTxt({ siteUrl: SITE_URL, siteName: SITE_NAME, description: SITE_DESCRIPTION, portfolioUrl: PORTFOLIO_URL, exams: EXAMS, sections: SECTIONS });
  return new Response(md, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
