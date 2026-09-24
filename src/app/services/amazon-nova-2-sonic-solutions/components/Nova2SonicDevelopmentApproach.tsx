"use client";

import React from "react";
import SqueezeCarousel, { SqueezeSlide } from "@/components/ui/carousel-squeeze";

const novaDevelopmentSlides: SqueezeSlide[] = [
  {
    id: "discovery",
    title: "Discovery",
    category: "01 / 05",
    description: "Identify conversational workflows, intent boundaries, and business requirements.",
    bullets: [
      "Conversational workflow mapping",
      "Business & latency requirements",
      "Voice persona & intent definition",
      "AWS environment & telephony audit"
    ],
    image: "/images/ai-development-services/core-capabilities/ai-strategy.png",
    imageAlt: "Nova 2 Sonic Discovery and Voice Workflow Planning",
    action: "Start Voice Discovery",
    href: "/contact"
  },
  {
    id: "voice-ai-architecture",
    title: "Voice AI Architecture",
    category: "02 / 05",
    description: "Design Nova 2 Sonic + Bedrock + application architecture.",
    bullets: [
      "Nova 2 Sonic speech pipeline",
      "Bedrock bidirectional streaming",
      "WebSocket audio streaming",
      "Resilient backend orchestration"
    ],
    image: "/images/ai-development-services/core-capabilities/enterprise-ai-architecture.png",
    imageAlt: "Nova 2 Sonic and Bedrock Voice System Architecture",
    action: "Review Voice Architecture",
    href: "/contact"
  },
  {
    id: "ai-tool-integration",
    title: "AI & Tool Integration",
    category: "03 / 05",
    description: "Connect APIs, databases, RAG systems and enterprise applications.",
    bullets: [
      "Enterprise API & CRM connections",
      "RAG & vector knowledge retrieval",
      "Tool & function calling execution",
      "Secure data & credential access"
    ],
    image: "/images/ai-development-services/core-capabilities/intelligent-automation.png",
    imageAlt: "Voice Agent Tool and Database Integration",
    action: "Integrate Enterprise Tools",
    href: "/contact"
  },
  {
    id: "conversation-optimization",
    title: "Conversation Optimization",
    category: "04 / 05",
    description: "Improve prompts, turn-taking, latency and response behavior.",
    bullets: [
      "Sub-second voice latency tuning",
      "Natural turn-taking & barge-in",
      "Dynamic voice prompt engineering",
      "Guardrail & hallucination control"
    ],
    image: "/images/ai-development-services/core-capabilities/continuous-optimization.png",
    imageAlt: "Voice Conversation Optimization and Low Latency",
    action: "Optimize Voice Experience",
    href: "/contact"
  },
  {
    id: "production-deployment",
    title: "Production Deployment",
    category: "05 / 05",
    description: "Deploy, monitor and continuously improve the voice AI application.",
    bullets: [
      "Auto-scaling production AWS launch",
      "Live call telemetry & latency metrics",
      "Continuous evaluation & feedback loops",
      "24/7 SLA & reliability monitoring"
    ],
    image: "/images/ai-development-services/core-capabilities/secure-ai-governance.png",
    imageAlt: "Nova 2 Sonic Production Deployment and Observability",
    action: "Deploy Production Voice AI",
    href: "/contact"
  }
];

export default function Nova2SonicDevelopmentApproach() {
  return (
    <section className="w-full bg-white pt-10 md:pt-16 pb-12 md:pb-20 overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        {/* Header */}
        <div className="flex flex-col items-center w-full mb-10 md:mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            SOFTREE&apos;S NOVA 2 SONIC DEVELOPMENT APPROACH
          </div>

          <h2 className="typo-heading-2 text-slate-900 mb-6 max-w-none whitespace-normal md:whitespace-nowrap">
            From Voice Prototype to <span className="text-[#FF6B2C]">Production AI</span>
          </h2>

          <div className="flex flex-col items-center space-y-4 max-w-4xl mx-auto">

            <div className="typo-heading-4 text-slate-900 uppercase flex flex-wrap md:flex-nowrap items-center justify-center gap-2 sm:gap-3 lg:gap-4 whitespace-normal md:whitespace-nowrap">
              <span>DISCOVERY</span>
              <span className="text-[#FF6B2C]">→</span>
              <span>VOICE AI ARCHITECTURE</span>
              <span className="text-[#FF6B2C]">→</span>
              <span>AI &amp; TOOL INTEGRATION</span>
              <span className="text-[#FF6B2C]">→</span>
              <span>CONVERSATION OPTIMIZATION</span>
              <span className="text-[#FF6B2C]">→</span>
              <span>PRODUCTION DEPLOYMENT</span>
            </div>

            <p className="typo-body text-slate-600 pt-2 text-center max-w-3xl">
              Softree differentiates your deployment from an off-the-shelf AWS sample by engineering production-ready voice systems with sub-second latency, enterprise RAG connections, and continuous observability.
            </p>
          </div>
        </div>

        {/* Squeeze Carousel - 5 Slides */}
        <div className="w-full">
          <SqueezeCarousel
            slides={novaDevelopmentSlides}
            height="clamp(480px, 44vw, 560px)"
            radius={20}
            duration={700}
            accent="#FF6B2C"
            accentForeground="#FFFFFF"
            autoplay={true}
            interval={6000}
            hoverGrow={true}
            controls={true}
            label="Nova 2 Sonic Development Approach"
          />
        </div>
      </div>
    </section>
  );
}
