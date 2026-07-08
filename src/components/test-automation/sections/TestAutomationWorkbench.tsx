import { engagementModels, supportedSolutions, techGroups } from "../data"

export function TestAutomationWorkbench() {
  return (
    <section id="workbench" className="w-full bg-white py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
              QA workbench
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a0a1a] md:text-4xl lg:text-5xl">
              One operating model for surfaces, tools, and delivery
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-[#0a0a1a]/65 md:text-lg">
            The automation plan is assembled as a workbench: choose the product surfaces, match the
            toolchain, then select the engagement model that fits the release cadence.
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#0a0a1a]/10 bg-[#f8f4ec]">
          <div className="grid border-b border-[#0a0a1a]/10 bg-white lg:grid-cols-[1.05fr_1.2fr_0.95fr]">
            <div className="border-b border-[#0a0a1a]/10 p-5 lg:border-b-0 lg:border-r">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF5812]">
                Surfaces
              </p>
              <p className="mt-2 text-sm text-[#0a0a1a]/60">Where automation must hold.</p>
            </div>
            <div className="border-b border-[#0a0a1a]/10 p-5 lg:border-b-0 lg:border-r">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF5812]">
                Toolchain
              </p>
              <p className="mt-2 text-sm text-[#0a0a1a]/60">What runs each quality signal.</p>
            </div>
            <div className="p-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF5812]">
                Engagement
              </p>
              <p className="mt-2 text-sm text-[#0a0a1a]/60">How Softree plugs into delivery.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_1.2fr_0.95fr]">
            <div className="border-b border-[#0a0a1a]/10 bg-white/55 p-5 lg:border-b-0 lg:border-r">
              <ul className="space-y-3">
                {supportedSolutions.map((item) => (
                  <li key={item.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FF5812]" aria-hidden />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0a0a1a]">{item.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#0a0a1a]/55">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-b border-[#0a0a1a]/10 p-5 lg:border-b-0 lg:border-r">
              <div className="grid gap-3 sm:grid-cols-2">
                {techGroups.map((group) => (
                  <div key={group.label} className="min-w-0 rounded-2xl border border-[#0a0a1a]/08 bg-white p-4">
                    <p className="text-sm font-semibold text-[#0a0a1a]">{group.label}</p>
                    <p className="mt-1 text-xs text-[#0a0a1a]/50">{group.subtitle}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {group.tools.map((tool) => (
                        <li key={tool} className="rounded-full bg-[#FF5812]/8 px-2.5 py-1 text-xs font-medium text-[#0a0a1a]/70">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-5">
              <ol className="space-y-4">
                {engagementModels.map((model) => (
                  <li key={model.step} className="border-b border-[#0a0a1a]/08 pb-4 last:border-none last:pb-0">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FF5812]">
                      {model.step} · {model.tag}
                    </span>
                    <h3 className="mt-2 text-base font-semibold text-[#0a0a1a]">{model.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#0a0a1a]/60">{model.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
