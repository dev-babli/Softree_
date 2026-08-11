"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Premium B2B Case Study Slide Data mapped to user's uploaded images
const caseStudies = [
  {
    id: "competitive-gap-report",
    category: "AI & Automation",
    title: "AI Competitive Gap Report",
    challenge: "Traditional competitive research requires significant manual effort, making it difficult to continuously identify digital positioning gaps and market opportunities.",
    solution: "We deployed a multi-agent system that scrapes and benchmarks digital capabilities against top competitors in minutes, generating prioritized action plans.",
    impact: [
      "85% reduction in manual research time",
      "Analysis completed in under 2 minutes",
      "Direct recommendations for digital positioning"
    ],
    href: "/case-studies/ai-competitive-gap-report-businesses-outperform-competitors",
    themeColor: "#FF5812", // Orange Accent
    imageSrc: "/images/case-study/home/gap.png"
  },
  {
    id: "emr-automation-slug",
    category: "Power Platform & AI",
    title: "EMR Workflow Automation",
    challenge: "Manual processing of Electronic Medical Records (EMR) and inefficient routing workflows caused delays in patient care and high administrative overhead.",
    solution: "We built an AI Copilot integrated with Power Platform that automates patient record processing, document parsing, and security approval cycles.",
    impact: [
      "75% reduction in manual data processing",
      "65% faster internal approval cycles",
      "90% improvement in record data accuracy"
    ],
    href: "/case-studies/electronic-medical-records-workflow-automation",
    themeColor: "#00B4D8", // Teal/Blue Accent
    imageSrc: "/images/case-study/home/emr.png"
  },
  {
    id: "spfx-automation",
    category: "Microsoft 365",
    title: "SharePoint SPFx QA Automation",
    challenge: "Slow release testing cycles and frequent integration regressions on custom enterprise SPFx web parts were impacting team delivery timelines.",
    solution: "We implemented custom automated testing frameworks for SharePoint SPFx components using Playwright, ensuring strict quality gates.",
    impact: [
      "80% faster regression testing cycles",
      "Zero post-deployment production bugs",
      "Accelerated release velocity for developers"
    ],
    href: "/case-studies/sharepoint-spfx-automation-testing-quality-assurance",
    themeColor: "#20B2AA", // Light Sea Green Accent
    imageSrc: "/images/case-study/home/sharepoint.png"
  },
  {
    id: "task-copilot",
    category: "Power Platform",
    title: "Power Apps Task Copilot",
    challenge: "Internal operations teams spent hours navigating complex database screens to log and route incoming operational service tasks manually.",
    solution: "We embedded a natural-language AI Copilot inside a custom Power App, enabling operators to query, update, and dispatch tasks instantly.",
    impact: [
      "70% faster task dispatch speed",
      "95% accuracy in automated task routing",
      "Reduced onboarding training time to minutes"
    ],
    href: "/case-studies/ai-powered-task-automation-copilot-power-apps",
    themeColor: "#6C5DD3", // Purple Accent
    imageSrc: "/images/case-study/home/power.png"
  },
  {
    id: "process-discovery",
    category: "AI & Automation",
    title: "Process Discovery Copilot",
    challenge: "Enterprise analysts struggled to map actual business operational workflows, leading to blind spots and failed automation initiatives.",
    solution: "We deployed an agentic process-discovery engine that analyzes application logs and user events to auto-generate process workflow maps.",
    impact: [
      "90% faster workflow mapping speed",
      "Discovered 14 operational friction points",
      "Identified $85k monthly automation savings"
    ],
    href: "/case-studies/ai-powered-process-discovery-copilot",
    themeColor: "#FF007F", // Rose/Magenta Accent
    imageSrc: "/images/case-study/home/process.png"
  }
];

