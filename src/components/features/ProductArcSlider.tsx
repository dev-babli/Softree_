"use client";

/**
 * ProductArcSlider — 1:1 clone of Osmo's `product-slider` arc carousel.
 *
 * Architecture (matches Osmo's HTML exactly):
 *   • `gsap-slider__list` is `position: relative` and its **height** equals the
 *     arc **radius** (e.g. Osmo uses 762.213px).
 *   • `gsap-slider__item` is absolutely positioned at `top:0; left:50%` with a
 *     transform of `translate(-50%, 0%) rotate(Xdeg)`.
 *   • The pivot is established via `transform-origin: 50% <radius>px`, which
 *     puts the rotation centre at the bottom of the list — far below each
 *     card. A single `rotate()` therefore swings the card along the arc
 *     AND tilts it visually in one move.
 *   • Native `cursor: grab/grabbing`, `user-select: none`, `touch-action: pan-y`
 *     are applied to the collection.
 *   • A floating "Drag" pill follows the pointer inside the slider zone
 *     (Osmo's `data-cursor-zone="neutral-600"`).
 *   • Auto-advances every 3.5s, pauses while the user is dragging.
 *   • Snaps to the nearest 20° step on release (matches `data-gsap-slider-rotate="20"`).
 *
 * Content (titles, descriptions, colours, images, copy) is preserved as-is
 * from the prior Softree implementation per request.
 */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   CONTENT  —  KEEP AS-IS
   ───────────────────────────────────────────────────────────────── */
const BASE_CARDS = [
  {
    id: "security-governance",
    title: "Security & Governance",
    description:
      "Enterprise-grade controls, compliance practices, access management, and delivery governance integrated into every engagement.",
    tag: "CAPABILITY",
    bgColor: "#FFFFFF",
    textColor: "#141413",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "documentation-discipline",
    title: "Documentation Discipline",
    description:
      "Structured documentation, knowledge transfer, and maintainable engineering practices designed for long-term continuity.",
    tag: "CAPABILITY",
    bgColor: "#141413",
    textColor: "#ffffff",
    image:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "scalable-architecture",
    title: "Scalable Architecture",
    description:
      "Modern architectures engineered for performance, extensibility, and future business growth.",
    tag: "CAPABILITY",
    bgColor: "#F3F0EE",
    textColor: "#141413",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "cross-team-collaboration",
    title: "Cross-Team Collaboration",
    description:
      "Transparent communication and coordinated execution across stakeholders, engineering teams, and business units.",
    tag: "CAPABILITY",
    bgColor: "#FF5812",
    textColor: "#ffffff",
    image:
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "ai-enhanced-productivity",
    title: "AI-Enhanced Productivity",
    description:
      "AI-assisted workflows that accelerate development, automation, testing, and operational efficiency.",
    tag: "CAPABILITY",
    bgColor: "#141413",
    textColor: "#ffffff",
    image:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "transparent-delivery",
    title: "Transparent Delivery",
    description:
      "Clear sprint visibility, milestone tracking, reporting, and accountability throughout the delivery lifecycle.",
    tag: "CAPABILITY",
    bgColor: "#F3F0EE",
    textColor: "#141413",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
  },
] as const;

const PILLS = BASE_CARDS.map((c) => c.title);

/**
 * `--y` style values from Osmo's HTML (2080%, 4420%, 1720%, 1720%, 1360%, 2080%)
 * are basically a small randomized vertical wobble. Translating to plain pixels
 * with the same proportions: divide by 100 → 20.8, 44.2, 17.2, 17.2, 13.6, 20.8.
 * Halve and alternate sign for a natural staggered wobble around the baseline.
 */
const PILL_Y_WOBBLE_PX = [-10, 22, -8, 8, -6, 10];

/* 18 cards = 3× loops × 6 base cards → seamless infinite wrap. */
const TOTAL_CARDS = 18;
const DEG_PER_CARD = 20; // matches data-gsap-slider-rotate="20"

const CARDS = Array.from({ length: TOTAL_CARDS }).map((_, i) => {
  const baseCard = BASE_CARDS[i % BASE_CARDS.length];
  return {
    ...baseCard,
    uniqueId: `${baseCard.id}-${i}`,
    angle: i * DEG_PER_CARD,
  };
});

