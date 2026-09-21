"use client";

import React, { useRef, useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FlowButton } from '@/components/ui/flow-button';
import {
  Brain,
  ShieldCheck,
  Workflow,
  Sparkles,
  Cpu,
  Layers,
  Zap,
  Database,
  Activity,
  CheckCircle2,
  Bot,
  Network,
  Search,
  Code2,
  LineChart,
  GitBranch,
  Sliders,
  Scale,
  ArrowRight
} from 'lucide-react';
import './WhySoftreeCurtainSlider.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, CustomEase);
  if (!CustomEase.get('annnimate')) {
    CustomEase.create('annnimate', 'M0,0 C0.3,0.9 0.1,1 1,1');
  }
  if (!CustomEase.get('annnimateInOut')) {
    CustomEase.create('annnimateInOut', 'M0,0 C0.7,0 0.16,1 1,1');
  }
}

const STRIP_DUR_RATIO = 0.62;
const INCOMING_SHADE = 0.18;
const OUT_SHADE = 0.3;
const ZOOM_FROM = 1.3;
const TITLE_OUT_DUR = 0.55;
const TITLE_IN_DUR = 0.95;
const SWIPE_THRESHOLD_RATIO = 0.15;
const ARROW_HOVER_DUR = 0.35;
const ARROW_PRESS_DUR = 0.15;
const AUTO_RESUME_DELAY = 6;

const VIEWPORT_QUERIES = {
  mobile: '(max-width: 479px)',
  tablet: '(max-width: 991px)',
  landscape: '(orientation: landscape) and (max-width: 767px)',
  desktop: '(min-width: 992px)',
};

interface CapabilityItem {
  iconType: string;
  title: string;
  desc: string;
}

interface TabData {
  id: string;
  title: string;
  phase: string;
  subtitle: string;
  desc: string;
  src: string;
  alt: string;
  tags: string[];
  heading: string;
  subheading: string;
  capabilities: CapabilityItem[];
  card: {
    statusBadge: string;
    stack: string;
    outcomeTitle: string;
    outcomeDesc: string;
    metricLabel: string;
    metricValue: string;
    metricSecondary?: string;
    ctaText: string;
    ctaLink: string;
  };
}

