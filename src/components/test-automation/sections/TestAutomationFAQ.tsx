type FAQItem = {
  id: number
  serial: string
  question: string
  answer: string
}

export function TestAutomationFAQ({ faqs }: { faqs: FAQItem[] }) {
  return (
    <section className="w-full bg-[#f8f4ec] py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-12">
        <div className="mb-10 max-w-3xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            QA automation questions
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a0a1a] md:text-5xl">
            Clear answers before a test suite becomes another system to maintain
          </h2>
        </div>
        <div className="divide-y divide-[#0a0a1a]/10 rounded-[28px] border border-[#0a0a1a]/10 bg-white">
          {faqs.map((faq) => (
            <details key={faq.id} className="group p-5 open:bg-[#fffaf6] md:p-7">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]/50 focus-visible:ring-offset-2">
                <span>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF5812]">
                    {faq.serial}
                  </span>
                  <span className="mt-2 block text-lg font-semibold leading-snug text-[#0a0a1a]">
                    {faq.question}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0a0a1a]/10 text-[#0a0a1a]/50 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#0a0a1a]/65 md:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
