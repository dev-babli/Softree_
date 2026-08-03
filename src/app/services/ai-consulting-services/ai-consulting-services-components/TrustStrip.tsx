"use client";

import { motion } from "framer-motion";
import { Shield, Brain, TrendingUp, Bot, type LucideIcon } from "lucide-react";

interface TrustItem {
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
}

const trustItems: TrustItem[] = [
  {
    icon: Shield,
    tag: "SECURE DELIVERY",
    title: "Offshore AI Teams",
    description: "Microsoft-certified engineers delivering at velocity.",
  },
  {
    icon: Brain,
    tag: "IP OWNERSHIP",
    title: "White-Label Delivery",
    description: "Custom code assets built directly in your tenant.",
  },
  {
    icon: TrendingUp,
    tag: "CLOUD INTEGRATION",
    title: "Enterprise AI Solutions",
    description: "Audit-ready systems mapped to Azure and Microsoft Fabric.",
  },
  {
    icon: Bot,
    tag: "MEASURED IMPACT",
    title: "Business ROI Focus",
    description: "Proven cost reductions and operational speedups in weeks.",
  },
];

export const TrustStrip = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="w-full max-w-7xl relative z-20"
    >
      {/* Premium Outer Gradient Border & Dynamic Shadow Glow */}
      <div className="rounded-3xl md:rounded-[36px] p-[1px] bg-gradient-to-r from-orange-500/30 via-slate-200 to-amber-500/20 shadow-[0_12px_40px_rgba(0,0,0,0.03),_0_30px_60px_rgba(255,107,0,0.04)] hover:shadow-[0_12px_45px_rgba(0,0,0,0.05),_0_30px_70px_rgba(255,107,0,0.12)] transition-all duration-700 ease-in-out">
        
        {/* Core Glass container */}
        <div className="relative bg-white/70 backdrop-blur-xl rounded-[calc(1.75rem-1px)] md:rounded-[calc(2.25rem-1px)] overflow-hidden flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100/80">
          
          {/* Subtle background tech grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

          {trustItems.map((item) => (
            <div
              key={item.title}
              className="relative flex-1 group py-5 px-5 md:py-6 md:px-5 lg:px-6 xl:px-7 transition-all duration-500 hover:bg-gradient-to-b hover:from-orange-500/[0.03] hover:to-amber-500/[0.01]"
            >
              <div className="relative z-10 flex items-start gap-4">
                {/* Advanced Multi-layered Icon */}
                <div className="relative w-11 h-11 lg:w-12 lg:h-12 shrink-0">
                  {/* Outer pulse animation on hover */}
                  <div className="absolute inset-0 rounded-full bg-orange-500/5 group-hover:scale-125 transition-transform duration-500 group-hover:bg-orange-500/10" />
                  
                  {/* Rotating border accent */}
                  <div className="absolute inset-0 rounded-full border border-orange-500/10 group-hover:border-orange-500/30 group-hover:rotate-45 transition-all duration-500" />

                  {/* Inner container */}
                  <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-white to-orange-50/50 flex items-center justify-center shadow-sm border border-slate-100 group-hover:border-orange-100">
                    <item.icon
                      className="w-5 h-5 text-[#FF6B00] transition-all duration-500 group-hover:scale-110 group-hover:rotate-[6deg]"
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                {/* Content Block */}
                <div className="flex flex-col text-left min-w-0">
                  {/* Monospace tech tag */}
                  <span className="text-[9px] font-bold tracking-[0.15em] text-[#FF5812]/90 font-mono mb-1">
                    {item.tag}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-sm lg:text-[15px] xl:text-[16px] font-extrabold text-slate-800 leading-tight tracking-tight">
                    {item.title}
                  </h3>

                  {/* Growing Underline Accent */}
                  <span className="block h-[1.5px] w-5 bg-orange-500/30 rounded-full mt-1.5 mb-1.5 transition-all duration-500 ease-out group-hover:w-12 group-hover:bg-[#FF6B00]" />

                  {/* Description */}
                  <p className="text-[12px] xl:text-[13px] font-medium text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};