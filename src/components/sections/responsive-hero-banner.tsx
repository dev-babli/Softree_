"use client";

import React from "react";
import dynamic from "next/dynamic";



interface Partner {
  logoUrl: string;
  href: string;
}

interface ResponsiveHeroBannerProps {
  logoUrl?: string;
  backgroundImageUrl?: string;
  backgroundImageDesktop?: string;
  backgroundImageTablet?: string;
  backgroundImageMobile?: string;
  badgeText?: string;
  badgeLabel?: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  partnersTitle?: string;
  partners?: Partner[];
  features?: string[];
}

const HERO_IMAGES = {
  desktop:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg",
  tablet:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg",
  mobile:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg",
};

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  logoUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/febf2421-4a9a-42d6-871d-ff4f9518021c_1600w.png",
  backgroundImageUrl,
  backgroundImageDesktop = HERO_IMAGES.desktop,
  backgroundImageTablet = HERO_IMAGES.tablet,
  backgroundImageMobile = HERO_IMAGES.mobile,
  badgeLabel = "Microsoft",
  badgeText = "Partner",
  title = "Your Trusted Global Microsoft Technology Delivery Partner",
  titleLine2 = "",
  description = "Engineering support across Power Platform, Data, AI & Modern Applications.",
  primaryButtonText = "Partner With Us",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Schedule a Strategy Call",
  secondaryButtonHref = "/contact",
  partnersTitle = "Partnering with leading space agencies worldwide",
  partners = [],
  features = [
    "White-Label Friendly",
    "NDA-Driven",
    "Since 2013",
    "Flexible Scaling",
    "Direct Leadership Access",
  ],
}) => {
  const useSingleImage = Boolean(backgroundImageUrl);

  return (
    <section className="w-full bg-black isolate min-h-screen overflow-hidden relative">
      {/* ================= BACKGROUND ================= */}
      {useSingleImage ? (
        <img
          src={backgroundImageUrl}
          alt=""
          className="w-full h-full object-cover absolute inset-0 z-0"
        />
      ) : (
        <>
          <img
            src={backgroundImageMobile}
            alt=""
            className="w-full h-full object-cover absolute inset-0 md:hidden z-0"
          />
          <img
            src={backgroundImageTablet}
            alt=""
            className="hidden md:block lg:hidden w-full h-full object-cover absolute inset-0 z-0"
          />
          <img
            src={backgroundImageDesktop}
            alt=""
            className="hidden lg:block w-full h-full object-cover absolute inset-0 z-0"
          />
        </>
      )}

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30 z-0" />
      <div className="hidden lg:block absolute left-0 top-0 h-full w-1/2 z-[1] pointer-events-none overflow-hidden">
        <div className="h-full w-full mask-gradient-left">
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="z-10 relative">
        <div className="sm:pt-28 md:pt-32 lg:pt-40 max-w-7xl mx-auto pt-28 px-6 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur animate-fade-slide-in-1">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                alt="Microsoft"
                className="h-5 w-auto"
              />
              <span className="text-sm font-medium text-white/90 font-sans">
                {badgeLabel} {badgeText}
              </span>
            </div>

            {/* Title */}
            <h1 className="sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-4xl text-white tracking-tight font-instrument-serif font-normal animate-fade-slide-in-2">
              {title}
              {titleLine2 && (
                <>
                  <br className="hidden sm:block" />
                  {titleLine2}
                </>
              )}
            </h1>

            {/* Description */}
            <p className="sm:text-lg animate-fade-slide-in-3 text-base text-white/80 max-w-2xl mt-6 mx-auto">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row sm:gap-4 mt-10 gap-3 items-center justify-center animate-fade-slide-in-4">
              {/* Primary Button */}
              <a
                href={primaryButtonHref}
                className="inline-flex items-center gap-2 leading-none hover:bg-white/15 text-sm font-medium text-white bg-white/10 ring-white/15 ring-1 rounded-full py-3 px-6 font-sans transition-all duration-200"
              >
                {primaryButtonText}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0 overflow-visible"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>

              {/* Secondary Button */}
              <a
                href={secondaryButtonHref}
                className="inline-flex items-center gap-2 leading-none rounded-full bg-transparent px-6 py-3 text-sm font-medium text-white/90 hover:text-white border border-white/30 hover:border-white font-sans transition-all duration-200"
              >
                {secondaryButtonText}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 shrink-0 overflow-visible"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-slide-in-2">
              {features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 ring-1 ring-white/15 backdrop-blur"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveHeroBanner;
