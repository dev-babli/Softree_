import { applyPageOg } from "@/lib/site-metadata";
import React from "react";
import type { Metadata } from "next";
import { Hero } from "./components/Hero";
import NavigationClient from "@/components/sections/navigation-client";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";
import WhyChooseWithTestimonials from "./components/why";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";

import MultiAgentAIReadinessBanner from "./components/MultiAgentAIReadinessBanner";
import { AIAgentsServices as MultiAgentServices } from "./components/MultiAgentServices";
import MultiAgentWhoDoWeServeSection from "./components/MultiAgentWhoDoWeServeSection";
import { AIAgentsStickyScroll as MultiAgentStickyScroll } from "./components/MultiAgentStickyScroll";
import MultiAgentSuccessStories from "./components/MultiAgentSuccessStories";
import MultiAgentTechnologyStack from "./components/MultiAgentTechnologyStack";
import MultiAgentOffshoreEngineeringSection from "./components/MultiAgentOffshoreEngineeringSection";
import { AIAgentsHowAIWorks as MultiAgentHowAIWorks } from "./components/MultiAgentHowAIWorks";
import MultiAgentFAQ from "./components/MultiAgentFAQ";

export const metadata: Metadata = applyPageOg("/services/multi-agent-systems-development", {
  title: "Multi-Agent Systems Development Services | Softree Technology",
  description:
    "Design, orchestrate, and deploy collaborative multi-agent AI systems. Specialized agent swarms that coordinate, share context, and execute complex business workflows at enterprise scale.",
  keywords: [
    "Multi-Agent Systems Development",
    "Multi-Agent AI Development Services",
    "Multi-Agent System Architecture",
    "Agent Orchestration Services",
    "LangGraph Multi-Agent Development",
    "CrewAI Multi-Agent Systems",
    "AutoGen Development Company",
    "Collaborative AI Agents",
    "Autonomous Agent Swarms",
    "Enterprise Multi-Agent Workflows",
    "Dedicated Multi-Agent Developers",
    "Offshore AI Engineering Teams",
    "White-Label Multi-Agent AI Development",
    "Tool Calling and Agent Handoffs",
    "Shared Memory AI Systems",
    "Multi-Agent RAG Integration",
    "Azure AI Multi-Agent Solutions",
    "Semantic Kernel Agent Orchestration",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services/multi-agent-systems-development",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Multi-Agent Systems Development Services | Softree Technology",
    description:
      "Design, orchestrate, and deploy collaborative multi-agent AI systems. Specialized agent swarms that coordinate, share context, and execute complex business workflows at enterprise scale.",
    url: "https://www.softreetechnology.com/services/multi-agent-systems-development",
    siteName: "Softree Technology",
    type: "website",
  },
});

export default function MultiAgentSystemsPage() {
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
              "name": "Multi-Agent Systems Development Services",
              "description":
                "Design, orchestrate, and deploy collaborative multi-agent AI systems. Specialized agent swarms that coordinate, share context, and execute complex business workflows at enterprise scale.",
              "provider": {
                "@type": "Organization",
                "name": "Softree Technology",
                "url": "https://www.softreetechnology.com",
              },
              "url": "https://www.softreetechnology.com/services/multi-agent-systems-development",
              "serviceType": "Multi-Agent Systems Development Services",
            },
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Multi-Agent Systems Development & Coordinated AI Workflow Overview",
              "description":
                "Overview of multi-agent systems development, autonomous agent orchestration, and enterprise workflow automation engineered by Softree Technology.",
              "thumbnailUrl": [
                "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video-poster.webp"
              ],
              "uploadDate": "2025-01-15T08:00:00+00:00",
              "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video.mp4",
              "embedUrl": "https://www.softreetechnology.com/services/multi-agent-systems-development",
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
                  "name": "Services",
                  "item": "https://www.softreetechnology.com/services",
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Multi-Agent Systems Development",
                  "item": "https://www.softreetechnology.com/services/multi-agent-systems-development",
                },
              ],
            },
          ]),
        }}
      />
      <NavigationClient />
      <Hero />
      <MultiAgentAIReadinessBanner />
      <MultiAgentServices />
      {/*<MultiAgentWhoDoWeServeSection className="bg-white" />*/}
      <MultiAgentStickyScroll />
      <MultiAgentSuccessStories />
      <MultiAgentTechnologyStack />
      {/*<MultiAgentOffshoreEngineeringSection />*/}
      {/*<MultiAgentHowAIWorks />*/}
      <WhyChooseWithTestimonials />
      <MultiAgentFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
