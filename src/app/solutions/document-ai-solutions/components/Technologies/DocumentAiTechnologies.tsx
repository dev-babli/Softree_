"use client";

import { useState } from "react";
import {
  FileText,
  Workflow,
  ScanLine,
  Folders,
  Database,
  Shapes,
  BrainCircuit,
  Cloud,
  Bot,
  Zap,
  LayoutGrid,
  Repeat,
  CheckCircle,
  GitMerge,
  AlertTriangle,
  Bell,
  Share2,
  MessageSquare,
  Server,
  Plug,
  Users,
  ShieldCheck,
  FileCheck,
  ClipboardList,
  Key,
  Activity
} from "lucide-react";

/* ================= TYPES ================= */
type Tech = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const TABS = [
  "DOCUMENT AI",
  "MICROSOFT AI",
  "AUTOMATION",
  "INTEGRATION",
  "SECURITY & GOVERNANCE",
] as const;

/* ================= DATA ================= */
const techData: Record<(typeof TABS)[number], Tech[]> = {
  "DOCUMENT AI": [
    { name: "Azure AI Document Intelligence", icon: FileText },
    { name: "Intelligent Document Processing (IDP)", icon: Workflow },
    { name: "OCR Technology", icon: ScanLine },
    { name: "AI Document Classification", icon: Folders },
    { name: "Data Extraction & Validation", icon: Database },
    { name: "Custom Document Models", icon: Shapes },
  ],

  "MICROSOFT AI": [
    { name: "Azure OpenAI", icon: BrainCircuit },
    { name: "Azure AI Services", icon: Cloud },
    { name: "Microsoft Copilot Studio", icon: Bot },
    { name: "AI Builder", icon: Zap },
    { name: "Microsoft Fabric", icon: Database },
    { name: "Microsoft 365 Copilot", icon: LayoutGrid },
  ],

  "AUTOMATION": [
    { name: "Power Automate", icon: Workflow },
    { name: "Business Process Automation", icon: Repeat },
    { name: "Approval Workflows", icon: CheckCircle },
    { name: "AI Decision Rules", icon: GitMerge },
    { name: "Exception Handling", icon: AlertTriangle },
    { name: "Notifications & Alerts", icon: Bell },
  ],

  "INTEGRATION": [
    { name: "SharePoint", icon: Share2 },
    { name: "Dynamics 365", icon: LayoutGrid },
    { name: "Microsoft Teams", icon: MessageSquare },
    { name: "ERP & CRM Systems", icon: Server },
    { name: "REST APIs", icon: Plug },
    { name: "SQL & Databases", icon: Database },
  ],

  "SECURITY & GOVERNANCE": [
    { name: "Microsoft Entra ID", icon: Users },
    { name: "Role-Based Access", icon: ShieldCheck },
    { name: "Compliance", icon: FileCheck },
    { name: "Audit Logs", icon: ClipboardList },
    { name: "Data Encryption", icon: Key },
    { name: "Enterprise Monitoring", icon: Activity },
  ],
};

export default function DocumentAiTechnologies() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>("DOCUMENT AI");

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
            Enterprise Document AI Technologies That Power <span className="text-[#FF5812]">Intelligent Document Processing</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
            Leverage Azure AI Document Intelligence, OCR, Intelligent Document Processing (IDP), Microsoft AI, Azure OpenAI, Power Platform, and enterprise integrations to automate document extraction, classification, validation, and business workflows securely at scale.
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
