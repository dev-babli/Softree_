import type { Metadata } from "next";

import { applyPageOg } from "@/lib/site-metadata";

export const metadata: Metadata = applyPageOg("/contact", {
  title: "Contact | Softree Technology - AI & Enterprise Solutions",
  description:
    "Contact Softree Technology — send a project inquiry, book a free discovery call via Calendly, or reach our Bengaluru, Cuttack, and San Francisco teams directly.",
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
    type: "website",
  },
  twitter: {
    title: "Contact | Softree Technology - AI & Enterprise Solutions",
    description:
      "Connect with Softree Technology for AI, cloud, and enterprise software development services.",
  },
}, "Contact Softree Technology");

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
