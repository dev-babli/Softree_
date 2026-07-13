"use client"

import { useEffect, useRef, useState } from "react"

type RiveRuntime = {
  Rive: new (config: Record<string, unknown>) => {
    cleanup?: () => void
    resizeDrawingSurfaceToCanvas?: () => void
  }
  Layout: new (config: Record<string, unknown>) => unknown
  Fit: { cover: string; contain: string }
  Alignment: { center: string }
}

type RiveWindow = Window & { rive?: RiveRuntime }

/**
 * Reusable Rive animation mount. Loads the .riv file onto a canvas once the
 * global Rive runtime (loaded via next/script in the page shell) is ready.
 * Mirrors the pattern used in SoftreeAgenticHeroSection.
 */
export function RiveCanvas({
  src,
  className,
  canvasWidth = 1552,
  canvasHeight = 1420,
  fit = "cover",
}: {
  src: string
  className?: string
  canvasWidth?: number
  canvasHeight?: number
  fit?: "cover" | "contain"
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const instanceRef = useRef<{ cleanup?: () => void; resizeDrawingSurfaceToCanvas?: () => void } | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    const rive = (window as RiveWindow).rive
    if (!host || !canvas) return
    if (!rive) {
      const timer = window.setTimeout(() => setTick((t) => t + 1), 250)
      return () => window.clearTimeout(timer)
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      canvas.style.width = `${Math.max(1, Math.round(rect.width))}px`
      canvas.style.height = `${Math.max(1, Math.round(rect.height))}px`
      instanceRef.current?.resizeDrawingSurfaceToCanvas?.()
    }

    resize()
    canvas.style.opacity = "1"

    if (!instanceRef.current) {
      instanceRef.current = new rive.Rive({
        src,
        canvas,
        autoplay: true,
        layout: new rive.Layout({ fit: rive.Fit[fit], alignment: rive.Alignment.center }),
        onLoad: () => {
          resize()
          requestAnimationFrame(() => {
            canvas.style.opacity = "1"
          })
        },
      })
    }

    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [src, fit, tick])

  useEffect(() => {
    const instance = instanceRef.current
    return () => {
      instance?.cleanup?.()
      instanceRef.current = null
    }
  }, [])

  return (
    <div ref={hostRef} data-delay="" rive-target="" data-rive-src={src} className={className}>
      <canvas
        ref={canvasRef}
        className="rive-canvas"
        width={canvasWidth}
        height={canvasHeight}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          opacity: 0,
          transition: "opacity 0.35s",
          willChange: "opacity",
        }}
      />
    </div>
  )
}
