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
    <section className="bg-[#000000] text-white">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 pt-8 sm:flex-row sm:items-end sm:justify-between sm:pt-10 lg:pt-12">
          <h2 className="text-[clamp(2.25rem,6.5vw,5.75rem)] font-bold leading-[0.92] tracking-[-0.04em]">
            {title}
          </h2>
          <Link
            href={ctaHref}
            className="inline-flex w-max items-center border border-white/20 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-black sm:text-[12px]"
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 border-y border-white/10 sm:mt-6 sm:grid-cols-3">
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
    </section>
  );
}
