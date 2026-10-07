import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";
import React from "react";
import Hero from "./components/Hero/Hero";
import NavigationClient from "@/components/sections/navigation-client";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";
import { SuccessStories } from "./components/Success-stories";

import DocumentAiCapabilities from "./components/Core-capabilities/DocumentAiCapabilities";
import DocumentAiPortfolio from "./components/DocumentAiPortfolio";
import DocumentAiResilience from "./components/DocumentAiResilience";
import ProvenResults from "./components/Business-challenge/ProvenResult"
import { DocumentAiIndustries } from "./components/Industries/DocumentAiIndustries"
import DocumentAiTechnologies from "./components/Technologies/DocumentAiTechnologies"
import DocumentAiDeliveryProcess from "./components/Our-delivery-process/DocumentAiDeliveryProcess"
import WhyChooseSoftree from "./components/Why-choose-softree/WhyChooseSoftree"
import { DocumentAiFAQ } from "./components/FAQ/DocumentAiFAQ"
import Footer from "@/components/sections/footer"
import LightContactSection from "@/components/homepage-light/LightContactSection";
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
    <>
      <NavigationClient />
      <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 flex flex-col font-sans text-base text-[#0A0F3C] antialiased">
        <Hero />
        <TrustedBrandsMarquee />
        <SuccessStories />
        <DocumentAiCapabilities />
        <DocumentAiPortfolio />
        <DocumentAiResilience />
        < ProvenResults />
        < DocumentAiIndustries />
        < DocumentAiTechnologies />
        < DocumentAiDeliveryProcess />
        < WhyChooseSoftree />
        < DocumentAiFAQ />
      </main>
      <LightContactSection />
      <Footer />
    </>
  );
}
