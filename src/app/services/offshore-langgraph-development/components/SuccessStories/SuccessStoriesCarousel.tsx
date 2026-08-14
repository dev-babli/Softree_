"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SuccessStoryCard } from "./SuccessStoryCard";
import { successStoriesData } from "./successStoriesData";
import { motion } from "framer-motion";
import { fadeUpVariant } from "./animations";

export const SuccessStoriesCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <motion.div variants={fadeUpVariant} className="relative w-full max-w-7xl mx-auto mt-4 md:mt-6 pb-12">
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 lg:-left-20 z-20 hidden md:block">
        <button
          className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-[#FF6A13] hover:bg-[#FF6A13] hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 lg:-right-20 z-20 hidden md:block">
        <button
          className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-[#FF6A13] hover:bg-[#FF6A13] hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4">
          {successStoriesData.map((story, index) => (
            <div
              key={story.id}
              className="flex-[0_0_85%] min-w-0 pl-4 sm:flex-[0_0_65%] md:flex-[0_0_48%] lg:flex-[0_0_32%] py-6"
            >
              <SuccessStoryCard 
                story={story} 
                isActive={index === selectedIndex} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-8">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-[#FF6A13] w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};
