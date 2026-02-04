"use client";

import Image from "next/image";

export default function TrustedBrandsMarquee() {
  const logos = [
    { name: "Bayer", src: "/images/logo/bayer.svg" },
    { name: "Sanofi", src: "/images/logo/sanofi.jpg" },
    { name: "Deloitte", src: "/images/logo/deloitte.png" },
    {
      name: "Google",
      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/google/google-original.svg",
    },
    { name: "Microsoft", src: "/images/logo/microsoft.png" },
    { name: "Netflix", src: "/images/logo/netflix.jpg" },
    { name: "Bosch", src: "/images/logo/bosch.png" },
  ];

  return (
    <section className="relative py-2 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      {/* heading */}
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.4em] uppercase text-black font-medium">
          Trusted by Leading Brands Worldwide
        </p>
      </div>

      {/* marquee container */}
      <div className="relative max-w-7xl mx-auto overflow-hidden">
        {/* gradient edge mask (clean fade) */}
        <div className="mask-fade">
          <div className="flex w-max gap-24 animate-marquee hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-14">
                {logos.map((logo) => (
                  <div
                    key={logo.name + i}
                    className="
              flex items-center justify-center
              min-w-[160px]
              py-6
              transition
              hover:-translate-y-1 hover:scale-105
            "
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={150}
                      height={80}
                      className="
                h-auto
                max-h-12 md:max-h-14
                w-auto
                object-contain
                opacity-90
                hover:opacity-100
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
