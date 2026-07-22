"use client";
import React, { useState, useEffect } from 'react';
import WhySoftreeCard from './WhySoftreeCard';
import { whySoftreeList } from '../data/why-softree';

export default function WhySoftreeAccordion() {
  const [activeId, setActiveId] = useState('01');
  const [windowWidth, setWindowWidth] = useState(1920); // Default for SSR
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return null; // Avoid hydration mismatch on initial render for complex layouts

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-4 lg:gap-5 w-full h-auto lg:h-[520px] mt-10">
      {whySoftreeList.map((item) => (
        <WhySoftreeCard 
          key={item.id}
          item={item}
          isActive={activeId === item.id}
          onClick={() => setActiveId(item.id)}
          windowWidth={windowWidth}
        />
      ))}
    </div>
  );
}
