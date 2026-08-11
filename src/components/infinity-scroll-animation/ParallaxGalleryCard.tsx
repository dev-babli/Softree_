"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  GitBranch,
  Cloud,
  Zap,
  Sparkles,
  Code2,
  LayoutDashboard,
  RefreshCw,
  BarChart2,
  Database,
  Shield,
  Globe,
  GitMerge,
  BarChart3,
  TrendingUp,
  Search,
  Monitor,
  Server,
  Smartphone,
  Activity,
  Users2,
  Tag,
  Send,
  Headphones,
  Wrench,
  LifeBuoy,
  Clock,
  BarChart,
} from "lucide-react";
import "./infinity-scroll-home.css";

/* ── Icon lookup ── */
type IconComp = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

const ICON_MAP: Record<string, IconComp> = {
  cpu: Cpu as IconComp,
  "git-branch": GitBranch as IconComp,
  cloud: Cloud as IconComp,
  zap: Zap as IconComp,
  sparkles: Sparkles as IconComp,
  "code-2": Code2 as IconComp,
  "layout-dashboard": LayoutDashboard as IconComp,
  "refresh-cw": RefreshCw as IconComp,
  "bar-chart-2": BarChart2 as IconComp,
  database: Database as IconComp,
  shield: Shield as IconComp,
  globe: Globe as IconComp,
  "git-merge": GitMerge as IconComp,
  "bar-chart-3": BarChart3 as IconComp,
  "trending-up": TrendingUp as IconComp,
  search: Search as IconComp,
  monitor: Monitor as IconComp,
  server: Server as IconComp,
  smartphone: Smartphone as IconComp,
  activity: Activity as IconComp,
  "users-2": Users2 as IconComp,
  tag: Tag as IconComp,
  send: Send as IconComp,
  headphones: Headphones as IconComp,
  wrench: Wrench as IconComp,
  "life-buoy": LifeBuoy as IconComp,
  clock: Clock as IconComp,
  "bar-chart": BarChart as IconComp,
};

/* ── Data types ── */
type SubFeature = {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
};

type EngagementModel = {
  readonly icon: string;
  readonly label: string;
};

type GallerySlideData = {
  readonly title: string;
  readonly category: string;
  readonly serviceLabel: string;
  readonly year: string;
  readonly description: string;
  readonly bottomTitle: string;
  readonly bottomCategory: string;
  readonly bottomDescription: string;
  readonly image: string;
  readonly subFeaturesLeft: readonly SubFeature[];
  readonly subFeaturesRight: readonly SubFeature[];
  readonly engagementModels: readonly EngagementModel[];
};

