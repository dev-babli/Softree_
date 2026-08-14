"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Users,
  Cloud,
  CheckCircle2,
} from "lucide-react";
import { useIndustryConfig } from "../context";

/** Softree trust strip — used in stacked industry heroes */
const TRUST_FEATURES = [
  {
    icon: Shield,
    title: "White-Label Friendly",
    subtitle: "Seamless integration",
  },
  {
    icon: Users,
    title: "Dedicated Offshore Teams",
    subtitle: "Scalable capacity",
  },
  {
    icon: Cloud,
    title: "Microsoft AI Expertise",
    subtitle: "Certified partners",
  },
  {
    icon: CheckCircle2,
    title: "Enterprise-Ready Delivery",
    subtitle: "Proven execution",
  },
] as const;

/** Cycling chip buttons — active: orange border + dot */
function AnimatedPanelChips({
  chips,
  className = "",
  variant = "dark",
  size = "md",
}: {
  chips: string[];
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md";
}) {
  const items = chips.slice(0, 4);
  const [active, setActive] = useState(0);
  const isLight = variant === "light";
  const isSm = size === "sm";

  useEffect(() => {
    if (items.length < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, [items.length]);

  return (
    <div
      className={`flex max-w-full flex-wrap items-center ${isSm ? "gap-1" : "gap-1.5 sm:gap-2"} ${className}`}
      aria-label="Runtime signals"
    >
      {items.map((chip, idx) => {
        const isActive = idx === active;
        return (
          <motion.button
            key={chip}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              opacity: { duration: 0.35, delay: 0.06 * idx },
              y: { duration: 0.35, delay: 0.06 * idx },
            }}
            onClick={() => setActive(idx)}
            className={`inline-flex items-center justify-center gap-1 rounded-md border font-bold uppercase tracking-[0.12em] transition-colors duration-300 ${
              isSm
                ? "min-h-[22px] px-2 py-0.5 text-[8px] sm:min-h-[24px] sm:px-2.5 sm:text-[9px]"
                : "min-h-[28px] gap-1.5 px-2.5 py-1.5 text-[9px] sm:min-h-[32px] sm:rounded-lg sm:px-3.5 sm:py-2 sm:text-[10px]"
            } ${
              isLight
                ? isActive
                  ? "border-[#FF6A13] bg-orange-50 text-[#0A0F3C]"
                  : "border-slate-200 bg-white/80 text-slate-600 hover:border-slate-300 hover:bg-white"
                : isActive
                  ? "border-[#FF6A13] bg-black/55 text-white shadow-[0_0_0_1px_rgba(255,106,19,0.25)]"
                  : "border-white/25 bg-black/40 text-white/90 hover:border-white/40 hover:bg-black/50"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isActive ? (
                <motion.span
                  key="dot"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A13]"
                />
              ) : null}
            </AnimatePresence>
            {chip}
          </motion.button>
        );
      })}
    </div>
  );
}

export const Hero: React.FC = () => {
  const { hero } = useIndustryConfig();
  const {
    label,
    heading,
    paragraph,
    ctaButtons,
    features,
    capabilities,
    layout = "split",
    heroImage,
    heroVideo,
    heroMediaClass = "object-center",
    textTone = "dark",
    softGlow = false,
    panelLabel,
    panelChips,
    panelCaption,
    panelSubcaption,
  } = hero;

  const videoRef = useRef<HTMLVideoElement>(null);
  const isStacked = layout === "stacked";
  const isLightText = textTone === "light";

  useEffect(() => {
    if (!heroVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;
    video.loop = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playVideo = () => {
      video.muted = true;
      if (video.paused) {
        void video.play().catch(() => {
          window.setTimeout(() => {
            video.muted = true;
            void video.play().catch(() => {});
          }, 350);
        });
      }
    };

    playVideo();
    video.addEventListener("loadeddata", playVideo);
    video.addEventListener("canplay", playVideo);

    const onVisibility = () => {
      if (!document.hidden) playVideo();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) playVideo();
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, [heroVideo]);

  /* ───────── Stacked hero — light video background (all 4 industry pages) ───────── */
  if (isStacked) {
    return (
      <section
        className={`relative flex min-h-[100svh] w-full items-end overflow-hidden font-sans ${
          isLightText ? "bg-[#0B1220] text-white" : "bg-zinc-100 text-[#0A0F3C]"
        }`}
      >
        {/* Full-bleed video — original, no wash / filters */}
        {heroVideo ? (
          <video
            ref={videoRef}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${heroMediaClass}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload noplaybackrate noremoteplayback"
            aria-label={`${panelLabel} — muted background`}
            poster={heroImage}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`object-cover ${heroMediaClass}`}
            unoptimized
          />
        )}

        {/* Soft center glow — logistics only (busy light video) */}
        {softGlow ? (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.28) 42%, transparent 72%)",
            }}
          />
        ) : null}

        <div className="relative z-10 mx-auto flex w-full max-w-[85rem] flex-col px-4 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32 lg:px-8 lg:pb-14 lg:pt-36">
          {/* Editorial content */}
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className={`mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 shadow-sm backdrop-blur-sm ${
                isLightText
                  ? "border border-white/20 bg-black/45"
                  : "border border-orange-100/80 bg-white/90"
              }`}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5812]" />
              <span
                className={`text-[10px] font-bold uppercase tracking-[0.18em] sm:text-[11px] ${
                  isLightText ? "text-white" : "text-[#FF5812]"
                }`}
              >
                {label}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className={`max-w-[22ch] text-balance text-[clamp(1.85rem,5vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.035em] sm:max-w-3xl ${
                isLightText
                  ? "text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)]"
                  : "text-[#0A0F3C] [text-shadow:0_1px_0_rgba(255,255,255,0.9),0_8px_24px_rgba(255,255,255,0.85)]"
              }`}
            >
              {heading.prefix}{" "}
              <span className="text-[#FF5812]">{heading.highlight}</span>
              {heading.suffix}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className={`mt-5 max-w-2xl text-[15px] font-medium leading-relaxed sm:text-base ${
                isLightText
                  ? "text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]"
                  : "text-[#0A0F3C] [text-shadow:0_1px_0_rgba(255,255,255,0.95),0_6px_18px_rgba(255,255,255,0.9)]"
              }`}
            >
              {paragraph}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex w-full flex-wrap items-center justify-center gap-3"
            >
              <Link
                href={ctaButtons.primary.href}
                className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#FF5812] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(255,88,18,0.28)] transition-colors duration-300 hover:bg-[#E64C00] sm:w-auto"
              >
                <span>{ctaButtons.primary.text}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Glass runtime panel — compact height, full width */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="mt-12 w-full rounded-xl border border-white/80 bg-white/90 px-3 py-2.5 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.25)] backdrop-blur-md sm:mt-14 sm:rounded-2xl sm:px-4 sm:py-3 lg:mt-16 lg:px-5 lg:py-3"
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-200/60 pb-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <p className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF5812]">
                  {panelLabel}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <AnimatedPanelChips chips={panelChips} variant="light" size="sm" />
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-emerald-700">
                  <span className="h-1 w-1 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>
            </div>

            <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-0">
              {TRUST_FEATURES.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className={`flex min-w-0 items-center gap-2.5 px-1 py-0.5 sm:px-2.5 lg:px-4 xl:px-5 ${
                      idx > 0 ? "lg:border-l lg:border-slate-200/70" : ""
                    }`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 ring-1 ring-orange-100">
                      <Icon className="h-4 w-4 text-[#FF5812]" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-[12px] font-bold leading-tight text-[#0A0F3C]">
                        {feature.title}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-tight text-slate-500">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ───────── Split hero (other industry pages) ───────── */
  const splitSteps = capabilities.slice(0, 5);

  return (
    <section className="relative flex w-full items-center overflow-hidden bg-transparent pb-12 pt-20 font-sans text-base text-[#0A0F3C] lg:min-h-[90vh] lg:pb-16 lg:pt-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 35%, rgba(255,88,18,0.12), transparent 42%), linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)",
          backgroundSize: "auto, 28px 28px, 28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="flex h-full flex-col justify-center text-center lg:pr-2 lg:text-left">
            <div className="mb-5 inline-flex items-center justify-center gap-1.5 self-center rounded-full border border-orange-100 bg-orange-50 px-2.5 py-1 lg:justify-start lg:self-start">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                {label}
              </span>
            </div>

            <h1 className="mb-5 w-full break-words text-3xl font-extrabold leading-[1.15] tracking-tight text-[#0A0F3C] sm:text-4xl sm:leading-[1.12] lg:text-[2.45rem] xl:text-[2.85rem]">
              {heading.prefix}
              <span className="relative text-[#FF5812]"> {heading.highlight}</span>
              {heading.suffix}
            </h1>

            <p className="mx-auto mb-7 max-w-xl text-sm font-normal leading-relaxed text-slate-600 lg:mx-0 lg:text-base">
              {paragraph}
            </p>

            <div className="mb-8 flex w-full justify-center lg:justify-start">
              <Link
                href={ctaButtons.primary.href}
                className="group inline-flex min-h-[44px] w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-[#0A0F3C] transition-all duration-300 hover:bg-gray-50 sm:w-auto"
              >
                <span>{ctaButtons.primary.text}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-auto grid w-full grid-cols-1 gap-x-6 gap-y-5 border-t border-gray-100 pt-6 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex min-w-0 flex-col gap-1.5 text-left">
                    <div className="flex items-start gap-2">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#FF6B00]" strokeWidth={1.5} />
                      <h4 className="text-[12px] font-semibold leading-snug text-[#0A0F3C] sm:text-[12.5px]">
                        {feature.title}
                      </h4>
                    </div>
                    <p className="pl-7 text-[11px] leading-relaxed text-gray-500 sm:pl-8">
                      {feature.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative flex h-full w-full flex-col aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-0">
            <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1a1520] shadow-[0_28px_70px_-28px_rgba(15,23,42,0.5)] sm:min-h-[320px] sm:rounded-[28px] lg:min-h-[480px]">
              <div className="relative z-10 flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/10 px-3 py-2.5 sm:px-4 sm:py-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#FF6A13] sm:text-[10px]">
                  {panelLabel}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <AnimatedPanelChips chips={panelChips} />
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>
              </div>

              <div className="relative z-10 flex shrink-0 gap-2 overflow-x-auto border-b border-white/10 px-3 py-2 sm:px-4">
                {splitSteps.map((step, idx) => (
                  <div key={step.id} className="flex shrink-0 items-center gap-2">
                    <span className="text-[9px] font-semibold text-white/80 sm:text-[10px]">
                      {step.title}
                    </span>
                    {idx < splitSteps.length - 1 && (
                      <span className="text-white/25">→</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="relative z-10 min-h-[220px] flex-1 sm:min-h-[260px]">
                {heroVideo ? (
                  <video
                    ref={videoRef}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={heroImage}
                  >
                    <source src={heroVideo} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={heroImage}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 480px"
                    className="object-cover"
                    unoptimized
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-3 sm:p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF6A13]">
                    {panelCaption}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                    {panelSubcaption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
