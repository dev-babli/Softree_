"use client";
import React from 'react';

export default function CarouselControls({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) {
  return (
    <div className="flex items-center gap-4 z-20">
      <button 
        onClick={onPrev}
        className="w-12 h-12 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 outline-none focus:ring-2 focus:ring-white/20"
        aria-label="Previous Slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={onNext}
        className="w-12 h-12 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 outline-none focus:ring-2 focus:ring-white/20"
        aria-label="Next Slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
