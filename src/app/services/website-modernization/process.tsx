const STEPS = [
  {
    step: "01",
    title: "Discovery & blueprint",
    body: "AI audit plus stakeholder workshop — align on goals, personas, and conversion metrics.",
  },
  {
    step: "02",
    title: "UX & wireframes",
    body: "Low-fidelity layouts mapped to conversion architecture before visual design begins.",
  },
  {
    step: "03",
    title: "Design & build",
    body: "Next.js, Tailwind, Sanity CMS — component library, CI/CD, and accessibility baked in.",
  },
  {
    step: "04",
    title: "Launch & optimise",
    body: "301 redirect map, Core Web Vitals monitoring, and post-launch CRO iterations.",
  },
] as const

export default function ModernizationProcess() {
  return (
    <section
      aria-labelledby="wm-process-heading"
      className="bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            Our process
          </p>
          <h2
            id="wm-process-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl"
          >
            From blueprint to live site in four phases
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item) => (
            <li
              key={item.step}
              className="relative rounded-2xl border border-zinc-200 p-6"
            >
              <span className="font-mono text-sm font-bold text-[#FF5812]">{item.step}</span>
              <h3 className="mt-3 text-lg font-semibold text-zinc-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
