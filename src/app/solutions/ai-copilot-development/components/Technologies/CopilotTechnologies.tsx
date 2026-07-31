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
  Code2,
  Layers,
  Cpu,
  AppWindow,
  Wand2,
  BarChart,
  Network,
  Files,
  Building,
  Briefcase,
  Shield,
  Lock,
  Search,
  FileText,
  Activity
} from "lucide-react";

/* ================= TYPES ================= */
type Tech = {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const TABS = [
  "AI COPILOT",
  "POWER PLATFORM",
  "DATA & AI",
  "ENTERPRISE INTEGRATION",
  "SECURITY & GOVERNANCE",
] as const;

/* ================= DATA ================= */
const techData: Record<(typeof TABS)[number], Tech[]> = {
  "AI COPILOT": [
    { name: "Microsoft Copilot Studio", description: "Design and deploy enterprise AI copilots and conversational AI assistants that automate employee support, customer interactions, and business workflows.", icon: Bot },
    { name: "Azure OpenAI Service", description: "Build secure generative AI copilots using GPT models, Azure OpenAI, prompt engineering, and enterprise-grade AI capabilities.", icon: BrainCircuit },
    { name: "Microsoft 365 Copilot", description: "Enhance productivity across Outlook, Teams, Word, Excel, and PowerPoint with intelligent Microsoft 365 Copilot integrations.", icon: LayoutGrid },
    { name: "Azure AI Foundry", description: "Develop, customize, evaluate, and manage enterprise AI copilots and AI agents with Microsoft's unified AI development platform.", icon: Layers },
    { name: "AI Agents", description: "Create intelligent AI agents that automate business processes, retrieve enterprise knowledge, execute tasks, and support employee decision-making.", icon: Cpu },
    { name: "Enterprise Knowledge Integration", description: "Connect SharePoint, Dataverse, SQL, Microsoft 365, CRM, ERP, and enterprise knowledge sources to deliver accurate, context-aware AI responses.", icon: Database },
  ],

  "POWER PLATFORM": [
    { name: "Microsoft Power Automate", description: "Automate approvals, notifications, and business processes.", icon: Workflow },
    { name: "Power Apps", description: "Create custom business applications integrated with AI copilots.", icon: AppWindow },
    { name: "Dataverse", description: "Securely manage enterprise business data.", icon: Database },
    { name: "AI Builder", description: "Add document processing, OCR, prediction, and AI capabilities.", icon: Wand2 },
    { name: "Power Pages", description: "Build secure external portals powered by AI copilots.", icon: Globe },
    { name: "Power BI", description: "Deliver AI-powered analytics and business insights.", icon: BarChart },
  ],

  "DATA & AI": [
    { name: "Azure AI Search", description: "Advanced search with AI-powered relevance and intelligence.", icon: Search },
    { name: "Azure AI Document Intelligence", description: "Extract text, key-value pairs, and structures from documents.", icon: FileText },
    { name: "Azure Machine Learning", description: "Build, train, and deploy machine learning models.", icon: Activity },
    { name: "Azure SQL", description: "Managed, intelligent SQL database in the cloud.", icon: Database },
    { name: "Microsoft Fabric", description: "Unified analytics platform for the era of AI.", icon: Layers },
    { name: "Semantic Kernel", description: "Integrate LLMs securely with enterprise apps.", icon: BrainCircuit },
  ],

  "ENTERPRISE INTEGRATION": [
    { name: "Microsoft Graph API", description: "Gateway to data and intelligence in Microsoft 365.", icon: Network },
    { name: "SharePoint Online", description: "Intelligent intranet and enterprise content management.", icon: Files },
    { name: "Dynamics 365", description: "Intelligent business applications for ERP and CRM.", icon: Building },
    { name: "Salesforce", description: "Customer relationship management and sales workflows.", icon: Cloud },
    { name: "SAP", description: "Enterprise resource planning and business operations.", icon: Briefcase },
    { name: "REST APIs", description: "Secure, scalable interfaces for custom integration.", icon: Plug },
  ],

  "SECURITY & GOVERNANCE": [
    { name: "Microsoft Entra ID", description: "Secure identity and access management.", icon: Shield },
    { name: "Microsoft Purview", description: "Data governance, risk, and compliance solutions.", icon: ShieldCheck },
    { name: "Azure Key Vault", description: "Safeguard cryptographic keys and other secrets.", icon: Key },
    { name: "Microsoft Defender", description: "Comprehensive threat protection across domains.", icon: Lock },
    { name: "Role-Based Access Control (RBAC)", description: "Fine-grained access management for resources.", icon: Users },
    { name: "Compliance & Audit Logs", description: "Detailed tracking for governance and compliance.", icon: FileText },
  ],
};

export default function CopilotTechnologies() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>("AI COPILOT");

  return (
    <section className="px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
              <div className="absolute left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
            </div>
            <span className="text-[#FF5812] font-bold tracking-[0.2em] text-[11px] uppercase">
              TECHNOLOGIES
            </span>
            <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
              <div className="absolute right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-slate-900 mb-4 tracking-tight text-center leading-tight max-w-4xl mx-auto">
            Enterprise AI Copilot Technologies for <span className="text-[#FF5812]">Intelligent Business Solutions</span>
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-gray-600">
            Build secure, scalable, and intelligent enterprise AI copilots with Microsoft Copilot Studio, Azure OpenAI, Power Platform, Microsoft 365, and enterprise integrations. Softree leverages industry-leading AI technologies to deliver custom AI copilots that automate workflows, enhance productivity, and transform business operations.
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
          className="relative rounded-[32px] border border-white/10 bg-gradient-to-r from-black via-[#4c1c02] to-black px-4 sm:px-10 py-12 shadow-2xl"
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
