import { Metadata } from "next"
import { applyPageOg } from "@/lib/site-metadata"
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

export const metadata: Metadata = applyPageOg("/services/legacy-application-modernization", {
  title: {
    absolute: "Legacy App Modernization Services | Softree",
  },
  description: "Modernize legacy enterprise applications with Softree. Upgrade outdated systems to scalable cloud-native architectures, microservices, and modern web platforms.",
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
    title: "Legacy App Modernization Services | Softree",
    description: "Modernize legacy enterprise applications with Softree. Upgrade outdated systems to scalable cloud-native architectures, microservices, and modern web platforms.",
    url: "https://www.softreetechnology.com/services/legacy-application-modernization",
    siteName: "Softree Technology",
    type: "website",
  },
  twitter: {
    title: "Legacy App Modernization Services | Softree",
    description: "Modernize legacy enterprise applications with Softree. Upgrade outdated systems to scalable cloud-native architectures, microservices, and modern web platforms.",
  },
}, "Softree Legacy Modernization Services")

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