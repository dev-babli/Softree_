"use client";

import React from "react";
import StepWipe, { StepWipeStep } from "./StepWipe";

export const DEFAULT_AI_DEV_STEPS: StepWipeStep[] = [
  {
    image: "/images/ai-development-services/core-capabilities/microsoft-ai-ecosystem.png",
    cardImage: "/images/ai-development-services/step-4.jpg",
    title: "AI Copilot Development Services",
    description:
      "Build intelligent AI copilots that assist employees, automate workflows, connect business systems, and deliver context-aware support across enterprise applications.",
    items: [
      "Microsoft 365 Copilot Custom Extensions",
      "Context-Aware Business Assistant Workflows",
      "Power Platform & Copilot Studio Deployment",
    ],
    metric: "⚡ 10x Team Productivity",
    buttonLink: "/solutions/ai-copilot-development",
    buttonText: "Explore Services",
  },
  {
    image: "/images/imgweb/GenAI.png",
    cardImage: "/images/imgweb/1.png",
    title: "Generative AI Development Services",
    description:
      "Develop production-ready generative AI applications powered by LLMs, multimodal models, prompt engineering, and customized AI architectures.",
    items: [
      "Custom LLM Fine-Tuning & Optimization",
      "Multimodal AI for Text, Vision & Audio",
      "Enterprise Generative AI & Safety Guardrails",
    ],
    metric: "🎯 99.2% Generation Fidelity",
    buttonLink: "/services/generative-ai",
    buttonText: "Explore Services",
  },
  {
    image: "/images/ai-development-services/core-capabilities/intelligent-automation.png",
    cardImage: "/images/ai-development-services/step-3.jpg",
    title: "Enterprise RAG Development Services",
    description:
      "Create secure RAG solutions that connect enterprise data with AI models to deliver accurate, contextual, and source-grounded responses.",
    items: [
      "Hybrid Vector & Semantic Search Solutions",
      "Document Intelligence & Knowledge Extraction",
      "Sovereign Azure Private VPC & Data Governance",
    ],
    metric: "⚡ 120ms Query Retrieval",
    buttonLink: "/solutions/enterprise-rag-development",
    buttonText: "Explore Services",
  },
  {
    image: "/images/ai-development-services/core-capabilities/ai-strategy.png",
    cardImage: "/images/ai-development-services/step-1.jpg",
    title: "AI Consulting Services",
    description:
      "Define a practical AI strategy with expert guidance across use-case discovery, technology selection, AI readiness, governance, implementation, and ROI planning.",
    items: [
      "AI Maturity, Strategy & Digital Transformation",
      "Use Case Discovery & ROI Prioritization",
      "LLM Selection & Architecture Roadmaps",
    ],
    metric: "📊 4-6 Week Production POCs",
    buttonLink: "/services/ai-consulting-services",
    buttonText: "Explore Services",
  },
  {
    image: "/images/ai-development-services/why-softree/business.png",
    cardImage: "/images/ai-development-services/success-stories/hr-assistant.png",
    title: "AI Chatbot Development Services",
    description:
      "Develop intelligent conversational AI chatbots that automate customer interactions, understand natural language, and integrate with your business systems.",
    items: [
      "Omnichannel Virtual Assistants & Support",
      "CRM, ERP & Enterprise Database Connectors",
      "Multilingual Natural Language Processing",
    ],
    metric: "💬 85% Automated First-Touch Triage",
    buttonLink: "/services/ai-chatbot-development",
    buttonText: "Explore Services",
  },
  {
    image: "/images/ai-development-services/core-capabilities/enterprise-ai-architecture.png",
    cardImage: "/images/ai-development-services/step-2.jpg",
    title: "Multi-Agent AI Development Services",
    description:
      "Build collaborative multi-agent AI systems that coordinate specialized agents, automate complex tasks, and execute intelligent workflows with minimal intervention.",
    items: [
      "LangGraph & AutoGen Autonomous Swarms",
      "Dynamic Task Routing & Memory Persistence",
      "Quality Verification & Self-Correction Loops",
    ],
    metric: "🤖 99.4% Task Completion",
    buttonLink: "/services/multi-agent-systems-development",
    buttonText: "Explore Services",
  },
  {
    image: "/images/imgweb/aiworkflowservices.png",
    cardImage: "/images/imgweb/ai.png",
    title: "AI Agent Development Services",
    description:
      "Develop autonomous AI agents capable of reasoning, using tools, accessing business data, executing tasks, and adapting to dynamic workflows.",
    items: [
      "Autonomous Reasoning & Dynamic Tool Use",
      "Enterprise API & Action Orchestration",
      "Human-in-the-Loop Approval Checkpoints",
    ],
    metric: "⚙️ 24/7 Unattended Execution",
    buttonLink: "/services/ai-agent-development",
    buttonText: "Explore Services",
  },
  {
    image: "/images/imgweb/dataBIRobort.png",
    cardImage: "/images/ai-development-services/why-softree/enterprise.png",
    title: "Machine Learning Development Services",
    description:
      "Build custom machine learning solutions that turn business data into predictive insights, intelligent recommendations, and automated decision-making.",
    items: [
      "Custom Predictive Models & Forecasting",
      "Recommendation & Classification Engines",
      "Continuous Model Training & Optimization",
    ],
    metric: "📈 4.2x Operational ROI",
    buttonLink: "/services/machine-learning",
    buttonText: "Explore Services",
  },
  {
    image: "/images/ai-development-services/industries/manufacturing.jpg",
    cardImage: "/images/ai-development-services/success-stories/ai-manufacturing.png",
    title: "Computer Vision Development Services",
    description:
      "Develop computer vision solutions that analyze images and video to automate visual inspection, recognition, detection, and document processing.",
    items: [
      "Real-Time Image Recognition & Inspection",
      "Object Detection & Video Stream Analytics",
      "OCR & Document Intelligence Extraction",
    ],
    metric: "👁️ 99.8% Defect Detection",
    buttonLink: "/services/computer-vision",
    buttonText: "Explore Services",
  },
  {
    image: "/images/ai-development-services/why-softree/custom.png",
    cardImage: "/images/ai-development-services/success-stories/ai-performance-report.png",
    title: "Natural Language Processing Services",
    description:
      "Transform unstructured text and language data into actionable intelligence using NLP models for understanding, classification, extraction, and automation.",
    items: [
      "Text Classification & Information Extraction",
      "Sentiment, Intent & Entity Extraction",
      "Unstructured Knowledge Graph Synthesis",
    ],
    metric: "📑 Millions of Docs Processed",
    buttonLink: "/services/natural-language-processing",
    buttonText: "Explore Services",
  },
  {
    image: "/images/ai-development-services/why-softree/microsoft.png",
    cardImage: "/images/ai-development-services/success-stories/ai-shipment-delay.png",
    title: "AI Integration & Automation Services",
    description:
      "Integrate AI capabilities into existing applications and business workflows to automate repetitive processes, improve productivity, and accelerate operations.",
    items: [
      "Enterprise API & Core System Connectors",
      "Intelligent Business Process Automation",
      "Secure Identity & Role-Based Access Control",
    ],
    metric: "🔗 Zero Context Drift",
    buttonLink: "/services/ai-integration",
    buttonText: "Explore Services",
  },
  {
    image: "/images/mlops-pipeline.jpg",
    cardImage: "/images/ai-development-services/core-capabilities/continuous-optimization.png",
    title: "MLOps & AI Deployment Services",
    description:
      "Deploy, monitor, optimize, and scale AI and machine learning models with reliable infrastructure, automated pipelines, governance, and lifecycle management.",
    items: [
      "Automated CI/CD Model Pipelines & Docker",
      "Real-Time Telemetry, Tracing & Latency Control",
      "Semantic Caching & Token Cost Optimization",
    ],
    metric: "📉 -65% Cloud & Token Spend",
    buttonLink: "/services/mlops",
    buttonText: "Explore Services",
  },
];

export interface AiTransformationStepWipeProps {
  /** Custom list of steps for the StepWipe component */
  steps?: StepWipeStep[];
  /** Seconds each step's clip-open transition takes */
  duration?: number;
  /** GSAP ease for each step's transition */
  ease?: string;
  /** Delay (in seconds) between background and card starting */
  stagger?: number;
  /** Extra scroll distance per step, in viewport heights */
  scrollPerStep?: number;
  /** Additional container styling */
  className?: string;
}

export default function AiTransformationStepWipe({
  steps = DEFAULT_AI_DEV_STEPS,
  duration = 0.9,
  ease = "expo.out",
  stagger = 0.00875,
  scrollPerStep = 1,
  className = "",
}: AiTransformationStepWipeProps) {
  return (
    <div className={`w-full relative ${className}`}>
      <StepWipe
        steps={steps}
        duration={duration}
        ease={ease}
        stagger={stagger}
        scrollPerStep={scrollPerStep}
      />
    </div>
  );
}
