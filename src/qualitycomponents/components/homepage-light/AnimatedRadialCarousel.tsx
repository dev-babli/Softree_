"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

type Card = {
  title: string
  img: string
  href: string
  textColor: string
  isHero?: boolean
  vid?: string
}

const baseCards: Card[] = [
  {
    title: "Microsoft Solutions",
    img: "/whysoftree/Micorosft.webp",
    href: "/services/business-applications/power-apps",
    textColor: "text-white",
    isHero: true,
  },
  {
    title: "AI Intelligence",
    img: "/whysoftree/ai.webp",
    href: "/services/ai-intelligence/agentic-ai",
    textColor: "text-white",
  },
  {
    title: "Data & Analytics",
    img: "/whysoftree/data.webp",
    href: "/services/data-analytics/power-bi",
    textColor: "text-white",
  },
  {
    title: "Web Development",
    img: "/whysoftree/web dev.webp",
    href: "/services/digital-workspace/web-app-development",
    textColor: "text-white",
  },
  {
    title: "SharePoint",
    img: "/whysoftree/web.webp",
    href: "/services/digital-workspace/sharepoint",
    textColor: "text-white",
  },
  {
    title: "Mobile Apps",
    img: "https://osmo.b-cdn.net/website/bandwidth/product-card-vault.avif",
    href: "/services/digital-workspace/mobile-app-development",
    textColor: "text-white",
  },
  {
    title: "Startups & MVP",
    img: "https://osmo.b-cdn.net/website/bandwidth/product-card-community.avif",
    href: "/services/business-applications/mvp",
    textColor: "text-white",
  },
]

const cards = [...baseCards, ...baseCards, ...baseCards]

interface Props {
  /** True → cards fade in with stagger, then rotation starts. */
  active: boolean
}

export function AnimatedRadialCarousel({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const rotationTween = useRef<gsap.core.Tween | null>(null)

  const CARD_STAGGER = 0.04 // 40ms between cards
  const CARD_DURATION = 0.45
  const TOTAL_STAGGER_TIME = (cards.length / 3) * CARD_STAGGER // only count primary arc
  const ROTATION_START_DELAY = TOTAL_STAGGER_TIME + CARD_DURATION * 0.6

  useGSAP(() => {
    if (!containerRef.current || !ringRef.current) return
    const q = gsap.utils.selector(containerRef)
    const cardEls = q(".carousel-card")

    // Set initial invisible state (removed heavy blur filter for 60fps performance)
    gsap.set(cardEls, { opacity: 0, scale: 0.92 })
    gsap.set(ringRef.current, { rotation: 0, borderColor: "rgba(0,0,0,0)" })

    if (active) {
      // 1. Angle-sorted stagger — cards closer to top appear first
      const staggerArray = cardEls.map((_, i) => Math.min(i, cards.length - i))

      gsap.to(cardEls, {
        opacity: 1,
        scale: 1,
        duration: CARD_DURATION,
        stagger: (index) => staggerArray[index] * CARD_STAGGER,
        ease: "power3.out"
      })

      // 2. Fade in dashed border
      gsap.to(ringRef.current, {
        borderColor: "rgba(0,0,0,0.12)",
        duration: 0.6,
        delay: ROTATION_START_DELAY
      })

      // 3. Start slow infinite rotation
      rotationTween.current = gsap.to(ringRef.current, {
        rotation: -360,
        repeat: -1,
        ease: "none",
        duration: 120,
        delay: ROTATION_START_DELAY
      })
    } else {
      // Reset if deactivated (scrolled back up)
      if (rotationTween.current) rotationTween.current.kill()
      gsap.to(cardEls, { opacity: 0, scale: 0.92, duration: 0.3 })
      gsap.to(ringRef.current, { rotation: 0, borderColor: "rgba(0,0,0,0)", duration: 0.3 })
    }
  }, { dependencies: [active], scope: containerRef })

  return (
    <>
      {/* 
        Pure CSS Responsive Architecture:
        This prevents the FOUC/Hydration Shift that occurs when using React state (window.innerWidth) 
        to calculate dimensions. The browser applies these variables instantly.
      */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .carousel-dims {
          --radius: 900px;
          --diameter: 1800px;
          --card-w: 240px;
          --card-h: 168px;
          --container-h: 400px;
          --top-offset: 110px;
          --img-h: 126px;
        }
        @media (min-width: 640px) {
          .carousel-dims {
            --radius: 1200px;
            --diameter: 2400px;
            --card-w: 320px;
            --card-h: 224px;
            --container-h: 520px;
            --top-offset: 145px;
            --img-h: 168px;
          }
        }
        @media (min-width: 1024px) {
          .carousel-dims {
            --radius: 1500px;
            --diameter: 3000px;
            --card-w: 400px;
            --card-h: 280px;
            --container-h: 640px;
            --top-offset: 180px;
            --img-h: 210px;
          }
        }
      `}} />
      
      <div
        ref={containerRef}
        className="carousel-dims relative mt-4 flex w-full justify-center overflow-hidden pointer-events-none"
        style={{ height: "var(--container-h)" }}
      >
        <div
          ref={ringRef}
          onMouseEnter={() => rotationTween.current?.pause()}
          onMouseLeave={() => rotationTween.current?.resume()}
          className="pointer-events-auto absolute flex items-center justify-center rounded-full transition-colors duration-700"
          style={{
            top: "var(--top-offset)",
            width: "var(--diameter)",
            height: "var(--diameter)",
            border: "1px dashed rgba(0,0,0,0)",
            willChange: "transform"
          }}
        >
          {cards.map((card, i) => {
            const angle = (i / cards.length) * 360
            
            // Priority for top arc cards to boost LCP (first 4 and last 3 items)
            const isTopArc = i < 4 || i > cards.length - 4

            return (
              <div
                key={i}
                className="absolute left-0 top-0 h-full w-full"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <a
                  href={card.href}
                  className={`carousel-card group absolute flex origin-center flex-col justify-between overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-xl cursor-pointer ${card.isHero ? "ring-2 ring-white/90" : ""} transition-transform duration-300 hover:scale-[1.04]`}
                  style={{
                    top: "calc(-1 * (var(--card-h) / 2))",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "var(--card-w)",
                    height: "var(--card-h)",
                    padding: "6px",
                  }}
                >
                  <div
                    className="relative w-full overflow-hidden rounded-xl bg-[#222]"
                    style={{ height: "var(--img-h)" }}
                  >
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 400px"
                      priority={isTopArc}
                      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${card.title === "Easings" ? "opacity-40 grayscale" : ""}`}
                    />
                    {card.vid && (
                      <video
                        src={card.vid}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
                  </div>
                  <div className="flex grow items-center justify-between px-4">
                    <h3 className={`text-[14px] font-medium tracking-wide ${card.textColor}`}>
                      {card.title}
                    </h3>
                    <div className="translate-x-2 opacity-0 transition-opacity duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default AnimatedRadialCarousel
