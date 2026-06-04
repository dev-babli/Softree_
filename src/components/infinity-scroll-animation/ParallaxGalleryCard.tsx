"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./infinity-scroll-home.css";

/** Slides use images from `public/service_image/` only — no Grainient. */
export const gallerySlides = [
  {
    title: "AI & automation",
    category: "Intelligence",
    year: "2025",
    description:
      "Copilots, agents, and workflow automation wired into Microsoft 365 and enterprise data.",
    image: "/service_image/ai.jpg",
  },
  {
    title: "Power Platform",
    category: "Microsoft",
    year: "2024",
    description:
      "Power Apps, Automate, and Fabric solutions that ship fast and stay governable.",
    image: "/service_image/microsoft.jpg",
  },
  {
    title: "Data & analytics",
    category: "Analytics",
    year: "2024",
    description:
      "Pipelines, warehouses, and Fabric workloads that turn operational data into decisions.",
    image: "/service_image/data.jpg",
  },
  {
    title: "Modern web applications",
    category: "Engineering",
    year: "2024",
    description:
      "React, Next.js, and API platforms built for performance, security, and long-term maintainability.",
    image: "/service_image/web.jpg",
  },
] as const;

const SLIDE_COUNT = gallerySlides.length;

const config = { LERP_FACTOR: 0.05, SNAP_DURATION: 500 };

type ParallaxHandle = { update: (scroll: number, index: number) => void };

