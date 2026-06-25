"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection } from "@/lib/scroll-utils";

/**
 * Pricing — three productized packages (ZZP / MKB / Op maat) in a hairline
 * grid. Each card shows a one-time setup, a fixed monthly fee, notice period,
 * support level and what's included. Prices exclude VAT; the monthly figures
 * assume the client's own API keys (see the footnote below the cards).
 */
export default function Pricing() {
  const { language } = useLanguage();
  const isNL = language === "nl";

  const plans = [
    {
      name: "ZZP",
      popular: true,
      tagline: isNL
        ? "Voor zelfstandigen en eenmanszaken die online zichtbaar willen zijn met een werkende AI-assistent."
        : "For freelancers and sole traders who want to be visible online with a working AI assistant.",
      monthly: "€24,95",
      setup: "€595",
      meta: [
        {
          label: isNL ? "Opzegtermijn" : "Notice period",
          value: isNL ? "1 maand" : "1 month",
        },
      ],
      features: isNL
        ? [
            "Support: Mail/WhatsApp · binnen 1 werkdag",
            "Website: 1–5 pagina's, responsive, op maat ontworpen (geen template) — NL/EN",
            "1 FAQ/WhatsApp-bot, getraind op jouw bedrijfsinfo",
            "Contactformulier + e-mailnotificatie",
            "Hosting, updates, security & backups",
            "1 uur/maand content-aanpassingen inbegrepen",
            "Optioneel: AI-bot die zelf taken uitvoert (meerprijs)",
          ]
        : [
            "Support: Email/WhatsApp · within 1 business day",
            "Website: 1–5 pages, responsive, custom-designed (no template) — NL/EN",
            "1 FAQ/WhatsApp bot, trained on your business info",
            "Contact form + email notification",
            "Hosting, updates, security & backups",
            "1 hour/month of content changes included",
            "Optional: an AI bot that performs tasks (add-on)",
          ],
      cta: isNL ? "Plan gratis intake" : "Book free intake",
    },
    {
      name: "MKB",
      popular: false,
      tagline: isNL
        ? "Voor groeiende bedrijven die klantcontact willen automatiseren en meer online conversie willen."
        : "For growing businesses that want to automate customer contact and convert more online.",
      monthly: "€149,95",
      setup: "€1.395",
      includes: isNL ? "Alles uit ZZP, plus:" : "Everything in ZZP, plus:",
      meta: [
        {
          label: isNL ? "Opzegtermijn" : "Notice period",
          value: isNL ? "1 maand" : "1 month",
        },
      ],
      features: isNL
        ? [
            "Support: Mail/WhatsApp/telefoon · binnen 4 uur",
            "Website: tot 12 pagina's met CMS — beheer zelf je content",
            "Slimme AI-agent: leadkwalificatie + WhatsApp-integratie",
            "CRM-koppeling (HubSpot/Pipedrive) + agenda-integratie",
            "Wekelijkse updates, dagelijkse backups, performance-monitoring",
            "3 uur/maand content-aanpassingen inbegrepen",
            "Maandelijks dashboard met leads & gesprekken",
          ]
        : [
            "Support: Email/WhatsApp/phone · within 4 hours",
            "Website: up to 12 pages with CMS — manage content yourself",
            "Smart AI agent: lead qualification + WhatsApp integration",
            "CRM integration (HubSpot/Pipedrive) + calendar integration",
            "Weekly updates, daily backups, performance monitoring",
            "3 hours/month of content changes included",
            "Monthly dashboard with leads & conversations",
          ],
      cta: isNL ? "Plan gratis intake" : "Book free intake",
    },
    {
      name: isNL ? "Op maat" : "Custom",
      popular: false,
      tagline: isNL
        ? "Voor specifieke wensen, maatwerk-integraties of meer volume. We bepalen de scope samen."
        : "For specific needs, custom integrations or higher volume. We define the scope together.",
      custom: isNL ? "Prijs in overleg" : "Let's talk",
      includes: isNL ? "Alles uit MKB, plus:" : "Everything in MKB, plus:",
      meta: [
        {
          label: isNL ? "Opzegtermijn" : "Notice period",
          value: isNL ? "In overleg" : "By arrangement",
        },
      ],
      features: isNL
        ? [
            "Support: N.o.t.k.",
            "Maatwerk-integraties en koppelingen",
            "Onbeperkt pagina's en agents (in overleg)",
            "AI-agents voor complexere, zelfstandige taken",
            "SLA & dedicated support",
          ]
        : [
            "Support: On request",
            "Custom integrations and connections",
            "Unlimited pages and agents (by arrangement)",
            "AI agents for more complex, autonomous tasks",
            "SLA & dedicated support",
          ],
      cta: isNL ? "Neem contact op" : "Get in touch",
    },
  ];

  return (
    <section
      id="prijzen"
      className="py-24 sm:py-32 bg-background border-t border-foreground/10"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.2em] mb-8"
          >
            {isNL ? "Prijzen" : "Pricing"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] mb-6"
          >
            {isNL
              ? "Heldere prijzen, geen verrassingen"
              : "Clear pricing, no surprises"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg sm:text-xl font-light leading-relaxed"
          >
            {isNL
              ? "Een eenmalige setup, daarna een vast maandbedrag. Je weet vooraf precies waar je aan toe bent."
              : "A one-time setup, then a fixed monthly fee. You know exactly where you stand, up front."}
          </motion.p>
        </div>

        {/* Plans — hairline grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`flex flex-col p-8 sm:p-10 border ${
                plan.popular ? "border-terracotta" : "border-foreground/15"
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold tracking-tight text-foreground">
                  {plan.name}
                </h3>
                {plan.popular && (
                  <span className="text-[10px] uppercase tracking-[0.15em] bg-terracotta text-background px-2.5 py-1">
                    {isNL ? "Populair" : "Popular"}
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 min-h-[3.5rem]">
                {plan.tagline}
              </p>

              {/* Price block */}
              {plan.monthly ? (
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-medium tracking-tight text-foreground">
                      {plan.monthly}
                    </span>
                    <span className="text-4xl font-medium tracking-tight text-foreground">
                      *
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">
                      {isNL ? "/ maand" : "/ month"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {isNL
                      ? `+ ${plan.setup} setup · eenmalig`
                      : `+ ${plan.setup} setup · one-time`}
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
                    {plan.custom}
                  </span>
                  <p className="text-sm text-muted-foreground mt-2">
                    {isNL ? "Setup & maandbedrag op aanvraag" : "Setup & monthly fee on request"}
                  </p>
                </div>
              )}

              {/* Meta rows */}
              <div className="border-t border-foreground/10 pt-5 mb-7 space-y-3">
                {plan.meta.map((m, mi) => (
                  <div
                    key={mi}
                    className="flex items-baseline justify-between gap-4 text-sm"
                  >
                    <span className="text-muted-foreground flex-shrink-0">
                      {m.label}
                    </span>
                    <span className="text-foreground/90 font-light text-right">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Features */}
              {plan.includes && (
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-4">
                  {plan.includes}
                </p>
              )}
              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <Check
                      className="h-4 w-4 text-foreground flex-shrink-0 mt-0.5"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm text-foreground/80 font-light leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection("ready-to-start")}
                className={
                  plan.popular
                    ? "group inline-flex items-center justify-center gap-2 h-12 px-6 bg-foreground text-background text-sm font-medium hover:bg-terracotta transition-colors"
                    : "group inline-flex items-center justify-center gap-2 h-12 px-6 border border-foreground/40 text-sm font-medium text-foreground hover:border-terracotta hover:text-terracotta transition-colors"
                }
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Fine print */}
        <div className="mt-8 space-y-2 max-w-3xl text-xs text-muted-foreground/70 font-light leading-relaxed">
          <p>{isNL ? "Alle prijzen zijn exclusief btw." : "All prices exclude VAT."}</p>
          <p>
            {isNL
              ? "*Maandprijzen zijn op basis van je eigen API-sleutels — het AI-verbruik wordt rechtstreeks door de provider gefactureerd, zonder opslag van ons. Zo betaal je alleen voor wat je daadwerkelijk gebruikt."
              : "*Monthly prices assume your own API keys — AI usage is billed directly by the provider, with no markup from us. So you only pay for what you actually use."}
          </p>
          <p>
            {isNL
              ? "Na opzegging van je abonnement geldt voor support op het product een uurtarief van €75 (excl. btw)."
              : "After your subscription is cancelled, product support is billed at €75/hour (excl. VAT)."}
          </p>
        </div>
      </div>
    </section>
  );
}
