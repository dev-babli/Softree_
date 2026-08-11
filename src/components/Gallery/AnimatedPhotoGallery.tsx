"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  GALLERY_PHOTOS,
  splitGalleryRows,
  type GalleryPhoto,
} from "@/data/gallery-photos";
import "./animated-photo-gallery.css";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ASPECT_CLASS: Record<NonNullable<GalleryPhoto["aspect"]>, string> = {
  tall: "h-[220px] sm:h-[260px] md:h-[300px]",
  wide: "h-[180px] sm:h-[210px] md:h-[240px]",
  square: "h-[200px] sm:h-[230px] md:h-[260px]",
};

export type AnimatedPhotoGalleryProps = {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  images?: GalleryPhoto[];
  className?: string;
};

function GalleryFrame({
  photo,
  priority,
}: {
  photo: GalleryPhoto;
  priority?: boolean;
}) {
  const aspect = photo.aspect ?? "square";
  return (
    <figure
      className={`group/shot relative w-[min(72vw,280px)] shrink-0 overflow-hidden rounded-2xl bg-neutral-200/80 sm:w-[300px] md:w-[320px] ${ASPECT_CLASS[aspect]}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 72vw, 320px"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover/shot:scale-[1.04]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/shot:opacity-100"
      />
      <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-2 px-4 pb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white/90 opacity-0 transition-all duration-500 group-hover/shot:translate-y-0 group-hover/shot:opacity-100">
        {photo.alt}
      </figcaption>
    </figure>
  );
}

function MarqueeRail({
  photos,
  direction,
  priorityFirst,
}: {
  photos: GalleryPhoto[];
  direction: "left" | "right";
  priorityFirst?: boolean;
}) {
  const loop = [...photos, ...photos];
  const trackClass =
    direction === "left"
      ? "softree-gallery-track softree-gallery-track--left"
      : "softree-gallery-track softree-gallery-track--right";

  return (
    <div className="softree-gallery-rail relative w-full overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24"
      />
      <div className={trackClass}>
        {loop.map((photo, index) => (
          <GalleryFrame
            key={`${photo.src}-${index}`}
            photo={photo}
            priority={priorityFirst && index === 0}
          />
        ))}
      </div>
    </div>
  );
}

function StaticGalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {photos.map((photo, index) => (
        <GalleryFrame key={photo.src} photo={photo} priority={index < 2} />
      ))}
    </div>
  );
}

export default function AnimatedPhotoGallery({
  eyebrow = "Inside Softree",
  title = "Spaces built for",
  titleAccent = "focused work.",
  description = "Bengaluru, Cuttack, and San Francisco — real floors, huddle rooms, and teams shipping enterprise software every day.",
  ctaLabel = "Book a visit",
  ctaHref = "/contact",
  images = GALLERY_PHOTOS,
  className = "",
}: AnimatedPhotoGalleryProps) {
  const reduceMotion = useReducedMotion();
  const [rowA, rowB] = splitGalleryRows(images);

  return (
    <section
      className={`relative w-full overflow-hidden bg-white py-20 md:py-24 ${className}`.trim()}
      aria-labelledby="animated-photo-gallery-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[20%] top-[10%] h-[420px] w-[420px] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(24,82,255,0.22) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[15%] bottom-[5%] h-[380px] w-[380px] rounded-full opacity-35 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,88,18,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-[720px]">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/18 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1852FF]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF5812]" />
              {eyebrow}
            </span>
            <h2
              id="animated-photo-gallery-heading"
              className="text-3xl md:text-5xl font-bold tracking-tight text-[#0a0a1a] leading-tight"
            >
              {title}{" "}
              <span className="bg-gradient-to-r from-[#1852FF] to-[#FF5812] bg-clip-text text-transparent">
                {titleAccent}
              </span>
            </h2>
            <p className="mt-4 max-w-[560px] text-[15px] leading-[1.65] text-[#2a3348]/85 md:text-base">
              {description}
            </p>
          </div>
          <Link
            href={ctaHref}
            className="inline-flex w-max shrink-0 items-center justify-center rounded-full border border-[#0a0a1a]/12 bg-white px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0a0a1a] shadow-sm transition hover:border-[#1852FF]/30 hover:text-[#1852FF]"
          >
            {ctaLabel}
          </Link>
        </motion.div>

        {reduceMotion ? (
          <div className="space-y-5">
            <StaticGalleryGrid photos={rowA} />
            <StaticGalleryGrid photos={rowB} />
          </div>
        ) : (
          <div className="space-y-4 md:space-y-5">
            <MarqueeRail photos={rowA} direction="left" priorityFirst />
            <MarqueeRail photos={rowB} direction="right" />
          </div>
        )}
      </div>
    </section>
  );
}
