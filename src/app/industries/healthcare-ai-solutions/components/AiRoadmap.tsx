"use client";

import { CardStack, CardStackItem } from "@/components/ui/card-stack";

// Completely unique, professional B2B engineering roadmap phases with comprehensive clinical descriptions
const roadmapPhases = [
  {
    number: "01",
    title: "DISCOVER",
    description: "We evaluate your clinical workflows, legacy hospital IT systems, and departmental pain points. Through structured discovery sessions with clinical leaders, we identify high-value automation opportunities while establishing clinical safety boundaries.",
  },
  {
    number: "02",
    title: "DEFINE",
    description: "Our teams establish clinical feasibility, regulatory compliance guardrails, and data readiness criteria. We specify custom model architectures, HIPAA protocols, and quantifiable operational benchmarks before writing a single line of code.",
  },
  {
    number: "03",
    title: "DESIGN",
    description: "We engineer secure system architectures, human-in-the-loop clinical interfaces, and resilient agentic workflows. Every design prioritizes frictionless clinician adoption and standards-based EHR and FHIR interoperability.",
  },
  {
    number: "04",
    title: "DEVELOP",
    description: "Our engineers build domain-specific AI models, autonomous healthcare agent networks, and secure microservices. Systems are backed by enterprise-grade data pipelines, audit trails, and HIPAA-compliant cloud infrastructure.",
  },
  {
    number: "05",
    title: "TEST",
    description: "We execute comprehensive clinical accuracy testing, stress testing, edge-case red teaming, and hallucination prevention audits. Every output is validated against medical standards to guarantee patient safety and decision reliability.",
  },
  {
    number: "06",
    title: "DEPLOY",
    description: "We roll out production AI workloads across hybrid or sovereign cloud environments with zero-downtime EHR integrations. We provide phased clinical go-live support, physician onboarding, and real-time operational monitoring.",
  },
  {
    number: "07",
    title: "SUPPORT",
    description: "Our engagement continues with ongoing model drift monitoring, real-world clinical outcome auditing, and continuous fine-tuning. We deliver proactive security updates and system enhancements to maintain peak diagnostic performance.",
  },
];

