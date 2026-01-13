"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  EffectFade,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

/* =========================
   DATA
========================= */
const cases = [
  {
    id: "moneygram",
    accent: "#E42313",
    bg: "https://ckl-website-v4-strapi-prod.s3.us-east-2.amazonaws.com/moneygram_background_fedf7f985e.png",
    logo:
      "https://ckl-website-v4-strapi-prod.s3.us-east-2.amazonaws.com/moneygram_logo_default_08c806d234.svg",
    categories: ["Blockchain", "Mobile"],
    title: "Global non-custodial wallet bridging cash and USDC on Stellar",
    image:
      "https://ckl-website-v4-strapi-prod.s3.us-east-2.amazonaws.com/moneygram_image_f51682e73b.png",
    link: "/portfolio/moneygram-wallet",
  },
  {
    id: "knapsack",
    accent: "#873C35",
    bg: "https://ckl-website-v4-strapi-prod.s3.us-east-2.amazonaws.com/knapsack_background_6480c35a4b.png",
    logo:
      "https://ckl-website-v4-strapi-prod.s3.us-east-2.amazonaws.com/knapsack_logo_default_e50612e023.svg",
    categories: ["AI", "Mobile"],
    title: "AI personalized assistant for strict financial environments",
    image:
      "https://ckl-website-v4-strapi-prod.s3.us-east-2.amazonaws.com/knapsack_image_18cc660d1e.png",
    link: "/portfolio/knapsack",
  },
  {
    id: "thaw",
    accent: "#DA540C",
    bg: "https://ckl-website-v4-strapi-prod.s3.us-east-2.amazonaws.com/thaw_background_bbb38e8682.png",
    logo:
      "https://ckl-website-v4-strapi-prod.s3.us-east-2.amazonaws.com/thaw_logo_default_b9be664c0a.svg",
    categories: ["IoT", "Mobile"],
    title: "Flutter-powered IoT app for personalized temperature control",
    image:
      "https://ckl-website-v4-strapi-prod.s3.us-east-2.amazonaws.com/thaw_image_5ce722fe1f.png",
    link: "/portfolio/thaw",
  },
];

/* =========================
   COMPONENT
========================= */
export default function CaseStudiesAdvanced() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-black py-28 overflow-hidden relative">
      {/* ACCENT GLOW */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(600px circle at 20% 30%, ${cases[activeIndex].accent}22, transparent 60%)`,
        }}
      />

      {/* HEADER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-12 bg-gradient-to-r from-cyan-400 to-transparent" />
          <span className="text-sm tracking-widest uppercase text-cyan-400">
            Case Studies
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-semibold text-white">
          Our work<span className="text-neutral-400">.</span>
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          A selection of digital products we’ve designed and engineered for
          global brands and fast-growing companies.
        </p>
      </div>

      {/* SLIDER */}
      <Swiper
        modules={[Pagination, EffectFade, Autoplay]}
        effect="fade"
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="relative z-10"
      >
        {cases.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="
                mx-6
                rounded-3xl
                overflow-hidden
                min-h-[680px]
                bg-white/5
                backdrop-blur-xl
                border border-white/10
              "
            >
              {/* BACKGROUND IMAGE */}
              <Image
                src={item.bg}
                alt=""
                fill
                className="object-cover opacity-20"
              />

              {/* CONTENT */}
              <div className="relative z-10 max-w-7xl mx-auto px-10 py-20 grid md:grid-cols-2 gap-16 items-center">
                {/* LEFT */}
                <div className="space-y-8 text-white">
                  <Image
                    src={item.logo}
                    alt="logo"
                    width={260}
                    height={60}
                  />

                  <div className="flex gap-3 text-sm font-medium text-gray-300">
                    {item.categories.map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1 rounded-full border border-white/20"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-semibold max-w-xl">
                    {item.title}
                  </h3>

                  <Link
                    href={item.link}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-6
                      py-3
                      border border-white/30
                      rounded-full
                      text-sm
                      font-medium
                      hover:border-cyan-400
                      hover:text-cyan-400
                      transition
                    "
                  >
                    View case study →
                  </Link>
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex justify-center">
                  <Image
                    src={item.image}
                    alt="case"
                    width={700}
                    height={900}
                    className="rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* PROGRESS BAR */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[220px] h-[3px] bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${((activeIndex + 1) / cases.length) * 100}%`,
              backgroundColor: cases[activeIndex].accent,
            }}
          />
        </div>
      </Swiper>
    </section>
  );
}
