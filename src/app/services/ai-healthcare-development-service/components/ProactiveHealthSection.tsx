"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Sparkles } from "lucide-react";

export function ProactiveHealthSection() {
  const checkItems = [
    "Patient & Staff Concierge Chatbots",
    "125+ Lab Test AI Clinical Models",
    "Production-Ready Healthcare RAG Systems",
    "Early Symptom & Root-Cause Detection",
    "Offshore HIPAA & FHIR Integration",
  ];

  return (
    <section className="pt-8 pb-20 md:pt-12 md:pb-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-neutral-900 relative overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
            Everything you need for smarter,
            <span className="block text-[#FF5812] font-semibold mt-1">
              Proactive Healthcare AI & Concierge Automation
            </span>
          </h2>
        </div>

        {/* 3-Column Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-12">
          {/* Left Card - 2x2 Image Grid */}
          <div className="lg:col-span-3 h-[320px] sm:h-[360px] relative rounded-3xl overflow-hidden shadow-lg border border-zinc-200 group bg-white p-1.5">
            <div className="grid grid-cols-2 grid-rows-2 gap-1.5 h-full w-full">
              <div className="relative rounded-[20px] overflow-hidden">
                <Image
                  src="/images/ai-healthcare-images/health-1.png"
                  alt="Nurse and patient"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 12vw, 50vw"
                />
              </div>
              <div className="relative rounded-[20px] overflow-hidden">
                <Image
                  src="/images/ai-healthcare-images/health-2.png"
                  alt="Holding hands care"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 12vw, 50vw"
                />
              </div>
              <div className="relative rounded-[20px] overflow-hidden">
                <Image
                  src="/images/ai-healthcare-images/health-3.png"
                  alt="Hospital room"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 12vw, 50vw"
                />
              </div>
              <div className="relative rounded-[20px] overflow-hidden">
                <Image
                  src="/images/ai-healthcare-images/health-4.png"
                  alt="Elderly patient"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 12vw, 50vw"
                />
              </div>
            </div>
            
            {/* Dark overlay for text legibility at the bottom */}
            <div className="absolute bottom-1.5 left-1.5 right-1.5 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none rounded-b-[20px]" />
            
            <div className="absolute bottom-5 left-5 right-5 text-[#E5DACD] text-xs font-medium tracking-wide bg-[#2A1D17]/85 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 z-10 flex items-center gap-2 shadow-lg">
              <span>✨</span> Concierge Patient Assistant
            </div>
          </div>

          {/* Center Card - Large Stat Banner */}
          <div className="lg:col-span-6 bg-white border border-zinc-200 rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center text-center shadow-xs relative overflow-hidden">
            {/* Stat Number */}
            <div className="flex items-baseline justify-center mb-2">
              <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-black">
                <span className="text-[#FF5812]">12</span>5+
              </span>
            </div>

            <p className="text-base sm:text-lg font-medium text-black mb-8">
              Integrated Clinical Lab Tests & AI Models
            </p>

            {/* Sub-Pills */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
              <div className="bg-white/90 backdrop-blur border border-zinc-200 px-4 py-3 rounded-2xl flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-black shadow-sm flex-1">
                <span className="text-[#FF5812] font-bold text-base">2X</span>
                <span className="text-left leading-tight">Faster Clinical Insights</span>
              </div>
              <div className="bg-white/90 backdrop-blur border border-zinc-200 px-4 py-3 rounded-2xl flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-black shadow-sm flex-1">
                <div className="text-[#FF5812] font-bold flex flex-col items-center leading-none">
                  <span className="text-base">12</span>
                  <span className="text-[10px] mt-0.5">month</span>
                </div>
                <div className="text-left leading-tight">
                  <span className="block">Preventive Care</span>
                  <span className="block">Roadmap</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - 2x2 Image Grid */}
          <div className="lg:col-span-3 h-[320px] sm:h-[360px] relative rounded-3xl overflow-hidden shadow-lg border border-[#EBE3D8] group bg-white p-1.5">
            <div className="grid grid-cols-2 grid-rows-2 gap-1.5 h-full w-full">
              <div className="relative rounded-[20px] overflow-hidden">
                <Image
                  src="/images/ai-healthcare-images/health-5.png"
                  alt="Microscope analysis"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 12vw, 50vw"
                />
              </div>
              <div className="relative rounded-[20px] overflow-hidden">
                <Image
                  src="/images/ai-healthcare-images/health-6.png"
                  alt="Medical technology"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 12vw, 50vw"
                />
              </div>
              <div className="relative rounded-[20px] overflow-hidden">
                <Image
                  src="/images/ai-healthcare-images/health-7.png"
                  alt="Clinical screens"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 12vw, 50vw"
                />
              </div>
              <div className="relative rounded-[20px] overflow-hidden">
                <Image
                  src="/images/ai-healthcare-images/health-8.png"
                  alt="Lab research"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 12vw, 50vw"
                />
              </div>
            </div>
            
            {/* Dark overlay for text legibility at the bottom */}
            <div className="absolute bottom-1.5 left-1.5 right-1.5 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none rounded-b-[20px]" />
            
            <div className="absolute bottom-5 left-5 right-5 text-[#E5DACD] text-xs font-medium tracking-wide bg-[#2A1D17]/85 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 z-10 flex items-center gap-2 shadow-lg">
              <span>🔬</span> Precision Medical Diagnostics
            </div>
          </div>
        </div>

        {/* Feature Checkmarks List */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-10 text-xs sm:text-sm font-medium text-black">
          {checkItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF5812] shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FF5812] border border-[#FF5812] text-white text-sm font-medium hover:bg-white hover:text-[#FF5812] transition-all duration-300 shadow-lg shadow-orange-500/20 group"
          >
            <span>Explore Healthcare AI</span>
            <Sparkles className="w-4 h-4 text-white/90 group-hover:text-[#FF5812] transition-all duration-300 group-hover:rotate-12" />
          </a>
        </div>
      </div>
    </section>
  );
}
