"use client";

import React, { useRef, useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
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
const LABEL_DUR = 0.5;
const DIGIT_DUR = 0.7;
const SWIPE_THRESHOLD_RATIO = 0.15;
const ARROW_HOVER_DUR = 0.35;
const ARROW_PRESS_DUR = 0.15;
const AUTO_RESUME_DELAY = 5;

const VIEWPORT_QUERIES = {
  mobile: '(max-width: 479px)',
  tablet: '(max-width: 991px)',
  landscape: '(orientation: landscape) and (max-width: 767px)',
  desktop: '(min-width: 992px)',
};

const tabsData = [
  {
    id: "understand",
    title: "Understand",
    label: "Agentic AI",
    desc: "Understand user intent, business context, and enterprise requirements to deliver accurate, context-aware AI experiences.",
    src: "/images/ai-development-service/agenticAi-1.png",
    alt: "Understand",
    heading: "Understand user intent, business context, and enterprise requirements to deliver accurate, context-aware AI experiences.",
    bullets: [
      "Intent & context understanding",
      "Business requirement analysis",
      "Natural language processing",
      "Enterprise knowledge access"
    ],
    card: {
      eyebrow: "CONTEXT",
      title: "Context-Aware Intelligence",
      stats: ["Intent detection", "Knowledge retrieval"]
    }
  },
  {
    id: "reason",
    title: "Reason",
    label: "Agentic AI",
    desc: "Analyze information, evaluate options, and make intelligent decisions using business rules and real-time context.",
    src: "/images/ai-development-service/agenticAi-2.png",
    alt: "Reason",
    heading: "Analyze information, evaluate available options, and make intelligent decisions based on business rules and real-time context.",
    bullets: [
      "AI-powered decision making",
      "Contextual reasoning",
      "Business rule evaluation",
      "Real-time information analysis"
    ],
    card: {
      eyebrow: "INTELLIGENCE",
      title: "AI-Powered Reasoning",
      stats: ["Decision analysis", "Context evaluation"]
    }
  },
  {
    id: "plan",
    title: "Plan",
    label: "Agentic AI",
    desc: "Break complex business goals into structured, actionable steps with dynamic AI-powered planning.",
    src: "/images/ai-development-service/agenticAi-3.png",
    alt: "Plan",
    heading: "Break complex business objectives into structured, actionable steps and dynamically adapt plans as conditions change.",
    bullets: [
      "Goal decomposition",
      "Task prioritization",
      "Workflow generation",
      "Dynamic planning"
    ],
    card: {
      eyebrow: "STRATEGY",
      title: "Intelligent Task Planning",
      stats: ["Goal-based planning", "Adaptive workflows"]
    }
  },
  {
    id: "use-tools",
    title: "Use Tools",
    label: "Agentic AI",
    desc: "Connect AI agents with APIs, databases, applications, and enterprise systems to perform real-world actions.",
    src: "/images/ai-development-service/agenticAi-4.png",
    alt: "Use Tools",
    heading: "Interact with APIs, databases, applications, and enterprise systems to access information and perform real-world actions.",
    bullets: [
      "Seamless API integrations",
      "Secure database queries",
      "Enterprise application access",
      "External tool orchestration"
    ],
    card: {
      eyebrow: "INTEGRATION",
      title: "Enterprise System Orchestration",
      stats: ["API execution", "Data fetching"]
    }
  },
  {
    id: "execute",
    title: "Execute",
    label: "Agentic AI",
    desc: "Complete tasks autonomously and automate multi-step business workflows with reliable AI execution.",
    src: "/images/ai-development-service/agenticAi-5.png",
    alt: "Execute",
    heading: "Complete tasks autonomously and automate multi-step business workflows while maintaining reliability and operational control.",
    bullets: [
      "Autonomous workflow completion",
      "Task automation",
      "Error handling and recovery",
      "Real-time task monitoring"
    ],
    card: {
      eyebrow: "ACTION",
      title: "Reliable AI Execution",
      stats: ["Task automation", "Self-correction"]
    }
  },
  {
    id: "collaborate",
    title: "Collaborate",
    label: "Agentic AI",
    desc: "Enable specialized AI agents to communicate, coordinate, and collaborate on complex enterprise workflows.",
    src: "/images/ai-development-service/agenticAi-6.png",
    alt: "Collaborate",
    heading: "Enable multiple specialized AI agents to communicate, share information, and work together to solve complex business problems.",
    bullets: [
      "Multi-agent orchestration",
      "Specialized AI agents",
      "Agent-to-agent communication",
      "Collaborative workflows"
    ],
    card: {
      eyebrow: "ORCHESTRATION",
      title: "Multi-Agent Collaboration",
      stats: ["Agent coordination", "Shared task execution"]
    }
  },
  {
    id: "evaluate",
    title: "Evaluate & Improve",
    label: "Agentic AI",
    desc: "Monitor AI agent performance, evaluate outcomes, and continuously optimize workflows for better results.",
    src: "/images/ai-development-service/agenticAi-7.png",
    alt: "Evaluate & Improve",
    heading: "Monitor AI agent performance, evaluate outcomes, and continuously optimize workflows for better accuracy, reliability, and business results.",
    bullets: [
      "Agent performance monitoring",
      "Outcome evaluation",
      "Continuous optimization",
      "Human oversight"
    ],
    card: {
      eyebrow: "OPTIMIZATION",
      title: "Continuous AI Improvement",
      stats: ["Performance monitoring", "Feedback-driven learning"]
    }
  }
];

function indexLabel(i: number) {
  return String(i + 1).padStart(2, '0');
}

function isDisabledOnViewport(disable: any) {
  if (!disable) return false;
  const list = Array.isArray(disable) ? disable : String(disable).split(',');
  return list.some((v) => {
    const q = (VIEWPORT_QUERIES as any)[String(v).trim()];
    return q && window.matchMedia(q).matches;
  });
}

function buildCharLine(text: string, lineClass: string, charClass: string, isTitle: boolean = false) {
  const line = document.createElement('span');
  line.className = lineClass;
  
  const words = text.split(' ');
  words.forEach((word, i) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';
    
    // All words inherit the color from the parent container (.wcs_title is orange, .wcs_desc is white)
    
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

function buildDigitColumn(digitChar: string) {
  const wrap = document.createElement('span');
  wrap.className = 'wcs_digit_wrap';
  const roller = document.createElement('span');
  roller.className = 'wcs_digit_roller';
  for (let d = 0; d <= 9; d++) {
    const s = document.createElement('span');
    s.textContent = String(d);
    roller.appendChild(s);
  }
  wrap.appendChild(roller);
  (wrap as any)._digit = parseInt(digitChar, 10);
  (wrap as any)._roller = roller;
  return wrap;
}

function setIndexDisplay(el: HTMLElement, valueString: string, total: number) {
  const totalStr = indexLabel(total - 1);
  el.textContent = `${valueString}/${totalStr}`;
  (el as any)._totalStr = totalStr;
}

function rollIndex(el: HTMLElement, value: string) {
  const totalStr = (el as any)._totalStr || '07';
  el.textContent = `${value}/${totalStr}`;
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
  const auto = 5;
  const drag = true;
  const stagger = 0.0125;

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleElRef = useRef<HTMLHeadingElement>(null);
  const descElRef = useRef<HTMLParagraphElement>(null);
  const indexElRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  
  const [activeReactIndex, setActiveReactIndex] = useState(0);

  const clampedColumns = Math.max(2, Math.min(24, parseInt(columns as any, 10) || 12));
  const resolvedEase = (ease === 'annnimate' || ease === 'annnimateInOut') ? ease : (ease || 'expo.out');
  const barDur = duration * 0.8;

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

    setIndexDisplay(refs.indexEl, indexLabel(currentIndexRef.current), images.length);

    gsap.set(refs.progressFill, {
      scaleX: (currentIndexRef.current + 1) / images.length,
      transformOrigin: 'left center',
    });

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

    rollIndex(refs.indexEl, indexLabel(newIndex));

    gsap.set(refs.progressFill, { transformOrigin: 'left center' });
    tl.to(refs.progressFill, {
      scaleX: (newIndex + 1) / images.length,
      duration: barDur,
      ease: resolvedEase,
      force3D: true,
      overwrite: 'auto',
    }, 0);

  }, [images, duration, clampedColumns, resolvedEase, stagger, barDur]);

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
      indexEl: indexElRef.current,
      progressFill: progressFillRef.current,
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
      if (progressFillRef.current) gsap.killTweensOf(progressFillRef.current);
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
      {/* Global Section Header (Centered above the slider) */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center mb-8 md:mb-12 lg:mb-16">
        <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1 rounded-full bg-[#FF5812]/10 border border-[#FF5812]/30 text-[#FF5812] text-[9px] md:text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] mb-3 md:mb-4 lg:mb-6">
          AGENTIC AI
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-3 md:mb-4 text-slate-900 leading-[1.2] md:leading-[1.15]">
          MOVE BEYOND <span className="text-[#FF5812]">AI CHATBOTS</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal max-w-[90%] sm:max-w-lg md:max-w-2xl mx-auto px-2">
          <strong>Build AI That Can Think, Act, and Execute.</strong> Agentic AI goes beyond generating responses. AI agents can understand goals, reason through problems, use tools, interact with systems, and execute multi-step workflows.
        </p>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div 
          ref={containerRef}
          className="wcs_wrap shadow-2xl border border-zinc-800/80"
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
          onFocus={stopAuto}
          onBlur={startAuto}
        >
          <div className="wcs_stage" ref={stageRef} />

          {/* GSAP Controlled Text Overlays (Title & Desc) */}
          <div 
            className="absolute left-[var(--wcs-margin)] z-[4] max-w-[calc(100%-var(--wcs-margin)*2)] lg:max-w-[calc(48vw-var(--wcs-margin)*2)] pointer-events-none flex flex-col gap-2 md:gap-4"
            style={{ top: '60px' }}
          >
            <h2 className="wcs_title !relative !top-auto !left-auto !max-w-full" ref={titleElRef} />
            <p className="wcs_desc text-[13px] md:text-[15px] lg:text-[16px] text-white/95 font-medium leading-[1.4] drop-shadow-md" ref={descElRef} />
          </div>
          
          <div className="wcs_index" ref={indexElRef} aria-hidden="true" />
          <div className="wcs_progress" aria-hidden="true">
            <div className="wcs_progress_fill" ref={progressFillRef} />
          </div>

          {/* Controls */}
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
            >
              <svg className="wcs_arrow_icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
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
            >
              <svg className="wcs_arrow_icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* React/Framer Motion Data Overlay (Bullets & Cards) */}
          <div 
            className="react-overlay absolute inset-0 lg:left-auto lg:w-[45%] p-4 md:p-10 lg:p-12 lg:pr-16 flex flex-col pointer-events-none z-10"
            style={{ justifyContent: 'flex-end', paddingBottom: '140px' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.3, 0.9, 0.1, 1] }}
                className="pointer-events-auto mt-8 md:mt-12 lg:mt-0"
              >
                <h3 className="text-base md:text-xl lg:text-2xl leading-[1.4] font-medium text-white mb-3 lg:mb-6 max-w-md 2xl:max-w-lg tracking-tight drop-shadow-xl">
                  {activeData.heading}
                </h3>
                
                <ul className="space-y-2 lg:space-y-3 mb-4 lg:mb-8 max-w-md 2xl:max-w-lg pl-0 m-0 list-none">
                  {activeData.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 lg:gap-3 drop-shadow-lg p-0 m-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5812] mt-1 lg:mt-1.5 shrink-0 shadow-[0_0_8px_#FF5812]" />
                      <span className="text-white/95 text-[11px] md:text-xs lg:text-[15px] font-normal leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom Stats Card */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl lg:rounded-2xl p-4 lg:p-5 relative overflow-hidden max-w-md 2xl:max-w-lg shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/30 to-transparent opacity-50" />
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-white/80 text-[9px] font-bold tracking-[0.2em] uppercase">
                      {activeData.card.eyebrow}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 lg:gap-2">
                    <div className="text-white font-medium text-sm lg:text-base">
                      {activeData.card.title}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 lg:gap-x-6 gap-y-1 mt-1">
                      {activeData.card.stats.map((stat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 lg:gap-2">
                          <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-white/80 shrink-0" />
                          <span className="text-white text-[10px] md:text-xs font-medium">{stat}</span>
                        </div>
                      ))}
                    </div>
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
