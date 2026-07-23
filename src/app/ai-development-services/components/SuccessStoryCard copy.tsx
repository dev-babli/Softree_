import React from 'react';
const renderHighlightedText = (text: string) => {
  return text.split(/(\d+%?)/).map((part, i) => 
    /^\d+%?$/.test(part) ? <span key={i} className="text-[#FF6B2C] font-semibold">{part}</span> : part
  );
};

import Image from 'next/image';
import Link from 'next/link';

const imageMap: Record<string, string> = {
  heart: '/images/ai-development-services/success-stories/ai-healthcare-operations.png',
  bank: '/images/ai-development-services/success-stories/hr-assistant.png',
  cart: '/images/ai-development-services/success-stories/ai-performance-report.png',
  manufacturing: '/images/ai-development-services/success-stories/ai-manufacturing.png',
  'cross-industry': '/images/ai-development-services/success-stories/ai-competitive-gap.png',
  logistics: '/images/ai-development-services/success-stories/ai-shipment-delay.png',
};

export default function SuccessStoryCard({ item, isActive = false }: { item: any, isActive?: boolean }) {
  return (
    <div className={`w-full bg-white rounded-[28px] overflow-hidden transition-all duration-500 group 
      ${isActive 
        ? 'shadow-[0_30px_60px_rgba(255,88,18,0.18)] border-2 border-[#FF6B2C]' 
        : 'shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-[#ECECEC]'}
    `}>
      {/* Top Image Area */}
      <Link 
        href={item.caseStudyUrl || '#'}
        aria-label={`Read case study: ${item.title}`}
        className="block h-[220px] w-full relative overflow-hidden bg-slate-50 cursor-pointer"
      >
        <Image 
          src={imageMap[item.icon]}
          alt={`${item.title} Case Study`}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px"
          quality={95}
        />
        
      </Link>

      {/* Content */}
      <div className="p-6">
        <p className="text-[12px] font-bold tracking-[0.1em] text-[#FF6B2C] uppercase mb-1">{item.industryLabel}</p>
        <h3 className="text-[22px] md:text-[24px] leading-tight font-bold text-[#111827] mb-4">{item.title}</h3>
        
        <div className="space-y-4">
          {/* Problem */}
          <div className="flex gap-4">
            <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center shrink-0 text-[#FF6B2C]">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#111827] mb-1">Problem</h4>
              <p className="text-[14px] text-[#6B7280] leading-snug">{item.problem}</p>
            </div>
          </div>
          
          <div className="w-full h-px bg-[#ECECEC] ml-11" />

          {/* Solution */}
          <div className="flex gap-4">
            <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center shrink-0 text-[#FF6B2C]">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#111827] mb-1">Solution</h4>
              <p className="text-[14px] text-[#6B7280] leading-snug">{item.solution}</p>
            </div>
          </div>
          
          <div className="w-full h-px bg-[#ECECEC] ml-11" />

          {/* Result */}
          <div className="flex gap-4">
            <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center shrink-0 text-[#FF6B2C]">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#111827] mb-1">Business Result</h4>
              <ul className="space-y-1">
                {item.results.map((result: string, i: number) => (
                  <li key={i} className="text-[14px] text-[#6B7280] leading-snug flex items-start gap-2">
                    <span className="text-[#FF6B2C] mt-[4px] text-[8px]">●</span>
                    <span>{renderHighlightedText(result)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
