const scrambles = new WeakMap<HTMLElement, number>()

/** Kore tab-label scramble — mirrors k2Scramble() in the reference interaction script. */
export function k2Scramble(el: HTMLElement): void {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const skip = " {}"
  const duration = 450
  const final = el.dataset.scrambleText || el.textContent?.trim() || ""
  const letters = [...final]

  el.dataset.scrambleText = final

  const prev = scrambles.get(el)
  if (prev) cancelAnimationFrame(prev)

  const start = performance.now()

  const tick = (time: number) => {
    const progress = Math.min((time - start) / duration, 1)
    const done = Math.floor(progress * letters.length)

    el.textContent = letters
      .map((char, index) => {
        if (skip.includes(char)) return char
        return index < done ? char : chars[Math.floor(Math.random() * chars.length)]
      })
      .join("")

    if (progress < 1) {
      scrambles.set(el, requestAnimationFrame(tick))
    } else {
      el.textContent = final
      scrambles.delete(el)
    }
  }

  scrambles.set(el, requestAnimationFrame(tick))
}

export function scrambleTabLabel(tab: HTMLElement): void {
  const el = tab.querySelector<HTMLElement>("[data-scramble]")
  if (el) k2Scramble(el)
}
