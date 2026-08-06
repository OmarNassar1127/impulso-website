import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // AI / LLM crawlers, explicitly welcomed for AI-search (GEO) visibility.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "DuckAssistBot", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "PetalBot", allow: "/" },
      { userAgent: "Diffbot", allow: "/" },
      { userAgent: "Kagibot", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
