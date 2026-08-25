"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionBadge from "./SectionBadge";

interface PartnerItem {
  id: string;
  name: string;
  gradient: string;
  topLeftLogo: React.ReactNode;
  centerLogo: React.ReactNode;
  bgPatterns?: React.ReactNode;
}

export default function PartnerShowcase() {
  const [activePartner, setActivePartner] = useState<string>("databricks");

  const partners: PartnerItem[] = [
    {
      id: "aws",
      name: "AWS",
      gradient: "from-[#FF9900] to-[#232F3E]",
      topLeftLogo: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#FF9900] fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15c-19.3 0-35 15.7-35 35s15.7 35 35 35 35-15.7 35-35-15.7-35-35-35zm0 54c-10.5 0-19-8.5-19-19s8.5-19 19-19 19 8.5 19 19-8.5 19-19 19z" />
          <path d="M50 38v24l12-12-12-12z" />
        </svg>
      ),
      centerLogo: (
        <svg viewBox="0 0 100 100" className="w-14 h-14 text-[#232F3E] fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M82.3 35c-2.4-4-5.6-7.3-9.5-10-3.9-2.7-8.3-4.5-13.1-5.3-4.8-.8-9.8-.7-14.7.2-4.9.9-9.5 2.8-13.6 5.5-4.1 2.7-7.5 6.2-10 10.4s-4.1 8.8-4.7 13.7c-.6 4.9-.3 9.9.9 14.7 1.2 4.8 3.3 9.3 6.3 13.1.3.4.7.4.9.1l2.4-3.6c.2-.3.1-.7-.1-.9-2.4-3.1-4.1-6.7-5-10.5-.9-3.8-1.1-7.8-.6-11.7.5-3.9 1.8-7.7 3.8-11.1s4.7-6.2 8-8.4c3.3-2.2 7-3.7 10.9-4.4 3.9-.7 7.9-.8 11.8-.1 3.9.7 7.5 2.1 10.7 4.3 3.2 2.2 5.8 4.9 7.7 8.1.2.3.6.4.8.1l3.3-2.8c.3-.2.3-.6.1-.9z" />
          <path d="M22 66.5c16.5 5.6 36.4 5.6 48 0 1.1-.5 1.5-1.7.4-2.2-3.9-1.9-14-3.8-24.4-3.8S26 62.4 22.1 64.3c-1.1.5-.7 1.7.4 2.2z" fill="#FF9900" />
        </svg>
      ),
      bgPatterns: (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5 5" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5 5" />
        </svg>
      )
    },
    {
      id: "azure",
      name: "Azure",
      gradient: "from-[#008AD7] to-[#004B87]",
      topLeftLogo: (
        <svg viewBox="0 0 100 100" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15L15 65l15 10L50 35l20 40 15-10L50 15z" fill="white" />
        </svg>
      ),
      centerLogo: (
        <svg viewBox="0 0 100 100" className="w-14 h-14" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15L15 65l15 10L50 35l20 40 15-10L50 15z" fill="#0078d4" />
          <path d="M50 35L30 75h40L50 35z" fill="#50e6ff" opacity="0.8" />
        </svg>
      ),
      bgPatterns: (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50 Q 50 100 100 50 T 200 50" fill="none" stroke="white" strokeWidth="3" />
          <path d="M0 150 Q 50 100 100 150 T 200 150" fill="none" stroke="white" strokeWidth="3" />
        </svg>
      )
    },
    {
      id: "google",
      name: "Google",
      gradient: "from-[#4285F4] to-[#34A853]",
      topLeftLogo: (
        <svg viewBox="0 0 48 48" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 5c10.5 0 19 8.5 19 19s-8.5 19-19 19S5 34.5 5 24 13.5 5 24 5z" fill="white" />
          <path d="M36 24.5c0-.9-.1-1.9-.3-2.8H24v5.3h6.8c-.3 1.5-1.1 2.8-2.4 3.7v3.1h3.9c2.3-2.1 3.7-5.3 3.7-9.3z" fill="#4285F4" />
          <path d="M24 37c3.5 0 6.4-1.2 8.6-3.2l-3.9-3.1c-1.1.7-2.5 1.2-4.7 1.2-3.6 0-6.7-2.4-7.8-5.7H8.3v3.3C10.5 33.7 16.8 37 24 37z" fill="#34A853" />
        </svg>
      ),
      centerLogo: (
        <svg viewBox="0 0 48 48" className="w-14 h-14" xmlns="http://www.w3.org/2000/svg">
          <path d="M43.6 24.5c0-1.6-.1-3.2-.4-4.7H24v8.9h11c-.5 2.6-1.9 4.8-4.1 6.3v5.2h6.6c3.9-3.6 6.1-9 6.1-15.7z" fill="#4285F4" />
          <path d="M24 44c5.4 0 9.9-1.8 13.2-4.9l-6.6-5.2c-1.8 1.2-4.1 2-6.6 2-5.1 0-9.4-3.4-10.9-8.1H6.1v5.3C9.4 39.7 16.3 44 24 44z" fill="#34A853" />
          <path d="M13.1 27.8c-.4-1.2-.6-2.4-.6-3.8s.2-2.6.6-3.8V14.9H6.1C4.6 17.7 3.8 20.8 3.8 24s.8 6.3 2.3 9.1l7-5.3z" fill="#FBBC05" />
          <path d="M24 12.8c2.9 0 5.6 1 7.7 2.9l5.8-5.8C33.9 6.8 29.4 5 24 5 16.3 5 9.4 9.3 6.1 16.1l7 5.3c1.5-4.7 5.8-8.6 10.9-8.6z" fill="#EA4335" />
        </svg>
      ),
      bgPatterns: (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="10" fill="white" />
          <circle cx="170" cy="170" r="15" fill="white" />
          <path d="M 0 100 Q 50 150 100 100 T 200 100" fill="none" stroke="white" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: "nvidia",
      name: "Nvidia",
      gradient: "from-[#76b900] to-[#040d06]",
      topLeftLogo: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#76b900] fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10C27.9 10 10 27.9 10 50s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10zm-3 69.2c-15.6-.8-27.7-13.8-27.7-29.6 0-16.3 13.2-29.6 29.5-29.6 15.6 0 28.3 12.2 29.5 27.4H68c-1.1-9.6-9.2-17.1-19.2-17.1-10.7 0-19.4 8.7-19.4 19.4S38.1 69 48.8 69c9.5 0 17.4-6.8 19-15.8h10.4c-1.6 14.8-14 26-29.2 26h-2z" />
        </svg>
      ),
      centerLogo: (
        <svg viewBox="0 0 100 100" className="w-14 h-14 text-[#76b900] fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 20C33.4 20 20 33.4 20 50s13.4 30 30 30 30-13.4 30-30-13.4-30-30-30zm0 12c9.9 0 18 8.1 18 18s-8.1 18-18 18-18-8.1-18-18 8.1-18 18-18zm0 12c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z" />
        </svg>
      ),
      bgPatterns: (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(118,185,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(118,185,0,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" />
      )
    },
    {
      id: "databricks",
      name: "Databricks",
      gradient: "from-[#FF3621] to-[#691107]",
      topLeftLogo: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 16l32 20v36L50 88 18 72V36l32-20z" fill="none" stroke="currentColor" strokeWidth="8" />
          <path d="M50 36l18 11.2v22.5L50 81 32 69.7V47.2L50 36z" />
        </svg>
      ),
      centerLogo: (
        <svg viewBox="0 0 100 100" className="w-14 h-14 text-[#FF3621] fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 16l32 20v36L50 88 18 72V36l32-20z" fill="none" stroke="currentColor" strokeWidth="8" />
          <path d="M50 36l18 11.2v22.5L50 81 32 69.7V47.2L50 36z" />
        </svg>
      ),
      bgPatterns: (
        <div className="absolute bottom-0 left-0 right-0 opacity-10 pointer-events-none flex justify-between px-6">
          <svg className="w-16 h-16 text-white" viewBox="0 0 100 100">
            <path d="M50 100 C50 60 20 60 10 100 M50 100 C50 50 80 50 90 100" stroke="currentColor" strokeWidth="6" fill="none" />
          </svg>
          <svg className="w-20 h-20 text-white" viewBox="0 0 100 100">
            <path d="M50 100 C50 40 20 40 5 100 M50 100 C50 30 80 30 95 100" stroke="currentColor" strokeWidth="6" fill="none" />
          </svg>
        </div>
      )
    },
    {
      id: "salesforce",
      name: "Salesforce",
      gradient: "from-[#00b4f0] to-[#0070d2]",
      topLeftLogo: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M78.6 44.5c.3-1.6.5-3.3.5-5 0-12.7-10.3-23-23-23-9.5 0-17.7 5.8-21.2 14.1-1.8-.7-3.8-1.1-5.9-1.1-9.4 0-17 7.6-17 17 0 1.2.1 2.3.4 3.4C5 51.7 1 58.4 1 66c0 11 9 20 20 20h53c11 0 20-9 20-20 0-9.8-7.1-18-16.5-19.6-1.5-.7-2.9-1.3-4.3-1.9z" />
        </svg>
      ),
      centerLogo: (
        <svg viewBox="0 0 100 100" className="w-14 h-14 fill-[#00a1e0]" xmlns="http://www.w3.org/2000/svg">
          <path d="M78.6 44.5c.3-1.6.5-3.3.5-5 0-12.7-10.3-23-23-23-9.5 0-17.7 5.8-21.2 14.1-1.8-.7-3.8-1.1-5.9-1.1-9.4 0-17 7.6-17 17 0 1.2.1 2.3.4 3.4C5 51.7 1 58.4 1 66c0 11 9 20 20 20h53c11 0 20-9 20-20 0-9.8-7.1-18-16.5-19.6-1.5-.7-2.9-1.3-4.3-1.9z" />
        </svg>
      ),
      bgPatterns: (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 100 Q 50 50 100 100 T 200 100" fill="none" stroke="white" strokeWidth="8" />
          <path d="M 0 130 Q 50 80 100 130 T 200 130" fill="none" stroke="white" strokeWidth="8" />
        </svg>
      )
    },
    {
      id: "kroolo",
      name: "Kroolo",
      gradient: "from-violet-600 to-indigo-900",
      topLeftLogo: (
        <span className="text-white font-extrabold text-xs select-none">K</span>
      ),
      centerLogo: (
        <span className="text-indigo-600 font-extrabold text-2xl select-none">K</span>
      ),
      bgPatterns: (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="200" y2="200" stroke="white" strokeWidth="4" />
          <line x1="200" y1="0" x2="0" y2="200" stroke="white" strokeWidth="4" />
        </svg>
      )
    }
  ];

  const currentPartner = partners.find((p) => p.id === activePartner) || partners[0];

  return (
    <section className="relative w-full py-16 lg:py-24 bg-transparent overflow-hidden font-sans">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center w-full mb-12 lg:mb-16 text-center">
          <SectionBadge text="INTEGRATIONS" variant="line" />

          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            AI Integration Services for <span className="text-[#FF6B2C]">Enterprise Systems</span>
          </h2>

          <p className="text-[15px] lg:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Our offshore AI development team integrates custom AI solutions with leading cloud platforms, business applications, and enterprise systems for secure, scalable, production-ready deployments.
          </p>
        </div>

        {/* Display split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Visual Showcase Card */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-[420px] aspect-[1.5/1] rounded-[32px] overflow-hidden shadow-lg border border-slate-200/80 bg-white relative p-1.5">
              <div className="w-full h-full rounded-[26px] overflow-hidden relative bg-slate-950 flex items-center justify-center min-h-[260px]">

                {/* Active Partner Illustration */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPartner.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 w-full h-full bg-gradient-to-br ${currentPartner.gradient} flex items-center justify-center`}
                  >
                    {/* Background Patterns specific to brand */}
                    {currentPartner.bgPatterns}

                    {/* Left/Top-left floating tile logo */}
                    <div className="absolute top-8 left-8 z-20 w-16 h-16 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                      {currentPartner.topLeftLogo}
                    </div>

                    {/* Center big logo container */}
                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl z-10">
                      {currentPartner.centerLogo}
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>
          </div>

          {/* Right Column: Interaction Brand Partner List */}
          <div className="lg:col-span-6 flex flex-col justify-center pl-0 lg:pl-10">
            <div className="flex flex-col gap-4 relative">
              {partners.map((partner) => {
                const isActive = partner.id === activePartner;
                return (
                  <button
                    key={partner.id}
                    onMouseEnter={() => setActivePartner(partner.id)}
                    onClick={() => setActivePartner(partner.id)}
                    className="group flex items-center justify-between text-left py-3 px-4 rounded-2xl transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Active highlight background pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activePartnerPill"
                        className="absolute inset-0 bg-orange-50/50 border border-orange-100 rounded-2xl -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    <div className="flex items-center gap-4">
                      {/* Interactive indicator dot */}
                      <div className="relative w-2.5 h-2.5 rounded-full flex items-center justify-center">
                        <motion.div
                          className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#FF6B2C] scale-110' : 'bg-slate-300 group-hover:bg-slate-400'}`}
                          animate={isActive ? { scale: [1, 1.4, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                      </div>
                      <span
                        className={`text-lg font-bold transition-colors duration-300 ${isActive
                          ? "text-slate-900"
                          : "text-slate-400 group-hover:text-slate-600"
                          }`}
                      >
                        {partner.name}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${isActive
                        ? "text-[#FF6B2C]"
                        : "text-slate-400 opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      {isActive ? "Active Connection" : "Connect"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
