import { galleryAsset } from "@/data/office-gallery";

export type GalleryPhoto = {
  src: string;
  alt: string;
  /** Visual weight for mosaic / marquee rhythm */
  aspect?: "tall" | "wide" | "square";
};

/** All workspace imagery under `public/Gallery`. */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: galleryAsset("Prestige Bangalore-1.webp"),
    alt: "Softree Bengaluru reception lounge",
    aspect: "tall",
  },
  {
    src: galleryAsset("Prestige Bangalore-2.webp"),
    alt: "Softree huddle room",
    aspect: "square",
  },
  {
    src: galleryAsset("Prestige Bangalore-3.webp"),
    alt: "Softree open-plan workspace",
    aspect: "wide",
  },
  {
    src: galleryAsset("Prestige Bangalore-4.webp"),
    alt: "Softree breakout pods",
    aspect: "tall",
  },
  {
    src: galleryAsset("Prestige Bangalore-5.webp"),
    alt: "Softree café and lunch area",
    aspect: "square",
  },
  {
    src: galleryAsset("Prestige Bangalore-6.webp"),
    alt: "Prestige Tech Platina 2 — Bengaluru campus",
    aspect: "wide",
  },
  {
    src: galleryAsset("Prestige Bangalore-7.webp"),
    alt: "Softree conference room — The Circus",
    aspect: "tall",
  },
  {
    src: galleryAsset("bangaloreoffice.png"),
    alt: "Softree Bengaluru office exterior — Prestige Tech Park",
    aspect: "wide",
  },
  {
    src: galleryAsset("Image.jpg"),
    alt: "Softree San Francisco workspace",
    aspect: "tall",
  },
  {
    src: galleryAsset("anmol-jain-xZNZdWMzlnE-unsplash.jpg"),
    alt: "Collaboration space — natural light",
    aspect: "square",
  },
  {
    src: galleryAsset("arlington-research-kN_kViDchA0-unsplash.jpg"),
    alt: "Modern office interior",
    aspect: "wide",
  },
  {
    src: galleryAsset("nastuh-abootalebi-yWwob8kwOCk-unsplash.jpg"),
    alt: "Open-plan engineering floor",
    aspect: "tall",
  },
  {
    src: galleryAsset("download.jpg"),
    alt: "Softree team workspace",
    aspect: "square",
  },
  {
    src: galleryAsset("download (1).jpg"),
    alt: "Softree office — team area",
    aspect: "wide",
  },
];

export function splitGalleryRows(
  photos: GalleryPhoto[] = GALLERY_PHOTOS,
): [GalleryPhoto[], GalleryPhoto[]] {
  const rowA: GalleryPhoto[] = [];
  const rowB: GalleryPhoto[] = [];
  photos.forEach((photo, index) => {
    if (index % 2 === 0) rowA.push(photo);
    else rowB.push(photo);
  });
  return [rowA, rowB];
}
