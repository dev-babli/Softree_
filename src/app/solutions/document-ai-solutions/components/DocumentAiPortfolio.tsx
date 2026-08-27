"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield, Database, Sparkles, Code, Cpu, Lock, ScanSearch, Workflow } from "lucide-react";
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge";

const PORTFOLIO_DATA = [
  {
    index: "01 - 06",
    tabLabel: "Document AI Consulting",
    title: "Document AI Strategy & Consulting",
    description: "Map unstructured data extraction roadmaps, audit document privacy, and design secure OCR and parser pipelines.",
    icon: Sparkles,
    accordions: [
      {
        id: "01",
        title: "Layout analysis & discovery",
        content: "Identify physical and logical structures in complex corporate documents, tables, lists, and handwritten papers to determine extraction feasibility."
      },
      {
        id: "02",
        title: "Tool selection & benchmarking",
        content: "Benchmark Azure Document Intelligence against other solutions to determine the most cost-effective and accurate parser for your file types."
      },
      {
        id: "03",
        title: "Security & privacy blueprinting",
        content: "Architect network isolation and data lifecycle boundaries to ensure compliance with strict privacy standards (GDPR, HIPAA, SOC2)."
      }
    ]
  },
  {
    index: "02 - 06",
    tabLabel: "Parsers & RAG Integration",
    title: "Custom Parsers & RAG Integration",
    description: "Ground AI applications securely in clean, parsed text from complex forms, invoices, receipts, and operational reports.",
    icon: Database,
    accordions: [
      {
        id: "01",
        title: "Layout-aware semantic search",
        content: "Index documents in vector databases while preserving logical reading order, nested tables, headers, and metadata tags."
      },
      {
        id: "02",
        title: "Automated indexing & metadata",
        content: "Extract, classify, and tag key fields automatically to build rich, queryable knowledge libraries out of static archives."
      },
      {
        id: "03",
        title: "Downstream system pipelines",
        content: "Wire structured JSON outputs from document parsers directly to ERPs, CRMs, or legacy operational databases with zero manual entry."
      }
    ]
  },
  {
    index: "03 - 06",
    tabLabel: "Governance & Safety",
    title: "Security Governance & Quality Safety",
    description: "Audit extraction confidence scores, redact sensitive fields, and implement human-in-the-loop validations in production.",
    icon: Shield,
    accordions: [
      {
        id: "01",
        title: "PII masking & redaction",
        content: "Automatically search, detect, and mask sensitive numbers, addresses, and medical information before database storage."
      },
      {
        id: "02",
        title: "Confidence score thresholds",
        content: "Trigger automated human-in-the-loop review queues whenever extraction confidence scores drop below your defined security threshold."
      },
      {
        id: "03",
        title: "Workflow audit trails",
        content: "Keep track of document ingestions, parser versions, human corrections, and safety filter triggers for security review."
      }
    ]
  },
  {
    index: "04 - 06",
    tabLabel: "OCR & Extraction",
    title: "Enterprise OCR & IDP",
    description: "Deploy state-of-the-art layout-aware optical character recognition models to extract text from tabular, handwriting, and rotated documents.",
    icon: ScanSearch,
    accordions: [
      {
        id: "01",
        title: "Handwriting recognition",
        content: "Extract handwritten annotations, signatures, and checkbox patterns from scanned PDFs with high precision."
      },
      {
        id: "02",
        title: "Rotated & low-resolution scanning",
        content: "Normalize skewed, low-resolution phone photographs of receipts and slips before running extraction pipelines."
      },
      {
        id: "03",
        title: "Dynamic table parsing",
        content: "Identify complex tabular data grids, multi-page tables, and nested cells, mapping them into standard spreadsheet schemas."
      }
    ]
  },
  {
    index: "05 - 06",
    tabLabel: "Document Classification",
    title: "Document Classification & Routing",
    description: "Automatically classify document types (mortgages, tax returns, contracts) and route them to their respective validation queues.",
    icon: Cpu,
    accordions: [
      {
        id: "01",
        title: "Custom classifier models",
        content: "Train custom classifiers on unique form templates to segment multi-page document packages automatically."
      },
      {
        id: "02",
        title: "Confidence-based routing",
        content: "Define minimum thresholds to automatically flag low-confidence classifications for manual expert review."
      },
      {
        id: "03",
        title: "Metadata auto-tagging",
        content: "Derive key metrics (vendor name, total amount, contract term) to categorize files for fast database indexing."
      }
    ]
  },
  {
    index: "06 - 06",
    tabLabel: "Azure AI Integration",
    title: "Azure Document Intelligence Integration",
    description: "Fully integrate document extraction with Microsoft 365, SharePoint, Azure Synapse, and native Power Automate workflows.",
    icon: Code,
    accordions: [
      {
        id: "01",
        title: "Power Automate connectors",
        content: "Wire custom document extraction steps directly inside cloud-based flow systems triggered by incoming document emails."
      },
      {
        id: "02",
        title: "Blob container listeners",
        content: "Listen to designated secure Azure Blob storage folders, triggering document parsing automatically upon ingestion."
      },
      {
        id: "03",
        title: "Data lake warehousing",
        content: "Load parsed JSON structures straight into enterprise warehouses like Azure Synapse or Microsoft Fabric."
      }
    ]
  }
];

export default function DocumentAiPortfolio() {
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
          <SectionBadge text="PORTFOLIO OF SOLUTIONS" variant="line" />
          <h2 className="mt-4 text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-3 md:mb-4 tracking-tight text-center leading-tight">
            Choose from Our Time-Tested Portfolio of <span className="text-[#FF5812]">Document AI Services</span>
          </h2>
          <p className="text-[15px] lg:text-base text-[#6B7280] text-center max-w-2xl mx-auto leading-relaxed">
            Extract value from unstructured archives with layout-aware parsers, automated database indexing, and secure governance safety gates.
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
                <span className="text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">SOFTREE DOCUMENT AI</span>
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
