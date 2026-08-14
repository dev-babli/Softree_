"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { HERO_DATA } from "../data/heroData";

const HERO_VIDEO_SRC =
  "/images/solutions/lang-chain-development/lang-chain-hero.mp4?v=langchain-hero-cine-2";

export const Hero: React.FC = () => {
  const { label, heading, paragraph, ctaButtons, features } = HERO_DATA;
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-[#0B0B0F] font-sans text-white">
      {/* Full-bleed muted video */}
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload noplaybackrate noremoteplayback"
        aria-label="LangChain development hero preview"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Light overlays — video stays clear; text stays readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

      <div className="relative z-10 mx-auto flex w-full max-w-[85rem] flex-col px-4 pb-8 pt-28 sm:px-6 sm:pb-10 sm:pt-32 lg:px-8 lg:pb-12 lg:pt-36">
        {/* Editorial content */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#FF5812] px-3.5 py-1.5"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:text-[11px]">
              {label}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-balance text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white"
          >
            {heading.prefix}{" "}
            <span className="text-[#FF5812]">{heading.highlight}</span>
            {heading.suffix}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]"
          >
            {paragraph}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Link
              href={ctaButtons.primary.href}
              className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#FF5812] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(255,88,18,0.35)] transition-colors duration-300 hover:bg-[#E64C00]"
            >
              <Phone className="h-4 w-4" strokeWidth={2} />
              <span>{ctaButtons.primary.text}</span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom feature bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-12 w-full rounded-2xl border border-white/10 bg-[#0d0d12]/80 p-4 shadow-[inset_0_1px_0_rgba(255,88,18,0.12)] backdrop-blur-sm sm:mt-14 sm:rounded-[1.35rem] sm:p-5 lg:mt-16 lg:p-6"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`flex min-w-0 items-center gap-3 px-1 sm:px-3 lg:px-5 ${
                    idx > 0 ? "lg:border-l lg:border-white/10" : ""
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/10">
                    <Icon className="h-5 w-5 text-[#FF5812]" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold leading-snug text-white">
                      {feature.title}
                    </p>
                    <p className="mt-0.5 text-[12px] leading-snug text-white/55">
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
};
