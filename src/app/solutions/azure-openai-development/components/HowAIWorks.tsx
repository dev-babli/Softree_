"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import SectionBadge from './SectionBadge';
import WorkflowTimeline from '../../../services/ai-development-services/components/WorkflowTimeline';
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
    <section className="relative w-full overflow-hidden bg-white py-12 lg:py-16" ref={containerRef}>
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#FF6A13]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-slate-300/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-[85rem] flex-col items-center px-4 sm:px-6 lg:px-8">
        
        <SectionBadge text="OUR AZURE OPENAI DELIVERY PROCESS" variant="line" />
        
        <h2 className="mb-2 text-center text-2xl font-extrabold leading-tight tracking-tight text-[#111827] md:mb-3 md:text-4xl lg:text-[2.25rem]">
          From strategy to <span className="text-[#FF5812]">production Azure OpenAI</span>
        </h2>
        
        <p className="mb-8 max-w-2xl text-center text-[15px] leading-relaxed text-[#6B7280] lg:mb-10 lg:text-base">
          A structured path from use-case discovery to governed GPT apps on Azure—built for security, grounding quality, cost control, and measurable outcomes.
        </p>
        
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
