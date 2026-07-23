import React from 'react';
import SectionBadge from './SectionBadge';
import SuccessStoryCarousel from './SuccessStoryCarousel';

export default function SuccessStories() {
  return (
    <section className="relative w-full py-12 lg:py-16 bg-transparent overflow-hidden">
      {/* Background Decorators */}
      {/* Top Left Radial Glow */}
      
      {/* Top Left Curved Lines */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] border-b border-r border-[#FF6B2C]/10 rounded-br-[100%] opacity-20 pointer-events-none -translate-x-1/4 -translate-y-1/4"></div>

      {/* Top Right Dotted Decoration */}
      <div className="absolute top-16 right-16 grid grid-cols-4 gap-2.5 pointer-events-none opacity-[0.15]">
         {[...Array(16)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-[#FF6B2C] rounded-full"></div>)}
      </div>



      <div className="relative z-10 flex flex-col items-center w-full">
        
        <div className="px-4 sm:px-6 lg:px-8 flex flex-col items-center max-w-[85rem] mx-auto w-full">
          <SectionBadge text="SUCCESS STORIES" variant="line" />
          
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#111827] mb-2 lg:mb-3 tracking-tight text-center leading-tight">
            Real-World <span className="text-[#FF6B2C]">AI Success Stories</span>
          </h2>
          
          <p className="text-[15px] lg:text-[17px] text-[#6B7280] mb-6 lg:mb-8 text-center max-w-2xl leading-relaxed">
            Discover how our enterprise AI solutions solve real business challenges and deliver measurable outcomes across industries.
          </p>
        </div>

        {/* Full width Carousel Wrapper */}
        <SuccessStoryCarousel />

      </div>
    </section>
  );
}
