"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SanityBlogPost } from "@/sanity/types";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  posts?: SanityBlogPost[];
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getCategory(post: SanityBlogPost) {
  return post.categories?.[0]?.title || "Blog";
}

function getImageUrl(post: SanityBlogPost) {
  return post.mainImage?.asset?.url || "/images/ai/ai-agent.jpg";
}

function getImageAlt(post: SanityBlogPost) {
  return post.mainImage?.alt || post.title;
}

export default function LatestBlogsSection({ posts }: Props) {
  const allPosts = posts || [];
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const featured = allPosts[featuredIndex] || null;
  const sidebarPosts = allPosts.filter((_, i) => i !== featuredIndex);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector(".blog-header");
      const grid = sectionRef.current?.querySelector(".blog-grid");
      if (header) {
        gsap.from(header, {
          opacity: 0,
          y: 28,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: header, start: "top 88%" },
        });
      }
      if (grid) {
        gsap.from(grid, {
          opacity: 0,
          y: 20,
          duration: 0.65,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: { trigger: grid, start: "top 90%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (allPosts.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="sm:py-27 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="blog-header mb-12 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#ff7a2f]/10 text-[#ff7a2f] px-4 py-1 text-xs font-semibold tracking-widest uppercase border border-[#ff7a2f]/20">
            Latest Blogs
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white">
            Our Recent Insights & Articles
          </h2>

          <p className="mt-4 text-base text-white/70 leading-relaxed">
            Stay ahead of the curve with engineering insights, platform
            capabilities, and automation breakthroughs compiled directly by our
            delivery experts.
          </p>
        </div>

        <div className="blog-grid grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
          {/* ================= LEFT FEATURED ================= */}
          {featured && (
            <div className="lg:col-span-3 h-full">
              <Link
                href={`/blog/${featured.slug.current}`}
                className="block h-full"
              >
                <div className="relative h-full min-h-[520px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-500 hover:scale-[1.01]">
                  {/* Background frame */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-[#0a0a0a]" />

                  {/* Image inset */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={featured._id}
                      className="absolute inset-2 rounded-[24px] overflow-hidden"
                      initial={{ opacity: 0, filter: "blur(8px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                    >
                      <Image
                        src={getImageUrl(featured)}
                        alt={getImageAlt(featured)}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Overlay */}
                  <div className="absolute inset-2 rounded-[24px] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={featured._id}
                      className="absolute bottom-0 left-0 right-0 p-8 z-10"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                    >
                      <div className="text-xs text-white/70 tracking-widest font-semibold uppercase">
                        {getCategory(featured)} •{" "}
                        {formatDate(featured.publishedAt)}
                      </div>

                      <h3 className="mt-2 text-white text-3xl font-semibold leading-snug">
                        {featured.title}
                      </h3>

                      {featured.excerpt && (
                        <p className="mt-3 text-white/70 text-sm max-w-xl">
                          {featured.excerpt}
                        </p>
                      )}
                      <span className="mt-5 inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full hover:bg-[#ff7a2f]/20 transition-all duration-300">
                        Read More &rarr;
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Link>
            </div>
          )}

          {/* ================= RIGHT LIST ================= */}
          <div className="lg:col-span-2 flex flex-col gap-3 h-full">
            {sidebarPosts.map((post, index) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group relative flex items-center gap-4 flex-1 p-5 rounded-2xl text-left bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                onMouseEnter={() =>
                  setFeaturedIndex(allPosts.findIndex((p) => p._id === post._id))
                }
              >
                {/* Accent bar */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-1 bg-[#ff7a2f] rounded-full group-hover:h-10 transition-all duration-300" />

                {/* Thumbnail */}
                <div className="relative w-36 h-[100px] flex-shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={getImageUrl(post)}
                    alt={getImageAlt(post)}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h4 className="font-semibold text-white leading-snug group-hover:text-[#ff7a2f] transition-colors">
                    {post.title}
                  </h4>

                  {post.excerpt && (
                    <p className="mt-1 text-xs text-white/60 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-white/60">
                    {getCategory(post)} • {formatDate(post.publishedAt)}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full hover:bg-[#ff7a2f]/20 transition-all duration-300">
                    Read More &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
