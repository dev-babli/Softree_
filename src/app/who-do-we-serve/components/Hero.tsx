"use client";

import React from "react";
import Image from "next/image";
import TrustStrip from "@/components/sections/TrustStrip";

const IMAGES = [
  { src: "/images/serve/3.jpg", height: "h-[65%]" },
  { src: "/images/serve/4.jpg", height: "h-[85%]" },
  { src: "/images/serve/5.jpg", height: "h-[100%]" },
];

export default function Hero() {
  return (
    <section className="relative w-full pt-28 pb-0 sm:pt-32 lg:pt-36 lg:pb-0 overflow-hidden flex flex-col">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-8 pb-14 lg:pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-12 lg:gap-8 xl:gap-12">
          
          {/* LEFT SIDE: Content */}
          <div className="w-full lg:w-[54%] xl:w-[55%] flex flex-col items-start z-10">
            <span className="text-xs sm:text-sm lg:text-[15px] font-bold tracking-widest text-[#FF6B2C] uppercase mb-3 sm:mb-4">
              WHO DO WE SERVE?
            </span>
            
            <h1 className="text-3xl sm:text-5xl md:text-[3.5rem] lg:text-[3.75rem] xl:text-[4.25rem] font-extrabold text-[#0A0F3C] leading-[1.08] mb-5 sm:mb-6 tracking-tight">
              Different <span className="text-[#FF6B2C]">Challenges</span>.<br />
              One Engineering <span className="text-[#FF6B2C]">Partner</span>.
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-[1.2rem] xl:text-[1.3rem] text-gray-600 max-w-2xl leading-relaxed">
              From business leaders looking to accelerate growth to technology teams solving complex engineering challenges, Softree provides the expertise, capacity, and technology capabilities to move forward with confidence.
            </p>
          </div>

          {/* RIGHT SIDE: Image Composition */}
          <div className="w-full lg:w-[46%] xl:w-[45%] relative h-[320px] sm:h-[420px] md:h-[460px] lg:h-[500px] xl:h-[540px] mt-4 lg:mt-0 flex items-center justify-center lg:justify-end">
            
            {/* The slanted images container */}
            <div className="relative w-full max-w-[520px] lg:max-w-none h-full flex items-end justify-center -skew-x-[10deg] sm:-skew-x-[12deg] ml-1 sm:ml-4 lg:ml-6">
              {IMAGES.map((img, index) => (
                <div 
                  key={index} 
                  className={`group relative flex-1 ${img.height} overflow-hidden rounded-t-2xl rounded-b-xl border-r-[4px] sm:border-r-[6px] border-white last:border-r-0 transition-all duration-500 ease-in-out hover:flex-[1.2] shadow-lg`}
                >
                  {/* Un-skew the image itself so faces are normal */}
                  <div className="absolute top-0 -left-[20%] w-[140%] h-full skew-x-[10deg] sm:skew-x-[12deg]">
                    <Image
                      src={img.src}
                      alt={`Professional ${index + 1}`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 1024px) 30vw, 20vw"
                      priority
                    />
                  </div>
                  {/* Subtle unified fade overlay inside each panel */}
                  {index < 2 && (
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/50 to-transparent opacity-90 z-0" />
                  )}
                  
                  {/* Solid Blur Triangle Overlay on the 3rd Image */}
                  {index === 2 && (
                    <>
                      {/* Using a rotated div instead of clip-path prevents the backdrop-blur from blurring the whole container (the face) */}
                      <div 
                        className="absolute top-[105%] left-[-10%] w-[200%] h-[200%] bg-[#2F4052]/90 backdrop-blur-md origin-top-left -rotate-[40deg] z-10"
                      />
                      
                      {/* Text perfectly positioned inside the 3rd column, un-skewed so it reads normally */}
                      <div className="absolute bottom-4 sm:bottom-6 right-3 sm:right-4 lg:bottom-10 lg:right-8 z-20 flex flex-col gap-1 sm:gap-1.5 text-left skew-x-[10deg] sm:skew-x-[12deg]">
                        {["People", "Technology", "Progress", "Together"].map((text, i) => (
                          <span key={i} className="text-sm sm:text-base lg:text-lg font-medium text-white/95 tracking-wide leading-relaxed cursor-default">
                            {text}
                          </span>
                        ))}
                        <div className="flex gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                          <div className="w-5 sm:w-6 h-[3px] bg-[#FF6B2C] rounded-full" />
                          <div className="w-5 sm:w-6 h-[3px] bg-[#FF6B2C] rounded-full" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <div className="w-full relative z-20 mt-auto bg-[#FAFAFA]">
        <TrustStrip />
      </div>
    </section>
  );
}


