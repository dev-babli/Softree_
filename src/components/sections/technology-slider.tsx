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
      "Helping partners execute Power Platform and Dynamics implementations. We operate as your extended Power Platform engineering team, ensuring successful delivery, scalability, and consistency across projects.",
    bgImage:
      "/images/business.png",
    link: "/services/business-applications",
    partnerValue:
      "We operate as your extended Power Platform engineering team.",
    icon: Briefcase,
  },
  {
    id: 2,
    title: "Data & Analytics Execution",
    description:
      "Strengthening BI and transformation initiatives with reliable engineering and modern platforms. From data architecture to dashboard deployment, we deliver under your brand.",
    bgImage:
      "/images/data.png",
    link: "/services/data-analytics",
    partnerValue:
      "From data architecture to dashboard deployment — we deliver reliably under your brand.",
    icon: BarChart3,
  },
  {
    id: 3,
    title: "AI & Intelligent Automation Enablement",
    description:
      "Supporting AI integration across client engagements. We help partners introduce advanced intelligence, automation, and modern AI frameworks into enterprise environments with confidence.",
    bgImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
    link: "/services/ai-automation",
    partnerValue:
      "We help you integrate AI capabilities confidently into enterprise environments.",
    icon: Brain,
  },
  {
    id: 4,
    title: "Digital Workspace & Custom Application Engineering",
    description:
      "Enhancing Microsoft 365 and custom application capabilities. We build secure, scalable solutions that align with your consulting strategy.",
    bgImage:
      "/images/digital.png",
    link: "/services/digital-workspace",
    partnerValue: "Custom solutions that complement your consulting strategy.",
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
    <section className="relative h-[600px] w-full overflow-hidden bg-black text-white flex">
      {/* ================= BACKGROUND ================= */}
      {techData.map((item, i) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            activeIndex === i ? "opacity-100" : "opacity-0",
          )}
          style={{
            backgroundImage: `url(${item.bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      {/* ================= ACCORDION TABS ================= */}
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
              className={cn(
                "relative border-l border-white/10 overflow-hidden transition-all duration-500 flex",
                isActive ? "flex-[7]" : "flex-[1]",
              )}
            >
              {/* ============ COLLAPSED ============ */}
              {!isActive && (
                <>
                  <div className="group flex items-center justify-center w-full cursor-pointer transition-all duration-300">
                    <div
                      className="
        -rotate-90 whitespace-nowrap
        text-base font-semibold tracking-wider
        text-white/70
        transition-all duration-300
        group-hover:text-white group-hover:scale-105
      "
                    >
                      {item.title}
                    </div>
                  </div>

                  {/* BIG ID */}
                  <span
                    className="
      absolute bottom-10 left-1/2 -translate-x-1/2
      text-3xl font-bold
      text-white
      transition-all duration-300
      group-hover:text-white
    "
                  >
                    0{item.id}
                  </span>
                </>
              )}
              {/* ============ EXPANDED ============ */}
              {isActive && (
                <div className="relative w-full px-14 py-10 flex flex-col">
                  {/* vertical divider */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent" />

                  {/* ================= HEADER ================= */}
                  <div className="mb-4">
                    <span className="text-[52px] font-extrabold text-blue-500 tracking-tight">
                      0{item.id}
                    </span>
                  </div>

                  {/* ================= TITLE WITH ICON ================= */}
                  <div className="flex items-center gap-4 mb-2 max-w-2xl">
                    {/* icon */}
                    <div
                      className="
      flex h-10 w-10 items-center justify-center
      rounded-xl
      bg-gradient-to-br from-blue-500 to-cyan-400
      shadow-[0_0_15px_rgba(56,189,248,0.6)]
    "
                    >
                      <item.icon size={18} className="text-white" />
                    </div>

                    {/* title */}
                    <h3 className="relative text-[30px] font-semibold tracking-tight group/title">
                      <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                        {item.title}
                      </span>

                      {/* underline */}
                      <span
                        className="
        absolute left-0 -bottom-2 h-[3px]
        w-0 group-hover/title:w-full
        transition-all duration-500
        rounded-full
        bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-400
      "
                      />
                    </h3>
                  </div>

                  {/* ================= DESCRIPTION ================= */}
                  <p className="text-white/70 text-[16px] leading-relaxed max-w-xl mb-2">
                    {item.description}
                  </p>

                  {/* ================= HIGHLIGHTS ================= */}
                  <ul className="grid grid-cols-2 gap-x-8 gap-y-4 mb-3 max-w-xl">
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

                  {/* ================= PARTNER VALUE ================= */}
                  <div
                    className="
        relative mb-5 max-w-xl
        rounded-2xl
        border border-cyan-400/20
        bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent
        p-5
      "
                  >
                    <div className="absolute inset-0 rounded-2xl bg-cyan-400/5 blur-xl pointer-events-none" />

                    <div className="relative flex items-start gap-3">
                      <div
                        className="
            mt-1 flex h-8 w-8 items-center justify-center
            rounded-lg
            bg-gradient-to-br from-cyan-400 to-blue-500
            text-white text-xl font-bold
            shadow-[0_0_15px_rgba(56,189,248,0.6)]
          "
                      >
                        ★
                      </div>

                      <div>
                        <p className="text-l font-bold tracking-wide text-cyan-300 uppercase mb-1">
                          Partner Value
                        </p>

                        <p className="text-m text-white/90 leading-relaxed">
                          {item.partnerValue}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ================= CTA ================= */}
                  <Link
                    href={item.link}
                    className="
        inline-flex items-center justify-center
        bg-gradient-to-r from-blue-600 to-cyan-500
        px-7 py-2
        rounded-full
        text-white text-sm font-semibold
        hover:scale-105
        hover:shadow-[0_10px_25px_rgba(59,130,246,0.5)]
        transition-all duration-300
        w-fit
      "
                  >
                    Learn More →
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
