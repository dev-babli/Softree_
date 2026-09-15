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
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  // Auto-scroll the active horizontal pill tab into view on mobile
  React.useEffect(() => {
    if (tabRefs.current[currentIndex]) {
      tabRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  React.useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5500);
    
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
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
        "relative w-full overflow-hidden bg-transparent text-foreground pt-8 md:pt-12 px-4 sm:px-6 md:px-12 pb-0",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Section */}
      <div className="flex flex-col items-center text-center mb-8 md:mb-16 max-w-4xl mx-auto">
        {eyebrow && (
          <span className="mb-3 md:mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF5812]/20 bg-[#FF5812]/5 px-3 py-1 w-max text-xs font-semibold uppercase tracking-widest text-[#FF5812]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]"></span>
            {eyebrow}
          </span>
        )}
        {heading && (
          <h2 className="text-balance text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#0a0a1a]">
            {heading}
          </h2>
        )}
        {description && (
          <p className="mt-3 md:mt-6 text-pretty text-sm md:text-lg leading-relaxed text-[#0a0a1a]/70 font-medium">
            {description}
          </p>
        )}
      </div>

      {/* Mobile-Only Horizontal Scrollable Audience Tabs */}
      <div className="flex lg:hidden overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-2 pb-2 mb-6 -mx-1 px-1">
        {reviews.map((review, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={review.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0",
                isActive
                  ? "bg-[#FF5812] text-white shadow-md shadow-[#FF5812]/25 ring-2 ring-[#FF5812]/20 font-bold"
                  : "bg-white border border-[#0a0a1a]/10 text-[#0a0a1a]/70 hover:bg-[#0a0a1a]/5"
              )}
            >
              <img
                src={review.thumbnailSrc || review.imageSrc}
                alt=""
                className="w-5 h-5 rounded-full object-cover shrink-0"
              />
              <span className={cn("text-[10px] font-mono", isActive ? "text-white/80" : "text-[#FF5812] font-bold")}>
                {review.id}
              </span>
              <span>{review.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Desktop 3-column layout / Mobile unified card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 min-h-[460px]">
        
        {/* === Left Column: Audience Navigation (Desktop Only) === */}
        <div className="hidden lg:flex lg:col-span-3 flex-col order-1">
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

        {/* === Center Column: Main Image (Desktop Only) === */}
        <div className="hidden lg:block lg:col-span-4 relative min-h-[400px] h-full order-2">
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

        {/* === Right Column: Content (Mobile unified card + Desktop right panel) === */}
        <div className="w-full lg:col-span-5 flex flex-col justify-between order-1 lg:order-3">
          {/* Mobile Persona Visual Header: pairs photo with current persona */}
          <div className="block lg:hidden relative w-full aspect-[16/10] sm:aspect-[21/9] rounded-2xl overflow-hidden mb-4 shadow-sm border border-black/[0.06]">
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
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20 pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <span className="text-[11px] font-mono font-bold tracking-widest bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                {activeReview.id} / {String(reviews.length).padStart(2, "0")}
              </span>
              <span className="text-xs font-bold text-white drop-shadow">
                {activeReview.title}
              </span>
            </div>
          </div>

          {/* Text Content */}
          <div className="relative overflow-hidden min-h-[360px] lg:min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="mb-4 lg:mb-6 flex flex-col gap-1.5 lg:gap-2">
                  <span className="text-xs sm:text-sm font-bold text-[#0a0a1a]/50 tracking-widest">
                    {activeReview.id} <span className="mx-1.5">/</span> {String(reviews.length).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-[1.6rem] xl:text-[1.85rem] font-extrabold text-[#0a0a1a] leading-tight tracking-tight whitespace-normal sm:whitespace-nowrap">
                    {activeReview.title}
                  </h3>
                </div>
                
                <div className="mt-1 sm:mt-2 flex flex-col gap-2.5">
                  <p className="text-base sm:text-lg font-bold text-[#0a0a1a] leading-snug text-pretty">
                    {activeReview.question}
                  </p>
                  
                  {/* WHAT YOU MAY BE ASKING Box */}
                  {activeReview.asking && activeReview.asking.length > 0 && (
                    <div className="mt-1 rounded-xl bg-[#FFF5F1] p-3 sm:p-3.5 flex gap-3 border border-[#FF5812]/10">
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
                  <div className="mt-1 rounded-xl bg-[#F8F9FA] p-3 sm:p-3.5 flex gap-3 border border-[#0a0a1a]/05">
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
                  <div className="mt-1 rounded-xl bg-[#FFF5F1] p-3 sm:p-3.5 flex gap-3 border border-[#FF5812]/10">
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
                    <p className="text-sm sm:text-base font-bold text-[#FF5812] mt-1">
                      {activeReview.highlight}
                    </p>
                  )}

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls: Arrows + Dots indicator */}
          <div className="flex items-center justify-between mt-6 lg:mt-auto pt-4 border-t border-[#0a0a1a]/06">
            <div className="flex items-center space-x-2.5">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10 sm:w-11 sm:h-11 border-[#0a0a1a]/20 text-[#0a0a1a] hover:bg-[#0a0a1a]/5"
                onClick={handlePrev}
                aria-label="Previous review"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="rounded-full w-10 h-10 sm:w-11 sm:h-11 bg-[#FF5812] text-white hover:bg-[#E54D0C]"
                onClick={handleNext}
                aria-label="Next review"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Pagination Dots */}
            <div className="flex items-center gap-1.5 lg:hidden">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleThumbnailClick(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === currentIndex ? "w-5 bg-[#FF5812]" : "w-1.5 bg-[#0a0a1a]/20"
                  )}
                />
              ))}
            </div>

            <span className="text-xs sm:text-sm font-semibold text-[#0a0a1a]/50 font-mono">
              {String(currentIndex + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
};
