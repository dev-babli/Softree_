"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import "keen-slider/keen-slider.min.css";

/* ================= DATA ================= */

const stories = [
  {
    title: "Boosting Customer Satisfaction with Azure & Power BI",
    desc: "Built a scalable Azure analytics and Power BI platform that accelerated insights, improved reporting accuracy, and delivered a measurable increase in customer satisfaction.",
    image: "/images/power-bi/1.png",
  },
  {
    title: "Reducing Inventory Costs Through Data-Driven Insights",
    desc: "Implemented advanced Power BI dashboards to improve inventory visibility, demand forecasting, and margin analysis across a multi-channel retail enterprise.",
    image: "/images/power-bi/2.png",
  },
  {
    title: "Enabling Faster Decisions with Cloud Analytics",
    desc: "Integrated a cloud-based data warehouse with Power BI to deliver unified reporting, self-service analytics, and faster, more confident business decisions.",
    image: "/images/power-bi/3.png",
  },
];

/* ================= COMPONENT ================= */

export default function PowerBISuccessStoriesDark() {
  const [current, setCurrent] = useState(0);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1.35,
      spacing: 48,
      origin: "center",
    },
    slideChanged(s) {
      setCurrent(s.track.details.rel);
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1 },
      },
    },
  });

  return (
    <section className="relative bg-[#05070C] py-36 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 bg-sky-500/10 blur-[160px]" />
      <div className="absolute bottom-0 -right-40 h-[420px] w-[420px] bg-purple-500/10 blur-[160px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ===== Heading ===== */}
        <div className="text-center max-w-4xl mx-auto mb-28">
          <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

          <h2 className="text-4xl md:text-5xl font-semibold text-white">
            <span className="block">Power BI Consulting That Drives</span>
            <span className="relative inline-block mt-2 text-blue-500">
              Real Business Outcomes
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-blue-500/40" />
            </span>
          </h2>

          <p className="mt-8 text-lg text-gray-400 max-w-3xl mx-auto">
            See how enterprises leverage our Power BI expertise to unlock
            insights, optimize performance, and make faster, data-driven
            decisions at scale.
          </p>
        </div>

        {/* ===== Carousel ===== */}
        <div ref={sliderRef} className="keen-slider">
          {stories.map((item, i) => (
            <div
              key={i}
              onClick={() => slider.current?.next()}
              className="keen-slider__slide flex items-center cursor-pointer group"
            >
              {/* ===== CARD ===== */}
              <div className="relative rounded-3xl overflow-hidden transition-all duration-700 group-hover:-translate-y-3">

                {/* Aurora glow */}
                <div className="absolute -inset-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.35),transparent_45%)] opacity-70" />
                <div className="absolute -inset-10 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.35),transparent_45%)] opacity-70" />

                {/* Gradient border */}
                <div className="absolute inset-0 rounded-3xl p-[1.5px] bg-gradient-to-br from-sky-400 via-indigo-400 to-fuchsia-500">
                  <div className="h-full w-full rounded-3xl bg-gradient-to-br from-[#0A0F2C] via-[#0D143A] to-[#120B45]" />
                </div>

                {/* Card body */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 min-h-[520px] rounded-3xl shadow-[0_40px_140px_rgba(0,0,0,0.65)]">

                  {/* Content */}
                  <div className="relative p-14 flex flex-col justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-transparent" />

                    <h3 className="relative text-3xl font-semibold text-white leading-tight">
                      {item.title}
                    </h3>

                    <p className="relative mt-6 text-indigo-100/85 leading-relaxed text-lg">
                      {item.desc}
                    </p>

                    <div className="relative mt-10 h-[3px] w-24 bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-500 rounded-full" />
                  </div>

                  {/* Image (separate inset card) */}
                  <div className="relative h-[520px] p-6">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover contrast-110 saturate-110 transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-l from-black/15 via-black/30 to-black/65" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      <div className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-sky-400/80 to-indigo-500/80 backdrop-blur-md flex items-center justify-center text-white text-xl opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                        →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Progress Bar ===== */}
        <div className="mt-16 max-w-md mx-auto h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{
              width: `${((current + 1) / stories.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* ===== Slider Styling ===== */}
      <style jsx global>{`
        .keen-slider__slide {
          transition: transform 0.6s ease, opacity 0.6s ease;
        }
        .keen-slider__slide:not(.keen-slider__slide--active) {
          transform: scale(0.94);
          opacity: 0.6;
        }
      `}</style>
    </section>
  );
}
