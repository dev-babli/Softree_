"use client";

import React, { useEffect, useState } from "react";
import { History, Layers, ShieldCheck } from "lucide-react";

const HeroSection = () => {
  // 0 = video, 1..3 = images
  const [activeBg, setActiveBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBg((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const images = [
    "/images/hero-2.png",
    "/images/power-plat.png",
    "/images/hero-1.png",
    "/images/ai-1.png",
  ];

  // 👇 Content per slide
  const TRUST_LINE =
    "Since 2013 White-Label Friendly Delivery Agile Engineering Direct Leadership Access Flexible Engagement Long-Term Partnership";

  const slides = [
    {
      eyebrow: "Microsoft Partner Enablement",
      headline: "Your Trusted Microsoft Technology Delivery Partner",
      subheadline:
        "Empowering Microsoft Partners & Consulting Firms with Reliable, Scalable Engineering Support.",
      support:
        "White-Label Friendly | NDA-Driven Engagement | Transparent Collaboration",
      cta: "Partner With Us",
      secondaryCta: "Schedule a Strategy Call",
      trust: TRUST_LINE,
    },
    {
      eyebrow: "Business Applications Support",
      headline: "Extend Your Power Platform & Dynamics Delivery Capability",
      subheadline:
        "Power Apps | Power Automate | SharePoint | Dataverse | Dynamics 365 F&O",
      support:
        "We operate as your extended engineering team to deliver client commitments efficiently and professionally.",
      cta: "Explore Business Applications Support",
      trust: TRUST_LINE,
    },
    {
      eyebrow: "Data & BI Execution",
      headline: "Reliable Data & BI Execution for Your Client Projects",
      subheadline: "Power BI | Databricks | Snowflake | Microsoft Fabric",
      support:
        "From data modeling to dashboard deployment — we strengthen your analytics delivery stack.",
      cta: "View Data & BI Capabilities",
      trust: TRUST_LINE,
    },
    {
      eyebrow: "AI Collaboration",
      headline: "Agentic AI & Intelligent Automation Engineering Support",
      subheadline:
        "Azure AI Foundry | AI Agents | Intelligent Workflow Automation",
      support:
        "Helping partners confidently integrate AI-powered solutions into modern client environments.",
      cta: "Discover AI Collaboration",
      trust: TRUST_LINE,
    },
  ];

  const current = slides[activeBg];

  return (
    <section className="relative min-h-[650px] bg-[#00091A] overflow-hidden pt-10">
      {/* ================= VIDEO ================= */}
      {/* ================= SLIDING BACKGROUNDS ================= */}
      {/* ================= SLIDING BACKGROUNDS ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${activeBg * 100}%)`,
          }}
        >
          {images.map((img, i) => (
            <div key={i} className="relative min-w-full h-full">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* ================= OVERLAY ================= */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#00091A]/90 via-[#00091A]/70 to-[#00091A]/40" />

      {/* Fade below navbar */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-30 container mx-auto px-6 lg:px-0 flex items-center min-h-[550px]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="py-12 md:w-[75%] lg:w-[65%] space-y-7">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/20 bg-white/5">
              <span className="h-2 w-2 rounded-full bg-cyber-blue" />
              <span className="text-sm text-white/85 tracking-wide">
                {current.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="
    leading-[1.1]
    text-4xl md:text-5xl lg:text-6xl
    font-semibold
    tracking-tight
    max-w-4xl
    bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400
    bg-clip-text text-transparent
  "
              style={{ fontFamily: "Calibri, serif" }}
            >
              {current.headline}
            </h1>

            {/* ================= SUBHEADLINE ================= */}
            <p
              className="
    inline-block
    text-sm md:text-base
    px-5 py-2
    rounded-full
    bg-white/5
    border border-white/10
    text-cyan-200
    backdrop-blur-md
    max-w-fit
  "
              style={{ fontFamily: "Calibri, serif" }}
            >
              {current.subheadline}
            </p>

            {/* ================= SUPPORTING ================= */}
            <p
              className="
    text-sm md:text-base
    text-white/60
    leading-relaxed
    max-w-2xl
  "
            >
              {current.support}
            </p>

            {/* ================= CTA ================= */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              {/* Primary */}
              <a
                href="/contact"
                className="
            inline-flex items-center justify-center
            px-10 py-3 rounded-full
            bg-gradient-to-r from-blue-600 to-cyan-500
            text-white font-semibold
            hover:scale-105
            hover:shadow-[0_10px_30px_rgba(59,130,246,0.5)]
            transition-all
          "
              >
                {current.cta}
              </a>

              {/* Secondary */}
              {current.secondaryCta && (
                <a
                  href="/contact"
                  className="
              inline-flex items-center justify-center
              px-8 py-3 rounded-full
              border border-white/20
              text-white/90
              hover:bg-white/10
              transition-all
            "
                >
                  {current.secondaryCta}
                </a>
              )}
            </div>

            {/* ================= TRUST LINE ================= */}
            <p className="text-m text-white/50 pt-4">{current.trust}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
