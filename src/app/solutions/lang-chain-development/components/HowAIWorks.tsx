"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import SectionBadge from './SectionBadge';
import WorkflowTimeline from "@/app/services/ai-development-services/components/WorkflowTimeline";
import WorkflowMedia from './WorkflowMedia';
import { workflowSteps } from '../data/how-ai-works';

export default function HowAIWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isInView || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isInView, isHovered]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 text-slate-900 scroll-mt-24 relative overflow-hidden" ref={containerRef}>
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#FF6A13]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-slate-300/20 blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 flex flex-col">
        {/* Header */}
        <div className="flex flex-col mb-8 sm:mb-12">
          <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block self-start">
            <span className="typo-caption text-[#FF5812] uppercase">
              OUR LANGCHAIN DELIVERY PROCESS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-6 items-start">
            <h2 className="typo-heading-2 text-slate-900 lg:pr-12 xl:pr-24">
              From strategy to <span className="text-[#FF5812]">production LangChain apps</span>
            </h2>

            <p className="typo-description text-slate-500 w-full pt-1.5 lg:max-w-xl">
              A structured path from use-case discovery to governed LangChain chains and agents—built for RAG quality, tool reliability, observability, cost control, and measurable outcomes.
            </p>
          </div>
        </div>

        <div
          className="mb-8 flex w-full flex-col gap-4 rounded-[28px] border border-black/5 bg-[#F7F5F2] p-4 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)] lg:flex-row lg:gap-6 lg:p-5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Side - Timeline */}
          <div className="flex w-full flex-col lg:w-[42%]">
            <WorkflowTimeline
              steps={workflowSteps}
              activeStep={activeStep}
              onStepClick={handleStepClick}
            />
          </div>

          {/* Right Side - Media */}
          <div className="relative flex min-h-[280px] w-full flex-col overflow-hidden rounded-2xl bg-[#0B0F19] shadow-inner sm:min-h-[320px] lg:h-[460px] lg:w-[58%] lg:min-h-0">
            <WorkflowMedia activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}
