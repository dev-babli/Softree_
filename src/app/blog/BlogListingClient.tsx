"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Search, Plus, ArrowRight } from "lucide-react"
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
  const [selectedCategory, setSelectedCategory] = useState("All")

  const searchParams = useSearchParams()
  const catQuery = searchParams.get("category")

  useEffect(() => {
    let cat: string | null = null;
    if (catQuery) {
      cat = catQuery;
    } else if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      cat = params.get("category");
    }

    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory("All");
    }
  }, [catQuery]);

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

  const categories = useMemo(() => {
    const set = new Set<string>();
    normalized.forEach((post) => {
      if (post.category) set.add(post.category);
    });
    return ["All", ...Array.from(set)];
  }, [normalized]);

  const filteredByCategory = useMemo(() => {
    if (!selectedCategory || selectedCategory === "All") return normalized;
    return normalized.filter((post) => {
      const postCat = post.category.toLowerCase().trim().replace(/\s+/g, '-');
      const selectedCat = selectedCategory.toLowerCase().trim().replace(/\s+/g, '-');
      return postCat === selectedCat;
    });
  }, [normalized, selectedCategory]);

  const featured = filteredByCategory[0] || null
  const rest = filteredByCategory.slice(1)

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
            {categories.map((item) => {
              const isSelected =
                selectedCategory.toLowerCase().trim().replace(/\s+/g, '-') ===
                item.toLowerCase().trim().replace(/\s+/g, '-');
              return (
                <button
                  key={item}
                  onClick={() => {
                    setSelectedCategory(item);
                    setSearch("");
                    setVisibleCount(VISIBLE_STEP);
                    if (typeof window !== "undefined") {
                      const url = new URL(window.location.href);
                      if (item === "All") {
                        url.searchParams.delete("category");
                      } else {
                        url.searchParams.set("category", item.toLowerCase().trim().replace(/\s+/g, '-'));
                      }
                      window.history.pushState({}, "", url.toString());
                    }
                  }}
                  className={`rounded-full border px-4 py-[7px] text-[13px] font-medium leading-none transition-colors ${
                    isSelected
                      ? "border-[#0f5cc0] bg-[#edf3ff] text-[#0f5cc0]"
                      : "border-[#d7dce9] bg-white text-[#50576b] hover:bg-black/[0.02]"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {featured ? (
            <Link
              href={`/blog/${featured.slug.current}`}
              className="group mt-10 grid gap-6 lg:gap-10 rounded-3xl border border-[#d7dce9] bg-white p-5 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-[#0f5cc0]/35 hover:shadow-[0_24px_60px_rgba(15,92,192,0.12)] md:grid-cols-[1fr_1.1fr] md:p-8"
            >
              <div className="flex flex-col justify-between py-1 gap-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex rounded-full border border-[#0f5cc0]/30 bg-[#edf3ff] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0f5cc0]">
                      Featured Post
                    </span>
                    <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200/60 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-600">
                      {featured.category}
                    </span>
                    {featured.publishedAt && (
                      <span className="text-[12px] text-[#717a8e]">
                        {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-black leading-tight tracking-[-0.03em] text-[#181818] transition-colors duration-300 group-hover:text-[#0f5cc0] md:text-3xl lg:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-[#50576b]">{featured.excerpt}</p>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#181818] transition-colors duration-300 group-hover:text-[#0f5cc0]">
                  <span>Read Featured Article</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[#edf0f7] bg-[#f8f9fc] shadow-inner">
                <Image
                  src={featured.mainImage?.asset?.url || "/og-image.png"}
                  alt={featured.mainImage?.alt || featured.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 600px"
                  className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-12 md:px-8 md:py-16">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-black tracking-[-0.02em]">
            {selectedCategory === "All" ? "Explore Our Latest Articles" : `All ${selectedCategory} articles`}
          </h2>
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
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#d7dce9] bg-white transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-[#0f5cc0]/35 hover:shadow-[0_20px_50px_rgba(15,92,192,0.1)]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#edf0f7] bg-white">
                  <Image
                    src={post.mainImage?.asset?.url || "/og-image.png"}
                    alt={post.mainImage?.alt || post.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 400px"
                    className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  {/* Subtle hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-20" />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-[#edf3ff] border border-[#0f5cc0]/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#0f5cc0]">
                      {post.category}
                    </span>
                    {post.publishedAt && (
                      <span className="text-[12px] text-[#717a8e]">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold leading-snug tracking-tight text-[#181818] transition-colors duration-300 group-hover:text-[#0f5cc0]">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-[#50576b]">{post.excerpt}</p>
                  <div className="mt-auto pt-3 flex items-center gap-1.5 text-sm font-bold text-[#181818] transition-colors duration-300 group-hover:text-[#0f5cc0]">
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
