"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useScroll, useMotionValueEvent } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SolutionCard {
  number: string;
  title: string;
  description: string;
  image: string;
  items: string[];
  buttonLink: string;
}

const solutionsData: SolutionCard[] = [
  {
    number: "01",
    title: "AI Copilot Development",
    description: "Build intelligent copilots that understand context, automate workflows, and enhance productivity across your organization.",
    image: "/images/ai-development-service/aicard-1.png",
    items: [
      "Microsoft 365 Copilot Custom Development",
      "Copilot Studio Development & Integration",
      "Custom AI Copilots for Business Workflows",
      "Context-Aware AI Assistants & Automation",
      "Multi-Turn Conversational AI Solutions"
    ],
    buttonLink: "/solutions/ai-copilot-development"
  },
  {
    number: "02",
    title: "Generative AI Development",
    description: "Harness foundational models to generate high-quality text, images, code, and synthetic data for specialized enterprise tasks.",
    image: "/images/ai-development-service/aicard-2.png",
    items: [
      "Custom LLM Development & Fine-Tuning",
      "Generative AI Application Development",
      "Multimodal AI for Text, Vision & Audio",
      "Prompt Engineering & LLM Optimization",
      "Enterprise Generative AI Integration"
    ],
    buttonLink: "/services/generative-ai"
  },
  {
    number: "03",
    title: "Enterprise RAG Development",
    description: "Empower your workforce with Retrieval-Augmented Generation to securely interact with internal enterprise knowledge bases.",
    image: "/images/ai-development-service/aicard-3.png",
    items: [
      "Retrieval-Augmented Generation Development",
      "Vector & Semantic Search Solutions",
      "AI Knowledge Bases & Enterprise Search",
      "Document Intelligence & Knowledge Extraction",
      "Secure RAG Architecture & Data Integration"
    ],
    buttonLink: "/solutions/enterprise-rag-development"
  },
  {
    number: "04",
    title: "AI Consulting Service",
    description: "Navigate the complexities of AI adoption with expert guidance, ensuring strategic alignment and measurable ROI.",
    image: "/images/ai-development-services/step-1.jpg",
    items: [
      "AI Strategy & Digital Transformation",
      "AI Readiness & Maturity Assessment",
      "AI Use Case Discovery & Prioritization",
      "LLM & Technology Selection",
      "AI Roadmap, Governance & ROI Strategy"
    ],
    buttonLink: "/services/ai-consulting-services"
  },
  {
    number: "05",
    title: "AI Chatbot Development",
    description: "Deploy omnichannel conversational agents that provide human-like customer support and automate routine interactions.",
    image: "/images/ai-development-services/step-2.jpg",
    items: [
      "Custom AI Chatbot Development",
      "Conversational AI & Virtual Assistants",
      "Omnichannel Customer Support Chatbots",
      "CRM, ERP & Business System Integration",
      "Multilingual & Voice-Enabled AI Chatbots"
    ],
    buttonLink: "/services/ai-chatbot-development"
  },
  {
    number: "06",
    title: "Multi Agent System",
    description: "Design autonomous collaborative networks of AI agents that dynamically plan, execute, and evaluate complex workflows.",
    image: "/images/ai-development-services/step-3.jpg",
    items: [
      "Multi-Agent System Architecture",
      "Autonomous AI Agent Development",
      "Agentic Workflow Automation",
      "AI Agent Orchestration & Task Routing",
      "Agent Memory, Evaluation & Self-Correction"
    ],
    buttonLink: "/services/multi-agent-systems-development"
  },
  {
    number: "07",
    title: "AI Agent Development Services",
    description:
      "Develop autonomous AI agents capable of reasoning, using tools, accessing business data, executing tasks, and adapting to dynamic workflows.",
    items: [
      "Custom AI Agent Development",
      "Autonomous Task Automation",
      "Tool-Using AI Agents & API Integration",
      "Agent Memory & Context Management",
      "Production AI Agent Deployment"
    ],
    buttonLink: "/services/ai-agent-development"
  },
  {
    number: "08",
    title: "Machine Learning Development Services",
    description:
      "Build custom machine learning solutions that turn business data into predictive insights, intelligent recommendations, and automated decision-making.",
    items: [
      "Custom Machine Learning Models",
      "Predictive Analytics & Forecasting",
      "ML Model Training & Optimization",
      "Recommendation & Classification Systems",
      "Machine Learning Deployment & MLOps"
    ],
    buttonLink: "/services/machine-learning"
  },
  {
    number: "09",
    title: "Computer Vision Development Services",
    description:
      "Develop computer vision solutions that analyze images and video to automate visual inspection, recognition, detection, and document processing.",
    items: [
      "AI Image Recognition & Classification",
      "Object Detection & Tracking",
      "OCR & Intelligent Document Processing",
      "Video Analytics & Visual Inspection",
      "Custom Computer Vision Models"
    ],
    buttonLink: "/services/computer-vision"
  },
  {
    number: "10",
    title: "Natural Language Processing Services",
    description:
      "Transform unstructured text and language data into actionable intelligence using NLP models for understanding, classification, extraction, and automation.",
    items: [
      "NLP Model Development & Integration",
      "Text Classification & Information Extraction",
      "Sentiment & Intent Analysis",
      "Named Entity Recognition & Text Mining",
      "Document & Language Intelligence"
    ],
    buttonLink: "/services/natural-language-processing"
  },
  {
    number: "11",
    title: "AI Integration & Automation Services",
    description:
      "Integrate AI capabilities into existing applications and business workflows to automate repetitive processes, improve productivity, and accelerate operations.",
    items: [
      "AI API & Application Integration",
      "Intelligent Business Process Automation",
      "CRM, ERP & Enterprise System Integration",
      "AI-Powered Workflow Automation",
      "Custom AI & Third-Party Integrations"
    ],
    buttonLink: "/services/ai-integration"
  },
  {
    number: "12",
    title: "MLOps & AI Deployment Services",
    description:
      "Deploy, monitor, optimize, and scale AI and machine learning models with reliable infrastructure, automated pipelines, governance, and lifecycle management.",
    items: [
      "AI Model Deployment & Productionization",
      "LLMOps & MLOps Implementation",
      "Model Monitoring & Performance Optimization",
      "Cloud AI Infrastructure & Scaling",
      "AI Security & Lifecycle Management"
    ],
    buttonLink: "/services/mlops"
  }
];

