"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    number: "01",
    title: "Understand",
    badge: "CLINICAL CONTEXT ENGINE",
    description: "Interpret medical requests, clinical context, hospital rules, and patient objectives.",
    highlights: [
      "Clinical intent & symptom extraction",
      "EHR & patient history normalization",
      "Hospital policy & protocol verification"
    ],
    image: "/images/ai-healthcare-images/aihealth-1.png"
  },
  {
    number: "02",
    title: "Reason",
    badge: "MEDICAL REASONING ENGINE",
    description: "Analyze clinical information and determine the appropriate medical or administrative course of action.",
    highlights: [
      "Differential diagnostic guidance",
      "Multi-modal clinical data synthesis",
      "Evidence-based care protocol matching"
    ],
    image: "/images/ai-healthcare-images/aihealth-2.png"
  },
  {
    number: "03",
    title: "Plan",
    badge: "CLINICAL PATHWAY PLANNER",
    description: "Break complex care pathways or billing cycles into actionable steps.",
    highlights: [
      "Multi-step care pathway orchestration",
      "Prior authorization & billing rules",
      "Automated clinical triage logic"
    ],
    image: "/images/ai-healthcare-images/aihealth-3.png"
  },
  {
    number: "04",
    title: "Use Tools",
    badge: "SYSTEM INTEGRATION ENGINE",
    description: "Connect with EHRs, FHIR APIs, medical databases, and hospital enterprise systems.",
    highlights: [
      "Bidirectional Epic & Cerner integration",
      "FHIR / HL7 standardized exchange",
      "Diagnostic database & telemetry query"
    ],
    image: "/images/ai-healthcare-images/aihealth-1.png"
  },
  {
    number: "05",
    title: "Execute",
    badge: "WORKFLOW AUTOMATION ENGINE",
    description: "Perform administrative tasks and automate multi-step healthcare workflows.",
    highlights: [
      "Autonomous clinical documentation",
      "Automated order & prescription routing",
      "Care coordination & follow-up tasks"
    ],
    image: "/images/ai-healthcare-images/aihealth-2.png"
  },
  {
    number: "06",
    title: "Collaborate",
    badge: "MULTI-AGENT CONSENSUS",
    description: "Enable specialized clinical agents to work together across complex medical processes.",
    highlights: [
      "Specialized multi-agent consensus",
      "Physician-in-the-loop safeguards",
      "Cross-department care coordination"
    ],
    image: "/images/ai-healthcare-images/aihealth-3.png"
  },

];

