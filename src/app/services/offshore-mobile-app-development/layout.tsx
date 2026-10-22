import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";

export const metadata: Metadata = applyPageOg("/services/offshore-mobile-app-development", {
  title: {
    absolute: "Offshore Mobile App Development Services | Softree",
  },
  description:
    "Custom mobile app development services. Build native iOS, Android, React Native, and Flutter applications with Softree’s dedicated offshore engineering pods.",
  keywords: [
    "mobile app development services",
    "offshore mobile app development",
    "custom mobile app development",
    "React Native development",
    "Flutter app development",
    "iOS app development",
    "Android app development",
    "cross-platform mobile app development",
    "hire offshore mobile developers",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services/offshore-mobile-app-development",
  },
  openGraph: {
    title: "Offshore Mobile App Development Services | Softree",
    description:
      "Custom mobile app development services. Build native iOS, Android, React Native, and Flutter applications with Softree’s dedicated offshore engineering pods.",
    url: "https://www.softreetechnology.com/services/offshore-mobile-app-development",
    siteName: "Softree Technology",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Offshore Mobile App Development Services | Softree",
    description:
      "Custom mobile app development services. Build native iOS, Android, React Native, and Flutter applications with Softree’s dedicated offshore engineering pods.",
  },
});

export default function OffshoreMobileAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
