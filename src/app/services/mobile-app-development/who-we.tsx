"use client";

import Image from "next/image";
import Link from "next/link";

export default function WhoWeWorkWith() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-[#0B1220] to-[#0F1A2E] py-28">
      
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">

        {/* ===== Heading ===== */}
        <div className="text-center mb-20">
          <span className="inline-block mb-4 px-4 py-1 text-xs font-medium tracking-widest uppercase text-indigo-400 border border-indigo-400/30 rounded-full">
            Our Partners
          </span>

          <h2 className="text-3xl md:text-5xl font-semibold text-white">
            Who We Work With
          </h2>

          {/* Underline */}
          <div className="mt-5 flex justify-center">
            <span className="h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />
          </div>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            We help ambitious teams build, scale, and monetize powerful mobile
            applications with a future-ready platform.
          </p>
        </div>

        {/* ===== Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {[
            {
              title: "Businesses & Brands",
              desc:
                "Entrepreneurs, enterprises, and non-profits building mobile apps to engage customers and communities.",
              img: "/images/mobile-app/business.jpg",
              link: "https://buildfire.com/demo/",
              badge: "For Growth",
            },
            {
              title: "App Resellers",
              desc:
                "Create once, rebrand endlessly, and sell to multiple clients using one scalable mobile platform.",
              img: "/images/mobile-app/1.avif",
              link: "https://buildfire.com/reseller-demo/",
              badge: "White-Label",
            },
            {
              title: "Agencies",
              desc:
                "Deliver high-quality mobile apps under your own brand without heavy technical or financial investment.",
              img: "/images/mobile-app/agency.jpg",
              link: "https://buildfire.com/demo/",
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

                <Link
                  href={item.link}
                  className="inline-flex items-center gap-2 w-fit text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 rounded-xl hover:opacity-90 transition"
                >
                  Book a Demo
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
