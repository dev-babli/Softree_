"use client"

import Image from "next/image"
import { useState } from "react"
import type { GalleryItem } from "../../../types"
import { PageContainer, Reveal, SectionLabel, SectionTitle } from "../shared"

export function GallerySection({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState(0)
  const gallery = items.length > 0 ? items : []
  if (gallery.length === 0) return null

  const featured = gallery[active] || gallery[0]

  return (
    <section id="gallery" className="scroll-mt-24 bg-[var(--softree-bg-dark,#0a0a0a)] py-16 text-white md:py-24">
      <PageContainer>
        <Reveal>
          <SectionLabel className="!text-white/50">Product experience</SectionLabel>
          <SectionTitle className="!text-white">Screens built for the plant floor</SectionTitle>
        </Reveal>

        <Reveal delay={0.06} className="mt-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[14px] bg-[#141414] ring-1 ring-white/10">
            <Image
              key={featured.url}
              src={featured.url}
              alt={featured.alt || featured.caption || "Application screenshot"}
              fill
              className="object-cover object-top"
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
            {featured.caption ? (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-6 pb-5 pt-12">
                <p className="text-sm font-medium text-white/90">{featured.caption}</p>
              </div>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {gallery.map((item, i) => (
            <button
              key={item.url}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-[16/10] cursor-pointer overflow-hidden rounded-xl ring-2 transition-all duration-200 ${
                active === i ? "ring-[var(--softree-accent,#FF7A2F)]" : "ring-transparent hover:ring-white/25"
              }`}
            >
              <Image
                src={item.url}
                alt={item.alt || item.caption || "Screenshot thumbnail"}
                fill
                className="object-cover object-top"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              <div
                className={`absolute inset-0 transition-colors ${
                  active === i ? "bg-transparent" : "bg-black/45 hover:bg-black/25"
                }`}
              />
            </button>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
