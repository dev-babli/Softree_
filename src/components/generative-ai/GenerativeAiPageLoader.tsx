"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { SOFTREE_LOGO_ALT, SOFTREE_LOGO_URL } from "@/lib/brand-assets"

import {
  GENERATIVE_AI_INTRO_MS,
  markGenerativeAiIntroPlayed,
  setGenerativeAiReady,
  shouldSkipGenerativeAiIntro,
} from "./generative-ai-intro"
import "./generative-ai-loader.css"

const EXIT_MS = 480
const STEP_MS = 220
const FORCE_COMPLETE_MS = 3200

type LoaderState = "idle" | "show" | "exit" | "off"
type LoaderStep = 1 | 2 | 3

export function GenerativeAiPageLoader() {
  const [state, setState] = useState<LoaderState>("idle")
  const [step, setStep] = useState<LoaderStep>(1)
  const finishedRef = useRef(false)

  useEffect(() => {
    document.documentElement.classList.add("generative-ai-route")

    const timers: number[] = []
    const schedule = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms))
    }

    const finish = () => {
      if (finishedRef.current) return
      finishedRef.current = true
      markGenerativeAiIntroPlayed()
      setGenerativeAiReady()
      setState("exit")
      schedule(() => setState("off"), EXIT_MS)
    }

    if (shouldSkipGenerativeAiIntro()) {
      finishedRef.current = true
      setGenerativeAiReady()
      setState("off")
      return () => {
        timers.forEach(clearTimeout)
        document.documentElement.classList.remove("generative-ai-route")
      }
    }

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    window.scrollTo(0, 0)
    document.documentElement.classList.add("generative-ai-loading")

    schedule(() => {
      setState("show")
      setStep(1)
    }, 80)

    schedule(() => setStep(2), 80 + STEP_MS)
    schedule(() => setStep(3), 80 + STEP_MS * 2)
    schedule(finish, 80 + GENERATIVE_AI_INTRO_MS)
    schedule(finish, FORCE_COMPLETE_MS)

    return () => {
      timers.forEach(clearTimeout)
      document.documentElement.classList.remove("generative-ai-route")
      document.documentElement.classList.remove("generative-ai-loading")
      if (!finishedRef.current) {
        setGenerativeAiReady()
      }
    }
  }, [])

  if (state === "off" || state === "idle") return null

  const stepClass = state === "show" ? ` step-${step}` : ""

  return (
    <div
      className={`generative-ai-loader${state === "show" ? " is-active" : ""}${state === "exit" ? " is-exiting" : ""}${stepClass}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Generative AI page"
    >
      <div className="generative-ai-loader__grain" aria-hidden />
      <p className="generative-ai-loader__corner" aria-hidden>
        02 · Generative AI
      </p>
      <div className="generative-ai-loader__inner">
        <Image
          src={SOFTREE_LOGO_URL}
          alt={SOFTREE_LOGO_ALT}
          width={240}
          height={52}
          priority
          className="generative-ai-loader__logo h-auto w-[min(240px,62vw)]"
        />
        <div className="generative-ai-loader__line" aria-hidden />
        <p className="generative-ai-loader__label">Copilots · LLMs · Enterprise delivery</p>
      </div>
      <div className="generative-ai-loader__progress" aria-hidden>
        <span />
      </div>
    </div>
  )
}
