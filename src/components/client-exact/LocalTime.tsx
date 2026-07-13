"use client"

import { useEffect, useState } from "react"

const PLACEHOLDER = { h0: "0", h1: "0", m0: "0", m1: "0", ampm: "AM" }

/** Live local time digits matching Hanza top bar format (hh:mm AM/PM). */
export function LocalTime() {
  const [parts, setParts] = useState(PLACEHOLDER)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const tick = () => setParts(formatParts(new Date()))
    tick()
    setReady(true)
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      className="cx-local-time"
      suppressHydrationWarning
      style={{
        position: "relative",
        display: "inline-block",
        width: "max-content",
        minWidth: "max-content",
        color: "#141414",
        backgroundColor: "transparent",
        fontFamily: '"Zalando Sans", "Zalando Sans Placeholder", sans-serif',
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 500,
        letterSpacing: "-0.03em",
        lineHeight: "1em",
        visibility: ready ? "visible" : "hidden",
      }}
    >
      <span style={{ display: "inline-block", width: "0.6em", textAlign: "center" }}>{parts.h0}</span>
      <span style={{ display: "inline-block", width: "0.6em", textAlign: "center" }}>{parts.h1}</span>
      <span>:</span>
      <span style={{ display: "inline-block", width: "0.6em", textAlign: "center" }}>{parts.m0}</span>
      <span style={{ display: "inline-block", width: "0.6em", textAlign: "center" }}>{parts.m1}</span>
      <span> </span>
      <span style={{ display: "inline-block", width: "2em", textAlign: "left" }}>{parts.ampm}</span>
    </div>
  )
}

function formatParts(d: Date) {
  let h = d.getHours()
  const m = d.getMinutes()
  const ampm = h >= 12 ? "PM" : "AM"
  h = h % 12
  if (h === 0) h = 12
  const hh = String(h).padStart(2, "0")
  const mm = String(m).padStart(2, "0")
  return {
    h0: hh[0],
    h1: hh[1],
    m0: mm[0],
    m1: mm[1],
    ampm,
  }
}
