"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState } from "react"
import { DASHBOARD_TOKENS } from "../tokens"

const FEED_ITEMS = [
  { agent: "Research Agent", action: "Completed market analysis", status: "success" as const, time: "2s ago" },
  { agent: "Support Agent", action: "Resolved ticket #4821", status: "success" as const, time: "5s ago" },
  { agent: "Sales Agent", action: "Generating proposal draft", status: "running" as const, time: "8s ago" },
  { agent: "Analytics Agent", action: "Running forecast model", status: "running" as const, time: "12s ago" },
  { agent: "Finance Agent", action: "Reconciled batch #891", status: "success" as const, time: "18s ago" },
]

export function LiveFeed() {
  const listRef = useRef<HTMLUListElement>(null)
  const [items, setItems] = useState(FEED_ITEMS)

  useGSAP(
    () => {
      const interval = setInterval(() => {
        setItems((prev) => {
          const next = [...prev]
          const first = next.shift()
          if (first) next.push({ ...first, time: "just now" })
          return next
        })
        if (listRef.current?.firstElementChild) {
          gsap.fromTo(
            listRef.current.firstElementChild,
            { opacity: 0, y: -6 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          )
        }
      }, 4000)
      return () => clearInterval(interval)
    },
    { scope: listRef },
  )

  return (
    <div
      className="rounded-2xl border bg-white p-3"
      style={{
        borderColor: DASHBOARD_TOKENS.border,
        boxShadow: DASHBOARD_TOKENS.widgetShadow,
      }}
    >
      <div className="flex items-center justify-between">
        <p
          className="text-[9px] font-bold uppercase tracking-[0.14em]"
          style={{ color: DASHBOARD_TOKENS.textLight }}
        >
          Live Execution Feed
        </p>
        <span
          className="flex items-center gap-1 text-[8px] font-semibold uppercase"
          style={{ color: DASHBOARD_TOKENS.liveGreen }}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
          Live
        </span>
      </div>
      <ul ref={listRef} className="mt-2.5 space-y-2">
        {items.map((item) => (
          <li
            key={`${item.agent}-${item.time}`}
            className="flex items-start gap-2 rounded-lg px-1 py-0.5 transition-colors hover:bg-slate-50/80"
          >
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                item.status === "running" ? "animate-pulse" : ""
              }`}
              style={{
                background:
                  item.status === "success" ? DASHBOARD_TOKENS.liveGreen : DASHBOARD_TOKENS.primary,
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-semibold" style={{ color: DASHBOARD_TOKENS.navy }}>
                {item.agent}
              </p>
              <p className="truncate text-[9px]" style={{ color: DASHBOARD_TOKENS.textLight }}>
                {item.action}
              </p>
            </div>
            <span className="shrink-0 text-[8px] tabular-nums" style={{ color: DASHBOARD_TOKENS.textLight }}>
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
