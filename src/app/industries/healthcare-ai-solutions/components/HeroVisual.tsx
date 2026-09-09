"use client";

import React from 'react';
import { motion } from 'framer-motion';
import HeroVideoCard from './HeroVideoCard';
import { heroData } from '../data/hero';

const FloatingCard = ({ title, icon, delay, top, right }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={`absolute z-30 bg-white/90 backdrop-blur-md rounded-lg p-2 shadow-lg border border-white/50 flex flex-col items-center gap-1 w-20 sm:w-24 ${top} ${right}`}
    >
      <div className="text-[8px] font-bold text-orange-600 tracking-wider flex items-center gap-1">
        <span className="w-1 h-1 rounded-full bg-orange-600 inline-block"></span>
        {title}
      </div>
      <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
        {/* Placeholder SVG based on type */}
        {icon === 'bot' && (
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )}
        {icon === 'gear' && (
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
        {icon === 'chart' && (
          <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )}
        {icon === 'security' && (
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )}
      </div>
    </motion.div>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative w-full h-full min-h-[360px] lg:min-h-[420px] flex items-center justify-center">
      {/* Abstract Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl z-0">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-[1px] border-orange-100 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border-[1px] border-orange-200 rounded-full border-dashed"
        />
        {/* Giant curved orange shape top right */}
        <div className="absolute -top-[20%] -right-[10%] w-[350px] h-[350px] bg-orange-500 rounded-full opacity-[0.8] blur-md mix-blend-multiply pointer-events-none transform translate-x-[20%] -translate-y-[20%]"></div>
      </div>

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-2xl aspect-[4/3] bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-sm rounded-3xl p-4 border-[1.5px] border-[#FF5812] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1),0_0_20px_rgba(255,88,18,0.15)] transition-all duration-[350ms] ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15),0_0_40px_rgba(255,88,18,0.25)]">
        
        {/* Video Card */}
        <HeroVideoCard videoCard={heroData.videoCard} />

        {/* Central Visual Area - Integrated Video Player */}
        <div className="absolute inset-0 p-4">
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner border border-[#ECECEC]/50 z-0">
             <video 
               src="/images/ai-development-services/hero/8086715-uhd_3840_2160_25fps.mp4" 
               className="w-full h-full object-cover bg-transparent"
               autoPlay 
               loop 
               muted 
               playsInline
               preload="auto"
             />
          </div>
        </div>

        {/* Right Side Floating Cards */}
        <div className="absolute right-0 top-0 h-full w-24">
          <FloatingCard 
            title={heroData.floatingCards[0].title}
            icon={heroData.floatingCards[0].icon}
            delay={0.6}
            top="top-8"
            right="-right-4"
          />
          <FloatingCard 
            title={heroData.floatingCards[1].title}
            icon={heroData.floatingCards[1].icon}
            delay={0.8}
            top="top-1/2 -translate-y-1/2"
            right="-right-8"
          />
          <FloatingCard 
            title={heroData.floatingCards[2].title}
            icon={heroData.floatingCards[2].icon}
            delay={1.0}
            top="bottom-10"
            right="-right-4"
          />
        </div>

      </div>
    </div>
  );
}
