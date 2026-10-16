"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScanText, BrainCircuit, Workflow, ShieldCheck, LucideIcon } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: ScanText,
    title: "Intelligent OCR & Document Extraction",
    description:
      "Extract structured data from invoices, contracts, forms, and mixed-format documents with high accuracy using Azure AI Document Intelligence and custom-trained models.",
  },
  {
    icon: BrainCircuit,
    title: "Multimodal Document Understanding",
    description:
      "Process scanned PDFs, images, handwritten documents, and complex layouts using multimodal AI models that understand both text and visual structure.",
  },
  {
    icon: Workflow,
    title: "ERP, CRM & Workflow Integration",
    description:
      "Connect extracted document data directly to SAP, Dynamics 365, SharePoint, databases, and downstream business workflows through approved APIs and connectors.",
  },
  {
    icon: ShieldCheck,
    title: "Validation, Governance & Audit Trails",
    description:
      "Implement confidence scoring, exception handling, human-in-the-loop review, and audit logging to ensure document AI solutions are accurate, compliant, and maintainable.",
  },
];

export default function DocumentAiReadinessBanner() {
  return (
    <section className="relative w-full pt-16 lg:pt-24 pb-12 lg:pb-16 bg-transparent overflow-hidden font-sans">
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* Main Banner Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full rounded-[32px] overflow-hidden bg-white border border-slate-200/80 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row items-stretch"
        >
          {/* Subtle grid background overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

          {/* Light peach background glow */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#FF6B2C]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Content Side */}
          <div className="relative z-10 flex-[1.25] p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start">

            {/* Eyebrow Pill */}
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/70 px-4 py-1.5 rounded-full border border-white/60 mb-5 inline-block">
              <span className="typo-caption font-bold tracking-wider text-[#FF6B2C] uppercase">
                DOCUMENT AI DEVELOPMENT CAPABILITIES
              </span>
            </div>

            {/* Headline */}
            <h2 className="typo-heading-2 font-bold tracking-tight text-slate-900 mb-4 max-w-[580px]">
              Build Intelligent Document AI Pipelines for{" "}
              <span className="text-[#FF6B2C]">Automated Workflows</span>
            </h2>

            {/* Description Paragraph */}
            <p className="typo-description text-slate-600 font-normal leading-relaxed max-w-[550px] mb-8">
              Extend your engineering team with custom Document AI systems. We design extraction pipelines, integrate enterprise systems, and deliver scalable AI solutions via offshore and white-label delivery.
            </p>

            {/* 4 Feature Items List */}
            <div className="flex flex-col gap-5 w-full max-w-xl">
              {FEATURES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-orange-200/80 bg-orange-50/80 flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:border-[#FF6B2C]/40 group-hover:bg-orange-100/60 transition-colors duration-200">
                      <Icon className="w-5 h-5 text-[#FF6B2C]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="typo-heading-4 font-semibold text-slate-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="typo-body-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="inline-block mt-9">
              <FlowButton
                href="/contact"
                text="EXPLORE DOCUMENT AI SOLUTIONS"
                variant="orange-filled"
              />
            </div>

          </div>

          {/* Right Video Side — full-bleed so the clip fills the card edge to edge */}
          <div
            itemScope
            itemType="https://schema.org/VideoObject"
            className="relative flex min-h-[360px] flex-1 items-center justify-center overflow-hidden border-t border-slate-100 bg-slate-900 sm:min-h-[440px] lg:min-h-full lg:border-l lg:border-t-0"
          >
            <meta itemProp="name" content="Enterprise Document AI Solutions & Workflow Automation Overview" />
            <meta itemProp="description" content="Discover how Softree Technology builds enterprise Document AI systems: intelligent OCR, multimodal document understanding, and automated ERP/CRM workflow integration." />
            <meta itemProp="thumbnailUrl" content="https://www.softreetechnology.com/documentai-video/document-ai-capabilities-poster.jpg" />
            <meta itemProp="uploadDate" content="2025-01-15T08:00:00+00:00" />
            <meta itemProp="duration" content="PT10S" />
            <meta itemProp="contentUrl" content="https://www.softreetechnology.com/documentai-video/document-ai-capabilities-v3.mp4" />
            <meta itemProp="embedUrl" content="https://www.softreetechnology.com/solutions/document-ai-solutions" />

            <div itemProp="publisher" itemScope itemType="https://schema.org/Organization" className="hidden">
              <meta itemProp="name" content="Softree Technology" />
              <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
                <meta itemProp="url" content="https://www.softreetechnology.com/logo/logo.png" />
              </div>
            </div>

            <video
              itemProp="video"
              src="/documentai-video/document-ai-capabilities-v3.mp4"
              poster="/documentai-video/document-ai-capabilities-poster.jpg"
              title="Enterprise Document AI Solutions & Workflow Automation Overview"
              aria-label="Enterprise Document AI Solutions & Workflow Automation Overview"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              controls={false}
              className="absolute inset-0 h-full w-full select-none object-cover object-center"
            >
              <source src="/documentai-video/document-ai-capabilities-v3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r" />
          </div>

        </motion.div>

      </div>
    </section>
  );
}
