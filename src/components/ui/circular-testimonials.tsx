"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CircularTestimonialItem = {
  quote?: string;
  name?: string;
  designation?: string;
  src?: string;
  content?: React.ReactNode;
  [key: string]: any;
};

interface CircularTestimonialsProps {
  testimonials: CircularTestimonialItem[];
  autoplay?: boolean;
  intervalMs?: number;
  reverseLayout?: boolean;
  renderRightSide?: (activeTestimonial: CircularTestimonialItem) => React.ReactNode;
  colors?: {
    arrowBackground?: string;
    arrowForeground?: string;
    arrowHoverBackground?: string;
  };
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  intervalMs = 4000,
  reverseLayout = false,
  renderRightSide,
}: CircularTestimonialsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay || isPaused || testimonials.length <= 1) return;
    const timer = setInterval(next, intervalMs);
    return () => clearInterval(timer);
  }, [autoplay, isPaused, intervalMs, testimonials.length]);

  const activeItem = testimonials[activeIndex] || testimonials[0];

  const carouselSection = (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full h-full flex flex-col"
    >
      <div className="relative w-full h-full flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.97, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full h-full flex-1 flex flex-col"
          >
            {activeItem?.content || (
              <div className="w-full h-full bg-white rounded-2xl p-8 border border-zinc-200 shadow-xl flex flex-col justify-between">
                <p className="text-lg italic text-slate-700">"{activeItem?.quote}"</p>
                <div>
                  <h4 className="font-bold text-slate-900">{activeItem?.name}</h4>
                  <p className="text-sm text-slate-500">{activeItem?.designation}</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );

  const rightSideContent = renderRightSide ? (
    <div className="w-full h-full flex flex-col justify-between">
      {renderRightSide(activeItem)}
    </div>
  ) : (
    <div className="flex flex-col gap-4 text-left justify-between h-full">
      <h3 className="text-3xl font-bold text-slate-900">{activeItem?.title || activeItem?.name}</h3>
      <p className="text-slate-600 leading-relaxed">{activeItem?.caption || activeItem?.quote}</p>
    </div>
  );

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {reverseLayout ? (
        <>
          <div className="lg:col-span-5 flex flex-col justify-center w-full">{carouselSection}</div>
          <div className="lg:col-span-7 flex flex-col justify-center w-full">{rightSideContent}</div>
        </>
      ) : (
        <>
          <div className="lg:col-span-7 flex flex-col justify-center w-full">{rightSideContent}</div>
          <div className="lg:col-span-5 flex flex-col justify-center w-full">{carouselSection}</div>
        </>
      )}
    </div>
  );
};
