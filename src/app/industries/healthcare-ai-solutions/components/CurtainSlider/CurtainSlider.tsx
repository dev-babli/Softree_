'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';
import './CurtainSlider.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
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
const AUTO_RESUME_DELAY = 4;

const VIEWPORT_QUERIES = {
  mobile: '(max-width: 479px)',
  tablet: '(max-width: 991px)',
  landscape: '(orientation: landscape) and (max-width: 767px)',
  desktop: '(min-width: 992px)',
};

export interface ImageItem {
  background: string;
  src?: string;
  alt?: string;
  title?: string;
  label?: string;
  content?: string;
  flow?: string;
}

const DEFAULT_IMAGES: ImageItem[] = [
  {
    background: '#C94716',
    title: 'We don’t automate the problem. We understand it first.',
    label: 'HOW WE ANALYZE',
    content: 'We go beyond surface-level automation to understand how your business, people, data, and systems work together. By analyzing workflows, decisions, bottlenecks, and opportunities, we identify where AI can create real, measurable impact—and design intelligent solutions built to scale.',
    flow: 'Understand  →  Analyze  →  Identify  →  Validate  →  Transform',
  },
  {
    background: '#C94716',
    title: 'We find where intelligence can create your next advantage.',
    label: 'AI DISCOVERY',
    content: 'We analyze your business processes, data, technology, and decision-making to uncover high-value opportunities for AI. From intelligent agents to AI-powered workflows, we identify what to build, why it matters, and how it can scale.',
    flow: 'Discover  →  Assess  →  Prioritize  →  Build  →  Scale',
  },
  {
    background: '#C94716',
    title: 'We uncover the intelligence hidden inside your business.',
    label: 'INTELLIGENCE BY DESIGN',
    content: 'Your data, workflows, documents, and decisions hold opportunities waiting to be connected. We bring them together to discover where AI can augment people, automate complexity, and create entirely new ways of working.',
    flow: 'Connect  →  Understand  →  Augment  →  Automate  →  Transform',
  },
  {
    background: '#C94716',
    title: 'We turn complex business challenges into intelligent systems.',
    label: 'BEYOND AUTOMATION',
    content: 'Before we introduce AI, we understand what makes your business unique. We map workflows, uncover bottlenecks, evaluate your data and technology landscape, and identify where intelligent systems can improve efficiency, decisions, and growth.',
    flow: 'Map  →  Diagnose  →  Design  →  Integrate  →  Evolve',
  },
];

export interface CurtainSliderProps {
  className?: string;
  images?: ImageItem[];
  duration?: number;
  ease?: string;
  columns?: number;
  auto?: number;
  drag?: boolean;
  stagger?: number;
  disable?: string | string[];
  onChange?: (event: { index: number; direction: number; slide: ImageItem }) => void;
}

interface LayerParts {
  strips: HTMLDivElement[];
  inners: HTMLDivElement[];
  imgs: HTMLDivElement[];
  shades: HTMLDivElement[];
}

interface SliderRefs {
  layers: HTMLDivElement[];
  layerParts: LayerParts[];
  labelEl: HTMLDivElement | null;
  titleEl: HTMLHeadingElement | null;
  descEl: HTMLParagraphElement | null;
  flowEl: HTMLDivElement | null;
  indexEl: HTMLDivElement | null;
  progressFill: HTMLDivElement | null;
  prevBtn: HTMLButtonElement | null;
  nextBtn: HTMLButtonElement | null;
  liveRegion: HTMLDivElement | null;
}

function indexLabel(i: number): string {
  return String(i + 1).padStart(2, '0');
}

function isDisabledOnViewport(disable?: string | string[]): boolean {
  if (!disable) return false;
  const list = Array.isArray(disable) ? disable : String(disable).split(',');
  return list.some((v) => {
    const q = VIEWPORT_QUERIES[v.trim() as keyof typeof VIEWPORT_QUERIES];
    return q && window.matchMedia(q).matches;
  });
}