const DecorativeLayers = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-visible hidden lg:block">
      {/* Purple layer (Back) */}
      <div className="absolute top-0 right-0 w-full max-w-[620px] h-[720px] bg-[#E5D9F2] rounded-[32px] translate-x-12 -translate-y-12 rotate-[6deg] opacity-100 origin-bottom-right shadow-sm" />
      {/* Green layer (Middle) */}
      <div className="absolute top-0 right-0 w-full max-w-[620px] h-[720px] bg-[#D1F2D9] rounded-[32px] translate-x-8 -translate-y-8 rotate-[4deg] opacity-100 origin-bottom-right shadow-sm" />
      {/* Orange layer (Front-ish) */}
      <div className="absolute top-0 right-0 w-full max-w-[620px] h-[720px] bg-[#FFE5D9] rounded-[32px] translate-x-4 -translate-y-4 rotate-[2deg] opacity-100 origin-bottom-right shadow-sm" />
    </div>
  );
};

const ActiveCard = ({ solution }: { solution: SolutionCard }) => {
  return (
    <div className="w-full max-w-[680px] h-full bg-[#0B0F19] rounded-[20px] lg:rounded-[32px] flex flex-col overflow-hidden relative z-10 border border-white/5 mx-auto">
      <div className="p-4 lg:p-8 flex-1 flex flex-col justify-start relative z-10 overflow-hidden">
        {/* Top Badge */}
        <div className="mb-2 lg:mb-3">
          <span className="inline-flex items-center justify-center w-8 h-5 lg:w-14 lg:h-8 rounded-full border border-white/10 text-[#FF6B2C] font-semibold text-[9px] lg:text-sm bg-white/5">
            {solution.number}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-[17px] sm:text-xl lg:text-[28px] font-extrabold text-white mb-1.5 lg:mb-2 leading-tight">
          {solution.title}
        </h3>
        
        {/* Description - Hidden on mobile to save vertical space */}
        <p className="hidden lg:block text-gray-300/90 text-[14px] leading-relaxed mb-3 max-w-[95%]">
          {solution.description}
        </p>

        {/* Divider */}
        <div className="hidden lg:block h-px w-full bg-white/10 mb-3" />

        {/* Capabilities List - Truncated on extra-small mobile only */}
        <ul className="space-y-1.5 lg:space-y-2.5 mb-2 lg:mb-3 overflow-hidden pr-2">
          {solution.items.map((item, i) => (
            <li key={i} className={`flex items-start gap-1.5 lg:gap-3 ${i >= 3 ? "hidden sm:flex" : ""}`}>
              <Check className="w-3 lg:w-5 h-3 lg:h-5 text-[#FF6B2C] shrink-0 mt-0.5" />
              <span className="text-[11px] sm:text-[12px] lg:text-[14px] text-gray-200/90 font-medium leading-tight lg:leading-snug">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Explore Link */}
        <Link 
          href={solution.buttonLink}
          className="inline-flex items-center gap-1.5 lg:gap-2 text-[#FF6B2C] font-bold text-[11px] sm:text-[12px] lg:text-[14px] hover:text-white transition-colors duration-200 w-max group mt-1 relative z-20"
        >
          Explore Service
          <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      {/* Large Image Area */}
      <div className="w-full flex-1 min-h-[150px] lg:flex-none lg:h-[220px] relative">
         <Image 
           src={solution.image}
           alt={solution.title}
           fill
           className="object-cover object-top lg:object-center opacity-80"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-[#0B0F19]/60 to-transparent h-16" />
      </div>
    </div>
  );
};

const AnimatedCard = ({ 
  solution, 
  index, 
  totalCards, 
  scrollYProgress 
}: { 
  solution: SolutionCard; 
  index: number; 
  totalCards: number; 
  scrollYProgress: any;
}) => {
  const cardProgress = useTransform(scrollYProgress, [0, 1], [0, totalCards - 1]);
  const offset = useTransform(cardProgress, (cp) => index - cp);

  // Active card is at 0. 
  // When passed (-1), it slides DOWN all the way off the screen.
  // When waiting (1), it stays at 0 (hidden exactly behind active card).
  const translateY = useTransform(offset, (o) => {
    if (o < 0) {
      return `${Math.abs(o) * 800}px`;
    }
    return "0px";
  });

  // No fading needed! The top card physically slides off, revealing the solid card below.
  const opacity = useTransform(offset, (o) => {
    if (o > 1.5) return 0; // Hide deep stack items
    return 1;
  });

  const scale = useTransform(offset, (o) => {
    if (o < 0) {
      return 1 + (Math.abs(o) * 0.05); // slight pop-up effect as it slides off
    }
    return 1;
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "100%",
        height: "100%",
        translateY,
        scale,
        opacity,
        zIndex: 100 - index,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      className="will-change-transform"
    >
      <ActiveCard solution={solution} />
    </motion.div>
  );
};

export default function DigitalEngineeringSolutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const progress = latest * (solutionsData.length - 1);
    const index = Math.round(progress);
    if (index !== activeIndex && index >= 0 && index < solutionsData.length) {
      setActiveIndex(index);
    }
  });

  const scrollToIndex = (idx: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    
    const containerHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    
    const scrollableDistance = containerHeight - viewportHeight;
    const targetProgress = idx / (solutionsData.length - 1);
    
    const targetScrollY = containerTop + (scrollableDistance * targetProgress);
    
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth"
    });
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-white font-sans"
      style={{ height: `${solutionsData.length * 90}vh` }} 
    >
      <div className="sticky top-0 w-full h-[100dvh] lg:h-screen flex flex-col justify-start overflow-hidden bg-white">
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full h-full flex flex-col lg:flex-row items-center gap-4 lg:gap-12 pt-6 pb-2 lg:pt-[6vh] lg:pb-[2vh]">
          
          {/* Left Column (Content & Navigation) */}
          <div className="w-full lg:w-[45%] flex flex-col lg:h-full shrink-0 lg:justify-center">
            <div className="bg-white border border-gray-100 shadow-sm px-2.5 py-1 lg:px-3 lg:py-1 rounded-full mb-1.5 lg:mb-2 inline-block w-max">
              <span className="text-[9px] lg:text-[10px] font-bold text-[#FF6B2C] tracking-widest uppercase">
                SOLUTIONS PORTFOLIO
              </span>
            </div>

            <h2 className="text-[22px] sm:text-[28px] md:text-3xl lg:text-[32px] font-extrabold text-[#0B0F19] mb-2 tracking-tight leading-tight lg:leading-[1.15]">
              Custom AI Development Solutions for <span className="text-[#FF6B2C]">Modern Businesses</span>
            </h2>

            <p className="hidden sm:block text-[13px] md:text-[14px] text-slate-500 mb-4 lg:mb-4 leading-relaxed max-w-[600px] shrink-0">
              Explore our portfolio of custom AI, Generative AI, AI agents, and RAG solutions, delivered by our offshore white-label development team to help businesses build secure, scalable, and production-ready AI applications.
            </p>

            {/* Vertical Navigation List (Desktop Only) */}
            <div className="hidden lg:block relative w-full flex-1 min-h-0 overflow-y-visible pr-2">
              {/* Continuous vertical line on the far left */}
              <div className="absolute left-[5px] lg:left-[5px] top-4 bottom-4 w-px bg-gray-200 hidden sm:block" />

              <div className="flex flex-col">
                {solutionsData.map((solution, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <div 
                      key={solution.number}
                      onClick={() => scrollToIndex(idx)}
                      className={`relative flex items-center h-[55px] lg:h-[50px] border-b last:border-b-0 group shrink-0 transition-colors duration-300 rounded-lg mb-1 cursor-pointer ${isActive ? "bg-[#121217] border-transparent" : "bg-[#FF6B2C] border-transparent hover:brightness-110"}`}
                    >
                      {/* Active Dot */}
                      {isActive && (
                        <div className="absolute left-[1px] lg:left-[1px] top-1/2 -translate-y-1/2 flex items-center justify-center w-2 h-2 hidden sm:flex z-10">
                          <div className="w-2 h-2 rounded-full bg-[#FF6B2C] ring-4 ring-[#121217]" />
                        </div>
                      )}

                      <div className="flex items-center justify-between w-full sm:pl-8 pr-2 lg:pr-4">
                        <div className="flex items-center gap-4 lg:gap-6">
                          <span className={`text-base lg:text-lg font-bold transition-colors duration-300 ${isActive ? "text-[#FF6B2C]" : "text-white"}`}>
                            {solution.number}
                          </span>
                          <span className={`text-[14px] lg:text-[17px] font-bold transition-colors duration-300 ${isActive ? "text-[#FF6B2C]" : "text-white"}`}>
                            {solution.title}
                          </span>
                        </div>
                        
                        {/* Arrow Button */}
                        <div className={`flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full border transition-all duration-300 ${isActive ? "border-[#FF6B2C] bg-[#FF6B2C]/5" : "border-white/30 bg-white/10"}`}>
                          <ArrowRight className={`w-4 h-4 lg:w-5 lg:h-5 transition-colors duration-300 ${isActive ? "text-[#FF6B2C]" : "text-white"}`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column Animated Stack (All Breakpoints) */}
          <div className="flex w-full lg:w-[55%] relative flex-1 min-h-[300px] lg:h-full items-center justify-center lg:justify-end mt-4 sm:mt-6 lg:mt-0 perspective-1000">
             <div className="relative w-full max-w-[680px] h-full mx-auto lg:mr-0">
                {solutionsData.map((solution, idx) => (
                  <AnimatedCard 
                    key={solution.number}
                    solution={solution}
                    index={idx}
                    totalCards={solutionsData.length}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
