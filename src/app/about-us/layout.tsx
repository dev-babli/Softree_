import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Softree Technology - AI & Enterprise Solutions",

  description:
    "Learn about Softree Technology, a leader in AI, cloud, and custom software development with a global presence and proven expertise.",

  keywords: [
    "About Softree Technology",
    "AI development company",
    "enterprise software development",
    "cloud solutions India",
    "software company profile",
    "IT consulting firm",
  ],

  alternates: {
    canonical: "https://www.softreetechnology.com/about-us",
  },

  openGraph: {
    title: "About Us | Softree Technology",
    description:
      "Learn about Softree Technology's journey, expertise, and commitment to delivering cutting-edge AI and enterprise solutions worldwide.",
    url: "https://www.softreetechnology.com/about-us",
    siteName: "Softree Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Technology",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About Us | Softree Technology",
    description:
      "Learn about Softree Technology, a leader in AI, cloud, and custom software development with a global presence.",
    images: ["/og-image.png"],
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
