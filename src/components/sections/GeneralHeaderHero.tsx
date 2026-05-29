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

type Stat = { score: string; label: string }

type HeroSlide = {
  company: string
  eyebrow: string
  title: string
  description: string
  ctaText: string
  ctaHref: string
  image: string
  imageAlt: string
  imageFit?: "cover" | "contain"
  stats: Stat[]
}

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
  slides?: HeroSlide[]
  customerLogos?: CustomerLogo[]
  trustLabel?: string
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    company: "JetBrains",
    eyebrow: "Customer Story — Developer Tools",
    title: "From 100+ support forms to one AI agent.",
    description:
      "JetBrains replaced a fragmented support stack with a single Rasa-powered AI agent — and held a 75–80% CSAT score across millions of users.",
    ctaText: "Read case study",
    ctaHref: "/case-studies/jetbrains",
    image:
      "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/6a028f0d8623f5b80fadbefc_jetbrains-cs-share-image.png",
    imageAlt: "JetBrains customer story visual",
    imageFit: "cover",
    stats: [
      { score: "80%", label: "Peak CSAT" },
      { score: "100+", label: "Forms Replaced" },
      { score: "1", label: "Unified Agent" },
    ],
  },
  {
    company: "Albert Heijn",
    eyebrow: "Customer Story — Retail",
    title: "Cut customer service contacts in half.",
    description:
      "Albert Heijn used a Rasa agent to automate routine grocery service journeys — reducing service contacts by 50% while keeping customer experience consistent at national scale.",
    ctaText: "View case study",
    ctaHref: "/case-studies/albert-heijn",
    image:
      "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/69838670265fbb8fee358af8_Logo_Rectangle_AlbertHeijn.png",
    imageAlt: "Albert Heijn customer story visual",
    imageFit: "cover",
    stats: [
      { score: "50%", label: "Contacts Deflected" },
      { score: "24/7", label: "Coverage" },
      { score: "NL", label: "Nationwide" },
    ],
  },
  {
    company: "Deutsche Telekom",
    eyebrow: "Customer Story — Telecom",
    title: "30% lighter agent workload with CALM.",
    description:
      "Deutsche Telekom deployed Rasa CALM to automate complex service flows, dropping agent workload by 30% and lifting chat solution rate to 40% across regions.",
    ctaText: "Explore the outcome",
    ctaHref: "/case-studies/deutsche-telekom-ee",
    image:
      "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/690276aa0b8f31119422cb58_febc118ba0b693b48264fa2cccdd78d7_dt.svg",
    imageAlt: "Deutsche Telekom customer story visual",
    imageFit: "contain",
    stats: [
      { score: "30%", label: "Workload Drop" },
      { score: "40%", label: "Chat Solve Rate" },
      { score: "EU", label: "Multi-region" },
    ],
  },
  {
    company: "Providence Health",
    eyebrow: "Customer Story — Healthcare",
    title: "59% goal completion across patient journeys.",
    description:
      "Providence Health used Rasa CALM to deliver continuous, compliant patient conversations — driving a 59% goal completion rate per conversation.",
    ctaText: "Read case study",
    ctaHref: "/case-studies/providence-health",
    image:
      "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/690361746b99a3c162af206f_cs%20logo.svg",
    imageAlt: "Providence customer story visual",
    imageFit: "contain",
    stats: [
      { score: "59%", label: "Goal Completion" },
      { score: "HIPAA", label: "Compliant" },
      { score: "Multi", label: "Care Lines" },
    ],
  },
]

const DEFAULT_LOGOS: CustomerLogo[] = [
  {
    src: "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/68ef7bd8f4568496c646be06_autodesk_logo.svg.svg",
    alt: "Autodesk",
    width: 101,
    height: 22,
  },
  {
    src: "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/68f8eddcfa3169325ce7a315_bnp%20paribas.svg",
    alt: "BNP Paribas",
    width: 101,
    height: 22,
  },
  {
    src: "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/68f8eddc74c7dcce83b3d8b3_groupe%20ima.svg",
    alt: "Groupe IMA",
    width: 121,
    height: 56,
  },
  {
    src: "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/68ef7bd8a0baab03c5046663_swisscom.svg",
    alt: "Swisscom",
    width: 121,
    height: 56,
  },
  {
    src: "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/68f8eddc4341fa416a3fb4db_providence.svg",
    alt: "Providence",
    width: 121,
    height: 56,
  },
  {
    src: "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/6903b0eb0559db4af59486e6_smartrecruiters.svg",
    alt: "SmartRecruiters",
    width: 121,
    height: 56,
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
  slides = DEFAULT_SLIDES,
  customerLogos = DEFAULT_LOGOS,
  trustLabel = "Top enterprises trust Softree",
}: GeneralHeaderHeroProps) {
  const swiperRef = useRef<SwiperType | null>(null)
  const safeSlides = slides.length > 0 ? slides : DEFAULT_SLIDES

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

        <div className="gh-slider-wrap">
          <Swiper
            modules={[Pagination, Autoplay, A11y, Keyboard]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            slidesPerView={1}
            loop
            speed={750}
            autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            keyboard={{ enabled: true }}
            pagination={{ clickable: true, el: ".gh-pagination" }}
            a11y={{ enabled: true }}
          >
            {safeSlides.map((slide, index) => {
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

        <div className="gh-trust">
          <span className="gh-trust-label">{trustLabel}</span>
          <div className="gh-trust-logos">
            {customerLogos.map((logo) => (
              <Image
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                unoptimized
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
