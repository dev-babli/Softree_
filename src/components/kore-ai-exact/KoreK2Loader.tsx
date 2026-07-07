"use client"

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react"
import { createPortal } from "react-dom"
import { KORE_HERO_BG_IMAGE } from "./koreHeroAssets"
import { finalizeHeroReveal } from "./heroHandoffSelectors"
import { runK2Loader, shouldSkipK2Loader } from "./k2LoaderRuntime"
import "./k2-loader.css"

type StyleVars = CSSProperties & Record<`--${string}`, string | number>

function splitChars(text: string, startIndex = 0) {
  let charIndex = startIndex

  return text.split("").map((char, index) => (
    <span
      key={`${char}-${index}`}
      className="char"
      style={{ display: "inline-block", "--i": charIndex++ } as StyleVars}
    >
      {char}
    </span>
  ))
}

function LoaderMarkup() {
  return (
    <div className="k2-loader step-0" aria-label="Loading Softree Agentic AI" role="status" aria-live="polite">
      <div className="k2-loader-perspective">
        <div className="k2-loader-bg" data-k2-loader-bg="">
          <img
            src={KORE_HERO_BG_IMAGE}
            alt=""
            className="k2-loader-bg-img"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="k2-loader-bg-overlay" aria-hidden="true" />
        </div>
      </div>

      <div className="k2-loader-grain" aria-hidden="true" />

      <div className="k2-loader-ui">
        <div
          data-flip="loader"
          data-font-style="italic"
          data-mw="100"
          data-op="100"
          data-split="words,chars"
          data-wf--heading--variant="display-5"
          className="k2-heading w-variant-78b56fe7-8c75-0360-85cb-da3212be0c74 w-richtext"
        >
          <p>
            <span className="word" style={{ display: "inline-block" }}>
              {splitChars("Meet")}
            </span>{" "}
            <em style={{ display: "inline-block", position: "relative" }}>
              <span className="word" style={{ display: "inline-block" }}>
                {splitChars("{")}
              </span>{" "}
              <sup style={{ display: "inline-block", position: "relative" }}>
                <span className="word" style={{ display: "inline-block" }}>
                  {splitChars("Softree")}
                </span>
              </sup>{" "}
              <span className="word" style={{ display: "inline-block" }}>
                {splitChars("}")}
              </span>
            </em>
          </p>
        </div>

        <div className="k2-loader-bar-item">
          <div className="k2-loader-bar" />
        </div>
      </div>
    </div>
  )
}

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

export function KoreK2Loader() {
  const startedRef = useRef(false)
  const [skipLoader] = useState(() => shouldSkipK2Loader())
  const mounted = useIsMounted()

  useEffect(() => {
    if (skipLoader) {
      finalizeHeroReveal()
      window.dispatchEvent(new CustomEvent("kore-ai-intro-complete"))
      document.querySelector(".k2-loader")?.remove()
      return
    }

    if (!mounted || startedRef.current) return
    startedRef.current = true

    const cleanup = runK2Loader()
    return cleanup
  }, [mounted, skipLoader])

  if (skipLoader || !mounted) return null

  return createPortal(<LoaderMarkup />, document.body)
}
