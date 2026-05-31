"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { STORY_TOKENS } from "../tokens"

export function GlowingPlanet() {
  const planetRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!planetRef.current) return
      gsap.to(planetRef.current, {
        scale: 1.06,
        opacity: 0.95,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    },
    { scope: planetRef },
  )

  return (
    <div
      ref={planetRef}
      className="pointer-events-none absolute -bottom-16 -right-8 h-56 w-56 md:h-72 md:w-72"
      aria-hidden
    >
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${STORY_TOKENS.primary} 0%, transparent 70%)` }}
      />
      <div
        className="absolute inset-4 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, #A78BFA 0%, ${STORY_TOKENS.primary} 40%, ${STORY_TOKENS.navyDeep} 100%)`,
          boxShadow: `0 0 80px ${STORY_TOKENS.primary}, inset -12px -12px 40px rgba(0,0,0,0.5)`,
        }}
      />
    </div>
  )
}
