import { qualityPipeline } from "../data"

const READINESS = [
  { label: "Critical journeys", value: "Map" },
  { label: "Automation suites", value: "Build" },
  { label: "Pipeline gates", value: "Wire" },
  { label: "Release signal", value: "Review" },
] as const

/** Process-first scrollytelling chapter. CSS sticky only, no ScrollTrigger pin. */
export function TestAutomationPipeline() {
  return (
    <section id="pipeline" className="w-full bg-[#f8f4ec] py-16 md:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className="h-fit lg:sticky lg:top-32">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            Quality pipeline
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#0a0a1a] md:text-4xl lg:text-5xl">
            From release risk to repeatable confidence
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#0a0a1a]/65 md:text-lg">
            The strongest automation strategy is a delivery system: risk mapping, resilient suites,
            intelligent signals, and pipeline feedback.
          </p>
          <div className="mt-8 h-0.5 w-28 bg-gradient-to-r from-[#FF5812] to-[#ff7a3d]" aria-hidden />
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0a0a1a]/10 bg-white shadow-[0_24px_80px_-48px_rgba(10,10,26,0.45)]">
            <div className="flex items-center justify-between border-b border-[#0a0a1a]/08 px-4 py-3">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/45">
                Readiness model
              </p>
              <span className="rounded-full bg-[#FF5812]/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#FF5812]">
                Example gate
              </span>
            </div>
            <div className="grid gap-px bg-[#0a0a1a]/08">
              {READINESS.map((item, index) => (
                <div key={item.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 bg-white px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0a0a1a]">{item.label}</p>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#0a0a1a]/08">
                      <span
                        className="block h-full origin-left rounded-full bg-[#FF5812]"
                        style={{ transform: `scaleX(${0.58 + index * 0.12})` }}
                      />
                    </div>
                  </div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0a0a1a]/50">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="absolute bottom-0 left-5 top-0 hidden w-px bg-[#0a0a1a]/10 sm:block" aria-hidden />
          <ol className="space-y-0">
            {qualityPipeline.map((item) => (
              <li key={item.step} className="group relative flex gap-5 sm:gap-8">
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#0a0a1a]/10 bg-white text-xs font-semibold text-[#0a0a1a] shadow-sm transition-colors group-hover:border-[#FF5812]/30 group-hover:text-[#FF5812]">
                  {item.step}
                </div>
                <div className="min-w-0 flex-1 border-b border-[#0a0a1a]/10 pb-10 last:border-none">
                  <h3 className="text-xl font-semibold text-[#0a0a1a]">{item.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#0a0a1a]/65 md:text-base">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
