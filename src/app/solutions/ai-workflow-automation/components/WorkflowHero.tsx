"use client";

import React from 'react';
import WorkflowHeroLeft from './WorkflowHeroLeft';
import WorkflowHeroRight from './WorkflowHeroRight';

export default function WorkflowHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 md:px-8 max-w-[1440px] mx-auto w-full z-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Left Side: 45% */}
        <div className="w-full lg:w-[45%] flex-shrink-0 z-20">
          <WorkflowHeroLeft />
        </div>

        {/* Right Side: 55% */}
        <div className="w-full lg:w-[55%] relative flex justify-center lg:justify-end z-10 lg:-mt-12">
          <WorkflowHeroRight />
        </div>

      </div>
    </section>
  );
}
