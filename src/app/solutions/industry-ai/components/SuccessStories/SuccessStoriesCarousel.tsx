"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SuccessStoryCard } from "./SuccessStoryCard";
import { useIndustryConfig } from "../../context";
import { motion } from "framer-motion";
import { fadeUpVariant } from "./animations";

export const SuccessStoriesCarousel = () => {
  const { successStories: successStoriesData } = useIndustryConfig();
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
    <motion.div variants={fadeUpVariant} className="relative mx-auto mt-4 w-full max-w-7xl px-2 pb-12 md:mt-6 md:px-14 lg:px-16">
      {/* Navigation Buttons */}
      <div className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 md:block">
        <button
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-gray-100 bg-white text-[#FF6A13] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#FF6A13] hover:text-white hover:shadow-lg"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
        </button>
      </div>

      <div className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 md:block">
        <button
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-gray-100 bg-white text-[#FF6A13] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#FF6A13] hover:text-white hover:shadow-lg"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
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
      <div className="mt-8 flex items-center justify-center gap-1">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className="flex h-11 w-11 items-center justify-center"
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-8 bg-[#FF6A13]"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
};
