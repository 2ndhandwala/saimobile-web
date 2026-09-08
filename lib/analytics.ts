/**
 * GA4 custom events. Fires only when the GA script has loaded, which itself
 * only happens after analytics consent (see components/site/GoogleAnalytics.tsx).
 * No-op on the server and when consent has not been granted.
 */

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: GtagParams) => void;
  }
}

export function trackEvent(name: string, params?: GtagParams) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}

/** Maps an outbound href to (event_name, extra params). Returns null to skip. */
export function classifyClick(
  href: string,
): { name: string; params: Record<string, string> } | null {
  if (/^https?:\/\/(?:www\.|api\.)?wa\.me\//i.test(href)) return { name: "whatsapp_click", params: {} };
  if (/^tel:/i.test(href)) return { name: "phone_click", params: {} };
  if (/^mailto:/i.test(href)) return { name: "email_click", params: {} };
  if (/instagram\.com/i.test(href)) return { name: "social_click", params: { platform: "instagram" } };
  if (/youtube\.com|youtu\.be/i.test(href)) return { name: "social_click", params: { platform: "youtube" } };
  if (/maps\.google|maps\.app\.goo\.gl|goo\.gl\/maps/i.test(href)) return { name: "maps_click", params: {} };
  return null;
}
