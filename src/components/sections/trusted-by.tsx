"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface Logo {
  name: string;
  src: string;
}

const LOGOS: Logo[] = [
  { name: "GO ERP", src: "/images/logo/goerp1.jpg" },
  { name: "Nuvento", src: "/images/logo/nuvento.jpg" },
  { name: "Kwiz", src: "/images/logo/kwiz.png" },
  { name: "Jonians", src: "/images/logo/jonians.jpg" },
  { name: "Export Control", src: "/images/logo/ecg.png" },
  { name: "SP Marketplace", src: "/images/logo/sp-marketplace.png" },
  { name: "Bosch", src: "/images/logo/bosch.png" },
  { name: "Emscale", src: "/images/logo/emscale_logo.png" },
  { name: "Link Innovation", src: "/images/logo/link-innovation.png" },
  { name: "Intellectt", src: "/images/logo/Intellectt_logo.png" },
];

/* ---------------------------------------------------------------------------
 * LogoCard
 * White tile keeps mixed JPG/PNG logos legible and on-brand.
 * Apple/Stripe trust-grid convention.
 * ------------------------------------------------------------------------- */
function LogoCard({ logo }: { logo: Logo }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  const handleError = () => {
    if (imgRef.current) imgRef.current.style.display = "none";
    if (fallbackRef.current) fallbackRef.current.style.display = "flex";
  };

  return (
    <div
      role="img"
      aria-label={logo.name}
      title={logo.name}
      className="
        group relative flex h-[96px] w-[200px] flex-shrink-0 items-center justify-center
        overflow-hidden rounded-[18px]
        bg-white
        ring-1 ring-black/[0.06]
        shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-12px_rgba(0,0,0,0.18)]
        transition-[transform,box-shadow,ring-color]
        duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-[2px]
        hover:ring-black/[0.12]
        hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_18px_38px_-14px_rgba(0,0,0,0.28)]
      "
    >
      {/* Top hairline highlight — barely-there gloss */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent"
      />

      {/* Logo */}
      <div className="relative flex h-12 w-[150px] items-center justify-center">
        <img
          ref={imgRef}
          src={logo.src}
          alt=""
          loading="lazy"
          decoding="async"
          onError={handleError}
          draggable={false}
          className="
            max-h-full max-w-full select-none object-contain
            opacity-[0.86]
            transition-opacity duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:opacity-100
          "
        />
        <div
          ref={fallbackRef}
          className="
            hidden h-11 w-11 items-center justify-center rounded-full
            border border-black/10 bg-black/[0.04]
            text-[12px] font-semibold uppercase tracking-[0.06em] text-black/65
          "
        >
          {logo.name.slice(0, 2)}
        </div>
      </div>

      {/* Bottom-edge inner shadow — gives the tile a tiny bit of depth */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.04), transparent)",
        }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * MarqueeRow
 * - Pauses when off-screen (battery / GPU)
 * - Pauses on hover so users can read a logo
 * - Honors prefers-reduced-motion
 * ------------------------------------------------------------------------- */
function MarqueeRow({
  items,
  reverse = false,
  duration = "60s",
}: {
  items: Logo[];
  reverse?: boolean;
  duration?: string;
}) {
  const repeated = [...items, ...items, ...items, ...items];
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const track = el.querySelector<HTMLElement>(".softree-trust-track");
        if (!track) return;
        track.style.animationPlayState = entry.isIntersecting
          ? "running"
          : "paused";
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="overflow-hidden">
      <div
        className="softree-trust-track flex w-max items-center gap-4 py-3"
        style={{
          animation: `softree-trust-scroll ${duration} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          willChange: "transform",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "running";
        }}
      >
        {repeated.map((logo, i) => (
          <LogoCard key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * TrustedBy
 * Quiet authority. White tiles on a near-black canvas — Apple convention.
 * ------------------------------------------------------------------------- */
export default function TrustedBy() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.97, 1, 1]);
  const rawBlur = useTransform(scrollYProgress, [0, 0.3, 1], [4, 0, 0]);
  const scale = useSpring(rawScale, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
  });
  const blur = useSpring(rawBlur, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
  });
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);

  const row1 = LOGOS.slice(0, 5);
  const row2 = LOGOS.slice(5);

  return (
    <>
      <style jsx global>{`
        @keyframes softree-trust-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .softree-trust-track {
            animation: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        aria-labelledby="trustedby-heading"
        className="relative overflow-hidden bg-[#070708] py-24 sm:py-28 lg:py-32"
      >
        {/* Top + bottom horizon seams */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
          }}
        />

        {/* Soft warm bloom — confident, not loud */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 35% at 50% 30%, rgba(255,122,47,0.07), transparent 65%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-6">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", duration: 0.75, bounce: 0 }}
            className="mx-auto max-w-[44rem] text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/60 backdrop-blur">
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[#f97316]">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#f97316]/60" />
              </span>
              Trusted globally
            </span>

            <h2
              id="trustedby-heading"
              className="mt-6 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-[-0.025em] text-white sm:text-[3rem] lg:text-[3.5rem]"
            >
              Built with teams the world relies on.
            </h2>

            <p className="mx-auto mt-5 max-w-[36rem] text-[15px] leading-relaxed text-white/55">
              From quiet enterprises to fast-moving product teams, partners
              choose Softree to ship work that lasts.
            </p>
          </motion.header>

          {/* Marquee block */}
          <motion.div
            style={{
              scale,
              filter: blurFilter,
              willChange: "transform, filter, opacity",
            }}
            className="relative mt-16"
          >
            {/* Wide cinematic edge fades */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 sm:w-48 lg:w-64"
              style={{
                background:
                  "linear-gradient(to right, #070708 10%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 sm:w-48 lg:w-64"
              style={{
                background:
                  "linear-gradient(to left, #070708 10%, transparent 100%)",
              }}
            />

            <div className="space-y-4">
              <MarqueeRow
                items={row1}
                duration={reduceMotion ? "0s" : "60s"}
              />
              <MarqueeRow
                items={row2}
                reverse
                duration={reduceMotion ? "0s" : "75s"}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