/* ── Slide data ── */
export const gallerySlides: readonly GallerySlideData[] = [
  {
    title: "AI & automation",
    category: "Intelligence",
    serviceLabel: "AGENTIC AI",
    year: "2025",
    description:
      "Copilots, agents, and workflow automation wired into Microsoft 365 and enterprise data.",
    bottomCategory: "INTELLIGENCE",
    bottomTitle: "AI-Powered Business Automation",
    bottomDescription:
      "Deploy intelligent agents, Copilots, and automated workflows that connect business processes, applications, and enterprise data.",
    image: "/service_image/ai.jpg",
    subFeaturesLeft: [
      {
        icon: "cpu",
        title: "AGENTIC AI & MULTI-AGENT SYSTEMS",
        description: "Autonomous agents that plan, reason and act.",
      },
      {
        icon: "git-branch",
        title: "LANGCHAIN & LANGGRAPH",
        description: "Build stateful, scalable agent workflows.",
      },
      {
        icon: "cloud",
        title: "AMAZON BEDROCK",
        description: "Secure, scalable foundation models on AWS.",
      },
    ],
    subFeaturesRight: [
      {
        icon: "zap",
        title: "AZURE AI FOUNDRY",
        description: "Build, evaluate and deploy AI solutions at scale.",
      },
      {
        icon: "sparkles",
        title: "ADVANCED AI MODELS",
        description: "GPT-4o, Claude, Llama, Mistral and more.",
      },
      {
        icon: "code-2",
        title: "PYTHON & FASTAPI",
        description: "High-performance APIs for intelligent applications.",
      },
    ],
    engagementModels: [
      { icon: "users-2", label: "Dedicated Team" },
      { icon: "tag", label: "White Label" },
      { icon: "send", label: "Project Delivery" },
      { icon: "headphones", label: "Managed AI Services" },
    ],
  },
  {
    title: "Power Platform",
    category: "Microsoft",
    serviceLabel: "POWER PLATFORM",
    year: "2024",
    description:
      "Power Apps, Automate, and Fabric solutions that ship fast and stay governable.",
    bottomCategory: "MICROSOFT TRANSFORMATION",
    bottomTitle: "Microsoft Business Transformation",
    bottomDescription:
      "Modernize operations with Power Apps, Power Automate, Power BI, SharePoint, and connected Microsoft cloud solutions.",
    image: "/service_image/microsoft.jpg",
    subFeaturesLeft: [
      {
        icon: "layout-dashboard",
        title: "POWER APPS",
        description: "Custom business apps without heavy dev cycles.",
      },
      {
        icon: "refresh-cw",
        title: "POWER AUTOMATE",
        description: "End-to-end workflow automation at enterprise scale.",
      },
      {
        icon: "bar-chart-2",
        title: "POWER BI",
        description: "Interactive dashboards and real-time analytics.",
      },
    ],
    subFeaturesRight: [
      {
        icon: "database",
        title: "MICROSOFT FABRIC",
        description: "Unified analytics from data to insight.",
      },
      {
        icon: "shield",
        title: "DATAVERSE",
        description: "Secure, scalable data platform for business apps.",
      },
      {
        icon: "globe",
        title: "POWER PAGES",
        description: "Low-code external-facing web portals.",
      },
    ],
    engagementModels: [
      { icon: "users-2", label: "Dedicated Team" },
      { icon: "tag", label: "White Label" },
      { icon: "wrench", label: "Implementation" },
      { icon: "headphones", label: "Support & Managed" },
    ],
  },
  {
    title: "Data & analytics",
    category: "Analytics",
    serviceLabel: "DATA & ANALYTICS",
    year: "2024",
    description:
      "Pipelines, warehouses, and Fabric workloads that turn operational data into decisions.",
    bottomCategory: "INTELLIGENT DATA",
    bottomTitle: "Intelligent Data & Insights",
    bottomDescription:
      "Transform enterprise data into trusted insights with modern analytics, data engineering, and decision-ready intelligence.",
    image: "/service_image/data.jpg",
    subFeaturesLeft: [
      {
        icon: "git-merge",
        title: "DATA PIPELINES",
        description: "End-to-end ingestion from any source system.",
      },
      {
        icon: "database",
        title: "DATA WAREHOUSE",
        description: "Scalable, governed warehouses on Azure & Fabric.",
      },
      {
        icon: "bar-chart-3",
        title: "MICROSOFT FABRIC",
        description: "Unified analytics from raw data to BI.",
      },
    ],
    subFeaturesRight: [
      {
        icon: "trending-up",
        title: "POWER BI",
        description: "Executive dashboards and self-service analytics.",
      },
      {
        icon: "search",
        title: "DATA GOVERNANCE",
        description: "Purview-based cataloging and lineage tracking.",
      },
      {
        icon: "cpu",
        title: "ML & AI MODELS",
        description: "Predictive analytics wired into your data estate.",
      },
    ],
    engagementModels: [
      { icon: "users-2", label: "Dedicated Team" },
      { icon: "bar-chart", label: "Analytics-as-a-Service" },
      { icon: "send", label: "Project Delivery" },
      { icon: "life-buoy", label: "Support" },
    ],
  },
  {
    title: "Modern web applications",
    category: "Engineering",
    serviceLabel: "MODERN WEB",
    year: "2024",
    description:
      "React, Next.js, and API platforms built for performance, security, and long-term maintainability.",
    bottomCategory: "DIGITAL EXPERIENCES",
    bottomTitle: "Modern Digital Experiences",
    bottomDescription:
      "Build high-performance web and application experiences engineered for scalability, usability, and long-term business growth.",
    image: "/service_image/web.jpg",
    subFeaturesLeft: [
      {
        icon: "monitor",
        title: "NEXT.JS & REACT",
        description: "Fast, SEO-ready frontends with modern tooling.",
      },
      {
        icon: "server",
        title: "API PLATFORMS",
        description: "Scalable REST and GraphQL APIs with .NET.",
      },
      {
        icon: "shield",
        title: "SECURITY & AUTH",
        description: "Enterprise-grade identity with Azure AD.",
      },
    ],
    subFeaturesRight: [
      {
        icon: "cloud",
        title: "AZURE HOSTING",
        description: "Cloud-native deployment with CI/CD pipelines.",
      },
      {
        icon: "smartphone",
        title: "RESPONSIVE UI",
        description: "Mobile-first interfaces across all devices.",
      },
      {
        icon: "activity",
        title: "PERFORMANCE",
        description: "Sub-second load times, optimized for scale.",
      },
    ],
    engagementModels: [
      { icon: "users-2", label: "Dedicated Team" },
      { icon: "tag", label: "White Label" },
      { icon: "send", label: "Project Delivery" },
      { icon: "clock", label: "Retainer" },
    ],
  },
];

