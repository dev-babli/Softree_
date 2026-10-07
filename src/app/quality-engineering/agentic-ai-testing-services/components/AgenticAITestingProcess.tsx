"use client";

import React, { useState } from "react";
import SqueezeCarousel, { SqueezeSlide } from "@/components/ui/carousel-squeeze";
import {
  Compass,
  FileSpreadsheet,
  Cpu,
  ShieldCheck,
  BarChart3,
  TrendingUp,
} from "lucide-react";

const PROCESS_STEPS = [
  {
    step: "01",
    name: "AI Discovery & Use Case Analysis",
    icon: Compass,
    description:
      "Understand the AI application's objectives, agents, models, tools, data sources, workflows, and expected outcomes.",
  },
  {
    step: "02",
    name: "AI Test Strategy & Planning",
    icon: FileSpreadsheet,
    description:
      "Define evaluation criteria, testing scenarios, quality metrics, risk areas, and validation strategies for the AI system.",
  },
  {
    step: "03",
    name: "Agent & Evaluation Framework",
    icon: Cpu,
    description:
      "Build reusable test and evaluation frameworks for agents, LLMs, RAG pipelines, prompts, tools, and AI workflows.",
  },
  {
    step: "04",
    name: "AI Quality Validation",
    icon: ShieldCheck,
    description:
      "Validate accuracy, relevance, groundedness, safety, consistency, task completion, and end-to-end agent behavior.",
  },
  {
    step: "05",
    name: "Defect Analysis & AI Optimization",
    icon: BarChart3,
    description:
      "Analyze failed responses, hallucinations, workflow failures, security issues, and evaluation results to improve AI quality.",
  },
  {
    step: "06",
    name: "Continuous AI Improvement",
    icon: TrendingUp,
    description:
      "Continuously evaluate AI systems as models, prompts, knowledge sources, tools, and application workflows change.",
  },
];

const automationSlides: SqueezeSlide[] = [
  {
    id: "discover",
    category: "STAGE 01 — AI DISCOVERY & USE CASE ANALYSIS",
    title: "AI Discovery & Use Case Analysis",
    shortTitle: "AI Discovery",
    description:
      "Understand the AI application's objectives, agents, models, tools, data sources, workflows, and expected outcomes.",
    image: "/images/ai-development-services/core-capabilities/ai-strategy.webp",
    imageAlt: "AI Discovery & Use Case Analysis",
    bullets: [
      "Agent & workflow analysis",
      "Model & tool integration mapping",
      "Expected outcomes definition",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "plan",
    category: "STAGE 02 — AI TEST STRATEGY & PLANNING",
    title: "AI Test Strategy & Planning",
    shortTitle: "AI Test Strategy",
    description:
      "Define evaluation criteria, testing scenarios, quality metrics, risk areas, and validation strategies for the AI system.",
    image: "/images/ai-development-services/core-capabilities/enterprise-ai-architecture.webp",
    imageAlt: "AI Test Strategy & Planning",
    bullets: [
      "AI evaluation criteria",
      "Risk & safety modeling",
      "Test data & scenario planning",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "automate",
    category: "STAGE 03 — AGENT & EVALUATION FRAMEWORK",
    title: "Agent & Evaluation Framework",
    shortTitle: "Evaluation Framework",
    description:
      "Build reusable test and evaluation frameworks for agents, LLMs, RAG pipelines, prompts, tools, and AI workflows.",
    image: "/images/ai-development-services/core-capabilities/intelligent-automation.webp",
    imageAlt: "Agent & Evaluation Framework",
    bullets: [
      "LLM & RAG testing harnesses",
      "Multi-agent workflow automation",
      "Reusable evaluation frameworks",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "validate",
    category: "STAGE 04 — AI QUALITY VALIDATION",
    title: "AI Quality Validation",
    shortTitle: "Quality Validation",
    description:
      "Validate accuracy, relevance, groundedness, safety, consistency, task completion, and end-to-end agent behavior.",
    image: "/images/ai-development-services/core-capabilities/secure-ai-governance.webp",
    imageAlt: "AI Quality Validation",
    bullets: [
      "Response accuracy & groundedness",
      "Agent behavior validation",
      "AI safety & guardrail testing",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "analyze",
    category: "STAGE 05 — DEFECT ANALYSIS & AI OPTIMIZATION",
    title: "Defect Analysis & AI Optimization",
    shortTitle: "Defect Analysis",
    description:
      "Analyze failed responses, hallucinations, workflow failures, security issues, and evaluation results to improve AI quality.",
    image: "/images/ai-development-services/core-capabilities/microsoft-ai-ecosystem.webp",
    imageAlt: "Defect Analysis & AI Optimization",
    bullets: [
      "Hallucination & failure analysis",
      "Prompt & security vulnerabilities",
      "AI optimization recommendations",
    ],
    action: "Contact Us",
    href: "/contact",
  },
  {
    id: "improve",
    category: "STAGE 06 — CONTINUOUS AI IMPROVEMENT",
    title: "Continuous AI Improvement",
    shortTitle: "Continuous Improvement",
    description:
      "Continuously evaluate AI systems as models, prompts, knowledge sources, tools, and application workflows change.",
    image: "/images/ai-development-services/core-capabilities/continuous-optimization.webp",
    imageAlt: "Continuous AI Improvement",
    bullets: [
      "CI/CD AI evaluation integration",
      "Continuous model validation",
      "Ongoing prompt testing",
    ],
    action: "Contact Us",
    href: "/contact",
  },
];

export default function AgenticAITestingProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="w-full bg-white pt-8 md:pt-14 pb-8 md:pb-14 overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        {/* Header */}
        <div className="flex flex-col items-center w-full mb-8 md:mb-12 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4 text-xs font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
            OUR APPROACH
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2] mb-3 text-center max-w-3xl">
            We Turn Agentic AI Testing Into a{" "}
            <span className="text-[#FF6B2C]">Continuous Quality Engineering Process</span>
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto text-center">
            Softree combines AI evaluation, agent testing, security validation, automation, and continuous monitoring to create a scalable approach to AI quality and reliability.
          </p>
        </div>

       

        {/* Squeeze Carousel - 6 Stage Deep Dive */}
        <div className="w-full">
          <SqueezeCarousel
            slides={automationSlides}
            defaultIndex={activeStep}
            onIndexChange={(newIdx) => setActiveStep(newIdx)}
            openOnHover={true}
            height="clamp(460px, 42vw, 540px)"
            radius={20}
            duration={700}
            accent="#FF6B2C"
            accentForeground="#FFFFFF"
            autoplay={true}
            interval={6500}
            hoverGrow={true}
            controls={true}
            label="Automation Testing Process"
          />
        </div>
      </div>
    </section>
  );
}
