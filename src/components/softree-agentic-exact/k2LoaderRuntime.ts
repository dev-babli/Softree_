import { runCinematicHandoff } from "./k2CinematicHandoff"
import { finalizeHeroReveal } from "./heroHandoffSelectors"

const LOADER_KEY = "k2LoaderPlayedAt"
const HOUR_MS = 60 * 60 * 1000

export function shouldForceK2LoaderReplay(): boolean {
  if (typeof window === "undefined") return false
  return new URLSearchParams(window.location.search).has("replay-loader")
}

export function shouldSkipK2Loader(): boolean {
  if (shouldForceK2LoaderReplay()) return false
  try {
    const last = Number(localStorage.getItem(LOADER_KEY)) || 0
    return Date.now() - last < HOUR_MS
  } catch {
    return false
  }
}

export function markK2LoaderPlayed(): void {
  try {
    localStorage.setItem(LOADER_KEY, String(Date.now()))
  } catch {
    // ignore
  }
}

export function runK2Loader(onDone: () => void = () => {}): () => void {
  const loader = document.querySelector<HTMLElement>(".k2-loader")

  if (!loader) {
    onDone()
    return () => {}
  }

  if (shouldSkipK2Loader()) {
    loader.remove()
    finalizeHeroReveal()
    onDone()
    window.dispatchEvent(new CustomEvent("softree-agentic-intro-complete"))
    return () => {}
  }

  markK2LoaderPlayed()

  if ("scrollRestoration" in history) history.scrollRestoration = "manual"

  const lenis = (window as Window & { lenis?: { stop?: () => void; start?: () => void } }).lenis
  lenis?.stop?.()

  document.documentElement.classList.add("softree-agentic-k2-loader-running")
  loader.style.display = "flex"

  const sup = loader.querySelector<HTMLElement>("sup")

  const setWidth = () => {
    if (!sup) return
    const target = (sup.firstElementChild as HTMLElement | null) || sup
    const width = Math.ceil(target.getBoundingClientRect().width)
    sup.style.setProperty("--w", `${width}px`)
  }

  let cancelled = false
  let hardStop = 0
  let dismissScroll: (() => void) | null = null

  const finish = (loaderEl: HTMLElement | null = loader) => {
    if (cancelled) return
    cancelled = true
    if (hardStop) window.clearTimeout(hardStop)
    dismissScroll?.()
    dismissScroll = null
    window.removeEventListener("resize", setWidth)
    loader.remove()
    lenis?.start?.()
    document.documentElement.classList.remove("softree-agentic-k2-loader-running")
    document.documentElement.classList.remove("softree-agentic-k2-handoff-running")
    finalizeHeroReveal(loaderEl)
    window.dispatchEvent(new CustomEvent("softree-agentic-intro-complete"))
    onDone()
  }

  const done = () => {
    void runCinematicHandoff(loader, () => finish(loader))
  }

  let step = 0
  const firstOverlap = 500
  const stepFallbackMs = [1500, 2000, 2200, 300]

  const runStep = () => {
    if (cancelled) return

    if (step > 0) {
      loader.classList.add(`step-${step}`)
    }

    if (step === 3) {
      loader.style.pointerEvents = "none"
      requestAnimationFrame(() => {
        requestAnimationFrame(done)
      })
      return
    }

    requestAnimationFrame(() => {
      const prev = new Set(loader.getAnimations({ subtree: true }))
      const animations = loader
        .getAnimations({ subtree: true })
        .filter((anim) => !prev.has(anim))

      const advance = () => {
        step++
        runStep()
      }

      if (!animations.length) {
        window.setTimeout(advance, stepFallbackMs[step] ?? 800)
        return
      }

      const end = Math.max(...animations.map((anim) => anim.effect?.getComputedTiming().endTime ?? 0))
      const overlap = step === 0 ? firstOverlap : 0

      window.setTimeout(advance, Math.max(stepFallbackMs[step] ?? 800, end - overlap))
    })
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) {
    finish()
    return () => {
      cancelled = true
    }
  }

  const start = () => {
    window.scrollTo(0, 0)
    setWidth()
    window.addEventListener("resize", setWidth)

    const onUserNavigate = () => {
      if (cancelled) return
      if (window.scrollY > 48) finish()
    }

    window.addEventListener("scroll", onUserNavigate, { passive: true })
    window.addEventListener("wheel", onUserNavigate, { passive: true })
    dismissScroll = () => {
      window.removeEventListener("scroll", onUserNavigate)
      window.removeEventListener("wheel", onUserNavigate)
    }

    if (!loader.classList.contains("step-0")) loader.classList.add("step-0")
    requestAnimationFrame(() => runStep())
  }

  requestAnimationFrame(start)

  hardStop = window.setTimeout(finish, 12000)

  return () => {
    cancelled = true
    dismissScroll?.()
    window.clearTimeout(hardStop)
    window.removeEventListener("resize", setWidth)
  }
}
