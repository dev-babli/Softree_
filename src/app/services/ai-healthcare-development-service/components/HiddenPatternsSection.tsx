"use client";

import React, { useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PatternData {
  id: string;
  tagline: string;
  stat: string;
  headline: string;
  description: string;
  footnote: string;
  indicatorTitle: string;
  indicatorSubtitle: string;
  healthyRange: string;
  minRange: string;
  maxRange: string;
  bulletPoints: string[];
  organLabel: string;
  highlightPos: { cx: number; cy: number };
  markerPercent: number;
}

const patterns: PatternData[] = [
  {
    id: "thyroid",
    tagline: "Unlock hidden patterns in thyroid health",
    stat: "55%",
    headline: "Achieved better sleep quality",
    description:
      "With continuous tracking and personalized insights, we make sure you don’t just manage thyroid symptoms — you address root causes for lasting health improvements.",
    footnote: "Normal TSH/FT4, low FT3 (+ high rT3)",
    indicatorTitle: "TSH (Thyroid Stimulating Hormone)",
    indicatorSubtitle: "First-line indicator of thyroid health.",
    healthyRange: "Healthy",
    minRange: "0.1 IU/mL",
    maxRange: "4.5 IU/mL",
    bulletPoints: [
      "Detects thyroid issues early",
      "Spots autoimmune risks in advance",
      "Optimizes metabolism & weight",
    ],
    organLabel: "Thyroid Gland",
    highlightPos: { cx: 70, cy: 64 }, // Neck/Thyroid area
    markerPercent: 55,
  },
  {
    id: "cardio",
    tagline: "Uncover cardiovascular risk indicators early",
    stat: "68%",
    headline: "Improved vascular resilience",
    description:
      "Advanced AI telemetry monitors continuous blood flow, arterial flexibility, and heart rate variability to prevent cardiac events before symptoms manifest.",
    footnote: "ApoB / ApoA1 ratio: 0.52 (Low Risk)",
    indicatorTitle: "ApoB & Cardiac Biomarkers",
    indicatorSubtitle: "Gold standard marker for vascular longevity.",
    healthyRange: "Optimal",
    minRange: "40 mg/dL",
    maxRange: "80 mg/dL",
    bulletPoints: [
      "Flags vascular inflammation early",
      "Predicts long-term cardiac health",
      "Optimizes heart recovery rate",
    ],
    organLabel: "Cardiovascular System",
    highlightPos: { cx: 70, cy: 92 }, // Chest/Heart area
    markerPercent: 35,
  },
  {
    id: "metabolic",
    tagline: "Optimize metabolic flexibility & glucose stability",
    stat: "72%",
    headline: "Improved insulin sensitivity & recovery",
    description:
      "Continuous glucose telemetry mapped against circadian rhythm data pinpoints dietary triggers and restores peak metabolic energy.",
    footnote: "Glycemic Variability: < 12% (Optimal)",
    indicatorTitle: "HOMA-IR & Fasting Insulin",
    indicatorSubtitle: "Primary driver of metabolic longevity.",
    healthyRange: "INSULIN SENSITIVE",
    minRange: "0.5 Index",
    maxRange: "Range 1.4 Index",
    bulletPoints: [
      "Prevents pre-diabetic shifts years early",
      "Eliminates afternoon energy crashes",
      "Accelerates visceral fat oxidation",
    ],
    organLabel: "Pancreatic & Liver Axis",
    highlightPos: { cx: 70, cy: 110 }, // Abdomen area
    markerPercent: 48,
  },
];

export function HiddenPatternsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePattern = patterns[activeIdx];

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-white relative overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Outer Dark Chocolate Container */}
        <div className="bg-[#2D1F17] border border-[#422F26] rounded-[32px] p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden">
          {/* Ambient Warm Radial Backlight */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E58B6D]/8 rounded-full blur-3xl pointer-events-none" />

          {/* Interactive Top Category Tabs */}
          <div className="flex flex-wrap items-center gap-3 mb-10 border-b border-[#422F26]/80 pb-6">
            {patterns.map((p, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-[#E58B6D] text-white shadow-lg scale-102"
                      : "bg-[#3D2C23]/80 text-[#D5C4B7] hover:bg-[#4A372C] hover:text-white"
                  }`}
                >
                  {p.organLabel}
                </button>
              );
            })}
          </div>

          {/* 2-Column Content Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePattern.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Text & Large Metric */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  {/* Tagline */}
                  <p className="text-[#E58B6D] text-sm sm:text-base font-medium tracking-wide mb-6">
                    {activePattern.tagline}
                  </p>

                  {/* Big Percentage Metric */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#3D2C23] border border-[#523C30] flex items-center justify-center text-[#E58B6D] shrink-0 shadow-inner">
                      <ArrowUp className="w-7 h-7 stroke-[2.5]" />
                    </div>
                    <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                      {activePattern.stat}
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-[1.2] mb-4 tracking-tight">
                    {activePattern.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-[#D5C4B7] text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-normal">
                    {activePattern.description}
                  </p>
                </div>

                {/* Footnote */}
                <div className="text-xs text-[#A89487] font-medium tracking-wide border-t border-[#422F26] pt-4 mt-auto">
                  {activePattern.footnote}
                </div>
              </div>

              {/* Right Column: Sleek Diagnostic Visual Card (Matching Screenshot exactly) */}
              <div className="lg:col-span-6 bg-[#38261D] border border-[#4C362B] p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-2xl relative">
                <div>
                  {/* Top Area: Smooth Anatomical Silhouette + Title Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-8">
                    {/* High Precision Anatomical Silhouette SVG */}
                    <div className="sm:col-span-5 flex items-center justify-center p-4 bg-[#2C1D16]/90 rounded-2xl border border-[#4A3529] shadow-inner relative min-h-[220px]">
                      <svg
                        viewBox="0 0 140 280"
                        className="w-28 h-56 text-[#5A453A]"
                        fill="currentColor"
                      >
                        {/* Head */}
                        <circle cx="70" cy="40" r="18" />
                        {/* Neck */}
                        <path d="M62,56 H78 V70 H62 Z" />
                        {/* Shoulders & Torso */}
                        <path d="M70,68 C92,68 104,78 106,94 L108,145 C108,148 105,150 102,150 H94 L92,205 C92,208 89,210 86,210 H73 L73,265 C73,268 70,270 67,270 H61 C58,270 56,268 56,265 L56,210 H44 C41,210 38,208 38,205 L36,150 H28 C25,150 22,148 22,145 L24,94 C26,78 38,68 70,68 Z" />
                      </svg>

                      {/* Organ Glowing Pulse Node */}
                      <motion.div
                        key={activePattern.id + "-node"}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute"
                        style={{
                          left: `${(activePattern.highlightPos.cx / 140) * 100}%`,
                          top: `${(activePattern.highlightPos.cy / 280) * 100}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <span className="absolute -inset-2 rounded-full bg-[#E58B6D]/40 animate-ping" />
                        <span className="relative block w-4 h-4 rounded-full bg-[#E58B6D] shadow-[0_0_12px_#E58B6D]" />
                      </motion.div>
                    </div>

                    {/* Indicator Title & Interactive Range Bar */}
                    <div className="sm:col-span-7 flex flex-col justify-center">
                      <h4 className="text-xl font-bold text-white mb-1 tracking-tight">
                        {activePattern.indicatorTitle}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#D5C4B7] mb-6 leading-relaxed">
                        {activePattern.indicatorSubtitle}
                      </p>

                      {/* Healthy Range Meter Card */}
                      <div className="bg-[#2D1F17] border border-[#4C362B] rounded-xl p-4 mb-2 shadow-inner">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#D5C4B7] text-center mb-3">
                          {activePattern.healthyRange}
                        </div>

                        {/* Range Track Bar */}
                        <div className="h-3.5 w-full bg-[#4A362C] rounded-full overflow-hidden relative p-0.5">
                          {/* Inner Highlight Zone */}
                          <div className="absolute left-[20%] right-[15%] top-0.5 bottom-0.5 bg-[#FAF6F0] rounded-full" />
                          {/* Indicator Marker Dot */}
                          <motion.div
                            initial={{ left: "20%" }}
                            animate={{ left: `${activePattern.markerPercent}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute top-0 bottom-0 w-3 bg-[#E58B6D] rounded-full shadow-[0_0_10px_#E58B6D] -translate-x-1/2"
                          />
                        </div>

                        {/* Min / Max Labels */}
                        <div className="flex justify-between text-[11px] font-medium text-[#D5C4B7] mt-3">
                          <span className="font-semibold text-[#E58B6D]">
                            {activePattern.minRange}
                          </span>
                          <span>{activePattern.maxRange}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-3 mb-8">
                    {activePattern.bulletPoints.map((pt, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-xs sm:text-sm text-[#EBE0D8]"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#E58B6D] shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <a
                  href="#contact"
                  className="w-full py-4 px-6 rounded-xl bg-[#E58B6D] hover:bg-[#D97A5C] text-[#2C1D16] font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group"
                >
                  <span>See what’s included</span>
                  <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
