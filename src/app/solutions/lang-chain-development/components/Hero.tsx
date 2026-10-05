"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HERO_DATA } from "../data/heroData";
import TrustStrip from "@/components/sections/TrustStrip";

const HERO_VIDEO_SRC =
  "/images/solutions/lang-chain-development/lang-chain-hero.mp4?v=langchain-hero-cine-2";

export const Hero: React.FC = () => {
  const { label, heading, paragraph } = HERO_DATA;
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
            void video.play().catch(() => { });
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
    <section className="relative flex min-h-[auto] w-full flex-col justify-center overflow-hidden bg-[#0B0B0F] font-sans text-white pt-24 pb-8 sm:pt-28 sm:pb-10 lg:min-h-[85svh] lg:pt-32 lg:pb-12">
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

      <div className="relative z-10 mx-auto flex w-full max-w-[85rem] flex-col gap-6 px-4 sm:gap-8 sm:px-6 lg:px-8">
        {/* Editorial content */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-[#FF5812] px-3.5 py-1.5"
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
            className="mt-3.5 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]"
          >
            {paragraph}
          </motion.p>
        </div>

        {/* Trust Strip Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="w-full [&>div]:!mt-0 [&>div]:!gap-4 sm:[&>div]:!gap-6"
        >
          <TrustStrip theme="dark" />
        </motion.div>
      </div>
    </section>
  );
};
