"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import SectionBadge from '../../../services/ai-development-services/components/SectionBadge';
import AutoScrollColumn from './AutoScrollColumn';
import { businessChallengesData } from '../data/businessChallenges';
import { aiSolutionsData } from '../data/aiSolutions';

export default function BusinessChallenges() {
  const [activeHoverId, setActiveHoverId] = useState<number | null>(null);

  const [startIndex, setStartIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % businessChallengesData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setStartIndex((prev) => (prev - 1 + businessChallengesData.length) % businessChallengesData.length);
  }, []);

  // Auto scroll effect
  useEffect(() => {
    if (isHovered || isInteracting || activeHoverId !== null) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered, isInteracting, activeHoverId, nextSlide]);

  const handleInteraction = useCallback((direction: 'up' | 'down') => {
    setIsInteracting(true);
    if (direction === 'down') nextSlide();
    else prevSlide();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 5000);
  }, [nextSlide, prevSlide]);

  return (
    <section className="relative w-full pt-20 pb-8 lg:pt-28 lg:pb-10 overflow-hidden bg-transparent">
      {/* Background Decorators */}



      {/* Bottom curved lines pattern placeholder */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] border-t border-r border-orange-100 rounded-tr-[100%] opacity-20 pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] border-t border-r border-orange-100/50 rounded-tr-[100%] opacity-20 pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">

        <SectionBadge text="BUSINESS CHALLENGES" variant="line" />

        <h2 className="text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#1a202c] mb-4 tracking-tight text-center leading-tight">
          AI AGENT SOLUTIONS FOR <span className="text-[#FF5812]">BUSINESS CHALLENGES</span>
        </h2>

        <p className="text-[15px] lg:text-base text-slate-500 mb-12 text-center max-w-3xl">
          Softree helps enterprises automate complex workflows, streamline operations, accelerate decision-making, and unlock enterprise knowledge with secure, scalable, and intelligent AI agents.
        </p>

        <div
          className="w-full flex flex-col md:flex-row gap-6 lg:gap-8 relative z-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AutoScrollColumn
            data={businessChallengesData}
            isRight={false}
            activeHoverId={activeHoverId}
            setActiveHoverId={setActiveHoverId}
            startIndex={startIndex}
            onInteract={handleInteraction}
          />
          <AutoScrollColumn
            data={aiSolutionsData}
            isRight={true}
            activeHoverId={activeHoverId}
            setActiveHoverId={setActiveHoverId}
            startIndex={startIndex}
            onInteract={handleInteraction}
          />
        </div>
      </div>
    </section>
  );
}
