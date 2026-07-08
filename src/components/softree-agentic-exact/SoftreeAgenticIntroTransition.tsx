"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const SESSION_KEY = "softree-agentic-intro-v1"

const heroImage =
  "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a0492517357867bd2ef180f_k2-hero.webp"

const introLines = [
  "Scalable Microsoft + AI teams",
  "Agentic AI delivery by Softree",
]

function completeIntro(root: HTMLElement | null) {
  const shell = document.querySelector<HTMLElement>(".softree-agentic-shell")
  shell?.classList.remove("softree-agentic-intro-running")
  shell?.classList.add("softree-agentic-intro-complete")
  document.documentElement.classList.remove("softree-agentic-intro-lock")

  if (root) {
    root.style.pointerEvents = "none"
    root.style.display = "none"
  }

  window.dispatchEvent(new CustomEvent("softree-agentic-intro-complete"))
}

export function SoftreeAgenticIntroTransition() {
  const rootRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const completedRef = useRef(false)
  const [typedText, setTypedText] = useState("")
  const [lineIndex, setLineIndex] = useState(0)
  const [skipIntro] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1"
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (skipIntro) {
      const shell = document.querySelector<HTMLElement>(".softree-agentic-shell")
      shell?.classList.add("softree-agentic-intro-complete")
      completeIntro(null)
      return
    }

    const shell = document.querySelector<HTMLElement>(".softree-agentic-shell")
    shell?.classList.add("softree-agentic-intro-running")
    document.documentElement.classList.add("softree-agentic-intro-lock")

    return () => {
      document.documentElement.classList.remove("softree-agentic-intro-lock")
    }
  }, [skipIntro])

  useEffect(() => {
    if (skipIntro) return

    let cancelled = false
    let timeout = 0

    const typeLine = (index: number, charIndex = 0) => {
      const line = introLines[index]
      if (!line || cancelled) return

      setLineIndex(index)
      setTypedText(line.slice(0, charIndex))

      if (charIndex <= line.length) {
        timeout = window.setTimeout(() => typeLine(index, charIndex + 1), 18)
        return
      }

      timeout = window.setTimeout(() => {
        if (index < introLines.length - 1) typeLine(index + 1, 0)
        else runExit()
      }, 220)
    }

    const runExit = () => {
      if (cancelled || completedRef.current) return

      const root = rootRef.current
      const image = imageRef.current
      const heroTargets = [
        "#meet-artemis .k2-container-hero > .k2-hero > .k2-text",
        "#meet-artemis [data-flip-target='loader']",
        "#meet-artemis .k2-container-hero h1",
        "#meet-artemis .k2-container-hero em",
        "#meet-artemis .k2-container-hero-2 .k2-text",
        "#meet-artemis .k2-container-hero-2 .k2-cta",
      ].join(", ")

      if (!root || !image) {
        finish()
        return
      }

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) {
        finish()
        return
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: finish,
      })

      timeline
        .to(".softree-agentic-loader-type", { y: -12, autoAlpha: 0, duration: 0.35 })
        .to(image, { scale: 1, duration: 0.55 }, "<")
        .to(root, { autoAlpha: 0, duration: 0.45, ease: "power2.inOut" }, "-=0.05")
        .fromTo(
          heroTargets,
          { y: -80, autoAlpha: 0, transformOrigin: "50% 0%" },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.06,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
          },
          "-=0.1",
        )

      const fallback = window.setTimeout(finish, 4500)

      function finish() {
        window.clearTimeout(fallback)
        if (completedRef.current) return
        completedRef.current = true
        try {
          sessionStorage.setItem(SESSION_KEY, "1")
        } catch {
          // ignore
        }
        completeIntro(root)
      }
    }

    timeout = window.setTimeout(() => typeLine(0), 120)

    const hardStop = window.setTimeout(() => {
      if (!completedRef.current) runExit()
    }, 6000)

    return () => {
      cancelled = true
      window.clearTimeout(timeout)
      window.clearTimeout(hardStop)
    }
  }, [skipIntro])

  if (skipIntro) return null

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html.softree-agentic-intro-lock,
            html.softree-agentic-intro-lock body {
              overflow: hidden !important;
            }

            .softree-agentic-intro-loader {
              position: fixed;
              inset: 0;
              z-index: 2147483000;
              overflow: hidden;
              color: #fef8ee;
              background: #050706;
              pointer-events: auto;
            }

            .softree-agentic-intro-bg {
              position: absolute;
              inset: 0;
              background-image:
                linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.25)),
                url("${heroImage}");
              background-size: cover;
              background-position: center;
              transform: scale(1.06);
              transform-origin: center;
              will-change: transform;
            }

            .softree-agentic-intro-grid {
              position: absolute;
              inset: 0;
              opacity: .12;
              background-image:
                linear-gradient(rgba(254,248,238,.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(254,248,238,.12) 1px, transparent 1px);
              background-size: 64px 64px;
              mask-image: radial-gradient(circle at 50% 50%, #000 0%, transparent 70%);
            }

            .softree-agentic-loader-type {
              position: absolute;
              left: clamp(1.25rem, 5vw, 4rem);
              right: clamp(1.25rem, 5vw, 4rem);
              bottom: clamp(2rem, 7vh, 5rem);
              display: grid;
              gap: 1rem;
              will-change: transform, opacity;
            }

            .softree-agentic-loader-kicker {
              font-size: .72rem;
              line-height: 1;
              text-transform: uppercase;
              letter-spacing: .16em;
              opacity: .7;
              color: #ff5812;
            }

            .softree-agentic-loader-line {
              max-width: min(52rem, 100%);
              min-height: clamp(2.5rem, 6vw, 5rem);
              font-size: clamp(1.75rem, 4.5vw, 4rem);
              line-height: 1.05;
              font-weight: 500;
              letter-spacing: -.04em;
              text-wrap: balance;
            }

            .softree-agentic-loader-caret {
              display: inline-block;
              width: .045em;
              height: .78em;
              margin-left: .08em;
              transform: translateY(.08em);
              background: #ff5812;
              animation: softree-agentic-caret .72s steps(1) infinite;
            }

            .softree-agentic-loader-progress {
              width: min(20rem, 60vw);
              height: 2px;
              overflow: hidden;
              background: rgba(254,248,238,.18);
            }

            .softree-agentic-loader-progress span {
              display: block;
              width: 100%;
              height: 100%;
              transform: translateX(-100%);
              background: #ff5812;
              animation: softree-agentic-loader-progress 1.8s cubic-bezier(.22,.61,.36,1) forwards;
            }

            .softree-agentic-intro-running #meet-artemis .k2-container-hero > .k2-hero > .k2-text,
            .softree-agentic-intro-running #meet-artemis [data-flip-target='loader'],
            .softree-agentic-intro-running #meet-artemis .k2-container-hero h1,
            .softree-agentic-intro-running #meet-artemis .k2-container-hero em,
            .softree-agentic-intro-running #meet-artemis .k2-container-hero-2 .k2-text,
            .softree-agentic-intro-running #meet-artemis .k2-container-hero-2 .k2-cta {
              opacity: 0;
              visibility: hidden;
              transform: translate3d(0, -80px, 0);
              transform-origin: 50% 0%;
            }

            @keyframes softree-agentic-caret {
              50% { opacity: 0; }
            }

            @keyframes softree-agentic-loader-progress {
              to { transform: translateX(0); }
            }
          `,
        }}
      />
      <div ref={rootRef} className="softree-agentic-intro-loader" aria-label="Loading agentic AI page">
        <div ref={imageRef} className="softree-agentic-intro-bg" />
        <div className="softree-agentic-intro-grid" />
        <div className="softree-agentic-loader-type">
          <div className="softree-agentic-loader-kicker">Softree · Agentic AI · {lineIndex + 1}/{introLines.length}</div>
          <div className="softree-agentic-loader-line">
            {typedText}
            <span className="softree-agentic-loader-caret" aria-hidden="true" />
          </div>
          <div className="softree-agentic-loader-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </>
  )
}
