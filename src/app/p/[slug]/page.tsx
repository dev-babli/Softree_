import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NavigationServer from '@/components/sections/navigation-server'
import Footer from '@/components/sections/footer'
import { MarketingPageSections, type MarketingSection } from '@/components/marketing/MarketingPageSections'
import { sanityFetch } from '@/sanity/lib/fetch'
import { client } from '@/sanity/lib/client'
import { marketingPageBySlugQuery, marketingPageSlugsQuery } from '@/sanity/queries'

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(marketingPageSlugsQuery)
  return (slugs || []).map((slug) => ({ slug }))
}

type MarketingPageDoc = {
  _id: string
  title: string
  slug: { current: string }
  sections?: MarketingSection[]
  metaTitle?: string
  metaDescription?: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await sanityFetch<MarketingPageDoc | null>(marketingPageBySlugQuery, { slug })

  if (!page) return { title: 'Page not found' }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription,
  }
}

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await sanityFetch<MarketingPageDoc | null>(marketingPageBySlugQuery, { slug })

  if (!page?.sections?.length) notFound()

  return (
    <>
      <NavigationServer />
      <main>
        <MarketingPageSections sections={page.sections} />
      </main>
      <Footer />
    </>
  )
}
