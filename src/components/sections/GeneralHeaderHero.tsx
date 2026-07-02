"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import Grainient from "@/components/homepage-light/Grainient"
import "swiper/css"
import "swiper/css/pagination"
import "./GeneralHeaderHero.css"
import type { CaseStudyHeroSlide } from "@/app/case-studies/types"

type Stat = { score: string; label: string }

type CustomerLogo = {
  src: string
  alt: string
  width: number
  height: number
}

type GeneralHeaderHeroProps = {
  title: string
  description: string
  eyebrow?: string
  slides?: CaseStudyHeroSlide[]
  customerLogos?: CustomerLogo[]
  trustLabel?: string
}

const DEFAULT_LOGOS: CustomerLogo[] = [
  {
    src: "/images/logo/goerp1.jpg",
    alt: "GO ERP",
    width: 100,
    height: 40,
  },
  {
    src: "/images/logo/nuvento.jpg",
    alt: "Nuvento",
    width: 100,
    height: 40,
  },
  {
    src: "/images/logo/kwiz.png",
    alt: "Kwiz",
    width: 100,
    height: 40,
  },
  {
    src: "/images/logo/jonians.jpg",
    alt: "Jonians",
    width: 100,
    height: 40,
  },
  {
    src: "/images/logo/ecg.png",
    alt: "Export Control Group",
    width: 100,
    height: 40,
  },
  {
    src: "/images/logo/sp-marketplace.png",
    alt: "SP Marketplace",
    width: 100,
    height: 40,
  },
  {
    src: "/images/logo/bosch.png",
    alt: "Bosch",
    width: 100,
    height: 40,
  },
  {
    src: "/images/logo/emscale_logo.png",
    alt: "Emscale",
    width: 100,
    height: 40,
  },
  {
    src: "/images/logo/link-innovation.png",
    alt: "Link Innovation",
    width: 100,
    height: 40,
  },
  {
    src: "/images/logo/Intellectt_logo.png",
    alt: "Intellectt",
    width: 100,
    height: 40,
  },
]

function splitScore(value: string): { primary: string; suffix: string } {
  if (value.includes("/")) {
    const [left, right] = value.split("/")
    return { primary: left, suffix: `/${right || ""}` }
  }
  return { primary: value, suffix: "" }
}

export default function GeneralHeaderHero({
  title,
  description,
  eyebrow = "Customer Stories",
  slides = [],
  customerLogos = DEFAULT_LOGOS,
  trustLabel = "Top enterprises trust Softree",
}: GeneralHeaderHeroProps) {
  const swiperRef = useRef<SwiperType | null>(null)
  const hasSlides = slides.length > 0

  return (
    <section className="gh-hero" aria-label="Customer stories hero">
      <div className="gh-grainient-layer" aria-hidden>
        <Grainient
          timeSpeed={0}
          colorBalance={0.02}
          warpStrength={0.85}
          warpFrequency={3.2}
          warpSpeed={0}
          warpAmplitude={62}
          blendAngle={18}
          blendSoftness={0.08}
          rotationAmount={340}
          noiseScale={1.7}
          grainAmount={0.06}
          grainScale={2.2}
          grainAnimated={false}
          contrast={1.15}
          gamma={1}
          saturation={1.07}
          centerX={0.03}
          centerY={-0.02}
          zoom={0.94}
          color1="#d2dbff"
          color2="#3a57d8"
          color3="#1a2a86"
          className="h-full w-full"
        />
      </div>
      <div className="gh-hero-inner">
        <header className="gh-hero-top">
          <span className="gh-hero-eyebrow">{eyebrow}</span>
          <h1 className="gh-hero-title">{title}</h1>
          <p className="gh-hero-desc">{description}</p>
        </header>

        {hasSlides ? (
          <div className="gh-slider-wrap">
            <Swiper
              modules={[Pagination, Autoplay, A11y, Keyboard]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              slidesPerView={1}
              loop={slides.length > 1}
              speed={750}
              autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              keyboard={{ enabled: true }}
              pagination={{ clickable: true, el: ".gh-pagination" }}
              a11y={{ enabled: true }}
            >
              {slides.map((slide, index) => {
              const fit: "cover" | "contain" =
                slide.imageFit ?? (slide.image.endsWith(".svg") ? "contain" : "cover")
              return (
                <SwiperSlide key={`${slide.company}-${index}`}>
                  <article className="gh-slide">
                    <div className="gh-slide-content">
                      <div>
                        <span className="gh-slide-eyebrow">
                          <span className="gh-slide-eyebrow-dot" aria-hidden />
                          {slide.eyebrow}
                        </span>
                        <h2 className="gh-slide-heading">{slide.title}</h2>
                        <p className="gh-slide-desc">{slide.description}</p>
                      </div>

                      <div className="gh-stats">
                        {slide.stats.map((stat) => {
                          const { primary, suffix } = splitScore(stat.score)
                          return (
                            <div key={stat.label} className="gh-stat-tile">
                              <div className="gh-stat-value">
                                <span>{primary}</span>
                                {suffix ? <span className="gh-stat-suffix">{suffix}</span> : null}
                              </div>
                              <div className="gh-stat-label">{stat.label}</div>
                            </div>
                          )
                        })}
                      </div>

                      <Link href={slide.ctaHref} className="gh-slide-cta">
                        <span>{slide.ctaText}</span>
                        <span className="gh-slide-cta-icon" aria-hidden>
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <path
                              d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Link>
                    </div>

                    <div className="gh-slide-media">
                      <div className="gh-slide-media-frame">
                        <span className="gh-slide-tag">{slide.company}</span>
                        <Image
                          src={slide.image}
                          alt={slide.imageAlt}
                          fill
                          unoptimized
                          sizes="(max-width: 1024px) 100vw, 540px"
                          className={`gh-slide-image${fit === "contain" ? " is-contain" : ""}`}
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              )
            })}
          </Swiper>

          <div className="gh-controls" aria-label="Customer story slider controls">
            <div className="gh-pagination" />
            <div className="gh-nav">
              <button
                type="button"
                className="gh-nav-btn"
                aria-label="Previous customer story"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M9 1L3 7L9 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                className="gh-nav-btn"
                aria-label="Next customer story"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M5 1L11 7L5 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          </div>
        ) : null}

        <div className="gh-trust">
          <span className="gh-trust-label">{trustLabel}</span>
          <div className="gh-trust-logos">
            {customerLogos.map((logo) => (
              <div className="gh-trust-logo-card" key={logo.src}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
