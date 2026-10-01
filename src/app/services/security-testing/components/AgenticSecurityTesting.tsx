"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

import { typography } from "@/lib/typography";
export interface ProjectDeliverable {
  name: string;
  detail: string;
}

export interface ProjectData {
  title: string;
  image: string;
  category: string;
  year: string;
  focusArea: string;
  description: string;
  impact: string;
  badge?: string;
  deliverables: ProjectDeliverable[];
  tools: string[];
  engagement: string;
}

export const PROJECT_DATA: ProjectData[] = [
  {
    title: "Enterprise Security Testing",
    image: "/images/ai-development-services/step-3.jpg",
    category: "01 — ENTERPRISES",
    year: "Enterprise",
    focusArea: "ENTERPRISE SECURITY",
    description: "Security testing support for complex applications, APIs, integrations, and enterprise platforms with evolving security requirements.",
    impact: "Protect enterprise data and infrastructure against evolving security threats.",
    badge: "Enterprise",
    deliverables: [
      { name: "Enterprise Security Assessments", detail: "Comprehensive security evaluation of enterprise platforms." },
      { name: "Application Security Testing", detail: "Identify vulnerabilities in complex business applications." },
      { name: "API Security Testing", detail: "Secure backend services and enterprise integrations." },
      { name: "Security Regression Testing", detail: "Validate security controls after ongoing system changes." },
    ],
    tools: ["Web Testing", "API Security", "Regression"],
    engagement: "Enterprise Security Pod",
  },
  {
    title: "Startups & Growing Technology Companies",
    image: "/images/ai-development-services/step-2.jpg",
    category: "02 — STARTUPS & SCALE-UPS",
    year: "Startups",
    focusArea: "STARTUPS & SCALE-UPS",
    description: "Flexible security testing support for growing teams that need to identify vulnerabilities without slowing product development and release velocity.",
    impact: "Identify vulnerabilities early without sacrificing release speed.",
    badge: "Startups & Scale-ups",
    deliverables: [
      { name: "Security Testing Strategy", detail: "Tailored approach for identifying vulnerabilities efficiently." },
      { name: "Vulnerability Assessment", detail: "Scan and assess applications for critical security flaws." },
      { name: "Automated Security Testing", detail: "Implement automated checks to maintain release velocity." },
      { name: "Release Security Validation", detail: "Rapid validation to secure fast-moving development cycles." },
    ],
    tools: ["Agile Security", "Automated Scans"],
    engagement: "Flexible Security Pod",
  },
  {
    title: "SaaS & Digital Product Teams",
    image: "/images/ai-development-services/step-1.jpg",
    category: "03 — SAAS & PRODUCT COMPANIES",
    year: "SaaS QA",
    focusArea: "SAAS & PRODUCT COMPANIES",
    description: "Security testing across web applications, APIs, cloud platforms, and customer-facing products to support secure product releases.",
    impact: "Maintain customer trust and secure data across all product releases.",
    badge: "SaaS & Product",
    deliverables: [
      { name: "Cloud & API Security Validation", detail: "Secure multi-tenant environments and cloud integrations." },
      { name: "Web Application Pen-Testing", detail: "Identify exploitable vulnerabilities in SaaS platforms." },
      { name: "Data Protection Validation", detail: "Verify customer data isolation and session security." },
      { name: "Continuous Security Integration", detail: "Embed security checks into the SaaS release pipeline." },
    ],
    tools: ["Web App Testing", "Cloud Security"],
    engagement: "Dedicated Security Pod",
  },
  {
    title: "Security Testing for Sensitive Applications",
    image: "/images/ai-development-services/step-4.jpg",
    category: "04 — HEALTHCARE & REGULATED APPLICATIONS",
    year: "Regulated",
    focusArea: "REGULATED APPLICATIONS",
    description: "Security validation for applications handling sensitive information, critical workflows, integrations, and regulated data environments.",
    impact: "Ensure robust compliance and protection of highly sensitive data.",
    badge: "Regulated Apps",
    deliverables: [
      { name: "Regulated Data Security Testing", detail: "Validate applications against strict compliance standards." },
      { name: "Healthcare & FinTech Security", detail: "Secure critical workflows and sensitive personal data." },
      { name: "Secure Integration Testing", detail: "Verify secure data transit across 3rd-party integrations." },
      { name: "PII & PHI Protection Checks", detail: "Test access controls and encryption implementations." },
    ],
    tools: ["Compliance", "Data Protection"],
    engagement: "Compliance Security Squad",
  }
];

