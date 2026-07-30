"use client";

import { useState } from "react";
import {
  LayoutGrid,
  Workflow,
  Database,
  Cloud,
  ShieldCheck,
  Share2,
  Plug,
  Server,
  Settings,
  Bot,
  BrainCircuit,
  Zap,
  Globe,
  Key,
  Users,
  Code2
} from "lucide-react";

/* ================= TYPES ================= */
type Tech = {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const TABS = [
  "AI & COPILOTS",
  "POWER PLATFORM",
  "CLOUD & DATA",
  "INTEGRATION",
  "SECURITY & DEVOPS",
] as const;

/* ================= DATA ================= */
const techData: Record<(typeof TABS)[number], Tech[]> = {
  "AI & COPILOTS": [
    { name: "Microsoft Copilot Studio", description: "Build, customize, and deploy enterprise AI copilots.", icon: Bot },
    { name: "Azure OpenAI Service", description: "Enterprise-grade GPT models secured with Azure.", icon: BrainCircuit },
    { name: "Azure AI Foundry", description: "Build, train, evaluate, and deploy AI solutions.", icon: Cloud },
    { name: "AI Builder", description: "Low-code AI capabilities inside Power Platform.", icon: Zap },
    { name: "Microsoft 365 Copilot", description: "Boost productivity across Microsoft 365 applications.", icon: LayoutGrid },
    { name: "Custom AI Agents", description: "Purpose-built intelligent AI agents for business automation.", icon: Settings },
  ],

  "POWER PLATFORM": [
    { name: "Power Apps", description: "Create enterprise business applications faster.", icon: LayoutGrid },
    { name: "Power Automate", description: "Automate workflows across people, systems, and data.", icon: Workflow },
    { name: "Power BI", description: "Visualize enterprise insights with real-time dashboards.", icon: Database },
    { name: "Dataverse", description: "Secure enterprise data platform for AI applications.", icon: Server },
    { name: "Power Pages", description: "Build secure external business portals.", icon: Globe },
    { name: "Power Fx", description: "Low-code language powering intelligent applications.", icon: Code2 },
  ],

  "CLOUD & DATA": [
    { name: "Microsoft Fabric", description: "Unified analytics platform for the era of AI.", icon: Database },
    { name: "Azure Data Lake", description: "Massively scalable and secure data lake for analytics.", icon: Server },
    { name: "Azure SQL Database", description: "Intelligent, scalable, relational database service.", icon: Database },
    { name: "Azure Blob Storage", description: "Massively scalable object storage for unstructured data.", icon: Cloud },
    { name: "Data Factory", description: "Hybrid data integration at enterprise scale.", icon: Workflow },
    { name: "OneLake", description: "A single, unified, logical data lake for your organization.", icon: Share2 },
  ],

  "INTEGRATION": [
    { name: "Microsoft Graph API", description: "Gateway to data and intelligence in Microsoft 365.", icon: Plug },
    { name: "SharePoint", description: "Intelligent intranet and enterprise content management.", icon: Share2 },
    { name: "Dynamics 365", description: "Intelligent business applications for ERP and CRM.", icon: LayoutGrid },
    { name: "REST APIs", description: "Secure, scalable interfaces for custom integration.", icon: Server },
    { name: "Azure Logic Apps", description: "Automate access and use of data across clouds.", icon: Workflow },
    { name: "Custom Connectors", description: "Extend capabilities with bespoke API connections.", icon: Settings },
  ],

  "SECURITY & DEVOPS": [
    { name: "Microsoft Entra ID", description: "Secure identity and access management.", icon: Users },
    { name: "Azure Key Vault", description: "Safeguard cryptographic keys and other secrets.", icon: Key },
    { name: "Azure DevOps", description: "Plan smarter, collaborate, and ship faster.", icon: Settings },
    { name: "GitHub", description: "Build, scale, and deliver secure software.", icon: Code2 },
    { name: "Microsoft Defender", description: "Comprehensive threat protection across domains.", icon: ShieldCheck },
    { name: "Role-Based Access Control", description: "Fine-grained access management for resources.", icon: ShieldCheck },
  ],
};

export default function AITechnologies() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>("AI & COPILOTS");

  return (
    <section className="relative overflow-hidden bg-transparent py-12 md:py-16 lg:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
              <div className="absolute left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
            </div>
            <span className="text-[#FF5812] font-bold tracking-[0.2em] text-[11px] uppercase">
              Technologies
            </span>
            <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
              <div className="absolute right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem]
 font-bold text-slate-900 mb-4 tracking-tight text-center leading-tight">
            Modern AI Technologies That Power <span className="text-[#FF5812]">Intelligent Solutions</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
            We leverage Microsoft Azure AI, Azure OpenAI, Microsoft Copilot Studio, Power Platform, Microsoft Fabric, and advanced machine learning technologies to build secure and scalable enterprise AI solutions.
          </p>
        </div>

        {/* ================= TABS ================= */}
        <div className="mb-10 flex justify-center">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-gray-200">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 text-sm font-medium transition ${activeTab === tab
                  ? "text-orange-600"
                  : "text-gray-800 hover:text-gray-700"
                  }`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-orange-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ================= TECH CARDS ================= */}
        <div
          className="relative rounded-[32px] border border-white/10 bg-gradient-to-r from-black via-[#4c1c02] to-black
 px-4 sm:px-10 py-12 shadow-2xl"
        >
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden rounded-[32px]">
            <div className="h-40 w-full max-w-[520px] rounded-full bg-orange-600/20 blur-[120px]" />
          </div>

          <div
            key={activeTab}
            className="
      relative z-10
      grid gap-8
      grid-cols-2
      sm:grid-cols-3
      lg:grid-cols-6
    "
          >
            {techData[activeTab].map((tech) => {
              const Icon = tech.icon;

              return (
                <div
                  key={tech.name}
                  className="
            group
            relative
            flex flex-col items-center justify-start text-center
            rounded-2xl
            border border-white/10
            bg-white/5
            p-5
            h-full

            backdrop-blur-xl
            transition-all duration-300 ease-out

            hover:-translate-y-2
            hover:bg-white/10
            hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]
          "
                >
                  {/* icon container */}
                  <div
                    className="
            mb-4
            flex h-12 w-12 shrink-0 items-center justify-center
            rounded-xl
            bg-orange-600/10
            ring-1 ring-orange-600/20

            transition
            group-hover:bg-orange-600
            group-hover:ring-orange-600
          "
                  >
                    <Icon className="h-6 w-6 text-orange-400 group-hover:text-white transition" />
                  </div>

                  {/* name */}
                  <span className="text-sm font-medium text-gray-200 tracking-wide mb-2 leading-tight">
                    {tech.name}
                  </span>

                  {/* description */}
                  <p className="text-[11px] text-gray-400 leading-snug">
                    {tech.description}
                  </p>

                  {/* hover glow */}
                  <span
                    className="
            pointer-events-none
            absolute inset-0
            rounded-2xl
            bg-gradient-to-br from-orange-600/10 via-transparent to-amber-500/10
            opacity-0
            transition-opacity duration-300
            group-hover:opacity-100
          "
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
