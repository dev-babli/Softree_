"use client";

import React from "react";
import ScrollableCardStack, { CardItem } from "@/components/ui/scrollable-card-stack";
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge";

const langchainCards: CardItem[] = [
  {
    id: "ai-agent-development",
    name: "01. AI Agent Development with LangChain",
    tag: "AI AGENTS & REASONING",
    handle: "Reasoning · Tools · Multi-Step Execution",
    description:
      "Build autonomous and task-oriented AI agents using LangChain that can reason through complex requests, use external tools, retrieve relevant information, and execute multi-step business processes.",
    howSoftreeHelps:
      "Softree architects resilient ReAct and LangGraph state machines, integrates real-time ERP/CRM tool execution, and deploys human-in-the-loop governance to guarantee enterprise reliability.",
    highlights: [
      "ReAct & Chain-of-Thought Reasoning",
      "Dynamic Tool & API Invocation",
      "Human-in-the-Loop Safeguards",
      "LangGraph State Management",
    ],
    href: "/solutions/ai-agents-development",
    ctaText: "Explore AI Agents",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "rag-application-development",
    name: "02. LangChain RAG Application Development",
    tag: "ENTERPRISE RAG SYSTEMS",
    handle: "Enterprise Docs · Vector DBs · Citations",
    description:
      "Build secure Retrieval-Augmented Generation applications that connect LLMs with enterprise documents, vector databases, APIs, and knowledge bases to provide relevant and context-aware responses.",
    howSoftreeHelps:
      "Softree designs hybrid semantic/BM25 retrieval pipelines, configures fine-grained multi-tenant RBAC filters, and ensures zero-hallucination outputs through automated LangSmith evaluation.",
    highlights: [
      "Hybrid Vector & BM25 Search",
      "Hierarchical Chunking",
      "Role-Based Access Control (RBAC)",
      "Zero-Hallucination Grounding",
    ],
    href: "/solutions/enterprise-rag-development",
    ctaText: "Explore RAG Systems",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "enterprise-ai-assistants",
    name: "03. Enterprise AI Assistant Development",
    tag: "OPERATIONAL ASSISTANTS",
    handle: "Organizational Knowledge · Decision Support",
    description:
      "Develop context-aware AI assistants and chatbots for enterprise operations, customer support, internal knowledge management, and decision support workflows.",
    howSoftreeHelps:
      "Softree connects conversational agents with enterprise Okta/Entra ID SSO, departmental SharePoint/Confluence repos, and persistent context memory across cross-functional teams.",
    highlights: [
      "Cross-System Knowledge Aggregation",
      "Departmental Workflows & Memory",
      "Enterprise SSO (Okta & Entra ID)",
      "Real-Time Decision Support",
    ],
    href: "/solutions/ai-chatbot-development",
    ctaText: "Explore AI Assistants",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "ai-copilot-development",
    name: "04. AI Copilot Development with LangChain",
    tag: "INTELLIGENT COPILOTS",
    handle: "Coding · Research · Interactive Guidance",
    description:
      "Build domain-specific AI copilots for software development, research, sales, legal, operations, and customer service teams to assist users with real-time intelligence and recommendations.",
    howSoftreeHelps:
      "Softree embeds domain-specific copilots directly into web and software products using custom React SDKs, streaming token UX, and specialized reasoning fine-tunes.",
    highlights: [
      "Proactive In-Context Assistance",
      "Multi-Modal Reasoning & Code Generation",
      "Embedded React / Next.js SDKs",
      "Context Retention Across Sessions",
    ],
    href: "/solutions/ai-copilot-development",
    ctaText: "Explore AI Copilots",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "intelligent-document-processing",
    name: "05. Intelligent Document Processing",
    tag: "DOCUMENT INTELLIGENCE",
    handle: "Contracts · Reports · Summarization & Extraction",
    description:
      "Extract, summarize, classify, and analyze structured and unstructured data from PDFs, scanned documents, enterprise files, and business reports using LangChain pipelines.",
    howSoftreeHelps:
      "Softree constructs high-throughput document intelligence pipelines that parse complex PDFs and tables into validated JSON schemas with 99.2%+ accuracy and PII redaction.",
    highlights: [
      "Structured Schema & JSON Parsing",
      "Automated PII & PHI Redaction",
      "Map-Reduce Multi-Page Summaries",
      "99.2%+ Field Extraction Accuracy",
    ],
    href: "/solutions/document-ai-solutions",
    ctaText: "Explore Doc Intelligence",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=1000&auto=format&fit=crop&q=80",
  },
];

export interface LangChainCardStackProps {
  className?: string;
  cardWidth?: number;
  cardHeight?: number;
  showHeader?: boolean;
}

export function LangChainCardStack({
  className = "",
  cardWidth = 1180,
  showHeader = true,
}: LangChainCardStackProps) {
  return (
    <section className={`w-full py-12 sm:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] dark:from-[#07070B] dark:via-[#0B0B0F] dark:to-[#07070B] px-4 sm:px-8 md:px-[2.5cm] lg:px-[3cm] ${className}`}>
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        {showHeader && (
          <div className="flex flex-col items-center w-full mb-8 sm:mb-10 text-center">
            <SectionBadge text="WHAT WE BUILD WITH LANGCHAIN" variant="line" />

            <h2 className="text-2xl md:text-3xl lg:text-[2.25rem] font-extrabold text-[#111827] dark:text-white mb-3 tracking-tight leading-tight max-w-4xl">
              LangChain Development Solutions for{" "}
              <span className="text-[#FF5812]">Scalable Enterprise AI</span>
            </h2>

            <p className="text-[14.5px] lg:text-[15.5px] text-[#6B7280] dark:text-zinc-400 max-w-3xl leading-relaxed">
              We develop scalable AI applications with LangChain that connect LLMs with enterprise data, APIs, tools, databases, and business systems. Our LangChain development services help organizations build intelligent AI agents, RAG solutions, AI copilots, conversational applications, and automated workflows designed for real-world business requirements.
            </p>
          </div>
        )}

        <div className="w-full mx-auto flex justify-center">
          <ScrollableCardStack
            autoPlay={true}
            autoPlayInterval={3800}
            cardWidth={cardWidth}
            className="mx-auto"
            items={langchainCards}
          />
        </div>
      </div>
    </section>
  );
}

export default LangChainCardStack;

