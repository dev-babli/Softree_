"use client";

import { cn } from "@/lib/utils";
import { BentoCoverImage } from "./BentoCoverImage";

export function BentoIndexThumb({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-lg border border-zinc-200/50 shadow-sm",
        className,
      )}
    >
      <BentoCoverImage src={src} alt={alt} sizes="80px" className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none" />
    </div>
  );
}
