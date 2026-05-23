import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Softree Technology Case Studies",
    default: "Case Studies | Softree Technology",
  },
  description:
    "Explore real-world case studies showcasing how Softree Technology delivers AI, Power Platform, SharePoint, and web solutions that drive measurable business results.",
  alternates: {
    canonical: "https://www.softreetechnology.com/case-studies",
  },
  openGraph: {
    title: "Case Studies | Softree Technology",
    description:
      "See how Softree Technology helped businesses transform with AI, Power Platform, and modern web development.",
    siteName: "Softree Technology",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Softree Technology Case Studies" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Softree Technology",
    description:
      "Real-world results from AI, Power Platform, and web development projects by Softree Technology.",
    images: ["/og-image.png"],
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
