"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FlowButton } from "@/components/ui/flow-button";
import { Search, Code2, Network, ShieldCheck, Rocket } from "lucide-react";

/* =========================================================
 * 1. FAN CARD STACK COMPONENT
 * ========================================================= */
function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

type FanCardStackItem = {
  id: string | number;
  title: string;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  [key: string]: any;
};

type FanCardStackProps<T extends FanCardStackItem> = {
  items: T[];
  initialIndex?: number;
  maxVisible?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  springStiffness?: number;
  springDamping?: number;
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
  className?: string;
  onChangeIndex?: (index: number, item: T) => void;
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

function FanCardStack<T extends FanCardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,
  cardWidth = 520,
  cardHeight = 320,
  overlap = 0.48,
  spreadDeg = 48,
  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,
  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  renderCard,
}: FanCardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;

  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len));
  const [hovering, setHovering] = React.useState(false);
  const [cw, setCw] = React.useState(cardWidth);
  const [ch, setCh] = React.useState(cardHeight);

  React.useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 640) {
        setCw(width - 40);
        setCh(480);
      } else if (width < 768) {
        setCw(420);
        setCh(400);
      } else {
        setCw(cardWidth);
        setCh(cardHeight);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cardWidth, cardHeight]);

  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
  }, [active, len, items, onChangeIndex]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  const cardSpacing = Math.max(10, Math.round(cw * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len || !canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len || !canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len || (pauseOnHover && hovering)) return;
    const id = window.setInterval(() => {
      if (loop || active < len - 1) next();
    }, Math.max(700, intervalMs));
    return () => window.clearInterval(id);
  }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, loop, active, next]);

  if (!len) return null;

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="relative w-full focus:outline-none"
        style={{ height: Math.max(380, ch + 80) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;

              if (!visible) return null;

              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 10;
              const z = -abs * depthPx;

              const isActive = off === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg;
              const zIndex = 100 - abs;

              const dragProps = isActive
                ? {
                  drag: "x" as const,
                  dragConstraints: { left: 0, right: 0 },
                  dragElastic: 0.18,
                  onDragEnd: (_e: any, info: { offset: { x: number }; velocity: { x: number } }) => {
                    if (reduceMotion) return;
                    const travel = info.offset.x;
                    const v = info.velocity.x;
                    const threshold = Math.min(160, cw * 0.22);
                    if (travel > threshold || v > 650) prev();
                    else if (travel < -threshold || v < -650) next();
                  },
                }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute bottom-0 rounded-2xl overflow-hidden shadow-xl",
                    "will-change-transform select-none",
                    isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                  )}
                  style={{
                    width: cw,
                    height: ch,
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  initial={reduceMotion ? false : { opacity: 0, y: y + 40, x, rotateZ, rotateX, scale }}
                  animate={{ opacity: 1, x, y: y + lift, rotateZ, rotateX, scale }}
                  transition={{ type: "spring", stiffness: springStiffness, damping: springDamping }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{ transform: `translateZ(${z}px)`, transformStyle: "preserve-3d" }}
                  >
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultFanCard item={item} active={isActive} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {showDots && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            {items.map((it, idx) => (
              <button
                key={it.id}
                onClick={() => setActive(idx)}
                className={cn(
                  "h-2 w-2 rounded-full transition",
                  idx === active ? "bg-[#FF5812]" : "bg-[#0a0a1a]/20 hover:bg-[#0a0a1a]/40"
                )}
                aria-label={`Go to ${it.title}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DefaultFanCard({ item, active }: { item: FanCardStackItem; active: boolean }) {
  return (
    <div className="relative h-full w-full group">
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            draggable={false}
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-start px-6 pt-6 pb-6">
        <div className="flex flex-col items-start gap-3 mb-3">
          {item.icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </div>
          )}
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF5812]/30 bg-[#FF5812]/10 px-3 py-1.5 text-[14px] font-bold tracking-wide text-[#FF5812] backdrop-blur-md transition-colors duration-300 group-hover:bg-[#FF5812]/20">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]"></span>
            {item.title}
          </span>
        </div>
        {item.description ? (
          <div className="flex flex-col gap-1 text-[14px] leading-snug text-white/90 whitespace-pre-wrap">
            {item.description}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* =========================================================
 * 2. HOW WE WORK SECTION
 * ========================================================= */
const CARDS = [
  {
    id: "01",
    title: "01 — DISCOVER & DEFINE",
    description: (
      <>
        <strong className="text-white text-[16px]">Understand Your AI Use Case & Requirements</strong><br />
        We collaborate with your team to identify the highest-value Azure OpenAI use cases, assess your existing data landscape, define governance requirements, and establish the technical scope for your AI solution.<br /><br />
        • Prioritize AI use cases by business impact, data readiness, and technical feasibility<br />
        • Define security, compliance, privacy, and integration requirements upfront
      </>
    ),
    icon: <Search className="w-6 h-6 text-[#FF5812]" />,
    imageSrc: "https://cdn.21st.dev/assets/mirror/1c/1c40e9d2fc325643f20991f6c4361c803b8d0ad690ad1e7529c7377151a282eb.jpg",
  },
  {
    id: "02",
    title: "02 — ARCHITECT & PROVISION",
    description: (
      <>
        <strong className="text-white text-[16px]">Design the Azure OpenAI Architecture</strong><br />
        We design and provision your Azure AI Foundry environment, VNet landing zone, Entra ID RBAC policies, Key Vault secrets, Azure AI Search indexes, and infrastructure pipeline aligned to Microsoft Cloud Adoption Framework.<br /><br />
        • Provision secure Azure environment with private endpoints, RBAC, and compliance controls<br />
        • Configure AI Foundry model deployments, token quotas, and monitoring infrastructure
      </>
    ),
    icon: <Code2 className="w-6 h-6 text-[#FF5812]" />,
    imageSrc: "https://cdn.21st.dev/assets/mirror/ba/baa07e4ac6f0a4420a74083de7959083153be3dbfa7732dc26378fb69c1bf2eb.jpg",
  },
  {
    id: "03",
    title: "03 — BUILD & INTEGRATE",
    description: (
      <>
        <strong className="text-white text-[16px]">Engineer the Azure OpenAI Solution</strong><br />
        We build your GPT-4o application, RAG pipeline, Copilot extension, or AI orchestration layer — integrating with your existing systems, Microsoft 365 environment, and enterprise data sources.<br /><br />
        • Build REST APIs, RAG pipelines, Copilot extensions, and AI middleware integrations<br />
        • Connect to Microsoft Graph, SharePoint, Dynamics 365, Power Platform, and enterprise data
      </>
    ),
    icon: <Network className="w-6 h-6 text-[#FF5812]" />,
    imageSrc: "https://cdn.21st.dev/assets/mirror/80/80e27ca27a44306f03e4708cb8a7d622e480996fdb40955ecbe735109c62ca69.jpg",
  },
  {
    id: "04",
    title: "04 — EVALUATE & VALIDATE",
    description: (
      <>
        <strong className="text-white text-[16px]">Benchmark Accuracy Before Production</strong><br />
        We run automated evaluation suites benchmarking answer relevance, faithfulness, groundedness, citation accuracy, and latency — resolving prompt issues, hallucination risks, and content safety gaps before launch.<br /><br />
        • Benchmark AI accuracy, faithfulness, groundedness, and latency with automated evals<br />
        • Resolve prompt issues, RAG gaps, content safety failures, and performance bottlenecks
      </>
    ),
    icon: <ShieldCheck className="w-6 h-6 text-[#FF5812]" />,
    imageSrc: "https://cdn.21st.dev/assets/mirror/5c/5c9f812d112ce28b3524a9bc44bc65ad85da3958f45492845ba060af904cb189.jpg",
  },
  {
    id: "05",
    title: "05 — DEPLOY & OPTIMIZE",
    description: (
      <>
        <strong className="text-white text-[16px]">Launch and Continuously Improve Your AI Solution</strong><br />
        After production deployment, we optimize token costs, implement semantic caching, tune model tiering, monitor performance, and support ongoing AI governance to maximize the long-term ROI of your Azure OpenAI investment.<br /><br />
        • Deploy AI to production with CI/CD pipelines, monitoring, and alert configurations<br />
        • Optimize costs with semantic caching, model tiering, prompt compression, and budget controls
      </>
    ),
    icon: <Rocket className="w-6 h-6 text-[#FF5812]" />,
    imageSrc: "https://cdn.21st.dev/assets/mirror/37/37ea3835df0f51289154b990eb4d61b95b3ad63d4bf71cd79554cc56f2f134a8.jpg",
  },
];

export const AzureOpenAIHowWeWork = () => {
  return (
    <section className="relative w-full bg-white pt-12 pb-12 md:pt-16 md:pb-16 border-t border-[#0a0a1a]/[0.06] overflow-hidden">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">

        {/* Section Header */}
        <div className="mb-10 md:mb-16 flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF5812]/20 bg-[#FF5812]/5 px-3 py-1 typo-caption text-[#FF5812]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]"></span>
            HOW WE WORK
          </span>
          <h2 className="typo-heading-2 tracking-[-0.03em] text-[#0a0a1a]">
            From Azure OpenAI Discovery to a <br className="hidden md:block" />
            <span className="text-[#FF6B2C]">Production-Ready Enterprise AI Solution</span>
          </h2>
          <p className="mt-6 max-w-3xl text-pretty typo-description text-[#0a0a1a]/70 font-medium">
            Our Azure OpenAI development approach combines use case discovery, secure architecture design, GPT-4o engineering, RAG development, automated evaluation, and production deployment to help organizations launch enterprise AI with confidence.
          </p>
        </div>

        {/* Card Stack Content */}
        <div className="mx-auto max-w-4xl w-full">
          <FanCardStack
            items={CARDS}
            autoAdvance={true}
            intervalMs={4000}
            cardWidth={520}
            cardHeight={340}
            showDots={false}
          />
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-10 md:pt-12">
          <h3 className="typo-heading-4 tracking-tight text-[#0a0a1a] max-w-4xl">
            Whatever you&apos;re building, automating, or scaling with Azure OpenAI, we&apos;re ready to work alongside you.
          </h3>
          <FlowButton href="/contact" text="Explore How We Work" className="mt-8" />
        </div>

      </div>
    </section>
  );
}
