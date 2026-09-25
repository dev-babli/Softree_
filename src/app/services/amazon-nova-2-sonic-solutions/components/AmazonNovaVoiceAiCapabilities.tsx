"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Mic,
  BrainCircuit,
  Globe2,
  Wrench,
  Database,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Sliders,
  ExternalLink,
} from "lucide-react";
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
}

export const CAPABILITIES: CapabilitySlide[] = [
  {
    id: "real-time-conversations",
    number: "01",
    gridTitle: "Real-Time Conversations",
    title: "Real-Time Voice Conversations",
    tag: "Ultra-Low Latency & Bidirectional Dialogue",
    tagline: "Natural, turn-by-turn speech with sub-200ms latency",
    description:
      "Amazon Nova 2 Sonic delivers native speech-to-speech intelligence without intermediate text transcribing. Softree engineers production voice pipelines with instant barge-in, dynamic turn-taking, and emotional nuance for human-grade interactions.",
    image:
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Speech Latency", value: "< 200ms" },
      { label: "Pipeline", value: "Speech-to-Speech" },
      { label: "Interruption", value: "Full-Duplex" },
    ],
    bulletPoints: [
      "Direct speech-to-speech neural pipeline avoiding STT/TTS latency bottlenecks",
      "Dynamic barge-in handling with intelligent speaker turn detection",
      "Contextual tone, pace, and vocal emotion matching the conversation state",
    ],
    ctaLabel: "Build Real-Time Voice Assistant",
    ctaHref: "#contact",
  },
  {
    id: "contextual-ai",
    number: "02",
    gridTitle: "Contextual AI",
    title: "Context-Aware AI",
    tag: "Enterprise State & Memory Management",
    tagline: "Persistent memory across multi-turn complex conversations",
    description:
      "Maintain conversational context, customer identity, and business rules across long dialogues. Softree implements state machines and session memory layers that keep voice agents grounded without losing context.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Context Window", value: "32K+ Tokens" },
      { label: "State Tracking", value: "Multi-Session" },
      { label: "Disambiguation", value: "Zero-Drop" },
    ],
    bulletPoints: [
      "Persistent session state tracking across phone, web, and app touchpoints",
      "Dynamic user intent resolution with contextual business guardrails",
      "Remembers previous preferences, prior tickets, and in-flight workflows",
    ],
    ctaLabel: "Explore Context Architectures",
    ctaHref: "#contact",
  },
  {
    id: "multilingual-voice",
    number: "03",
    gridTitle: "Multilingual Voice",
    title: "Multilingual Voice AI",
    tag: "Global Accents & Cross-Language Dialogue",
    tagline: "Native fluency, localized accents & instant code-switching",
    description:
      "Serve global customer bases effortlessly. Nova 2 Sonic enables fluent conversations across world languages with authentic native accents, regional dialect understanding, and real-time cross-language code-switching.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Global Languages", value: "100+ Dialects" },
      { label: "Code-Switching", value: "Mid-Sentence" },
      { label: "Accent Adaptation", value: "Zero-Shot" },
    ],
    bulletPoints: [
      "Native pronunciation and vernacular phrasing for global regions",
      "Seamless mid-sentence language switching without restarting context",
      "Cultural adaptation of idioms, formality levels, and localized terms",
    ],
    ctaLabel: "Deploy Multilingual Voice",
    ctaHref: "#contact",
  },
  {
    id: "tool-calling",
    number: "04",
    gridTitle: "Tool Calling",
    title: "AI Tool Calling & Actions",
    tag: "API Execution & Transactional Workflows",
    tagline: "Direct voice execution connecting to your enterprise APIs & CRM",
    description:
      "Transform voice conversations into automated business actions. Softree connects Nova 2 Sonic directly to your databases, ERP, CRM, and transactional APIs to book appointments, process orders, and resolve issues in real time.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Tool Execution", value: "Sub-Second" },
      { label: "API Standards", value: "OpenAPI / REST" },
      { label: "Security", value: "mTLS & OAuth 2.0" },
    ],
    bulletPoints: [
      "Autonomous function calling with strict schema parameter validation",
      "Direct integration with Salesforce, HubSpot, SAP, Zendesk, and custom APIs",
      "Transactional confirmation gates and human-in-the-loop escalation hooks",
    ],
    ctaLabel: "Connect Enterprise Workflows",
    ctaHref: "#contact",
  },
  {
    id: "rag-integration",
    number: "05",
    gridTitle: "RAG Integration",
    title: "Enterprise RAG Integration",
    tag: "Grounded Knowledge Bases & Vector Search",
    tagline: "Factual answers grounded in your business documents and policies",
    description:
      "Eliminate hallucinations with enterprise Retrieval-Augmented Generation. Softree links Nova 2 Sonic to Amazon Bedrock Knowledge Bases and vector search systems so voice agents cite accurate, verified company documentation.",
    image:
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Vector Search", value: "< 80ms Sync" },
      { label: "Bedrock Store", value: "OpenSearch / Pinecone" },
      { label: "Accuracy", value: "Hallucination-Free" },
    ],
    bulletPoints: [
      "Direct indexing of internal product manuals, SOPs, and compliance docs",
      "Sub-80ms vector retrieval tuned for real-time speech response windows",
      "Strict data boundary enforcement ensuring no enterprise data leaks",
    ],
    ctaLabel: "Integrate Knowledge Bases",
    ctaHref: "#contact",
  },
  {
    id: "voice-text-experiences",
    number: "06",
    gridTitle: "Voice + Text Experiences",
    title: "Voice & Text Experiences",
    tag: "Omnichannel & Multimodal Interfaces",
    tagline: "Synchronized voice, live transcription & interactive visual UI",
    description:
      "Merge the speed of voice with the clarity of visual interfaces. Softree builds multimodal web and mobile apps where spoken dialogue updates on-screen forms, triggers visual cards, and maintains complete cross-channel transcripts.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Streaming", value: "Bi-Directional" },
      { label: "Transcript Sync", value: "Real-Time" },
      { label: "Cross-Channel", value: "Voice to Chat" },
    ],
    bulletPoints: [
      "Simultaneous audio streaming and real-time live transcription display",
      "Dynamic visual UI card generation synchronized with speech answers",
      "Seamless omnichannel handover between phone call, web chat, and mobile app",
    ],
    ctaLabel: "Build Multimodal Experience",
    ctaHref: "#contact",
  },
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
export default function AmazonNovaVoiceAiCapabilities() {
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
      className="relative w-full bg-white text-slate-900 pt-6 md:pt-8 pb-10 md:pb-14 border-t border-slate-100 overflow-hidden"
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
              Amazon Nova 2 Sonic Capabilities
            </span>
          </div>

          <h2 className="typo-heading-2 text-slate-900">
           Amazon Nova 2 Sonic for Intelligent Business Voice Experiences
          </h2>

          <p className="mt-5 typo-description text-slate-600 max-w-3xl mx-auto font-normal">
            Nova 2 Sonic can power conversational experiences, while Softree
            connects the AI layer to your applications, data and business
            workflows.
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
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
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


          </div>
        </div>
      </div>
    </section>
  );
}
