import { generateMetadata as genMeta } from "@/lib/metadata";
import { faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import StickyIntakeCTA from "@/components/sticky-intake-cta";
import FaqAccordion from "@/components/faq-accordion";
import { DashboardMockup } from "@/components/illustrations/dashboard-mockup";
import { ResponsiveIllustration } from "@/components/illustrations/website-illustrations";
import {
  ArrowRight,
  Code2,
  Server,
  Layout,
  Database,
  Plug,
  GaugeCircle,
  CheckCircle,
} from "lucide-react";

export const metadata = genMeta({
  title: "Software op Maat, Webapplicaties, Backend en Frontend",
  description:
    "Maatwerk software laten bouwen: webapplicaties, dashboards, API's, backend-systemen en frontends. Voor bedrijven in heel Nederland. Vaste prijs vooraf, code in je eigen beheer.",
  keywords:
    "software op maat, maatwerk software laten maken, webapplicatie laten bouwen, backend ontwikkelaar inhuren, frontend development, API koppeling laten maken, dashboard laten bouwen, systeem koppelen, software ontwikkelaar Nederland, maatwerk applicatie",
  pathname: "/diensten/software-op-maat",
  locale: "nl_NL",
});

const faqItems = [
  {
    question: "Wat kost maatwerk software?",
    answer:
      "Een afgebakend project ligt doorgaans tussen €5.000 en €15.000, afhankelijk van het aantal schermen, de koppelingen en hoeveel logica erin zit. Grotere trajecten met on-premise eisen of meerdere systemen starten met een betaalde discovery van €1.500 tot €3.000, zodat we de architectuur goed doordenken voor we code schrijven. Je krijgt altijd een vaste prijs vooraf, geen open nacalculatie.",
  },
  {
    question: "Wat bouwen jullie precies?",
    answer:
      "Webapplicaties en klantportalen, interne dashboards, API's en koppelingen tussen systemen, backend-services, en frontends bovenop een bestaande backend. Vaak is het een combinatie: een portaal voor je klanten met een backend die aan je bestaande administratie hangt.",
  },
  {
    question: "Kunnen jullie koppelen met de software die we al gebruiken?",
    answer:
      "Ja, dat is meestal juist de kern van de opdracht. We koppelen met Exact Online, HubSpot, Salesforce, Shopify, Zendesk, Moneybird, Microsoft 365 en Google Workspace. Heeft je systeem een API of database, dan koppelen we daarop. Zo niet, dan kijken we naar import- en exportbestanden of een tussenlaag.",
  },
  {
    question: "Van wie is de code?",
    answer:
      "Van jou. Bij maatwerkprojecten lever je de volledige broncode op in je eigen repository, met documentatie. Geen vendor lock-in en geen maandelijkse licentie aan ons. Wil je onderhoud bij ons afnemen, dan kan dat, maar het hoeft niet.",
  },
  {
    question: "Hoe lang duurt een project?",
    answer:
      "Een afgebakende applicatie staat doorgaans binnen 2 tot 6 weken live, afhankelijk van de omvang. We werken in korte sprints en leveren elke week iets werkends op, zodat je niet zes weken in het donker zit en pas aan het eind ziet wat het geworden is.",
  },
  {
    question: "Welke technologie gebruiken jullie?",
    answer:
      "Voor de frontend React, Next.js en TypeScript. Voor de backend Node.js, Laravel of Python, afhankelijk van wat past bij je bestaande landschap. Databases in PostgreSQL of MySQL. We kiezen bewust voor gangbare technologie, zodat elke andere ontwikkelaar het later kan overnemen.",
  },
  {
    question: "Kunnen jullie AI in onze bestaande software bouwen?",
    answer:
      "Ja, dat is waar we vaak beginnen. Een bestaand systeem uitbreiden met een AI-functie is meestal goedkoper en sneller dan alles vervangen. Denk aan documenten automatisch laten classificeren, een zoekfunctie op je eigen kennisbank, of een agent die taken uitvoert in je backend.",
  },
  {
    question: "Werken jullie ook buiten Amsterdam?",
    answer:
      "Ja, door heel Nederland en België. Het werk gebeurt remote, met vaste momenten om af te stemmen. Voor grotere trajecten komen we op locatie langs voor de kick-off en de oplevering.",
  },
];

const buildTypes = [
  {
    icon: Layout,
    title: "Webapplicaties en portalen",
    text: "Klantportalen, boekingssystemen, interne tools. Alles wat je in een browser wilt gebruiken.",
  },
  {
    icon: Server,
    title: "Backend en API's",
    text: "Services die het zware werk doen, met een nette API erop zodat andere systemen erbij kunnen.",
  },
  {
    icon: Code2,
    title: "Frontend development",
    text: "Een snelle, toegankelijke interface op je bestaande backend. React, Next.js, TypeScript.",
  },
  {
    icon: Plug,
    title: "Koppelingen tussen systemen",
    text: "Je administratie, CRM en webshop laten praten, zodat niemand meer data overtypt.",
  },
  {
    icon: Database,
    title: "Dashboards en rapportage",
    text: "Je cijfers uit verschillende bronnen bij elkaar, live, in plaats van in een maandelijkse export.",
  },
  {
    icon: GaugeCircle,
    title: "Bestaande software verbeteren",
    text: "Traag, verouderd of niet meer te onderhouden? We knappen op of bouwen gericht opnieuw.",
  },
];

const steps = [
  {
    number: "01",
    title: "Intake en scope",
    text: "We brengen in kaart wat het moet doen en waar het aan raakt. Je krijgt een vaste prijs en een planning.",
  },
  {
    number: "02",
    title: "Ontwerp en architectuur",
    text: "Schermen en datamodel op tafel voor we bouwen, zodat je weet wat je krijgt.",
  },
  {
    number: "03",
    title: "Bouwen in sprints",
    text: "Elke week iets werkends om te bekijken. Bijsturen kan onderweg, niet pas aan het eind.",
  },
  {
    number: "04",
    title: "Live en overdracht",
    text: "Uitrol, documentatie en de code in je eigen beheer. Onderhoud bij ons is optioneel.",
  },
];

export default function SoftwareOpMaatPage() {
  const faqSchemaData = faqSchema({ items: faqItems });

  const breadcrumbData = breadcrumbSchema({
    items: [
      { position: 1, name: "Home", item: siteConfig.url },
      { position: 2, name: "Diensten", item: `${siteConfig.url}/diensten/software-op-maat` },
      {
        position: 3,
        name: "Software op Maat",
        item: `${siteConfig.url}/diensten/software-op-maat`,
      },
    ],
  });

  const serviceSchemaData = serviceSchema({
    name: "Software op Maat",
    description:
      "Maatwerk softwareontwikkeling voor bedrijven in heel Nederland: webapplicaties, dashboards, API's, backend-systemen en frontends, inclusief koppelingen met bestaande software.",
    serviceType: "Custom Software Development",
    url: `${siteConfig.url}/diensten/software-op-maat`,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaData) }} />

      <main className="min-h-screen bg-background">
        <Navbar
          customNavLinks={[
            { name: "Wat we bouwen", href: "#wat-we-bouwen" },
            { name: "Techniek", href: "#techniek" },
            { name: "Proces", href: "#proces" },
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
                  <Code2 className="h-3.5 w-3.5 text-primary" />
                  Maatwerk software, heel Nederland
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-5">
                  Software op maat
                  <span className="block text-primary mt-1">die past bij hoe jij werkt</span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                  Webapplicaties, dashboards, API's en backend-systemen. Gebouwd rond je
                  bestaande processen in plaats van andersom, en gekoppeld aan de software
                  die je al gebruikt. Vaste prijs vooraf, code in je eigen beheer.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://calendly.com/omarnassar1127/30min"
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
                    Bespreek je project
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Vaste prijs vooraf
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Je bent eigenaar van de code
                  </span>
                </div>
              </div>
              <DashboardMockup />
            </div>
          </div>
        </section>

        {/* Wat we bouwen */}
        <section id="wat-we-bouwen" className="py-12 sm:py-16 md:py-20 border-t border-border/50 surface-warm">
          <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Wat we bouwen
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Van een enkele koppeling tot een compleet systeem. Meestal begint het bij
                iets dat nu handmatig gaat en te veel tijd kost.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {buildTypes.map((item) => {
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

        {/* Techniek */}
        <section id="techniek" className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <ResponsiveIllustration className="w-full h-auto lg:order-2" />
              <div className="lg:order-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Gangbare techniek, geen exotische keuzes
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  We bouwen met technologie die breed gedragen wordt, zodat elke andere
                  ontwikkelaar het later kan overnemen. Je zit nooit vast aan ons omdat
                  niemand anders je systeem snapt.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React", "Next.js", "TypeScript", "Node.js", "Laravel", "Python", "PostgreSQL", "MySQL", "REST & webhooks"].map((t) => (
                    <span key={t} className="rounded-lg border border-foreground/15 bg-card px-3 py-1.5 text-xs font-medium text-foreground/75">
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Koppelt met Exact Online, HubSpot, Shopify, Zendesk en meer",
                    "AVG-proof, met EU-hosting of on-premise waar dat moet",
                    "Documentatie en broncode in je eigen repository",
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

        {/* Proces */}
        <section id="proces" className="py-12 sm:py-16 md:py-20 border-t border-border/50 surface-warm">
          <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Hoe we werken
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Elke week iets werkends te zien. Geen traject waarbij je pas na maanden
                ontdekt dat het net niet is wat je bedoelde.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {steps.map((step) => (
                <div key={step.number} className="rounded-2xl border border-foreground/15 bg-card shadow-sm p-5 sm:p-6">
                  <span className="text-xs font-semibold tracking-[0.2em] text-primary">{step.number}</span>
                  <h3 className="mt-3 mb-2 font-bold text-foreground text-sm sm:text-base">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
              ))}
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
              Maatwerk rekenen we per project af, met een vaste prijs vooraf. Zoek je een
              website met een AI-agent erop, dan werken we met vaste pakketten vanaf €595
              setup plus €24,95 per maand. Bekijk{" "}
              <a href="/diensten/website-laten-maken" className="font-semibold text-primary hover:underline">
                website laten maken
              </a>
              .
            </p>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="rounded-2xl border border-foreground/15 bg-card shadow-sm p-6">
                <h3 className="text-base font-extrabold tracking-tight text-foreground mb-2">Afgebakend project</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold tracking-tight text-foreground">€5.000</span>
                  <span className="text-sm text-muted-foreground"> tot €15.000</span>
                  <p className="text-sm text-muted-foreground mt-1">Vaste prijs, 2 tot 6 weken</p>
                </div>
                <ul className="space-y-2.5">
                  {["Webapplicatie, dashboard of koppeling", "Ontwerp, bouw en oplevering", "Broncode in je eigen beheer", "30 dagen support na livegang"].map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-foreground/15 bg-card shadow-sm p-6">
                <h3 className="text-base font-extrabold tracking-tight text-foreground mb-2">Groter traject</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold tracking-tight text-foreground">Vanaf €15.000</span>
                  <p className="text-sm text-muted-foreground mt-1">Start met discovery van €1.500 tot €3.000</p>
                </div>
                <ul className="space-y-2.5">
                  {["Meerdere systemen of locaties", "On-premise of strikte compliance", "Architectuur eerst, dan bouwen", "SLA en doorlopend onderhoud"].map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-xs text-muted-foreground/80 leading-relaxed">
              Alle prijzen zijn exclusief btw. Bij technisch innovatieve projecten kun je
              vaak 35% van de loonkosten terugkrijgen via de WBSO; we helpen met de aanvraag.
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
              Een idee dat gebouwd moet worden?
            </h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Plan een gratis intake van 30 minuten. We denken mee over de scope en
              vertellen eerlijk wat het kost en wat het niet moet worden.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://calendly.com/omarnassar1127/30min"
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
              Impulso Co. · Software op maat · heel Nederland ·{" "}
              <a href="tel:+31640495527" className="hover:text-foreground transition-colors">
                +31 6 40 49 55 27
              </a>
            </p>
          </div>
        </section>

        <Footer />
        <StickyIntakeCTA />
      </main>
    </>
  );
}
