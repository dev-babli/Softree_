import React from 'react';
import SectionBadge from './SectionBadge';
import WhySoftreeAccordion from './WhySoftreeAccordion';

export default function WhySoftree() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-transparent overflow-hidden">
      {/* Background Decorators */}
      {/* Top Left Radial Glow */}
      
      {/* Top Left Curved Lines */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] border-b border-r border-[#FF6B2C]/10 rounded-br-[100%] opacity-20 pointer-events-none -translate-x-1/4 -translate-y-1/4"></div>

      {/* Top Right Dotted Decoration */}
      <div className="absolute top-20 right-16 grid grid-cols-4 gap-2.5 pointer-events-none opacity-[0.15]">
         {[...Array(24)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-[#FF6B2C] rounded-full"></div>)}
      </div>
      
      {/* Bottom Left Subtle Curve */}
      <div className="absolute bottom-12 left-0 w-[300px] h-[300px] border-t border-r border-[#FF6B2C]/10 rounded-tr-[100%] opacity-[0.15] pointer-events-none -translate-x-1/3 translate-y-1/4"></div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-start w-full">
        
        <SectionBadge text="WHY SOFTREE" variant="line" />
        
        <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-extrabold text-[#111827] mb-6 tracking-tight leading-[1.15]">
          Why Businesses <br/>
          Choose <span className="text-[#FF6B2C]">Softree</span>
        </h2>
        
        <p className="text-[15px] lg:text-[17px] text-[#6B7280] mb-8 lg:mb-12 max-w-xl leading-relaxed">
          We combine deep AI expertise, Microsoft technology, and a business-first approach to deliver intelligent solutions that drive real impact.
        </p>

        {/* Accordion Component */}
        <WhySoftreeAccordion />

      </div>
    </section>
  );
}
