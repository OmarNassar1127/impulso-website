import { generateMetadata as genMeta } from "@/lib/metadata";
import ChatLink from "@/components/chat/chat-link";
import { faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import StickyIntakeCTA from "@/components/sticky-intake-cta";
import FaqAccordion from "@/components/faq-accordion";
import { WhatsAppMockup, NoShowComparison } from "@/components/illustrations/whatsapp-mockup";
import {
  ArrowRight,
  MessageCircle,
  Clock,
  CalendarCheck,
  Languages,
  BellRing,
  Users,
  CheckCircle,
  Scissors,
  Stethoscope,
  Car,
  ShoppingBag,
  Home,
  UtensilsCrossed,
  Wrench,
  HeartPulse,
} from "lucide-react";

export const metadata = genMeta({
  title: "WhatsApp AI Agent & Chat Agent voor Bedrijven",
  description:
    "Een WhatsApp- of chat-agent die klantvragen beantwoordt, afspraken inplant en herinneringen stuurt. 24/7, vanaf €595 setup + €24,95 per maand.",
  keywords:
    "WhatsApp AI agent, chat agent, WhatsApp chatbot bedrijf, AI chatbot WhatsApp, klantenservice WhatsApp automatiseren, afspraken inplannen WhatsApp, WhatsApp Business API, chatbot laten maken, AI chatbot bedrijven Nederland",
  pathname: "/diensten/whatsapp-ai-agent",
  locale: "nl_NL",
});

const faqItems = [
  {
    question: "Wat kost een WhatsApp AI-agent?",
    answer:
      "Je start vanaf €595 eenmalige setup plus €24,95 per maand (ZZP-pakket): een agent die veelgestelde vragen beantwoordt, getraind op jouw bedrijfsinformatie. Wil je dat de agent ook afspraken inplant, leads kwalificeert en aan je CRM en agenda hangt, dan zit je in het MKB-pakket: €1.395 setup plus €149,95 per maand. Je krijgt altijd eerst een vrijblijvende offerte op maat.",
  },
  {
    question: "Hoe snel staat de agent live?",
    answer:
      "Binnen 5 dagen na de intake. We trainen de agent op je bestaande informatie, testen samen een dag mee op echte vragen en zetten hem daarna aan. Complexere koppelingen met een CRM of kassasysteem kunnen 2 tot 3 weken duren.",
  },
  {
    question: "Heb ik hier de WhatsApp Business API voor nodig?",
    answer:
      "Ja, en dat regelen wij. De gratis WhatsApp Business-app kan geen geautomatiseerde antwoorden sturen. Wij zetten de officiële WhatsApp Business API op via een geautoriseerde provider, koppelen je nummer en handelen de verificatie af. Je bestaande zakelijke nummer kan meestal gewoon mee.",
  },
  {
    question: "Merken klanten dat ze met een AI praten?",
    answer:
      "We zijn daar altijd eerlijk over: de agent stelt zich voor als digitale assistent. In de praktijk vinden klanten dat prima, omdat ze binnen tien seconden antwoord krijgen in plaats van de volgende ochtend. Bij twijfel of een gevoelige vraag schakelt de agent door naar een mens.",
  },
  {
    question: "Wat gebeurt er als de agent iets niet weet?",
    answer:
      "Dan gokt hij niet. De agent geeft aan dat hij het navraagt en zet het gesprek door naar jou of een collega, met de context van het gesprek erbij. Je bepaalt zelf welke onderwerpen altijd naar een mens gaan, bijvoorbeeld klachten of betalingen.",
  },
  {
    question: "Kan de agent ook afspraken inplannen?",
    answer:
      "Ja. De agent kijkt live in je agenda (Google Calendar of Outlook), biedt vrije tijdslots aan, boekt de afspraak en stuurt automatisch een bevestiging en een herinnering. Bij een annulering biedt hij meteen een alternatief slot aan, waardoor het gat in je agenda vaak nog gevuld wordt.",
  },
  {
    question: "In welke talen werkt de agent?",
    answer:
      "Standaard Nederlands en Engels, en hij schakelt automatisch over op basis van de taal van de klant. Duits, Frans, Spaans of Arabisch kunnen we erbij zetten zonder dat je een tweede agent nodig hebt.",
  },
  {
    question: "Werken jullie ook buiten Amsterdam?",
    answer:
      "Ja, we werken door heel Nederland en België. De intake doen we via een videogesprek en de agent staat volledig remote live. Onze klanten zitten van Groningen tot Maastricht; waar je gevestigd bent maakt voor de oplevering niets uit.",
  },
];

const capabilities = [
  {
    icon: MessageCircle,
    title: "Beantwoordt vragen direct",
    text: "Openingstijden, prijzen, voorraad, routebeschrijving. Getraind op jouw informatie, in jouw toon.",
  },
  {
    icon: CalendarCheck,
    title: "Plant afspraken in",
    text: "Kijkt live in je agenda, biedt vrije slots aan, boekt en bevestigt automatisch.",
  },
  {
    icon: BellRing,
    title: "Stuurt herinneringen",
    text: "Automatische reminder voor de afspraak, met de optie om te bevestigen of te verzetten.",
  },
  {
    icon: Clock,
    title: "Werkt 's avonds en in het weekend",
    text: "Juist buiten kantooruren komen de berichten binnen. De agent slaapt niet.",
  },
  {
    icon: Users,
    title: "Kwalificeert leads",
    text: "Stelt de juiste vragen, herkent serieuze aanvragen en zet die door naar jou.",
  },
  {
    icon: Languages,
    title: "Schakelt tussen talen",
    text: "Nederlands en Engels standaard, meer talen op aanvraag. Zonder tweede agent.",
  },
];

const segments = [
  { icon: Scissors, label: "Kappers en salons", note: "Afspraken en no-shows" },
  { icon: Stethoscope, label: "Klinieken en praktijken", note: "Triage en planning" },
  { icon: HeartPulse, label: "Fysio en tandarts", note: "Herinneringen" },
  { icon: Car, label: "Autogarages", note: "Onderhoud inplannen" },
  { icon: ShoppingBag, label: "Webshops", note: "Waar blijft mijn pakket" },
  { icon: Home, label: "Makelaars", note: "Bezichtigingen" },
  { icon: UtensilsCrossed, label: "Horeca", note: "Reserveringen" },
  { icon: Wrench, label: "Installateurs", note: "Offertes en storingen" },
];

export default function WhatsAppAgentPage() {
  const faqSchemaData = faqSchema({ items: faqItems });

  const breadcrumbData = breadcrumbSchema({
    items: [
      { position: 1, name: "Home", item: `${siteConfig.url}/` },
      { position: 2, name: "Diensten", item: `${siteConfig.url}/diensten/` },
      {
        position: 3,
        name: "WhatsApp AI Agent",
        item: `${siteConfig.url}/diensten/whatsapp-ai-agent/`,
      },
    ],
  });

  const serviceSchemaData = serviceSchema({
    name: "WhatsApp AI Agent en Chat Agent",
    description:
      "WhatsApp AI-agents en chat agents voor bedrijven in heel Nederland. Beantwoordt klantvragen, plant afspraken in en stuurt herinneringen, 24/7. Live binnen 5 dagen, vanaf €595 setup plus €24,95 per maand.",
    serviceType: "Conversational AI Development",
    url: `${siteConfig.url}/diensten/whatsapp-ai-agent`,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaData) }} />

      <main className="min-h-screen bg-background">
        <Navbar
          customNavLinks={[
            { name: "Wat het doet", href: "#wat-het-doet" },
            { name: "Resultaten", href: "#resultaten" },
            { name: "Voor wie", href: "#voor-wie" },
            { name: "Prijzen", href: "#prijzen" },
            { name: "FAQ", href: "#faq" },
          ]}
        />

        {/* Hero */}
        <section className="pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-14">
          <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-muted/60 border border-border/60 px-4 py-1.5 text-xs sm:text-sm text-muted-foreground mb-6">
                  <MessageCircle className="h-3.5 w-3.5 text-primary" />
                  WhatsApp &amp; chat agents, heel Nederland
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-5">
                  WhatsApp AI-agent
                  <span className="block text-primary mt-1">die je klanten meteen antwoord geeft</span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                  Je klanten appen liever dan dat ze bellen. Een AI-agent op WhatsApp
                  beantwoordt hun vragen binnen tien seconden, plant afspraken in je
                  agenda en stuurt herinneringen. Ook om elf uur 's avonds. Live binnen{" "}
                  <strong className="font-semibold text-foreground">5 dagen</strong>.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://calendly.com/omar-impulsoco/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98]"
                  >
                    Plan gratis intake
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:info@impulsoco.nl"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-card px-7 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-muted/40 active:scale-[0.98]"
                  >
                    Stel een vraag
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Officiële WhatsApp Business API
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Maandelijks opzegbaar
                  </span>
                </div>
              </div>
              <WhatsAppMockup />
            </div>
          </div>
        </section>

        {/* Wat het doet */}
        <section id="wat-het-doet" className="py-12 sm:py-16 md:py-20 border-t border-border/50 surface-warm">
          <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Wat de agent voor je doet
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Geen keuzemenu en geen beslisboom. De agent begrijpt wat er gevraagd
                wordt en handelt het af, of geeft het netjes door aan jou.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {capabilities.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-foreground/15 bg-card shadow-sm p-5 sm:p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
                    </div>
                    <h3 className="font-bold text-foreground text-sm sm:text-base mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Resultaten */}
        <section id="resultaten" className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Wat het oplevert
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  Bij een fysiotherapiepraktijk met vier therapeuten liep de no-show rate
                  op tot 22 procent. Bij 120 afspraken per week en een behandelprijs van
                  €65 is dat bijna €7.000 per maand aan gemiste omzet. De agent bevestigt
                  nu elke boeking, herinnert 24 uur van tevoren en biedt bij een annulering
                  meteen een alternatief slot aan.
                </p>
                <div className="grid grid-cols-2 gap-px bg-border/60 border border-border/60 rounded-xl overflow-hidden mb-6">
                  {[
                    { value: "<10 sec", label: "Reactietijd" },
                    { value: "40%", label: "Minder no-shows" },
                    { value: "€2.800", label: "Bespaard per maand" },
                    { value: "24/7", label: "Bereikbaar" },
                  ].map((s) => (
                    <div key={s.label} className="bg-card p-4 sm:p-5">
                      <div className="text-xl sm:text-2xl font-bold text-primary">{s.value}</div>
                      <div className="text-[11px] sm:text-xs uppercase tracking-wide text-muted-foreground mt-1">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground/80">
                  Cijfers uit een lopende implementatie. Wat het voor jou oplevert hangt af
                  van je volume en je huidige no-show rate; dat rekenen we in de intake samen door.
                </p>
              </div>
              <NoShowComparison />
            </div>
          </div>
        </section>

        {/* Voor wie */}
        <section id="voor-wie" className="py-12 sm:py-16 md:py-20 border-t border-border/50 surface-warm">
          <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="grid grid-cols-2 gap-3 lg:order-2">
                {segments.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className="rounded-xl border border-foreground/15 bg-card p-3.5 shadow-sm"
                    >
                      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-4.5 w-4.5 text-primary" strokeWidth={1.6} />
                      </div>
                      <div className="text-[13px] font-bold leading-tight text-foreground">
                        {s.label}
                      </div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">{s.note}</div>
                    </div>
                  );
                })}
              </div>
              <div className="lg:order-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Voor wie dit werkt
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  Werk je met afspraken, of krijg je elke week dezelfde vragen binnen? Dan
                  verdient een agent zichzelf snel terug. We werken door heel Nederland en
                  België, volledig remote.
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Werk je met afspraken? Minder no-shows, voller rooster",
                    "Veel dezelfde vragen? Die handelt de agent zelf af",
                    "Klanten appen buiten kantooruren? Nu krijgen ze antwoord",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Prijzen */}
        <section id="prijzen" className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Wat het kost
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
              Eenmalige setup kosten, daarna een vast maandbedrag. Altijd eerst een
              vrijblijvende offerte op maat, zodat je precies weet waar je aan toe bent.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="rounded-2xl border border-primary/50 bg-card shadow-sm p-6">
                <h3 className="text-base font-extrabold tracking-tight text-foreground mb-2">ZZP</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold tracking-tight text-foreground">€24,95</span>
                  <span className="text-sm text-muted-foreground"> / maand</span>
                  <p className="text-sm text-muted-foreground mt-1">+ €595 setup, eenmalig</p>
                </div>
                <ul className="space-y-2.5">
                  {["Agent die vragen beantwoordt", "Getraind op je bedrijfsinfo", "Doorschakeling naar jou", "Hosting en onderhoud inbegrepen"].map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-foreground/15 bg-card shadow-sm p-6">
                <h3 className="text-base font-extrabold tracking-tight text-foreground mb-2">MKB</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold tracking-tight text-foreground">€149,95</span>
                  <span className="text-sm text-muted-foreground"> / maand</span>
                  <p className="text-sm text-muted-foreground mt-1">+ €1.395 setup, eenmalig</p>
                </div>
                <ul className="space-y-2.5">
                  {["Alles uit ZZP, plus:", "Afspraken inplannen in je agenda", "Leadkwalificatie", "Koppeling met je CRM"].map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-xs text-muted-foreground/80 leading-relaxed">
              Alle prijzen zijn exclusief btw. Maandprijzen zijn op basis van je eigen
              API-sleutels: het AI-verbruik wordt rechtstreeks door de provider
              gefactureerd, zonder opslag van ons. Kosten van de WhatsApp Business API
              lopen via de provider en rekenen we door zonder marge.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 sm:mb-10">
              Veelgestelde vragen
            </h2>
            <FaqAccordion items={faqItems} />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-border/50 surface-warm">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl py-12 sm:py-16 md:py-20 text-center">
            <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Benieuwd wat een agent in jouw inbox zou doen?
            </h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Plan een gratis intake van 30 minuten. We kijken naar je huidige berichten
              en rekenen samen door wat het oplevert. Geen verkooppraat.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://calendly.com/omar-impulsoco/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-8 py-4 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98]"
              >
                Plan gratis intake
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@impulsoco.nl"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-card px-8 py-4 text-sm font-medium text-foreground transition-all hover:bg-muted/40 active:scale-[0.98]"
              >
                Mail ons direct
              </a>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Impulso Co. · WhatsApp en chat agents · heel Nederland ·{" "}
              <ChatLink className="hover:text-foreground transition-colors underline underline-offset-2 decoration-dotted">chat direct met ons</ChatLink>
            </p>
          </div>
        </section>

        <Footer />
        <StickyIntakeCTA />
      </main>
    </>
  );
}