const tabsData: TabData[] = [
  {
    id: "discover",
    title: "Discover & Define",
    phase: "01 — DISCOVER & DEFINE",
    subtitle: "Understand the business problem, users, data, systems, workflow, and where Agentic AI can create meaningful value.",
    desc: "Understand the business problem, users, data, systems, workflow, and where Agentic AI can create meaningful value.",
    src: "/images/ai-development-service/agenticAi-1.png",
    alt: "01 Discover & Define",
    tags: ["Problem Discovery", "Data Readiness", "AI Opportunity"],
    heading: "Business Problem & Agentic AI Opportunity Mapping",
    subheading: "Define the business problem, assess data and system readiness, and identify where AI agents can improve real workflows.",
    capabilities: [
      { iconType: "search", title: "Problem Definition", desc: "Map business friction, operational bottlenecks, users, and workflow requirements." },
      { iconType: "database", title: "Data Readiness", desc: "Assess data quality, knowledge sources, schemas, and system availability." },
      { iconType: "shield", title: "Risk & Feasibility", desc: "Review technical, security, compliance, and implementation constraints." },
      { iconType: "chart", title: "Use-Case Prioritization", desc: "Identify and prioritize AI opportunities based on business value and feasibility." }
    ],
    card: {
      statusBadge: "PHASE 01 // DISCOVERY",
      stack: "Use-Case Assessment",
      outcomeTitle: "AI Opportunity Blueprint",
      outcomeDesc: "A clear view of the business problem, data readiness, AI-agent opportunity, and recommended next steps.",
      metricValue: "01",
      metricLabel: "Phase",
      metricSecondary: "Discovery",
      ctaText: "Start Your AI Project",
      ctaLink: "/contact"
    }
  },
  {
    id: "design",
    title: "Strategy & Architecture",
    phase: "02 — STRATEGY & ARCHITECTURE",
    subtitle: "Design the right Agentic AI architecture, models, tools, data flows, integrations, and security boundaries for the target workflow.",
    desc: "Design the right Agentic AI architecture, models, tools, data flows, integrations, and security boundaries for the target workflow.",
    src: "/images/ai-development-service/agenticAi-2.png",
    alt: "02 Strategy & Architecture",
    tags: ["Agent Architecture", "Model Strategy", "Solution Design"],
    heading: "Agentic AI Solution Architecture",
    subheading: "Define how agents, models, knowledge, tools, applications, and controls work together in the target solution.",
    capabilities: [
      { iconType: "workflow", title: "Agent Architecture", desc: "Define single-agent or multi-agent patterns, responsibilities, and orchestration." },
      { iconType: "layers", title: "Model Selection", desc: "Evaluate models and supporting services against the use case and technical requirements." },
      { iconType: "code", title: "Tool & Data Design", desc: "Define tools, APIs, knowledge sources, memory/context, and data flows." },
      { iconType: "shield", title: "Security Boundaries", desc: "Plan access controls, data boundaries, guardrails, and human oversight." }
    ],
    card: {
      statusBadge: "PHASE 02 // ARCHITECTURE",
      stack: "Solution Blueprint",
      outcomeTitle: "Production-Ready AI Architecture",
      outcomeDesc: "Translate the validated use case into an architecture, technology plan, integration approach, and implementation roadmap.",
      metricValue: "02",
      metricLabel: "Phase",
      metricSecondary: "Architecture",
      ctaText: "Start Your AI Project",
      ctaLink: "/contact"
    }
  },
  {
    id: "build",
    title: "Develop",
    phase: "03 — DEVELOP",
    subtitle: "Build AI agents, prompts, RAG, orchestration, tools, workflows, and application components around the approved solution architecture.",
    desc: "Build AI agents, prompts, RAG, orchestration, tools, workflows, and application components around the approved solution architecture.",
    src: "/images/ai-development-service/agenticAi-3.png",
    alt: "03 Develop",
    tags: ["AI Agent Development", "RAG & Orchestration", "Prompt Engineering"],
    heading: "AI Agent & Application Development",
    subheading: "Develop agents that can understand context, use tools, retrieve knowledge, and execute defined multi-step tasks.",
    capabilities: [
      { iconType: "bot", title: "AI Agent Development", desc: "Build custom agents for defined business tasks and decision-driven workflows." },
      { iconType: "database", title: "RAG & Knowledge", desc: "Connect agents to trusted business documents, knowledge bases, and data." },
      { iconType: "zap", title: "Tool & API Integration", desc: "Enable agents to interact with approved tools, APIs, and application services." },
      { iconType: "workflow", title: "Workflow Orchestration", desc: "Coordinate agent actions, business rules, and multi-step workflow execution." }
    ],
    card: {
      statusBadge: "PHASE 03 // DEVELOPMENT",
      stack: "Build & Validate",
      outcomeTitle: "Custom AI Agent Solution",
      outcomeDesc: "Turn the approved architecture into working AI agents, knowledge capabilities, tools, workflows, and application experiences.",
      metricValue: "03",
      metricLabel: "Phase",
      metricSecondary: "Development",
      ctaText: "Start Your AI Project",
      ctaLink: "/contact"
    }
  },
  {
    id: "integrate",
    title: "Integrate",
    phase: "04 — INTEGRATE",
    subtitle: "Connect AI agents with business applications, APIs, databases, enterprise knowledge, and existing workflows.",
    desc: "Connect AI agents with business applications, APIs, databases, enterprise knowledge, and existing workflows.",
    src: "/images/ai-development-service/agenticAi-4.png",
    alt: "04 Integrate",
    tags: ["API Integration", "Business Systems", "Workflow Integration"],
    heading: "AI Agents Connected to Business Systems",
    subheading: "Integrate AI capabilities with the systems, data, tools, and workflows required to perform useful business actions.",
    capabilities: [
      { iconType: "code", title: "API Integration", desc: "Connect agents with approved APIs, services, and application endpoints." },
      { iconType: "layers", title: "Business Applications", desc: "Integrate AI capabilities into existing applications and business processes." },
      { iconType: "database", title: "Enterprise Data", desc: "Connect agents with databases, documents, knowledge systems, and business data." },
      { iconType: "workflow", title: "Workflow Integration", desc: "Embed AI actions into existing operational workflows and automation." }
    ],
    card: {
      statusBadge: "PHASE 04 // INTEGRATION",
      stack: "Connected Systems",
      outcomeTitle: "Integrated AI Workflows",
      outcomeDesc: "Connect agents, data, tools, and applications so the AI solution can operate within the client's existing technology environment.",
      metricValue: "04",
      metricLabel: "Phase",
      metricSecondary: "Integration",
      ctaText: "Start Your AI Project",
      ctaLink: "/contact"
    }
  },
  {
    id: "validate",
    title: "Test & Evaluate",
    phase: "05 — TEST & EVALUATE",
    subtitle: "Validate agent behavior, task execution, retrieval quality, reliability, security, and failure handling before production.",
    desc: "Validate agent behavior, task execution, retrieval quality, reliability, security, and failure handling before production.",
    src: "/images/ai-development-service/agenticAi-5.png",
    alt: "05 Test & Evaluate",
    tags: ["AI Evaluation", "Behavioral Testing", "Security Validation"],
    heading: "AI Agent Testing & Evaluation",
    subheading: "Evaluate whether agents behave reliably, use tools correctly, retrieve relevant knowledge, and handle errors and exceptions safely.",
    capabilities: [
      { iconType: "activity", title: "Behavioral Testing", desc: "Test agent responses, reasoning flows, task execution, and expected behavior." },
      { iconType: "check", title: "RAG Evaluation", desc: "Validate retrieval quality, relevance, grounding, and knowledge responses." },
      { iconType: "shield", title: "Security Validation", desc: "Test access controls, guardrails, sensitive-data handling, and unsafe actions." },
      { iconType: "chart", title: "Performance Testing", desc: "Check reliability, latency, failure handling, and application performance." }
    ],
    card: {
      statusBadge: "PHASE 05 // EVALUATION",
      stack: "Quality & Reliability",
      outcomeTitle: "Validated AI Behavior",
      outcomeDesc: "Identify reliability, security, retrieval, and workflow issues before the solution moves into production.",
      metricValue: "05",
      metricLabel: "Phase",
      metricSecondary: "Evaluation",
      ctaText: "Start Your AI Project",
      ctaLink: "/contact"
    }
  },
  {
    id: "scale",
    title: "Deploy & Optimize",
    phase: "06 — DEPLOY & OPTIMIZE",
    subtitle: "Deploy AI solutions securely, monitor production behavior, evaluate performance, and continuously improve the system.",
    desc: "Deploy AI solutions securely, monitor production behavior, evaluate performance, and continuously improve the system.",
    src: "/images/ai-development-service/agenticAi-6.png",
    alt: "06 Deploy & Optimize",
    tags: ["Production Deployment", "Monitoring & Observability", "Continuous Optimization"],
    heading: "Production Deployment & AI Operations",
    subheading: "Move validated AI solutions into production with monitoring, operational controls, evaluation feedback, and ongoing optimization.",
    capabilities: [
      { iconType: "cpu", title: "Secure Deployment", desc: "Deploy AI solutions with appropriate infrastructure, access controls, and operational safeguards." },
      { iconType: "activity", title: "Monitoring & Observability", desc: "Track production behavior, system health, failures, and operational signals." },
      { iconType: "sliders", title: "Performance Optimization", desc: "Improve agent workflows, retrieval, tool usage, reliability, and overall system performance." },
      { iconType: "brain", title: "Ongoing Support", desc: "Continuously evaluate, improve, and evolve the AI solution as business needs change." }
    ],
    card: {
      statusBadge: "PHASE 06 // PRODUCTION",
      stack: "Monitor & Improve",
      outcomeTitle: "Production-Ready AI Operations",
      outcomeDesc: "Keep the AI solution reliable and useful after launch through monitoring, evaluation, optimization, and ongoing engineering support.",
      metricValue: "06",
      metricLabel: "Phase",
      metricSecondary: "Production",
      ctaText: "Start Your AI Project",
      ctaLink: "/contact"
    }
  }
];

