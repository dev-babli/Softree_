"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const HeroSection = () => {
  const slides = [
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/slide-01-23.png",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/slide-02-24.png",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/slide-03-22.png",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="bg-[#00091A] relative min-h-[700px] overflow-hidden">
      {/* Background Slider Implementation */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-hero-overlay z-10" />
            <Image
              src={slide}
              alt={`Slide ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div className="relative z-30 container mx-auto px-6 lg:px-0 flex items-center min-h-[700px]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="py-12 md:w-[75%] lg:w-[65%]">
            <h1 className="text-white font-light leading-[1.1] text-4xl md:text-5xl lg:text-6xl tracking-tight animate-in fade-in slide-in-from-left-4 duration-1000">
              Engineering Success. Simplifying Solutions.
            </h1>
            
            <p className="text-white text-opacity-70 font-normal text-lg md:text-xl lg:text-2xl mt-8 mb-10 max-w-3xl leading-relaxed animate-in fade-in slide-in-from-left-6 duration-1000 delay-200">
              Helping businesses grow and evolve with smart, tailored solutions built on Salesforce, Dynamics 365, Power Platform, AI, Mobile & Web Product Engineering, and more.
            </p>

            {/* Achievement Statistics */}
            <div className="flex flex-wrap items-center justify-start gap-12 lg:gap-20 my-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              <div className="flex flex-col gap-y-1">
                <span className="text-4xl md:text-5xl font-light text-white">15+</span>
                <span className="text-sm md:text-base text-white text-opacity-80">Countries Served</span>
              </div>
              <div className="flex flex-col gap-y-1">
                <span className="text-4xl md:text-5xl font-light text-white">500+</span>
                <span className="text-sm md:text-base text-white text-opacity-80">Successful Projects</span>
              </div>
              <div className="flex flex-col gap-y-1">
                <span className="text-4xl md:text-5xl font-light text-white">90%</span>
                <span className="text-sm md:text-base text-white text-opacity-80">Client Retention Rate</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
              <a
                href="/contact?utm_source=homepage&utm_medium=button&utm_campaign=hero&utm_content=book_free_consltation"
                className="inline-flex items-center justify-center whitespace-nowrap bg-cyber-blue text-white text-lg font-medium px-10 py-4 rounded-md transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] shadow-lg shadow-blue-900/20"
              >
                Book A Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Pagination Bullets */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              index === currentSlide ? "w-8 bg-cyber-blue" : "w-1.5 bg-white/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;