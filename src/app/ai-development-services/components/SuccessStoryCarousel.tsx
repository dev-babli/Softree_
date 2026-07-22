"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SuccessStoryCard from './SuccessStoryCard';
import { successStoriesList } from '../data/success-stories';

export default function SuccessStoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with center item
  const [windowWidth, setWindowWidth] = useState(1920);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // set initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % successStoriesList.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + successStoriesList.length) % successStoriesList.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  const getOffset = (index: number) => {
    const total = successStoriesList.length;
    let diff = (index - currentIndex) % total;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;
    return diff;
  };

  const getCardStyle = (diff: number) => {
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1280;
    
    // Spread for side cards
    const baseOffset = isMobile ? 0 : isTablet ? 320 : 440; // Success story cards are wider (md:max-w-[440px])

    if (diff === 0) {
      // Active card: Centered, elevated 24px (-24y), scaled to 1.08, fully opaque
      return { x: 0, y: -24, scale: 1.08, opacity: 1, zIndex: 30 }; 
    } else if (diff === 1 || diff === -1) {
      // Side cards: Not blurred, sharp, scaled down to 0.94, high opacity 0.95
      return { 
        x: diff > 0 ? baseOffset : -baseOffset, 
        y: 0,
        scale: 0.94, 
        opacity: isMobile ? 0 : 0.95, 
        zIndex: 20 
      };
    } else if (diff === 2 || diff === -2) {
      return { 
        x: diff > 0 ? baseOffset * 1.9 : -baseOffset * 1.9, 
        y: 0,
        scale: 0.85, 
        opacity: (isMobile || isTablet) ? 0 : 0.4, 
        zIndex: 10 
      };
    } else {
      return { x: 0, y: 0, scale: 0.5, opacity: 0, zIndex: 0 };
    }
  };

  return (
    <div 
      className="relative w-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mobile Swipe Area */}
      <div 
        className="relative w-full flex items-center justify-center overflow-hidden py-16"
        style={{ minHeight: '800px' }}
        onTouchStart={(e) => {
           const touchDown = e.touches[0].clientX;
           e.currentTarget.setAttribute('data-touch', touchDown.toString());
        }}
        onTouchEnd={(e) => {
           const touchDown = parseFloat(e.currentTarget.getAttribute('data-touch') || '0');
           if (!touchDown) return;
           const touchUp = e.changedTouches[0].clientX;
           if (touchDown - touchUp > 50) nextSlide();
           if (touchDown - touchUp < -50) prevSlide();
        }}
      >
        <AnimatePresence initial={false}>
          {successStoriesList.map((item, index) => {
            const diff = getOffset(index);
            const style = getCardStyle(diff);
            
            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: style.x,
                  y: style.y,
                  scale: style.scale,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="absolute w-[92%] max-w-[360px] md:max-w-[420px] lg:max-w-[440px]"
                onClick={() => {
                  if (diff !== 0 && windowWidth >= 768) {
                    setCurrentIndex(index);
                  }
                }}
                style={{ cursor: diff !== 0 ? 'pointer' : 'default' }}
              >
                <SuccessStoryCard item={item} isActive={diff === 0} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