function getCapabilityIcon(iconType: string) {
  switch (iconType) {
    case 'search': return <Search className="w-3.5 h-3.5" />;
    case 'brain': return <Brain className="w-3.5 h-3.5" />;
    case 'database': return <Database className="w-3.5 h-3.5" />;
    case 'globe': return <Network className="w-3.5 h-3.5" />;
    case 'shield': return <ShieldCheck className="w-3.5 h-3.5" />;
    case 'scale': return <Scale className="w-3.5 h-3.5" />;
    case 'check': return <CheckCircle2 className="w-3.5 h-3.5" />;
    case 'workflow': return <Workflow className="w-3.5 h-3.5" />;
    case 'git': return <GitBranch className="w-3.5 h-3.5" />;
    case 'cpu': return <Cpu className="w-3.5 h-3.5" />;
    case 'zap': return <Zap className="w-3.5 h-3.5" />;
    case 'code': return <Code2 className="w-3.5 h-3.5" />;
    case 'layers': return <Layers className="w-3.5 h-3.5" />;
    case 'activity': return <Activity className="w-3.5 h-3.5" />;
    case 'chart': return <LineChart className="w-3.5 h-3.5" />;
    case 'sliders': return <Sliders className="w-3.5 h-3.5" />;
    case 'bot': return <Bot className="w-3.5 h-3.5" />;
    case 'sparkles':
    default: return <Sparkles className="w-3.5 h-3.5" />;
  }
}

function indexLabel(i: number) {
  return String(i + 1).padStart(2, '0');
}

function buildCharLine(text: string, lineClass: string, charClass: string, isTitle: boolean = false) {
  const line = document.createElement('span');
  line.className = lineClass;

  const words = text.split(' ');
  words.forEach((word, i) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';

    word.split('').forEach((ch) => {
      const span = document.createElement('span');
      span.className = charClass;
      span.textContent = ch;
      wordSpan.appendChild(span);
    });

    line.appendChild(wordSpan);

    if (i < words.length - 1) {
      const spaceSpan = document.createElement('span');
      spaceSpan.className = charClass;
      spaceSpan.style.whiteSpace = 'pre';
      spaceSpan.textContent = ' ';
      line.appendChild(spaceSpan);
    }
  });

  return line;
}

function splitChars(el: HTMLElement, text: string, lineClass: string, charClass: string, isTitle: boolean = false) {
  el.innerHTML = '';
  const line = buildCharLine(text, lineClass, charClass, isTitle);
  el.appendChild(line);
  return Array.from(line.querySelectorAll('.' + charClass));
}

function swapChars(el: HTMLElement, newText: string, lineClass: string, charClass: string, outVars: any, inVars: any, isTitle: boolean = false) {
  const oldLine = el.querySelector('.' + lineClass + ':not(.wcs_line_out)');
  if (oldLine) {
    oldLine.classList.add('wcs_line_out');
    const oldChars = oldLine.querySelectorAll('.' + charClass);
    gsap.to(oldChars, Object.assign({
      onComplete: () => { oldLine.remove(); },
    }, outVars));
  }
  const line = buildCharLine(newText, lineClass, charClass, isTitle);
  el.appendChild(line);
  const chars = Array.from(line.querySelectorAll('.' + charClass));
  gsap.set(chars, inVars.from);
  gsap.to(chars, inVars.to);
  return chars;
}


