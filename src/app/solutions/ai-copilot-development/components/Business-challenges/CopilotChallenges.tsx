"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import CapabilitySectionBadge from '@/app/services/ai-consulting-services/ai-consulting-services-components/Core-capabilities/CapabilitySectionBadge';
import AutoScrollColumn from './AutoScrollColumn';
import { copilotChallengesData, copilotSolutionsData } from './copilotChallengesData';

export default function CopilotChallenges() {
  const [activeHoverId, setActiveHoverId] = useState<number | null>(null);

  const [startIndex, setStartIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % copilotChallengesData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setStartIndex((prev) => (prev - 1 + copilotChallengesData.length) % copilotChallengesData.length);
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
    <section className="relative w-full py-10 lg:py-16 overflow-hidden bg-transparent">
      {/* Background Decorators */}



      {/* Bottom curved lines pattern placeholder */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] border-t border-r border-orange-100 rounded-tr-[100%] opacity-20 pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] border-t border-r border-orange-100/50 rounded-tr-[100%] opacity-20 pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">

        <CapabilitySectionBadge text="BUSINESS CHALLENGES" variant="line" />

        <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold text-[#1a202c] mb-4 tracking-tight text-center leading-tight">
          Common Business Challenges <span className="text-[#FF5812]">AI Copilot Development Solves</span>
        </h2>

        <p className="text-[15px] lg:text-[17px] text-slate-500 mb-12 text-center max-w-2xl">
          Many organizations struggle with fragmented knowledge, repetitive employee tasks, disconnected business systems, and slow access to critical information. Softree develops secure enterprise AI copilots that automate workflows, deliver intelligent assistance, and integrate seamlessly with Microsoft 365, SharePoint, Dynamics 365, and enterprise applications.
        </p>

        <div
          className="w-full flex flex-col md:flex-row gap-6 lg:gap-8 relative z-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AutoScrollColumn
            data={copilotChallengesData}
            isRight={false}
            activeHoverId={activeHoverId}
            setActiveHoverId={setActiveHoverId}
            startIndex={startIndex}
            onInteract={handleInteraction}
          />
          <AutoScrollColumn
            data={copilotSolutionsData}
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
