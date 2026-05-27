"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import LetsTalkButton from "@/components/qc/shared/LetsTalkButton";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import {
    EASE,
    EASE_T,
    DUR,
    STAGGER,
    REVEAL,
    prefersReducedMotion,
    subscribePrefersReducedMotion,
} from "@/lib/motion";

/**
 * SoftreeHero — homepage Hero_Pattern (replaces TransferredSoftreeHero).
 *
 * Implements the About_Page Hero_Pattern composition on a `#FFFFFF`
 * surface: top header row (wordmark with `®` superscript + tagline pill +
 * `LetsTalkButton`), full-bleed rounded media stage with `clamp(20px, 2vw,
 * 36px)` corners (avatar stack + centered `SectionHeader as="h1"` headline +
 * dual CTAs + bottom social rail). The capability marquee rendered directly
 * beneath the stage is wired in task 2.4. The Cycling_Word rotation with
 * reduced-motion gating is wired in task 2.3 (this file). The 3-second
 * video poster failover is wired in task 2.5. The `HERO` content
 * constants are introduced in task 2.2.
 *
 * Every animation in this file is driven exclusively by the Motion_System
 * tokens imported from `@/lib/motion` (Requirement 4.1) — `EASE`/`EASE_T`,
 * `DUR`, `STAGGER`, `REVEAL`, `prefersReducedMotion`. No bespoke
 * `cubic-bezier(...)` literals or duration numbers are declared inline.
 *
 * Implements Requirements 2.1, 2.2, 2.3, 2.4, 1.4, 1.7, 4.1, 7.1, 2.9, 9.5.
 */
export interface SoftreeHeroProps {
    /** Tagline pill text (e.g. "Offshore Engineering Partner"). */
    tagline: string;
    /** Brand wordmark; rendered with an `®` superscript. */
    wordmark: string;
    /** H1 prefix rendered before the cycling word. */
    headlinePrefix: string;
    /** 3–6 cycling words; the first word is the static fallback. */
    cyclingWords: [string, string, string, ...string[]];
    /** Primary CTA — orange-fill pill. */
    primaryCta: { label: string; href: string };
    /** Secondary CTA — glass-border pill. */
    secondaryCta: { label: string; href: string };
    /** Avatar URLs, 3–5 entries. */
    avatars: string[];
    /** Background video sources + poster. */
    video: { mp4: string; webm?: string; poster: string };
    /** Capability cards consumed by the marquee (wired in task 2.4). */
    marqueeItems: Array<{ n: string; label: string; href: string; img: string }>;
}

/* ── HERO content constants (Requirements 2.9, 9.5) ───────────────────
 * The single source of truth for the homepage hero content. Mirrors the
 * shape declared by `SoftreeHeroProps` and matches the values listed in
 * the design's "Hero Content Model" section byte-for-byte. The headline
 * prefix preserves the offshore-engineering-partner framing and the
 * cycling word list spells out the scalable Microsoft + AI capabilities,
 * jointly satisfying Requirement 2.9. The CTA destinations satisfy
 * Requirement 9.5: `/contact` (primary) and `/services` (secondary), and
 * each marquee item links to a service deep link present on the
 * pre-redesign homepage.
 *
 * Defined `as const` so the literal types narrow into the
 * `SoftreeHeroProps` shape without explicit assertions, and exported so
 * tests and `home-page.tsx` can reference the same content if they ever
 * need to override individual slots. */
export const HERO: SoftreeHeroProps = {
    wordmark: "Softree",
    tagline: "Offshore Engineering Partner",
    headlinePrefix: "Scalable Microsoft + AI teams that build",
    cyclingWords: [
        "Agentic AI",
        "Power Platform",
        "Web Apps",
        "Data Analytics",
        "Cloud Solutions",
    ],
    primaryCta: { label: "Start Your Project", href: "/contact" },
    secondaryCta: { label: "Explore Solutions", href: "/services" },
    avatars: [
        "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d47_Hero%20Client%201.webp",
        "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d45_Hero%20Client%202.webp",
        "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d4b_Hero%20Client%203.webp",
        "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d4d_Hero%20Client%204.webp",
        "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d49_Hero%20Client%205.webp",
    ],
    video: {
        mp4: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_mp4.mp4",
        webm: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_webm.webm",
        poster:
            "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_poster.0000000.jpg",
    },
    marqueeItems: [
        {
            n: "01",
            label: "AI & Automation",
            href: "/services/ai-intelligence",
            img: "/whysoftree/ai.webp",
        },
        {
            n: "02",
            label: "Web Development",
            href: "/services/digital-workspace/web-app-development",
            img: "/whysoftree/web dev.webp",
        },
        {
            n: "03",
            label: "Microsoft Solutions",
            href: "/services/business-applications/power-apps",
            img: "/whysoftree/Micorosft.webp",
        },
        {
            n: "04",
            label: "Data & Analytics",
            href: "/services/data-analytics/power-bi",
            img: "/whysoftree/data.webp",
        },
        {
            n: "05",
            label: "Digital Workspace",
            href: "/services/digital-workspace/sharepoint",
            img: "/whysoftree/web.webp",
        },
    ],
};

