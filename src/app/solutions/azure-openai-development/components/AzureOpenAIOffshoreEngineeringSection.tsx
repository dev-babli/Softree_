"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import PhotoStackGallery, { StackPhoto } from "@/app/services/microsoft-fabric-development-services/components/PhotoStackGallery";
import { FlowButton } from "@/components/ui/flow-button";

const AZURE_OPENAI_PHOTOS: StackPhoto[] = [
  {
    id: "01",
    title: "GPT-4o Application Development",
    caption: "Architect and build production-ready GPT-4o applications, REST API middleware, and streaming endpoints deployed inside your private Azure subscription.",
    location: "Scope 01 • GPT-4o Engineering",
    category: "[ GPT-4o APPS ]",
    status: "● AZURE OPENAI DEVELOPMENT",
    specs: [
      { label: "MODEL", value: "GPT-4o / GPT-4o-mini" },
      { label: "PLATFORM", value: "Azure AI Foundry" },
      { label: "CODE", value: "GPT-4o Applications" }
    ]
  },
  {
    id: "02",
    title: "Enterprise RAG Pipeline",
    caption: "Build hybrid keyword-vector RAG pipelines with Azure AI Search, semantic re-ranking, citation grounding, and automated evaluation suites.",
    location: "Scope 02 • RAG Development",
    category: "[ RAG PIPELINES ]",
    status: "● ENTERPRISE RAG",
    specs: [
      { label: "SEARCH", value: "Azure AI Search" },
      { label: "RETRIEVAL", value: "Hybrid + Semantic" },
      { label: "CODE", value: "RAG Architecture" }
    ]
  },
  {
    id: "03",
    title: "Microsoft Copilot Integration",
    caption: "Build Microsoft 365 Copilot extensions, Teams AI bots, Power Platform connectors, and SharePoint-integrated AI assistants with user permission awareness.",
    location: "Scope 03 • Copilot Development",
    category: "[ MICROSOFT COPILOT ]",
    status: "● COPILOT ENGINEERING",
    specs: [
      { label: "PLATFORM", value: "Microsoft 365" },
      { label: "TARGET", value: "Teams / SharePoint" },
      { label: "CODE", value: "Copilot Extensions" }
    ]
  },
  {
    id: "04",
    title: "Secure Azure Landing Zone",
    caption: "Provision zero-trust Azure environments with VNet private endpoints, Entra ID RBAC, Key Vault, CMK encryption, and compliance controls aligned to CAF.",
    location: "Scope 04 • Security Architecture",
    category: "[ SECURITY ]",
    status: "● AZURE GOVERNANCE",
    specs: [
      { label: "SECURITY", value: "VNet + Private Link" },
      { label: "IDENTITY", value: "Entra ID RBAC" },
      { label: "CODE", value: "Landing Zone" }
    ]
  },
  {
    id: "05",
    title: "Token Cost Optimization",
    caption: "Implement semantic caching, dynamic model tiering, prompt compression, and Azure Cost Management controls to maximize AI ROI.",
    location: "Scope 05 • Cost Governance",
    category: "[ COST OPTIMIZATION ]",
    status: "● TOKEN GOVERNANCE",
    specs: [
      { label: "CACHE", value: "Redis / Cosmos DB" },
      { label: "STRATEGY", value: "Model Tiering" },
      { label: "CODE", value: "Cost Optimization" }
    ]
  },
  {
    id: "06",
    title: "AI Evaluation & Governance",
    caption: "Build automated evaluation suites benchmarking relevance, faithfulness, groundedness, and latency before production AI deployment.",
    location: "Scope 06 • AI Governance",
    category: "[ EVALUATION ]",
    status: "● AI GOVERNANCE",
    specs: [
      { label: "EVAL", value: "Prompt Flow / Azure" },
      { label: "TARGET", value: "Production AI" },
      { label: "CODE", value: "Evaluation Pipelines" }
    ]
  }
];

const ROLES = [
  {
    id: "01",
    domain: "DEVELOPMENT SCOPE",
    title: "GPT-4o APPLICATION ENGINEERING",
    description: "Build custom GPT-4o applications, REST APIs, and Azure AI Foundry deployments inside your private Azure subscription.",
  },
  {
    id: "02",
    domain: "DEVELOPMENT SCOPE",
    title: "ENTERPRISE RAG & AZURE AI SEARCH",
    description: "Implement hybrid retrieval, semantic re-ranking, citation grounding, and evaluation suites for accurate, hallucination-resistant AI.",
  },
  {
    id: "03",
    domain: "DEVELOPMENT SCOPE",
    title: "MICROSOFT COPILOT & M365 INTEGRATION",
    description: "Build Copilot extensions, Teams bots, and Power Platform AI connectors with Microsoft Graph and Entra ID permission awareness.",
  },
  {
    id: "04",
    domain: "DEVELOPMENT SCOPE",
    title: "SECURE VNET LANDING ZONE",
    description: "Provision zero-trust Azure environments with private endpoints, Entra ID RBAC, Key Vault, and HIPAA/SOC 2 compliance controls.",
  },
  {
    id: "05",
    domain: "DEVELOPMENT SCOPE",
    title: "TOKEN COST & MODEL GOVERNANCE",
    description: "Deploy semantic caching, model tiering, prompt compression, and Azure Cost Management to maximize AI ROI.",
  },
  {
    id: "06",
    domain: "DEVELOPMENT SCOPE",
    title: "AI EVALUATION & GOVERNANCE FRAMEWORK",
    description: "Implement automated evaluation pipelines, content safety, and AI governance policies before production deployment.",
  },
];

export function AzureOpenAIOffshoreEngineeringSection() {
  const [activeRole, setActiveRole] = useState(0);

  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 lg:pb-12 text-slate-900 relative overflow-hidden">
      {/* Subtle ambient backdrop lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-6 lg:gap-y-8 items-center">

          {/* Left Content Side */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 text-left">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/80 px-4 py-1.5 rounded-full border border-white/80 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse" />
              <span className="typo-caption text-[#FF6B2C]">
                DEVELOPMENT SCOPE
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1.5">
              <h2 className="typo-heading-2 text-slate-900">
                Build Your Azure OpenAI Solution{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#ea580c] to-[#c2410c]">
                  with Offshore Engineering
                </span>
              </h2>
              <p className="typo-description text-slate-600 max-w-1.95xl pt-0.5">
                We manage end-to-end Azure OpenAI development — from GPT-4o applications and RAG pipelines to Copilot integrations, secure landing zones, and production AI governance frameworks.
              </p>
            </div>

            {/* 6 Roles */}
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
                    <h3
                      className={`typo-heading-4 transition-colors leading-snug ${isActive ? "text-[#FF6B2C]" : "text-slate-900 group-hover:text-[#FF6B2C]"
                        }`}
                    >
                      {role.title}
                    </h3>
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
              photos={AZURE_OPENAI_PHOTOS}
              selectedIndex={activeRole}
              onSelectIndex={(idx: number) => setActiveRole(idx)}
            />
          </div>

          {/* Bottom Row */}
          <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 items-center pt-4 border-t border-slate-100">
            <div className="lg:col-span-7 flex flex-col gap-2">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#FF6B2C] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="typo-body-sm font-semibold text-slate-900 leading-snug">
                    A comprehensive Azure OpenAI engineering approach delivering production-ready AI inside your secure Azure environment.
                  </p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap typo-caption-meta text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> IP Owned by You
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Enterprise Security
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" /> Governed AI Deployment
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <FlowButton
                href="/contact"
                text="Start Your Azure OpenAI Project"
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

export default AzureOpenAIOffshoreEngineeringSection;
