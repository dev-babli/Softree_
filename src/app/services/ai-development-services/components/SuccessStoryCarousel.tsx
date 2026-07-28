"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SuccessStoryCard from './SuccessStoryCard';
import { successStoriesList } from '../data/success-stories';

export default function SuccessStoryCarousel() {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1920);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // set initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleGroup = useCallback(() => {
    setActiveGroupIndex((prev) => (prev === 0 ? 1 : 0));
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(toggleGroup, 3000);
    return () => clearInterval(timer);
  }, [toggleGroup, isHovered]);

  const groups = [
    [successStoriesList[0], successStoriesList[1], successStoriesList[2]],
    [successStoriesList[3], successStoriesList[4], successStoriesList[5]],
  ];

  const getCardStyle = (indexInGroup: number) => {
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1280;
    
    // Spread for side cards
    const baseOffset = isMobile ? 0 : isTablet ? 320 : 440; // Success story cards are wider (md:max-w-[440px])

    if (indexInGroup === 1) {
      // Center/Featured card: Centered, elevated 24px (-24y), scaled to 1.08, fully opaque
      return { x: 0, y: -24, scale: 1.08, opacity: 1, zIndex: 30 }; 
    } else if (indexInGroup === 0) {
      // Left card
      return { 
        x: -baseOffset, 
        y: 0,
        scale: 0.94, 
        opacity: isMobile ? 0 : 0.95, 
        zIndex: 20 
      };
    } else if (indexInGroup === 2) {
      // Right card
      return { 
        x: baseOffset, 
        y: 0,
        scale: 0.94, 
        opacity: isMobile ? 0 : 0.95, 
        zIndex: 20 
      };
    }
    return { x: 0, y: 0, scale: 1, opacity: 0, zIndex: 0 };
  };

  return (
    <div 
      className="relative w-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Swipe Area */}
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
           if (Math.abs(touchDown - touchUp) > 50) toggleGroup();
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={activeGroupIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {groups[activeGroupIndex].map((item, index) => {
              const style = getCardStyle(index);
              
              return (
                <div
                  key={item.id}
                  className="absolute w-[92%] max-w-[360px] md:max-w-[420px] lg:max-w-[440px] transition-all duration-300"
                  style={{
                    transform: `translate3d(${style.x}px, ${style.y}px, 0) scale(${style.scale})`,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                    pointerEvents: style.opacity === 0 ? 'none' : 'auto',
                  }}
                >
                  <SuccessStoryCard item={item} isActive={index === 1} />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
