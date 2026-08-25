"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
          <div className="relative z-10 flex-[1.2] p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start">
            
            {/* Metric Display */}
            <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-[#FF6B2C] tracking-tight leading-none mb-4 select-none">
              85%
            </div>

            {/* Headline statement */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 max-w-xl">
              of Enterprise AI Projects Fail Due to Poor Data Readiness.
            </h3>

            {/* Description Paragraph */}
            <p className="text-[14px] lg:text-[15px] text-slate-500 leading-relaxed max-w-xl mb-8">
              Stop guessing if your infrastructure can handle AI. Get an audit of your data maturity, governance, and architecture before you invest a single dollar in development.
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-[#FF6B2C] hover:bg-[#e0561b] text-white font-bold text-[13.5px] px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <span>Get Your AI Readiness Report</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>

          </div>

          {/* Right Image Side */}
          <div className="relative flex-1 min-h-[320px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100 flex items-center justify-center bg-slate-900">
            {/* The robot image from research */}
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
