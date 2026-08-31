"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Activity, Moon, Droplets, Sparkles } from "lucide-react";

export function TransformativeOutcomesSection() {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-neutral-900 relative overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
            Transformative outcomes
            <span className="block text-[#FF5812] font-semibold mt-1">
              backed by data
            </span>
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Card 1: Early Risk Detection Line Chart */}
          <div className="bg-[#F5EFE7] border border-[#E5DACD] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-[#2A1D17] mb-2 tracking-tight">
                3.5 X
              </div>
              <p className="text-xs sm:text-sm text-[#6E5A4E] leading-relaxed mb-6 font-medium">
                Early risk detection compared to traditional annual checkups
              </p>
            </div>

            {/* Line Graph SVG Container */}
            <div className="bg-[#FAF6F0] border border-[#EBE3D8] rounded-2xl p-4">
              <div className="relative h-32 w-full flex items-end">
                {/* Y-axis Labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[9px] font-semibold text-[#A89487]">
                  <span>100</span>
                  <span>83</span>
                  <span>74</span>
                  <span>65</span>
                </div>

                {/* SVG Graph Paths */}
                <div className="ml-6 w-full h-full">
                  <svg
                    viewBox="0 0 200 100"
                    className="w-full h-full overflow-visible"
                    fill="none"
                    strokeWidth="2"
                  >
                    {/* Horizontal Faint Grid Lines */}
                    <line x1="0" y1="10" x2="200" y2="10" stroke="#EBE3D8" strokeDasharray="3 3" />
                    <line x1="0" y1="35" x2="200" y2="35" stroke="#EBE3D8" strokeDasharray="3 3" />
                    <line x1="0" y1="60" x2="200" y2="60" stroke="#EBE3D8" strokeDasharray="3 3" />
                    <line x1="0" y1="85" x2="200" y2="85" stroke="#EBE3D8" strokeDasharray="3 3" />

                    {/* Dark Line (Lab Testing - AI Enabled) */}
                    <motion.path
                      d="M 10 30 L 45 25 L 80 25 L 120 15 L 160 22 L 190 12"
                      stroke="#2A1D17"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    {/* Dark Line Data Dots */}
                    <circle cx="10" cy="30" r="3" fill="#2A1D17" />
                    <circle cx="45" cy="25" r="3" fill="#2A1D17" />
                    <circle cx="80" cy="25" r="3" fill="#2A1D17" />
                    <circle cx="120" cy="15" r="4.5" fill="#2A1D17" />
                    <circle cx="160" cy="22" r="3" fill="#2A1D17" />
                    <circle cx="190" cy="12" r="3" fill="#2A1D17" />

                    {/* Terracotta Line (Annual Checkup - Traditional) */}
                    <motion.path
                      d="M 10 45 L 45 55 L 80 65 L 120 75 L 160 80 L 190 85"
                      stroke="#E58B6D"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                    />
                    {/* Terracotta Dots */}
                    <circle cx="10" cy="45" r="3" fill="#E58B6D" />
                    <circle cx="45" cy="55" r="3" fill="#E58B6D" />
                    <circle cx="80" cy="65" r="3" fill="#E58B6D" />
                    <circle cx="120" cy="75" r="4.5" fill="#E58B6D" />
                    <circle cx="160" cy="80" r="3" fill="#E58B6D" />
                    <circle cx="190" cy="85" r="3" fill="#E58B6D" />
                  </svg>
                </div>
              </div>

              {/* X-axis Month Labels */}
              <div className="flex justify-between text-[9px] font-semibold text-[#A89487] mt-2 pl-6">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Nov</span>
              </div>

              {/* Graph Legend */}
              <div className="flex items-center justify-center gap-4 text-[10px] font-bold mt-3 border-t border-[#E5DACD] pt-2">
                <div className="flex items-center gap-1 text-[#2A1D17]">
                  <span className="w-2 h-2 rounded-full bg-[#2A1D17]" />
                  <span>AI Lab testing</span>
                </div>
                <div className="flex items-center gap-1 text-[#E58B6D]">
                  <span className="w-2 h-2 rounded-full bg-[#E58B6D]" />
                  <span>Annual checkup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 92% Biomarker Improvement */}
          <div className="bg-white border border-[#E5DACD] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between text-center shadow-xs group hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FBF3EF] flex items-center justify-center text-[#E58B6D] mx-auto mb-3 shadow-inner">
                <Heart size={20} className="fill-[#E58B6D]" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#6E5A4E]">
                Improved metabolic scores
              </p>
            </div>

            <div className="my-6">
              <div className="text-5xl sm:text-6xl font-extrabold text-[#E58B6D] tracking-tight">
                92%
              </div>
              <p className="text-xs sm:text-sm text-[#5E4C41] mt-3 max-w-[180px] mx-auto leading-relaxed">
                Users improved at least one key biomarker within
              </p>
            </div>

            <div className="px-6 py-2 rounded-full border border-[#E58B6D] text-[#E58B6D] font-bold text-xs sm:text-sm tracking-wide bg-[#FBF3EF]/60">
              3 months
            </div>
          </div>

          {/* Card 3: Continuous Monitoring Image Card */}
          <div className="relative rounded-3xl overflow-hidden min-h-[380px] p-6 sm:p-8 text-white flex flex-col justify-between shadow-md group">
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop"
              alt="Healthcare AI Robot Continuous Monitoring"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, 100vw"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C120C]/95 via-[#1C120C]/50 to-[#1C120C]/30" />

            {/* Top Stat */}
            <div className="relative z-10">
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                5+
              </div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">
                Data points
              </div>
            </div>

            {/* Center Body */}
            <div className="relative z-10 my-4">
              <p className="text-base sm:text-lg font-semibold text-white/95 leading-snug">
                Continuous monitoring for precision health tracking.
              </p>
            </div>

            {/* Bottom Metrics Pill Row */}
            <div className="relative z-10 flex flex-wrap gap-2 text-[11px] font-medium text-white/90">
              <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                <Droplets size={12} className="text-[#E58B6D]" /> Glucose levels
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                <Activity size={12} className="text-[#E58B6D]" /> Heart rate
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                <Moon size={12} className="text-[#E58B6D]" /> Sleep cycles
              </span>
            </div>
          </div>

          {/* Card 4: 15 Days Time to Improvement Circle Card */}
          <div className="bg-[#FAF6F0] border border-[#E5DACD] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-xs">
            {/* Top Floating Pill Tags */}
            <div className="flex gap-2 text-[10px] font-semibold text-[#6E5A4E]">
              <span className="px-3 py-1 rounded-full bg-white border border-[#E5DACD] shadow-2xs">
                Metabolic responses
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#E5DACD] shadow-2xs">
                Glucose response
              </span>
            </div>

            {/* Center Orange Circle Badge */}
            <div className="my-6">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#E58B6D] text-white flex flex-col items-center justify-center shadow-lg shadow-[#E58B6D]/30 mx-auto transition-transform hover:scale-105 duration-300">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  15
                </span>
                <span className="text-xs font-semibold tracking-wider uppercase opacity-90">
                  days
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5E4C41] mt-4 font-medium max-w-[190px] mx-auto leading-relaxed">
                Average time to first noticeable improvement
              </p>
            </div>

            {/* Bottom Floating Pill Tags */}
            <div className="flex flex-wrap justify-center gap-1.5 text-[10px] font-semibold text-[#6E5A4E]">
              <span className="px-3 py-1 rounded-full bg-white border border-[#E5DACD]">
                Gene changes
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#E5DACD]">
                Energized
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#E5DACD]">
                Metabolic
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
