"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Settings, TrendingUp, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type Review = {
  id: string | number;
  title: string;
  question: string;
  asking?: string[];
  howWeHelp: string[];
  outcome: string;
  imageSrc: string;
  thumbnailSrc?: string;
  highlight?: string;
};

interface TestimonialSliderProps {
  reviews: Review[];
  className?: string;
  eyebrow?: string;
  heading?: string;
  description?: string;
}

export const TestimonialSlider = ({
  reviews,
  className,
  eyebrow,
  heading,
  description
}: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isHovered, setIsHovered] = useState(false);

  React.useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 2750);
    
    return () => clearInterval(timer);
  }, [isHovered, reviews.length]);

  const activeReview = reviews[currentIndex];

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleThumbnailClick = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const imageVariants = {
    enter: (direction: "left" | "right") => ({
      y: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      y: direction === "right" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const textVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-transparent text-foreground pt-8 md:pt-12 px-6 md:px-12 pb-0",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Header Section */}
      <div className="flex flex-col items-center text-center mb-12 md:mb-16 max-w-4xl mx-auto">
        {eyebrow && (
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF5812]/20 bg-[#FF5812]/5 px-3 py-1 w-max text-xs font-semibold uppercase tracking-widest text-[#FF5812]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]"></span>
            {eyebrow}
          </span>
        )}
        {heading && (
          <h2 className="text-balance text-[clamp(2.5rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#0a0a1a]">
            {heading}
          </h2>
        )}
        {description && (
          <p className="mt-4 md:mt-6 text-pretty text-base md:text-lg leading-relaxed text-[#0a0a1a]/70 font-medium">
            {description}
          </p>
        )}
      </div>

      {/* Adjust grid to 3-4-5 to give right column more space for 1-line headings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 min-h-[500px]">
        
        {/* === Left Column: Audience Navigation === */}
        <div className="lg:col-span-3 flex flex-col order-2 lg:order-1">
          <div className="flex items-center mb-4 font-bold text-sm tracking-widest">
            <span className="text-[#FF5812]">{activeReview.id}</span>
            <span className="text-[#0a0a1a]/30 mx-2">/</span>
            <span className="text-[#0a0a1a]/50">{String(reviews.length).padStart(2, "0")}</span>
          </div>
          <div className="h-px w-full bg-[#0a0a1a]/10 mb-6" />
          
          <div className="flex flex-col gap-2">
            {reviews.map((review, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={review.id}
                  onClick={() => handleThumbnailClick(index)}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-xl transition-all duration-300 text-left w-full",
                    isActive 
                      ? "border border-[#FF5812]/20 bg-[#FF5812]/5 text-[#0a0a1a] shadow-sm" 
                      : "border border-transparent hover:bg-[#0a0a1a]/5 opacity-70 hover:opacity-100"
                  )}
                >
                  <img 
                    src={review.thumbnailSrc || review.imageSrc} 
                    alt="" 
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0" 
                  />
                  <div className="flex flex-col">
                    <span className={cn("text-xs font-bold mb-0.5", isActive ? "text-[#FF5812]" : "text-[#0a0a1a]/50")}>
                      {review.id}
                    </span>
                    <span className="text-sm font-semibold leading-tight text-balance">
                      {review.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* === Center Column: Main Image === */}
        <div className="lg:col-span-4 relative min-h-[400px] lg:h-full order-1 lg:order-2">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={activeReview.imageSrc}
              alt={activeReview.title}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full object-cover rounded-[1.5rem]"
            />
          </AnimatePresence>
        </div>

        {/* === Right Column: Text Content === */}
        <div className="lg:col-span-5 flex flex-col justify-between order-3 lg:order-3">
          {/* Text Content */}
          <div className="relative overflow-hidden min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="mb-6 flex flex-col gap-2">
                  <span className="text-sm font-bold text-[#0a0a1a]/50 tracking-widest">
                    {activeReview.id} <span className="mx-2">/</span> {String(reviews.length).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1.3rem] md:text-2xl lg:text-[1.6rem] xl:text-[1.85rem] font-extrabold text-[#0a0a1a] leading-tight whitespace-nowrap tracking-tight">
                    {activeReview.title}
                  </h3>
                </div>
                
                <div className="mt-2 flex flex-col gap-2.5">
                  <p className="text-base md:text-lg font-bold text-[#0a0a1a] leading-snug text-pretty">
                    {activeReview.question}
                  </p>
                  
                  {/* Optional: WHAT YOU MAY BE ASKING Box */}
                  {activeReview.asking && activeReview.asking.length > 0 && (
                    <div className="mt-1 rounded-xl bg-[#FFF5F1] p-3 flex gap-3">
                      <div className="flex-shrink-0 mt-0.5 rounded-full border-2 border-[#FF5812]/30 p-1 bg-white h-max">
                        <HelpCircle className="w-4 h-4 text-[#FF5812]" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-[#FF5812] font-bold text-xs tracking-widest uppercase mb-1.5">What you may be asking</h4>
                        <ul className="flex flex-col gap-1">
                          {activeReview.asking.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-[#0a0a1a]/70">
                              <span className="text-[#FF5812] mt-0.5 text-base leading-none">&bull;</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* HOW WE HELP Box */}
                  <div className="mt-1 rounded-xl bg-[#F8F9FA] p-3 flex gap-3">
                    <div className="flex-shrink-0 mt-0.5 rounded-full border-2 border-[#FF5812]/30 p-1 bg-white h-max">
                      <Settings className="w-4 h-4 text-[#FF5812]" />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[#FF5812] font-bold text-xs tracking-widest uppercase mb-1.5">How we help</h4>
                      <ul className="flex flex-col gap-1">
                        {activeReview.howWeHelp.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#0a0a1a]/70">
                            <span className="text-[#FF5812] mt-0.5 text-base leading-none">&bull;</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* THE OUTCOME Box */}
                  <div className="mt-1 rounded-xl bg-[#FFF5F1] p-3 flex gap-3 border border-[#FF5812]/10">
                    <div className="flex-shrink-0 mt-0.5 rounded-full border-2 border-[#FF5812]/30 p-1 bg-white h-max">
                      <TrendingUp className="w-4 h-4 text-[#FF5812]" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[#FF5812] font-bold text-xs tracking-widest uppercase mb-1">The Outcome</h4>
                      <p className="text-xs font-bold text-[#0a0a1a]">
                        {activeReview.outcome}
                      </p>
                    </div>
                  </div>

                  {activeReview.highlight && (
                    <p className="text-base font-bold text-[#FF5812] mt-1">
                      {activeReview.highlight}
                    </p>
                  )}

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-3 mt-8 lg:mt-auto pt-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-[#0a0a1a]/20 text-[#0a0a1a] hover:bg-[#0a0a1a]/5"
              onClick={handlePrev}
              aria-label="Previous review"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="rounded-full w-12 h-12 bg-[#FF5812] text-white hover:bg-[#E54D0C]"
              onClick={handleNext}
              aria-label="Next review"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
            <span className="text-sm font-semibold ml-4 text-[#0a0a1a]/50">
              {String(currentIndex + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
};
