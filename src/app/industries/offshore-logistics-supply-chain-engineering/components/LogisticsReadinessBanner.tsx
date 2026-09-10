"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Users, Cloud, SlidersHorizontal } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

export default function LogisticsReadinessBanner() {
  return (
    <section className="relative w-full pt-2 lg:pt-4 pb-8 lg:pb-10 bg-white overflow-hidden font-sans">
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm]">

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
          <div className="relative z-10 flex-1 lg:flex-[0.95] xl:flex-[0.85] p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center items-start">

            {/* Insight tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-xs sm:text-[12px] font-bold tracking-widest text-[#FF6B00] uppercase mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
              WHY SOFTREE FOR LOGISTICS &amp; SUPPLY CHAIN
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[52px] font-extrabold font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.12] mb-4">
              <span className="text-slate-900 block mb-1">Your Logistics Tech Vision.</span>
              <span className="text-[#FF6B2C] block">Our Offshore Engineering Team.</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-base sm:text-[16.5px] lg:text-[17px] text-slate-500 leading-relaxed max-w-xl mb-6 text-left">
              Modernize supply chain operations with an offshore engineering partner that combines deep logistics domain mastery, enterprise systems integration (TMS/WMS/ERP), and flexible delivery models.
            </p>

            {/* Vertical List of Items */}
            <div className="flex flex-col w-full max-w-xl mb-6 space-y-1">

              {/* Item 1 */}
              <div className="flex items-start gap-3.5 py-3 border-b border-slate-100">
                <div className="relative shrink-0 mt-0.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#FF6B2C]/30 flex items-center justify-center bg-white shadow-sm">
                    <Bot className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#FF6B2C]" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-base sm:text-[17px] font-bold text-slate-900 mb-1 leading-tight">
                    Supply Chain &amp; Logistics AI Expertise
                  </h4>
                  <p className="text-sm sm:text-[14.5px] text-slate-500 leading-relaxed">
                    Build dynamic routing models, warehouse forecasting RAG, freight document parsing, and real-time visibility copilots.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3.5 py-3 border-b border-slate-100">
                <div className="relative shrink-0 mt-0.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#FF6B2C]/30 flex items-center justify-center bg-white shadow-sm">
                    <Users className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#FF6B2C]" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-base sm:text-[17px] font-bold text-slate-900 mb-1 leading-tight">
                    Dedicated Logistics Tech Talent
                  </h4>
                  <p className="text-sm sm:text-[14.5px] text-slate-500 leading-relaxed">
                    Extend your squad with supply chain software engineers, EDI/API integration specialists, cloud architects, and QA engineers.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3.5 py-3 border-b border-slate-100">
                <div className="relative shrink-0 mt-0.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#FF6B2C]/30 flex items-center justify-center bg-white shadow-sm">
                    <Cloud className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#FF6B2C]" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-base sm:text-[17px] font-bold text-slate-900 mb-1 leading-tight">
                    Enterprise Cloud &amp; System Integration
                  </h4>
                  <p className="text-sm sm:text-[14.5px] text-slate-500 leading-relaxed">
                    Integrate seamlessly across Azure, AWS, Snowflake, SAP TM, Oracle OTM, Blue Yonder, and Manhattan Associates.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-3.5 pt-3">
                <div className="relative shrink-0 mt-0.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#FF6B2C]/30 flex items-center justify-center bg-white shadow-sm">
                    <SlidersHorizontal className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#FF6B2C]" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-base sm:text-[17px] font-bold text-slate-900 mb-1 leading-tight">
                    Flexible Offshore Delivery
                  </h4>
                  <p className="text-sm sm:text-[14.5px] text-slate-500 leading-relaxed">
                    Choose white-label delivery, dedicated squads, staff augmentation, project delivery, or managed engineering services.
                  </p>
                </div>
              </div>

            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <FlowButton
                href="/contact"
                text="BUILD YOUR LOGISTICS TEAM"
                variant="orange-filled"
                className="text-sm sm:text-base px-7 py-3.5"
              />
            </div>

          </div>

          {/* Right Image/Video Side */}
          <div className="relative flex-1 lg:flex-[1.05] xl:flex-[1.15] min-h-[280px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100 flex items-center justify-center bg-slate-900">
            <video
              src="/images/solutions/ai-for-logistics/hero.mp4"
              poster="/images/solutions/ai-for-logistics/hero.png"
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
