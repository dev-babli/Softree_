"use client";

import React from "react";
import { Briefcase, ShieldCheck, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUpVariant } from "./animations";

const trustItems = [
  { icon: Briefcase, text: "100+ AI Projects Delivered" },
  { icon: ShieldCheck, text: "Enterprise-ready" },
  { icon: Award, text: "Microsoft Expertise" },
  { icon: TrendingUp, text: "Proven Business Outcomes" },
];

export const BottomTrustBanner = () => {
  return (
    <motion.div 
      variants={fadeUpVariant}
      className="max-w-5xl mx-auto mt-16 lg:mt-24"
    >
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-6 px-4 md:px-10 border border-gray-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgb(0,0,0,0.06)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">
          {trustItems.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-center gap-3 pt-4 sm:pt-0 ${index > 0 ? "lg:pl-6" : ""}`}
            >
              <item.icon className="w-6 h-6 text-[#FF6A13]" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
