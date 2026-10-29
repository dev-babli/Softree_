import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";
import React from "react";

// Navigation & Layout
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import LightContactSection from "@/components/homepage-light/LightContactSection";


// Document AI Components (matching multi-agent structure)
import { DocumentAiHero } from "./components/DocAiHero";
import DocumentAiReadinessBanner from "./components/DocAiReadinessBanner";
import { DocumentAiServices } from "./components/DocAiServices";
import { DocumentAiStickyScroll } from "./components/DocAiStickyScroll";
import { DocumentAiSuccessStories } from "./components/DocAiSuccessStories";
import { DocumentAiTechnologyStack } from "./components/DocAiTechnologyStack";
import DocAiWhyChoose from "./components/DocAiWhyChoose";
import { DocAiFAQ } from "./components/DocAiFAQ";

export const metadata: Metadata = applyPageOg("/solutions/document-ai-solutions", {
  title: "Document AI Solutions & Intelligent Document Processing",
  description:
    "Offshore Document AI engineering for intelligent document processing: OCR and layout extraction with Azure AI Document Intelligence, classification, validation, and ERP/CRM integration. Dedicated or white-label.",
  keywords: [
    // Primary keyword
    "Intelligent Document Processing",

    // Secondary service keywords
    "AI Document Processing",
    "Intelligent Document Processing Solutions",
    "Intelligent Document Processing Services",
    "Document AI Solutions",
    "Automated Document Processing",
    "Document Workflow Automation",
    "AI Document Extraction",
    "Azure Intelligent Document Processing",
    "Azure AI Document Intelligence",
    "Microsoft Intelligent Document Processing",
    "Intelligent OCR Services",
    "Document Classification",
    "Invoice Data Extraction",
    "Contract Data Extraction",
    "ERP Document Automation",
    "Enterprise Document Integration",
    "Offshore Document AI Development",
    "White-Label Document AI",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/solutions/document-ai-solutions",
  },
  openGraph: {
    title: "Document AI Solutions & Intelligent Document Processing | Softree Technology",
    description:
      "Softree builds intelligent document processing systems: OCR and extraction, classification, human review, and ERP/CRM integration. Offshore or white-label delivery.",
    url: "https://www.softreetechnology.com/solutions/document-ai-solutions",
    siteName: "Softree Technology",
    type: "website",
  },
});

export default function DocumentAISolutionsPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-base text-[#0A0F3C] antialiased">
      {/* Structured SEO Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Enterprise Document AI Solutions & Workflow Automation Overview",
              "description":
                "Discover how Softree Technology builds enterprise Document AI systems: intelligent OCR, multimodal document understanding, and automated ERP/CRM workflow integration.",
              "uploadDate": "2025-01-15T08:00:00+00:00",
              "duration": "PT10S",
              "thumbnailUrl": [
                "https://www.softreetechnology.com/documentai-video/document-ai-capabilities-poster.jpg",
                "https://www.softreetechnology.com/og-image.png"
              ],
              "contentUrl": "https://www.softreetechnology.com/documentai-video/document-ai-capabilities-v3.mp4",
              "embedUrl": "https://www.softreetechnology.com/solutions/document-ai-solutions",
              "publisher": {
                "@type": "Organization",
                "name": "Softree Technology",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.softreetechnology.com/logo/logo.png"
                }
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.softreetechnology.com",
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Solutions",
                  "item": "https://www.softreetechnology.com/solutions",
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Document AI Solutions",
                  "item": "https://www.softreetechnology.com/solutions/document-ai-solutions",
                },
              ],
            },
          ]),
        }}
      />
      <NavigationClient />
      <DocumentAiHero />
      <DocumentAiReadinessBanner />
      <DocumentAiServices />
      <DocumentAiStickyScroll />
      <DocumentAiSuccessStories />
      <DocumentAiTechnologyStack />
      <DocAiWhyChoose />
      <DocAiFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