/* ─────────────────────────────────────────────────────────────────
   GEOMETRY  —  responsive sizes
   ───────────────────────────────────────────────────────────────── */
type Bp = "xs" | "sm" | "md" | "lg" | "xl";

type SizeConfig = {
  /** List height = arc radius (the rotation pivot lives at `radius` px below the list top). */
  radius: number;
  cardWidth: number;
  cardHeight: number;
  panSensitivity: number;
  cardPadding: string;
  cardRadius: string;
  titleSize: string;
  descSize: string;
};

/**
 * Section heights are tuned so the section is exactly as tall as
 *   `carouselTop + cardHeight + small buffer`
 * meaning there is **no empty zone** below the cards. The slider then
 * flows directly into InfoSection, sharing the same cream canvas.
 */
/**
 * Geometry math:
 *   • Each card sits at `top:0; left:50%` and rotates around a pivot at
 *     `transform-origin: 50% radius px`.
 *   • A 20° neighbour rotates around that pivot and ends up:
 *       – horizontally offset by  ≈ sin(20°) × (radius − cardH/2)
 *       – vertically offset DOWN by ≈ (1 − cos(20°)) × (radius − cardH/2)
 *     plus the rotated rect dips an extra ≈ cardH/2·cos(20°) + cardW/2·sin(20°)
 *     below its centre. Section height must be ≥ that or the side cards clip.
 *
 *   • To get "3 cards on desktop, 1 dominant on mobile" we keep the radius
 *     large (subtle tilt = Osmo look) and let the section's overflow:hidden
 *     crop the side cards at the viewport edges. On narrow phones the side
 *     cards naturally fall off-screen because the viewport is barely wider
 *     than one card.
 */
/**
 * Geometry math:
 *   • Card centred at angle 0° sits at (list_center, H/2).
 *   • A 20° neighbour card's centre lands at horizontal offset
 *       ≈ (R − H/2) · sin(20°)  ≈ 0.342·(R − H/2)
 *     so a LARGER radius pushes neighbours farther apart, which is what
 *     gives Osmo the airy spacing between the centre + side cards.
 *
 *   • Spread target: side card centre should be ~(cardW + 80)px from the
 *     centre card's centre. Solving for R:
 *         R = (cardW + 80) / sin(20°) + cardH/2
 *
 * Mobile (`xs` / `sm`):
 *   • Only one dominant centre card is shown — neighbours are faded out.
 *     Radius doesn't visually matter, kept moderate.
 */
const SIZES: Record<Bp, SizeConfig> = {
  xs: {
    radius: 540,
    cardWidth: 260,
    cardHeight: 400,
    panSensitivity: 0.18,
    cardPadding: "18px",
    cardRadius: "20px",
    titleSize: "20px",
    descSize: "13px",
  },
  sm: {
    radius: 720,
    cardWidth: 280,
    cardHeight: 430,
    panSensitivity: 0.16,
    cardPadding: "20px",
    cardRadius: "22px",
    titleSize: "22px",
    descSize: "13px",
  },
  md: {
    /* (270+80)/0.342 + 220 ≈ 1244 — bumped to spread three cards apart. */
    radius: 1180,
    cardWidth: 270,
    cardHeight: 420,
    panSensitivity: 0.13,
    cardPadding: "22px",
    cardRadius: "24px",
    titleSize: "24px",
    descSize: "13.5px",
  },
  lg: {
    /* (300+80)/0.342 + 230 ≈ 1340 — gives ~80px breathing room either side. */
    radius: 1340,
    cardWidth: 300,
    cardHeight: 460,
    panSensitivity: 0.11,
    cardPadding: "24px",
    cardRadius: "26px",
    titleSize: "26px",
    descSize: "14px",
  },
  xl: {
    /* (330+100)/0.342 + 245 ≈ 1502 — wider viewports get airier spacing. */
    radius: 1500,
    cardWidth: 330,
    cardHeight: 490,
    panSensitivity: 0.1,
    cardPadding: "28px",
    cardRadius: "28px",
    titleSize: "30px",
    descSize: "15px",
  },
};

