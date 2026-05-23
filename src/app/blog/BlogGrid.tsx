"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, Calendar, Clock } from "lucide-react"
import Grainient from "@/components/qc/homepage-light/Grainient"
import { SpotlightCard } from "@/components/qc/shared/SpotlightCard"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ── Color palettes for Grainient cards ─────────────────────── */
const GRAINIENT_PALETTES = [
  { color1: "#C8E0FF", color2: "#5C9DFF", color3: "#E8F2FF", warpFrequency: 4.2, blendAngle: -18 },
  { color1: "#C2DDFF", color2: "#66B2FF", color3: "#E0EFFF", warpFrequency: 5.6, blendAngle: 22 },
  { color1: "#D4C6FF", color2: "#8B5CF6", color3: "#EDE9FE", warpFrequency: 3.8, blendAngle: -35 },
  { color1: "#C8FFF0", color2: "#34D399", color3: "#E0FFF4", warpFrequency: 4.5, blendAngle: 45 },
  { color1: "#FFD6CC", color2: "#F97316", color3: "#FFF1EB", warpFrequency: 5.0, blendAngle: -12 },
  { color1: "#FFE4CC", color2: "#F59E0B", color3: "#FFF8EB", warpFrequency: 4.8, blendAngle: 30 },
  { color1: "#FECDD3", color2: "#F43F5E", color3: "#FFF1F2", warpFrequency: 3.5, blendAngle: -25 },
  { color1: "#CCFBF1", color2: "#14B8A6", color3: "#F0FDFA", warpFrequency: 4.0, blendAngle: 15 },
  { color1: "#DDD6FE", color2: "#7C3AED", color3: "#F5F3FF", warpFrequency: 5.2, blendAngle: -40 },
  { color1: "#BFDBFE", color2: "#3B82F6", color3: "#EFF6FF", warpFrequency: 4.6, blendAngle: 8 },
]

type BlogPost = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  author: { name: string }
  categories: { title: string }[]
  body: { children: { text: string }[] }
}

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const featuredPost = posts[0]
  const regularPosts = posts.slice(1)

  return (
    <section
      ref={containerRef}
      id="posts"
      className="w-full bg-[#F8F9FC] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">

        {/* ═══════ SECTION HEADER ═══════ */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-[#1852FF]" />
            <span className="text-sm font-medium text-[#1852FF]">Latest Articles</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#0a0a1a] md:text-4xl lg:text-5xl">
            Explore our latest{" "}
            <span className="text-[#1852FF]">insights</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#0a0a1a]/60">
            Deep dives into AI, cloud platforms, web development, and
            enterprise digital transformation.
          </p>
        </motion.div>

        {/* ═══════ FEATURED POST ═══════ */}
        {featuredPost && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <Link
              href={`/blog/${featuredPost.slug?.current}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-[0_12px_40px_-16px_rgba(10,10,26,0.18)] transition-shadow duration-500 hover:shadow-[0_24px_60px_-16px_rgba(10,10,26,0.28)]">
                {/* Grainient background */}
                <div className="relative h-[320px] md:h-[400px] lg:h-[480px]">
                  <Grainient
                    color1="#C8E0FF"
                    color2="#5C9DFF"
                    color3="#E8F2FF"
                    timeSpeed={0.2}
                    colorBalance={-0.12}
                    warpStrength={1.2}
                    warpFrequency={4.2}
                    warpSpeed={1.35}
                    warpAmplitude={44}
                    blendAngle={-18}
                    blendSoftness={0.08}
                    rotationAmount={420}
                    noiseScale={2.4}
                    grainAmount={0.12}
                    grainScale={2.2}
                    grainAnimated
                    contrast={1.38}
                    saturation={1.12}
                    zoom={0.86}
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.55))]" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8 text-white md:p-12">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        Featured
                      </span>
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md">
                        {featuredPost.categories?.[0]?.title || "Technology"}
                      </span>
                    </div>

                    <div className="max-w-[680px]">
                      <h3 className="mb-4 text-2xl font-bold leading-tight tracking-[-0.02em] md:text-4xl lg:text-5xl">
                        {featuredPost.title}
                      </h3>
                      <p className="mb-6 max-w-[520px] text-sm leading-relaxed text-white/75 md:text-base">
                        {featuredPost.body?.children?.[0]?.text?.slice(0, 180) || ""}...
                      </p>
                      <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-xs text-white/60">
                          <Calendar className="h-3.5 w-3.5" />
                          {featuredPost.publishedAt
                            ? new Date(featuredPost.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                            : "Recent"}
                        </span>
                        <span className="flex items-center gap-2 text-xs text-white/60">
                          <Clock className="h-3.5 w-3.5" />
                          8 min read
                        </span>
                        <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                          Read article
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* ═══════ POST GRID ═══════ */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post, i) => {
            const palette = GRAINIENT_PALETTES[i % GRAINIENT_PALETTES.length]
            const category = post.categories?.[0]?.title || "Technology"

            return (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: EASE }}
              >
                <Link
                  href={`/blog/${post.slug?.current}`}
                  className="group block h-full"
                >
                  <SpotlightCard
                    color="rgba(24, 82, 255, 0.45)"
                    intensity={0.5}
                    radius={280}
                    className="h-full overflow-hidden rounded-2xl border border-[#0a0a1a]/5 bg-white shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-14px_rgba(24,82,255,0.2)]"
                  >
                    {/* Grainient thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      <Grainient
                        color1={palette.color1}
                        color2={palette.color2}
                        color3={palette.color3}
                        timeSpeed={0.18}
                        colorBalance={-0.05}
                        warpStrength={1.0}
                        warpFrequency={palette.warpFrequency}
                        warpSpeed={1.15}
                        warpAmplitude={52}
                        blendAngle={palette.blendAngle}
                        blendSoftness={0.06}
                        rotationAmount={520}
                        noiseScale={2.0}
                        grainAmount={0.1}
                        grainScale={2.4}
                        grainAnimated
                        contrast={1.45}
                        saturation={1.08}
                        zoom={0.9}
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                      {/* Category badge */}
                      <div className="absolute left-4 top-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                          {category}
                        </span>
                      </div>

                      {/* Read time */}
                      <div className="absolute bottom-4 right-4">
                        <span className="flex items-center gap-1 text-[10px] font-medium text-white/80">
                          <Clock className="h-3 w-3" />
                          8 min
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-3 text-lg font-bold leading-snug tracking-[-0.01em] text-[#0a0a1a] transition-colors duration-300 group-hover:text-[#1852FF]">
                        {post.title}
                      </h3>

                      <p className="mb-4 flex-1 text-sm leading-relaxed text-[#0a0a1a]/55 line-clamp-3">
                        {post.body?.children?.[0]?.text || ""}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between border-t border-[#0a0a1a]/5 pt-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1852FF]/10">
                            <span className="text-[10px] font-bold text-[#1852FF]">ST</span>
                          </div>
                          <span className="text-xs text-[#0a0a1a]/50">
                            {post.author?.name || "Softree Technology"}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-xs text-[#0a0a1a]/40">
                          <Calendar className="h-3 w-3" />
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            : "Recent"}
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
