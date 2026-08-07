"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HERO_DATA } from "../data/heroData";

const HERO_VIDEO_SRC =
  "/images/solutions/lang-graph-development/lang-graph-hero.mp4?v=lg-hero-vid-1";

export const Hero: React.FC = () => {
  const { label, heading, paragraph, ctaButtons, features, capabilities } =
    HERO_DATA;

  const videoRef = useRef<HTMLVideoElement>(null);
  const graphSteps = capabilities.slice(0, 5);
  const runtimeChips = ["graphs", "agents", "hitl", "tools", "memory"];

  useEffect(() => {
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
  }, []);

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
          {/* 50% — Content */}
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

          {/* 50% — Video panel */}
          <div className="relative flex h-full w-full flex-col aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-0">
            <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1a1520] shadow-[0_28px_70px_-28px_rgba(15,23,42,0.5)] sm:min-h-[320px] sm:rounded-[28px] lg:min-h-[480px]">
              <div className="pointer-events-none absolute -right-12 top-0 h-44 w-44 rounded-full bg-[#FF5812]/20 blur-3xl" />

              {/* Runtime strip */}
              <div className="relative z-10 flex shrink-0 items-center justify-between gap-2 border-b border-white/10 px-3 py-2.5 sm:px-4 sm:py-3">
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#FF6A13] sm:text-[10px]">
                    LangGraph Runtime
                  </p>
                </div>
                <div className="hidden min-w-0 items-center gap-1 overflow-x-auto md:flex [&::-webkit-scrollbar]:hidden">
                  {graphSteps.map((step, idx) => (
                    <React.Fragment key={step.id}>
                      <span className="shrink-0 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-bold text-white/85">
                        {step.title}
                      </span>
                      {idx < graphSteps.length - 1 && (
                        <ArrowRight className="h-3 w-3 shrink-0 text-[#FF6A13]/70" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Live
                </span>
              </div>

              {/* Video area */}
              <div className="relative z-10 min-h-[220px] flex-1 sm:min-h-[260px]">
                <video
                  ref={videoRef}
                  className="pointer-events-none absolute inset-0 h-full w-full bg-[#D7EEE4] object-contain object-center"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  disableRemotePlayback
                  controlsList="nodownload noplaybackrate noremoteplayback"
                  aria-label="LangGraph development — stateful graphs, multi-agent workflows, and HITL"
                >
                  <source src={HERO_VIDEO_SRC} type="video/mp4" />
                </video>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FF5812]/8 via-transparent to-transparent" />

                <div className="absolute left-3 top-3 z-20 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5 sm:left-4 sm:top-4">
                  {runtimeChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-md border border-slate-300/40 bg-white/90 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-slate-700 backdrop-blur-sm"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-3 sm:p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF6A13]">
                    Live LangGraph runtime
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                    Graphs · Agents · Tools · HITL
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
