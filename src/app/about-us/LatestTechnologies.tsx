// Reading this as: Tech capability showcase for B2B buyers, with a premium agency language, leaning toward a high-contrast editorial layout with a glassmorphic visual stage, a single static hero image, and Softree Orange accents.

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const technologies = [
  {
    title: "AI & Machine Learning",
    points: [
      "Predictive models & custom cognitive engines",
      "Natural language processing & semantic search",
      "Computer vision & image analysis pipelines"
    ],
    tagline: "Building custom cognitive engines to automate decision workflows."
  },
  {
    title: "Generative AI",
    points: [
      "Custom enterprise copilots & virtual assistants",
      "Large Language Model (LLM) fine-tuning & RAG systems",
      "Secure corporate knowledge base integrations"
    ],
    tagline: "Integrating secure LLMs and customized enterprise copilots."
  },
  {
    title: "Cloud Computing",
    points: [
      "Scalable application migrations & deployments",
      "Serverless architecture & microservices design",
      "Secure API management & hybrid cloud systems"
    ],
    tagline: "Scaling resilient cloud infrastructures for high-workload operations."
  },
  {
    title: "Data & Analytics",
    points: [
      "Real-time ETL data pipelines & warehouse setups",
      "Interactive Business Intelligence (BI) dashboards",
      "Advanced analytics & data lifecycle management"
    ],
    tagline: "Transforming pipeline datasets into predictive business insights."
  },
  {
    title: "Intelligent Automation",
    points: [
      "End-to-end Robotic Process Automation (RPA)",
      "Self-healing workflows & adaptive processes",
      "Business logic automation for legacy platforms"
    ],
    tagline: "Eliminating repetitive manual friction via intelligent processes."
  },
];

const AUTOPLAY_DURATION = 6000;

