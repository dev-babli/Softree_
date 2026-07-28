"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import SectionBadge from './SectionBadge';
import AutoScrollColumn from './AutoScrollColumn';
import { businessChallengesData, aiSolutionsData } from '../data/challenges';

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
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-transparent">
      {/* Background Decorators */}
      
      {/* Top left decorative dots */}
      <div className="absolute top-12 left-12 grid grid-cols-5 gap-3 pointer-events-none opacity-20">
         {[...Array(25)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>)}
      </div>
      
      {/* Bottom curved lines pattern placeholder */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] border-t border-r border-orange-100 rounded-tr-[100%] opacity-20 pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] border-t border-r border-orange-100/50 rounded-tr-[100%] opacity-20 pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        <SectionBadge text="BUSINESS CHALLENGES" variant="line" />
        
        <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-[#1a202c] mb-4 tracking-tight text-center leading-tight">
          Which challenge are you trying to solve?
        </h2>
        
        <p className="text-base md:text-lg text-slate-500 mb-12 text-center max-w-lg">
          Select the area where you need the most help.
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
