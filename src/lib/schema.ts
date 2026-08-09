import { siteConfig } from "./config";

type OrganizationProps = {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
};

type WebsiteProps = {
  url?: string;
  name?: string;
  description?: string;
  language?: string;
};

type BreadcrumbItemProps = {
  position: number;
  name: string;
  item: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItemProps[];
};

type BlogPostProps = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
  authorUrl?: string;
  image?: string;
  url: string;
};

type ProductProps = {
  name: string;
  description: string;
  image: string;
  url: string;
  price?: string;
  priceCurrency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  sku?: string;
  brand?: string;
  reviewCount?: number;
  reviewRating?: number;
};

type FAQItemProps = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItemProps[];
};

type TestimonialProps = {
  author: string;
  role: string;
  text: string;
  organization?: string;
};

type TestimonialsProps = {
  items: TestimonialProps[];
};

type AutomationAchievementProps = {
  totalAutomations: number;
  aiAutomationPercentage: number;
  industriesServed: number;
  uptime: number;
};

export const servicesSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Service",
        name: "AI Agent Development",
        description:
          "Custom AI agent teams built for your business, handling tasks autonomously, collaborating with each other, and integrating with your existing tools.",
        provider: {
          "@type": "Organization",
          name: "Impulso Co.",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "Sales Automation",
        description:
          "AI agents that qualify leads, follow up prospects, and manage your sales pipeline 24/7, so your team closes more deals with less effort.",
        provider: {
          "@type": "Organization",
          name: "Impulso Co.",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "Customer Service Automation",
        description:
          "AI agents that handle customer inquiries, resolve common issues, and escalate edge cases, delivering instant, consistent support around the clock.",
        provider: {
          "@type": "Organization",
          name: "Impulso Co.",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "Knowledge Base Systems",
        description:
          "AI-powered knowledge management agents that capture, organise and surface institutional knowledge, making information instantly accessible across your team.",
        provider: {
          "@type": "Organization",
          name: "Impulso Co.",
          url: siteConfig.url,
        },
      },
      {
        "@type": "Service",
        name: "Operations Automation",
        description:
          "AI agents that automate repetitive back-office processes, from data entry and reporting to scheduling and workflow coordination.",
        provider: {
          "@type": "Organization",
          name: "Impulso Co.",
          url: siteConfig.url,
        },
      },
    ],
  };
};

type ServicePageProps = {
  name: string;
  description: string;
  url: string;
  serviceType: string;
};

export function serviceSchema({ name, description, url, serviceType }: ServicePageProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url,
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: [
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Place", name: "Europe" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      availableLanguage: ["nl", "en"],
    },
  };
}

export function videoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "AI Agent Demo",
    "description": "Watch our intelligent AI agent in action. This is one of our many AI solutions that can be customized for your specific business needs and industry.",
    "thumbnailUrl": `${siteConfig.url}/demo-vid-thumbnail.jpg`,
    "uploadDate": "2024-05-01T08:00:00+08:00",
    "duration": "PT1M",
    "contentUrl": `${siteConfig.url}/demo-vid.mp4`,
    "embedUrl": `${siteConfig.url}/#demo`,
    "potentialAction": {
      "@type": "SeekToAction",
      "target": `${siteConfig.url}/#demo{seek_to_second_number}`,
      "startOffset-input": "required name=seek_to_second_number"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Impulso Co.",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}${siteConfig.logoUrl}`,
        "width": "96",
        "height": "96"
      }
    }
  };
}

