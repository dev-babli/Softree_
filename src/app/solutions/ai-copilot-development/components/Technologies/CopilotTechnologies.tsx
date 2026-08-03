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
    { name: "Microsoft Copilot Studio", description: "Build and deploy custom AI copilots and conversational assistants.", icon: Bot },
    { name: "Azure OpenAI Service", description: "Deploy advanced GPT models with enterprise security and prompt tuning.", icon: BrainCircuit },
    { name: "Microsoft 365 Copilot", description: "Boost employee productivity with custom Office 365 and Teams extensions.", icon: LayoutGrid },
    { name: "Azure AI Foundry", description: "Unified platform to design, test, and manage enterprise AI applications.", icon: Layers },
    { name: "AI Agents", description: "Build autonomous agents to automate processes and make decisions.", icon: Cpu },
    { name: "Enterprise Knowledge Integration", description: "Integrate ERP, CRM, and SharePoint data for context-aware AI responses.", icon: Database },
  ],

  "POWER PLATFORM": [
    { name: "Microsoft Power Automate", description: "Automate approvals, workflows, and cross-system notifications.", icon: Workflow },
    { name: "Power Apps", description: "Build custom low-code business applications integrated with AI.", icon: AppWindow },
    { name: "Dataverse", description: "Store and manage relational business data securely.", icon: Database },
    { name: "AI Builder", description: "Add intelligent OCR, form processing, and custom models.", icon: Wand2 },
    { name: "Power Pages", description: "Launch external customer websites with embedded copilots.", icon: Globe },
    { name: "Power BI", description: "Visualize business intelligence with AI-driven dashboard analytics.", icon: BarChart },
  ],

  "DATA & AI": [
    { name: "Azure AI Search", description: "Implement secure semantic and vector search capabilities.", icon: Search },
    { name: "Azure AI Document Intelligence", description: "Automate data extraction from complex forms and documents.", icon: FileText },
    { name: "Azure Machine Learning", description: "Train, deploy, and manage enterprise-grade ML models.", icon: Activity },
    { name: "Azure SQL", description: "High-performance relational cloud database with built-in AI queries.", icon: Database },
    { name: "Microsoft Fabric", description: "Consolidate enterprise data analytics into a single lakehouse.", icon: Layers },
    { name: "Semantic Kernel", description: "Orchestrate LLMs and plug-ins in enterprise codebases.", icon: BrainCircuit },
  ],

  "ENTERPRISE INTEGRATION": [
    { name: "Microsoft Graph API", description: "Connect workspace data, files, and users securely.", icon: Network },
    { name: "SharePoint Online", description: "Manage documents and host internal knowledge bases.", icon: Files },
    { name: "Dynamics 365", description: "Integrate copilots into CRM and ERP business operations.", icon: Building },
    { name: "Salesforce", description: "Connect customer sales pipelines and custom workflows.", icon: Cloud },
    { name: "SAP", description: "Expose supply chain and financial data to copilots.", icon: Briefcase },
    { name: "REST APIs", description: "Expose custom backend services through secure endpoints.", icon: Plug },
  ],

  "SECURITY & GOVERNANCE": [
    { name: "Microsoft Entra ID", description: "Manage user identities and secure multi-factor login access.", icon: Shield },
    { name: "Microsoft Purview", description: "Enforce strict data governance, labeling, and sensitivity checks.", icon: ShieldCheck },
    { name: "Azure Key Vault", description: "Protect passwords, API keys, and connection secrets.", icon: Key },
    { name: "Microsoft Defender", description: "Detect threats and safeguard cloud resources from attacks.", icon: Lock },
    { name: "Role-Based Access Control (RBAC)", description: "Grant granular data access based on defined roles.", icon: Users },
    { name: "Compliance & Audit Logs", description: "Track system access with secure history logging.", icon: FileText },
  ],
};

export default function CopilotTechnologies() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>("AI COPILOT");

  return (
    <section className="px-4 py-12 md:py-16 lg:py-20 bg-white">
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
