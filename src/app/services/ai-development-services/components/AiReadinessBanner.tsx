"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AiReadinessBanner() {
  return (
    <section className="relative w-full py-12 lg:py-16 bg-transparent overflow-hidden font-sans">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Container (Light Theme Matching Page) */}
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
            
            {/* Insight tag */}
            <span className="bg-[#FF6B2C]/10 text-[#FF6B2C] border border-[#FF6B2C]/20 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 inline-block">
              AI Engineering Talent
            </span>

            {/* Metric Display with Gradient */}
            <div className="text-6xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent tracking-tight leading-none mb-4 select-none">
              85%
            </div>

            {/* Headline statement */}
            <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-black text-slate-900 tracking-tight leading-tight mb-4 max-w-xl">
              of Tech Leaders Struggle to Scale Dedicated AI Teams Locally.
            </h3>

            {/* Description Paragraph (Justified/Structured) */}
            <p className="text-[14px] lg:text-[15px] text-slate-500 leading-relaxed max-w-xl mb-6 text-justify">
              Bridge the specialized AI talent gap and accelerate your time-to-market. Softree embeds dedicated offshore squads proficient in LLM orchestration, agentic RAG, and custom copilots directly into your engineering flow, enabling rapid deployment at 40% lower operational cost.
            </p>

            {/* Justified Bullet Points Grid (Balanced Column Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-xl mb-8">
              <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-700">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#FF6B2C] shrink-0" />
                <span>Vetted Mid & Senior AI Engineers</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-700">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#FF6B2C] shrink-0" />
                <span>Azure OpenAI & Microsoft Partners</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-700">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#FF6B2C] shrink-0" />
                <span>ISO 27001 Secure Remote Delivery</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-700">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#FF6B2C] shrink-0" />
                <span>Deployments in Weeks, Not Quarters</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link href="/contact" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-[#FF6B2C] hover:bg-[#e0561b] text-white font-bold text-[12.5px] tracking-wider uppercase px-9 py-4.5 rounded-full shadow-[0_6px_20px_rgba(255,107,44,0.2)] hover:shadow-[0_12px_28px_rgba(255,107,44,0.35)] transition-all duration-300 group"
              >
                <span>Secure Your AI Team Now</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.div>
            </Link>

          </div>

          {/* Right Image Side */}
          <div className="relative flex-1 min-h-[320px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100 flex items-center justify-center bg-slate-900">
            {/* The robot image / background video */}
            <video
              src="/ai-development-service-video/ai-2.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover absolute inset-0 select-none pointer-events-none"
            />
            {/* Subtle shade vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

        </motion.div>

      </div>
    </section>
  );
}
