"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

/**
 * Persistent "Plan gratis intake" CTA for the long diensten pages. Appears once
 * the visitor scrolls past the hero so there's always a one-tap path to booking
 * (the navbar CTA is hidden behind the hamburger on mobile). The microcopy
 * doubles as risk-reversal, removing the "is this a sales trap" hesitation.
 */
export default function StickyIntakeCTA() {
  const { language } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isNL = language === "nl";

  return (
    <div
      className={`fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"
      }`}
    >
      <a
        href="https://calendly.com/omarnassar1127/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center gap-0.5 rounded-2xl bg-foreground px-6 py-3 text-background shadow-xl transition-all hover:bg-foreground/90 hover:scale-[1.02] active:scale-95"
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          {isNL ? "Plan gratis intake" : "Book free intake"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
        <span className="text-[10px] text-background/70">
          {isNL ? "30 min · vrijblijvend · geen verkooppraat" : "30 min · no obligation · no sales pitch"}
        </span>
      </a>
    </div>
  );
}
