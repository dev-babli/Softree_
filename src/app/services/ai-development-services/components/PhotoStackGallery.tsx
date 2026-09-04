"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Photo Stack Gallery (Customized for Softree AI Services)
 * ---------------------------------------------------------------
 * A stack of overlapping photos, tossed down like a contact sheet
 * representing our offshore AI delivery pods and workflow sessions.
 */

export interface StackPhoto {
  id: string;
  title: string;
  caption: string;
  location: string;
  category: string;
  status: string;
  specs: { label: string; value: string }[];
}

interface PhotoStackGalleryProps {
  photos?: StackPhoto[];
  className?: string;
  selectedIndex?: number;
  onSelectIndex?: (index: number) => void;
}

const DEFAULT_PHOTOS: StackPhoto[] = [
  {
    id: "01",
    title: "AI / Solution Architects",
    caption: "Define AI architecture, technology strategy, solution design, agent workflows, and governance.",
    location: "Role 01 • Architecture & Strategy",
    category: "[ ARCHITECTURE & STRATEGY ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "FOCUS", value: "System Architecture & Strategy" },
      { label: "DESIGN", value: "Multi-Agent Workflows" },
      { label: "GOVERNANCE", value: "Security & Guardrails" }
    ]
  },
  {
    id: "02",
    title: "AI Engineers",
    caption: "Build agents, RAG systems, orchestration, AI services, tool integrations, and evaluation frameworks.",
    location: "Role 02 • Agents & RAG Systems",
    category: "[ AI ENGINEERING ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "AGENTS", value: "Autonomous Agents & Copilots" },
      { label: "RAG", value: "Hybrid Retrieval Systems" },
      { label: "EVALS", value: "Prompt & Model Quality" }
    ]
  },
  {
    id: "03",
    title: "Full-Stack Engineers",
    caption: "Build applications, APIs, interfaces, and experiences around your AI solutions.",
    location: "Role 03 • AI Apps & Interfaces",
    category: "[ APPLICATION DEV ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "APPS", value: "AI-Native Web & Mobile" },
      { label: "APIS", value: "Microservices & Endpoints" },
      { label: "EXPERIENCE", value: "Modern UI/UX Integration" }
    ]
  },
  {
    id: "04",
    title: "Data Engineers",
    caption: "Build data pipelines, knowledge systems, retrieval infrastructure, and AI-ready data platforms.",
    location: "Role 04 • Data & Retrieval Platforms",
    category: "[ DATA PLATFORMS ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "PIPELINES", value: "High-Throughput ETL & Streaming" },
      { label: "RETRIEVAL", value: "Vector DBs & Embeddings" },
      { label: "KNOWLEDGE", value: "Enterprise Knowledge Graphs" }
    ]
  },
  {
    id: "05",
    title: "QA Engineers",
    caption: "Validate application quality, AI behavior, reliability, security, and performance.",
    location: "Role 05 • AI Reliability & Evals",
    category: "[ QUALITY & EVALS ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "VALIDATION", value: "Functional & E2E Testing" },
      { label: "BEHAVIOR", value: "Hallucination & Drift Check" },
      { label: "SECURITY", value: "Safety & Prompt Guardrails" }
    ]
  },
  {
    id: "06",
    title: "Cloud & DevOps Engineers",
    caption: "Deploy, secure, monitor, scale, and operate AI solutions in production.",
    location: "Role 06 • Cloud & MLOps",
    category: "[ CLOUD & MLOPS ]",
    status: "● SPECIALIZED TALENT",
    specs: [
      { label: "DEPLOY", value: "Azure & AWS Production" },
      { label: "MLOPS", value: "Automated CI/CD Pipelines" },
      { label: "SCALE", value: "GPU Compute & Observability" }
    ]
  }
];

const TILTS = [-3.5, 4, -6, 2.5, -2, 5.5];

