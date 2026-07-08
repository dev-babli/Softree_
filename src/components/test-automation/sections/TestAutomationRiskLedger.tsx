const LEDGER = [
  {
    risk: "Fragile selectors",
    decision: "Contract-first locators",
    detail: "Build tests around stable product intent, not visual accident.",
  },
  {
    risk: "Slow regression runs",
    decision: "Risk-ranked suites",
    detail: "Split smoke, critical path, and full regression by release need.",
  },
  {
    risk: "Noisy failures",
    decision: "Signal review",
    detail: "Separate product defects, test debt, and environment instability.",
  },
] as const

export function TestAutomationRiskLedger() {
  return (
    <section className="w-full bg-[#0a0a1a] py-16 text-white md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
              Risk ledger
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              The test suite is designed from failure modes first.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/62">
              Before tools are selected, Softree turns release pain into explicit automation decisions.
            </p>
          </div>

          <div className="grid gap-3">
            {LEDGER.map((item, index) => (
              <article
                key={item.risk}
                className="grid gap-4 rounded-[28px] border border-white/12 bg-white/[0.06] p-5 md:grid-cols-[auto_1fr_auto] md:items-center md:p-6"
              >
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF5812]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="grid gap-2 md:grid-cols-[minmax(0,0.8fr)_auto_minmax(0,1fr)] md:items-center">
                  <p className="text-xl font-semibold tracking-tight text-white">{item.risk}</p>
                  <span className="hidden h-px w-12 bg-[#FF5812]/60 md:block" aria-hidden />
                  <p className="text-xl font-semibold tracking-tight text-[#FFB08A]">{item.decision}</p>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-white/55">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
