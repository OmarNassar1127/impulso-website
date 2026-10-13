"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  ArrowUpRight,
  MessageCircle,
  Bot,
  Users,
  TrendingUp,
  Zap,
  Globe,
  Clock,
  BarChart3,
  Sparkles,
  PenTool,
  Target,
  Mail,
  Calendar,
  Check,
  Plus,
  HelpCircle,
} from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import dynamic from "next/dynamic";

const AssistScene = dynamic(() => import("@/components/scenes/assist-scene"), { ssr: false });
const StudioScene = dynamic(() => import("@/components/scenes/studio-scene"), { ssr: false });

interface CaseStudy {
  name: string;
  url: string;
  logo: string;
  logoBg: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  tech: string[];
  color: string;
  gradient: string;
  icon: any;
  screenshotBg: string;
}

const getCaseStudies = (language: string): CaseStudy[] => {
  const isNL = language === "nl";
  return [
    {
      name: "Impulso Assist",
      url: "",
      logo: "/images/clients/whatsapp.svg",
      logoBg: "",
      tagline: isNL
        ? "WhatsApp AI-assistent voor bedrijven"
        : "WhatsApp AI assistant for businesses",
      description: isNL
        ? "Impulso Assist beantwoordt klantvragen via WhatsApp, plant afspraken in via Google Calendar en stuurt automatische herinneringen, 24/7, in de stijl van het bedrijf."
        : "Impulso Assist answers customer questions via WhatsApp, schedules appointments through Google Calendar and sends automatic reminders, 24/7, in the business's own voice.",
      challenge: isNL
        ? "Bedrijven misten berichten buiten kantooruren. Afspraken werden handmatig ingepland en no-shows kostten omzet. 's Avonds en in het weekend was niemand bereikbaar."
        : "Businesses were missing messages outside office hours. Appointments were manually scheduled and no-shows were costing revenue. Evenings and weekends were unreachable.",
      solution: isNL
        ? "We bouwden een AI-agent die naadloos integreert met WhatsApp Business en Google Calendar. De agent plant automatisch afspraken in, stuurt herinneringen en schakelt moeiteloos tussen talen."
        : "We built an AI agent that seamlessly integrates with WhatsApp Business and Google Calendar. The agent auto-schedules appointments, sends reminders and switches between languages effortlessly.",
      results: isNL
        ? [
            { label: "Reactietijd", value: "<10 sec" },
            { label: "Minder no-shows", value: "40%" },
            { label: "Bespaard", value: "€2.800/mnd" },
            { label: "Beschikbaar", value: "24/7" },
          ]
        : [
            { label: "Response time", value: "<10 sec" },
            { label: "Fewer no-shows", value: "40%" },
            { label: "Cost saved", value: "€2,800/mo" },
            { label: "Available", value: "24/7" },
          ],
      tech: ["WhatsApp API", "AI/NLP", "Node.js", "Multi-language"],
      color: "text-emerald-500",
      gradient: "from-emerald-500/10 to-emerald-500/5",
      icon: MessageCircle,
      screenshotBg: "bg-gradient-to-br from-emerald-950 to-emerald-900",
    },
    {
      name: "Impulso Studio",
      url: "",
      logo: "",
      logoBg: "bg-gradient-to-br from-orange-500 to-pink-500",
      tagline: isNL
        ? "AI-marketingteam dat content maakt terwijl jij slaapt"
        : "AI marketing team that creates content while you sleep",
      description: isNL
        ? "Een team van AI-agents dat samen social media posts schrijft, e-mailcampagnes verstuurt, blogs produceert en advertentieteksten optimaliseert, allemaal in jouw tone-of-voice."
        : "A team of AI agents that collaboratively writes social media posts, sends email campaigns, produces blogs and optimizes ad copy, all in your tone of voice.",
      challenge: isNL
        ? "Een groeiend e-commerce merk produceerde 3 posts per week en had geen budget voor een volledig marketingteam. Content was inconsistent en campagnes werden te laat gelanceerd."
        : "A growing e-commerce brand was producing 3 posts per week with no budget for a full marketing team. Content was inconsistent and campaigns launched too late.",
      solution: isNL
        ? "We bouwden een team van 4 AI-agents: een Strateeg die de contentkalender plant, een Schrijver die posts en blogs maakt, een Designer die visuals genereert, en een Analist die prestaties meet en de strategie bijstuurt."
        : "We built a team of 4 AI agents: a Strategist that plans the content calendar, a Writer that creates posts and blogs, a Designer that generates visuals, and an Analyst that measures performance and adjusts strategy.",
      results: isNL
        ? [
            { label: "Content/week", value: "25+" },
            { label: "Engagement", value: "+180%" },
            { label: "Tijd bespaard", value: "30 uur/wk" },
            { label: "Kosten vs. team", value: "-75%" },
          ]
        : [
            { label: "Content/week", value: "25+" },
            { label: "Engagement", value: "+180%" },
            { label: "Time saved", value: "30 hrs/wk" },
            { label: "Cost vs. team", value: "-75%" },
          ],
      tech: ["AI Agents", "Social APIs", "Analytics", "Automation"],
      color: "text-orange-500",
      gradient: "from-orange-500/10 to-pink-500/5",
      icon: TrendingUp,
      screenshotBg: "bg-gradient-to-br from-orange-950 to-pink-950",
    },
  ];
};

