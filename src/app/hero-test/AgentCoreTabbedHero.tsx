"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlowButton } from "@/components/ui/flow-button";
import TrustStrip from "@/components/sections/TrustStrip";

const tabs = [
  {
    id: 0,
    label: "AI DEVELOPMENT SERVICES",
    videoSrc: "/amazon-bedrock-agentcore-video/bg-video-6.mp4",
    bgClasses: "bg-black",
  },
  {
    id: 1,
    label: "AI CONSULTING SERVICES",
    videoSrc: "/amazon-bedrock-agentcore-video/bg-video-8.mp4",
    bgClasses: "bg-black",
  },
  {
    id: 2,
    label: "GENERATIVE AI DEVELOPMENT",
    videoSrc: "/amazon-bedrock-agentcore-video/bg-video-3.mp4",
    bgClasses: "bg-black",
  },
  {
    id: 3,
    label: "AI AGENTS DEVELOPMENT",
    videoSrc: "/amazon-bedrock-agentcore-video/bg-video-4.mp4",
    bgClasses: "bg-black",
  },
  {
    id: 4,
    label: "DOCUMENT AI SOLUTIONS",
    videoSrc: "/amazon-bedrock-agentcore-video/bg-video-5.mp4",
    bgClasses: "bg-black",
  },
];

const AUTOPLAY_INTERVAL = 8000; // 8 seconds per slide

export default function AgentCoreTabbedHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const rafRef = useRef<number | null>(null);

  const startTimer = () => {
    startTimeRef.current = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= AUTOPLAY_INTERVAL) {
        setDirection(1); // Autoplay is always forward
        setIsTransitioning(true);
        setActiveIndex((prev) => (prev + 1) % tabs.length);
        startTimeRef.current = Date.now();
      }
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateProgress);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex]);

  const handleTabClick = (index: number) => {
    if (index === activeIndex || isTransitioning) return;
    setDirection(index > activeIndex ? 1 : -1);
    setIsTransitioning(true);
    setActiveIndex(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const mediaVariants = {
    enter: (direction: number) => ({
      clipPath: direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
      zIndex: 1,
      x: "0%",
    }),
    center: {
      clipPath: "inset(0 0 0 0%)",
      zIndex: 1,
      x: "0%",
    },
    exit: (direction: number) => ({
      clipPath: "inset(0 0 0 0%)",
      zIndex: 0,
      x: direction > 0 ? "-15%" : "15%",
    }),
  };

  const textVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -40 : 40,
      opacity: 0,
    }),
  };
  const TRANSITION = { duration: 1.2, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] };

  return (
    <>
      <section className="relative w-full h-[100svh] min-h-[700px] max-h-[1080px] bg-[#05050a] overflow-hidden flex flex-col">

        {/* Preload videos to prevent flashes during AnimatePresence mounting */}
        <div className="hidden">
          {tabs.map((tab) => tab.videoSrc && <video key={tab.id} src={tab.videoSrc} preload="auto" />)}
        </div>

        {/* Dynamic Backgrounds */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={mediaVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={TRANSITION}
            onAnimationComplete={() => setIsTransitioning(false)}
            className={`absolute inset-0 ${tabs[activeIndex].bgClasses}`}
          >
            {tabs[activeIndex].videoSrc && (
              <video
                src={tabs[activeIndex].videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tech Grid Overlay for Premium Feel */}
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

        {/* Content Area - Synchronized with media transition */}
        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] flex-grow flex flex-col justify-center pt-20 md:pt-24 lg:pt-0 pb-6 sm:pb-12 md:pb-20 lg:pb-32">
          <div className="relative w-full grid" style={{ gridTemplateAreas: "'content'" }}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={TRANSITION}
                className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 md:gap-12 lg:gap-16 w-full mt-0 lg:mt-12"
                style={{ gridArea: "content" }}
              >
                {/* Left side: Heading */}
                <div className="lg:w-3/5 text-center lg:text-left flex flex-col items-center lg:items-start">
                  <h1 className="typo-title text-white">
                    Build Production-Ready AI Agents With Your <br className="hidden sm:block" />
                    <span className="italic text-[#FF5812] font-light">Offshore Engineering Partner</span>
                  </h1>
                </div>

                {/* Right side: Label, Description, & CTA */}
                <div className="lg:w-2/5 flex flex-col items-center lg:items-end text-center lg:text-right lg:pb-4">
                  <div className="mb-5 md:mb-6 inline-flex items-center gap-3 rounded-sm border border-white/10 bg-black/40 backdrop-blur-md px-4 py-2">
                    <span className="typo-caption text-[#FF5812] uppercase tracking-[0.2em]">
                      AMAZON BEDROCK AGENTCORE DEVELOPMENT
                    </span>
                    <div className="w-2 h-2 flex-shrink-0 bg-[#FF5812] animate-pulse shadow-[0_0_10px_rgba(255,88,18,0.5)]" />
                  </div>
                  <p className="typo-description text-slate-300 max-w-[28rem] mb-8 md:mb-10">
                    Build, deploy and operate AI agents that can reason, use tools, access enterprise data and take real business actions.
                  </p>
                  <FlowButton
                    href="/contact"
                    text="BUILD YOUR AI AGENT"
                    variant="orange-filled"
                    className="typo-button-lg uppercase shadow-[0_0_20px_rgba(255,107,44,0.3)] hover:shadow-[0_0_30px_rgba(255,107,44,0.5)] transform hover:-translate-y-1"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="relative z-20 w-full bg-black/50 backdrop-blur-xl border-t border-white/10 mt-auto">
          <div className="max-w-[1800px] mx-auto flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {tabs.map((tab, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(index)}
                  className={`relative flex-none lg:flex-1 w-full lg:w-auto lg:min-w-[200px] snap-start h-[64px] md:h-[80px] px-4 sm:px-6 md:px-8 items-center justify-center lg:justify-start text-center lg:text-left transition-all duration-500 group border-r border-white/10 last:border-r-0
                  ${isActive ? 'flex bg-gradient-to-t from-white/10 to-transparent' : 'hidden lg:flex hover:bg-white/5'}
                `}
                >
                  {/* Progress Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
                    {isActive && (
                      <motion.div
                        className="absolute top-0 left-0 bottom-0 bg-[#FF5812] shadow-[0_0_8px_rgba(255,88,18,0.6)]"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                      />
                    )}
                  </div>

                  <span className={`typo-nav uppercase transition-colors duration-300
                  ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/80'}
                `}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Strip anchored below hero */}
      <div className="relative z-20 w-full bg-[#05050a] pb-12 pt-4 border-t border-white/10">
        <div className="px-3 sm:px-5 lg:px-[1cm] max-w-[1800px] mx-auto">
          <TrustStrip theme="dark" />
        </div>
      </div>
    </>
  );
}
