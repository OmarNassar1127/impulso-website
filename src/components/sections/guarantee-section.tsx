"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection } from "@/lib/scroll-utils";

export default function GuaranteeSection() {
    const { language } = useLanguage();

    const guarantees = [
        language === 'nl'
            ? 'Geen verborgen kosten, we houden van transparantie'
            : 'No hidden costs, we love transparency',
        language === 'nl'
            ? 'Dezelfde dag nog een reactie'
            : 'A response the same day',
        language === 'nl'
            ? '(Nog) niet tevreden? We denken altijd met je mee'
            : 'Not satisfied (yet)? We always think along with you'
    ];

    return (
        <section className="py-24 sm:py-32 surface-warm border-t border-foreground/10" id="guarantee">
            <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left: main value proposition + CTAs (moved from the hero) */}
                    <div>
                        <motion.p
                            className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.2em] mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {language === 'nl' ? 'AI-bureau, Amsterdam' : 'AI agency, Amsterdam'}
                        </motion.p>

                        <motion.h2
                            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] text-foreground mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 }}
                        >
                            {language === 'nl' ? (
                                <>Wij bouwen jouw<br />digitale team.</>
                            ) : (
                                <>We build your<br />digital team.</>
                            )}
                        </motion.h2>

                        <motion.div
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <a
                                href="#ready-to-start"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection("ready-to-start");
                                }}
                                className="inline-flex items-center justify-center h-12 px-10 border border-foreground/40 text-sm font-medium text-foreground hover:border-terracotta hover:text-terracotta transition-colors duration-200"
                            >
                                {language === 'nl' ? 'Plan gratis intake' : 'Book free intake'}
                            </a>
                            <a
                                href="#services"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection("services");
                                }}
                                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-terracotta"
                            >
                                {language === 'nl' ? 'Bekijk agents' : 'View agents'}
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Right: guarantees, hairline-separated list */}
                    <div>
                        <motion.p
                            className="text-base sm:text-lg font-semibold text-foreground uppercase tracking-[0.2em] mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {language === 'nl' ? 'Onze beloftes' : 'Our promises'}
                        </motion.p>
                        <div className="border-t border-foreground/15">
                        {guarantees.map((guarantee, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start gap-4 py-6 border-b border-foreground/15"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 + index * 0.08 }}
                            >
                                <Check className="h-5 w-5 text-terracotta flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                                <p className="text-base sm:text-lg text-foreground/80 font-light leading-relaxed">
                                    {guarantee}
                                </p>
                            </motion.div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
