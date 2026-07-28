"use client";
import React from 'react';

export default function CarouselControls({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) {
  return (
    <div className="flex items-center gap-4 z-20">
      <button 
        onClick={onPrev}
        className="w-12 h-12 rounded-full bg-white border border-[#ECECEC] shadow-sm flex items-center justify-center text-[#111827] hover:bg-[#FF6B2C] hover:text-white hover:border-[#FF6B2C] transition-all duration-300 outline-none focus:ring-2 focus:ring-orange-500/50"
        aria-label="Previous Slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={onNext}
        className="w-12 h-12 rounded-full bg-white border border-[#ECECEC] shadow-sm flex items-center justify-center text-[#111827] hover:bg-[#FF6B2C] hover:text-white hover:border-[#FF6B2C] transition-all duration-300 outline-none focus:ring-2 focus:ring-orange-500/50"
        aria-label="Next Slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
