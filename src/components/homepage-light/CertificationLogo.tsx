"use client";

import Image from "next/image";
import { useState } from "react";
import type { CertificationLogo as CertificationLogoType } from "@/lib/certifications";

type Props = {
  item: CertificationLogoType;
  className?: string;
};

/** Local `/public` asset first; falls back to WordPress CDN if file is missing. */
export default function CertificationLogo({ item, className }: Props) {
  const [src, setSrc] = useState(item.src);

  return (
    <Image
      src={src}
      alt={item.alt}
      width={220}
      height={220}
      unoptimized
      className={className}
      onError={() => {
        if (src !== item.remoteSrc) setSrc(item.remoteSrc);
      }}
    />
  );
}
