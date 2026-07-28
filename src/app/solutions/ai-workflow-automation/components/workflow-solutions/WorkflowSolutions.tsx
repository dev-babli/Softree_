"use client";

import { useState, useEffect } from "react";
import { workflowSolutionsData } from "./workflow-solutions-data";
import { WorkflowSolutionsCard } from "./WorkflowSolutionsCard";
import { WorkflowSolutionsCarousel } from "./WorkflowSolutionsCarousel";

export function WorkflowSolutions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % workflowSolutionsData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center justify-center gap-6 mb-6">
            <style>{`
              @keyframes line-stretch {
                0%, 100% { width: 40px; opacity: 0.6; }
                50% { width: 100px; opacity: 1; }
              }
              .animate-line-stretch {
                animation: line-stretch 3s ease-in-out infinite;
              }
            `}</style>
            <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute left-0 w-2 h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
            </div>
            <span className="text-[#FF5812] font-bold tracking-[0.2em] text-sm uppercase">
              AI WORKFLOW AUTOMATION SOLUTIONS
            </span>
            <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Intelligent AI <span className="text-orange-500">Workflow Automation</span><br/> for Every Business Function
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl">
            Transform repetitive business processes into intelligent automated workflows that improve operational efficiency, reduce costs, eliminate manual work, and accelerate enterprise productivity.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Timeline & Cards */}
          <div 
            className="flex flex-col relative lg:col-span-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {workflowSolutionsData.map((step, index) => (
              <WorkflowSolutionsCard
                key={step.id}
                step={step}
                index={index}
                activeIndex={activeIndex}
                onClick={() => setActiveIndex(index)}
                isLast={index === workflowSolutionsData.length - 1}
              />
            ))}
          </div>

          {/* Right Column: Carousel */}
          <div 
            className="w-full lg:col-span-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <WorkflowSolutionsCarousel 
              activeIndex={activeIndex} 
              onSelect={setActiveIndex} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
