"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { SOFTREE_LOGO_ALT, SOFTREE_LOGO_URL } from "@/lib/brand-assets"

import {
  AGENTIC_AI_INTRO_MS,
  markAgenticAiIntroPlayed,
  setAgenticAiReady,
  shouldSkipAgenticAiIntro,
} from "./agentic-ai-intro"
import "./agentic-ai-loader.css"

const EXIT_MS = 480
const STEP_MS = 220
const FORCE_COMPLETE_MS = 3200

type LoaderState = "idle" | "show" | "exit" | "off"
type LoaderStep = 1 | 2 | 3

/**
 * First-visit intro for the offshore AI page only.
 * Kore k2-loader inspired choreography — CSS transform/opacity, session-scoped.
 */
export function AgenticAiPageLoader() {
  const [state, setState] = useState<LoaderState>("idle")
  const [step, setStep] = useState<LoaderStep>(1)
  const finishedRef = useRef(false)

  useEffect(() => {
    document.documentElement.classList.add("agentic-ai-route")

    const timers: number[] = []
    const schedule = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms))
    }

    const finish = () => {
      if (finishedRef.current) return
      finishedRef.current = true
      markAgenticAiIntroPlayed()
      setAgenticAiReady()
      setState("exit")
      schedule(() => setState("off"), EXIT_MS)
    }

    const skip = shouldSkipAgenticAiIntro()

    if (skip) {
      finishedRef.current = true
      setAgenticAiReady()
      setState("off")
      return () => {
        timers.forEach(clearTimeout)
        document.documentElement.classList.remove("agentic-ai-route")
      }
    }

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    window.scrollTo(0, 0)
    document.documentElement.classList.add("agentic-ai-loading")

    schedule(() => {
      setState("show")
      setStep(1)
    }, 80)

    schedule(() => setStep(2), 80 + STEP_MS)
    schedule(() => setStep(3), 80 + STEP_MS * 2)
    schedule(finish, 80 + AGENTIC_AI_INTRO_MS)
    schedule(finish, FORCE_COMPLETE_MS)

    return () => {
      timers.forEach(clearTimeout)
      document.documentElement.classList.remove("agentic-ai-route")
      document.documentElement.classList.remove("agentic-ai-loading")
      if (!finishedRef.current) {
        setAgenticAiReady()
      }
    }
  }, [])

  if (state === "off" || state === "idle") return null

  const stepClass = state === "show" ? ` step-${step}` : ""

  return (
    <div
      className={`agentic-ai-loader${state === "show" ? " is-active" : ""}${state === "exit" ? " is-exiting" : ""}${stepClass}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Agentic AI page"
    >
      <div className="agentic-ai-loader__grain" aria-hidden />
      <p className="agentic-ai-loader__corner" aria-hidden>
        01 · Agentic AI
      </p>
      <div className="agentic-ai-loader__inner">
        <Image
          src={SOFTREE_LOGO_URL}
          alt={SOFTREE_LOGO_ALT}
          width={240}
          height={52}
          priority
          className="agentic-ai-loader__logo h-auto w-[min(240px,62vw)]"
        />
        <div className="agentic-ai-loader__line" aria-hidden />
        <p className="agentic-ai-loader__label">Offshore delivery · Enterprise AI</p>
      </div>
      <div className="agentic-ai-loader__progress" aria-hidden>
        <span />
      </div>
    </div>
  )
}