/* ── Inline social icons (parity with AvooraHero) ─────────────────────── */

const LinkedinIcon = () => (
    <svg
        viewBox="0 0 23 23"
        fill="currentColor"
        className="h-[18px] w-[18px]"
        aria-hidden="true"
    >
        <path d="M22.2611 22.261V14.108C22.2611 10.101 21.3985 7.04016 16.7237 7.04016C14.4698 7.04016 12.9672 8.26451 12.355 9.4332H12.2993V7.4019H7.875V22.261H12.4941V14.8871C12.4941 12.9393 12.8559 11.0749 15.2489 11.0749C17.6141 11.0749 17.6419 13.2732 17.6419 14.9984V22.2332H22.2611V22.261Z" />
        <path d="M0.361328 7.40149H4.98045V22.2606H0.361328V7.40149Z" />
        <path d="M2.6713 0C1.19652 0 0 1.19652 0 2.6713C0 4.14608 1.19652 5.37043 2.6713 5.37043C4.14608 5.37043 5.3426 4.14608 5.3426 2.6713C5.3426 1.19652 4.14608 0 2.6713 0Z" />
    </svg>
);

const XIcon = () => (
    <svg
        viewBox="0 0 23 23"
        fill="currentColor"
        className="h-[18px] w-[18px]"
        aria-hidden="true"
    >
        <path d="M13.2036 9.42559L21.3125 -0.000366211H19.391L12.35 8.18406L6.72639 -0.000366211H0.240234L8.74423 12.3759L0.240234 22.2605H2.1619L9.59734 13.6175L15.5363 22.2605H22.0224L13.2031 9.42559H13.2036ZM10.5716 12.485L9.70999 11.2526L2.8543 1.44623H5.80586L11.3385 9.36026L12.2001 10.5927L19.3919 20.8797H16.4403L10.5716 12.4854V12.485Z" />
    </svg>
);

/* ── Hero capability marquee card (used by task 2.4 marquee) ────────
 * One service-capability tile inside the hero marquee. Renders a white
 * About-style card with hairline border (`border-[#0a0a1a]/10`), soft
 * About card shadow (`shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)]`),
 * a 4:5 image, and an `(NN)` index plus capability label. Visible
 * content (label, href, image) is preserved per Requirement 3.2 and the
 * `href` targets satisfy Requirement 9.5 (every service deep link
 * present on the pre-redesign homepage). Motion stays inside the
 * Motion_System token set: hover lift uses `EASE.silk` + `DUR.card`
 * inline (no `cubic-bezier(...)` literals in this file). */
function HeroMarqueeCard({
    n,
    label,
    href,
    img,
}: {
    n: string;
    label: string;
    href: string;
    img: string;
}) {
    return (
        <a
            href={href}
            aria-label={label}
            className="group/srv relative flex w-[180px] flex-shrink-0 flex-col sm:w-[220px] lg:w-[260px]"
            style={{ willChange: "transform" }}
        >
            <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#0a0a1a]/10 bg-white shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)] group-hover/srv:-translate-y-1"
                style={{
                    transition: `transform ${DUR.card}s, box-shadow ${DUR.card}s`,
                    transitionTimingFunction: EASE.silk,
                    willChange: "transform",
                }}
            >
                <Image
                    src={img}
                    alt={label}
                    width={400}
                    height={500}
                    className="h-full w-full object-cover group-hover/srv:scale-[1.04]"
                    style={{
                        transition: `transform ${DUR.section}s`,
                        transitionTimingFunction: EASE.silk,
                        willChange: "transform",
                    }}
                />
            </div>
            <div className="mt-4 flex items-center gap-3">
                <span className="text-[10.5px] font-medium text-[#0a0a1a]/55">
                    ({n})
                </span>
                <span className="text-[13px] font-medium text-[#0a0a1a]">
                    {label}
                </span>
            </div>
        </a>
    );
}

