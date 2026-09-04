"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";

export interface ProjectData {
  title: string;
  image: string;
  category: string;
  year: string;
  description: string;
  badge?: string;
}

export const PROJECT_DATA: ProjectData[] = [
  {
    title: "AI / Solution Architects",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80",
    category: "Architecture & Strategy",
    year: "Principal Level",
    description: "Define AI architecture, enterprise strategy, agent workflows & compliance governance.",
    badge: "System Design",
  },
  {
    title: "AI Engineers",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80",
    category: "Agents & RAG Systems",
    year: "Senior AI Talent",
    description: "Build autonomous agents, hybrid RAG, orchestration tools & LLM evaluation frameworks.",
    badge: "Core AI / LLMs",
  },
  {
    title: "Full-Stack Engineers",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80",
    category: "Applications & APIs",
    year: "Full-Stack Specialist",
    description: "Build high-throughput APIs, reactive interfaces, and intuitive enterprise AI copilot apps.",
    badge: "Frontend & APIs",
  },
  {
    title: "Data Engineers",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80",
    category: "Pipelines & Retrieval",
    year: "Data Platforms",
    description: "Build scalable ETL pipelines, vector search nodes, and AI-ready high-fidelity databases.",
    badge: "Data & Vectors",
  },
  {
    title: "QA Engineers",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80",
    category: "Quality & Reliability",
    year: "QA & Evaluation",
    description: "Validate LLM outputs, guardrail constraints, security, latency, and automated testing.",
    badge: "Benchmarking",
  },
  {
    title: "Cloud & DevOps Engineers",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
    category: "Production MLOps",
    year: "Cloud Infrastructure",
    description: "Deploy, secure, monitor, scale, and orchestrate containerized AI pipelines on Azure / AWS.",
    badge: "MLOps / K8s",
  },
];

const CONFIG = {
  SCROLL_SPEED: 0.75,
  LERP_FACTOR: 0.12,
  BUFFER_SIZE: 5,
  MAX_VELOCITY: 150,
  SNAP_DURATION: 600, // 0.6s clean snap
  STICK_DURATION: 6000, // 6 full seconds of rock-solid hold time so user can read leisurely
};

// Utility functions
const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

const getProjectData = (index: number, list: ProjectData[] = PROJECT_DATA) => {
  const i =
    ((Math.abs(index) % list.length) + list.length) % list.length;
  return list[i];
};

const getProjectNumber = (index: number, total: number = PROJECT_DATA.length) => {
  return (
    (((Math.abs(index) % total) + total) % total) + 1
  )
    .toString()
    .padStart(2, "0");
};

export interface ComponentProps {
  projects?: ProjectData[];
  className?: string;
  showOverlayHeader?: boolean;
  autoPlay?: boolean;
}

