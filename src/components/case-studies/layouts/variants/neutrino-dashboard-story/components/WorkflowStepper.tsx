"use client"

import { Check } from "lucide-react"
import { DASHBOARD_TOKENS } from "../tokens"

const STEPS = [
  { id: "intake", label: "Intake", status: "done" as const },
  { id: "understanding", label: "Understanding", status: "done" as const },
  { id: "processing", label: "Processing", status: "active" as const },
  { id: "response", label: "Response", status: "pending" as const },
  { id: "complete", label: "Complete", status: "pending" as const },
]

export function WorkflowStepper() {
  return (
    <div
      className="rounded-2xl border bg-white p-3"
      style={{
        borderColor: DASHBOARD_TOKENS.border,
        boxShadow: DASHBOARD_TOKENS.widgetShadow,
      }}
    >
      <p
        className="text-[9px] font-bold uppercase tracking-[0.14em]"
        style={{ color: DASHBOARD_TOKENS.textLight }}
      >
        Workflow Execution
      </p>
      <ol className="relative mt-3 space-y-0">
        {STEPS.map((step, i) => (
          <li key={step.id} className="relative flex items-center gap-2.5 py-1.5">
            {i < STEPS.length - 1 && (
              <span
                className="absolute left-[9px] top-[22px] h-[calc(100%-4px)] w-px"
                style={{
                  background:
                    step.status === "done" ? DASHBOARD_TOKENS.liveGreen : DASHBOARD_TOKENS.border,
                }}
              />
            )}
            <div
              className="relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[8px] font-bold"
              style={
                step.status === "done"
                  ? { background: DASHBOARD_TOKENS.liveGreen, color: "#fff" }
                  : step.status === "active"
                    ? {
                        background: DASHBOARD_TOKENS.primary,
                        color: "#fff",
                        boxShadow: `0 0 0 3px ${DASHBOARD_TOKENS.primaryMuted}`,
                      }
                    : {
                        border: `1.5px solid ${DASHBOARD_TOKENS.borderStrong}`,
                        color: DASHBOARD_TOKENS.textLight,
                        background: DASHBOARD_TOKENS.white,
                      }
              }
            >
              {step.status === "done" ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : i + 1}
            </div>
            <span
              className="text-[10px] font-medium"
              style={{
                color: step.status === "pending" ? DASHBOARD_TOKENS.textLight : DASHBOARD_TOKENS.navy,
              }}
            >
              {step.label}
            </span>
            {step.status === "active" && (
              <span
                className="ml-auto animate-pulse text-[8px] font-bold uppercase tracking-wider"
                style={{ color: DASHBOARD_TOKENS.primary }}
              >
                Active
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
