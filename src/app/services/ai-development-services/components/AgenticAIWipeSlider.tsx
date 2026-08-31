"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    number: "01",
    title: "Understand",
    description: "Interpret requests, context, and business requirements.",
    image: "/images/ai-development-service/agenticAi-1.png"
  },
  {
    number: "02",
    title: "Reason",
    description: "Analyze information and determine the best course of action.",
    image: "/images/ai-development-service/agenticAi-2.png"
  },
  {
    number: "03",
    title: "Plan",
    description: "Break complex objectives into actionable steps.",
    image: "/images/ai-development-service/agenticAi-3.png"
  },
  {
    number: "04",
    title: "Use Tools",
    description: "Interact with APIs, databases, applications, and enterprise systems.",
    image: "/images/ai-development-service/agenticAi-4.png"
  },
  {
    number: "05",
    title: "Execute",
    description: "Complete tasks and automate multi-step workflows.",
    image: "/images/ai-development-service/agenticAi-5.png"
  },
  {
    number: "06",
    title: "Collaborate",
    description: "Enable multiple specialized agents to work together.",
    image: "/images/ai-development-service/agenticAi-6.png"
  },
  {
    number: "07",
    title: "Evaluate & Improve",
    description: "Monitor agent behavior and continuously improve performance.",
    image: "/images/ai-development-service/agenticAi-7.png"
  }
];

