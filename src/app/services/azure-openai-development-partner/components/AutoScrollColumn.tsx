"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChallengeItem from '../../ai-development-services/components/ChallengeItem';

export default function AutoScrollColumn({ 
  data, 
  isRight = false,
  activeHoverId = null,
  setActiveHoverId = () => {},
  startIndex,
  onInteract
}: { 
  data: any[], 
  isRight?: boolean,
  activeHoverId?: number | null,
  setActiveHoverId?: (id: number | null) => void,
  startIndex: number,
  onInteract: (direction: 'up' | 'down') => void
}) {
  const throttleRef = useRef(false);
  const touchStartY = useRef(0);

  const handleWheel = (e: React.WheelEvent) => {
    if (throttleRef.current) return;
    if (Math.abs(e.deltaY) > 10) {
      throttleRef.current = true;
      setTimeout(() => { throttleRef.current = false; }, 600);
      if (e.deltaY > 0) onInteract('down');
      else onInteract('up');
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (throttleRef.current) return;
    const deltaY = touchStartY.current - e.touches[0].clientY;
    
    if (Math.abs(deltaY) > 30) {
      throttleRef.current = true;
      setTimeout(() => { throttleRef.current = false; }, 600);
      if (deltaY > 0) onInteract('down');
      else onInteract('up');
      touchStartY.current = e.touches[0].clientY; 
    }
  };

  // Determine which items to show (5 items visible)
  const visibleItems = [];
  for (let i = 0; i < 5; i++) {
    const itemIndex = (startIndex + i) % data.length;
    visibleItems.push(data[itemIndex]);
  }

  // Visual header elements
  const HeaderIcon = isRight ? (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
    </svg>
  );

  return (
    <div 
      className={`flex-1 rounded-[24px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border flex flex-col h-[500px] ${!isRight ? 'bg-[#FF5812] border-[#E84E0F]' : 'bg-[#FDFDFD] border-[#F0F0F0]'}`}
      onMouseLeave={() => { setActiveHoverId(null); }}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="flex items-center gap-3 mb-6 relative z-20">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isRight ? 'bg-blue-50 text-blue-500' : 'bg-white text-[#FF5812] shadow-sm'}`}>
          {HeaderIcon}
        </div>
        <h3 className={`text-xl font-bold border-b-2 pb-1 ${isRight ? 'text-slate-900 border-orange-500' : 'text-white border-white/30'}`}>
          {isRight ? "AI Chatbot Solutions" : "Business Challenges"}
        </h3>
      </div>
      
      <div className="flex-1 relative">
        <div className="flex flex-col gap-3 relative w-full h-full pr-6">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 40, mass: 1 }}
                className="w-full"
              >
                <ChallengeItem 
                  item={item} 
                  isRight={isRight} 
                  isActive={activeHoverId === item.id}
                  onHover={() => setActiveHoverId(item.id)}
                  onLeave={() => {}} // parent handles leave to prevent flickering
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
      </div>
    </div>
  );
}
