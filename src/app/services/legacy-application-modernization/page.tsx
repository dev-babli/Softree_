import { Metadata } from "next"
import NavigationClient from "@/components/sections/navigation-client"
import HeroSection from "./hero"
import Footer from "@/components/sections/footer"
import ProblemSection from "./problem"
import ModernizeSection from "./modern-services"
import TransformationSection from "./before-after"
import PlatformSection from "./platform"
import IndustriesWeSupport from "./industries"
import ProcessSection from "./process"  
import WhyChooseSoftree from "./why"
import LightContactSection from "@/components/homepage-light/LightContactSection"

export const metadata: Metadata = {
  title: "Application Modernization & Cloud Migration Services | Softree",
  description: "Modernize legacy applications with Softree’s migration and modernization services. Upgrade outdated systems to cloud-native, scalable, secure, and high-performance platforms.",
  keywords: [
    "Legacy system modernization services",
    "Application modernization services",
    "Legacy application migration",
    "SharePoint modernization",
    "WinForms to React migration",
    "Power Platform migration",
    "Offshore enterprise modernization",
    "Workflow automation",
    "Cloud migration",
    "Outdated software migration"
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services/legacy-application-modernization",
  },
  openGraph: {
    title: "Application Modernization & Cloud Migration Services | Softree",
    description: "Modernize legacy applications with Softree’s migration and modernization services. Upgrade outdated systems to cloud-native, scalable, secure, and high-performance platforms.",
    url: "https://www.softreetechnology.com/services/legacy-application-modernization",
    siteName: "Softree Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Legacy Modernization Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Application Modernization & Cloud Migration Services | Softree",
    description: "Modernize legacy applications with Softree’s migration and modernization services. Upgrade outdated systems to cloud-native, scalable, secure, and high-performance platforms.",
    images: ["/og-image.png"],
  },
}

export default function LegacyModernization() {
    return <div>
        <h1 className="sr-only">Legacy Modernization Services</h1>
        <NavigationClient />
        <HeroSection/>
        <ProblemSection />
        <ModernizeSection />
        <TransformationSection />
        <PlatformSection />
        <IndustriesWeSupport/>
        <ProcessSection />
        <WhyChooseSoftree/>
        <LightContactSection/>
        <Footer />
    </div>
}