// Custom advanced, high-fidelity conceptual SVGs representing each roadmap phase conceptually
function PhaseIcon({ number }: { number: string }) {
  if (number === "01") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <defs>
          <linearGradient id="grad-p1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Outer compass ring */}
        <circle cx="24" cy="24" r="21" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
        <circle cx="24" cy="24" r="16" strokeWidth="0.8" className="opacity-30" />
        {/* Target reticle */}
        <path d="M24 3v6M24 39v6M3 24h6M39 24h6" strokeWidth="1.8" strokeLinecap="round" />
        {/* Center node with gradient glow */}
        <circle cx="24" cy="24" r="7" fill="url(#grad-p1)" strokeWidth="1.2" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
        {/* Angled tracking lines */}
        <path d="M12 12l5 5M36 36l-5-5M36 12l-5 5M12 36l5-5" strokeWidth="0.8" strokeLinecap="round" className="opacity-50" />
        {/* Outer ticks */}
        <path d="M10 24h2M36 24h2M24 10v2M24 36v2" strokeWidth="1.2" />
      </svg>
    );
  }
  if (number === "02") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <defs>
          <linearGradient id="grad-p2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Stacked Storage Cylinders */}
        {/* Cylinder 1 (Top) */}
        <path d="M10 12c0-2.8 6.3-5 14-5s14 2.2 14 5-6.3 5-14 5-14-2.2-14-5z" fill="url(#grad-p2)" strokeWidth="1.2" />
        {/* Cylinder 2 (Middle) */}
        <path d="M10 20c0 2.8 6.3 5 14 5s14-2.2 14-5" strokeWidth="1.2" />
        <path d="M10 12v8c0 2.8 6.3 5 14 5s14-2.2 14-5v-8" strokeWidth="0.8" strokeDasharray="2 2" className="opacity-50" />
        {/* Cylinder 3 (Bottom) */}
        <path d="M10 28c0 2.8 6.3 5 14 5s14-2.2 14-5" strokeWidth="1.2" />
        <path d="M10 20v8c0 2.8 6.3 5 14 5s14-2.2 14-5v-8" strokeWidth="1.2" />
        {/* Ingestion Stream Core */}
        <path d="M24 5v18" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20 19l4 4 4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="5" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (number === "03") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <defs>
          <radialGradient id="grad-p3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Neural Core */}
        <rect x="18" y="18" width="12" height="12" rx="3" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="5" fill="url(#grad-p3)" strokeWidth="1" />
        <circle cx="24" cy="24" r="1.5" fill="currentColor" />
        {/* Circuit Tracks */}
        <path d="M24 18V8h-8M18 24H8v-8M24 30v8h8M30 24h8v8" strokeWidth="1.2" strokeLinecap="round" />
        {/* Neural nodes */}
        <circle cx="16" cy="8" r="2.5" fill="currentColor" />
        <circle cx="8" cy="16" r="2.5" fill="currentColor" />
        <circle cx="32" cy="38" r="2" />
        <circle cx="38" cy="32" r="2" />
        {/* Synaptic paths */}
        <path d="M12 12l4 4M36 12l-6 6" strokeWidth="0.8" strokeDasharray="2 2" className="opacity-60" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="36" cy="12" r="1.5" />
      </svg>
    );
  }
  if (number === "04") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        {/* Diamond Node Core */}
        <path d="M24 6l14 14-14 14L10 20z" strokeWidth="1.2" />
        <path d="M24 12l8 8-8 8-8-8z" strokeWidth="0.8" strokeDasharray="2 2" className="opacity-60" />
        {/* Branching Logic */}
        <circle cx="24" cy="20" r="3" fill="currentColor" />
        <path d="M24 23v17M17 33h14" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="33" r="2" />
        <circle cx="31" cy="33" r="2" />
        <circle cx="24" cy="40" r="2.5" fill="currentColor" />
      </svg>
    );
  }
  if (number === "05") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        {/* Secure Shield Polygon */}
        <path d="M24 4L8 10v14c0 11 6.8 21.3 16 24 9.2-2.7 16-13 16-24V10L24 4z" strokeWidth="1.4" />
        <path d="M24 9L12 14v10c0 8.5 5.1 16.5 12 18.5 6.9-2 12-10 12-18.5V14L24 9z" strokeWidth="0.8" strokeDasharray="2 2" className="opacity-40" />
        {/* Verification Checkmark */}
        <path d="M16 24l5 5 11-11" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (number === "06") {
    return (
      <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        {/* Launch Thruster Dynamic Vectors */}
        <path d="M24 4c-5 0-9 4-11 10-2 6-1 12 3 16l8 8 8-8c4-4 5-10 3-16-2-6-6-10-11-10z" strokeWidth="1.4" />
        <circle cx="24" cy="18" r="4" strokeWidth="1.2" />
        <circle cx="24" cy="18" r="1.5" fill="currentColor" />
        <path d="M17 28l-7 7M31 28l7 7" strokeWidth="1.5" strokeLinecap="round" />
        {/* Flame Plume */}
        <path d="M20 38l4 6 4-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className="h-full w-full" viewBox="0 0 48 48" fill="none" stroke="currentColor">
      {/* Infinite Sync Loop */}
      <path d="M14 16h14a8 8 0 010 16H20" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 32H20a8 8 0 010-16h8" strokeWidth="1.5" strokeLinecap="round" />
      {/* Directional Chevrons */}
      <path d="M18 12l-4 4 4 4M30 36l4-4-4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}

export default function AiRoadmap() {
  const items = roadmapPhases.map((phase, i) => ({
    id: phase.number,
    title: phase.title,
    description: phase.description,
    number: phase.number,
    index: i
  }));

  return (
    <section className="w-full bg-[#FBFBFC] py-14 sm:py-16 md:py-20 font-sans relative overflow-hidden border-t border-slate-100">
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-[2cm]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* ================= HEADER ================= */}
          <div className="flex flex-col items-center text-center w-full mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[10px] sm:text-[11px] font-bold tracking-widest text-[#FF6B00] uppercase mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
              CLINICAL DELIVERY PROCESS
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 tracking-tight leading-[1.15] mb-4 max-w-4xl mx-auto">
              Our Structured Delivery Framework for Healthcare AI Solutions
            </h2>
            
            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
              We guide your hospital or healthtech company through a secure, end-to-end model integration lifecycle—ensuring HIPAA compliance, mitigating clinical risks, and accelerating patient outcomes. Our disciplined engineering methodology bridges the gap between raw AI prototypes and scalable, enterprise-grade clinical software that healthcare providers can trust.
            </p>
          </div>

          {/* ================= CARD STACK ================= */}
          <div className="w-full mt-6 sm:mt-8">
            <CardStack 
              items={items}
              autoAdvance={true}
              intervalMs={3500}
              showDots={true}
              cardWidth={720}
              cardHeight={380}
              renderCard={(item, { active }) => {
                const idx = (item as any).index;
                const theme = idx % 3; // 0 = White, 1 = Orange, 2 = Dark
                
                let bgClass = "";
                let borderClass = "";
                let pillBg = "";
                let pillText = "";
                let iconBg = "";
                let iconText = "";
                let titleText = "";
                let descText = "";

                if (theme === 0) { 
                  // White Card
                  bgClass = "bg-white";
                  borderClass = active 
                    ? "border-slate-300 shadow-[0_22px_50px_-10px_rgba(0,0,0,0.12)] ring-1 ring-slate-200" 
                    : "border-slate-200 shadow-md";
                  pillBg = "bg-slate-900";
                  pillText = "text-white";
                  iconBg = active ? "bg-[#FF5812] border-[#FF5812]" : "bg-slate-100 border-slate-200";
                  iconText = active ? "text-white" : "text-slate-900";
                  titleText = "text-slate-900";
                  descText = "text-slate-600";
                } else if (theme === 1) { 
                  // Signature Orange Card
                  bgClass = "bg-gradient-to-br from-[#FF5812] to-[#FF6B2C]";
                  borderClass = active 
                    ? "border-black/20 shadow-[0_24px_55px_rgba(255,88,18,0.28)]" 
                    : "border-transparent shadow-lg";
                  pillBg = "bg-black/90";
                  pillText = "text-white";
                  iconBg = active ? "bg-white border-white" : "bg-black/15 border-transparent";
                  iconText = active ? "text-[#FF5812]" : "text-white";
                  titleText = "text-white";
                  descText = "text-white/95";
                } else { 
                  // Deep Obsidian Card
                  bgClass = "bg-[#0C0D12]";
                  borderClass = active 
                    ? "border-[#FF5812]/50 shadow-[0_24px_55px_rgba(0,0,0,0.3)] ring-1 ring-[#FF5812]/30" 
                    : "border-zinc-800 shadow-xl";
                  pillBg = "bg-[#FF5812]";
                  pillText = "text-white";
                  iconBg = active ? "bg-[#FF5812] border-[#FF5812]" : "bg-zinc-900 border-zinc-800";
                  iconText = active ? "text-white" : "text-orange-400";
                  titleText = "text-white";
                  descText = "text-zinc-300";
                }

                return (
                  <div className={`relative h-full w-full ${bgClass} border ${borderClass} rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500`}>
                    
                    {/* Top Row: Phase Pill & Logo Container */}
                    <div className="flex justify-between items-start w-full relative z-10">
                      <div className={`px-3.5 sm:px-4 py-1.5 rounded-full ${pillBg} flex items-center justify-center`}>
                        <span className={`font-mono font-bold text-xs sm:text-[13px] tracking-widest uppercase ${pillText}`}>
                          Phase {(item as any).number}
                        </span>
                      </div>
                      
                      {/* Premium Logo Container */}
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[20px] flex items-center justify-center transition-all duration-500 border ${iconBg} ${iconText}`}>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10">
                          <PhaseIcon number={(item as any).number} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Row: Text Content */}
                    <div className="relative z-10 mt-auto">
                      <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2.5 sm:mb-3 tracking-tight ${titleText}`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-[95%] font-normal ${descText}`}>
                        {item.description}
                      </p>
                    </div>

                  </div>
                );
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