function useBreakpoint(): Bp {
  const [bp, setBp] = useState<Bp>("lg");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setBp("xs");
      else if (w < 768) setBp("sm");
      else if (w < 1024) setBp("md");
      else if (w < 1440) setBp("lg");
      else setBp("xl");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

/* `(pointer: fine)` lets us light up the floating "Drag" pill only on
 * devices that actually have a pointer (mouse / trackpad). */
function useHasFinePointer(): boolean {
  const [fine, setFine] = useState<boolean>(false);
  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);
  return fine;
}

/* ─────────────────────────────────────────────────────────────────
   ICONS
   ───────────────────────────────────────────────────────────────── */
function StarIcon({ className }: { className?: string }) {
  // Osmo's 8-point asterisk — same path data, same viewBox.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 187 187"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M126.049 76.7471L167.276 35.5197L150.805 19.0486L109.577 60.276C107.82 62.0398 104.808 60.7915 104.808 58.3009V0H81.517V70.3375C81.517 76.511 76.511 81.517 70.3375 81.517H0V104.808H58.3009C60.7915 104.808 62.0398 107.82 60.276 109.577L19.0548 150.805L35.5259 167.276L76.7533 126.049C78.5109 124.291 81.5232 125.533 81.5232 128.024V186.324H104.814V115.987C104.814 109.813 109.82 104.808 115.993 104.808H186.331V81.517H128.03C125.539 81.517 124.291 78.5047 126.055 76.7471H126.049Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   NAV PILLS — Editorial numbered tabs with sliding active indicator.

   • Each tab shows a tiny index ("01", "02", …) above the label.
   • A single black "pill" lozenge slides between the active tab via
     framer-motion's `layoutId` — only ONE element ever animates so the
     transition stays smooth even on slow devices.
   • Mobile: horizontal scroll-snap row (no overlap, native momentum).
   • Desktop: centred wrap, no wobble — just clean editorial spacing.
   ───────────────────────────────────────────────────────────────── */
function NavTab({
  index,
  label,
  active,
  onClick,
}: {
  index: number;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active || undefined}
      aria-pressed={active}
      className={[
        "group relative whitespace-nowrap select-none shrink-0 snap-center",
        "rounded-full px-4 py-2 sm:px-5 sm:py-2.5",
        "text-[12px] sm:text-[13px] font-medium tracking-[-0.01em]",
        "transition-colors duration-[280ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
        "active:scale-[0.96]",
        active ? "text-white" : "text-[#141413]/65 hover:text-[#141413]",
      ].join(" ")}
    >
      {/* Sliding black pill — only one in the DOM, framer-motion morphs
       * its position via shared layoutId. */}
      {active && (
        <motion.span
          layoutId="nav-pill-active"
          aria-hidden
          className="absolute inset-0 z-0 rounded-full bg-[#141413] shadow-[0_8px_22px_-10px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.04)_inset]"
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 32,
            mass: 0.6,
          }}
        />
      )}
      {/* Inner: index badge + label */}
      <span className="relative z-10 flex items-center gap-2">
        <span
          aria-hidden
          className={[
            "tabular-nums text-[10px] sm:text-[10.5px] font-semibold tracking-[0.06em]",
            "transition-colors duration-[280ms]",
            active ? "text-white/55" : "text-[#141413]/35",
          ].join(" ")}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* 2-stack label slide on hover */}
        <span className="relative inline-block h-[1.2em] overflow-hidden align-middle">
          <span className="block transition-transform duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full">
            {label}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 block translate-y-full transition-transform duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0"
          >
            {label}
          </span>
        </span>
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CARD
   ───────────────────────────────────────────────────────────────── */
type CardData = (typeof CARDS)[number];