export default function AgenticAIWipeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);
  
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLSpanElement>(null);

  // Initial Setup
  useEffect(() => {
    slideRefs.current.forEach((slide, i) => {
      if (!slide) return;
      if (i === 0) {
        gsap.set(slide, { zIndex: 10, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
        gsap.set(bgRefs.current[i], { scale: 1 });
        gsap.set(titleRefs.current[i], { y: 0, x: 0, opacity: 1 });
        gsap.set(descRefs.current[i], { y: 0, x: 0, opacity: 1 });
      } else {
        gsap.set(slide, { zIndex: 1, clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" });
        gsap.set(bgRefs.current[i], { scale: 1.1 });
        gsap.set(titleRefs.current[i], { y: 60, x: 0, opacity: 0 });
        gsap.set(descRefs.current[i], { y: 40, x: 0, opacity: 0 });
      }
    });
  }, []);

  const goToSlide = (newIndex: number, direction: 'next' | 'prev') => {
    if (isAnimating.current || newIndex === activeIndex) return;
    
    isAnimating.current = true;
    
    isAnimating.current = true;

    const currentSlide = slideRefs.current[activeIndex];
    const nextSlide = slideRefs.current[newIndex];
    const currentBg = bgRefs.current[activeIndex];
    const nextBg = bgRefs.current[newIndex];
    const currentTitle = titleRefs.current[activeIndex];
    const nextTitle = titleRefs.current[newIndex];
    const currentDesc = descRefs.current[activeIndex];
    const nextDesc = descRefs.current[newIndex];

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        setActiveIndex(newIndex);
        // Reset outgoing slide z-index
        gsap.set(currentSlide, { zIndex: 1 });
      }
    });

    // Setup incoming slide layer over current slide
    gsap.set(nextSlide, { zIndex: 20 });
    gsap.set(currentSlide, { zIndex: 10 });

    if (direction === 'next') {
      // Slanted mask revealing from right to left (bottom leads by 15%)
      const proxy = { progress: 0 };
      gsap.set(nextBg, { scale: 1.1 });
      gsap.set(nextTitle, { y: 60, x: 0, opacity: 0 });
      gsap.set(nextDesc, { y: 40, x: 0, opacity: 0 });

      tl.to(proxy, {
        progress: 100,
        duration: 1.1,
        ease: "power3.inOut",
        onUpdate: () => {
          const tl_val = 115 - (115 * proxy.progress / 100);
          const bl_val = 100 - (115 * proxy.progress / 100);
          if (nextSlide) nextSlide.style.clipPath = `polygon(${tl_val}% 0%, 100% 0%, 100% 100%, ${bl_val}% 100%)`;
        }
      }, 0);

      tl.to(nextBg, {
        scale: 1,
        duration: 1.1,
        ease: "power3.inOut"
      }, 0);

      // Outgoing text moves UP and LEFT (direction of travel)
      tl.to([currentTitle, currentDesc], {
        y: -40,
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.in"
      }, 0);

      // Incoming text simply rises from below (no x slide)
      tl.to([nextTitle, nextDesc], {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, 0.3); // Delay start

    } else {
      // PREVIOUS - Slanted mask revealing from left to right (bottom leads by 15%)
      const proxy = { progress: 0 };
      gsap.set(nextBg, { scale: 1.1 });
      gsap.set(nextTitle, { y: 60, x: 0, opacity: 0 });
      gsap.set(nextDesc, { y: 40, x: 0, opacity: 0 });

      tl.to(proxy, {
        progress: 100,
        duration: 1.1,
        ease: "power3.inOut",
        onUpdate: () => {
          const tr_val = -15 + (115 * proxy.progress / 100);
          const br_val = 0 + (115 * proxy.progress / 100);
          if (nextSlide) nextSlide.style.clipPath = `polygon(0% 0%, ${tr_val}% 0%, ${br_val}% 100%, 0% 100%)`;
        }
      }, 0);

      tl.to(nextBg, {
        scale: 1,
        duration: 1.1,
        ease: "power3.inOut"
      }, 0);

      // Outgoing text moves UP and RIGHT (direction of travel)
      tl.to([currentTitle, currentDesc], {
        y: -40,
        x: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.in"
      }, 0);

      // Incoming text simply rises from below (no x slide)
      tl.to([nextTitle, nextDesc], {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, 0.3);
    }
    
    // Animate Counter & Progress Bar
    const counterProxy = { val: (activeIndex + 1) / slides.length * 100 };
    const targetVal = (newIndex + 1) / slides.length * 100;
    
    tl.to(counterProxy, {
      val: targetVal,
      duration: 1.1,
      ease: "power3.inOut",
      onUpdate: () => {
        if (progressRef.current) {
          progressRef.current.innerText = `${Math.round(counterProxy.val)}%`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${counterProxy.val}%`;
        }
      }
    }, 0);
    
    // Update chapter number early in transition
    tl.call(() => {
      if (chapterRef.current) {
        chapterRef.current.innerText = slides[newIndex].number;
      }
    }, [], 0.3);
  };

  const nextSlide = () => goToSlide((activeIndex + 1) % slides.length, 'next');
  const prevSlide = () => goToSlide((activeIndex - 1 + slides.length) % slides.length, 'prev');

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating.current) {
        nextSlide();
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  // Swipe & Keyboard Handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  let touchStartX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  return (
    <section 
      className="relative w-full h-screen min-h-[700px] max-h-[1080px] bg-[#09090B] overflow-hidden text-white font-sans flex flex-col select-none outline-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
    >
      {/* Slides Container */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, i) => (
          <div 
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute inset-0 w-full h-full overflow-hidden bg-black"
          >
            {/* Image Container (Full Bleed Background) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              {/* Scaling Background Image */}
              <div 
                ref={(el) => { bgRefs.current[i] = el; }}
                className="absolute inset-0 w-full h-full transform-gpu origin-center"
              >
                <Image 
                  src={slide.image} 
                  alt={slide.title}
                  fill
                  priority={i === 0 || i === 1}
                  className="object-cover object-center"
                />
              </div>
              
              {/* Gradient/Dark overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 z-10 pointer-events-none" /> 
            </div>

            {/* Slide Content (Overlaid on image) */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:pl-24 lg:pr-24 z-20 pointer-events-none">
              <div className="mt-40 sm:mt-48 lg:mt-64 max-w-4xl">
                <h3 
                  ref={(el) => { titleRefs.current[i] = el; }}
                  className="text-3xl sm:text-5xl lg:text-[100px] font-medium leading-[1.1] lg:leading-[0.9] tracking-tight mb-3 sm:mb-6 lg:mb-8 opacity-0 text-[#FF5812] drop-shadow-2xl"
                >
                  {slide.title}
                </h3>
                <p 
                  ref={(el) => { descRefs.current[i] = el; }}
                  className="text-base sm:text-xl lg:text-3xl font-light text-white/90 leading-snug opacity-0 max-w-[90%] sm:max-w-2xl drop-shadow-xl"
                >
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Section Header (Static Overlay) */}
      <div className="absolute top-6 lg:top-12 left-6 sm:left-12 lg:left-24 z-30 pointer-events-none pr-6 max-w-[90%] lg:max-w-[50%]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5812]/10 border border-[#FF5812]/30 backdrop-blur-md text-[#FF5812] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-3 lg:mb-4">
          AGENTIC AI
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-3 lg:mb-4 text-white drop-shadow-lg leading-snug">
          MOVE BEYOND AI CHATBOTS. <br className="hidden lg:block" />
          <span className="text-[#FF5812]">Build AI That Can Think, Act, and Execute.</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-white/80 font-light drop-shadow-md">
          Agentic AI goes beyond generating responses. AI agents can understand goals, reason through problems, use tools, interact with systems, and execute multi-step workflows.
        </p>
      </div>

      {/* Bottom Navigation & Controls */}
      <div className="absolute bottom-6 lg:bottom-12 left-0 w-full px-6 sm:px-12 lg:px-24 z-30 flex flex-col gap-4 lg:gap-6">
        
        {/* Info Row: Chapter, Nav Buttons, Percentage */}
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="text-sm sm:text-base font-medium tracking-widest text-white/90 uppercase">
            <span ref={chapterRef}>{slides[0].number}</span>/{String(slides.length).padStart(2, '0')}
          </div>

          {/* Next/Prev Buttons */}
          <div className="flex items-center gap-3 z-50">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs lg:text-sm font-medium tracking-wider uppercase px-2 lg:px-4 text-white/90 hidden sm:block w-24 lg:w-32 text-center truncate">
              {slides[activeIndex].title}
            </div>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div 
            ref={progressRef}
            className="text-sm sm:text-base font-medium tracking-widest text-white/90"
          >
            {Math.round(1 / slides.length * 100)}%
          </div>
        </div>

        {/* Global Progress Bar Line */}
        <div className="w-full max-w-7xl mx-auto h-[2px] bg-white/20 relative rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full bg-white transition-none"
            style={{ width: `${1 / slides.length * 100}%` }}
          />
        </div>
        
      </div>
    </section>
  );
}
