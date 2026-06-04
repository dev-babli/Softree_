import type { GalleryImage } from "@/components/Gallery/Gallery";

/** Safe public URL for filenames with spaces or parentheses */
export function galleryAsset(filename: string): string {
  return `/Gallery/${encodeURIComponent(filename)}`;
}

export type OfficeLocation = {
  id: string;
  city: string;
  country: string;
  /** Optional short badge on the location tab */
  label?: string;
  addressLines: string[];
  mapQuery?: string;
  images: GalleryImage[];
};

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: "san-francisco",
    city: "San Francisco",
    country: "United States",
    addressLines: [
      "28 Geary St., Suite 650",
      "San Francisco, CA 94108",
      "United States",
    ],
    mapQuery: "28+Geary+St+Suite+650+San+Francisco+CA+94108",
    images: [
      {
        src: galleryAsset("Image.jpg"),
        alt: "Softree San Francisco office — workspace",
      },
      {
        src: galleryAsset("anmol-jain-xZNZdWMzlnE-unsplash.jpg"),
        alt: "San Francisco office interior — collaboration space",
      },
      {
        src: galleryAsset("arlington-research-kN_kViDchA0-unsplash.jpg"),
        alt: "San Francisco office — modern workspace",
      },
      {
        src: galleryAsset("nastuh-abootalebi-yWwob8kwOCk-unsplash.jpg"),
        alt: "San Francisco office — open plan",
      },
      {
        src: galleryAsset("download.jpg"),
        alt: "Softree San Francisco office",
      },
      {
        src: galleryAsset("download (1).jpg"),
        alt: "Softree San Francisco office — team area",
      },
    ],
  },
  {
    id: "cuttack",
    city: "Cuttack",
    country: "India",
    addressLines: [
      "Softree Technology Pvt. Ltd.",
      "PLOT 5C/1283, SECTOR-10, CDA",
      "Cuttack, Odisha 753014",
      "India",
    ],
    mapQuery: "CDA+Sector+10+Cuttack+Odisha+753014",
    images: [
      {
        src: galleryAsset("Prestige Bangalore-1.webp"),
        alt: "Softree India headquarters — Cuttack region delivery hub",
      },
      {
        src: galleryAsset("Prestige Bangalore-6.webp"),
        alt: "Softree India — engineering workspace",
      },
      {
        src: galleryAsset("Image.jpg"),
        alt: "Softree India office environment",
      },
    ],
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    country: "India",
    addressLines: [
      "Softree Technology Pvt. Ltd.",
      "11th Floor, Prestige Tech Park, Platina 2",
      "Outer Ring Rd, Kadubeesanahalli",
      "Bengaluru, Karnataka 560087",
      "India",
    ],
    mapQuery: "Prestige+Tech+Park+Platina+2+Bengaluru+Karnataka+560087",
    images: [
      {
        src: galleryAsset("Prestige Bangalore-1.webp"),
        alt: "Softree Bengaluru reception lounge",
      },
      {
        src: galleryAsset("Prestige Bangalore-2.webp"),
        alt: "Softree huddle room — Bengaluru",
      },
      {
        src: galleryAsset("Prestige Bangalore-3.webp"),
        alt: "Softree open-plan workspace — Bengaluru",
      },
      {
        src: galleryAsset("Prestige Bangalore-4.webp"),
        alt: "Softree breakout pods — Bengaluru",
      },
      {
        src: galleryAsset("Prestige Bangalore-5.webp"),
        alt: "Softree café and lunch area — Bengaluru",
      },
      {
        src: galleryAsset("Prestige Bangalore-6.webp"),
        alt: "Prestige Tech Platina 2 — Bengaluru campus",
      },
      {
        src: galleryAsset("Prestige Bangalore-7.webp"),
        alt: "Softree conference room — The Circus, Bengaluru",
      },
    ],
  },
];
