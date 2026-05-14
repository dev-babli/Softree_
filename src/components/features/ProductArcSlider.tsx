"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const BASE_CARDS = [
  {
    id: "security-governance",
    title: "Security & Governance",
    description: "Enterprise-grade controls, compliance practices, access management, and delivery governance integrated into every engagement.",
    tag: "CAPABILITY",
    bgColor: "#FFFFFF",
    textColor: "#141413",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "documentation-discipline",
    title: "Documentation Discipline",
    description: "Structured documentation, knowledge transfer, and maintainable engineering practices designed for long-term continuity.",
    tag: "CAPABILITY",
    bgColor: "#141413",
    textColor: "#ffffff",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "scalable-architecture",
    title: "Scalable Architecture",
    description: "Modern architectures engineered for performance, extensibility, and future business growth.",
    tag: "CAPABILITY",
    bgColor: "#F3F0EE",
    textColor: "#141413",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "cross-team-collaboration",
    title: "Cross-Team Collaboration",
    description: "Transparent communication and coordinated execution across stakeholders, engineering teams, and business units.",
    tag: "CAPABILITY",
    bgColor: "#FF5812",
    textColor: "#ffffff",
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ai-enhanced-productivity",
    title: "AI-Enhanced Productivity",
    description: "AI-assisted workflows that accelerate development, automation, testing, and operational efficiency.",
    tag: "CAPABILITY",
    bgColor: "#141413",
    textColor: "#ffffff",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "transparent-delivery",
    title: "Transparent Delivery",
    description: "Clear sprint visibility, milestone tracking, reporting, and accountability throughout the delivery lifecycle.",
    tag: "CAPABILITY",
    bgColor: "#F3F0EE",
    textColor: "#141413",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800"
  }
];

const TOTAL_CARDS = 18;
const DEG_PER_CARD = 360 / TOTAL_CARDS;

const CARDS = Array.from({ length: TOTAL_CARDS }).map((_, i) => {
  const baseCard = BASE_CARDS[i % BASE_CARDS.length];
  return {
    ...baseCard,
    uniqueId: `${baseCard.id}-${i}`,
    angle: i * DEG_PER_CARD,
  };
});

const PILLS = BASE_CARDS.map(c => c.title);

type SizeConfig = {
  radius: number;
  cardWidth: number;
  cardHeight: number;
  sectionHeight: number;
  carouselTop: string;
  circleTop: string;
  panSensitivity: number;
  cardPadding: string;
  cardRadius: string;
  titleSize: string;
  descSize: string;
  btnPx: string;
  btnPy: string;
  btnText: string;
};

const SIZES: Record<"sm" | "md" | "lg", SizeConfig> = {
  sm: {
    radius: 900,
    cardWidth: 260,
    cardHeight: 400,
    sectionHeight: 780,
    carouselTop: "300px",
    circleTop: "180px",
    panSensitivity: 0.12,
    cardPadding: "24px",
    cardRadius: "24px",
    titleSize: "18px",
    descSize: "13px",
    btnPx: "px-5",
    btnPy: "py-2",
    btnText: "text-[12px]",
  },
  md: {
    radius: 1400,
    cardWidth: 340,
    cardHeight: 520,
    sectionHeight: 960,
    carouselTop: "380px",
    circleTop: "220px",
    panSensitivity: 0.08,
    cardPadding: "32px",
    cardRadius: "28px",
    titleSize: "22px",
    descSize: "14px",
    btnPx: "px-7",
    btnPy: "py-2.5",
    btnText: "text-[13px]",
  },
  lg: {
    radius: 2000,
    cardWidth: 440,
    cardHeight: 660,
    sectionHeight: 1140,
    carouselTop: "480px",
    circleTop: "260px",
    panSensitivity: 0.05,
    cardPadding: "40px",
    cardRadius: "32px",
    titleSize: "28px",
    descSize: "15px",
    btnPx: "px-8",
    btnPy: "py-3",
    btnText: "text-[14px]",
  },
};

function useBreakpoint(): "sm" | "md" | "lg" {
  const [bp, setBp] = useState<"sm" | "md" | "lg">("lg");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "sm" : w < 1024 ? "md" : "lg");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

