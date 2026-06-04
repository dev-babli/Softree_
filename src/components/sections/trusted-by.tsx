"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { PARTNER_LOGOS } from "@/components/qc/homepage-light/AboutClientLogos";
import { DUR, EASE_T, VIEWPORT } from "@/lib/motion";

/** About Us primary accent — dark-section chrome */
const BRAND_ACCENT = "#FF5812";
const SURFACE = "#070708";

type Logo = { name: string; src: string };

const LOGOS: Logo[] = PARTNER_LOGOS.map(({ name, src }) => ({ name, src }));

/* ---------------------------------------------------------------------------
 * LogoCard — white tiles on dark canvas (Apple / Stripe trust-grid convention)
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
        motion-reduce:hover:translate-y-0
      "
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent"
      />

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

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.04), transparent)",
        }}
      />
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  duration = "60s",
  paused = false,
}: {
  items: Logo[];
  reverse?: boolean;
  duration?: string;
  paused?: boolean;
}) {
  const repeated = [...items, ...items, ...items, ...items];
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
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
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [paused]);

  return (
    <div ref={wrapRef} className="overflow-hidden">
      <div
        className="softree-trust-track flex w-max items-center gap-4 py-3"
        style={{
          animation: paused
            ? "none"
            : `softree-trust-scroll ${duration} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          willChange: paused ? "auto" : "transform",
        }}
        onMouseEnter={(e) => {
          if (paused) return;
          (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          if (paused) return;
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

function TrustSectionHeader() {
  return (
    <header className="mx-auto flex max-w-[44rem] flex-col items-center gap-6 text-center">
      <span
        className="inline-flex w-max items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.20em]"
        style={{
          color: BRAND_ACCENT,
          borderColor: "rgba(255, 88, 18, 0.22)",
          backgroundColor: "rgba(255, 88, 18, 0.08)",
        }}
      >
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full motion-reduce:animate-none"
          style={{ backgroundColor: BRAND_ACCENT }}
        />
        Trusted by
      </span>

      <h2
        id="trustedby-heading"
        className="text-balance font-semibold leading-[0.9] tracking-[-0.04em] text-white"
        style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}
      >
        Built with teams the world relies on.
      </h2>

      <p className="max-w-[36rem] text-base leading-relaxed text-white/55">
        From quiet enterprises to fast-moving product teams, partners choose
        Softree to ship work that lasts.
      </p>
    </header>
  );
}

export default function TrustedBy() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.98, 1, 1]);
  const scale = useSpring(rawScale, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
  });

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
        data-section="trusted-by"
        data-theme-section="dark"
        aria-labelledby="trustedby-heading"
        className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
        style={{ backgroundColor: SURFACE }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24"
          style={{
            background: `linear-gradient(to bottom, ${SURFACE}, transparent)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{
            background: `linear-gradient(to top, ${SURFACE}, transparent)`,
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(50% 35% at 50% 30%, rgba(255, 88, 18, 0.07), transparent 65%)`,
          }}
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT.default}
            transition={{ duration: DUR.panel, ease: EASE_T.silk }}
          >
            <TrustSectionHeader />
          </motion.div>

          <motion.div
            style={reduceMotion ? undefined : { scale, willChange: "transform" }}
            className="relative mt-12 sm:mt-14"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 sm:w-48 lg:w-64"
              style={{
                background: `linear-gradient(to right, ${SURFACE} 10%, transparent 100%)`,
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 sm:w-48 lg:w-64"
              style={{
                background: `linear-gradient(to left, ${SURFACE} 10%, transparent 100%)`,
              }}
            />

            <div className="space-y-4">
              <MarqueeRow
                items={row1}
                duration="60s"
                paused={!!reduceMotion}
              />
              <MarqueeRow
                items={row2}
                reverse
                duration="75s"
                paused={!!reduceMotion}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
