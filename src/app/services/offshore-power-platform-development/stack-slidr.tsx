"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FlowButton } from "@/components/ui/flow-button";
import { Layers, Workflow, Database, Settings, Bot } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const items = [
  {
    num: "01",
    title: "Custom Power Apps Development",
    titleSplit: "Custom Power Apps<br />Development",
    icon: Layers,
    desc: "Build custom business applications with Microsoft Power Apps to digitize processes, improve productivity, and replace spreadsheets and manual workflows.",
    points: [
      "Approval systems",
      "Inspection apps",
      "Internal business tools",
    ],
    challenges: [
      "Manual spreadsheets",
      "Slow approvals",
      "Disconnected teams",
    ],
    bg: "#0D0D0D",
    text: "#ffffff",
    accent: "#FF6B00",
    isLight: false,
    link: "/contact",
  },
  {
    num: "02",
    title: "Power Automate Development",
    titleSplit: "Power Automate<br />Development",
    icon: Workflow,
    desc: "Automate repetitive business processes with Microsoft Power Automate, including approvals, notifications, data processing, and cross-system workflows.",
    points: [
      "Automated approvals",
      "Workflow notifications",
      "Process automation",
    ],
    challenges: [
      "Manual handoffs",
      "Repetitive tasks",
      "Delayed processes",
    ],
    bg: "#C94716",
    text: "#ffffff",
    accent: "#ffffff",
    isLight: false,
    link: "/contact",
  },
  {
    num: "03",
    title: "Power BI Development",
    titleSplit: "Power BI<br />Development",
    icon: Database,
    desc: "Turn business data into actionable insights with Power BI dashboards, reports, analytics, and connected business intelligence solutions.",
    points: [
      "Power BI dashboards",
      "Operational reporting",
      "Data-driven insights",
    ],
    challenges: [
      "Poor visibility",
      "Manual reporting",
      "Data silos",
    ],
    bg: "#141414",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/contact",
  },
  {
    num: "04",
    title: "Power Pages Development",
    titleSplit: "Power Pages<br />Development",
    icon: Settings,
    desc: "Build secure customer, partner, and self-service portals with Microsoft Power Pages connected to Dataverse and existing business systems.",
    points: [
      "Customer portals",
      "Partner portals",
      "Self-service experiences",
    ],
    challenges: [
      "Manual customer interactions",
      "Disconnected portal experiences",
      "Limited external access",
    ],
    bg: "#FCFBF9",
    text: "#111111",
    accent: "#FF6B00",
    isLight: true,
    link: "/contact",
  },
  {
    num: "05",
    title: "Dataverse Development",
    titleSplit: "Dataverse<br />Development",
    icon: Database,
    desc: "Design and develop secure, structured business data solutions with Microsoft Dataverse to power connected Power Platform applications and workflows.",
    points: [
      "Business data modeling",
      "Microsoft 365 integration",
      "API connectivity",
    ],
    challenges: [
      "Data silos",
      "Duplicate records",
      "Disconnected applications",
    ],
    bg: "#1C1A18",
    text: "#ffffff",
    accent: "#FF6B00",
    isLight: false,
    link: "/contact",
  },
  {
    num: "06",
    title: "Copilot Studio & AI Solutions",
    titleSplit: "Copilot Studio &<br />AI Solutions",
    icon: Bot,
    desc: "Extend Microsoft Power Platform with Copilot Studio and AI capabilities to automate tasks, assist users, and create intelligent business workflows.",
    points: [
      "AI-powered assistants",
      "Intelligent automation",
      "AI-enabled workflows",
    ],
    challenges: [
      "Repetitive manual tasks",
      "Slow information access",
      "Complex business processes",
    ],
    bg: "#101010",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/contact",
  },
];

