"use client";

import React from "react";
import Package from "lucide-react/dist/esm/icons/package";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import UserCheck from "lucide-react/dist/esm/icons/user-check";
import Target from "lucide-react/dist/esm/icons/target";
import { motion } from "framer-motion";
import { fadeUpVariant } from "./animations";

const trustItems = [
  { icon: Package, title: "100+", subtitle: "AI Projects Delivered" },
  { icon: ShieldCheck, title: "Enterprise-ready", subtitle: "Secure. Reliable. Scalable." },
  { icon: UserCheck, title: "Microsoft Expertise", subtitle: "Powering intelligent solutions" },
  { icon: Target, title: "Proven Impact", subtitle: "Measurable results that matter" },
];

export const BottomTrustBanner = () => {
  return (
    <motion.div 
      variants={fadeUpVariant}
      className="w-full max-w-6xl mx-auto mt-20"
    >
      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgb(0,0,0,0.06)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">
          {trustItems.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-4 pt-6 sm:pt-0 ${index > 0 ? "lg:pl-8" : ""}`}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-orange-50/50">
                <item.icon className="w-6 h-6 text-[#FF6A13]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-gray-900 leading-tight mb-1">
                  {item.title}
                </span>
                <span className="text-sm text-gray-500 leading-tight">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