export function organizationSchema({
  name = siteConfig.name,
  url = siteConfig.url,
  logo = `${siteConfig.url}${siteConfig.logoUrl}`,
  description = siteConfig.description,
  // sameAs must only list profiles that actually exist: pointing Google at a
  // dead URL weakens the entity match instead of strengthening it.
  sameAs = [siteConfig.socials.linkedin],
}: OrganizationProps = {}) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${url}#organization`,
    name,
    legalName: "Impulso Co.",
    url,
    logo: {
      "@type": "ImageObject",
      url: logo,
    },
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description,
    slogan: "Wij creëren structuur in chaos.",
    foundingDate: "2025",
    sameAs,
    knowsAbout: [
      "AI agents",
      "Custom AI agent development",
      "RAG (Retrieval Augmented Generation)",
      "LLM integration",
      "WhatsApp AI agents",
      "Voice AI agents",
      "Customer service automation",
      "Sales automation",
      "Business process automation",
      "On-premise AI",
      "Knowledge base systems",
    ],
    knowsLanguage: ["nl", "en", "ar", "es", "fr"],
    areaServed: [
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Place", name: "Europe" },
    ],
    priceRange: "€€",
    founder: [
      { "@type": "Person", name: "Omar Nassar", jobTitle: "Co-founder" },
      { "@type": "Person", name: "Pieter de Haer", jobTitle: "Co-founder" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amsterdam",
      addressRegion: "Noord-Holland",
      addressCountry: "NL",
    },
    // Coordinates and a top-level phone give Google a hard geographic signal.
    // There is an unrelated "Impulso Co." in Tijuana, Mexico; the more precise
    // and consistent our NL location data is, the easier it is for Google to
    // treat the two as separate entities.
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.3676,
      longitude: 4.9041,
    },
    // No telephone on purpose: the only number we had was a private mobile and
    // prospects go through the chat agent or email instead. GeoCoordinates plus
    // the address still carry the local signal that disambiguates us from the
    // unrelated "Impulso Co." in Tijuana.
    email: "info@impulsoco.nl",
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@impulsoco.nl",
      contactType: "sales",
      areaServed: ["NL", "EU"],
      availableLanguage: ["nl", "en"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Agent Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Agent Laten Bouwen", url: `${url}/diensten/ai-agent-bouwen` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digitale Medewerker", url: `${url}/diensten/digitale-medewerker` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automatisering voor MKB", url: `${url}/diensten/ai-automatisering-mkb` } },
      ],
    },
  };
}

export function websiteSchema({
  url = siteConfig.url,
  name = siteConfig.name,
  description = siteConfig.description,
  language = "nl-NL",
}: WebsiteProps = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}#website`,
    url,
    name,
    description,
    inLanguage: language,
    publisher: { "@id": `${url}#organization` },
  };
}

export function breadcrumbSchema({ items }: BreadcrumbProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ position, name, item }) => ({
      "@type": "ListItem",
      position,
      name,
      item,
    })),
  };
}

export function blogPostSchema({
  title,
  description,
  publishedAt,
  updatedAt,
  authorName,
  authorUrl = `${siteConfig.url}/about`,
  image = `${siteConfig.url}/og-image.png`,
  url,
}: BlogPostProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image,
    url,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Impulso Co.",
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logoUrl}`,
      },
    },
    inLanguage: "nl-NL",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function productSchema({
  name,
  description,
  image,
  url,
  price,
  priceCurrency = "EUR",
  availability = "InStock",
  sku,
  brand = "Impulso Co.",
  reviewCount,
  reviewRating,
}: ProductProps) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      url,
      availability: `https://schema.org/${availability}`,
      priceCurrency,
    },
  };

  if (price) {
    schema.offers.price = price;
  }

  if (reviewCount && reviewRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviewRating,
      reviewCount,
    };
  }

  return schema;
}

export function faqSchema({ items }: FAQProps) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function testimonialsSchema({ items }: TestimonialsProps) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: item.author,
          jobTitle: item.role,
        },
        reviewBody: item.text,
        itemReviewed: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          description: "AI agency that builds custom AI agent teams for businesses, based in Amsterdam, Netherlands.",
          address: {
            "@type": "PostalAddress",
            addressCountry: "NL",
            addressLocality: "Amsterdam",
          },
        },
        reviewRating: {
          "@type": "Rating",
          bestRating: "5",
          ratingValue: "5",
          worstRating: "1",
        },
        datePublished: new Date().toISOString(),
      },
    })),
  };
}

