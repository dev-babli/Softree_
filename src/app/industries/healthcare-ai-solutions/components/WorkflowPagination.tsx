import React from 'react';
import { motion } from 'framer-motion';

export default function WorkflowPagination({ totalSteps, activeStep, onDotClick }: { totalSteps: number, activeStep: number, onDotClick: (index: number) => void }) {
  return (
    <div className="flex items-center gap-3 bg-[#1A1F2E]/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-lg">
      {[...Array(totalSteps)].map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className="relative w-2.5 h-2.5 rounded-full transition-colors flex items-center justify-center outline-none focus:ring-2 focus:ring-orange-500/50"
          aria-label={`Go to step ${index + 1}`}
        >
          <div className={`w-full h-full rounded-full ${index === activeStep ? 'bg-[#FF6B2C]' : 'bg-white/30 hover:bg-white/50'} transition-colors duration-300`} />
        </button>
      ))}
    </div>
  );
}
