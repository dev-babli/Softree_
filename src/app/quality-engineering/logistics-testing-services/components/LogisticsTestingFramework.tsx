"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FlowButton } from "@/components/ui/flow-button";
import { ClipboardList, Target, Stethoscope, ShieldCheck, Cpu, RefreshCw } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const items = [
  {
    num: "01",
    title: "Logistics Requirements & Test Planning",
    titleSplit: "Logistics Requirements<br />& Test Planning",
    icon: ClipboardList,
    desc: "Analyze logistics workflows, business rules, shipment processes, warehouse operations, integrations, and data requirements to build a comprehensive testing strategy.",
    cardCategory: "PLANNING & ANALYSIS",
    cardStatus: "PLANNING",
    type: "labeled",
    features: [
      { label: "Operational Workflows", value: "Map transportation, warehouse, shipment, and delivery processes." },
      { label: "Data Requirements", value: "Identify shipment, inventory, carrier, order, and customer data flows." },
      { label: "Business Rules", value: "Validate routing, dispatch, fulfillment, inventory, and logistics rules." },
      { label: "Integration Points", value: "Identify TMS, WMS, EDI, API, ERP, and carrier integrations." },
    ],
    bg: "#0D0D0D",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/contact",
  },
  {
    num: "02",
    title: "TMS & Transportation Testing",
    titleSplit: "TMS & Transportation<br />Testing",
    icon: Target,
    desc: "Validate transportation management workflows including planning, dispatch, routing, scheduling, carrier management, shipment tracking, and delivery processes.",
    cardCategory: "TRANSPORTATION TESTING",
    cardStatus: "TRANSPORTATION",
    type: "labeled",
    features: [
      { label: "Shipment Planning", value: "Validate shipment creation, planning, and scheduling." },
      { label: "Routing & Dispatch", value: "Test route planning, dispatch workflows, and transportation rules." },
      { label: "Carrier Management", value: "Validate carrier assignment, rates, availability, and communication." },
      { label: "Tracking & Delivery", value: "Test shipment status, ETA, delivery events, and exception workflows." },
    ],
    bg: "#C94716",
    text: "#ffffff",
    accent: "#ffffff",
    isLight: false,
    link: "/contact",
  },
  {
    num: "03",
    title: "WMS & Warehouse Testing",
    titleSplit: "WMS & Warehouse<br />Testing",
    icon: Stethoscope,
    desc: "Test warehouse management applications across receiving, inventory, picking, packing, shipping, fulfillment, and warehouse automation workflows.",
    cardCategory: "WAREHOUSE TESTING",
    cardStatus: "WAREHOUSE",
    type: "labeled",
    features: [
      { label: "Receiving & Putaway", value: "Validate inbound shipments, receiving, and warehouse putaway workflows." },
      { label: "Inventory Management", value: "Test inventory accuracy, stock movement, availability, and reconciliation." },
      { label: "Picking & Packing", value: "Validate picking strategies, packing workflows, and order fulfillment." },
      { label: "Warehouse Operations", value: "Test warehouse automation, scanning, equipment, and operational workflows." },
    ],
    bg: "#141414",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/contact",
  },
  {
    num: "04",
    title: "EDI, API & Integration Testing",
    titleSplit: "EDI, API &<br />Integration Testing",
    icon: ShieldCheck,
    desc: "Validate data exchange between logistics platforms, carriers, suppliers, ERPs, TMS, WMS, and external systems through APIs, EDI, and enterprise integrations.",
    cardCategory: "INTEGRATION TESTING",
    cardStatus: "INTEGRATION",
    type: "labeled",
    features: [
      { label: "EDI Validation", value: "Test EDI transactions, message structures, and data accuracy." },
      { label: "API Testing", value: "Validate logistics APIs, authentication, responses, and error handling." },
      { label: "Enterprise Integrations", value: "Test ERP, TMS, WMS, carrier, and third-party system integrations." },
      { label: "Data Synchronization", value: "Validate consistent shipment, inventory, order, and carrier information." },
    ],
    bg: "#FCFBF9",
    text: "#111111",
    accent: "#FF6B00",
    isLight: true,
    link: "/contact",
  },
  {
    num: "05",
    title: "Logistics Performance, Security & Reliability Testing",
    titleSplit: "Performance, Security<br />& Reliability",
    icon: Cpu,
    desc: "Validate logistics applications under real-world workloads while testing security, scalability, availability, data protection, and system reliability.",
    cardCategory: "QUALITY & RELIABILITY",
    cardStatus: "RELIABILITY",
    type: "labeled",
    features: [
      { label: "Performance Testing", value: "Validate application performance under realistic logistics workloads." },
      { label: "Scalability Testing", value: "Test high-volume shipments, orders, inventory, and concurrent users." },
      { label: "Security Testing", value: "Identify vulnerabilities, access-control issues, API risks, and data exposure." },
      { label: "Reliability Testing", value: "Validate availability, recovery, resilience, and failure-handling workflows." },
    ],
    bg: "#1C1A18",
    text: "#ffffff",
    accent: "#FF6B00",
    isLight: false,
    link: "/contact",
  },
  {
    num: "06",
    title: "Continuous Logistics Quality Engineering",
    titleSplit: "Continuous Logistics<br />Quality Engineering",
    icon: RefreshCw,
    desc: "Continuously validate logistics applications as business workflows, integrations, data, and operational requirements evolve across development and production.",
    cardCategory: "CONTINUOUS QUALITY",
    cardStatus: "CONTINUOUS",
    type: "labeled",
    features: [
      { label: "Regression Automation", value: "Continuously validate critical logistics workflows after every change." },
      { label: "End-to-End Validation", value: "Test connected transportation, warehouse, and supply chain processes." },
      { label: "Release Quality", value: "Validate application quality before production releases." },
      { label: "Continuous Improvement", value: "Use test results and defect insights to improve logistics application quality." },
    ],
    bg: "#101010",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/contact",
  },
];

