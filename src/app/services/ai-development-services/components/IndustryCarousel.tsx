"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IndustryCard from './IndustryCard';
import CarouselControls from './CarouselControls';
import { industriesList } from '../data/industries';

export default function IndustryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with center item
  const [windowWidth, setWindowWidth] = useState(1920);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // set initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % industriesList.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + industriesList.length) % industriesList.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  const getOffset = (index: number) => {
    const total = industriesList.length;
    let diff = (index - currentIndex) % total;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;
    return diff;
  };

  const getCardStyle = (diff: number) => {
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1280;
    
    // Adjusted spread to ensure 5 cards fit nicely on a 1920 display
    const baseOffset = isMobile ? 0 : isTablet ? 280 : 310;

    if (diff === 0) {
      return { x: 0, scale: 1.05, opacity: 1, zIndex: 30, filter: 'blur(0px)' };
    } else if (diff === 1) {
      return { x: baseOffset, scale: 0.9, opacity: isMobile ? 0 : 0.55, zIndex: 20, filter: 'blur(1px)' };
    } else if (diff === -1) {
      return { x: -baseOffset, scale: 0.9, opacity: isMobile ? 0 : 0.55, zIndex: 20, filter: 'blur(1px)' };
    } else if (diff === 2) {
      return { x: baseOffset * 1.95, scale: 0.8, opacity: (isMobile || isTablet) ? 0 : 0.35, zIndex: 10, filter: 'blur(2px)' };
    } else if (diff === -2) {
      return { x: -baseOffset * 1.95, scale: 0.8, opacity: (isMobile || isTablet) ? 0 : 0.35, zIndex: 10, filter: 'blur(2px)' };
    } else {
      return { x: 0, scale: 0.5, opacity: 0, zIndex: 0, filter: 'blur(4px)' };
    }
  };

  return (
    <div 
      className="relative w-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-[520px] flex items-center justify-center overflow-hidden py-10">
        <AnimatePresence initial={false}>
          {industriesList.map((item, index) => {
            const diff = getOffset(index);
            const style = getCardStyle(diff);
            
            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                  filter: style.filter,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className="absolute"
                onClick={() => {
                  if (diff !== 0) {
                    setCurrentIndex(index);
                  }
                }}
              >
                <IndustryCard item={item} isActive={diff === 0} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}
