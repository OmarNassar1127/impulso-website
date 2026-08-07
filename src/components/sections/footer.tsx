"use client";

import React from "react";
import { motion } from "framer-motion";
import { HashLink } from "@/components/hash-router/hash-router";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection, navigateFromPolicyPage } from "@/lib/scroll-utils";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-background border-t border-foreground/15 py-20 sm:py-24">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <a
                href="/"
                className="inline-block hover:opacity-70 transition-opacity"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <img
                  src="/impulso-logo.png"
                  alt="Impulso Co. Automate. Optimize. Grow."
                  className="w-40 h-auto object-contain"
                />
              </a>
              <p className="text-sm text-muted-foreground font-light max-w-full sm:max-w-md leading-relaxed">
                {language === "nl"
                  ? "AI-oplossingen op maat. Websites, AI Agents en Automatiseringen. Van idee tot live binnen 5 dagen."
                  : "Custom AI solutions. Websites, AI Agents, and Automations. From idea to live in 5 days."}
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {[
                { name: t.nav.home, href: "#" },
                { name: t.nav.services, href: "#services" },
                { name: language === "nl" ? "Klantresultaten" : "Case studies", href: "#case-studies" },
                { name: language === "nl" ? "Aanbevelingen" : "Testimonials", href: "#testimonials" },
                { name: language === "nl" ? "Contact" : "Contact", href: "#ready-to-start" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href.startsWith("#") ? "/" + link.href : link.href}
                    className="text-sm text-muted-foreground font-light hover:text-foreground transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.location.pathname !== "/" && window.location.pathname !== "/en" && window.location.pathname !== "/en/") {
                        window.location.href = link.href === "#" ? "/" : "/" + link.href;
                        return;
                      }
                      const handled = navigateFromPolicyPage(link.href);
                      if (!handled) {
                        if (link.href === "#") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          scrollToSection(link.href.replace("#", ""));
                        }
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Diensten */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">
              {language === "nl" ? "Diensten" : "Services"}
            </h4>
            <ul className="space-y-3">
              {[
                { name: language === "nl" ? "Website Bouwen" : "Build Your Website", href: "/diensten/website-laten-maken" },
                { name: language === "nl" ? "AI Agent Bouwen" : "Build AI Agent", href: "/diensten/ai-agent-bouwen" },
                { name: language === "nl" ? "Digitale Medewerker" : "Digital Employee", href: "/diensten/digitale-medewerker" },
                { name: language === "nl" ? "AI voor MKB" : "AI for SMBs", href: "/diensten/ai-automatisering-mkb" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground font-light hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">
              {language === "nl" ? "Kennisbank" : "Resources"}
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground font-light hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">
              {t.footer.legal}
            </h4>
            <ul className="space-y-3">
              {[
                { name: t.footer.privacyPolicy, href: "/privacy-policy" },
                { name: t.footer.termsOfService, href: "/terms-of-service" },
                { name: t.footer.cookiePolicy, href: "/cookie-policy" },
                { name: t.footer.sitemap, href: "/sitemap.xml" },
              ].map((link) => (
                <li key={link.name}>
                  {link.name === t.footer.sitemap ? (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground font-light hover:text-foreground transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <HashLink
                      to={link.href}
                      className="text-sm text-muted-foreground font-light hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </HashLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-foreground/15 mt-16 pt-8">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Impulso Co. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
