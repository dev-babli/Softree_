"use client";
import React from 'react';
import { motion } from 'framer-motion';

const getIcon = (type: string) => {
  switch (type) {
    case 'search-document': return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l4 4" />
      </svg>
    );
    case 'workflow': return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM9 8h2v5h3" />
      </svg>
    );
    case 'development': return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
    case 'analytics': return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    );
    default: return <div />;
  }
};

export default function WorkflowStep({ step, index, isActive, onClick }: any) {
  return (
    <div className="flex items-start gap-2 lg:gap-3 cursor-pointer group" onClick={onClick}>
      {/* Outer Circle (on the timeline) */}
      <div className="relative mt-4 flex-shrink-0 w-[28px] h-[28px] rounded-full flex items-center justify-center bg-white z-10">
         {isActive ? (
            <motion.div 
               layoutId="activeCircle"
               className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] rounded-full bg-[#FF6B2C] flex items-center justify-center shadow-[0_0_12px_rgba(255,107,44,0.4)]"
            >
               <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
               </svg>
            </motion.div>
         ) : (
            <div className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] rounded-full bg-slate-100 flex items-center justify-center text-[10px] lg:text-[11px] font-bold text-slate-500 group-hover:bg-slate-200 transition-colors">
               {index + 1}
            </div>
         )}
      </div>

      {/* Content Card */}
      <motion.div 
        animate={{
          backgroundColor: isActive ? 'rgba(255, 246, 240, 1)' : 'rgba(255, 255, 255, 0)',
          borderColor: isActive ? 'rgba(255, 107, 44, 0.2)' : 'rgba(236, 236, 236, 0)',
        }}
        className="flex-1 rounded-[16px] lg:rounded-[20px] p-3 lg:p-4 border transition-colors duration-300 flex items-start gap-3 lg:gap-4"
      >
        {/* Inner Icon */}
        <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-orange-50 text-[#FF6B2C] flex items-center justify-center shadow-sm">
          {getIcon(step.icon)}
        </div>
        
        {/* Text */}
        <div className="flex-1 mt-0">
          <h4 className="text-[14px] lg:text-[15px] font-bold text-[#111827] mb-0.5 lg:mb-1">{step.title}</h4>
          <p className="text-[12px] lg:text-[13px] leading-[1.45] text-[#6B7280]">
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
