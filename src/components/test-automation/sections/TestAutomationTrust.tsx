import Image from "next/image"

export function TestAutomationTrust() {
  return (
    <section className="w-full border-y border-[#0a0a1a]/08 bg-[#f8f4ec] py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
              Integration contexts
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#0a0a1a] md:text-3xl">
              Quality work has to fit real enterprise environments
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#0a0a1a]/60">
            Existing client and partner environments shown as context, without invented metrics or animated clutter.
          </p>
        </div>
        <a
          href="https://www.softreetechnology.com/case-studies/sharepoint-spfx-automation-testing-quality-assurance"
          className="mb-6 grid gap-5 overflow-hidden rounded-2xl border border-[#FF5812]/25 bg-white p-5 transition-colors hover:border-[#FF5812]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/50 focus-visible:ring-offset-2 md:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] md:items-center"
        >
          <Image
            src="/images/case-study/sharepoint/sp.png"
            alt="SharePoint SPFx automation testing case study interface"
            width={640}
            height={420}
            className="h-auto w-full rounded-xl border border-[#0a0a1a]/08 object-cover"
          />
          <span className="block">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF5812]">
              QA case artifact
            </span>
            <span className="mt-2 block text-lg font-semibold text-[#0a0a1a]">
              SharePoint SPFx Automation Testing & QA
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-[#0a0a1a]/60">
              Published case-study path for a Jest, Playwright, and CI/CD validation framework.
            </span>
          </span>
        </a>

        <div className="grid gap-3 md:grid-cols-3">
          {["Risk map", "Automation architecture", "CI/CD quality gate"].map((item, index) => (
            <div key={item} className="rounded-2xl border border-[#0a0a1a]/08 bg-white p-5">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FF5812]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm font-semibold text-[#0a0a1a]">{item}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#0a0a1a]/55">
                A concrete artifact the team can review before automation work scales.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
