"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";

const processSteps = [
  {
    id: "01",
    phase: "PHASE 01",
    tag: "DISCOVER",
    title: "Discover Healthcare Workflows",
    description:
      "Understand existing healthcare processes, clinical workflows, data privacy boundaries, and AI automation opportunities.",
  },
  {
    id: "02",
    phase: "PHASE 02",
    tag: "DEFINE",
    title: "Define AI Scope & HIPAA Requirements",
    description:
      "Identify high-impact AI opportunities, define HIPAA compliance guardrails, EHR data schemas, and technical specs.",
  },
  {
    id: "03",
    phase: "PHASE 03",
    tag: "DESIGN",
    title: "Architecture & UX Design",
    description:
      "Design SMART on FHIR integrations, custom LLM RAG pipelines, intuitive clinical interfaces, and security protocols.",
  },
  {
    id: "04",
    phase: "PHASE 04",
    tag: "DEVELOP",
    title: "AI Development & Pipeline Engineering",
    description:
      "Build custom healthcare AI models, conversational patient chatbots, OCR document intelligence, and EHR API endpoints.",
  },
  {
    id: "05",
    phase: "PHASE 05",
    tag: "TEST",
    title: "Testing & Clinical Validation",
    description:
      "Validate workflow accuracy, test AI response safety, perform load testing, and verify end-to-end HIPAA security compliance.",
  },
  {
    id: "06",
    phase: "PHASE 06",
    tag: "DEPLOY",
    title: "Production Deployment & Rollout",
    description:
      "Deploy secure AI systems to cloud healthcare infrastructure, connect live EHR data feeds, and complete staff onboarding.",
  },
  {
    id: "07",
    phase: "PHASE 07",
    tag: "SUPPORT",
    title: "Continuous Monitoring & Support",
    description:
      "Provide 24/7 system monitoring, model retrainings, performance optimization, and ongoing functional enhancements.",
  },
];