export default function AgenticAIWipeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isAnimating = useRef(false);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

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
      } else {
        gsap.set(slide, { zIndex: 1, clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" });
        gsap.set(bgRefs.current[i], { scale: 1.1 });
      }
    });
  }, []);

  const goToSlide = useCallback((newIndex: number, direction: "next" | "prev" = "next") => {
    if (isAnimating.current || newIndex === activeIndex) return;

    isAnimating.current = true;

    const currentSlide = slideRefs.current[activeIndex];
    const nextSlide = slideRefs.current[newIndex];
    const nextBg = bgRefs.current[newIndex];

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        setActiveIndex(newIndex);
        if (currentSlide) gsap.set(currentSlide, { zIndex: 1 });
        if (nextSlide) {
          nextSlide.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
        }
      }
    });

    // Setup incoming slide layer over current slide
    if (nextSlide) gsap.set(nextSlide, { zIndex: 20 });
    if (currentSlide) gsap.set(currentSlide, { zIndex: 10 });

    // Smooth transition for card content
    if (cardRef.current) {
      tl.to(cardRef.current, {
        opacity: 0.3,
        y: direction === "next" ? -8 : 8,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setActiveIndex(newIndex);
        }
      }, 0);

      tl.fromTo(
        cardRef.current,
        { opacity: 0.3, y: direction === "next" ? 12 : -12 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.3
      );
    }

    if (direction === "next") {
      const proxy = { progress: 0 };
      if (nextBg) gsap.set(nextBg, { scale: 1.1 });

      tl.to(proxy, {
        progress: 100,
        duration: 0.9,
        ease: "power3.inOut",
        onUpdate: () => {
          const tl_val = 115 - (115 * proxy.progress) / 100;
          const bl_val = 100 - (115 * proxy.progress) / 100;
          if (nextSlide) {
            nextSlide.style.clipPath = `polygon(${tl_val}% 0%, 100% 0%, 100% 100%, ${bl_val}% 100%)`;
          }
        }
      }, 0);

      if (nextBg) {
        tl.to(nextBg, {
          scale: 1,
          duration: 0.9,
          ease: "power3.inOut"
        }, 0);
      }
    } else {
      const proxy = { progress: 0 };
      if (nextBg) gsap.set(nextBg, { scale: 1.1 });

      tl.to(proxy, {
        progress: 100,
        duration: 0.9,
        ease: "power3.inOut",
        onUpdate: () => {
          const tr_val = -15 + (115 * proxy.progress) / 100;
          const br_val = 0 + (115 * proxy.progress) / 100;
          if (nextSlide) {
            nextSlide.style.clipPath = `polygon(0% 0%, ${tr_val}% 0%, ${br_val}% 100%, 0% 100%)`;
          }
        }
      }, 0);

      if (nextBg) {
        tl.to(nextBg, {
          scale: 1,
          duration: 0.9,
          ease: "power3.inOut"
        }, 0);
      }
    }

    // Animate Counter & Progress Bar
    const counterProxy = { val: ((activeIndex + 1) / slides.length) * 100 };
    const targetVal = ((newIndex + 1) / slides.length) * 100;

    tl.to(counterProxy, {
      val: targetVal,
      duration: 0.9,
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

    tl.call(() => {
      if (chapterRef.current) {
        chapterRef.current.innerText = slides[newIndex].number;
      }
    }, [], 0.3);
  }, [activeIndex]);

  const nextSlide = useCallback(() => {
    goToSlide((activeIndex + 1) % slides.length, "next");
  }, [activeIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((activeIndex - 1 + slides.length) % slides.length, "prev");
  }, [activeIndex, goToSlide]);

  // Autoplay (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      if (!isAnimating.current) {
        nextSlide();
      }
    }, 4500);
    return () => clearInterval(timer);
  }, [activeIndex, isPaused, nextSlide]);

  // Swipe & Keyboard Handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

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

  const activeSlide = slides[activeIndex];

  return (
    <section
      className="relative w-full min-h-[640px] sm:min-h-[700px] lg:h-[calc(100vh-4rem)] max-h-[920px] bg-[#09090B] overflow-hidden text-white font-sans flex flex-col justify-between select-none outline-none py-5 sm:py-7 lg:py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
    >
      {/* Background Wipe Layers */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute inset-0 w-full h-full overflow-hidden bg-black"
          >
            {/* Scaling Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <div
                ref={(el) => { bgRefs.current[i] = el; }}
                className="absolute inset-0 w-full h-full transform-gpu origin-center"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={i === 0 || i === 1}
                  className="object-cover object-center sm:object-right"
                />
              </div>
              {/* Strategic gradient overlays: high contrast on left for content, clear view of doctor/visual on right */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/90 sm:via-[#09090B]/75 to-black/20 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-[#09090B]/60 z-10 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Foreground Content (Unified Left Stage) */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-[2cm] flex flex-col justify-between h-full pointer-events-auto">

        {/* Top: Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5812]/15 border border-[#FF5812]/35 backdrop-blur-md text-[#FF5812] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812] animate-pulse" />
            CLINICAL AGENTIC AI
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-extrabold font-['Plus_Jakarta_Sans',sans-serif] tracking-tight text-white drop-shadow-md leading-tight mb-2">
            Build Intelligent Clinical AI Agents for Healthcare
          </h2>
          <p className="text-xs sm:text-sm lg:text-[14.5px] text-white/75 font-normal leading-relaxed max-w-2xl">
            Build healthcare AI agents that go beyond generating answers. Our Clinical Agentic AI solutions understand clinical goals, reason across patient data, integrate with EHR systems, use healthcare tools, and execute complex, multi-step clinical workflows with intelligent automation.
          </p>
        </div>

        {/* Middle: Active Agentic Stage Glass Card */}
        <div className="my-auto py-3 max-w-2xl">
          <div
            ref={cardRef}
            className="bg-[#0C0D12]/85 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden transition-all duration-300 hover:border-white/25"
          >
            {/* Ambient orange glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#FF5812]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Card Header Row */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10 mb-3 sm:mb-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#FF5812]/15 border border-[#FF5812]/30 text-orange-400 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812] animate-pulse" />
                STEP {activeSlide.number} OF {String(slides.length).padStart(2, '0')}
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-white/50 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#FF5812]" />
                {activeSlide.badge}
              </span>
            </div>

            {/* Step Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-white tracking-tight mb-2">
              <span className="text-[#FF5812]">{activeSlide.number}.</span> {activeSlide.title}
            </h3>

            {/* Step Description */}
            <p className="text-xs sm:text-sm lg:text-[15px] text-white/85 leading-relaxed mb-4 font-normal">
              {activeSlide.description}
            </p>

            {/* Feature Highlights Grid */}
            <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeSlide.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 bg-white/[0.04] border border-white/[0.06] rounded-lg p-2 text-[11px] sm:text-xs text-white/80 leading-snug"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5812] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Step Navigator Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-3 overflow-x-auto no-scrollbar py-1">
            {slides.map((s, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx, idx > activeIndex ? "next" : "prev")}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${isActive
                      ? "bg-[#FF5812] text-white shadow-md shadow-[#FF5812]/30 font-bold border border-[#FF5812]"
                      : "bg-white/[0.06] hover:bg-white/[0.12] text-white/60 hover:text-white border border-white/10"
                    }`}
                >
                  {s.number} {s.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation & Controls */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between w-full max-w-5xl">
          {/* Slide Indicator */}
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-white/80 uppercase">
              <span ref={chapterRef} className="font-bold text-white">{activeSlide.number}</span> / {String(slides.length).padStart(2, '0')}
            </span>
            <span className="hidden sm:inline-block text-xs text-white/40 font-mono">|</span>
            <span className="hidden sm:inline-block text-xs font-mono text-orange-400">
              {activeSlide.title}
            </span>
          </div>

          {/* Center: Prev/Next Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous step"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next step"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Right: Progress percentage & bar */}
          <div className="flex items-center gap-3">
            <div className="w-20 sm:w-28 h-1 bg-white/15 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-[#FF5812] transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
              />
            </div>
            <span ref={progressRef} className="text-xs sm:text-sm font-mono font-bold text-white/90">
              {Math.round(((activeIndex + 1) / slides.length) * 100)}%
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
