const navItems = ["Agentic AI Apps", "AI Solutions", "More"];

const platformPillars = [
  "Multi-Agent Orchestration",
  "Search and Data AI (Agent Context)",
  "No-code and Pro-code Tools",
  "AI Engineering Tools",
  "Observability",
  "AI Safety, Security, Compliance and Governance",
];

const enterpriseSources = [
  "Enterprise data sources",
  "Enterprise apps",
  "Unstructured data",
  "Enterprise integrations",
];

const industries = [
  "Banking",
  "Healthcare",
  "Retail",
  "Telecom and Media",
  "B2B Goods and Services",
];

const partners = ["Microsoft", "AWS", "Morgan Stanley", "Pfizer", "Mphasis", "AMD"];

const testimonials = [
  {
    quote:
      "What I was really trying to solve was how to give 15 to 20 minutes back each day to our financial advisors.",
    author: "Shailesh Gavankar",
    role: "Head, AI Strategy and Execution",
  },
  {
    quote:
      "Since we started with Kore.ai, we've deployed 60 AI agents across the enterprise and global markets.",
    author: "Vik Kapoor",
    role: "Head of GenAI Platforms and Products",
  },
  {
    quote:
      "Our strategic partnership marks a significant milestone in accelerating enterprise AI transformation.",
    author: "Puneet Chandok",
    role: "President, India and South Asia",
  },
];

const insights = [
  {
    date: "May 15, 2026",
    title: "Configured, not coded: the engineering discipline gap in agent development",
  },
  {
    date: "January 12, 2026",
    title: "Can today's AI agents survive their own runtime?",
  },
  {
    date: "January 3, 2026",
    title: "The AI productivity paradox: why employees move faster than enterprises",
  },
];

export function KoreAiComponent() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800/80">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 md:px-8">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-violet-500/20 px-2 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
              Kore.ai
            </span>
            <span className="text-sm text-zinc-400">Agent Platform</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            {navItems.map((item) => (
              <a key={item} href="#" className="transition hover:text-white">
                {item}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium hover:border-zinc-500 hover:text-white"
          >
            Get in touch
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl space-y-20 px-4 py-10 md:px-8 md:py-14">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
              Meet Artemis
            </span>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Agentic AI applications for the enterprise
            </h1>
            <p className="max-w-2xl text-base text-zinc-300 md:text-lg">
              Great experiences are built on a strong foundation. Build AI agents
              ready for customers and employees with a platform designed for
              trust, governance, and enterprise scale.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-lg bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
              >
                Start using Artemis today
              </button>
              <button
                type="button"
                className="rounded-lg border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500"
              >
                Talk to an expert
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
              Platform pillars
            </p>
            <ul className="mt-4 space-y-2">
              {platformPillars.map((pillar) => (
                <li
                  key={pillar}
                  className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200"
                >
                  {pillar}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {enterpriseSources.map((source) => (
            <article
              key={source}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
            >
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">
                {source}
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Connect your operational context to power trusted AI outcomes.
              </p>
            </article>
          ))}
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
              Industry use cases
            </p>
            <h2 className="text-3xl font-semibold">Use purpose-built agentic AI apps</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {industries.map((industry) => (
              <div
                key={industry}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-5 text-sm font-medium text-zinc-200"
              >
                {industry}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold">Strategic partners</h2>
            <a href="#" className="text-sm text-violet-300 hover:text-violet-200">
              Explore marketplace
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner}
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-6 text-center text-base font-medium"
              >
                {partner}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Customer stories</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote
                key={item.author}
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5"
              >
                <p className="text-sm leading-relaxed text-zinc-200">{item.quote}</p>
                <footer className="mt-4 border-t border-zinc-800 pt-4">
                  <p className="text-sm font-semibold text-white">{item.author}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">
                    {item.role}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold">AI insights</h2>
            <a href="#" className="text-sm text-violet-300 hover:text-violet-200">
              View all
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {insights.map((insight) => (
              <article
                key={insight.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                  {insight.date}
                </p>
                <h3 className="mt-3 text-base font-semibold text-zinc-100">
                  {insight.title}
                </h3>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
