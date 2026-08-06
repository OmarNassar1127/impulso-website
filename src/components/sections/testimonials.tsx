"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

interface Testimonial {
  id: number;
  name: string;
  role: { en: string; nl: string };
  image: string;
  content: { en: string; nl: string };
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Giulio Piccolo",
    role: {
      en: "Lead Engineer @ Suit Supply",
      nl: "Lead Engineer @ Suit Supply",
    },
    image: "/images/references/giulio.jpeg",
    content: {
      en: "The Impulso Co. team stood out for their rapid development and strong foundation in AI. They independently tackled complex topics and delivered valuable insights. A team with a steep learning curve that quickly makes impact.",
      nl: "Het Impulso Co. team viel op door hun snelle ontwikkeling en sterke basis in AI. Ze pakten zelfstandig complexe onderwerpen op en leverden waardevolle inzichten. Een team met een sterke leercurve dat snel impact maakt.",
    },
    rating: 5,
  },
  {
    id: 2,
    name: "Cristian Arboleda",
    role: { en: ".NET Developer", nl: ".NET Ontwikkelaar" },
    image: "/images/references/cris.jpeg",
    content: {
      en: "A talented team with a strong drive to grow and improve. Always supporting their clients, their greatest strength is quickly learning new domains and adapting to any process.",
      nl: "Een getalenteerd team met een sterke drang om te groeien en verbeteren. Ze ondersteunen hun klanten altijd, en hun grootste kracht is het snel leren van nieuwe domeinen en aanpassen aan elk proces.",
    },
    rating: 5,
  },
  {
    id: 3,
    name: "Ihor Tolkachov",
    role: {
      en: "Frontend Developer @ Mobility Platform",
      nl: "Frontend Developer @ Mobiliteitsplatform",
    },
    image: "/images/references/ihor.jpeg",
    content: {
      en: "Working with Impulso Co. showed their reliability and skill. Together we created an automatic fine scanner that reduced a 30-minute process to just 10 seconds, truly impressive efficiency improvement.",
      nl: "Het werken met Impulso Co. toonde hun betrouwbaarheid en vaardigheid. Samen creëerden we een automatische boetescanner die een proces van 30 minuten reduceerde tot slechts 10 seconden, indrukwekkend.",
    },
    rating: 5,
  },
  {
    id: 4,
    name: "Oeds de Meer",
    role: {
      en: "Process & Information Manager @ SBB",
      nl: "Proces- & informatiemanager @ SBB",
    },
    image: "/images/references/oeds.jpeg",
    content: {
      en: "Impulso Co. consistently delivered sharp analyses and worked with tools like SQL, Looker, and Python. They recognize patterns in data, think analytically, and provide visual insights that drive better decisions.",
      nl: "Impulso Co. leverde continu scherpe analyses en werkte met tools als SQL, Looker en Python. Ze herkennen patronen in data, denken analytisch en leveren visuele inzichten die bijdragen aan betere beslissingen.",
    },
    rating: 5,
  },
  {
    id: 5,
    name: "Azeez Bayonle",
    role: {
      en: "UX Designer",
      nl: "UX Designer",
    },
    image: "/images/references/azeez.jpeg",
    content: {
      en: "Impressive backend skills and creative problem-solving. The team delivers clean, well-structured solutions and communicates clearly throughout the process.",
      nl: "Indrukwekkende backend-vaardigheden en creatieve probleemoplossing. Het team levert schone, goed gestructureerde oplossingen en communiceert duidelijk door het hele proces.",
    },
    rating: 5,
  },
  {
    id: 6,
    name: "Laura Britton",
    role: {
      en: "Project Manager Medical Affairs @ Sedgwick",
      nl: "Projectmanager Medische Zaken @ Sedgwick",
    },
    image: "/images/references/laura.jpeg",
    content: {
      en: "Dedicated, helpful and reliable. Always deliver on their promises.",
      nl: "Toegewijd, behulpzaam en betrouwbaar. Komen altijd hun beloftes na.",
    },
    rating: 5,
  },
];

function TestimonialCard({
  testimonial,
  language,
}: {
  testimonial: Testimonial;
  language: string;
}) {
  return (
    <div className="h-full flex flex-col p-8 sm:p-10 border border-foreground/20 bg-white card-hover">
      {/* Quote */}
      <blockquote className="flex-1 text-base sm:text-lg text-foreground/80 font-light leading-relaxed mb-8">
        &ldquo;
        {language === "nl"
          ? testimonial.content.nl
          : testimonial.content.en}
        &rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-6 border-t border-foreground/15">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover grayscale"
          onError={(e) => {
            e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='Arial' font-size='16' font-weight='600'%3E${testimonial.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
          }}
        />
        <div>
          <div className="font-medium text-sm text-foreground">
            {testimonial.name}
          </div>
          <div className="text-xs text-muted-foreground">
            {language === "nl" ? testimonial.role.nl : testimonial.role.en}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector("div")?.offsetWidth || 380;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth - 24 : cardWidth + 24,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="py-24 sm:py-32 bg-background overflow-hidden border-t border-foreground/10"
      id="testimonials"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.2em] mb-8"
            >
              {language === "nl" ? "Wat ze zeggen" : "What they say"}
            </motion.p>
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              {language === "nl" ? "Aanbevelingen" : "Testimonials"}
            </motion.h2>
          </div>

          {/* Navigation arrows, desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden sm:flex items-center gap-3"
          >
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-11 h-11 border border-foreground/30 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-11 h-11 border border-foreground/30 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </motion.div>
        </div>

        {/* Horizontal scroll track */}
        <div className="relative">
          {/* Fade edges */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-12 bg-gradient-to-r from-[#f6f1ec] to-transparent z-10 pointer-events-none" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-12 bg-gradient-to-l from-[#f6f1ec] to-transparent z-10 pointer-events-none" />
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mb-4 snap-x snap-mandatory"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="w-[320px] sm:w-[380px] flex-shrink-0 snap-start"
              >
                <TestimonialCard
                  testimonial={testimonial}
                  language={language}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile navigation dots */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-6">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-10 h-10 border border-foreground/30 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors disabled:opacity-20"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 border border-foreground/30 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors disabled:opacity-20"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center"
        >
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((t) => (
                <img
                  key={t.id}
                  src={t.image}
                  alt={t.name}
                  className="w-8 h-8 rounded-full border-2 border-background object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='Arial' font-size='14' font-weight='600'%3E${t.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
                  }}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground ml-3">
              5.0
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {language === "nl"
              ? "Vertrouwd door 18+ bedrijven in Nederland"
              : "Trusted by 18+ companies in the Netherlands"}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
