import { whyItems } from "../data"
import { TestAutomationSection } from "../primitives/TestAutomationSection"

export function TestAutomationWhy() {
  return (
    <TestAutomationSection
      id="why"
      variant="cream"
      badge="Why Softree"
      headline="A QA automation partner built for enterprise delivery"
      body="Softree combines automation engineering, AI-assisted QA strategy, and DevOps delivery patterns in one team."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {whyItems.map((item, index) => (
          <div
            key={item.title}
            className="min-w-0 rounded-2xl border border-[#0a0a1a]/08 bg-white p-6"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF5812]/10 text-sm font-bold text-[#FF5812]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="text-base font-semibold text-[#0a0a1a]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#0a0a1a]/65">{item.body}</p>
          </div>
        ))}
      </div>
    </TestAutomationSection>
  )
}
