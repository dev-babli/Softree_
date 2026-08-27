"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield, Database, Sparkles, Code, Cpu, Lock, Workflow, Layers } from "lucide-react";
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge";

const PORTFOLIO_DATA = [
  {
    index: "01 - 07",
    tabLabel: "Generative AI Consulting",
    title: "Generative AI Consulting & Strategy",
    description: "Map out high-impact generative AI use cases, audit LLM readiness, and design safe adoption roadmaps for long-term ROI.",
    icon: Sparkles,
    accordions: [
      {
        id: "01",
        title: "Use case discovery & prioritization",
        content: "Align business pain points with commercial or open-source LLM capabilities to build high-value, low-risk proof of concepts."
      },
      {
        id: "02",
        title: "Model selection & optimization",
        content: "Evaluate commercial API performance (GPT-4, Claude) against private, self-hosted open-source models (Llama, Mistral) to balance cost and accuracy."
      },
      {
        id: "03",
        title: "Risk & compliance blueprinting",
        content: "Establish guidelines for data privacy, prevent intellectual property leaks, and design human-in-the-loop validation frameworks."
      }
    ]
  },
  {
    index: "02 - 07",
    tabLabel: "Custom LLM Applications",
    title: "Custom LLM & Agentic Workflows",
    description: "Build custom language model applications that retrieve knowledge from your databases and perform multi-step business tasks autonomously.",
    icon: Database,
    accordions: [
      {
        id: "01",
        title: "RAG & semantic search bases",
        content: "Ground generative models securely in company wikis, customer history databases, and raw files using vector search."
      },
      {
        id: "02",
        title: "Autonomous agentic pipelines",
        content: "Deploy intelligent agents that interact with APIs, send emails, generate structured reports, and execute system commands safely."
      },
      {
        id: "03",
        title: "Multi-model routing & orchestration",
        content: "Route queries dynamically between smaller, specialized models and large frontier LLMs to optimize latency and api expenses."
      }
    ]
  },
  {
    index: "03 - 07",
    tabLabel: "AI Safety & Governance",
    title: "LLM Safety & Cost Governance",
    description: "Implement robust guardrails, moderate system outputs, and audit token consumption across all departments in production.",
    icon: Shield,
    accordions: [
      {
        id: "01",
        title: "Guardrails & injection protection",
        content: "Verify prompts in real-time to intercept malicious inputs, prompt injections, jailbreaks, and off-policy model completions."
      },
      {
        id: "02",
        title: "Token budgeting & APIM logging",
        content: "Enforce enterprise token caps, monitor api rate limits, and maintain centralized cost dashboards to keep AI budgets predictable."
      },
      {
        id: "03",
        title: "PII masking & data anonymization",
        content: "Detect and mask personally identifiable information, healthcare records, or financial numbers before sending prompts to external APIs."
      }
    ]
  },
  {
    index: "04 - 07",
    tabLabel: "Enterprise Integration",
    title: "CRM & ERP LLM Integration",
    description: "Seamlessly integrate LLMs and generative agents into your corporate Salesforce, Dynamics 365, SAP, and custom database environments.",
    icon: Code,
    accordions: [
      {
        id: "01",
        title: "APIM gateway routing",
        content: "Wrap model calls behind Azure API Management (APIM) with secure credentials, rate limiting, and latency tracing."
      },
      {
        id: "02",
        title: "Legacy database connectors",
        content: "Extract structured database queries (Text-to-SQL) safely, keeping database tables protected from raw model access."
      },
      {
        id: "03",
        title: "Sync & async event triggers",
        content: "Trigger automated summarization or email drafting on incoming webhook events or system message queues."
      }
    ]
  },
  {
    index: "05 - 07",
    tabLabel: "Model Fine-Tuning",
    title: "Supervised Fine-Tuning & Alignment",
    description: "Fine-tune foundational models on domain-specific training data to lock down compliance, accuracy, and tone.",
    icon: Cpu,
    accordions: [
      {
        id: "01",
        title: "JSONL dataset orchestration",
        content: "Clean, de-duplicate, and format historical databases into JSONL formats optimized for LLM fine-tuning."
      },
      {
        id: "02",
        title: "Compute allocation & training",
        content: "Run isolated supervised fine-tuning training runs on secure GPUs inside your private cloud tenant."
      },
      {
        id: "03",
        title: "Weights validation & alignment",
        content: "Validate fine-tuned model weights against benchmark validation sets to prevent regressions."
      }
    ]
  },
  {
    index: "06 - 07",
    tabLabel: "Agentic AI & Orchestration",
    title: "Multi-Agent System Orchestration",
    description: "Design networks of collaborative agents that delegate tasks, share context, and execute complex workflows without manual supervision.",
    icon: Workflow,
    accordions: [
      {
        id: "01",
        title: "Stateful agent routing",
        content: "Build stateful loops using LangGraph or Semantic Kernel to handle back-and-forth handoffs between specialized nodes."
      },
      {
        id: "02",
        title: "Tool call execution",
        content: "Ground agents with secure execution sandboxes to run calculations, edit files, and check APIs safely."
      },
      {
        id: "03",
        title: "Confidence validation gates",
        content: "Insert strict governor checks and human approval flags before critical agent outcomes are committed."
      }
    ]
  },
  {
    index: "07 - 07",
    tabLabel: "Vector Search & RAG",
    title: "Enterprise Vector Storage & Hybrid RAG",
    description: "Build and optimize vector indexing databases using Azure AI Search or Qdrant for semantic search and high-recall hybrid RAG.",
    icon: Layers,
    accordions: [
      {
        id: "01",
        title: "Chunking & parsing strategy",
        content: "Design semantic chunking, layout-aware PDF parsers, and custom sliding-window overlapping algorithms."
      },
      {
        id: "02",
        title: "Hybrid search & re-ranking",
        content: "Combine keyword matching (BM25) with vector embeddings and custom neural re-rankers for top recall."
      },
      {
        id: "03",
        title: "Incremental index ingestion",
        content: "Build real-time ingestion pipelines from SharePoint and blob storage to automatically update vector indexes."
      }
    ]
  }
];

