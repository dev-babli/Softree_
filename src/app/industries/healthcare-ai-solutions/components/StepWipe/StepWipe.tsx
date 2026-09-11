"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    title: "Agentic AI Development",
    titleSplit: "Agentic AI<br />Development",
    desc: "Build intelligent AI agents for healthcare that understand context, reason through complex tasks, use tools, orchestrate workflows, and interact with enterprise systems within defined business rules.",
    capabilities: [
      { label: "AI agents that understand context and user intent", tag: "SMART AGENTS" },
      { label: "Automated execution of multi-step healthcare tasks", tag: "WORKFLOW AI" },
      { label: "Connect AI agents with healthcare systems and APIs", tag: "SYSTEM INTEGRATION" },
      { label: "AI that can use tools and take actions", tag: "TASK AUTOMATION" },
      { label: "Human review and approval when needed", tag: "HUMAN OVERSIGHT" },
    ],
    bg: "#080808",
    text: "#ffffff",
    accent: "#FF6B00",
    isLight: false,
    link: "/services/ai-development-services",
  },

  {
    num: "02",
    title: "Generative AI & RAG Development",
    titleSplit: "Generative AI &<br />RAG Development",
    desc: "Build enterprise-grade Generative AI healthcare solutions, AI assistants, knowledge systems, copilots, and Retrieval-Augmented Generation (RAG) applications that securely connect AI models with trusted healthcare data.",
    capabilities: [
      { label: "AI assistants for healthcare teams and patients", tag: "AI ASSISTANTS" },
      { label: "Search and retrieve answers from trusted healthcare data", tag: "SMART SEARCH" },
      { label: "Securely connect AI with your internal data", tag: "SECURE DATA" },
      { label: "AI applications that generate useful, accurate responses", tag: "GENERATIVE AI" },
      { label: "Deliver answers based on relevant business context", tag: "CONTEXTUAL AI" },
    ],
    bg: "#ffffff",
    text: "#111111",
    accent: "#FF6B00",
    isLight: true,
    link: "/services/generative-ai",
  },

  {
    num: "03",
    title: "Healthcare AI Agent Development",
    titleSplit: "Healthcare AI<br />Agent Development",
    desc: "Develop intelligent AI agents for healthcare that understand context, retrieve information, orchestrate workflows, and interact with enterprise systems within defined business rules.",
    capabilities: [
      { label: "AI agents that handle healthcare tasks with minimal intervention", tag: "AUTONOMOUS AI" },
      { label: "Automate complex tasks across multiple steps", tag: "TASK ORCHESTRATION" },
      { label: "Connect AI with EHRs, APIs, and healthcare systems", tag: "HEALTHCARE INTEGRATION" },
      { label: "Support teams with relevant information and recommendations", tag: "DECISION SUPPORT" },
      { label: "Route sensitive decisions to people for review", tag: "HUMAN REVIEW" },
    ],
    bg: "#C94716",
    text: "#ffffff",
    accent: "#ffffff",
    isLight: false,
    link: "/solutions/ai-agents-development",
  },

  {
    num: "04",
    title: "Intelligent Document Processing for Healthcare",
    titleSplit: "Intelligent Document<br />Processing for Healthcare",
    desc: "Automate document-intensive healthcare workflows with AI-powered document intelligence that extracts, classifies, validates, summarizes, and transforms information from complex documents.",
    capabilities: [
      { label: "Process medical and administrative documents automatically", tag: "DOCUMENT AI" },
      { label: "Extract important information from documents", tag: "DATA EXTRACTION" },
      { label: "Identify, classify, and validate documents", tag: "DOCUMENT ANALYSIS" },
      { label: "Create concise summaries from complex healthcare records", tag: "AI SUMMARIZATION" },
      { label: "Convert documents into structured, usable data", tag: "STRUCTURED DATA" },
    ],
    bg: "#FCFBF9",
    text: "#111111",
    accent: "#FF6B00",
    isLight: true,
    link: "/solutions/document-ai-solutions",
  },

  {
    num: "05",
    title: "Healthcare Process Automation",
    titleSplit: "Healthcare Process<br />Automation",
    desc: "Combine AI, intelligent automation, and workflow orchestration to streamline repetitive administrative and operational healthcare processes.",
    capabilities: [
      { label: "Automate repetitive healthcare workflows", tag: "WORKFLOW AUTOMATION" },
      { label: "Use AI to handle routine tasks and requests", tag: "AI-ASSISTED TASKS" },
      { label: "Automatically check and validate healthcare data", tag: "DATA VALIDATION" },
      { label: "Escalate important cases to the right person", tag: "HUMAN ESCALATION" },
      { label: "Reduce manual work across healthcare operations", tag: "OPERATIONAL EFFICIENCY" },
    ],
    bg: "#1C1A18",
    text: "#ffffff",
    accent: "#FF6B00",
    isLight: false,
    link: "/solutions/ai-workflow-automation",
  },

  {
    num: "06",
    title: "Healthcare Data Engineering & Analytics",
    titleSplit: "Healthcare Data<br />Engineering & Analytics",
    desc: "Build the data infrastructure required for scalable healthcare AI with modern data pipelines, integrations, analytics platforms, and AI-ready architectures.",
    capabilities: [
      { label: "Bring healthcare data together from multiple systems", tag: "DATA INTEGRATION" },
      { label: "Build reliable pipelines for moving and processing data", tag: "DATA PIPELINES" },
      { label: "Clean, transform, and organize healthcare data", tag: "DATA MANAGEMENT" },
      { label: "Turn healthcare data into actionable business insights", tag: "DATA ANALYTICS" },
      { label: "Prepare trusted data for AI and machine learning", tag: "AI-READY DATA" },
    ],
    bg: "#EA580C",
    text: "#ffffff",
    accent: "#ffffff",
    isLight: false,
    link: "/services/offshore-data-analytics",
  },

  {
    num: "07",
    title: "AI Integration & Healthcare Application Modernization",
    titleSplit: "AI Integration & Application<br />Modernization",
    desc: "Integrate AI capabilities into existing healthcare applications, APIs, enterprise platforms, databases, and legacy environments without disrupting critical workflows.",
    capabilities: [
      { label: "Connect AI with existing healthcare applications and APIs", tag: "AI INTEGRATION" },
      { label: "Modernize outdated healthcare applications", tag: "APPLICATION MODERNIZATION" },
      { label: "Connect AI with EHR and enterprise healthcare platforms", tag: "SYSTEM CONNECTIVITY" },
      { label: "Integrate applications across cloud and on-premise systems", tag: "HYBRID INTEGRATION" },
      { label: "Add AI capabilities without replacing existing systems", tag: "AI ENHANCEMENT" },
    ],
    bg: "#F7F5F0",
    text: "#111111",
    accent: "#FF6B00",
    isLight: true,
    link: "/services/legacy-application-modernization",
  },

  {
    isCta: true,
    num: "08",
    title: "Build Your Healthcare AI Solution with Softree",
    titleSplit: "Build Your Healthcare AI<br />Solution with Softree",
    desc: "Turn AI opportunities into secure, scalable, production-ready healthcare solutions. Whether you are exploring Generative AI, automating workflows, modernizing legacy applications, or building intelligent healthcare platforms, Softree can help you move from strategy to implementation.",
    primaryCta: "Talk to Our Healthcare AI Experts",
    secondaryCta: "Explore Our Healthcare AI Solutions",
    bg: "#0A0A0A",
    text: "#ffffff",
    accent: "#FF6B00",
    isLight: false,
    link: "/contact",
  },
];

