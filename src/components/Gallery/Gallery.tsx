import Image from "next/image";
import Link from "next/link";

export type GalleryImage = {
  src: string;
  alt: string;
  overlay?: string;
};

export type GalleryProps = {
  title?: string;
  tagline?: string;
  hashtag?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  images?: GalleryImage[];
};

const DEFAULT_IMAGES: GalleryImage[] = [
  /* URL-encode the space in filenames so the path is safe across hosts.
   * Some CDN edges 400 on raw spaces in URLs even though browsers tolerate
   * them locally. `%20` is universally accepted. */
  {
    src: "/Gallery/Prestige%20Bangalore-1.webp",
    alt: "Prestige Tech Park Bengaluru office workspace",
    overlay: "workspace — one",
  },
  {
    src: "/Gallery/Prestige%20Bangalore-2.webp",
    alt: "Prestige Tech Park Bengaluru office interior",
  },
  {
    src: "/Gallery/Prestige%20Bangalore-3.webp",
    alt: "Prestige Tech Park Bengaluru office collaboration area",
    overlay: "innovation — hub",
  },
];

function KnockoutOverlay({ text, imageSrc }: { text: string; imageSrc: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-5 sm:px-6 sm:pb-7 lg:px-8 lg:pb-9">
      <p
        aria-hidden
        className="select-none text-[clamp(2.75rem,8.5vw,7.25rem)] font-bold lowercase leading-[0.82] tracking-[-0.045em] text-white/25"
      >
        {text}
      </p>
      <p
        className="absolute inset-x-4 bottom-5 sm:inset-x-6 sm:bottom-7 lg:inset-x-8 lg:bottom-9 text-[clamp(2.75rem,8.5vw,7.25rem)] font-bold lowercase leading-[0.82] tracking-[-0.045em]"
        style={{
          backgroundImage: `url("${imageSrc}")`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function GalleryPanel({
  image,
  priority,
}: {
  image: GalleryImage;
  priority?: boolean;
}) {
  return (
    <article className="relative min-h-[52vh] sm:min-h-[58vh] lg:min-h-[72vh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover"
      />
      {image.overlay ? (
        <KnockoutOverlay text={image.overlay} imageSrc={image.src} />
      ) : null}
    </article>
  );
}

export default function Gallery({
  title = "prestige studio",
  tagline = "Building India's Most Beautiful Workspaces",
  hashtag = "#prestige_tech_park",
  description =
  "A glimpse into our Bengaluru studio — where teams design, build, and deliver enterprise solutions every day.",
  ctaLabel = "BOOK A VISIT →",
  ctaHref = "/contact",
  images = DEFAULT_IMAGES,
} = {} as GalleryProps) {
  const panels = images.slice(0, 3);

  return (
    <section className="bg-white text-black">
      <div className="w-full">
        {/* Title */}
        <div className="px-5 pt-10 sm:px-8 sm:pt-12 lg:px-10 lg:pt-14">
          <h2 className="text-[clamp(3.25rem,11.5vw,9.5rem)] font-bold lowercase leading-[0.88] tracking-[-0.045em]">
            {title}
          </h2>
        </div>

        {/* Three-column header — aligned to gallery grid below */}
        <div className="mt-6 grid grid-cols-1 border-y border-neutral-200/90 sm:mt-8 sm:grid-cols-3">
          <div className="border-b border-neutral-200/90 px-5 py-6 sm:border-b-0 sm:border-r sm:px-6 sm:py-8 lg:px-8">
            <p className="max-w-[16rem] text-[13px] leading-[1.55] text-neutral-500 sm:text-[14px]">
              {tagline}
            </p>
          </div>

          <div className="border-b border-neutral-200/90 px-5 py-6 sm:border-b-0 sm:border-r sm:px-6 sm:py-8 lg:px-8">
            <p className="text-[13px] font-medium leading-[1.55] text-neutral-800 sm:text-[14px]">
              {hashtag}
            </p>
            <p className="mt-3 max-w-[18rem] text-[13px] leading-[1.6] text-neutral-500 sm:text-[14px]">
              {description}
            </p>
          </div>

          <div className="flex items-start px-5 py-6 sm:justify-end sm:px-6 sm:py-8 lg:px-8">
            <Link
              href={ctaHref}
              className="inline-flex items-center border border-black px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:bg-black hover:text-white sm:text-[12px]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>

        {/* Three-column image gallery */}
        <div className="grid grid-cols-1 gap-[3px] bg-white sm:grid-cols-3">
          {panels.map((image, index) => (
            <GalleryPanel key={image.src} image={image} priority={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
