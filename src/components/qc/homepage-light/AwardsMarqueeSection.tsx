"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const AWARDS = [
  {
    id: 1,
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a302fe2066c4c753aee8e8_Award%201.webp",
    icon: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a3039a4ba539f38b598208_Award%20Icon%201.webp",
    title: "Microsoft Gold Partner",
    subtitle: "Cloud Productivity",
    count: "50+",
  },
  {
    id: 2,
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a302fe6550c5905e7a8a91_Award%202.webp",
    icon: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a3039a82e24dd9d005fe01_Award%20Icon%202.webp",
    title: "ISO 27001 Certified",
    subtitle: "Information Security",
    count: "2023",
  },
  {
    id: 3,
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a302fe70335d2e535381c8_Award%203.webp",
    icon: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a303998ae1ec0e5ecc0f50_Award%20Icon%203.webp",
    title: "Clutch Top B2B Company",
    subtitle: "Enterprise Software",
    count: "2024",
  },
  {
    id: 4,
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a302fefaa8e07108b166b0_Award%204.webp",
    icon: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a3039a0542b284d2a67a92_Award%20Icon%204.webp",
    title: "Power Platform Excellence",
    subtitle: "Solutions Partner",
    count: "Certified",
  },
  {
    id: 5,
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a302fe92d38e0f9f69232b_Award%205.webp",
    icon: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a3039970b00744a2b0f66f_Award%20Icon%205.webp",
    title: "Great Place to Work",
    subtitle: "Certified Employer",
    count: "2024",
  },
]

function AwardCard({ award }: { award: typeof AWARDS[0] }) {
  return (
    <div className="home-2-award-card relative flex-shrink-0 w-[280px] md:w-[320px]">
      {/* Award Image */}
      <div className="relative h-[200px] md:h-[240px] w-full overflow-hidden rounded-t-2xl bg-[var(--legacy-f5f5f5)]">
        <Image
          src={award.image}
          alt={award.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 280px, 320px"
        />
      </div>

      {/* Card Shadow / Content */}
      <div className="award-card-shadow rounded-b-2xl border border-t-0 border-[var(--legacy-e5e5e5)] bg-white p-4">
        <div className="home-2-award-content-wrapper flex items-center gap-3">
          {/* Icon */}
          <div className="home-2-award-icon-wrapper h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={award.icon}
              alt=""
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Header */}
          <div className="home-2-award-header-wrapper flex-1 min-w-0">
            <div className="home-1-award-heading text-sm font-semibold text-[var(--legacy-1a1a1a)] truncate leading-tight">
              {award.title}
            </div>
            <div className="text-xs text-[var(--legacy-666)] mt-0.5">
              {award.subtitle}
            </div>
          </div>
        </div>

        {/* Count Tag */}
        <div className="home-2-award-tag-wrapper mt-3 flex justify-end">
          <div className="text-base font-bold text-[var(--legacy-1a1a1a)]">{award.count}</div>
        </div>
      </div>
    </div>
  )
}

export default function AwardsMarqueeSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Double the awards for seamless infinite scroll
  const doubledAwards = [...AWARDS, ...AWARDS, ...AWARDS]

  return (
    <section ref={ref} className="section relative w-full overflow-hidden bg-white py-20 md:py-28">
      <div className="w-layout-blockcontainer container home-2-award mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        <div className="section-wrapper">
          {/* Section Header */}
          <motion.div
            className="section-header-wrapper home-2-award mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="flex items-center gap-4 mb-4">
              {/* Tag */}
              <div className="home-2-header-tag-wrapper flex items-center gap-2">
                <div className="brand-circle h-2 w-2 rounded-full bg-[var(--legacy-ff6b35)]" />
                <div className="section-tag text-xs font-semibold tracking-wider uppercase text-[var(--legacy-666)]">
                  AWARDS
                </div>
              </div>

              {/* Divider */}
              <div className="section-header-divider-wrapper flex-1">
                <div className="section-header-divider h-px bg-[var(--legacy-e5e5e5)]" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="section-heading text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-[var(--legacy-1a1a1a)]">
              Industry Recognition
            </h2>
          </motion.div>

          {/* Marquee Container */}
          <motion.div
            className="home-2-award-wrapper relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Gradient Masks */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

            {/* Scrolling Track */}
            <div className="home-2-award-marquee flex gap-6 overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{
                  x: [0, -50 * AWARDS.length * 6.4], // Adjust based on card width + gap
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
                {doubledAwards.map((award, index) => (
                  <AwardCard key={`${award.id}-${index}`} award={award} />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
