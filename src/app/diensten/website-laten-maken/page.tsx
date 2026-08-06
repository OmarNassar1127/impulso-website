import { generateMetadata as genMeta } from "@/lib/metadata";
import { faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import StickyIntakeCTA from "@/components/sticky-intake-cta";
import {
  NewWebsiteIllustration,
  RedesignIllustration,
  ResponsiveIllustration,
  AgentOnSiteIllustration,
} from "@/components/illustrations/website-illustrations";
import {
  ArrowRight,
  Globe,
  Sparkles,
  Smartphone,
  Search,
  ShieldCheck,
  Languages,
  CheckCircle,
} from "lucide-react";

export const metadata = genMeta({
  title: "Website Laten Maken, Nieuw of Bestaande Site Vernieuwen",
  description:
    "Website laten maken door Impulso Co. in Amsterdam. Nieuw vanaf nul of je bestaande site vernieuwen, op maat ontworpen, met AI-agent erop. Live in 2 weken, vanaf €595 setup + €24,95 per maand.",
  keywords:
    "website laten maken, website laten bouwen, website laten maken kosten, nieuwe website, website vernieuwen, website redesign, webdesign Amsterdam, website ZZP, website MKB, website met AI chatbot, website onderhoud, responsive website laten maken",
  pathname: "/diensten/website-laten-maken",
  locale: "nl_NL",
});

const faqItems = [
  {
    question: "Wat kost het om een website te laten maken?",
    answer:
      "Je start vanaf €595 eenmalige setup plus €24,95 per maand (ZZP-pakket): een op maat ontworpen site van 1 tot 5 pagina's met een AI-agent erop. Voor grotere bedrijven is dat €1.395 setup plus €149,95 per maand (MKB-pakket) met CMS, tot 12 pagina's en koppelingen. Het maandbedrag dekt hosting, updates, security, backups en support. Je krijgt altijd eerst een vrijblijvende offerte op maat.",
  },
  {
    question: "Kunnen jullie ook mijn bestaande website verbeteren?",
    answer:
      "Ja. We kijken eerst naar wat er staat: design, snelheid, vindbaarheid en of de site converteert. Daarna kiezen we samen of we de huidige site opknappen of beter opnieuw opbouwen. Bestaat je site uit WordPress, Wix of Squarespace? Dan kunnen we die overnemen en verbeteren, of migreren naar onze eigen snelle setup.",
  },
  {
    question: "Hoe lang duurt het voordat mijn website live staat?",
    answer:
      "Na de intake heb je binnen 1 week een eerste ontwerp om op te reageren. Gemiddeld staat je site binnen 2 weken live. Grotere sites met CMS en koppelingen duren 3 tot 4 weken.",
  },
  {
    question: "Gebruiken jullie een template?",
    answer:
      "Nee. Elke site wordt op maat ontworpen in jouw huisstijl. Geen standaard thema waar duizend andere bedrijven ook op zitten. Wel bouwen we op een beproefd technisch fundament, zodat de site snel is en goed scoort in Google.",
  },
  {
    question: "Kan ik zelf teksten en fotos aanpassen?",
    answer:
      "In het MKB-pakket zit een CMS waarmee je zelf je content beheert. Bij het ZZP-pakket doen wij de aanpassingen voor je: 1 uur per maand zit inbegrepen, bij MKB is dat 3 uur per maand.",
  },
  {
    question: "Zit er ook een AI-agent op de website?",
    answer:
      "Ja, dat is precies het verschil met een gewone webbouwer. Standaard krijg je een AI-agent die bezoekersvragen beantwoordt op basis van jouw bedrijfsinfo en via WhatsApp bereikbaar is. Wil je meer, bijvoorbeeld een agent die afspraken inplant of leads kwalificeert, dan bouwen we dat erbij.",
  },
  {
    question: "Wordt mijn website goed gevonden in Google?",
    answer:
      "Elke site leveren we technisch SEO-proof op: snelle laadtijden, nette structuur, meta-teksten, sitemap en structured data. Daarnaast maken we je vindbaar voor AI-zoekmachines zoals ChatGPT en Perplexity, want daar zoeken steeds meer klanten.",
  },
  {
    question: "Van wie is de website als ik stop?",
    answer:
      "De inhoud en je domeinnaam zijn en blijven van jou. Zeg je het abonnement op, dan stopt het onderhoud en de hosting via ons; support op het product loopt daarna tegen €75 per uur. We denken netjes mee bij een overdracht.",
  },
];

const deliverables = [
  {
    icon: Globe,
    title: "Op maat ontworpen",
    text: "Geen template. Je site wordt ontworpen in jouw huisstijl, met je eigen kleuren, beeld en toon.",
  },
  {
    icon: Smartphone,
    title: "Werkt op elk scherm",
    text: "Mobiel eerst gebouwd. Op telefoon, tablet en desktop even scherp en even snel.",
  },
  {
    icon: Sparkles,
    title: "AI-agent inbegrepen",
    text: "Een agent die vragen van bezoekers beantwoordt, getraind op jouw bedrijfsinformatie.",
  },
  {
    icon: Search,
    title: "Vindbaar in Google en AI",
    text: "Technisch SEO-proof opgeleverd, plus zichtbaar voor ChatGPT, Perplexity en Gemini.",
  },
  {
    icon: Languages,
    title: "Nederlands en Engels",
    text: "Standaard tweetalig op te leveren, zodat je ook buitenlandse klanten bedient.",
  },
  {
    icon: ShieldCheck,
    title: "Onderhoud geregeld",
    text: "Hosting, updates, security en backups zitten in je maandbedrag. Jij hebt er geen omkijken naar.",
  },
];

const steps = [
  {
    number: "01",
    title: "Intake van 30 minuten",
    text: "We bespreken wat je doet, wie je klanten zijn en wat de site moet opleveren. Daarna krijg je een vrijblijvende offerte op maat.",
  },
  {
    number: "02",
    title: "Ontwerp in week 1",
    text: "Je krijgt een eerste ontwerp te zien van je echte site, niet een schets. Feedback verwerken we direct.",
  },
  {
    number: "03",
    title: "Bouwen en vullen",
    text: "Wij bouwen, zetten je teksten en beeld erin en trainen de AI-agent op jouw bedrijfsinformatie.",
  },
  {
    number: "04",
    title: "Live in week 2",
    text: "Domein koppelen, meten inrichten en online. Daarna houden wij de site bij en ben je vrij om maandelijks op te zeggen.",
  },
];

const tiers = [
  {
    name: "ZZP",
    price: "€595",
    monthly: "€24,95",
    popular: true,
    text: "Voor zelfstandigen en eenmanszaken die online zichtbaar willen zijn.",
    items: [
      "1 tot 5 pagina's, op maat ontworpen",
      "AI-agent op je site, getraind op je bedrijfsinfo",
      "Hosting, updates, security en backups",
      "1 uur per maand aanpassingen",
    ],
  },
  {
    name: "MKB",
    price: "€1.395",
    monthly: "€149,95",
    popular: false,
    text: "Voor groeiende bedrijven die klantcontact willen automatiseren.",
    items: [
      "Tot 12 pagina's met CMS, beheer zelf je content",
      "Slimme AI-agent met leadkwalificatie en WhatsApp",
      "Koppeling met je CRM en agenda",
      "3 uur per maand aanpassingen",
    ],
  },
  {
    name: "Op maat",
    price: "Prijs in overleg",
    monthly: "",
    popular: false,
    text: "Voor specifieke wensen, maatwerk-integraties of meer volume.",
    items: [
      "Onbeperkt pagina's en agents",
      "Maatwerk-integraties en koppelingen",
      "SLA en dedicated support",
    ],
  },
];

export default function WebsiteLatenMakenPage() {
  const faqSchemaData = faqSchema({ items: faqItems });

  const breadcrumbData = breadcrumbSchema({
    items: [
      { position: 1, name: "Home", item: siteConfig.url },
      { position: 2, name: "Diensten", item: `${siteConfig.url}/diensten/website-laten-maken` },
      {
        position: 3,
        name: "Website Laten Maken",
        item: `${siteConfig.url}/diensten/website-laten-maken`,
      },
    ],
  });

  const serviceSchemaData = serviceSchema({
    name: "Website Laten Maken",
    description:
      "Websites op maat voor ZZP en MKB, nieuw gebouwd of een bestaande site vernieuwd, inclusief AI-agent, hosting en onderhoud. Live in 2 weken, vanaf €595 setup plus €24,95 per maand.",
    serviceType: "Web Design and Development",
    url: `${siteConfig.url}/diensten/website-laten-maken`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaData) }}
      />

      <main className="min-h-screen bg-background">
        <Navbar
          customNavLinks={[
            { name: "Nieuw of vernieuwen", href: "#twee-routes" },
            { name: "Wat je krijgt", href: "#wat-je-krijgt" },
            { name: "Proces", href: "#proces" },
            { name: "Prijzen", href: "#prijzen" },
            { name: "FAQ", href: "#faq" },
          ]}
        />

        {/* Hero */}
        <section className="pt-24 sm:pt-32 md:pt-40 pb-10 sm:pb-14">
          <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-muted/60 border border-border/60 px-4 py-1.5 text-xs sm:text-sm text-muted-foreground mb-6">
                  <Globe className="h-3.5 w-3.5 text-primary" />
                  Websites voor ZZP en MKB, Amsterdam
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-foreground mb-5">
                  Website laten maken
                  <span className="block text-primary mt-1">die ook echt werkt voor je</span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                  Nieuw vanaf nul, of je bestaande site vernieuwen. Op maat ontworpen,
                  snel, vindbaar in Google, en met een AI-agent die vragen van
                  bezoekers beantwoordt. Live in 2 weken, vanaf{" "}
                  <strong className="font-semibold text-foreground">€24,95 per maand</strong>.
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
                    Stel een vraag
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Geen template
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Live in 2 weken
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Maandelijks opzegbaar
                  </span>
                </div>
              </div>
              <NewWebsiteIllustration className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Twee routes */}
        <section id="twee-routes" className="py-12 sm:py-16 md:py-20 border-t border-border/50 surface-warm">
          <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nieuwe website of de huidige vernieuwen?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Allebei kan. In de intake kijken we samen wat slimmer is voor jouw
                situatie, en je krijgt altijd eerst een vrijblijvende offerte op maat.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
              <div className="rounded-2xl border border-foreground/15 bg-card shadow-sm p-6 sm:p-8">
                <NewWebsiteIllustration className="w-full h-auto mb-6" />
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                  Vanaf nul opgebouwd
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  Nog geen site, of iets dat allang niet meer klopt bij je bedrijf. We
                  beginnen bij je verhaal en je klant, en bouwen daaromheen een site die
                  klanten oplevert in plaats van alleen mooi staan.
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Structuur en teksten samen bepaald",
                    "Ontwerp in jouw huisstijl",
                    "Domein, e-mail en hosting geregeld",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-foreground/15 bg-card shadow-sm p-6 sm:p-8">
                <RedesignIllustration className="w-full h-auto mb-6" />
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                  Bestaande site vernieuwen
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  Je hebt al een site, maar hij is traag, gedateerd of levert niks op. We
                  kijken wat er staat en verbeteren gericht, of bouwen hem opnieuw op als
                  dat op termijn goedkoper is.
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Gratis check op snelheid, design en vindbaarheid",
                    "WordPress, Wix of Squarespace overnemen kan",
                    "Behoud je posities in Google bij migratie",
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

        {/* Wat je krijgt */}
        <section id="wat-je-krijgt" className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-10 sm:mb-14">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Wat je krijgt
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Eén vast pakket met alles erin. Geen losse facturen voor hosting,
                  updates of een SSL-certificaat achteraf.
                </p>
              </div>
              <ResponsiveIllustration className="w-full h-auto" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {deliverables.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-foreground/15 surface-warm p-5 sm:p-6"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
                    </div>
                    <h3 className="font-bold text-foreground text-sm sm:text-base mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Proces */}
        <section id="proces" className="py-12 sm:py-16 md:py-20 border-t border-border/50 surface-warm">
          <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Van idee tot live in 2 weken
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Geen traject van maanden. Je weet elke week waar we staan en wat er van
                jou nodig is.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-foreground/15 bg-card shadow-sm p-5 sm:p-6"
                >
                  <span className="text-xs font-semibold tracking-[0.2em] text-primary">
                    {step.number}
                  </span>
                  <h3 className="mt-3 mb-2 font-bold text-foreground text-sm sm:text-base">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI-agent erbij */}
        <section className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <AgentOnSiteIllustration className="w-full h-auto lg:order-2" />
              <div className="lg:order-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Een website die antwoord geeft
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                  Dit is waar wij verschillen van een gewone webbouwer. Op elke site zetten
                  we een AI-agent die getraind is op jouw bedrijfsinformatie. Die
                  beantwoordt vragen van bezoekers, ook buiten kantooruren, en stuurt
                  serieuze aanvragen door naar je mail of WhatsApp.
                </p>
                <ul className="space-y-2.5 mb-7">
                  {[
                    "Beantwoordt veelgestelde vragen in jouw toon",
                    "Vangt aanvragen op als je zelf aan het werk bent",
                    "Uit te breiden naar afspraken inplannen en leads kwalificeren",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="/diensten/ai-agent-bouwen"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Meer over AI-agents laten bouwen
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Prijzen */}
        <section id="prijzen" className="py-12 sm:py-16 md:py-20 border-t border-border/50 surface-warm">
          <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Wat kost een website?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Eenmalige setup kosten, daarna een vast maandbedrag. Altijd eerst een
                vrijblijvende offerte op maat, zodat je precies weet waar je aan toe bent.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-2xl border bg-card shadow-sm p-6 sm:p-7 ${
                    tier.popular ? "border-primary/50" : "border-foreground/15"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-extrabold tracking-tight text-foreground">
                      {tier.name}
                    </h3>
                    {tier.popular && (
                      <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-background">
                        Populair
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5 min-h-[2.5rem]">
                    {tier.text}
                  </p>
                  {tier.monthly ? (
                    <div className="mb-5">
                      <span className="text-3xl font-bold tracking-tight text-foreground">
                        {tier.monthly}
                      </span>
                      <span className="text-sm text-muted-foreground"> / maand</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        + {tier.price} setup, eenmalig
                      </p>
                    </div>
                  ) : (
                    <div className="mb-5">
                      <span className="text-2xl font-bold tracking-tight text-foreground">
                        {tier.price}
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Setup en maandbedrag op aanvraag
                      </p>
                    </div>
                  )}
                  <ul className="space-y-2.5">
                    {tier.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground/80 leading-relaxed max-w-3xl">
              Alle prijzen zijn exclusief btw. Maandprijzen zijn op basis van je eigen
              API-sleutels: het AI-verbruik wordt rechtstreeks door de provider
              gefactureerd, zonder opslag van ons.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-12 sm:py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 sm:px-8 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 sm:mb-10">
              Veelgestelde vragen
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl surface-warm border border-foreground/15 border-l-[3px] border-l-terracotta p-5 sm:p-6"
                >
                  <h3 className="font-bold text-foreground text-sm sm:text-base mb-2 sm:mb-3">
                    {item.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-border/50 surface-warm">
          <div className="container mx-auto px-6 sm:px-8 max-w-4xl py-12 sm:py-16 md:py-20 text-center">
            <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Benieuwd wat jouw site kan opleveren?
            </h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Plan een gratis intake van 30 minuten. We kijken naar je huidige site of je
              plannen, en je krijgt een eerlijke offerte op maat. Geen verkooppraat.
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
              Impulso Co. · Websites en AI-agents · Amsterdam ·{" "}
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
