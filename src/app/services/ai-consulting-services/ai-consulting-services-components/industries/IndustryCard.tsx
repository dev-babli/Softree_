"use client";

import { motion } from "framer-motion";
import { IndustryData } from "./types";
import {
  HeartPulse, Settings, Landmark, ShoppingCart, Truck, GraduationCap,
  Zap, Building, Shield, Phone, Check
} from "lucide-react";
import Image from "next/image";

interface IndustryCardProps {
  industry: IndustryData;
  isActive: boolean;
}

const iconMap: Record<string, any> = {
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
        opacity: isActive ? 1 : 0.5,
        y: isActive ? -8 : 0,
        zIndex: isActive ? 20 : 0,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full h-full min-h-[400px] sm:min-h-[450px] flex flex-col rounded-[32px] overflow-hidden group transition-all duration-300 border-[1.5px] ${isActive
          ? 'bg-white border-[#FF5812] shadow-[0_20px_40px_rgba(255,88,18,0.1)]'
          : 'bg-white border-transparent shadow-md'
        }`}
    >
      {/* Top Image Section */}
      <div className="relative h-[200px] w-full shrink-0 bg-slate-100 z-0">
        <Image
          src={industry.imagePath}
          alt={industry.title}
          fill
          className={`object-cover transition-all duration-700 ${isActive ? "opacity-100" : "opacity-90"}`}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Subtle gradient overlay to match image depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent mix-blend-multiply" />
      </div>

      {/* Bottom Content Section */}
      <div className="flex-1 flex flex-col items-start text-left px-8 pb-8 pt-10 relative z-10 bg-white">

        {/* Floating Icon Container */}
        <div className="absolute -top-[28px] left-8">
          <div className="w-[56px] h-[56px] rounded-full bg-white border border-[#FF5812]/20 flex items-center justify-center shadow-sm relative overflow-hidden">
            <Icon className="w-6 h-6 text-[#FF5812] relative z-10" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[22px] font-bold text-[#1a202c] tracking-tight mb-3 mt-2">
          {industry.title}
        </h3>

        {/* Description */}
        <p className="text-[#64748b] text-[15px] leading-[1.6] font-normal">
          {industry.description}
        </p>

      </div>
    </motion.div>
  );
}