export default function HomepageCaseStudiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };

  const activeStudy = caseStudies[activeIndex];

  return (
    <section
      data-section="case-studies"
      data-theme-section="light"
      aria-labelledby="homepage-case-studies-heading"
      className="relative py-24 bg-[#F3F0EE] overflow-hidden"
    >
      {/* Background glow refraction */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(50% 50% at 50% 10%, rgba(255,88,18,0.06), transparent 70%)`,
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 lg:px-12 flex flex-col">
        {/* Editorial Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 flex flex-col items-center">
          <span className="px-3.5 py-1 rounded-full border border-zinc-300/60 bg-zinc-200/50 backdrop-blur-md text-[#FF5812] text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-4 shadow-sm">
            Proven Results
          </span>
          <h2 id="homepage-case-studies-heading" className="text-zinc-950 text-3xl md:text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight mb-5">
            Technology Solutions in Action: Proven Results Across Industries
          </h2>
          <p className="text-zinc-600 text-base md:text-lg leading-[1.6] font-normal max-w-2xl">
            Our impact is best measured in the outcomes we deliver: custom cloud applications, automated enterprise workflows, and intelligent integrations that drive business value. Here are some examples where our services transformed operations and growth.
          </p>
        </div>

        {/* Main Slider Wrapper Container */}
        <div className="relative w-full">
          {/* Active Card Body */}
          <div className="w-full rounded-[28px] md:rounded-[32px] overflow-hidden border border-zinc-800 bg-[#121214] shadow-[0_30px_70px_rgba(0,0,0,0.4)] flex flex-col lg:flex-row items-stretch relative min-h-[580px] lg:min-h-[680px]">
            
            {/* Left Column - Content Description with color-tinted gradient background */}
            <div 
              className="w-full lg:w-[55%] p-8 md:p-12 lg:p-14 flex flex-col justify-between relative transition-all duration-500 ease-in-out"
              style={{
                backgroundImage: `linear-gradient(135deg, #121215 0%, #08080a 100%), radial-gradient(circle at bottom left, ${activeStudy.themeColor}12, transparent 50%)`,
                backgroundBlendMode: "screen"
              }}
            >
              {/* Background gradient lighting effect */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-500"
                style={{
                  background: `radial-gradient(circle at 10% 10%, ${activeStudy.themeColor}, transparent 45%)`
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col h-full justify-between relative z-10"
                >
                  <div>
                    {/* Header line */}
                    <span className="text-[#FF5812] font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">
                      {activeStudy.category}
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-8">
                      {activeStudy.title}
                    </h3>

                    {/* Bullet Info Rows */}
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <span className="text-[#FF5812] text-lg mr-3 flex-shrink-0 mt-[1px]">✦</span>
                        <p className="text-zinc-300 text-[14px] md:text-[15px] leading-relaxed font-normal">
                          <strong className="text-white font-semibold">The Challenge:</strong> {activeStudy.challenge}
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-[#FF5812] text-lg mr-3 flex-shrink-0 mt-[1px]">✦</span>
                        <p className="text-zinc-300 text-[14px] md:text-[15px] leading-relaxed font-normal">
                          <strong className="text-white font-semibold">The Solution:</strong> {activeStudy.solution}
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-[#FF5812] text-lg mr-3 flex-shrink-0 mt-[1px]">✦</span>
                        <div className="flex flex-col">
                          <strong className="text-white font-semibold text-[14px] md:text-[15px] mb-2.5">The Impact:</strong>
                          <ul className="space-y-2">
                            {activeStudy.impact.map((imp, index) => (
                              <li key={index} className="flex items-center text-zinc-300 text-[13px] md:text-[14px]">
                                <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center mr-2.5 text-[9px] flex-shrink-0">
                                  ➜
                                </span>
                                {imp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="mt-10 lg:mt-12 pt-6 border-t border-zinc-850 flex flex-wrap gap-4 items-center">
                    <Link
                      href={activeStudy.href}
                      className="group inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-700 text-white text-xs md:text-sm font-semibold rounded-xl hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
                    >
                      Read Full Case Study
                      <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      href="/case-studies"
                      className="group inline-flex items-center justify-center gap-1.5 px-4 py-3 text-zinc-400 hover:text-white text-xs md:text-sm font-semibold transition-all duration-200"
                    >
                      View All Case Studies
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column - Visual Full Cover Image */}
            <div className="w-full lg:w-[45%] relative aspect-[0.75] lg:aspect-auto lg:min-h-0 overflow-hidden bg-zinc-900 border-t lg:border-t-0 lg:border-l border-zinc-850">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeStudy.imageSrc}
                    alt={activeStudy.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Floating Navigation Chevrons */}
          <button
            onClick={handlePrev}
            className="absolute -left-5 md:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white text-zinc-950 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer z-30 border border-zinc-100"
            aria-label="Previous case study"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-5 md:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white text-zinc-950 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer z-30 border border-zinc-100"
            aria-label="Next case study"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
