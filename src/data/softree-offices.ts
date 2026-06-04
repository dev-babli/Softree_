import type { OfficeColumn } from "@/components/Gallery/Gallery";
import { galleryAsset } from "@/data/office-gallery";

/** Three-column “Pay Us A Visit” gallery (homepage, about, contact). */
export const SOFTREE_OFFICE_GALLERY_COLUMNS: OfficeColumn[] = [
  {
    city: "Bengaluru",
    addressLines: [
      "Softree Technology Pvt. Ltd.",
      "11th Floor, Prestige Tech Park, Platina 2",
      "Outer Ring Rd, Kadubeesanahalli",
      "Bengaluru, Karnataka 560087, India",
    ],
    image: {
      src: galleryAsset("bangaloreoffice.png"),
      alt: "Softree Bengaluru office — Prestige Tech Park building",
    },
  },
  {
    city: "Cuttack",
    addressLines: [
      "Softree Technology Pvt. Ltd.",
      "PLOT 5C/1283, SECTOR-10, CDA",
      "Cuttack, Odisha 753014",
      "India",
    ],
    image: {
      src: galleryAsset("Prestige Bangalore-7.webp"),
      alt: "Softree Cuttack office",
    },
  },
  {
    city: "San Francisco",
    addressLines: [
      "28 Geary St., Suite 650",
      "San Francisco, CA 94108",
      "United States",
    ],
    image: {
      src: galleryAsset("Image.jpg"),
      alt: "Softree San Francisco office",
    },
  },
];

/** Compact office list for contact CTA panels. */
export const SOFTREE_OFFICES_CONTACT = SOFTREE_OFFICE_GALLERY_COLUMNS.map(
  ({ city, addressLines }) => ({
    city,
    lines: addressLines,
  }),
);
