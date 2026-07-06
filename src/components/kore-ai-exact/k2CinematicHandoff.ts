import {
  finalizeHeroReveal,
  HERO_FLIP_TARGET,
  HERO_REST_SELECTORS,
  revealHeroContent,
  syncHeroFlipMetrics,
} from "./heroHandoffSelectors"

type GsapTimeline = {
  to: (
    targets: unknown,
    vars: Record<string, unknown>,
    position?: string | number,
  ) => GsapTimeline
  call: (callback: () => void, params?: unknown[], position?: string | number) => GsapTimeline
}

type GsapRuntime = {
  set: (targets: unknown, vars: Record<string, unknown>) => void
  timeline: (vars?: Record<string, unknown>) => GsapTimeline
}

type GsapWindow = Window & { gsap?: GsapRuntime }

function waitForGsap(maxMs = 2500): Promise<GsapRuntime | null> {
  return new Promise((resolve) => {
    const start = Date.now()
    const tick = () => {
      const gsap = (window as GsapWindow).gsap
      if (gsap) {
        resolve(gsap)
        return
      }
      if (Date.now() - start >= maxMs) {
        resolve(null)
        return
      }
      requestAnimationFrame(tick)
    }
    tick()
  })
}

export async function runCinematicHandoff(
  loader: HTMLElement,
  finish: () => void,
): Promise<void> {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) {
    finalizeHeroReveal()
    finish()
    return
  }

  const gsap = await waitForGsap()
  if (!gsap) {
    finalizeHeroReveal()
    finish()
    return
  }

  const bg = loader.querySelector<HTMLElement>("[data-k2-loader-bg]")
  const bgOverlay = loader.querySelector<HTMLElement>(".k2-loader-bg-overlay")
  const flipFrom = loader.querySelector<HTMLElement>("[data-flip]")
  const flipTo = document.querySelector<HTMLElement>(HERO_FLIP_TARGET)
  const heroBgRoot = document.querySelector<HTMLElement>("#meet-artemis .k2-bg")
  const bar = loader.querySelector<HTMLElement>(".k2-loader-bar-item")
  const grain = loader.querySelector<HTMLElement>(".k2-loader-grain")
  const ui = loader.querySelector<HTMLElement>(".k2-loader-ui")
  const heroRest = document.querySelectorAll<HTMLElement>(HERO_REST_SELECTORS)

  loader.classList.add("k2-loader-exiting")
  document.documentElement.classList.remove("kore-ai-k2-loader-running")
  document.documentElement.classList.add("kore-ai-k2-handoff-running")

  if (flipTo) flipTo.style.visibility = "hidden"
  gsap.set(heroRest, { opacity: 0 })

  if (heroBgRoot) {
    gsap.set(heroBgRoot, { opacity: 0, scale: 1.14, transformOrigin: "50% 38%", force3D: true })
  }

  await new Promise<void>((resolve) => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        document.documentElement.classList.remove("kore-ai-k2-handoff-running")
        finish()
        resolve()
      },
    })

    if (grain) {
      tl.to(grain, { opacity: 0, duration: 0.4, ease: "power2.out" }, 0)
    }
    if (bar) {
      tl.to(bar, { opacity: 0, y: 12, duration: 0.45, ease: "power2.out" }, 0)
    }

    if (bg) {
      gsap.set(bg, {
        scale: 1.16,
        rotateX: 5,
        y: "-1.5%",
        transformOrigin: "50% 38%",
        force3D: true,
      })
      tl.to(
        bg,
        {
          scale: 1,
          rotateX: 0,
          y: "0%",
          duration: 1.25,
          ease: "power3.inOut",
        },
        0,
      )
    }

    if (bgOverlay) {
      tl.to(bgOverlay, { opacity: 0.88, duration: 0.55, ease: "power2.out" }, 0.4)
    }

    if (heroBgRoot) {
      tl.to(
        heroBgRoot,
        { opacity: 1, scale: 1, duration: 1.25, ease: "power3.inOut" },
        0.1,
      )
    }

    tl.call(() => revealHeroContent(), [], 0.72)

    let flipClone: HTMLElement | null = null

    if (flipFrom && flipTo) {
      flipFrom.style.visibility = "hidden"

      const fromRect = flipFrom.getBoundingClientRect()
      const toRect = flipTo.getBoundingClientRect()
      const dx = fromRect.left - toRect.left
      const dy = fromRect.top - toRect.top
      const scale = fromRect.width / Math.max(toRect.width, 1)

      flipClone = flipTo.cloneNode(true) as HTMLElement
      flipClone.setAttribute("aria-hidden", "true")
      flipClone.classList.add("k2-loader-flip-clone")
      Object.assign(flipClone.style, {
        position: "fixed",
        left: `${toRect.left}px`,
        top: `${toRect.top}px`,
        width: `${toRect.width}px`,
        margin: "0",
        zIndex: "2147483002",
        pointerEvents: "none",
        transformOrigin: "top left",
        visibility: "visible",
      })
      document.body.appendChild(flipClone)

      gsap.set(flipClone, {
        x: dx,
        y: dy + 48,
        scale: scale * 0.88,
        opacity: 0.65,
        force3D: true,
      })

      tl.to(
        flipClone,
        {
          x: dx,
          y: dy - 6,
          scale: scale * 1.03,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        0.22,
      )

      tl.to(
        flipClone,
        { x: 0, y: 0, scale: 1, duration: 0.95, ease: "power3.inOut" },
        0.88,
      )

      tl.call(
        () => {
          flipClone?.remove()
          flipClone = null
          revealHeroContent()
          syncHeroFlipMetrics(loader)
        },
        [],
        1.86,
      )
    }

    if (ui) {
      tl.to(ui, { opacity: 0, duration: 0.4, ease: "power2.in" }, 1.55)
    }

    tl.to(loader, { autoAlpha: 0, duration: 0.45, ease: "power2.inOut" }, 1.5)

    tl.to(
      heroRest,
      {
        opacity: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power2.out",
      },
      0.78,
    )

    tl.call(
      () => {
        gsap.set(heroRest, { clearProps: "opacity,transform,visibility" })
        if (flipTo) gsap.set(flipTo, { clearProps: "opacity,transform,visibility" })
        if (heroBgRoot) gsap.set(heroBgRoot, { clearProps: "opacity,transform,visibility" })
        revealHeroContent()
      },
      [],
      1.95,
    )
  })
}

