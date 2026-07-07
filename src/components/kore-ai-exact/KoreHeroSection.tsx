"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

import { KORE_HERO_BG_IMAGE } from "./koreHeroAssets"

type StyleVars = CSSProperties & Record<`--${string}`, string | number>

const heroImage = KORE_HERO_BG_IMAGE

const riveTabs = [
  {
    label: "{ Build }",
    id: "tabs-1-tab-1",
    panelId: "tabs-1-tab-1-panel",
    placeholder: "for-build",
    src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a15972d945f9408ee044dd8_Build_Full%20V4.riv",
    active: true,
    canvas: { width: 6040, height: 2296, cssWidth: "3020px", cssHeight: "1148px" },
  },
  {
    label: "{ Scale }",
    id: "tabs-1-tab-2",
    panelId: "tabs-1-tab-2-panel",
    placeholder: "for-scale",
    src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a1417303f6e8503a85caddb_Scale_Full%20V2.riv",
    active: false,
    canvas: { width: 1, height: 1, cssWidth: "1px", cssHeight: "1px" },
  },
  {
    label: "{ Optimize }",
    id: "tabs-1-tab-3",
    panelId: "tabs-1-tab-3-panel",
    placeholder: "for-optimize",
    src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a15999912b3f274de2ae25f_Optimize_Full%20V4.riv",
    active: false,
    canvas: { width: 1, height: 1, cssWidth: "1px", cssHeight: "1px" },
  },
]

type RiveRuntime = {
  Rive: new (config: Record<string, unknown>) => { cleanup?: () => void; resizeDrawingSurfaceToCanvas?: () => void }
  Layout: new (config: Record<string, unknown>) => unknown
  Fit: { cover: string }
  Alignment: { center: string }
}

type RiveWindow = Window & {
  rive?: RiveRuntime
}

function splitWords(text: string, startIndex = 0) {
  let charIndex = startIndex

  return text.split(" ").map((word, wordIndex) => (
    <span key={`${word}-${wordIndex}`} className="word" style={{ display: "inline-block" }}>
      {word.split("").map((char) => (
        <span
          key={`${char}-${charIndex}`}
          className="char"
          style={{ display: "inline-block", "--i": charIndex++ } as StyleVars}
        >
          {char}
        </span>
      ))}
    </span>
  ))
}

function SplitWord({ text, start = 0 }: { text: string; start?: number }) {
  return <>{splitWords(text, start)}</>
}

function DotArrowIcon() {
  const dots = [
    [0.795, 9.701, 0],
    [4.465, 9.701, 1],
    [8.135, 9.701, 2],
    [11.805, 9.701, 3],
    [15.475, 9.701, 4],
    [12.431, 17.861, 3],
    [15.005, 15.246, 4],
    [17.58, 12.63, 5],
    [20.155, 10.015, 6],
    [18.199, 7.4, 5],
    [15.624, 4.784, 4],
    [13.05, 2.169, 3],
  ]

  return (
    <div data-wf--icon---arrow--variant="base" className="k2-icon-arrow w-embed">
      <svg viewBox="0 0 22 19" fill="currentColor">
        {dots.map(([cx, cy, index]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="0.76"
            style={{ "--i": index } as StyleVars}
          />
        ))}
      </svg>
    </div>
  )
}

