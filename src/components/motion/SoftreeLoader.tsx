"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { SOFTREE_LOGO_ALT, SOFTREE_LOGO_URL } from "@/lib/brand-assets"
import { prefersReducedMotion } from "@/lib/motion"

import "./softree-loader.css"

const SESSION_KEY = "softree-loader-played"
const LOGO_HOLD_MS = 620
const CROSSFADE_MS = 780
const FORCE_COMPLETE_MS = 4000

function markReady() {
  const html = document.documentElement
  html.classList.remove("loading")
  html.classList.add("ready")
  sessionStorage.setItem(SESSION_KEY, "1")
  window.dispatchEvent(new CustomEvent("softree:ready"))
  window.dispatchEvent(new CustomEvent("barba:enter-complete"))
}

/**
 * First-visit brand loader (Kore `handleLoader` pattern).
 * NOT used on in-app navigation — Barba curtain handles that.
 */
export function SoftreeLoader() {
  const [stage, setStage] = useState<"pending" | "logo-1" | "logo-2" | "done">("pending")
  const finishedRef = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const frames: number[] = []

    const finish = () => {
      if (finishedRef.current || cancelled) return
      finishedRef.current = true
      markReady()
      setStage("done")
    }

    const schedule = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms))
    }

    const nextFrame = (fn: () => void) => {
      frames.push(window.requestAnimationFrame(fn))
    }

    if (prefersReducedMotion() || sessionStorage.getItem(SESSION_KEY) === "1") {
      nextFrame(finish)
      return () => {
        cancelled = true
        timers.forEach(clearTimeout)
        frames.forEach(cancelAnimationFrame)
      }
    }

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    window.scrollTo(0, 0)

    nextFrame(() => {
      if (cancelled) return
      document.documentElement.classList.add("loading")
      setStage("logo-1")
    })

    schedule(() => {
      if (!cancelled) setStage("logo-2")
    }, LOGO_HOLD_MS)

    schedule(finish, LOGO_HOLD_MS + CROSSFADE_MS)
    schedule(finish, FORCE_COMPLETE_MS)

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      frames.forEach(cancelAnimationFrame)
    }
  }, [])

  if (stage === "done") return null

  const stageClass = stage === "logo-1" || stage === "logo-2" ? ` ${stage}` : ""

  return (
    <div className={`softree-loader${stageClass}`} aria-hidden role="presentation">
      <Image
        src={SOFTREE_LOGO_URL}
        alt={SOFTREE_LOGO_ALT}
        width={220}
        height={48}
        priority
        className="softree-loader__logo softree-loader__logo--primary h-auto w-[min(220px,58vw)]"
      />
      <div className="softree-loader__accent" />
      <p className="softree-loader__tag">Enterprise AI &amp; Microsoft stack</p>
    </div>
  )
}
