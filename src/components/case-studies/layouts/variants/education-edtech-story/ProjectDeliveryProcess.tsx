"use client"

import React from "react"
import { CaseStudyEyebrow } from "./EducationEdTechStoryPage"

export interface DeliveryStep {
  id: string
  numeral: string
  phase: string
  title: string
  description: string
  deliverables: string[]
}

const DEFAULT_DELIVERY_STEPS: DeliveryStep[] = [
  {
    id: "discovery",
    numeral: "I",
    phase: "PHASE 01",
    title: "Discovery & Architecture",
    description: "Deep-dive technical audit of existing systems, security baselines, API mapping, and comprehensive cloud target blueprinting.",
    deliverables: ["Architecture Blueprint", "Integration Matrix", "Security Baseline"],
  },
  {
    id: "design",
    numeral: "II",
    phase: "PHASE 02",
    title: "UX & System Prototyping",
    description: "Role-based user journeys, wireframing, high-fidelity clickable Figma prototypes, and API contract specifications prior to build.",
    deliverables: ["Interactive Prototypes", "Design System Tokens", "API Contracts"],
  },
  {
    id: "engineering",
    numeral: "III",
    phase: "PHASE 03",
    title: "Agile Sprint Engineering",
    description: "Modular development sprints delivering clean, shippable code with automated CI/CD pipelines and continuous testing.",
    deliverables: ["Production Modules", "Automated CI/CD", "Peer-Reviewed Code"],
  },
  {
    id: "qa-security",
    numeral: "IV",
    phase: "PHASE 04",
    title: "QA & Security Hardening",
    description: "End-to-end regression suites, cross-device verification, load stress audits, and penetration testing for enterprise resilience.",
    deliverables: ["Automated Test Matrix", "Penetration Audit", "Zero-Defect Sign-off"],
  },
  {
    id: "deployment",
    numeral: "V",
    phase: "PHASE 05",
    title: "Production Launch & Scale",
    description: "Zero-downtime blue-green production deployment, real-time telemetry, administrator training runbooks, and ongoing SLA support.",
    deliverables: ["Live Production Release", "Cloud Telemetry", "SLA Support Runbook"],
  },
]

interface ProjectDeliveryProcessProps {
  className?: string
  title?: string
  eyebrow?: string
  description?: string
  showHeader?: boolean
  steps?: DeliveryStep[]
}

export function ProjectDeliveryProcess({
  className = "",
  title = "Our Engineering & Delivery Process",
  eyebrow = "Project Delivery Lifecycle",
  description = "Our structured project delivery approach takes you from discovery and planning to development, testing, and deployment, ensuring quality, transparency, and predictable outcomes at every stage.",
  showHeader = false,
  steps = DEFAULT_DELIVERY_STEPS,
}: ProjectDeliveryProcessProps) {
  return (
    <div className={`w-full ${className}`} style={{ fontFamily: "var(--body, 'IBM Plex Sans', sans-serif)" }}>
      {/* Optional Left-Aligned Header Block if showHeader is enabled */}
      {showHeader && (
        <div className="mb-10 text-left">
          <CaseStudyEyebrow text={eyebrow} />
          <h2
            className="mt-2 text-2xl font-semibold tracking-tight text-[#14213D] sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--display, 'Fraunces', serif)", lineHeight: 1.2 }}
          >
            {title}
          </h2>

          {description && (
            <p
              className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#2A3A5C] sm:text-base"
              style={{ fontFamily: "var(--body, 'IBM Plex Sans', sans-serif)" }}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {/* Main 8-bit Horizontal Timeline Section */}
      <div className="relative w-full">
        {/* Desktop Horizontal Connecting Track */}
        <div
          className="absolute top-7 left-12 right-12 hidden h-0 border-t-2 border-dashed border-[#14213D]/30 lg:block z-0 pointer-events-none"
          aria-hidden="true"
        />

        {/* Mobile Vertical Connecting Track */}
        <div
          className="absolute top-7 bottom-7 left-7 block w-0 border-l-2 border-dashed border-[#14213D]/30 lg:hidden z-0 pointer-events-none"
          aria-hidden="true"
        />

        {/* Steps Grid */}
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:gap-3.5">
          {steps.map((step, idx) => (
            <div
              key={step.id || idx}
              className="group relative flex flex-1 flex-row items-start gap-4 lg:flex-col lg:items-center"
            >
              {/* 8-bit Checkpoint Badge */}
              <div
                className="relative z-10 flex size-14 shrink-0 items-center justify-center border-2 border-[#14213D] bg-[#FAF7F0] text-[#14213D] text-base font-bold shadow-[3px_3px_0px_0px_#14213D] transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-[#ff5c00] group-hover:text-white group-hover:shadow-[4px_4px_0px_0px_#14213D]"
                style={{ fontFamily: "var(--mono, 'IBM Plex Mono', monospace)" }}
              >
                {/* Subtle pixel corner dots */}
                <span className="absolute top-0.5 left-0.5 size-1 bg-current opacity-40" />
                <span className="absolute top-0.5 right-0.5 size-1 bg-current opacity-40" />
                <span className="absolute bottom-0.5 left-0.5 size-1 bg-current opacity-40" />
                <span className="absolute bottom-0.5 right-0.5 size-1 bg-current opacity-40" />

                {step.numeral}
              </div>

              {/* Step Card Content */}
              <div
                className="relative w-full flex-1 border-2 border-[#14213D] bg-white p-4 text-left shadow-[3px_3px_0px_0px_#14213D] transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[5px_5px_0px_0px_#ff5c00] group-hover:border-[#14213D] lg:text-center"
              >
                {/* 8-bit Corner Accents */}
                <span className="absolute top-0 left-0 size-1 bg-[#14213D]" />
                <span className="absolute top-0 right-0 size-1 bg-[#14213D]" />
                <span className="absolute bottom-0 left-0 size-1 bg-[#14213D]" />
                <span className="absolute bottom-0 right-0 size-1 bg-[#14213D]" />

                {/* Phase Label */}
                <div
                  className="text-[10px] font-semibold tracking-wider text-[#ff5c00] uppercase"
                  style={{ fontFamily: "var(--mono, 'IBM Plex Mono', monospace)" }}
                >
                  {step.phase}
                </div>

                {/* Title */}
                <h3
                  className="mt-1.5 text-xs font-bold tracking-tight text-[#14213D] sm:text-sm"
                  style={{ fontFamily: "var(--body, 'IBM Plex Sans', sans-serif)" }}
                >
                  {step.title}
                </h3>

                {/* Short Description */}
                <p
                  className="mt-2 text-xs leading-relaxed text-[#2A3A5C]"
                  style={{ fontFamily: "var(--body, 'IBM Plex Sans', sans-serif)" }}
                >
                  {step.description}
                </p>

                {/* Deliverables Chips */}
                <div className="mt-3 flex flex-wrap gap-1 lg:justify-center">
                  {step.deliverables.map((item, dIdx) => (
                    <span
                      key={dIdx}
                      className="inline-block border border-[#14213D]/20 bg-[#FAF7F0] px-1.5 py-0.5 text-[9px] font-medium text-[#14213D]"
                      style={{ fontFamily: "var(--mono, 'IBM Plex Mono', monospace)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
