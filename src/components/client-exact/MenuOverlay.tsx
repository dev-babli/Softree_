"use client"

import { useEffect } from "react"
import { MenuPanel } from "./sections/MenuPanel"

/**
 * Fullscreen menu: blur overlay + exact Hanza two-column panel.
 */
export function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  // Close when clicking in-panel hash links
  useEffect(() => {
    if (!open) return
    const panel = document.querySelector(".cx-menu-panel")
    if (!panel) return
    const onClick = (e: Event) => {
      const a = (e.target as HTMLElement).closest("a")
      if (!a) return
      const href = a.getAttribute("href") || ""
      if (href.startsWith("#")) onClose()
    }
    panel.addEventListener("click", onClick)
    return () => panel.removeEventListener("click", onClick)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <div
        className="framer-3L5GK framer-qlili8 cx-menu-backdrop"
        data-framer-name="Overlay"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="framer-3L5GK framer-11vsk7q" aria-hidden="true" />
      <MenuPanel onNavigate={onClose} />
    </>
  )
}
