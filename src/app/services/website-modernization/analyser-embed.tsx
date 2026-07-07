"use client"

import { useEffect, useRef, useState } from "react"
import { trackModernizationEvent } from "./analytics"

const ANALYSER_BASE = "https://web-lead-magnet-seven.vercel.app"

type AnalyserEmbedProps = {
  prefillUrl?: string
}

export default function AnalyserEmbed({ prefillUrl }: AnalyserEmbedProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [shouldLoad, setShouldLoad] = useState(Boolean(prefillUrl))

  const iframeSrc = prefillUrl
    ? `${ANALYSER_BASE}?url=${encodeURIComponent(prefillUrl)}`
    : ANALYSER_BASE

  useEffect(() => {
    if (prefillUrl) setShouldLoad(true)
  }, [prefillUrl])

  useEffect(() => {
    const el = sectionRef.current
    if (!el || shouldLoad) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          trackModernizationEvent("analyser_scroll")
          trackModernizationEvent("analyser_load", { deferred: true })
          observer.disconnect()
        }
      },
      { rootMargin: "200px 0px", threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shouldLoad])

  useEffect(() => {
    if (shouldLoad && prefillUrl) {
      trackModernizationEvent("analyser_load", { prefill: true })
    }
  }, [shouldLoad, prefillUrl])

  return (
    <section
      ref={sectionRef}
      id="wm-analyser"
      tabIndex={-1}
      aria-labelledby="wm-analyser-heading"
      className="bg-[#0a0a0a] py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-6 max-w-2xl text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            Live tool
          </p>
          <h2 id="wm-analyser-heading" className="mt-2 text-2xl font-bold md:text-3xl">
            Generate your modernisation blueprint
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            {prefillUrl ? (
              <>
                Analysing:{" "}
                <span className="font-mono text-zinc-300">{prefillUrl}</span>
              </>
            ) : (
              "Enter your details below to run the full AI audit."
            )}
          </p>
          <p className="mt-2 text-xs text-zinc-600">
            Related:{" "}
            <a href="/webanalyser" className="text-[#FF5812] underline hover:no-underline">
              AI Web Analyser
            </a>
            {" · "}
            <a
              href="/services/offshore-web-app-development"
              className="text-[#FF5812] underline hover:no-underline"
            >
              Custom web development
            </a>
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          {shouldLoad ? (
            <iframe
              src={iframeSrc}
              title="AI website modernisation blueprint generator"
              className="h-[min(900px,85vh)] w-full border-0 bg-[#0a0a0a]"
              loading="lazy"
              allow="clipboard-write"
            />
          ) : (
            <div
              className="flex h-[min(480px,60vh)] flex-col items-center justify-center gap-3 bg-zinc-900/80 p-8 text-center"
              aria-busy="true"
            >
              <div
                className="h-8 w-8 animate-spin rounded-full border-2 border-[#FF5812] border-t-transparent"
                aria-hidden
              />
              <p className="text-sm text-zinc-400">
                Analyser loads when you scroll here — saves bandwidth until you need it.
              </p>
              <button
                type="button"
                onClick={() => {
                  setShouldLoad(true)
                  trackModernizationEvent("analyser_load", { manual: true })
                }}
                className="mt-2 rounded-lg bg-[#FF5812] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e64f10] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]"
              >
                Load analyser now
              </button>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-zinc-600">
          Prefer full-screen?{" "}
          <a
            href={prefillUrl ? `/webanalyser?url=${encodeURIComponent(prefillUrl)}` : "/webanalyser"}
            className="text-[#FF5812] underline hover:no-underline"
          >
            Open AI analyser
          </a>
        </p>
      </div>
    </section>
  )
}
