"use client";
import React from 'react';
import Image from 'next/image';

interface IndustryItem {
  id: string;
  title: string;
  image: string;
  color: string;
}

export default function IndustryCard({ item }: { item: IndustryItem }) {
  return (
    <div className="w-full max-w-[360px] flex flex-col group cursor-pointer transition-transform duration-300 hover:scale-[1.03]">
      {/* Illustration Block */}
      <div className={`relative w-full aspect-[4/3] ${item.color} rounded-[24px] overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
        <Image 
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-center p-6 group-hover:scale-105 transition-transform duration-500"
          quality={95}
          sizes="(max-width: 768px) 100vw, 360px"
        />
      </div>

      {/* Card Title */}
      <div className="mt-4 px-1">
        <h4 className="text-[15px] sm:text-[16px] font-semibold text-white leading-snug tracking-tight group-hover:text-slate-200 transition-colors duration-200">
          {item.title}
        </h4>
      </div>
    </div>
  );
}
