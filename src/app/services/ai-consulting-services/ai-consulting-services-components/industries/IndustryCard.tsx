"use client";

import { motion } from "framer-motion";
import { IndustryData } from "./types";
import { 
  HeartPulse, Settings, Landmark, ShoppingCart, Truck, GraduationCap,
  Zap, Building, Shield, Phone, Check
} from "lucide-react";
import Image from "next/image";
import { AnimatedCardBorder } from "./AnimatedCardBorder";

interface IndustryCardProps {
  industry: IndustryData;
  isActive: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  HeartPulse,
  Settings,
  Landmark,
  ShoppingCart,
  Truck,
  GraduationCap,
  Zap,
  Building,
  Shield,
  Phone
};

export function IndustryCard({ industry, isActive }: IndustryCardProps) {
  const Icon = iconMap[industry.iconName] || HeartPulse;

  return (
    <motion.div
      animate={{
        scale: isActive ? 1.05 : 0.95,
        opacity: isActive ? 1 : 0.6,
        y: isActive ? -12 : 0,
        zIndex: isActive ? 20 : 0,
        boxShadow: isActive 
          ? "0 40px 80px -15px rgba(255, 107, 0, 0.2), 0 0 0 1.5px rgba(255, 107, 0, 0.6)" 
          : "0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(226, 232, 240, 1)"
      }}
      whileHover={{
        y: isActive ? -18 : -8,
        boxShadow: isActive 
          ? "0 50px 100px -20px rgba(255, 107, 0, 0.3), 0 0 0 1.5px rgba(255, 107, 0, 0.8)"
          : "0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 107, 0, 0.5)",
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full h-[760px] flex flex-col rounded-[28px] overflow-hidden group transition-all duration-300 ${
        isActive 
          ? 'bg-white backdrop-blur-xl' 
          : 'bg-[#fafafa]'
      }`}
    >
      {/* Animated Border for Active Card */}
      {isActive && <AnimatedCardBorder />}

      {/* Top Image Section - Edge-to-edge, 48% height */}
      <div className="relative h-[48%] w-full overflow-hidden shrink-0 bg-slate-100 rounded-t-[28px] z-0">
        <motion.div
          animate={{ scale: isActive ? 1.02 : 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* 
            If the source PNGs have baked-in white borders, adding scale-110 here 
            forces the image to overflow the container and effectively "crops" 
            out the transparent/white edges, ensuring an immersive edge-to-edge look.
          */}
          <Image
            src={industry.imagePath}
            alt={industry.title}
            fill
            className={`object-cover scale-110 md:scale-105 transition-all duration-700 ${isActive ? "opacity-100" : "opacity-90"}`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent mix-blend-multiply" />
        </motion.div>
      </div>

      {/* Bottom Content Section - Premium Redesign without CTA */}
      <div className="flex-1 flex flex-col items-start text-left px-8 pb-10 pt-12 md:px-10 md:pb-12 md:pt-14 relative z-10 bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] border-t border-slate-100/50">
        
        {/* Floating Icon Container */}
        <div className="absolute -top-[30px] left-8 md:left-10 transition-transform duration-300 group-hover:-rotate-6">
          <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#FFF5F0] to-[#FFE8DC] border border-[#FF6B00]/20 flex items-center justify-center shadow-[0_8px_16px_-4px_rgba(255,107,0,0.2)] backdrop-blur-md relative overflow-hidden">
             {/* Glow */}
             <div className="absolute inset-0 bg-[#FF6B00] opacity-10 blur-xl" />
             <Icon className="w-7 h-7 text-[#FF6B00] relative z-10" strokeWidth={1.5} />
          </div>
        </div>

        {/* Header Row: Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-5 w-full">
          <h3 className="text-[30px] font-bold text-[#0F172A] tracking-tight">
            {industry.title}
          </h3>
          <span className="px-3 py-1 bg-[#FFF0E5] text-[#FF6B00] text-[12px] font-semibold rounded-full border border-[#FF6B00]/20 self-start sm:self-auto">
            {industry.badge}
          </span>
        </div>

        {/* Description */}
        <p className="text-[#475569] text-[17px] leading-[1.7] line-clamp-4 font-normal mb-8">
          {industry.description}
        </p>

        {/* Benefits List */}
        <div className="flex flex-col gap-4 mt-auto w-full">
          {industry.benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#FFF0E5] flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-[#FF6B00]" strokeWidth={3} />
              </div>
              <span className="text-[16px] text-[#334155] font-medium">{benefit}</span>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