function ArcCard({
  card,
  smoothRotation,
  radius,
  cardWidth,
  cardHeight,
  sz,
  isMobile,
}: {
  card: CardData;
  smoothRotation: ReturnType<typeof useSpring>;
  radius: number;
  cardWidth: number;
  cardHeight: number;
  sz: SizeConfig;
  isMobile: boolean;
}) {
  /* Diff angle relative to the active centre, wrapped to (-180°, +180°]. */
  const relativeAngle = useTransform(smoothRotation, (r: number) => {
    return (((card.angle + r) % 360) + 540) % 360 - 180;
  });

  /* Single transform — translate to the list's centre column, then rotate.
   * The transform-origin (set on the element below) is what makes this rotation
   * sweep along the arc. This matches Osmo's HTML byte-for-byte. */
  const transform = useTransform(
    relativeAngle,
    (a: number) => `translate(-50%, 0%) rotate(${a}deg)`
  );

  const opacity = useTransform(relativeAngle, (a: number) => {
    const abs = Math.abs(a);
    /* On mobile we want only the centre card — fade out neighbours quickly. */
    if (isMobile) {
      if (abs < 5) return 1;
      if (abs > 18) return 0;
      return Math.max(0, 1 - (abs - 5) * 0.077);
    }
    /* On desktop show exactly 3 cards: centre (0°) + immediate neighbours
     * (±20°). Anything past 20° fades out quickly so we don't see a 4th
     * or 5th card peeking in. */
    if (abs <= 20) return 1;
    if (abs >= 35) return 0;
    return Math.max(0, 1 - (abs - 20) / 15);
  });

  const zIndex = useTransform(relativeAngle, (a: number) =>
    Math.round(1000 - Math.abs(a))
  );

  const display = useTransform(relativeAngle, (a: number) => {
    if (isMobile) return Math.abs(a) > 25 ? "none" : "block";
    /* Past 40° the card has fully faded — skip rendering. */
    return Math.abs(a) > 40 ? "none" : "block";
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: cardWidth,
        height: cardHeight,
        transformOrigin: `50% ${radius}px`,
        transform,
        opacity,
        zIndex,
        display,
        touchAction: "pan-y",
        willChange: "transform",
      }}
      className="pointer-events-none"
    >
      <article
        className={[
          "group/card relative w-full h-full overflow-hidden flex flex-col",
          "items-stretch text-left pointer-events-auto",
          // Emil: ease-out for hover (instant feedback), 280ms < 300ms ceiling
          "transition-transform duration-[280ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
          "hover:-translate-y-1.5 active:scale-[0.985]",
        ].join(" ")}
        style={{
          backgroundColor: card.bgColor,
          color: card.textColor,
          borderRadius: sz.cardRadius,
          padding: sz.cardPadding,
          // Layered, optically-correct shadow stack — close + ambient + grounding
          boxShadow: [
            "0 1px 2px rgba(0,0,0,0.06)",
            "0 8px 20px -8px rgba(0,0,0,0.18)",
            "0 28px 50px -18px rgba(0,0,0,0.30)",
            "0 0 0 1px rgba(0,0,0,0.05) inset",
          ].join(", "),
          touchAction: "pan-y",
        }}
      >
        {/* Full-bleed background image */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            backgroundImage: `url('${card.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.16,
            mixBlendMode: "overlay",
          }}
        />

        {/* Top→bottom gradient veil for legibility on textured cards.
         * Stronger at the bottom so the title reads cleanly. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              card.textColor === "#ffffff"
                ? "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.18) 70%, rgba(0,0,0,0.35) 100%)"
                : "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.10) 60%, rgba(255,255,255,0.22) 100%)",
          }}
        />

        {/* Subtle noise texture for tactile feel */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 pointer-events-none mix-blend-overlay opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* ── Top row: tags ── */}
        <div className="relative z-10 flex items-center gap-1.5">
          <span
            className="inline-flex items-center px-2.5 py-[5px] rounded-md text-[9.5px] font-semibold tracking-[0.10em] uppercase"
            style={{
              background:
                card.textColor === "#ffffff"
                  ? "rgba(255,255,255,0.14)"
                  : "rgba(0,0,0,0.06)",
              color: card.textColor,
              opacity: 0.92,
              backdropFilter: "blur(4px)",
            }}
          >
            {card.tag}
          </span>
          <span
            className="inline-flex items-center px-2.5 py-[5px] rounded-full text-[9.5px] font-semibold tracking-[0.10em] uppercase"
            style={{
              background:
                card.textColor === "#ffffff"
                  ? "rgba(255,255,255,0.14)"
                  : "rgba(0,0,0,0.06)",
              color: card.textColor,
              opacity: 0.92,
              backdropFilter: "blur(4px)",
            }}
          >
            Membership
          </span>
        </div>

        {/* ── Centre block: icon + title + description ── */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-2">
          {/* Icon with subtle floating ring; nudges up on card hover */}
          <div
            className={[
              "relative mb-4 sm:mb-5",
              "w-9 h-9 sm:w-11 sm:h-11",
              "transition-transform duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
              "group-hover/card:-translate-y-0.5",
            ].join(" ")}
            style={{ opacity: 0.85 }}
          >
            <span
              aria-hidden
              className="absolute inset-[-30%] rounded-full"
              style={{
                background:
                  card.textColor === "#ffffff"
                    ? "radial-gradient(closest-side, rgba(255,255,255,0.18), transparent 70%)"
                    : "radial-gradient(closest-side, rgba(0,0,0,0.08), transparent 70%)",
              }}
            />
            <StarIcon className="relative w-full h-full" />
          </div>

          <h3
            style={{ fontSize: sz.titleSize }}
            className="font-semibold tracking-[-0.025em] leading-[1.05] mb-3 sm:mb-4 max-w-[16ch]"
          >
            {card.title}
          </h3>
          <p
            style={{ fontSize: sz.descSize }}
            className="leading-[1.55] max-w-[26ch] opacity-70"
          >
            {card.description}
          </p>
        </div>

      </article>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FLOATING "DRAG" CURSOR PILL
   Polished per Emil's principles:
   • Spring-driven follower with momentum (feels alive, not artificial)
   • Never scales from 0 — starts at scale(0.92) so it has shape on entry
   • Subtle ring + backdrop blur for tactile feel
   • Small drag-arrow icon flips to grip lines while dragging
   • Hardware-accelerated `transform: translate3d` not framer x/y
   ───────────────────────────────────────────────────────────────── */
function DragCursor({
  x,
  y,
  visible,
  isDragging,
}: {
  x: number;
  y: number;
  visible: boolean;
  isDragging: boolean;
}) {
  // Spring-smooth pointer follower — Emil: tying visuals directly to mouse
  // position feels artificial; spring interpolation gives natural momentum.
  const springX = useSpring(x, { stiffness: 380, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 380, damping: 28, mass: 0.4 });

  useEffect(() => {
    springX.set(x);
    springY.set(y);
  }, [x, y, springX, springY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          // Emil: never scale from 0. Start with a visible shape.
          initial={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
          // ease-out for entry (instant feedback), short snappy duration
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            pointerEvents: "none",
            zIndex: 9999,
            willChange: "transform, opacity",
          }}
        >
          {/* Outer glow ring — fades in stronger while dragging */}
          <div
            className="relative flex items-center gap-1.5 select-none"
            style={{
              padding: "8px 14px 8px 10px",
              borderRadius: 999,
              backgroundColor: isDragging
                ? "rgba(20,20,19,0.96)"
                : "rgba(20,20,19,0.78)",
              color: "#ffffff",
              fontSize: 11.5,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              boxShadow: isDragging
                ? "0 12px 28px -10px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 0 4px rgba(20,20,19,0.06)"
                : "0 8px 22px -8px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.06) inset",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              // Smooth color/shadow transition between idle/dragging states
              transition:
                "background-color 200ms ease, box-shadow 240ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Icon swap — arrows when idle, grip while dragging */}
            <span
              className="inline-flex items-center justify-center"
              style={{
                width: 14,
                height: 14,
                opacity: 0.9,
              }}
            >
              {isDragging ? (
                /* grip dots */
                <svg viewBox="0 0 14 14" width="14" height="14" fill="none">
                  <circle cx="4" cy="4" r="1.2" fill="currentColor" />
                  <circle cx="10" cy="4" r="1.2" fill="currentColor" />
                  <circle cx="4" cy="10" r="1.2" fill="currentColor" />
                  <circle cx="10" cy="10" r="1.2" fill="currentColor" />
                </svg>
              ) : (
                /* horizontal drag arrows */
                <svg viewBox="0 0 14 14" width="14" height="14" fill="none">
                  <path
                    d="M4.5 7H1.5M1.5 7L3.5 5M1.5 7L3.5 9"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 7H12.5M12.5 7L10.5 5M12.5 7L10.5 9"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span style={{ display: "inline-block", minWidth: 28 }}>
              {isDragging ? "Hold" : "Drag"}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */
export default function ProductArcSlider() {
  const bp = useBreakpoint();
  const sz = SIZES[bp];
  const hasFinePointer = useHasFinePointer();
  const isMobile = bp === "xs" || bp === "sm";

  const radius = sz.radius;

  /* Single rotation motion value — increments / decrements as the user drags
   * or the auto-loop ticks. We never wrap it: cards do their own modulo math
   * to display in the (-180°, 180°] range. */
  const rotationMV = useMotionValue(0);
  const smoothRotation = useSpring(rotationMV, { damping: 50, stiffness: 200 });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(smoothRotation, "change", (val: number) => {
    /* `val` is the rotation; the active card is whichever card has angle ≈ -val
     * (i.e. its `relativeAngle = card.angle + rotation` ≈ 0). */
    let idx = Math.round(-val / DEG_PER_CARD) % TOTAL_CARDS;
    if (idx < 0) idx += TOTAL_CARDS;
    setActiveIndex(idx % BASE_CARDS.length);
  });

  /* Auto-advance every 3.5s — pauses while dragging. */
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    if (isDragging) return;
    const id = window.setInterval(() => {
      rotationMV.set(rotationMV.get() - DEG_PER_CARD);
    }, 3500);
    return () => clearInterval(id);
  }, [isDragging, rotationMV]);

  /* Pill click → spin to nearest matching card index. */
  const handlePillClick = useCallback(
    (idx: number) => {
      const currentRot = rotationMV.get();
      const currentCardIdx = Math.round(-currentRot / DEG_PER_CARD);
      let bestCardIdx = idx;
      let minDistance = Infinity;
      for (let k = -3; k <= 3; k++) {
        const candidate = idx + k * BASE_CARDS.length;
        const d = Math.abs(candidate - currentCardIdx);
        if (d < minDistance) {
          minDistance = d;
          bestCardIdx = candidate;
        }
      }
      rotationMV.set(-bestCardIdx * DEG_PER_CARD);
    },
    [rotationMV]
  );

  /* Drag handlers — drag-x in pixels → rotation delta. */
  const handlePan = useCallback(
    (_e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      const next = rotationMV.get() + info.delta.x * sz.panSensitivity;
      rotationMV.set(next);
    },
    [rotationMV, sz.panSensitivity]
  );

  const handlePanStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handlePanEnd = useCallback(() => {
    setIsDragging(false);
    /* Snap to the nearest 20° step. */
    const cur = rotationMV.get();
    const snapped = Math.round(cur / DEG_PER_CARD) * DEG_PER_CARD;
    rotationMV.set(snapped);
  }, [rotationMV]);

  /* Custom "Drag" cursor follower — only active on fine-pointer devices. */
  const sliderZoneRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    if (!cursorVisible) return;
    const handle = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [cursorVisible]);

  const cards = useMemo(() => CARDS, []);

  return (
    <section
      data-theme-section="light"
      className="relative w-full overflow-hidden select-none"
      style={{
        /* Background lives on the FeaturesShowcase wrapper so the slider and
         * InfoSection share one continuous canvas — `transparent` here
         * ensures zero risk of a colour seam. */
        backgroundColor: "transparent",
      }}
    >
      {/* ── Inner wrapper (header + pills, normal flow) ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
        {/* Title row — left h2, right paragraph */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-16 pt-10 sm:pt-12 md:pt-14 mb-6 md:mb-8">
          <h2 className="text-[clamp(28px,4.4vw,58px)] font-semibold leading-[1.04] tracking-[-0.025em] text-[#141413] max-w-[680px]">
            Built for global engineering partnerships
          </h2>
          <p className="text-[15px] sm:text-[17px] md:text-[18px] text-[#141413]/55 leading-[1.55] max-w-[380px] md:text-right shrink-0">
            Access everything with a single partnership — offshore scalability,
            enterprise engineering, and AI-driven delivery.
          </p>
        </div>

        {/* Nav pills:
            • mobile/tablet: horizontal scroll-snap row with edge fade masks
            • desktop (md+): centred flex-wrap with wobble */}
        <div className="relative -mx-5 sm:-mx-8 md:mx-0 mb-6 md:mb-10">
          {/* Edge fade — left (mobile/tablet only) */}
          <div
            aria-hidden
            className="md:hidden pointer-events-none absolute inset-y-0 left-0 w-10 z-10"
            style={{
              background:
                "linear-gradient(to right, #F3F0EE 0%, rgba(243,240,238,0) 100%)",
            }}
          />
          {/* Edge fade — right (mobile/tablet only) */}
          <div
            aria-hidden
            className="md:hidden pointer-events-none absolute inset-y-0 right-0 w-10 z-10"
            style={{
              background:
                "linear-gradient(to left, #F3F0EE 0%, rgba(243,240,238,0) 100%)",
            }}
          />

          <div
            className={[
              // Mobile/tablet: native horizontal scroll with snap
              "flex items-center gap-2 px-5 sm:px-8",
              "overflow-x-auto md:overflow-visible",
              "snap-x snap-mandatory md:snap-none",
              "scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]",
              // Desktop: centred wrap
              "md:flex-wrap md:justify-center md:gap-3 md:px-0",
              // Hide scrollbar in WebKit
              "[&::-webkit-scrollbar]:hidden",
              // Add a tiny vertical padding so wobble translateY doesn't clip
              "py-2",
            ].join(" ")}
          >
            {PILLS.map((label, idx) => (
              <NavTab
                key={label}
                index={idx}
                label={label}
                active={idx === activeIndex}
                onClick={() => handlePillClick(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Slider zone (in normal flow, height = card area only) ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: `${sz.cardHeight + 80}px` }}
      >
        {/* Decorative dotted-circle SVG behind the carousel */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none opacity-30 z-0"
          style={{
            top: `-${radius * 0.42}px`,
            width:
              bp === "xs"
                ? "180vw"
                : bp === "sm"
                  ? "160vw"
                  : bp === "md"
                    ? "140vw"
                    : "120vw",
            maxWidth: "1900px",
          }}
        >
          <img
            src="https://osmo.b-cdn.net/website/svg/product-slider-circle-deco.svg"
            alt=""
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        <motion.div
          ref={sliderZoneRef}
          data-cursor-zone="neutral-600"
          data-gsap-drag-status={isDragging ? "grabbing" : "grab"}
          onPan={handlePan}
          onPanStart={handlePanStart}
          onPanEnd={handlePanEnd}
          onMouseEnter={() => {
            if (hasFinePointer) setCursorVisible(true);
          }}
          onMouseLeave={() => {
            if (hasFinePointer) setCursorVisible(false);
          }}
          className="absolute inset-0 z-20"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "pan-y",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          {/* The list — its height IS the arc radius. Anchored at the TOP
           * of this zone so cards extend downward from there; pivot lives
           * `radius` px below, putting the rotation centre off-screen. */}
          <div
            className="relative w-full mx-auto pointer-events-none"
            style={{
              height: `${radius}px`,
              maxWidth: "1600px",
            }}
          >
            {cards.map((card) => (
              <ArcCard
                key={card.uniqueId}
                card={card}
                smoothRotation={smoothRotation}
                radius={radius}
                cardWidth={sz.cardWidth}
                cardHeight={sz.cardHeight}
                sz={sz}
                isMobile={isMobile}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade gradient — matches the wrapper canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 md:h-16 z-30"
        style={{
          background:
            "linear-gradient(to bottom, rgba(243,240,238,0) 0%, rgba(243,240,238,1) 100%)",
        }}
      />

      {/* Floating "Drag" cursor — fine-pointer devices only */}
      {hasFinePointer && (
        <DragCursor
          x={cursorPos.x}
          y={cursorPos.y}
          visible={cursorVisible}
          isDragging={isDragging}
        />
      )}
    </section>
  );
}
