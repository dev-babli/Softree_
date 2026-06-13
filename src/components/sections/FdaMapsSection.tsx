"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SOFTREE_DELIVERY_HUBS } from "@/data/softree-delivery-hubs";
import { latLonToFdaMapPercent } from "@/lib/world-map-projection";
import FdaWorldMapSvg from "@/components/sections/FdaWorldMapSvg";
import "./fda-maps.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ASSET = "/showcase/fda";
const HUBS = SOFTREE_DELIVERY_HUBS;

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
  hub: (typeof HUBS)[number];
  index: number;
  embedded?: boolean;
  onSelect?: (index: number) => void;
}) {
  const pos = latLonToFdaMapPercent(hub.lat, hub.lon);

  return (
    <div
      className={`fda-location-icon-wrapper${embedded ? " fda-location-icon-wrapper--interactive" : ""}`}
      data-hub-id={hub.id}
      style={{ left: pos.left, top: pos.top }}
      {...(embedded
        ? {
            role: "button" as const,
            tabIndex: 0,
            onClick: () => onSelect?.(index),
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect?.(index);
              }
            },
            "aria-label": `${hub.city}, ${hub.country}`,
          }
        : {})}
    >
      <div className="fda-map-location">
        <div className="fda-map-details">
          <div className="fda-map-top">
            <div className="fda-text-color-white">
              {hub.city}, {hub.country}
            </div>
            <div className="fda-map-logo">
              <img
                src="/logo/Softree-Technology-Final-Logo.png"
                alt=""
                width={18}
                height={18}
                loading="lazy"
              />
            </div>
          </div>
          <div className="fda-map-bottom">
            <div>
              <div className="fda-map-card-small-text fda-text-color-white">{hub.label}</div>
              <div className="fda-text-style-h6 fda-text-color-white">{hub.detail}</div>
            </div>
            <div className="fda-map-shape">
              <img
                width={76}
                height={50}
                alt=""
                src={`${ASSET}/map-bottom-card-line.svg`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
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
          gsap.set(m.details, { opacity: weight, visibility: weight > 0.08 ? "visible" : "hidden" });
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

      gsap.from(section.querySelector(".fda-sub-heading"), {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reverse" },
      });

      gsap.from(section.querySelector(".fda-gap-off"), {
        y: 32,
        opacity: 0,
        duration: 0.9,
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
          <div className="fda-maps-heading fda-text-align-center">
            <div className="fda-sub-heading fda-sub-heading-gap">
              <div className="fda-sub-heading-icon">
                <img
                  width={14}
                  height={14}
                  alt=""
                  src={`${ASSET}/contact-subheading-icon.svg`}
                  loading="lazy"
                />
              </div>
              <div className="fda-sub-heading-text-wrap">
                <div className="fda-sub-heading-text fda-sub-heading-text-v2">Global delivery</div>
              </div>
            </div>
            <h2 className="fda-gap-off">
              Engineering teams anchored in the cities where you operate
            </h2>
            <p className="fda-maps-lede">
              Softree offices and verified client hubs across India, the Americas, Europe, the Middle
              East, and Asia Pacific — mapped to real coordinates, not region labels.
            </p>
          </div>

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

          {!embedded && (
            <p className="fda-maps-scroll-hint">Scroll to tour each delivery hub</p>
          )}
          {embedded && (
            <p className="fda-maps-scroll-hint fda-maps-scroll-hint--embedded">
              Tap a pin to view hub details
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
