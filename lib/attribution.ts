/**
 * Lead attribution — captures UTM params, referrer, and landing page on first
 * visit and persists them in sessionStorage so they survive multi-step forms
 * and are available at submit time.
 *
 * The values are sent to GHL via the form API routes as custom-field strings.
 */

const STORAGE_KEY = 'capitalcove_attribution';

export interface AttributionData {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landingPage?: string;
  capturedAt?: string;
}

/**
 * Read the current URL's query string + document.referrer and merge with any
 * previously stored attribution. First-touch attribution wins — we only set
 * each field once per session, so the original source isn't overwritten if the
 * user navigates around the site.
 */
export function captureAttribution(): AttributionData {
  if (typeof window === 'undefined') return {};

  const url = new URL(window.location.href);
  const params = url.searchParams;

  const existing = readAttribution();
  const merged: AttributionData = { ...existing };

  const fieldMap: Array<[string, keyof AttributionData]> = [
    ['utm_source', 'utmSource'],
    ['utm_medium', 'utmMedium'],
    ['utm_campaign', 'utmCampaign'],
    ['utm_term', 'utmTerm'],
    ['utm_content', 'utmContent'],
    ['gclid', 'gclid'],
    ['fbclid', 'fbclid'],
  ];

  for (const [param, key] of fieldMap) {
    const value = params.get(param);
    if (value && !merged[key]) {
      merged[key] = value;
    }
  }

  // Only capture referrer/landing page on the very first touch
  if (!merged.capturedAt) {
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
      merged.referrer = document.referrer;
    }
    merged.landingPage = url.pathname + url.search;
    merged.capturedAt = new Date().toISOString();
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // ignore storage failures
  }

  return merged;
}

export function readAttribution(): AttributionData {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AttributionData) : {};
  } catch {
    return {};
  }
}
