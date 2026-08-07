import React from 'react';
import SectionBadge from './SectionBadge';
import IndustryCarousel from './IndustryCarousel';

export default function Industries() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent py-12 lg:py-16">




      <div className="relative z-10 mx-auto flex max-w-[85rem] flex-col items-center px-0">

        <div className="flex w-full flex-col items-center px-4 sm:px-6 lg:px-8">
          <SectionBadge text="INDUSTRIES WE SERVE" variant="line" />

          <h2 className="text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-2 md:mb-3 tracking-tight text-center leading-tight">
            LangChain Development for{" "}
            <span className="text-[#FF6B2C]">Industry-Specific Solutions</span>
          </h2>

          <p className="text-[15px] lg:text-base text-[#6B7280] mb-6 lg:mb-8 text-center max-w-2xl mx-auto leading-relaxed">
            Softree delivers LangChain development services tailored to each industry—RAG chains, LangGraph agents, and tool integrations that connect your systems, protect data, and accelerate production AI outcomes.
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