export function Component({
  projects = PROJECT_DATA,
  className = "",
  showOverlayHeader = true,
  autoPlay = true,
}: ComponentProps) {
  const [visibleRange, setVisibleRange] = React.useState({
    min: -CONFIG.BUFFER_SIZE,
    max: CONFIG.BUFFER_SIZE,
  });

  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeIndexRef = React.useRef(0);

  const [isHovered, setIsHovered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Refs for state that changes frequently (animation loop)
  const state = React.useRef({
    currentY: 0,
    targetY: 0,
    isDragging: false,
    isSnapping: false,
    snapStart: { time: 0, y: 0, target: 0 },
    lastScrollTime: Date.now(),
    dragStart: { y: 0, scrollY: 0 },
    projectHeight: 0, // Set dynamically from container
    minimapHeight: 390, // Height of the center white card
  });

  // Refs to store DOM elements
  const projectsRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const minimapRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const infoRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const requestRef = React.useRef<number | undefined>(undefined);

  // Helper to update parallax for a single item
  const updateParallax = (
    img: HTMLImageElement | null,
    scroll: number,
    index: number,
    height: number
  ) => {
    if (!img) return;

    if (!img.dataset.parallaxCurrent) {
      img.dataset.parallaxCurrent = "0";
    }

    let current = parseFloat(img.dataset.parallaxCurrent);
    const target = (-scroll - index * height) * 0.2;
    current = lerp(current, target, 0.1);

    if (Math.abs(current - target) > 0.01) {
      img.style.transform = `translateY(${current}px) scale(1.4)`;
      img.dataset.parallaxCurrent = current.toString();
    }
  };

  const updateSnap = () => {
    const s = state.current;
    const progress = Math.min(
      (Date.now() - s.snapStart.time) / CONFIG.SNAP_DURATION,
      1
    );
    const eased = 1 - Math.pow(1 - progress, 3);
    s.targetY = s.snapStart.y + (s.snapStart.target - s.snapStart.y) * eased;
    if (progress >= 1) {
      s.isSnapping = false;
      s.targetY = s.snapStart.target;
      s.currentY = s.snapStart.target; // Lock immediately to exact pixel: ZERO drift!
    }
  };

  const snapToProject = () => {
    const s = state.current;
    if (!s.projectHeight) return;
    const current = Math.round(-s.targetY / s.projectHeight);
    const target = -current * s.projectHeight;
    s.isSnapping = true;
    s.snapStart = {
      time: Date.now(),
      y: s.currentY,
      target: target,
    };
  };

  const handleNavigate = React.useCallback((direction: number) => {
    const s = state.current;
    if (!s.projectHeight) return;
    const current = Math.round(-s.targetY / s.projectHeight);
    const target = -(current + direction) * s.projectHeight;
    s.isSnapping = true;
    s.snapStart = {
      time: Date.now(),
      y: s.currentY,
      target: target,
    };
    s.lastScrollTime = Date.now();
  }, []);

  // Timer that guarantees each slide holds still for 6.0 seconds
  const startAutoPlay = React.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!autoPlay || isHovered) return;

    timerRef.current = setInterval(() => {
      const s = state.current;
      if (!s.projectHeight || s.isDragging) return;
      handleNavigate(1);
    }, CONFIG.STICK_DURATION);
  }, [autoPlay, isHovered, handleNavigate]);

  React.useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoPlay]);

  // Click handler that navigates immediately and resets the 6.0s hold timer fresh
  const onManualClick = (direction: number) => {
    handleNavigate(direction);
    startAutoPlay();
  };

  const goToSlide = (targetIdx: number) => {
    const s = state.current;
    if (!s.projectHeight) return;
    const current = Math.round(-s.targetY / s.projectHeight);
    const currentNorm = ((current % projects.length) + projects.length) % projects.length;
    const diff = targetIdx - currentNorm;
    if (diff !== 0) {
      handleNavigate(diff);
      startAutoPlay();
    }
  };

  const updatePositions = () => {
    const s = state.current;
    if (!s.projectHeight) return;
    const minimapY = (s.currentY * s.minimapHeight) / s.projectHeight;

    // Update Projects (full background images)
    projectsRef.current.forEach((el, index) => {
      const y = index * s.projectHeight + s.currentY;
      el.style.transform = `translateY(${y}px)`;
      const img = el.querySelector("img");
      updateParallax(img, s.currentY, index, s.projectHeight);
    });

    // Update Minimap Images (center photo preview)
    minimapRef.current.forEach((el, index) => {
      const y = index * s.minimapHeight + minimapY;
      el.style.transform = `translateY(${y}px)`;
      const img = el.querySelector("img");
      if (img) {
        updateParallax(img, minimapY, index, s.minimapHeight);
      }
    });

    // Update Info (metadata text columns)
    infoRef.current.forEach((el, index) => {
      const y = index * s.minimapHeight + minimapY;
      el.style.transform = `translateY(${y}px)`;
      const isCurrent = Math.abs(y) < s.minimapHeight * 0.45;
      el.style.pointerEvents = isCurrent ? "auto" : "none";
      el.style.opacity = Math.max(0, 1 - Math.abs(y) / (s.minimapHeight * 0.65)).toString();
    });
  };

  const animate = () => {
    const s = state.current;
    if (!s.projectHeight) return;
    const now = Date.now();

    if (!s.isSnapping && !s.isDragging && now - s.lastScrollTime > 100) {
      const snapPoint =
        -Math.round(-s.targetY / s.projectHeight) * s.projectHeight;
      if (Math.abs(s.targetY - snapPoint) > 1) snapToProject();
    }

    if (s.isSnapping) {
      updateSnap();
    } else if (!s.isDragging) {
      const diff = s.targetY - s.currentY;
      if (Math.abs(diff) < 0.5) {
        s.currentY = s.targetY; // Hold completely STILL
      } else {
        s.currentY += diff * CONFIG.LERP_FACTOR;
      }
    }

    updatePositions();
  };

  const renderedRange = React.useRef({
    min: -CONFIG.BUFFER_SIZE,
    max: CONFIG.BUFFER_SIZE,
  });

  const animationLoop = () => {
    animate();

    const s = state.current;
    if (s.projectHeight > 0) {
      const currentIndex = Math.round(-s.targetY / s.projectHeight);
      const min = currentIndex - CONFIG.BUFFER_SIZE;
      const max = currentIndex + CONFIG.BUFFER_SIZE;

      if (
        min !== renderedRange.current.min ||
        max !== renderedRange.current.max
      ) {
        renderedRange.current = { min, max };
        setVisibleRange({ min, max });
      }

      const normalized = ((currentIndex % projects.length) + projects.length) % projects.length;
      if (normalized !== activeIndexRef.current) {
        activeIndexRef.current = normalized;
        setActiveIndex(normalized);
      }
    }

    requestRef.current = requestAnimationFrame(animationLoop);
  };

  React.useEffect(() => {
    const container = containerRef.current;
    const updateDimensions = () => {
      if (container) {
        state.current.projectHeight = container.clientHeight || 750;
      } else {
        state.current.projectHeight = window.innerHeight;
      }
      state.current.minimapHeight = window.innerWidth < 768 ? 370 : 390;
    };

    updateDimensions();

    const onWheel = (e: WheelEvent) => {
      if (container) {
        const rect = container.getBoundingClientRect();
        const inBounds =
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom &&
          e.clientX >= rect.left &&
          e.clientX <= rect.right;
        if (!inBounds) return;
      }

      e.preventDefault();
      const s = state.current;
      s.isSnapping = false;
      s.lastScrollTime = Date.now();
      const delta = Math.max(
        Math.min(e.deltaY * CONFIG.SCROLL_SPEED, CONFIG.MAX_VELOCITY),
        -CONFIG.MAX_VELOCITY
      );
      s.targetY -= delta;
      startAutoPlay();
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (container) {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        const inBounds =
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom &&
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right;
        if (!inBounds) return;
      }

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      const s = state.current;
      s.isDragging = true;
      s.isSnapping = false;
      s.dragStart = { y: e.touches[0].clientY, scrollY: s.targetY };
      s.lastScrollTime = Date.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      const s = state.current;
      if (!s.isDragging) return;
      const dy = e.touches[0].clientY - s.dragStart.y;
      const dx = e.touches[0].clientX - touchStartX;

      // On mobile horizontal gestures, don't hijack vertical page scroll
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
        if (e.cancelable) e.preventDefault();
        s.targetY = s.dragStart.scrollY + dy * 1.5;
        s.lastScrollTime = Date.now();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      state.current.isDragging = false;
      const touch = e.changedTouches[0];
      if (touch) {
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;
        // Horizontal swipe to navigate previous/next role on touch
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) {
            handleNavigate(1);
          } else {
            handleNavigate(-1);
          }
        }
      }
      startAutoPlay();
    };

    const onResize = () => {
      updateDimensions();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);

    requestRef.current = requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, startAutoPlay]);

  const indices: number[] = [];
  for (let i = visibleRange.min; i <= visibleRange.max; i++) {
    indices.push(i);
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`parallax-container relative w-full overflow-hidden bg-black text-white select-none ${
        className || "h-screen"
      }`}
    >
      {/* Top Section Eyebrow & Headline HUD */}
      {showOverlayHeader && (
        <div className="absolute top-3 sm:top-6 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none w-[94vw] max-w-3xl px-2 sm:px-3">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 mb-1 sm:mb-1.5">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF6B2C] animate-pulse" />
            <span className="text-[9.5px] sm:text-[11px] font-mono tracking-widest uppercase font-bold text-[#FF6B2C]">
              OFFSHORE AI ENGINEERING TEAMS
            </span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif] drop-shadow-md">
            Dedicated Offshore <span className="text-[#FF6B2C]">AI Engineering</span>
          </h2>
          <p className="text-[11px] sm:text-sm text-white/80 mt-0.5 sm:mt-1 max-w-xl mx-auto font-medium drop-shadow hidden xs:block">
            Extend Your Team With Specialized AI Talent • Aligned with your tech stack
          </p>
        </div>
      )}

      {/* Background Project Slides */}
      <ul className="project-list relative h-full w-full list-none p-0 m-0">
        {indices.map((i) => {
          const data = getProjectData(i, projects);
          return (
            <div
              key={i}
              className="project absolute inset-0 w-full h-full overflow-hidden will-change-transform"
              ref={(el) => {
                if (el)
                  projectsRef.current.set(
                    i,
                    el as unknown as HTMLDivElement
                  );
                else projectsRef.current.delete(i);
              }}
            >
              <img
                src={data.image}
                alt={data.title}
                className="h-full w-full object-cover will-change-transform brightness-[0.70]"
              />
              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/85 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />
            </div>
          );
        })}
      </ul>

      {/* Center Luxury Editorial Card (Responsive: Vertical Stacked on Mobile, Swiss 3-Col on Desktop) */}
      <div className="minimap pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[370px] md:h-[390px] w-[94vw] max-w-[1040px] overflow-hidden bg-white/95 backdrop-blur-xl shadow-[0_35px_90px_-20px_rgba(0,0,0,0.55),0_0_1px_1px_rgba(255,255,255,0.9)_inset] rounded-2xl sm:rounded-3xl border border-white/60 z-20">
        <div className="minimap-wrapper relative h-full w-full">
          
          {/* Centered Photo Preview with Inset Depth (Full height pillar on desktop, top banner on mobile) */}
          <div className="minimap-img-preview absolute inset-0 md:inset-auto md:left-1/2 md:top-0 md:-translate-x-1/2 md:w-[260px] lg:w-[280px] h-full overflow-hidden pointer-events-none">
            {indices.map((i) => {
              const data = getProjectData(i, projects);
              return (
                <div
                  key={i}
                  className="minimap-img-item absolute inset-0 w-full h-full overflow-hidden will-change-transform"
                  ref={(el) => {
                    if (el) minimapRef.current.set(i, el);
                    else minimapRef.current.delete(i);
                  }}
                >
                  {/* MOBILE: Top visual banner with photo preview */}
                  <div className="md:hidden relative w-full h-[145px] overflow-hidden">
                    <img
                      src={data.image}
                      alt={data.title}
                      className="h-full w-full object-cover will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-mono text-white/95 tracking-wider whitespace-nowrap shadow-md pointer-events-none">
                      ● PRODUCTION TALENT
                    </div>
                    {data.badge && (
                      <div className="absolute top-2.5 right-3 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md border border-white/20 text-[9px] font-mono text-[#FF6B2C] font-bold">
                        {data.badge}
                      </div>
                    )}
                  </div>

                  {/* DESKTOP: Center full-height vertical pillar preview */}
                  <div className="hidden md:block relative w-full h-full overflow-hidden">
                    <img
                      src={data.image}
                      alt={data.title}
                      className="h-full w-full object-cover will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9.5px] sm:text-[10.5px] font-mono text-white/95 tracking-wider whitespace-nowrap shadow-md pointer-events-none">
                      ● PRODUCTION TALENT
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Metadata Text Content */}
          <div className="minimap-info-list absolute inset-0 w-full h-full text-black select-none pointer-events-none">
            {indices.map((i) => {
              const data = getProjectData(i, projects);
              const num = getProjectNumber(i, projects.length);
              const activeProjectIndex =
                ((Math.abs(i) % projects.length) + projects.length) %
                projects.length;
              const totalFormatted = projects.length
                .toString()
                .padStart(2, "0");
              return (
                <div
                  key={i}
                  className="minimap-item-info absolute inset-0 w-full h-full will-change-transform"
                  ref={(el) => {
                    if (el) infoRef.current.set(i, el);
                    else infoRef.current.delete(i);
                  }}
                >
                  {/* MOBILE CONTENT (< md): Stacked, readable, spacious luxury layout */}
                  <div className="md:hidden absolute inset-x-0 bottom-0 top-[145px] p-3.5 xs:p-4 flex flex-col justify-between pointer-events-auto bg-white/95">
                    {/* Header line: Digit + SLA badge */}
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#FF6B2C] via-[#f97316] to-amber-600 leading-none">
                            {num}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-400 leading-none">
                            / {totalFormatted}
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9.5px] font-mono text-emerald-700 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>READY TO DEPLOY</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base xs:text-lg font-black text-slate-900 tracking-tight leading-snug mt-1.5 font-['Plus_Jakarta_Sans',sans-serif]">
                        {data.title}
                      </h3>

                      {/* Category Chip */}
                      <div className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-md bg-orange-500/[0.08] border border-orange-500/15 text-slate-800">
                        <Sparkles className="w-3 h-3 text-[#FF6B2C] shrink-0" />
                        <span className="text-[10px] xs:text-[11px] font-extrabold tracking-wider uppercase font-mono truncate">
                          {data.category}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[11.5px] xs:text-xs text-slate-600 font-medium leading-relaxed line-clamp-2 my-1 border-l-2 border-[#FF6B2C] pl-2.5">
                      {data.description}
                    </p>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-[9.5px] font-mono text-slate-500 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B2C]" />
                        <span>DEDICATED OFFSHORE</span>
                      </div>

                      <a
                        href="/contact"
                        className="pointer-events-auto inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF6B2C] to-[#ea580c] hover:from-[#ea580c] text-white text-[11px] font-extrabold tracking-wide shadow-sm shadow-orange-500/20 active:scale-95 transition-all cursor-pointer select-auto"
                      >
                        <span>Contact Us</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* DESKTOP CONTENT (>= md): Classic Flanking Swiss Grid */}
                  <div className="hidden md:flex justify-between w-full h-full">
                    {/* LEFT COLUMN - Editorial Swiss Layout with Sculpted Digit */}
                    <div className="w-[calc(50%-140px)] lg:w-[calc(50%-160px)] h-full flex flex-col justify-between py-6 sm:py-9 pl-5 sm:pl-10 pr-3 sm:pr-6 text-left">
                      {/* Top: Sculpted Architectural Digit Display */}
                      <div className="flex flex-col gap-1.5">
                        {/* Sculpted Numbers & Telemetry */}
                        <div className="flex items-baseline gap-2.5 sm:gap-3.5">
                          <div className="relative inline-flex items-baseline">
                            <span className="absolute -inset-1 blur-xl bg-orange-500/15 rounded-full pointer-events-none" />
                            <span className="relative text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#FF6B2C] via-[#f97316] to-[#d9480f] drop-shadow-sm select-none leading-none">
                              {num}
                            </span>
                            <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF6B2C] ml-1.5 shadow-[0_0_8px_#FF6B2C]" />
                          </div>

                          <div className="flex flex-col justify-end border-l-2 border-orange-500/25 pl-2.5 sm:pl-3 pb-0.5">
                            <span className="text-[9.5px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase leading-none">
                              / {totalFormatted}
                            </span>
                          </div>
                        </div>

                        {/* Architectural Segmented Progress Bar */}
                        <div className="flex items-center gap-1 mt-1">
                          {projects.map((_, idx) => {
                            const isActive = activeProjectIndex === idx;
                            return (
                              <div
                                key={idx}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                  isActive
                                    ? "w-5 sm:w-6 bg-gradient-to-r from-[#FF6B2C] to-amber-500 shadow-[0_0_6px_rgba(255,107,44,0.6)]"
                                    : "w-1.5 sm:w-2 bg-slate-200"
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Middle: Domain Pill with Icon */}
                      <div className="my-auto py-2">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg bg-orange-500/[0.08] border border-orange-500/20 text-slate-900 shadow-sm">
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6B2C] shrink-0" />
                          <span className="text-[11px] sm:text-[13px] font-extrabold tracking-wider uppercase font-mono truncate">
                            {data.category}
                          </span>
                        </div>
                      </div>

                      {/* Bottom: Description with Orange Left Line */}
                      <div className="relative pl-3.5 sm:pl-4 border-l-[3px] border-[#FF6B2C]">
                        <p className="text-xs sm:text-[14.5px] lg:text-[15.5px] text-slate-700 font-medium leading-relaxed line-clamp-3">
                          {data.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2.5 text-[10px] sm:text-[11px] font-mono font-bold text-emerald-600">
                          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>READY TO DEPLOY IN 2 WEEKS</span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN - Executive Talent Profile */}
                    <div className="w-[calc(50%-140px)] lg:w-[calc(50%-160px)] h-full flex flex-col justify-between py-6 sm:py-9 pr-5 sm:pr-10 pl-3 sm:pl-6 text-right">
                      {/* Top: Eyebrow + Bold Role Title */}
                      <div className="space-y-1">
                        <p className="text-[10px] sm:text-xs font-mono tracking-widest text-[#FF6B2C] font-extrabold uppercase">
                          SPECIALIZED TALENT
                        </p>
                        <h3 className="text-sm sm:text-xl md:text-[23px] lg:text-[25px] font-black text-slate-900 tracking-tight leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
                          {data.title}
                        </h3>
                      </div>

                      {/* Middle: Deployment Chips */}
                      <div className="my-auto flex flex-col items-end gap-1.5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-950 text-white font-mono text-[10.5px] sm:text-xs font-bold tracking-wider shadow-sm">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B2C]" />
                          <span>DEDICATED OFFSHORE</span>
                        </div>
                        <p className="text-[10px] sm:text-[11.5px] text-slate-500 font-mono font-semibold">
                          STACK-ALIGNED SPECIALISTS
                        </p>
                      </div>

                      {/* Bottom: Contact Us Button & Verified Signature */}
                      <div className="flex flex-col items-end gap-2 sm:gap-2.5">
                        <a
                          href="/contact"
                          className="group/contact pointer-events-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#FF6B2C] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white text-xs sm:text-[13px] font-extrabold tracking-wide shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer select-auto"
                        >
                          <span>Contact Us</span>
                          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/contact:translate-x-0.5 group-hover/contact:-translate-y-0.5" />
                        </a>
                       
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Left and Right Chevron Navigation Buttons (Desktop only to prevent overlapping on mobile) */}
      <button
        type="button"
        onClick={() => onManualClick(-1)}
        className="hidden md:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/55 hover:bg-black/85 text-white/80 hover:text-white backdrop-blur-md transition-all border border-white/20 cursor-pointer shadow-xl hover:scale-105 active:scale-95 pointer-events-auto"
        aria-label="Previous role"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
      <button
        type="button"
        onClick={() => onManualClick(1)}
        className="hidden md:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/55 hover:bg-black/85 text-white/80 hover:text-white backdrop-blur-md transition-all border border-white/20 cursor-pointer shadow-xl hover:scale-105 active:scale-95 pointer-events-auto"
        aria-label="Next role"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Bottom Floating Navigation & CTA Dock */}
      <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 sm:gap-4 max-w-[94vw] pointer-events-none">
        {/* Interactive Dot Indicators with mobile chevron controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-md">
          <button
            type="button"
            onClick={() => onManualClick(-1)}
            className="md:hidden flex items-center justify-center w-6 h-6 rounded-full text-white/70 hover:text-white active:scale-90 transition-all cursor-pointer"
            aria-label="Previous role"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {projects.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "w-6 sm:w-7 bg-[#FF6B2C] shadow-[0_0_8px_#FF6B2C]"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Jump to role ${idx + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={() => onManualClick(1)}
            className="md:hidden flex items-center justify-center w-6 h-6 rounded-full text-white/70 hover:text-white active:scale-90 transition-all cursor-pointer"
            aria-label="Next role"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Floating CTA Bar */}
        <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl sm:rounded-full bg-black/85 backdrop-blur-md border border-white/20 shadow-2xl max-w-full">
          <p className="text-[11px] sm:text-xs md:text-sm text-white/90 font-medium text-center line-clamp-1 sm:line-clamp-none">
            A focused offshore AI engineering team that works as an extension of yours.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-full bg-[#FF6B2C] hover:bg-[#ea580c] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-orange-500/30 hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Build Your Offshore AI Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Component;
