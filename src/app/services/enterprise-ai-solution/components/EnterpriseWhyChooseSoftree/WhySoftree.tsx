"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUpVariant } from "./animations";
import { whySoftreeData } from "./whySoftreeData";
import { WhySoftreeCard } from "./WhySoftreeCard";
import { WhySoftreeContent } from "./WhySoftreeContent";
export const WhySoftree = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-play logic
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % whySoftreeData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Scroll active card into view on mobile
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeElement = container.children[activeIndex] as HTMLElement;
      if (activeElement) {
        container.scrollTo({
          left: activeElement.offsetLeft - container.offsetWidth / 2 + activeElement.offsetWidth / 2,
          behavior: "smooth"
        });
      }
    }
  }, [activeIndex]);

  return (
    <section className="relative w-full py-24 overflow-hidden font-sans bg-linear-to-b from-zinc-50 via-white to-zinc-50">
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
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
            <span className="text-[#FF5812] font-bold tracking-[0.2em] text-sm uppercase">WHY SOFTREE</span>
            <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4 max-w-4xl mx-auto leading-tight">
            Built for Enterprise AI. Designed for <span className="text-[#FF6A13]">Impact.</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Five reasons enterprises trust Softree to build, scale, and succeed with AI.
          </p>
        </motion.div>

        {/* Main Content Area */}
        <div 
          className="bg-[#FAFAFA] rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-12 lg:gap-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Content */}
          <WhySoftreeContent 
            item={whySoftreeData[activeIndex]} 
            currentIndex={activeIndex}
            totalItems={whySoftreeData.length}
          />

          {/* Right Navigation Cards */}
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
            <div 
              ref={scrollContainerRef}
              className="flex flex-row lg:flex-row gap-4 overflow-x-auto lg:overflow-visible pb-8 lg:pb-0 hide-scrollbar px-4 lg:px-0 snap-x snap-mandatory lg:snap-none"
            >
              {whySoftreeData.map((item, index) => (
                <div key={item.id} className="snap-center">
                  <WhySoftreeCard
                    item={item}
                    isActive={index === activeIndex}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};
