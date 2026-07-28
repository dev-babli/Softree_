"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const CTAButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-16 flex justify-center"
    >
      <Link 
        href="/contact"
        className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-[#FF5A1F] text-[#FF5A1F] font-semibold text-lg overflow-hidden transition-all duration-300 hover:text-white hover:shadow-[0_8px_25px_rgba(255,90,31,0.3)]"
      >
        {/* Hover Fill Background */}
        <div className="absolute inset-0 bg-[#FF5A1F] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
        
        <span className="relative z-10">Explore All Solutions</span>
        <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
};
