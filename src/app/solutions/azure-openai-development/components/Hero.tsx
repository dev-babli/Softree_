"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HERO_DATA } from "../data/heroData";

const HERO_VIDEO_SRC =
  "/images/solutions/azure-openai-development/azure-openai-hero.mp4?v=aoai-play-3";

export const Hero: React.FC = () => {
  const { label, heading, paragraph, ctaButtons, features, capabilities } =
    HERO_DATA;

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Browsers require the muted property + attribute for reliable autoplay.
    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playVideo = () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Retry once after a short delay (common on slow OneDrive loads).
          window.setTimeout(() => {
            video.muted = true;
            void video.play().catch(() => {});
          }, 400);
        });
      }
    };

    playVideo();
    video.addEventListener("loadeddata", playVideo);
    video.addEventListener("canplay", playVideo);
    video.addEventListener("canplaythrough", playVideo);

    const onVisibility = () => {
      if (!document.hidden) playVideo();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) playVideo();
          else video.pause();
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("canplaythrough", playVideo);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const },
    },
  };

  return (
    <section className="relative flex w-full min-h-[90vh] items-center overflow-hidden bg-transparent pb-12 pt-20 font-sans text-base text-[#0A0F3C] lg:min-h-screen lg:pb-16 lg:pt-28">
      <div className="pointer-events-none absolute right-0 top-1/2 h-[750px] w-[750px] -translate-y-1/2 opacity-30">
        <svg viewBox="0 0 700 700" fill="none" className="h-full w-full">
          <circle cx="500" cy="350" r="300" stroke="#FF5812" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" />
          <circle cx="500" cy="350" r="420" stroke="#FF5812" strokeWidth="1" opacity="0.15" />
          <circle cx="500" cy="350" r="540" stroke="#FF5812" strokeWidth="1" strokeDasharray="6 12" opacity="0.1" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <motion.div
            className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-orange-50 px-2.5 py-1"
            >
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                {label}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 w-full break-words text-3xl font-extrabold leading-[1.15] tracking-tight text-[#0A0F3C] sm:text-4xl sm:leading-[1.1] lg:text-5xl xl:text-[3.25rem]"
            >
              {heading.prefix}
              <span className="relative text-[#FF5812]"> {heading.highlight}</span>
              {heading.suffix}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-md text-sm font-normal leading-relaxed text-slate-600 lg:text-base"
            >
              {paragraph}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mb-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
            >
              <Link
                href={ctaButtons.primary.href}
                className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-[#0A0F3C] transition-all duration-300 hover:bg-gray-50 sm:w-auto"
              >
                <span>{ctaButtons.primary.text}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex w-full flex-col gap-5 border-t border-gray-100 pt-6 md:flex-row md:gap-4"
            >
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-start gap-2">
                      <Icon
                        className="mt-[1px] h-5 w-5 shrink-0 text-[#FF6B00]"
                        strokeWidth={1.5}
                      />
                      <h4 className="whitespace-pre-line text-[12.5px] font-semibold leading-[1.25] text-[#0A0F3C]">
                        {feature.title.replace(" ", "\n")}
                      </h4>
                    </div>
                    <p className="pr-2 text-[11px] leading-relaxed text-gray-500">
                      {feature.subtitle}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Azure OpenAI Loop — video in center + orbiting cards */}
          <motion.div
            className="relative mt-6 flex items-center justify-center lg:col-span-6 lg:mt-0"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="relative flex h-[340px] w-[340px] items-center justify-center sm:h-[460px] sm:w-[460px] lg:h-[500px] lg:w-[500px]">
              <motion.div
                className="pointer-events-none absolute h-56 w-56 rounded-full bg-gradient-to-tr from-[#FF6B00]/35 via-[#FF5812]/15 to-transparent blur-3xl sm:h-80 sm:w-80"
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="pointer-events-none absolute inset-5 rounded-full border-4 border-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.2)] sm:inset-7" />

              {capabilities.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    className="pointer-events-none absolute inset-5 rounded-full sm:inset-7"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  >
                    <div
                      className="pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                      style={{
                        left: `${50 + 50 * Math.cos((card.angle * Math.PI) / 180)}%`,
                        top: `${50 + 50 * Math.sin((card.angle * Math.PI) / 180)}%`,
                      }}
                    >
                      <div className="absolute z-10 h-3 w-3 rounded-full border-2 border-white bg-[#FF6B00] shadow-sm ring-2 ring-orange-200" />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                        className="z-20"
                      >
                        <motion.div
                          whileHover={{
                            y: -5,
                            scale: 1.07,
                            boxShadow:
                              "0 18px 28px -6px rgba(255, 107, 0, 0.25), 0 8px 12px -4px rgba(0, 0, 0, 0.08)",
                          }}
                          className="group flex w-[96px] cursor-pointer flex-col items-center rounded-2xl border border-gray-100/90 bg-white/95 p-2 text-center shadow-md shadow-gray-200/70 backdrop-blur-xl transition-all duration-300 sm:w-[120px] sm:p-3"
                        >
                          <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 transition-colors group-hover:bg-orange-100 sm:h-9 sm:w-9">
                            <Icon className="h-4 w-4 text-[#FF5812] sm:h-[18px] sm:w-[18px]" />
                          </div>
                          <h3 className="mb-0.5 text-[11px] font-bold leading-tight text-[#0A0F3C] sm:text-xs">
                            {card.title}
                          </h3>
                          <p className="text-[8.5px] font-medium leading-snug text-gray-500 sm:text-[10px]">
                            {card.subtitle}
                          </p>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Center: hero video (replaces robot) */}
              <div className="relative z-30 flex flex-col items-center justify-center">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="relative h-[168px] w-[168px] overflow-hidden rounded-full border-[4px] border-white bg-[#0B1220] shadow-[0_22px_55px_-16px_rgba(255,88,18,0.6)] ring-[6px] ring-[#FF5812]/30 sm:h-[220px] sm:w-[220px] lg:h-[240px] lg:w-[240px]">
                    <video
                      ref={videoRef}
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      disablePictureInPicture
                      disableRemotePlayback
                      controlsList="nodownload noplaybackrate noremoteplayback"
                      aria-label="Azure OpenAI development video — GPT apps, RAG, and copilots on Azure"
                    >
                      <source src={HERO_VIDEO_SRC} type="video/mp4" />
                    </video>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-4 pt-8 text-center">
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#FF6A13] sm:text-[10px]">
                        Live Azure OpenAI
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold text-white sm:text-xs">
                        GPT · RAG · Copilots
                      </p>
                    </div>
                  </div>
                </motion.div>

                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF5812]">
                  Azure OpenAI Loop
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