export type GallerySlide = GallerySlideData;

/* ── Animation helpers ── */
const config = { LERP_FACTOR: 0.05, SNAP_DURATION: 500 };

type ParallaxHandle = { update: (scroll: number, index: number) => void };
type ElementEntry = { el: HTMLDivElement; parallax?: ParallaxHandle };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function createParallax(
  layer: HTMLElement,
  height: number,
  scale = 1.4
): ParallaxHandle {
  let current = 0;
  return {
    update: (scroll, index) => {
      const target = (-scroll - index * height) * 0.2;
      current = lerp(current, target, 0.1);
      if (Math.abs(current - target) > 0.01) {
        layer.style.transform = `translateY(${current}px) scale(${scale})`;
      }
    },
  };
}

/* ── Sub-component: single feature item ── */
function FeatureItem({ feature, isHighlighted }: { feature: SubFeature, isHighlighted?: boolean }) {
  const Icon = ICON_MAP[feature.icon];
  return (
    <div className={`isc-feature-item ${isHighlighted ? "isc-feature-item--highlight" : ""}`}>
      <span className="isc-feature-icon">
        {Icon && <Icon size={11} strokeWidth={2} />}
      </span>
      <div className="isc-feature-text">
        <span className="isc-feature-title">{feature.title}</span>
        <span className="isc-feature-desc">{feature.description}</span>
      </div>
    </div>
  );
}

/* ── Props ── */
type ParallaxGalleryCardProps = {
  className?: string;
  onSlideChange?: (index: number) => void;
  slides?: readonly GallerySlide[];
  eyebrow?: string;
};

