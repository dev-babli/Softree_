"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Brain, 
  Headset, 
  Users, 
  Shield, 
  Workflow, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";

/* ================= TYPES & DATA ================= */
type Benefit = {
  id: string;
  title: string;
  description: string;
  iconName: "TrendingUp" | "Brain" | "Headset" | "Users" | "Shield" | "Workflow";
};

const benefitsData: Benefit[] = [
  {
    id: "productivity",
    title: "Higher Productivity",
    description: "Empower employees with AI Copilots that automate repetitive work, reduce manual effort, and improve daily productivity across departments.",
    iconName: "TrendingUp",
  },
  {
    id: "decisions",
    title: "Faster Decisions",
    description: "Deliver real-time business insights, contextual recommendations, and AI-powered decision support for faster and smarter business outcomes.",
    iconName: "Brain",
  },
  {
    id: "support",
    title: "Reduced Support Costs",
    description: "Automate customer support and internal helpdesk operations using intelligent AI assistants that reduce operational costs.",
    iconName: "Headset",
  },
  {
    id: "experience",
    title: "Better Employee Experience",
    description: "Provide instant knowledge assistance, task automation, and personalized AI guidance that enhances employee engagement.",
    iconName: "Users",
  },
  {
    id: "security",
    title: "Secure Enterprise AI",
    description: "Build enterprise-ready AI Copilots with Microsoft security, compliance, governance, and responsible AI best practices.",
    iconName: "Shield",
  },
  {
    id: "automation",
    title: "Enterprise Automation",
    description: "Connect Microsoft 365, Dynamics 365, SharePoint, Dataverse, ERP, CRM, and business applications through intelligent AI-powered automation.",
    iconName: "Workflow",
  },
];

const iconMap = {
  TrendingUp,
  Brain,
  Headset,
  Users,
  Shield,
  Workflow,
};

/* ================= COMPONENTS ================= */

const AnimatedBorder = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="absolute inset-0 rounded-[24px] pointer-events-none overflow-hidden z-20">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect
          width="100%"
          height="100%"
          rx="24"
          ry="24"
          fill="none"
          stroke="rgba(255, 90, 31, 0.15)"
          strokeWidth="2"
        />
        <motion.rect
          width="100%"
          height="100%"
          rx="24"
          ry="24"
          fill="none"
          stroke="#FF5A1F"
          strokeWidth="2"
          strokeDasharray="150 2500"
          animate={{ strokeDashoffset: [0, -2650] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          style={{
            filter: isHovered 
              ? "drop-shadow(0 0 10px rgba(255, 90, 31, 0.9))" 
              : "drop-shadow(0 0 4px rgba(255, 90, 31, 0.5))"
          }}
        />
      </svg>
    </div>
  );
};

const BenefitCard = ({ benefit, index }: { benefit: Benefit; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[benefit.iconName];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        animate={{ y: isHovered ? -8 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative h-full z-10"
      >
        <AnimatedBorder isHovered={isHovered} />

        {/* Card Body */}
        <div 
          className="relative h-full flex flex-col sm:flex-row items-center sm:items-start gap-6 p-8 bg-white/95 backdrop-blur-sm rounded-[24px] transition-shadow duration-300"
          style={{ boxShadow: isHovered ? "0 25px 50px -12px rgba(0, 0, 0, 0.1)" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}
        >
          
          {/* Icon Section */}
          <div className="relative flex-shrink-0">
            {/* Background Glow */}
            <motion.div 
              animate={{ 
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 0.6 : 0.3
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#FF5A1F] blur-xl rounded-full"
            ></motion.div>
            
            {/* Icon Circle */}
            <motion.div 
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#FF5A1F] to-[#E64D16] flex items-center justify-center shadow-lg border-2 border-white/20"
            >
              <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Vertical Divider (Desktop/Tablet only) */}
          <div className="hidden sm:block w-[1px] self-stretch bg-gradient-to-b from-transparent via-slate-200 to-transparent my-2"></div>

          {/* Text Content */}
          <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
            <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
            <p className="text-slate-600 leading-relaxed text-[15px]">{benefit.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const BusinessBenefits = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-6 mb-6"
          >
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
            <span className="text-[#FF5812] font-bold tracking-[0.2em] text-sm uppercase">BUSINESS BENEFITS</span>
            <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Business Benefits of <br className="hidden sm:block" />
            <span className="text-[#FF5A1F]">AI Copilot Development</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Empower your workforce with enterprise AI Copilots that improve productivity, accelerate business decisions, automate repetitive tasks, and securely transform everyday business operations.
          </motion.p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {benefitsData.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};
