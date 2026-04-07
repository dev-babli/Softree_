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
      <div className="relative w-full py-16 text-center">
        {/* soft glow */}
        <div className="absolute inset-0 flex justify-center">
          <div className="h-24 w-96 rounded-full bg-blue-100/60 blur-3xl" />
        </div>

        <div className="relative flex items-center justify-center gap-5">
          <span className="h-px w-16 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <h2 className="text-4xl md:text-4xl font-bold text-blue-900">
            Trusted by Leading Brands Worldwide
          </h2>
          <span className="h-px w-16 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>
      </div>

   {/* marquee container */}
<div className="relative max-w-7xl mx-auto overflow-hidden py-10">
  <div className="mask-fade">
    <div className="flex w-max gap-20 animate-marquee hover:[animation-play-state:paused]">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex items-center gap-20">
          {logos.map((logo) => (
            <div
              key={logo.name + i}
              className="
                flex items-center justify-center
                min-w-[260px]
                py-6
                transition-all duration-300
                hover:scale-110
              "
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={220}
                height={120}
                className="
                  h-24 md:h-28   /* ⬅️ BIG FIX */
                  w-auto
                  object-contain
                  opacity-200
                 
                  transition-all duration-300
                "
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
</div>
    </section>
  );
}