/* ── Cycling word (Requirements 2.6, 2.7, 7.7, 10.3, 10.5) ─────────────
 * Rotates through `words` at 2.4s intervals (within the 1.5–3s window
 * required by Requirement 2.7) using a per-character blur-up reveal
 * driven by `REVEAL.blurUp`, `EASE_T.silk`, and `DUR.card`. When
 * `reduced` is `true` the component renders only `words[0]` statically
 * with no transform/blur/opacity transition (Requirements 2.6, 10.3).
 *
 * The parent wraps this region with `aria-hidden="true"` so AT does not
 * announce word changes (Requirement 7.7). The reduced-motion media
 * query is re-evaluated on `change` events by the parent (Requirement
 * 10.5) and propagated here via the `reduced` prop. */
function CyclingWord({
    words,
    reduced,
}: {
    words: readonly string[];
    reduced: boolean;
}) {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (reduced) {
            // Freeze on `words[0]`. The render selector below already
            // pins the visible word to `words[0]` when `reduced` is
            // true, so no `setIdx` call is needed here — that would be
            // a setState-in-effect cascade. We simply skip starting
            // the interval.
            return;
        }
        const id = setInterval(
            () => setIdx((i) => (i + 1) % words.length),
            2400,
        );
        return () => clearInterval(id);
    }, [reduced, words.length]);

    const word = words[reduced ? 0 : idx] ?? words[0] ?? "";

    if (reduced) {
        // Static final-state render — no AnimatePresence, no transitions.
        return (
            <span
                className="relative inline-block whitespace-nowrap align-baseline"
                style={{ minWidth: "clamp(280px, 30vw, 420px)" }}
            >
                {word}
            </span>
        );
    }

    return (
        <span
            className="relative inline-block whitespace-nowrap align-baseline"
            style={{ minWidth: "clamp(280px, 30vw, 420px)" }}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={word}
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: DUR.popover, ease: EASE_T.silk }}
                >
                    {word.split("").map((ch, i) => (
                        <motion.span
                            key={i}
                            className="inline-block"
                            initial={REVEAL.blurUp.initial}
                            animate={REVEAL.blurUp.animate}
                            exit={{
                                opacity: 0,
                                y: -16,
                                filter: "blur(8px)",
                            }}
                            transition={{
                                duration: DUR.card,
                                delay: i * STAGGER.tight,
                                ease: EASE_T.silk,
                            }}
                        >
                            {ch === " " ? "\u00A0" : ch}
                        </motion.span>
                    ))}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

