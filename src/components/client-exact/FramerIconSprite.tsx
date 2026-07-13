"use client"

import { FRAMER_ICON_SPRITE_HTML } from "./iconSpriteHtml"

/**
 * Framer icon defs referenced by <use href="#id" />.
 * Must be plain DOM nodes with those ids — not nested inside another <svg>.
 */
export function FramerIconSprite() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
      dangerouslySetInnerHTML={{ __html: FRAMER_ICON_SPRITE_HTML }}
    />
  )
}
