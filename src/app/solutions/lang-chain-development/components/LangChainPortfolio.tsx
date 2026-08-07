"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield, Database, Sparkles, Code, Eye, Workflow } from "lucide-react";
import SectionBadge from "./SectionBadge";

const PORTFOLIO_DATA = [
  {
    index: "01 - 06",
    tabLabel: "LangChain Chain Design",
    title: "Production LCEL Chain Architectures",
    description: "Design custom, type-safe LangChain Expression Language (LCEL) chains that compose prompts, LLMs, and output parsers with stream support.",
    icon: Sparkles,
    accordions: [
      {
        id: "01",
        title: "Custom LCEL pipelines",
        content: "Compose declarative pipelines linking prompt templates, document retrievers, model runnables, and output formats cleanly with standard streaming inputs."
      },
      {
        id: "02",
        title: "Multi-model fallback & routing",
        content: "Route prompts dynamically to optimal cost/capability models (e.g. gpt-4o for complex queries, gpt-4o-mini for simple summaries) with automatic recovery fallbacks."
      },
      {
        id: "03",
        title: "Streaming & Async execution",
        content: "Build non-blocking async runnables that stream response chunks to web interfaces immediately, reducing perceived user latency."
      }
    ]
  },
  {
    index: "02 - 06",
    tabLabel: "LangGraph Agent Mesh",
    title: "Stateful Multi-Agent Orchestration",
    description: "Deploy complex, state-governed agent networks using LangGraph—allowing agents to collaborate, delegate, and escalate tasks safely.",
    icon: Workflow,
    accordions: [
      {
        id: "01",
        title: "Stateful graph architectures",
        content: "Define graph nodes, conditional routing edges, and persistent thread memory states to run sophisticated loops and multi-step business logic."
      },
      {
        id: "02",
        title: "Human-in-the-Loop checkpoints",
        content: "Configure state gate approvals, permitting human supervisors to review, edit, or reject critical agent actions before database commits."
      },
      {
        id: "03",
        title: "Multi-agent task handoffs",
        content: "Orchestrate teams of specialized, task-scoped agents (e.g., researcher agent, writer agent, editor agent) that cooperate on shared workspace tasks."
      }
    ]
  },
  {
    index: "03 - 06",
    tabLabel: "Advanced RAG Chains",
    title: "High-Recall Retrieval-Augmented Generation",
    description: "Build robust, context-grounded retrieval pipelines that extract and pre-process documents to eliminate model hallucinations.",
    icon: Database,
    accordions: [
      {
        id: "01",
        title: "Hybrid vector search & rerankers",
        content: "Combine semantic vector lookup with keyword search index matching, using advanced rerankers (like Cohere) for optimal context relevance."
      },
      {
        id: "02",
        title: "Parent-document retrieval",
        content: "Index small semantic chunks to maximize search similarity matching, but pass larger parent document blocks to LLM prompt windows for complete context."
      },
      {
        id: "03",
        title: "Dynamic metadata pre-filtering",
        content: "Enforce document access boundaries at search time using security group tags, tenant IDs, and file metadata filters."
      }
    ]
  },
  {
    index: "04 - 06",
    tabLabel: "Tool Calling & APIs",
    title: "Secure Enterprise Systems Integration",
    description: "Connect your LangChain runnables to corporate ERPs, databases, third-party APIs, and proprietary helper scripts.",
    icon: Code,
    accordions: [
      {
        id: "01",
        title: "Custom tool binding",
        content: "Equip models with structured schemas (like Pydantic tools) so they can execute web lookups, perform calculations, or run terminal scripts."
      },
      {
        id: "02",
        title: "Secure API connections",
        content: "Interface with corporate systems (Salesforce, SAP, databases) under least-privilege token access and strict execution boundaries."
      },
      {
        id: "03",
        title: "Structured output parsing",
        content: "Coerce messy language model outputs into predictable JSON schemas or typed models to feed downstream databases reliably."
      }
    ]
  },
  {
    index: "05 - 06",
    tabLabel: "Observability & Eval",
    title: "LangSmith Tracing & Performance Metrics",
    description: "Maintain complete trace coverage of production chains and run systematic evaluation suites to prevent performance regressions.",
    icon: Eye,
    accordions: [
      {
        id: "01",
        title: "LangSmith execution tracing",
        content: "Inspect latency, token consumption, model prompts, and tool inputs for every step of nested chain runtimes in real time."
      },
      {
        id: "02",
        title: "Dataset regression testing",
        content: "Deploy automated validation harnesses (golden sets) in your CI/CD pipelines to verify model output quality before each release."
      },
      {
        id: "03",
        title: "Cost & rate-limit monitoring",
        content: "Maintain dashboard controls over api rates, token cost allocations, and response validation rates."
      }
    ]
  },
  {
    index: "06 - 06",
    tabLabel: "Output Guardrails",
    title: "Toxicity Filters & Output Validation",
    description: "Enforce strict organizational safety, alignment, and formatting rules on all incoming prompts and outgoing model outputs.",
    icon: Shield,
    accordions: [
      {
        id: "01",
        title: "Prompt injection defenses",
        content: "Sanitize user prompt inputs to catch adversarial attempts, jailbreaks, or system instruction bypass attempts before they hit the model."
      },
      {
        id: "02",
        title: "PII masking chains",
        content: "Intercept and scrub credit cards, email addresses, and personally identifiable info before passing context to external model APIs."
      },
      {
        id: "03",
        title: "Hallucination classification gates",
        content: "Run secondary classifier checks to verify that generated model responses are strictly supported by the retrieved document facts."
      }
    ]
  }
];

export default function LangChainPortfolio() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const currentTab = PORTFOLIO_DATA[activeTab];
  const IconComponent = currentTab.icon;

  return (
    <section className="relative w-full py-16 md:py-24 bg-transparent overflow-hidden font-sans">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <SectionBadge text="PORTFOLIO OF SERVICES" variant="line" />
          <h2 className="mt-4 text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-3 md:mb-4 tracking-tight text-center leading-tight">
            Choose from Our Time-Tested Portfolio of <span className="text-[#FF5812]">LangChain Services</span>
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
                      className={`text-left transition-all duration-300 focus:outline-none ${
                        isActive 
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
                <span className="text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">SOFTREE LANGCHAIN SOLUTIONS</span>
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
