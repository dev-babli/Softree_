"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Brain, Database, Cloud, Layers, FileCode2 } from "lucide-react";

interface RelatedService {
  title: string;
  category: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
}

const relatedServices: RelatedService[] = [
  {
    title: "AI Agents Development",
    category: "Agentic AI Engineering",
    description:
      "Build autonomous AI agents that plan, reason, and execute multi-step tasks using Azure OpenAI, LangGraph, AutoGen, and Semantic Kernel with enterprise-grade memory and tool use.",
    href: "/solutions/ai-agents-development",
    icon: Brain,
    badge: "Agentic AI",
  },
  {
    title: "Enterprise RAG Development",
    category: "Retrieval-Augmented Generation",
    description:
      "Architect production RAG systems with hybrid search, semantic re-ranking, citation grounding, and evaluation suites using Azure AI Search and enterprise knowledge bases.",
    href: "/solutions/enterprise-rag-development",
    icon: Database,
    badge: "RAG Engineering",
  },
  {
    title: "AI Chatbot Development",
    category: "Conversational AI & Copilots",
    description:
      "Design and deploy enterprise AI chatbots, Microsoft Copilot extensions, and Teams-integrated assistants powered by Azure OpenAI with memory, tool calling, and RBAC access.",
    href: "/solutions/ai-chatbot-development",
    icon: Cloud,
    badge: "AI Chatbots",
  },
  {
    title: "Microsoft Fabric Development",
    category: "Data & AI Platform Engineering",
    description:
      "Consolidate data pipelines, lakehouses, and AI analytics onto Microsoft Fabric with OneLake, DirectLake, and Azure OpenAI-powered intelligence built in from the ground up.",
    href: "/services/microsoft-fabric-development-services",
    icon: Layers,
    badge: "Fabric & AI",
  },
];

export default function AzureOpenAIRelatedServicesNew() {
  return (
    <section className="relative w-full bg-[#fbfbfa] py-16 md:py-20 border-t border-slate-200/70 text-slate-900 overflow-hidden font-sans">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[720px] h-[320px] bg-gradient-to-r from-orange-500/[0.04] via-[#1852FF]/[0.03] to-orange-500/[0.04] blur-3xl" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/70 px-4 py-1.5 rounded-full border border-white/80 mb-4 inline-block">
            <span className="typo-caption text-[#FF6B2C] uppercase tracking-wider font-semibold">
              ENTERPRISE AI & MICROSOFT SOLUTIONS CLUSTER
            </span>
          </div>

          <h2 className="typo-heading-2 text-slate-900 tracking-tight">
            Explore Related <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FF5812] to-amber-600 bg-clip-text text-transparent">
              Azure AI & Microsoft Solutions
            </span>
          </h2>

          <p className="typo-description text-slate-600 mt-4 leading-relaxed">
            Go beyond Azure OpenAI with our broader enterprise AI and Microsoft engineering services — from agentic AI and RAG systems to Microsoft Fabric data platforms and AI-powered chatbots.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Link
                key={idx}
                href={service.href}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF5812] group-hover:bg-[#FF5812] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-orange-100 group-hover:text-[#FF5812] transition-colors">
                      {service.badge}
                    </span>
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    {service.category}
                  </span>

                  <h3 className="typo-heading-4 text-slate-900 group-hover:text-[#FF5812] transition-colors leading-snug mb-3">
                    {service.title}
                  </h3>

                  <p className="typo-body-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Link Action */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-[#FF5812] group-hover:text-[#c2410c]">
                  <span>Explore Service</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Case Studies Link Strip */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-lg bg-orange-50 text-[#FF5812] flex items-center justify-center shrink-0">
              <FileCode2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Interested in proven enterprise Azure OpenAI case studies?
              </p>
              <p className="text-xs text-slate-500">
                Explore our real-world work on{" "}
                <Link href="/case-studies/ai-powered-healthcare-operations-knowledge-assistant" className="underline hover:text-[#FF5812] font-medium">AI-Powered Healthcare Operations</Link>
                {" "}and{" "}
                <Link href="/case-studies/azure-data-platform-migration-microsoft-fabric" className="underline hover:text-[#FF5812] font-medium">Azure Data Platform Migration</Link>.
              </p>
            </div>
          </div>
          <Link
            href="/case-studies"
            className="shrink-0 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-[#FF5812] transition-colors"
          >
            All Case Studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
