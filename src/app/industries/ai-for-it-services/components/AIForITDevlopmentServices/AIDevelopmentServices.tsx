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
    title: "Generative AI & RAG Development",
    titleSplit: "Generative AI &<br />RAG Development",
    desc: "Build enterprise-grade Generative AI healthcare solutions, AI assistants, knowledge systems, copilots, and Retrieval-Augmented Generation (RAG) applications that securely connect AI models with trusted healthcare data.",
    capabilities: [
      { label: "Healthcare knowledge assistants and AI copilots", tag: "Agentic AI" },
      { label: "RAG-based enterprise search and knowledge retrieval", tag: "Hybrid Search" },
      { label: "Secure integration with organizational data", tag: "HIPAA Vault" },
      { label: "LLM-powered healthcare applications", tag: "Multi-Model" },
      { label: "Context-aware information retrieval", tag: "RAG 2.0" },
    ],
    bg: "#0D0D0D",
    text: "#ffffff",
    accent: "#FF6B00",
    isLight: false,
    link: "/contact",
  },
  {
    num: "02",
    title: "Healthcare AI Agent Development",
    titleSplit: "Healthcare AI<br />Agent Development",
    desc: "Develop intelligent AI agents for healthcare that understand context, retrieve information, orchestrate workflows, and interact with enterprise systems within defined business rules.",
    capabilities: [
      { label: "Autonomous and semi-autonomous AI agents", tag: "Autonomous" },
      { label: "Multi-step workflow orchestration", tag: "DAG Engine" },
      { label: "Enterprise system and API integration", tag: "FHIR / HL7" },
      { label: "Context-aware decision support", tag: "Clinical CDSS" },
      { label: "Human-in-the-loop workflows", tag: "Supervised" },
    ],
    bg: "#C94716",
    text: "#ffffff",
    accent: "#ffffff",
    isLight: false,
    link: "/contact",
  },
  {
    num: "03",
    title: "Healthcare Machine Learning Solutions",
    titleSplit: "Healthcare Machine<br />Learning Solutions",
    desc: "Build machine learning solutions that help healthcare organizations leverage data for predictive analytics, forecasting, classification, recommendations, and anomaly detection.",
    capabilities: [
      { label: "Predictive analytics and forecasting", tag: "Predictive ML" },
      { label: "Classification and recommendation models", tag: "Ensemble" },
      { label: "Risk and anomaly detection", tag: "Early Warning" },
      { label: "Intelligent decision-support systems", tag: "Logic Engine" },
      { label: "Model development and optimization", tag: "MLOps Pipeline" },
    ],
    bg: "#141414",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/contact",
  },
  {
    num: "04",
    title: "Intelligent Document Processing for Healthcare",
    titleSplit: "Intelligent Document<br />Processing for Healthcare",
    desc: "Automate document-intensive healthcare workflows with AI-powered document intelligence that extracts, classifies, validates, summarizes, and transforms information from complex documents.",
    capabilities: [
      { label: "Medical and administrative document processing", tag: "Multimodal OCR" },
      { label: "Intelligent data extraction", tag: "Entity Parser" },
      { label: "Document classification and validation", tag: "Schema Valid" },
      { label: "AI-powered summarization", tag: "Clinical NLP" },
      { label: "Structured data generation from unstructured content", tag: "JSON / FHIR" },
    ],
    bg: "#FCFBF9",
    text: "#111111",
    accent: "#FF6B00",
    isLight: true,
    link: "/contact",
  },
  {
    num: "05",
    title: "Healthcare Process Automation",
    titleSplit: "Healthcare Process<br />Automation",
    desc: "Combine AI, intelligent automation, and workflow orchestration to streamline repetitive administrative and operational healthcare processes.",
    capabilities: [
      { label: "Workflow automation", tag: "RPA + Agentic" },
      { label: "AI-assisted task processing", tag: "Triage Flow" },
      { label: "Automated data validation", tag: "Zero Error" },
      { label: "Human-in-the-loop automation", tag: "Escalation" },
      { label: "Reduced manual intervention", tag: "-85% Manual" },
    ],
    bg: "#1C1A18",
    text: "#ffffff",
    accent: "#FF6B00",
    isLight: false,
    link: "/contact",
  },
  {
    num: "06",
    title: "Healthcare Data Engineering & Analytics",
    titleSplit: "Healthcare Data<br />Engineering & Analytics",
    desc: "Build the data infrastructure required for scalable healthcare AI with modern data pipelines, integrations, analytics platforms, and AI-ready architectures.",
    capabilities: [
      { label: "Healthcare data integration", tag: "HL7 / FHIR ETL" },
      { label: "ETL/ELT and data pipelines", tag: "Stream & Batch" },
      { label: "Data transformation and management", tag: "Lakehouse" },
      { label: "Business intelligence and analytics", tag: "Executive BI" },
      { label: "AI-ready data architectures", tag: "Sovereign VPC" },
    ],
    bg: "#EA580C",
    text: "#ffffff",
    accent: "#ffffff",
    isLight: false,
    link: "/contact",
  },
  {
    num: "07",
    title: "Custom Healthcare AI Application Development",
    titleSplit: "Custom Healthcare AI<br />Application Development",
    desc: "Develop purpose-built AI healthcare applications around your workflows, users, technology ecosystem, and business objectives.",
    capabilities: [
      { label: "Custom AI-powered applications", tag: "Tailored AI" },
      { label: "Healthcare portals and dashboards", tag: "Secure UX" },
      { label: "Intelligent decision-support applications", tag: "CDSS Core" },
      { label: "AI-enabled enterprise workflows", tag: "Microservices" },
      { label: "Scalable cloud-based solutions", tag: "Multi-Cloud" },
    ],
    bg: "#101010",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/contact",
  },
  {
    num: "08",
    title: "AI Integration & Healthcare Application Modernization",
    titleSplit: "AI Integration & Application<br />Modernization",
    desc: "Integrate AI capabilities into existing healthcare applications, APIs, enterprise platforms, databases, and legacy environments without disrupting critical workflows.",
    capabilities: [
      { label: "AI and API integration", tag: "REST / gRPC" },
      { label: "Legacy application modernization", tag: "Refactoring" },
      { label: "Enterprise platform integration", tag: "Epic & Cerner" },
      { label: "Cloud and data platform integration", tag: "Hybrid Cloud" },
      { label: "AI-enabled application upgrades", tag: "Modern Stack" },
    ],
    bg: "#F7F5F0",
    text: "#111111",
    accent: "#FF6B00",
    isLight: true,
    link: "/contact",
  },
  {
    isCta: true,
    num: "09",
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

export default function AIDevelopmentServices() {
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
    { scope: containerRef }
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4cm)] max-w-[1700px] h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] max-h-[880px] min-h-[520px] rounded-[24px] sm:rounded-[32px] flex flex-col justify-between text-left p-6 sm:p-8 md:p-9 lg:p-11 shadow-2xl overflow-y-auto"
            style={{
              backgroundColor: card.bg,
              color: card.text,
              zIndex: i + 1,
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
                  {card.isCta ? "SUMMARY & NEXT STEPS" : `${card.num} / 08 — ${card.title}`}
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
                    text={card.primaryCta || "Talk to Our Healthcare AI Experts"}
                    variant="orange-filled"
                    className="w-full sm:w-auto px-8 py-3.5"
                  />
                  <FlowButton
                    href="/contact"
                    text={card.secondaryCta || "Explore Our Healthcare AI Solutions"}
                    variant="white"
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

                      {/* Bottom Footer Telemetry */}
                      <div
                        className="px-4 py-2 flex items-center justify-between border-t text-[10px] font-mono opacity-50 uppercase tracking-wider"
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
                        <span>FHIR / HL7 • HIPAA BAA</span>
                        <span className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-400" />
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