const CONFIG = {
  SCROLL_SPEED: 0.75,
  LERP_FACTOR: 0.12,
  BUFFER_SIZE: 5,
  MAX_VELOCITY: 150,
  SNAP_DURATION: 600,
  STICK_DURATION: 6000,
};

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

const getProjectData = (index: number, list: ProjectData[] = PROJECT_DATA) => {
  const i = ((Math.abs(index) % list.length) + list.length) % list.length;
  return list[i];
};

const getProjectNumber = (index: number, total: number = PROJECT_DATA.length) => {
  return ((((Math.abs(index) % total) + total) % total) + 1).toString().padStart(2, "0");
};

export default function AgenticSecurityTesting() {
  const [visibleRange, setVisibleRange] = React.useState({ min: -CONFIG.BUFFER_SIZE, max: CONFIG.BUFFER_SIZE });
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeIndexRef = React.useRef(0);
  const [isHovered, setIsHovered] = React.useState(false);
  
  const containerRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const state = React.useRef({
    currentY: 0,
    targetY: 0,
    isDragging: false,
    isSnapping: false,
    snapStart: { time: 0, y: 0, target: 0 },
    lastScrollTime: Date.now(),
    dragStart: { y: 0, scrollY: 0 },
    projectHeight: 0,
    minimapHeight: 460,
  });

  const projectsRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const minimapRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const infoRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const requestRef = React.useRef<number | undefined>(undefined);

  const updateParallax = (img: HTMLImageElement | null, scroll: number, index: number, height: number) => {
    if (!img) return;
    if (!img.dataset.parallaxCurrent) img.dataset.parallaxCurrent = "0";
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
    const progress = Math.min((Date.now() - s.snapStart.time) / CONFIG.SNAP_DURATION, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    s.targetY = s.snapStart.y + (s.snapStart.target - s.snapStart.y) * eased;
    if (progress >= 1) {
      s.isSnapping = false;
      s.targetY = s.snapStart.target;
      s.currentY = s.snapStart.target;
    }
  };

  const snapToProject = () => {
    const s = state.current;
    if (!s.projectHeight) return;
    const current = Math.round(-s.targetY / s.projectHeight);
    const target = -current * s.projectHeight;
    s.isSnapping = true;
    s.snapStart = { time: Date.now(), y: s.currentY, target };
  };

  const handleNavigate = React.useCallback((direction: number) => {
    const s = state.current;
    if (!s.projectHeight) return;
    const current = Math.round(-s.targetY / s.projectHeight);
    const target = -(current + direction) * s.projectHeight;
    s.isSnapping = true;
    s.snapStart = { time: Date.now(), y: s.currentY, target };
    s.lastScrollTime = Date.now();
  }, []);

  const startAutoPlay = React.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isHovered) return;
    timerRef.current = setInterval(() => {
      const s = state.current;
      if (!s.projectHeight || s.isDragging) return;
      handleNavigate(1);
    }, CONFIG.STICK_DURATION);
  }, [isHovered, handleNavigate]);

  React.useEffect(() => {
    startAutoPlay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startAutoPlay]);

  const onManualClick = (direction: number) => {
    handleNavigate(direction);
    startAutoPlay();
  };

  const goToSlide = (targetIdx: number) => {
    const s = state.current;
    if (!s.projectHeight) return;
    const current = Math.round(-s.targetY / s.projectHeight);
    const currentNorm = ((current % PROJECT_DATA.length) + PROJECT_DATA.length) % PROJECT_DATA.length;
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
    
    projectsRef.current.forEach((el, index) => {
      const y = index * s.projectHeight + s.currentY;
      el.style.transform = `translateY(${y}px)`;
      const img = el.querySelector("img");
      updateParallax(img, s.currentY, index, s.projectHeight);
    });

    minimapRef.current.forEach((el, index) => {
      const y = index * s.minimapHeight + minimapY;
      el.style.transform = `translateY(${y}px)`;
      const img = el.querySelector("img");
      if (img) updateParallax(img, minimapY, index, s.minimapHeight);
    });

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
      const snapPoint = -Math.round(-s.targetY / s.projectHeight) * s.projectHeight;
      if (Math.abs(s.targetY - snapPoint) > 1) snapToProject();
    }
    if (s.isSnapping) {
      updateSnap();
    } else if (!s.isDragging) {
      const diff = s.targetY - s.currentY;
      if (Math.abs(diff) < 0.5) s.currentY = s.targetY;
      else s.currentY += diff * CONFIG.LERP_FACTOR;
    }
    updatePositions();
  };

  const renderedRange = React.useRef({ min: -CONFIG.BUFFER_SIZE, max: CONFIG.BUFFER_SIZE });

  const animationLoop = () => {
    animate();
    const s = state.current;
    if (s.projectHeight > 0) {
      const currentIndex = Math.round(-s.targetY / s.projectHeight);
      const min = currentIndex - CONFIG.BUFFER_SIZE;
      const max = currentIndex + CONFIG.BUFFER_SIZE;
      if (min !== renderedRange.current.min || max !== renderedRange.current.max) {
        renderedRange.current = { min, max };
        setVisibleRange({ min, max });
      }
      const normalized = ((currentIndex % PROJECT_DATA.length) + PROJECT_DATA.length) % PROJECT_DATA.length;
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
      if (container) state.current.projectHeight = container.clientHeight || 800;
      else state.current.projectHeight = window.innerHeight;
      state.current.minimapHeight = window.innerWidth < 768 ? 510 : 460;
    };
    updateDimensions();
    let touchStartX = 0, touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (container) {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        const inBounds = touch.clientY >= rect.top && touch.clientY <= rect.bottom && touch.clientX >= rect.left && touch.clientX <= rect.right;
        if (!inBounds) return;
      }
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      const s = state.current;
      s.isDragging = true;
      s.isSnapping = false;
      s.lastScrollTime = Date.now();
    };
    const onTouchEnd = (e: TouchEvent) => {
      state.current.isDragging = false;
      const touch = e.changedTouches[0];
      if (touch) {
        const dx = touch.clientX - touchStartX, dy = touch.clientY - touchStartY;
        // Horizontal swipe detection
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) handleNavigate(dx < 0 ? 1 : -1);
      }
      startAutoPlay();
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", updateDimensions);
    requestRef.current = requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", updateDimensions);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [handleNavigate, startAutoPlay]);

  const indices: number[] = [];
  for (let i = visibleRange.min; i <= visibleRange.max; i++) indices.push(i);

  return (
    <section className="w-full bg-white flex flex-col items-center">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-[2cm] mt-4 md:mt-8 flex flex-col items-start text-left">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 ${typography.caption.default} text-[#FF6B00] mb-3`}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
          WHO WE SUPPORT
        </div>
        <h2 className={`${typography.heading.h2} max-w-4xl text-slate-900 mb-4`}>
          Supporting Software Teams Building{" "}
          <span className="text-[#FF6B2C]">Secure Digital Products</span>
        </h2>
        <p className={`${typography.description.default} text-slate-500 max-w-5xl`}>
          Softree works with product companies, SaaS businesses, startups, enterprises, and technology teams that need scalable security testing and QA engineering support across their software products and delivery lifecycle.
        </p>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 mt-8 md:mt-12 mb-10 sm:mb-14 md:mb-20 lg:mb-24">
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full h-[690px] xs:h-[710px] sm:h-[740px] md:h-[800px] lg:h-[860px] rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/50 shadow-2xl parallax-container bg-black text-white select-none"
        >
          {/* Background Project Slides */}
          <ul className="project-list relative h-full w-full list-none p-0 m-0">
            {indices.map((i) => {
              const data = getProjectData(i);
              return (
                <div
                  key={i}
                  className="project absolute inset-0 w-full h-full overflow-hidden will-change-transform"
                  ref={(el) => {
                    if (el) projectsRef.current.set(i, el as unknown as HTMLDivElement);
                    else projectsRef.current.delete(i);
                  }}
                >
                  <img
                    src={data.image}
                    alt={data.title}
                    className="h-full w-full object-cover will-change-transform brightness-[0.70]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/85 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />
                </div>
              );
            })}
          </ul>

          {/* Center Luxury Editorial Card */}
          <div className="minimap pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[510px] md:h-[460px] w-[95vw] max-w-[1140px] overflow-hidden bg-white/95 backdrop-blur-xl shadow-[0_35px_90px_-20px_rgba(0,0,0,0.55),0_0_1px_1px_rgba(255,255,255,0.9)_inset] rounded-2xl sm:rounded-3xl border border-white/60 z-20">
            <div className="minimap-wrapper relative h-full w-full">
              {/* Centered Photo Preview */}
              <div className="minimap-img-preview absolute inset-0 md:inset-auto md:left-1/2 md:top-0 md:-translate-x-1/2 md:w-[260px] lg:w-[280px] h-full overflow-hidden pointer-events-none">
                {indices.map((i) => {
                  const data = getProjectData(i);
                  return (
                    <div
                      key={i}
                      className="minimap-img-item absolute inset-0 w-full h-full overflow-hidden will-change-transform"
                      ref={(el) => {
                        if (el) minimapRef.current.set(i, el);
                        else minimapRef.current.delete(i);
                      }}
                    >
                      <div className="md:hidden relative w-full h-[140px] overflow-hidden">
                        <img src={data.image} alt={data.title} className="h-full w-full object-cover will-change-transform" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                        <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-mono text-white/95 tracking-wider whitespace-nowrap shadow-md pointer-events-none">
                          ● SECURITY TESTING
                        </div>
                        {data.badge && (
                          <div className="absolute top-2.5 right-3 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md border border-white/20 text-[9px] font-mono text-[#FF6B2C] font-bold">
                            {data.badge}
                          </div>
                        )}
                      </div>
                      <div className="hidden md:block relative w-full h-full overflow-hidden">
                        <img src={data.image} alt={data.title} className="h-full w-full object-cover will-change-transform" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9.5px] sm:text-[10.5px] font-mono text-white/95 tracking-wider whitespace-nowrap shadow-md pointer-events-none">
                          ● SECURITY TESTING
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Metadata Text Content */}
              <div className="minimap-info-list absolute inset-0 w-full h-full text-black select-none pointer-events-none">
                {indices.map((i) => {
                  const data = getProjectData(i);
                  const num = getProjectNumber(i);
                  const activeProjectIndex = ((Math.abs(i) % PROJECT_DATA.length) + PROJECT_DATA.length) % PROJECT_DATA.length;
                  const totalFormatted = PROJECT_DATA.length.toString().padStart(2, "0");
                  return (
                    <div
                      key={i}
                      className="minimap-item-info absolute inset-0 w-full h-full will-change-transform"
                      ref={(el) => {
                        if (el) infoRef.current.set(i, el);
                        else infoRef.current.delete(i);
                      }}
                    >
                      {/* Mobile view */}
                      <div className="md:hidden absolute inset-x-0 bottom-0 top-[140px] p-3.5 xs:p-4 flex flex-col justify-between pointer-events-auto bg-white/95 overflow-y-auto">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-2xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#FF6B2C] via-[#f97316] to-amber-600 leading-none">{num}</span>
                              <span className="text-xs font-mono font-bold text-slate-400 leading-none">/ {totalFormatted}</span>
                            </div>
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-mono text-[#FF6B2C] font-bold">
                              <span>{data.badge}</span>
                            </div>
                          </div>
                          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF6B2C] mt-1">
                            {data.focusArea}
                          </div>
                          <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug mt-0.5 font-['Plus_Jakarta_Sans',sans-serif]">{data.title}</h3>
                          <p className="text-[11.5px] text-slate-600 font-normal leading-relaxed my-1.5 border-l-2 border-[#FF6B2C] pl-2.5">{data.description}</p>
                          <div className="flex flex-col gap-1.5 my-1.5">
                            {data.deliverables.slice(0, 2).map((item, dIdx) => (
                              <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C] shrink-0 mt-1" />
                                <div>
                                  <span className="font-bold text-slate-900">{item.name}: </span>
                                  <span className="text-slate-600">{item.detail}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      
                      </div>

                      {/* Desktop view: LEFT = Title & Description, RIGHT = Other things (Deliverables, Tools, Scope, CTA) */}
                      <div className="hidden md:flex justify-between w-full h-full">
                        {/* LEFT COLUMN: TITLE & DESCRIPTION */}
                        <div className="w-[calc(50%-140px)] lg:w-[calc(50%-155px)] h-full flex flex-col justify-between py-6 lg:py-7 pl-6 lg:pl-9 pr-3 lg:pr-4 text-left">
                          <div>
                            <div className="flex items-baseline gap-2.5">
                              <span className="text-3xl sm:text-4xl lg:text-[44px] font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#FF6B2C] via-[#f97316] to-[#d9480f] leading-none">{num}</span>
                              <span className="text-xs sm:text-sm font-mono font-bold text-slate-400">/ {totalFormatted}</span>
                              <div className="flex items-center gap-1 ml-2">
                                {PROJECT_DATA.map((_, idx) => (
                                  <div
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${activeProjectIndex === idx ? "w-5 bg-[#FF6B2C]" : "w-1.5 bg-slate-200"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-md bg-orange-500/[0.08] border border-orange-500/15 text-[#FF6B2C] text-[10px] lg:text-[11px] font-mono font-extrabold uppercase tracking-wider w-fit">
                              <Sparkles className="w-3 h-3 text-[#FF6B2C] shrink-0" />
                              <span>{data.category}</span>
                            </div>
                          </div>

                          <div className="my-auto py-1 flex flex-col gap-2">
                            <div className="text-[10.5px] lg:text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF6B2C]">
                              {data.focusArea}
                            </div>
                            <h3 className="text-lg lg:text-[22px] font-black text-slate-900 tracking-tight leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
                              {data.title}
                            </h3>
                            <p className="text-[12px] lg:text-[12.5px] text-slate-600 font-normal leading-relaxed border-l-2 border-[#FF6B2C] pl-3">
                              {data.description}
                            </p>
                            <div className="p-2 lg:p-2.5 rounded-lg bg-orange-50/70 border border-orange-200/60 text-[11px] lg:text-[11.5px] text-slate-700 leading-snug">
                              <span className="font-bold text-slate-900">Key Outcome: </span>
                              {data.impact}
                            </div>
                          </div>

                         
                        </div>

                        {/* RIGHT COLUMN: OTHER THINGS (DELIVERABLES, TOOLS & CTA) */}
                        <div className="w-[calc(50%-140px)] lg:w-[calc(50%-155px)] h-full flex flex-col justify-between py-6 lg:py-7 pr-6 lg:pr-9 pl-3 lg:pl-4 text-left">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-[10.5px] lg:text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#FF6B2C]">
                              KEY DELIVERABLES
                            </span>
                            <span className="text-[9.5px] lg:text-[10px] font-mono font-bold text-slate-400 uppercase">
                              TESTING SCOPE
                            </span>
                          </div>

                          <div className="my-auto py-1 flex flex-col gap-2">
                            {data.deliverables.map((item, dIdx) => (
                              <div key={dIdx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C] shrink-0 mt-1.5" />
                                <div className="flex flex-col">
                                  <span className="text-xs lg:text-[12.5px] font-bold text-slate-900 leading-tight">
                                    {item.name}
                                  </span>
                                  <span className="text-[11px] lg:text-[11.5px] text-slate-500 font-normal leading-tight mt-0.5">
                                    {item.detail}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-1.5 mb-2">
                              {data.tools.map((tool, tIdx) => (
                                <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[9.5px] lg:text-[10px] font-mono font-semibold text-slate-700">
                                  {tool}
                                </span>
                              ))}
                            </div>
                         
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>


          <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 sm:gap-4 max-w-[94vw] pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-md">
              <button type="button" onClick={() => onManualClick(-1)} className="md:hidden flex items-center justify-center w-6 h-6 rounded-full text-white/70 hover:text-white active:scale-90 transition-all cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {PROJECT_DATA.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === idx ? "w-6 sm:w-7 bg-[#FF6B2C] shadow-[0_0_8px_#FF6B2C]" : "w-2 bg-white/40 hover:bg-white/70"}`}
                />
              ))}
              <button type="button" onClick={() => onManualClick(1)} className="md:hidden flex items-center justify-center w-6 h-6 rounded-full text-white/70 hover:text-white active:scale-90 transition-all cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 px-5 sm:px-6 py-3 sm:py-2.5 rounded-2xl sm:rounded-full bg-black/85 backdrop-blur-md border border-white/20 shadow-2xl w-[90%] sm:w-auto max-w-full">
              <p className="text-[12px] sm:text-xs md:text-sm text-white/90 font-medium text-center sm:text-left leading-snug sm:leading-normal">
                Scale software security testing across your digital platform.
              </p>
              <div className="w-full sm:w-auto flex justify-center shrink-0">
                <FlowButton href="/contact" text="WORK WITH OUR SECURITY TEAM" variant="orange-filled" className="w-full sm:w-auto whitespace-nowrap" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
