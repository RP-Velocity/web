export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type Consent = {
  necessary: true; // always granted
  analytics: boolean;
  marketing: boolean;
  version: number; // bump to re-prompt everyone after a policy change
  ts: number; // epoch ms of the decision
};

export const CONSENT_VERSION = 1;
export const STORAGE_KEY = "rpv-cookie-consent";
export const CONSENT_EVENT = "rpv:consent-change";
export const OPEN_SETTINGS_EVENT = "rpv:open-cookie-settings";

/**
 * Returns the stored consent, or null when nothing is stored, the JSON is
 * malformed, or the stored version is stale (treated as "no decision" so the
 * banner re-prompts).
 */
export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (
      parsed === null ||
      typeof parsed !== "object" ||
      parsed.version !== CONSENT_VERSION ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean"
    ) {
      return null;
    }
    return {
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      version: CONSENT_VERSION,
      ts: typeof parsed.ts === "number" ? parsed.ts : 0,
    };
  } catch {
    return null;
  }
}

/**
 * Persists consent to localStorage and notifies listeners (the seam for
 * gating future analytics/marketing scripts without a page reload).
 */
export function writeConsent(consent: Consent): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // storage may be unavailable (private mode / quota exceeded); ignore
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }));
}

/**
 * Future script-gating hook. `necessary` is always granted; other categories
 * require an explicit stored grant.
 */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const consent = readConsent();
  return consent ? consent[category] : false;
}
