import React from 'react';
import type { Metadata } from 'next';
import { Hero } from './components/Hero';

import AIAgentsFAQ from './components/AIAgentsFAQ';
import NavigationClient from '@/components/sections/navigation-client';
import LightContactSection from '@/components/homepage-light/LightContactSection';
import Footer from '@/components/sections/footer';
import WhyChooseWithTestimonials from './components/why';
import TrustedBrandsMarquee from '@/app/services/offshore-power-platform-development/trust';
import AIAgentsAIReadinessBanner from './components/AIAgentsAIReadinessBanner';
import { AIAgentsServices } from './components/AIAgentsServices';
import AIAgentsWhoDoWeServeSection from './components/AIAgentsWhoDoWeServeSection';
import { AIAgentsStickyScroll } from './components/AIAgentsStickyScroll';
import AIAgentsSuccessStories from './components/AIAgentsSuccessStories';
import AIAgentsTechnologyStack from './components/AIAgentsTechnologyStack';
import AIAgentsOffshoreEngineeringSection from './components/AIAgentsOffshoreEngineeringSection';
import { AIAgentsHowAIWorks } from './components/AIAgentsHowAIWorks';
import { applyPageOg } from '@/lib/site-metadata';

export const metadata: Metadata = applyPageOg('/solutions/ai-agents-development', {
  title: {
    absolute: 'AI Agent Development Services | Softree Technology',
  },
  description:
    'Build custom AI agents for enterprise workflows with Softree Technology. Explore LLM integration, RAG, business application connectivity, and AI engineering services.',
  keywords: [
    'AI Agent Development Services',
    'AI Agent Development',
    'Custom AI Agent Development',
    'Enterprise AI Agents',
    'Agentic AI Development',
    'AI Agent Architecture',
    'Autonomous AI Agents',
    'Offshore AI Agent Development',
    'AI Agent Development Company',
    'Dedicated AI Agent Developers',
    'Tool Calling AI Agents',
    'Multi-Step AI Workflows',
    'RAG Knowledge Integration',
    'Enterprise System Integration',
    'AI Agent Orchestration',
    'LangChain Agent Development',
    'LangGraph Agent Development',
    'CrewAI Multi-Agent Development',
    'Azure OpenAI Agents',
    'Amazon Bedrock Agents',
    'Secure AI Agent Deployment',
    'Human in the Loop AI Governance',
    'White-Label AI Agent Engineering',
  ],
  alternates: {
    canonical: 'https://www.softreetechnology.com/solutions/ai-agents-development',
  },
  openGraph: {
    title: 'AI Agent Development Services | Softree Technology',
    description:
      'Build custom AI agents for enterprise workflows with Softree Technology. Explore LLM integration, RAG, business application connectivity, and AI engineering services.',
    url: 'https://www.softreetechnology.com/solutions/ai-agents-development',
    siteName: 'Softree Technology',
    type: 'website',
  },
});

export default function AIAgentsDevelopmentPage() {
  return (
    <main className="min-h-screen w-full bg-fixed bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-base text-[#0A0F3C] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "AI Agent Development Services",
              "description":
                "Build custom AI agents for enterprise workflows with Softree Technology. Explore LLM integration, RAG, business application connectivity, and AI engineering services.",
              "provider": {
                "@type": "Organization",
                "name": "Softree Technology",
                "url": "https://www.softreetechnology.com",
              },
              "url": "https://www.softreetechnology.com/solutions/ai-agents-development",
              "serviceType": "AI Agent Development Services",
            },
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Enterprise AI Agent Architecture & Workflow Automation",
              "description":
                "Explore enterprise-ready AI agents built by Softree Technology for intelligent workflow automation, RAG knowledge integration, and multi-step business logic execution.",
              "thumbnailUrl": [
                "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video-poster.webp"
              ],
              "uploadDate": "2025-01-15T08:00:00+00:00",
              "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video.mp4",
              "embedUrl": "https://www.softreetechnology.com/solutions/ai-agents-development",
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
                  "name": "AI Agent Development Services",
                  "item": "https://www.softreetechnology.com/solutions/ai-agents-development",
                },
              ],
            },
          ]),
        }}
      />
      <NavigationClient />
      <Hero />
      <TrustedBrandsMarquee />
      <AIAgentsAIReadinessBanner />
      <AIAgentsServices />
      <AIAgentsWhoDoWeServeSection className="bg-white" />
      <AIAgentsStickyScroll />
      <AIAgentsSuccessStories />
      <AIAgentsTechnologyStack />
      <AIAgentsOffshoreEngineeringSection />
      <AIAgentsHowAIWorks />
      <WhyChooseWithTestimonials />
      <AIAgentsFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