/* ── Main component ── */
export default function ParallaxGalleryCard({
  className = "",
  onSlideChange,
  slides,
  eyebrow = "Services we deliver",
}: ParallaxGalleryCardProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectVisualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const goToIndexRef = useRef<(index: number) => void>(() => {});

  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  useEffect(() => {
    if (hoveredRow === null) return;
    const interval = setInterval(() => {
      setHoveredRow((prev) => (prev === null ? 0 : (prev + 1) % 3));
    }, 1200); // 1.2s per row for a relaxed reading pace
    return () => clearInterval(interval);
  }, [hoveredRow]);

  const resolvedSlides = slides ?? gallerySlides;
  const slideCount = resolvedSlides.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const active = resolvedSlides[activeIndex];

  const syncActiveIndex = useCallback(
    (index: number) => {
      setActiveIndex(index);
      onSlideChange?.(index);
    },
    [onSlideChange]
  );

  /* ── Animation loop — only drives the full-bleed background slides ── */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const state = {
      currentY: 0,
      targetY: 0,
      projects: new Map<number, ElementEntry>(),
      projectHeight: stage.clientHeight || 280,
      isSnapping: false,
      snapStart: { time: 0, y: 0, target: 0 },
      lastReportedIndex: 0,
    };

    const bindSlides = () => {
      state.projects.clear();
      for (let i = 0; i < slideCount; i++) {
        const el = projectRefs.current[i];
        const visual = projectVisualRefs.current[i];
        if (el) {
          state.projects.set(i, {
            el,
            parallax: visual
              ? createParallax(visual, state.projectHeight, 1.35)
              : undefined,
          });
        }
      }
    };

    const measureStage = () => {
      const h = stage.clientHeight;
      if (h < 1) return;
      state.projectHeight = h;
      // --isc-minimap-h drives the body height of the centre card
      const bodyH = Math.round(Math.min(180, Math.max(140, h * 0.4)));
      stage.style.setProperty("--isc-minimap-h", `${bodyH}px`);

      bindSlides();
      goToIndex(state.lastReportedIndex);
    };

    const getCurrentIndex = () =>
      Math.round(-state.targetY / state.projectHeight);

    const goToIndex = (index: number) => {
      const clamped = Math.max(0, Math.min(slideCount - 1, index));
      state.lastReportedIndex = clamped;
      state.isSnapping = true;
      state.snapStart.time = Date.now();
      state.snapStart.y = state.targetY;
      state.snapStart.target = -clamped * state.projectHeight;
      syncActiveIndex(clamped);
    };

    goToIndexRef.current = goToIndex;

    const updateSnap = () => {
      const progress = Math.min(
        (Date.now() - state.snapStart.time) / config.SNAP_DURATION,
        1
      );
      const eased = 1 - Math.pow(1 - progress, 3);
      state.targetY =
        state.snapStart.y +
        (state.snapStart.target - state.snapStart.y) * eased;
      if (progress >= 1) state.isSnapping = false;
    };

    const updatePositions = () => {
      state.projects.forEach((item, index) => {
        const y = index * state.projectHeight + state.currentY;
        item.el.style.height = `${state.projectHeight}px`;
        item.el.style.transform = `translateY(${y}px)`;
        item.parallax?.update(state.currentY, index);
      });
      const idx = getCurrentIndex();
      if (idx !== state.lastReportedIndex) {
        state.lastReportedIndex = idx;
        syncActiveIndex(idx);
      }
    };

    let rafId = 0;
    const animate = () => {
      if (state.isSnapping) updateSnap();
      state.currentY += (state.targetY - state.currentY) * config.LERP_FACTOR;
      updatePositions();
      rafId = requestAnimationFrame(animate);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement !== stage &&
        !stage.contains(document.activeElement)
      )
        return;
      const current = getCurrentIndex();
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (current < slideCount - 1) {
          e.preventDefault();
          goToIndex(current + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (current > 0) {
          e.preventDefault();
          goToIndex(current - 1);
        }
      }
    };

    const ro = new ResizeObserver(() => measureStage());
    ro.observe(stage);
    measureStage();
    window.addEventListener("keydown", onKeyDown);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [syncActiveIndex, slideCount]);

  return (
    <div
      className={`group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-[#0a0a1a]/8 bg-[#0a0a0a] shadow-[0_16px_48px_-24px_rgba(10,10,26,0.35)] sm:min-h-[340px] md:min-h-[400px] lg:min-h-[440px] xl:min-h-[480px] ${className}`}
    >
      <div
        ref={stageRef}
        className="isc-stage relative min-h-0 flex-1"
        tabIndex={0}
        aria-label="Service showcase gallery"
        aria-roledescription="carousel"
      >
        {/* Full-bleed parallax background slides */}
        <div className="isc-project-list">
          {resolvedSlides.map((slide, i) => (
            <div
              key={slide.title}
              ref={(el) => {
                projectRefs.current[i] = el;
              }}
              className="isc-project"
            >
              <div
                ref={(el) => {
                  projectVisualRefs.current[i] = el;
                }}
                className="isc-project-visual relative size-full"
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  priority={i === 0}
                  aria-hidden
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_34%_42%,rgba(255,255,255,0.06)_0%,transparent_55%),linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.5)_100%)]" />
              </div>
              <div className="isc-project-caption pointer-events-none absolute inset-x-0 bottom-0 z-[5] max-w-[60%] px-3 pb-0 pt-4 md:px-5 md:pb-0 md:pt-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                  {slide.bottomCategory}
                </div>
                <div className="mt-1.5 font-bold leading-tight tracking-tight text-white" style={{ fontSize: 'clamp(1.1rem,2.5vw,1.75rem)' }}>
                  {slide.bottomTitle}
                </div>
                <div className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/72 md:text-[14px]">
                  {slide.bottomDescription}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Centre editorial showcase card ── */}
        <div 
          className="isc-minimap isc-minimap--landscape"
          onMouseEnter={() => setHoveredRow(0)}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <div className="isc-minimap-wrapper">

            {/* 3-column body */}
            <div className="isc-minimap-body">

              {/* Left sub-feature list */}
              <div
                key={`left-${activeIndex}`}
                className="isc-minimap-col-features"
              >
                {active.subFeaturesLeft.map((feat, fi) => (
                  <FeatureItem key={fi} feature={feat} isHighlighted={hoveredRow === fi} />
                ))}
              </div>

              {/* Center: number badge + image + service label */}
              <div className="isc-minimap-col-image">
                <span
                  key={`num-${activeIndex}`}
                  className="isc-minimap-num-badge"
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>

                {/* Image — opacity crossfade between slides */}
                <div className="isc-minimap-img-preview">
                  {resolvedSlides.map((slide, i) => (
                    <div
                      key={slide.image}
                      className="isc-minimap-img-item"
                      style={{
                        opacity: i === activeIndex ? 1 : 0,
                        transition: "opacity 0.45s ease",
                      }}
                    >
                      <div className="isc-minimap-visual relative size-full overflow-hidden">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          sizes="160px"
                          className="object-cover"
                          priority={i === 0}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <span
                  key={`svc-${activeIndex}`}
                  className="isc-minimap-svc-label"
                >
                  {active.serviceLabel}
                </span>
              </div>

              {/* Right sub-feature list */}
              <div
                key={`right-${activeIndex}`}
                className="isc-minimap-col-features isc-minimap-col-features--right"
              >
                {active.subFeaturesRight.map((feat, fi) => (
                  <FeatureItem key={fi} feature={feat} isHighlighted={hoveredRow === fi} />
                ))}
              </div>
            </div>

            {/* Footer: engagement models */}
            <div
              key={`footer-${activeIndex}`}
              className="isc-minimap-footer"
            >
              <span className="isc-minimap-footer-heading">
                Engagement Models
              </span>
              <div className="isc-minimap-footer-tags">
                {active.engagementModels.map((model) => {
                  const Icon = ICON_MAP[model.icon];
                  return (
                    <span key={model.label} className="isc-minimap-footer-tag">
                      {Icon && <Icon size={9} strokeWidth={2} />}
                      {model.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top overlay: eyebrow + big title + description + slide counter */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black/65 via-black/35 to-transparent px-3 pt-3 pb-20 md:px-5 md:pt-4 md:pb-28">
        <div className="flex items-start justify-between">
          <div className="max-w-[58%] md:max-w-xs">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
              {eyebrow}
            </p>
            <p
              key={`title-${activeIndex}`}
              className="isc-slide-title mt-2 font-bold leading-[1.08] tracking-tight text-white"
              style={{ fontSize: 'clamp(1.3rem,3vw,2.5rem)' }}
            >
              {active.title}
            </p>
            <p
              key={`desc-${activeIndex}`}
              className="isc-slide-desc mt-2 text-[12px] leading-relaxed text-white/68 md:text-[13px]"
            >
              {active.description}
            </p>
          </div>
          <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[10px] tabular-nums text-white/80 backdrop-blur-md">
            {String(activeIndex + 1).padStart(2, "0")}/
            {String(slideCount).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Navigation chevrons */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => goToIndexRef.current(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 disabled:opacity-30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={() => goToIndexRef.current(activeIndex + 1)}
          disabled={activeIndex === slideCount - 1}
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white text-[#0a0a1a] backdrop-blur-md transition hover:bg-white/90 disabled:opacity-30"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
