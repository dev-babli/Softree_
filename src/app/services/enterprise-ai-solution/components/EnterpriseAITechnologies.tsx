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
  Search
} from "lucide-react";

/* ================= TYPES ================= */
type Tech = {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const TABS = [
  "LLM & CLOUD AI",
  "VECTOR DBS & RAG",
  "ORCHESTRATION & AGENTS",
  "DATA PIPELINES",
  "ENTERPRISE SECURITY",
] as const;

/* ================= DATA ================= */
const techData: Record<(typeof TABS)[number], Tech[]> = {
  "LLM & CLOUD AI": [
    { name: "Azure OpenAI Service", description: "Enterprise-grade GPT models secured with Azure.", icon: BrainCircuit },
    { name: "AWS Bedrock", description: "Fully managed foundational models from Amazon.", icon: Cloud },
    { name: "Google Vertex AI", description: "Unified machine learning and AI platform.", icon: Globe },
    { name: "Open Source LLMs", description: "Llama 3, Mistral, deployed in private VPCs.", icon: LayoutGrid },
    { name: "NVIDIA NIM", description: "Optimized inference microservices.", icon: Zap },
    { name: "Hugging Face", description: "Model hubs and enterprise inference endpoints.", icon: Settings },
  ],
  "VECTOR DBS & RAG": [
    { name: "Pinecone", description: "Managed, serverless vector database.", icon: Database },
    { name: "Milvus / Zilliz", description: "Highly scalable open-source vector database.", icon: Database },
    { name: "Qdrant", description: "Vector search engine for production RAG.", icon: Search },
    { name: "Azure AI Search", description: "Information retrieval at enterprise scale.", icon: Share2 },
    { name: "Redis Enterprise", description: "In-memory vector database for low latency.", icon: Zap },
    { name: "Elasticsearch", description: "Hybrid lexical and semantic search.", icon: Database },
  ],
  "ORCHESTRATION & AGENTS": [
    { name: "LangChain", description: "Framework for developing LLM applications.", icon: Workflow },
    { name: "LlamaIndex", description: "Data framework for customized RAG pipelines.", icon: Plug },
    { name: "Microsoft AutoGen", description: "Framework for multi-agent conversational systems.", icon: Bot },
    { name: "Semantic Kernel", description: "Microsoft's SDK for integrating AI with code.", icon: Code2 },
    { name: "CrewAI", description: "Collaborative AI agents framework.", icon: Users },
    { name: "Custom Agent Middleware", description: "Bespoke routing and reasoning layers.", icon: Settings },
  ],
  "DATA PIPELINES": [
    { name: "Databricks", description: "Unified data analytics platform.", icon: Server },
    { name: "Snowflake", description: "AI data cloud for secure processing.", icon: Cloud },
    { name: "Airflow / Prefect", description: "Data pipeline orchestration.", icon: Workflow },
    { name: "Azure Data Factory", description: "Hybrid data integration at enterprise scale.", icon: Share2 },
    { name: "Unstructured.io", description: "Extract and transform unstructured documents.", icon: Plug },
    { name: "Kafka", description: "Real-time data streaming for AI ingestion.", icon: Zap },
  ],
  "ENTERPRISE SECURITY": [
    { name: "Microsoft Entra ID", description: "Secure identity and access management.", icon: Users },
    { name: "Lakera Guard / NeMo", description: "AI security guardrails and firewalls.", icon: ShieldCheck },
    { name: "VPC / Private Link", description: "Isolated network perimeters for AI models.", icon: Cloud },
    { name: "Data Masking", description: "Automated redaction of sensitive PII/PHI data.", icon: Key },
    { name: "MLflow / W&B", description: "Model registry and lifecycle management.", icon: Settings },
    { name: "RBAC & Auditing", description: "Fine-grained access controls and logs.", icon: ShieldCheck },
  ],
};

export default function EnterpriseAITechnologies() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>("LLM & CLOUD AI");

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
            Enterprise AI Stack for <span className="text-[#FF5812]">Production Scale</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
            We architect and deploy production-grade AI systems using the most robust cloud infrastructure, vector databases, and agentic frameworks available.
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
                  <span className="absolute bottom-0 left-0 h-0.75 w-full rounded-full bg-orange-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ================= TECH CARDS ================= */}
        <div
          className="relative rounded-4xl border border-white/10 bg-linear-to-r from-black via-[#4c1c02] to-black
 px-4 sm:px-10 py-12 shadow-2xl"
        >
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden rounded-4xl">
            <div className="h-40 w-full max-w-130 rounded-full bg-orange-600/20 blur-[120px]" />
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
            bg-linear-to-br from-orange-600/10 via-transparent to-amber-500/10
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
