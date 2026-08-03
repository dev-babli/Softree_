import type { Metadata } from "next";
import NavigationServer from "@/components/sections/navigation-server";
import Footer from "@/components/sections/footer";
import ServicePageBreadcrumb from "@/components/services/ServicePageBreadcrumb";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { applyPageOg, SITE_URL } from "@/lib/site-metadata";
import AiHubContent from "./ai-hub-content";

const PAGE_PATH = "/ai";
const CANONICAL = `${SITE_URL}${PAGE_PATH}`;

const aiOfferings = [
  { name: "Agentic AI Development", url: `${SITE_URL}/services/offshore-ai-development` },
  { name: "Generative AI Development", url: `${SITE_URL}/services/generative-ai` },
  { name: "AI Test Automation", url: `${SITE_URL}/services/ai-powered-test-automation` },
  { name: "AI Case Studies", url: `${SITE_URL}/case-studies/ai` },
];

export const metadata: Metadata = applyPageOg(PAGE_PATH, {
  title: "AI Solutions | Agentic AI, Generative AI & Automation | Softree Technology",
  description:
    "Explore Softree's AI solutions — agentic AI agents, generative copilots, intelligent automation, and AI-powered test engineering for enterprise teams.",
  keywords: [
    "Softree AI solutions",
    "enterprise AI development",
    "agentic AI services",
    "generative AI consulting",
    "AI automation company",
    "Microsoft AI solutions",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "AI Solutions | Softree Technology",
    description:
      "Agentic AI, generative copilots, and intelligent automation — production-grade AI delivery for enterprises.",
    url: CANONICAL,
    siteName: "Softree Technology",
    type: "website",
  },
});

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${CANONICAL}#webpage`,
  name: "AI Solutions",
  url: CANONICAL,
  description:
    "Softree Technology AI solutions hub — agentic AI, generative AI, automation, and case studies.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: aiOfferings.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  },
};

export default function AiHubPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F3F0EE]">
      <NavigationServer />
      <main className="flex-grow pt-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <ServicePageBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "AI Solutions" },
            ]}
          />
        </div>
        <AiHubContent />
      </main>
      <Footer />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "AI Solutions", url: CANONICAL },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
    </div>
  );
}
