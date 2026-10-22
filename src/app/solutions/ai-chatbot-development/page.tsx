import React from "react";
import type { Metadata } from "next";
import { Hero } from "./components/Hero";
import { SuccessStories } from "./components/SuccessStories";
import ChatbotFAQ from "./components/ChatbotFAQ";
import NavigationClient from "@/components/sections/navigation-client";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";
import WhyChooseWithTestimonials from "./components/why";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";
import { AiReadinessBanner } from "./components/AiReadinessBanner";
import { ChatbotWhoWeHelp } from "./components/ChatbotWhoWeHelp";
import ReverseStickyScroll from "./components/ReverseStickyScroll";
import ChatbotTechStack from "./components/ChatbotTechStack";
import { applyPageOg } from "@/lib/site-metadata";
import { faqs } from "./data/faqs";

export const metadata: Metadata = applyPageOg("/solutions/ai-chatbot-development", {
  title: "AI Chatbot Development Services | Softree",
  description:
    "Custom AI chatbot development services by Softree. Build conversational AI, enterprise RAG chatbots, and automated customer support workflows.",
  keywords: [
    "AI chatbot development services",
    "custom AI chatbot development",
    "conversational AI development",
    "AI chatbot development company",
    "offshore AI chatbot developers",
    "RAG chatbot development",
    "AI customer support chatbot",
    "AI chatbot integration",
    "knowledge base chatbot",
    "customer service chatbot development",
    "CRM chatbot integration",
    "helpdesk chatbot integration",
    "omnichannel chatbot development",
    "AI chatbot workflow automation",
    "human-agent handoff",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/solutions/ai-chatbot-development",
  },
  openGraph: {
    title: "AI Chatbot Development Services | Softree Technology",
    description:
      "Custom AI chatbot development services by Softree. Build conversational AI, enterprise RAG chatbots, and automated customer support workflows.",
    url: "https://www.softreetechnology.com/solutions/ai-chatbot-development",
    siteName: "Softree Technology",
    type: "website",
  },
  twitter: {
    title: "AI Chatbot Development Services | Softree Technology",
    description:
      "Custom AI chatbot development services by Softree. Build conversational AI, enterprise RAG chatbots, and automated customer support workflows.",
  },
});

export default function AIChatbotDevelopmentPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI Chatbot Development Services",
      description:
        "Custom AI chatbot development services by Softree Technology. Our offshore AI engineering team develops conversational AI solutions, RAG chatbots, and business system integrations.",
      provider: {
        "@type": "Organization",
        "@id": "https://www.softreetechnology.com/#organization",
        name: "Softree Technology",
        url: "https://www.softreetechnology.com",
      },
      url: "https://www.softreetechnology.com/solutions/ai-chatbot-development",
      serviceType: "AI Chatbot Development Services",
      areaServed: ["United States", "United Kingdom", "Global"],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.softreetechnology.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Solutions",
          item: "https://www.softreetechnology.com/solutions",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "AI Chatbot Development Services",
          item: "https://www.softreetechnology.com/solutions/ai-chatbot-development",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Enterprise AI Chatbot Development & Conversational AI Overview",
      description:
        "Explore Softree Technology's AI chatbot development services, including custom LLM chatbots, enterprise RAG knowledge retrieval, customer support automation, and business workflow integrations.",
      thumbnailUrl: [
        "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video-poster.webp",
        "https://www.softreetechnology.com/og-image.png"
      ],
      uploadDate: "2025-01-15T08:00:00+00:00",
      contentUrl: "https://www.softreetechnology.com/ai-development-service-video/ai-2.mp4",
      embedUrl: "https://www.softreetechnology.com/solutions/ai-chatbot-development",
      duration: "PT30S",
      publisher: {
        "@type": "Organization",
        name: "Softree Technology",
        logo: {
          "@type": "ImageObject",
          url: "https://www.softreetechnology.com/logo/logo.png"
        }
      }
    },
  ];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-base text-[#0A0F3C] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavigationClient />
      <Hero />
      <TrustedBrandsMarquee surface="light" />
      <AiReadinessBanner />
      <ChatbotWhoWeHelp />
      <ReverseStickyScroll />
      <SuccessStories />
      <ChatbotTechStack />
      <WhyChooseWithTestimonials />
      <ChatbotFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