function buildCharLine(text: string, lineClass: string, charClass: string): HTMLSpanElement {
  const line = document.createElement('span');
  line.className = lineClass;
  const words = text.split(' ');
  words.forEach((word, wordIdx) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap';
    
    word.split('').forEach((ch) => {
      const span = document.createElement('span');
      span.className = charClass;
      span.textContent = ch;
      wordSpan.appendChild(span);
    });
    line.appendChild(wordSpan);
    
    if (wordIdx < words.length - 1) {
      const spaceSpan = document.createElement('span');
      spaceSpan.className = charClass;
      spaceSpan.textContent = '\xA0';
      line.appendChild(spaceSpan);
    }
  });
  return line;
}

function splitChars(el: HTMLElement | null, text: string, lineClass: string, charClass: string): HTMLElement[] {
  if (!el) return [];
  el.innerHTML = '';
  const line = buildCharLine(text, lineClass, charClass);
  el.appendChild(line);
  return Array.from(line.querySelectorAll('.' + charClass)) as HTMLElement[];
}

function swapChars(
  el: HTMLElement | null,
  newText: string,
  lineClass: string,
  charClass: string,
  outVars: gsap.TweenVars,
  inVars: { from: gsap.TweenVars; to: gsap.TweenVars }
): HTMLElement[] {
  if (!el) return [];

  // Aggressively clean up stale/duplicate lines (from hot reloads or interrupted runs)
  const activeLines = Array.from(el.querySelectorAll('.' + lineClass));
  activeLines.forEach((l, idx) => {
    if (idx < activeLines.length - 1 || l.classList.contains('cs_line_out')) {
      l.remove();
    }
  });

  const oldLine = el.querySelector('.' + lineClass);
  if (oldLine) {
    oldLine.classList.add('cs_line_out');
    const oldChars = oldLine.querySelectorAll('.' + charClass);
    gsap.to(oldChars, {
      ...outVars,
      onComplete: () => {
        oldLine.remove();
      },
    });
  }
  const line = buildCharLine(newText, lineClass, charClass);
  el.appendChild(line);
  const chars = Array.from(line.querySelectorAll('.' + charClass)) as HTMLElement[];
  gsap.set(chars, inVars.from);
  gsap.to(chars, inVars.to);
  return chars;
}

function buildDigitColumn(digitChar: string): HTMLSpanElement {
  const wrap = document.createElement('span') as any;
  wrap.className = 'cs_digit_wrap';
  const roller = document.createElement('span');
  roller.className = 'cs_digit_roller';
  for (let d = 0; d <= 9; d++) {
    const s = document.createElement('span');
    s.textContent = String(d);
    roller.appendChild(s);
  }
  wrap.appendChild(roller);
  wrap._digit = parseInt(digitChar, 10);
  wrap._roller = roller;
  return wrap;
}

function setIndexDisplay(el: HTMLElement | null, valueString: string, total: number) {
  if (!el) return;
  el.innerHTML = '';
  valueString.split('').forEach((ch) => {
    const col = buildDigitColumn(ch) as any;
    gsap.set(col._roller, { y: -col._digit + 'em' });
    el.appendChild(col);
  });
  const divider = document.createElement('span');
  divider.className = 'cs_index_divider';
  divider.textContent = '/';
  el.appendChild(divider);
  const totalEl = document.createElement('span');
  totalEl.className = 'cs_index_total';
  totalEl.textContent = indexLabel(total - 1);
  el.appendChild(totalEl);
}

function rollIndex(el: HTMLElement | null, value: string) {
  if (!el) return;
  const cols = Array.from(el.querySelectorAll('.cs_digit_wrap')) as any[];
  value.split('').forEach((d, i) => {
    const col = cols[i];
    if (!col) return;
    const target = parseInt(d, 10);
    col._digit = target;
    gsap.to(col._roller, {
      y: -target + 'em',
      duration: DIGIT_DUR,
      ease: 'expo.inOut',
      force3D: true,
      overwrite: true,
    });
  });
}

