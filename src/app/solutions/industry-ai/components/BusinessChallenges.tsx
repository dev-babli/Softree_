"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge";
import AutoScrollColumn from './AutoScrollColumn';
import { useIndustryConfig } from "../context";

export default function BusinessChallenges() {
  const {
    businessChallenges: businessChallengesData,
    aiSolutions: aiSolutionsData,
    sections,
    challengesColumnLabel,
    solutionsColumnLabel,
  } = useIndustryConfig();
  const [activeHoverId, setActiveHoverId] = useState<number | null>(null);

  const [startIndex, setStartIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % businessChallengesData.length);
  }, [businessChallengesData.length]);

  const prevSlide = useCallback(() => {
    setStartIndex((prev) => (prev - 1 + businessChallengesData.length) % businessChallengesData.length);
  }, [businessChallengesData.length]);

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
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-12 lg:py-16">
      <div className="pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] -translate-x-1/3 rounded-full bg-[#FF6A13]/[0.07] blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-[85rem] flex-col items-center px-4 sm:px-6 lg:px-8">

        <SectionBadge text={sections.businessChallenges.badge} variant="line" />

        <h2 className="mb-4 text-center text-2xl font-extrabold leading-tight tracking-tight text-[#1a202c] md:text-4xl lg:text-[2.25rem]">
          {sections.businessChallenges.title}{" "}
          <span className="text-[#FF5812]">{sections.businessChallenges.highlight}</span>
        </h2>

        <p className="mb-6 max-w-3xl text-center text-[15px] text-slate-500 lg:mb-8 lg:text-base">
          {sections.businessChallenges.description}
        </p>

        <div
          className="relative z-20 flex w-full flex-col gap-6 md:flex-row lg:gap-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AutoScrollColumn
            data={businessChallengesData}
            isRight={false}
            columnLabel={challengesColumnLabel ?? "Business Challenges"}
            activeHoverId={activeHoverId}
            setActiveHoverId={setActiveHoverId}
            startIndex={startIndex}
            onInteract={handleInteraction}
          />
          <AutoScrollColumn
            data={aiSolutionsData}
            isRight={true}
            columnLabel={solutionsColumnLabel ?? "AI Solutions"}
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
