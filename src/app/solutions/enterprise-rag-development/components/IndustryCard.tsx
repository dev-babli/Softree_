"use client";
import React from 'react';
import Image from 'next/image';

export default function IndustryCard({ item, isActive }: { item: any, isActive: boolean }) {
  const Icon = item.icon;

  return (
    <div 
      className={`w-[340px] h-[400px] bg-white rounded-[28px] overflow-hidden flex flex-col relative group transition-all duration-300 ${isActive ? 'shadow-[0_20px_40px_rgba(255,107,44,0.15)] border-2 border-[#FF6B2C]' : 'shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-[#ECECEC]'}`}
    >
      {/* Top Image Placeholder */}
      <div className={`h-[180px] w-full bg-gradient-to-br ${item.color} relative overflow-hidden transition-transform duration-700 ${isActive ? 'scale-100' : 'scale-105'}`}>
         {item.image ? (
           <Image 
             src={item.image}
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
                {Icon && <Icon className="w-24 h-24 text-slate-800" />}
             </div>
             {/* Subtle overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
           </>
         )}
      </div>

      {/* Floating Icon */}
      <div className={`absolute top-[156px] left-6 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center transition-colors duration-300 text-[#FF6B2C] z-20`}>
         {Icon && <Icon className="w-6 h-6" />}
      </div>

      {/* Bottom Content */}
      <div className="pt-10 px-6 pb-6 flex-1 flex flex-col relative bg-white z-10">
         <h3 className="text-[20px] font-bold text-[#111827] mb-2">{item.title}</h3>
         <p className="text-[14px] text-[#6B7280] leading-relaxed flex-1">{item.description}</p>
      </div>
    </div>
  );
}
