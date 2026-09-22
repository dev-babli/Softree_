"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SOFTREE_DELIVERY_HUBS, type SoftreeDeliveryHub } from "@/data/softree-delivery-hubs";
import { latLonToFdaMapPercent } from "@/lib/world-map-projection";
import FdaWorldMapSvg from "@/components/sections/FdaWorldMapSvg";
import "./fda-maps.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ASSET = "/showcase/fda";
const HUBS = SOFTREE_DELIVERY_HUBS;
const REGIONS = ["All Markets", "Americas", "Europe", "Middle East", "Asia Pacific"] as const;
type RegionFilter = (typeof REGIONS)[number];

type MarkerRefs = {
  wrapper: HTMLElement;
  map: HTMLElement;
  details: HTMLElement;
  icon: HTMLElement;
  iconV2: HTMLElement;
};

function LocationMarker({
  hub,
  index,
  embedded,
  onSelect,
}: {
  hub: SoftreeDeliveryHub;
  index: number;
  embedded?: boolean;
  onSelect?: (index: number) => void;
}) {
  const pos = latLonToFdaMapPercent(hub.lat, hub.lon);
  const leftPercent = parseFloat(pos.left);
  const topPercent = parseFloat(pos.top);

  const horizontalClass =
    leftPercent < 22
      ? "fda-map-details--edge-left"
      : leftPercent > 78
      ? "fda-map-details--edge-right"
      : "";

  const verticalClass =
    topPercent < 48
      ? "fda-map-details--below"
      : "fda-map-details--above";

  const placementClass = `${horizontalClass} ${verticalClass}`.trim();

  return (
    <div
      className={`fda-location-icon-wrapper${embedded ? " fda-location-icon-wrapper--interactive" : ""}`}
      data-hub-id={hub.id}
      style={{ left: pos.left, top: pos.top }}
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(index)}
      onMouseEnter={() => onSelect?.(index)}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(index);
        }
      }}
      aria-label={`${hub.partnerName} - ${hub.city}, ${hub.country}`}
    >
      <div className="fda-map-location">
        {/* ── RESPONSIVE ORANGE PARTNER CARD ── */}
        <div
          className={`fda-map-details ${placementClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Row: Partner Logo + Partner Type */}
          <div className="flex items-center justify-between gap-2.5 mb-2.5">
            {hub.logo ? (
              <div className="h-10 sm:h-11 w-auto max-w-[130px] px-3 py-1 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0 border border-white/20">
                <img
                  src={hub.logo}
                  alt={hub.partnerName}
                  className="h-full w-auto max-h-[30px] sm:max-h-[32px] max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ) : (
              <div />
            )}
            <span className="text-[11px] sm:text-[11.5px] font-bold text-white bg-black/35 px-2.5 py-1 rounded-full border border-white/25 shrink-0 whitespace-nowrap">
              {hub.partnerType}
            </span>
          </div>

          {/* Partner Name + City, Country */}
          <div className="mb-2">
            <div className="text-white font-extrabold text-[15px] sm:text-[16px] leading-snug">
              {hub.partnerName}
            </div>
            <div className="text-white/95 text-[12.5px] sm:text-[13px] font-medium mt-0.5">
              {hub.city}, {hub.country}
            </div>
          </div>

          {/* Areas of Collaboration */}
          <div className="text-[12px] sm:text-[12.5px] leading-snug text-white border-t border-white/25 pt-1.5 mt-1">
            <span className="font-bold text-white/90">Areas: </span>
            <span className="font-medium text-white">{hub.areasOfCollaboration.join(" · ")}</span>
          </div>
        </div>

        {/* Pin Icons */}
        <div className="fda-location-icon">
          <img width={46} height={67} alt="" src={`${ASSET}/location.svg`} loading="lazy" />
        </div>
        <div className="fda-location-icon-v2">
          <img width={46} height={67} alt="" src={`${ASSET}/location-purple.svg`} loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export default function FdaMapsSection({ embedded = false }: { embedded?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeHub, setActiveHub] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>("All Markets");

  const currentHub = HUBS[activeHub] ?? HUBS[0];

  const handleRegionChange = (region: RegionFilter) => {
    setSelectedRegion(region);
    if (region === "All Markets") return;
    const firstHubIndex = HUBS.findIndex((h) => h.region === region);
    if (firstHubIndex !== -1) {
      setActiveHub(firstHubIndex);
    }
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const markers: MarkerRefs[] = HUBS.map((hub) => {
        const wrapper = section.querySelector<HTMLElement>(`[data-hub-id="${hub.id}"]`);
        return {
          wrapper: wrapper!,
          map: wrapper?.querySelector<HTMLElement>(".fda-map-location")!,
          details: wrapper?.querySelector<HTMLElement>(".fda-map-details")!,
          icon: wrapper?.querySelector<HTMLElement>(".fda-location-icon")!,
          iconV2: wrapper?.querySelector<HTMLElement>(".fda-location-icon-v2")!,
        };
      }).filter((m) => m.wrapper && m.map && m.details && m.icon && m.iconV2);

      const applyWeights = (weights: number[]) => {
        markers.forEach((m, i) => {
          const weight = weights[i] ?? 0;
          const scale = 0.55 + weight * 0.45;
          gsap.set(m.wrapper, { zIndex: weight > 0.35 ? 10 : 2 + i });
          gsap.set(m.map, { scale });
          gsap.set(m.details, {
            opacity: weight,
            visibility: weight > 0.08 ? "visible" : "hidden",
          });
          gsap.set(m.icon, { opacity: 1 - weight });
          gsap.set(m.iconV2, { opacity: weight });
        });
      };

      const weightsFromProgress = (progress: number) => {
        const count = markers.length;
        if (count <= 1) return [1];

        const scaled = progress * (count - 1);
        const from = Math.floor(scaled);
        const to = Math.min(count - 1, from + 1);
        const blend = scaled - from;

        return markers.map((_, i) => {
          if (from === to) return i === from ? 1 : 0;
          if (i === from) return 1 - blend;
          if (i === to) return blend;
          return 0;
        });
      };

      const applyActiveIndex = (index: number) => {
        applyWeights(markers.map((_, i) => (i === index ? 1 : 0)));
      };

      if (embedded) {
        applyActiveIndex(activeHub);
        return;
      }

      if (reduced) {
        applyActiveIndex(0);
        return;
      }

      applyWeights(weightsFromProgress(0));

      const scrollEnd = `+=${Math.max(320, HUBS.length * 55)}%`;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: scrollEnd,
        pin: true,
        pinSpacing: true,
        scrub: 0.85,
        anticipatePin: 1,
        snap: {
          snapTo: (value) => {
            const step = 1 / (markers.length - 1);
            return Math.round(value / step) * step;
          },
          duration: { min: 0.2, max: 0.55 },
          delay: 0.04,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const eased = gsap.parseEase("power2.inOut")(self.progress);
          applyWeights(weightsFromProgress(eased));
        },
      });

      gsap.from(section.querySelector(".fda-sub-heading-custom"), {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reverse" },
      });

      gsap.from(section.querySelector(".fda-gap-off"), {
        y: 30,
        opacity: 0,
        duration: 0.85,
        delay: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reverse" },
      });
    },
    { scope: sectionRef, dependencies: [embedded, activeHub] }
  );

  return (
    <section
      ref={sectionRef}
      className={`fda-maps fda-overflow-hidden${embedded ? " fda-maps--embedded" : ""}`}
    >
      <div className="fda-container">
        <div className="fda-maps-main">

          {/* ══════════════════════════════════════════════
              TOP HEADER SECTION
             ══════════════════════════════════════════════ */}
          <div className="fda-maps-heading fda-text-align-center">
            {/* Eyebrow: GLOBAL PARTNER NETWORK */}
            <div className="fda-sub-heading-custom group relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#f97316]/35 bg-gradient-to-r from-[#f97316]/15 via-white/[0.04] to-transparent backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_0_24px_rgba(249,115,22,0.2)] hover:border-[#f97316]/60 transition-all duration-300 cursor-default select-none">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f97316] opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f97316] shadow-[0_0_10px_#f97316,0_0_4px_#fb923c]" />
              </span>
              <span className="font-mono text-xs font-bold tracking-[0.24em] text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-[#fb923c] uppercase">
                GLOBAL PARTNER NETWORK
              </span>
            </div>

            {/* Heading: Our Global Technology Partners */}
            <h2 className="fda-gap-off">
              Our Global Technology Partners
            </h2>

            {/* Description Paragraph */}
            <p className="fda-maps-lede">
              We collaborate with technology and delivery partners across key markets, extending our capabilities and helping clients access the right engineering expertise.
            </p>
          </div>

          {/* ══════════════════════════════════════════════
              MAP SECTION: SUBHEADER & REGION EXPLORATION + MAP
             ══════════════════════════════════════════════ */}
          <div className="flex flex-col gap-3 sm:gap-4 w-full">
            {/* Region Exploration Tab Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-4 sm:px-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5812] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff5812] shadow-[0_0_8px_#ff5812]" />
                </span>
                <div>
                  <div className="text-[15px] sm:text-[16px] font-bold text-white tracking-wide uppercase">
                    Global Partner Locations
                  </div>
                  <div className="text-[13px] sm:text-[13.5px] text-slate-400 mt-0.5">
                    Explore our partner network
                  </div>
                </div>
              </div>

              {/* Region Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1 shrink-0">
                {REGIONS.map((region) => {
                  const isSelected = selectedRegion === region;
                  return (
                    <button
                      key={region}
                      type="button"
                      onClick={() => handleRegionChange(region)}
                      className={`px-3.5 py-1.5 rounded-full text-[13px] sm:text-[13.5px] font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? "bg-[#ff5812] text-white shadow-[0_0_12px_rgba(255,88,18,0.45)]"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10"
                      }`}
                    >
                      {region}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* INTERACTIVE WORLD MAP */}
            <div className="fda-location">
              <div className="fda-location-map">
                <FdaWorldMapSvg />
              </div>

              {HUBS.map((hub, index) => (
                <LocationMarker
                  key={hub.id}
                  hub={hub}
                  index={index}
                  embedded={embedded}
                  onSelect={setActiveHub}
                />
              ))}
            </div>
          </div>

          {/* Mobile Active Partner Card (Dedicated Touch Friendly View) */}
          <div className="md:hidden rounded-2xl border border-white/25 bg-gradient-to-r from-[#ff5812] to-[#ff7a3d] p-4 sm:p-5 shadow-[0_12px_28px_rgba(255,88,18,0.32)] text-left mt-4">
            {/* Header Row: Partner Logo + Partner Type */}
            <div className="flex items-center justify-between gap-2.5 mb-2.5">
              {currentHub.logo && (
                <div className="h-10 sm:h-11 w-auto max-w-[130px] px-3 py-1 rounded-xl bg-white flex items-center justify-center shadow-sm border border-white/20 shrink-0">
                  <img
                    src={currentHub.logo}
                    alt={currentHub.partnerName}
                    className="h-full w-auto max-h-[30px] sm:max-h-[32px] max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              )}
              <span className="text-[11px] sm:text-[11.5px] font-bold text-white bg-black/35 px-2.5 py-1 rounded-full border border-white/25 whitespace-nowrap shrink-0">
                {currentHub.partnerType}
              </span>
            </div>

            {/* Partner Details */}
            <div className="mb-2">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-white/90 font-bold block mb-0.5">
                Active Partner
              </span>
              <h4 className="text-[16.5px] sm:text-[17.5px] font-extrabold text-white leading-snug">
                {currentHub.partnerName}
              </h4>
              <p className="text-[13px] sm:text-[13.5px] text-white/95 mt-0.5">
                {currentHub.city}, {currentHub.country}
              </p>
            </div>

            <div className="mt-2 text-white/95 border-t border-white/25 pt-2">
              <span className="text-white/90 font-bold text-[11.5px] uppercase tracking-wider block mb-0.5">
                Areas of Collaboration:
              </span>
              <span className="text-[12.5px] sm:text-[13px] leading-snug font-medium">{currentHub.areasOfCollaboration.join(" · ")}</span>
            </div>
          </div>

       

          {/* ══════════════════════════════════════════════
              BOTTOM SECTION: CONNECTED PARTNER ECOSYSTEM (COMPACT ORANGE)
             ══════════════════════════════════════════════ */}
          <div className="relative mt-0 sm:mt-1 rounded-3xl border border-[#ff5812]/30 bg-gradient-to-b from-[#ff5812]/[0.06] via-zinc-950/90 to-black py-6 px-6 sm:py-8 sm:px-10 backdrop-blur-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(255,88,18,0.12)]">
            {/* Ambient orange glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#ff5812]/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-[#ff5812]/10 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
              {/* Highlight Strip: All 3 Pills in Orange */}
              <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ff5812]/40 bg-[#ff5812]/15 text-[#ffa066] text-[13px] sm:text-[14px] font-semibold tracking-wide shadow-[0_0_12px_rgba(255,88,18,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5812] shadow-[0_0_6px_#ff5812]" />
                  Technology collaboration
                </span>
                <span className="text-[#ff5812]/50 hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ff5812]/40 bg-[#ff5812]/15 text-[#ffa066] text-[13px] sm:text-[14px] font-semibold tracking-wide shadow-[0_0_12px_rgba(255,88,18,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5812] shadow-[0_0_6px_#ff5812]" />
                  Delivery support
                </span>
                <span className="text-[#ff5812]/50 hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ff5812]/40 bg-[#ff5812]/15 text-[#ffa066] text-[13px] sm:text-[14px] font-semibold tracking-wide shadow-[0_0_12px_rgba(255,88,18,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5812] shadow-[0_0_6px_#ff5812]" />
                  Engineering expertise
                </span>
              </div>

              {/* Heading */}
              <h3 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-white tracking-[-0.025em] leading-[1.2] mb-2.5 sm:mb-3">
                A Connected Partner Ecosystem for Global Delivery
              </h3>

              {/* Paragraph */}
              <p className="text-slate-200 text-[15px] sm:text-[16px] leading-relaxed max-w-2xl">
                Our global partner network helps us extend capabilities, strengthen delivery, and support clients across markets.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
