import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { sharedPortableTextTypes } from '@/components/portable-text/contentBlockTypes'

type HeroSection = {
  _type: 'pageHeroBlock'
  eyebrow?: string
  headline?: string
  subheadline?: string
  primaryCta?: { label?: string; href?: string }
  image?: { asset?: { url?: string }; alt?: string }
}

type FeatureGridSection = {
  _type: 'pageFeatureGridBlock'
  heading?: string
  features?: Array<{ title?: string; description?: string; icon?: string }>
}

type RichTextSection = {
  _type: 'pageRichTextBlock'
  content?: unknown
}

type TestimonialSection = {
  _type: 'pageTestimonialBlock'
  quote?: string
  name?: string
  role?: string
  avatar?: { asset?: { url?: string } }
}

type CtaSection = {
  _type: 'pageCtaBlock'
  headline?: string
  body?: string
  buttonLabel?: string
  buttonHref?: string
}

export type MarketingSection =
  | HeroSection
  | FeatureGridSection
  | RichTextSection
  | TestimonialSection
  | CtaSection

function HeroBlock({ section }: { section: HeroSection }) {
  const imageUrl = section.image?.asset?.url
  return (
    <section className="relative overflow-hidden bg-zinc-950 px-6 py-24 text-white md:px-12 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          {section.eyebrow ? (
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-blue-300">{section.eyebrow}</p>
          ) : null}
          {section.headline ? (
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">{section.headline}</h1>
          ) : null}
          {section.subheadline ? (
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">{section.subheadline}</p>
          ) : null}
          {section.primaryCta?.label && section.primaryCta?.href ? (
            <Link
              href={section.primaryCta.href}
              className="mt-8 inline-flex rounded-full bg-[#1852FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1346d9]"
            >
              {section.primaryCta.label}
            </Link>
          ) : null}
        </div>
        {imageUrl ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
            <Image src={imageUrl} alt={section.image?.alt || ''} fill className="object-cover" />
          </div>
        ) : null}
      </div>
    </section>
  )
}

function FeatureGridBlock({ section }: { section: FeatureGridSection }) {
  return (
    <section className="px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        {section.heading ? (
          <h2 className="mb-12 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{section.heading}</h2>
        ) : null}
        <div className="grid gap-6 md:grid-cols-3">
          {(section.features || []).map((feature, index) => (
            <article key={`${feature.title}-${index}`} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              {feature.title ? <h3 className="text-lg font-semibold text-zinc-950">{feature.title}</h3> : null}
              {feature.description ? (
                <p className="mt-3 text-sm leading-7 text-zinc-600">{feature.description}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function RichTextBlock({ section }: { section: RichTextSection }) {
  if (!section.content) return null
  return (
    <section className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl text-[1.03rem] leading-8 text-zinc-700">
        <PortableText
          value={section.content as never}
          components={{
            types: sharedPortableTextTypes,
            block: {
              h2: ({ children }) => (
                <h2 className="mt-12 mb-4 text-2xl font-bold tracking-tight text-zinc-950">{children}</h2>
              ),
              h3: ({ children }) => <h3 className="mt-8 text-xl font-bold text-zinc-950">{children}</h3>,
              normal: ({ children }) => <p className="mb-6">{children}</p>,
            },
          }}
        />
      </div>
    </section>
  )
}

function TestimonialBlock({ section }: { section: TestimonialSection }) {
  const avatarUrl = section.avatar?.asset?.url
  return (
    <section className="bg-zinc-50 px-6 py-20 md:px-12">
      <figure className="mx-auto max-w-3xl text-center">
        {section.quote ? (
          <blockquote className="text-2xl font-medium leading-10 text-zinc-800 md:text-3xl">&ldquo;{section.quote}&rdquo;</blockquote>
        ) : null}
        <figcaption className="mt-8 flex items-center justify-center gap-4">
          {avatarUrl ? (
            <Image src={avatarUrl} alt="" width={48} height={48} className="rounded-full object-cover" />
          ) : null}
          <div className="text-left">
            {section.name ? <div className="font-semibold text-zinc-950">{section.name}</div> : null}
            {section.role ? <div className="text-sm text-zinc-600">{section.role}</div> : null}
          </div>
        </figcaption>
      </figure>
    </section>
  )
}

function CtaBlock({ section }: { section: CtaSection }) {
  return (
    <section className="px-6 py-20 md:px-12">
      <div className="mx-auto max-w-4xl rounded-3xl bg-[#1852FF] px-8 py-14 text-center text-white md:px-16">
        {section.headline ? <h2 className="text-3xl font-semibold md:text-4xl">{section.headline}</h2> : null}
        {section.body ? <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">{section.body}</p> : null}
        {section.buttonLabel && section.buttonHref ? (
          <Link
            href={section.buttonHref}
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1852FF] transition hover:bg-blue-50"
          >
            {section.buttonLabel}
          </Link>
        ) : null}
      </div>
    </section>
  )
}

export function MarketingPageSections({ sections }: { sections: MarketingSection[] }) {
  return (
    <>
      {sections.map((section, index) => {
        const key = (section as { _key?: string })._key || `${section._type}-${index}`
        switch (section._type) {
          case 'pageHeroBlock':
            return <HeroBlock key={key} section={section} />
          case 'pageFeatureGridBlock':
            return <FeatureGridBlock key={key} section={section} />
          case 'pageRichTextBlock':
            return <RichTextBlock key={key} section={section} />
          case 'pageTestimonialBlock':
            return <TestimonialBlock key={key} section={section} />
          case 'pageCtaBlock':
            return <CtaBlock key={key} section={section} />
          default:
            return null
        }
      })}
    </>
  )
}
