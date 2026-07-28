"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { challengePairs } from "./data";
import { ChallengeRow } from "./ChallengeRow";
import { BusinessChallengesHeader } from "./BusinessChallengesHeader";


export const BusinessChallenges = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play synchronization
  useEffect(() => {
    if (isHovered) return;

    const timeoutId = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % challengePairs.length);
    }, 4000); // 4s per row

    return () => clearTimeout(timeoutId);
  }, [activeIndex, isHovered]);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <BusinessChallengesHeader />

        {/* Outer Rounded Container */}
        <div 
          className="max-w-5xl mx-auto bg-white rounded-[40px] p-6 md:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Column Headers */}
          <div className="hidden md:flex justify-between items-start mb-12 px-2 md:px-4">
            {/* Left Column Header */}
            <div className="w-[45%] flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center w-14 h-14 flex-shrink-0">
                  <div className="absolute inset-2 bg-[#FF5812] opacity-30 blur-xl rounded-full"></div>
                  <div className="relative w-12 h-12 bg-white rounded-xl rotate-45 border border-orange-100/50 shadow-[0_4px_10px_rgba(255,88,18,0.1)] flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full border-2 border-[#FF5812] flex items-center justify-center -rotate-45">
                      <span className="text-[#FF5812] font-bold text-lg leading-none">!</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                  <h3 className="text-slate-900 font-extrabold text-xl tracking-wide uppercase">BUSINESS CHALLENGES</h3>
                  <div className="h-[2px] w-16 bg-orange-100 rounded-full overflow-hidden relative">
                    <motion.div 
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FF5812] to-transparent"
                    />
                  </div>
                </div>
              </div>
              <p className="text-slate-500 text-sm md:text-base leading-snug pl-[5.5rem] pr-4">
                Key business challenges slowing down efficiency and growth.
              </p>
            </div>

            {/* Right Column Header */}
            <div className="w-[45%] flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center w-14 h-14 flex-shrink-0">
                  <div className="absolute inset-2 bg-[#FF5812] opacity-30 blur-xl rounded-full"></div>
                  <div className="relative w-12 h-12 bg-white rounded-xl rotate-45 border border-orange-100/50 shadow-[0_4px_10px_rgba(255,88,18,0.1)] flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full border-2 border-[#FF5812] flex items-center justify-center -rotate-45">
                      <svg className="w-4 h-4 text-[#FF5812]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                  <h3 className="text-slate-900 font-extrabold text-xl tracking-wide uppercase">AI SOLUTIONS</h3>
                  <div className="h-[2px] w-16 bg-orange-100 rounded-full overflow-hidden relative">
                    <motion.div 
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FF5812] to-transparent"
                    />
                  </div>
                </div>
              </div>
              <p className="text-slate-500 text-sm md:text-base leading-snug pl-[5.5rem] pr-4">
                Intelligent AI solutions that automate, optimize and accelerate your business.
              </p>
            </div>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-6 md:gap-4">
            {challengePairs.map((pair, index) => (
              <ChallengeRow 
                key={pair.id} 
                pair={pair} 
                index={index}
                isActive={activeIndex === index}
                onHover={() => setActiveIndex(index)}
              />
            ))}
          </div>

        </div>


      </div>
    </section>
  );
};
