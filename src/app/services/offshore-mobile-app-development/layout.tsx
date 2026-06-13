import type { Metadata } from "next";

import { applyPageOg } from "@/lib/site-metadata";

export const metadata: Metadata = applyPageOg("/services/offshore-mobile-app-development", {
  title:
    "Mobile App Development Services | iOS, Android & Cross-Platform Solutions",

  description:
    "Build scalable mobile applications with our mobile app development services. We create high-performance iOS, Android, and cross-platform apps with modern UI/UX, cloud integration, and enterprise-grade security.",

  keywords: [
    "mobile app development",
    "iOS app development",
    "Android app development",
    "cross-platform app development",
    "React Native development",
    "Flutter app development",
    "enterprise mobile solutions",
    "custom mobile applications",
    "mobile UI UX design",
    "app development company",
  ],

  openGraph: {
    title:
      "Mobile App Development Services | iOS & Android Apps",
    description:
      "Custom iOS, Android, and cross-platform mobile app solutions for startups and enterprises.",
    url: "https://www.softreetechnology.com/services/offshore-mobile-app-development",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    title:
      "Mobile App Development Services",
    description:
      "Scalable iOS, Android, and cross-platform mobile applications built for modern businesses.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-mobile-app-development",
  },
}, "Mobile App Development Services");

export default function MobileAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
