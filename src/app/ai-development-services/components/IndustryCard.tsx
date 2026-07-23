"use client";
import React from 'react';

const getIcon = (type: string, className: string) => {
  switch (type) {
    case 'healthcare': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v4m-2-2h4" />
      </svg>
    );
    case 'manufacturing': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    );
    case 'finance': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    );
    case 'retail': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    );
    case 'logistics': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    );
    case 'education': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14v7" />
      </svg>
    );
    default: return <div />;
  }
};

import Image from 'next/image';
const imageMap: Record<string, string> = {
  healthcare: '/images/ai-development-services/industries/healthcare.jpg',
  manufacturing: '/images/ai-development-services/industries/manufacturing.jpg',
  finance: '/images/ai-development-services/industries/finance.jpg',
  retail: '/images/ai-development-services/industries/retail.jpg',
  logistics: '/images/ai-development-services/industries/logistics.jpg',
  education: '/images/ai-development-services/industries/education.jpg',
};

export default function IndustryCard({ item, isActive }: { item: any, isActive: boolean }) {
  return (
    <div 
      className={`w-[340px] h-[400px] bg-white rounded-[28px] overflow-hidden flex flex-col relative group transition-all duration-300 ${isActive ? 'shadow-[0_20px_40px_rgba(255,107,44,0.15)] border-2 border-[#FF6B2C]' : 'shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-[#ECECEC]'}`}
    >
      {/* Top Image Placeholder */}
      <div className={`h-[180px] w-full bg-gradient-to-br ${item.color} relative overflow-hidden transition-transform duration-700 ${isActive ? 'scale-100' : 'scale-105'}`}>
         {imageMap[item.icon] ? (
           <Image 
             src={imageMap[item.icon]}
             alt={`${item.title} Industry AI Solutions`}
             fill
             className="object-cover object-center"
             quality={95}
             sizes="(max-width: 768px) 100vw, 340px"
           />
         ) : (
           <>
             {/* Pattern overlay */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:20px_20px]" />
             {/* Center Icon */}
             <div className="absolute inset-0 flex items-center justify-center opacity-30">
                {getIcon(item.icon, 'w-24 h-24 text-slate-800')}
             </div>
             {/* Subtle overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
           </>
         )}
      </div>

      {/* Floating Icon */}
      <div className={`absolute top-[156px] left-6 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center transition-colors duration-300 text-[#FF6B2C] z-20`}>
         {getIcon(item.icon, 'w-6 h-6')}
      </div>

      {/* Bottom Content */}
      <div className="pt-10 px-6 pb-6 flex-1 flex flex-col relative bg-white z-10">
         <h3 className="text-[20px] font-bold text-[#111827] mb-2">{item.title}</h3>
         <p className="text-[14px] text-[#6B7280] leading-relaxed flex-1">{item.description}</p>
      </div>
    </div>
  );
}