export function HealthcareProcessSection() {
  const [activeStepId, setActiveStepId] = useState(processSteps[0].id);
  const [isPlaying, setIsPlaying] = useState(true);
  const timelineRef = useRef<HTMLDivElement>(null);

  const activeIndex = processSteps.findIndex((item) => item.id === activeStepId);
  const activeItem = processSteps[activeIndex];
  const progressPercentage = (activeIndex / (processSteps.length - 1)) * 100;

  // Autoplay control
  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!timelineRef.current) return;
    const container = timelineRef.current;
    const activeButton = container.querySelector(`[data-step="${activeStepId}"]`) as HTMLElement;
    if (activeButton) {
      const scrollLeft =
        activeButton.offsetLeft - container.offsetWidth / 2 + activeButton.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeStepId]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStepId((prevId) => {
        const currentIndex = processSteps.findIndex((item) => item.id === prevId);
        const nextIndex = (currentIndex + 1) % processSteps.length;
        return processSteps[nextIndex].id;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [isPlaying, activeIndex]);

  const handleNext = () => {
    setIsPlaying(false);
    setActiveStepId((prevId) => {
      const currentIndex = processSteps.findIndex((item) => item.id === prevId);
      const nextIndex = (currentIndex + 1) % processSteps.length;
      return processSteps[nextIndex].id;
    });
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveStepId((prevId) => {
      const currentIndex = processSteps.findIndex((item) => item.id === prevId);
      const prevIndex = (currentIndex - 1 + processSteps.length) % processSteps.length;
      return processSteps[prevIndex].id;
    });
  };

  return (
    <section
      data-section="healthcare-process"
      className="relative w-full bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-12 md:py-20 overflow-hidden border-t border-zinc-100"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        {/* Section Header (Matches About-Us Timeline Style) */}
        <div className="text-center mb-10 md:mb-12 flex flex-col items-center max-w-6xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF5812]/20 bg-[#FF5812]/05 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.20em] text-[#FF5812] mb-5 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
            OUR AI DEVELOPMENT PROCESS
          </span>

          <h2 className="text-[#0a0a1a] tracking-tight mb-4 flex flex-col items-center">
            <span className="font-black text-2xl sm:text-3xl md:text-4xl leading-[1.15] max-w-none block w-full">
              <span className="text-[#0a0a1a]">Seven Phases</span>{" "}
              <span className="text-zinc-400 font-light">&</span>{" "}
              <span className="text-[#FF5812] drop-shadow-[0_2px_12px_rgba(255,88,18,0.15)]">
                One Predictable Rollout
              </span>
            </span>
          </h2>

          <p className="text-zinc-600/90 font-medium text-sm sm:text-base leading-relaxed max-w-2xl mt-1">
            A proven 7-step healthcare AI engineering lifecycle from initial workflow discovery to continuous production optimization.
          </p>
        </div>

        {/* Main Split Grid Section */}
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center pb-4">
          {/* Left Side: Solid Grid Console Card with Step Number */}
          <div className="lg:col-span-6 relative w-full h-[230px] md:h-[340px] flex items-center justify-center lg:justify-end">
            <div className="relative w-[280px] md:w-[420px] aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#FF5812]/15 via-[#050505] to-[#FF5812]/5 border border-zinc-800/80 shadow-[0_20px_40px_-16px_rgba(5,5,5,0.4)] overflow-hidden flex items-center justify-center">
              {/* Grid lines overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-10" />

              {/* Tech details header */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-20 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]" />
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                  ENGINEERING_GRID
                </span>
              </div>
              <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-500 tracking-wider z-20 pointer-events-none">
                SYS: PHASE_{activeItem.id}
              </div>

              {/* Centered Step Number Typography */}
              <div className="relative z-20 flex items-baseline font-black text-[60px] md:text-[80px] leading-none tracking-tighter select-none pointer-events-none whitespace-nowrap">
                <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.2)] mr-1">
                  0
                </span>
                <span className="text-[#FF5812] drop-shadow-[0_4px_20px_rgba(255,88,18,0.45)]">
                  {activeItem.id.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Editorial Phase Details */}
          <div className="lg:col-span-6 relative z-20 flex flex-col justify-center px-4 md:px-8 w-full mt-4 lg:mt-0">
            <div className="w-full text-center lg:text-left max-w-xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start">
              {/* Stage Pill */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-mono tracking-wider text-[#1852FF] font-semibold bg-[#1852FF]/10 px-2.5 py-1 rounded-md">
                  {String(activeIndex + 1).padStart(2, "0")} // {String(processSteps.length).padStart(2, "0")}
                </span>
              </div>

              {/* Heading with Vertical Gradient Accent Bar */}
              <div className="flex gap-4 items-stretch mb-3 text-left">
                <div className="w-[3px] bg-gradient-to-b from-[#1852FF] to-[#FF5812] rounded-full flex-shrink-0" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-[1.2] bg-gradient-to-r from-[#0a0a1a] to-zinc-600 bg-clip-text text-transparent">
                  {activeItem.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[#0a0a1a]/70 font-normal text-sm sm:text-base leading-relaxed mt-2">
                {activeItem.description}
              </p>

              {/* Phase Badge */}
              <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5812]/10 text-[#FF5812] text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]" />
                {activeItem.phase} — {activeItem.tag}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Navigation Scrubber Track (Matches About-Us Timeline) */}
        <div className="relative mt-6 md:mt-8 w-full flex flex-col gap-4">
          <div className="flex items-center justify-between px-2 sm:px-4">
            {/* Step Navigation Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-950 transition-colors shadow-xs focus:outline-none cursor-pointer"
                aria-label="Previous phase"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-950 transition-colors shadow-xs focus:outline-none cursor-pointer"
                aria-label="Next phase"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Autoplay Toggle */}
            <div className="flex items-center">
              <button
                onClick={() => setIsPlaying((prev) => !prev)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold shadow-xs transition-all focus:outline-none cursor-pointer ${
                  isPlaying
                    ? "bg-[#1852FF]/10 border-[#1852FF]/20 text-[#1852FF]"
                    : "bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Autoplay On</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Autoplay Paused</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Scrubber Scroll Track */}
          <div className="relative w-full">
            <div
              ref={timelineRef}
              className="relative z-10 flex overflow-x-auto pt-4 pb-6 hide-scrollbar justify-between items-start gap-8 md:gap-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Progress Line */}
              <div className="absolute top-[28px] left-[20px] right-[20px] h-[3px] pointer-events-none z-0">
                <div className="w-full h-full bg-zinc-200/80 rounded-full" />
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1852FF] to-[#FF5812] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {processSteps.map((item, index) => {
                const isActive = activeStepId === item.id;
                const isPassed = index <= activeIndex;
                return (
                  <button
                    key={item.id}
                    data-step={item.id}
                    onClick={() => {
                      setActiveStepId(item.id);
                      setIsPlaying(false);
                    }}
                    className="group relative flex flex-col items-center gap-2 flex-shrink-0 focus:outline-none w-20 cursor-pointer text-center"
                    aria-label={`Select phase ${item.id}`}
                  >
                    {/* Circle Node */}
                    <div
                      className={`relative w-6 h-6 rounded-full transition-all duration-300 ease-out flex items-center justify-center z-10 border shadow-xs ${
                        isActive
                          ? "bg-[#FF5812] border-[#FF5812] scale-110 shadow-[0_0_12px_rgba(255,88,18,0.4)]"
                          : isPassed
                          ? "bg-[#1852FF] border-[#1852FF]"
                          : "bg-white border-zinc-300 group-hover:border-zinc-500 group-hover:scale-105"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full bg-white transition-transform duration-300 ${
                          isActive ? "scale-100" : "scale-0 group-hover:scale-50"
                        }`}
                      />
                    </div>

                    {/* Step Label */}
                    <span
                      className={`text-xs font-bold transition-all duration-300 ${
                        isActive ? "text-[#FF5812] scale-105" : "text-zinc-400 group-hover:text-zinc-800"
                      }`}
                    >
                      {item.id} {item.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}

