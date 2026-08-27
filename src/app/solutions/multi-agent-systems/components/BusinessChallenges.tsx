"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge";
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
    <section className="relative w-full overflow-hidden bg-[#F7F5F2] pb-10 pt-16 lg:pb-14 lg:pt-24">
      <div className="pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] -translate-x-1/3 rounded-full bg-[#FF6A13]/[0.07] blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-[85rem] flex-col items-center px-4 sm:px-6 lg:px-8">

        <SectionBadge text="BUSINESS CHALLENGES" variant="line" />

        <h2 className="mb-4 text-center text-3xl font-extrabold leading-tight tracking-tight text-[#1a202c] md:text-4xl lg:text-[2.5rem]">
          Where single agents stall —{" "}
          <span className="text-[#FF5812]">multi-agent systems win</span>
        </h2>

        <p className="mb-12 max-w-3xl text-center text-[15px] text-slate-500 lg:text-base">
          Softree helps enterprises orchestrate specialized AI agents, eliminate handoff friction, scale autonomous workflows safely, and unlock shared enterprise knowledge with governed multi-agent systems.
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
