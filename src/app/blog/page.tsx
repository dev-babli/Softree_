import { client } from "@/sanity/client"
import { groq } from "next-sanity"
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import BlogHero from "./BlogHero"
import BlogGrid from "./BlogGrid"
import LightContactSection from "@/components/qc/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"

const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    author->{ name },
    categories[]->{ title },
    mainImage { asset->{ url }, alt },
    body[0]{
      ...,
      children[0]{ text }
    }
  }
`

export const revalidate = 60
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

/**
 * BLOG — Redesigned to match About Us / Contact design language.
 *
 *  1. NavigationClient       → Shared navigation
 *  2. BlogHero               → Editorial hero (same style as ContactHero)
 *  3. BlogGrid               → Featured post + card grid with Grainient thumbnails
 *  4. LightContactSection    → CTA / contact form (shared)
 *  5. LightFAQExact          → FAQ section (shared)
 *  6. Footer                 → Shared footer
 */

export default async function BlogPage() {
  const posts = await client.fetch(postsQuery, {}, { next: { revalidate: 0 } })

  return (
    <div className="min-h-screen pt-[100px]">
      {/* Navigation */}
      <NavigationClient />

      {/* 1. Hero — Editorial with big typography */}
      <BlogHero />

      {/* 2. Blog Grid — Featured + cards with Grainient thumbnails */}
      <BlogGrid posts={posts} />

      {/* 3. CTA — Contact form */}
      <LightContactSection />

      {/* 4. FAQ */}
      <LightFAQExact />

      {/* 5. Footer */}
      <Footer />
    </div>
  )
}