function CaseStudyCard({
  study,
  index,
  language,
}: {
  study: CaseStudy;
  index: number;
  language: string;
}) {
  const isNL = language === "nl";
  const StudyIcon = study.icon;
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div
        className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isReversed ? "lg:direction-rtl" : ""}`}
      >
        {/* Content side */}
        <div className={`space-y-4 sm:space-y-6 px-2 sm:px-0 ${isReversed ? "lg:order-2" : ""}`}>
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 overflow-hidden shrink-0 ${study.logoBg} border border-foreground/10 flex items-center justify-center`}>
              {study.logo ? (
                <img
                  src={study.logo}
                  alt={`${study.name} logo`}
                  className="w-full h-full object-cover scale-125"
                />
              ) : (
                <StudyIcon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              )}
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                {study.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{study.tagline}</p>
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h4 className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-[0.15em] mb-1 sm:mb-2">
                {isNL ? "De uitdaging" : "The challenge"}
              </h4>
              <p className="text-xs sm:text-sm text-foreground/70 font-light leading-relaxed">
                {study.challenge}
              </p>
            </div>
            <div>
              <h4 className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-[0.15em] mb-1 sm:mb-2">
                {isNL ? "Onze oplossing" : "Our solution"}
              </h4>
              <p className="text-xs sm:text-sm text-foreground/70 font-light leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          {/* Results grid, hairline cells */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-foreground/15">
            {study.results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="p-3 sm:p-4 border-r border-b border-foreground/15"
              >
                <div className="text-base sm:text-lg font-medium text-terracotta">
                  {r.value}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                  {r.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech tags + CTA */}
          <div className="flex flex-wrap items-center gap-2">
            {study.tech.map((t, i) => (
              <span
                key={i}
                className="px-2.5 py-1 border border-foreground/15 text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
            {study.url ? (
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-terracotta"
              >
                {isNL ? "Bekijk live" : "View live"}
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
                {isNL ? "Op maat gebouwd" : "Custom built"}
              </span>
            )}
          </div>
        </div>

        {/* Preview side: an isometric 3D scene of the system */}
        <div className={`${isReversed ? "lg:order-1" : ""}`}>
          {index === 0 ? (
            <AssistScene language={language} className="aspect-[5/4] w-full" />
          ) : (
            <StudioScene language={language} className="aspect-[5/4] w-full" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const { language } = useLanguage();
  const isNL = language === "nl";
  const studies = getCaseStudies(language);

  return (
    <section id="case-studies" className="py-24 sm:py-32 border-t border-foreground/10 bg-background">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.2em] mb-8"
          >
            {isNL ? "Klantresultaten" : "Client results"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] mb-6"
          >
            {isNL ? "Van idee tot lancering" : "From idea to launch"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg sm:text-xl font-light leading-relaxed"
          >
            {isNL
              ? "Bekijk hoe we AI-oplossingen bouwen die écht werken, van concept tot product."
              : "See how we build AI solutions that actually work, from concept to product."}
          </motion.p>
        </div>

        {/* Case studies */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-28">
          {studies.map((study, i) => (
            <CaseStudyCard
              key={study.name}
              study={study}
              index={i}
              language={language}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 sm:mt-28 flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-12 border-t border-foreground/15"
        >
          <p className="text-lg sm:text-xl text-foreground font-light">
            {isNL
              ? "Wil jij ook zo'n resultaat?"
              : "Want results like these?"}
          </p>
          <button
            className="sm:ml-auto inline-flex items-center justify-center h-12 px-10 border border-foreground/40 text-sm font-medium text-foreground hover:border-terracotta hover:text-terracotta transition-colors duration-200"
            onClick={() => scrollToSection("ready-to-start")}
          >
            {isNL ? "Plan gratis intake" : "Book free intake"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