type ElementEntry = {
  el: HTMLDivElement;
  parallax?: ParallaxHandle;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function createParallax(layer: HTMLElement, height: number, scale = 1.4): ParallaxHandle {
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

type ParallaxGalleryCardProps = {
  className?: string;
  onSlideChange?: (index: number) => void;
};

export default function ParallaxGalleryCard({
  className = "",
  onSlideChange,
}: ParallaxGalleryCardProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectVisualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const minimapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const minimapVisualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const minimapInfoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const goToIndexRef = useRef<(index: number) => void>(() => {});

  const [activeIndex, setActiveIndex] = useState(0);
  const active = gallerySlides[activeIndex];

  const syncActiveIndex = useCallback(
    (index: number) => {
      setActiveIndex(index);
      onSlideChange?.(index);
    },
    [onSlideChange]
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const state = {
      currentY: 0,
      targetY: 0,
      projects: new Map<number, ElementEntry>(),
      minimap: new Map<number, ElementEntry>(),
      minimapInfo: new Map<number, { el: HTMLDivElement }>(),
      projectHeight: stage.clientHeight || 280,
      minimapHeight: 140,
      isSnapping: false,
      snapStart: { time: 0, y: 0, target: 0 },
      lastReportedIndex: 0,
    };

    const bindSlides = () => {
      state.projects.clear();
      state.minimap.clear();
      state.minimapInfo.clear();

      for (let i = 0; i < SLIDE_COUNT; i++) {
        const projectEl = projectRefs.current[i];
        const visualEl = projectVisualRefs.current[i];
        if (projectEl) {
          state.projects.set(i, {
            el: projectEl,
            parallax: visualEl
              ? createParallax(visualEl, state.projectHeight, 1.35)
              : undefined,
          });
        }

        const minimapEl = minimapRefs.current[i];
        const minimapVisual = minimapVisualRefs.current[i];
        if (minimapEl) {
          state.minimap.set(i, {
            el: minimapEl,
            parallax: minimapVisual
              ? createParallax(minimapVisual, state.minimapHeight, 1.25)
              : undefined,
          });
        }

        const infoEl = minimapInfoRefs.current[i];
        if (infoEl) state.minimapInfo.set(i, { el: infoEl });
      }
    };

    const measureStage = () => {
      const h = stage.clientHeight;
      if (h < 1) return;
      state.projectHeight = h;
      state.minimapHeight = Math.round(Math.min(180, Math.max(120, h * 0.42)));
      stage.style.setProperty("--isc-minimap-h", `${state.minimapHeight}px`);
      bindSlides();
      goToIndex(state.lastReportedIndex);
    };

    const getCurrentIndex = () =>
      Math.round(-state.targetY / state.projectHeight);

    const goToIndex = (index: number) => {
      const clamped = Math.max(0, Math.min(SLIDE_COUNT - 1, index));
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
        state.snapStart.y + (state.snapStart.target - state.snapStart.y) * eased;
      if (progress >= 1) state.isSnapping = false;
    };

    const updatePositions = () => {
      const minimapY =
        (state.currentY * state.minimapHeight) / state.projectHeight;

      state.projects.forEach((item, index) => {
        const y = index * state.projectHeight + state.currentY;
        item.el.style.height = `${state.projectHeight}px`;
        item.el.style.transform = `translateY(${y}px)`;
        item.parallax?.update(state.currentY, index);
      });

      state.minimap.forEach((item, index) => {
        const y = index * state.minimapHeight + minimapY;
        item.el.style.transform = `translateY(${y}px)`;
        item.parallax?.update(minimapY, index);
      });

      state.minimapInfo.forEach((item, index) => {
        item.el.style.transform = `translateY(${
          index * state.minimapHeight + minimapY
        }px)`;
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
        if (current < SLIDE_COUNT - 1) {
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

    const resizeObserver = new ResizeObserver(() => measureStage());
    resizeObserver.observe(stage);
    measureStage();
    window.addEventListener("keydown", onKeyDown);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [syncActiveIndex]);

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
        {/* Full-bleed background — service images from public/service_image */}
        <div className="isc-project-list">
          {gallerySlides.map((slide, i) => (
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
              <div className="isc-project-caption pointer-events-none absolute inset-x-0 bottom-0 z-[5] max-w-[90%] p-5 pb-14 md:p-6 md:pb-16">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  {slide.category}
                </p>
                <p className="mt-1 text-base font-semibold text-white md:text-lg">
                  {slide.title}
                </p>
                <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-white/75 md:text-[13px]">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Centre white card — service image in preview rectangle */}
        <div className="isc-minimap isc-minimap--landscape">
          <div className="isc-minimap-wrapper">
            <div className="isc-minimap-img-preview">
              {gallerySlides.map((slide, i) => (
                <div
                  key={`mini-${slide.title}`}
                  ref={(el) => {
                    minimapRefs.current[i] = el;
                  }}
                  className="isc-minimap-img-item"
                >
                  <div
                    ref={(el) => {
                      minimapVisualRefs.current[i] = el;
                    }}
                    className="isc-minimap-visual relative size-full overflow-hidden rounded-md"
                  >
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
            <div className="isc-minimap-info-list">
              {gallerySlides.map((slide, i) => (
                <div
                  key={`info-${slide.title}`}
                  ref={(el) => {
                    minimapInfoRefs.current[i] = el;
                  }}
                  className="isc-minimap-item-info"
                >
                  <div className="isc-minimap-item-info-row">
                    <p>{String(i + 1).padStart(2, "0")}</p>
                    <p>{slide.title}</p>
                  </div>
                  <div className="isc-minimap-item-info-row">
                    <p>{slide.category}</p>
                    <p>{slide.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between bg-gradient-to-b from-black/50 to-transparent p-4 md:p-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
            Services we deliver
          </p>
          <p className="mt-1 text-sm font-semibold text-white md:text-base">
            {active.title}
          </p>
        </div>
        <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[10px] tabular-nums text-white/80 backdrop-blur-md">
          {String(activeIndex + 1).padStart(2, "0")}/
          {String(SLIDE_COUNT).padStart(2, "0")}
        </span>
      </div>

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
          disabled={activeIndex === SLIDE_COUNT - 1}
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white text-[#0a0a1a] backdrop-blur-md transition hover:bg-white/90 disabled:opacity-30"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