export function certificationsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Team Certifications",
    description: "Professional AI and cloud certifications held by the Impulso Co. team",
    numberOfItems: 19,
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@type": "EducationalOccupationalCredential", name: "Model Context Protocol: Advanced Topics", credentialCategory: "AI Agent Development", recognizedBy: { "@type": "Organization", name: "Anthropic" } } },
      { "@type": "ListItem", position: 2, item: { "@type": "EducationalOccupationalCredential", name: "Certificate of Completion: Agent Skills", credentialCategory: "Autonomous AI Agents", recognizedBy: { "@type": "Organization", name: "Anthropic" } } },
      { "@type": "ListItem", position: 3, item: { "@type": "EducationalOccupationalCredential", name: "Claude Code in Action", credentialCategory: "AI-Powered Development", recognizedBy: { "@type": "Organization", name: "Anthropic" } } },
      { "@type": "ListItem", position: 4, item: { "@type": "EducationalOccupationalCredential", name: "Gemini Multimodality and Multimodal RAG", credentialCategory: "Retrieval Augmented Generation", recognizedBy: { "@type": "Organization", name: "Google" } } },
      { "@type": "ListItem", position: 5, item: { "@type": "EducationalOccupationalCredential", name: "Prompt Design in Vertex AI", credentialCategory: "Prompt Engineering", recognizedBy: { "@type": "Organization", name: "Google" } } },
      { "@type": "ListItem", position: 6, item: { "@type": "EducationalOccupationalCredential", name: "MLOps for Generative AI", credentialCategory: "Machine Learning Operations", recognizedBy: { "@type": "Organization", name: "Google" } } },
      { "@type": "ListItem", position: 7, item: { "@type": "EducationalOccupationalCredential", name: "Advanced: Generative AI for Developers", credentialCategory: "Generative AI", recognizedBy: { "@type": "Organization", name: "Google" } } },
      { "@type": "ListItem", position: 8, item: { "@type": "EducationalOccupationalCredential", name: "Building AI Agents with Vertex AI and LangChain", credentialCategory: "AI Agent Development", recognizedBy: { "@type": "Organization", name: "Google" } } },
      { "@type": "ListItem", position: 9, item: { "@type": "EducationalOccupationalCredential", name: "Multi-Agent Systems with Vertex AI", credentialCategory: "Multi-Agent Orchestration", recognizedBy: { "@type": "Organization", name: "Google" } } },
      { "@type": "ListItem", position: 10, item: { "@type": "EducationalOccupationalCredential", name: "Azure AI Fundamentals (AI-900)", credentialCategory: "Azure AI", recognizedBy: { "@type": "Organization", name: "Microsoft" } } },
      { "@type": "ListItem", position: 11, item: { "@type": "EducationalOccupationalCredential", name: "Azure Data Fundamentals (DP-900)", credentialCategory: "Azure Data", recognizedBy: { "@type": "Organization", name: "Microsoft" } } },
      { "@type": "ListItem", position: 12, item: { "@type": "EducationalOccupationalCredential", name: "Azure AI Engineer Associate (AI-102)", credentialCategory: "Azure AI Engineering", recognizedBy: { "@type": "Organization", name: "Microsoft" } } },
      { "@type": "ListItem", position: 13, item: { "@type": "EducationalOccupationalCredential", name: "Azure Solutions Architect Expert (AZ-305)", credentialCategory: "Cloud Architecture", recognizedBy: { "@type": "Organization", name: "Microsoft" } } },
      { "@type": "ListItem", position: 14, item: { "@type": "EducationalOccupationalCredential", name: "Develop AI Agents using Azure OpenAI and Semantic Kernel", credentialCategory: "AI Agent Development", recognizedBy: { "@type": "Organization", name: "Microsoft" } } },
      { "@type": "ListItem", position: 15, item: { "@type": "EducationalOccupationalCredential", name: "Build Copilot AI Agents with Azure AI Studio", credentialCategory: "Copilot Development", recognizedBy: { "@type": "Organization", name: "Microsoft" } } },
      { "@type": "ListItem", position: 16, item: { "@type": "EducationalOccupationalCredential", name: "OCI Generative AI Professional", credentialCategory: "Cloud AI Deployment", recognizedBy: { "@type": "Organization", name: "Oracle" } } },
    ],
  };
}
