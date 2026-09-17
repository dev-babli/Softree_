"use client";

import React from "react";
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

const demoData: Gallery4Props = {
  title: (
    <div className="flex flex-col items-start">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4 w-fit">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
        HEALTHCARE AI CASE STUDIES
      </div>
      <span className="typo-heading-2 text-slate-900 leading-tight text-left">
        See AI Engineering in Action Across Healthcare
      </span>
    </div>
  ) as any,

  description:
    "Explore how AI, automation, and intelligent data solutions can address complex healthcare workflows and operational challenges.",

  items: [
    {
      id: "ai-prior-authorization",
      title: "AI-Powered Prior Authorization",
      description: (
        <div className="space-y-2.5 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <div className="flex items-start gap-2.5 text-xs">
            <span className="text-[#FF6B2C] typo-caption-meta font-bold uppercase tracking-wider shrink-0 mt-0.5 w-[75px]">
              Challenge
            </span>
            <span className="text-white/90 typo-body-sm">
              Manual prior authorization creates significant care delays and paperwork.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs">
            <span className="text-[#FF6B2C] typo-caption-meta font-bold uppercase tracking-wider shrink-0 mt-0.5 w-[75px]">
              Solution
            </span>
            <span className="text-white/90 typo-body-sm">
              Intelligent data extraction and automated prior authorization workflows.
            </span>
          </div>
        </div>
      ),
      href: "/case-studies/ai-powered-prior-authorization",
      image: "/images/ai-healthcare-images/health-8.png",
    },
    {
      id: "healthcare-knowledge-intelligence",
      title: "Healthcare Knowledge Intelligence",
      description: (
        <div className="space-y-2.5 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <div className="flex items-start gap-2.5 text-xs">
            <span className="text-[#FF6B2C] typo-caption-meta font-bold uppercase tracking-wider shrink-0 mt-0.5 w-[75px]">
              Challenge
            </span>
            <span className="text-white/90 typo-body-sm">
              Healthcare professionals search across massive siloed data for answers.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs">
            <span className="text-[#FF6B2C] typo-caption-meta font-bold uppercase tracking-wider shrink-0 mt-0.5 w-[75px]">
              Solution
            </span>
            <span className="text-white/90 typo-body-sm">
              RAG healthcare knowledge assistant connecting EHR data with conversational AI.
            </span>
          </div>
        </div>
      ),
      href: "/case-studies/healthcare-knowledge-intelligence",
      image: "/images/ai-healthcare-images/health-7.png",
    },
    {
      id: "intelligent-document-processing",
      title: "Intelligent Document Processing",
      description: (
        <div className="space-y-2.5 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <div className="flex items-start gap-2.5 text-xs">
            <span className="text-[#FF6B2C] typo-caption-meta font-bold uppercase tracking-wider shrink-0 mt-0.5 w-[75px]">
              Challenge
            </span>
            <span className="text-white/90 typo-body-sm">
              High-volume records and claims require extensive manual classification.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs">
            <span className="text-[#FF6B2C] typo-caption-meta font-bold uppercase tracking-wider shrink-0 mt-0.5 w-[75px]">
              Solution
            </span>
            <span className="text-white/90 typo-body-sm">
              AI document understanding and automated structured data extraction.
            </span>
          </div>
        </div>
      ),
      href: "/case-studies/intelligent-healthcare-document-processing",
      image: "/images/ai-healthcare-images/health-6.png",
    },
    {
      id: "healthcare-ai-test-automation",
      title: "Healthcare AI Test Automation",
      description: (
        <div className="space-y-2.5 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <div className="flex items-start gap-2.5 text-xs">
            <span className="text-[#FF6B2C] typo-caption-meta font-bold uppercase tracking-wider shrink-0 mt-0.5 w-[75px]">
              Challenge
            </span>
            <span className="text-white/90 typo-body-sm">
              Manual QA across patient management platforms caused delivery delays and compliance risks.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs">
            <span className="text-[#FF6B2C] typo-caption-meta font-bold uppercase tracking-wider shrink-0 mt-0.5 w-[75px]">
              Solution
            </span>
            <span className="text-white/90 typo-body-sm">
              Autonomous AI test automation suite ensuring HIPAA compliance and zero-defect EHR workflows.
            </span>
          </div>
        </div>
      ),
      href: "/case-studies/healthcare-ai-test-automation-patient-management-platform",
      image: "/images/ai-healthcare-images/health-5.png",
    },
    {
      id: "ai-healthcare-operations-platform",
      title: "AI Healthcare Operations Platform",
      description: (
        <div className="space-y-2.5 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <div className="flex items-start gap-2.5 text-xs">
            <span className="text-[#FF6B2C] typo-caption-meta font-bold uppercase tracking-wider shrink-0 mt-0.5 w-[75px]">
              Challenge
            </span>
            <span className="text-white/90 typo-body-sm">
              High administrative overhead and scheduling friction created significant operational delays.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs">
            <span className="text-[#FF6B2C] typo-caption-meta font-bold uppercase tracking-wider shrink-0 mt-0.5 w-[75px]">
              Solution
            </span>
            <span className="text-white/90 typo-body-sm">
              AI orchestration platform with intelligent agents automating workflows and appointment dispatch.
            </span>
          </div>
        </div>
      ),
      href: "/case-studies/ai-powered-healthcare-operations-platform",
      image: "/images/ai-healthcare-images/health-4.png",
    }
  ],
};

export function Gallery4Demo() {
  return (
    <div className="relative bg-white flex flex-col items-center -mt-4 md:-mt-8">
      <div className="w-full">
        <Gallery4 
          {...demoData} 
          action={
            <FlowButton 
              href="/case-studies" 
              text="Explore Healthcare Case Studies"
              variant="orange-filled"
              className="py-3 px-6 text-xs sm:text-sm font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}

export { Gallery4Demo as HealthcareCaseStudies };
export default Gallery4Demo;
