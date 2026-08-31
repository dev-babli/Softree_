"use client";

import React from "react";
import {
  Database,
  Globe,
  Cpu,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Server,
  Smartphone,
  Bot,
  FileText,
  Activity,
  Stethoscope,
  Shield,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";

const sources = [
  {
    icon: Server,
    name: "EHR / EMR",
    detail: "Epic, Cerner, AthenaHealth",
    color: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-400/30",
    badge: "FHIR / HL7",
  },
  {
    icon: Globe,
    name: "CRM Systems",
    detail: "Salesforce, HubSpot, Patient CRM",
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-400/30",
    badge: "Patient Data",
  },
  {
    icon: Layers,
    name: "APIs & Webhooks",
    detail: "SMART on FHIR, REST, GraphQL",
    color: "from-cyan-500/20 to-teal-500/20",
    border: "border-cyan-400/30",
    badge: "Real-time",
  },
  {
    icon: Database,
    name: "Databases & PACS",
    detail: "SQL, Snowflake, DICOM Imaging",
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-400/30",
    badge: "Clinical Records",
  },
];

const destinations = [
  {
    icon: Bot,
    name: "Patient Concierge Apps",
    detail: "24/7 Chatbots & Schedulers",
  },
  {
    icon: Activity,
    name: "Clinical Decision Support",
    detail: "Lab analytics & Triage AI",
  },
  {
    icon: FileText,
    name: "Document AI & Charting",
    detail: "Automated SOAP notes & OCR",
  },
  {
    icon: Smartphone,
    name: "Enterprise Dashboards",
    detail: "Operational workflows & RCM",
  },
];

const techCategories = [
  {
    icon: Stethoscope,
    category: "Healthcare Standards",
    tools: ["HL7 FHIR v4", "SMART on FHIR", "DICOMweb", "SNOMED CT", "RxNorm", "ICD-10 / ICD-11"],
  },
  {
    icon: Cpu,
    category: "Medical AI & LLMs",
    tools: ["Med-PaLM 2", "BioBERT", "ClinicalBERT", "PyTorch", "TensorFlow", "LangChain / LangGraph"],
  },
  {
    icon: Server,
    category: "Healthcare Cloud Platforms",
    tools: ["AWS HealthOmics", "Azure Health Data Services", "Google Cloud Healthcare API", "AWS HealthLake"],
  },
  {
    icon: Shield,
    category: "Security & Compliance",
    tools: ["HIPAA BAA Guardrails", "AES-256 Encryption", "Zero-Trust Architecture", "SOC 2 Type II", "GDPR Health Data"],
  },
];

export function HealthcareTechStack() {
  return (
    <section className="py-20 bg-zinc-50 border-y border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-orange-600 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Your Existing Healthcare Ecosystem
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Integration{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Capabilities
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Integrate AI with your existing applications, APIs, databases, EHR/EMR platforms, and business workflows.
          </p>
        </div>

        {/* SECTION 8 WIREFRAME DIAGRAM CONTAINER */}
        <div className="bg-black rounded-[32px] p-6 sm:p-10 md:p-12 border border-zinc-800 shadow-2xl mb-16 text-white relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/15 blur-[120px] pointer-events-none rounded-full" />

          {/* Diagram Title Banner */}
          <div className="text-center mb-10 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Healthcare AI Ecosystem Integration</span>
            </span>
          </div>

          {/* 3-Column Architecture Diagram Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Animated Spider Lines (Desktop Only) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0" style={{ filter: 'drop-shadow(0 0 4px rgba(255,88,18,0.5))' }}>
              <style>
                {`
                  @keyframes dash {
                    to { stroke-dashoffset: -20; }
                  }
                  .spider-line {
                    stroke: #FF5812;
                    stroke-width: 1.5;
                    stroke-dasharray: 4 6;
                    animation: dash 1s linear infinite;
                    opacity: 0.5;
                  }
                `}
              </style>
              
              {/* Lines from Center to Left Boxes */}
              <path className="spider-line" d="M50% 50% L33% 15%" />
              <path className="spider-line" d="M50% 50% L33% 38%" />
              <path className="spider-line" d="M50% 50% L33% 62%" />
              <path className="spider-line" d="M50% 50% L33% 85%" />
            
              {/* Lines from Center to Right Boxes */}
              <path className="spider-line" d="M50% 50% L67% 15%" />
              <path className="spider-line" d="M50% 50% L67% 38%" />
              <path className="spider-line" d="M50% 50% L67% 62%" />
              <path className="spider-line" d="M50% 50% L67% 85%" />
            </svg>

            {/* Column 1: Left Input Sources (4 Boxes) */}
            <div className="lg:col-span-4 flex flex-col gap-4 relative z-10">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Existing Data Sources</span>
              </div>

              {sources.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="p-4 rounded-2xl bg-[#09090b] border border-zinc-800 backdrop-blur-md flex items-center justify-between hover:border-orange-500/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#FF5812]/10 border border-[#FF5812]/20 flex items-center justify-center text-[#FF5812] shrink-0">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.detail}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-black text-gray-400 border border-zinc-800 group-hover:border-orange-500/50 shrink-0 transition-colors">
                      {item.badge}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Column 2: Center AI Processing Engine */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center my-4 lg:my-0 relative z-10">
              <div className="w-full relative py-6 px-4 rounded-3xl bg-black border border-orange-500/50 shadow-[0_0_30px_rgba(255,88,18,0.15)] flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,88,18,0.4)] animate-pulse">
                  <Cpu size={32} />
                </div>

                <h3 className="text-xl font-extrabold text-white tracking-wide mb-1">
                  Healthcare AI Layer
                </h3>
                <p className="text-xs text-orange-300 font-medium mb-4 max-w-xs">
                  NLP, Clinical RAG & LLM Engine
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
                    <ShieldCheck size={13} />
                    HIPAA Secure
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
                    SMART on FHIR
                  </span>
                </div>

                <div className="text-[11px] text-gray-400 font-mono bg-black px-3 py-1.5 rounded-lg border border-zinc-800">
                  Data Pipeline ──→ AI Processing ──→ Apps
                </div>
              </div>
            </div>

            {/* Column 3: Right Output Applications (4 Boxes) */}
            <div className="lg:col-span-4 flex flex-col gap-4 relative z-10">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Healthcare Applications</span>
              </div>

              {destinations.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="p-4 rounded-2xl bg-[#09090b] border border-zinc-800 backdrop-blur-md flex items-center gap-3.5 hover:border-orange-500/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FF5812]/10 border border-[#FF5812]/20 flex items-center justify-center text-[#FF5812] shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {item.detail}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
