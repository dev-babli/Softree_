"use client";

import Image from "next/image";
import Link from "next/link";

export default function WhoWeWorkWith() {
  return (
    <section className="relative overflow-hidden ">
      <div className="relative max-w-7xl mx-auto px-4">
        {/* ===== Heading ===== */}
        <div className="text-center mb-2 max-w-4xl mx-auto px-6">
          {/* Badge */}
          <span
            className="
    inline-flex items-center
    mb-2 px-5 py-2
    rounded-full

    text-xs font-semibold
    tracking-widest uppercase

    bg-blue-50
    text-blue-600
    border border-blue-100
    shadow-sm
  "
          >
            Our Partners
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Who We{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Work With
            </span>
          </h2>

          {/* Underline */}
          <div className="mt-1 flex justify-center">
            <span className="h-[3px] w-24 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
          </div>

          {/* Description */}
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed mb-3">
            We help ambitious teams build, scale, and monetize powerful mobile
            applications with a future-ready platform.
          </p>
        </div>

        {/* ===== Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Businesses & Brands",
              desc: "Entrepreneurs, enterprises, and non-profits building mobile apps to engage customers and communities.",
              img: "/images/mobile-app/business.jpg",

              badge: "For Growth",
            },
            {
              title: "App Resellers",
              desc: "Create once, rebrand endlessly, and sell to multiple clients using one scalable mobile platform.",
              img: "/images/mobile-app/1.avif",

              badge: "White-Label",
            },
            {
              title: "Agencies",
              desc: "Deliver high-quality mobile apps under your own brand without heavy technical or financial investment.",
              img: "/images/mobile-app/agency.jpg",

              badge: "Agency-Ready",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative h-[440px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-500"
            >
              {/* Image */}
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />

              {/* Badge */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1 text-xs font-semibold text-white bg-indigo-600/90 rounded-full backdrop-blur">
                  {item.badge}
                </span>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
