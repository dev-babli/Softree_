"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WhoDoWeServeCTA() {
  return (
    <section className="w-full bg-[#0A0F3C] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle diagonal bands mimicking the reference image */}
        <div className="absolute -top-[50%] right-[-10%] w-[60%] h-[200%] bg-white/[0.03] -rotate-[35deg] transform origin-center" />
        <div className="absolute -top-[50%] right-[-5%] w-[40%] h-[200%] bg-[#1A56DB]/[0.05] -rotate-[35deg] transform origin-center" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 lg:gap-8">
          
          {/* Left Content */}
          <div className="flex flex-col max-w-3xl">
            <div className="w-8 h-1 bg-[#FF6B2C] mb-4" />
            <span className="text-[#FF6B2C] text-sm lg:text-base font-bold tracking-widest uppercase mb-4">
              READY TO TALK?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-[1.15] tracking-tight">
              Let&apos;s explore how Softree can support your technology goals.
            </h2>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-start lg:items-center gap-5 flex-shrink-0">
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#FF6B2C] hover:bg-[#E85D22] text-white font-bold py-4 px-10 rounded-full transition-colors w-full sm:w-auto text-lg shadow-lg shadow-[#FF6B2C]/20"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-[#9CA3AF] text-sm md:text-base font-medium tracking-wide">
              People. Technology. Progress. Together.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
