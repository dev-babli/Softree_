'use client';

import React from 'react';
import CurtainSlider from '../components/CurtainSlider/CurtainSlider';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CurtainSliderPageClient() {
  return (
    <div className="relative w-full h-screen bg-[#101010] text-[#fff]">
      {/* Floating Glassmorphic Header */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-4 p-3 pr-5 rounded-2xl bg-[#121417]/70 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto transition-all duration-300 hover:border-white/20">
        <Link
          href="/services/ai-development-services"
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
          aria-label="Back to Services"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold tracking-widest text-[#FF5812] uppercase">
              Showcase Demo
            </span>
            <Sparkles className="w-3 h-3 text-[#FF5812] animate-pulse" />
          </div>
          <span className="text-xs font-semibold text-zinc-300 font-sans">
            Curtain Slider Module
          </span>
        </div>
      </div>

      {/* Curtain Slider Component */}
      <CurtainSlider />
    </div>
  );
}
