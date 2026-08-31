"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, AlertCircle, Lightbulb, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudySlide {
  id: string;
  industry: string;
  categories: string[];
  title: React.ReactNode;
  description: string;
  clientOverview: {
    name: string;
    businessType: string;
    industry: string;
    country: string;
  };
  problem: string;
  solution: string;
  results: string;
  kpis: { value: string; label: string }[];
  image: string;
  href: string;
}

const caseStudySlides: CaseStudySlide[] = [
  {
    id: "healthcare-intelligence",
    industry: "Healthcare",
    categories: ["Healthcare", "HEALTHCARE ANALYTICS"],
    title: <>Healthcare Patient <span className="text-[#FF5812]">Intelligence Platform</span></>,
    description: "Built an AI-powered healthcare intelligence platform that reduced claims denials from 18% to under 4% while improving overall patient data visibility.",
    clientOverview: {
      name: "Confidential Client",
      businessType: "Healthcare Provider",
      industry: "Healthcare",
      country: "United States"
    },
    problem: "High claims denial rates and scattered patient data were causing revenue leakage and poor intelligence reporting.",
    solution: "Developed a comprehensive healthcare analytics platform driven by AI to predict and prevent claims denials before submission.",
    results: "Reduced claims denials significantly and provided real-time dashboard analytics for hospital administrators.",
    kpis: [
      { value: "↓ 18%", label: "Claims Denial Reduction" },
      { value: "↑ 40%", label: "Data Processing Speed" },
    ],
    image: "/images/ai-healthcare-images/aihealth-1.png",
    href: "/case-studies/healthcare-patient-intelligence-platform",
  },
  {
    id: "patient-appointment-automation",
    industry: "Healthcare",
    categories: ["Healthcare", "AI AGENTS"],
    title: <>AI-Powered Patient Appointment <span className="text-[#FF5812]">& Follow-Up Automation</span></>,
    description: "Implemented an AI-powered patient engagement platform that reduced scheduling effort by 58% and improved patient inquiry response times by over 70%.",
    clientOverview: {
      name: "Confidential Clinic",
      businessType: "Healthcare Services",
      industry: "Healthcare",
      country: "United States"
    },
    problem: "Staff were overwhelmed with manual appointment scheduling and answering routine patient inquiries, leading to delayed responses.",
    solution: "Deployed an autonomous AI agent to handle end-to-end patient scheduling, reminders, and basic follow-up inquiries.",
    results: "Drastically reduced the administrative burden on front-desk staff while improving the overall patient booking experience.",
    kpis: [
      { value: "↓ 58%", label: "Faster Appointment Scheduling" },
      { value: "↑ 70%", label: "Improved Response Times" },
    ],
    image: "/images/ai-healthcare-images/aihealth-2.png",
    href: "/case-studies/ai-powered-patient-appointment-and-follow-up-automation",
  },
  {
    id: "multi-specialty-network",
    industry: "Healthcare",
    categories: ["Healthcare", "PROCESS AUTOMATION"],
    title: <>Multi-Specialty <span className="text-[#FF5812]">Healthcare Network</span></>,
    description: "Softree streamlined Electronic Medical Records (EMR) workflows for a multi-specialty healthcare network, cutting manual record processing by 75% and speeding up approval cycles by 65%.",
    clientOverview: {
      name: "USA based client",
      businessType: "Healthcare Services",
      industry: "Healthcare",
      country: "United States"
    },
    problem: "Manual referral management and insurance pre-authorizations were creating long wait times for patients and high administrative overhead.",
    solution: "We deployed a secure, HIPAA-compliant AI Copilot that automatically extracts patient data and processes authorizations directly within the EMR system.",
    results: "Wait times for pre-authorizations dropped from days to minutes, significantly improving patient care and staff productivity.",
    kpis: [
      { value: "↓ 75%", label: "Reduction in Manual Processing" },
      { value: "↑ 65%", label: "Faster Approval Cycles" },
    ],
    image: "/images/ai-healthcare-images/aihealth-3.png",
    href: "/case-studies/electronic-medical-records-workflow-automation",
  }
];

