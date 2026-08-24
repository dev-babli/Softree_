import React from 'react';
import SectionBadge from './SectionBadge';
import CTAButtons from './CTAButtons';
import HeroFeatureList from './HeroFeatureList';
import { heroData } from '../data/hero';

export default function HeroContent() {
  return (
    <article className="flex flex-col items-center text-center justify-center max-w-3xl mx-auto relative z-10">
      <SectionBadge text={heroData.badge} />
      
      <h1 className="text-4xl lg:text-5xl xl:text-[3.25rem] leading-[1.1] font-extrabold tracking-tight mb-4 text-center">
        <span className="text-slate-900 block">{heroData.title.blackText}</span>
        <span className="text-[#F25A24] block mt-1">{heroData.title.orangeText}</span>
      </h1>
      
      <p className="text-[13px] lg:text-sm text-slate-700 mb-6 max-w-xl leading-relaxed text-center font-medium">
        {heroData.description}
      </p>
      
      <div className="flex justify-center w-full mb-8">
        <CTAButtons 
          primary={heroData.ctas.primary} 
        />
      </div>
      
      <div className="w-full">
        <HeroFeatureList features={heroData.features} />
      </div>
    </article>
  );
}
