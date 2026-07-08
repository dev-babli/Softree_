"use client"

import Image from "next/image"

const CERTIFICATIONS = [
  { label: "ISO/IEC 27001:2022", sub: "Information security" },
  { label: "ISO 9001:2015", sub: "Quality management" },
  { label: "Microsoft Partner", sub: "Technology expertise" },
] as const

const CLIENT_LOGOS = [
  { name: "Bosch", src: "/images/logo/bosch.png" },
  { name: "Snap-on", src: "/images/logo/snapon.jpg" },
  { name: "SP Marketplace", src: "/images/logo/1.jpg" },
  { name: "Export Control Group", src: "/images/logo/ecg.png" },
  { name: "Nuvento", src: "/images/logo/nuvento.jpg" },
  { name: "Emscale", src: "/images/logo/emscale_logo.png" },
] as const

export default function ModernizationTrustStrip() {
  return (
    <section
      aria-labelledby="wm-trust-heading"
      className="border-y border-zinc-200 bg-white py-10 md:py-12"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <h2 id="wm-trust-heading" className="sr-only">
          Certifications and clients
        </h2>

        <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {CERTIFICATIONS.map((cert) => (
            <li
              key={cert.label}
              className="text-center"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                {cert.label}
              </p>
              <p className="mt-0.5 text-[11px] text-zinc-500">{cert.sub}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Trusted by teams modernising their digital presence
        </p>

        <ul
          className="mt-5 flex flex-wrap items-center justify-center gap-6 md:gap-10"
          aria-label="Client logos"
        >
          {CLIENT_LOGOS.map((logo) => (
            <li key={logo.name}>
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={100}
                height={40}
                className="h-8 w-auto max-w-[100px] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
