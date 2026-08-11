"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Leaf, Code, Bug, Rocket } from "lucide-react";
import {
  ClarityGlassCard,
  GlobalMapGlassPanel,
  useClarityCardParallax,
  type ClarityPillar,
} from "@/components/sections/ClarityControlSection";
import { DUR, EASE_T, STAGGER, VIEWPORT } from "@/lib/motion";

const SCENE_OFFSHORE = {
  color1: "#B8CDE8",
  color2: "#3F5C9A",
  color3: "#0F1A36",
  blendAngle: 24,
  centerX: -0.06,
  centerY: -0.04,
  zoom: 0.97,
  warpSpeed: 0.85,
};

const SCENE_WHITELABEL = {
  color1: "#F4D2A6",
  color2: "#FF5812",
  color3: "#1F1108",
  blendAngle: 38,
  centerX: 0.04,
  centerY: 0,
  zoom: 0.95,
  warpSpeed: 0.75,
};

const SCENE_ENTERPRISE = {
  color1: "#C8D8A0",
  color2: "#3F5828",
  color3: "#0E1408",
  blendAngle: -14,
  centerX: 0,
  centerY: -0.05,
  zoom: 0.96,
  warpSpeed: 0.8,
};

const GLASS_DARK =
  "relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/14 bg-gradient-to-br from-black/25 via-black/45 to-black/65 p-4 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_44px_-18px_rgba(0,0,0,0.5)]";

function GlassDots() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <span className="block h-1 w-1 rounded-full bg-white/35" />
      <span className="block h-1 w-1 rounded-full bg-white/35" />
      <span className="block h-[5px] w-[5px] rounded-full bg-white/95 shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
    </div>
  );
}

