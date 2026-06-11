"use client"

import Image from "next/image"
import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { GalleryItem } from "../../../types"
import {
  PageContainer,
  ParallaxLayer,
  Reveal,
  RevealItem,
  RevealStagger,
  SectionHeaderReveal,
  SectionLabel,
  SectionTitle,
} from "../shared"
import { REVEAL_EASE } from "../../../motion/scrollReveal"

type GallerySectionProps = {
  items: GalleryItem[]
  heading?: string
  subheading?: string
}

export function GallerySection({
  items,
  heading = "In production",
  subheading = "Screens and environments from the engagement",
}: GallerySectionProps) {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const gallery = items.length > 0 ? items : []
  if (gallery.length === 0) return null

  const featured = gallery[active] || gallery[0]

  return (
    <section id="gallery" className="scroll-mt-24 bg-[var(--softree-bg-light,#fafaf9)] py-16 md:py-24">
      <PageContainer>
        <SectionHeaderReveal
          label={<SectionLabel>Visual proof</SectionLabel>}
          title={<SectionTitle>{heading}</SectionTitle>}
          description={
            subheading ? (
              <p className="text-[1.0625rem] leading-[1.65] text-[var(--cs-text-secondary,#334155)]">
                {subheading}
              </p>
            ) : undefined
          }
        />

        <Reveal variant="scale" delay={0.08} className="mt-10">
          <ParallaxLayer strength={20}>
            <div className="rounded-[1.25rem] p-1.5 ring-1 ring-[rgba(15,23,42,0.08)] [background:#F0F2F6]">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[calc(1.25rem-0.375rem)] bg-[#E8ECF2]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featured.url}
                    initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: REVEAL_EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={featured.url}
                      alt={featured.alt || featured.caption || "Project screenshot"}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1280px) 1200px, 100vw"
                    />
                  </motion.div>
                </AnimatePresence>
                {featured.caption ? (
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#181818]/80 to-transparent px-6 pb-5 pt-14">
                    <p className="text-sm font-medium text-white">{featured.caption}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </ParallaxLayer>
        </Reveal>

        {gallery.length > 1 ? (
          <RevealStagger className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.map((item, i) => (
              <RevealItem key={item.url} variant="scale">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-xl ring-2 transition-all duration-300 ${
                    active === i
                      ? "ring-[var(--softree-accent,#FF7A2F)] shadow-[0_8px_24px_rgba(255,122,47,0.2)]"
                      : "ring-transparent hover:ring-[rgba(15,23,42,0.12)]"
                  }`}
                >
                  <Image
                    src={item.url}
                    alt={item.alt || item.caption || "Thumbnail"}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                  <div
                    className={`absolute inset-0 transition-colors duration-300 ${
                      active === i ? "bg-transparent" : "bg-[#181818]/30 hover:bg-[#181818]/15"
                    }`}
                  />
                </button>
              </RevealItem>
            ))}
          </RevealStagger>
        ) : null}
      </PageContainer>
    </section>
  )
}
