"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, Compass, CheckCircle2, ArrowRight } from "lucide-react";

export interface ProvenResultItem {
  category: string;
  title: string;
  challenge: string;
  solution: string;
  outcome: string;
  metric: string;
  metricLabel: string;
  link: string;
}

export type SolutionType = "ai-agents" | "ai-copilot" | "ai-workflow" | "enterprise-rag";

const solutionData: Record<SolutionType, ProvenResultItem[]> = {
  "ai-agents": [
    {
      category: "CUSTOMER SERVICE",
      title: "Support Agentic Workflow",
      challenge: "Support teams were flooded with complex queries, causing long wait times and inconsistent answer quality.",
      solution: "Built autonomous customer support agents integrated with knowledge bases and CRM APIs.",
      outcome: "Automated resolution of 68% of support tickets, maintaining a 94% customer satisfaction score.",
      metric: "68%",
      metricLabel: "Ticket Automation",
      link: "/solutions/ai-agents-development"
    },
    {
      category: "SUPPLY CHAIN",
      title: "Inventory Allocation Agent",
      challenge: "Supply chain managers struggled with manual inventory balancing, leading to stockouts and shipping delays.",
      solution: "Deployed multi-agent orchestration to continuously monitor stock levels and automatically generate replenishment requests.",
      outcome: "Cut stockout occurrences and reduced excess warehouse inventory across distribution centers.",
      metric: "40%",
      metricLabel: "Stockout Reduction",
      link: "/solutions/ai-agents-development"
    },
    {
      category: "FINANCE OPERATIONS",
      title: "Audit Compliance Agent",
      challenge: "Manual tracking of invoices and financial documentation delayed period close cycles and increased audit risks.",
      solution: "Architected custom agents to cross-reference transactions against corporate governance rules and flag errors.",
      outcome: "Accelerated financial audit cycles and decreased transaction review times significantly.",
      metric: "10x",
      metricLabel: "Faster Compliance",
      link: "/solutions/ai-agents-development"
    }
  ],
  "ai-copilot": [
    {
      category: "EMPLOYEE PRODUCTIVITY",
      title: "M365 Integrated Copilot",
      challenge: "Information workers spent hours searching for internal documents, reports, and policies across disconnected silos.",
      solution: "Developed custom Copilot Studio agents integrated into Teams and Outlook using Microsoft Graph.",
      outcome: "Saved employees an average of 4.5 hours per week on document search and research tasks.",
      metric: "4.5 hrs",
      metricLabel: "Saved Per Employee",
      link: "/solutions/ai-copilot-development"
    },
    {
      category: "SALES ENABLEMENT",
      title: "CRM Copilot Assistant",
      challenge: "Sales representatives spent too much time updating CRM records and drafting follow-up emails, reducing client face-time.",
      solution: "Configured a custom Dynamics 365 Copilot to automatically summarize meetings and pre-draft pitches.",
      outcome: "Increased pipeline velocity and generated higher client meeting conversion rates.",
      metric: "35%",
      metricLabel: "Meeting Conversion",
      link: "/solutions/ai-copilot-development"
    },
    {
      category: "CUSTOMER ENGAGEMENT",
      title: "Interactive Service Copilot",
      challenge: "General AI chatbots lacked domain-specific context, failing to guide users through complex service inquiries.",
      solution: "Engineered a highly trained, custom Copilot Studio agent with access to technical specs and client records.",
      outcome: "Accelerated first-contact query resolution and reduced support team escalations.",
      metric: "60%",
      metricLabel: "Resolution Speed",
      link: "/solutions/ai-copilot-development"
    }
  ],
  "ai-workflow": [
    {
      category: "DATA ENTRY",
      title: "Intelligent Document Processing",
      challenge: "Teams spent hours copying invoice, shipping, and receipt data from paper/PDFs into ERP systems.",
      solution: "Implemented Azure AI Document Intelligence and Power Automate desktop flow triggers.",
      outcome: "Automated 88% of document processing workloads with near-zero data transcription errors.",
      metric: "88%",
      metricLabel: "Auto Processing",
      link: "/solutions/ai-workflow-automation"
    },
    {
      category: "CUSTOMER ONBOARDING",
      title: "Auto-Validation Pipeline",
      challenge: "Onboarding new accounts required manual verification of IDs, business registration, and credit scores.",
      solution: "Created an automated verification pipeline orchestrating internal APIs and third-party validation services.",
      outcome: "Reduced average account setup time from 4 days down to 10 minutes.",
      metric: "10 MIN",
      metricLabel: "Account Setup",
      link: "/solutions/ai-workflow-automation"
    },
    {
      category: "IT OPERATIONS",
      title: "Alert Response Automations",
      challenge: "System administrators were overwhelmed by standard alerts, delaying responses to critical network events.",
      solution: "Designed automated alert triage workflows to resolve low-priority issues and escalate high-priority events.",
      outcome: "Reduced mean time to resolve system issues and eliminated alert fatigue.",
      metric: "82%",
      metricLabel: "Fewer Admin Alerts",
      link: "/solutions/ai-workflow-automation"
    }
  ],
  "enterprise-rag": [
    {
      category: "KNOWLEDGE MANAGEMENT",
      title: "Semantic Search Portal",
      challenge: "Staff struggled to find specific information within thousands of PDFs, contracts, and wiki pages using keyword search.",
      solution: "Built a RAG system indexing internal content into Azure AI Search using vector embeddings.",
      outcome: "Accurate Q&A retrieval with citation backing, cutting research time substantially.",
      metric: "90%",
      metricLabel: "Search Time Cut",
      link: "/solutions/enterprise-rag-development"
    },
    {
      category: "CONTRACT ANALYSIS",
      title: "Legal Document Q&A",
      challenge: "Reviewing agreements to locate compliance clauses and expiration dates required extensive legal review.",
      solution: "Designed an enterprise RAG query interface optimized for reading PDF contracts and comparing provisions.",
      outcome: "Enabled instant discovery of liability details and accelerated legal review cycles.",
      metric: "80%",
      metricLabel: "Faster Reviews",
      link: "/solutions/enterprise-rag-development"
    },
    {
      category: "TECHNICAL SUPPORT",
      title: "Engineering Knowledge Base",
      challenge: "Field engineers struggled to troubleshoot complex machinery errors using heavy manuals on-site.",
      solution: "Deployed a mobile-friendly RAG chatbot serving equipment spec sheets and history data.",
      outcome: "92% first-time repair rate for field technicians operating under strict SLAs.",
      metric: "92%",
      metricLabel: "First-time Repair",
      link: "/solutions/enterprise-rag-development"
    }
  ]
};

