"use client";
import React from 'react';
import Image from 'next/image';
import IndustryCarousel from './IndustryCarousel';

export default function Industries() {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col px-4 sm:px-6 lg:px-8 my-12 lg:my-20">


      {/* 2. Middle and Lower Parts - Dark Knowledge Centre Section */}
      <section className="w-full bg-[#050505] py-20 lg:py-24 relative overflow-hidden rounded-[32px] shadow-2xl">
        {/* Decorative subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

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
