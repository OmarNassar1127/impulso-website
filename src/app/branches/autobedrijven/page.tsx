import { generateMetadata as genMeta } from "@/lib/metadata";
import ChatLink from "@/components/chat/chat-link";
import { faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import StickyIntakeCTA from "@/components/sticky-intake-cta";
import FaqAccordion from "@/components/faq-accordion";
import {
  ArrowRight,
  CalendarCheck,
  BellRing,
  Clock,
  Search,
  MessageCircle,
  Phone,
  CheckCircle,
} from "lucide-react";

export const metadata = genMeta({
  title: "Website en WhatsApp-agent voor je Autobedrijf of Garage",
  description:
    "Een website die gevonden wordt en een WhatsApp-agent die APK- en onderhoudsafspraken inplant, ook na sluitingstijd. Voor garages en bandenbedrijven, vanaf €595 setup + €24,95 per maand.",
  keywords:
    "website autobedrijf, website garage laten maken, APK afspraak online plannen, WhatsApp garage, chatbot autobedrijf, AI voor garages, website bandenbedrijf, onderhoud inplannen garage",
  pathname: "/branches/autobedrijven",
  locale: "nl_NL",
});

const faqItems = [
  {
    question: "Wat kost een website met WhatsApp-agent voor mijn garage?",
    answer:
      "Je start vanaf €595 eenmalige setup plus €24,95 per maand (ZZP-pakket): een website van 1 tot 5 pagina's met een agent die vragen beantwoordt. Wil je dat de agent ook APK- en onderhoudsafspraken in je agenda zet en herinneringen stuurt, dan zit je in het MKB-pakket: €1.395 setup plus €149,95 per maand. Je krijgt altijd eerst een vrijblijvende offerte.",
  },
  {
    question: "Ik heb nog geen website. Is dat een probleem?",
    answer:
      "Nee, dan beginnen we daar. Veel garages draaien op mond-tot-mondreclame en een Google-vermelding. Dat werkt tot iemand in de buurt zoekt op 'APK' of 'garage' en jij niet in de resultaten staat. We bouwen de site, zetten je diensten en prijzen erop en koppelen hem aan je Google Bedrijfsprofiel.",
  },
  {
    question: "Kan de agent in mijn planning kijken?",
    answer:
      "Ja, als je planning in Google Calendar of Outlook staat. De agent ziet welke dagen vol zitten, biedt een vrij moment aan en zet de afspraak erin met kenteken en type werk. Werk je met een garagepakket zonder koppeling, dan zet de agent de aanvraag compleet klaar en bevestig jij hem met één tik.",
  },
  {
    question: "Wat als een klant iets vraagt wat de agent niet weet?",
    answer:
      "Dan gokt hij niet. Een vraag over een specifieke reparatie of een prijs die je niet hebt vastgelegd gaat door naar jou, met het gesprek erbij. Jij bepaalt welke onderwerpen altijd naar een mens gaan.",
  },
  {
    question: "Hoe snel staat het live?",
    answer:
      "De website en de agent staan binnen 5 dagen na de intake live. Een koppeling met je agenda kost meestal een paar dagen extra.",
  },
  {
    question: "Werken jullie ook in de Achterhoek en Twente?",
    answer:
      "Ja. De intake doen we via een videogesprek en alles wordt op afstand opgeleverd, dus waar je garage staat maakt niet uit.",
  },
];

const capabilities = [
  {
    icon: Search,
    title: "Gevonden worden in de buurt",
    text: "Een site met je diensten, APK-prijs en openingstijden, zodat je verschijnt als iemand zoekt op 'garage' of 'APK' in jouw plaats.",
  },
  {
    icon: CalendarCheck,
    title: "APK en onderhoud inplannen",
    text: "De klant appt zijn kenteken en wat er moet gebeuren. De agent biedt een vrij moment aan en zet het in je planning.",
  },
  {
    icon: BellRing,
    title: "Herinneringen versturen",
    text: "Een bericht de dag voor de afspraak, met de optie om te verzetten. Minder lege bruggen.",
  },
  {
    icon: Clock,
    title: "Bereikbaar na sluitingstijd",
    text: "De meeste klanten denken 's avonds aan hun auto. Ze krijgen dan direct antwoord, niet pas de volgende ochtend.",
  },
  {
    icon: MessageCircle,
    title: "Vaste vragen afhandelen",
    text: "Wat kost een APK, hebben jullie een leenauto, kan ik wachten. Getraind op jouw antwoorden.",
  },
  {
    icon: Phone,
    title: "Minder telefoon onder de auto",
    text: "Je hoeft niet meer met vieze handen op te nemen voor een vraag die een bericht had kunnen zijn.",
  },
];

const tasks = [
  "APK-afspraken en de APK-herinnering een maand voor de vervaldatum",
  "Kleine en grote beurten inplannen",
  "Banden wisselen in het voorjaar en najaar, de drukste weken van het jaar",
  "Offerteaanvragen voor schade of reparatie, met foto's via WhatsApp",
  "Vragen over occasions: is hij er nog, wanneer kan ik proefrijden",
];

export default function AutobedrijvenPage() {
  const faqSchemaData = faqSchema({ items: faqItems });

  const breadcrumbData = breadcrumbSchema({
    items: [
      { position: 1, name: "Home", item: `${siteConfig.url}/` },
      { position: 2, name: "Autobedrijven", item: `${siteConfig.url}/branches/autobedrijven/` },
    ],
  });

  const serviceSchemaData = serviceSchema({
    name: "Website en WhatsApp-agent voor autobedrijven",
    description:
      "Websites en WhatsApp-agents voor garages en bandenbedrijven. Gevonden worden in de buurt, APK- en onderhoudsafspraken inplannen en herinneringen sturen. Live binnen 5 dagen, vanaf €595 setup plus €24,95 per maand.",
    serviceType: "Website and Conversational AI for Automotive Businesses",
    url: `${siteConfig.url}/branches/autobedrijven`,
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
            { name: "Rekenvoorbeeld", href: "#rekenvoorbeeld" },
            { name: "Prijzen", href: "#prijzen" },
            { name: "FAQ", href: "#faq" },
          ]}
        />

        {/* Hero */}
        <section className="pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-14">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted/60 border border-border/60 px-4 py-1.5 text-xs sm:text-sm text-muted-foreground mb-6">
              <CalendarCheck className="h-3.5 w-3.5 text-primary" />
              Voor garages en bandenbedrijven
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-5">
              Een website en WhatsApp-agent
              <span className="block text-primary mt-1">voor je autobedrijf</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Klanten zoeken een garage op hun telefoon en appen liever dan dat ze bellen.
              Wij bouwen een site waarmee je gevonden wordt en een agent op WhatsApp die
              APK- en onderhoudsafspraken inplant, ook als jij onder een auto ligt. Live
              binnen <strong className="font-semibold text-foreground">5 dagen</strong>.
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
          </div>
        </section>

        {/* Wat het doet */}
        <section id="wat-het-doet" className="py-12 sm:py-16 md:py-20 border-t border-border/50 surface-warm">
          <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Wat het voor je garage doet
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Twee dingen: nieuwe klanten vinden je, en bestaande klanten plannen zonder
                dat jij de telefoon hoeft op te nemen.
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

        {/* Taken */}
        <section className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Wat de agent afhandelt
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Het werk dat elke garage kent en dat nu via de telefoon loopt.
            </p>
            <ul className="space-y-2.5">
              {tasks.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/80">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Rekenvoorbeeld */}
        <section id="rekenvoorbeeld" className="py-12 sm:py-16 md:py-20 border-t border-border/50 surface-warm">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Een rekenvoorbeeld
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Stel: je mist per week vier telefoontjes omdat je aan een auto werkt, en de
              helft van die bellers gaat naar de volgende garage in de zoekresultaten. Met
              een gemiddelde werkorder van €250 is dat €500 per week, ruim €2.000 per maand.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Het MKB-pakket kost €149,95 per maand. Eén extra werkorder per maand dekt het
              al. Jouw eigen getallen rekenen we in de intake samen door.
            </p>
          </div>
        </section>

        {/* Prijzen */}
        <section id="prijzen" className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Wat het kost
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
              Eenmalige setup, daarna een vast maandbedrag. Maandelijks opzegbaar.
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
                  {["Website van 1 tot 5 pagina's", "Agent die vragen beantwoordt", "Doorschakeling naar jou", "Hosting en onderhoud inbegrepen"].map((i) => (
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
                  {["Alles uit ZZP, plus:", "APK en onderhoud inplannen", "Herinneringen voor de afspraak", "Koppeling met je agenda"].map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-xs text-muted-foreground/80 leading-relaxed">
              Alle prijzen zijn exclusief btw. Kosten van de WhatsApp Business API lopen via
              de provider en rekenen we door zonder marge. Meer over{" "}
              <a href="/diensten/whatsapp-ai-agent/" className="underline underline-offset-2">de WhatsApp-agent</a>{" "}
              en{" "}
              <a href="/diensten/website-laten-maken/" className="underline underline-offset-2">websites</a>.
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
              Benieuwd wat het voor jouw garage doet?
            </h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Plan een gratis intake van 30 minuten. We kijken hoe klanten je nu bereiken en
              rekenen door wat het oplevert. Geen verkooppraat.
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
              Impulso Co. · websites en WhatsApp-agents voor garages ·{" "}
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
