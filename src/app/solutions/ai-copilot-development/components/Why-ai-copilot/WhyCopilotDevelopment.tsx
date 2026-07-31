"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const ACCENT = "#FF6B00";

const steps = [
  {
    step: "01",
    title: "Improve Employee Productivity",
    points: [
      "Reduce repetitive daily work",
      "Instant knowledge retrieval",
      "AI-powered task assistance",
      "Faster document creation",
    ],
  },
  {
    step: "02",
    title: "Intelligent Knowledge Retrieval",
    points: [
      "Search enterprise knowledge instantly",
      "Context-aware AI responses",
      "Microsoft 365 integration",
      "Natural language search",
    ],
  },
  {
    step: "03",
    title: "Automate Repetitive Tasks",
    points: [
      "Automate approvals",
      "Email generation",
      "Meeting summaries",
      "Business workflows",
    ],
  },
  {
    step: "04",
    title: "Faster Business Decisions",
    points: [
      "AI-generated insights",
      "Contextual recommendations",
      "Real-time data analysis",
      "Executive decision support",
    ],
  },
  {
    step: "05",
    title: "Personalized User Assistance",
    points: [
      "Employee Copilot",
      "HR Copilot",
      "IT Helpdesk Copilot",
      "Customer Support Copilot",
    ],
  },
  {
    step: "06",
    title: "Enterprise-Grade Security",
    points: [
      "Microsoft security",
      "Role-based access",
      "Compliance",
      "Secure enterprise data",
      "Governance controls",
    ],
  },
];

export function WhyCopilotDevelopment() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play logic
  useEffect(() => {
    if (isHovered) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    if (swipe < -50) {
      handleNext();
    } else if (swipe > 50) {
      handlePrev();
    }
  };

  const currentStep = steps[activeIndex];
  const isOrange = activeIndex % 2 === 1;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-16 md:py-24">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <div className="flex items-center justify-center gap-6 mb-6">
            <style>{`
              @keyframes line-stretch {
                0%, 100% { width: 40px; opacity: 0.6; }
                50% { width: 100px; opacity: 1; }
              }
              .animate-line-stretch {
                animation: line-stretch 3s ease-in-out infinite;
              }
            `}</style>
            <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute left-0 w-2 h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
            </div>
            <span className="text-[#FF5812] font-bold tracking-[0.2em] text-sm uppercase">WHY AI COPILOT DEVELOPMENT?</span>
            <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Build Intelligent <span className="text-[#FF6B00]">AI Copilots</span> for Enterprise Productivity
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Enterprise AI copilots help employees access knowledge faster, automate repetitive work, improve customer interactions, and securely integrate with Microsoft business applications.
          </p>
        </div>

        {/* Timeline Indicator */}
        <div className="relative mx-auto max-w-4xl mb-16">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2 z-0" />
          
          <div className="relative z-10 flex justify-between items-center overflow-x-auto py-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {steps.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className="group relative flex flex-col items-center justify-center min-w-[48px] focus:outline-none cursor-pointer"
                >
                  <motion.div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 shadow-sm ${
                      isActive
                        ? "bg-[#FF6B00] border-[#FF6B00]"
                        : "bg-white border-gray-200 group-hover:border-gray-300"
                    }`}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                  >
                    <span
                      className={`text-sm font-bold ${
                        isActive ? "text-white" : "text-gray-600 group-hover:text-gray-900"
                      }`}
                    >
                      {item.step}
                    </span>
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Area */}
        <div 
          className="relative mx-auto max-w-[1400px] px-0 sm:px-16 lg:px-24"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-100 shadow-lg text-gray-600 hover:text-[#FF6B00] hover:scale-110 transition-all duration-300 focus:outline-none hidden sm:flex"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-100 shadow-lg text-gray-600 hover:text-[#FF6B00] hover:scale-110 transition-all duration-300 focus:outline-none hidden sm:flex"
            aria-label="Next step"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative min-h-[420px] sm:min-h-[400px] w-full overflow-hidden px-2 py-4">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing px-2 py-2 flex gap-6 lg:gap-10"
              >
                {[activeIndex, (activeIndex + 1) % steps.length].map((cardIndex, idx) => {
                  const stepData = steps[cardIndex];
                  const cardIsOrange = cardIndex % 2 === 1;
                  const isSecondCard = idx === 1;

                  return (
                    <motion.div
                      key={cardIndex}
                      whileHover={{ y: -6 }}
                      className={`
                        w-full md:flex-1 h-full flex flex-col justify-center
                        rounded-[32px] p-8 sm:p-10
                        transition-all duration-300
                        ${isSecondCard ? "hidden md:flex" : "flex"}
                        ${
                          cardIsOrange
                            ? "bg-gradient-to-br from-[#FF6B00] to-[#e65a00] shadow-[0_15px_40px_rgba(255,107,0,0.3)] border border-white/10"
                            : "bg-white shadow-2xl shadow-gray-200/60 border border-gray-100"
                        }
                      `}
                    >
                      <h3
                        className={`text-2xl sm:text-3xl font-bold mb-8 tracking-tight ${
                          cardIsOrange ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {stepData.title}
                      </h3>

                      <ul className="grid grid-cols-1 gap-x-6 gap-y-5">
                        {stepData.points.map((point, pointIdx) => (
                          <li key={pointIdx} className="flex items-start gap-3">
                            <CheckCircle2
                              className={`mt-1 shrink-0 w-5 h-5 ${
                                cardIsOrange ? "text-white" : "text-[#FF6B00]"
                              }`}
                            />
                            <span
                              className={`text-base leading-relaxed ${
                                cardIsOrange ? "text-orange-50" : "text-gray-600"
                              }`}
                            >
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhyCopilotDevelopment;
