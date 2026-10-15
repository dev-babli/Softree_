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
  title: "Document AI Solutions & Intelligent OCR | Softree Technology",
  description:
    "Extract, analyze, and automate document workflows with AI. High-accuracy intelligent OCR, multimodal document understanding, and ERP/CRM ingestion pipelines.",
  alternates: {
    canonical: "https://www.softreetechnology.com/solutions/document-ai-solutions",
  },
  openGraph: {
    title: "Document AI Solutions & Intelligent OCR | Softree Technology",
    description:
      "Extract, analyze, and automate document workflows with AI. High-accuracy intelligent OCR, multimodal document understanding, and ERP/CRM ingestion pipelines.",
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
              "@type": "Service",
              "name": "Document AI Solutions & Intelligent OCR",
              "description":
                "Extract, analyze, and automate document workflows with AI. High-accuracy intelligent OCR, multimodal document understanding, and ERP/CRM ingestion pipelines.",
              "provider": {
                "@type": "Organization",
                "name": "Softree Technology",
                "url": "https://www.softreetechnology.com",
              },
              "url": "https://www.softreetechnology.com/solutions/document-ai-solutions",
              "serviceType": "Document AI Solutions",
            },
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Document AI Solutions & Intelligent Document Processing Overview",
              "description":
                "Overview of Document AI solutions, intelligent OCR, multimodal document understanding, and enterprise workflow automation engineered by Softree Technology.",
              "thumbnailUrl": [
                "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video-poster.webp"
              ],
              "uploadDate": "2025-01-15T08:00:00+00:00",
              "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video.mp4",
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
