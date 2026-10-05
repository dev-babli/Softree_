"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowLeftRight,
  ArrowRight,
  ClipboardCheck,
  Package,
  Radar,
  ShieldCheck,
  Truck,
  Warehouse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import TrustStrip from "@/components/sections/TrustStrip";
import { prefersReducedMotion } from "@/lib/motion";

const TEST_NODES: {
  label: string;
  detail: string;
  icon: LucideIcon;
  position: string;
  target: { x: number; y: number };
}[] = [
  {
    label: "TMS",
    detail: "Dispatch & rating",
    icon: Truck,
    position: "left-[2%] top-[8%]",
    target: { x: 88, y: 72 },
  },
  {
    label: "WMS",
    detail: "Pick, pack, inventory",
    icon: Warehouse,
    position: "right-[2%] top-[8%]",
    target: { x: 412, y: 72 },
  },
  {
    label: "EDI",
    detail: "214 · 856 · 210",
    icon: ArrowLeftRight,
    position: "left-[0%] top-[52%]",
    target: { x: 74, y: 268 },
  },
  {
    label: "Visibility",
    detail: "ETA & exceptions",
    icon: Radar,
    position: "right-[0%] top-[52%]",
    target: { x: 426, y: 268 },
  },
  {
    label: "Warehouse",
    detail: "Automation flows",
    icon: Package,
    position: "left-[20%] bottom-[8%]",
    target: { x: 250, y: 412 },
  },
];

const CAPABILITIES = [
  { title: "TMS & WMS Testing", detail: "Dispatch, inventory, and warehouse workflows" },
  { title: "EDI & API Validation", detail: "Carrier, ERP, and integration payloads" },
  { title: "Performance & Load", detail: "Peak shipping and receiving windows" },
  { title: "Security Testing", detail: "Portals, access control, and data privacy" },
  { title: "Test Automation", detail: "Regression, CI/CD, and release confidence" },
] as const;

