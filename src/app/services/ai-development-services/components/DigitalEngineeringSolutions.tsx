"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SolutionCard {
  number: string;
  title: string;
  items: string[];
  buttonLink: string;
}

const solutionsData: SolutionCard[] = [
  {
    number: "01",
    title: "AI Copilot Development",
    items: [
      "Microsoft 365 Copilot Custom Extensions",
      "Context-Aware Code & Text Assistants",
      "Custom Business Workflow Integrations",
      "Automated Action & Multi-turn Execution",
      "Power Platform Copilot Studio Deployment"
    ],
    buttonLink: "/solutions/ai-copilot-development"
  },
  {
    number: "02",
    title: "Generative AI Development",
    items: [
      "Custom LLM Fine-Tuning & Prompt Design",
      "High-Quality Synthetic Data Generation",
      "Multi-Modal AI (Vision, Speech, Audio)",
      "Cost-Optimized Serverless LLM Hosting",
      "Responsible AI & Safety Guardrails"
    ],
    buttonLink: "/services/generative-ai"
  },
  {
    number: "03",
    title: "Enterprise RAG Development",
    items: [
      "Hybrid Vector & Full-Text Search",
      "Real-Time Database & API Connectors",
      "Chunking & Metadata Enrichment Pipelines",
      "Document Parsing & AI Knowledge Graphs",
      "Secure Access Controls & Governance"
    ],
    buttonLink: "/solutions/enterprise-rag-development"
  },
  {
    number: "04",
    title: "AI Consulting Service",
    items: [
      "AI Maturity & Readiness Assessment",
      "ROI Analysis & Use Case Prioritization",
      "Model Selection & Cloud Strategy",
      "Risk, Ethics & Governance Frameworks",
      "Strategic Tech Stack Roadmap Design"
    ],
    buttonLink: "/services/ai-consulting-services"
  },
  {
    number: "05",
    title: "AI Chatbot Development",
    items: [
      "Omnichannel Customer Support Bots",
      "Human-in-the-Loop Handoff Flows",
      "Multilingual & Speech-to-Text Support",
      "CRM & ERP Database Integrations",
      "Natural Language Sentiment Analysis"
    ],
    buttonLink: "/services/ai-chatbot-development"
  },
  {
    number: "06",
    title: "Multi Agent System",
    items: [
      "Collaborative Agentic Workflows",
      "Autonomous Task Decomposition & Routing",
      "Shared State & Conversation Memory",
      "Automated Quality & Self-Correction Loops",
      "Scalable Containerized Agent Deployments"
    ],
    buttonLink: "/services/multi-agent-systems-development"
  }
];

const TiltCard = ({ solution, idx }: { solution: SolutionCard; idx: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for tilt coordinates
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Map tilt normalized values to rotation degrees
  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize coordinates to [0, 1] range
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    // Reset back to center smoothly
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      className="w-full flex"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: idx * 0.05 }}
        className="relative flex-1 bg-[#121217] border border-white/5 rounded-3xl p-7 flex flex-col justify-between shadow-xl hover:shadow-[0_10px_40px_rgba(255,107,44,0.1)] hover:border-orange-500/30 active:scale-[0.995] transition-all duration-300 group overflow-hidden select-none"
      >
        {/* Glowing Cursor Spotlight Effect */}
        <motion.div
          className="absolute -inset-px rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: useTransform(
              [x, y],
              ([latestX, latestY]) => {
                if (typeof latestX !== 'number' || typeof latestY !== 'number') return '';
                const pctX = latestX * 100;
                const pctY = latestY * 100;
                return `radial-gradient(350px circle at ${pctX}% ${pctY}%, rgba(255, 107, 44, 0.06) 0%, transparent 80%)`;
              }
            )
          }}
        />

        {/* 3D Content Layout Container */}
        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="relative z-10">

          {/* Badge Number Header */}
          <div
            style={{ transform: "translateZ(15px)" }}
            className="mb-4 flex items-center"
          >
            <span className="inline-block bg-orange-500/10 border border-orange-500/20 text-[#FF6B2C] font-bold text-xs px-3 py-1 rounded-full">
              {solution.number}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{ transform: "translateZ(25px)" }}
            className="text-xl font-extrabold text-white mb-5 leading-snug group-hover:text-[#FF6B2C] transition-colors duration-300"
          >
            {solution.title}
          </h3>

          {/* Items list */}
          <ul
            style={{ transform: "translateZ(15px)" }}
            className="space-y-3 mb-6"
          >
            {solution.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300 leading-normal font-semibold group-hover:text-orange-400/90 transition-colors duration-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Link (Next.js Link with separated top border) */}
        <div
          style={{ transform: "translateZ(10px)" }}
          className="relative z-10 mt-auto pt-4 border-t border-white/10 flex items-center justify-between"
        >
          <Link
            href={solution.buttonLink}
            className="w-full flex items-center justify-between text-[#FF6B2C] hover:text-[#e0561b] font-bold text-sm transition-colors duration-200 group/link"
          >
            <span>Explore Service</span>
            <ArrowRight className="w-4 h-4 text-[#FF6B2C] transition-transform duration-200 group-hover/link:translate-x-1.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default function DigitalEngineeringSolutions() {
  return (
    <section className="relative w-full py-20 lg:py-24 bg-white overflow-hidden font-sans">
      {/* Top Border Soft Brand Gradient Mesh */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-orange-500/[0.03] via-transparent to-transparent pointer-events-none -z-10" />
      {/* Background Decorators */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center w-full mb-12 lg:mb-16 text-center">
          <div className="bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100/50 mb-4 inline-block">
            <span className="text-[11px] font-bold text-[#FF6B2C] tracking-widest uppercase">
              SOLUTIONS PORTFOLIO
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-800 mb-4 tracking-tight leading-tight max-w-4xl drop-shadow-[1px_1px_0px_rgba(255,255,255,0.9)]">
            Custom AI Development Solutions for <span className="text-[#FF6B2C]">Modern Businesses</span>
          </h2>

          <p className="text-[15px] lg:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of custom AI, Generative AI, AI agents, and RAG solutions, delivered by our offshore white-label development team to help businesses build secure, scalable, and production-ready AI applications.
          </p>
        </div>

        {/* Grid Layout (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {solutionsData.map((solution, idx) => (
            <TiltCard
              key={solution.number}
              solution={solution}
              idx={idx}
            />
          ))}
        </div>

        {/* Global Action Footer Button */}
        <div className="flex justify-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-[#18181b] hover:bg-[#FF6B2C] text-white font-bold text-[13px] tracking-wide px-8 py-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_25px_rgba(255,107,44,0.3)] transition-all duration-300 select-none"
          >
            <span>View All AI Services and Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
