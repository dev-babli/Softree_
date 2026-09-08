"use client";

import * as React from "react";

export interface ProjectData {
  title: string;
  image: string;
  category: string;
  year: string;
  description: string;
}

export const AI_PROJECT_DATA: ProjectData[] = [
  {
    title: "Agentic Workflow Mesh",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80",
    category: "Autonomous Systems",
    year: "2025",
    description: "Self-orchestrating multi-agent enterprise framework",
  },
  {
    title: "Cognitive Vector RAG",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80",
    category: "Enterprise Intelligence",
    year: "2025",
    description: "Hybrid semantic retrieval across multi-modal data",
  },
  {
    title: "Vision AI Edge Inspector",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80",
    category: "Computer Vision",
    year: "2024",
    description: "Sub-millimeter real-time industrial defect detection",
  },
  {
    title: "Predictive Neural Engine",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1600&q=80",
    category: "Deep Learning",
    year: "2024",
    description: "Dynamic supply chain forecasting & anomaly detection",
  },
  {
    title: "Azure AI Copilot Platform",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80",
    category: "LLMOps & Governance",
    year: "2025",
    description: "Fine-tuned domain copilots with strict enterprise guardrails",
  },
];

const CONFIG = {
  SCROLL_SPEED: 0.75,
  LERP_FACTOR: 0.05,
  BUFFER_SIZE: 5,
  MAX_VELOCITY: 150,
  SNAP_DURATION: 500,
};

// Utility functions
const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

const getProjectData = (index: number, data: ProjectData[] = AI_PROJECT_DATA) => {
  const i =
    ((Math.abs(index) % data.length) + data.length) %
    data.length;
  return data[i];
};

const getProjectNumber = (index: number, total: number = AI_PROJECT_DATA.length) => {
  return (
    (((Math.abs(index) % total) + total) %
      total) +
    1
  )
    .toString()
    .padStart(2, "0");
};

interface AiParallaxShowcaseProps {
  projects?: ProjectData[];
  className?: string;
}

