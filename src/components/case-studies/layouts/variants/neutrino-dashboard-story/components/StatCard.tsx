"use client"

import { DASHBOARD_TOKENS } from "../tokens"

type Props = {
  label: string
  value: string
  change: string
  changePositive?: boolean
  sparklinePath?: string
  sparkColor?: string
}

const DEFAULT_PATHS = [
  "M0,18 Q8,16 16,14 T32,11 T48,8 T64,6 T80,4",
  "M0,16 Q10,14 20,12 T40,10 T60,7 T80,5",
  "M0,20 Q12,18 24,15 T48,12 T72,8 T80,6",
  "M0,14 Q8,12 16,10 T32,8 T48,6 T64,5 T80,3",
]

export function StatCard({
  label,
  value,
  change,
  changePositive = true,
  sparklinePath,
  sparkColor,
}: Props) {
  const color = sparkColor || (changePositive ? DASHBOARD_TOKENS.liveGreen : DASHBOARD_TOKENS.warningRed)
  const path = sparklinePath || DEFAULT_PATHS[Math.abs(label.length) % DEFAULT_PATHS.length]

  return (
    <div
      className="rounded-2xl border bg-white p-3 transition-[box-shadow,border-color] duration-200 hover:border-[rgba(99,102,241,0.25)]"
      style={{
        borderColor: DASHBOARD_TOKENS.border,
        boxShadow: DASHBOARD_TOKENS.widgetShadow,
      }}
    >
      <p
        className="text-[9px] font-semibold uppercase tracking-[0.12em]"
        style={{ color: DASHBOARD_TOKENS.textLight }}
      >
        {label}
      </p>
      <div className="mt-1.5 flex items-end justify-between gap-1">
        <p
          className="text-xl font-bold tracking-tight tabular-nums"
          style={{ color: DASHBOARD_TOKENS.navy, fontVariantNumeric: "tabular-nums" }}
        >
          {value}
        </p>
        <span
          className="flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[9px] font-bold"
          style={{
            color,
            background: changePositive ? DASHBOARD_TOKENS.liveGreenMuted : DASHBOARD_TOKENS.warningRedMuted,
          }}
        >
          {changePositive ? "↑" : "↓"} {change.replace(/^[+-]/, "")}
        </span>
      </div>
      <svg viewBox="0 0 80 22" className="mt-2 h-5 w-full" aria-hidden preserveAspectRatio="none">
        <defs>
          <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L80,22 L0,22 Z`} fill={`url(#spark-${label})`} />
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
