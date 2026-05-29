"use client";

/**
 * OffshoreCoreFeatures
 * -----------------------------------------------------------------------------
 * Faithful React clone of the Corex "Core Features" section. Same eyebrow,
 * same heading "Master the Market with Corex" with split-letter reveal, same
 * three cards with their original Webflow CDN imagery, same nav dots, and the
 * same slowly-rotating earth + mask-light overlays underneath.
 * -----------------------------------------------------------------------------
 */

import {
    motion,
    useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Data — same as the source HTML                                             */
/* -------------------------------------------------------------------------- */

type Feature = {
    index: string;
    title: string;
    copy: string;
    image: string;
};

const FEATURES: Feature[] = [
    {
        index: "01",
        title: "Talent, without borders.",
        copy:
            "Senior engineers across 30+ countries, embedded into your team. We hire for craft and judgment, not geography — so you scale capacity without diluting standards.",
        image:
            "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b271891fcd45632a3206c8_Frame%202147226537.png",
    },
    {
        index: "02",
        title: "A team that follows the sun.",
        copy:
            "Async-first delivery across overlapping timezones. Your roadmap stays in motion while your local team sleeps, and standups inherit yesterday's progress.",
        image:
            "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b271891fcd45632a3206cc_Group%20(1).png",
    },
    {
        index: "03",
        title: "Production-grade by default.",
        copy:
            "ISO 27001 pipelines, signed code, measurable SLAs. Built to be shipped on Friday and run on Monday — without the late-night calls or rollback rituals.",
        image:
            "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b271891fcd45632a3206ce_element%20(1).png",
    },
];

const CHART_LIGHT =
    "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b271891fcd45632a3206ca_light.png";

const EARTH_IMAGE =
    "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b271b658018bac4d6873ce_Earth.png";

/* -------------------------------------------------------------------------- */
/* Card                                                                       */
/* -------------------------------------------------------------------------- */

type Position = "left" | "center" | "right";

const POSITION_TRANSFORMS: Record<
    Position,
    {
        x: number;
        rotate: number;
        scale: number;
        blur: number;
        opacity: number;
        z: number;
    }
> = {
    left: { x: -325, rotate: -8, scale: 0.8, blur: 5, opacity: 1, z: 1 },
    center: { x: 0, rotate: 0, scale: 1, blur: 0, opacity: 1, z: 3 },
    right: { x: 325, rotate: 8, scale: 0.8, blur: 5, opacity: 1, z: 1 },
};

function FeatureCard({
    feature,
    position,
    onClick,
}: {
    feature: Feature;
    position: Position;
    onClick: () => void;
}) {
    const t = POSITION_TRANSFORMS[position];
    const isCenter = position === "center";

    return (
        <motion.button
            type="button"
            onClick={onClick}
            aria-label={`Show ${feature.title}`}
            aria-current={isCenter ? "true" : undefined}
            tabIndex={isCenter ? -1 : 0}
            className="
        group absolute left-1/2 top-1/2 block w-[clamp(300px,46vw,560px)]
        -translate-x-1/2 -translate-y-1/2 cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8a3a]/60
        focus-visible:ring-offset-4 focus-visible:ring-offset-[#070708]
      "
            style={{ zIndex: t.z }}
            animate={{
                x: t.x,
                rotate: t.rotate,
                scale: t.scale,
                filter: `blur(${t.blur}px)`,
                opacity: t.opacity,
            }}
            transition={{ type: "spring", duration: 0.85, bounce: 0 }}
        >
            <div
                className="
          relative overflow-hidden rounded-[28px]
          border border-white/[0.07]
          bg-gradient-to-b from-[#13131a]/90 to-[#0c0c10]/95
          shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)_inset]
        "
            >
                {/* card background — subtle warm bloom from upper-left */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(70% 50% at 30% 10%, rgba(255,138,58,0.12), transparent 65%)",
                    }}
                />
                {/* top hairline */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
                />

                {/* title */}
                <div className="relative px-7 pt-7">
                    <div className="flex items-start justify-between gap-6">
                        <div className="min-w-0">
                            <div className="flex items-baseline gap-2 text-[#ff8a3a]">
                                <span className="font-mono text-[12px] font-medium tracking-[0.18em] text-[#ff8a3a]/90">
                                    {feature.index}
                                </span>
                                <span className="h-px w-6 translate-y-[-3px] bg-[#ff8a3a]/40" />
                            </div>
                            <h3 className="mt-3 text-balance text-[1.45rem] font-medium leading-[1.1] tracking-[-0.022em] text-white sm:text-[1.65rem]">
                                {feature.title}
                            </h3>
                        </div>
                    </div>

                    {/* image area — chart-image + chart-light overlay */}
                    <div className="relative mt-5 h-[210px] w-full overflow-hidden rounded-[18px] border border-white/[0.05] bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02]">
                        {/* base */}
                        <img
                            src={feature.image}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className="absolute inset-0 h-full w-full select-none object-contain"
                        />
                        {/* light overlay */}
                        <img
                            src={CHART_LIGHT}
                            alt=""
                            aria-hidden
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className="
                pointer-events-none absolute inset-0 h-full w-full select-none object-cover
                opacity-80 mix-blend-screen
              "
                        />
                        {/* bottom warm bloom */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-x-0 -bottom-12 h-40"
                            style={{
                                background:
                                    "radial-gradient(60% 80% at 50% 100%, rgba(255,138,58,0.32), transparent 70%)",
                                filter: "blur(20px)",
                            }}
                        />
                    </div>
                </div>

                {/* divider line */}
                <div className="mx-7 mt-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-50" />

                {/* copy */}
                <div className="px-7 pb-7 pt-5">
                    <p className="text-[14px] leading-[1.65] text-white/60 [text-wrap:pretty]">
                        {feature.copy}
                    </p>
                </div>
            </div>
        </motion.button>
    );
}

/* -------------------------------------------------------------------------- */
/* Heading + subhead — simple, always-visible                                 */
/* -------------------------------------------------------------------------- */

function Heading() {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", duration: 0.85, bounce: 0 }}
            className="text-balance text-center text-[2.6rem] font-medium leading-[1.04] tracking-[-0.028em] text-white sm:text-[3.6rem] lg:text-[4.4rem]"
        >
            Your offshore tech partner.
        </motion.h2>
    );
}

