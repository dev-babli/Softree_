"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, ArrowRight, Activity, Cpu, Target, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface HealthcareCaseStudy {
  id: string;
  industryLabel: string;
  title: string;
  problem: string;
  solution: string;
  results: string[];
  imageUrl: string;
  caseStudyUrl: string;
  clientOverview: {
    name: string;
    industry: string;
    country: string;
    businessType: string;
  };
}

export const healthcareCaseStudiesData: HealthcareCaseStudy[] = [
  {
    id: "01",
    industryLabel: "HEALTHCARE",
    title: "LangGraph Patient Scheduling & Follow-Up Automation",
    problem:
      "Manual patient scheduling and follow-ups delayed responses, increased no-shows, and overloaded clinical staff.",
    solution:
      "LangGraph agents orchestrating scheduling, reminders, and follow-ups with clinical oversight and Epic/Cerner EHR tool integrations.",
    results: [
      "58% reduction in scheduling effort",
      "3.5x faster inquiry responses",
      "100% HIPAA compliant workflow",
    ],
    imageUrl: "/images/ai-development-services/success-stories/ai-healthcare-operations.png",
    caseStudyUrl:
      "https://www.softreetechnology.com/case-studies/ai-powered-patient-appointment-and-follow-up-automation",
    clientOverview: {
      name: "US Healthcare Provider",
      industry: "Healthcare",
      country: "United States",
      businessType: "Multi-Specialty Clinic Network",
    },
  },
  {
    id: "02",
    industryLabel: "CLINICAL AI",
    title: "AI Performance Intelligence & Biomarker Report Pipeline",
    problem:
      "Clinical research and lab testing required manual effort to review biomarker trends and assemble patient reports.",
    solution:
      "Softree engineered a multi-step healthcare AI pipeline that analyzes 125+ lab test biomarkers and produces clinical reports in minutes.",
    results: [
      "5 min audit completion",
      "100+ automated performance checks",
      "95%+ accuracy in AI models",
    ],
    imageUrl: "/images/ai-development-services/success-stories/ai-performance-report.png",
    caseStudyUrl:
      "https://www.softreetechnology.com/case-studies/ai-powered-website-performance-platform",
    clientOverview: {
      name: "Apex Health Systems",
      industry: "AI & Clinical Analytics",
      country: "United States",
      businessType: "Enterprise Clinical AI Provider",
    },
  },
  {
    id: "03",
    industryLabel: "TELEHEALTH",
    title: "HIPAA Patient Concierge & SMART on FHIR System",
    problem:
      "Patients waited hours for routine triage and policy questions across scattered clinical portals and email.",
    solution:
      "A RAG-grounded AI patient concierge with SMART on FHIR integration, scoped access to medical guidelines, and zero-retention data security.",
    results: [
      "Accelerated launch by 4 months",
      "Lower support ticket volume",
      "24/7 patient concierge coverage",
    ],
    imageUrl: "/images/ai-development-services/success-stories/hr-assistant.png",
    caseStudyUrl:
      "https://www.softreetechnology.com/case-studies/how-an-enterprise-organization-automated-hr-operations-using-ai",
    clientOverview: {
      name: "CareLine Telehealth",
      industry: "Telehealth & Digital Health",
      country: "United Kingdom",
      businessType: "Global Telehealth Platform",
    },
  },
];

const renderHighlightedText = (text: string) => {
  return text.split(/(\d+(?:\.\d+)?%?)/).map((part, i) =>
    /^\d+(?:\.\d+)?%?$/.test(part) ? <span key={i} className="text-[#FF5812] font-bold">{part}</span> : part
  );
};