export function WhyChooseHealthAISection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % caseStudySlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + caseStudySlides.length) % caseStudySlides.length);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % caseStudySlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const slide = caseStudySlides[currentSlide];

  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop"
          alt="Background"
          fill
          className="object-cover grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/90 via-white/70 to-zinc-50/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        <div className="relative">
          <button
            onClick={handlePrev}
            aria-label="Previous Case Study"
            className="absolute -left-4 sm:-left-6 md:-left-8 lg:-left-12 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black border border-[#333333] shadow-xl flex items-center justify-center text-[#FF5812] hover:bg-[#FF5812] hover:text-white hover:border-[#FF5812] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Case Study"
            className="absolute -right-4 sm:-right-6 md:-right-8 lg:-right-12 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black border border-[#333333] shadow-xl flex items-center justify-center text-[#FF5812] hover:bg-[#FF5812] hover:text-white hover:border-[#FF5812] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          <div className="bg-[#000000] border border-[#422F26] rounded-[32px] p-6 sm:p-10 md:p-12 lg:p-14 shadow-2xl relative overflow-hidden min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 sm:mb-12">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5812]/10 border border-[#FF5812]/30 text-[#FF5812] text-xs font-semibold tracking-wider uppercase mb-3">
                      <span>{slide.categories[1]}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold tracking-tight text-white leading-[1.25] max-w-2xl">
                      {slide.title}
                    </h2>
                  </div>

                  <Link
                    href={slide.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF5812] hover:bg-white text-white hover:text-black font-bold text-sm sm:text-base transition-all duration-300 shadow-md shrink-0 self-start group mt-1"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                    {[
                      { icon: AlertCircle, title: "The Challenge", description: slide.problem },
                      { icon: Lightbulb, title: "The Solution", description: slide.solution },
                      { icon: TrendingUp, title: "The Results", description: slide.results }
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      const isFirst = idx === 0;
                      return (
                        <div
                          key={idx}
                          className={`border rounded-2xl p-5 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-lg hover:-translate-y-1 group/card min-h-[220px] ${
                            isFirst
                              ? "bg-[#FF5812] border-[#FF5812] hover:border-white/40"
                              : "bg-black border-[#333333] hover:border-[#FF5812]/50"
                          }`}
                        >
                          <div>
                            <div
                              className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 shadow-inner transition-all duration-300 group-hover/card:scale-105 ${
                                isFirst
                                  ? "bg-white/20 border border-white/30 text-white group-hover/card:bg-white group-hover/card:text-[#FF5812]"
                                  : "bg-[#111111] border border-[#333333] text-[#FF5812] group-hover/card:bg-[#FF5812] group-hover/card:text-white group-hover/card:border-[#FF5812]"
                              }`}
                            >
                              <Icon size={22} className="transition-colors duration-300" />
                            </div>
                            <h3 className="text-base sm:text-[17px] font-bold text-white mb-2.5 tracking-tight leading-snug">
                              {item.title}
                            </h3>
                            <p
                              className={`text-xs sm:text-[13px] leading-relaxed font-normal transition-colors duration-300 ${
                                isFirst ? "text-white/90" : "text-gray-300"
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[350px] sm:min-h-[380px] flex flex-col justify-end p-6 sm:p-8 border border-[#FF5812]/40 shadow-[0_0_15px_rgba(255,88,18,0.2)] group bg-black">
                    <Image
                      src={slide.image}
                      alt={slide.clientOverview.name}
                      fill
                      className="object-cover brightness-90 contrast-105 transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 35vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                      <blockquote className="text-xs sm:text-sm md:text-base text-white/95 font-medium leading-relaxed italic drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] mb-4">
                        “{slide.description}”
                      </blockquote>
                      <div className="text-[#FF5812] font-bold text-sm">
                        {slide.clientOverview.name}
                      </div>
                      <div className="text-white/70 text-xs mt-1">
                        {slide.clientOverview.businessType}, {slide.clientOverview.country}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center items-center gap-2.5 mt-8 sm:mt-10 relative z-20">
              {caseStudySlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide
                      ? "w-8 bg-[#FF5812]"
                      : "w-2.5 bg-[#333333] hover:bg-[#FF5812]/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


