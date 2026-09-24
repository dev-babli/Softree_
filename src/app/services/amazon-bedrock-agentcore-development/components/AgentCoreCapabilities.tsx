"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Mic,
  BrainCircuit,
  Globe2,
  Wrench,
  Database,
  Layers,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Sliders,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------
// CAPABILITY DEFINITIONS
// -------------------------------------------------------------
export interface CapabilitySlide {
  id: string;
  number: string;
  gridTitle: string;
  title: string;
  tag: string;
  tagline: string;
  description: string;
  image: string;
  metrics: { label: string; value: string }[];
  bulletPoints: string[];
  ctaLabel: string;
  ctaHref: string;
  secondaryCta: string;
}

export const CAPABILITIES: CapabilitySlide[] = [
  {
    id: "agentcore-runtime",
    number: "01",
    gridTitle: "AgentCore Runtime",
    title: "Amazon Bedrock AgentCore Runtime",
    tag: "SECURE AI AGENT DEPLOYMENT",
    tagline: "Deploy AI agents securely at production scale",
    description: "AgentCore Runtime provides a secure and scalable environment for deploying AI agents built with popular frameworks and models, helping businesses move agent applications from development to production.",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Agent Deployment", value: "Production-Ready" },
      { label: "Framework Support", value: "Flexible" },
      { label: "Agent Sessions", value: "Secure" }
    ],
    bulletPoints: [
      "Deploy production-ready AI agents with flexible frameworks and models",
      "Support secure agent sessions and scalable workloads",
      "Connect agents with enterprise applications, tools, and services"
    ],
    ctaLabel: "Build with AgentCore Runtime",
    ctaHref: "#contact",
    secondaryCta: "Runtime Overview"
  },
  {
    id: "agentcore-memory",
    number: "02",
    gridTitle: "AgentCore Memory",
    title: "Amazon Bedrock AgentCore Memory",
    tag: "CONTEXT-AWARE AI AGENTS",
    tagline: "Build AI agents that remember relevant context",
    description: "AgentCore Memory enables AI agents to maintain relevant context across interactions, helping create more personalized, consistent, and context-aware enterprise agent experiences.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "AI Agents", value: "Context-Aware" },
      { label: "Memory", value: "Short-Term" },
      { label: "Memory", value: "Long-Term" }
    ],
    bulletPoints: [
      "Maintain short-term context across agent interactions",
      "Support long-term memory for personalized experiences",
      "Build agents that use relevant historical context"
    ],
    ctaLabel: "Build Context-Aware Agents",
    ctaHref: "#contact",
    secondaryCta: "Memory Overview"
  },
  {
    id: "agentcore-gateway",
    number: "03",
    gridTitle: "AgentCore Gateway",
    title: "Amazon Bedrock AgentCore Gateway",
    tag: "ENTERPRISE TOOLS & INTEGRATIONS",
    tagline: "Connect AI agents to enterprise tools and APIs",
    description: "AgentCore Gateway helps connect AI agents with APIs, tools, services, and enterprise systems, enabling agents to securely interact with business applications and execute real-world workflows.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "API Integration", value: "Enterprise" },
      { label: "AI Tools", value: "Connected" },
      { label: "Business Workflows", value: "Automated" }
    ],
    bulletPoints: [
      "Connect agents with enterprise APIs and applications",
      "Integrate tools and services into agent workflows",
      "Enable agents to perform business actions through connected systems"
    ],
    ctaLabel: "Connect Your Enterprise Tools",
    ctaHref: "#contact",
    secondaryCta: "Gateway Overview"
  },
  {
    id: "agentcore-identity",
    number: "04",
    gridTitle: "AgentCore Identity",
    title: "Amazon Bedrock AgentCore Identity",
    tag: "SECURE AGENT ACCESS",
    tagline: "Secure identity and access for AI agents",
    description: "AgentCore Identity helps AI agents securely access AWS resources, enterprise applications, and external services while maintaining controlled permissions and identity-aware access.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Agent Identity", value: "Secure" },
      { label: "Permissions", value: "Controlled" },
      { label: "Enterprise Access", value: "Protected" }
    ],
    bulletPoints: [
      "Manage identity and permissions for AI agents",
      "Secure access to enterprise and AWS resources",
      "Control agent access to tools, applications, and services"
    ],
    ctaLabel: "Secure Your AI Agents",
    ctaHref: "#contact",
    secondaryCta: "Identity Overview"
  },
  {
    id: "agentcore-observability",
    number: "05",
    gridTitle: "AgentCore Observability",
    title: "Amazon Bedrock AgentCore Observability",
    tag: "MONITORING & OPERATIONS",
    tagline: "Monitor and debug AI agents in production",
    description: "AgentCore Observability provides visibility into AI agent workflows, helping engineering teams trace agent activity, monitor performance, investigate failures, and improve production reliability.",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Tracing", value: "Agent" },
      { label: "Monitoring", value: "Production" },
      { label: "Visibility", value: "Workflow" }
    ],
    bulletPoints: [
      "Trace agent workflows and tool interactions",
      "Monitor agent performance and production behavior",
      "Identify failures and troubleshoot complex agent workflows"
    ],
    ctaLabel: "Monitor Your AI Agents",
    ctaHref: "#contact",
    secondaryCta: "Observability Overview"
  },
  {
    id: "agentcore-evaluations",
    number: "06",
    gridTitle: "AgentCore Evaluations",
    title: "Amazon Bedrock AgentCore Evaluations",
    tag: "AI AGENT QUALITY & EVALUATION",
    tagline: "Evaluate AI agents for reliable production performance",
    description: "AgentCore Evaluations helps teams assess AI agent behavior and performance, providing a foundation for evaluating agent workflows and improving quality before and after production deployment.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Performance", value: "Agent" },
      { label: "Evaluation", value: "Workflow" },
      { label: "Quality", value: "Continuous" }
    ],
    bulletPoints: [
      "Evaluate agent responses and task performance",
      "Assess agent workflows and tool usage",
      "Continuously improve agent quality and reliability"
    ],
    ctaLabel: "Evaluate Your AI Agents",
    ctaHref: "#contact",
    secondaryCta: "Evaluations Overview"
  }
];

