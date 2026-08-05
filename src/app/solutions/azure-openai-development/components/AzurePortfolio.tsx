"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield, Database, Sparkles, Code, Cpu, Lock } from "lucide-react";
import SectionBadge from "./SectionBadge";

const PORTFOLIO_DATA = [
  {
    index: "01 - 06",
    tabLabel: "Azure OpenAI Consulting",
    title: "AI Advisory & Strategy Consulting",
    description: "We help your organization map out high-value use cases, audit data security postures, and architect secure enterprise-ready Azure AI landing zones.",
    icon: Sparkles,
    accordions: [
      {
        id: "01",
        title: "Use case prioritization & readiness",
        content: "Audit your internal data catalogs and system readiness to identify low-risk, high-return AI opportunities aligned with your corporate objectives."
      },
      {
        id: "02",
        title: "Security & architecture blueprinting",
        content: "Design virtual network isolation, private endpoints, and key vault integrations to ensure data never leaves your secure Azure tenant boundary."
      },
      {
        id: "03",
        title: "Licensing & ROI optimization",
        content: "Map token volume estimates against Azure commitments, optimizing cost efficiency between pay-as-you-go and provisioned throughput limits."
      }
    ]
  },
  {
    index: "02 - 06",
    tabLabel: "Custom Copilots & RAG",
    title: "Intelligent Copilots & RAG Workflows",
    description: "Deploy secure, context-aware assistants that retrieve grounded information from your own systems and operate where your employees already work.",
    icon: Database,
    accordions: [
      {
        id: "01",
        title: "Entra-grounded cognitive search",
        content: "Ground Azure OpenAI models in your internal documentation using Azure AI Search, respecting Entra ID user permissions on every query."
      },
      {
        id: "02",
        title: "Teams & Power Platform integration",
        content: "Publish custom copilots directly into Microsoft Teams, Power Apps, or external websites with secure SSO and workflow triggers."
      },
      {
        id: "03",
        title: "Cognitive document extraction",
        content: "Deploy automated extraction agents that parse operational PDF reports, parse contracts, and populate downstream systems with structured JSON."
      }
    ]
  },
  {
    index: "03 - 06",
    tabLabel: "Model Ops & Governance",
    title: "Enterprise Model Operations & Safety",
    description: "Govern and run your production AI systems with complete cost transparency, real-time safety guardrails, and compliance-ready controls.",
    icon: Shield,
    accordions: [
      {
        id: "01",
        title: "Microsoft Content Safety filters",
        content: "Deploy real-time input/output moderation filters to block prompt injections, jailbreaks, and offensive outputs before they reach users."
      },
      {
        id: "02",
        title: "Token budgeting & rate limiting",
        content: "Enforce departmental token caps, set custom alerts, and configure rate limit thresholds to prevent budget spikes and model starvation."
      },
      {
        id: "03",
        title: "Fine-tuning & alignment workflows",
        content: "Conduct supervised fine-tuning and system prompt optimization on Azure OpenAI studio to align output tone and domain logic to corporate guidelines."
      }
    ]
  },
  {
    index: "04 - 06",
    tabLabel: "Enterprise Integration",
    title: "Legacy & App System Integration",
    description: "Seamlessly embed Azure OpenAI intelligence into your existing CRM, ERP, and line-of-business applications without disrupting operations.",
    icon: Code,
    accordions: [
      {
        id: "01",
        title: "Secure REST API endpoints",
        content: "Expose Azure OpenAI capabilities through API Management layers (APIM) with rate limiting and logging."
      },
      {
        id: "02",
        title: "ERP & CRM connections",
        content: "Build connector middleware to inject AI summarization and classification tools into Salesforce, Dynamics 365, and SAP."
      },
      {
        id: "03",
        title: "Event-driven microservices",
        content: "Trigger AI text generation or categorization from event pipelines such as Service Bus or Event Grid."
      }
    ]
  },
  {
    index: "05 - 06",
    tabLabel: "Model Fine-Tuning",
    title: "Domain-Specific Model Alignment",
    description: "Enhance model accuracy, restrict output tone, and adapt response patterns to your specialized industry terminology using secure fine-tuning pipelines.",
    icon: Cpu,
    accordions: [
      {
        id: "01",
        title: "Dataset preparation & cleaning",
        content: "Transform historical logs, clinical notes, or financial reports into high-quality JSONL training sets."
      },
      {
        id: "02",
        title: "Supervised Fine-Tuning (SFT)",
        content: "Run Azure OpenAI fine-tuning jobs (e.g. GPT-4o, GPT-3.5) inside dedicated, isolated compute limits."
      },
      {
        id: "03",
        title: "Hyperparameter tuning & validation",
        content: "Adjust training epochs, learning rates, and temperatures, evaluating against domain benchmarks."
      }
    ]
  },
  {
    index: "06 - 06",
    tabLabel: "AI Safety & Security",
    title: "Security Governance & Safety Gates",
    description: "Defend against prompt injections, prevent data exfiltration, and implement continuous compliance monitoring across all AI endpoints.",
    icon: Lock,
    accordions: [
      {
        id: "01",
        title: "Prompt injection defense",
        content: "Shield models against unauthorized instructions and jailbreak attempts via real-time vector checks."
      },
      {
        id: "02",
        title: "PII & sensitive data masking",
        content: "Automatically detect, redact, or mask personal identifiable information (PII) before it is sent to the LLM."
      },
      {
        id: "03",
        title: "Audit logs & compliance gates",
        content: "Generate full transcripts and telemetry logs in Azure Monitor to satisfy SOC2, HIPAA, and GDPR audits."
      }
    ]
  }
];

export default function AzurePortfolio() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const currentTab = PORTFOLIO_DATA[activeTab];
  const IconComponent = currentTab.icon;

  return (
    <section className="relative w-full py-16 md:py-24 bg-transparent overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] border-b border-l border-orange-500/5 rounded-bl-[100%] opacity-20 pointer-events-none translate-x-1/4 -translate-y-1/4" />
      
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <SectionBadge text="SOLUTIONS PORTFOLIO" variant="line" />
          <h2 className="mt-4 text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-3 md:mb-4 tracking-tight text-center leading-tight">
            Choose from Our Time-Tested Portfolio of <span className="text-[#FF5812]">Azure AI Services</span>
          </h2>
          <p className="text-[15px] lg:text-base text-[#6B7280] text-center max-w-2xl mx-auto leading-relaxed">
            Powering enterprise capabilities with secure, compliant, and cost-controlled Azure OpenAI deployments designed for long-term growth.
          </p>
        </div>

        {/* Card Component */}
        <div className="mx-auto max-w-7xl rounded-3xl border border-zinc-200/60 bg-zinc-950 overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[520px]">
          
          {/* Left Column - Solid Textured Orange Rail */}
          <div className="relative w-full md:w-[38%] bg-gradient-to-br from-[#FF6B00] via-[#FF5812] to-[#E64C00] p-8 md:p-10 flex flex-col justify-between text-white overflow-hidden shrink-0">
            {/* Subtle grid pattern for texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            {/* Radial highlight glow overlay */}
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
                <span className="text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">SOFTREE AI SOLUTIONS</span>
              </div>
            </div>
          </div>

          {/* Right Column - Dark Content Area */}
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
