"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { useLanguage } from "@/lib/i18n/language-context";

/**
 * Minimalist "Over ons" section: type-led company story
 * followed by a hairline-separated owners grid.
 *
 * TODO: add portraits to /public/images/team/ and swap the
 * initials placeholders for <Image> portraits.
 */
export default function About() {
  const { t, language } = useLanguage();
  const isNL = language === "nl";

  // Scroll to this section when the page loads with #about in the URL
  useEffect(() => {
    if (window.location.hash === "#about") {
      const timer = setTimeout(() => scrollToSection("about"), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const paragraphs = t.about.description.split("\n");
  // First line is the big lead statement; the rest is the story, split into
  // two balanced columns so the layout fills the full width.
  const [lead, ...body] = paragraphs;
  const splitAt = Math.ceil(body.length / 2);
  const bodyLeft = body.slice(0, splitAt);
  const bodyRight = body.slice(splitAt);

  // Inline emphasis: text wrapped in *asterisks* renders bold + italic.
  const renderRich = (text: string) =>
    text.split(/(\*[^*]+\*)/g).map((part, i) =>
      /^\*[^*]+\*$/.test(part) ? (
        <strong key={i} className="font-semibold italic text-foreground">
          {part.slice(1, -1)}
        </strong>
      ) : (
        part
      )
    );

  const owners = [
    {
      name: "Omar Nassar",
      initials: "ON",
      image: "/images/team/omar-nassar.jpeg",
      role: isNL
        ? "AI-developer, jouw alleskunner"
        : "AI developer, your all-rounder",
      bio: isNL
        ? "Bouwt de AI-oplossingen. Van prototype tot stabiel productiesysteem, nieuw idee vandaag, werkende demo binnen 2 dagen."
        : "Builds the AI solutions. From prototype to stable production system, new idea today, working demo within 2 days.",
    },
    {
      name: "Pieter de Haer",
      initials: "PdH",
      image: "/images/team/pieter-de-haer.jpeg",
      role: isNL
        ? "Sales & klantrelaties, jouw aanspreekpunt"
        : "Sales & customer relations, your point of contact",
      bio: isNL
        ? "Jouw vaste aanspreekpunt. Vertaalt jouw processen en wensen naar een concrete oplossing en blijft betrokken na de livegang."
        : "Your main point of contact. Translates your processes and needs into a concrete solution and stays involved after launch.",
    },
  ];

  return (
    <section id="about" className="relative bg-background py-24 sm:py-32">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Eyebrow */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8"
        >
          {isNL ? "Over ons" : "About us"}
        </motion.p>

        {/* Statement headline */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] text-foreground max-w-4xl mb-12"
        >
          {isNL
            ? "De gezichten achter Impulso Co."
            : "The faces behind Impulso Co."}
        </motion.h2>

        {/* Company story */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-20 sm:mb-28"
        >
          {/* Lead statement, large, full width */}
          <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-[1.25] tracking-tight text-foreground max-w-4xl mb-10 sm:mb-16">
            {lead}
          </p>

          {/* Story, two balanced columns that fill the width */}
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-6">
            <div className="space-y-6">
              {bodyLeft.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base text-muted-foreground font-light leading-relaxed"
                >
                  {renderRich(paragraph)}
                </p>
              ))}
            </div>
            <div className="space-y-6">
              {bodyRight.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base text-muted-foreground font-light leading-relaxed"
                >
                  {renderRich(paragraph)}
                </p>
              ))}
              <a
                href="#ready-to-start"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("ready-to-start");
                }}
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-terracotta"
              >
                {isNL ? "Plan een kennismaking" : "Book an introduction"}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Owners, hairline-separated grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="grid sm:grid-cols-2 gap-y-12 border-t border-foreground/15">
            {owners.map((owner, idx) => (
              <div
                key={idx}
                className="pt-8 sm:pr-12 sm:border-r sm:border-foreground/15 sm:last:border-r-0 sm:last:pl-12 sm:last:pr-0"
              >
                {/* Portrait, photo if available, else initials placeholder */}
                <div className="aspect-[4/5] max-w-[320px] bg-muted overflow-hidden mb-6">
                  {owner.image ? (
                    <img
                      src={owner.image}
                      alt={owner.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl font-medium tracking-tight text-muted-foreground/40">
                        {owner.initials}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-medium tracking-tight text-foreground">
                  {owner.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1.5">
                  {isNL ? "Mede-eigenaar" : "Co-owner"}
                </p>
                <p className="text-sm text-muted-foreground mt-2 mb-3">
                  {owner.role}
                </p>
                <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-sm">
                  {owner.bio}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
