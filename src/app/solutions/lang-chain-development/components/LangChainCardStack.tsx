"use client";

import React from "react";
import { ScrollGallery } from "@/components/ui/scroll-gallery";
import { CardItem } from "@/components/ui/scrollable-card-stack";
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge";

const generateGradient = (c1: string, c2: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

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
    image: generateGradient("#FF5B94", "#FF8A65"), // Pink to Orange
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
    image: generateGradient("#4A85A4", "#29435C"), // Blue to Teal/Dark
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
    image: generateGradient("#FFD57F", "#FF8C7A"), // Yellow to Peach
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
    image: generateGradient("#DF4DB4", "#6B56D5"), // Magenta to Purple
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
    image: generateGradient("#4C237F", "#2A0E4E"), // Dark Purple
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
    <section className={`bg-white pt-8 md:pt-12 pb-8 md:pb-12 text-slate-900 scroll-mt-24 relative overflow-hidden ${className}`}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        {showHeader && (
          <div className="flex flex-col mb-8 sm:mb-12">
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block self-start">
              <span className="typo-caption text-[#FF5812] uppercase">
                WHAT WE BUILD WITH LANGCHAIN
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-6 items-start">
              <h2 className="typo-heading-2 text-slate-900 lg:pr-12 xl:pr-24">
                LangChain Development Solutions for <span className="text-[#FF5812]">Scalable Enterprise AI</span>
              </h2>

              <p className="typo-description text-slate-500 w-full pt-1.5 lg:max-w-xl">
                We develop scalable AI applications with LangChain that connect LLMs with enterprise data, APIs, tools, databases, and business systems. Our LangChain development services help organizations build intelligent AI agents, RAG solutions, AI copilots, conversational applications, and automated workflows designed for real-world business requirements.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="w-full">
        <ScrollGallery
          classNames={{
            infoInner: "flex gap-8 max-w-[1600px] mx-auto w-full px-6 sm:px-8 lg:px-12",
          }}
          slides={langchainCards.map(c => ({
            title: c.name,
            image: c.image ?? "",
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

