"use client";

import React from "react";
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import { FlowButton } from "@/components/ui/flow-button";

const demoData: Gallery4Props = {
  title: (
    <div className="flex flex-col items-start">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-xs sm:text-[12px] font-bold tracking-widest text-[#FF6B00] uppercase mb-4 w-fit">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
        LOGISTICS &amp; SUPPLY CHAIN CASE STUDIES
      </div>
      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 tracking-tight leading-[1.12] text-left">
        See Engineering &amp; AI in Action Across Logistics
      </span>
    </div>
  ) as any,

  description:
    "Explore how custom software engineering, AI, and enterprise data solutions solve complex transportation, warehousing, and visibility challenges.",

  items: [
    {
      id: "logistics-control-tower-shipment-visibility-platform",
      title: "Logistics Control Tower & Visibility",
      description: (
        <div className="space-y-2.5 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <div className="flex items-start gap-2.5 text-sm">
            <span className="text-[#FF6B2C] font-mono font-bold uppercase text-xs tracking-wider shrink-0 mt-0.5 w-[75px]">
              Challenge
            </span>
            <span className="text-white/95 text-sm sm:text-[14.5px] font-normal leading-relaxed">
              A 3PL managing 5M+ shipments across 15 distribution centers had fragmented data across TMS, WMS, and carrier portals, causing delivery blind spots.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-sm">
            <span className="text-[#FF6B2C] font-mono font-bold uppercase text-xs tracking-wider shrink-0 mt-0.5 w-[75px]">
              Solution
            </span>
            <span className="text-white/95 text-sm sm:text-[14.5px] font-normal leading-relaxed">
              Centralized Microsoft Fabric &amp; Azure ML control tower unifying multi-carrier feeds with real-time tracking, delay alerts, and predictive ETAs.
            </span>
          </div>
        </div>
      ),
      href: "/case-studies/logistics-control-tower-shipment-visibility-platform",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&h=1500&q=85",
    },
    {
      id: "intelligent-warehouse-operations-assistant-with-ai-agents",
      title: "Intelligent Warehouse Operations Assistant",
      description: (
        <div className="space-y-2.5 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <div className="flex items-start gap-2.5 text-sm">
            <span className="text-[#FF6B2C] font-mono font-bold uppercase text-xs tracking-wider shrink-0 mt-0.5 w-[75px]">
              Challenge
            </span>
            <span className="text-white/95 text-sm sm:text-[14.5px] font-normal leading-relaxed">
              Warehouse operators spent excessive hours manually cross-checking inventory and order statuses across disconnected WMS, ERP, and SOP documents.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-sm">
            <span className="text-[#FF6B2C] font-mono font-bold uppercase text-xs tracking-wider shrink-0 mt-0.5 w-[75px]">
              Solution
            </span>
            <span className="text-white/95 text-sm sm:text-[14.5px] font-normal leading-relaxed">
              Voice-enabled multi-agent assistant powered by Amazon Nova 2 Sonic, LangGraph, and RAG for instant hands-free floor intelligence and exception triage.
            </span>
          </div>
        </div>
      ),
      href: "/case-studies/intelligent-warehouse-operations-assistant-with-ai-agents",
      image: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&h=1500&q=85",
    },
    {
      id: "ai-powered-shipment-exception-management",
      title: "AI Shipment Exception Management",
      description: (
        <div className="space-y-2.5 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <div className="flex items-start gap-2.5 text-sm">
            <span className="text-[#FF6B2C] font-mono font-bold uppercase text-xs tracking-wider shrink-0 mt-0.5 w-[75px]">
              Challenge
            </span>
            <span className="text-white/95 text-sm sm:text-[14.5px] font-normal leading-relaxed">
              Manual exception triage across international air, ocean, and drayage carriers caused delayed responses, missed delivery windows, and high detention costs.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-sm">
            <span className="text-[#FF6B2C] font-mono font-bold uppercase text-xs tracking-wider shrink-0 mt-0.5 w-[75px]">
              Solution
            </span>
            <span className="text-white/95 text-sm sm:text-[14.5px] font-normal leading-relaxed">
              Autonomous AI exception classification and recommendation pipeline that detects shipment anomalies, prioritizes severity, and executes resolution workflows.
            </span>
          </div>
        </div>
      ),
      href: "/case-studies/ai-powered-shipment-exception-management",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&h=1500&q=85",
    },
    {
      id: "ai-based-fraud-detection-in-logistics",
      title: "AI Fraud Detection in Logistics",
      description: (
        <div className="space-y-2.5 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <div className="flex items-start gap-2.5 text-sm">
            <span className="text-[#FF6B2C] font-mono font-bold uppercase text-xs tracking-wider shrink-0 mt-0.5 w-[75px]">
              Challenge
            </span>
            <span className="text-white/95 text-sm sm:text-[14.5px] font-normal leading-relaxed">
              Freight invoice discrepancies, identity spoofing, duplicate carrier billing, and cargo diversion went unnoticed in high-volume shipping corridors.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-sm">
            <span className="text-[#FF6B2C] font-mono font-bold uppercase text-xs tracking-wider shrink-0 mt-0.5 w-[75px]">
              Solution
            </span>
            <span className="text-white/95 text-sm sm:text-[14.5px] font-normal leading-relaxed">
              Predictive AI anomaly detection engine auditing bills of lading, weigh-station telemetry, carrier identity feeds, and historical invoice patterns in real time.
            </span>
          </div>
        </div>
      ),
      href: "/case-studies/ai-based-fraud-detection-in-logistics",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=1500&q=85",
    },
    {
      id: "ai-driven-logistics-cost-optimization-microsoft-foundry",
      title: "Cost Optimization with Microsoft Foundry",
      description: (
        <div className="space-y-2.5 bg-[#0a0f1d]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <div className="flex items-start gap-2.5 text-sm">
            <span className="text-[#FF6B2C] font-mono font-bold uppercase text-xs tracking-wider shrink-0 mt-0.5 w-[75px]">
              Challenge
            </span>
            <span className="text-white/95 text-sm sm:text-[14.5px] font-normal leading-relaxed">
              Escalating fuel costs, unoptimized deadhead miles, and volatile spot rates eroded operating margins across complex enterprise distribution networks.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-sm">
            <span className="text-[#FF6B2C] font-mono font-bold uppercase text-xs tracking-wider shrink-0 mt-0.5 w-[75px]">
              Solution
            </span>
            <span className="text-white/95 text-sm sm:text-[14.5px] font-normal leading-relaxed">
              Microsoft Foundry AI optimization engine delivering dynamic freight lane pooling, automated carrier rate benchmarking, and route consolidation.
            </span>
          </div>
        </div>
      ),
      href: "/case-studies/ai-driven-logistics-cost-optimization-microsoft-foundry",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=1500&q=85",
    },
  ],
};

export default function LogisticsCaseStudies() {
  return (
    <div className="relative bg-white flex flex-col items-center">
      <div className="w-full">
        <Gallery4 
          {...demoData} 
          action={
            <FlowButton 
              href="/case-studies" 
              text="Explore All Logistics Case Studies"
              variant="orange-filled"
              className="py-3 px-6 text-sm sm:text-base font-bold shadow-md"
            />
          }
        />
      </div>
    </div>
  );
}
