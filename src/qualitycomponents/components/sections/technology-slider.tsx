"use client";
import { Briefcase, BarChart3, Brain, Monitor } from "lucide-react";
import { LucideIcon } from "lucide-react";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TechItem {
  id: number;
  title: string;
  description: string;
  bgImage: string;
  partnerValue: string;
  link: string;
  icon: LucideIcon;
}

const techData: TechItem[] = [
  {
    id: 1,
    title: "Business Applications Delivery Support",
    description:
      "Power Platform & Dynamics delivery support with scalable engineering.",
    bgImage: "/images/business.png",
    link: "/services/business-applications/power-apps",
    partnerValue:
      "We operate as your extended Power Platform engineering team.",
    icon: Briefcase,
  },
  {
    id: 2,
    title: "Data & Analytics Execution",
    description:
      "Reliable BI, data architecture, and dashboard delivery under your brand.",
    bgImage: "/images/data.png",
    link: "/services/data-analytics/power-bi",
    partnerValue:
      "From data architecture to dashboard deployment — we deliver reliably under your brand.",
    icon: BarChart3,
  },
  {
    id: 3,
    title: "AI & Intelligent Automation Enablement",
    description:
      "AI integration and automation for modern enterprise solutions.",
    bgImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
    link: "/services/ai-intelligence/agentic-ai",
    partnerValue:
      "We help you integrate AI capabilities confidently into enterprise environments.",
    icon: Brain,
  },
  {
    id: 4,
    title: "Digital Workspace & Custom Application Engineering",
    description:
      "Secure Microsoft 365 and custom app solutions aligned to your strategy.",
    bgImage: "/images/digital.jpg",
    link: "/services/digital-workspace/web-app-development",
    partnerValue:
      "Custom solutions that complement your consulting strategy.",
    icon: Monitor,
  },
];

const serviceHighlights: Record<number, string[]> = {
  1: [
    "Power Apps",
    "Power Automate",
    "Dataverse",
    "Dynamics 365 F&O",
    "SharePoint Integration",
  ],
  2: [
    "Power BI",
    "Microsoft Fabric",
    "Databricks",
    "Snowflake",
    "Data Modeling & Pipelines",
  ],
  3: [
    "Azure AI Foundry",
    "Copilot Integration",
    "AI Agents",
    "RAG Systems",
    "Workflow Automation",
  ],
  4: [
    "SharePoint Intranets",
    "Teams Governance",
    "Web Applications (React / .NET)",
    "Mobile Applications",
    "API Integrations",
  ],
};

export default function TechnologySlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // autoplay
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % techData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section className="relative h-[520px] w-full overflow-hidden bg-black text-white flex">
     {/* ================= BACKGROUND ================= */}
{techData.map((item, i) => (
  <div
    key={item.id}
    className={`absolute inset-0 transition-opacity duration-700 ${
      activeIndex === i ? "opacity-100" : "opacity-0"
    }`}
  >
    {/* Softer Background Blur */}
    <div
      className="absolute inset-0 bg-cover bg-center blur-[1.5px] scale-105 brightness-95"
      style={{
        backgroundImage: `url(${item.bgImage})`,
      }}
    />

    {/* Single Overlay (clean) */}
    <div className="absolute inset-0 bg-black/40" />
  </div>
))}

      {/* ================= ACCORDION ================= */}
      <div className="relative h-full flex w-full z-20">
        {techData.map((item, i) => {
          const isActive = activeIndex === i;

          return (
            <div
              key={item.id}
              onMouseEnter={() => {
                setIsHovering(true);
                setActiveIndex(i);
              }}
              onMouseLeave={() => setIsHovering(false)}
              className={`relative border-l border-white/10 overflow-hidden transition-all duration-500 flex ${
                isActive ? "flex-[7]" : "flex-[1]"
              }`}
            >
              {/* ================= COLLAPSED ================= */}
              {!isActive && (
                <>
                  <div className="group flex items-center justify-center w-full cursor-pointer">
                    <div className="-rotate-90 whitespace-nowrap text-base font-semibold tracking-wider text-white/70 group-hover:text-white transition">
                      {item.title}
                    </div>
                  </div>

                  <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-3xl font-bold text-white">
                    0{item.id}
                  </span>
                </>
              )}

              {/* ================= EXPANDED ================= */}
              {isActive && (
                <div
                  className="
                relative w-full px-14 py-10 flex flex-col
                bg-white/5 backdrop-blur-md
                border border-white/10
                rounded-2xl
                shadow-[0_0_40px_rgba(0,0,0,0.6)]
              "
                >
                  

                  {/* ID */}
                  <span className="text-[52px] font-extrabold text-white ">
                    0{item.id}
                  </span>

                  {/* TITLE */}
                  <h3 className="text-[32px] font-semibold tracking-tight mb-2">
                    <span className="bg-white bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                      {item.title}
                    </span>
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-white/90 text-[16px] leading-relaxed max-w-xl mb-4">
                    {item.description}
                  </p>

                  {/* HIGHLIGHTS */}
                  <ul className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6 max-w-xl">
                    {serviceHighlights[item.id]?.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-white/80"
                      >
                        <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]">
                          <span className="text-[11px] font-bold text-white">
                            ✓
                          </span>
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* PARTNER VALUE */}
                  <div className="relative mb-1 max-w-xl rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent p-5">
                    <div className="absolute inset-0 rounded-2xl bg-cyan-400/5 blur-xl pointer-events-none" />

                    <div className="relative flex items-start gap-3">
                      <div className=" flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white font-bold shadow-[0_0_15px_rgba(56,189,248,0.6)]">
                        ★
                      </div>

                      <div>
                        <p className="text-sm font-bold tracking-wide text-cyan-300 uppercase mb-1">
                          Partner Value
                        </p>
                        <p className="text-sm text-white/90 leading-relaxed">
                          {item.partnerValue}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <a
                    href={item.link}
                    className="mt-1 inline-flex items-center justify-center hover:bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-2 rounded-full text-white text-sm font-semibold hover:scale-105 hover:shadow-[0_10px_25px_rgba(59,130,246,0.5)] transition-all duration-300 w-fit"
                  >
                    Learn More →
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
