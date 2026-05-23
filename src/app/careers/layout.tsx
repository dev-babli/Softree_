import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Softree Technology - Join Our Team",
  description:
    "Explore exciting career opportunities at Softree Technology. Join our team of AI, Power Platform, and web development experts building enterprise solutions.",
  alternates: {
    canonical: "https://www.softreetechnology.com/careers",
  },
  openGraph: {
    title: "Careers | Softree Technology",
    description:
      "Join Softree Technology and work on cutting-edge AI, cloud, and enterprise software projects with a global team.",
    url: "https://www.softreetechnology.com/careers",
    siteName: "Softree Technology",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Softree Technology Careers" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Softree Technology",
    description:
      "Explore career opportunities at Softree Technology in AI, Power Platform, and modern web development.",
    images: ["/og-image.png"],
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
