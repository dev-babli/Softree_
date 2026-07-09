"use client";

import React, { useState } from "react";
import {
  Brain,
  Bot,
  MessageSquare,
  Sparkles,
  Box,
  Zap,
  GitBranch,
  Users,
  Repeat,
  Workflow,
  Link2,
  Share2,
  Webhook,
  FileText,
  Network,
  Cloud,
  CloudCog,
  CloudLightning,
  Database,
  Layers,
  Cpu,
  Terminal,
  type LucideIcon,
} from "lucide-react";

interface StackItem {
  name: string;
  icon: LucideIcon;
}

interface StackLayer {
  id: string;
  title: string;
  descriptor: string;
  color: string; // Hex color for active highlights
  items: StackItem[];
}

const LAYERS: StackLayer[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    descriptor: "Advanced LLMs, orchestration runtimes, reasoning modules, and distributed vector embeddings powering agent workflows.",
    color: "#8B5CF6", // Violet
    items: [
      { name: "Azure OpenAI", icon: Sparkles },
      { name: "OpenAI", icon: Bot },
      { name: "Claude", icon: MessageSquare },
      { name: "Gemini", icon: Brain },
      { name: "Mistral AI", icon: Cpu },
      { name: "Hugging Face", icon: Box },
      { name: "Pinecone", icon: Database },
      { name: "Qdrant", icon: Network },
      { name: "Llama Index", icon: Layers },
    ],
  },
  {
    id: "automation",
    title: "Workflow Automation",
    descriptor: "Agentic coordination runtimes, process schedules, conditional logic flows, and task loops running in parallel.",
    color: "#F59E0B", // Amber
    items: [
      { name: "Power Automate", icon: Zap },
      { name: "LangGraph", icon: GitBranch },
      { name: "CrewAI", icon: Users },
      { name: "AutoGen", icon: Repeat },
      { name: "n8n", icon: Workflow },
      { name: "Temporal", icon: Terminal },
      { name: "Prefect", icon: Cpu },
      { name: "Apache Airflow", icon: Network },
      { name: "Copilot Studio", icon: Bot },
    ],
  },
  {
    id: "integration",
    title: "Integration Layer",
    descriptor: "Bidirectional application connectors, REST APIs, enterprise webhooks, and secure Microsoft Graph connectors.",
    color: "#06B6D4", // Cyan
    items: [
      { name: "REST APIs", icon: Link2 },
      { name: "Graph API", icon: Share2 },
      { name: "Webhooks", icon: Webhook },
      { name: "SharePoint APIs", icon: FileText },
      { name: "Microsoft Graph", icon: Network },
      { name: "MuleSoft", icon: Database },
      { name: "Apache Kafka", icon: Layers },
      { name: "Zapier", icon: Zap },
      { name: "gRPC", icon: Link2 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    descriptor: "Highly scalable serverless endpoints, compute workloads, private tenant hosting, and cloud databases.",
    color: "#10B981", // Emerald
    items: [
      { name: "Azure", icon: Cloud },
      { name: "AWS", icon: CloudCog },
      { name: "Google Cloud", icon: CloudLightning },
      { name: "Docker", icon: Box },
      { name: "Kubernetes", icon: Layers },
      { name: "Terraform", icon: Cpu },
      { name: "Vercel", icon: Cloud },
      { name: "Cloudflare", icon: Network },
    ],
  },
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(LAYERS[0].id);

  const activeLayer = LAYERS.find((l) => l.id === activeTab) || LAYERS[0];
  const totalItems = LAYERS.reduce((sum, l) => sum + l.items.length, 0);

  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-24 text-neutral-800 sm:px-10 lg:px-16 border-t border-neutral-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .ws-display { font-family: 'Space Grotesk', sans-serif; }
        .ws-body { font-family: 'Inter', sans-serif; }
        .ws-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* ambient glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-600/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#F59E0B]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-12 max-w-2xl">
          <p className="ws-mono mb-3 text-xs uppercase tracking-[0.3em] text-[#F0A83C]">
            System Architecture
          </p>
          <h2 className="ws-display text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            <span className="text-[#F0A83C]">Technology</span> Stack
          </h2>
          <p className="ws-body mt-4 text-base leading-relaxed text-neutral-500">
            Select an architectural tier to explore our integrations and reasoning layers.
          </p>
        </div>

        {/* Tab Headers */}
        <div className="flex justify-start mb-10">
          <div className="inline-flex flex-wrap p-1.5 bg-neutral-50 rounded-2xl border border-neutral-200/50 gap-1.5">
            {LAYERS.map((layer) => {
              const isActive = activeTab === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveTab(layer.id)}
                  className={`ws-mono text-[11px] uppercase tracking-wider font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-white shadow-sm border border-neutral-200/40 text-neutral-900"
                      : "border-transparent text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-transform duration-300"
                    style={{
                      backgroundColor: layer.color,
                      transform: isActive ? "scale(1.2)" : "scale(1)",
                    }}
                  />
                  {layer.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Panel */}
        <div
          className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-[#0A0B0D] p-8 md:p-12 transition-all duration-500 shadow-xl"
          style={{
            backgroundImage: `radial-gradient(${activeLayer.color}15 1px, transparent 1px)`,
            backgroundSize: "18px 18px",
          }}
        >
          {/* Colored top line accent with smooth transition */}
          <div
            className="absolute left-0 top-0 h-[4px] w-full transition-all duration-500"
            style={{ backgroundColor: activeLayer.color }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Description Info */}
            <div className="lg:col-span-5 flex flex-col justify-center h-full">
              <span
                className="ws-mono text-[10px] uppercase tracking-[0.25em] font-semibold"
                style={{ color: activeLayer.color }}
              >
                Architectural Tier
              </span>
              <h3 className="ws-display text-3xl font-bold text-white mt-2 tracking-tight">
                {activeLayer.title}
              </h3>
              <p className="ws-body mt-4 text-[14px] leading-relaxed text-neutral-400">
                {activeLayer.descriptor}
              </p>
            </div>

            {/* Badges Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {activeLayer.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 rounded-xl border border-neutral-800/80 bg-neutral-900/30 px-3.5 py-3 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60 hover:-translate-y-0.5"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950">
                      <Icon
                        className="h-4 w-4 shrink-0 transition-colors duration-300"
                        style={{ color: activeLayer.color }}
                        strokeWidth={1.75}
                      />
                    </div>
                    <span className="text-xs text-neutral-300 font-medium tracking-tight">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Status Line */}
        <div className="ws-mono mt-12 flex items-center gap-3 text-[11px] text-neutral-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {LAYERS.length} layers · {totalItems} modules operational
          <span className="h-px flex-1 bg-neutral-200" />
        </div>
      </div>
    </section>
  );
}