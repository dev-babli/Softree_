import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionValueEvent } from "framer-motion";

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
    panSensitivity: 0.14,
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
    cardWidth: 320,
    cardHeight: 490,
    sectionHeight: 920,
    carouselTop: "380px",
    circleTop: "220px",
    panSensitivity: 0.10,
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
    cardWidth: 380,
    cardHeight: 560,
    sectionHeight: 1040,
    carouselTop: "480px",
    circleTop: "260px",
    panSensitivity: 0.08,
    cardPadding: "36px",
    cardRadius: "32px",
    titleSize: "26px",
    descSize: "14.5px",
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

function CardWrapper({
  card,
  smoothRotation,
  radius,
  cardWidth,
  cardHeight,
  sz,
  bp,
}: {
  card: any;
  smoothRotation: any;
  radius: number;
  cardWidth: number;
  cardHeight: number;
  sz: SizeConfig;
  bp: "sm" | "md" | "lg";
}) {
  const relativeAngle = useTransform(smoothRotation, (r: number) => {
    // Elegant infinite wrapping bounds
    const diff = ((card.angle - r) % 360 + 540) % 360 - 180;
    return diff;
  });

  // Calculate high-performance layout transforms using spring-smoothed angles
  const x = useTransform(relativeAngle, (diff: number) => {
    const rad = (diff * Math.PI) / 180;
    return Math.sin(rad) * radius;
  });

  const y = useTransform(relativeAngle, (diff: number) => {
    const rad = (diff * Math.PI) / 180;
    // Curves dip downwards on the sides
    return (1 - Math.cos(rad)) * radius;
  });

  const rotate = useTransform(relativeAngle, (diff: number) => {
    const tiltFactor = bp === "sm" ? 0.35 : bp === "md" ? 0.45 : 0.5;
    return diff * tiltFactor;
  });

  const scale = useTransform(relativeAngle, (diff: number) => {
    const absDiff = Math.abs(diff);
    // Standard scaling transition for non-active cards
    return Math.max(0.65, 1 - absDiff * 0.0045);
  });

  const opacity = useTransform(relativeAngle, (diff: number) => {
    const absDiff = Math.abs(diff);
    const fadeStart = bp === "sm" ? 18 : bp === "md" ? 22 : 26;
    const fadeRate = bp === "sm" ? 0.055 : bp === "md" ? 0.045 : 0.035;
    if (absDiff < fadeStart) return 1;
    return Math.max(0, 1 - (absDiff - fadeStart) * fadeRate);
  });

  const zIndex = useTransform(relativeAngle, (diff: number) => {
    return Math.round(100 - Math.abs(diff));
  });

  const display = useTransform(relativeAngle, (diff: number) => {
    // Hide totally invisible cards to conserve browser rendering capacity
    return Math.abs(diff) > 55 ? "none" : "flex";
  });

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex,
        display,
        width: cardWidth,
        height: cardHeight,
        position: "absolute",
        left: "50%",
        top: 0,
        marginLeft: -cardWidth / 2,
      }}
      className="pointer-events-none"
    >
      <div
        className="w-full h-full flex flex-col items-center text-center pointer-events-auto transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.015]"
        style={{
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
        <div className="w-full flex-1 min-h-0 rounded-[12px] overflow-hidden mt-auto mb-2 relative pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${card.image}')` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductArcSlider() {
  const bp = useBreakpoint();
  const sz = SIZES[bp];
  const cardWidth = sz.cardWidth;
  const cardHeight = sz.cardHeight;

  const [windowWidth, setWindowWidth] = useState(1200);
  useEffect(() => {
    const updateSize = () => {
      setWindowWidth(window.innerWidth);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Compute fully responsive radius ensuring perfect, non-overlapping spacing on any device width
  const radius = bp === "sm"
    ? Math.min(900, windowWidth * 1.3)
    : bp === "md"
      ? Math.min(1400, windowWidth * 1.15)
      : Math.min(2000, windowWidth * 1.05);

  const rotationMV = useMotionValue(0);
  const smoothRotation = useSpring(rotationMV, { damping: 50, stiffness: 200 });
  const [activeIndex, setActiveIndex] = useState(0);

  // Synchronize tab switching with the active spring animation for ultra-fluid feedback
  useMotionValueEvent(smoothRotation, "change", (val: number) => {
    const targetAngle = -val;
    let idx = Math.round(targetAngle / DEG_PER_CARD) % TOTAL_CARDS;
    if (idx < 0) idx += TOTAL_CARDS;
    setActiveIndex(idx % BASE_CARDS.length);
  });

  const handlePillClick = (idx: number) => {
    const currentRot = rotationMV.get();
    const currentCardIdx = Math.round(-currentRot / DEG_PER_CARD);
    
    // Find the closest card index on our infinite wheel that maps to this pill
    let bestCardIdx = idx;
    let minDistance = Infinity;
    
    for (let k = -3; k <= 3; k++) {
      const candidateIdx = idx + k * BASE_CARDS.length;
      const distance = Math.abs(candidateIdx - currentCardIdx);
      if (distance < minDistance) {
        minDistance = distance;
        bestCardIdx = candidateIdx;
      }
    }
    
    const targetRot = -bestCardIdx * DEG_PER_CARD;
    rotationMV.set(targetRot);
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
    const newRot = rotationMV.get() + info.delta.x * sz.panSensitivity;
    rotationMV.set(newRot);
  };

  const handlePanEnd = (e: any, info: any) => {
    const currentRot = rotationMV.get();
    // Snap cleanly to the nearest card on finger release
    const snappedRot = Math.round(currentRot / DEG_PER_CARD) * DEG_PER_CARD;
    rotationMV.set(snappedRot);
  };

  return (
    <section
      className="relative w-full bg-[#0a0a0a] pt-16 sm:pt-20 md:pt-32 pb-0 overflow-hidden touch-none z-30"
      style={{ height: `${sz.sectionHeight}px` }}
    >
      <div className="absolute left-1/2 -translate-x-1/2 w-[90vw] md:w-[1200px] lg:w-[1600px] pointer-events-none opacity-20 z-0" style={{ top: sz.circleTop }}>
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
        onPanEnd={handlePanEnd}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute inset-x-0 bottom-0 z-20 cursor-grab active:cursor-grabbing overflow-hidden"
        style={{
          top: bp === "sm" ? "290px" : bp === "md" ? "340px" : "380px",
          height: `${cardHeight + 80}px`
        }}
      >
        <div className="relative w-full h-full max-w-[1400px] mx-auto pointer-events-none">
          {CARDS.map((card) => (
            <CardWrapper
              key={card.uniqueId}
              card={card}
              smoothRotation={smoothRotation}
              radius={radius}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              sz={sz}
              bp={bp}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
