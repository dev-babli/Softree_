import Workflow from "lucide-react/dist/esm/icons/workflow";
import Bot from "lucide-react/dist/esm/icons/bot";
import CloudLightning from "lucide-react/dist/esm/icons/cloud-lightning";
import BrainCircuit from "lucide-react/dist/esm/icons/brain-circuit";
import LayoutGrid from "lucide-react/dist/esm/icons/layout-grid";
import Database from "lucide-react/dist/esm/icons/database";
import PlugZap from "lucide-react/dist/esm/icons/plug-zap";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import type { LucideIcon } from "lucide-react";
import CapabilitySectionBadge from "../Core-capabilities/CapabilitySectionBadge";

import type { ComponentType } from "react";

/* ================= TYPES ================= */

type ToolCard = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tags: string[];
};

/* ================= DATA ================= */

const tools: ToolCard[] = [
  {
    icon: Workflow,
    title: "Microsoft Power Automate",
    description: "Automate end-to-end business workflows, approvals, notifications, document processing, and repetitive tasks using Microsoft's intelligent workflow automation platform.",
    tags: [
      "Cloud Flows",
      "Desktop Flows",
      "Approval Workflows",
      "Process Automation",
      "Business Rules",
    ],
  },
  {
    icon: Bot,
    title: "Microsoft Copilot Studio & AI Agents",
    description: "Build AI agents and enterprise copilots that automate employee support, customer interactions, workflow execution, and business process orchestration.",
    tags: [
      "AI Agents",
      "Copilot Studio",
      "Conversational AI",
      "Workflow Orchestration",
      "Knowledge Base",
    ],
  },
  {
    icon: CloudLightning,
    title: "Azure AI & Document Intelligence",
    description: "Extract business data, classify documents, analyze content, and automate document-heavy workflows using Azure AI and intelligent document processing.",
    tags: [
      "Azure OpenAI",
      "Document Intelligence",
      "OCR",
      "AI Search",
      "Computer Vision",
    ],
  },
  {
    icon: BrainCircuit,
    title: "AI Models & Decision Intelligence",
    description: "Leverage enterprise AI models to automate decision-making, analyze business data, optimize workflows, and power intelligent business automation.",
    tags: [
      "GPT Models",
      "Claude",
      "Gemini",
      "Llama",
      "Prompt Engineering",
    ],
  },
  {
    icon: LayoutGrid,
    title: "Enterprise Business Applications",
    description: "Integrate enterprise applications and automate workflows across Microsoft Dynamics 365, Microsoft 365, ERP, CRM, and third-party business systems.",
    tags: [
      "Dynamics 365",
      "Microsoft 365",
      "SharePoint",
      "ERP",
      "CRM",
    ],
  },
  {
    icon: Database,
    title: "Data Platform & Process Intelligence",
    description: "Centralize business data and monitor workflow performance with Dataverse, Microsoft Fabric, Power BI, and real-time process analytics.",
    tags: [
      "Dataverse",
      "Microsoft Fabric",
      "Power BI",
      "Process Analytics",
      "Data Integration",
    ],
  },
  {
    icon: PlugZap,
    title: "Enterprise Integration & APIs",
    description: "Connect cloud and on-premises systems through secure APIs, connectors, event-driven automation, and enterprise integration services.",
    tags: [
      "REST APIs",
      "Graph API",
      "Custom Connectors",
      "Webhooks",
      "API Management",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security, Governance & Monitoring",
    description: "Ensure enterprise-grade security, governance, compliance, monitoring, and operational visibility for scalable AI workflow automation solutions.",
    tags: [
      "Governance",
      "Compliance",
      "Security",
      "Application Insights",
      "Monitoring",
    ],
  },
];

/* ================= COMPONENT ================= */

export default function WorkflowTechnologyStack() {
  return (
    <section className="py-16 lg:py-20 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-6 lg:mb-8">
          <CapabilitySectionBadge text="TECHNOLOGIES" variant="line" />

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4 max-w-4xl mx-auto leading-tight">
            Enterprise AI Workflow <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] bg-clip-text text-transparent">
              Automation Technology Stack
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Build intelligent workflow automation solutions with Microsoft Power Platform, Azure AI, AI Agents, enterprise integrations, and advanced automation technologies. Our technology stack enables secure, scalable, and AI-driven business process automation across your organization.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, i) => {
            const Icon = tool.icon;

            return (
              <div
                key={i}
                className="
                  group
                  relative
                  rounded-2xl
                  p-[1px]
                  bg-gradient-to-br from-orange-500/40 via-orange-400/30 to-transparent
                  hover:from-orange-600 hover:via-orange-500
                  transition duration-500
                "
              >
                {/* inner */}
                <div
                  className="
                    relative
                    h-full
                    flex flex-col
                    rounded-2xl
                    bg-white/90
                    backdrop-blur
                    p-6
                    shadow-sm
                    hover:shadow-2xl
                    hover:-translate-y-2
                    transition duration-300
                    overflow-hidden
                  "
                >
                  {/* spotlight */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition" />

                  {/* icon */}
                  <div className="relative mb-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center shadow-lg">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* title */}
                  <h3 className="relative text-lg font-semibold text-slate-900 mb-2">
                    {tool.title}
                  </h3>
                  
                  {/* description */}
                  <p className="relative text-sm text-slate-600 mb-6 flex-1">
                    {tool.description}
                  </p>

                  {/* tags */}
                  <div className="relative flex flex-wrap gap-2 mt-auto">
                    {tool.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="
                          text-xs
                          px-3 py-1
                          rounded-full
                          bg-white
                          text-slate-700
                          border border-slate-200
                          shadow-sm
                          group-hover:border-orange-300
                          group-hover:text-orange-700
                          transition
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
