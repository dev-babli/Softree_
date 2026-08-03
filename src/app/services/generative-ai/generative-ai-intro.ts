const SESSION_KEY = "softree-generative-ai-intro-v1"

export function shouldSkipGenerativeAiIntro(): boolean {
  if (typeof window === "undefined") return true

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true

  try {
    if (sessionStorage.getItem(SESSION_KEY) === "1") return true
  } catch {
    return true
  }

  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection
  if (conn?.saveData) return true
  if (conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g") return true

  if (window.location.hash.length > 1) return true

  return false
}

export function markGenerativeAiIntroPlayed() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1")
  } catch {
    /* private browsing */
  }
}

export function setGenerativeAiReady() {
  document.documentElement.classList.add("generative-ai-ready")
  document.documentElement.classList.remove("generative-ai-loading")
  window.dispatchEvent(new CustomEvent("generative-ai:ready"))
}

export const GENERATIVE_AI_INTRO_MS = 1180
