"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const CERTIFICATIONS = [
  {
    id: 1,
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a302fe2066c4c753aee8e8_Award%201.webp",
    icon: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a3039a4ba539f38b598208_Award%20Icon%201.webp",
    title: "Microsoft Gold Partner",
    subtitle: "Cloud Productivity",
    tag: "50+",
  },
  {
    id: 2,
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a302fe6550c5905e7a8a91_Award%202.webp",
    icon: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a3039a82e24dd9d005fe01_Award%20Icon%202.webp",
    title: "ISO 27001 Certified",
    subtitle: "Information Security",
    tag: "2023",
  },
  {
    id: 3,
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a302fe70335d2e535381c8_Award%203.webp",
    icon: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a303998ae1ec0e5ecc0f50_Award%20Icon%203.webp",
    title: "Clutch Top B2B Company",
    subtitle: "Enterprise Software",
    tag: "2024",
  },
  {
    id: 4,
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a302fefaa8e07108b166b0_Award%204.webp",
    icon: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a3039a0542b284d2a67a92_Award%20Icon%204.webp",
    title: "Power Platform Excellence",
    subtitle: "Solutions Partner",
    tag: "Certified",
  },
  {
    id: 5,
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a302fe92d38e0f9f69232b_Award%205.webp",
    icon: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a3039970b00744a2b0f66f_Award%20Icon%205.webp",
    title: "Great Place to Work",
    subtitle: "Certified Employer",
    tag: "2024",
  },
  {
    id: 6,
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a302fe2066c4c753aee8e8_Award%201.webp",
    icon: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a3039a4ba539f38b598208_Award%20Icon%201.webp",
    title: "STPI Registered",
    subtitle: "Software Technology Parks",
    tag: "Government",
  },
]

function CertificationCard({ cert }: { cert: typeof CERTIFICATIONS[0] }) {
  return (
    <div className="relative flex-shrink-0 w-[280px] md:w-[320px]">
      {/* Award Image */}
      <div className="relative h-[200px] md:h-[240px] w-full overflow-hidden rounded-t-2xl bg-[#f5f5f5]">
        <Image
          src={cert.image}
          alt={cert.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 280px, 320px"
        />
      </div>

      {/* Card Content */}
      <div className="rounded-b-2xl border border-t-0 border-white/10 bg-[#111111] p-4">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={cert.icon}
              alt=""
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Header */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white truncate leading-tight">
              {cert.title}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              {cert.subtitle}
            </div>
          </div>
        </div>

        {/* Count Tag */}
        <div className="mt-3 flex justify-end">
          <div className="text-base font-bold text-white">{cert.tag}</div>
        </div>
      </div>
    </div>
  )
}

export default function Certifications() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Triple for seamless infinite scroll
  const tripleCerts = [...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS]

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#0a0a0a] py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className="flex items-center gap-4 mb-4">
            {/* Tag */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#ff7a2f]" />
              <div className="text-xs font-semibold tracking-wider uppercase text-gray-400">
                TRUST & COMPLIANCE
              </div>
            </div>

            {/* Divider */}
            <div className="flex-1">
              <div className="h-px bg-white/10" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-white">
            Certifications & Recognitions
          </h2>
          <p className="mt-4 text-base lg:text-lg text-gray-400 max-w-2xl">
            Trusted standards that reinforce our focus on security, compliance, and operational excellence.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Gradient Masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

          {/* Scrolling Track */}
          <div className="flex gap-6 overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -50 * CERTIFICATIONS.length * 6.4],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {tripleCerts.map((cert, index) => (
                <CertificationCard key={`${cert.id}-${index}`} cert={cert} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
