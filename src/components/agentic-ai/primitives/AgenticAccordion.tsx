"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

type AccordionItem = {
  id: string
  number: string
  title: string
  description: string
  tags?: string[]
  image?: string
  bullets?: readonly string[]
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsDesktop(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])
  return isDesktop
}

export function AgenticAccordion({
  items,
  defaultId,
}: {
  items: AccordionItem[]
  defaultId?: string
}) {
  const [expandedId, setExpandedId] = useState(defaultId ?? items[0]?.id ?? "")
  const isDesktop = useIsDesktop()

  return (
    <div className="flex w-full flex-col border border-[var(--legacy-eaeaea)] bg-[var(--legacy-f9f9f9)] lg:flex-row">
      {items.map((item) => {
        const isExpanded = expandedId === item.id
        return (
          <div
            key={item.id}
            className={`relative flex flex-col overflow-hidden border-b border-[var(--legacy-eaeaea)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:border-b-0 lg:border-r last:lg:border-r-0 ${
              isExpanded ? "flex-[2] bg-white lg:flex-[3]" : "flex-1 bg-[var(--legacy-f9f9f9)] hover:bg-white/60"
            }`}
            onMouseEnter={() => isDesktop && setExpandedId(item.id)}
            onClick={() => !isDesktop && setExpandedId(item.id)}
          >
            <div className="flex cursor-pointer items-center justify-between p-6 lg:flex-col lg:items-start lg:p-8">
              <span className="text-sm font-medium text-[var(--legacy-999)]">{item.number}</span>
              <h3
                className={`mt-2 text-lg font-bold tracking-[-0.02em] transition-colors lg:mt-4 lg:text-xl ${
                  isExpanded ? "text-[var(--legacy-111)]" : "text-[var(--legacy-555)]"
                }`}
              >
                {item.title}
              </h3>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0 lg:max-h-0"
              }`}
            >
              <div className="px-6 pb-8 lg:px-8">
                <p className="text-sm leading-relaxed text-[var(--legacy-555)]">{item.description}</p>
                {item.bullets && item.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-[var(--legacy-555)]">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#FF5812]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {item.tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--legacy-eaeaea)] bg-white px-3 py-1 text-[11px] font-medium text-[var(--legacy-555)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {item.image && isExpanded && (
                  <div className="relative mt-6 aspect-video overflow-hidden rounded-xl">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="400px" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
