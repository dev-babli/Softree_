"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, ArrowRight, TrendingUp, Target, Cpu, Activity } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export type CopilotCaseStudy = {
  id: string;
  industry: string;
  categories: string[];
  title: string;
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
  kpis: {
    value: string;
    label: string;
  }[];
  image: string;
  href: string;
};

export const caseStudiesData: CopilotCaseStudy[] = [
  {
    id: "healthcare",
    industry: "Healthcare",
    categories: ["Healthcare", "Healthcare Process Automation"],
    title: "Multi-Specialty Healthcare Network",
    description: "Softree streamlined Electronic Medical Records (EMR) workflows for a multi-specialty healthcare network using an AI Copilot, reducing manual record processing and improving approval efficiency.",
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
      { value: "↑ 70%", label: "Faster Information Retrieval" },
      { value: "↑ 55%", label: "Reduced Administrative Work" },
    ],
    image: "/images/ai-consulting-service-image/success-stories/how-1.png",
    href: "/case-studies/electronic-medical-records-workflow-automation",
  },
  {
    id: "hr",
    industry: "Human Resources",
    categories: ["Human Resources", "Corporate Services"],
    title: "HR Assistant Copilot Agent",
    description: "An AI-powered HR Assistant built on Microsoft Power Platform that automates employee onboarding, leave management, HR policy search, employee queries, and internal knowledge retrieval.",
    clientOverview: {
      name: "UK based Client",
      businessType: "Corporate Services",
      industry: "Human Resources",
      country: "United Kingdom"
    },
    problem: "HR personnel were overwhelmed by repetitive employee queries regarding policies, leave balances, and onboarding procedures.",
    solution: "An intelligent HR Copilot was integrated into Teams, allowing employees to ask natural language questions and instantly access HR systems.",
    results: "The Copilot successfully deflected over half of routine HR inquiries, freeing up the team to focus on strategic initiatives.",
    kpis: [
      { value: "↑ 75%", label: "HR Productivity" },
      { value: "↑ 65%", label: "Employee Satisfaction" },
    ],
    image: "/images/ai-consulting-service-image/success-stories/how-2.png",
    href: "/case-studies/how-an-enterprise-organization-automated-hr-operations-using-ai",
  },
  {
    id: "finance",
    industry: "Financial Services",
    categories: ["Financial Services", "AI Agents"],
    title: "ECG Group",
    description: "Softree built enterprise retrieval-augmented AI copilots with SharePoint indexing, entitlement-aware enterprise search, knowledge retrieval, and intelligent document access.",
    clientOverview: {
      name: "Germany based client",
      businessType: "Financial Consulting",
      industry: "Financial Services",
      country: "Australia"
    },
    problem: "Consultants struggled to find accurate, up-to-date financial compliance documents scattered across decades of SharePoint archives.",
    solution: "A custom Copilot was built using RAG to securely search and synthesize data across authorized SharePoint directories.",
    results: "Consultants can now retrieve exact compliance clauses and generate client-ready reports in a fraction of the time.",
    kpis: [
      { value: "↑ 65%", label: "Faster Decision Making" },
      { value: "↑ 45%", label: "Operational Efficiency" },
    ],
    image: "/images/ai-consulting-service-image/success-stories/how-3.png",
    href: "/case-studies/ecg-group-ai-copilot-transformation",
  },
  {
    id: "process-automation",
    industry: "Process Automation",
    categories: ["Process Automation", "AI Copilot"],
    title: "AI-Powered Process Discovery Copilot",
    description: "Built an AI-powered Process Discovery Copilot that identifies business bottlenecks, analyses operational processes, recommends automation opportunities, and accelerates digital transformation.",
    clientOverview: {
      name: "UAE Based Client",
      businessType: "Logistics & Supply Chain",
      industry: "Process Automation",
      country: "Canada"
    },
    problem: "Inefficient manual workflows and hidden operational bottlenecks were slowing down the global supply chain network.",
    solution: "We implemented an AI Copilot that automatically analyzes operational logs and suggests optimal automation pathways.",
    results: "The client gained unprecedented visibility into their processes, allowing them to eliminate bottlenecks proactively.",
    kpis: [
      { value: "↑ 50%", label: "Reduced Bottlenecks" },
      { value: "↑ 80%", label: "Process Visibility" },
    ],
    image: "/images/ai-consulting-service-image/success-stories/how-4.png",
    href: "/case-studies/ai-powered-process-discovery-copilot",
  },
  {
    id: "it",
    industry: "Information Technology",
    categories: ["Information Technology", "AI-Powered Task Management"],
    title: "AI-Powered Task Automation Using Copilot in Power Apps",
    description: "Developed an AI Copilot integrated with Microsoft Power Apps that automates repetitive tasks, streamlines approvals, enhances productivity, and reduces manual effort across enterprise workflows.",
    clientOverview: {
      name: "North America Client",
      businessType: "IT Operations",
      industry: "Information Technology",
      country: "Germany"
    },
    problem: "IT helpdesk staff were burdened by endless manual approval requests, password resets, and low-level ticket triage.",
    solution: "A Power Apps integrated Copilot was deployed to instantly categorize tickets, execute basic requests, and route complex issues.",
    results: "Helpdesk resolution times plummeted, and manual operational overhead was drastically reduced across the IT department.",
    kpis: [
      { value: "↑ 60%", label: "Task Automation" },
      { value: "↑ 40%", label: "Manual Effort Reduction" },
    ],
    image: "/images/ai-consulting-service-image/success-stories/how-5.png",
    href: "/case-studies/ai-powered-task-automation-copilot-power-apps",
  },
];

