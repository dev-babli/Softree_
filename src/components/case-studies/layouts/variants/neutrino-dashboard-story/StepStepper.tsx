"use client"

import { DASHBOARD_TOKENS, STEPPER_STEPS } from "./tokens"

type Props = {
  activeStep: number
  onSelect: (index: number) => void
}

function StepGraphic({ stepIndex, isActive }: { stepIndex: number; isActive: boolean }) {
  const purple = isActive ? DASHBOARD_TOKENS.primary : DASHBOARD_TOKENS.textLight
  const blue = DASHBOARD_TOKENS.architectureBlue
  const red = DASHBOARD_TOKENS.warningRed

  if (stepIndex === 0) {
    return (
      <svg width={56} height={40} viewBox="0 0 56 40" aria-hidden className="mx-auto">
        <defs>
          <linearGradient id="cube-red" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={red} stopOpacity="0.9" />
            <stop offset="100%" stopColor={red} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {[
          [12, 22, 10], [24, 14, 12], [36, 22, 10], [24, 28, 8],
        ].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <polygon points={`0,${s} ${s / 2},${s * 0.7} ${s},${s} ${s / 2},${s * 1.3}`} fill="url(#cube-red)" opacity={0.5 + i * 0.15} />
            <polygon points={`0,0 ${s / 2},${s * 0.3} ${s},0 ${s / 2},${-s * 0.3}`} fill={red} opacity={0.7 + i * 0.08} transform={`translate(0,${s * 0.7})`} />
          </g>
        ))}
      </svg>
    )
  }

  if (stepIndex === 1) {
    return (
      <svg width={56} height={40} viewBox="0 0 56 40" aria-hidden className="mx-auto">
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={10} y={8 + i * 8} width={36} height={6} rx={2} fill={blue} opacity={0.35 + i * 0.15} />
            <rect x={14} y={10 + i * 8} width={8} height={2} rx={1} fill="#fff" opacity={0.5} />
          </g>
        ))}
      </svg>
    )
  }

  if (stepIndex === 2) {
    return (
      <svg width={56} height={40} viewBox="0 0 56 40" aria-hidden className="mx-auto">
        <circle cx={28} cy={20} r={8} fill={purple} opacity={isActive ? 1 : 0.5} />
        <circle cx={28} cy={20} r={4} fill="#fff" opacity={0.9} />
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
          const x = 28 + Math.cos(angle) * 16
          const y = 20 + Math.sin(angle) * 14
          return (
            <g key={i}>
              <line x1={28} y1={20} x2={x} y2={y} stroke={purple} strokeWidth={1} opacity={0.4} />
              <circle cx={x} cy={y} r={3} fill={purple} opacity={0.6 + i * 0.06} />
            </g>
          )
        })}
      </svg>
    )
  }

  if (stepIndex === 3) {
    return (
      <svg width={56} height={40} viewBox="0 0 56 40" aria-hidden className="mx-auto">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={14 + col * 10}
              y={10 + row * 10}
              width={8}
              height={8}
              rx={1.5}
              fill={blue}
              opacity={0.4 + (row + col) * 0.12}
            />
          )),
        )}
      </svg>
    )
  }

  return (
    <svg width={56} height={40} viewBox="0 0 56 40" aria-hidden className="mx-auto">
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={12 + i * 9}
          y={28 - i * 4}
          width={7}
          height={8 + i * 5}
          rx={1.5}
          fill={blue}
          opacity={0.45 + i * 0.15}
        />
      ))}
    </svg>
  )
}

export function StepStepper({ activeStep, onSelect }: Props) {
  return (
    <div className="relative mt-5 px-1 pb-1">
      <div
        className="absolute left-[8%] right-[8%] top-[52px] h-px"
        style={{ background: DASHBOARD_TOKENS.border }}
        aria-hidden
      />
      <div className="relative grid grid-cols-5 gap-2">
        {STEPPER_STEPS.map((step) => {
          const isActive = activeStep === step.id
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelect(step.id)}
              className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white px-2.5 pb-3 pt-3 text-center transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] motion-reduce:transform-none"
              style={{
                borderColor: isActive ? DASHBOARD_TOKENS.primary : DASHBOARD_TOKENS.border,
                boxShadow: isActive
                  ? `0 0 0 1px ${DASHBOARD_TOKENS.primary}, 0 12px 32px ${DASHBOARD_TOKENS.primaryGlow}`
                  : DASHBOARD_TOKENS.widgetShadow,
                transitionTimingFunction: DASHBOARD_TOKENS.easeOut,
              }}
            >
              {isActive && (
                <span
                  className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                  style={{ background: DASHBOARD_TOKENS.primary }}
                  aria-hidden
                />
              )}
              {isActive && (
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5"
                  style={{ background: DASHBOARD_TOKENS.primary }}
                  aria-hidden
                />
              )}
              <div className="mb-2 flex h-10 items-center justify-center">
                <StepGraphic stepIndex={step.id} isActive={isActive} />
              </div>
              <span
                className="text-[9px] font-bold uppercase tracking-[0.16em]"
                style={{ color: isActive ? DASHBOARD_TOKENS.primary : DASHBOARD_TOKENS.textLight }}
              >
                {step.number}
              </span>
              <span
                className="mt-0.5 text-[11px] font-bold leading-tight"
                style={{ color: DASHBOARD_TOKENS.navy }}
              >
                {step.title}
              </span>
              <span
                className="mt-1 hidden text-[9px] leading-snug lg:block"
                style={{ color: DASHBOARD_TOKENS.textLight }}
              >
                {step.description}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
