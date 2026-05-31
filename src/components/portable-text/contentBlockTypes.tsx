import Link from 'next/link'
import type { PortableTextTypeComponentProps } from '@portabletext/react'

type CalloutValue = {
  variant?: 'info' | 'tip' | 'warning'
  title?: string
  text?: string
}

type CtaValue = {
  label?: string
  href?: string
  style?: 'primary' | 'secondary'
}

type StatValue = {
  value?: string
  label?: string
  description?: string
}

const calloutStyles: Record<
  NonNullable<CalloutValue['variant']>,
  { container: string; title: string; text: string }
> = {
  info: {
    container: 'border-[#cfe0ff] bg-[#f2f6ff] text-[#0f3d7a]',
    title: 'text-[#0f3d7a]',
    text: 'text-[#1e4a8a]',
  },
  tip: {
    container: 'border-[#c8ead9] bg-[#eefbf4] text-[#145c3a]',
    title: 'text-[#145c3a]',
    text: 'text-[#1f6b47]',
  },
  warning: {
    container: 'border-[#f5d9a8] bg-[#fff8eb] text-[#7a4b00]',
    title: 'text-[#7a4b00]',
    text: 'text-[#8a5a00]',
  },
}

export function CalloutBlock({ value }: PortableTextTypeComponentProps<CalloutValue>) {
  if (!value?.text) return null

  const variant = value.variant || 'info'
  const styles = calloutStyles[variant]

  return (
    <aside
      className={`my-8 rounded-2xl border px-5 py-4 md:px-6 md:py-5 ${styles.container}`}
      role="note"
    >
      {value.title ? (
        <div className={`mb-2 text-sm font-bold uppercase tracking-[0.12em] ${styles.title}`}>
          {value.title}
        </div>
      ) : null}
      <p className={`text-[1.02rem] leading-7 ${styles.text}`}>{value.text}</p>
    </aside>
  )
}

export function CtaBlock({ value }: PortableTextTypeComponentProps<CtaValue>) {
  if (!value?.label || !value?.href) return null

  const isPrimary = value.style !== 'secondary'
  const className = isPrimary
    ? 'inline-flex items-center justify-center rounded-full bg-[#0f5cc0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a428b]'
    : 'inline-flex items-center justify-center rounded-full border border-[#0f5cc0] px-6 py-3 text-sm font-semibold text-[#0f5cc0] transition-colors hover:bg-[#f2f6ff]'

  const isExternal = /^https?:\/\//.test(value.href)

  if (isExternal) {
    return (
      <div className="my-8">
        <a
          href={value.href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {value.label}
        </a>
      </div>
    )
  }

  return (
    <div className="my-8">
      <Link href={value.href} className={className}>
        {value.label}
      </Link>
    </div>
  )
}

export function StatHighlightBlock({ value }: PortableTextTypeComponentProps<StatValue>) {
  if (!value?.value || !value?.label) return null

  return (
    <div className="my-8 rounded-2xl border border-[#e6e1f2] bg-[#faf8ff] px-6 py-5 md:px-8 md:py-6">
      <div className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none tracking-[-0.03em] text-[#5a17ee]">
        {value.value}
      </div>
      <div className="mt-2 text-base font-semibold text-[#0d0a23]">{value.label}</div>
      {value.description ? (
        <p className="mt-2 text-sm leading-6 text-[#6b7694]">{value.description}</p>
      ) : null}
    </div>
  )
}

export const sharedPortableTextTypes = {
  callout: CalloutBlock,
  ctaButton: CtaBlock,
  statHighlight: StatHighlightBlock,
}
