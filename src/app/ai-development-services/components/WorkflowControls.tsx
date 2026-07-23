import React from 'react';
import WorkflowPagination from './WorkflowPagination';

export default function WorkflowControls({ totalSteps, activeStep, onNext, onPrev, onDotClick }: any) {
  return (
    <div className="absolute bottom-4 left-0 right-0 px-4 sm:px-6 flex items-center justify-between z-20">
      <button 
        onClick={onPrev}
        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#1A1F2E]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#FF6B2C] hover:border-[#FF6B2C] transition-all duration-300 shadow-lg outline-none focus:ring-2 focus:ring-orange-500/50"
        aria-label="Previous step"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <WorkflowPagination totalSteps={totalSteps} activeStep={activeStep} onDotClick={onDotClick} />
      
      <button 
        onClick={onNext}
        className="w-10 h-10 rounded-full bg-[#1A1F2E]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#FF6B2C] hover:border-[#FF6B2C] transition-all duration-300 shadow-lg outline-none focus:ring-2 focus:ring-orange-500/50"
        aria-label="Next step"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
