import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { LanguageProvider } from "@/lib/i18n/language-context";

export const metadata: Metadata = {
  title: "Impulso Co. Custom AI Agents for Businesses",
  description:
    "Impulso Co. builds AI agents that collaborate, delegate and execute. From customer service to sales automation, live in 2 weeks. Based in Amsterdam.",
  keywords:
    "custom AI agents, AI agent development, digital employees, AI automation agency, RAG development, LLM integration, on-premise AI, customer service automation, sales automation, AI chatbot, WhatsApp bot, knowledge base AI, business process automation, Impulso Co. Amsterdam, Netherlands, Europe",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: `${siteConfig.url}/en`,
    languages: {
      nl: siteConfig.url,
      en: `${siteConfig.url}/en`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/en`,
    siteName: "Impulso Co.",
    title: "Impulso Co. Custom AI Agents for Businesses",
    description:
      "AI agents that collaborate, delegate and execute. From customer service to sales automation, live in 2 weeks.",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Impulso Co. Custom AI Agents for Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Impulso Co. Custom AI Agents",
    description: "AI agents that collaborate, delegate and execute, live in 2 weeks.",
    site: "@impulsoco",
    creator: "@impulsoco",
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LanguageProvider initialLanguage="en">{children}</LanguageProvider>;
}
