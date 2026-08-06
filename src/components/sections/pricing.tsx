"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection } from "@/lib/scroll-utils";

/**
 * Pricing, three productized packages (ZZP / MKB / Op maat) in a hairline
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
      groups: isNL
        ? [
            { label: "Website", items: ["1-5 pagina's, responsive, op maat ontworpen (geen template)", "Nederlands en Engels"] },
            { label: "AI-agent", items: ["1 FAQ/WhatsApp-agent, getraind op jouw bedrijfsinfo", "Contactformulier + e-mailnotificatie", "Optioneel: AI-agent die zelf taken uitvoert (meerprijs)"] },
            { label: "Support", items: ["Mail/WhatsApp · reactie binnen 1 werkdag"] },
            { label: "Onderhoud", items: ["Hosting, updates, security & backups", "1 uur/maand content-aanpassingen inbegrepen"] },
          ]
        : [
            { label: "Website", items: ["1-5 pages, responsive, custom-designed (no template)", "Dutch and English"] },
            { label: "AI-agent", items: ["1 FAQ/WhatsApp agent, trained on your business info", "Contact form + email notification", "Optional: an AI agent that performs tasks (add-on)"] },
            { label: "Support", items: ["Email/WhatsApp · reply within 1 business day"] },
            { label: "Maintenance", items: ["Hosting, updates, security & backups", "1 hour/month of content changes included"] },
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
      groups: isNL
        ? [
            { label: "Website", items: ["Tot 12 pagina's met CMS, beheer zelf je content"] },
            { label: "AI-agent", items: ["Slimme AI-agent: leadkwalificatie + WhatsApp-integratie", "CRM-koppeling (HubSpot/Pipedrive) + agenda-integratie"] },
            { label: "Support", items: ["Mail/WhatsApp/telefoon · reactie binnen 4 uur"] },
            { label: "Onderhoud", items: ["Wekelijkse updates, dagelijkse backups, performance-monitoring", "3 uur/maand content-aanpassingen inbegrepen", "Maandelijks dashboard met leads & gesprekken"] },
          ]
        : [
            { label: "Website", items: ["Up to 12 pages with CMS, manage content yourself"] },
            { label: "AI-agent", items: ["Smart AI agent: lead qualification + WhatsApp integration", "CRM integration (HubSpot/Pipedrive) + calendar integration"] },
            { label: "Support", items: ["Email/WhatsApp/phone · reply within 4 hours"] },
            { label: "Maintenance", items: ["Weekly updates, daily backups, performance monitoring", "3 hours/month of content changes included", "Monthly dashboard with leads & conversations"] },
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
      groups: isNL
        ? [
            { label: "Website", items: ["Onbeperkt pagina's en agents (in overleg)"] },
            { label: "AI-agent", items: ["AI-agents voor complexere, zelfstandige taken", "Maatwerk-integraties en koppelingen"] },
            { label: "Support", items: ["N.o.t.k.", "SLA & dedicated support"] },
          ]
        : [
            { label: "Website", items: ["Unlimited pages and agents (by arrangement)"] },
            { label: "AI-agent", items: ["AI agents for more complex, autonomous tasks", "Custom integrations and connections"] },
            { label: "Support", items: ["On request", "SLA & dedicated support"] },
          ],
      cta: isNL ? "Neem contact op" : "Get in touch",
    },
  ];

  return (
    <section
      id="prijzen"
      className="py-24 sm:py-32 surface-warm border-t border-foreground/10"
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
              ? "Eenmalige setup kosten, daarna een vast maandbedrag. Altijd eerst een vrijblijvende offerte op maat, zodat je precies weet waar je aan toe bent."
              : "One-time setup cost, then a fixed monthly fee. Always a free tailored quote first, so you know exactly where you stand."}
          </motion.p>
        </div>

        {/* Plans, hairline grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`flex flex-col p-8 sm:p-10 border ${
                plan.popular
                  ? "border-terracotta bg-white card-hover"
                  : "border-foreground/15 bg-white card-hover"
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-extrabold tracking-tight text-foreground">
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
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      {plan.monthly}
                    </span>
                    <span className="text-2xl font-medium tracking-tight text-muted-foreground self-start">
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
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
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

              {/* Features, grouped per onderdeel */}
              {plan.includes && (
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-5">
                  {plan.includes}
                </p>
              )}
              <div className="space-y-5 mb-10 flex-1">
                {plan.groups.map((group, gi) => (
                  <div key={gi}>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">
                        {group.label}
                      </span>
                    </div>
                    <ul className="space-y-2 pl-3.5">
                      {group.items.map((item, ii) => {
                        const italic =
                          item.startsWith("Optioneel") || item.startsWith("Optional");
                        return (
                          <li key={ii} className="flex gap-2 text-sm leading-relaxed">
                            <span className="text-muted-foreground/40 flex-shrink-0">-</span>
                            <span
                              className={
                                italic
                                  ? "italic text-muted-foreground font-light"
                                  : "text-foreground/80 font-light"
                              }
                            >
                              {item}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

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
              ? "*Maandprijzen zijn op basis van je eigen API-sleutels, het AI-verbruik wordt rechtstreeks door de provider gefactureerd, zonder opslag van ons. Zo betaal je alleen voor wat je daadwerkelijk gebruikt."
              : "*Monthly prices assume your own API keys, AI usage is billed directly by the provider, with no markup from us. So you only pay for what you actually use."}
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
