import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";

export const metadata: Metadata = applyPageOg("/services/offshore-mobile-app-development", {
  title: {
    absolute: "Offshore Mobile App Development Services | Softree",
  },
  description:
    "Scale your business with offshore mobile app development services from Softree. Build custom iOS, Android, Flutter, and React Native applications.",
  keywords: [
    "Mobile App Development Services",
    "Offshore Mobile App Development",
    "iOS App Development",
    "Android App Development",
    "Cross-Platform Mobile App Development",
    "Flutter App Development",
    "React Native Development",
    "White-Label Mobile App Development",
    "Offshore Mobile App Developers",
    "hire offshore mobile app development team",
    "mobile application development company",
    "custom enterprise mobile app development",
    "offshore software engineering partner",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services/offshore-mobile-app-development",
  },
  openGraph: {
    title: "Offshore Mobile App Development Services | Softree",
    description:
      "Scale your business with offshore mobile app development services from Softree. Build custom iOS, Android, Flutter, and React Native applications.",
    url: "https://www.softreetechnology.com/services/offshore-mobile-app-development",
    siteName: "Softree Technology",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Offshore Mobile App Development Services | Softree",
    description:
      "Scale your business with offshore mobile app development services from Softree. Build custom iOS, Android, Flutter, and React Native applications.",
  },
});

export default function OffshoreMobileAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
