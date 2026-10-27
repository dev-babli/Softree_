import React from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import AiReadinessBanner from "./components/AiReadinessBanner";
import CopilotWhoWeHelp from "./components/CopilotWhoWeHelp";
import NewWhoDoWeServeSection from "@/components/sections/NewWhoDoWeServeSection";

const ReverseStickyScroll = dynamic(
  () => import("./components/ReverseStickyScroll").then((mod) => mod.ReverseStickyScroll),
  { ssr: true }
);

import TrustedBrandsMarquee from "@/app/services/ai-consulting-services/ai-consulting-services-components/TrustedBrandsMarquee";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer"
import CopilotTestimonials from "./components/Testimonial/CopilotTestimonials";
import CopilotTechnologies from "./components/Technologies/CopilotTechnologies";
import { CopilotProcess } from "./components/Process/CopilotProcess";
import CopilotCaseStudies from "./components/CopilotCaseStudies";
import CopilotTechStack from "./components/CopilotTechStack";
import CopilotHowItWorks from "./components/CopilotHowItWorks";
import CopilotCapabilities from "./components/Core-capabilities/CopilotCapabilities";
import ProvenResults from "@/components/sections/ProvenResults";
import { CopilotFAQ } from "./components/FAQ/CopilotFAQ";
import { copilotFaqs } from "./data/faqs";
import NavigationClient from "@/components/sections/navigation-client";
import { applyPageOg } from "@/lib/site-metadata";

export const metadata: Metadata = applyPageOg("/solutions/ai-copilot-development", {
  title: {
    absolute: "AI Copilot Development Services | Softree Technology",
  },
  description:
    "Partner with Softree for custom AI copilot development services. Build intelligent copilots using Microsoft AI technologies with our offshore engineering team.",
  keywords: [
    "AI Copilot Development Services",
    "Custom AI Copilot Development",
    "Microsoft Copilot Studio Development",
    "Offshore AI Engineering",
    "Azure AI Copilot",
    "Enterprise AI Copilots",
    "Copilot Workflow Automation",
    "Knowledge Base AI Copilot",
    "Dedicated AI Copilot Developers",
    "Microsoft Copilot Development Services",
    "AI Copilot Integration Services",
    "Custom Microsoft Copilot Solutions",
    "Copilot Studio Integration",
    "Microsoft 365 Copilot Integration",
    "Azure OpenAI Integration",
    "AI Assistant Development",
    "AI Agent Development",
    "AI Copilot Implementation",
    "Custom AI Assistants",
    "SharePoint AI Copilot",
    "Copilot API Integration",
    "AI Knowledge Assistant Development",
    "Business Workflow Automation",
    "Offshore Copilot Developers",
    "AI Copilot Solution Architecture",
    "Microsoft Power Platform AI Integration",
    "Custom Copilot Solutions for Business",
    "ai copilot development",
    "ai copilot development services",
    "ai copilot development company",
    "custom ai copilot development",
    "custom ai copilots",
    "copilot ai agent development",
    "microsoft copilot",
    "copilot ai",
    "co pilot or copilot",
    "copilot ai cost",
    "ai copilot development cost",
    "enterprise ai copilot development",
    "copilot ai software development",
    "Microsoft 365 Copilot",
    "copilot app",
    "ai copilot chat",
    "copilot ai developer tools",
    "copilot development studio",
    "copilot development license",
    "copilot development agent",
    "copilot bing ai",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/solutions/ai-copilot-development",
  },
  openGraph: {
    title: "AI Copilot Development Services | Softree Technology",
    description:
      "Partner with Softree for custom AI copilot development services. Build intelligent copilots using Microsoft AI technologies with our offshore engineering team.",
    url: "https://www.softreetechnology.com/solutions/ai-copilot-development",
    siteName: "Softree Technology",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Copilot Development Services | Softree Technology",
    description:
      "Partner with Softree for custom AI copilot development services. Build intelligent copilots using Microsoft AI technologies with our offshore engineering team.",
  },
});

export default function AICopilotDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "AI Copilot Development Services",
              description:
                "Partner with Softree for custom AI copilot development services. Build intelligent copilots using Microsoft Copilot Studio, Azure AI, and business integrations with our offshore engineering team.",
              provider: {
                "@type": "Organization",
                "@id": "https://www.softreetechnology.com/#organization",
                name: "Softree Technology",
                url: "https://www.softreetechnology.com",
              },
              url: "https://www.softreetechnology.com/solutions/ai-copilot-development",
              serviceType: "AI Copilot Development Services",
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
                  name: "AI Copilot Development Services",
                  item: "https://www.softreetechnology.com/solutions/ai-copilot-development",
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: copilotFaqs.map((faq) => ({
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
              name: "Custom AI Copilot Development & Microsoft Copilot Solutions Overview",
              description:
                "Discover how Softree Technology builds and deploys custom AI copilots, Microsoft Copilot Studio integrations, enterprise knowledge retrieval, and automated business workflows.",
              thumbnailUrl: [
                "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video-poster.webp",
                "https://www.softreetechnology.com/og-image.png"
              ],
              uploadDate: "2025-01-15T08:00:00+00:00",
              contentUrl: "https://www.softreetechnology.com/ai-development-service-video/security-position-video.mp4",
              embedUrl: "https://www.softreetechnology.com/solutions/ai-copilot-development",
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
          ]),
        }}
      />
      <NavigationClient />
      <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 overflow-x-hidden">
        <Hero />
        <TrustedBrandsMarquee />
        <AiReadinessBanner />
        <CopilotWhoWeHelp />
        {/* <NewWhoDoWeServeSection className="bg-white" /> */}
        <ReverseStickyScroll />
        <CopilotCaseStudies />
        <CopilotTechStack />
        {/* <CopilotHowItWorks /> */}
        {/* <CopilotCapabilities /> */}
        {/* <ProvenResults solution="ai-copilot" /> */}
        {/* <CopilotIndustries /> */}
        {/* <CopilotTechnologies /> */}
        {/* <CopilotProcess /> */}
        <CopilotTestimonials />
        <CopilotFAQ faqs={copilotFaqs} />
      </main>
      <LightContactSection />
      <Footer />
    </>
  );
}
