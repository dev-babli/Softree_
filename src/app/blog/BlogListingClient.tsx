"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Plus } from "lucide-react"
import GeneralHeaderHero from "@/components/sections/GeneralHeaderHero"

type BlogPost = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt?: string
  categories?: { title: string }[]
  mainImage?: { asset?: { url?: string }; alt?: string } | null
  excerpt?: string
}

const VISIBLE_STEP = 8

export default function BlogListingClient({ posts }: { posts: BlogPost[] }) {
  const [search, setSearch] = useState("")
  const [visibleCount, setVisibleCount] = useState(VISIBLE_STEP)

  const normalized = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        category: post.categories?.[0]?.title || "Blog",
        excerpt:
          post.excerpt ||
          "Insights on architecture, implementation decisions, and practical enterprise delivery lessons.",
      })),
    [posts]
  )

  const featured = normalized[0]
  const rest = normalized.slice(1)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return rest
    return rest.filter((post) => {
      const haystack = `${post.title} ${post.category} ${post.excerpt}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [rest, search])

  const visiblePosts = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <div className="bg-[#f6f7fb] text-[#181818]">
      <GeneralHeaderHero
        title="Blog"
        description="We help teams build practical AI and modern digital products. Explore implementation insights, engineering playbooks, and enterprise delivery stories from real projects."
      />

      <section className="border-b border-[#d8dce8] bg-white">
        <div className="mx-auto max-w-[1240px] px-4 pb-12 pt-10 md:px-8 md:pb-16">
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "AI insights",
              "Customer Stories",
              "Blog",
              "WhitepaperS",
              "WebinarS",
              "AI Research Reports",
              "Videos",
              "Glossary",
              "e-Guides",
            ].map((item) => (
              <span
                key={item}
                className={`rounded-full border px-4 py-[7px] text-[13px] font-medium leading-none ${
                  item === "Blog"
                    ? "border-[#0f5cc0] bg-[#edf3ff] text-[#0f5cc0]"
                    : "border-[#d7dce9] bg-white text-[#50576b]"
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          {featured ? (
            <div className="mt-10 grid gap-6 rounded-2xl border border-[#d7dce9] bg-white p-5 md:grid-cols-[1fr_1.02fr] md:p-7">
              <div className="flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <span className="inline-flex rounded-full border border-[#0f5cc0]/30 bg-[#edf3ff] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0f5cc0]">
                    Featured
                  </span>
                  <h2 className="text-2xl font-black leading-tight tracking-[-0.02em] md:text-3xl">{featured.title}</h2>
                  <p className="text-[15px] leading-7 text-[#4c5366]">{featured.excerpt}</p>
                </div>
                <Link
                  href={`/blog/${featured.slug.current}`}
                  className="inline-flex w-fit items-center rounded-md border border-[#181818] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.98] hover:bg-[#181818] hover:text-white"
                >
                  Learn more
                </Link>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[#d7dce9]">
                <Image
                  src={featured.mainImage?.asset?.url || "/og-image.png"}
                  alt={featured.mainImage?.alt || featured.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-12 md:px-8 md:py-16">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-black tracking-[-0.02em]">All AI insights</h2>
          <label className="flex h-11 min-w-[280px] items-center gap-2 rounded-[10px] border border-[#d7dce9] bg-white px-3.5">
            <Search className="h-4 w-4 text-[#65708a]" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setVisibleCount(VISIBLE_STEP)
              }}
              placeholder="Search AI Insights"
              className="w-full bg-transparent text-[14px] text-[#181818] outline-none placeholder:text-[#8a92a7]"
            />
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => {
            return (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#d7dce9] bg-white transition-[transform,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-[#a8b4d1]"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-[#d7dce9]">
                  <Image
                    src={post.mainImage?.asset?.url || "/og-image.png"}
                    alt={post.mainImage?.alt || post.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 400px"
                    className="object-cover transition-transform duration-200 ease-[ease] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="text-[13px] font-semibold text-[#0f5cc0]">{post.category}</div>
                  <h3 className="text-[1.45rem] font-bold leading-tight text-[#181818] transition-colors group-hover:text-[#0f5cc0]">
                    {post.title}
                  </h3>
                  <p className="line-clamp-4 text-[15px] leading-6 text-[#4c5366]">{post.excerpt}</p>
                  <div className="mt-auto pt-2">
                    <span className="inline-flex rounded-full border border-[#181818] px-4 py-2 text-[12px] font-semibold text-[#181818] transition-colors group-hover:bg-[#181818] group-hover:text-white">
                      read blog
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {hasMore ? (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + VISIBLE_STEP)}
              className="inline-flex items-center gap-2 rounded-md border border-[#181818] px-4 py-2 text-sm font-semibold transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.98] hover:bg-[#181818] hover:text-white"
            >
              Show more
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ) : null}

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-[#c5ccdc] bg-white p-8 text-center text-sm text-[#65708a]">
            No articles match your search.
          </div>
        ) : null}
      </section>
    </div>
  )
}