export default function ProductArcSlider() {
  const bp = useBreakpoint();
  const sz = SIZES[bp];
  const radius = sz.radius;
  const diameter = radius * 2;
  const cardWidth = sz.cardWidth;
  const cardHeight = sz.cardHeight;

  const rotationMV = useMotionValue(0);
  const smoothRotation = useSpring(rotationMV, { damping: 50, stiffness: 200 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = rotationMV.onChange((val) => {
      const targetAngle = -val;
      let idx = Math.round(targetAngle / DEG_PER_CARD) % TOTAL_CARDS;
      if (idx < 0) idx += TOTAL_CARDS;
      setActiveIndex(idx % BASE_CARDS.length);
    });
    return unsubscribe;
  }, [rotationMV]);

  const handlePillClick = (idx: number) => {
    const currentRot = rotationMV.get();
    const targetBase = -idx * DEG_PER_CARD;
    const diff = ((targetBase - currentRot) % 360 + 360) % 360;
    const shortestDiff = diff > 180 ? diff - 360 : diff;
    rotationMV.set(currentRot + shortestDiff);
  };

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      rotationMV.set(rotationMV.get() - DEG_PER_CARD);
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered, rotationMV]);

  const handlePan = (e: any, info: any) => {
    // Unbounded rotation for infinite looping
    const newRot = rotationMV.get() + info.delta.x * sz.panSensitivity;
    rotationMV.set(newRot);
  };

  return (
    <section
      className="relative w-full bg-[#0a0a0a] pt-16 sm:pt-20 md:pt-32 pb-0 overflow-visible touch-none z-30"
      style={{ height: `${sz.sectionHeight}px` }}
    >
      <div className="absolute left-1/2 -translate-x-1/2 w-[1600px] pointer-events-none opacity-20 z-0" style={{ top: sz.circleTop }}>
        <img
          src="https://osmo.b-cdn.net/website/svg/product-slider-circle-deco.svg"
          alt=""
          className="w-full h-auto"
        />
      </div>

      <div className="relative z-30 mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12 pointer-events-none">
        {/* ── Text row: title left, subtitle right ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-16 mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-[clamp(26px,4vw,54px)] font-semibold leading-[1.06] tracking-[-0.025em] text-white max-w-[680px]">
            Built for global engineering partnerships
          </h2>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-white/45 leading-[1.65] max-w-[380px] md:text-right shrink-0">
            Access everything with a single partnership — offshore scalability, enterprise engineering, and AI-driven delivery.
          </p>
        </div>

        {/* ── Nav pills ── */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pointer-events-auto">
          {PILLS.map((pill, idx) => (
            <button
              key={pill}
              onClick={() => handlePillClick(idx)}
              className={`whitespace-nowrap px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[12px] sm:text-[14px] font-medium tracking-[-0.01em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${idx === activeIndex
                ? "bg-white text-[#0a0a0a] shadow-[0_2px_12px_rgba(255,255,255,0.12)]"
                : "bg-white/6 text-white/60 hover:bg-white/10 hover:text-white/80"
                }`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        onPan={handlePan}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing"
        style={{ top: bp === "sm" ? "320px" : bp === "md" ? "380px" : "420px", overflow: "visible" }}
      >
        <motion.div
          style={{
            width: diameter,
            height: diameter,
            rotate: smoothRotation,
            position: "absolute",
            left: "50%",
            top: sz.carouselTop,
            x: "-50%",
          }}
          className="pointer-events-none"
        >
          {CARDS.map((card) => (
            <div
              key={card.uniqueId}
              className="absolute top-0 left-0 w-full h-full"
              style={{ transform: `rotate(${card.angle}deg)` }}
            >
              <div
                className="absolute flex flex-col items-center text-center pointer-events-auto transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.015]"
                style={{
                  top: `-${cardHeight / 2}px`,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  borderRadius: sz.cardRadius,
                  padding: sz.cardPadding,
                  boxShadow: "0 24px 48px -12px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06) inset"
                }}
              >
                {/* Tag */}
                <div
                  className="text-[10px] font-semibold tracking-[0.12em] uppercase mb-auto px-3 py-1.5 rounded-full border border-current/10"
                  style={{ opacity: 0.6 }}
                >
                  {card.tag}
                </div>

                {/* Icon + Title + Description */}
                <div className="flex flex-col items-center mt-auto mb-auto">
                  <div className={`${bp === "sm" ? "mb-3 text-xl" : "mb-5 text-3xl"} opacity-40`}>✳</div>
                  <h3 style={{ fontSize: sz.titleSize }} className="font-semibold tracking-[-0.02em] leading-[1.1] mb-3 sm:mb-4">
                    {card.title}
                  </h3>
                  <p style={{ fontSize: sz.descSize }} className="leading-[1.6] max-w-[260px] opacity-55">
                    {card.description}
                  </p>
                </div>

                {/* Image */}
                <div className="w-full flex-1 min-h-0 rounded-[12px] overflow-hidden mt-auto relative pointer-events-none">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${card.image}')` }}
                  />
                </div>

                {/* CTA */}
                <div className="mt-auto pt-4 sm:pt-6">
                  <button className={`${sz.btnPx} ${sz.btnPy} rounded-full font-medium ${sz.btnText} tracking-[-0.01em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] active:scale-[0.98] ${card.textColor === "#ffffff" ? "bg-white text-[#111] shadow-[0_2px_8px_rgba(255,255,255,0.1)]" : "bg-[#141413] text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]"}`}>
                    Discover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
