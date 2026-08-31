import React from "react";
import type { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";
import WhyChooseWithTestimonials from "@/app/services/offshore-langchain-development/components/why";
import ChatbotFAQ from "@/app/services/ai-chatbot-development/components/ChatbotFAQ";
import { HealthcareHero } from "./components/HealthcareHero";
import { HealthcareHeroVideoBanner } from "./components/HealthcareHeroVideoBanner";
import { HealthcareCapabilities } from "./components/HealthcareCapabilities";
import { HealthcareTechStack } from "./components/HealthcareTechStack";
import { ProactiveHealthSection } from "./components/ProactiveHealthSection";
import { HealthIntelligenceSection } from "./components/HealthIntelligenceSection";
import { HiddenPatternsSection } from "./components/HiddenPatternsSection";
import { TransformativeOutcomesSection } from "./components/TransformativeOutcomesSection";
import { WhyChooseHealthAISection } from "./components/WhyChooseHealthAISection";
import { CommunityJourneysSection } from "./components/CommunityJourneysSection";
import { CommunityMasonryStoriesSection } from "./components/CommunityMasonryStoriesSection";
import { HealthcareWorkflowTabsSection } from "./components/HealthcareWorkflowTabsSection";
import { HealthcareProcessSection } from "./components/HealthcareProcessSection";
import { HealthcareEngagementModelsSection } from "./components/HealthcareEngagementModelsSection";
import { healthcareFaqs } from "./data/faqs";

export const metadata: Metadata = {
  title: "Offshore AI Healthcare Development Services | Patient Concierge Chatbots & RAG LLMs | Softree",
  description:
    "Partner with Softree for offshore AI healthcare development. We build HIPAA-compliant patient concierge chatbots, 125+ lab test clinical AI models, and production-ready healthcare LLMs & RAG systems.",
  keywords: [
    "Offshore AI Healthcare Development",
    "Patient & Staff Concierge Chatbots",
    "Healthcare RAG LLM Solutions",
    "Clinical Lab Data Integration 125+ Tests",
    "HIPAA Compliant AI Development",
    "FHIR EHR AI Integration",
    "Medical Decision Support AI",
    "Softree Healthcare AI",
  ],
  openGraph: {
    title: "Offshore AI Healthcare Development Services | Softree Technology",
    description:
      "Custom HIPAA-compliant patient concierge chatbots, 125+ lab test clinical models, and production-ready healthcare RAG & LLM systems developed by Softree offshore teams.",
    type: "website",
    url: "https://www.softreetechnology.com/services/ai-healthcare-development-service",
  },
};

export default function AIHealthcareDevelopmentServicePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Offshore AI Healthcare Development Services",
    provider: {
      "@type": "Organization",
      name: "Softree Technology",
      url: "https://www.softreetechnology.com",
    },
    areaServed: "Global",
    description:
      "Enterprise offshore healthcare AI development offering Patient & Staff Concierge Chatbots, Clinical AI Lab Data Integration (125+ tests), and Production-Ready Healthcare RAG LLM solutions.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Healthcare AI Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Patient & Staff Concierge Chatbots",
            description: "AI tools for scheduling, policy answering, and reducing administrative burdens for medical staff.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Clinical Models & Lab Data Integration (125+ Tests)",
            description: "Deep data integration for 125+ lab tests moving beyond symptoms to uncover root health causes.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Production-Ready LLMs & Healthcare RAG Solutions",
            description: "Secure RAG systems enabling teams to query patient data, protocols, and medical knowledge bases.",
          },
        },
      ],
    },
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-base text-[#0A0F3C] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. Header Navigation */}
      <NavigationClient />

      {/* 2. Hero Section */}
      <HealthcareHero />

      {/* 3. Hero Video Banner */}
      <HealthcareHeroVideoBanner />

      {/* 4. Trusted Partners & Clients Marquee */}
      <TrustedBrandsMarquee surface="light" title="TRUSTED BY PARTNERS & CLIENTS" />

      {/* Section 10 (Wireframe): Offshore AI Development Model */}
      <WhyChooseHealthAISection />

      {/* Section 4 (Wireframe): What Can AI Do For Healthcare? */}
      <ProactiveHealthSection />

      {/* Section 6 (Wireframe): Healthcare AI Use Cases */}
      <HealthcareWorkflowTabsSection />

      {/* Section 8 (Wireframe): Integration Capabilities */}
      <HealthcareTechStack />

      {/* Section 7 (Wireframe): AI Healthcare Solutions We Can Build */}
      <HealthIntelligenceSection />

      {/* Section 11 (Wireframe): Engagement Models */}
      <HealthcareEngagementModelsSection />

      {/* Hidden Patterns & Data Insights */}
      <HiddenPatternsSection />

      {/* Transformative Outcomes Backed by Data */}
      <TransformativeOutcomesSection />

      {/* Section 9 (Wireframe): Our AI Development Process */}
      <HealthcareProcessSection />

      {/* Community Journeys & Video Stories */}
      <CommunityJourneysSection />

      {/* Community Masonry Grid */}
      <CommunityMasonryStoriesSection />

      {/* Why Choose Softree + Testimonials Carousel */}
      <WhyChooseWithTestimonials />

      {/* Frequently Asked Questions */}
      <ChatbotFAQ faqs={healthcareFaqs} />

      {/* Contact & Project Inquiry CTA */}
      <LightContactSection
        headlineLead="Accelerate clinical innovation with a reliable"
        headlineAccent="offshore AI healthcare partner"
        headlineLabel="Accelerate clinical innovation with a reliable offshore AI healthcare partner"
        body="Partner with Softree to build secure, HIPAA-compliant medical AI applications, automate clinical workflows, and scale patient care with confidence."
        messagePlaceholder="Tell us about your healthcare AI project or clinical goals..."
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
