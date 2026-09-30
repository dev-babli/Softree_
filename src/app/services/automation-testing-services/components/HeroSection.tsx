"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Globe, Users, Lock, Calendar } from "lucide-react";

import { HeroAutomationGraphic } from "./HeroAutomationGraphic";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">

      {/* Eyebrow */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FF6B2C] text-[11px] font-bold tracking-widest uppercase mb-6 shadow-sm"
      >
        <ShieldCheck className="w-4 h-4" />
        AI Testing Services
      </motion.div>

      {/* Main Headline */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl lg:text-7xl font-extrabold text-zinc-900 tracking-tight leading-[1.1]"
      >
        Your Offshore AI Testing <br className="hidden lg:block" /> 
        & Quality <motion.span 
          animate={{ color: ["#FF5812", "#FF9854", "#FF5812"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Engineering Partner
        </motion.span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 text-lg lg:text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed"
      >
        Build, validate, secure, and continuously test AI applications with an offshore engineering team experienced in LLMs, RAG, AI agents, automation, and enterprise platforms.
      </motion.p>
      
      {/* CTAs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto z-20"
      >
        <Link href="/industries/contact-us" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FF6B2C] hover:bg-[#FF5812] text-white px-8 py-4 rounded-xl font-medium transition-all shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40">
          Talk to Our AI Testing Team
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* The Animated Graphic from the Image */}
      <HeroAutomationGraphic />

      {/* Trust Strip */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-20 w-full max-w-[1200px] flex flex-col items-center"
      >
        <div className="flex items-center gap-4 mb-6 w-full max-w-3xl">
          <div className="h-px bg-zinc-200 flex-1" />
          <p className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">
            Trusted by Businesses and Technology Partners Worldwide
          </p>
          <div className="h-px bg-zinc-200 flex-1" />
        </div>

        {/* The Dark Pill Container */}
        <div className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-start lg:items-center gap-6 lg:gap-4 shadow-2xl">
          
          {/* Item 1 */}
          <div className="flex items-start lg:items-center gap-3 w-[45%] sm:w-[30%] lg:w-auto text-left">
            <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0 mt-1 lg:mt-0" strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-white font-bold text-[11px] xl:text-xs tracking-wider">ISO 27001:2022</span>
              <span className="text-zinc-500 text-[10px] xl:text-[11px] font-medium leading-snug mt-0.5">Information Security<br className="hidden xl:block" /> Management</span>
            </div>
          </div>

          <div className="hidden lg:block w-px h-10 bg-zinc-800" />

          {/* Item 2 */}
          <div className="flex items-start lg:items-center gap-3 w-[45%] sm:w-[30%] lg:w-auto text-left">
            <Award className="w-6 h-6 text-blue-500 shrink-0 mt-1 lg:mt-0" strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-white font-bold text-[11px] xl:text-xs tracking-wider">ISO 9001:2015</span>
              <span className="text-zinc-500 text-[10px] xl:text-[11px] font-medium leading-snug mt-0.5">Quality Management<br className="hidden xl:block" /> Systems</span>
            </div>
          </div>

          <div className="hidden lg:block w-px h-10 bg-zinc-800" />

          {/* Item 3 */}
          <div className="flex items-start lg:items-center gap-3 w-[45%] sm:w-[30%] lg:w-auto text-left">
            <Globe className="w-6 h-6 text-purple-500 shrink-0 mt-1 lg:mt-0" strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-white font-bold text-[11px] xl:text-xs tracking-wider uppercase">Offshore Delivery</span>
              <span className="text-zinc-500 text-[10px] xl:text-[11px] font-medium leading-snug mt-0.5">India-Based<br className="hidden xl:block" /> Engineering Teams</span>
            </div>
          </div>

          <div className="hidden lg:block w-px h-10 bg-zinc-800" />

          {/* Item 4 */}
          <div className="flex items-start lg:items-center gap-3 w-[45%] sm:w-[30%] lg:w-auto text-left">
            <Users className="w-6 h-6 text-orange-500 shrink-0 mt-1 lg:mt-0" strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-white font-bold text-[11px] xl:text-xs tracking-wider uppercase">White-Label Ready</span>
              <span className="text-zinc-500 text-[10px] xl:text-[11px] font-medium leading-snug mt-0.5">Your Brand.<br className="hidden xl:block" /> Our Delivery.</span>
            </div>
          </div>

          <div className="hidden lg:block w-px h-10 bg-zinc-800" />

          {/* Item 5 */}
          <div className="flex items-start lg:items-center gap-3 w-[45%] sm:w-[30%] lg:w-auto text-left">
            <Lock className="w-6 h-6 text-green-500 shrink-0 mt-1 lg:mt-0" strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-white font-bold text-[11px] xl:text-xs tracking-wider uppercase">NDA & IP Protected</span>
              <span className="text-zinc-500 text-[10px] xl:text-[11px] font-medium leading-snug mt-0.5">Confidential<br className="hidden xl:block" /> Engagements</span>
            </div>
          </div>

          <div className="hidden lg:block w-px h-10 bg-zinc-800" />

          {/* Item 6 */}
          <div className="flex items-start lg:items-center gap-3 w-[45%] sm:w-[30%] lg:w-auto text-left">
            <Calendar className="w-6 h-6 text-red-500 shrink-0 mt-1 lg:mt-0" strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-white font-bold text-[11px] xl:text-xs tracking-wider uppercase">13+ Years</span>
              <span className="text-zinc-500 text-[10px] xl:text-[11px] font-medium leading-snug mt-0.5">Proven Engineering<br className="hidden xl:block" /> Experience</span>
            </div>
          </div>

        </div>
      </motion.div>

    </section>
  );
}