interface CardProps {
  story: CopilotCaseStudy;
  isActive: boolean;
}

const CopilotCaseStudyCard: React.FC<CardProps> = ({ story, isActive }) => {
  const [activeTab, setActiveTab] = useState<'PROBLEM' | 'SOLUTION' | 'RESULTS'>('PROBLEM');

  return (
    <motion.div
      animate={{
        scale: isActive ? 1.02 : 0.96,
        opacity: isActive ? 1 : 0.6,
        y: isActive ? -8 : 0,
        zIndex: isActive ? 20 : 0,
        boxShadow: isActive
          ? "0 30px 60px -15px rgba(255, 107, 0, 0.2)"
          : "0 10px 30px -5px rgba(0, 0, 0, 0.05)"
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 30,
        mass: 1,
      }}
      className="relative w-full rounded-[24px] bg-white group flex flex-col h-full"
    >
      {/* Animated Glowing Border for Active Card */}
      {isActive && (
        <>
          {/* Blurred Glow */}
          <div className="absolute -inset-[3px] rounded-[26px] overflow-hidden pointer-events-none z-0 blur-lg opacity-40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#FF6B00_360deg)]"
            />
          </div>
          {/* Sharp Border */}
          <div className="absolute -inset-[2px] rounded-[26px] overflow-hidden pointer-events-none z-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#FF6B00_360deg)]"
            />
          </div>
        </>
      )}

      {/* Main Card Content */}
      <div className="relative h-full w-full rounded-[24px] bg-white overflow-hidden flex flex-col border border-slate-100/80 z-10 transition-colors duration-300 group-hover:border-[#FF6B00]/20">

        {/* Top Image Banner */}
        <Link href={story.href} className="block relative w-full h-[150px] sm:h-[170px] overflow-hidden cursor-pointer shrink-0 group/img">
          <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 transition-transform duration-300 group-hover/img:-translate-y-1 group-hover/img:shadow-md border border-slate-100">
            <span className="text-[#FF6B00]">
              <TrendingUp className="w-3.5 h-3.5" />
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-800">{story.industry}</span>
          </div>
          <Image
            src={story.image}
            alt={story.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
          />
        </Link>

        {/* Content Area */}
        <div className="p-4 flex flex-col bg-white flex-grow">
          <h3 className="text-[17px] md:text-[19px] leading-tight font-bold text-slate-900 mb-2">{story.title}</h3>

          {/* Client Overview */}
          <div className="bg-slate-50/70 rounded-xl p-3 mb-3 border border-[#FF6B00]/30">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#FF6B00] mb-2">Client Overview</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-3">
              <div>
                <div className="text-[9px] font-bold tracking-wider text-[#94a3b8] uppercase mb-0.5">Name</div>
                <div className="text-[12px] font-semibold text-slate-800 leading-tight line-clamp-1">{story.clientOverview.name}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-wider text-[#94a3b8] uppercase mb-0.5">Business Type</div>
                <div className="text-[12px] font-semibold text-slate-800 leading-tight line-clamp-1">{story.clientOverview.businessType}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-wider text-[#94a3b8] uppercase mb-0.5">Industry</div>
                <div className="text-[12px] font-semibold text-slate-800 leading-tight line-clamp-1">{story.clientOverview.industry}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-wider text-[#94a3b8] uppercase mb-0.5">Country</div>
                <div className="text-[12px] font-semibold text-slate-800 leading-tight line-clamp-1">{story.clientOverview.country}</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex w-full border-b border-slate-100 mb-3">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('PROBLEM'); }}
              className={`flex-1 flex items-center justify-center gap-1 pb-1.5 border-b-2 transition-colors ${activeTab === 'PROBLEM' ? 'border-[#FF6B00] text-[#FF6B00]' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
            >
              <Target className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="text-[9.5px] font-bold tracking-widest uppercase">Problem</span>
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('SOLUTION'); }}
              className={`flex-1 flex items-center justify-center gap-1 pb-1.5 border-b-2 transition-colors ${activeTab === 'SOLUTION' ? 'border-[#FF6B00] text-[#FF6B00]' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
            >
              <Cpu className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="text-[9.5px] font-bold tracking-widest uppercase">Solution</span>
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('RESULTS'); }}
              className={`flex-1 flex items-center justify-center gap-1 pb-1.5 border-b-2 transition-colors ${activeTab === 'RESULTS' ? 'border-[#FF6B00] text-[#FF6B00]' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
            >
              <Activity className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="text-[9.5px] font-bold tracking-widest uppercase">Results</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-grow mb-3 min-h-[60px]">
            <p className="text-[13px] md:text-sm text-slate-500 leading-relaxed line-clamp-3">
              {activeTab === 'PROBLEM' && story.problem}
              {activeTab === 'SOLUTION' && story.solution}
              {activeTab === 'RESULTS' && story.results}
            </p>
          </div>


          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
            <span className="text-[11px] font-semibold text-slate-400">
              Softree Technology
            </span>
            <Link
              href={story.href}
              className="group/btn inline-flex items-center gap-1 text-[11px] font-bold text-[#FF6B00] hover:text-[#e55f00] transition-colors uppercase tracking-wider"
            >
              View story
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CopilotCaseStudies = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
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
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <section className="relative w-full bg-gradient-to-b from-zinc-50 via-white to-zinc-50 pt-10 pb-10 md:pt-16 md:pb-16 overflow-hidden">
      {/* Background decorations matching AI Consulting Services */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Dotted decorations */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.3 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 md:gap-6 mb-6">
            <div className="w-8 md:w-16 flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute left-0 w-2 h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
            </div>
            <span className="text-[#FF5812] font-bold tracking-[0.15em] md:tracking-[0.2em] text-[10px] sm:text-xs md:text-sm uppercase text-center">
              CLIENT SUCCESS STORIES
            </span>
            <div className="w-8 md:w-16 flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-[#111827]">
            AI Copilot Development{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C33] bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-base text-[15px] lg:text-[17px] text-[#6B7280]">
            Discover how organizations across industries transformed employee productivity, customer experiences, and business operations with custom AI copilots built by Softree using Microsoft Copilot Studio, Azure AI, and enterprise integrations.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-[1400px] mx-auto pb-12"
        >
          {/* Navigation Buttons (Desktop) */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 lg:-left-20 z-20 hidden xl:block">
            <button
              className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
              onClick={scrollPrev}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 lg:-right-20 z-20 hidden xl:block">
            <button
              className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
              onClick={scrollNext}
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-4">
              {caseStudiesData.map((story, index) => (
                <div
                  key={story.id}
                  className="flex-[0_0_90%] sm:flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_33%] xl:flex-[0_0_31%] min-w-0 pl-4 py-12"
                >
                  <CopilotCaseStudyCard
                    story={story}
                    isActive={index === selectedIndex}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dot Pagination */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex
                  ? "bg-[#FF6B00] w-8"
                  : "bg-gray-300 hover:bg-gray-400"
                  }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