export function HealthcareSuccessStoryCard({ story, isActive }: { story: HealthcareCaseStudy; isActive: boolean }) {
  const [activeTab, setActiveTab] = useState<"PROBLEM" | "SOLUTION" | "RESULTS">("PROBLEM");

  return (
    <motion.div
      animate={{
        scale: isActive ? 1 : 0.98,
        opacity: isActive ? 1 : 0.75,
        zIndex: isActive ? 20 : 0,
        boxShadow: isActive
          ? "0 30px 60px -15px rgba(255, 88, 18, 0.2)"
          : "0 10px 30px -5px rgba(0, 0, 0, 0.05)",
      }}
      transition={{ type: "spring", stiffness: 250, damping: 30, mass: 1 }}
      className="relative w-full rounded-[24px] bg-white group flex flex-col h-full"
    >
      {/* Active Card Glowing Border */}
      {isActive && (
        <>
          <div className="absolute -inset-[3px] rounded-[26px] overflow-hidden pointer-events-none z-0 blur-lg opacity-40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#FF5812_360deg)]"
            />
          </div>
          <div className="absolute -inset-[2px] rounded-[26px] overflow-hidden pointer-events-none z-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#FF5812_360deg)]"
            />
          </div>
        </>
      )}

      <div className="relative h-full w-full rounded-[24px] bg-white overflow-hidden flex flex-col border border-zinc-100 z-10 transition-colors duration-300 group-hover:border-[#FF5812]/20">
        {/* Top Image Banner */}
        <Link href={story.caseStudyUrl} className="block relative w-full h-[160px] sm:h-[180px] overflow-hidden cursor-pointer shrink-0 group/img">
          <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-xs flex items-center gap-2 border border-zinc-100">
            <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-800">{story.industryLabel}</span>
            <span className="text-[#FF5812]">
              <Activity className="w-3.5 h-3.5" />
            </span>
          </div>
          <Image
            src={story.imageUrl}
            alt={story.title}
            fill
            sizes="(max-width: 768px) 85vw, 32vw"
            className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
          />
        </Link>

        {/* Content Body */}
        <div className="p-5 flex flex-col bg-white flex-grow">
          <h3 className="text-[17px] md:text-[19px] leading-tight font-bold text-zinc-900 mb-3">{story.title}</h3>

          {/* Client Overview Card */}
          <div className="bg-zinc-50/80 rounded-xl p-3.5 mb-4 border border-[#FF5812]">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#FF5812] mb-2">
              Client Overview
            </h4>

            <div className="grid grid-cols-2 gap-y-2 gap-x-3">
              <div>
                <div className="text-[9px] font-bold tracking-wider text-zinc-400 uppercase mb-0.5">Name</div>
                <div className="text-[12px] font-semibold text-zinc-800 leading-tight">{story.clientOverview.name}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-wider text-zinc-400 uppercase mb-0.5">Industry</div>
                <div className="text-[12px] font-semibold text-zinc-800 leading-tight">{story.clientOverview.industry}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-wider text-zinc-400 uppercase mb-0.5">Country</div>
                <div className="text-[12px] font-semibold text-zinc-800 leading-tight">{story.clientOverview.country}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-wider text-zinc-400 uppercase mb-0.5">Business Type</div>
                <div className="text-[12px] font-semibold text-zinc-800 leading-tight">{story.clientOverview.businessType}</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex w-full border-b border-zinc-100 mb-3">
            <button
              onClick={(e) => { e.stopPropagation(); setActiveTab("PROBLEM"); }}
              className={`flex min-h-[44px] flex-1 items-center justify-center gap-1 border-b-2 py-2.5 transition-colors ${
                activeTab === "PROBLEM" ? "border-[#FF5812] text-[#FF5812]" : "border-transparent text-zinc-400 hover:text-zinc-600"
              }`}
            >
              <Target className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="text-[9.5px] font-bold tracking-widest uppercase">Problem</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveTab("SOLUTION"); }}
              className={`flex min-h-[44px] flex-1 items-center justify-center gap-1 border-b-2 py-2.5 transition-colors ${
                activeTab === "SOLUTION" ? "border-[#FF5812] text-[#FF5812]" : "border-transparent text-zinc-400 hover:text-zinc-600"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="text-[9.5px] font-bold tracking-widest uppercase">Solution</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveTab("RESULTS"); }}
              className={`flex min-h-[44px] flex-1 items-center justify-center gap-1 border-b-2 py-2.5 transition-colors ${
                activeTab === "RESULTS" ? "border-[#FF5812] text-[#FF5812]" : "border-transparent text-zinc-400 hover:text-zinc-600"
              }`}
            >
              <Activity className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="text-[9.5px] font-bold tracking-widest uppercase">Results</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-grow min-h-[90px] mb-4">
            <AnimatePresence mode="wait">
              {activeTab === "PROBLEM" && (
                <motion.div
                  key="problem"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-[14px] md:text-[15px] text-zinc-600 leading-[1.6] font-medium">{story.problem}</p>
                </motion.div>
              )}
              {activeTab === "SOLUTION" && (
                <motion.div
                  key="solution"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-[14px] md:text-[15px] text-zinc-600 leading-[1.6] font-medium">{story.solution}</p>
                </motion.div>
              )}
              {activeTab === "RESULTS" && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className="flex flex-col gap-2.5">
                    {story.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="mt-1 shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-[#FF5812]" strokeWidth={2.5} />
                        </div>
                        <span className="text-[14px] md:text-[15px] text-zinc-600 leading-[1.5] font-medium">{renderHighlightedText(result)}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Card CTA */}
          <div className="flex justify-center pt-4 border-t border-zinc-100 mt-auto">
            <Link
              href={story.caseStudyUrl}
              className="inline-flex items-center gap-2 text-[#FF5812] font-bold text-[14px] transition-all duration-300 hover:text-orange-600 group/cta"
            >
              <span>View Case Study</span>
              <div className="w-5 h-5 rounded-full bg-[#FF5812] text-white flex items-center justify-center transition-all duration-300 group-hover/cta:translate-x-1 shadow-xs">
                <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HealthcareSuccessStories() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <section id="healthcare-case-studies" className="relative w-full py-20 md:py-24 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 border-t border-zinc-100">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header (Reused exact layout from LangChain Development page) */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#FF5812] text-xs font-bold uppercase tracking-[0.2em] font-mono mb-3 block">
            SUCCESS STORIES & CASE STUDIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight mb-4">
            AI Healthcare <span className="text-[#FF5812]">Solutions & Business Impact</span>
          </h2>
          <p className="text-zinc-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            See how we transform clinical and operational challenges into measurable outcomes with intelligent AI Healthcare solutions.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-7xl mx-auto mt-4 md:mt-6 pb-12">
          {/* Navigation Buttons (Left & Right Centered) */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-6 md:-left-10 lg:-left-16 z-20 flex">
            <button
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center text-[#FF5812] hover:bg-[#FF5812] hover:text-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={scrollPrev}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5" />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-6 md:-right-10 lg:-right-16 z-20 flex">
            <button
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center text-[#FF5812] hover:bg-[#FF5812] hover:text-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={scrollNext}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Embla Carousel Track */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-4">
              {healthcareCaseStudiesData.map((story, index) => (
                <div
                  key={story.id}
                  className="flex-[0_0_90%] min-w-0 pl-4 sm:flex-[0_0_68%] md:flex-[0_0_48%] lg:flex-[0_0_33.33%] py-6"
                >
                  <HealthcareSuccessStoryCard story={story} isActive={index === selectedIndex} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-[#FF5812] w-8"
                    : "bg-zinc-300 hover:bg-zinc-400"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