function Subhead() {
    return (
        <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto -mt-1 max-w-[42rem] text-center text-[15.5px] leading-[1.6] text-white/55 [text-wrap:pretty] sm:text-[16px]"
        >
            A senior engineering team that ships, scales, and stays accountable
            &mdash; across continents and timezones.
        </motion.p>
    );
}

/* -------------------------------------------------------------------------- */
/* Bottom Earth — slowly-rotating earth image with mask-light bands           */
/* -------------------------------------------------------------------------- */

/**
 * Network overlay — fixed (does NOT rotate with the globe so users can read
 * the connections). Coordinates are within the earth's bounding box; we mark
 * a few key delivery hubs and draw curved arcs between them with a slow
 * traveling pulse along each arc.
 */
function GlobeNetworkOverlay() {
    /* Coordinates in a 100×100 viewBox. The earth disc occupies the center
     * with its visible top hovering around y=10..55 (since the inner div is
     * pushed down by translate-y-[36%]). HQ sits on a visible band; satellites
     * are placed where they read clearly above the horizon. */
    const HQ = { id: "hq", x: 64, y: 32 } as const;
    const SATELLITES = [
        { id: "na-w", x: 20, y: 28, label: "SF" },
        { id: "na-e", x: 32, y: 22, label: "NYC" },
        { id: "eu", x: 49, y: 18, label: "London" },
        { id: "me", x: 58, y: 26, label: "Dubai" },
        { id: "sea", x: 76, y: 30, label: "Singapore" },
        { id: "anz", x: 84, y: 42, label: "Sydney" },
    ];

    /* Build a great-circle-ish arc that bows UPWARD (away from the equator).
     * Lift is proportional to chord length; longer hops bow higher. */
    const arcPath = (
        a: { x: number; y: number },
        b: { x: number; y: number }
    ) => {
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Lift the control point upward (lower y in SVG = upward visually)
        const lift = Math.min(18, dist * 0.35 + 4);
        const cx = mx;
        const cy = my - lift;
        return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
    };

    return (
        <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            aria-hidden
        >
            <defs>
                {/* Soft amber glow for nodes */}
                <radialGradient id="globe-node-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(255,166,99,0.85)" />
                    <stop offset="60%" stopColor="rgba(255,138,58,0.25)" />
                    <stop offset="100%" stopColor="rgba(255,138,58,0)" />
                </radialGradient>
                {/* Soft white core for HQ */}
                <radialGradient id="globe-hq-core" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="60%" stopColor="#ffd6b3" />
                    <stop offset="100%" stopColor="#ff8a3a" />
                </radialGradient>
                {/* Path gradient — strong in the middle, fades at endpoints */}
                <linearGradient id="globe-arc-base" x1="0" x2="1">
                    <stop offset="0%" stopColor="rgba(255,138,58,0)" />
                    <stop offset="50%" stopColor="rgba(255,182,121,0.7)" />
                    <stop offset="100%" stopColor="rgba(255,138,58,0)" />
                </linearGradient>
                {/* Inner crisp line on top */}
                <linearGradient id="globe-arc-core" x1="0" x2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="50%" stopColor="rgba(255,231,209,1)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
                {/* Glow filter for arcs and nodes */}
                <filter
                    id="globe-soft-glow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur stdDeviation="0.55" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Arcs — each gets a soft glow halo + crisp white core line */}
            {SATELLITES.map((s, i) => {
                const d = arcPath(HQ, s);
                const animDur = 9 + (i % 3) * 1.5;
                const delay = -i * 1.2;
                return (
                    <g key={`arc-${s.id}`}>
                        {/* Glow halo */}
                        <path
                            d={d}
                            fill="none"
                            stroke="url(#globe-arc-base)"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            opacity="0.7"
                            filter="url(#globe-soft-glow)"
                        />
                        {/* Crisp core */}
                        <path
                            d={d}
                            fill="none"
                            stroke="url(#globe-arc-core)"
                            strokeWidth="0.32"
                            strokeLinecap="round"
                            opacity="0.55"
                        />
                        {/* Traveling packet — small dot moving along the path */}
                        <circle r="0.55" fill="#fff7ec">
                            <animateMotion
                                dur={`${animDur}s`}
                                begin={`${delay}s`}
                                repeatCount="indefinite"
                                path={d}
                                rotate="auto"
                            />
                            <animate
                                attributeName="opacity"
                                values="0;1;1;0"
                                keyTimes="0;0.15;0.85;1"
                                dur={`${animDur}s`}
                                begin={`${delay}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                    </g>
                );
            })}

            {/* Satellite nodes */}
            {SATELLITES.map((s) => (
                <g key={s.id}>
                    {/* outer halo */}
                    <circle
                        cx={s.x}
                        cy={s.y}
                        r="2.4"
                        fill="url(#globe-node-glow)"
                    />
                    {/* mid ring (faint) */}
                    <circle
                        cx={s.x}
                        cy={s.y}
                        r="1.55"
                        fill="none"
                        stroke="rgba(255,182,121,0.45)"
                        strokeWidth="0.18"
                    />
                    {/* core dot */}
                    <circle
                        cx={s.x}
                        cy={s.y}
                        r="0.7"
                        fill="#ff8a3a"
                        filter="url(#globe-soft-glow)"
                    />
                    {/* breathing pulse */}
                    <circle
                        cx={s.x}
                        cy={s.y}
                        r="0.7"
                        fill="none"
                        stroke="rgba(255,138,58,0.7)"
                        strokeWidth="0.18"
                    >
                        <animate
                            attributeName="r"
                            values="0.7;3.2;0.7"
                            dur="3.4s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.7;0;0.7"
                            dur="3.4s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            ))}

            {/* HQ — larger, white-cored, with double pulse ring */}
            <g>
                <circle
                    cx={HQ.x}
                    cy={HQ.y}
                    r="3.6"
                    fill="url(#globe-node-glow)"
                />
                <circle
                    cx={HQ.x}
                    cy={HQ.y}
                    r="2.4"
                    fill="none"
                    stroke="rgba(255,231,209,0.55)"
                    strokeWidth="0.25"
                />
                <circle
                    cx={HQ.x}
                    cy={HQ.y}
                    r="1.1"
                    fill="url(#globe-hq-core)"
                    filter="url(#globe-soft-glow)"
                />
                {/* outer slow pulse */}
                <circle
                    cx={HQ.x}
                    cy={HQ.y}
                    r="1.1"
                    fill="none"
                    stroke="rgba(255,231,209,0.7)"
                    strokeWidth="0.22"
                >
                    <animate
                        attributeName="r"
                        values="1.1;5.8;1.1"
                        dur="3.8s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.7;0;0.7"
                        dur="3.8s"
                        repeatCount="indefinite"
                    />
                </circle>
                {/* HQ label */}
                <g
                    transform={`translate(${HQ.x + 4} ${HQ.y - 1})`}
                    style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace" }}
                >
                    <line
                        x1="0"
                        y1="0"
                        x2="2.5"
                        y2="0"
                        stroke="rgba(255,231,209,0.55)"
                        strokeWidth="0.2"
                    />
                    <text
                        x="3.3"
                        y="0.4"
                        fontSize="2.2"
                        letterSpacing="0.3"
                        fill="rgba(255,231,209,0.85)"
                    >
                        HQ
                    </text>
                </g>
            </g>
        </svg>
    );
}

function EarthWrapper({ paused }: { paused: boolean }) {
    return (
        <div className="pointer-events-none absolute inset-x-0 bottom-[-32%] flex h-[68vw] max-h-[820px] min-h-[520px] items-end justify-center overflow-hidden">
            {/* outer atmospheric glow */}
            <div
                aria-hidden
                className="absolute bottom-[-22%] left-1/2 h-[120%] w-[120%] -translate-x-1/2 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(255,138,58,0.20) 0%, rgba(255,122,47,0.08) 40%, transparent 60%)",
                    filter: "blur(40px)",
                }}
            />

            {/* mask-light _1 — wide top band */}
            <div
                aria-hidden
                className="absolute bottom-[36%] left-1/2 h-[180px] w-[130%] -translate-x-1/2"
                style={{
                    background:
                        "linear-gradient(to right, transparent, rgba(255,138,58,0.18), transparent)",
                    filter: "blur(36px)",
                }}
            />
            {/* mask-light _2 — secondary band */}
            <div
                aria-hidden
                className="absolute bottom-[26%] left-1/2 h-[120px] w-[110%] -translate-x-1/2"
                style={{
                    background:
                        "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
                    filter: "blur(22px)",
                }}
            />
            {/* mask-light _3 — narrow rim */}
            <div
                aria-hidden
                className="absolute bottom-[18%] left-1/2 h-[60px] w-[80%] -translate-x-1/2"
                style={{
                    background:
                        "linear-gradient(to right, transparent, rgba(255,138,58,0.32), transparent)",
                    filter: "blur(14px)",
                }}
            />
            {/* mask-light _4 — black underlayer to mask the bottom of earth */}
            <div
                aria-hidden
                className="absolute -bottom-1 left-0 right-0 h-[140px]"
                style={{
                    background:
                        "linear-gradient(to top, #070708 30%, transparent)",
                }}
            />

            {/* the rotating earth image + fixed network overlay container */}
            <div className="relative aspect-square w-[120%] max-w-[1500px] translate-y-[36%]">
                {/* rotating earth */}
                <div
                    className="absolute inset-0"
                    style={{
                        animation: paused
                            ? "none"
                            : "offshore-earth-rotate 240s linear infinite",
                        willChange: "transform",
                    }}
                >
                    <img
                        src={EARTH_IMAGE}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="h-full w-full select-none object-contain opacity-90"
                        style={{
                            filter:
                                "drop-shadow(0 0 80px rgba(255,138,58,0.18)) brightness(0.95)",
                        }}
                    />
                </div>

                {/* fixed network overlay — sits on top, does NOT rotate */}
                <GlobeNetworkOverlay />
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Main                                                                       */
/* -------------------------------------------------------------------------- */

export default function OffshoreCoreFeatures() {
    const [active, setActive] = useState(2); // start on /03 like the source state
    const [paused, setPaused] = useState(false);
    const reduceMotion = useReducedMotion();

    /* auto-advance every 6.5s; pauses on hover/focus or reduced motion */
    useEffect(() => {
        if (reduceMotion || paused) return;
        const id = window.setInterval(() => {
            setActive((p) => (p + 1) % FEATURES.length);
        }, 6500);
        return () => window.clearInterval(id);
    }, [paused, reduceMotion]);

    /* compute position for each card relative to active center */
    const positionFor = (i: number): Position => {
        if (i === active) return "center";
        const total = FEATURES.length;
        const offset = (i - active + total) % total;
        return offset === 1 ? "right" : "left";
    };

    return (
        <>
            <style jsx global>{`
        @keyframes offshore-earth-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes offshore-arc-flow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -200;
          }
        }
        @keyframes offshore-hq-pulse {
          0% {
            transform: scale(1);
            opacity: 0.85;
          }
          100% {
            transform: scale(5);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="offshore-earth-rotate"],
          [style*="offshore-arc-flow"],
          [style*="offshore-hq-pulse"] {
            animation: none !important;
          }
        }
      `}</style>

            <section
                aria-labelledby="offshore-core-heading"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
                className="relative overflow-hidden bg-[#070708] py-28 sm:py-32 lg:py-36"
            >
                {/* Top horizon seam */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-32"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)",
                    }}
                />

                {/* Twin blooms — gentle ambient color */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(48% 38% at 22% 28%, rgba(255,138,58,0.10), transparent 60%), radial-gradient(42% 36% at 80% 18%, rgba(86,128,255,0.07), transparent 65%)",
                    }}
                />

                {/* Atmospheric noise */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                />

                <div className="relative mx-auto w-full max-w-[1400px] px-6">
                    {/* Eyebrow + heading */}
                    <div className="relative mx-auto flex flex-col items-center gap-7">
                        <div className="relative inline-flex items-center justify-center">
                            <div className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1 backdrop-blur">
                                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[#ff8a3a]">
                                    <span className="absolute inset-0 animate-ping rounded-full bg-[#ff8a3a]/60" />
                                </span>
                                <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/65">
                                    Offshore Engineering
                                </span>
                            </div>
                        </div>

                        <Heading />

                        <Subhead />
                    </div>

                    {/* Card stage */}
                    <div
                        id="offshore-core-heading"
                        className="relative mx-auto mt-20 h-[520px] w-full"
                        style={{
                            perspective: "1200px",
                        }}
                    >
                        {FEATURES.map((feature, i) => (
                            <FeatureCard
                                key={feature.title}
                                feature={feature}
                                position={positionFor(i)}
                                onClick={() => setActive(i)}
                            />
                        ))}
                    </div>

                    {/* Navigation dots with connecting rail */}
                    <div className="relative mx-auto mt-10 flex w-fit items-center justify-center">
                        {/* base rail behind dots */}
                        <span
                            aria-hidden
                            className="pointer-events-none absolute left-[18px] right-[18px] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-white/5 via-white/15 to-white/5"
                        />
                        {/* glowing accent segment that grows to the active dot */}
                        <span
                            aria-hidden
                            className="pointer-events-none absolute left-[18px] top-1/2 h-px -translate-y-1/2 origin-left bg-gradient-to-r from-[#ff8a3a]/0 via-[#ff8a3a]/80 to-[#ff8a3a]/0 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                            style={{
                                width: `calc(${active} * (36px + 12px))`,
                                boxShadow: "0 0 12px rgba(255,138,58,0.55)",
                            }}
                        />
                        <div className="relative flex items-center gap-3">
                            {FEATURES.map((f, i) => {
                                const isActive = i === active;
                                return (
                                    <button
                                        key={f.index}
                                        type="button"
                                        onClick={() => setActive(i)}
                                        aria-label={`Show ${f.title}`}
                                        aria-pressed={isActive}
                                        className="group relative h-9 w-9 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8a3a]/60"
                                    >
                                        <span
                                            className={`absolute inset-0 rounded-full border backdrop-blur transition-colors duration-300 ${isActive
                                                ? "border-[#ff8a3a]/60 bg-[#ff8a3a]/10"
                                                : "border-white/10 bg-[#070708]/80 group-hover:border-white/20"
                                                }`}
                                        />
                                        <span
                                            className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300 ${isActive ? "bg-[#ff8a3a]" : "bg-white/40"
                                                }`}
                                            style={
                                                isActive
                                                    ? { boxShadow: "0 0 10px rgba(255,138,58,0.85)" }
                                                    : undefined
                                            }
                                        />
                                        {isActive ? (
                                            <motion.span
                                                layoutId="offshore-core-dot-ring"
                                                className="absolute inset-[-3px] rounded-full border border-[#ff8a3a]/40"
                                                transition={{
                                                    type: "spring",
                                                    duration: 0.55,
                                                    bounce: 0,
                                                }}
                                            />
                                        ) : null}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Earth at the bottom */}
                <EarthWrapper paused={!!reduceMotion} />

                {/* Bottom horizon seam — sits over the earth so it blends */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-44"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(7,7,8,1) 8%, transparent)",
                    }}
                />
            </section>
        </>
    );
}
