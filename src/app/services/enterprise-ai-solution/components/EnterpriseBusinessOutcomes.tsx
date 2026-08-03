"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  {
    step: "01",
    leftCard: {
      title: "Cost Reduction at Scale",
      points: [
        "Automate high-volume workflows",
        "Reduce operational overhead",
        "Optimize cloud AI infrastructure",
        "Lower customer support costs",
      ],
    },
    rightCard: {
      title: "Business Impact",
      points: [
        "Up to 40% reduction in OPEX",
        "Predictable LLM usage costs",
        "Faster task completion rates",
        "Maximized ROI on tech spend",
      ],
    }
  },
  {
    step: "02",
    leftCard: {
      title: "Enterprise Data Security",
      points: [
        "Private cloud deployments",
        "SOC2/GDPR compliance",
        "Role-based access controls",
        "No data leakage to public models",
      ],
    },
    rightCard: {
      title: "Business Impact",
      points: [
        "Zero intellectual property risk",
        "Strict regulatory compliance",
        "Safe handling of PII/PHI",
        "Trusted autonomous systems",
      ],
    }
  },
  {
    step: "03",
    leftCard: {
      title: "Precision RAG & Accuracy",
      points: [
        "Eliminate AI hallucinations",
        "Context-aware search systems",
        "Semantic caching layers",
        "Ground truth validation",
      ],
    },
    rightCard: {
      title: "Business Impact",
      points: [
        "99%+ factual accuracy",
        "Trusted decision making",
        "Reliable automated responses",
        "Higher customer satisfaction",
      ],
    }
  },
  {
    step: "04",
    leftCard: {
      title: "Legacy System Integration",
      points: [
        "Custom ERP/CRM connectors",
        "Secure API middleware",
        "Data ingestion pipelines",
        "Real-time sync architectures",
      ],
    },
    rightCard: {
      title: "Business Impact",
      points: [
        "Unified business intelligence",
        "No disruption to existing tools",
        "Extended lifespan of legacy systems",
        "Automated cross-platform workflows",
      ],
    }
  }
];

export default function EnterpriseBusinessOutcomes() {
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
    <section className="relative overflow-hidden bg-transparent py-12 md:py-16 lg:py-20">
      <div className="relative mx-auto max-w-350 px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
              <div className="absolute left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
            </div>
            <span className="text-[#FF5812] font-bold tracking-[0.2em] text-[11px] uppercase">
              ENTERPRISE OUTCOMES
            </span>
            <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
              <div className="absolute right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem]
 font-bold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Deliver Production-Ready AI <span className="text-[#FF5812]">With Real <br className="hidden md:block" /> Enterprise ROI</span>
          </h2>
          <p className="text-[15px] lg:text-[17px] text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Our Enterprise AI solutions move beyond prototypes, delivering secure, scalable, and compliant AI architectures that transform operations and drive significant cost savings.
          </p>
        </div>

        {/* Timeline Indicator */}
        <div className="relative mx-auto max-w-4xl mb-16">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2 z-0" />

          <div className="relative z-10 flex justify-between items-center overflow-x-auto py-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
            {steps.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className="group relative flex flex-col items-center justify-center min-w-12 focus:outline-none cursor-pointer"
                >
                  <motion.div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 shadow-sm ${isActive
                      ? "bg-[#FF6B00] border-[#FF6B00]"
                      : "bg-white border-gray-200 group-hover:border-gray-300"
                      }`}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                  >
                    <span
                      className={`text-sm font-bold ${isActive ? "text-white" : "text-gray-600 group-hover:text-gray-900"
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
          className="relative mx-auto max-w-350 px-0 sm:px-16 lg:px-24"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-100 shadow-lg text-gray-600 hover:text-[#FF6B00] hover:scale-110 transition-all duration-300 focus:outline-none hidden sm:flex"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-100 shadow-lg text-gray-600 hover:text-[#FF6B00] hover:scale-110 transition-all duration-300 focus:outline-none hidden sm:flex"
            aria-label="Next step"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative min-h-105 sm:min-h-100 w-full overflow-hidden px-2 py-4">
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
                        w-full md:flex-1 h-full flex-col justify-center
                        rounded-4xl p-8 sm:p-10
                        transition-all duration-300
                        ${isSecondCard ? "hidden md:flex" : "flex"}
                        ${cardIsOrange
                          ? "bg-linear-to-br from-[#FF6B00] to-[#e65a00] shadow-[0_15px_40px_rgba(255,107,0,0.3)] border border-white/10"
                          : "bg-white shadow-2xl shadow-gray-200/60 border border-gray-100"
                        }
                      `}
                    >
                      <h3
                        className={`text-2xl sm:text-3xl font-bold mb-8 tracking-tight ${cardIsOrange ? "text-white" : "text-gray-900"
                          }`}
                      >
                        {cardData.title}
                      </h3>

                      <ul className="grid grid-cols-1 gap-x-6 gap-y-5">
                        {cardData.points.map((point, pointIdx) => (
                          <li key={pointIdx} className="flex items-start gap-3">
                            <CheckCircle2
                              className={`mt-1 shrink-0 w-5 h-5 ${cardIsOrange ? "text-white" : "text-[#FF6B00]"
                                }`}
                            />
                            <span
                              className={`text-base leading-relaxed ${cardIsOrange ? "text-orange-50" : "text-gray-600"
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
