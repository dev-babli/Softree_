export function TestAutomationContact() {
  return (
    <section id="contact" className="w-full bg-[#0a0a1a] py-16 text-white md:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-12">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            Start with the brittle path
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Show us the release flow that keeps slipping through QA.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65">
            We will map the risk, choose the right automation surfaces, and shape a pipeline that fits
            your stack before writing fragile scripts at scale.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href="/book-meeting"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#FF5812] px-6 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-[#0a0a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a1a]"
          >
            Map a QA pipeline
          </a>
          <a
            href="mailto:sales@softreetechnology.com?subject=AI-powered%20test%20automation"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-[#FF5812] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a1a]"
          >
            Email test context
          </a>
        </div>
      </div>
    </section>
  )
}
