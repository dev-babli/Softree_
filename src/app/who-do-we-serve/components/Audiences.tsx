"use client";

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const AUDIENCES = [
  {
    id: "01",
    title: "CEOs &\nBusiness Leaders",
    fullTitle: "CEOs & Business Leaders",
    question: "Looking to grow your technology capabilities without growing your overhead?",
    description: "Scale delivery with an experienced offshore engineering partner. From AI and automation to application modernization and digital experiences, we help turn technology priorities into measurable business outcomes.",
    imageSrc: "/images/serve/4.jpg"
  },
  {
    id: "02",
    title: "CTOs &\nTechnology Leaders",
    fullTitle: "CTOs & Technology Leaders",
    question: "Need additional engineering capacity or specialized expertise?",
    description: "Extend your team with Microsoft-certified engineers, AI specialists, cloud, data, and application development capabilities. Work with us as a dedicated extension of your engineering organization.",
    imageSrc: "/images/serve/3.jpg"
  },
  {
    id: "03",
    title: "Microsoft Partners &\nConsultancies",
    fullTitle: "Microsoft Partners & Consultancies",
    question: "Need a trusted delivery partner behind your client engagements?",
    description: "Use Softree as your offshore, white-label engineering team. We work behind your brand or alongside your team to deliver Microsoft, AI, data, cloud, and application solutions.",
    highlight: "Your Brand. Our Delivery.",
    imageSrc: "/images/serve/5.jpg"
  },
  {
    id: "04",
    title: "Digital Agencies",
    fullTitle: "Digital Agencies",
    question: "Have more client work than your team can deliver?",
    description: "Expand your delivery capacity without expanding your internal team. Our engineers work as an extension of your agency across web, applications, AI, automation, and Microsoft technologies.",
    imageSrc: "/images/serve/2.jpg"
  },
  {
    id: "05",
    title: "Product &\nSaaS Companies",
    fullTitle: "Product & SaaS Companies",
    question: "Need to build faster or extend your product engineering team?",
    description: "Add flexible offshore engineering capability across product development, Agentic AI, cloud, data, and modern applications — from individual specialists to dedicated teams.",
    imageSrc: "/images/serve/1.jpg"
  }
];

export default function Audiences() {
  const scrollToAudience = (id: string) => {
    const element = document.getElementById(`audience-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative w-full pt-8 pb-16 lg:pt-12 lg:pb-20 bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-[11px] lg:text-xs font-bold tracking-widest text-[#FF6B2C] uppercase mb-3 bg-[#FFF5F0] px-3 py-1 rounded-full">
            OUR AUDIENCES
          </span>
          <h2 className="text-3xl lg:text-[2.5rem] font-extrabold text-[#0A0F3C] mb-4 tracking-tight">
            Who We Work With
          </h2>
          <p className="text-base text-gray-600 max-w-2xl">
            Every organization comes to us with a different challenge. Explore each group to see how we help.
          </p>
        </div>

        {/* Audience Selectors (Sticky Navigation) */}
        <div className="sticky top-[80px] lg:top-[100px] z-30 bg-white/95 backdrop-blur-md pt-2 pb-5 flex gap-3 lg:gap-4 overflow-x-auto snap-x hide-scrollbar mb-12 lg:mb-16 border-b border-gray-100">
          {AUDIENCES.map((aud) => (
            <button
              key={aud.id}
              onClick={() => scrollToAudience(aud.id)}
              className="group min-w-[160px] lg:min-w-0 flex-1 flex flex-col rounded-xl overflow-hidden border-2 text-left transition-all duration-300 snap-start border-gray-100 bg-white hover:border-[#FF6B2C] hover:shadow-md hover:bg-[#FFF9F6]"
            >
              <div className="relative w-full h-[120px] lg:h-[140px] bg-gray-200 shrink-0">
                <Image 
                  src={aud.imageSrc} 
                  fill 
                  className="object-cover object-[center_20%]" 
                  alt={aud.fullTitle}
                  sizes="(max-width: 1024px) 50vw, 20vw"
                />
              </div>
              <div className="px-3 pt-2 pb-3 lg:px-4 lg:pt-3 lg:pb-4 flex-1 flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 group-hover:text-[#FF6B2C] transition-colors">
                  {aud.id}
                </span>
                <h4 className="font-bold text-[13px] lg:text-sm mt-0.5 leading-tight whitespace-pre-line text-gray-600 group-hover:text-[#0A0F3C] transition-colors">
                  {aud.title}
                </h4>
              </div>
            </button>
          ))}
        </div>

        {/* All Profiles List */}
        <div className="flex flex-col gap-24 lg:gap-32 bg-white overflow-hidden">
          {AUDIENCES.map((aud, index) => (
            <div
              key={aud.id}
              id={`audience-${aud.id}`}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center scroll-mt-48 lg:scroll-mt-64 ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* LEFT/RIGHT: Image */}
              <div className="w-full lg:w-[45%]">
                <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl">
                  <Image 
                    src={aud.imageSrc} 
                    fill 
                    className="object-cover object-[center_20%]" 
                    alt={aud.fullTitle}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              </div>

              {/* RIGHT/LEFT: Content */}
              <div className="w-full lg:w-[55%] flex flex-col pt-4 lg:pt-0">
                <span className="text-gray-500 font-bold text-lg mb-4 tracking-wide">
                  {aud.id} / 05
                </span>
                
                <h3 className="text-4xl lg:text-5xl font-extrabold text-[#0A0F3C] leading-[1.1] mb-6 tracking-tight">
                  {aud.fullTitle}
                </h3>
                
                <h4 className="text-2xl font-bold text-[#0A0F3C] mb-6 leading-snug">
                  {aud.question}
                </h4>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                  {aud.description}
                </p>
                
                {aud.highlight && (
                  <p className="text-lg font-bold text-[#FF6B2C] mt-6">
                    {aud.highlight}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
      
      {/* Hide scrollbar utility for the horizontal scroll area */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
