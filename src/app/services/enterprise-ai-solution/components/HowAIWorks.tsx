"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import SectionBadge from './SectionBadge';
import WorkflowTimeline from '../../ai-development-services/components/WorkflowTimeline';
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
    <section className="relative w-full py-12 lg:py-16 bg-transparent overflow-hidden" ref={containerRef}>
      {/* Background Decorators */}

      {/* Soft orange radial top right */}
      
      {/* Curved lines pattern bottom left and right */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] border-t border-r border-[#FF6B2C]/10 rounded-tr-[100%] opacity-20 pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] border-t border-l border-[#FF6B2C]/10 rounded-tl-[100%] opacity-20 pointer-events-none translate-y-1/2 translate-x-1/4"></div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        <SectionBadge text="OUR ENTERPRISE AI DELIVERY PROCESS" variant="line" />
        
        <h2 className="text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-2 md:mb-3 tracking-tight text-center leading-tight">
          From AI Strategy to <span className="text-[#FF5812]">Production-Ready Solutions</span>
        </h2>
        
        <p className="text-[15px] lg:text-base text-[#6B7280] mb-6 lg:mb-8 text-center max-w-2xl leading-relaxed">
          Our enterprise AI team designs, builds, integrates, and scales secure AI solutions using a structured delivery process focused on ROI, governance, adoption, and measurable business outcomes.
        </p>
        
        <div 
          className="w-full bg-[#FAF8F6] rounded-[24px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#ECECEC] flex flex-col lg:flex-row gap-4 lg:gap-6 mb-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Side - Timeline */}
          <div className="w-full lg:w-[42%] flex flex-col">
            <WorkflowTimeline 
               steps={workflowSteps} 
               activeStep={activeStep} 
               onStepClick={handleStepClick} 
            />
          </div>

          {/* Right Side - Media */}
          <div className="w-full lg:w-[58%] min-h-[360px] lg:h-[460px] relative bg-[#0B0F19] rounded-2xl overflow-hidden flex flex-col shadow-inner">
            <WorkflowMedia activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}