export async function k2FlipFallback(name: string): Promise<void> {
  const key = CSS.escape(name)
  const fromEl = document.querySelector<HTMLElement>(`[data-flip="${key}"]`)
  const toEl = document.querySelector<HTMLElement>(`[data-flip-target="${key}"]`)
  if (!fromEl || !toEl) return

  const from = fromEl.getBoundingClientRect()
  const to = toEl.getBoundingClientRect()
  const dx = from.left - to.left
  const dy = from.top - to.top
  const scale = from.width / to.width

  const clone = toEl.cloneNode(true) as HTMLElement
  clone.setAttribute("aria-hidden", "true")
  Object.assign(clone.style, {
    position: "fixed",
    left: `${to.left}px`,
    top: `${to.top}px`,
    width: `${to.width}px`,
    margin: "0",
    zIndex: "9999",
    pointerEvents: "none",
    transformOrigin: "top left",
  })
  document.body.appendChild(clone)
  fromEl.style.visibility = "hidden"
  toEl.style.visibility = "hidden"

  const anim = clone.animate(
    [
      { transform: `translate3d(${dx}px,${dy}px,0) scale(${scale})` },
      { transform: "translate3d(0,0,0) scale(1)" },
    ],
    { duration: 1500, easing: "cubic-bezier(.16,1,.3,1)", fill: "forwards" },
  )

  await anim.finished
  toEl.style.visibility = "visible"
  clone.remove()
}

export { HERO_REST_SELECTORS } from "./heroHandoffSelectors"