function layoutStrips(stage: HTMLElement, layerParts: any[], columns: number) {
  const w = stage.clientWidth || 1;
  const edges: number[] = [];
  for (let c = 0; c <= columns; c++) edges.push(Math.round((c * w) / columns));
  layerParts.forEach((parts) => {
    for (let c = 0; c < columns; c++) {
      const strip = parts.strips[c];
      const inner = parts.inners[c];
      const overlap = c < columns - 1 ? 1 : 0;
      strip.style.left = edges[c] + 'px';
      strip.style.width = (edges[c + 1] - edges[c] + overlap) + 'px';
      inner.style.left = (-edges[c]) + 'px';
      inner.style.width = w + 'px';
    }
  });
}

function setLayerVisible(layer: HTMLElement, visible: boolean) {
  layer.style.visibility = visible ? '' : 'hidden';
}

function clearStripClips(parts: any) {
  for (let s = 0; s < parts.strips.length; s++) {
    parts.strips[s].style.clipPath = 'none';
    parts.strips[s].style.removeProperty('--csc');
  }
}

export default function WhySoftreeCurtainSlider() {
  const images = tabsData;
  const duration = 1.1;
  const ease = 'annnimate';
  const columns = 12;
  const auto = 6;
  const drag = true;
  const stagger = 0.0125;

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleElRef = useRef<HTMLHeadingElement>(null);
  const descElRef = useRef<HTMLParagraphElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const [activeReactIndex, setActiveReactIndex] = useState(0);

  const clampedColumns = Math.max(2, Math.min(24, parseInt(columns as any, 10) || 12));
  const resolvedEase = (ease === 'annnimate' || ease === 'annnimateInOut') ? ease : (ease || 'expo.out');

  const currentIndexRef = useRef(0);
  const refsRef = useRef<any>(null);
  const zTopRef = useRef(0);
  const goToSeqRef = useRef(0);
  const inFlightRef = useRef<any>(null);
  const lastGoToRef = useRef(0);
  const dragStartRef = useRef(0);
  const dragActiveRef = useRef(false);
  const dragAxisSizeRef = useRef(1);
  const autoTimerRef = useRef<any>(null);
  const resumeTimerRef = useRef<any>(null);
  const reducedMotionRef = useRef(false);

  const settleCurrent = useCallback(() => {
    const refs = refsRef.current;
    if (!refs) return;
    const slide = images[currentIndexRef.current];

    const titleChars = splitChars(refs.titleEl, slide.title || '', 'wcs_title_line', 'wcs_title_char', true);
    gsap.set(titleChars, { yPercent: 0, y: 0 });

    if (refs.descEl) {
      const descChars = splitChars(refs.descEl, slide.desc || '', 'wcs_title_line', 'wcs_title_char', false);
      gsap.set(descChars, { yPercent: 0, y: 0 });
    }
  }, [images]);

  const stopAuto = useCallback(() => {
    if (autoTimerRef.current) { clearInterval(autoTimerRef.current); autoTimerRef.current = null; }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    if (auto > 0 && !reducedMotionRef.current) {
      autoTimerRef.current = setInterval(() => { nextRef.current(); }, auto * 1000);
    }
  }, [auto, stopAuto]);

  const armAutoResume = useCallback(() => {
    if (auto <= 0) return;
    stopAuto();
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(startAuto, AUTO_RESUME_DELAY * 1000);
  }, [auto, stopAuto, startAuto]);

  const goTo = useCallback((newIndex: number, direction: number) => {
    const refs = refsRef.current;
    if (!refs || newIndex === currentIndexRef.current) return;
    const now = performance.now();
    if (now - lastGoToRef.current < 150) return;
    lastGoToRef.current = now;

    if (inFlightRef.current && newIndex === inFlightRef.current.outIndex) {
      inFlightRef.current.tl.progress(1);
      inFlightRef.current = null;
    }

    const outIndex = currentIndexRef.current;
    currentIndexRef.current = newIndex;
    const slide = images[newIndex];
    setActiveReactIndex(newIndex); // Trigger React render for overlay content

    const seq = ++goToSeqRef.current;
    const tl = gsap.timeline({
      onComplete: () => { if (inFlightRef.current && inFlightRef.current.tl === tl) inFlightRef.current = null; },
    });
    inFlightRef.current = { tl, outIndex };

    const outLayer = refs.layers[outIndex];
    const inLayer = refs.layers[newIndex];
    const outParts = refs.layerParts[outIndex];
    const inParts = refs.layerParts[newIndex];

    zTopRef.current += 2;
    outLayer.style.zIndex = String(images.length + zTopRef.current + 1);
    inLayer.style.zIndex = String(images.length + zTopRef.current);
    setLayerVisible(outLayer, true);
    setLayerVisible(inLayer, true);

    gsap.killTweensOf(inParts.strips);
    gsap.killTweensOf(inLayer);
    gsap.killTweensOf(inParts.shades);
    clearStripClips(inParts);
    gsap.set(inLayer, { scale: ZOOM_FROM, transformOrigin: '50% 50%', force3D: true });
    gsap.set(inParts.shades, { opacity: INCOMING_SHADE });

    const stripDur = duration * STRIP_DUR_RATIO;
    const stripStagger = (duration - stripDur) / Math.max(1, clampedColumns - 1);

    gsap.killTweensOf(outParts.strips);
    for (let s = 0; s < outParts.strips.length; s++) {
      outParts.strips[s].style.clipPath = direction > 0
        ? 'inset(0% 0% 0% var(--csc, 0%))'
        : 'inset(0% var(--csc, 0%) 0% 0%)';
    }
    gsap.set(outParts.strips, { '--csc': '0%' });
    tl.to(outParts.strips, {
      '--csc': '105%',
      duration: stripDur,
      ease: resolvedEase,
      stagger: direction > 0 ? stripStagger : -stripStagger,
      overwrite: true,
    }, 0);
    gsap.killTweensOf(outParts.shades);
    tl.to(outParts.shades, {
      opacity: OUT_SHADE,
      duration: stripDur * 0.8,
      ease: 'power1.in',
      stagger: direction > 0 ? stripStagger : -stripStagger,
      overwrite: 'auto',
    }, 0);

    tl.to(inLayer, {
      scale: 1,
      duration: duration * 1.05,
      ease: resolvedEase,
      force3D: true,
    }, 0);
    tl.to(inParts.shades, {
      opacity: 0,
      duration: duration * 1.05,
      ease: resolvedEase,
    }, 0);

    tl.call(() => {
      if (seq !== goToSeqRef.current) return;
      refs.layers.forEach((layer: HTMLElement, i: number) => {
        const parts = refs.layerParts[i];
        gsap.killTweensOf(parts.strips);
        gsap.killTweensOf(layer);
        gsap.killTweensOf(parts.shades);
        clearStripClips(parts);
        gsap.set(layer, { scale: 1 });
        gsap.set(parts.shades, { opacity: 0 });
        setLayerVisible(layer, i === newIndex);
        layer.style.zIndex = i === newIndex ? String(images.length) : String(i);
      });
    }, undefined, duration);

    swapChars(refs.titleEl, slide.title || '', 'wcs_title_line', 'wcs_title_char', {
      yPercent: direction > 0 ? -120 : 120,
      y: 0,
      duration: TITLE_OUT_DUR,
      ease: 'annnimateInOut',
      stagger: direction > 0 ? stagger : -stagger,
      force3D: true,
      overwrite: true,
    }, {
      from: { yPercent: direction > 0 ? 120 : -120, y: 0 },
      to: { yPercent: 0, y: 0, duration: TITLE_IN_DUR, ease: 'annnimateInOut', stagger: direction > 0 ? stagger : -stagger, force3D: true, overwrite: true },
    }, true);

    if (refs.descEl) {
      swapChars(refs.descEl, slide.desc || '', 'wcs_title_line', 'wcs_title_char', {
        yPercent: direction > 0 ? -120 : 120,
        y: 0,
        duration: TITLE_OUT_DUR,
        ease: 'annnimateInOut',
        stagger: direction > 0 ? stagger * 0.2 : -stagger * 0.2,
        force3D: true,
        overwrite: true,
      }, {
        from: { yPercent: direction > 0 ? 120 : -120, y: 0 },
        to: { yPercent: 0, y: 0, duration: TITLE_IN_DUR, ease: 'annnimateInOut', stagger: direction > 0 ? stagger * 0.2 : -stagger * 0.2, force3D: true, overwrite: true },
      }, false);
    }

  }, [images, duration, clampedColumns, resolvedEase, stagger]);

  const next = useCallback(() => {
    const i = (currentIndexRef.current + 1) % images.length;
    goTo(i, 1);
  }, [images.length, goTo]);

  const prev = useCallback(() => {
    const i = (currentIndexRef.current - 1 + images.length) % images.length;
    goTo(i, -1);
  }, [images.length, goTo]);

  const nextRef = useRef(next);
  const prevRef = useRef(prev);
  nextRef.current = next;
  prevRef.current = prev;

  const { contextSafe } = useGSAP(() => {
    const stage = stageRef.current;
    const container = containerRef.current;
    if (!stage || !container) return;

    stage.innerHTML = '';

    const layerWrap = document.createElement('div');
    layerWrap.className = 'wcs_layers';
    const layerParts: any[] = [];
    const layers = images.map((slide, i) => {
      const layer = document.createElement('div');
      layer.className = 'wcs_layer';
      layer.style.zIndex = String(i);
      layer.style.visibility = i === currentIndexRef.current ? '' : 'hidden';
      const parts = { strips: [] as HTMLElement[], inners: [] as HTMLElement[], imgs: [] as HTMLImageElement[], shades: [] as HTMLElement[] };
      for (let c = 0; c < clampedColumns; c++) {
        const strip = document.createElement('div');
        strip.className = 'wcs_strip';
        const inner = document.createElement('div');
        inner.className = 'wcs_strip_inner';
        const img = document.createElement('img');
        img.className = 'wcs_layer_img';
        img.src = slide.src;
        img.alt = c === 0 ? (slide.alt || '') : '';
        img.loading = 'eager';
        const shade = document.createElement('div');
        shade.className = 'wcs_shade';
        shade.setAttribute('aria-hidden', 'true');
        inner.appendChild(img);
        strip.appendChild(inner);
        strip.appendChild(shade);
        layer.appendChild(strip);
        parts.strips.push(strip);
        parts.inners.push(inner);
        parts.imgs.push(img);
        parts.shades.push(shade);
      }
      layerParts.push(parts);
      layerWrap.appendChild(layer);
      return layer;
    });

    const scrim = document.createElement('div');
    scrim.className = 'wcs_scrim';
    scrim.setAttribute('aria-hidden', 'true');

    stage.appendChild(layerWrap);
    stage.appendChild(scrim);

    if (!titleElRef.current) return;
    refsRef.current = {
      layers,
      layerParts,
      titleEl: titleElRef.current,
      descEl: descElRef.current,
      prevBtn: prevBtnRef.current,
      nextBtn: nextBtnRef.current,
    };

    layoutStrips(stage, layerParts, clampedColumns);
    settleCurrent();

    container.setAttribute('role', 'region');
    container.setAttribute('aria-roledescription', 'carousel');
    container.setAttribute('aria-label', images[currentIndexRef.current].title || '');
    container.setAttribute('tabindex', container.getAttribute('tabindex') || '0');

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: reduce)', () => {
      reducedMotionRef.current = true;
      gsap.globalTimeline.timeScale(20);
    });

    startAuto();

    return () => {
      mm.revert();
      stopAuto();
      clearTimeout(resumeTimerRef.current);
      if (inFlightRef.current) inFlightRef.current.tl.kill();
      layers.forEach((layer, i) => {
        gsap.killTweensOf(layerParts[i].strips);
        gsap.killTweensOf(layerParts[i].imgs);
      });
    };
  }, { scope: containerRef, dependencies: [images, clampedColumns] });

  const handlePrevClick = contextSafe(() => { prev(); armAutoResume(); });
  const handleNextClick = contextSafe(() => { next(); armAutoResume(); });

  const animateArrowHoverIn = contextSafe((e: React.MouseEvent, dir: number) => {
    const icon = e.currentTarget.querySelector('.wcs_arrow_icon');
    gsap.to(icon, { x: dir * 3, duration: ARROW_HOVER_DUR, ease: 'back.out(2)', overwrite: 'auto', force3D: true });
  });
  const animateArrowHoverOut = contextSafe((e: React.MouseEvent) => {
    const icon = e.currentTarget.querySelector('.wcs_arrow_icon');
    gsap.to(icon, { x: 0, duration: ARROW_HOVER_DUR, ease: 'expo.out', overwrite: 'auto', force3D: true });
  });
  const animateArrowPressDown = contextSafe((e: React.PointerEvent) => {
    gsap.to(e.currentTarget, { scale: 0.92, duration: ARROW_PRESS_DUR, ease: 'power2.out', overwrite: 'auto', force3D: true });
  });
  const animateArrowPressUp = contextSafe((e: React.PointerEvent) => {
    gsap.to(e.currentTarget, { scale: 1, duration: ARROW_PRESS_DUR, ease: 'back.out(2.5)', overwrite: 'auto', force3D: true });
  });
  const animateArrowPressLeave = contextSafe((e: React.PointerEvent) => {
    gsap.to(e.currentTarget, { scale: 1, duration: ARROW_PRESS_DUR, ease: 'power2.out', overwrite: 'auto', force3D: true });
  });

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { next(); armAutoResume(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { prev(); armAutoResume(); }
  }, [next, prev, armAutoResume]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!drag) return;
    if ((e.target as Element).closest('.wcs_pill') || (e.target as Element).closest('.react-overlay')) {
      dragActiveRef.current = false;
      return;
    }
    dragActiveRef.current = true;
    dragStartRef.current = e.clientX;
    dragAxisSizeRef.current = stageRef.current ? stageRef.current.clientWidth : 1;
  }, [drag]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragActiveRef.current) return;
    dragActiveRef.current = false;
    const pos = e.clientX;
    const delta = pos - dragStartRef.current;
    const threshold = dragAxisSizeRef.current * SWIPE_THRESHOLD_RATIO;
    if (Math.abs(delta) < threshold) return;
    if (delta < 0) next(); else prev();
    armAutoResume();
  }, [next, prev, armAutoResume]);

  useEffect(() => {
    let resizeTimer: any = null;
    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!refsRef.current || !stageRef.current) return;
        layoutStrips(stageRef.current, refsRef.current.layerParts, clampedColumns);
      }, 150);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [clampedColumns]);

  const activeData = tabsData[activeReactIndex];

  return (
    <section className="pt-6 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-24 font-sans relative bg-white">
      {/* Global Section Header */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col items-start text-left mb-8 md:mb-12">
        <div className="inline-flex items-center mb-3">
          <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5812] typo-caption">
            AI DELIVERY PROCESS
          </span>
        </div>
        <h2 className="typo-heading-2 tracking-tight mb-3 text-slate-900">
          Agentic AI Development Process: <span className="text-[#FF5812]">From Idea to Production</span>
        </h2>
        <div className="max-w-3xl space-y-1.5 typo-description text-slate-600">
          <p>A production-ready Agentic AI solution requires more than a model.</p>
          <p>We align business goals, architecture, data, agent development, integrations, testing, security, and deployment to move from a validated use case to production.</p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div
          ref={containerRef}
          className="wcs_wrap shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10"
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
          onFocus={stopAuto}
          onBlur={startAuto}
        >
          <div className="wcs_stage" ref={stageRef} />

          {/* Left Side: GSAP Animated Text + React Contextual Badges */}
          <div className="absolute top-6 sm:top-8 lg:top-[42%] lg:-translate-y-1/2 left-5 sm:left-8 lg:left-10 xl:left-14 z-[4] max-w-[calc(100%-40px)] sm:max-w-md lg:max-w-xs xl:max-w-md 2xl:max-w-lg pointer-events-none flex flex-col gap-2 sm:gap-2.5 xl:gap-3.5">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-1.5 pointer-events-auto"
              >
                <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#FF5812]/50 text-[#FF5812] text-xs sm:text-sm xl:text-base font-mono font-extrabold tracking-[0.18em] uppercase w-fit shadow-[0_0_20px_rgba(255,88,18,0.25)]">
                  <span className="w-2 h-2 rounded-full bg-[#FF5812] animate-pulse shadow-[0_0_10px_#FF5812]" />
                  <span>{activeData.phase}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* GSAP Split Characters Title */}
            <h2 className="wcs_title !relative !top-auto !left-auto !max-w-full drop-shadow-2xl" ref={titleElRef} />

            {/* GSAP Split Characters Desc */}
            <p className="wcs_desc text-[12.5px] sm:text-[13px] md:text-[14px] xl:text-[15px] text-slate-200 font-normal leading-relaxed drop-shadow-lg max-w-sm sm:max-w-md" ref={descElRef} />

            {/* Tech Keyword Pills */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 pointer-events-auto"
              >
                {activeData.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/[0.08] backdrop-blur-md border border-white/12 text-white/90 text-[10px] sm:text-[10.5px] font-mono font-medium shadow-sm">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Control Pill (Navigation Arrows + Active Slide Dots) */}
          <div className="wcs_pill" role="group" aria-label="Slide controls">
            <button
              ref={prevBtnRef}
              type="button"
              className="wcs_arrow"
              onClick={handlePrevClick}
              onMouseEnter={(e) => animateArrowHoverIn(e, -1)}
              onMouseLeave={animateArrowHoverOut}
              onPointerDown={animateArrowPressDown}
              onPointerUp={animateArrowPressUp}
              onPointerLeave={animateArrowPressLeave}
              aria-label="Previous capability"
            >
              <svg className="wcs_arrow_icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Sleek Interactive Pagination Dots */}
            <div className="flex items-center gap-1.5 px-2">
              {tabsData.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => { goTo(idx, idx > activeReactIndex ? 1 : -1); armAutoResume(); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeReactIndex
                    ? 'w-6 bg-[#FF5812] shadow-[0_0_10px_#FF5812]'
                    : 'w-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                  aria-label={`Go to capability ${idx + 1}`}
                />
              ))}
            </div>

            <button
              ref={nextBtnRef}
              type="button"
              className="wcs_arrow"
              onClick={handleNextClick}
              onMouseEnter={(e) => animateArrowHoverIn(e, 1)}
              onMouseLeave={animateArrowHoverOut}
              onPointerDown={animateArrowPressDown}
              onPointerUp={animateArrowPressUp}
              onPointerLeave={animateArrowPressLeave}
              aria-label="Next capability"
            >
              <svg className="wcs_arrow_icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* React/Framer Motion Data Overlay (Bullets & Cards) */}
          <div
            className="react-overlay hidden lg:flex absolute inset-0 lg:left-auto lg:w-[48%] xl:w-[42%] 2xl:w-[38%] p-4 lg:p-6 xl:p-8 lg:pr-8 xl:pr-12 flex-col justify-center pointer-events-none z-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.3, 0.9, 0.1, 1] }}
                className="pointer-events-auto"
              >
                {/* Capability Header */}
                <div>
                  <div className="text-orange-400 typo-caption mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_#FF5812]" />
                    SYSTEM CAPABILITY
                  </div>
                  <h3 className="text-lg xl:text-xl 2xl:text-2xl font-bold leading-snug text-white tracking-tight drop-shadow-xl">
                    {activeData.heading}
                  </h3>
                  <p className="text-xs xl:text-sm text-slate-300 mt-1 leading-relaxed drop-shadow line-clamp-2">
                    {activeData.subheading}
                  </p>
                </div>

                {/* 2x2 Architectural Capability Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xl:gap-2.5 mt-2 xl:mt-2.5">
                  {activeData.capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="bg-black/45 backdrop-blur-xl border border-white/10 hover:border-orange-500/40 rounded-xl p-2 xl:p-2.5 transition-all duration-300 shadow-lg group"
                    >
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <div className="w-4.5 h-4.5 xl:w-5 xl:h-5 rounded-md bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-110 transition-transform">
                          {getCapabilityIcon(cap.iconType)}
                        </div>
                        <span className="text-white font-semibold text-[11px] xl:text-xs tracking-tight">{cap.title}</span>
                      </div>
                      <p className="text-slate-300 text-[9.5px] xl:text-[10.5px] leading-snug pl-6">
                        {cap.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom Enterprise Benchmark & Action Card */}
                <div className="bg-black/55 backdrop-blur-2xl border border-white/15 hover:border-orange-500/40 rounded-xl xl:rounded-2xl p-2.5 xl:p-3.5 relative overflow-hidden shadow-2xl transition-all duration-300 mt-2.5 xl:mt-3">
                  {/* Glowing Top Hairline */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-orange-500 via-amber-300/60 to-transparent" />

                  {/* Header Row: Status Badge & Tech Stack */}
                  <div className="flex items-center justify-between gap-1.5 mb-1 pb-1 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                      </span>
                      <span className="text-emerald-400 text-[8.5px] xl:text-[9px] font-mono font-bold tracking-wider uppercase">
                        {activeData.card.statusBadge}
                      </span>
                    </div>
                    <span className="text-slate-300 bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-full text-[8.5px] xl:text-[9px] font-mono tracking-wide truncate max-w-[180px] xl:max-w-none">
                      {activeData.card.stack}
                    </span>
                  </div>

                  {/* Outcome Title & Impact Statement */}
                  <div className="mb-1.5">
                    <div className="text-white font-bold text-xs xl:text-[13px] tracking-tight mb-0.5">
                      {activeData.card.outcomeTitle}
                    </div>
                    <p className="text-slate-300 text-[9.5px] xl:text-[10.5px] leading-relaxed line-clamp-2">
                      {activeData.card.outcomeDesc}
                    </p>
                  </div>

                  {/* Metrics & Action Link Row */}
                  <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-white/10">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-baseline gap-1">
                        <span className="text-orange-400 font-extrabold text-xs xl:text-sm font-mono">
                          {activeData.card.metricValue}
                        </span>
                        <span className="text-slate-400 text-[8.5px] xl:text-[9px] font-mono uppercase">
                          {activeData.card.metricLabel}
                        </span>
                      </div>
                      {activeData.card.metricSecondary && (
                        <>
                          <span className="text-white/20 text-[10px] hidden sm:inline">•</span>
                          <span className="text-slate-300 text-[8.5px] xl:text-[9.5px] font-mono">
                            {activeData.card.metricSecondary}
                          </span>
                        </>
                      )}
                    </div>

                    <FlowButton
                      href={activeData.card.ctaLink}
                      text={activeData.card.ctaText}
                      variant="orange-filled"
                      className="shrink-0 text-xs py-2 px-5 xl:py-2.5 xl:px-6"
                    />
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Mobile Architecture & Capability Matrix Card (Cleanly placed below Curtain Slider on < 1024px) */}
        <div className="block lg:hidden mt-4 sm:mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col gap-4 bg-gradient-to-b from-slate-900/95 via-black/95 to-slate-950/95 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl"
            >
              {/* Capability Header */}
              <div>
                <div className="text-orange-400 text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_#FF5812]" />
                  SYSTEM CAPABILITY
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                  {activeData.heading}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-300 mt-1 leading-relaxed">
                  {activeData.subheading}
                </p>
              </div>

              {/* 2x2 Architectural Capability Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeData.capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    className="bg-white/[0.04] border border-white/10 hover:border-orange-500/40 rounded-xl p-3 sm:p-3.5 transition-all duration-300 shadow-md group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-md bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-110 transition-transform">
                        {getCapabilityIcon(cap.iconType)}
                      </div>
                      <span className="text-white font-semibold text-xs sm:text-sm tracking-tight">{cap.title}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] sm:text-xs leading-snug pl-7">
                      {cap.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Enterprise Benchmark & Action Card */}
              <div className="bg-white/[0.05] border border-white/15 rounded-xl p-3.5 sm:p-4 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-orange-500 via-amber-300/60 to-transparent" />

                {/* Header Row: Status Badge & Tech Stack */}
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                    </span>
                    <span className="text-emerald-400 text-[10px] font-mono font-bold tracking-wider uppercase">
                      {activeData.card.statusBadge}
                    </span>
                  </div>
                  <span className="text-slate-300 bg-white/[0.08] border border-white/10 px-2 py-0.5 rounded-full text-[9.5px] font-mono tracking-wide truncate max-w-[170px] sm:max-w-none">
                    {activeData.card.stack}
                  </span>
                </div>

                {/* Outcome Title & Description */}
                <div className="mb-2.5">
                  <div className="text-white font-bold text-sm tracking-tight mb-0.5">
                    {activeData.card.outcomeTitle}
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {activeData.card.outcomeDesc}
                  </p>
                </div>

                {/* Metrics & Action Link Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-orange-400 font-extrabold text-sm sm:text-base font-mono">
                        {activeData.card.metricValue}
                      </span>
                      <span className="text-slate-400 text-[10px] font-mono uppercase">
                        {activeData.card.metricLabel}
                      </span>
                    </div>
                    {activeData.card.metricSecondary && (
                      <>
                        <span className="text-white/20 text-xs hidden sm:inline">•</span>
                        <span className="text-slate-300 text-[10px] font-mono">
                          {activeData.card.metricSecondary}
                        </span>
                      </>
                    )}
                  </div>

                  <FlowButton
                    href={activeData.card.ctaLink}
                    text={activeData.card.ctaText}
                    variant="orange-filled"
                    className="self-stretch sm:self-auto shrink-0"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
