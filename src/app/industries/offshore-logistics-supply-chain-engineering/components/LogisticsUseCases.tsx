"use client";

import React from "react";
import { LogisticsWhoWeHelp } from "./LogisticsWhoWeHelp";
import LogisticsNetworkGlobe from "./LogisticsNetworkGlobe";

export default function LogisticsUseCases() {
  return (
    <div className="bg-white pt-6 md:pt-8 pb-6 md:pb-8 text-slate-900">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        {/* Unified Centered Header */}
        <div className="flex flex-col items-center w-full mb-8 md:mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-700 uppercase mb-3 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            ENTERPRISE SUPPLY CHAIN SOLUTIONS
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 mb-3 tracking-tight leading-tight">
            Modernize Logistics Operations with <span className="text-[#FF6B2C]">Intelligent Automation</span>
          </h2>

          <p className="text-[14px] lg:text-[15px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Discover how AI transforms logistics operations, improves supply chain visibility, automates workflows, and helps logistics teams make faster, data-driven decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Who We Help (Logistics Specific) */}
          <div className="lg:col-span-6 flex flex-col h-full">
            <LogisticsWhoWeHelp simple={true} />
          </div>
          {/* Right Column: Global Presence (LogisticsNetworkGlobe) */}
          <div className="lg:col-span-6 w-full flex flex-col h-full">
            <div className="w-full h-full max-w-[550px] lg:max-w-none flex flex-col mx-auto lg:ml-auto">
              <LogisticsNetworkGlobe />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
