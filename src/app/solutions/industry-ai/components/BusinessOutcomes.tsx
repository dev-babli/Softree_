"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useIndustryConfig } from "../context";

export default function BusinessOutcomes() {
  const { businessOutcomes: steps, sections } = useIndustryConfig();
  const copy = sections.businessOutcomes;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play logic
  useEffect(() => {
    if (isHovered) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, steps.length]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    const swipe = info.offset.x;
    if (swipe < -50) {
      handleNext();
    } else if (swipe > 50) {
      handlePrev();
    }
  };

  const currentStep = steps[activeIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-12 lg:py-16">
      <div className="relative mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto mb-8 max-w-5xl text-center md:mb-10">
          <div className="mb-4 flex items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
              <div className="absolute left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
            </div>
            <span className="text-[#FF5812] font-bold tracking-[0.2em] text-[11px] uppercase">
              {copy.badge}
            </span>
            <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
              <div className="absolute right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-gray-900 tracking-tight mb-6 max-w-5xl mx-auto leading-tight">
            {copy.title}{" "}
            <span className="text-[#FF5812]">{copy.highlight}</span>
          </h2>
          <p className="text-[15px] lg:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
            {copy.description}
          </p>
        </div>

        {/* Timeline Indicator */}
        <div className="relative mx-auto mb-8 max-w-4xl md:mb-10">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 z-0 hidden h-px -translate-y-1/2 bg-gray-200 sm:block" />
          
          <div className="relative z-10 flex items-center justify-between gap-2 overflow-x-auto px-1 py-2 sm:gap-0 sm:px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {steps.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className="group relative flex min-w-[40px] cursor-pointer flex-col items-center justify-center focus:outline-none sm:min-w-[48px]"
                >
                  <motion.div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 shadow-sm transition-all duration-300 sm:h-12 sm:w-12 ${
                      isActive
                        ? "bg-[#FF6B00] border-[#FF6B00]"
                        : "bg-white border-gray-200 group-hover:border-gray-300"
                    }`}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                    }}
                  >
                    <span
                      className={`text-sm font-bold ${
                        isActive ? "text-white" : "text-gray-600 group-hover:text-gray-900"
                      }`}
                    >
                      {item.step}
                    </span>
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Area */}
        <div
          className="relative mx-auto max-w-[85rem] px-10 sm:px-12 lg:px-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-600 shadow-lg transition-all duration-300 hover:scale-105 hover:text-[#FF6B00] focus:outline-none sm:left-1 sm:h-11 sm:w-11 lg:left-2"
            aria-label="Previous step"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-600 shadow-lg transition-all duration-300 hover:scale-105 hover:text-[#FF6B00] focus:outline-none sm:right-1 sm:h-11 sm:w-11 lg:right-2"
            aria-label="Next step"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="relative min-h-[520px] w-full overflow-hidden px-1 py-4 sm:min-h-[400px] md:min-h-[420px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 flex cursor-grab flex-col gap-4 px-1 py-2 active:cursor-grabbing sm:gap-6 md:flex-row lg:gap-10"
              >
                {[0, 1].map((idx) => {
                  const isSecondCard = idx === 1;
                  const cardData = isSecondCard ? currentStep.rightCard : currentStep.leftCard;
                  const cardIsOrange = idx === 0;

                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4 }}
                      className={`
                        flex min-h-0 w-full flex-1 flex-col justify-center overflow-y-auto
                        rounded-[24px] p-5 sm:rounded-[32px] sm:p-8 md:p-10
                        transition-all duration-300
                        ${
                          cardIsOrange
                            ? "bg-gradient-to-br from-[#FF6B00] to-[#e65a00] shadow-[0_15px_40px_rgba(255,107,0,0.3)] border border-white/10"
                            : "bg-white shadow-2xl shadow-gray-200/60 border border-gray-100"
                        }
                      `}
                    >
                      <h3
                        className={`mb-4 text-lg font-bold tracking-tight sm:mb-8 sm:text-2xl md:text-3xl ${
                          cardIsOrange ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {cardData.title}
                      </h3>

                      <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:gap-y-5">
                        {cardData.points.map((point, pointIdx) => (
                          <li key={pointIdx} className="flex items-start gap-3">
                            <CheckCircle2
                              className={`mt-1 h-5 w-5 shrink-0 ${
                                cardIsOrange ? "text-white" : "text-[#FF6B00]"
                              }`}
                            />
                            <span
                              className={`text-sm leading-relaxed sm:text-base ${
                                cardIsOrange ? "text-orange-50" : "text-gray-600"
                              }`}
                            >
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
