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

              {/* Socials */}
              <a
                href="https://www.linkedin.com/company/impulso-co-nl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Impulso Co. op LinkedIn"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-foreground/15 bg-card px-3.5 py-2.5 transition-colors hover:border-terracotta"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 fill-[#0A66C2] transition-transform group-hover:scale-110"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
                <span className="text-sm font-medium text-foreground group-hover:text-terracotta transition-colors">
                  {language === "nl" ? "Volg ons op LinkedIn" : "Follow us on LinkedIn"}
                </span>
              </a>
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
                { name: language === "nl" ? "Website Bouwen" : "Build Your Website", href: "/diensten/website-laten-maken/" },
                { name: language === "nl" ? "WhatsApp AI Agent" : "WhatsApp AI Agent", href: "/diensten/whatsapp-ai-agent/" },
                { name: language === "nl" ? "Software op Maat" : "Custom Software", href: "/diensten/software-op-maat/" },
                { name: language === "nl" ? "AI Agent Bouwen" : "Build AI Agent", href: "/diensten/ai-agent-bouwen/" },
                { name: language === "nl" ? "Digitale Medewerker" : "Digital Employee", href: "/diensten/digitale-medewerker/" },
                { name: language === "nl" ? "AI voor MKB" : "AI for SMBs", href: "/diensten/ai-automatisering-mkb/" },
                { name: language === "nl" ? "Alle diensten" : "All services", href: "/diensten/" },
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
                { name: "Blog", href: "/blog/" },
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
                { name: t.footer.privacyPolicy, href: "/privacy-policy/" },
                { name: t.footer.termsOfService, href: "/terms-of-service/" },
                { name: t.footer.cookiePolicy, href: "/cookie-policy/" },
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
