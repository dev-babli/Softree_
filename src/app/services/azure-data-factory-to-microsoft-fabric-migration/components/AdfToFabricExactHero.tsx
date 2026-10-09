"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Database,
  ArrowRight,
  Rocket,
  ShieldCheck,
  Cloud,
  Users,
} from "lucide-react";
import TrustStrip from "@/components/sections/TrustStrip";

function AdfOriginalLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo/azure-data-factory.svg"
      alt="Azure Data Factory"
      className="h-20 w-20 object-contain sm:h-24 sm:w-24"
    />
  );
}

function FabricOriginalLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo/microsoft-fabric.svg"
      alt="Microsoft Fabric"
      className="h-20 w-20 object-contain sm:h-24 sm:w-24"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Glossy 3D Process Node Icons (Pipelines, Data, Transformation, Analytics)
   ───────────────────────────────────────────────────────────── */
function PipelinesIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 drop-shadow-sm">
      <defs>
        <linearGradient id="pipeBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF9F43" />
          <stop offset="100%" stopColor="#E65100" />
        </linearGradient>
        <linearGradient id="pipeFlange" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF7043" />
          <stop offset="50%" stopColor="#FF9F43" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>
      </defs>
      {/* Horizontal connector */}
      <rect x="14" y="17" width="12" height="6" fill="url(#pipeBody)" />
      {/* Left flange */}
      <path d="M14 12 H10 V28 H14 Z" fill="url(#pipeFlange)" />
      <path d="M10 12 Q7 12 7 20 Q7 28 10 28" fill="#FF8A65" />
      <path d="M14 12 Q17 12 17 20 Q17 28 14 28" fill="#D84315" />
      {/* Right flange */}
      <path d="M30 12 H26 V28 H30 Z" fill="url(#pipeFlange)" />
      <path d="M26 12 Q23 12 23 20 Q23 28 26 28" fill="#FF8A65" />
      <path d="M30 12 Q33 12 33 20 Q33 28 30 28" fill="#D84315" />
    </svg>
  );
}

function DataIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 drop-shadow-sm">
      <defs>
        <linearGradient id="dbBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF7043" />
          <stop offset="30%" stopColor="#FF9F43" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>
      </defs>
      {/* Cylinder body */}
      <path d="M10 16 V28 C10 32.5 20 34 30 28 V16 Z" fill="url(#dbBody)" />
      {/* Cylinder top */}
      <ellipse cx="20" cy="16" rx="10" ry="4" fill="#FFE0B2" />
      <ellipse cx="20" cy="16" rx="8" ry="2.5" fill="#FFB74D" />
      {/* Subtle bottom shadow line */}
      <ellipse cx="20" cy="28" rx="10" ry="4" fill="none" stroke="#BF360C" strokeWidth="1" opacity="0.3"/>
    </svg>
  );
}

function TransformationIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 drop-shadow-sm">
      <defs>
        <linearGradient id="syncBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9F43" />
          <stop offset="100%" stopColor="#E65100" />
        </linearGradient>
      </defs>
      {/* 3D Circle */}
      <circle cx="20" cy="20" r="12" fill="url(#syncBody)" />
      {/* Inner circular arrows */}
      <path d="M16 13 Q24 10 26 17 L24 17 L27.5 22 L31 17 L29 17 Q27 8 16 11 Z" fill="#FFF" />
      <path d="M24 27 Q16 30 14 23 L16 23 L12.5 18 L9 23 L11 23 Q13 32 24 29 Z" fill="#FFF" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 drop-shadow-sm">
      <defs>
        <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF9F43" />
          <stop offset="100%" stopColor="#E65100" />
        </linearGradient>
      </defs>
      {/* Bars */}
      <rect x="8" y="20" width="6" height="12" rx="1.5" fill="url(#barGrad)" />
      <rect x="17" y="14" width="6" height="18" rx="1.5" fill="url(#barGrad)" />
      <rect x="26" y="8" width="6" height="24" rx="1.5" fill="url(#barGrad)" />
      
      {/* Magnifying Glass / Pie overlay */}
      <circle cx="31" cy="11" r="5" fill="#FF9F43" stroke="#FFF" strokeWidth="1.5" />
      <path d="M31 6 A5 5 0 0 1 36 11 L31 11 Z" fill="#FFF" />
    </svg>
  );
}


