"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import SectionBadge from "./SectionBadge";

const steps = [
  {
    step: "01",
    leftCard: {
      title: "Custom AI Development",
      points: [
        "Tailored machine learning models",
        "End-to-end AI software engineering",
        "Secure AI architecture design",
        "Scalable cloud AI infrastructure",
      ],
    },
    rightCard: {
      title: "Business Impact",
      points: [
        "Unique competitive advantage",
        "High ROI on AI investments",
        "Seamless enterprise integration",
        "Future-proof technology stack",
      ],
    }
  },
  {
    step: "02",
    leftCard: {
      title: "AI Integration & Deployment",
      points: [
        "Seamless API integrations",
        "Legacy system modernization",
        "Third-party AI model embedding",
        "CI/CD pipelines for ML models",
      ],
    },
    rightCard: {
      title: "Business Impact",
      points: [
        "Reduced time-to-market",
        "Zero business disruption",
        "Enhanced system capabilities",
        "Scalable operational workflows",
      ],
    }
  },
  {
    step: "03",
    leftCard: {
      title: "Generative AI Solutions",
      points: [
        "Custom LLM fine-tuning",
        "Enterprise RAG architectures",
        "Conversational AI & Chatbots",
        "Automated content generation",
      ],
    },
    rightCard: {
      title: "Business Impact",
      points: [
        "Elevated customer experiences",
        "10x content production speed",
        "24/7 intelligent support",
        "Deep institutional knowledge retrieval",
      ],
    }
  },
  {
    step: "04",
    leftCard: {
      title: "Dedicated AI Engineering Teams",
      points: [
        "Top-tier AI/ML developers",
        "Flexible offshore engagement",
        "Agile delivery methodology",
        "Strict IP & data security",
      ],
    },
    rightCard: {
      title: "Business Impact",
      points: [
        "Reduced development costs",
        "On-demand technical scalability",
        "Guaranteed project delivery",
        "Zero recruitment overhead",
      ],
    }
  },
  {
    step: "05",
    leftCard: {
      title: "AI Strategy & Consulting",
      points: [
        "Comprehensive AI readiness audits",
        "Data governance frameworks",
        "Use-case prioritization",
        "Technology stack selection",
      ],
    },
    rightCard: {
      title: "Business Impact",
      points: [
        "Clear AI implementation roadmap",
        "Minimized investment risks",
        "Strategic organizational alignment",
        "Measurable business KPIs",
      ],
    }
  },
  {
    step: "06",
    leftCard: {
      title: "Advanced Data Analytics & ML",
      points: [
        "Predictive analytics modeling",
        "Computer vision applications",
        "Natural language processing",
        "Real-time data processing",
      ],
    },
    rightCard: {
      title: "Business Impact",
      points: [
        "Data-driven decision making",
        "Automated quality control",
        "Deep market intelligence",
        "Proactive risk management",
      ],
    }
  }
];

export default function BusinessOutcomes() {
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

  const handleDragEnd = (e: any, { offset }: any) => {
    const swipe = offset.x;
    if (swipe < -50) {
      handleNext();
    } else if (swipe > 50) {
      handlePrev();
    }
  };

  const currentStep = steps[activeIndex];

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
          <SectionBadge text="BUSINESS OUTCOMES" variant="line" />
          <h2 className="text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-2 md:mb-3 tracking-tight text-center leading-tight">
            Enterprise <span className="text-[#FF5812]">AI Development Services</span> <br className="hidden md:block" /> for Measurable Growth
          </h2>
          <p className="text-[15px] lg:text-base text-[#6B7280] mb-6 lg:mb-8 text-center max-w-2xl mx-auto leading-relaxed">
            As a premier AI development company, Softree Technology partners with enterprises to build, integrate, and scale custom artificial intelligence solutions that drive operational efficiency and create lasting competitive advantages.
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
                {[0, 1].map((idx) => {
                  const isSecondCard = idx === 1;
                  const cardData = isSecondCard ? currentStep.rightCard : currentStep.leftCard;
                  const cardIsOrange = idx === 0;

                  return (
                    <motion.div
                      key={idx}
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
                        {cardData.title}
                      </h3>

                      <ul className="grid grid-cols-1 gap-x-6 gap-y-5">
                        {cardData.points.map((point, pointIdx) => (
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
