"use client";

import Image from "next/image";

export default function TrustedBrandsMarquee() {
  const logos = [
    { name: "GO ERP", src: "/images/logo/goerp1.jpg" },
    { name: "Nuvento", src: "/images/logo/nuvento.jpg" },
    { name: "Snapon", src: "/images/logo/snapon.jpg" },
    {
      name: "Jonians",
      src: "/images/logo/jonians.jpg",
    },
    { name: "Export Control Group", src: "/images/logo/ecg.png" },
    { name: "SP Marketplace", src: "/images/logo/1.jpg" },
    { name: "Bosch", src: "/images/logo/bosch.png" },
  ];

  return (
    <section className="relative py-2 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="relative max-w-7xl mx-auto">
        <div
          className="
            relative
          bg-gradient-to-r from-black via-[#0f2f7a] to-black
            rounded-t-[80px]
     
            px-6 py-16
            overflow-hidden
          "
        >
          {/* Heading */}
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />

            <p className="text-2xl font-semibold tracking-widest uppercase bg-white bg-clip-text text-transparent">
              Trusted by Partners & Clients
            </p>

            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent" />
          </div>

          {/* Infinite Scrolling Logos */}
          <div className="relative overflow-hidden">
            <div
              className="flex gap-16 items-center animate-scroll"
              style={{
                animation: "scrollLeft 5s linear infinite",
              }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.name}
                  className="h-18 w-auto object-contain opacity-100 hover:opacity-150 transition"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