export default function LatestTechnologies() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [key, setKey] = useState(0); // Used to force reset the progress bar animation

  useEffect(() => {
    if (activeIndex === -1) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % technologies.length);
      setKey((prev) => prev + 1);
    }, AUTOPLAY_DURATION);

    return () => clearTimeout(timer);
  }, [activeIndex, key]);

  const handleItemClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(-1); // Allow closing the active item
      return;
    }
    setActiveIndex(index);
    setKey((prev) => prev + 1); // Reset timer and progress animation
  };

  return (
    <section className="w-full px-4 md:px-[60px] lg:px-[100px] py-10 md:py-14 bg-white">
      <div className="w-full max-w-7xl mx-auto rounded-[32px] overflow-hidden border border-zinc-200/60 shadow-[0_24px_80px_-16px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-stretch bg-white">
        
        {/* Left Panel - Glassmorphic Visual Stage */}
        <div className="relative w-full md:w-1/2 min-h-[320px] md:min-h-0 bg-zinc-950 overflow-hidden">
          {/* Static Hero Image with slow zoom transition on hover of the page section */}
          <div className="absolute inset-0 w-full h-full transition-transform duration-[4000ms] hover:scale-105">
            <Image
              src="/images/about/airobort.png"
              alt="Softree Technology Engineering"
              fill
              className="object-cover opacity-85"
              priority
            />
          </div>

          {/* Premium Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85 z-10 pointer-events-none" />

          {/* Top Label */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/95 text-[9px] font-semibold tracking-[0.2em] uppercase shadow-sm">
              CAPABILITIES
            </span>
          </div>

          {/* Bottom Glassmorphic Panel Overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 z-20">
            <div className="p-5 md:p-6 rounded-[20px] border border-white/10 bg-black/40 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_15px_30px_rgba(0,0,0,0.25)]">
              <div className="relative min-h-[95px] md:min-h-[105px] w-full">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex flex-col"
                  >
                    <span className="inline-block text-[#FF6B00] font-mono text-[9px] font-bold tracking-[0.2em] uppercase mb-1.5">
                      FEATURED TECH {activeIndex !== -1 && technologies[activeIndex] ? `// 0${activeIndex + 1}` : ""}
                    </span>
                    <h2 className="text-white text-lg lg:text-[22px] font-semibold leading-snug tracking-tight mb-1.5">
                      {activeIndex !== -1 && technologies[activeIndex] ? technologies[activeIndex].title : "Latest Technologies"}
                    </h2>
                    <p className="text-white/70 text-[11px] leading-relaxed max-w-[450px] font-medium">
                      {activeIndex !== -1 && technologies[activeIndex]
                        ? technologies[activeIndex].tagline
                        : "At Softree, we specialize in high-end development stacks empowering enterprise digital transformations."
                      }
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Editorial Accordion List */}
        <div className="w-full md:w-1/2 bg-white flex flex-col border-l border-zinc-100 relative h-auto">
          <div className="w-full relative">
            {/* Intro Header */}
            <div className="px-6 pt-8 pb-4 md:px-10 md:pt-8 md:pb-5 border-b border-zinc-100 mb-3">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 mb-1.5">
                Core Expertise
              </h3>
              <p className="text-zinc-800 text-[15px] md:text-[16px] leading-[1.6] font-normal">
                At Softree Technology, we build custom AI and software solutions that help businesses solve complex challenges, streamline operations, and accelerate digital transformation with secure, scalable technology.
              </p>
            </div>

            {/* Accordion List - Single Column List inside Unified Card with Dark Orange-Black Gradient */}
            <div className="mx-6 md:mx-10 mb-10 p-6 md:p-8 rounded-[24px] border border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-zinc-950 to-[#FF6B00]/10 shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
              <div className="flex flex-col w-full">
                {technologies.map((tech, index) => {
                  const isActive = activeIndex === index;
                  const formattedNumber = `0${index + 1} /`;
                  const isLast = index === technologies.length - 1;

                  return (
                    <div 
                      key={index} 
                      className="flex flex-col relative group transition-colors duration-300"
                    >
                      <button
                        onClick={() => handleItemClick(index)}
                        className="w-full flex items-center text-left py-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded-xl transition-transform duration-300 cursor-pointer"
                        aria-expanded={isActive}
                        aria-controls={`content-${index}`}
                      >
                        {/* Number Index */}
                        <span className="text-zinc-500 text-xs mr-3 font-mono tracking-wider flex-shrink-0 w-[32px] pt-[1px] transition-colors duration-300 group-hover:text-zinc-400">
                          {formattedNumber}
                        </span>
                        
                        {/* Title */}
                        <span className={`text-[14px] md:text-[15px] flex-grow pr-3 transition-all duration-300 group-hover:translate-x-1 ${
                          isActive ? 'text-[#FF6B00] font-semibold' : 'text-zinc-300 group-hover:text-white font-medium'
                        }`}>
                          {tech.title}
                        </span>

                        {/* Icon */}
                        <span className={`text-zinc-500 flex-shrink-0 transition-transform duration-300 ${isActive ? 'rotate-180 text-[#FF6B00]' : 'group-hover:text-zinc-300'}`}>
                          <ChevronDown size={16} strokeWidth={2} />
                        </span>
                      </button>

                      {/* Accordion Description with Framer Motion slide-down */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            id={`content-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <ul className="pl-[44px] pr-4 pb-4 space-y-2">
                              {tech.points.map((point, pIdx) => (
                                <li key={pIdx} className="flex items-start text-zinc-400 text-[13px] leading-relaxed">
                                  <span className="text-[#FF6B00] mr-2 mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Divider line under item (only when not the last item in the column) */}
                      {!isLast && (
                        <div className="w-full h-[1px] bg-zinc-800/60" />
                      )}

                      {/* Autoplay Progress Line (Softree Orange) */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-800/40 overflow-hidden z-10">
                          <div
                            key={key}
                            className="h-full bg-[#FF6B00]"
                            style={{
                              animation: `progress-fill ${AUTOPLAY_DURATION}ms linear forwards`,
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}} />
    </section>
  );
}
