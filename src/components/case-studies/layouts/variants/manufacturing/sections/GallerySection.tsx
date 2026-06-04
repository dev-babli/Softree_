"use client"

import Image from "next/image"
import { useState } from "react"
import type { GalleryItem } from "../../../types"
import { PageContainer, Reveal, SectionLabel, SectionTitle } from "../shared"

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
  const gallery = items.length > 0 ? items : []
  if (gallery.length === 0) return null

  const featured = gallery[active] || gallery[0]

  return (
    <section id="gallery" className="scroll-mt-24 bg-[var(--softree-bg-light,#fafaf9)] py-16 md:py-24">
      <PageContainer>
        <Reveal>
          <SectionLabel>Visual proof</SectionLabel>
          <SectionTitle>{heading}</SectionTitle>
          {subheading ? (
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.65] text-[var(--cs-text-secondary,#334155)]">
              {subheading}
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={0.06} className="mt-10">
          <div className="rounded-[1.25rem] p-1.5 ring-1 ring-[rgba(15,23,42,0.08)] [background:#F0F2F6]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[calc(1.25rem-0.375rem)] bg-[#E8ECF2]">
              <Image
                key={featured.url}
                src={featured.url}
                alt={featured.alt || featured.caption || "Project screenshot"}
                fill
                className="object-cover object-center"
                sizes="(min-width: 1280px) 1200px, 100vw"
              />
              {featured.caption ? (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#181818]/80 to-transparent px-6 pb-5 pt-14">
                  <p className="text-sm font-medium text-white">{featured.caption}</p>
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>

        {gallery.length > 1 ? (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.map((item, i) => (
              <button
                key={item.url}
                type="button"
                onClick={() => setActive(i)}
                className={`relative aspect-[16/10] cursor-pointer overflow-hidden rounded-xl ring-2 transition-all duration-200 ${
                  active === i
                    ? "ring-[var(--softree-accent,#FF7A2F)]"
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
                  className={`absolute inset-0 transition-colors ${
                    active === i ? "bg-transparent" : "bg-[#181818]/30 hover:bg-[#181818]/15"
                  }`}
                />
              </button>
            ))}
          </div>
        ) : null}
      </PageContainer>
    </section>
  )
}