function layoutStrips(stage: HTMLDivElement | null, layerParts: LayerParts[], columns: number) {
  if (!stage) return;
  const w = stage.clientWidth || 1;
  const edges: number[] = [];
  for (let c = 0; c <= columns; c++) edges.push(Math.round((c * w) / columns));
  layerParts.forEach((parts) => {
    for (let c = 0; c < columns; c++) {
      const strip = parts.strips[c];
      const inner = parts.inners[c];
      if (!strip || !inner) continue;
      const overlap = c < columns - 1 ? 1 : 0;
      strip.style.left = edges[c] + 'px';
      strip.style.width = (edges[c + 1] - edges[c] + overlap) + 'px';
      inner.style.left = (-edges[c]) + 'px';
      inner.style.width = w + 'px';
    }
  });
}

function setLayerVisible(layer: HTMLDivElement | null, visible: boolean) {
  if (!layer) return;
  layer.style.visibility = visible ? '' : 'hidden';
}

function clearStripClips(parts: LayerParts) {
  for (let s = 0; s < parts.strips.length; s++) {
    const strip = parts.strips[s];
    if (strip) {
      strip.style.clipPath = 'none';
      strip.style.removeProperty('--csc');
    }
  }
}

export default function CurtainSlider({
  className = '',
  images = DEFAULT_IMAGES,
  duration = 1.1,
  ease = 'annnimate',
  columns = 12,
  auto = 3,
  drag = true,
  stagger = 0.0125,
  disable,
  onChange,
}: CurtainSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const labelElRef = useRef<HTMLDivElement>(null);
  const titleElRef = useRef<HTMLHeadingElement>(null);
  const descElRef = useRef<HTMLParagraphElement>(null);
  const flowElRef = useRef<HTMLDivElement>(null);
  const indexElRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const clampedColumns = Math.max(2, Math.min(24, columns));
  const resolvedEase = (ease === 'annnimate' || ease === 'annnimateInOut') ? ease : (ease || 'expo.out');
  const barDur = duration * 0.8;

  const currentIndexRef = useRef(0);
  const refsRef = useRef<SliderRefs | null>(null);
  const zTopRef = useRef(0);
  const goToSeqRef = useRef(0);
  const inFlightRef = useRef<{ tl: gsap.core.Timeline; outIndex: number } | null>(null);
  const lastGoToRef = useRef(0);
  const dragStartRef = useRef(0);
  const dragActiveRef = useRef(false);
  const dragAxisSizeRef = useRef(1);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reducedMotionRef = useRef(false);

  const announce = useCallback(() => {
    const refs = refsRef.current;
    if (!refs || !refs.liveRegion) return;
    const currentSlide = images[currentIndexRef.current];
    refs.liveRegion.textContent = `Slide ${currentIndexRef.current + 1} of ${images.length}: ${currentSlide.title || ''}`;
  }, [images]);

  const settleCurrent = useCallback(() => {
    const refs = refsRef.current;
    if (!refs) return;
    const slide = images[currentIndexRef.current];

    const titleChars = splitChars(refs.titleEl, slide.title || '', 'cs_title_line', 'cs_title_char');
    gsap.set(titleChars, { yPercent: 0, y: 0 });

    const labelChars = splitChars(refs.labelEl, slide.label || '', 'cs_label_line', 'cs_title_char');
    gsap.set(labelChars, { yPercent: 0, y: 0 });

    if (refs.descEl) {
      refs.descEl.textContent = slide.content || '';
      gsap.set(refs.descEl, { opacity: 1, y: 0 });
    }

    if (refs.flowEl) {
      refs.flowEl.textContent = slide.flow || '';
      gsap.set(refs.flowEl, { opacity: 1, y: 0 });
    }

    setIndexDisplay(refs.indexEl, indexLabel(currentIndexRef.current), images.length);

    gsap.set(refs.progressFill, {
      scaleX: (currentIndexRef.current + 1) / images.length,
      transformOrigin: 'left center',
    });

    announce();
  }, [images, announce]);

  const stopAuto = useCallback(() => {
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    if (auto > 0 && !reducedMotionRef.current) {
      autoTimerRef.current = setInterval(() => {
        nextRef.current();
      }, auto * 1000);
    }
  }, [auto, stopAuto]);

  const armAutoResume = useCallback(() => {
    if (auto <= 0) return;
    stopAuto();
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
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

    const seq = ++goToSeqRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        if (inFlightRef.current && inFlightRef.current.tl === tl) {
          inFlightRef.current = null;
        }
      },
    });
    inFlightRef.current = { tl, outIndex };

    const outLayer = refs.layers[outIndex];
    const inLayer = refs.layers[newIndex];
    const outParts = refs.layerParts[outIndex];
    const inParts = refs.layerParts[newIndex];

    zTopRef.current += 2;
    if (outLayer) {
      outLayer.style.zIndex = String(images.length + zTopRef.current + 1);
    }
    if (inLayer) {
      inLayer.style.zIndex = String(images.length + zTopRef.current);
    }
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
      const strip = outParts.strips[s];
      if (strip) {
        strip.style.clipPath = 'inset(0% 0% 0% 0%)';
      }
    }

    tl.to(outParts.strips, {
      clipPath: direction > 0
        ? 'inset(0% 0% 0% 100%)'
        : 'inset(0% 100% 0% 0%)',
      duration: stripDur,
      ease: resolvedEase,
      stagger: direction > 0 ? stripStagger : -stripStagger,
      overwrite: 'auto',
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
      refs.layers.forEach((layer, i) => {
        const parts = refs.layerParts[i];
        gsap.killTweensOf(parts.strips);
        gsap.killTweensOf(layer);
        gsap.killTweensOf(parts.shades);
        clearStripClips(parts);
        gsap.set(layer, { scale: 1 });
        gsap.set(parts.shades, { opacity: 0 });
        setLayerVisible(layer, i === newIndex);
        if (layer) {
          layer.style.zIndex = i === newIndex ? String(images.length) : String(i);
        }
      });
    }, undefined, duration);

    swapChars(refs.titleEl, slide.title || '', 'cs_title_line', 'cs_title_char', {
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
    });

    swapChars(refs.labelEl, slide.label || '', 'cs_label_line', 'cs_title_char', {
      yPercent: direction > 0 ? -110 : 110,
      y: 0,
      duration: LABEL_DUR * 0.7,
      ease: 'annnimateInOut',
      force3D: true,
      overwrite: true,
    }, {
      from: { yPercent: direction > 0 ? 110 : -110, y: 0 },
      to: { yPercent: 0, y: 0, duration: LABEL_DUR, ease: 'annnimateInOut', force3D: true, overwrite: true },
    });

    rollIndex(refs.indexEl, indexLabel(newIndex));

    if (refs.descEl) {
      gsap.to(refs.descEl, {
        opacity: 0,
        y: direction > 0 ? -15 : 15,
        duration: TITLE_OUT_DUR,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => {
          if (refs.descEl) {
            refs.descEl.textContent = slide.content || '';
            gsap.fromTo(refs.descEl, {
              opacity: 0,
              y: direction > 0 ? 15 : -15
            }, {
              opacity: 1,
              y: 0,
              duration: TITLE_IN_DUR,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        }
      });
    }

    if (refs.flowEl) {
      gsap.to(refs.flowEl, {
        opacity: 0,
        y: direction > 0 ? -15 : 15,
        duration: TITLE_OUT_DUR,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => {
          if (refs.flowEl) {
            refs.flowEl.textContent = slide.flow || '';
            gsap.fromTo(refs.flowEl, {
              opacity: 0,
              y: direction > 0 ? 15 : -15
            }, {
              opacity: 1,
              y: 0,
              duration: TITLE_IN_DUR,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        }
      });
    }

    gsap.set(refs.progressFill, { transformOrigin: 'left center' });
    tl.to(refs.progressFill, {
      scaleX: (newIndex + 1) / images.length,
      duration: barDur,
      ease: resolvedEase,
      force3D: true,
      overwrite: 'auto',
    }, 0);

    announce();
    onChange?.({ index: newIndex, direction, slide });
  }, [images, duration, clampedColumns, resolvedEase, stagger, barDur, announce, onChange]);

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
    if (isDisabledOnViewport(disable)) return;
    const stage = stageRef.current;
    const container = containerRef.current;
    if (!stage || !container) return;

    stage.innerHTML = '';

    const layerWrap = document.createElement('div');
    layerWrap.className = 'cs_layers';
    const layerParts: LayerParts[] = [];
    const layers = images.map((slide, i) => {
      const layer = document.createElement('div');
      layer.className = 'cs_layer';
      layer.style.zIndex = String(i);
      layer.style.visibility = i === currentIndexRef.current ? '' : 'hidden';
      const parts: LayerParts = { strips: [], inners: [], imgs: [], shades: [] };
      for (let c = 0; c < clampedColumns; c++) {
        const strip = document.createElement('div');
        strip.className = 'cs_strip';
        const inner = document.createElement('div');
        inner.className = 'cs_strip_inner';

        const bgDiv = document.createElement('div');
        bgDiv.className = 'cs_layer_bg';
        bgDiv.style.position = 'absolute';
        bgDiv.style.inset = '0';
        bgDiv.style.background = slide.background || '#101012';

        const texture = document.createElement('div');
        texture.style.position = 'absolute';
        texture.style.inset = '0';
        texture.style.backgroundImage = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;
        texture.style.opacity = '0.22';
        texture.style.mixBlendMode = 'overlay';
        texture.style.pointerEvents = 'none';

        bgDiv.appendChild(texture);
        inner.appendChild(bgDiv);

        const shade = document.createElement('div');
        shade.className = 'cs_shade';
        shade.setAttribute('aria-hidden', 'true');
        strip.appendChild(inner);
        strip.appendChild(shade);
        layer.appendChild(strip);
        parts.strips.push(strip as HTMLDivElement);
        parts.inners.push(inner as HTMLDivElement);
        parts.imgs.push(bgDiv as HTMLDivElement);
        parts.shades.push(shade as HTMLDivElement);
      }

      layerParts.push(parts);
      layerWrap.appendChild(layer);
      return layer as HTMLDivElement;
    });

    const scrim = document.createElement('div');
    scrim.className = 'cs_scrim';
    scrim.setAttribute('aria-hidden', 'true');

    stage.appendChild(layerWrap);
    stage.appendChild(scrim);

    refsRef.current = {
      layers,
      layerParts,
      labelEl: labelElRef.current,
      titleEl: titleElRef.current,
      descEl: descElRef.current,
      flowEl: flowElRef.current,
      indexEl: indexElRef.current,
      progressFill: progressFillRef.current,
      prevBtn: prevBtnRef.current,
      nextBtn: nextBtnRef.current,
      liveRegion: liveRegionRef.current,
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
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
      if (inFlightRef.current) {
        inFlightRef.current.tl.kill();
      }
      layers.forEach((layer, i) => {
        const parts = layerParts[i];
        if (parts) {
          gsap.killTweensOf(parts.strips);
          gsap.killTweensOf(parts.imgs);
        }
      });
      if (progressFillRef.current) {
        gsap.killTweensOf(progressFillRef.current);
      }
    };
  }, { scope: containerRef, dependencies: [images, clampedColumns, disable] });

  const handlePrevClick = contextSafe(() => {
    prev();
    armAutoResume();
  });

  const handleNextClick = contextSafe(() => {
    next();
    armAutoResume();
  });

  const animateArrowHoverIn = contextSafe((e: React.MouseEvent<HTMLButtonElement>, dir: number) => {
    const icon = e.currentTarget.querySelector('.cs_arrow_icon');
    gsap.to(icon, { x: dir * 3, duration: ARROW_HOVER_DUR, ease: 'back.out(2)', overwrite: 'auto', force3D: true });
  });

  const animateArrowHoverOut = contextSafe((e: React.MouseEvent<HTMLButtonElement>) => {
    const icon = e.currentTarget.querySelector('.cs_arrow_icon');
    gsap.to(icon, { x: 0, duration: ARROW_HOVER_DUR, ease: 'expo.out', overwrite: 'auto', force3D: true });
  });

  const animateArrowPressDown = contextSafe((e: React.PointerEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 0.92, duration: ARROW_PRESS_DUR, ease: 'power2.out', overwrite: 'auto', force3D: true });
  });

  const animateArrowPressUp = contextSafe((e: React.PointerEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: ARROW_PRESS_DUR, ease: 'back.out(2.5)', overwrite: 'auto', force3D: true });
  });

  const animateArrowPressLeave = contextSafe((e: React.PointerEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: ARROW_PRESS_DUR, ease: 'power2.out', overwrite: 'auto', force3D: true });
  });

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      next();
      armAutoResume();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      prev();
      armAutoResume();
    }
  }, [next, prev, armAutoResume]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag) return;
    const target = e.target as HTMLElement;
    if (target.closest('.cs_pill')) {
      dragActiveRef.current = false;
      return;
    }
    dragActiveRef.current = true;
    dragStartRef.current = e.clientX;
    dragAxisSizeRef.current = stageRef.current ? stageRef.current.clientWidth : 1;
  }, [drag]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
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
    let resizeTimer: NodeJS.Timeout | null = null;
    function handleResize() {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(() => {
        if (!refsRef.current || !stageRef.current) return;
        layoutStrips(stageRef.current, refsRef.current.layerParts, clampedColumns);
      }, 150);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [clampedColumns]);

  useEffect(() => {
    function handleVisibility() {
      if (document.hidden) {
        gsap.globalTimeline.pause();
        stopAuto();
      } else {
        gsap.globalTimeline.resume();
        startAuto();
      }
    }
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [stopAuto, startAuto]);

  return (
    <div
      ref={containerRef}
      className={`cs_wrap${className ? ' ' + className : ''}`}
      data-anm-curtain-slider
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      onFocus={stopAuto}
      onBlur={startAuto}
    >
      <div className="cs_stage" ref={stageRef} data-anm-cs-stage>
        {/* Built imperatively above */}
      </div>

      <div className="cs_content_block">
        <div className="cs_label" ref={labelElRef} />
        <h2 className="cs_title" ref={titleElRef} />
        <p className="cs_desc" ref={descElRef} />
        <div className="cs_flow" ref={flowElRef} />
      </div>
      <div className="cs_index" ref={indexElRef} aria-hidden="true" />

      <div className="cs_progress" aria-hidden="true">
        <div className="cs_progress_fill" ref={progressFillRef} />
      </div>

      <div className="cs_pill" role="group" aria-label="Slide controls">
        <button
          ref={prevBtnRef}
          type="button"
          className="cs_arrow"
          aria-label="Previous slide"
          onClick={handlePrevClick}
          onMouseEnter={(e) => animateArrowHoverIn(e, -1)}
          onMouseLeave={animateArrowHoverOut}
          onPointerDown={animateArrowPressDown}
          onPointerUp={animateArrowPressUp}
          onPointerLeave={animateArrowPressLeave}
        >
          <svg className="cs_arrow_icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          ref={nextBtnRef}
          type="button"
          className="cs_arrow"
          aria-label="Next slide"
          onClick={handleNextClick}
          onMouseEnter={(e) => animateArrowHoverIn(e, 1)}
          onMouseLeave={animateArrowHoverOut}
          onPointerDown={animateArrowPressDown}
          onPointerUp={animateArrowPressUp}
          onPointerLeave={animateArrowPressLeave}
        >
          <svg className="cs_arrow_icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="cs_live" aria-live="polite" ref={liveRegionRef} />
    </div>
  );
}
