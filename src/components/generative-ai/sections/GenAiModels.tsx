"use client"

import { genModels } from "../data"

/** Sticky left rail + scrolling model list — CSS sticky only, no GSAP pin. */
export function GenAiModels() {
  return (
    <section id="models" className="w-full bg-[#f8f4ec] py-16 md:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className="h-fit lg:sticky lg:top-32">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            AI foundation
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#0a0a1a] md:text-4xl lg:text-5xl">
            Built on world-class intelligence
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#0a0a1a]/65 md:text-lg">
            We combine leading models with deep engineering to create secure, scalable, production-ready
            solutions that accelerate innovation.
          </p>
          <div className="mt-8 h-0.5 w-28 bg-gradient-to-r from-[#FF5812] to-[#ff7a3d]" aria-hidden />
        </div>

        <div className="relative min-w-0">
          <div className="absolute bottom-0 left-5 top-0 hidden w-px bg-[#0a0a1a]/10 sm:block" aria-hidden />
          <ol className="space-y-0">
            {genModels.map((item, i) => (
              <li key={item.title} className="group relative flex gap-5 sm:gap-8">
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#0a0a1a]/10 bg-white text-xs font-semibold text-[#0a0a1a] shadow-sm transition-colors group-hover:border-[#FF5812]/30 group-hover:text-[#FF5812]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0 flex-1 border-b border-[#0a0a1a]/10 pb-10 last:border-none">
                  <h3 className="text-xl font-semibold text-[#0a0a1a]">{item.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#0a0a1a]/65 md:text-base">
                    {item.desc}
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
