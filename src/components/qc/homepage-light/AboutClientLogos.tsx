"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const PARTNERS = [
  { name: "Microsoft", logo: "/images/copilot-logo-1.webp" },
  { name: "Power Platform", logo: "/images/power-plat.png" },
  { name: "Dynamics 365", logo: "/images/Dynamics365.webp" },
  { name: "Power Apps", logo: "/images/power-apps.webp" },
  { name: "Power BI", logo: "/images/power-bi.webp" },
  { name: "SharePoint", logo: "/images/sharepoint.webp" },
]

function PartnerLogo({ partner }: { partner: typeof PARTNERS[0] }) {
  return (
    <div className="group flex h-20 w-36 flex-shrink-0 items-center justify-center px-4 transition-transform duration-300 hover:scale-110">
      <Image
        src={partner.logo}
        alt={partner.name}
        width={120}
        height={48}
        className="max-h-12 w-auto object-contain"
      />
    </div>
  )
}

export default function AboutClientLogos() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // Double the partners for seamless infinite scroll
  const doubledPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS]

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-white py-16 md:py-20"
    >
      {/* Top border */}
      <div className="absolute left-0 right-0 top-0 h-px bg-[#141413]/10" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-semibold tracking-wider text-[#141413]/60 uppercase">
            Trusted Technology Partners
          </h2>
        </motion.div>

        {/* Marquee Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Gradient masks for seamless edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-white to-transparent" />

          {/* Scrolling track */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-8 md:gap-12"
              animate={{
                x: [0, -PARTNERS.length * 160],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {doubledPartners.map((partner, index) => (
                <PartnerLogo key={`${partner.name}-${index}`} partner={partner} />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[
            { value: "200+", label: "Enterprise Clients" },
            { value: "98%", label: "Retention Rate" },
            { value: "50+", label: "Partner Certifications" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-[#141413] md:text-3xl">
                {stat.value}
              </div>
              <div className="text-xs text-[#141413]/50 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#141413]/10" />
    </section>
  )
}
