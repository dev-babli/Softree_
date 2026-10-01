"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import PhotoStackGallery, { StackPhoto } from "@/app/services/microsoft-fabric-development-services/components/PhotoStackGallery";
import { FlowButton } from "@/components/ui/flow-button";

const RAG_PHOTOS: StackPhoto[] = [
  {
    id: "01",
    title: "RAG Solution Architects",
    caption: "Design scalable RAG architectures, retrieval strategies, data flows, security models, and implementation roadmaps aligned with your business and AI requirements.",
    location: "Role 01 • Architecture & Strategy",
    category: "[ ARCHITECTURE & STRATEGY ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "FOCUS", value: "RAG Architecture" },
      { label: "DESIGN", value: "Retrieval Strategy" },
      { label: "SECURITY", value: "Access Controls" }
    ]
  },
  {
    id: "02",
    title: "RAG Engineers",
    caption: "Build production-ready RAG applications across document ingestion, embeddings, vector search, retrieval pipelines, reranking, and LLM integration.",
    location: "Role 02 • RAG Engineering",
    category: "[ RAG ENGINEERING ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "SOLUTIONS", value: "RAG Applications" },
      { label: "PIPELINES", value: "Ingestion & Vector Search" },
      { label: "INTEGRATION", value: "LLM Orchestration" }
    ]
  },
  {
    id: "03",
    title: "RAG Data Engineers",
    caption: "Build reliable enterprise data ingestion and processing pipelines across documents, databases, SharePoint, APIs, and other knowledge sources for retrieval-ready AI systems.",
    location: "Role 03 • Data & Knowledge Engineering",
    category: "[ DATA & KNOWLEDGE ENGINEERING ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "PIPELINES", value: "Enterprise Data Ingestion" },
      { label: "SOURCES", value: "SharePoint, SQL, APIs" },
      { label: "PROCESSING", value: "Chunking & Embeddings" }
    ]
  },
  {
    id: "04",
    title: "LLM & AI Engineers",
    caption: "Integrate Azure OpenAI and other leading language models with retrieved enterprise context to build grounded, context-aware AI applications and knowledge assistants.",
    location: "Role 04 • AI & LLM Engineering",
    category: "[ AI & LLM ENGINEERING ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "MODELS", value: "Azure OpenAI & LLMs" },
      { label: "RESPONSES", value: "Grounded Generation" },
      { label: "APPS", value: "Knowledge Assistants" }
    ]
  },
  {
    id: "05",
    title: "Retrieval Engineers",
    caption: "Improve search relevance through vector and hybrid search, metadata filtering, reranking, retrieval evaluation, and continuous RAG performance optimization.",
    location: "Role 05 • Retrieval & Optimization",
    category: "[ RETRIEVAL & OPTIMIZATION ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "SEARCH", value: "Vector & Hybrid Search" },
      { label: "RELEVANCE", value: "Reranking & Filtering" },
      { label: "EVALUATION", value: "RAG Performance" }
    ]
  },
  {
    id: "06",
    title: "RAG DevOps & Security Engineers",
    caption: "Deploy, secure, monitor, and maintain RAG applications in production with access controls, evaluation, observability, performance monitoring, and ongoing engineering support.",
    location: "Role 06 • Security & Production",
    category: "[ SECURITY & PRODUCTION ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "DEPLOY", value: "RAG Applications" },
      { label: "SECURE", value: "Access Controls" },
      { label: "MONITOR", value: "Observability & Support" }
    ]
  }
];

const ROLES = [
  {
    id: "01",
    domain: "ARCHITECTURE & STRATEGY",
    title: "RAG Solution Architects",
    description: "Design scalable RAG architectures, secure data flows, and implementation roadmaps for your AI needs.",
  },
  {
    id: "02",
    domain: "RAG ENGINEERING",
    title: "RAG Engineers",
    description: "Build production-ready RAG applications, covering embeddings, vector search, and full LLM integration.",
  },
  {
    id: "03",
    domain: "DATA & KNOWLEDGE ENGINEERING",
    title: "RAG Data Engineers",
    description: "Develop enterprise pipelines to ingest documents, SharePoint, and APIs for AI retrieval.",
  },
  {
    id: "04",
    domain: "AI & LLM ENGINEERING",
    title: "LLM & AI Engineers",
    description: "Integrate Azure OpenAI with enterprise context to build grounded, context-aware AI assistants.",
  },
  {
    id: "05",
    domain: "RETRIEVAL & OPTIMIZATION",
    title: "Retrieval Engineers",
    description: "Enhance search relevance using vector/hybrid search, reranking, and continuous performance optimization.",
  },
  {
    id: "06",
    domain: "SECURITY & PRODUCTION",
    title: "RAG DevOps & Security Engineers",
    description: "Deploy and monitor secure RAG applications in production with robust observability and access controls.",
  },
];