export function Component({
  projects = AI_PROJECT_DATA,
  className = "",
}: AiParallaxShowcaseProps) {
  const [visibleRange, setVisibleRange] = React.useState({
    min: -CONFIG.BUFFER_SIZE,
    max: CONFIG.BUFFER_SIZE,
  });

  const [activeProject, setActiveProject] = React.useState({
    number: "01",
    data: projects[0],
  });

  const containerRef = React.useRef<HTMLDivElement>(null);

  // Refs for state that changes frequently (animation loop)
  const state = React.useRef({
    currentY: 0,
    targetY: 0,
    isDragging: false,
    isSnapping: false,
    snapStart: { time: 0, y: 0, target: 0 },
    lastScrollTime: Date.now(),
    dragStart: { y: 0, scrollY: 0 },
    projectHeight: 0, // Set on mount
    minimapHeight: 250, // Fixed height from CSS
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
      img.style.transform = `translateY(${current}px) scale(1.5)`;
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
    if (progress >= 1) s.isSnapping = false;
  };

  const snapToProject = () => {
    const s = state.current;
    const current = Math.round(-s.targetY / s.projectHeight);
    const target = -current * s.projectHeight;
    s.isSnapping = true;
    s.snapStart = {
      time: Date.now(),
      y: s.targetY,
      target: target,
    };
  };

  const updatePositions = () => {
    const s = state.current;
    if (!s.projectHeight) return;
    const minimapY = (s.currentY * s.minimapHeight) / s.projectHeight;

    // Update Projects
    projectsRef.current.forEach((el, index) => {
      const y = index * s.projectHeight + s.currentY;
      el.style.transform = `translateY(${y}px)`;
      const img = el.querySelector("img");
      updateParallax(img, s.currentY, index, s.projectHeight);
    });

    // Update Minimap Images
    minimapRef.current.forEach((el, index) => {
      const y = index * s.minimapHeight + minimapY;
      el.style.transform = `translateY(${y}px)`;
      const img = el.querySelector("img");
      if (img) {
        updateParallax(img, minimapY, index, s.minimapHeight);
      }
    });

    // Update Info
    infoRef.current.forEach((el, index) => {
      const y = index * s.minimapHeight + minimapY;
      el.style.transform = `translateY(${y}px)`;
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

    if (s.isSnapping) updateSnap();
    if (!s.isDragging) {
      s.currentY += (s.targetY - s.currentY) * CONFIG.LERP_FACTOR;
    }

    updatePositions();
  };

  // Tracks the last committed visible range so we only call setState when it changes
  const renderedRange = React.useRef({
    min: -CONFIG.BUFFER_SIZE,
    max: CONFIG.BUFFER_SIZE,
  });

  const lastTrackedIndex = React.useRef<number | null>(null);

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

      if (lastTrackedIndex.current !== currentIndex) {
        lastTrackedIndex.current = currentIndex;
        setActiveProject({
          number: getProjectNumber(currentIndex, projects.length),
          data: getProjectData(currentIndex, projects),
        });
      }
    }

    requestRef.current = requestAnimationFrame(animationLoop);
  };

  React.useEffect(() => {
    const container = containerRef.current;
    const updateHeight = () => {
      if (container) {
        state.current.projectHeight = container.clientHeight || window.innerHeight;
      } else {
        state.current.projectHeight = window.innerHeight;
      }
    };

    updateHeight();

    const onWheel = (e: WheelEvent) => {
      // Check if mouse is hovering over container
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const inBounds =
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right;

      if (!inBounds) return;

      e.preventDefault();
      const s = state.current;
      s.isSnapping = false;
      s.lastScrollTime = Date.now();
      const delta = Math.max(
        Math.min(e.deltaY * CONFIG.SCROLL_SPEED, CONFIG.MAX_VELOCITY),
        -CONFIG.MAX_VELOCITY
      );
      s.targetY -= delta;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      const inBounds =
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom &&
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right;

      if (!inBounds) return;

      const s = state.current;
      s.isDragging = true;
      s.isSnapping = false;
      s.dragStart = { y: touch.clientY, scrollY: s.targetY };
      s.lastScrollTime = Date.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      const s = state.current;
      if (!s.isDragging) return;
      e.preventDefault();
      s.targetY =
        s.dragStart.scrollY + (e.touches[0].clientY - s.dragStart.y) * 1.5;
      s.lastScrollTime = Date.now();
    };

    const onTouchEnd = () => {
      state.current.isDragging = false;
    };

    const onResize = () => {
      updateHeight();
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
  }, [projects]);

  const indices: number[] = [];
  for (let i = visibleRange.min; i <= visibleRange.max; i++) {
    indices.push(i);
  }

  return (
    <div
      ref={containerRef}
      className={`parallax-container relative h-screen w-full overflow-hidden bg-black text-white select-none ${className}`}
    >
      {/* Cinematic Vignette & Grain */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

      {/* Background Project Slides */}
      <ul className="project-list relative h-full w-full list-none p-0 m-0">
        {indices.map((i) => {
          const data = getProjectData(i, projects);
          return (
            <li
              key={i}
              className="project absolute inset-0 will-change-transform"
              ref={(el) => {
                if (el) projectsRef.current.set(i, el as unknown as HTMLDivElement);
                else projectsRef.current.delete(i);
              }}
            >
              <img
                src={data.image}
                alt={data.title}
                className="h-full w-full object-cover will-change-transform brightness-90"
              />
            </li>
          );
        })}
      </ul>

      {/* Top Header HUD */}
      <div className="pointer-events-none absolute top-8 left-8 sm:top-12 sm:left-12 z-20 flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit">
          <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-white/90">
            SOFTREE AI LABS // SHOWCASE
          </span>
        </div>
        <p className="text-xs sm:text-sm text-white/60 font-mono tracking-wider">
          [ DRAG OR SCROLL VERTICALLY TO EXPLORE ]
        </p>
      </div>

      {/* Main Cinematic Caption (Bottom-Left) */}
      <div className="pointer-events-none absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-20 max-w-xl pr-6">
        <div className="flex items-center gap-3 mb-2 font-mono text-xs text-[#FF6B2C] uppercase tracking-widest font-bold">
          <span>PROJECT {activeProject.number}</span>
          <span>/</span>
          <span>{activeProject.data.category}</span>
          <span>•</span>
          <span>{activeProject.data.year}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-lg font-['Plus_Jakarta_Sans',sans-serif]">
          {activeProject.data.title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed max-w-lg font-sans drop-shadow">
          {activeProject.data.description}
        </p>
      </div>

      {/* Floating Minimap Preview (Bottom-Right) - Exact Structure */}
      <div className="minimap pointer-events-none absolute bottom-8 right-8 sm:bottom-12 sm:right-12 h-[260px] w-[190px] sm:w-[210px] overflow-hidden rounded-2xl border border-white/25 shadow-2xl backdrop-blur-md bg-black/40 z-20">
        <div className="minimap-wrapper relative h-full w-full">
          {/* Minimap Image Preview */}
          <div className="minimap-img-preview relative h-full w-full overflow-hidden rounded-2xl">
            {indices.map((i) => {
              const data = getProjectData(i, projects);
              return (
                <div
                  key={i}
                  className="minimap-img-item absolute inset-0 will-change-transform"
                  ref={(el) => {
                    if (el) minimapRef.current.set(i, el);
                    else minimapRef.current.delete(i);
                  }}
                >
                  <img
                    src={data.image}
                    alt={data.title}
                    className="h-full w-full object-cover will-change-transform brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                </div>
              );
            })}
          </div>

          {/* Minimap Metadata Overlay */}
          <div className="minimap-info-list absolute inset-0 text-white select-none">
            {indices.map((i) => {
              const data = getProjectData(i, projects);
              const num = getProjectNumber(i, projects.length);
              return (
                <div
                  key={i}
                  className="minimap-item-info absolute inset-0 flex flex-col justify-end gap-1.5 p-3.5 text-xs will-change-transform"
                  ref={(el) => {
                    if (el) infoRef.current.set(i, el);
                    else infoRef.current.delete(i);
                  }}
                >
                  <div className="minimap-item-info-row flex justify-between font-mono font-bold text-[11px] text-white">
                    <p className="text-[#FF6B2C]">{num}</p>
                    <p className="truncate ml-2 text-right">{data.title}</p>
                  </div>
                  <div className="minimap-item-info-row flex justify-between font-mono text-[10px] text-white/80">
                    <p className="truncate">{data.category}</p>
                    <p>{data.year}</p>
                  </div>
                  <div className="minimap-item-info-row text-[10.5px] text-white/70 line-clamp-2 leading-tight font-sans">
                    <p>{data.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
