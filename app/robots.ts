import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

/**
 * robots.txt.
 *
 * Baseline: everything is crawlable. Noindex pages (privacy, terms,
 * returns) are handled by their <meta name="robots"> tag, not by
 * blocking crawl. A page blocked in robots.txt can still appear as a
 * bare URL in results because the crawler is not allowed to fetch the
 * page and read the noindex tag.
 *
 * AI crawlers are ALLOWED explicitly rather than left to defaults. The
 * business case for this site is discoverability inside answer engines
 * ("best used phone shop in Jabalpur" asked to an assistant), so we opt
 * IN, not out. Named per each crawler's own published UA string so a
 * future user-agent rollup doesn't quietly re-block them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },

      // AI / LLM crawlers: explicit allow for visibility inside answer engines.
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