function WhiteLabelGlassPanel() {
  return (
    <div className={GLASS_DARK}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FF5812]">
          BRAND POWERED DELIVERY
        </span>
        <GlassDots />
      </div>

      {/* Two-column: Client-facing + Delivery Layer */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div
          className="flex flex-col items-center rounded-[14px] border border-white/[0.08] p-4 pt-5 pb-5 text-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,88,18,0.12) 0%, rgba(255,88,18,0.03) 100%)",
          }}
        >
          {/* 3 People Icon */}
          <div className="mb-3">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
              {/* Left person (behind) */}
              <path d="M7 19v-2a3 3 0 0 1 2.3-2.9" stroke="#FF5812" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="5.5" cy="8.5" r="2.5" stroke="#FF5812" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Right person (behind) */}
              <path d="M17 19v-2a3 3 0 0 0-2.3-2.9" stroke="#FF5812" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="18.5" cy="8.5" r="2.5" stroke="#FF5812" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Center person (front) */}
              <path d="M12 14.5c-3.2 0-5.5 2-5.5 4.5v1h11v-1c0-2.5-2.3-4.5-5.5-4.5z" stroke="#FF5812" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="9" r="3.5" stroke="#FF5812" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-white/80">
            CLIENT-FACING
          </span>
          <span className="mt-1 text-[11px] font-medium text-white/95">
            100% Your Brand
          </span>
        </div>
        
        <div 
          className="flex flex-col items-center rounded-[14px] border border-white/[0.08] p-4 pt-5 pb-5 text-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,88,18,0.06) 0%, rgba(255,88,18,0.01) 100%)",
          }}
        >
          {/* Shield Check Icon */}
          <div className="mb-3">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#FF5812" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" stroke="#FF5812" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-white/80">
            DELIVERY LAYER
          </span>
          <span className="mt-1 text-[11px] font-medium text-white/95">
            Softree — Invisible
          </span>
        </div>
      </div>

      {/* Workflow row: Design → Develop → Test → Deliver */}
      <div className="mt-3 flex items-center justify-between rounded-[14px] border border-white/[0.06] bg-white/[0.02] p-3 px-5">
        {[
          { label: "Design", icon: "pencil" },
          { label: "Develop", icon: "code" },
          { label: "Test", icon: "check" },
          { label: "Deliver", icon: "rocket" },
        ].map((step, i, arr) => (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div 
                className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#FF5812]/30 shadow-[0_0_12px_rgba(255,88,18,0.15)]"
                style={{
                  background: "linear-gradient(180deg, rgba(255,88,18,0.15) 0%, rgba(255,88,18,0.05) 100%)"
                }}
              >
                <WorkflowIcon name={step.icon} />
              </div>
              <span className="text-[11px] font-semibold text-white/90">{step.label}</span>
            </div>
            {i !== arr.length - 1 && (
              <span className="mx-2 mb-[16px] block h-1 w-1 rounded-full bg-[#FF5812] opacity-80" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowIcon({ name }: { name: string }) {
  const props = {
    className: "h-5 w-5 text-[#FF5812]",
    strokeWidth: 1.5,
  };
  
  if (name === "pencil") return <Leaf {...props} />;
  if (name === "code") return <Code {...props} />;
  if (name === "check") return <Bug {...props} />;
  if (name === "rocket") return <Rocket {...props} />;
  
  return null;
}

function AzureIcon() {
  return (
    <img src="/logo/azure.png" alt="Azure" className="h-[18px] w-[18px] object-contain" />
  );
}

function PowerPlatformIcon() {
  return (
    <img src="/logo/power.png" alt="Power Platform" className="h-[18px] w-[18px] object-contain" />
  );
}

function M365Icon() {
  return (
    <img src="/logo/m365.png" alt="Microsoft 365" className="h-[18px] w-[18px] object-contain" />
  );
}

function CopilotIcon() {
  return (
    <img src="/logo/copilot.png" alt="Copilot" className="h-[18px] w-[18px] object-contain" />
  );
}

function MsLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16">
      <path fill="#f35325" d="M1 1h10v10H1z" />
      <path fill="#81bc06" d="M12 1h10v10H12z" />
      <path fill="#05a6f0" d="M1 12h10v10H1z" />
      <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
  );
}

function EnterpriseGlassPanel() {
  return (
    <div className={GLASS_DARK}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A3D95D]">
          MICROSOFT PARTNER
        </span>
        <GlassDots />
      </div>

      {/* Microsoft Solutions Partner row */}
      <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white">
          <MsLogoIcon />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-white">Microsoft Solutions Partner</p>
          <p className="text-[9px] text-white/55">Power Platform · Azure · AI</p>
        </div>
      </div>

      {/* Metrics row */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] py-2">
          <p className="text-[17px] font-bold tabular-nums tracking-[-0.03em] text-white">120+</p>
          <p className="mt-0.5 text-[7px] font-medium uppercase tracking-[0.08em] text-white/55 leading-tight px-1">Specialists</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] py-2">
          <p className="text-[17px] font-bold tabular-nums tracking-[-0.03em] text-white">97%</p>
          <p className="mt-0.5 text-[7px] font-medium uppercase tracking-[0.08em] text-white/55 leading-tight px-1">On-time delivery</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] py-2">
          <p className="text-[17px] font-bold tabular-nums tracking-[-0.03em] text-white">24/7</p>
          <p className="mt-0.5 text-[7px] font-medium uppercase tracking-[0.08em] text-white/55 leading-tight px-1">Support &amp; Monitoring</p>
        </div>
      </div>

      {/* Technology row */}
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        <div className="flex flex-col items-center gap-1 rounded-lg border border-white/8 bg-white/[0.03] py-1.5 px-0.5">
          <div className="flex h-5 w-5 items-center justify-center"><AzureIcon /></div>
          <span className="text-[7px] font-medium text-white/55 text-center leading-tight">Azure</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-lg border border-white/8 bg-white/[0.03] py-1.5 px-0.5">
          <div className="flex h-5 w-5 items-center justify-center"><PowerPlatformIcon /></div>
          <span className="text-[7px] font-medium text-white/55 text-center leading-tight">Power Platform</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-lg border border-white/8 bg-white/[0.03] py-1.5 px-0.5">
          <div className="flex h-5 w-5 items-center justify-center"><M365Icon /></div>
          <span className="text-[7px] font-medium text-white/55 text-center leading-tight">Microsoft 365</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-lg border border-white/8 bg-white/[0.03] py-1.5 px-0.5">
          <div className="flex h-5 w-5 items-center justify-center"><CopilotIcon /></div>
          <span className="text-[7px] font-medium text-white/55 text-center leading-tight">Copilot &amp; AI</span>
        </div>
      </div>
    </div>
  );
}

