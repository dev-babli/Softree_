import React from 'react';
import SectionBadge from './SectionBadge';
import SolutionPlatform from './SolutionPlatform';
import { aiSolutionsList } from '../data/our-ai-solutions';

export default function OurAISolutions() {
  return (
    <section className="relative w-full py-12 lg:py-16 bg-transparent overflow-hidden">
      {/* Background Decorators */}
      {/* Top Left Radial Glow */}
      
      {/* Top Left Curved Lines */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] border-b border-r border-[#FF6B2C]/10 rounded-br-[100%] opacity-20 pointer-events-none -translate-x-1/4 -translate-y-1/4"></div>

      {/* Top Right Dotted Decoration */}
      <div className="absolute top-20 right-12 grid grid-cols-4 gap-2.5 pointer-events-none opacity-[0.15]">
         {[...Array(24)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-[#FF6B2C] rounded-full"></div>)}
      </div>

      {/* Bottom Right Curved Lines */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] border-t border-l border-[#FF6B2C]/15 rounded-tl-[100%] opacity-20 pointer-events-none translate-x-1/4 translate-y-1/4"></div>
      
      {/* Bottom Left Subtle Curves */}
      <div className="absolute bottom-12 left-0 w-[200px] h-[200px] border-t border-r border-[#FF6B2C]/10 rounded-tr-[100%] opacity-20 pointer-events-none -translate-x-1/2"></div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        <SectionBadge text="OUR AI SOLUTIONS" variant="line" />
        
        <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#111827] mb-2 lg:mb-3 tracking-tight text-center leading-tight">
          Intelligent Solutions. <span className="text-[#FF6B2C]">Real Business Impact.</span>
        </h2>
        
        <p className="text-[15px] lg:text-[17px] text-[#6B7280] mb-8 lg:mb-10 text-center max-w-2xl leading-relaxed">
          AI-powered enterprise solutions designed to automate workflows, accelerate decision-making and transform modern business operations with secure, scalable AI.
        </p>

        {/* Platform Container */}
        <SolutionPlatform items={aiSolutionsList} />

      </div>
    </section>
  );
}