export default function StepWipe() {
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
                <p className="text-xs sm:text-sm font-bold tracking-widest uppercase opacity-85 font-mono">
                  {card.isCta ? "SUMMARY & NEXT STEPS" : `${card.num} / 07 — ${card.title}`}
                </p>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase border border-current opacity-60">
                  {card.isCta ? "GET STARTED" : "HEALTHCARE AI SERVICE"}
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
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-[11px] sm:text-xs font-bold tracking-widest text-[#FF6B00] uppercase mb-4 sm:mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
                  HEALTHCARE AI IMPLEMENTATION
                </div>
                <h2
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white mb-4 sm:mb-6 font-['Plus_Jakarta_Sans',sans-serif]"
                  dangerouslySetInnerHTML={{ __html: card.titleSplit }}
                />
                <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal">
                  {card.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full sm:w-auto">
                  <FlowButton
                    href="/contact"
                    text={card.primaryCta || "Build Your Offshore Team"}
                    variant="orange-filled"
                    className="w-full sm:w-auto px-8 py-3.5"
                  />
                </div>
              </div>
            ) : (
              /* Standard Service Slide */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 w-full my-auto items-center">
                {/* Left Column: Title + Description */}
                <div className="lg:col-span-7 flex flex-col">
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-3 sm:mb-5 font-['Plus_Jakarta_Sans',sans-serif]"
                    dangerouslySetInnerHTML={{ __html: card.titleSplit }}
                  />
                  <p className="text-xs sm:text-sm md:text-base opacity-90 leading-relaxed max-w-xl font-normal mb-5 sm:mb-6">
                    {card.desc}
                  </p>
                  <div>
                    <FlowButton
                      href={card.link || "/contact"}
                      text="Explore AI Solutions"
                      variant={card.isLight ? "dark-filled" : "white-filled"}
                      className="w-fit"
                    />
                  </div>
                </div>

                {/* Right Column: Advanced Telemetry Capabilities Matrix (Single unified spec sheet, NOT 5 cards) */}
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
                          <span className="relative flex h-2 w-2">
                            <span
                              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                              style={{
                                backgroundColor: card.accent || "#FF6B00",
                              }}
                            />
                            <span
                              className="relative inline-flex rounded-full h-2 w-2"
                              style={{
                                backgroundColor: card.accent || "#FF6B00",
                              }}
                            />
                          </span>
                          <span
                            className="text-[11px] font-mono font-bold tracking-widest uppercase opacity-90"
                            style={{ color: card.text }}
                          >
                            SYSTEM CAPABILITIES
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span
                            className="text-[10px] font-mono tracking-wider opacity-60 uppercase"
                            style={{ color: card.text }}
                          >
                            ENTERPRISE SPEC
                          </span>
                        </div>
                      </div>

                      {/* Capabilities Rows (Unified Telemetry Table - NOT 5 cards) */}
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
                            className="group/row px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3 transition-colors duration-150 hover:bg-white/[0.03]"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span
                                className="shrink-0 font-mono text-[11px] font-bold"
                                style={{
                                  color: card.accent || "#FF6B00",
                                }}
                              >
                                0{capIdx + 1}
                              </span>
                              <span
                                className="text-xs sm:text-[13px] font-medium leading-snug group-hover/row:translate-x-0.5 transition-transform duration-150"
                                style={{ color: card.text }}
                              >
                                {cap.label}
                              </span>
                            </div>

                            <span
                              className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider uppercase border whitespace-nowrap"
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


                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Footer Details */}
            <div
              className="w-full pt-4 mt-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] sm:text-xs opacity-60"
              style={{
                borderColor: card.isLight
                  ? "rgba(0,0,0,0.15)"
                  : "rgba(255,255,255,0.15)",
              }}
            >
              <span>Softree Technology • Healthcare AI Engineering</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}