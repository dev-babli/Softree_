'use client';

import React from 'react';

const oldWayPoints = [
  "Rely on outdated, bloated templates",
  "Require constant developer intervention",
  "Prioritize visuals over performance",
  "Feel like Frankenstein builds with too many plugins",
  "Struggle to scale with your team’s needs"
];

const ourWayPoints = [
  "Powered by Space Station, our custom WordPress framework",
  "Fully editable with visual page builders",
  "Built with accessibility and SEO in mind",
  "Streamlined with fewer plugins for better performance & security",
  "Designed for enterprise-level flexibility"
];

export default function ComparisonSection() {
  return (
    <section className="bg-[#05020C] text-white py-24 px-6 md:px-12 relative overflow-hidden flex items-center justify-center min-h-screen">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0 animate-pulse duration-[6000ms]" />

      <div className="max-w-7xl mx-auto w-full flex flex-col space-y-16 relative z-10">
        
        {/* Section Heading with Fade-in Down Animation */}
        <div className="text-center transition-all duration-700 ease-out transform translate-y-0 opacity-100 dynamic-fade-in">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
            The Smarter Way To Build On WordPress
          </h2>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative w-full pb-16 lg:pb-0">
          
          {/* Card 1: The Old Way (Left-to-Right Slide) */}
          <div className="bg-[#120B24]/40 border border-purple-900/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-xl flex flex-col justify-between transition-all duration-500 hover:border-purple-900/50 hover:bg-[#120B24]/60 hover:-translate-y-1 hover:shadow-2xl">
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-400">
                WordPress Websites the old way...
              </h3>
              <ul className="space-y-5">
                {oldWayPoints.map((point, index) => (
                  <li 
                    key={index} 
                    className="flex items-start space-x-3 group transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="flex-shrink-0 mt-1 text-rose-500 bg-rose-500/10 p-1 rounded-md transition-all duration-300 group-hover:bg-rose-500/30 group-hover:scale-110">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </span>
                    <span className="text-gray-400 text-sm md:text-base font-medium tracking-wide leading-relaxed group-hover:text-gray-300 transition-colors duration-200">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Our Way (Right-to-Left Slide + Glow Effect) */}
          <div className="relative bg-[#120B24]/40 border border-purple-500/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-2xl flex flex-col justify-between transition-all duration-500 hover:border-purple-500/50 hover:bg-[#150D2A]/60 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] group/card">
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                WordPress Websites our way...
              </h3>
              <ul className="space-y-5">
                {ourWayPoints.map((point, index) => (
                  <li 
                    key={index} 
                    className="flex items-start space-x-3 group"
                  >
                    <span className="flex-shrink-0 mt-1 text-emerald-400 bg-emerald-500/10 p-1 rounded-md transition-all duration-300 group-hover:bg-emerald-500/30 group-hover:scale-110 shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" className="animate-dash" />
                      </svg>
                    </span>
                    <span className="text-gray-300 text-sm md:text-base font-medium tracking-wide leading-relaxed group-hover:text-white transition-colors duration-200">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Floating Context Note Badge at Bottom-Right */}
            <div className="absolute -bottom-12 right-4 md:right-12 max-w-[280px] bg-[#1E1638] border border-purple-500/20 rounded-xl p-4 shadow-2xl z-20 transform rotate-[-2deg] transition-all duration-500 hover:rotate-0 hover:scale-105 hover:border-purple-500/40">
              {/* Context Arrow Pointer with wiggle animation on card hover */}
              <div className="absolute -top-7 left-12 w-6 h-8 text-purple-400/60 hidden md:block transition-transform duration-500 group-hover/card:translate-y-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full transform scale-x-[-1] rotate-[45deg]">
                  <path d="M3 3c6 0 12 4 12 11m0 0l-3-3m3 3l3-3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[11px] md:text-xs font-medium text-gray-400 leading-relaxed">
                It isn't about marketing spend. It's about <span className="text-white font-semibold">maximizing the opportunities</span> you have.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Embedded Core Utility Keyframes */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-dash {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: dash 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .dynamic-fade-in {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}