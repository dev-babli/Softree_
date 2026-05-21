import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Softree Technology - AI & Enterprise Solutions",
  description:
    "Get in touch with Softree Technology. Contact us for AI solutions, enterprise software development, and expert IT consulting services.",
  keywords: [
    "Contact Softree",
    "AI development company",
    "enterprise software development",
    "AI consulting",
    "software development India",
    "IT services",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/contact",
  },
  openGraph: {
    title: "Contact | Softree Technology - AI & Enterprise Solutions",
    description:
      "Get in touch with Softree Technology for AI, cloud, and enterprise software solutions.",
    url: "https://www.softreetechnology.com/contact",
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
    title: "Contact | Softree Technology - AI & Enterprise Solutions",
    description:
      "Connect with Softree Technology for AI, cloud, and enterprise software development services.",
    images: ["/og-image.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
