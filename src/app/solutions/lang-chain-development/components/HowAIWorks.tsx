"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Database, Activity, ArrowDown } from "lucide-react";
import SectionBadge from "./SectionBadge";
import { workflowSteps } from "../data/how-ai-works";

const icons = [Search, Sparkles, Database, Activity];

export default function HowAIWorks() {
  return (
    <section id="process" className="relative w-full py-16 md:py-24 bg-transparent font-sans">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Responsive Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Sticky */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col justify-center">
            <div className="flex flex-col items-start">
              <SectionBadge text="DEVELOPMENT PROCESS" variant="line" />
              
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold text-[#111827] tracking-tight leading-tight">
                Seamless AI-Driven <br />
                <span className="text-[#FF5812]">Project Deliveries</span>
              </h2>
              
              <p className="mt-6 text-[15px] lg:text-base text-[#6B7280] leading-relaxed max-w-md">
                A structured path from use-case discovery to governed LangChain chains and agents—built for RAG quality, tool reliability, observability, cost control, and measurable outcomes.
              </p>

              {/* Scroll Indicator */}
              <div className="hidden lg:flex items-center gap-3 mt-10 text-zinc-400 animate-bounce">
                <span className="text-xs font-semibold tracking-wider uppercase font-mono">Scroll to view process steps</span>
                <ArrowDown size={14} className="text-[#FF5812]" />
              </div>
            </div>
          </div>

          {/* Right Column - Card Stack */}
          <div className="lg:col-span-7 flex flex-col gap-0 pb-20">
            {workflowSteps.map((step, index) => {
              const Icon = icons[index % icons.length];
              return (
                <div
                  key={step.id}
                  style={{ 
                    position: "sticky",
                    top: `140px`,
                    zIndex: (index + 1) * 10,
                    transform: "translate3d(0, 0, 0)"
                  }}
                  className="w-full mb-8"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group w-full h-[280px] rounded-[32px] border border-zinc-800/80 bg-[#0B0F19] p-8 md:p-10 hover:border-[#FF5812]/40 hover:shadow-[0_0_25px_-5px_rgba(255,88,18,0.15)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Advanced Background Texture & Glows */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,88,18,0.05),transparent_60%)] pointer-events-none" />
                    
                    
                    {/* Top Row: Icon & Step Label */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF5812]/10 text-[#FF5812] border border-[#FF5812]/20 transition-all duration-300 group-hover:bg-[#FF5812] group-hover:text-white">
                        <Icon size={22} strokeWidth={2} />
                      </div>
                      <span className="text-[12px] font-mono font-extrabold tracking-wider text-zinc-600 group-hover:text-[#FF5812]/80 transition-colors">
                        STEP {step.id}
                      </span>
                    </div>

                    {/* Bottom Row: Text Content */}
                    <div className="relative z-10 mt-auto">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-[#FF5812] transition-colors tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
