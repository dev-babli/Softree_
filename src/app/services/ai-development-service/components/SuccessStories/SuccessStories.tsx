"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ArrowUpRight, HelpCircle, Sparkles } from "lucide-react";
import SectionBadge from "../SectionBadge";
import { successStoriesList } from "./successStoriesData";

// Subject-oriented full-bleed images matching the case study theme using custom dashboard assets
const caseStudyImages: Record<string, { left: string; right: string }> = {
  "01": {
    left: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    right: ""
  },
  "02": {
    left: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    right: ""
  },
  "03": {
    left: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    right: ""
  },
  "04": {
    left: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    right: ""
  },
  "05": {
    left: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    right: ""
  },
  "06": {
    left: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    right: ""
  }
};

const slideStyles: Record<string, { bg: string; text: string; btnOutline: string; badge: string; accent: string }> = {
  "01": {
    bg: "bg-[#7CA1FF]",
    text: "text-slate-900",
    btnOutline: "border-slate-900/60 hover:bg-slate-900 hover:text-white",
    badge: "bg-slate-900/10 text-slate-900",
    accent: "text-blue-900"
  },
  "02": {
    bg: "bg-[#FF8D6C]",
    text: "text-slate-900",
    btnOutline: "border-slate-900/60 hover:bg-slate-900 hover:text-white",
    badge: "bg-slate-900/10 text-slate-900",
    accent: "text-orange-950"
  },
  "03": {
    bg: "bg-[#E2FFA2]",
    text: "text-slate-900",
    btnOutline: "border-slate-900/60 hover:bg-slate-900 hover:text-white",
    badge: "bg-slate-900/10 text-slate-900",
    accent: "text-emerald-950"
  },
  "04": {
    bg: "bg-slate-950",
    text: "text-white",
    btnOutline: "border-white/40 hover:bg-white hover:text-slate-900",
    badge: "bg-white/10 text-white",
    accent: "text-slate-300"
  },
  "05": {
    bg: "bg-[#E9D5FF]",
    text: "text-slate-900",
    btnOutline: "border-slate-900/60 hover:bg-slate-900 hover:text-white",
    badge: "bg-slate-900/10 text-slate-900",
    accent: "text-purple-950"
  },
  "06": {
    bg: "bg-[#99F6E4]",
    text: "text-slate-900",
    btnOutline: "border-slate-900/60 hover:bg-slate-900 hover:text-white",
    badge: "bg-slate-900/10 text-slate-900",
    accent: "text-teal-950"
  }
};

export const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < successStoriesList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const activeStory = successStoriesList[currentIndex];
  const style = slideStyles[activeStory.id] || slideStyles["01"];
  const images = caseStudyImages[activeStory.id] || caseStudyImages["01"];

  return (
    <section className="relative w-full py-16 lg:py-24 bg-white overflow-hidden font-sans">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center w-full mb-10 text-center">
          <SectionBadge text="SUCCESS STORIES" variant="line" />
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            AI Development Case Studies: <span className="text-[#FF6B2C]">Real-World Solutions & Impact</span>
          </h2>
          <p className="text-[15px] lg:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            See how businesses use our AI development solutions to automate processes, solve complex challenges, and achieve measurable results.
          </p>
        </div>

        {/* Slider Card */}
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className={`w-full rounded-[36px] p-8 sm:p-12 lg:p-16 ${style.bg} ${style.text} transition-colors duration-500 shadow-xl relative overflow-hidden`}
            >
              {/* Background ambient pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

              {/* Slide Header Row */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12 relative z-10">
                <div className="max-w-2xl">
                  <span className={`inline-block text-[11px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 ${style.badge}`}>
                    {activeStory.industryLabel}
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
                    {activeStory.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed opacity-90 max-w-xl">
                    {activeStory.solution}
                  </p>
                </div>

                <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-start">
                  <a
                    href={activeStory.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 border px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 ${style.btnOutline}`}
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevSlide}
                      className={`w-10 h-10 rounded-full bg-slate-900/90 text-white flex items-center justify-center hover:bg-slate-800 transition-all duration-300 shadow-md ${currentIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className={`w-10 h-10 rounded-full bg-slate-900/90 text-white flex items-center justify-center hover:bg-slate-800 transition-all duration-300 shadow-md ${currentIndex === successStoriesList.length - 1 ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Single Centered Case Study Image Card */}
              <div className="relative w-full flex items-center justify-center mb-12 z-10">
                <div className="w-full max-w-[720px] aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl bg-slate-950 hover:-translate-y-1.5 transition-transform duration-300">
                  <img
                    src={images.left}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    alt={`${activeStory.title} Case Study Preview`}
                  />
                  <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                </div>
              </div>

              {/* Bottom Challenges, Solutions & Outcomes section */}
              <div className="border-t border-slate-900/10 pt-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-850">

                  {/* 1. BUSINESS CHALLENGES */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/95 backdrop-blur rounded-[24px] p-6 shadow-sm border border-slate-200/50 flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3.5">
                      <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                        Business Challenge
                      </span>
                    </div>
                    <p className="text-[13px] font-bold text-slate-700 leading-relaxed">
                      {activeStory.problem}
                    </p>
                  </motion.div>

                  {/* 2. BUSINESS SOLUTIONS */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/95 backdrop-blur rounded-[24px] p-6 shadow-sm border border-slate-200/50 flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FF6B2C]/10 border border-[#FF6B2C]/20 flex items-center justify-center text-[#FF6B2C] shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                        Business Solution
                      </span>
                    </div>
                    <p className="text-[13px] font-bold text-slate-700 leading-relaxed">
                      {activeStory.solution}
                    </p>
                  </motion.div>

                  {/* 3. BUSINESS OUTCOMES */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/95 backdrop-blur rounded-[24px] p-6 shadow-sm border border-slate-200/50 flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                        Business Outcome
                      </span>
                    </div>
                    <ul className="space-y-2.5">
                      {activeStory.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-emerald-500 mt-1 select-none font-bold text-[10px]">✓</span>
                          <span className="text-[13px] font-bold text-slate-800 leading-snug">
                            {result}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