export default function AdfToFabricExactHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black pt-28 sm:pt-32 md:pt-36 pb-0 font-sans select-none">
      {/* Background ambient glow matching Bedrock */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="w-[800px] h-[400px] bg-[#FF6B00] blur-[140px] rounded-full opacity-20 transform -translate-y-20"></div>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 z-10">
        {/* MAIN 2-COLUMN HERO ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ──────────────── LEFT COLUMN: COPY & CTA ──────────────── */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center lg:pr-4">

            {/* Eyebrow Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-4 py-1.5 sm:px-4.5 sm:py-2 text-xs sm:text-[13px] font-bold tracking-wider text-[#FF6B00] backdrop-blur-md shadow-[0_0_15px_rgba(255,107,0,0.15)] w-fit"
            >
              <span className="h-2 w-2 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00] animate-pulse" />
              <span className="uppercase tracking-wide">Data Modernization</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-extrabold text-white tracking-tight leading-[1.12] mb-6"
            >
              Azure Data Factory to{" "}
              <span className="text-[#FF6B00] inline-block drop-shadow-[0_0_25px_rgba(255,107,0,0.4)]">Microsoft Fabric</span>{" "}
              Migration
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 dark:text-slate-400 text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-xl mb-8 font-normal"
            >
              Move your data pipelines from Azure Data Factory to Microsoft Fabric and unlock a unified, scalable, and AI-powered analytics platform — with minimal disruption and maximum value.
            </motion.p>


          </div>


          {/* ──────────────── RIGHT COLUMN: HIGH-PRECISION 3D ISOMETRIC STAGE ──────────────── */}
          <div className="lg:col-span-7 xl:col-span-7 relative flex w-full items-center justify-center overflow-hidden">
            <div className="relative h-[300px] w-full max-w-[700px] min-[420px]:h-[350px] sm:h-[420px] md:h-[470px] lg:h-[520px]">
            <div className="absolute left-1/2 top-0 w-[640px] origin-top -translate-x-1/2 scale-[0.54] min-[420px]:scale-[0.64] sm:scale-[0.78] md:scale-[0.9] lg:scale-100">
            <div className="relative flex h-[480px] w-[640px] flex-col items-center justify-between overflow-visible">

              {/* 1. TOP FLOATING PROCESS NODES IN AN ARC (Pipelines, Data, Transformation, Analytics) */}
              <div className="absolute top-[8%] sm:top-[6%] left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2 sm:gap-5 pointer-events-none w-full max-w-lg">
                
                {/* Pipelines */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: [0, -6, 0] }}
                  transition={{ opacity: { duration: 0.5, delay: 0.3 }, y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } }}
                  className="flex shrink-0 flex-col items-center justify-center bg-white p-2 sm:p-2 w-20 h-20 sm:w-[90px] sm:h-[90px] rounded-2xl border-2 border-slate-50 shadow-[0_8px_0_#cbd5e1,0_15px_20px_rgba(0,0,0,0.1)] transform translate-y-6 rotate-[-4deg]"
                >
                  <div className="mb-1">
                    <PipelinesIcon />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-700">Pipelines</span>
                </motion.div>

                {/* Data */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: [0, -6, 0] }}
                  transition={{ opacity: { duration: 0.5, delay: 0.4 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 } }}
                  className="flex shrink-0 flex-col items-center justify-center bg-white p-2 sm:p-2 w-20 h-20 sm:w-[90px] sm:h-[90px] rounded-2xl border-2 border-slate-50 shadow-[0_8px_0_#cbd5e1,0_15px_20px_rgba(0,0,0,0.1)] transform -translate-y-1 rotate-[-1deg]"
                >
                  <div className="mb-1">
                    <DataIcon />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-700">Data</span>
                </motion.div>

                {/* Transformation */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: [0, -6, 0] }}
                  transition={{ opacity: { duration: 0.5, delay: 0.5 }, y: { duration: 3.3, repeat: Infinity, ease: "easeInOut", delay: 0.4 } }}
                  className="flex shrink-0 flex-col items-center justify-center bg-white p-2 sm:p-2 w-20 h-20 sm:w-[90px] sm:h-[90px] rounded-2xl border-2 border-slate-50 shadow-[0_8px_0_#cbd5e1,0_15px_20px_rgba(0,0,0,0.1)] transform -translate-y-1 rotate-[1deg]"
                >
                  <div className="mb-1">
                    <TransformationIcon />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-700 leading-tight text-center">Transform</span>
                </motion.div>

                {/* Analytics */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: [0, -6, 0] }}
                  transition={{ opacity: { duration: 0.5, delay: 0.6 }, y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 } }}
                  className="flex shrink-0 flex-col items-center justify-center bg-white p-2 sm:p-2 w-20 h-20 sm:w-[90px] sm:h-[90px] rounded-2xl border-2 border-slate-50 shadow-[0_8px_0_#cbd5e1,0_15px_20px_rgba(0,0,0,0.1)] transform translate-y-6 rotate-[4deg]"
                >
                  <div className="mb-1">
                    <AnalyticsIcon />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-700">Analytics</span>
                </motion.div>
              </div>


              {/* 2. 3D ISOMETRIC STAGE & CURVED TUBE ARROW */}
              <div className="relative w-full h-full flex items-end justify-between px-2 sm:px-6 pb-6 pt-24 overflow-visible">

                {/* BACKGROUND 3D CURVED GRADIENT ARROW TUBE WITH STREAMING DASHES */}
                <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center overflow-visible">
                  <svg
                    className="w-full h-full max-h-[380px] overflow-visible"
                    viewBox="0 0 640 340"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <style>
                        {`
                          @keyframes dashFlow {
                            0% { stroke-dashoffset: 48; }
                            100% { stroke-dashoffset: 0; }
                          }
                          .animate-dash-flow {
                            animation: dashFlow 1.6s linear infinite;
                          }
                        `}
                      </style>
                      <linearGradient id="arc3DTube" x1="160" y1="210" x2="480" y2="210" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#FF6B00" stopOpacity="1" />
                      </linearGradient>

                      <filter id="arc3DGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="14" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Thick Glowing Gradient Tube Arc */}
                    <path
                      d="M 180 230 Q 335 110 475 190"
                      stroke="url(#arc3DTube)"
                      strokeWidth="28"
                      strokeLinecap="round"
                      filter="url(#arc3DGlow)"
                    />

                    {/* Glowing White Streaming Pulse Line */}
                    <path
                      className="animate-dash-flow"
                      d="M 180 230 Q 335 110 475 190"
                      stroke="white"
                      strokeWidth="5"
                      strokeDasharray="10 14"
                      opacity="0.9"
                    />

                    {/* 3D Arrowhead Pointing Right into Microsoft Fabric Card */}
                    <path
                      d="M 450 162 L 496 192 L 454 216 Z"
                      fill="#FF6B00"
                      stroke="#E55D00"
                      strokeWidth="4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>


                {/* ──────────────── LEFT 3D CYLINDER PEDESTAL: AZURE DATA FACTORY ──────────────── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative z-20 flex shrink-0 flex-col items-center group cursor-pointer"
                >
                  {/* Thick 3D Cylinder Base Pedestal */}
                  <div className="relative w-52 h-24 sm:w-60 sm:h-28 flex items-center justify-center">
                    {/* Pedestal Bottom Floor Glow */}
                    <div className="absolute inset-0 rounded-[50%] bg-orange-500/45 blur-2xl transform translate-y-5 scale-95" />
                    
                    {/* Cylinder Pedestal Side Body */}
                    <div className="absolute inset-0 rounded-[50%] bg-gradient-to-b from-[#fdba74] via-[#f97316] to-[#c2410c] shadow-[0_20px_40px_rgba(249,115,22,0.4)] transform translate-y-4" />
                    
                    {/* Cylinder Pedestal Top Oval Surface */}
                    <div className="absolute inset-x-0 top-0 h-18 sm:h-20 rounded-[50%] bg-gradient-to-b from-white via-orange-100 to-orange-200 border-2 border-white shadow-inner" />
                  </div>

                  {/* Upright White 3D Card (Azure Data Factory) */}
                  <div className="absolute -top-40 sm:-top-44 flex flex-col items-center bg-white rounded-[32px] p-5 sm:p-6 shadow-[0_12px_0_#e2e8f0,0_24px_48px_rgba(249,115,22,0.3)] border-2 border-slate-50 w-44 sm:w-52 group-hover:-translate-y-2.5 transition-transform duration-300">
                    
                    {/* Real 3D Azure Data Factory Logo */}
                    <div className="mb-3">
                      <AdfOriginalLogo />
                    </div>

                    <span className="text-sm sm:text-base font-extrabold text-[#0369A1] text-center leading-snug">
                      Azure<br />Data Factory
                    </span>
                  </div>
                </motion.div>


                {/* ──────────────── RIGHT 3D CYLINDER PEDESTAL: MICROSOFT FABRIC ──────────────── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative z-20 flex shrink-0 flex-col items-center group cursor-pointer"
                >
                  {/* Thick 3D Cylinder Base Pedestal */}
                  <div className="relative w-52 h-24 sm:w-60 sm:h-28 flex items-center justify-center">
                    {/* Pedestal Bottom Floor Glow */}
                    <div className="absolute inset-0 rounded-[50%] bg-orange-500/45 blur-2xl transform translate-y-5 scale-95" />
                    
                    {/* Cylinder Pedestal Side Body */}
                    <div className="absolute inset-0 rounded-[50%] bg-gradient-to-b from-[#fdba74] via-[#f97316] to-[#c2410c] shadow-[0_20px_40px_rgba(249,115,22,0.4)] transform translate-y-4" />
                    
                    {/* Cylinder Pedestal Top Oval Surface */}
                    <div className="absolute inset-x-0 top-0 h-18 sm:h-20 rounded-[50%] bg-gradient-to-b from-white via-orange-100 to-orange-200 border-2 border-white shadow-inner" />
                  </div>

                  {/* Upright White 3D Card (Microsoft Fabric) */}
                  <div className="absolute -top-40 sm:-top-44 flex flex-col items-center bg-white rounded-[32px] p-5 sm:p-6 shadow-[0_12px_0_#e2e8f0,0_24px_48px_rgba(249,115,22,0.3)] border-2 border-slate-50 w-44 sm:w-52 group-hover:-translate-y-2.5 transition-transform duration-300">
                    
                    {/* Real 3D Microsoft Fabric Ribbon Logo */}
                    <div className="mb-3">
                      <FabricOriginalLogo />
                    </div>

                    <span className="text-sm sm:text-base font-extrabold text-[#047857] text-center leading-snug">
                      Microsoft<br />Fabric
                    </span>
                  </div>
                </motion.div>

              </div>
            </div>
            </div>
            </div>
          </div>
        </div>


        {/* ──────────────── BOTTOM FEATURE VALUE BAR (FLOATING WHITE CARD) ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4 }}
          className="w-full z-20 shrink-0 mt-8 sm:mt-12 pb-8"
        >
          <TrustStrip theme="dark" />
        </motion.div>

      </div>
    </section>
  );
}