const ICONS = [Mic, BrainCircuit, Globe2, Wrench, Database, Layers];

// -------------------------------------------------------------
// STRIP MASK BUILDER (Sora Labs Shutter Reveal)
// -------------------------------------------------------------
const STRIP_COUNT = 16;

function createStripBounds(stripsCount: number) {
  return Array.from({ length: stripsCount }, (_, j) => {
    const posFromBottom = stripsCount - j - 1;
    const step = 100 / stripsCount;
    const lower = (posFromBottom + 1) * step;
    const upper = posFromBottom * step;
    return {
      lower,
      upperGap: upper - 0.1,
      delay: (j / stripsCount) * 0.45,
    };
  });
}

function mergeIntervals(intervals: { top: number; bottom: number }[]) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a.top - b.top);
  const merged = [{ ...intervals[0] }];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const next = intervals[i];
    if (next.top <= last.bottom) {
      last.bottom = Math.max(last.bottom, next.bottom);
    } else {
      merged.push({ ...next });
    }
  }
  return merged;
}

function buildStripMask(
  stripBounds: ReturnType<typeof createStripBounds>,
  progress: number,
) {
  const intervals: { top: number; bottom: number }[] = [];
  for (let j = 0; j < stripBounds.length; j++) {
    const bounds = stripBounds[j];
    const rawProgress = (progress - bounds.delay) * 2.2;
    const adj = Math.max(0, Math.min(1, rawProgress));
    if (adj <= 0) continue;
    const sliceHeight = bounds.lower - bounds.upperGap;
    intervals.push({
      top: bounds.lower - adj * sliceHeight,
      bottom: bounds.lower,
    });
  }
  const merged = mergeIntervals(intervals);
  if (!merged.length) {
    return "linear-gradient(to bottom, transparent 0%, transparent 100%)";
  }
  const stops: string[] = [];
  let cursor = 0;
  for (const { top, bottom } of merged) {
    if (top > cursor) {
      stops.push(`transparent ${cursor}%`, `transparent ${top}%`);
    }
    stops.push(`black ${top}%`, `black ${bottom}%`);
    cursor = bottom;
  }
  if (cursor < 100) {
    stops.push(`transparent ${cursor}%`, "transparent 100%");
  }
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------
export default function AgentCoreCapabilities() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const [isWiping, setIsWiping] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const activeImgRef = useRef<HTMLImageElement>(null);
  const incomingImgRef = useRef<HTMLImageElement>(null);
  const stripBounds = useMemo(() => createStripBounds(STRIP_COUNT), []);

  const currentCap = CAPABILITIES[activeIndex];
  const prevCap = CAPABILITIES[prevIndex];

  // Strip-mask wipe animation function
  const triggerTransition = useCallback(
    (targetIndex: number) => {
      if (targetIndex === activeIndex || isWiping) return;

      const incImg = incomingImgRef.current;
      const actImg = activeImgRef.current;

      if (!incImg || !actImg) {
        setPrevIndex(activeIndex);
        setActiveIndex(targetIndex);
        return;
      }

      setIsWiping(true);
      setPrevIndex(activeIndex);

      // Setup incoming image
      incImg.src = CAPABILITIES[targetIndex].image;
      incImg.style.maskImage =
        "linear-gradient(to bottom, transparent 0%, transparent 100%)";
      incImg.style.webkitMaskImage =
        "linear-gradient(to bottom, transparent 0%, transparent 100%)";
      incImg.style.opacity = "1";
      incImg.style.zIndex = "10";

      const animObj = { progress: 0 };

      gsap.to(animObj, {
        progress: 1,
        duration: 0.85,
        ease: "power2.inOut",
        onUpdate: () => {
          const mask = buildStripMask(stripBounds, animObj.progress);
          incImg.style.maskImage = mask;
          incImg.style.webkitMaskImage = mask;
          incImg.style.transform = `scale(${1.08 - animObj.progress * 0.08})`;
        },
        onComplete: () => {
          actImg.src = CAPABILITIES[targetIndex].image;
          incImg.style.opacity = "0";
          incImg.style.maskImage = "none";
          incImg.style.webkitMaskImage = "none";
          setActiveIndex(targetIndex);
          setIsWiping(false);
        },
      });
    },
    [activeIndex, isWiping, stripBounds],
  );

  const goToPrev = () => {
    const next = activeIndex === 0 ? CAPABILITIES.length - 1 : activeIndex - 1;
    triggerTransition(next);
  };

  const goToNext = () => {
    const next = activeIndex === CAPABILITIES.length - 1 ? 0 : activeIndex + 1;
    triggerTransition(next);
  };

  const scrollToGallery = (index: number) => {
    triggerTransition(index);
    galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white text-slate-900 pt-4 pb-16 md:pt-6 md:pb-24 border-t border-slate-100 overflow-hidden"
    >
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-slate-100/60 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* ========================================================= */}
        {/* SECTION HEADER: Requested Headline & Exact Description   */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#FF5812] animate-pulse" />
            <span className="typo-caption text-[#FF5812]">
              AMAZON BEDROCK AGENTCORE CAPABILITIES
            </span>
          </div>

          <h2 className="typo-heading-2 text-slate-900">
            Amazon Bedrock AgentCore for <span className="text-[#FF5812]">Production-Ready AI Agents</span>
          </h2>

          <p className="mt-5 typo-description text-slate-600 max-w-3xl mx-auto font-normal">
            Build, deploy, secure, and operate enterprise AI agents with Amazon Bedrock AgentCore, connecting agents with models, tools, memory, applications, and business workflows.
          </p>


        </div>

        {/* SORA LABS SHUTTER WIPE SCROLL GALLERY INTERFACE */}
        <div
          ref={galleryRef}
          className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl"
        >
          {/* Top Gallery Header Bar */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 px-6 sm:px-10 py-5 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812]" />
              <span className="typo-caption text-slate-300">
                Interactive Capability Showcase
              </span>
              <span className="typo-caption-meta text-slate-500 font-mono">
                [ {currentCap.number} / 06 ]
              </span>
            </div>

            {/* Quick Pill Jump Tabs */}
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-950/70 p-1 rounded-full border border-slate-800">
              {CAPABILITIES.map((cap, i) => (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => triggerTransition(i)}
                  className={cn(
                    "px-3 py-1 typo-caption-meta font-medium rounded-full transition-all whitespace-nowrap",
                    activeIndex === i
                      ? "bg-[#FF5812] text-white shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800",
                  )}
                >
                  {cap.gridTitle}
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}

          </div>

          {/* Main Visual Arena: Sora Labs Strip Shutter Canvas */}
          <div className="relative min-h-[580px] lg:min-h-[660px] w-full flex items-center">
            {/* Base Image Layer */}
            <img
              ref={activeImgRef}
              src={currentCap.image}
              alt={currentCap.title}
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-transform duration-700"
            />

            {/* Incoming Wipe Image Layer with Strip Mask */}
            <img
              ref={incomingImgRef}
              src={currentCap.image}
              alt={currentCap.title}
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-0"
            />

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />

            {/* Floating Glassmorphism Information Card */}
            <div className="relative z-20 w-full max-w-2xl px-6 sm:px-12 py-10 text-white">
              {/* Category Eyebrow */}
              <div className="flex items-center gap-2 mb-4">
                <span className="typo-caption text-[#FF5812] bg-[#FF5812]/15 px-3 py-1 rounded-md border border-[#FF5812]/30">
                  {currentCap.tag}
                </span>
                <span className="typo-caption-meta text-slate-400 font-mono">
                  CAPABILITY {currentCap.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="typo-heading-3 text-white mb-4">
                {currentCap.title}
              </h3>

              {/* Tagline */}
              <p className="typo-description-sm font-medium text-orange-200/90 mb-4">
                {currentCap.tagline}
              </p>

              {/* Detailed Business & Technical Description */}
              <p className="typo-body-sm text-slate-300 leading-relaxed mb-6">
                {currentCap.description}
              </p>

              {/* Technical Capability Bullets */}
              <div className="space-y-2 mb-8">
                {currentCap.bulletPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5812] shrink-0 mt-0.5" />
                    <span className="typo-body-sm text-slate-300 leading-normal">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 pt-4 pb-6 border-t border-slate-800/80 mb-6">
                {currentCap.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3 rounded-xl bg-slate-900/60 backdrop-blur-sm border border-slate-800"
                  >
                    <div className="typo-body-lg font-bold text-white">
                      {m.value}
                    </div>
                    <div className="typo-caption-meta text-slate-400 mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={currentCap.ctaHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF5812] hover:bg-[#ff6c2f] active:scale-95 text-white typo-button transition-all shadow-lg shadow-orange-600/30"
                >
                  <span>{currentCap.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#faq"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white typo-button-sm font-medium border border-slate-800 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span>{currentCap.secondaryCta}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Indicators and Mobile Pager */}
          <div className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-4 bg-slate-900/90 border-t border-slate-800 typo-caption-meta text-slate-400">
            <div className="flex items-center gap-2">
              {CAPABILITIES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => triggerTransition(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    activeIndex === i
                      ? "w-8 bg-[#FF5812]"
                      : "w-2 bg-slate-700 hover:bg-slate-500",
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-slate-500">

              </span>
              <span className="font-mono text-white">
                {String(activeIndex + 1).padStart(2, "0")} / 06
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
