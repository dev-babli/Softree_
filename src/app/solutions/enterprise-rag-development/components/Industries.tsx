import React from 'react';
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge";
import IndustryCarousel from './IndustryCarousel';

export default function Industries() {
  return (
    <section className="relative w-full py-20 lg:py-24 bg-transparent overflow-hidden">
      {/* Background Decorators */}
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] border-b border-r border-[#FF6B2C]/10 rounded-br-[100%] opacity-20 pointer-events-none -translate-x-1/4 -translate-y-1/4"></div>



      <div className="max-w-[100rem] mx-auto px-0 relative z-10 flex flex-col items-center">

        <div className="px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full">
          <SectionBadge text="INDUSTRIES WE SERVE" variant="line" />

          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#111827] mb-4 tracking-tight text-center leading-tight">
            Enterprise RAG Solutions for <span className="text-[#FF6B2C]">Every Industry</span>
          </h2>

          <p className="text-[15px] lg:text-[17px] text-[#6B7280] mb-8 lg:mb-12 text-center max-w-2xl leading-relaxed">
            Transform industry knowledge into accurate, secure, and context-aware AI experiences with enterprise RAG solutions built around your data, workflows, and business requirements.
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
