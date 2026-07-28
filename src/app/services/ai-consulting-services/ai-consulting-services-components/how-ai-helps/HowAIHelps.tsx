"use client";

import { useState, useEffect } from "react";
import { howAIHelpsData } from "./how-ai-helps-data";
import { HowAIHelpsCard } from "./HowAIHelpsCard";
import { HowAIHelpsCarousel } from "./HowAIHelpsCarousel";

export function HowAIHelps() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % howAIHelpsData.length);
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
              HOW AI HELPS
            </span>
            <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            How <span className="text-orange-500">AI</span> Helps Your Business
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl">
            From challenges to real outcomes — powered by intelligent automation.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Timeline & Cards */}
          <div 
            className="flex flex-col relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {howAIHelpsData.map((step, index) => (
              <HowAIHelpsCard
                key={step.id}
                step={step}
                index={index}
                activeIndex={activeIndex}
                onClick={() => setActiveIndex(index)}
                isLast={index === howAIHelpsData.length - 1}
              />
            ))}
          </div>

          {/* Right Column: Carousel */}
          <div 
            className="w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <HowAIHelpsCarousel 
              activeIndex={activeIndex} 
              onSelect={setActiveIndex} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
