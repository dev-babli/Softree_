import Workflow from "lucide-react/dist/esm/icons/workflow";
import Bot from "lucide-react/dist/esm/icons/bot";
import CloudLightning from "lucide-react/dist/esm/icons/cloud-lightning";
import BrainCircuit from "lucide-react/dist/esm/icons/brain-circuit";
import LayoutGrid from "lucide-react/dist/esm/icons/layout-grid";
import Database from "lucide-react/dist/esm/icons/database";
import PlugZap from "lucide-react/dist/esm/icons/plug-zap";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import type { LucideIcon } from "lucide-react";

/* ================= TYPES ================= */

type ToolCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
};

/* ================= DATA ================= */

const tools: ToolCard[] = [
  {
    icon: Workflow,
    title: "Microsoft Power Automate",
    description: "Automate business workflows with intelligent process orchestration and approvals.",
    tags: [
      "Power Automate Cloud",
      "Desktop Flows",
      "Approvals",
      "Connectors",
      "Scheduled Flows",
      "Business Process Flows",
    ],
  },
  {
    icon: Bot,
    title: "Microsoft Copilot Studio",
    description: "Build intelligent AI copilots and conversational agents for enterprise automation.",
    tags: [
      "Copilot Studio",
      "Topics",
      "Generative AI",
      "Actions",
      "Knowledge Sources",
      "Omnichannel",
    ],
  },
  {
    icon: CloudLightning,
    title: "Azure AI Services",
    description: "Integrate enterprise AI capabilities including language, vision, and document intelligence.",
    tags: [
      "Azure OpenAI",
      "Document Intelligence",
      "AI Search",
      "Speech",
      "Vision",
      "Language Studio",
    ],
  },
  {
    icon: BrainCircuit,
    title: "AI Models & LLMs",
    description: "Leverage advanced language models for intelligent decision-making and automation.",
    tags: [
      "OpenAI GPT",
      "Claude",
      "Gemini",
      "Llama",
      "Prompt Engineering",
      "Function Calling",
    ],
  },
  {
    icon: LayoutGrid,
    title: "Business Applications",
    description: "Connect enterprise systems and automate end-to-end business processes.",
    tags: [
      "Power Apps",
      "Dynamics 365",
      "Microsoft 365",
      "Teams",
      "Outlook",
      "SharePoint",
    ],
  },
  {
    icon: Database,
    title: "Data & Storage",
    description: "Manage enterprise data securely across Microsoft platforms.",
    tags: [
      "Dataverse",
      "SQL Server",
      "Azure SQL",
      "OneLake",
      "Microsoft Fabric",
      "Blob Storage",
    ],
  },
  {
    icon: PlugZap,
    title: "Enterprise Integration",
    description: "Connect internal and external systems using APIs and enterprise integration services.",
    tags: [
      "REST APIs",
      "Graph API",
      "Webhooks",
      "Custom Connectors",
      "SAP",
      "Oracle",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Monitoring & Governance",
    description: "Ensure secure, reliable, and compliant AI workflow automation.",
    tags: [
      "Application Insights",
      "Azure Monitor",
      "Security",
      "Governance",
      "Audit Logs",
      "Role-Based Access",
    ],
  },
];

/* ================= COMPONENT ================= */

export default function WorkflowTechnologyStack() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center justify-center gap-6 mb-6">
            <style>{`
              @keyframes line-stretch {
                0%, 100% { width: 40px; opacity: 0.6; }
                50% { width: 100px; opacity: 1; }
              }
              .animate-line-stretch {
                animation: line-stretch 3s ease-in-out infinite;
              }
            `}</style>
            <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute left-0 w-2 h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
            </div>
            <span className="text-[#FF5812] font-bold tracking-[0.2em] text-sm uppercase">
              AI WORKFLOW AUTOMATION TECHNOLOGY STACK
            </span>
            <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4 max-w-4xl mx-auto leading-tight">
            Enterprise AI Workflow <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] bg-clip-text text-transparent">
              Automation Technology Stack
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            We design, develop, and implement intelligent AI workflow automation solutions using Microsoft Power Platform, Azure AI, enterprise integrations, and modern AI technologies to automate business processes at scale.
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
