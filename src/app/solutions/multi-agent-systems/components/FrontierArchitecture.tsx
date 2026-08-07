"use client";

import { motion } from "framer-motion";
import { Check, Cpu, Sparkles, ShieldCheck } from "lucide-react";
import SectionBadge from "./SectionBadge";

interface ArchitectureCard {
  layerTag: string;
  title: string;
  subtitle: string;
  features: { label: string; text: string }[];
  icon: React.ComponentType<any>;
  iconClass: string;
}

const CARDS_DATA: ArchitectureCard[] = [
  {
    layerTag: "LAYER_01",
    title: "Orchestrator",
    subtitle: "The coordination and reasoning layer for agent teams",
    icon: Cpu,
    iconClass: "bg-orange-50 border-orange-100/80 text-[#FF5812] shadow-[0_0_15px_rgba(255,88,18,0.1)]",
    features: [
      { label: "Performance", text: "Minimizes latency overhead with high-performance routing models." },
      { label: "Logic Control", text: "Unifies reasoning, context management, and routing in a single layer." },
      { label: "Decomposition", text: "Dynamically decomposes tasks and delegates to specialized sub-agents." }
    ]
  },
  {
    layerTag: "LAYER_02",
    title: "Shared Memory",
    subtitle: "The semantic search and persistent context layer",
    icon: Sparkles,
    iconClass: "bg-blue-50 border-blue-100/80 text-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.1)]",
    features: [
      { label: "Context Sync", text: "Captures short-term agent memory and long-term enterprise knowledge." },
      { label: "Vector Search", text: "Employs grounded vector embeddings for permission-aware retrieval." },
      { label: "Integrations", text: "Syncs databases, file systems, and API outputs across the entire team." }
    ]
  },
  {
    layerTag: "LAYER_03",
    title: "Governor",
    subtitle: "The alignment, security, and human-in-the-loop gate",
    icon: ShieldCheck,
    iconClass: "bg-emerald-50 border-emerald-100/80 text-emerald-600 shadow-[0_0_15px_rgba(5,150,105,0.1)]",
    features: [
      { label: "Guardrails", text: "Prioritizes security policies, safety guidelines, and toxicity filters." },
      { label: "Evaluation", text: "Validates generated outputs against quality and hallucination thresholds." },
      { label: "Human Loop", text: "Escalates complex, low-confidence decisions to manual review gates." }
    ]
  }
];

export default function FrontierArchitecture() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-transparent overflow-hidden font-sans">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col items-center w-full mb-14 lg:mb-20 text-center">
          <SectionBadge text="MULTI-AGENT ARCHITECTURE" variant="line" />

          <h2 className="text-3xl md:text-5xl lg:text-[2.75rem] font-extrabold text-[#111827] mt-3 mb-4 tracking-tight leading-tight">
            Architected for autonomous agent coordination
          </h2>

          <p className="text-[15px] lg:text-[17px] text-[#6B7280] max-w-2xl leading-relaxed">
            Power mission-critical workflows with high-performance agent architectures.
          </p>
        </div>

        {/* ================= ONE UNIFIED TRAY WRAPPER ================= */}
        <div className="relative rounded-[44px] bg-[#FAF9F6]/40 border border-slate-200/40 p-8 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.01)] backdrop-blur-sm">
          
          {/* Top Status Header Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/50 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812] animate-pulse" />
              <span className="font-mono text-[9px] font-bold tracking-widest text-slate-400 uppercase">Multi-Agent Communication Network</span>
            </div>
            <div className="font-mono text-[9px] text-slate-400 font-bold">STATUS: ACTIVE</div>
          </div>

          {/* Animated Connecting Flow Line */}
          <div className="absolute top-[162px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent pointer-events-none hidden md:block z-0">
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#FF5812] shadow-[0_0_8px_#FF5812]"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative z-10">
            {CARDS_DATA.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div 
                  key={idx}
                  className="flex flex-col justify-between p-8 sm:p-10 rounded-[28px] bg-gradient-to-br from-[#FF5812] via-[#120B09] to-[#050404] border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_50px_rgba(255,88,18,0.15)] hover:-translate-y-1.5 transition-all duration-300 group text-white"
                >
                  <div>
                    {/* Header Row (Icon + Layer Tag) */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/20 bg-white/10 text-white transition-transform duration-500 group-hover:scale-105">
                        <Icon size={22} />
                      </div>
                      <span className="font-mono text-[9px] font-bold tracking-widest text-white/90 bg-white/10 border border-white/15 px-2.5 py-1 rounded-md">
                        {card.layerTag}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
                      {card.title}
                    </h3>
                    
                    <p className="text-[13.5px] text-orange-100/90 leading-relaxed mb-6 font-medium">
                      {card.subtitle}
                    </p>

                    {/* Divider Line */}
                    <div className="h-px bg-white/15 w-full mb-6" />

                    {/* Features List */}
                    <ul className="space-y-4">
                      {card.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex gap-3.5 items-start">
                          <div className="w-[18px] h-[18px] rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-white mt-1">
                            <Check size={10} className="stroke-[3]" />
                          </div>
                          <span className="text-[13px] leading-relaxed text-orange-50/95">
                            <strong className="font-bold text-white">{feature.label}:</strong> {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