export default function LogisticsTestingHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current || prefersReducedMotion()) return;

      const connectors =
        gsap.utils.toArray<SVGPathElement>(".lt-hero-connector");
      const nodes = gsap.utils.toArray<HTMLElement>(".lt-hero-node");

      connectors.forEach((connector) => {
        const length = connector.getTotalLength();
        gsap.set(connector, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .from(".lt-hero-copy", { opacity: 0, y: 22, duration: 0.7, stagger: 0.08 }, 0.08)
        .from(".lt-hero-visual", { opacity: 0, scale: 0.96, duration: 0.9 }, 0.18)
        .from(".lt-hero-core", { opacity: 0, scale: 0.86, duration: 0.7 }, 0.32)
        .from(nodes, { opacity: 0, scale: 0.82, duration: 0.5, stagger: 0.1 }, 0.42)
        .to(connectors, { strokeDashoffset: 0, duration: 0.8, stagger: 0.1, ease: "power2.inOut" }, 0.7)
        .from(".lt-hero-status", { opacity: 0, y: 12, duration: 0.55 }, 1.05)
        .from(".lt-hero-chip", { opacity: 0, y: 14, duration: 0.5, stagger: 0.06 }, 1.15);

      gsap.to(".lt-hero-core", {
        y: -6,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".lt-hero-orbit", {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      nodes.forEach((node, index) => {
        gsap.to(node, {
          y: index % 2 === 0 ? -5 : 5,
          duration: 2.8 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.4 + index * 0.1,
        });
      });

      gsap.to(".lt-hero-status-dot", {
        opacity: 0.35,
        scale: 0.7,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      aria-labelledby="logistics-testing-hero-title"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#020713] pb-4 pt-[104px] font-sans text-white md:pt-[112px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(255,107,26,0.16),transparent_28%),radial-gradient(circle_at_28%_62%,rgba(20,110,255,0.14),transparent_26%),linear-gradient(115deg,#020713_0%,#071221_55%,#020611_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(91,144,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(91,144,255,0.16)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#ff6b1a]/10 blur-[110px]" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[#1360ff]/12 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8 xl:gap-12">
          <div className="max-w-[640px]">
            <div className="lt-hero-copy mb-5 flex items-center gap-3">
              <span className="h-[3px] w-8 rounded-full bg-[#ff6b1a]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff7a24] sm:text-xs">
                Logistics Testing Services
              </span>
            </div>

            <h1
              id="logistics-testing-hero-title"
              className="lt-hero-copy font-['Plus_Jakarta_Sans',sans-serif] text-[clamp(2.2rem,3.4vw,3.75rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-white"
            >
              <span className="block">Validate Every Layer of</span>
              <span className="block">
                Your <span className="text-[#ff6b1a]">Logistics Systems</span>
              </span>
            </h1>

            <p className="lt-hero-copy mt-5 text-lg font-semibold text-[#d5deef] sm:text-xl">
              Your Offshore Logistics Software Testing & QA Partner
            </p>

            <p className="lt-hero-copy mt-4 max-w-[540px] text-[15px] leading-7 text-slate-400">
              Test TMS, WMS, warehouse automation, visibility platforms, and EDI
              integrations before they hit production. Softree validates
              dispatch, inventory, carrier data, APIs, performance, and security
              across the supply chain stack.
            </p>

            <div className="lt-hero-copy mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#ff6b00] px-6 text-sm font-semibold text-white shadow-[0_0_28px_rgba(255,107,0,0.32)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff7b22]"
              >
                Talk to Our Logistics Testing Team
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="#what-we-test"
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-[#ff7823]/70 bg-[#071326]/80 px-6 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0b1b32]"
              >
                Explore What We Test
                <ArrowRight className="h-4 w-4 text-[#ff7823] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

            <div className="lt-hero-visual relative mx-auto aspect-square w-full max-w-[500px]">
            <svg
              viewBox="0 0 500 500"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              aria-hidden
            >
              <defs>
                <linearGradient id="ltRoute" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ff6b1a" stopOpacity="0.25" />
                  <stop offset="0.5" stopColor="#7ec4ff" stopOpacity="0.95" />
                  <stop offset="1" stopColor="#ff6b1a" stopOpacity="0.3" />
                </linearGradient>
                <filter id="ltGlow">
                  <feGaussianBlur stdDeviation="3.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g fill="none" stroke="url(#ltRoute)" strokeWidth="1.8" filter="url(#ltGlow)">
                {TEST_NODES.map((node) => (
                  <path
                    key={node.label}
                    className="lt-hero-connector"
                    d={`M250 236 L${node.target.x} ${node.target.y}`}
                  />
                ))}
              </g>
              <ellipse
                cx="250"
                cy="428"
                rx="132"
                ry="28"
                fill="none"
                stroke="#ff7626"
                strokeOpacity="0.45"
                strokeWidth="1.8"
              />
            </svg>

            <div className="lt-hero-orbit absolute left-1/2 top-[47%] h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#53a4ff]/25 sm:h-[280px] sm:w-[280px]" />

            {TEST_NODES.map(({ label, detail, icon: Icon, position }) => (
              <div
                key={label}
                className={`lt-hero-node absolute ${position} z-20 flex min-w-[108px] items-center gap-2.5 rounded-2xl border border-white/10 bg-[#071325]/90 px-3 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-md`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#ff7a24]/30 bg-[#ff6b1a]/10 text-[#ff7a24]">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[12px] font-bold text-white">{label}</span>
                  <span className="block text-[10px] text-slate-400">{detail}</span>
                </span>
              </div>
            ))}

            <div className="lt-hero-core absolute left-1/2 top-[47%] z-10 flex h-[132px] w-[132px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#75c2ff]/70 bg-[radial-gradient(circle,rgba(27,131,255,0.95)_0%,rgba(18,42,140,0.94)_46%,rgba(3,13,35,0.98)_76%)] shadow-[0_0_34px_rgba(31,126,255,0.72)] sm:h-[150px] sm:w-[150px]">
              <div className="absolute inset-3 rounded-full border border-dashed border-white/25" />
              <div className="flex flex-col items-center">
                <ClipboardCheck className="h-8 w-8 text-white" strokeWidth={1.5} />
                <span className="mt-1 text-[13px] font-extrabold tracking-wide text-white">
                  QA HUB
                </span>
              </div>
            </div>

            <div className="lt-hero-status absolute bottom-[6%] right-[2%] z-30 flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-[#061922]/92 px-3.5 py-2.5 shadow-[0_0_25px_rgba(16,185,129,0.14)] backdrop-blur-xl">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
              <span>
                <span className="block text-[8px] font-medium uppercase tracking-[0.12em] text-slate-400">
                  Logistics QA Status
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-[12px] font-semibold text-emerald-300">
                  <span className="lt-hero-status-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Validated
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-white/10">
          {CAPABILITIES.map(({ title, detail }) => (
            <article key={title} className="lt-hero-chip flex flex-col gap-1 px-2 py-3 lg:px-4">
              <span className="text-[11px] font-semibold text-slate-100">{title}</span>
              <span className="text-[10px] leading-4 text-slate-500">{detail}</span>
            </article>
          ))}
        </div>
      </div>

      <div className="relative z-20 w-full pb-3 pt-2">
        <TrustStrip theme="dark" />
      </div>
    </section>
  );
}