export default function RAGOffshoreEngineeringSection() {
  const [activeRole, setActiveRole] = useState(0);

  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 lg:pb-12 text-slate-900 relative overflow-hidden">
      {/* Subtle ambient backdrop lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-6 lg:gap-y-8 items-center">

          {/* Left Content Side - Typography-Led, Non-Card Editorial Layout */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 text-left">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/80 px-4 py-1.5 rounded-full border border-white/80 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse" />
              <span className="typo-caption text-[#FF6B2C]">
                OFFSHORE RAG ENGINEERING TEAMS
              </span>
            </div>

            {/* Headline - Title Case, NOT all uppercase */}
            <div className="space-y-1.5">
              <h2 className="typo-heading-2 text-slate-900">
                Dedicated Offshore{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#ea580c] to-[#c2410c]">
                  RAG Engineering Team
                </span>
              </h2>
              <div className="flex items-center gap-2.5 pt-0.5">
                <div className="h-4 w-1 rounded-full bg-[#FF6B2C]" />
                <h3 className="typo-heading-4 text-slate-800">
                  Extend Your Team With Specialized RAG Engineering Talent
                </h3>
              </div>
              <p className="typo-description text-slate-600 max-w-1.95xl pt-0.5">
                Build a dedicated offshore RAG engineering team aligned with your AI roadmap—from RAG architecture and enterprise data ingestion to retrieval, LLM integration, security, evaluation, and production support.
              </p>
            </div>

            {/* 6 Roles - Pure Editorial Swiss Layout with ALL LEFT BORDERS IN ORANGE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 pt-1">
              {ROLES.map((role, idx) => {
                const isActive = activeRole === idx;
                return (
                  <div
                    key={role.id}
                    onClick={() => setActiveRole(idx)}
                    onMouseEnter={() => setActiveRole(idx)}
                    className={`group cursor-pointer text-left transition-all duration-200 relative pl-3.5 py-1 border-l-2 border-[#FF6B2C] ${isActive ? "bg-orange-500/[0.06] rounded-r-md" : "hover:bg-orange-500/[0.02]"
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`text-[11px] font-mono font-bold transition-colors ${isActive ? "text-[#FF6B2C]" : "text-slate-500 group-hover:text-[#FF6B2C]"
                          }`}
                      >
                        {role.id}
                      </span>
                      <span className="typo-caption-meta text-slate-400">
                        {role.domain}
                      </span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF6B2C] animate-ping" />
                      )}
                    </div>
                    <h4
                      className={`typo-heading-4 transition-colors leading-snug ${isActive ? "text-[#FF6B2C]" : "text-slate-900 group-hover:text-[#FF6B2C]"
                        }`}
                    >
                      {role.title}
                    </h4>
                    <p className="typo-body-sm text-slate-500 mt-0.5 line-clamp-2">
                      {role.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Side - Synchronized Interactive Photo Stack */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end self-end">
            <PhotoStackGallery
              photos={RAG_PHOTOS}
              selectedIndex={activeRole}
              onSelectIndex={(idx: number) => setActiveRole(idx)}
            />
          </div>

          {/* Bottom Row: Extension Highlight Ribbon (Left) & CTA Button (Right) */}
          <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 items-center pt-4 border-t border-slate-100">
            <div className="lg:col-span-7 flex flex-col gap-2">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#FF6B2C] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="typo-body-sm font-semibold text-slate-900 leading-snug">
                    A focused offshore RAG engineering team that works as an extension of yours.
                  </p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap typo-caption-meta text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Direct Slack & Git Sync
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> US & EU Timezone Aligned
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Enterprise IP Protection
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <FlowButton
                href="/contact"
                text="Build Your RAG Team"
                variant="orange-filled"
                className="shadow-lg shadow-orange-500/20"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
