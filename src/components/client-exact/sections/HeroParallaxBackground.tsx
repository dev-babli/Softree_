"use client"

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { useEffect, useState, type RefObject } from "react"

const SPRING = { stiffness: 80, damping: 20 }
const DESKTOP_MQ = "(min-width: 1024px)"

// Depth-decomposed slices of one 828x600 scene — identical fit so they
// recompose pixel-perfect; parallax depth offsets create the 3D separation.
const LAYER_FIT = "object-cover object-bottom"

const LAYERS = [
  { src: "/client/background.webp", depth: 4, zIndex: 0, className: LAYER_FIT },
  { src: "/client/midground.webp", depth: 12, zIndex: 1, className: LAYER_FIT },
  { src: "/client/foreground.webp", depth: 24, zIndex: 2, className: LAYER_FIT },
] as const

type HeroParallaxBackgroundProps = {
  sectionRef: RefObject<HTMLElement | null>
}

function ParallaxLayer({
  src,
  depth,
  zIndex,
  className,
  springX,
  springY,
  enabled,
}: {
  src: string
  depth: number
  zIndex: number
  className: string
  springX: MotionValue<number>
  springY: MotionValue<number>
  enabled: boolean
}) {
  const x = useTransform(springX, (v) => (enabled ? v * depth : 0))
  const y = useTransform(springY, (v) => (enabled ? v * depth : 0))
  const rotateY = useTransform(springX, (v) => (enabled ? v * 2 : 0))
  const rotateX = useTransform(springY, (v) => (enabled ? -v * 1 : 0))

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-end justify-center"
      style={{
        zIndex,
        willChange: "transform",
        x,
        y,
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      aria-hidden
    >
      <img
        src={src}
        alt=""
        draggable={false}
        className={`h-full w-full max-w-none select-none ${className}`}
        loading="eager"
        decoding="async"
      />
    </motion.div>
  )
}

/**
 * Mouse-driven 3D parallax city layers for hero background (desktop only).
 */
export function HeroParallaxBackground({ sectionRef }: HeroParallaxBackgroundProps) {
  const [enabled, setEnabled] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, SPRING)
  const springY = useSpring(mouseY, SPRING)

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ)
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (!enabled) {
      mouseX.set(0)
      mouseY.set(0)
      return
    }

    const section = sectionRef.current
    if (!section) return

    let raf = 0
    const onMove = (event: MouseEvent) => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        const rect = section.getBoundingClientRect()
        if (!rect.width || !rect.height) return
        const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1
        const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1
        mouseX.set(Math.max(-1, Math.min(1, nx)))
        mouseY.set(Math.max(-1, Math.min(1, ny)))
      })
    }

    const onLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    section.addEventListener("mousemove", onMove, { passive: true })
    section.addEventListener("mouseleave", onLeave)
    return () => {
      section.removeEventListener("mousemove", onMove)
      section.removeEventListener("mouseleave", onLeave)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [enabled, mouseX, mouseY, sectionRef])

  return (
    <div
      className="cx-hero-parallax-root pointer-events-none absolute inset-0 overflow-hidden bg-[#0f0f0f]"
      style={{ perspective: enabled ? 1000 : undefined }}
      aria-hidden
    >
      <div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {LAYERS.map((layer) => (
          <ParallaxLayer
            key={layer.src}
            src={layer.src}
            depth={layer.depth}
            zIndex={layer.zIndex}
            className={layer.className}
            springX={springX}
            springY={springY}
            enabled={enabled}
          />
        ))}
      </div>
    </div>
  )
}
