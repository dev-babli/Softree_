"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SuccessStoryCard } from "./SuccessStoryCard";
import CapabilitySectionBadge from "../Core-capabilities/CapabilitySectionBadge";
import { caseStudyData } from "./caseStudyData";
import { staggerContainer, fadeUpVariant } from "./animations";

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
    <section className="relative w-full py-16 lg:py-20 overflow-hidden font-sans bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          {/* Section Header */}
          <motion.div variants={fadeUpVariant} className="text-center mb-4">
            <CapabilitySectionBadge text="Client Success Stories" variant="line" />
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              Real Business Results Through{" "}
              <span className="text-[#FF6A13]">
                AI Workflow Automation
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
              Discover how organizations have improved operational efficiency, reduced costs, and accelerated digital transformation with Softree's AI workflow automation solutions.
            </p>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="relative w-full max-w-7xl mx-auto mt-8 pb-12">
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
                {caseStudyData.map((story, index) => (
                  <div
                    key={story.id}
                    className="flex-[0_0_90%] min-w-0 pl-4 sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_32%] py-12"
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
