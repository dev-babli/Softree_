"use client";

import Link from "next/link";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StoryReel } from "@/components/story-reel";
import type { BentoGridLayoutProps, BlogPostMock } from "./bento.types";
import { BENTO_SPRING, BENTO_VIEWPORT, scrollReveal } from "./bento.motion";
import { BentoPreviewPanel } from "./BentoPreviewPanel";
import { BentoIndexThumb } from "./BentoIndexThumb";
import { useBentoPreview } from "./useBentoPreview";

export type { BentoGridLayoutProps, BlogPostMock } from "./bento.types";

function formatDate(iso?: string) {
  if (!iso) return null;
  const d = Date.parse(iso);
  if (Number.isNaN(d)) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(d));
}

function ScrollReveal({
  children,
  className,
  reduced,
  delay = 0,
  y = 14,
}: {
  children: React.ReactNode;
  className?: string;
  reduced: boolean;
  delay?: number;
  y?: number;
}) {
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={BENTO_VIEWPORT}
      variants={scrollReveal(reduced, { delay, y })}
    >
      {children}
    </motion.div>
  );
}

function BlogRow({
  post,
  index,
  isActive,
  reduced,
  onHover,
  onFocus,
}: {
  post: BlogPostMock;
  index: number;
  isActive: boolean;
  reduced: boolean;
  onHover: (id: string) => void;
  onFocus: (id: string) => void;
}) {
  const delay = Math.min(index * 0.05, 0.25);
  const date = formatDate(post.publishedAt);
  const rowClass = cn(
    "group relative flex gap-4 py-4 text-left transition-colors duration-200 md:py-5",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0f5cc0]",
    isActive ? "bg-white pl-3" : "hover:bg-white/80",
  );

  const motionProps = reduced
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: BENTO_VIEWPORT,
        variants: scrollReveal(reduced, { delay, y: 10, x: -4 }),
      };

  return (
    <motion.li className="border-b border-[#d7dce9] last:border-b-0" {...motionProps}>
      <Link
        href={post.href}
        className={rowClass}
        onMouseEnter={() => onHover(post.id)}
        onFocus={() => onFocus(post.id)}
        aria-current={isActive ? "true" : undefined}
      >
        {isActive && !reduced ? (
          <motion.span
            layoutId="blog-active-rail"
            className="absolute bottom-2 left-0 top-2 w-[2px] rounded-full bg-[#0f5cc0]"
            transition={BENTO_SPRING}
            aria-hidden
          />
        ) : isActive ? (
          <span className="absolute bottom-2 left-0 top-2 w-[2px] rounded-full bg-[#0f5cc0]" aria-hidden />
        ) : null}

        <BentoIndexThumb
          src={post.image}
          alt={post.title}
          className="h-14 w-14 md:h-16 md:w-16"
        />

        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0f5cc0]">
            {post.category}
          </span>
          <p
            className={cn(
              "mt-1 line-clamp-2 text-[15px] font-medium leading-snug tracking-[-0.02em]",
              isActive ? "text-[#181818]" : "text-[#2F3437] group-hover:text-[#181818]",
            )}
          >
            {post.title}
          </p>
          {date ? (
            <time
              dateTime={post.publishedAt}
              className="mt-1 block text-[11px] tabular-nums text-[#787774]"
            >
              {date}
            </time>
          ) : null}
        </div>
      </Link>
    </motion.li>
  );
}

export function BentoGridLayout({
  className,
  stories = [],
  posts = [],
  viewAllHref = "/blog",
  viewAllLabel = "All articles",
  eyebrow = "Insights",
  headline = "From the blog",
  description = "Implementation notes on Power Platform, Fabric, AI, and shipping enterprise software with distributed teams.",
  showStoryReel = false,
}: BentoGridLayoutProps) {
  const reduced = useReducedMotion() ?? false;
  const { active, select, selectImmediate } = useBentoPreview(posts);

  const previewItem = active
    ? {
        id: active.id,
        title: active.title,
        category: active.category,
        image: active.image,
        href: active.href,
        excerpt: active.excerpt,
        ctaLabel: "Read article",
      }
    : null;

  return (
    <section
      aria-label="Blog highlights"
      className={cn(
        "mx-auto w-full max-w-[1240px] rounded-xl border border-[#d7dce9] bg-[#f6f7fb] p-5 md:p-8 lg:p-10",
        className,
      )}
    >
      <ScrollReveal reduced={reduced} y={12}>
        <div className="flex flex-col gap-6 border-b border-[#d7dce9] pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0f5cc0]">
              {eyebrow}
            </p>
            <h2 className="mt-2 text-balance text-[clamp(1.75rem,4vw,2.75rem)] font-black leading-[1.05] tracking-[-0.03em] text-[#181818]">
              {headline}
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-[#4c5366]">
              {description}
            </p>
          </div>
          <Link
            href={viewAllHref}
            className="inline-flex h-fit shrink-0 rounded-md border border-[#181818] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#181818] transition-[background-color,color,transform] duration-200 hover:bg-[#181818] hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5cc0]"
          >
            {viewAllLabel}
          </Link>
        </div>
      </ScrollReveal>

      {showStoryReel && stories.length > 0 ? (
        <ScrollReveal reduced={reduced} y={16} className="mt-8">
          <div className="overflow-hidden rounded-xl border border-[#d7dce9] bg-[#0a0a0a]">
            <div className="aspect-[21/9] min-h-[12rem] w-full">
              <StoryReel
                stories={stories}
                variant="softree"
                autoPlayInterval={5500}
                enableKeyboard={false}
                className="h-full w-full"
                minHeight="100%"
              />
            </div>
          </div>
        </ScrollReveal>
      ) : null}

      {posts.length > 0 ? (
        <div
          className={cn(
            "grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-10",
            showStoryReel && stories.length > 0 ? "mt-8" : "mt-10",
          )}
        >
          <nav aria-label="Article index">
            <ScrollReveal reduced={reduced} delay={0.04}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[#787774]">
                Latest · {posts.length} articles
              </p>
            </ScrollReveal>
            <LayoutGroup id="blog-bento-index">
              <ol>
                {posts.map((post, i) => (
                  <BlogRow
                    key={post.id}
                    post={post}
                    index={i}
                    isActive={active?.id === post.id}
                    reduced={reduced}
                    onHover={select}
                    onFocus={selectImmediate}
                  />
                ))}
              </ol>
            </LayoutGroup>
          </nav>

          <BentoPreviewPanel item={previewItem} reduced={reduced} accent="blue" />
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-[#787774]">No articles yet.</p>
      )}
    </section>
  );
}

export default BentoGridLayout;
