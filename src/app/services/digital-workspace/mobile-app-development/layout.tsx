import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Development Services | Softree Technology",
  description:
    "Custom mobile app development — iOS, Android, and cross-platform solutions using React Native, Flutter, and native technologies by Softree Technology.",
  alternates: {
    canonical: "https://www.softreetechnology.com/services/digital-workspace/mobile-app-development",
  },
  openGraph: {
    title: "Mobile App Development | Softree Technology",
    description:
      "iOS, Android, and cross-platform mobile apps — React Native, Flutter, and native development for enterprises.",
    url: "https://www.softreetechnology.com/services/digital-workspace/mobile-app-development",
    siteName: "Softree Technology",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Mobile App Development" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile App Development | Softree Technology",
    description: "Custom iOS, Android, and cross-platform mobile applications.",
    images: ["/og-image.png"],
  },
};

export default function MobileAppDevLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
