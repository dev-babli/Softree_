"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FlowButton } from "@/components/ui/flow-button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CapabilitySpec {
  label: string;
  tag: string;
}

interface SlideItem {
  num: string;
  title: string;
  titleSplit: string;
  desc: string;
  capabilities?: CapabilitySpec[];
  bg: string;
  text: string;
  accent?: string;
  isLight?: boolean;
  link: string;
  isCta?: boolean;
  primaryCta?: string;
  secondaryCta?: string;
}

const slides: SlideItem[] = [
  {
    num: "01",
    title: "Logistics Agentic AI Development",
    titleSplit: "Logistics Agentic AI<br />Development",
    desc: "Build intelligent AI agents that can understand logistics operations, make context-aware decisions, orchestrate multi-step workflows, and interact with enterprise systems to automate complex supply chain processes.",
    capabilities: [
      { label: "Autonomous and semi-autonomous logistics agents", tag: "Agentic AI" },
      { label: "Multi-step shipment and supply chain workflows", tag: "Workflow AI" },
      { label: "AI agents for exception detection and resolution", tag: "Exception AI" },
      { label: "TMS, WMS, ERP, and API system orchestration", tag: "System Connected" },
      { label: "Human-in-the-loop operational decision making", tag: "Supervised AI" },
    ],
    bg: "#0D0D0D",
    text: "#ffffff",
    accent: "#FF6B00",
    isLight: false,
    link: "/services/ai-development-services",
  },
  {
    num: "02",
    title: "Generative AI & RAG for Logistics",
    titleSplit: "Generative AI &<br />RAG for Logistics",
    desc: "Build enterprise-grade Generative AI solutions that connect large language models with trusted logistics data to power intelligent assistants, knowledge systems, copilots, and supply chain decision support.",
    capabilities: [
      { label: "Logistics knowledge assistants and AI copilots", tag: "Generative AI" },
      { label: "RAG-based logistics search and knowledge retrieval", tag: "Hybrid Search" },
      { label: "AI-powered access to TMS, WMS, ERP, and business data", tag: "Enterprise AI" },
      { label: "LLM-powered logistics applications", tag: "Multi-Model" },
      { label: "Context-aware shipment and supply chain insights", tag: "RAG 2.0" },
    ],
    bg: "#C94716",
    text: "#ffffff",
    accent: "#ffffff",
    isLight: false,
    link: "/services/generative-ai",
  },
  {
    num: "03",
    title: "Intelligent Document Processing for Logistics",
    titleSplit: "Intelligent Document<br />Processing for Logistics",
    desc: "Automate document-intensive logistics workflows with AI-powered document intelligence that extracts, classifies, validates, summarizes, and transforms information from complex shipping and freight documents.",
    capabilities: [
      { label: "Bills of lading, invoices, and shipping documents", tag: "Multimodal OCR" },
      { label: "Proof of delivery and freight document processing", tag: "Document AI" },
      { label: "Intelligent data extraction and validation", tag: "Entity Parser" },
      { label: "Document classification and workflow routing", tag: "Schema Valid" },
      { label: "Structured data generation from logistics documents", tag: "JSON / API" },
    ],
    bg: "#141414",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/solutions/document-ai-solutions",
  },
  {
    num: "04",
    title: "Logistics Process Automation",
    titleSplit: "Logistics Process<br />Automation",
    desc: "Combine AI, intelligent automation, and workflow orchestration to streamline repetitive logistics operations across order processing, shipment coordination, approvals, exception handling, and communication.",
    capabilities: [
      { label: "Order and shipment workflow automation", tag: "RPA + AI" },
      { label: "AI-assisted exception and task processing", tag: "Triage Flow" },
      { label: "Automated data validation and reconciliation", tag: "Data Quality" },
      { label: "Human-in-the-loop logistics automation", tag: "Escalation" },
      { label: "Reduced manual intervention across operations", tag: "Process AI" },
    ],
    bg: "#FCFBF9",
    text: "#111111",
    accent: "#FF6B00",
    isLight: true,
    link: "/solutions/ai-workflow-automation",
  },
  {
    num: "05",
    title: "Logistics Data Engineering & Analytics",
    titleSplit: "Logistics Data<br />Engineering & Analytics",
    desc: "Build the data foundation required for scalable logistics AI with modern data pipelines, system integrations, analytics platforms, and AI-ready architectures across your supply chain ecosystem.",
    capabilities: [
      { label: "TMS, WMS, ERP, CRM, and logistics data integration", tag: "API / ETL" },
      { label: "ETL/ELT and real-time data pipelines", tag: "Stream & Batch" },
      { label: "Supply chain data transformation and management", tag: "Lakehouse" },
      { label: "Operational dashboards and business intelligence", tag: "Executive BI" },
      { label: "AI-ready logistics data architectures", tag: "Cloud Native" },
    ],
    bg: "#1C1A18",
    text: "#ffffff",
    accent: "#FF6B00",
    isLight: false,
    link: "/services/offshore-data-analytics",
  },
  {
    num: "06",
    title: "AI Integration & Logistics Modernization",
    titleSplit: "AI Integration & Logistics<br />Modernization",
    desc: "Integrate AI capabilities into existing logistics applications, TMS, WMS, ERP platforms, APIs, databases, and legacy environments without disrupting critical supply chain operations.",
    capabilities: [
      { label: "AI and API integration across logistics systems", tag: "REST / gRPC" },
      { label: "Legacy logistics application modernization", tag: "Refactoring" },
      { label: "TMS, WMS, ERP, and enterprise integration", tag: "System Connected" },
      { label: "Cloud and data platform integration", tag: "Hybrid Cloud" },
      { label: "AI-enabled upgrades to existing applications", tag: "Modern Stack" },
    ],
    bg: "#101010",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/services/legacy-application-modernization",
  },
  {
    isCta: true,
    num: "07",
    title: "Build Your Logistics AI Solution with Softree",
    titleSplit: "Build Your Logistics AI<br />Solution with Softree",
    desc: "Turn logistics and supply chain opportunities into secure, scalable, production-ready AI solutions. Whether you are deploying AI agents, improving shipment visibility, automating workflows, optimizing transportation, processing documents, or building intelligent supply chain platforms, Softree can help you move from strategy to implementation.",
    primaryCta: "Talk to Our Logistics AI Experts",
    secondaryCta: "Explore Our Logistics AI Solutions",
    bg: "#0A0A0A",
    text: "#ffffff",
    accent: "#FF6B00",
    isLight: false,
    link: "/contact",
  },
];

