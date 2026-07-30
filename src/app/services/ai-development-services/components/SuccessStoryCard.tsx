"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const renderHighlightedText = (text: string) => {
  return text.split(/(\d+%?)/).map((part, i) => 
    /^\d+%?$/.test(part) ? <span key={i} className="text-[#FF6B2C] font-semibold">{part}</span> : part
  );
};

const imageMap: Record<string, string> = {
  heart: '/images/ai-development-services/success-stories/ai-healthcare-operations.png',
  bank: '/images/ai-development-services/success-stories/hr-assistant.png',
  cart: '/images/ai-development-services/success-stories/ai-performance-report.png',
  manufacturing: '/images/ai-development-services/success-stories/ai-manufacturing.png',
  'cross-industry': '/images/ai-development-services/success-stories/ai-competitive-gap.png',
  logistics: '/images/ai-development-services/success-stories/ai-shipment-delay.png',
};

export default function SuccessStoryCard({ item, isActive = false }: { item: any, isActive?: boolean }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'challenge' | 'results'>('overview');

  return (
    <div className={`w-full bg-white rounded-[24px] overflow-hidden transition-all duration-500 group 
      ${isActive 
        ? 'shadow-[0_20px_45px_rgba(255,88,18,0.15)] border-2 border-[#FF6B2C]' 
        : 'shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-[#ECECEC]'}
    `}>
      {/* Top Image Area (Restored Height) */}
      <Link 
        href={item.caseStudyUrl || '#'}
        aria-label={`Read case study: ${item.title}`}
        className="block h-[180px] w-full relative overflow-hidden bg-slate-50 cursor-pointer"
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

      {/* Content Area with Compact Padding */}
      <div className="p-4">
        <p className="text-[10px] font-bold tracking-[0.1em] text-[#FF6B2C] uppercase mb-0.5">{item.industryLabel}</p>
        <h3 className="text-[17px] md:text-[19px] leading-snug font-bold text-[#111827] mb-2.5 min-h-[48px] line-clamp-2">{item.title}</h3>
        
        {/* Tabs navigation */}
        <div className="flex border-b border-slate-100 mb-2.5 justify-between text-[11px] font-semibold text-slate-500">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-1.5 border-b-2 px-1 transition-all duration-300 ${
              activeTab === 'overview'
                ? 'border-[#FF6B2C] text-[#FF6B2C] font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('challenge')}
            className={`pb-1.5 border-b-2 px-1 transition-all duration-300 ${
              activeTab === 'challenge'
                ? 'border-[#FF6B2C] text-[#FF6B2C] font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            Challenge
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`pb-1.5 border-b-2 px-1 transition-all duration-300 ${
              activeTab === 'results'
                ? 'border-[#FF6B2C] text-[#FF6B2C] font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            Results
          </button>
        </div>

        {/* Tab Content (Fixed Tight Min-Height) */}
        <div className="min-h-[160px]">
          {activeTab === 'overview' && (
            <div>
              {item.clientOverview && (
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5">
                  <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-[11px]">
                    <div>
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">Name</p>
                      <p className="font-semibold text-slate-800">{item.clientOverview.name}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">Industry</p>
                      <p className="font-semibold text-slate-800">{item.clientOverview.industry}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">Country</p>
                      <p className="font-semibold text-slate-800">{item.clientOverview.country}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">Org Size</p>
                      <p className="font-semibold text-slate-800">{item.clientOverview.organizationSize}</p>
                    </div>
                    <div className="col-span-2 border-t border-slate-200/50 pt-1.5">
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">Business Type</p>
                      <p className="font-semibold text-slate-800 leading-tight">{item.clientOverview.businessType}</p>
                    </div>
                  </div>
                </div>
              )}

              {item.productOverview && (
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5">
                  <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-[11px]">
                    <div>
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">Developed By</p>
                      <p className="font-semibold text-slate-800">{item.productOverview.developedBy}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">Solution Type</p>
                      <p className="font-semibold text-slate-800">{item.productOverview.solutionType}</p>
                    </div>
                    <div className="col-span-2 border-t border-slate-200/50 pt-1.5">
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">Primary Use</p>
                      <p className="font-semibold text-slate-800 line-clamp-1 leading-tight">{item.productOverview.primaryUse}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">Target Users</p>
                      <p className="font-semibold text-slate-800 line-clamp-1 leading-tight">{item.productOverview.targetUsers}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'challenge' && (
            <div className="space-y-2.5">
              {/* Problem */}
              <div className="flex gap-2.5">
                <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center shrink-0 text-[#FF6B2C]">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-[#111827] mb-0.5">Problem</h4>
                  <p className="text-[11.5px] text-[#6B7280] leading-snug line-clamp-3">{item.problem}</p>
                </div>
              </div>
              
              <div className="w-full h-px bg-[#ECECEC] ml-8" />

              {/* Solution */}
              <div className="flex gap-2.5">
                <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center shrink-0 text-[#FF6B2C]">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-[#111827] mb-0.5">Solution</h4>
                  <p className="text-[11.5px] text-[#6B7280] leading-snug line-clamp-3">{item.solution}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="flex gap-2.5">
              <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center shrink-0 text-[#FF6B2C]">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[12px] font-bold text-[#111827] mb-1">Business Results</h4>
                <ul className="space-y-1.5">
                  {item.results.map((result: string, i: number) => (
                    <li key={i} className="text-[12px] text-[#6B7280] leading-snug flex items-start gap-1.5">
                      <span className="text-[#FF6B2C] mt-[4px] text-[7px]">●</span>
                      <span>{renderHighlightedText(result)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Read More Button (Compact padding & margins) */}
        <div className="pt-3 mt-3 border-t border-slate-100">
          <Link 
            href={item.caseStudyUrl || '#'}
            className="group/btn flex items-center justify-between w-full p-2.5 rounded-lg bg-slate-50 hover:bg-[#FF6B2C] transition-all duration-300 border border-slate-100 hover:border-[#FF6B2C] hover:shadow-md hover:shadow-[#FF6B2C]/10"
          >
            <span className="text-[12px] font-bold text-[#111827] group-hover/btn:text-white transition-colors duration-300">
              Read More
            </span>
            <div className="w-6.5 h-6.5 rounded-full bg-white flex items-center justify-center shadow-sm group-hover/btn:scale-110 group-hover/btn:translate-x-0.5 transition-transform duration-300 p-1">
              <svg className="w-3.5 h-3.5 text-[#FF6B2C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
