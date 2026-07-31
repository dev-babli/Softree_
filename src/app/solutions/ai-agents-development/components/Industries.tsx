import React from 'react';
import SectionBadge from './SectionBadge';
import IndustryCarousel from './IndustryCarousel';

export default function Industries() {
  return (
    <section className="relative w-full pt-8 pb-10 lg:pt-10 lg:pb-12 bg-transparent overflow-hidden">
      {/* Background Decorators */}
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] border-b border-r border-[#FF6B2C]/10 rounded-br-[100%] opacity-20 pointer-events-none -translate-x-1/4 -translate-y-1/4"></div>



      <div className="max-w-[100rem] mx-auto px-0 relative z-10 flex flex-col items-center">

        <div className="px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full">
          <SectionBadge text="INDUSTRIES WE SERVE" variant="line" />

          <h2 className="text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-2 md:mb-3 tracking-tight text-center leading-tight">
            AI Agents Built for <span className="text-[#FF6B2C]">Industry-Specific Workflows</span>
          </h2>

          <p className="text-[15px] lg:text-base text-[#6B7280] mb-6 lg:mb-8 text-center max-w-2xl mx-auto leading-relaxed">
            Softree develops custom AI agents that automate industry-specific workflows, connect enterprise systems and data, and help organizations operate faster, smarter, and more efficiently.
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