export default function LogisticsTestingFramework() {
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
      {/* Section Header: Logistics Testing Framework */}
      <section className="w-full bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
            LOGISTICS TESTING SERVICES
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            One Logistics Testing Team<br className="hidden md:block" />
            <span className="text-[#FF6B2C]">for Every Stage of Your Logistics Lifecycle</span>
          </h2>

          <p className="text-lg md:text-[1.1rem] leading-relaxed text-slate-500 max-w-3xl mx-auto">
            Softree provides end-to-end logistics testing services that validate TMS, WMS, warehouse automation, EDI, APIs, integrations, visibility platforms, and supply chain workflows from requirements through production.
          </p>
        </div>
      </section>

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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)] max-w-[1376px] h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] max-h-[1000px] min-h-[720px] rounded-2xl sm:rounded-[32px] flex flex-col justify-between text-left p-6 sm:p-8 md:p-9 lg:p-11 shadow-2xl overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                    [ {card.cardCategory} ]
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
                      text="EXPLORE OUR LOGISTICS TESTING SERVICES"
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
                            ● {card.cardStatus}
                          </span>
                        </div>
                      </div>

                      {/* Capabilities Rows Based on Type */}
                      <div
                        className="divide-y"
                        style={{
                          borderColor: card.isLight
                            ? "rgba(0,0,0,0.05)"
                            : "rgba(255,255,255,0.06)",
                        }}
                      >
                        {card.type === "labeled" && card.features?.map((cap, capIdx) => (
                          <div
                            key={`feature-${capIdx}`}
                            className="group/row px-4 py-3 sm:py-4 flex flex-col gap-1.5 transition-colors duration-150 hover:bg-white/[0.03]"
                          >
                            <div className="flex items-center justify-between min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className="shrink-0 typo-caption font-bold"
                                  style={{
                                    color: card.accent || "#FF6B00",
                                  }}
                                >
                                  0{capIdx + 1}
                                </span>
                                <span
                                  className="typo-body-sm font-semibold tracking-wide"
                                  style={{ color: card.text }}
                                >
                                  {"label" in cap ? cap.label : ""}
                                </span>
                              </div>
                              <span
                                className="shrink-0 px-2 py-0.5 rounded typo-caption-meta font-semibold tracking-wider uppercase border whitespace-nowrap text-[10px]"
                                style={{
                                  backgroundColor: card.isLight
                                    ? "rgba(0,0,0,0.04)"
                                    : "rgba(255,255,255,0.05)",
                                  borderColor: card.isLight
                                    ? "rgba(0,0,0,0.08)"
                                    : "rgba(255,255,255,0.1)",
                                  color: card.isLight
                                    ? "rgba(0,0,0,0.4)"
                                    : "rgba(255,255,255,0.5)",
                                }}
                              >
                                REQ
                              </span>
                            </div>
                            <span
                              className="typo-body-sm pl-6 transition-colors"
                              style={{ color: card.isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)" }}
                            >
                              {cap.value}
                            </span>
                          </div>
                        ))}


                      </div>

                      {/* Bottom Footer Telemetry */}
                      <div
                        className="px-4 py-3 flex items-center justify-between border-t typo-caption-meta opacity-60 uppercase tracking-wider"
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
                        <span>LOGISTICS TESTING SYSTEM</span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          VALIDATED
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
                <span>Softree Technology • Logistics Quality Engineering</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
