"use client";

import React from "react";
import SqueezeCarousel, { SqueezeSlide } from "@/components/ui/carousel-squeeze";

const agentCoreSlides: SqueezeSlide[] = [
  {
    id: "runtime",
    title: "Runtime",
    description: "Run and manage production AI agents with reliable execution, scaling, and workflow control.",
    bullets: [
      "Production agent execution",
      "Scalable agent workloads",
      "Multi-step task orchestration",
      "Reliable workflow execution"
    ],
    image: "/images/ai-development-services/core-capabilities/ai-strategy.png",
    imageAlt: "AgentCore Runtime Concept",
    action: "Explore AgentCore Expertise",
    href: "/contact"
  },
  {
    id: "memory",
    title: "Memory",
    description: "Give AI agents the context they need to remember information and maintain continuity across interactions.",
    bullets: [
      "Persistent agent context",
      "Conversation memory",
      "Context-aware workflows",
      "Long-running interactions"
    ],
    image: "/images/ai-development-services/core-capabilities/intelligent-automation.png",
    imageAlt: "AgentCore Memory Concept",
    action: "Explore AgentCore Expertise",
    href: "/contact"
  },
  {
    id: "gateway",
    title: "Gateway",
    description: "Connect AI agents securely with APIs, tools, applications, and enterprise systems.",
    bullets: [
      "API integrations",
      "Tool connectivity",
      "Enterprise applications",
      "Secure system access"
    ],
    image: "/images/ai-development-services/core-capabilities/enterprise-ai-architecture.png",
    imageAlt: "AgentCore Gateway Concept",
    action: "Explore AgentCore Expertise",
    href: "/contact"
  },
  {
    id: "identity",
    title: "Identity",
    description: "Control agent access with secure identity, authentication, and authorization for enterprise environments.",
    bullets: [
      "Agent authentication",
      "Access control",
      "Secure permissions",
      "Enterprise identity"
    ],
    image: "/images/ai-development-services/core-capabilities/microsoft-ai-ecosystem.png",
    imageAlt: "AgentCore Identity Concept",
    action: "Explore AgentCore Expertise",
    href: "/contact"
  },
  {
    id: "observability",
    title: "Observability",
    description: "Monitor agent behavior, workflows, performance, and interactions across production environments.",
    bullets: [
      "Agent monitoring",
      "Workflow visibility",
      "Performance tracking",
      "Production insights"
    ],
    image: "/images/ai-development-services/core-capabilities/continuous-optimization.png",
    imageAlt: "AgentCore Observability Concept",
    action: "Explore AgentCore Expertise",
    href: "/contact"
  },
];

export default function WhyAgentCoreSlider() {
  return (
    <section className="w-full bg-white pt-10 md:pt-16 pb-12 md:pb-20 overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        {/* Header */}
        <div className="flex flex-col items-center w-full mb-10 md:mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            WHY AGENTCORE
          </div>
          
          <h2 className="typo-heading-2 text-slate-900 mb-6 max-w-none whitespace-normal md:whitespace-nowrap">
            From AI Agents to <span className="text-[#FF6B2C]">Production Systems</span>
          </h2>
          
          <div className="flex flex-col items-center space-y-4 max-w-3xl mx-auto">
            <p className="typo-description text-slate-700">
              A prototype can answer questions. A production agent needs to:
            </p>
            
            <div className="typo-heading-4 text-slate-900 uppercase flex flex-wrap md:flex-nowrap items-center justify-center gap-2 sm:gap-3 lg:gap-4 whitespace-normal md:whitespace-nowrap">
              <span>REASON</span>
              <span className="text-[#FF6B2C]">→</span>
              <span>REMEMBER</span>
              <span className="text-[#FF6B2C]">→</span>
              <span>USE TOOLS</span>
              <span className="text-[#FF6B2C]">→</span>
              <span>ACT</span>
              <span className="text-[#FF6B2C]">→</span>
              <span>BE SECURE</span>
              <span className="text-[#FF6B2C]">→</span>
              <span>BE OBSERVED</span>
            </div>
            
            <p className="typo-body text-slate-600 pt-2">
              Softree helps turn AI-agent concepts into production-ready enterprise systems using Amazon Bedrock AgentCore.
            </p>
          </div>
        </div>

        {/* Squeeze Carousel - 6 Slides */}
        <div className="w-full">
          <SqueezeCarousel
            slides={agentCoreSlides}
            height="clamp(480px, 44vw, 560px)"
            radius={20}
            duration={700}
            accent="#FF6B2C"
            accentForeground="#FFFFFF"
            autoplay={true}
            interval={6000}
            hoverGrow={true}
            controls={true}
            label="Why AgentCore Capabilities"
          />
        </div>
      </div>
    </section>
  );
}
