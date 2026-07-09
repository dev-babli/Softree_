import { client } from "@/cms/lib/client"
import { groq } from "next-sanity"
import { Suspense } from "react"
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import BlogListingClient from "./BlogListingClient"

const postsQuery = groq`
  *[_type == "post" && coalesce(visibility, status, "published") == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    categories[]->{ title },
    mainImage { asset->{ url }, alt },
    excerpt,
    body[0]{ children[0]{ text } }
  }
`

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const posts = await client.fetch(postsQuery)
  const normalizedPosts = posts.map((post: Record<string, unknown>) => {
    const firstBlockText =
      (post.body &&
        typeof post.body === "object" &&
        "children" in post.body &&
        Array.isArray((post.body as { children?: unknown[] }).children) &&
        (post.body as { children?: Array<{ text?: string }> }).children?.[0]?.text) ||
      ""
    const excerpt =
      (typeof post.excerpt === "string" && post.excerpt.trim()) ||
      (typeof firstBlockText === "string" && firstBlockText.trim()) ||
      "Insights on enterprise engineering and delivery."

    return {
      ...post,
      excerpt,
    }
  })

  return (
    <div className="min-h-screen">
      <NavigationClient />
      <Suspense fallback={
        <div className="min-h-[400px] flex items-center justify-center bg-[#f6f7fb]">
          <div className="text-[#50576b] font-medium text-[15px]">Loading blog insights...</div>
        </div>
      }>
        <BlogListingClient posts={normalizedPosts} />
      </Suspense>
      <Footer />
    </div>
  )
}
