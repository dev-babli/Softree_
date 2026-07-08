"use client"

import { useCallback, useRef, useState } from "react"

const BEFORE_LABEL = "Current site"
const AFTER_LABEL = "Modernisation blueprint"

export default function TransformationSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return
    updatePosition(e.clientX)
  }

  function onPointerUp() {
    dragging.current = false
  }

  return (
    <section
      aria-labelledby="wm-transform-heading"
      className="bg-[#F3F0EE] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            Before & after
          </p>
          <h2
            id="wm-transform-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl"
          >
            Drag to compare current vs modernised structure
          </h2>
          <p className="mt-4 text-base text-zinc-600">
            Illustrative wireframe blocks — your live blueprint is tailored to your URL.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-zinc-300 bg-zinc-200 select-none touch-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* After (modern) */}
          <div className="absolute inset-0 flex flex-col bg-white p-4 md:p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FF5812]">
              {AFTER_LABEL}
            </span>
            <div className="mt-3 flex flex-1 flex-col gap-2">
              <div className="h-[18%] rounded-lg bg-zinc-900/90 p-3">
                <div className="h-2 w-1/2 rounded bg-white/80" />
                <div className="mt-2 h-1.5 w-2/3 rounded bg-white/40" />
                <div className="mt-3 flex gap-2">
                  <div className="h-6 w-20 rounded-full bg-[#FF5812]" />
                  <div className="h-6 w-20 rounded-full border border-white/30" />
                </div>
              </div>
              <div className="flex h-[12%] items-center justify-center gap-4 rounded-lg bg-zinc-100">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-6 w-14 rounded bg-zinc-300" />
                ))}
              </div>
              <div className="grid flex-1 grid-cols-3 gap-2">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="rounded-lg border border-zinc-200 p-2">
                    <div className="h-2 w-3/4 rounded bg-zinc-300" />
                    <div className="mt-2 h-1 w-full rounded bg-zinc-200" />
                  </div>
                ))}
              </div>
              <div className="h-[14%] rounded-lg bg-[#FF5812]/10 p-3 text-center">
                <div className="mx-auto h-2 w-1/3 rounded bg-[#FF5812]/60" />
              </div>
            </div>
          </div>

          {/* Before (clipped) */}
          <div
            className="absolute inset-0 flex flex-col bg-zinc-400 p-4 md:p-6"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            aria-hidden
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
              {BEFORE_LABEL}
            </span>
            <div className="mt-3 flex flex-1 flex-col gap-3 opacity-90">
              <div className="h-8 w-full rounded bg-zinc-500" />
              <div className="h-24 rounded bg-zinc-500/80" />
              <div className="grid flex-1 grid-cols-2 gap-2">
                <div className="rounded bg-zinc-500/70" />
                <div className="rounded bg-zinc-500/70" />
              </div>
              <div className="h-6 w-1/4 rounded bg-zinc-600" />
            </div>
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 z-10 w-1 bg-[#FF5812] shadow-lg"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            aria-hidden
          >
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#FF5812] bg-white shadow-md">
              <span className="text-[#FF5812]">↔</span>
            </div>
          </div>

          <label htmlFor="wm-transform-range" className="sr-only">
            Compare before and after wireframe
          </label>
          <input
            id="wm-transform-range"
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="absolute bottom-4 left-1/2 z-20 w-[min(280px,80%)] -translate-x-1/2 accent-[#FF5812]"
            aria-valuetext={`${Math.round(position)} percent showing ${BEFORE_LABEL}`}
          />
        </div>
      </div>
    </section>
  )
}
