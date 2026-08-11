import Image from "next/image";
import Link from "next/link";
import { SOFTREE_OFFICE_GALLERY_COLUMNS } from "@/data/softree-offices";

export type GalleryImage = {
  src: string;
  alt: string;
};

export type OfficeColumn = {
  city: string;
  addressLines: string[];
  image: GalleryImage;
};

export type GalleryProps = {
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
  offices?: OfficeColumn[];
};

function PortraitPanel({
  image,
  priority,
}: {
  image: GalleryImage;
  priority?: boolean;
}) {
  return (
    <article className="relative w-full">
      <div className="relative mx-auto aspect-[3/4] w-full max-h-[min(52vh,520px)] max-w-[300px] overflow-hidden bg-white/5 sm:max-w-none sm:max-h-[min(48vh,480px)]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 28vw, 90vw"
          className="object-cover object-center"
        />
      </div>
    </article>
  );
}

export default function Gallery({
  title = "Pay Us A Visit",
  ctaLabel = "BOOK A VISIT →",
  ctaHref = "/contact",
  offices = SOFTREE_OFFICE_GALLERY_COLUMNS,
}: GalleryProps = {}) {
  return (
    <section className="relative w-full py-20 md:py-24 bg-white text-neutral-900">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header Section (Outside the card, on white bg) */}
        <div className="flex flex-col gap-5 mb-12 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
            {title}
          </h2>
          <Link
            href={ctaHref}
            className="inline-flex w-max items-center border border-neutral-350 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-950 hover:bg-neutral-950 hover:text-white transition-colors sm:text-[12px] rounded-lg"
          >
            {ctaLabel}
          </Link>
        </div>

        {/* Beautiful Floating Black Card Wrapper */}
        <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-neutral-950 border border-neutral-800/40 p-8 sm:p-10 md:p-12 lg:p-14 text-white shadow-2xl">
          <div className="grid grid-cols-1 border-y border-white/10 sm:grid-cols-3">
            {offices.map((office, index) => (
              <div
                key={office.city}
                className={`flex flex-col ${
                  index < offices.length - 1
                    ? "border-b border-white/10 sm:border-b-0 sm:border-r border-white/10"
                    : ""
                }`}
              >
                <div className="px-4 py-5 sm:px-5 sm:py-6 lg:px-6">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/80 sm:text-[14px]">
                    {office.city}
                  </p>
                  <address className="mt-3 max-w-[20rem] space-y-0.5 not-italic text-[13px] leading-[1.6] text-white/50 sm:text-[14px]">
                    {office.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
                <div className="mt-auto border-t border-white/10 px-3 pb-3 pt-0 sm:border-t-0 sm:px-4 sm:pb-4">
                  <PortraitPanel image={office.image} priority={index === 0} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