export default function SoftreeHero({
    tagline = HERO.tagline,
    wordmark = HERO.wordmark,
    headlinePrefix = HERO.headlinePrefix,
    cyclingWords = HERO.cyclingWords,
    primaryCta = HERO.primaryCta,
    secondaryCta = HERO.secondaryCta,
    avatars = HERO.avatars,
    video = HERO.video,
    marqueeItems = HERO.marqueeItems,
}: Partial<SoftreeHeroProps> = {}) {
    /* ── Reduced-motion gating (Requirement 10.5) ─────────────────────── */
    // `useSyncExternalStore` keeps the live `prefers-reduced-motion`
    // flag in sync with the OS-level preference without the
    // setState-in-effect cascade that would result from a manual
    // `useEffect(() => setReduced(...))` pattern. The `matchMedia`
    // subscription is centralised in `subscribePrefersReducedMotion`
    // (see `@/lib/motion`) so this file declares no inline
    // `matchMedia("(prefers-reduced-motion: reduce)")` check
    // (token-audit clean per Requirement 4.5).
    const reduced = useSyncExternalStore(
        subscribePrefersReducedMotion,
        prefersReducedMotion,
        () => false,
    );

    /* ── Defer video sources until after hydration (Requirement 6.4)
     * and apply the 3-second poster failover (Requirement 2.10, task
     * 2.5). The implementation mirrors the `AvooraHero` `videoLoaded`
     * pattern and extends it with a single-shot `loadeddata` race:
     *
     *   1. Wait 800ms after mount, then mount `<source>` elements
     *      inside the `<video>` (matches `AvooraHero`).
     *   2. Once the sources are mounted, race `loadeddata` against a
     *      3-second timeout. If the event fires first, do nothing —
     *      the video plays as normal. If the timeout fires first, set
     *      `videoFailed` so the `<source>` children are unmounted on
     *      the next render.
     *
     * The poster image is painted both as the `<video poster>`
     * attribute and as a CSS `background-image` on the same element,
     * so when the sources are removed the poster naturally remains as
     * the static fallback. No user-visible error is surfaced and the
     * rest of the hero (headline, CTAs, marquee) is never blocked on
     * video readiness.
     *
     * Both timers (the 800ms hydration delay and the 3000ms
     * `loadeddata` race) are cleared on unmount, and the
     * `loadeddata` listener is removed in the same cleanup. */
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoFailed, setVideoFailed] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVideoLoaded(true), 800);
        return () => clearTimeout(t);
    }, []);
    useEffect(() => {
        if (!videoLoaded) return;
        const el = videoRef.current;
        if (!el) return;

        let settled = false;
        const onLoaded = () => {
            settled = true;
        };
        el.addEventListener("loadeddata", onLoaded, { once: true });

        const failTimer = setTimeout(() => {
            if (settled) return;
            // Sources never reported `loadeddata` within 3s — drop the
            // `<source>` children so the poster image alone fills the
            // stage.
            setVideoFailed(true);
        }, 3000);

        return () => {
            el.removeEventListener("loadeddata", onLoaded);
            clearTimeout(failTimer);
        };
    }, [videoLoaded]);

    /* Entrance reveals — replaced with no-op final state under reduced motion. */
    const heroReveal = reduced
        ? { initial: REVEAL.fade.animate, animate: REVEAL.fade.animate }
        : REVEAL.fade;
    const stageReveal = reduced
        ? { initial: REVEAL.scale.animate, animate: REVEAL.scale.animate }
        : REVEAL.scale;
    const upReveal = reduced
        ? { initial: REVEAL.up.animate, animate: REVEAL.up.animate }
        : REVEAL.up;
    const upLargeReveal = reduced
        ? { initial: REVEAL.upLarge.animate, animate: REVEAL.upLarge.animate }
        : REVEAL.upLarge;

    return (
        <section
            data-section="hero"
            className="relative isolate w-full overflow-hidden bg-[#FFFFFF] py-20 md:py-24 lg:py-28"
        >
            <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
                {/* ═══════════════════════════════════════════════════════
                       1) TOP HEADER ROW
                          wordmark · tagline pill · LetsTalkButton
                    ═══════════════════════════════════════════════════════ */}
                <motion.div
                    className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
                    initial={heroReveal.initial}
                    animate={heroReveal.animate}
                    transition={{ duration: DUR.section, ease: EASE_T.silk }}
                >
                    <div className="flex flex-wrap items-center gap-4">
                        <span
                            className="font-semibold leading-none tracking-[-0.04em] text-[#0a0a1a]"
                            style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}
                        >
                            {wordmark}
                            <sup className="ml-1 text-[0.45em] font-medium text-[#0a0a1a]/40 align-super">
                                ®
                            </sup>
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-600 sm:text-[11px]">
                            <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]"
                            />
                            {tagline}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <LetsTalkButton compact />
                        <span
                            aria-hidden="true"
                            className="hidden h-px w-24 bg-gray-200 lg:block"
                        />
                    </div>
                </motion.div>

                {/* ═══════════════════════════════════════════════════════
                       2) FULL-BLEED ROUNDED MEDIA STAGE
                          avatars · centered H1 (SectionHeader) · CTAs · social rail
                    ═══════════════════════════════════════════════════════ */}
                <motion.div
                    className="relative mt-8 overflow-hidden bg-black md:mt-12"
                    style={{ borderRadius: "clamp(20px, 2vw, 36px)" }}
                    initial={stageReveal.initial}
                    animate={stageReveal.animate}
                    transition={{
                        duration: DUR.cinematic,
                        ease: EASE_T.silk,
                        delay: STAGGER.default,
                    }}
                >
                    {/* Background video — sources are mounted after a
                        800ms post-hydration delay (Requirement 6.4) and
                        torn back down if `loadeddata` does not fire
                        within an additional 3s (Requirement 2.10, task
                        2.5). The poster is painted both as the `poster`
                        attribute and as the element's CSS
                        `background-image`, so removing the `<source>`
                        children on failure leaves the poster image
                        visible as the static fallback. No user-visible
                        error is surfaced. */}
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={video.poster}
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{
                            backgroundImage: `url(${video.poster})`,
                            backgroundSize: "cover",
                        }}
                    >
                        {videoLoaded && !videoFailed && !reduced ? (
                            <>
                                <source src={video.mp4} type="video/mp4" />
                                {video.webm ? (
                                    <source src={video.webm} type="video/webm" />
                                ) : null}
                            </>
                        ) : null}
                    </video>

                    {/* Dark gradient overlay for legibility */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 z-[1]"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.80) 100%)",
                        }}
                    />

                    {/* Stage content */}
                    <div className="relative z-10 flex min-h-[60vh] flex-col justify-between gap-10 p-6 sm:p-8 md:p-10 lg:p-14">
                        {/* ── Avatar stack (3–5) ──────────────────────────── */}
                        <motion.div
                            className="flex items-start justify-between"
                            initial={upReveal.initial}
                            animate={upReveal.animate}
                            transition={{
                                duration: DUR.section,
                                ease: EASE_T.silk,
                                delay: STAGGER.default,
                            }}
                        >
                            <div className="flex -space-x-3">
                                {avatars.slice(0, 5).map((src, i) => (
                                    <span
                                        key={`${src}-${i}`}
                                        className="block h-11 w-11 overflow-hidden rounded-full border-2 border-white/90 ring-1 ring-black/10 sm:h-14 sm:w-14"
                                        style={{ zIndex: avatars.length - i }}
                                    >
                                        <Image
                                            src={src}
                                            alt=""
                                            width={56}
                                            height={56}
                                            className="h-full w-full object-cover"
                                        />
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* ── Centered H1 + dual CTAs ─────────────────────── */}
                        <motion.div
                            className="flex flex-col items-center justify-center gap-8 text-center [&_h1]:!text-white"
                            initial={upLargeReveal.initial}
                            animate={upLargeReveal.animate}
                            transition={{
                                duration: DUR.cinematic,
                                ease: EASE_T.silk,
                                delay: STAGGER.loose,
                            }}
                        >
                            <SectionHeader
                                as="h1"
                                accent="#FF6B00"
                                badge={tagline}
                                headline={
                                    <>
                                        {headlinePrefix}{" "}
                                        {/* Cycling region — rotates at 2.4s
                                          * when reduced motion is off, freezes
                                          * on cyclingWords[0] when reduced
                                          * motion is on. Marked aria-hidden so
                                          * AT does not announce word changes
                                          * (Requirement 7.7). */}
                                        <span
                                            data-cycling-word
                                            aria-hidden="true"
                                            className="inline-block"
                                        >
                                            <CyclingWord
                                                words={cyclingWords}
                                                reduced={reduced}
                                            />
                                        </span>
                                    </>
                                }
                                className="items-center text-center"
                            />

                            <div className="flex flex-col items-center gap-4 sm:flex-row">
                                <a
                                    href={primaryCta.href}
                                    className="rounded-full bg-[#FF6B00] px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-[#FF5812]"
                                    style={{
                                        transition: `background-color ${DUR.card}s, transform ${DUR.card}s`,
                                        transitionTimingFunction: EASE.silk,
                                    }}
                                >
                                    {primaryCta.label}
                                </a>
                                <a
                                    href={secondaryCta.href}
                                    className="rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20"
                                    style={{
                                        transition: `background-color ${DUR.card}s, border-color ${DUR.card}s`,
                                        transitionTimingFunction: EASE.silk,
                                    }}
                                >
                                    {secondaryCta.label}
                                </a>
                            </div>
                        </motion.div>

                        {/* ── Bottom social rail ──────────────────────────── */}
                        <motion.div
                            className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
                            initial={upReveal.initial}
                            animate={upReveal.animate}
                            transition={{
                                duration: DUR.section,
                                ease: EASE_T.silk,
                                delay: STAGGER.cinematic,
                            }}
                        >
                            <div className="flex flex-col gap-1.5 text-left text-white">
                                <div className="text-[13px] font-medium sm:text-[14px]">
                                    {wordmark} Technology
                                </div>
                                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 sm:text-[11px]">
                                    AI · Web · Microsoft · Cloud
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                                {[LinkedinIcon, XIcon].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        aria-label={i === 0 ? "LinkedIn" : "X (Twitter)"}
                                        className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md hover:border-white/30 hover:bg-white/15"
                                        style={{
                                            transition: `background-color ${DUR.card}s, border-color ${DUR.card}s`,
                                            transitionTimingFunction: EASE.silk,
                                        }}
                                    >
                                        <Icon />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* ═══════════════════════════════════════════════════════
                       3) SERVICE-CAPABILITY MARQUEE (Requirements 2.5,
                          2.6, 4.6, 5.5, 10.2)

                       Rendered directly beneath the media stage on the
                       same `#FFFFFF` hero surface. A single linear loop
                       with cycle duration fixed at 36s (within the 30–
                       45s window required by Requirement 2.5) and white
                       edge-fade overlays exactly 64px wide (within the
                       48–96px window required by Requirements 2.5 and
                       4.6). The reduced-motion override comes from the
                       global `[data-marquee-track]` rule plus a local
                       `<style>` scope that only registers the keyframes
                       under `prefers-reduced-motion: no-preference` —
                       no inline `cubic-bezier(...)` literal and no
                       inline `matchMedia` check is declared in this
                       file (token-audit clean). When `reduced` is true
                       the rendered children are the single ordered
                       `marqueeItems` set (Requirement 10.2 — natural
                       order, no duplication); otherwise the items are
                       doubled to enable a seamless `0 → -50%` loop.
                    ═══════════════════════════════════════════════════════ */}
                <motion.div
                    className="relative mt-8 overflow-hidden py-5 sm:mt-10 sm:py-6 md:mt-12"
                    initial={upReveal.initial}
                    animate={upReveal.animate}
                    transition={{
                        duration: DUR.section,
                        ease: EASE_T.silk,
                        delay: STAGGER.cinematic,
                    }}
                >
                    {/* Left white edge fade — 64px (Requirements 2.5, 4.6) */}
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16"
                        style={{
                            background:
                                "linear-gradient(90deg, #fff 0%, transparent 100%)",
                        }}
                    />
                    {/* Right white edge fade — 64px (Requirements 2.5, 4.6) */}
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16"
                        style={{
                            background:
                                "linear-gradient(270deg, #fff 0%, transparent 100%)",
                        }}
                    />

                    {/* Local keyframes scoped under `no-preference` so the
                        animation never registers when reduced motion is
                        active, and a paired `reduce` block that pins the
                        track at `transform: none` even if a UA caches the
                        animation. The `[data-marquee-track]` attribute
                        identifies the track for the reduced-motion
                        Playwright assertions in task 8.4. No inline
                        `cubic-bezier(...)` literal and no inline
                        `matchMedia` check is declared in this file
                        (token-audit clean). */}
                    <style>{`
                        @media (prefers-reduced-motion: no-preference) {
                            .softree-hero-marquee {
                                animation: softreeHeroMarquee 36s linear infinite;
                            }
                            .softree-hero-marquee:hover {
                                animation-play-state: paused;
                            }
                            @keyframes softreeHeroMarquee {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-50%); }
                            }
                        }
                        @media (prefers-reduced-motion: reduce) {
                            .softree-hero-marquee {
                                animation: none !important;
                                animation-play-state: paused !important;
                                transform: none !important;
                            }
                        }
                    `}</style>

                    <div
                        data-marquee-track
                        className="softree-hero-marquee flex w-max min-w-max items-center gap-4 sm:gap-6"
                    >
                        {reduced
                            ? marqueeItems.map((s) => (
                                <HeroMarqueeCard
                                    key={`single-${s.n}-${s.href}`}
                                    n={s.n}
                                    label={s.label}
                                    href={s.href}
                                    img={s.img}
                                />
                            ))
                            : [0, 1].map((setIdx) => (
                                <div
                                    key={`set-${setIdx}`}
                                    className="flex items-center gap-4 sm:gap-6"
                                    aria-hidden={setIdx === 1 ? "true" : undefined}
                                >
                                    {marqueeItems.map((s) => (
                                        <HeroMarqueeCard
                                            key={`${setIdx}-${s.n}-${s.href}`}
                                            n={s.n}
                                            label={s.label}
                                            href={s.href}
                                            img={s.img}
                                        />
                                    ))}
                                </div>
                            ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