export default function PhotoStackGallery({
  photos = DEFAULT_PHOTOS,
  className = "",
  selectedIndex,
  onSelectIndex,
}: PhotoStackGalleryProps) {
  const [order, setOrder] = useState<number[]>(() =>
    photos.map((_, i) => i)
  );
  const [hovered, setHovered] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setOrder(photos.map((_, i) => i));
  }, [photos.length]);

  // Sync when selectedIndex prop changes from parent
  useEffect(() => {
    if (selectedIndex !== undefined && selectedIndex >= 0 && selectedIndex < photos.length) {
      setOrder((prev) => {
        if (prev[0] === selectedIndex) return prev;
        const rest = prev.filter((i) => i !== selectedIndex);
        return [selectedIndex, ...rest];
      });
      setDragX(0);
    }
  }, [selectedIndex, photos.length]);

  // Notify parent of front photo change
  useEffect(() => {
    if (order.length > 0) {
      onSelectIndex?.(order[0]);
    }
  }, [order, onSelectIndex]);

  // Auto-advance
  useEffect(() => {
    if (hovered || dragging) return;
    
    const intervalId = setInterval(() => {
      setOrder((prev) => {
        const [front, ...rest] = prev;
        return [...rest, front];
      });
      setDragX(0);
    }, 3500);

    return () => clearInterval(intervalId);
  }, [hovered, dragging]);

  const advance = (direction: 1 | -1) => {
    setOrder((prev) => {
      if (direction === 1) {
        const [front, ...rest] = prev;
        return [...rest, front];
      }
      const back = prev[prev.length - 1];
      return [back, ...prev.slice(0, -1)];
    });
    setDragX(0);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (order.length < 2) return;
    setDragging(true);
    dragStartX.current = e.clientX;
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragX(e.clientX - dragStartX.current);
  };

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    const threshold = 90;
    if (dragX > threshold) {
      advance(-1);
    } else if (dragX < -threshold) {
      advance(1);
    } else {
      setDragX(0);
    }
  };

  const frontIndex = order[0];
  const frontPhoto = photos[frontIndex];
  const total = photos.length;
  const frameNumber = String(order.indexOf(frontIndex) + 1).padStart(2, "0");

  return (
    <div className={`flex flex-col items-center justify-between gap-4 ${className}`}>
      <div
        ref={containerRef}
        className="relative w-[320px] sm:w-[390px] h-[480px] sm:h-[500px] mb-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {order.map((photoIndex, depth) => {
          const photo = photos[photoIndex];
          const isFront = depth === 0;
          const tilt = TILTS[photoIndex % TILTS.length];

          const spread = hovered ? 1.7 : 1;
          const translateX = isFront
            ? dragX
            : depth * 7 * (depth % 2 === 0 ? 1 : -1) * spread;
          const translateY = depth * 9 * spread;
          const rotate = isFront
            ? tilt * 0.2 + dragX / 14
            : tilt + depth * (depth % 2 === 0 ? 1.5 : -1.5) * spread;
          const scale = 1 - depth * 0.045;

          return (
            <motion.button
              key={photo.id}
              type="button"
              aria-label={
                isFront
                  ? `Send "${photo.caption}" to the back of the stack`
                  : undefined
              }
              tabIndex={isFront ? 0 : -1}
              onClick={() => isFront && !dragging && advance(1)}
              onPointerDown={isFront ? onPointerDown : undefined}
              onPointerMove={isFront ? onPointerMove : undefined}
              onPointerUp={isFront ? endDrag : undefined}
              onPointerCancel={isFront ? endDrag : undefined}
              className="absolute top-0 left-0 w-full h-[440px] sm:h-[460px] overflow-hidden rounded-2xl border border-white/20 focus:outline-none focus-visible:ring-2 flex flex-col items-start justify-between p-6 sm:p-7 text-left select-none"
              animate={{
                x: translateX,
                y: translateY,
                rotate: rotate,
                scale: scale,
                zIndex: total - depth,
                boxShadow: isFront
                  ? "0 22px 36px -10px rgba(234, 88, 12, 0.45), 0 10px 18px -6px rgba(0,0,0,0.15)"
                  : "0 8px 16px -8px rgba(0,0,0,0.22)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              style={{
                cursor: isFront
                  ? dragging
                    ? "grabbing"
                    : "grab"
                  : "default",
                background: "linear-gradient(145deg, #FF6B2C 0%, #EA580C 52%, #C2410C 100%)",
                // Brand accent ring on focus-visible
                // @ts-expect-error -- tw-ring-color custom property
                "--tw-ring-color": "#FFFFFF",
              }}
            >
              {/* Solid Grain Texture Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  opacity: 0.22,
                  mixBlendMode: "overlay",
                  pointerEvents: "none",
                }}
              />

              {/* Monospace Header */}
              <div className="relative z-10 w-full flex items-center justify-between text-[10px] font-mono tracking-wider text-white/80 select-none pointer-events-none">
                <span>{photo.category}</span>
                <span className="font-bold text-white">{photo.status}</span>
              </div>
              
              {/* Main Title & Description (Centered vertically) */}
              <div className="relative z-10 w-full flex flex-col gap-2 my-auto select-none pointer-events-none">
                <h3 
                  className="text-white font-bold leading-snug tracking-tight pr-2"
                  style={{ fontSize: "24px" }}
                >
                  {photo.title}
                </h3>
                <p className="text-[12.5px] leading-relaxed text-white/85">
                  {photo.caption}
                </p>
              </div>

              <div className="relative z-10 w-full border-t border-white/15 pt-4 grid grid-cols-2 gap-4 text-[10px] font-mono text-white/90 select-none pointer-events-none">
                {photo.specs && photo.specs.map((spec, sIdx) => (
                  <div key={sIdx} className={`flex flex-col border-l border-white/20 pl-2.5 ${sIdx === 2 ? 'col-span-2' : ''}`}>
                    <span className="opacity-60 text-[9px] uppercase tracking-wider mb-0.5">{spec.label}</span>
                    <span className="font-semibold text-[11px] text-white leading-tight">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex w-[320px] sm:w-[390px] items-start justify-between gap-3 px-2">
        <div className="min-w-0">
          <p
            className="text-[16px] font-bold leading-normal text-slate-900"
          >
            {frontPhoto.title}
          </p>
          <p className="mt-1 text-[13px] text-slate-500">
            {frontPhoto.location}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 pt-0.5">
          <span
            className="text-[12px] tabular-nums text-slate-500"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace" }}
          >
            {frameNumber}/{String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => advance(-1)}
            aria-label="Previous photo"
            className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 transition-colors hover:border-[#FF6B2C] hover:text-[#FF6B2C] focus:outline-none focus-visible:ring-2 text-slate-800"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => advance(1)}
            aria-label="Next photo"
            className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 transition-colors hover:border-[#FF6B2C] hover:text-[#FF6B2C] focus:outline-none focus-visible:ring-2 text-slate-800"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
