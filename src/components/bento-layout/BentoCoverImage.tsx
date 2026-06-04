"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BENTO_IMAGE_FALLBACK } from "./bento-media";

type BentoCoverImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function BentoCoverImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: BentoCoverImageProps) {
  const [resolved, setResolved] = useState(src);

  useEffect(() => {
    setResolved(src);
  }, [src]);

  return (
    <Image
      src={resolved}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      unoptimized
      className={cn("object-cover", className)}
      onError={() => {
        if (resolved !== BENTO_IMAGE_FALLBACK) {
          setResolved(BENTO_IMAGE_FALLBACK);
        }
      }}
    />
  );
}
