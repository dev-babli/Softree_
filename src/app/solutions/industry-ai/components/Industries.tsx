"use client";

import React from 'react';
import SectionBadge from './SectionBadge';
import IndustryCarousel from './IndustryCarousel';
import { useIndustryConfig } from '../context';

export default function Industries() {
  const { sections } = useIndustryConfig();
  const sectionCopy = sections.useCases;
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-12 lg:py-16">
      {/* Background Decorators */}
      {/* Top Left */}
      <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] -translate-x-1/4 -translate-y-1/4 rounded-br-[100%] border-b border-r border-[#FF6B2C]/10 opacity-20"></div>



      <div className="relative z-10 mx-auto flex max-w-[85rem] flex-col items-center px-0">

        <div className="flex w-full flex-col items-center px-4 sm:px-6 lg:px-8">
          <SectionBadge text={sectionCopy.badge} variant="line" />

          <h2 className="text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-2 md:mb-3 tracking-tight text-center leading-tight">
            {sectionCopy.title}{" "}
            <span className="text-[#FF6B2C]">{sectionCopy.highlight}</span>
          </h2>

          <p className="text-[15px] lg:text-base text-[#6B7280] mb-6 lg:mb-8 text-center max-w-2xl mx-auto leading-relaxed">
            {sectionCopy.description}
          </p>
        </div>

        {/* Full width Carousel */}
        <div className="w-full">
          <IndustryCarousel />
        </div>

      </div>
    </section>
  );
}
