"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import IndustryCard from './IndustryCard';
import CarouselControls from './CarouselControls';
import { industriesList } from '../data/industries';

export default function IndustryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    handleResize(); // set initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, industriesList.length - cardsToShow);

  const nextSlide = useCallback(() => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0; // wrap around
      }
      return prev + 1;
    });
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex; // wrap around
      }
      return prev - 1;
    });
  }, [maxIndex]);

  useEffect(() => {
    if (isHovered || maxIndex === 0) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered, maxIndex]);

  // Touch handlers for mobile swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div 
      className="relative w-full flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Viewport for sliding track */}
      <div 
        className="w-full overflow-hidden py-10 px-4 sm:px-6 lg:px-8 max-w-6xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
          }}
        >
          {industriesList.map((item) => (
            <div 
              key={item.id}
              className="w-full flex-shrink-0 px-3 sm:px-6"
              style={{ width: `${100 / cardsToShow}%` }}
            >
              <div className="flex justify-center">
                <IndustryCard item={item} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Centered Controls at the Bottom - Only show if sliding is possible */}
      {maxIndex > 0 && (
        <div className="flex justify-center mt-4 pb-6">
          <CarouselControls onNext={nextSlide} onPrev={prevSlide} />
        </div>
      )}
    </div>
  );
}
