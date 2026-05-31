"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import type { CardItem } from "../../../types"
import { STORY_TOKENS } from "../tokens"
import { VoxelCubes } from "../visuals/VoxelCubes"

type Props = {
  cards: CardItem[]
  isActive?: boolean
}

export function ChallengePanel({ cards, isActive }: Props) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!isActive || !rootRef.current) return
      const cardEls = rootRef.current.querySelectorAll("[data-challenge-card]")
      gsap.fromTo(
        cardEls,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: "power2.out" },
      )
    },
    { scope: rootRef, dependencies: [isActive] },
  )

  return (
    <article
      ref={rootRef}
      data-story-panel
      className="story-panel flex h-full shrink-0 flex-col overflow-hidden rounded-[32px] p-10 md:p-12"
      style={{
        width: "var(--story-panel-width)",
        background: `linear-gradient(160deg, #FFFFFF 0%, ${STORY_TOKENS.bg} 55%, ${STORY_TOKENS.primaryMuted} 100%)`,
        border: "1px solid rgba(99, 102, 241, 0.1)",
        boxShadow: "0 24px 48px -16px rgba(15, 23, 42, 0.08)",
      }}
    >
      <header>
        <span className="text-sm font-bold tracking-[0.2em] text-[#94A3B8]">01</span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
          The Challenge
        </h2>
        <p className="mt-3 max-w-lg text-[#64748B]">
          Enterprise teams were drowning in repetitive work while critical data stayed locked in silos.
        </p>
      </header>
      <div className="mt-8 grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-4">
          {cards.slice(0, 3).map((card) => (
            <div
              key={card.title}
              data-challenge-card
              className="rounded-[20px] border border-slate-100/80 bg-white p-6 shadow-[0_8px_32px_rgba(15,23,42,0.06)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] motion-reduce:transform-none"
            >
              <h3 className="text-lg font-semibold text-[#0B1020]">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{card.description}</p>
            </div>
          ))}
        </div>
        <VoxelCubes className="min-h-[240px]" />
      </div>
    </article>
  )
}
