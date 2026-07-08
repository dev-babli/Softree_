import gsap from "gsap"

import { EASE, prefersReducedMotion } from "@/lib/motion"

const CONTAINER = '[data-barba="container"]'
const CURTAIN = ".barba-transition-curtain"

export type TransitionOptions = {
  onCovered?: () => void
}

function getContainer(): HTMLElement | null {
  return document.querySelector<HTMLElement>(CONTAINER)
}

function getCurtain(): HTMLElement | null {
  return document.querySelector<HTMLElement>(CURTAIN)
}

async function refreshScrollTriggers() {
  try {
    const { ScrollTrigger } = await import("gsap/ScrollTrigger")
    requestAnimationFrame(() => ScrollTrigger.refresh(true))
  } catch {
    /* ScrollTrigger not loaded */
  }
}

async function killPageScrollTriggers() {
  try {
    const { ScrollTrigger } = await import("gsap/ScrollTrigger")
    const container = getContainer()
    ScrollTrigger.getAll().forEach((trigger) => {
      const el = trigger.trigger as Element | undefined
      if (!container || (el && container.contains(el))) trigger.kill()
    })
  } catch {
    /* ScrollTrigger not loaded */
  }
}

function killAll() {
  const curtain = getCurtain()
  const container = getContainer()
  if (!curtain) return
  gsap.killTweensOf([curtain, container])
}

function resetCurtain() {
  const curtain = getCurtain()
  if (!curtain) return
  gsap.set(curtain, { yPercent: 100 })
}

function finishTransition(container: HTMLElement) {
  resetCurtain()
  gsap.set(container, { clearProps: "transform,opacity" })
  document.documentElement.classList.remove("barba-is-transitioning")
  void refreshScrollTriggers()
  window.dispatchEvent(new CustomEvent("barba:enter-complete"))
}

/** Leave — cream curtain rises, page dips. ~0.42s */
export async function cinematicLeave(options: TransitionOptions = {}): Promise<void> {
  const container = getContainer()
  const curtain = getCurtain()
  if (!container || !curtain || prefersReducedMotion()) {
    options.onCovered?.()
    return
  }

  await killPageScrollTriggers()
  killAll()
  resetCurtain()
  document.documentElement.classList.add("barba-is-transitioning")

  let covered = false
  const fireCovered = () => {
    if (covered) return
    covered = true
    options.onCovered?.()
  }

  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: resolve })

    tl.to(
      container,
      { opacity: 0, scale: 0.992, duration: 0.32, ease: EASE.implode },
      0,
    )

    tl.to(
      curtain,
      { yPercent: 0, duration: 0.42, ease: "power3.inOut" },
      0.04,
    )

    tl.call(fireCovered, [], 0.28)
  })
}

/** Enter — curtain lifts off, page returns. ~0.48s */
export function cinematicEnter(): Promise<void> {
  const container = getContainer()
  const curtain = getCurtain()
  if (!container || !curtain || prefersReducedMotion()) {
    document.documentElement.classList.remove("barba-is-transitioning")
    void refreshScrollTriggers()
    return Promise.resolve()
  }

  gsap.set(container, { opacity: 0, scale: 1.008 })

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        finishTransition(container)
        resolve()
      },
    })

    tl.to(
      curtain,
      { yPercent: -100, duration: 0.48, ease: "power3.inOut" },
      0,
    )

    tl.to(
      container,
      { opacity: 1, scale: 1, duration: 0.42, ease: EASE.silk },
      0.12,
    )
  })
}

/** No first-visit intro — page loads instantly. */
export function cinematicOnce(): Promise<void> {
  return Promise.resolve()
}

export const CINEMATIC_HOLD_MS = 0