export default function GenAiPortfolio() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const currentTab = PORTFOLIO_DATA[activeTab];
  const IconComponent = currentTab.icon;

  return (
    <section className="relative w-full py-16 md:py-24 bg-transparent overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] border-b border-l border-orange-500/5 rounded-bl-[100%] opacity-20 pointer-events-none translate-x-1/4 -translate-y-1/4" />

      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <SectionBadge text="PORTFOLIO OF SERVICES" variant="line" />
          <h2 className="mt-4 text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-3 md:mb-4 tracking-tight text-center leading-tight">
            Choose from Our Time-Tested Portfolio of <span className="text-[#FF5812]">Generative AI Services</span>
          </h2>
          <p className="text-[15px] lg:text-base text-[#6B7280] text-center max-w-2xl mx-auto leading-relaxed">
            Accelerating enterprise innovation with secure, customized language models, RAG pipelines, and automated agent orchestration.
          </p>
        </div>

        {/* Card Component */}
        <div className="mx-auto max-w-7xl rounded-3xl border border-zinc-200/60 bg-zinc-950 overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[520px]">

          {/* Left Column */}
          <div className="relative w-full md:w-[38%] bg-gradient-to-br from-[#FF6B00] via-[#FF5812] to-[#E64C00] p-8 md:p-10 flex flex-col justify-between text-white overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_70%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-10 h-full justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-[0.25em] text-white/80 uppercase">
                  {currentTab.index}
                </span>
              </div>

              <div className="flex flex-col gap-6 my-auto">
                {PORTFOLIO_DATA.map((item, idx) => {
                  const isActive = idx === activeTab;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveTab(idx);
                        setActiveAccordion(0);
                      }}
                      className={`text-left transition-all duration-300 focus:outline-none ${isActive
                          ? "text-white font-extrabold text-lg md:text-xl translate-x-2"
                          : "text-white/60 hover:text-white/90 hover:translate-x-1 text-base md:text-lg"
                        }`}
                    >
                      {item.tabLabel}
                    </button>
                  );
                })}
              </div>

              <div className="hidden md:block">
                <span className="text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">SOFTREE GEN AI SOLUTIONS</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-[62%] bg-[#0B0F19] p-8 md:p-12 flex flex-col justify-between text-zinc-100 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,88,18,0.03),transparent_50%)] pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start gap-4 mb-6">
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                    {currentTab.title}
                  </h3>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF5812]/10 to-[#FF6B00]/20 border border-[#FF5812]/20 text-[#FF5812] shadow-[0_8px_20px_-6px_rgba(255,88,18,0.3)]">
                  <IconComponent size={22} strokeWidth={1.5} />
                </div>
              </div>

              {/* Description */}
              <p className="text-[14px] leading-relaxed text-zinc-400 mb-8 max-w-xl">
                {currentTab.description}
              </p>

              {/* Accordion list */}
              <div className="flex flex-col gap-4">
                {currentTab.accordions.map((acc, index) => {
                  const isAccOpen = activeAccordion === index;
                  return (
                    <div
                      key={index}
                      className="border-b border-zinc-800/80 pb-4 transition-colors duration-200"
                    >
                      <button
                        onClick={() => setActiveAccordion(isAccOpen ? null : index)}
                        className="flex w-full items-center justify-between text-left text-[14px] sm:text-[15px] font-semibold text-white hover:text-[#FF5812] transition-colors py-2 focus:outline-none"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-[#FF5812] font-mono text-sm">{acc.id}.</span>
                          <span>{acc.title}</span>
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-zinc-500 transition-transform duration-300 ${isAccOpen ? 'rotate-180 text-[#FF5812]' : ''}`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isAccOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-[13px] leading-relaxed text-zinc-400 pt-2 pl-8 pr-4">
                              {acc.content}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
