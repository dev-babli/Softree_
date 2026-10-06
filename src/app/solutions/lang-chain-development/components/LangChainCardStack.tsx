"use client";

import React from "react";
import { ScrollGallery } from "@/components/ui/scroll-gallery";
import { CardItem } from "@/components/ui/scrollable-card-stack";
import { ShaderBackground } from "@/components/ui/kk";

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
  showHeader = true,
}: LangChainCardStackProps) {
  return (
    <section className={`relative pt-8 md:pt-12 pb-8 md:pb-12 scroll-mt-24 overflow-hidden bg-slate-950 ${className}`}>
      {/* Interactive WebGL Mesh Drift Shader Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <ShaderBackground className="h-full w-full" />
      </div>

      {/* Subtle edge blend overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        {showHeader && (
          <div className="flex flex-col mb-8 sm:mb-12">
            <div className="shadow-[inset_2px_2px_5px_rgba(255,255,255,0.1),inset_-2px_-2px_5px_rgba(0,0,0,0.5)] bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 mb-4 inline-block self-start">
              <span className="typo-caption text-[#FF5812] uppercase font-bold tracking-wider">
                WHAT WE BUILD WITH LANGCHAIN
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-6 items-start">
              <h2 className="typo-heading-2 text-white lg:pr-12 xl:pr-24">
                LangChain Development Solutions for <span className="text-[#FF5812]">Scalable Enterprise AI</span>
              </h2>

              <p className="typo-description text-slate-300 w-full pt-1.5 lg:max-w-xl">
                We develop scalable AI applications with LangChain that connect LLMs with enterprise data, APIs, tools, databases, and business systems. Our LangChain development services help organizations build intelligent AI agents, RAG solutions, AI copilots, conversational applications, and automated workflows designed for real-world business requirements.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 w-full">
        <ScrollGallery
          background={<ShaderBackground className="h-full w-full" />}
          classNames={{
            infoInner: "flex gap-8 max-w-[1600px] mx-auto w-full px-6 sm:px-8 lg:px-12",
          }}
          slides={langchainCards.map(c => ({
            title: c.name,
            url: c.href,
            linkLabel: c.ctaText,
            tag: c.tag,
            handle: c.handle,
            description: c.description,
            howSoftreeHelps: c.howSoftreeHelps,
            highlights: c.highlights
          }))}
          variant="studio"
        />
      </div>
    </section>
  );
}

export default LangChainCardStack;
