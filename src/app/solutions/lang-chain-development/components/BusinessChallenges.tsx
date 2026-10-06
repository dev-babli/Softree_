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
    <section className="relative w-full overflow-hidden bg-[#F7F5F2] py-12 lg:py-16">
      <div className="pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] -translate-x-1/3 rounded-full bg-[#FF6A13]/[0.07] blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col items-center px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col mb-8 sm:mb-12 items-center text-center">
          <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
            <span className="typo-caption text-[#FF5812] uppercase font-bold">
              BUSINESS CHALLENGES
            </span>
          </div>

          <h2 className="typo-heading-2 text-slate-900 mb-4 text-center max-w-4xl">
            LangChain Development for{" "}
            <span className="text-[#FF5812]">Business Challenges</span>
          </h2>

          <p className="typo-description text-slate-500 max-w-3xl text-center">
            Softree LangChain development services help enterprises move from prototypes to production—with reliable RAG pipelines, LangGraph agents, tool integrations, eval suites, and governed cost controls.
          </p>
        </div>

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
