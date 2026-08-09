import Link from "next/link";
import { ArrowRight, Bot, Globe, MessageSquare, Users, Code, Zap, Sparkles } from "lucide-react";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/schema";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import StickyIntakeCTA from "@/components/sticky-intake-cta";

export const metadata = genMeta({
  title: "Diensten, Websites, AI Agents en Software op Maat",
  description:
    "Alles wat Impulso Co. bouwt: websites, WhatsApp- en chat-agents, digitale medewerkers, AI-automatisering en software op maat. Vanaf €595 setup.",
  keywords:
    "diensten Impulso Co, AI bureau Amsterdam diensten, website laten maken, AI agent laten bouwen, WhatsApp AI agent, digitale medewerker, AI automatisering MKB, software op maat",
  pathname: "/diensten",
  locale: "nl_NL",
  type: "website",
});

const services = [
  {
    slug: "website-laten-maken",
    name: "Website laten maken",
    icon: Globe,
    tagline: "Nieuw vanaf nul of je bestaande site vernieuwd",
    description:
      "Een site die op maat is ontworpen, snel laadt en gevonden wordt. Inclusief hosting, updates en onderhoud, en desgewenst een agent erop.",
    price: "vanaf €595 setup + €24,95 p/m",
  },
  {
    slug: "whatsapp-ai-agent",
    name: "WhatsApp- en chat-agent",
    icon: MessageSquare,
    tagline: "Beantwoordt klantvragen en plant afspraken, 24/7",
    description:
      "Via de officiële WhatsApp Business API of als agent op je eigen site. Beantwoordt vragen, zet afspraken in de agenda en stuurt herinneringen.",
    price: "vanaf €595 setup + €24,95 p/m",
  },
  {
    slug: "ai-agent-bouwen",
    name: "AI agent laten bouwen",
    icon: Bot,
    tagline: "Maatwerk agents voor klantenservice, sales en administratie",
    description:
      "Van lead-kwalificatie tot offertes, facturatie en kennisbanken. Gekoppeld aan de systemen die je al gebruikt.",
    price: "op maat, vaste prijs vooraf",
  },
  {
    slug: "digitale-medewerker",
    name: "Digitale medewerker",
    icon: Users,
    tagline: "Meerdere agents die samen een hele rol invullen",
    description:
      "Werkt door waar losse tools stoppen: HR, finance, operations of klantenservice, end to end en zonder overdrachtsmomenten.",
    price: "op maat, vaste prijs vooraf",
  },
  {
    slug: "ai-automatisering-mkb",
    name: "AI-automatisering voor MKB",
    icon: Zap,
    tagline: "Betaalbaar beginnen, zonder eigen IT-afdeling",
    description:
      "Koppelingen met Exact Online, HubSpot, Shopify, Teams en meer. Vaak WBSO-subsidiabel tot ongeveer 35% van de ontwikkelkosten.",
    price: "vanaf €1.395 setup + €149,95 p/m",
  },
  {
    slug: "software-op-maat",
    name: "Software op maat",
    icon: Code,
    tagline: "Webapplicaties, dashboards, API's en backends",
    description:
      "Als een standaardpakket niet past. Vaste prijs vooraf, en de code blijft van jou: geen vendor lock-in.",
    price: "€5.000 tot €15.000 per project",
  },
];

export default function DienstenPage() {
  const breadcrumbData = breadcrumbSchema({
    items: [
      { position: 1, name: "Home", item: `${siteConfig.url}/` },
      { position: 2, name: "Diensten", item: `${siteConfig.url}/diensten/` },
    ],
  });

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}/diensten/#services`,
    name: "Diensten van Impulso Co.",
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: service.name,
      url: `${siteConfig.url}/diensten/${service.slug}/`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <main className="min-h-screen">
        <Navbar />

        {/* Hero */}
        <section className="pt-28 sm:pt-36 md:pt-44 pb-12 sm:pb-16 md:pb-20">
          <div className="container mx-auto px-6 sm:px-8 max-w-7xl">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-5 sm:mb-6">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Diensten
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 sm:mb-5">
                Wat we voor je bouwen
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Websites, AI-agents en maatwerk software voor ZZP&apos;ers, MKB en
                scale-ups. Alles wordt in Nederland gebouwd, je data blijft in de
                EU en je bent zelf eigenaar van je broncode.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 sm:px-8 max-w-7xl pb-12 sm:pb-20">
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/diensten/${service.slug}/`}
                  className="group flex flex-col rounded-2xl bg-muted/40 border border-border/60 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:bg-muted/60"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h2 className="mb-1.5 text-base sm:text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {service.name}
                  </h2>

                  <p className="mb-3 text-sm font-medium text-foreground/70">
                    {service.tagline}
                  </p>

                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <span className="mb-4 text-xs text-muted-foreground">
                    {service.price}
                  </span>

                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Bekijk deze dienst
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 sm:mt-20 rounded-2xl sm:rounded-3xl border border-border/60 bg-muted/40 shadow-sm px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">
                  Staat wat je zoekt er niet tussen?
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Dan kan het waarschijnlijk alsnog. Vertel wat je voor je ziet,
                  we denken gratis en vrijblijvend mee.
                </p>
              </div>
              <a
                href="https://calendly.com/omar-impulsoco/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98]"
              >
                Plan een gesprek
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <Footer />
        <StickyIntakeCTA />
      </main>
    </>
  );
}
