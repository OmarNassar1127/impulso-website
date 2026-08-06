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

// Fake browser preview for ZapBot
function ZapBotPreview({ language }: { language: string }) {
  const isNL = language === "nl";
  const bubbleIn = {
    initial: { opacity: 0, y: 6 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const slots = [
    { label: isNL ? "Ma 10:00" : "Mon 10:00", chosen: false },
    { label: isNL ? "Di 14:00" : "Tue 14:00", chosen: true },
    { label: isNL ? "Wo 09:30" : "Wed 09:30", chosen: false },
  ];

  return (
    <div>
      {/* WhatsApp chat header */}
      <div className="mb-3 flex items-center gap-2 border-b border-foreground/10 pb-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]">
          <MessageCircle className="h-3.5 w-3.5 text-white" fill="white" strokeWidth={0} />
        </div>
        <div className="leading-tight">
          <div className="text-[10px] font-semibold text-foreground/80">Impulso Assist</div>
          <div className="flex items-center gap-1 text-[8px] text-emerald-600">
            <span className="h-1 w-1 rounded-full bg-emerald-500" />
            {isNL ? "online" : "online"}
          </div>
        </div>
        <span className="ml-auto inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[7px] font-medium text-emerald-600">
          <Sparkles className="h-2 w-2" />
          AI-agent
        </span>
      </div>

      <div className="space-y-2">
        {/* 1 — user request */}
        <motion.div className="flex justify-end" {...bubbleIn} transition={{ delay: 0 }}>
          <div className="max-w-[78%] rounded-2xl rounded-tr-sm bg-emerald-500/20 px-3 py-2">
            <p className="text-[11px] text-foreground/70">
              {isNL
                ? "Hoi, ik wil graag een afspraak inplannen voor volgende week"
                : "Hi, I'd like to schedule an appointment for next week"}
            </p>
            <span className="float-right mt-0.5 text-[8px] text-muted-foreground/40">14:32</span>
          </div>
        </motion.div>

        {/* tool step — checking availability */}
        <motion.div className="flex justify-center" {...bubbleIn} transition={{ delay: 0.15 }}>
          <span className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-2 py-0.5 text-[8px] text-muted-foreground/70">
            <Calendar className="h-2 w-2 text-blue-500" />
            {isNL ? "Beschikbaarheid gecheckt in Google Calendar" : "Checked availability in Google Calendar"}
            <Check className="h-2 w-2 text-emerald-600" strokeWidth={3} />
          </span>
        </motion.div>

        {/* 2 — agent offers slots with quick-reply buttons */}
        <motion.div className="flex justify-start" {...bubbleIn} transition={{ delay: 0.3 }}>
          <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-muted/60 px-3 py-2">
            <div className="mb-1 flex items-center gap-1">
              <Bot className="h-2.5 w-2.5 text-emerald-500" />
              <span className="text-[9px] font-semibold text-emerald-500">Impulso Assist</span>
            </div>
            <p className="text-[11px] text-foreground/70">
              {isNL
                ? "Deze tijden zijn nog vrij volgende week. Welke past het beste?"
                : "These times are still free next week. Which works best?"}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {slots.map((s, i) => (
                <span
                  key={i}
                  className={`rounded-full border px-1.5 py-0.5 text-[8px] font-medium ${
                    s.chosen
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-700"
                      : "border-foreground/15 text-foreground/55"
                  }`}
                >
                  {s.label}
                </span>
              ))}
            </div>
            <span className="float-right mt-0.5 text-[8px] text-muted-foreground/40">14:32</span>
          </div>
        </motion.div>

        {/* 3 — user picks */}
        <motion.div className="flex justify-end" {...bubbleIn} transition={{ delay: 0.45 }}>
          <div className="max-w-[78%] rounded-2xl rounded-tr-sm bg-emerald-500/20 px-3 py-2">
            <p className="text-[11px] text-foreground/70">
              {isNL ? "Dinsdag 14:00 graag!" : "Tuesday 14:00 please!"}
            </p>
            <span className="float-right mt-0.5 text-[8px] text-muted-foreground/40">14:33</span>
          </div>
        </motion.div>

        {/* tool step — booking */}
        <motion.div className="flex justify-center" {...bubbleIn} transition={{ delay: 0.6 }}>
          <span className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-2 py-0.5 text-[8px] text-muted-foreground/70">
            <Calendar className="h-2 w-2 text-blue-500" />
            {isNL ? "Afspraak aangemaakt · uitnodiging verstuurd" : "Event created · invite sent"}
            <Check className="h-2 w-2 text-emerald-600" strokeWidth={3} />
          </span>
        </motion.div>

        {/* 4 — confirmation with Google Calendar card */}
        <motion.div className="flex justify-start" {...bubbleIn} transition={{ delay: 0.75 }}>
          <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-muted/60 px-3 py-2">
            <div className="mb-1 flex items-center gap-1">
              <Bot className="h-2.5 w-2.5 text-emerald-500" />
              <span className="text-[9px] font-semibold text-emerald-500">Impulso Assist</span>
            </div>
            <p className="text-[11px] text-foreground/70">
              {isNL ? "Top, ik heb het ingepland ✅" : "Great, I've booked it ✅"}
            </p>

            {/* Google Calendar event card */}
            <div className="mt-1.5 overflow-hidden rounded-lg border border-foreground/10 bg-white">
              <div className="flex items-stretch">
                <div className="w-1 bg-blue-500" />
                <div className="flex-1 p-2">
                  <div className="mb-0.5 flex items-center gap-1">
                    <Calendar className="h-2.5 w-2.5 text-blue-500" />
                    <span className="text-[9px] font-semibold text-foreground/80">
                      {isNL ? "Intake-gesprek" : "Intro call"}
                    </span>
                  </div>
                  <div className="text-[8px] text-muted-foreground/60">
                    {isNL ? "Dinsdag · 14:00 – 14:30" : "Tuesday · 14:00 – 14:30"}
                  </div>
                  <span className="mt-1 inline-flex items-center gap-1 text-[8px] font-semibold text-blue-600">
                    <Plus className="h-2 w-2" strokeWidth={3} />
                    {isNL ? "Toevoegen aan Google Agenda" : "Add to Google Calendar"}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-1.5 text-[11px] text-foreground/70">
              {isNL
                ? "Bevestiging per e-mail onderweg. Tot dan! 👋"
                : "Confirmation email on its way. See you then! 👋"}
            </p>
            <span className="float-right mt-0.5 text-[8px] text-muted-foreground/40">14:33</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Fake browser preview for ContentOS
function ContentOSPreview({ language }: { language: string }) {
  const isNL = language === "nl";

  const agents = [
    {
      name: isNL ? "Strateeg" : "Strategist",
      icon: Target,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      status: isNL ? "Contentkalender bijgewerkt" : "Content calendar updated",
      time: "2m",
      state: "done",
    },
    {
      name: isNL ? "Schrijver" : "Writer",
      icon: PenTool,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      status: isNL ? "Blogpost schrijven… (2/3)" : "Writing blog post… (2/3)",
      time: isNL ? "nu" : "now",
      state: "working",
    },
    {
      name: isNL ? "E-mail" : "Email",
      icon: Mail,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      status: isNL ? "Campagne verstuurd" : "Campaign sent",
      time: "1u",
      state: "done",
    },
    {
      name: isNL ? "Analist" : "Analyst",
      icon: BarChart3,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      status: isNL ? "Budget voor ads verhogen?" : "Increase ad budget?",
      time: "5m",
      state: "question",
    },
  ];

  const team = [
    { initials: "St", bg: "bg-orange-400" },
    { initials: "Sc", bg: "bg-pink-400" },
    { initials: "An", bg: "bg-emerald-400" },
  ];

  const week = [
    { day: isNL ? "ma" : "mon", num: 5, chips: ["bg-orange-400/80", "bg-pink-400/80"] },
    { day: isNL ? "di" : "tue", num: 6, chips: ["bg-orange-400/80", "bg-pink-400/80", "bg-blue-400/80"] },
    { day: isNL ? "wo" : "wed", num: 4, today: true, chips: ["bg-orange-400/80", "bg-blue-400/80"] },
    { day: isNL ? "do" : "thu", num: 5, chips: ["bg-pink-400/80", "bg-blue-400/80"] },
    { day: isNL ? "vr" : "fri", num: 5, chips: ["bg-orange-400/80", "bg-pink-400/80"] },
  ];

  const cardShadow = "shadow-[0_1px_3px_rgba(0,0,0,0.04)]";

  return (
    <div className="space-y-3">
      {/* App header: brand, team, action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="text-[11px] font-semibold text-foreground">Impulso Studio</div>
            <div className="text-[8px] text-muted-foreground/60">
              {isNL ? "Marketing-werkruimte" : "Marketing workspace"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {team.map((t, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full ring-2 ring-white flex items-center justify-center text-[6px] font-bold text-white ${t.bg}`}
              >
                {t.initials}
              </div>
            ))}
            <div className="w-4 h-4 rounded-full ring-2 ring-white bg-muted flex items-center justify-center text-[6px] font-bold text-muted-foreground">
              +2
            </div>
          </div>
          <button className="inline-flex items-center gap-0.5 rounded-md bg-foreground px-1.5 py-1 text-[8px] font-medium text-background">
            <Plus className="w-2.5 h-2.5" strokeWidth={2.5} />
            {isNL ? "Nieuw" : "New"}
          </button>
        </div>
      </div>

      {/* This-week card */}
      <div className={`rounded-lg border border-foreground/10 bg-white p-2.5 ${cardShadow}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-orange-500" />
            <span className="text-[10px] font-semibold text-foreground/80">
              {isNL ? "Deze week" : "This week"}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[8px] font-medium text-emerald-600">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            25 {isNL ? "items gepland" : "items scheduled"}
          </span>
        </div>
        <div className="grid grid-cols-5 gap-1">
          {week.map((d, i) => (
            <div
              key={i}
              className={`rounded-md p-1.5 text-center border ${
                d.today
                  ? "border-terracotta/40 bg-terracotta/[0.06]"
                  : "border-foreground/10 bg-white"
              }`}
            >
              <div className="text-[7px] uppercase tracking-wide text-muted-foreground/50 mb-0.5">
                {d.day}
              </div>
              <div
                className={`text-[12px] font-bold leading-none mb-1 ${
                  d.today ? "text-terracotta" : "text-foreground/80"
                }`}
              >
                {d.num}
              </div>
              <div className="space-y-[2px]">
                {d.chips.map((c, ci) => (
                  <div key={ci} className={`h-[3px] rounded-full ${c}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent activity card — live ops feed with mixed agent states */}
      <div className={`rounded-lg border border-foreground/10 bg-white p-2.5 ${cardShadow}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60">
            {isNL ? "Agents" : "Agents"}
          </span>
          <div className="flex items-center gap-1.5">
            <motion.span
              className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[8px] font-medium text-amber-600"
              animate={{ opacity: [1, 0.55, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <HelpCircle className="h-2 w-2" />
              {isNL ? "1 wacht op je" : "1 needs you"}
            </motion.span>
            <span className="inline-flex items-center gap-1 text-[8px] text-muted-foreground/50">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              live
            </span>
          </div>
        </div>
        <div className="space-y-1">
          {agents.map((agent, i) => {
            const AgentIcon = agent.icon;
            const isQuestion = agent.state === "question";
            const isWorking = agent.state === "working";
            const dotColor =
              agent.state === "done"
                ? "bg-emerald-500"
                : isWorking
                ? "bg-blue-500"
                : "bg-amber-500";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`flex items-center gap-2 rounded-lg px-1.5 py-1.5 ${
                  isQuestion ? "border border-amber-500/25 bg-amber-500/[0.06]" : ""
                }`}
              >
                <div
                  className={`relative w-6 h-6 rounded-md flex items-center justify-center ${agent.bg}`}
                >
                  <AgentIcon className={`w-3 h-3 ${agent.color}`} />
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ring-2 ring-white ${dotColor}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold text-foreground/80 leading-tight">
                    {agent.name}
                  </div>
                  <div
                    className={`text-[9px] truncate ${
                      isQuestion ? "text-amber-700 font-medium" : "text-muted-foreground/60"
                    }`}
                  >
                    {agent.status}
                  </div>
                  {isQuestion && (
                    <div className="mt-1 flex gap-1">
                      <span className="rounded-full border border-emerald-500/40 bg-emerald-500/5 px-1.5 py-0.5 text-[8px] font-medium text-emerald-700">
                        {isNL ? "Ja" : "Yes"}
                      </span>
                      <span className="rounded-full border border-foreground/15 px-1.5 py-0.5 text-[8px] font-medium text-foreground/55">
                        {isNL ? "Nee" : "No"}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-[8px] text-muted-foreground/40 self-start mt-0.5">
                  {agent.time}
                </span>
                {agent.state === "done" && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[8px] font-medium text-emerald-600 self-start">
                    <Check className="h-2 w-2" strokeWidth={3} />
                    {isNL ? "Klaar" : "Done"}
                  </span>
                )}
                {isWorking && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[8px] font-medium text-blue-600 self-start">
                    <motion.span
                      className="h-2 w-2 rounded-full border border-blue-500 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    {isNL ? "Bezig" : "Working"}
                  </span>
                )}
                {isQuestion && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[8px] font-medium text-amber-600 self-start">
                    <HelpCircle className="h-2 w-2" />
                    {isNL ? "Vraag" : "Asks"}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Results card */}
      <div className="rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/[0.06] to-pink-500/[0.04] p-2.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-semibold text-orange-600">
            {isNL ? "Resultaat deze week" : "This week's results"}
          </span>
          <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-emerald-600">
            <TrendingUp className="w-2.5 h-2.5" strokeWidth={2.5} />
            +180%
          </span>
        </div>
        <div className="flex items-end gap-[3px] h-8 border-b border-foreground/10">
          {[30, 42, 38, 55, 62, 58, 78, 72, 85, 90].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-orange-500/70 to-pink-500/60"
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.04, duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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

        {/* Preview side */}
        <div className={`${isReversed ? "lg:order-1" : ""}`}>
          <div className="border border-foreground/20 bg-white overflow-hidden">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-foreground/15 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
              </div>
              <div className="flex-1 mx-2 px-3 py-1 rounded-md bg-muted/50 text-[10px] text-muted-foreground/50 font-mono">
                {study.url.replace("https://", "")}
              </div>
            </div>
            {/* Content */}
            <div className="p-5">
              {index === 0 ? (
                <ZapBotPreview language={language} />
              ) : (
                <ContentOSPreview language={language} />
              )}
            </div>
          </div>
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
