"use client"

import Image from "next/image"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { sharedPortableTextTypes } from "@/components/portable-text/contentBlockTypes"
import type { PTBlock } from "../../../types"

type SanityImageValue = {
  asset?: { url?: string } | null
  alt?: string
  caption?: string
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h3 className="mt-10 mb-3 text-[1.35rem] font-bold tracking-tight text-[var(--cs-text-primary,#0f172a)] md:text-[1.5rem]">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="mt-8 mb-3 text-[1.15rem] font-bold tracking-tight text-[var(--cs-text-primary,#0f172a)] md:text-[1.25rem]">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-[1.0625rem] leading-[1.7] text-[var(--cs-text-secondary,#334155)]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-7 rounded-2xl border-l-4 border-l-[var(--softree-accent,#FF7A2F)] bg-[var(--softree-bg-light,#fafaf9)] px-6 py-5 text-[1.05rem] leading-[1.65] text-[var(--cs-text-primary,#0f172a)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-[1.0625rem] leading-[1.7] text-[var(--cs-text-secondary,#334155)] marker:text-[var(--softree-accent,#FF7A2F)]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-[1.0625rem] leading-[1.7] text-[var(--cs-text-secondary,#334155)] marker:font-semibold marker:text-[var(--softree-accent,#FF7A2F)]">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-[var(--cs-text-primary,#0f172a)]">{children}</strong>
    ),
    link: ({ value, children }) => (
      <a
        href={(value as { href?: string })?.href}
        className="font-medium text-[var(--softree-accent,#FF7A2F)] underline underline-offset-4 decoration-[var(--softree-accent,#FF7A2F)]/40 transition-colors hover:decoration-[var(--softree-accent,#FF7A2F)]"
      >
        {children}
      </a>
    ),
  },
  types: {
    ...sharedPortableTextTypes,
    image: ({ value }: { value?: SanityImageValue }) => {
      const url = value?.asset?.url
      if (!url) return null
      return (
        <figure className="my-8 overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white">
          <div className="relative aspect-video w-full">
            <Image src={url} alt={value?.alt || "Illustration"} fill unoptimized className="object-cover" sizes="760px" />
          </div>
          {value?.caption ? (
            <figcaption className="px-4 py-3 text-center text-xs font-medium text-[var(--cs-text-muted,#64748b)]">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    },
  },
}

/** Renders studio-authored narrative content (storyBlockContent) in the manufacturing layout style. */
export function NarrativeProse({
  value,
  className = "",
}: {
  value?: PTBlock[]
  className?: string
}) {
  if (!value?.length) return null
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  )
}
