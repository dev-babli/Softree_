"use client";

import React from "react";
import SqueezeCarousel, { SqueezeSlide } from "@/components/ui/carousel-squeeze";

const agentCoreSlides: SqueezeSlide[] = [
  {
    id: "discovery",
    title: "Discovery",
    description: "Define AI agent use cases, workflows, tools, data sources, and deployment requirements.",
    bullets: [
      "AI agent use-case discovery",
      "Business workflow analysis",
      "Agent capabilities & tool mapping",
      "Data and knowledge requirements"
    ],
    image: "/images/ai-development-services/core-capabilities/ai-strategy.png",
    imageAlt: "AI Agent Discovery",
    action: "Explore AI Agent Discovery →",
    href: "/contact"
  },
  {
    id: "architecture",
    title: "AI Agent Architecture",
    description: "Design scalable AI agents with Amazon Bedrock AgentCore and flexible agent frameworks.",
    bullets: [
      "AgentCore Runtime architecture",
      "Strands Agents & LangGraph",
      "Foundation model integration",
      "Agent tools and workflow orchestration"
    ],
    image: "/images/ai-development-services/core-capabilities/intelligent-automation.png",
    imageAlt: "AI Agent Architecture",
    action: "Explore Agent Architecture →",
    href: "/contact"
  },
  {
    id: "integration",
    title: "AgentCore Integration",
    description: "Connect AI agents with tools, APIs, applications, data, and services using Amazon Bedrock AgentCore.",
    bullets: [
      "AgentCore Gateway",
      "MCP servers & tools",
      "APIs & AWS Lambda",
      "AgentCore Memory",
      "Identity & secure access"
    ],
    image: "/images/ai-development-services/core-capabilities/enterprise-ai-architecture.png",
    imageAlt: "AgentCore Integration",
    action: "Explore AgentCore Integrations →",
    href: "/contact"
  },
  {
    id: "optimization",
    title: "Agent Optimization",
    description: "Monitor agent behavior, evaluate performance, and improve AI workflows using AgentCore observability and evaluations.",
    bullets: [
      "AgentCore Observability",
      "Agent workflow tracing",
      "Performance monitoring",
      "AgentCore Evaluations",
      "Continuous quality improvement"
    ],
    image: "/images/ai-development-services/core-capabilities/microsoft-ai-ecosystem.png",
    imageAlt: "Agent Optimization",
    action: "Optimize Your AI Agents →",
    href: "/contact"
  },
  {
    id: "deployment",
    title: "Production Deployment",
    description: "Deploy, operate, monitor, and scale reliable AI agents with Amazon Bedrock AgentCore.",
    bullets: [
      "Secure AgentCore Runtime deployment",
      "Production monitoring",
      "Identity and access controls",
      "Agent performance evaluation",
      "Scalable AI agent operations"
    ],
    image: "/images/ai-development-services/core-capabilities/continuous-optimization.png",
    imageAlt: "Production Deployment",
    action: "Deploy AI Agents with AgentCore →",
    href: "/contact"
  },
];

export default function WhyAgentCoreSlider() {
  return (
    <section className="w-full bg-white pt-2 md:pt-4 pb-12 md:pb-20 overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        {/* Header */}
        <div className="flex flex-col items-center w-full mb-10 md:mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            SOFTREE'S AMAZON BEDROCK AGENTCORE DEVELOPMENT APPROACH
          </div>
          
          <h2 className="typo-heading-2 text-slate-900 mb-6 max-w-none">
            From AI Agent Prototype <br className="hidden sm:block" />
            to <span className="text-[#FF6B2C]">Production-Ready AI</span>
          </h2>
          
          <div className="flex flex-col items-center space-y-4 max-w-3xl mx-auto">
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
              Softree transforms AI agent into production-ready applications using Amazon Bedrock AgentCore, secure agent runtimes, memory, tool integrations, observability, and continuous evaluation.
            </p>
          </div>
        </div>

        {/* Squeeze Carousel - 5 Slides */}
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
            label="AgentCore Development Approach"
          />
        </div>
      </div>
    </section>
  );
}
