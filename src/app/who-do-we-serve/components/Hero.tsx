"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserCog, Cpu, Grid2X2, Database, CodeXml, ArrowDown, Shield, Users, Sparkles, Calendar } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

const CAPABILITIES = [
  { id: "01", name: "Offshore\nEngineering", icon: UserCog },
  { id: "02", name: "Agentic AI", icon: Cpu },
  { id: "03", name: "Microsoft", icon: Grid2X2 },
  { id: "04", name: "Data", icon: Database },
  { id: "05", name: "Modern\nEngineering", icon: CodeXml },
];

const IMAGES = [
  { src: "/images/serve/3.jpg", height: "h-[65%]" },
  { src: "/images/serve/4.jpg", height: "h-[85%]" },
  { src: "/images/serve/5.jpg", height: "h-[100%]" },
];

const trustItems = [
  { icon: Shield, title: 'WHITE-LABEL', subtitle: 'Trusted agency partner.' },
  { icon: Users, title: 'OFFSHORE TEAMS', subtitle: 'Scale on demand.' },
  { icon: Cpu, title: 'MICROSOFT AI', subtitle: 'Azure & OpenAI partners.' },
  { icon: Sparkles, title: 'ENTERPRISE AI', subtitle: 'Secure, production-grade.' },
  { icon: Calendar, title: 'SINCE 2013', subtitle: '13+ years of excellence.' },
];

export default function Hero() {
  return (
    <section className="relative w-full pt-24 pb-0 lg:pt-28 lg:pb-0 overflow-hidden flex flex-col">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-8 pb-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* LEFT SIDE: Content */}
          <div className="w-full lg:w-[50%] flex flex-col items-start z-10">
            <span className="text-xs lg:text-sm font-bold tracking-widest text-[#FF6B2C] uppercase mb-4">
              WHO DO WE SERVE?
            </span>
            
            <h1 className="text-4xl lg:text-[3.25rem] font-extrabold text-[#0A0F3C] leading-[1.1] mb-5 tracking-tight">
              Different Challenges.<br />
              One Engineering Partner.
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl leading-relaxed">
              From business leaders looking to accelerate growth to technology teams solving complex engineering challenges, Softree provides the expertise, capacity, and technology capabilities to move forward with confidence.
            </p>

            {/* Capability Items */}
            <div className="flex flex-wrap gap-x-6 gap-y-4 mb-8">
              {CAPABILITIES.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.id} className="flex flex-col items-center gap-2 w-20 lg:w-24">
                    <div className="w-12 h-12 rounded-full bg-[#EAF5F8] flex items-center justify-center text-[#0F6080] shadow-sm">
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <span className="text-xs lg:text-sm font-semibold text-[#0A0F3C] text-center leading-tight whitespace-pre-line">
                      {cap.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <FlowButton 
              href="/contact"
              text="Explore Who We Serve"
              variant="orange-filled"
            />
          </div>

          {/* RIGHT SIDE: Image Composition */}
          <div className="w-full lg:w-[50%] relative h-[350px] lg:h-[500px] mt-8 lg:mt-0 flex items-center justify-end">
            
            {/* The slanted images container */}
            <div className="relative w-full h-[350px] lg:h-[500px] flex items-end justify-center -skew-x-[12deg] ml-2 lg:ml-8">
              {IMAGES.map((img, index) => (
                <div 
                  key={index} 
                  className={`group relative flex-1 ${img.height} overflow-hidden rounded-t-2xl rounded-b-xl border-r-[6px] border-white last:border-r-0 transition-all duration-500 ease-in-out hover:flex-[1.2] shadow-lg`}
                >
                  {/* Un-skew the image itself so faces are normal */}
                  <div className="absolute top-0 -left-[20%] w-[140%] h-full skew-x-[12deg]">
                    <Image
                      src={img.src}
                      alt={`Professional ${index + 1}`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 1024px) 30vw, 20vw"
                      priority
                    />
                  </div>
                  {/* Subtle unified fade overlay inside each panel */}
                  {index < 2 && (
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/50 to-transparent opacity-90 z-0" />
                  )}
                  
                  {/* Solid Blur Triangle Overlay on the 3rd Image */}
                  {index === 2 && (
                    <>
                      {/* Using a rotated div instead of clip-path prevents the backdrop-blur from blurring the whole container (the face) */}
                      <div 
                        className="absolute top-[105%] left-[-10%] w-[200%] h-[200%] bg-[#2F4052]/90 backdrop-blur-md origin-top-left -rotate-[40deg] z-10"
                      />
                      
                      {/* Text perfectly positioned inside the 3rd column, un-skewed so it reads normally */}
                      <div className="absolute bottom-6 right-4 lg:bottom-10 lg:right-8 z-20 flex flex-col gap-1.5 text-left skew-x-[12deg]">
                        {["People", "Technology", "Progress", "Together"].map((text, i) => (
                          <span key={i} className="text-base lg:text-lg font-medium text-white/95 tracking-wide leading-relaxed cursor-default">
                            {text}
                          </span>
                        ))}
                        <div className="flex gap-2 mt-2">
                          <div className="w-6 h-[3px] bg-[#FF6B2C] rounded-full" />
                          <div className="w-6 h-[3px] bg-[#FF6B2C] rounded-full" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="w-full z-20 bg-[#000000] py-4 sm:py-5 mt-auto"
      >
        <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#FF6B00]">
                    <Icon className="h-5 w-5 text-[#FF6B00]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white tracking-wide">{item.title}</span>
                    <span className="text-xs text-[#A1A1AA] mt-0.5">{item.subtitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

