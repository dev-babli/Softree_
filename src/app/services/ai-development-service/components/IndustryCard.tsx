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
    <div className={`w-full h-full flex flex-col group cursor-pointer rounded-[24px] overflow-hidden ${item.color}`}>
      {/* Illustration Block */}
      <div className="relative w-full aspect-[1.1] sm:aspect-[1.2] lg:aspect-[1.25] overflow-hidden bg-black">
        <Image 
          src={item.image}
          alt=""
          fill
          className="object-cover object-center transition-transform duration-400 ease-out group-hover:scale-[1.03]"
          quality={95}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Card Title Panel */}
      <div className="flex-1 px-6 py-6 lg:px-8 lg:py-8 flex flex-col justify-start">
        <h4 className="text-[17px] sm:text-[18px] lg:text-[20px] font-bold text-white leading-[1.4] text-left">
          {item.title}
        </h4>
      </div>
    </div>
  );
}
