"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FlowButton } from "@/components/ui/flow-button";
import { CheckCircle2, Cpu, Network, Share2, Gauge } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const items = [
  {
    num: "01",
    title: "Functional Testing",
    titleSplit: "Functional<br />Testing",
    icon: CheckCircle2,
    desc: "Validate healthcare workflows, features, business logic, and application behavior.",
    cardCategory: "CORE VALIDATION",
    cardStatus: "FUNCTIONAL",
    features: [
      { label: "Clinical Workflows", value: "Validate patient admission, care paths, and clinical operations." },
      { label: "Business Logic", value: "Verify healthcare domain rules, medical dosage, and billing logic." },
      { label: "Role Permissions", value: "Validate clinician, nurse, administrator, and patient portal access." },
      { label: "Edge-Case Handling", value: "Check unexpected inputs, incomplete records, and error handling." },
    ],
    bg: "#0D0D0D",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/contact",
  },
  {
    num: "02",
    title: "Automation Testing",
    titleSplit: "Automation<br />Testing",
    icon: Cpu,
    desc: "Automate repetitive UI, API, and regression test scenarios.",
    cardCategory: "TEST AUTOMATION",
    cardStatus: "AUTOMATED",
    features: [
      { label: "Regression Suites", value: "Automated end-to-end regression test suites across core journeys." },
      { label: "Cross-Platform UI", value: "Cross-browser and multi-device automated interface testing." },
      { label: "CI/CD Pipelines", value: "Automated test triggers on code push, pull request, and deployment." },
      { label: "Test Frameworks", value: "Modular, data-driven automation frameworks with repeatable test data." },
    ],
    bg: "#C94716",
    text: "#ffffff",
    accent: "#ffffff",
    isLight: false,
    link: "/contact",
  },
  {
    num: "03",
    title: "API Testing",
    titleSplit: "API<br />Testing",
    icon: Network,
    desc: "Validate API functionality, responses, authentication, errors, and integrations.",
    cardCategory: "API & BACKEND",
    cardStatus: "VALIDATED",
    features: [
      { label: "REST & GraphQL", value: "Validate endpoint payloads, status codes, and schema contracts." },
      { label: "Authentication", value: "Verify OAuth 2.0, JWT tokens, and role-based API authorization." },
      { label: "Data Integrity", value: "Ensure PHI and patient records persist accurately across requests." },
      { label: "Resilience & Fallback", value: "Test API error rates, timeouts, rate limits, and failure handling." },
    ],
    bg: "#141414",
    text: "#ffffff",
    accent: "#FF6B2C",
    isLight: false,
    link: "/contact",
  },
  {
    num: "04",
    title: "Integration Testing",
    titleSplit: "Integration<br />Testing",
    icon: Share2,
    desc: "Test communication between applications, APIs, databases, and external systems.",
    cardCategory: "INTEROPERABILITY",
    cardStatus: "CONNECTED",
    features: [
      { label: "EHR & EMR Systems", value: "Validate bidirectional patient record sync with hospital EHR systems." },
      { label: "HL7 & FHIR Standards", value: "Test healthcare data exchange, message formatting, and resource mapping." },
      { label: "Lab & Diagnostics", value: "Validate integration with LIS, PACS imaging, and medical device feeds." },
      { label: "Third-Party Services", value: "Test pharmacy systems, insurance eligibility, and billing gateways." },
    ],
    bg: "#FCFBF9",
    text: "#111111",
    accent: "#FF6B00",
    isLight: true,
    link: "/contact",
  },
  {
    num: "05",
    title: "Performance Testing",
    titleSplit: "Performance<br />Testing",
    icon: Gauge,
    desc: "Evaluate application speed, scalability, stability, and workload performance.",
    cardCategory: "PERFORMANCE & SCALE",
    cardStatus: "OPTIMIZED",
    features: [
      { label: "Peak Load Testing", value: "Simulate high-volume clinician and patient concurrency without degradation." },
      { label: "Response Benchmarks", value: "Measure and optimize sub-second response times for clinical workflows." },
      { label: "Stress & Scalability", value: "Validate infrastructure stability under emergency traffic spikes." },
      { label: "Resource Optimization", value: "Identify database bottlenecks, memory leaks, and query execution limits." },
    ],
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
      {/* Section Header: Healthcare Testing Services */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] pt-12 md:pt-16 pb-8 sm:pb-10 flex flex-col items-center text-center bg-white">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] uppercase mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
          HEALTHCARE TESTING SERVICES
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          One Healthcare Testing Team Across
          <br />
          <span className="text-[#FF6B2C]">
            Every Stage of Your Application
          </span>
        </h2>

        <p className="text-lg md:text-[1.1rem] leading-relaxed text-slate-500 max-w-3xl mx-auto">
          Softree provides a broad range of healthcare software testing services,
          combining manual testing, automation, API validation, performance
          testing, and AI-specific testing.
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
                    {card.num} / 0{items.length} — {card.title}
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
                      text="EXPLORE OUR HEALTHCARE TESTING SERVICES"
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
                          ? "rgba(255, 255, 255, 0.9)"
                          : "rgba(18, 18, 18, 0.8)",
                        borderColor: card.isLight
                          ? "rgba(0, 0, 0, 0.08)"
                          : "rgba(255, 255, 255, 0.12)",
                      }}
                    >
                      {/* Top Bar Header - Clean, No Dots */}
                      <div
                        className="px-5 py-3.5 flex items-center justify-between border-b"
                        style={{
                          backgroundColor: card.isLight
                            ? "rgba(0,0,0,0.02)"
                            : "rgba(255,255,255,0.03)",
                          borderColor: card.isLight
                            ? "rgba(0,0,0,0.06)"
                            : "rgba(255,255,255,0.08)",
                        }}
                      >
                        <span
                          className="typo-caption font-bold tracking-widest uppercase opacity-90"
                          style={{ color: card.text }}
                        >
                          KEY CAPABILITIES
                        </span>

                        <span
                          className="typo-caption-meta font-bold tracking-wider uppercase px-2.5 py-1 rounded border text-[11px]"
                          style={{
                            color: card.accent || "#FF6B00",
                            borderColor: card.isLight
                              ? "rgba(0,0,0,0.1)"
                              : "rgba(255,255,255,0.15)",
                            backgroundColor: card.isLight
                              ? "rgba(0,0,0,0.03)"
                              : "rgba(255,255,255,0.05)",
                          }}
                        >
                          {card.cardStatus}
                        </span>
                      </div>

                      {/* Capabilities Rows - Clean, Clear Words, No Dots */}
                      <div
                        className="divide-y"
                        style={{
                          borderColor: card.isLight
                            ? "rgba(0,0,0,0.06)"
                            : "rgba(255,255,255,0.07)",
                        }}
                      >
                        {card.features.map((cap, capIdx) => (
                          <div
                            key={`feature-${capIdx}`}
                            className="px-5 py-3.5 sm:py-4 flex flex-col gap-1 transition-colors duration-150"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className="shrink-0 text-xs font-bold font-mono"
                                style={{
                                  color: card.accent || "#FF6B00",
                                }}
                              >
                                0{capIdx + 1}
                              </span>
                              <span
                                className="text-sm font-semibold tracking-tight"
                                style={{ color: card.text }}
                              >
                                {cap.label}
                              </span>
                            </div>
                            <p
                              className="text-xs sm:text-[13px] leading-relaxed pl-6"
                              style={{
                                color: card.isLight
                                  ? "rgba(17,17,17,0.72)"
                                  : "rgba(255,255,255,0.72)",
                              }}
                            >
                              {cap.value}
                            </p>
                          </div>
                        ))}
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
