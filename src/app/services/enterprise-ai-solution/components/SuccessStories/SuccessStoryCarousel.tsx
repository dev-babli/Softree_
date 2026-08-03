"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SuccessStoryCard } from "./SuccessStoryCard";
import { successStoriesList } from "../../../ai-development-services/data/success-stories";

export default function SuccessStoryCarousel() {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1920);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleGroup = useCallback(() => {
    setActiveGroupIndex((prev) => (prev === 0 ? 1 : 0));
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(toggleGroup, 4500); // slightly slower interval for a better reading flow
    return () => clearInterval(timer);
  }, [toggleGroup, isHovered]);

  const groups = [
    [successStoriesList[0], successStoriesList[1], successStoriesList[2]],
    [successStoriesList[3], successStoriesList[4], successStoriesList[5]],
  ];

  const getCardStyle = (indexInGroup: number) => {
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;
    const isSmallDesktop = windowWidth >= 1024 && windowWidth < 1280;

    // Spread for side cards
    const baseOffset = isMobile ? 0 : isTablet ? 420 : isSmallDesktop ? 450 : 500;

    if (indexInGroup === 1) {
      // Center/Featured card: Centered, elevated slightly, scaled up, fully opaque
      return { x: 0, y: -20, scale: 1.05, opacity: 1, zIndex: 30 };
    } else if (indexInGroup === 0) {
      // Left card
      return {
        x: -baseOffset,
        y: 0,
        scale: 0.92,
        opacity: isMobile ? 0 : 0.9,
        zIndex: 20,
      };
    } else if (indexInGroup === 2) {
      // Right card
      return {
        x: baseOffset,
        y: 0,
        scale: 0.92,
        opacity: isMobile ? 0 : 0.9,
        zIndex: 20,
      };
    }
    return { x: 0, y: 0, scale: 1, opacity: 0, zIndex: 0 };
  };

  return (
    <div
      className="relative w-full flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Swipe & Viewport Area */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden py-10 cursor-pointer"
        style={{ minHeight: "560px" }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("a") || target.closest("button")) return;
          toggleGroup();
        }}
        onTouchStart={(e) => {
          const touchDown = e.touches[0].clientX;
          e.currentTarget.setAttribute("data-touch", touchDown.toString());
        }}
        onTouchEnd={(e) => {
          const touchDown = parseFloat(e.currentTarget.getAttribute("data-touch") || "0");
          if (!touchDown) return;
          const touchUp = e.changedTouches[0].clientX;
          if (Math.abs(touchDown - touchUp) > 50) toggleGroup();
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={activeGroupIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {groups[activeGroupIndex].map((item, index) => {
              const style = getCardStyle(index);

              return (
                <motion.div
                  key={item.id}
                  className="absolute w-[90%] max-w-87.5 md:max-w-95 lg:max-w-100"
                  animate={{
                    x: style.x,
                    y: style.y,
                    scale: style.scale,
                    opacity: style.opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                  }}
                  style={{
                    zIndex: style.zIndex,
                    pointerEvents: style.opacity === 0 ? "none" : "auto",
                  }}
                >
                  <SuccessStoryCard story={item} isActive={index === 1} />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Pagination Dots */}
      <div className="flex items-center justify-center gap-3 mt-4 z-20">
        {groups.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveGroupIndex(index)}
            className="relative h-2 w-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]"
            aria-label={`Go to slide group ${index + 1}`}
          >
            {/* Background tracking dot */}
            <span className="absolute inset-0 rounded-full bg-slate-200 transition-colors hover:bg-slate-300" />
            {/* Active sliding/morphing indicator */}
            {activeGroupIndex === index && (
              <motion.span
                layoutId="activeCarouselDot"
                className="absolute inset-0 rounded-full bg-[#FF5812]"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