interface ProvenResultsProps {
  solution?: SolutionType;
  results?: ProvenResultItem[];
  badgeText?: string;
  title?: string;
  highlightedTitleWord?: string;
  subtitle?: string;
}

export default function ProvenResults({
  solution = "ai-agents",
  results,
  badgeText = "PROVEN RESULTS",
  title = "Delivering Proven AI Solutions With",
  highlightedTitleWord = "Measurable Impact",
  subtitle = "Explore how our enterprise-grade AI applications drive real-world efficiency, scale, and tangible ROI for our clients."
}: ProvenResultsProps) {
  
  const activeResults = results || solutionData[solution] || solutionData["ai-agents"];

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden font-sans bg-white">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          {/* Custom Section Badge */}
          <div className="mb-4 flex items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
              <div className="absolute left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
            </div>
            <span className="text-[#FF5812] font-bold tracking-[0.2em] text-[11px] uppercase">
              {badgeText}
            </span>
            <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
              <div className="absolute right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#111827] mt-4 mb-4 tracking-tight leading-tight">
            {title} <span className="text-[#FF5812]">{highlightedTitleWord}</span>
          </h2>
          <p className="text-[16px] lg:text-[17px] text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10">
          {activeResults.map((result, idx) => {
            const gradientBg = idx === 0 
              ? "from-blue-600 to-blue-500" 
              : idx === 1 
                ? "from-[#FF6B00] via-[#FF5812] to-[#E64C00]" 
                : "from-purple-600 to-purple-500";
            return (
              <div 
                key={idx} 
                className="flex flex-row items-stretch gap-4 sm:gap-6 bg-slate-50/40 border border-slate-200/50 p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm hover:border-[#FF5812]/10 transition-all duration-300"
              >
                {/* Left Content Block */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">
                      {result.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 leading-tight">
                      {result.title}
                    </h3>

                    {/* Challenge */}
                    <div className="flex items-start gap-2.5 mb-4">
                      <span className="p-1 rounded-lg bg-orange-50 text-orange-500 border border-orange-100 shrink-0 mt-0.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <h4 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-0.5">Business Challenge</h4>
                        <p className="text-[12.5px] text-slate-600 leading-relaxed">{result.challenge}</p>
                      </div>
                    </div>

                    {/* Solution */}
                    <div className="flex items-start gap-2.5 mb-4">
                      <span className="p-1 rounded-lg bg-blue-50 text-blue-500 border border-blue-100 shrink-0 mt-0.5">
                        <Compass className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <h4 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-0.5">Our Solution</h4>
                        <p className="text-[12.5px] text-slate-600 leading-relaxed">{result.solution}</p>
                      </div>
                    </div>

                    {/* Outcome */}
                    <div className="flex items-start gap-2.5">
                      <span className="p-1 rounded-lg bg-green-50 text-green-500 border border-green-100 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <h4 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-0.5">Outcome</h4>
                        <p className="text-[12.5px] text-slate-600 leading-relaxed">{result.outcome}</p>
                      </div>
                    </div>
                  </div>

                  <Link 
                    href={result.link} 
                    className="inline-flex items-center gap-1 text-[12px] font-bold text-[#FF5812] hover:underline mt-6"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Right Vertical Metric Pill Card */}
                <div className={`w-[85px] sm:w-[95px] shrink-0 rounded-[1.25rem] bg-gradient-to-b ${gradientBg} border border-white/10 overflow-hidden relative shadow-md flex flex-col justify-end p-4 text-white`}>
                  {/* Subtle Grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:0.75rem_0.75rem] pointer-events-none" />
                  {/* Highlight Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />

                  <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight leading-none mb-1">
                      {result.metric}
                    </div>
                    <div className="text-[8px] sm:text-[9px] font-bold opacity-90 leading-tight uppercase">
                      {result.metricLabel}
                    </div>
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
