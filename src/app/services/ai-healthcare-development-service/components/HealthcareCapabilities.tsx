"use client";

import React from "react";
import { Cpu, Sparkles, Workflow, Bot, TrendingUp, FileText, Database, Layers } from "lucide-react";

const capabilities = [
  {
    icon: Cpu,
    title: "Healthcare AI Development",
    description:
      "Custom AI solutions engineered for healthcare providers, health-tech companies, hospitals, and clinical platforms.",
    accent: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-200/60",
    iconColor: "text-blue-600",
  },
  {
    icon: Sparkles,
    title: "Generative AI Solutions",
    description:
      "Production-grade LLMs and RAG systems for intelligent medical knowledge synthesis and automated clinical assistance.",
    accent: "from-orange-500/10 to-amber-500/10",
    border: "border-orange-200/60",
    iconColor: "text-orange-600",
  },
  {
    icon: Workflow,
    title: "AI Healthcare Automation",
    description:
      "End-to-end clinical and operational workflow automation to reduce administrative overhead and accelerate care delivery.",
    accent: "from-purple-500/10 to-pink-500/10",
    border: "border-purple-200/60",
    iconColor: "text-purple-600",
  },
  {
    icon: Bot,
    title: "Healthcare Chatbots",
    description:
      "Intelligent patient concierge and staff assistance chatbots providing 24/7 policy answering and appointment scheduling.",
    accent: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-200/60",
    iconColor: "text-emerald-600",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description:
      "Advanced predictive models for patient risk stratifications, diagnostic foresight, and operational resource planning.",
    accent: "from-cyan-500/10 to-blue-500/10",
    border: "border-cyan-200/60",
    iconColor: "text-cyan-600",
  },
  {
    icon: FileText,
    title: "Healthcare Document AI",
    description:
      "Automated extraction, OCR, and intelligent parsing for medical charts, clinical notes, and insurance documentation.",
    accent: "from-rose-500/10 to-red-500/10",
    border: "border-rose-200/60",
    iconColor: "text-rose-600",
  },
  {
    icon: Database,
    title: "Medical Data Processing",
    description:
      "Unified clinical data pipelines capable of integrating 125+ lab test parameters and EHR systems for deep health insights.",
    accent: "from-amber-500/10 to-orange-500/10",
    border: "border-amber-200/60",
    iconColor: "text-amber-600",
  },
  {
    icon: Layers,
    title: "AI Integration Services",
    description:
      "Seamless integration of custom AI models into existing EHR/EMR platforms, SMART on FHIR, HL7, and internal APIs.",
    accent: "from-indigo-500/10 to-blue-500/10",
    border: "border-indigo-200/60",
    iconColor: "text-indigo-600",
  },
];

export function HealthcareCapabilities() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-blue-600 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Core Offerings
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Our AI Healthcare{" "}
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Development Services
            </span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            From clinical decision support to administrative automation, we design custom healthcare AI systems engineered for security, speed, and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`group relative p-6 rounded-3xl border ${item.border} bg-gradient-to-b ${item.accent} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center mb-5 ${item.iconColor}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 group-hover:text-gray-900 transition-colors pt-2">
                  <span>Explore Service</span>
                  <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
