"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { industriesData } from "./industriesData";
import { IndustryCard } from "./IndustryCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const IndustryCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full pb-8">
      {/* Carousel Viewport */}
      <div className="overflow-hidden py-12 max-w-[1440px] mx-auto px-0 sm:px-4" ref={emblaRef}>
        <div className="flex -ml-4 md:-ml-6 touch-pan-y">
          {industriesData.map((industry, index) => (
            <div 
              key={industry.id} 
              className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%] pl-4 md:pl-6 flex"
            >
              <div className="p-4 flex w-full" onClick={() => scrollTo(index)}>
                <IndustryCard 
                  industry={industry} 
                  isActive={index === selectedIndex} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls Container */}
      <div className="flex items-center justify-center mt-4 max-w-7xl mx-auto px-4 relative">
        
        {/* Pagination Dots (Center) */}
        <div className="flex justify-center gap-3">
          {industriesData.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? "w-8 bg-[#FF6A13]" 
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Buttons (Right Aligned Absolute) */}
        <div className="hidden sm:flex gap-3 absolute right-4">
          <button
            onClick={scrollPrev}
            className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 transition-all duration-300 hover:bg-[#FF6A13] hover:text-white hover:border-[#FF6A13] hover:shadow-[0_4px_15px_rgba(255,106,19,0.3)] hover:-translate-y-0.5"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 transition-all duration-300 hover:bg-[#FF6A13] hover:text-white hover:border-[#FF6A13] hover:shadow-[0_4px_15px_rgba(255,106,19,0.3)] hover:-translate-y-0.5"
            aria-label="Next slide"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
