"use client";

import React from "react";
import { HelpCircle, Settings, Users, Layers, Maximize, Lightbulb, ShieldCheck, TrendingUp, Target } from "lucide-react";

export default function HowWeHelp() {
  return (
    <section className="relative w-full py-16 lg:py-24 bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-8 flex flex-col gap-8 lg:gap-12">
        
        {/* Block 1: The Questions You May Be Asking */}
        <div className="bg-[#FFF8F5] rounded-[2rem] p-8 lg:p-12 border border-[#FFE8DF]">
          <div className="flex items-start gap-4 lg:gap-6 mb-10">
            <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#FF6B2C] text-white flex items-center justify-center shadow-lg shadow-[#FF6B2C]/20">
              <HelpCircle className="w-6 h-6 lg:w-8 lg:h-8" />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0A0F3C] mb-2 tracking-tight">
                The Questions You May Be Asking
              </h2>
              <p className="text-lg text-gray-600">
                Here are some of the common questions we hear from technology leaders.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {[
              "Do the engineers have the right technical skills and experience?",
              "Can they scale capacity when our roadmap changes?",
              "Can they integrate with our existing engineering team and processes?",
              "Are they keeping up with emerging technologies like AI?",
              "Will they deliver on time and with the expected quality?",
              "How secure are our data and intellectual property?",
              "Can they provide specialized or niche expertise?",
              "Can they support us beyond simply providing developers?",
            ].map((question, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 lg:p-6 flex items-start gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <HelpCircle className="w-6 h-6 text-[#FF6B2C] flex-shrink-0 mt-0.5 opacity-80 stroke-[2.5]" />
                <p className="text-[#0A0F3C] font-semibold leading-snug">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Block 2: How Softree Addresses Them */}
        <div className="bg-[#F4F9FF] rounded-[2rem] p-8 lg:p-12 border border-[#E0EFFF]">
          <div className="flex items-start gap-4 lg:gap-6 mb-10">
            <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#1A56DB] text-white flex items-center justify-center shadow-lg shadow-[#1A56DB]/20">
              <Settings className="w-6 h-6 lg:w-8 lg:h-8" />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0A0F3C] mb-2 tracking-tight">
                How Softree Addresses Them
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl">
                We combine deep technical expertise, proven delivery practices, and a partnership mindset to address these concerns.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Engineering Expertise",
                description: "Experienced engineers across application development, cloud, data, Microsoft, and AI."
              },
              {
                icon: <Layers className="w-6 h-6" />,
                title: "Seamless Integration",
                description: "Our teams work as an extension of your engineering organization, using your tools and processes."
              },
              {
                icon: <Maximize className="w-6 h-6" />,
                title: "Flexible Scaling",
                description: "Scale engineering capacity up or down based on your project and business needs."
              },
              {
                icon: <Lightbulb className="w-6 h-6" />,
                title: "Specialized Capabilities",
                description: "Access niche expertise in Microsoft, AI, cloud, data, and modern engineering."
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Security & Governance",
                description: "Enterprise-grade practices to ensure security, access control, and IP protection."
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Continuous Innovation",
                description: "We stay current with emerging technologies so you can build what's next."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 lg:p-8 flex flex-col items-start gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-[#1A56DB] bg-[#F0F6FF] p-3 rounded-xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A0F3C] mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Block 3: The Outcome */}
        <div className="bg-[#F2FAF5] rounded-[2rem] p-8 lg:p-12 border border-[#E0F2E8] relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start lg:items-center">
            <div className="w-full lg:w-2/3">
              <div className="flex items-start gap-4 lg:gap-6 mb-10">
                <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-lg shadow-[#059669]/20">
                  <Target className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0A0F3C] mb-2 tracking-tight">
                    The Outcome
                  </h2>
                  <p className="text-lg text-gray-600 max-w-xl">
                    A stronger, more flexible engineering organization that helps you deliver today and build for tomorrow.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-[2.2rem] font-extrabold text-[#0A0F3C] leading-tight max-w-none md:whitespace-nowrap">
                Extend your engineering organization<br />
                without extending your hiring burden.
              </h3>
            </div>
            
            {/* Mountain SVG Graphic */}
            <div className="hidden md:flex w-full lg:w-1/3 justify-end items-end h-full relative opacity-80">
              <svg width="400" height="250" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-[-48px] right-[-24px] pointer-events-none">
                {/* Mountain Layers */}
                <path d="M100 250 L200 120 L270 180 L350 80 L450 250 Z" fill="url(#paint0_linear)" stroke="#D1E8DB" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M50 250 L150 150 L220 200 L300 100 L400 250 Z" fill="url(#paint1_linear)" stroke="#A7D5B8" strokeWidth="1.5" />
                
                {/* Wireframe lines */}
                <path d="M150 150 L180 200 M300 100 L250 180" stroke="#D1E8DB" strokeWidth="1" />
                
                {/* Flag */}
                <path d="M350 80 L350 30" stroke="#FF6B2C" strokeWidth="3" strokeLinecap="round" />
                <path d="M350 30 L390 45 L350 60 Z" fill="#FF6B2C" />
                
                <defs>
                  <linearGradient id="paint0_linear" x1="250" y1="80" x2="250" y2="250" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E6F4EA" />
                    <stop offset="1" stopColor="#F2FAF5" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="200" y1="100" x2="200" y2="250" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D1E8DB" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#F2FAF5" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="relative z-20 text-right pr-6 pb-2">
                <p className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-1">Greater</p>
                <p className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-1">Capability.</p>
                <p className="text-sm font-bold text-[#6B7280] uppercase tracking-widest">Faster Progress.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
