"use client";
import React from 'react';
import WorkflowStep from './WorkflowStep';
import { motion } from 'framer-motion';

export default function WorkflowTimeline({ steps, activeStep, onStepClick }: any) {
  return (
    <div className="relative flex flex-col h-full py-2 pl-2 lg:pl-4 pr-1 lg:pr-2">
      {/* Vertical gray line */}
      <div className="absolute left-[22px] lg:left-[30px] top-[30px] bottom-[30px] w-[2px] bg-slate-100 z-0"></div>
      
      {/* Active orange line overlay */}
      <motion.div 
        className="absolute left-[22px] lg:left-[30px] top-[30px] w-[2px] bg-[#FF6B2C] z-0 origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: activeStep / (steps.length - 1) }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      
      <div className="flex flex-col gap-2 relative z-10 h-full justify-between">
        {steps.map((step: any, index: number) => (
          <WorkflowStep 
            key={step.id} 
            step={step} 
            index={index} 
            isActive={index === activeStep} 
            onClick={() => onStepClick(index)} 
          />
        ))}
      </div>
    </div>
  );
}
