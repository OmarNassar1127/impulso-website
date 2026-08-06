"use client";

import { CookieConsent } from "./cookie-consent";
import { useCookieConsent, CookiePreferences } from "@/lib/hooks/use-cookie-consent";
import { updateAnalyticsConsent } from "@/lib/analytics";

export function ClientCookieConsent() {
  const { updatePreferences } = useCookieConsent();

  // The banner's choice drives Google Consent Mode. Until the visitor accepts,
  // analytics_storage stays denied and nothing is stored on their device.
  const handleAccept = (preferences: CookiePreferences) => {
    updatePreferences(preferences);
    updateAnalyticsConsent(preferences);
  };

  const handleDecline = () => {
    updateAnalyticsConsent({ analytics: false, marketing: false });
  };

  return (
    <CookieConsent
      onAccept={handleAccept}
      onDecline={handleDecline}
    />
  );
}
