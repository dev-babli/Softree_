"use client";

import { useEffect, useState } from "react";

const STORY_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&h=1080&q=85";

export function StoryCoverImage({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const [resolved, setResolved] = useState(src);

  useEffect(() => {
    setResolved(src);
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved}
      alt=""
      decoding="async"
      className={className}
      onError={() => {
        if (resolved !== STORY_IMAGE_FALLBACK) {
          setResolved(STORY_IMAGE_FALLBACK);
        }
      }}
    />
  );
}
