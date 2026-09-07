/**
 * DPDPA 2023 · consent record for cookies / trackers.
 *
 * Single source of truth for what the /privacy page calls the "consent tool".
 * Non-essential trackers (GA4, Meta Pixel) must read from here before firing.
 * If the shape or the set of categories ever changes, bump CONSENT_VERSION so
 * every returning visitor is re-prompted; DPDPA requires fresh informed
 * consent, not a silent migration.
 */

export const CONSENT_STORAGE_KEY = "sm.consent";
export const CONSENT_VERSION = 1;

/** Fires on the window whenever consent is granted, withdrawn, or changed.
 * Downstream trackers should subscribe to this instead of polling. */
export const CONSENT_EVENT = "sm:consent-change";

export type ConsentCategory = "necessary" | "analytics" | "advertising";

export type ConsentRecord = {
  version: number;
  /** ISO-8601 timestamp of the most recent affirmative action. */
  ts: string;
  necessary: true;
  analytics: boolean;
  advertising: boolean;
};

export type ConsentChangeDetail = ConsentRecord;

/** Presets used by the "Accept all" / "Reject all" buttons. Necessary is
 * always true: it covers cookies that keep the site itself running, e.g.
 * the record of the visitor's own consent choice. */
export const ACCEPT_ALL: Omit<ConsentRecord, "version" | "ts"> = {
  necessary: true,
  analytics: true,
  advertising: true,
};

export const REJECT_ALL: Omit<ConsentRecord, "version" | "ts"> = {
  necessary: true,
  analytics: false,
  advertising: false,
};

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    // DPDPA: any structural change in what is being consented to re-prompts.
    if (parsed.version !== CONSENT_VERSION) return null;
    if (typeof parsed.ts !== "string") return null;
    return {
      version: CONSENT_VERSION,
      ts: parsed.ts,
      necessary: true,
      analytics: Boolean(parsed.analytics),
      advertising: Boolean(parsed.advertising),
    };
  } catch {
    return null;
  }
}

export function writeConsent(
  choice: Omit<ConsentRecord, "version" | "ts">,
): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    ts: new Date().toISOString(),
    necessary: true,
    analytics: choice.analytics,
    advertising: choice.advertising,
  };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    } catch {
      // storage may be blocked (private mode, quota); dispatch anyway so the
      // in-memory listeners see the choice for this session.
    }
    window.dispatchEvent(
      new CustomEvent<ConsentChangeDetail>(CONSENT_EVENT, { detail: record }),
    );
  }
  return record;
}
