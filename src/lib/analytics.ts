/**
 * GA4 helpers, split out so the cookie banner and the analytics component
 * share one implementation.
 *
 * Consent model: Google Consent Mode v2. Analytics and ad storage start as
 * "denied" (see the inline default in google-analytics.tsx), so nothing is
 * stored on a visitor's device until they accept in the cookie banner. GA
 * still receives cookieless pings while denied, which keeps modelled traffic
 * roughly accurate without breaking AVG/GDPR.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** localStorage key written by the cookie banner. */
export const CONSENT_STORAGE_KEY = "cookiePreferences";

export type ConsentPreferences = {
  analytics?: boolean;
  marketing?: boolean;
};

/** Flip Consent Mode on or off after the visitor answers the banner. */
export function updateAnalyticsConsent(prefs: ConsentPreferences) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
  });
}

/**
 * Send an explicit page_view. gtag is configured with send_page_view:false,
 * so every view (including the first) comes through here. That way in-app
 * navigations, which never reload the document, are counted too.
 */
export function trackPageView(url?: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const path =
    url ??
    window.location.pathname + window.location.search + window.location.hash;

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Track anything else worth measuring, e.g. an intake click. */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
