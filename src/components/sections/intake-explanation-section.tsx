"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, FileText, Rocket, ArrowRight, ChevronRight, Phone, Mail, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import DemoRequestModal from "@/components/demo-request-modal";

export default function IntakeExplanationSection() {
    const { language } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showContact, setShowContact] = useState(false);

    const steps = [
        {
            icon: Calendar,
            number: "01",
            title: language === 'nl' ? '30 min kennismaken' : '30 min introduction',
            description: language === 'nl'
                ? 'We bespreken je uitdaging, waar je nu staat, en waar je naartoe wilt.'
                : 'We discuss your challenge, where you are now, and where you want to go.'
        },
        {
            icon: FileText,
            number: "02",
            title: language === 'nl' ? 'Voorstel binnen 4u' : 'Proposal within 4h',
            description: language === 'nl'
                ? 'Je krijgt een strak voorstel: wat we bouwen, hoe lang het duurt, en wat het kost.'
                : 'You get a tight proposal: what we\'ll build, how long it takes, and what it costs.'
        },
        {
            icon: Rocket,
            number: "03",
            title: language === 'nl' ? 'Live binnen 5 dagen' : 'Live in 5 days',
            description: language === 'nl'
                ? 'Akkoord? We beginnen direct. Binnen 5 dagen heb je een werkende oplossing.'
                : 'Approved? We start immediately. Within 5 days you have a working solution.'
        }
    ];

    return (
        <section className="py-24 sm:py-32 surface-warm border-t border-foreground/10" id="intake">
            <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
                {/* Header */}
                <div className="mb-16 sm:mb-20 max-w-3xl">
                    <motion.p
                        className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.2em] mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {language === 'nl' ? 'Zo werkt het' : 'How it works'}
                    </motion.p>

                    <motion.h2
                        className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                    >
                        {language === 'nl' ? 'Van idee tot live' : 'From idea to live'}
                    </motion.h2>

                    <motion.p
                        className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        {language === 'nl'
                            ? 'Drie simpele stappen naar je werkende AI-oplossing'
                            : 'Three simple steps to your working AI solution'}
                    </motion.p>
                </div>

                {/* Steps, hairline cells, numbered */}
                <div className="grid md:grid-cols-3 border-t border-l border-foreground/15 mb-20 sm:mb-24 bg-white/60">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="p-8 sm:p-10 border-r border-b border-foreground/15"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <Icon className="h-6 w-6 text-terracotta" strokeWidth={1.5} />
                                    <span className="text-sm text-muted-foreground tracking-[0.2em]">
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="font-medium text-xl tracking-tight mb-3 text-foreground">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <motion.div
                    id="ready-to-start"
                    className="border border-terracotta/20 bg-white p-8 sm:p-12 md:p-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-foreground">
                        {language === 'nl' ? 'Klaar om te beginnen?' : 'Ready to start?'}
                    </h3>

                    <p className="text-lg sm:text-xl text-muted-foreground font-light mb-10">
                        {language === 'nl'
                            ? '30 minuten. Gratis. Geen verplichtingen.'
                            : '30 minutes. Free. No commitments.'}
                    </p>

                    {/* Primary CTA */}
                    <div className="mb-10 flex justify-center">
                        <a
                            href="https://calendly.com/omarnassar1127/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-2 h-12 px-10 bg-foreground text-background text-sm font-medium hover:bg-terracotta transition-colors"
                        >
                            {language === 'nl' ? 'Plan een gesprek' : 'Schedule a call'}
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </a>
                    </div>

                    {/* Trust Signals */}
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm text-muted-foreground mb-8">
                        {[
                            language === 'nl' ? 'Binnen 4u reactie' : 'Response within 4h',
                            language === 'nl' ? '18 bedrijven geholpen' : '18 companies helped',
                            language === 'nl' ? 'Geld-terug garantie' : 'Money-back guarantee',
                        ].map((text, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-terracotta" strokeWidth={1.5} />
                                <span>{text}</span>
                                </div>
                            ))}
                        </div>

                    {/* Contact Accordion */}
                    <div className="max-w-sm mx-auto">
                        <button
                            onClick={() => setShowContact(!showContact)}
                            className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto mb-4"
                        >
                            <span className="text-sm">{language === 'nl' ? 'Of neem direct contact op' : 'Or contact directly'}</span>
                            <ChevronRight
                                className={`h-4 w-4 transition-transform ${showContact ? 'rotate-90' : ''}`}
                            />
                        </button>

                        {showContact && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-background p-4 space-y-1 border border-foreground/15"
                            >
                                <a href="tel:+31640495527" className="flex items-center gap-3 p-3 hover:bg-foreground/5 transition-colors">
                                    <Phone className="h-4 w-4 text-foreground flex-shrink-0" strokeWidth={1.5} />
                                    <span className="text-foreground font-medium text-sm">+31 6 40 49 55 27</span>
                                </a>
                                <a href="mailto:info@impulsoco.nl" className="flex items-center gap-3 p-3 hover:bg-foreground/5 transition-colors">
                                    <Mail className="h-4 w-4 text-foreground flex-shrink-0" strokeWidth={1.5} />
                                    <span className="text-foreground font-medium text-sm">info@impulsoco.nl</span>
                                </a>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>

            <DemoRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
