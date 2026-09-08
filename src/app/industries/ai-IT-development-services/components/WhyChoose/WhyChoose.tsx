"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { SparklesIcon, CpuChipIcon, RocketLaunchIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const benefits = [
    {
        title: "AI-First Engineering",
        description: "Build intelligent applications using modern AI technologies and automation.",
        icon: SparklesIcon,
    },
    {
        title: "Scalable Architecture",
        description: "Develop secure and scalable systems designed for long-term growth.",
        icon: CpuChipIcon,
    },
    {
        title: "Faster Time to Market",
        description: "Accelerate product development without sacrificing quality or maintainability.",
        icon: RocketLaunchIcon,
    },
    {
        title: "Business-Focused Solutions",
        description: "Technology decisions that solve real business problems and create measurable value.",
        icon: ShieldCheckIcon,
    }
];

export default function WhyChoose() {
    const { resolvedTheme } = useTheme();
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    useEffect(() => {
        if (resolvedTheme) {
            setIsDarkMode(resolvedTheme === 'dark');
        }
    }, [resolvedTheme]);

    return (
        <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Left Column: Content */}
                    <div className="flex flex-col">
                        <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5812] w-fit flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812] shadow-[0_0_6px_#FF5812]" />
                            WHY CHOOSE SOFTREE
                        </span>
                        
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.15]">
                            Technology That Moves <br className="hidden sm:block" />
                            <span className="text-[#FF5812]">Your Business Forward</span>
                        </h2>
                        
                        <p className={`text-base sm:text-lg max-w-2xl mb-12 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            We combine AI capabilities, modern engineering, scalable architecture, and business understanding to build technology solutions that deliver measurable value.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {benefits.map((benefit, index) => (
                                <div 
                                    key={index}
                                    className={`p-6 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 ${
                                        isDarkMode 
                                            ? 'bg-white/[0.02] border-white/10 hover:border-[#FF5812]/50 hover:bg-[#FF5812]/5' 
                                            : 'bg-white border-slate-200 hover:border-[#FF5812]/50 hover:shadow-lg hover:shadow-orange-500/5'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                                        isDarkMode ? 'bg-[#FF5812]/20 text-[#FF5812] group-hover:bg-[#FF5812] group-hover:text-white' : 'bg-orange-100 text-[#FF5812] group-hover:bg-[#FF5812] group-hover:text-white'
                                    }`}>
                                        <benefit.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                        {benefit.title}
                                    </h3>
                                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Visual Fallback (Spline not installed in project) */}
                    <div className={`relative w-full h-[400px] lg:h-[600px] rounded-3xl overflow-hidden flex items-center justify-center group ${isDarkMode ? 'bg-black/20 border border-white/5' : 'bg-slate-100 border border-slate-200'}`}>
                        {/* Decorative Background Glows */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5812]/20 via-transparent to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF5812] rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                        
                        {/* Abstract Tech Graphic */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Central Core */}
                            <div className="w-32 h-32 rounded-full border border-[#FF5812]/30 flex items-center justify-center animate-[spin_15s_linear_infinite]">
                                <div className="w-24 h-24 rounded-full border border-dashed border-[#FF5812]/50 animate-[spin_20s_linear_infinite_reverse]" />
                            </div>
                            
                            {/* Central solid dot */}
                            <div className="absolute w-4 h-4 rounded-full bg-[#FF5812] shadow-[0_0_20px_#FF5812] animate-pulse" />
                            
                            {/* Floating Nodes */}
                            <div className="absolute w-full h-full">
                                {[...Array(8)].map((_, i) => (
                                    <div 
                                        key={i}
                                        className="absolute w-1.5 h-1.5 rounded-full bg-[#FF5812]/80 shadow-[0_0_8px_#FF5812]"
                                        style={{
                                            top: `${15 + Math.random() * 70}%`,
                                            left: `${15 + Math.random() * 70}%`,
                                            animation: `pulse ${2 + Math.random() * 3}s infinite alternate`
                                        }}
                                    />
                                ))}
                            </div>
                            
                            {/* Subtle grid overlay for tech feel */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#FF5812 1px, transparent 1px), linear-gradient(90deg, #FF5812 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
