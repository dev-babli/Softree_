"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import CapabilitySectionBadge from '../Core-capabilities/CapabilitySectionBadge';
import AutoScrollColumn from './AutoScrollColumn';
import { businessChallengesData, aiSolutionsData } from './data';

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
    <section className="relative w-full py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">

        <CapabilitySectionBadge text="BUSINESS CHALLENGES" variant="line" />

        <h2 className="text-3xl md:text-4xl lg:text-[2.5rem]
 font-extrabold text-[#1a202c] mb-4 tracking-tight text-center leading-tight">
          Eliminate Manual Workflows That <span className="text-[#FF5812]">Slow Business Growth</span>
        </h2>

        <p className="text-[15px] lg:text-[17px] text-slate-500 mb-6 lg:mb-8 text-center max-w-2xl">
          Replace time-consuming manual processes with intelligent automation that improves efficiency, reduces operational costs, minimizes errors, and enables faster business decisions.
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
