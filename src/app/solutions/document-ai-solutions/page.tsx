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
export const metadata = {
  title: "Document AI Solutions | Softree Technology",
  description: "Transform unstructured documents into accurate, actionable insights with AI-powered automation, extraction, and understanding.",
};

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