export default function StackedSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const totalTransitions = items.length - 1;

      // Initial setup: wipe progress 100% for all slides after the first
      for (let i = 1; i < items.length; i++) {
        if (cardRefs.current[i]) {
          cardRefs.current[i]!.style.setProperty("--wipe-progress", "100%");
        }
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalTransitions * 900}`, // 900px of scroll per transition
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const currentTransitionFloat = self.progress * totalTransitions;

          // Update Clip Paths via CSS variable
          for (let i = 1; i < items.length; i++) {
            let p = 0;
            if (currentTransitionFloat >= i) {
              p = 0; // fully visible (0% left edge)
            } else if (currentTransitionFloat <= i - 1) {
              p = 100; // fully hidden (100% left edge)
            } else {
              // Transitioning
              p = 100 - (currentTransitionFloat - (i - 1)) * 100;
            }

            if (cardRefs.current[i]) {
              cardRefs.current[i]!.style.setProperty(
                "--wipe-progress",
                `${p}%`
              );
            }
          }
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [items.length] }
  );

  return (
    <>
      {/* Section Header: Microsoft Power Platform Solutions */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] pt-12 md:pt-16 pb-8 sm:pb-10 flex flex-col items-center text-center bg-white">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
          MICROSOFT POWER PLATFORM
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          What We Do with <br className="hidden md:block" />
          <span className="text-[#FF6B2C]">Microsoft Power Platform</span>
        </h2>

        <p className="text-lg md:text-[1.1rem] leading-relaxed text-slate-500 max-w-3xl mx-auto">
          Build scalable business applications, automate workflows, connect data and systems, and deliver intelligent solutions with Microsoft Power Platform using Power Apps, Power Automate, Dataverse, Power BI, Power Pages, and Copilot Studio.
        </p>
      </div>

      <section
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-white"
      >
        <div className="absolute inset-0 w-full h-full">
          {items.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4cm)] max-w-[1700px] h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] max-h-[1000px] min-h-[720px] rounded-none flex flex-col justify-between text-left p-6 sm:p-8 md:p-9 lg:p-11 shadow-2xl overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{
                backgroundColor: card.bg,
                color: card.text,
                zIndex: i + 1,
                border: card.isLight
                  ? "1px solid rgba(0,0,0,0.08)"
                  : "1px solid rgba(255,255,255,0.08)",
                // Apply clip-path mask for all but the first slide
                clipPath:
                  i === 0
                    ? "none"
                    : "polygon(var(--wipe-progress, 100%) 0%, 100% 0%, 100% 100%, var(--wipe-progress, 100%) 100%)",
                transition: "none", // strictly tied to scroll
              }}
            >
              {/* Top Bar / Slide Indicator */}
              <div className="w-full">
                <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
                  <p className="typo-caption-meta font-bold tracking-widest uppercase opacity-85">
                    {card.num} / 06 — {card.title}
                  </p>
                  <span className="hidden sm:inline-block px-3.5 py-1.5 rounded-full typo-caption font-bold tracking-wider uppercase border border-current opacity-70">
                    POWER PLATFORM SERVICE
                  </span>
                </div>
                <hr
                  className="w-full border-t opacity-20 mb-4 sm:mb-6"
                  style={{ borderColor: card.text }}
                />
              </div>

              {/* Slide Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 w-full my-auto items-center">
                {/* Left Column: Title + Description */}
                <div className="lg:col-span-7 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/10 backdrop-blur rounded-xl" style={{
                      backgroundColor: card.isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)",
                    }}>
                      <card.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <h2
                    className="typo-heading-2 mb-4 sm:mb-6"
                    dangerouslySetInnerHTML={{ __html: card.titleSplit }}
                  />
                  <p className="typo-description opacity-90 max-w-xl mb-6 sm:mb-8">
                    {card.desc}
                  </p>
                  <div>
                    <FlowButton
                      href={card.link || "/contact"}
                      text="Discuss This Service"
                      variant={card.isLight ? "dark-filled" : "white-filled"}
                      className="w-fit typo-button px-6 py-3"
                    />
                  </div>
                </div>

                {/* Right Column: Advanced Capabilities Matrix */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="relative group/matrix">
                    {/* Ambient Glow */}
                    <div
                      className="absolute -inset-1 rounded-3xl opacity-20 blur-xl transition-all duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 60% 50%, ${card.accent || "#FF6B00"}, transparent 70%)`,
                      }}
                    />

                    <div
                      className="relative rounded-2xl border backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-300"
                      style={{
                        backgroundColor: card.isLight
                          ? "rgba(255, 255, 255, 0.85)"
                          : "rgba(14, 14, 14, 0.7)",
                        borderColor: card.isLight
                          ? "rgba(0, 0, 0, 0.08)"
                          : "rgba(255, 255, 255, 0.12)",
                      }}
                    >
                      {/* Top Bar Header */}
                      <div
                        className="px-4 py-3 flex items-center justify-between border-b"
                        style={{
                          backgroundColor: card.isLight
                            ? "rgba(0,0,0,0.02)"
                            : "rgba(255,255,255,0.03)",
                          borderColor: card.isLight
                            ? "rgba(0,0,0,0.06)"
                            : "rgba(255,255,255,0.08)",
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="relative flex h-2.5 w-2.5">
                            <span
                              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                              style={{
                                backgroundColor: card.accent || "#FF6B00",
                              }}
                            />
                            <span
                              className="relative inline-flex rounded-full h-2.5 w-2.5"
                              style={{
                                backgroundColor: card.accent || "#FF6B00",
                              }}
                            />
                          </span>
                          <span
                            className="typo-caption font-bold tracking-widest uppercase opacity-90"
                            style={{ color: card.text }}
                          >
                            CAPABILITIES & FEATURES
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span
                            className="typo-caption-meta tracking-wider opacity-70 uppercase"
                            style={{ color: card.text }}
                          >
                            ENTERPRISE SPEC
                          </span>
                        </div>
                      </div>

                      {/* Capabilities Rows */}
                      <div
                        className="divide-y"
                        style={{
                          borderColor: card.isLight
                            ? "rgba(0,0,0,0.05)"
                            : "rgba(255,255,255,0.06)",
                        }}
                      >
                        {/* Benefits Section */}
                        <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: card.isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.02)" }}>
                          <span className="text-green-500 text-sm">✅</span>
                          <span className="typo-caption-meta font-bold tracking-widest opacity-90 uppercase text-green-500">Key Benefits</span>
                        </div>

                        {card.points?.map((cap, capIdx) => (
                          <div
                            key={`benefit-${capIdx}`}
                            className="group/row px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3 transition-colors duration-150 hover:bg-white/[0.03]"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span
                                className="shrink-0 typo-caption font-bold"
                                style={{
                                  color: card.accent || "#FF6B00",
                                }}
                              >
                                0{capIdx + 1}
                              </span>
                              <span
                                className="typo-body-sm font-medium group-hover/row:translate-x-0.5 transition-transform duration-150"
                                style={{ color: card.text }}
                              >
                                {cap}
                              </span>
                            </div>

                            <span
                              className="shrink-0 px-2.5 py-1 rounded typo-caption-meta font-semibold tracking-wider uppercase border whitespace-nowrap text-green-500"
                              style={{
                                backgroundColor: card.isLight
                                  ? "rgba(0,0,0,0.04)"
                                  : "rgba(255,255,255,0.05)",
                                borderColor: card.isLight
                                  ? "rgba(0,0,0,0.08)"
                                  : "rgba(255,255,255,0.1)",
                              }}
                            >
                              BENEFIT
                            </span>
                          </div>
                        ))}

                        {/* Challenges Section */}
                        <div className="px-4 py-2 flex items-center gap-2 border-t" style={{
                          backgroundColor: card.isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.02)",
                          borderColor: card.isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)",
                        }}>
                          <span className="text-red-500 text-sm">⚠</span>
                          <span className="typo-caption-meta font-bold tracking-widest opacity-90 uppercase text-red-500">Challenges Solved</span>
                        </div>

                        {card.challenges?.map((cap, capIdx) => (
                          <div
                            key={`challenge-${capIdx}`}
                            className="group/row px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3 transition-colors duration-150 hover:bg-white/[0.03]"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span
                                className="shrink-0 typo-caption font-bold"
                                style={{
                                  color: card.accent || "#FF6B00",
                                }}
                              >
                                0{card.points.length + capIdx + 1}
                              </span>
                              <span
                                className="typo-body-sm font-medium group-hover/row:translate-x-0.5 transition-transform duration-150"
                                style={{ color: card.text }}
                              >
                                {cap}
                              </span>
                            </div>

                            <span
                              className="shrink-0 px-2.5 py-1 rounded typo-caption-meta font-semibold tracking-wider uppercase border whitespace-nowrap text-red-500"
                              style={{
                                backgroundColor: card.isLight
                                  ? "rgba(0,0,0,0.04)"
                                  : "rgba(255,255,255,0.05)",
                                borderColor: card.isLight
                                  ? "rgba(0,0,0,0.08)"
                                  : "rgba(255,255,255,0.1)",
                              }}
                            >
                              SOLVED
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Footer Telemetry */}
                      <div
                        className="px-4 py-2.5 flex items-center justify-between border-t typo-caption-meta opacity-60 uppercase tracking-wider"
                        style={{
                          backgroundColor: card.isLight
                            ? "rgba(0,0,0,0.015)"
                            : "rgba(0,0,0,0.2)",
                          borderColor: card.isLight
                            ? "rgba(0,0,0,0.06)"
                            : "rgba(255,255,255,0.08)",
                          color: card.text,
                        }}
                      >
                        <span>MICROSOFT 365 • DATAVERSE READY</span>
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          PROD READY
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Details */}
              <div
                className="w-full pt-4 mt-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm opacity-70"
                style={{
                  borderColor: card.isLight
                    ? "rgba(0,0,0,0.15)"
                    : "rgba(255,255,255,0.15)",
                }}
              >
                <span>Softree Technology • Offshore Power Platform Development</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
