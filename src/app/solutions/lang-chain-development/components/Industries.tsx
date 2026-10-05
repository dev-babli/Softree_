import React from 'react';
import SectionBadge from './SectionBadge';
import IndustryCarousel from './IndustryCarousel';

export default function Industries() {
  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 text-slate-900 scroll-mt-24 relative overflow-hidden">
      {/* Background Decorators */}
      {/* Top Left */}
      <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] -translate-x-1/4 -translate-y-1/4 rounded-br-[100%] border-b border-r border-[#FF6B2C]/10 opacity-20"></div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 flex flex-col">

        {/* Header */}
        <div className="flex flex-col mb-8 sm:mb-12">
          <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block self-start">
            <span className="typo-caption text-[#FF5812] uppercase">
              INDUSTRIES WE SERVE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-6 items-start">
            <h2 className="typo-heading-2 text-slate-900 lg:pr-12 xl:pr-24">
              LangChain Development for <span className="text-[#FF5812]">Industry-Specific Solutions</span>
            </h2>

            <p className="typo-description text-slate-500 w-full pt-1.5 lg:max-w-xl">
              Softree delivers LangChain development services tailored to each industry—RAG chains, LangGraph agents, and tool integrations that connect your systems, protect data, and accelerate production AI outcomes.
            </p>
          </div>
        </div>

        {/* Full width Carousel */}
        <div className="w-full">
          <IndustryCarousel />
        </div>

      </div>
    </section>
  );
}
