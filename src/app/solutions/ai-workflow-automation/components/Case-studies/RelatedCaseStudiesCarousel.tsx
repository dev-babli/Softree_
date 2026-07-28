"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SuccessStoryCard } from "@/app/services/ai-consulting-services/ai-consulting-services-components/SuccessStories/SuccessStoryCard";
import { successStoriesData } from "@/app/services/ai-consulting-services/ai-consulting-services-components/SuccessStories/successStoriesData";
import { staggerContainer, fadeUpVariant } from "@/app/services/ai-consulting-services/ai-consulting-services-components/SuccessStories/animations";

export function RelatedCaseStudiesCarousel() {
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
    <section className="relative w-full py-10 overflow-hidden font-sans bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          {/* Section Header */}
          <motion.div variants={fadeUpVariant} className="text-center mb-2">
            <div className="flex items-center justify-center gap-6 mb-4">
              <style>{`
                @keyframes line-stretch {
                  0%, 100% { width: 40px; opacity: 0.6; }
                  50% { width: 100px; opacity: 1; }
                }
                .animate-line-stretch {
                  animation: line-stretch 3s ease-in-out infinite;
                }
              `}</style>
              <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
                <div className="absolute left-0 w-2 h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
              </div>
              <span className="text-[#FF5812] font-bold tracking-[0.2em] text-[11px] sm:text-xs uppercase">RELATED CASE STUDIES</span>
              <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
                <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3 max-w-4xl mx-auto leading-tight">
              AI Workflow Automation{" "}
              <span className="text-[#FF6A13]">
                Success Stories.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Explore how organizations have transformed their operations through AI Workflow Automation, intelligent process automation, and Microsoft Power Platform.
            </p>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="relative w-full max-w-7xl mx-auto mt-6 pb-2">
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
                    className="flex-[0_0_80%] min-w-0 pl-4 md:flex-[0_0_48%] lg:flex-[0_0_32%] py-6"
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

        </motion.div>
      </div>
    </section>
  );
}
