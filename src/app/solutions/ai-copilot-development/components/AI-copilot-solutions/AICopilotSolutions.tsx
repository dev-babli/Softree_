"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  ArrowRight,
  Users,
  BookOpen,
  CheckCircle2,
  User,
  Headset,
  MessageSquare,
  ClipboardCheck,
  Smile,
  TrendingUp,
  Target,
  Lightbulb,
  FileText,
  MessageCircle,
  ShieldCheck,
  UserPlus,
  Monitor,
  Wrench,
  FileSearch,
  Receipt,
  Briefcase,
  PieChart,
  AlertTriangle,
  Star
} from "lucide-react";

/* =====================================================================
   DATA
   ===================================================================== */
const solutionsData = [
  {
    title: "Employee Copilot",
    description: "Empower employees with AI-powered assistance for enterprise knowledge, daily tasks, document search, and workplace productivity.",
    icon: <Users className="w-10 h-10 text-[#FF5812]" strokeWidth={1.5} />,
    features: [
      { icon: <BookOpen className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Knowledge Assistance" },
      { icon: <CheckCircle2 className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Task Automation" },
      { icon: <User className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Personalized Support" }
    ]
  },
  {
    title: "Customer Support Copilot",
    description: "Deliver faster, smarter customer support using conversational AI, case intelligence, and automated issue resolution.",
    icon: <Headset className="w-10 h-10 text-[#FF5812]" strokeWidth={1.5} />,
    features: [
      { icon: <MessageSquare className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Intelligent Responses" },
      { icon: <ClipboardCheck className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Case Resolution" },
      { icon: <Smile className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Sentiment Analysis" }
    ]
  },
  {
    title: "Sales Copilot",
    description: "Enable sales teams with AI-driven lead intelligence, proposal generation, opportunity insights, and sales automation.",
    icon: <TrendingUp className="w-10 h-10 text-[#FF5812]" strokeWidth={1.5} />,
    features: [
      { icon: <Target className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Lead Intelligence" },
      { icon: <Lightbulb className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Opportunity Insights" },
      { icon: <FileText className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Proposal Generation" }
    ]
  },
  {
    title: "HR Copilot",
    description: "Transform HR operations with AI-powered employee assistance, onboarding automation, HR policies, and self-service support.",
    icon: <Users className="w-10 h-10 text-[#FF5812]" strokeWidth={1.5} />,
    features: [
      { icon: <MessageCircle className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Employee Queries" },
      { icon: <ShieldCheck className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Policy Guidance" },
      { icon: <UserPlus className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Onboarding Support" }
    ]
  },
  {
    title: "IT Helpdesk Copilot",
    description: "Accelerate IT support by automating ticket handling, troubleshooting, knowledge retrieval, and service requests.",
    icon: <Monitor className="w-10 h-10 text-[#FF5812]" strokeWidth={1.5} />,
    features: [
      { icon: <Wrench className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Issue Resolution" },
      { icon: <FileSearch className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Knowledge Search" },
      { icon: <Receipt className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Ticket Automation" }
    ]
  },
  {
    title: "Executive Decision Copilot",
    description: "Provide executives with real-time dashboards, predictive analytics, strategic recommendations, and AI-powered decision support.",
    icon: <Briefcase className="w-10 h-10 text-[#FF5812]" strokeWidth={1.5} />,
    features: [
      { icon: <PieChart className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Data Insights" },
      { icon: <AlertTriangle className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Risk Analysis" },
      { icon: <Star className="w-5 h-5 text-[#FF5812]" strokeWidth={1.5} />, text: "Strategic Recommendations" }
    ]
  }
];

/* =====================================================================
   ANIMATION VARIANTS
   ===================================================================== */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeDownVariant: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* =====================================================================
   COMPONENT
   ===================================================================== */
export function AICopilotSolutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 overflow-hidden font-sans bg-transparent"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center"
        >
          {/* ================= HEADER ================= */}
          <motion.div variants={fadeDownVariant} className="text-center mb-16 max-w-4xl mx-auto">
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
              <span className="text-[#FF5812] font-bold tracking-[0.2em] text-sm uppercase">SOLUTIONS FOR EVERY BUSINESS FUNCTION</span>
              <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
                <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
              <span className="text-[#FF6B00]">AI Copilot</span> Solutions
            </h2>
            
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed mx-auto max-w-3xl">
              Purpose-built AI Copilot solutions that automate business processes, improve employee productivity, enhance customer experiences, and deliver measurable business outcomes across every department.
            </p>
          </motion.div>

          {/* ================= GRID CARDS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
            {solutionsData.map((card, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                whileHover="hover"
                className="group relative flex flex-col rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(255,88,18,0.15)] hover:-translate-y-2 transition-all duration-500 h-full cursor-default p-[2px]"
              >
                {/* Animated Border Background */}
                <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,#FF5812_100%)] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Inner Card Content */}
                <div className="relative flex flex-col bg-white rounded-[30px] p-8 h-full z-10 w-full">
                  
                {/* 
                  TOP SECTION (Icon + Text + Arrow) 
                */}
                <div className="flex items-start gap-6 mb-8">
                  {/* Large Icon Container */}
                  <div className="shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-orange-50 to-white border border-orange-100 shadow-sm flex items-center justify-center relative overflow-hidden group-hover:shadow-md transition-shadow">
                    <div className="absolute inset-0 bg-[#FF5812] opacity-0 group-hover:opacity-[0.03] blur-lg transition-opacity duration-300" />
                    <motion.div
                      variants={{
                        hover: { scale: 1.1, y: -2, transition: { duration: 0.3 } }
                      }}
                      className="relative z-10"
                    >
                      {card.icon}
                    </motion.div>
                  </div>

                  {/* Title, Description & Arrow */}
                  <div className="flex-1 relative pt-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed min-h-[60px]">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* 
                  DIVIDER 
                */}
                <div className="w-full h-px bg-gray-100 mb-6 group-hover:bg-orange-100 transition-colors duration-300" />

                {/* 
                  BOTTOM SECTION (3 Features)
                */}
                <div className="flex justify-between items-start gap-2 mt-auto">
                  {card.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 flex-1 group/feature">
                      <div className="shrink-0 pt-0.5">
                        <motion.div
                          variants={{
                            hover: { scale: 1.1, transition: { duration: 0.3 } }
                          }}
                        >
                           {feature.icon}
                        </motion.div>
                      </div>
                      <span className="text-[12px] font-medium text-gray-700 leading-tight">
                        {/* Splitting the text by space to mimic the exact layout where words drop to new line smoothly */}
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}

export default AICopilotSolutions;