export default function LogisticsStepWipe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const totalTransitions = slides.length - 1;

      // Initial setup: wipe progress 100% for all slides after the first
      for (let i = 1; i < slides.length; i++) {
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
          for (let i = 1; i < slides.length; i++) {
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
    { scope: containerRef, dependencies: [slides.length] }
  );

  return (
    <>
      {/* Section Header: AI-Powered Supply Chain Solutions */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] pt-12 md:pt-16 pb-8 sm:pb-10 flex flex-col items-center text-center bg-white">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-xs sm:text-[12px] font-bold tracking-widest text-[#FF6B00] uppercase mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
          AI-POWERED SUPPLY CHAIN SOLUTIONS
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold font-['Plus_Jakarta_Sans',sans-serif] max-w-4xl mx-auto text-slate-900 mb-4 tracking-tight leading-[1.12]">
          Intelligent AI Solutions for <br className="hidden md:block" />
          <span className="text-[#FF6B2C]">Every Layer of Logistics Operations</span>
        </h2>

        <p className="text-base sm:text-[16.5px] lg:text-[17px] text-slate-500 max-w-3xl leading-relaxed mx-auto">
          From AI agents and RAG-powered assistants to document processing and workflow automation. We build scalable AI solutions that connect your systems, streamline operations, and help your teams make smarter supply chain decisions.
        </p>
      </div>

      <section
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-white"
      >
      <div className="absolute inset-0 w-full h-full">
        {slides.map((card, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4cm)] max-w-[1700px] h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] max-h-[880px] min-h-[520px] rounded-none flex flex-col justify-between text-left p-6 sm:p-8 md:p-9 lg:p-11 shadow-2xl overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                <p className="text-sm sm:text-base font-bold tracking-widest uppercase opacity-85 font-mono">
                  {card.isCta ? "SUMMARY & NEXT STEPS" : `${card.num} / 06 — ${card.title}`}
                </p>
                <span className="hidden sm:inline-block px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold tracking-wider uppercase border border-current opacity-70">
                  {card.isCta ? "GET STARTED" : "LOGISTICS ENGINEERING SERVICE"}
                </span>
              </div>
              <hr
                className="w-full border-t opacity-20 mb-4 sm:mb-6"
                style={{ borderColor: card.text }}
              />
            </div>

            {/* Slide Body */}
            {card.isCta ? (
              /* Grand Closing CTA Card */
              <div className="w-full text-center max-w-4xl mx-auto my-auto flex flex-col items-center py-4 sm:py-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-xs sm:text-sm font-bold tracking-widest text-[#FF6B00] uppercase mb-4 sm:mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
                  OFFSHORE LOGISTICS ENGINEERING
                </div>
                <h2
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] text-white mb-4 sm:mb-6 font-['Plus_Jakarta_Sans',sans-serif]"
                  dangerouslySetInnerHTML={{ __html: card.titleSplit }}
                />
                <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal">
                  {card.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full sm:w-auto">
                
                  <FlowButton
                    href="/contact"
                    text={card.secondaryCta || "Build Your Offshore Team"}
                    variant="white"
                    className="w-full sm:w-auto px-8 py-3.5 text-base"
                  />
                </div>
              </div>
            ) : (
              /* Standard Service Slide */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 w-full my-auto items-center">
                {/* Left Column: Title + Description */}
                <div className="lg:col-span-7 flex flex-col">
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.1] mb-4 sm:mb-6 font-['Plus_Jakarta_Sans',sans-serif]"
                    dangerouslySetInnerHTML={{ __html: card.titleSplit }}
                  />
                  <p className="text-base sm:text-[16.5px] md:text-lg opacity-90 leading-relaxed max-w-xl font-normal mb-6 sm:mb-8">
                    {card.desc}
                  </p>
                  <div>
                    <FlowButton
                      href={card.link || "/contact"}
                      text="Explore Logistics Solutions"
                      variant={card.isLight ? "dark-filled" : "white-filled"}
                      className="w-fit text-sm sm:text-base px-6 py-3"
                    />
                  </div>
                </div>

                {/* Right Column: Advanced Telemetry Capabilities Matrix */}
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
                            className="text-xs sm:text-[13px] font-mono font-bold tracking-widest uppercase opacity-90"
                            style={{ color: card.text }}
                          >
                            SYSTEM CAPABILITIES
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span
                            className="text-[11px] sm:text-xs font-mono tracking-wider opacity-70 uppercase"
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
                        {card.capabilities?.map((cap, capIdx) => (
                          <div
                            key={capIdx}
                            className="group/row px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 transition-colors duration-150 hover:bg-white/[0.03]"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span
                                className="shrink-0 font-mono text-xs sm:text-sm font-bold"
                                style={{
                                  color: card.accent || "#FF6B00",
                                }}
                              >
                                0{capIdx + 1}
                              </span>
                              <span
                                className="text-sm sm:text-[15px] font-medium leading-snug group-hover/row:translate-x-0.5 transition-transform duration-150"
                                style={{ color: card.text }}
                              >
                                {cap.label}
                              </span>
                            </div>

                            <span
                              className="shrink-0 px-2.5 py-1 rounded text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase border whitespace-nowrap"
                              style={{
                                backgroundColor: card.isLight
                                  ? "rgba(0,0,0,0.04)"
                                  : "rgba(255,255,255,0.05)",
                                borderColor: card.isLight
                                  ? "rgba(0,0,0,0.08)"
                                  : "rgba(255,255,255,0.1)",
                                color: card.accent || "#FF6B00",
                              }}
                            >
                              {cap.tag}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Footer Telemetry */}
                      <div
                        className="px-4 py-2.5 flex items-center justify-between border-t text-[11px] sm:text-xs font-mono opacity-60 uppercase tracking-wider"
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
                        <span>EDI • TMS / WMS READY</span>
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          PROD READY
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Footer Details */}
            <div
              className="w-full pt-4 mt-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm opacity-70"
              style={{
                borderColor: card.isLight
                  ? "rgba(0,0,0,0.15)"
                  : "rgba(255,255,255,0.15)",
              }}
            >
              <span>Softree Technology • Offshore Logistics &amp; Supply Chain Engineering</span>
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
