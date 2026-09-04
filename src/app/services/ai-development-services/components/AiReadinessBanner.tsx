"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Users, Cloud, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Bot,
    title: "Agentic AI Expertise",
    description:
      "Build agents, RAG, copilots, multi-agent systems, and intelligent workflows.",
  },
  {
    icon: Users,
    title: "Dedicated Offshore Talent",
    description:
      "Extend your team with AI architects, engineers, data specialists, QA, and cloud experts.",
  },
  {
    icon: Cloud,
    title: "Microsoft + AWS Expertise",
    description:
      "Build across Azure AI, Copilot, Amazon Bedrock, and the broader cloud ecosystems.",
  },
  {
    icon: SlidersHorizontal,
    title: "Flexible Delivery",
    description:
      "Choose white-label delivery, dedicated teams, staff augmentation, project delivery, or managed engineering.",
  },
];

export default function AiReadinessBanner() {
  return (
    <section className="relative w-full pt-4 lg:pt-6 pb-12 lg:pb-16 bg-transparent overflow-hidden font-sans">
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        
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
            
            {/* WHY SOFTREE Eyebrow Pill */}
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/70 px-4 py-1.5 rounded-full border border-white/60 mb-5 inline-block">
              <span className="text-[11px] font-bold text-[#FF6B2C] tracking-widest uppercase">
                WHY SOFTREE
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-black text-slate-900 tracking-tight leading-[1.15] mb-4 max-w-xl">
              Your AI Practice. <br />
              <span className="text-[#FF6B2C]">Our Engineering Team.</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-[14.5px] sm:text-[15.5px] text-slate-600 font-medium leading-relaxed max-w-xl mb-8">
              Build AI with a partner that combines Agentic AI expertise, offshore engineering capacity, and flexible delivery models to drive real business outcomes.
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
                      <h4 className="text-[15px] sm:text-[16px] font-bold text-slate-900 leading-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[13px] sm:text-[13.5px] text-slate-500 font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link href="/contact" className="inline-block mt-9">
              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#FF6B2C] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white font-extrabold text-[12.5px] sm:text-[13px] tracking-wider uppercase px-8 py-3.5 sm:py-4 rounded-full shadow-[0_8px_24px_rgba(255,107,44,0.3)] hover:shadow-[0_12px_28px_rgba(255,107,44,0.45)] transition-all duration-300 group cursor-pointer"
              >
                <span>BUILD YOUR AI TEAM</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.div>
            </Link>

          </div>

          {/* Right Video Side */}
          <div className="relative flex-1 min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100 flex items-center justify-center bg-slate-900">
            {/* The background video */}
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
