import React from 'react';
import HeroContent from './HeroContent';
import HeroVisual from './HeroVisual';

export default function Hero() {
  return (
    <section className="relative w-full pt-28 pb-8 lg:pt-36 lg:pb-12 overflow-hidden bg-transparent">
      {/* Very faint background grid or noise if needed */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-multiply"></div>
      
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-center">
          
          {/* Left Column Content */}
          <div className="w-full flex justify-center lg:justify-start">
            <HeroContent />
          </div>

          {/* Right Column Visual */}
          <div className="w-full relative">
            <HeroVisual />
          </div>

        </div>

      </div>
    </section>
  );
}
