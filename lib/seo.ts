import type { Metadata } from "next";
import { shop } from "../content";

/**
 * Single source of truth for the canonical production origin.
 *
 * Every absolute URL emitted by the site (metadataBase, JSON-LD `@id`,
 * sitemap entries, OG image absolutization) derives from this constant.
 * Do NOT hard-code the domain anywhere else; import `SITE_URL` (or the
 * helpers below) instead.
 *
 * Canonical host chosen: bare 2ndhandwala.com (no www), https-only. The
 * hosting layer should 301 the www variant to this origin.
 */
export const SITE_URL = "https://2ndhandwala.com" as const;

/** Stable JSON-LD @id for the one authoritative LocalBusiness node. */
export const BUSINESS_ID = `${SITE_URL}/#store` as const;

/** Absolute URL for a given path (leading slash required). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * Build per-page metadata with consistent OG / Twitter defaults.
 *
 * Next.js `metadata` merges *shallowly*: if a page defines `openGraph`,
 * the whole `openGraph` block from the root layout is replaced. This
 * helper rebuilds the shared fields (site name, locale, type, twitter
 * card) for every page so nothing silently drops.
 *
 * Titles pass through the root layout's `title.template` (`%s ·
 * 2nd Hand Wala`), so pass the SHORT half only (e.g. "About").
 *
 * `path` is an absolute path starting with `/`; it becomes the canonical
 * and the `og:url`. Pages that must not be indexed (privacy, terms,
 * returns) set `noindex: true`; the corresponding <meta name="robots">
 * emits index=false while keeping follow=true so link-equity still flows.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  noindex = false,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  noindex?: boolean;
  type?: "website" | "article";
}): Metadata {
  const finalOgTitle = ogTitle ?? title;
  const finalOgDescription = ogDescription ?? description;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: shop.brandName,
      locale: "en_IN",
      url: absoluteUrl(path),
      title: finalOgTitle,
      description: finalOgDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: finalOgTitle,
      description: finalOgDescription,
    },
    robots: noindex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : undefined,
  };
}
