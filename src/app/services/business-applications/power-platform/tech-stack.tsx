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
  Bug,
  Layers,
} from "lucide-react";

/* ================= TYPES ================= */
type Tech = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const TABS = [
  "POWER APPS",
  "POWER AUTOMATE",
  "DATA & STORAGE",
  "INTEGRATIONS",
  "SECURITY & GOVERNANCE",
] as const;

/* ================= DATA ================= */
const techData: Record<(typeof TABS)[number], Tech[]> = {
  "POWER APPS": [
    { name: "Canvas Apps", icon: LayoutGrid },
    { name: "Model-Driven Apps", icon: LayoutGrid },
    { name: "Responsive UI", icon: Settings },
    { name: "Custom Components (PCF)", icon: Plug },
    { name: "Offline Capabilities", icon: Cloud },
    { name: "Role-Based UI", icon: ShieldCheck },
  ],

  "POWER AUTOMATE": [
    { name: "Cloud Flows", icon: Workflow },
    { name: "Approval Workflows", icon: ShieldCheck },
    { name: "Scheduled Flows", icon: Settings },
    { name: "Business Process Flows", icon: Workflow },
    { name: "Desktop Flows (RPA)", icon: Server },
    { name: "Error Handling & Retry", icon: Bug },
  ],

  "DATA & STORAGE": [
    { name: "Dataverse", icon: Database },
    { name: "SharePoint Lists", icon: Share2 },
    { name: "SQL Server", icon: Server },
    { name: "Excel & OneDrive", icon: Database },
    { name: "Azure Blob Storage", icon: Cloud },
    { name: "Data Modeling", icon: Layers },
  ],

  INTEGRATIONS: [
    { name: "Standard Connectors", icon: Plug },
    { name: "Custom Connectors", icon: Settings },
    { name: "Microsoft Graph", icon: Cloud },
    { name: "REST APIs", icon: Server },
    { name: "Azure Functions", icon: Cloud },
    { name: "Webhook Integrations", icon: Workflow },
  ],

  "SECURITY & GOVERNANCE": [
    { name: "Role-Based Access", icon: ShieldCheck },
    { name: "Environment Strategy", icon: Cloud },
    { name: "DLP Policies", icon: ShieldCheck },
    { name: "Audit & Monitoring", icon: Settings },
    { name: "Conditional Access", icon: ShieldCheck },
    { name: "Compliance & Logging", icon: Database },
  ],
};

export default function PowerAppsTechnologies() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>("POWER APPS");

  return (
    <section className="px-4">
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-10 text-center">
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.35em] text-indigo-600">
            Microsoft Power Platform
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Technologies powering{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Power Apps Solutions
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
            We build scalable, secure, and automation-driven business solutions
            using Microsoft Power Platform — from apps and workflows to data and
            governance.
          </p>
        </div>

        {/* ================= TABS ================= */}
        <div className="mb-10 flex justify-center">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-gray-200">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 text-sm font-medium transition ${
                  activeTab === tab
                    ? "text-indigo-600"
                    : "text-gray-800 hover:text-gray-700"
                }`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-indigo-900" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ================= TECH CARDS ================= */}
        <div
          className="relative rounded-[32px] border border-white/10 7a] bg-gradient-to-r from-black via-[#0f2f7a] to-black
 px-4 sm:px-10 py-12 shadow-2xl"
        >
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden rounded-[32px]">
            <div className="h-40 w-full max-w-[520px] rounded-full bg-indigo-600/20 blur-[120px]" />
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
            flex flex-col items-center justify-center
            rounded-2xl
            border border-white/10
            bg-white/5
            p-7

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
            flex h-12 w-12 items-center justify-center
            rounded-xl
            bg-indigo-600/10
            ring-1 ring-indigo-600/20

            transition
            group-hover:bg-indigo-600
            group-hover:ring-indigo-600
          "
                  >
                    <Icon className="h-6 w-6 text-indigo-400 group-hover:text-white transition" />
                  </div>

                  {/* name */}
                  <span className="text-center text-sm font-medium text-gray-200 tracking-wide">
                    {tech.name}
                  </span>

                  {/* hover glow */}
                  <span
                    className="
            pointer-events-none
            absolute inset-0
            rounded-2xl
            bg-gradient-to-br from-indigo-600/10 via-transparent to-cyan-500/10
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
