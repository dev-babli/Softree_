"use client";

import React, { useRef, useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
    title: "Discover",
    phase: "01 — DISCOVER",
    subtitle: "Understand Problem, Data, Systems & AI Opportunity",
    desc: "Understand the business problem, data, systems, and AI opportunity.",
    src: "/images/ai-development-service/agenticAi-1.png",
    alt: "01 Discover - Understand Business Problem and AI Opportunity",
    tags: ["Problem Discovery", "Data Readiness", "Opportunity Sizing"],
    heading: "Enterprise Problem Understanding & AI Opportunity Mapping",
    subheading: "Audit legacy systems, evaluate enterprise data readiness, and quantify ROI before engineering.",
    capabilities: [
      { iconType: "search", title: "Problem Definition", desc: "Map business friction & operational bottlenecks" },
      { iconType: "database", title: "Data Audit", desc: "Evaluate data readiness, schemas, and silos" },
      { iconType: "shield", title: "Risk & Feasibility", desc: "Scoping compliance, IP, and regulatory constraints" },
      { iconType: "chart", title: "Opportunity Sizing", desc: "Quantifiable business ROI & impact projection" }
    ],
    card: {
      statusBadge: "PHASE 01 // DISCOVERY BENCHMARK",
      stack: "Feasibility Assessment • Data Audit",
      outcomeTitle: "Business Opportunity Blueprint",
      outcomeDesc: "Comprehensive audit of data pipelines, architecture feasibility, and prioritized use case roadmap.",
      metricValue: "2 Weeks",
      metricLabel: "Discovery Sprint",
      metricSecondary: "100% Feasibility Clarity",
      ctaText: "Schedule Discovery Sprint",
      ctaLink: "/contact"
    }
  },
  {
    id: "design",
    title: "Design",
    phase: "02 — DESIGN",
    subtitle: "AI Architecture, Agent Workflows & Governance",
    desc: "Define the AI architecture, agent workflows, integrations, and governance.",
    src: "/images/ai-development-service/agenticAi-2.png",
    alt: "02 Design - AI Architecture and Workflows",
    tags: ["AI Architecture", "Agent Workflows", "AI Governance"],
    heading: "System Architecture & Agentic Workflow Design",
    subheading: "Design deterministic multi-agent state machines, API integration points, and security guardrails.",
    capabilities: [
      { iconType: "workflow", title: "Agent Workflows", desc: "Multi-agent orchestration DAGs & state transitions" },
      { iconType: "layers", title: "System Architecture", desc: "Cloud infrastructure, model selection & topologies" },
      { iconType: "globe", title: "Integrations Map", desc: "Enterprise API, database, and ERP connectivity" },
      { iconType: "shield", title: "AI Governance", desc: "Guardrails, evaluation gates & access controls" }
    ],
    card: {
      statusBadge: "PHASE 02 // ARCHITECTURE SPECIFICATION",
      stack: "LangGraph • Cloud AI Topology",
      outcomeTitle: "Production Architecture Blueprint",
      outcomeDesc: "Detailed technical specifications covering model choices, agent DAGs, and security boundaries.",
      metricValue: "100%",
      metricLabel: "Architecture Coverage",
      metricSecondary: "Zero-Trust Security Design",
      ctaText: "Explore Architecture Design",
      ctaLink: "/solutions/enterprise-ai-development"
    }
  },
  {
    id: "build",
    title: "Build",
    phase: "03 — BUILD",
    subtitle: "Develop Agents, Applications, RAG & Automation",
    desc: "Develop the agents, applications, RAG, integrations, and automation.",
    src: "/images/ai-development-service/agenticAi-3.png",
    alt: "03 Build - Develop Agents and Integrations",
    tags: ["Autonomous Agents", "Hybrid RAG", "Process Automation"],
    heading: "Engineering Intelligent Agents & Enterprise RAG",
    subheading: "Develop robust autonomous agents, scalable vector retrieval pipelines, and seamless API connectors.",
    capabilities: [
      { iconType: "bot", title: "Autonomous Agents", desc: "Goal-directed agents with multi-step reasoning" },
      { iconType: "database", title: "Enterprise RAG", desc: "Hybrid semantic retrieval & knowledge graphs" },
      { iconType: "code", title: "System Integrations", desc: "Secure tool calling across enterprise SaaS & DBs" },
      { iconType: "zap", title: "Workflow Automation", desc: "End-to-end task automation and event pipelines" }
    ],
    card: {
      statusBadge: "PHASE 03 // PRODUCTION ENGINEERING",
      stack: "Next.js • Python • LangChain • Vector DBs",
      outcomeTitle: "Production-Grade AI Core",
      outcomeDesc: "Resilient software engineering delivering high-throughput agents and grounded semantic retrieval.",
      metricValue: "< 180ms",
      metricLabel: "Execution SLA",
      metricSecondary: "Sandboxed Tool Connectors",
      ctaText: "Explore Engineering Stack",
      ctaLink: "/solutions/ai-agents-development"
    }
  },
  {
    id: "validate",
    title: "Validate",
    phase: "04 — VALIDATE",
    subtitle: "Quality, Reliability, Security & AI Behavior",
    desc: "Test quality, reliability, security, performance, and AI behavior.",
    src: "/images/ai-development-service/agenticAi-4.png",
    alt: "04 Validate - Test Quality, Security and AI Behavior",
    tags: ["Behavioral Testing", "Adversarial Red-Teaming", "Performance SLAs"],
    heading: "Rigorous Empirical Evaluations & Safety Testing",
    subheading: "Stress-test deterministic accuracy, evaluate model drift, and audit security against prompt injection.",
    capabilities: [
      { iconType: "check", title: "Quality Benchmarks", desc: "Empirical evals on ground-truth datasets" },
      { iconType: "shield", title: "Security Red-Teaming", desc: "Jailbreak, prompt leakage & data privacy tests" },
      { iconType: "activity", title: "Performance & SLAs", desc: "Load concurrency, latency profiling & stress tests" },
      { iconType: "sliders", title: "Behavioral Controls", desc: "Validate deterministic retry and fallback logic" }
    ],
    card: {
      statusBadge: "PHASE 04 // EMPIRICAL VALIDATION",
      stack: "DeepEval • TruLens • OpenTelemetry",
      outcomeTitle: "Zero-Drift Reliability Gate",
      outcomeDesc: "Comprehensive testing ensuring outputs comply with enterprise security and accuracy tolerances.",
      metricValue: "99.9%",
      metricLabel: "Behavioral Accuracy",
      metricSecondary: "100% Policy Pass Rate",
      ctaText: "Explore Quality Evals",
      ctaLink: "/solutions/ai-powered-test-automation"
    }
  },
  {
    id: "deploy",
    title: "Deploy",
    phase: "05 — DEPLOY",
    subtitle: "Validated AI Solutions into Production Environments",
    desc: "Move validated AI solutions into production environments.",
    src: "/images/ai-development-service/agenticAi-5.png",
    alt: "05 Deploy - Move AI Solutions into Production",
    tags: ["Containerized Deploy", "Private VPC", "Canary Rollout"],
    heading: "Zero-Downtime Enterprise Production Deployment",
    subheading: "Ship validated AI models and agent clusters into isolated private VPCs, Azure, or hybrid environments.",
    capabilities: [
      { iconType: "cpu", title: "Cloud Deployment", desc: "Kubernetes, AKS & secure container runtimes" },
      { iconType: "workflow", title: "CI/CD Pipelines", desc: "Automated testing, versioning & rapid rollback" },
      { iconType: "shield", title: "Environment Isolation", desc: "Private networking, mTLS & role-based access" },
      { iconType: "activity", title: "Canary Rollouts", desc: "Phased traffic routing with live telemetry gates" }
    ],
    card: {
      statusBadge: "PHASE 05 // PRODUCTION ROLLOUT",
      stack: "Kubernetes • Docker • Terraform • Azure",
      outcomeTitle: "Hardened Production Deployment",
      outcomeDesc: "Seamless deployment to production infrastructure with automated health monitoring and zero downtime.",
      metricValue: "99.99%",
      metricLabel: "Deployment SLA",
      metricSecondary: "Zero-Downtime Cutover",
      ctaText: "Explore Deployment Ops",
      ctaLink: "/solutions/enterprise-ai-development"
    }
  },
  {
    id: "scale",
    title: "Scale",
    phase: "06 — SCALE",
    subtitle: "Capabilities, Users, Workflows & Engineering Capacity",
    desc: "Expand capabilities, users, workflows, and engineering capacity as adoption grows.",
    src: "/images/ai-development-service/agenticAi-6.png",
    alt: "06 Scale - Expand Capabilities, Users and Workflows",
    tags: ["Capacity Expansion", "Multi-Tenant", "Continuous Learning"],
    heading: "Elastic Enterprise Scaling & Continuous Growth",
    subheading: "Expand agent concurrency, onboard new departments, and continuously optimize model cost and speed.",
    capabilities: [
      { iconType: "chart", title: "Elastic Concurrency", desc: "Auto-scaling infrastructure under peak demand" },
      { iconType: "layers", title: "Workflow Expansion", desc: "Roll out AI capabilities across new business units" },
      { iconType: "brain", title: "Continuous Learning", desc: "Feedback loops & fine-tuning from real user usage" },
      { iconType: "sliders", title: "Cost & Token FinOps", desc: "Granular cost attribution and prompt caching" }
    ],
    card: {
      statusBadge: "PHASE 06 // HYPERSCALE OPERATIONS",
      stack: "Distributed Event Mesh • Redis • Grafana",
      outcomeTitle: "Enterprise-Wide AI Scale",
      outcomeDesc: "Sustain organizational adoption with elastic scaling, continuous model refinement, and token FinOps.",
      metricValue: "10M+",
      metricLabel: "Daily Transactions",
      metricSecondary: "40% Token Cost Savings",
      ctaText: "Scale Your AI Program",
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
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-start text-left mb-8 md:mb-12">
        <div className="text-xs md:text-sm font-mono font-bold tracking-widest text-[#FF5812] uppercase mb-2.5">
          From AI Idea to Production
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 md:mb-4 text-slate-900 leading-[1.2] md:leading-[1.15]">
          Build AI With a <span className="text-[#FF5812]">Clear Path to Production</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal max-w-3xl leading-relaxed">
          Our disciplined, engineering-first delivery lifecycle moves enterprise AI from initial opportunity discovery and architectural design to validated production deployment and global scale.
        </p>
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
          <div className="absolute top-[80px] md:top-[100px] lg:top-[50%] lg:-translate-y-1/2 left-6 sm:left-10 lg:left-14 z-[4] max-w-[calc(100%-48px)] sm:max-w-md lg:max-w-lg xl:max-w-xl pointer-events-none flex flex-col gap-3 md:gap-4">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-1.5 pointer-events-auto"
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#FF5812]/50 text-[#FF5812] text-sm sm:text-base md:text-lg font-mono font-extrabold tracking-[0.2em] uppercase w-fit shadow-[0_0_20px_rgba(255,88,18,0.25)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5812] animate-pulse shadow-[0_0_10px_#FF5812]" />
                  <span>{activeData.phase}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* GSAP Split Characters Title */}
            <h2 className="wcs_title !relative !top-auto !left-auto !max-w-full drop-shadow-2xl" ref={titleElRef} />

            {/* GSAP Split Characters Desc */}
            <p className="wcs_desc text-[13px] md:text-[15px] lg:text-[16px] text-slate-200 font-normal leading-relaxed drop-shadow-lg" ref={descElRef} />

            {/* Tech Keyword Pills */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="flex flex-wrap items-center gap-2 pt-1 pointer-events-auto"
              >
                {activeData.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-white/[0.08] backdrop-blur-md border border-white/12 text-white/90 text-[11px] font-mono font-medium shadow-sm">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Control Pill (Navigation Arrows + Active Slide Dots) - Cleaned of horizontal orange line */}
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
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeReactIndex 
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

          {/* Right Side: Advanced AI Architecture Overlay (2x2 Matrix & Telemetry HUD Card) */}
          <div className="react-overlay absolute inset-0 lg:left-auto lg:w-[48%] xl:w-[46%] p-4 sm:p-6 md:p-10 lg:p-12 lg:pr-14 flex flex-col justify-end lg:justify-center pointer-events-none z-10 pb-[100px] md:pb-[110px] lg:pb-0 pt-[140px] md:pt-[160px] lg:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="pointer-events-auto flex flex-col gap-4 lg:gap-5 max-w-xl"
              >
                {/* Capability Header */}
                <div>
                  <div className="text-orange-400 text-[10px] md:text-[11px] font-mono font-bold tracking-[0.2em] uppercase mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_#FF5812]" />
                    SYSTEM CAPABILITY
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[25px] leading-[1.25] font-bold text-white tracking-tight drop-shadow-xl">
                    {activeData.heading}
                  </h3>
                  <p className="text-xs sm:text-[13px] md:text-sm text-slate-300 mt-1 leading-relaxed drop-shadow">
                    {activeData.subheading}
                  </p>
                </div>

                {/* 2x2 Architectural Capability Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3">
                  {activeData.capabilities.map((cap, idx) => (
                    <div 
                      key={idx} 
                      className="bg-black/45 backdrop-blur-xl border border-white/10 hover:border-orange-500/40 rounded-xl p-3 md:p-3.5 transition-all duration-300 shadow-lg group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-md bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-110 transition-transform">
                          {getCapabilityIcon(cap.iconType)}
                        </div>
                        <span className="text-white font-semibold text-xs md:text-sm tracking-tight">{cap.title}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] md:text-xs leading-snug pl-7">
                        {cap.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom Enterprise Benchmark & Action Card */}
                <div className="bg-black/55 backdrop-blur-2xl border border-white/15 hover:border-orange-500/40 rounded-xl lg:rounded-2xl p-3.5 sm:p-4 lg:p-4.5 relative overflow-hidden shadow-2xl transition-all duration-300">
                  {/* Glowing Top Hairline */}
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
                    <span className="text-slate-300 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wide truncate max-w-[200px] sm:max-w-none">
                      {activeData.card.stack}
                    </span>
                  </div>

                  {/* Outcome Title & Impact Statement */}
                  <div className="mb-2.5">
                    <div className="text-white font-bold text-sm lg:text-[15px] tracking-tight mb-0.5">
                      {activeData.card.outcomeTitle}
                    </div>
                    <p className="text-slate-300 text-[11px] lg:text-xs leading-relaxed">
                      {activeData.card.outcomeDesc}
                    </p>
                  </div>

                  {/* Metrics & Action Link Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-orange-400 font-extrabold text-sm lg:text-base font-mono">
                          {activeData.card.metricValue}
                        </span>
                        <span className="text-slate-400 text-[10px] font-mono uppercase">
                          {activeData.card.metricLabel}
                        </span>
                      </div>
                      {activeData.card.metricSecondary && (
                        <>
                          <span className="text-white/20 text-xs hidden sm:inline">•</span>
                          <span className="text-slate-300 text-[10px] sm:text-[11px] font-mono">
                            {activeData.card.metricSecondary}
                          </span>
                        </>
                      )}
                    </div>

                    <Link
                      href={activeData.card.ctaLink}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF5812] hover:bg-[#E04808] text-white text-[11px] font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(255,88,18,0.3)] hover:scale-105 active:scale-95 self-start sm:self-auto shrink-0"
                    >
                      <span>{activeData.card.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
