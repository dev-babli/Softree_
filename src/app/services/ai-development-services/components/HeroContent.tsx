import React from 'react';
import SectionBadge from './SectionBadge';
import CTAButtons from './CTAButtons';
import HeroFeatureList from './HeroFeatureList';
import { heroData } from '../data/hero';

export default function HeroContent() {
  return (
    <article className="flex flex-col justify-center max-w-lg xl:max-w-xl relative z-10">
      <SectionBadge text={heroData.badge} />
      
      <h1 className="text-4xl lg:text-5xl xl:text-[3.25rem] leading-[1.1] font-extrabold tracking-tight mb-4">
        <span className="text-slate-900 block">{heroData.title.blackText}</span>
        <span className="text-[#F25A24] block mt-1">{heroData.title.orangeText}</span>
      </h1>
      
      <p className="text-[13px] lg:text-sm text-slate-600 mb-6 max-w-md leading-relaxed">
        {heroData.description}
      </p>
      
      <CTAButtons 
        primary={heroData.ctas.primary} 
      />
      
      <HeroFeatureList features={heroData.features} />
    </article>
  );
}
