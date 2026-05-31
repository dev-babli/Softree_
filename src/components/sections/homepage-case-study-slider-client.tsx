"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import { client } from "@/sanity/client"
import { homepageCaseStudySliderQuery } from "@/sanity/queries"

type Stat = { value?: string; label?: string }

type SlideSource = {
  company?: string
  eyebrow?: string
  title?: string
  description?: string
  ctaText?: string
  ctaHref?: string
  image?: { asset?: { url?: string }; alt?: string }
  stats?: Stat[]
  caseStudy?: {
    client?: string
    heroHeadline?: string
    heroEyebrow?: string
    headerTitle?: string
    excerpt?: string
    slug?: string
    mainImage?: { asset?: { url?: string }; alt?: string }
    highlights?: Stat[]
    metrics?: Stat[]
  }
}

type ResolvedSlide = {
  company?: string
  eyebrow?: string
  title?: string
  description?: string
  ctaText?: string
  ctaHref?: string
  image?: { asset?: { url?: string }; alt?: string }
  stats?: Stat[]
}

type SliderDoc = {
  sectionEnabled?: boolean
  slides?: SlideSource[]
}

function resolveSlide(slide: SlideSource): ResolvedSlide | null {
  const cs = slide.caseStudy
  const stats =
    slide.stats?.length && slide.stats.length > 0
      ? slide.stats
      : cs?.highlights?.length
        ? cs.highlights
        : cs?.metrics

  const image =
    slide.image?.asset?.url
      ? slide.image
      : cs?.mainImage?.asset?.url
        ? cs.mainImage
        : undefined

  const company = slide.company || cs?.client
  const title = slide.title || cs?.heroHeadline || cs?.headerTitle
  const description = slide.description || cs?.excerpt

  if (!company && !title && !description && !image?.asset?.url) return null

  return {
    company,
    eyebrow: slide.eyebrow || cs?.heroEyebrow || "Featured client story",
    title,
    description,
    ctaText: slide.ctaText || "Read case study",
    ctaHref:
      slide.ctaHref ||
      (cs?.slug ? `/case-studies/${cs.slug}` : "/case-studies"),
    image,
    stats,
  }
}

export default function HomepageCaseStudySliderClient() {
  const [doc, setDoc] = useState<SliderDoc | null>(null)

  useEffect(() => {
    client
      .fetch<SliderDoc | null>(homepageCaseStudySliderQuery, {}, { cache: "no-store" })
      .then(setDoc)
      .catch(() => setDoc(null))
  }, [])

  const slides = (doc?.slides || [])
    .map(resolveSlide)
    .filter((slide): slide is ResolvedSlide => Boolean(slide))

  if (!doc?.sectionEnabled || !slides.length) return null

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(24,82,255,0.2),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          spaceBetween={32}
          slidesPerView={1}
        >
          {slides.map((slide, index) => {
            const imageUrl = slide.image?.asset?.url
            return (
              <SwiperSlide key={`${slide.company}-${slide.title}-${index}`}>
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                  <div>
                    {slide.eyebrow ? (
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF7A2F]">
                        {slide.eyebrow}
                      </p>
                    ) : null}
                    {slide.company ? (
                      <p className="text-sm font-medium text-white/60">{slide.company}</p>
                    ) : null}
                    {slide.title ? (
                      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                        {slide.title}
                      </h2>
                    ) : null}
                    {slide.description ? (
                      <p className="mt-5 max-w-xl text-base leading-7 text-white/70">{slide.description}</p>
                    ) : null}
                    {slide.stats?.length ? (
                      <div className="mt-8 flex flex-wrap gap-8">
                        {slide.stats.slice(0, 3).map((stat, i) => (
                          <div key={`${stat.label}-${i}`}>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="mt-1 text-sm text-white/60">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {slide.ctaText && slide.ctaHref ? (
                      <Link
                        href={slide.ctaHref}
                        className="mt-8 inline-flex rounded-full bg-[#1852FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1346d9]"
                      >
                        {slide.ctaText}
                      </Link>
                    ) : null}
                  </div>
                  {imageUrl ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                      <Image
                        src={imageUrl}
                        alt={slide.image?.alt || slide.company || "Case study"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 560px"
                      />
                    </div>
                  ) : null}
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
