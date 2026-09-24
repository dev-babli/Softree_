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
    title: "Healthcare Requirements",
    titleSplit: "Healthcare<br />Requirements",
    icon: ClipboardList,
    desc: "Validate clinical workflows, patient data, integrations, and requirements.",
    cardCategory: "PLANNING & ANALYSIS",
    cardStatus: "DISCOVERY",
    type: "labeled",
    features: [
      { label: "Clinical Workflows", value: "Map out patient journey and clinical processes." },
      { label: "Data Requirements", value: "Identify sensitive PHI and data flow." },
      { label: "Regulatory Needs", value: "Review HIPAA, GDPR, and FDA guidelines." },
      { label: "Integration Points", value: "Identify EHR/EMR and third-party APIs." },
    ],
    bg: "#0D0D0D",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/contact",
  },
  {
    num: "02",
    title: "Test Strategy",
    titleSplit: "Test<br />Strategy",
    icon: Target,
    desc: "Plan functional, security, performance, compliance, and automation testing.",
    cardCategory: "TEST PLANNING",
    cardStatus: "STRATEGY",
    type: "unlabeled",
    features: [
      { value: "Functional Scope" },
      { value: "Security Protocols" },
      { value: "Automation Framework" },
      { value: "Performance Baselines" },
    ],
    bg: "#C94716",
    text: "#ffffff",
    accent: "#ffffff",
    isLight: false,
    link: "/contact",
  },
  {
    num: "03",
    title: "Functional & Clinical Testing",
    titleSplit: "Functional &<br />Clinical Testing",
    icon: Stethoscope,
    desc: "Test healthcare workflows, data accuracy, APIs, integrations, and usability.",
    cardCategory: "CORE TESTING",
    cardStatus: "VALIDATION",
    type: "integration",
    integrationLine: "EHR · HL7 · FHIR · Telehealth · Medical Devices",
    additionalDescription: "Ensure seamless interoperability across clinical systems, verifying that patient data moves securely and accurately between connected modules.",
    bg: "#141414",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/contact",
  },
  {
    num: "04",
    title: "Security & Compliance",
    titleSplit: "Security &<br />Compliance",
    icon: ShieldCheck,
    desc: "Test data privacy, access control, vulnerabilities, APIs, and compliance.",
    cardCategory: "RISK MANAGEMENT",
    cardStatus: "SECURITY",
    type: "labeled",
    features: [
      { label: "Data Privacy", value: "Ensure PHI remains encrypted and secure." },
      { label: "Access Control", value: "Verify role-based access and permissions." },
      { label: "Vulnerability Scans", value: "Identify and patch system weaknesses." },
      { label: "API Security", value: "Protect endpoints against unauthorized access." },
    ],
    bg: "#FCFBF9",
    text: "#111111",
    accent: "#FF6B00",
    isLight: true,
    link: "/contact",
  },
  {
    num: "05",
    title: "Test Automation",
    titleSplit: "Test<br />Automation",
    icon: Cpu,
    desc: "Automate functional, API, regression, and end-to-end healthcare testing.",
    cardCategory: "AUTOMATION OPS",
    cardStatus: "ACCELERATION",
    type: "unlabeled",
    features: [
      { value: "Regression Suites" },
      { value: "API Automation" },
      { value: "UI/UX Checks" },
      { value: "End-to-End Workflows" },
    ],
    bg: "#1C1A18",
    text: "#ffffff",
    accent: "#FF6B00",
    isLight: false,
    link: "/contact",
  },
  {
    num: "06",
    title: "Continuous Quality",
    titleSplit: "Continuous<br />Quality",
    icon: RefreshCw,
    desc: "Integrate testing into CI/CD and continuously monitor performance and reliability.",
    cardCategory: "RELEASE PIPELINE",
    cardStatus: "CONTINUOUS",
    type: "workflow",
    workflowSteps: "CODE COMMIT → AUTOMATED TESTS → SECURITY SCANS → COMPLIANCE CHECKS → PRODUCTION DEPLOY",
    bg: "#101010",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/contact",
  },
];

export default function HealthcareTestingFramework() {
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
      {/* Section Header: Healthcare Testing Framework */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] pt-12 md:pt-16 pb-8 sm:pb-10 flex flex-col items-center text-center bg-white">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
          FEATURED HEALTHCARE TESTING WORKFLOW
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          From Healthcare Development to <br className="hidden md:block" />
          <span className="text-[#FF6B2C]">Continuous Quality Engineering</span>
        </h2>

        <p className="text-lg md:text-[1.1rem] leading-relaxed text-slate-500 max-w-3xl mx-auto">
          Validate healthcare applications with end-to-end testing, automation, security, and quality engineering.
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
                      text="EXPLORE OUR HEALTHCARE TESTING SERVICES →"
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

                        {card.type === "unlabeled" && card.features?.map((cap, capIdx) => (
                          <div
                            key={`feature-${capIdx}`}
                            className="group/row px-4 py-3 sm:py-4 flex items-center justify-between gap-3 transition-colors duration-150 hover:bg-white/[0.03]"
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
                                {cap.value}
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
                              IN SCOPE
                            </span>
                          </div>
                        ))}

                        {card.type === "integration" && (
                          <div className="px-5 py-6 flex flex-col gap-4">
                            <div 
                              className="font-mono text-xs tracking-wider uppercase px-3 py-2 rounded-md border w-fit"
                              style={{
                                color: card.accent || "#FF6B00",
                                backgroundColor: card.isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)",
                                borderColor: card.isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)",
                              }}
                            >
                              {card.integrationLine}
                            </div>
                            <p 
                              className="typo-body-sm leading-relaxed border-l-2 pl-4"
                              style={{
                                color: card.isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
                                borderColor: card.accent || "#FF6B00"
                              }}
                            >
                              {card.additionalDescription}
                            </p>
                          </div>
                        )}

                        {card.type === "workflow" && (
                          <div className="px-5 py-6 flex flex-col gap-3">
                            <div 
                              className="font-mono text-[10px] tracking-widest uppercase"
                              style={{ color: card.accent || "#FF6B00" }}
                            >
                              PIPELINE WORKFLOW
                            </div>
                            <div 
                              className="font-mono text-xs font-bold leading-relaxed p-4 rounded-xl border shadow-inner"
                              style={{
                                color: card.text,
                                backgroundColor: card.isLight ? "rgba(0,0,0,0.04)" : "rgba(0,0,0,0.4)",
                                borderColor: card.isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)",
                              }}
                            >
                              {card.workflowSteps?.split('→').map((step, idx, arr) => (
                                <React.Fragment key={idx}>
                                  <span style={{ color: card.text, opacity: 0.9 }}>{step.trim()}</span>
                                  {idx < arr.length - 1 && (
                                    <span className="mx-2" style={{ color: card.accent || "#FF6B00" }}>→</span>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        )}
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
                        <span>HEALTHCARE TESTING SYSTEM</span>
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
                <span>Softree Technology • Healthcare Quality Engineering</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
