"use client";
import React from 'react';
import Image from 'next/image';
import IndustryCarousel from './IndustryCarousel';

export default function Industries() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Upper Part - Light Orange Banner */}
      <section className="w-full bg-[#FFF0E8] relative overflow-hidden py-16 lg:py-20 flex items-center">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes textShimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-text-shimmer {
            background-size: 200% auto;
            animation: textShimmer 4s linear infinite;
          }
        `}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center justify-between relative z-10">
          {/* Left Text */}
          <div className="flex-1 text-slate-950 max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 mb-2">
              Solve Real-World Challenges with
            </h3>
            <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-none mb-4">
              <span className="bg-gradient-to-r from-[#CC4E11] via-[#E0561B] to-[#CC4E11] bg-clip-text text-transparent animate-text-shimmer">
                Industry–Specific AI
              </span>
            </h2>
            <p className="text-xs sm:text-[14px] text-slate-800 mb-8 max-w-md leading-relaxed font-semibold">
              Move beyond generic solutions - get AI built for your business!
            </p>
            <a 
              href="#contact"
              className="inline-flex bg-[#FF6B2C] hover:bg-[#E0561B] text-white font-bold text-[13px] tracking-wider px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-orange-500/20"
            >
              Partner with Softree
            </a>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full lg:w-auto h-[260px] lg:h-[320px] relative mt-10 lg:mt-0 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] h-full">
              <Image
                src="/images/ai-development-services/boho_robot_hand.png"
                alt="Bohemian Robot Hand Illustration"
                fill
                className="object-contain object-center lg:object-right-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Middle and Lower Parts - Dark Knowledge Centre Section */}
      <section className="w-full bg-black py-20 lg:py-24 relative overflow-hidden">
        {/* Decorative subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          {/* Header Content */}
          <div className="flex flex-col items-center text-center max-w-2xl mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-[2.25rem] font-bold text-white mb-4 tracking-tight">
              The Softree Knowledge Centre
            </h2>
            <p className="text-[#6B7280] text-[14px] leading-relaxed max-w-xl">
              Cut through the noise with our expert take on what truly drives value in enterprise AI. These articles deliver honest analysis and proven strategies, focusing on the practical application of technology to solve business problems.
            </p>
          </div>

          {/* Carousel Slider */}
          <div className="w-full">
            <IndustryCarousel />
          </div>
        </div>
      </section>
    </div>
  );
}
