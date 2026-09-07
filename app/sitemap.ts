import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * Public sitemap.
 *
 * Only the six pages a search engine should surface for organic discovery:
 * home, about, warranty, emi, contact, faq.
 *
 * Deliberately omitted:
 * - /privacy, /terms, /returns: noindex, footer-only, kept out to avoid
 *   diluting the crawl budget with legal pages the brand has no interest
 *   in ranking.
 * - /sell-your-phone, /wholesale: indexable, but conversion-driven; they
 *   pick up traffic through internal linking (header CTA + wholesale
 *   footer link) rather than through the sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/warranty"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/emi"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