export const ABOUT_US_GLASS_PILLARS: ClarityPillar[] = [
  {
    n: "1",
    title: "OFFSHORE BENCH",
    subtitle: "Scalable. Reliable. Cost-Effective.",
    body: "Access a pool of pre-vetted technical experts who integrate seamlessly with your team and workflows.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    scene: SCENE_OFFSHORE,
    Visual: GlobalMapGlassPanel,
  },
  {
    n: "2",
    title: "WHITE LABEL",
    subtitle: "Your Brand. Our Delivery.",
    body: "Deliver world-class solutions under your brand while we handle development, quality and delivery.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="7" y1="7" x2="7.01" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    scene: SCENE_WHITELABEL,
    Visual: WhiteLabelGlassPanel,
  },
  {
    n: "3",
    title: "AGENTIC AI &\nMICROSOFT ECOSYSTEM",
    subtitle: "Intelligent. Integrated. Future-Ready.",
    body: "Build intelligent solutions with Agentic AI powered by Microsoft Cloud, Data, and AI services.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3c-3.87 0-7 3.13-7 7 0 1.76.66 3.37 1.74 4.58a6.97 6.97 0 0 0-1.74 4.42v1h14v-1a6.97 6.97 0 0 0-1.74-4.42A6.97 6.97 0 0 0 19 10c0-3.87-3.13-7-7-7z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 16.5c0 1.66 1.34 3 3 3s3-1.34 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="11" r="2" stroke="white" strokeWidth="1.5"/>
        <path d="M12 7v2M8.5 9.5l1.5 1M15.5 9.5l-1.5 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    scene: SCENE_ENTERPRISE,
    Visual: EnterpriseGlassPanel,
  },
];

const cardGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.loose, delayChildren: 0.12 } },
};

const cardScaleIn = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

type AboutUsGlassPillarsProps = {
  /** Compact copy + links under each card */
  showCopy?: boolean;
  className?: string;
};

export function AboutUsGlassPillars({
  showCopy = false,
  className = "",
}: AboutUsGlassPillarsProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(scopeRef, VIEWPORT.default);
  useClarityCardParallax(scopeRef);

  return (
    <div ref={scopeRef} className={className}>
      <motion.div
        variants={cardGroup}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-8 overflow-visible md:grid-cols-3 md:gap-6 lg:gap-8"
      >
        {ABOUT_US_GLASS_PILLARS.map((pillar, index) => (
          <motion.div
            key={pillar.n}
            variants={cardScaleIn}
            transition={{ duration: DUR.panel, ease: EASE_T.silk }}
            className="flex min-w-0 flex-col"
          >
            <ClarityGlassCard
              pillar={pillar}
              index={index}
              className="mx-0 w-full max-w-none"
            />
            {showCopy ? (
              <div className="mt-6 flex flex-col px-0.5 md:mt-8">
                <span
                  className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#0a0a1a]/10 bg-white/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a0a1a]/65 tabular-nums"
                  aria-hidden
                >
                  <span className="block h-1 w-1 rounded-full bg-[#FF5812] opacity-80" />
                  {pillar.n.padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-balance text-[16px] font-semibold leading-[1.28] tracking-[-0.02em] text-[#0a0a1a] md:text-[17px]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.65] text-[#0a0a1a]/68 md:text-[14px]">
                  {pillar.body}
                </p>
                <Link
                  href="/about-us"
                  className="mt-4 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold text-[#0a0a1a] transition hover:text-[#FF5812]"
                >
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : null}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