function RivePanel({ tab, active }: { tab: (typeof riveTabs)[number]; active: boolean }) {
  return (
    <div
      className={`k2-tabs-panel${active ? " on" : ""}`}
      id={tab.panelId}
      role="tabpanel"
      aria-labelledby={tab.id}
      inert={active ? undefined : true}
    >
      <div className={`k2-placeholder ${tab.placeholder}`}>
        <div
          data-delay=""
          rive-target=""
          data-rive-src={tab.src}
          data-wf--rive-element--select-size="base"
          className="featured-block-img v4 height-100"
        >
          <canvas
            className="rive-canvas"
            width={tab.canvas.width}
            height={tab.canvas.height}
            style={{
              display: "block",
              width: tab.canvas.cssWidth,
              height: tab.canvas.cssHeight,
              opacity: 0,
              transition: "opacity 0.35s",
              willChange: "opacity",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export function KoreHeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const riveInstances = useRef(new Map<string, { cleanup?: () => void; resizeDrawingSurfaceToCanvas?: () => void }>())
  const [activeIndex, setActiveIndex] = useState(0)
  const [riveReadyTick, setRiveReadyTick] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const tab = riveTabs[activeIndex]
    const host = section?.querySelector<HTMLElement>(`#${tab.panelId} [data-rive-src]`)
    const canvas = host?.querySelector<HTMLCanvasElement>(".rive-canvas")
    const rive = (window as RiveWindow).rive
    if (!host || !canvas) return
    if (!rive) {
      const timer = window.setTimeout(() => setRiveReadyTick((tick) => tick + 1), 250)
      return () => window.clearTimeout(timer)
    }

    const resizeCanvas = () => {
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const width = Math.max(1, Math.round(rect.width * dpr))
      const height = Math.max(1, Math.round(rect.height * dpr))

      canvas.width = width
      canvas.height = height
      canvas.style.width = `${Math.max(1, Math.round(rect.width))}px`
      canvas.style.height = `${Math.max(1, Math.round(rect.height))}px`
      riveInstances.current.get(tab.id)?.resizeDrawingSurfaceToCanvas?.()
    }

    resizeCanvas()
    canvas.style.opacity = "1"

    if (!riveInstances.current.has(tab.id)) {
      const instance = new rive.Rive({
        src: tab.src,
        canvas,
        autoplay: true,
        layout: new rive.Layout({ fit: rive.Fit.cover, alignment: rive.Alignment.center }),
        onLoad: () => {
          resizeCanvas()
          requestAnimationFrame(() => {
            canvas.style.opacity = "1"
          })
        },
      })
      riveInstances.current.set(tab.id, instance)
    } else {
      canvas.style.opacity = "1"
      resizeCanvas()
    }

    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [activeIndex, riveReadyTick])

  useEffect(() => {
    const instances = riveInstances.current
    return () => {
      instances.forEach((instance) => instance.cleanup?.())
      instances.clear()
    }
  }, [])

  return (
    <section ref={sectionRef} id="meet-artemis" data-scroll="" className="k2-section k2-section-hero on">
      <div className="k2-bg">
        <div
          data-wf--image--variant="hero"
          data-unscale=""
          className="k2-img-wrapper w-variant-6caae8cc-b03c-2d74-3ebd-16833ce90397"
        >
          <img fetchPriority="high" src={heroImage} loading="eager" alt="" className="k2-img" />
        </div>
        <div className="k2-overlay" />
      </div>

      <div className="k2-container k2-container-hero">
        <div className="k2-hero">
          <div
            data-split="words,chars"
            data-mw="100"
            data-op="100"
            data-color="green-light"
            data-wf--paragraph--variant="label"
            className="k2-text w-variant-4e94cbd2-62e7-c052-8b05-c8aa5de6d8c5 w-richtext"
            style={{ "--n": 20 } as StyleVars}
          >
            <p>
              {splitWords("Softree Technology · Agentic AI").map((word, index) => (
                <span key={index}>
                  {index > 0 ? " " : null}
                  {word}
                </span>
              ))}
            </p>
          </div>

          <div className="k2-hero">
            <div
              data-flip-target="loader"
              data-font-style="italic"
              data-mw="100"
              data-op="100"
              data-split="words,chars"
              data-wf--heading--variant="h1"
              className="k2-heading w-variant-14221f46-b77f-f549-1365-c3cf0146a3ed w-richtext"
            >
              <p>
                <SplitWord text="Meet" />{" "}
                <em style={{ display: "inline-block", position: "relative" }}>
                  <SplitWord text="{" start={0} />{" "}
                  <sup style={{ display: "inline-block", position: "relative" }}>
                    <SplitWord text="Softree" start={0} />
                  </sup>{" "}
                  <SplitWord text="}" start={0} />
                </em>
              </p>
            </div>

            <div data-stagger="300" className="on">
              <div
                data-op="100"
                data-mw="100"
                data-wf--heading--variant="display-4"
                className="k2-heading w-variant-a99798b7-ba2e-447c-08ca-de2b7acb44dc w-richtext"
              >
                <h1>Autonomous agents built for the agentic enterprise</h1>
              </div>
              <div
                data-op="100"
                data-font-style="italic"
                data-mw="55"
                data-wf--heading--variant="display-4"
                className="k2-heading w-variant-a99798b7-ba2e-447c-08ca-de2b7acb44dc w-richtext"
                style={{ transitionDelay: "300ms", animationDelay: "300ms" }}
              >
                <p>
                  <em>Design, deploy, and govern AI on the Microsoft stack.</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="k2-container k2-container-hero-2">
        <div data-stagger="200/400" className="k2-hero-2 on">
          <div
            data-op="70"
            data-font-weight="300"
            data-mw="100"
            data-wf--paragraph--variant="medium"
            className="k2-text w-variant-02404dae-b9b0-4e85-c5f5-f41da6cf14a9 w-richtext"
            style={{ transitionDelay: "400ms", animationDelay: "400ms" }}
          >
            <p>
              Built for enterprise delivery from the ground up {"{ "}
              <strong>Softree</strong>
              {" }"} combines offshore velocity with Copilot Studio, Azure AI, and Power Platform expertise. Agents we
              ship thrive in complex, high-volume, regulated workflows — with governance your IT team can audit. This is
              agentic AI delivery that experience made possible.
            </p>
          </div>

          <div
            data-wf--cta--variant="white"
            className="k2-cta w-variant-324d61ef-5935-7d9b-deaa-ee6d974aa212"
            style={{ transitionDelay: "600ms", animationDelay: "600ms" }}
          >
            <div className="k2-clickable">
              <a aria-label="Let's talk" href="/contact" className="k2-action w-inline-block" />
            </div>
            <div aria-hidden="true" className="k2-cta-text">
              Let's talk
            </div>
            <div aria-hidden="true" className="k2-cta-icon w-variant-324d61ef-5935-7d9b-deaa-ee6d974aa212">
              <DotArrowIcon />
            </div>
          </div>
        </div>
      </div>

      <div data-stagger="200/600" className="k2-container on">
        <div
          data-autoplay=""
          className="k2-tabs"
          data-k2-init="true"
          style={{ transitionDelay: "600ms", animationDelay: "600ms" }}
        >
          <div className="k2-tabs-menu" role="tablist">
            {riveTabs.map((tab, index) => {
              const active = index === activeIndex
              return (
                <button
                  key={tab.id}
                  data-wf--tabs---button--variant="base"
                  type="button"
                  className={`k2-tabs-btn${active ? " on" : ""}`}
                  id={tab.id}
                  role="tab"
                  aria-controls={tab.panelId}
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  style={{ "--p": 0 } as StyleVars}
                  onClick={() => setActiveIndex(index)}
                >
                  <div data-scramble="">{tab.label}</div>
                </button>
              )
            })}
          </div>

          <div className="k2-tabs-panels">
            {riveTabs.map((tab, index) => (
              <RivePanel key={tab.id} tab={tab} active={index === activeIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
