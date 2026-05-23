import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import CaseStudyGridPremium from "../web/case-study-grid-premium"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import { Metadata } from "next"

const mobileCaseStudyFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What types of mobile app case studies do you feature?",
    answer:
      "Our mobile case studies showcase native iOS and Android applications, cross-platform solutions, progressive web apps, and enterprise mobile solutions. We highlight the challenges, technical approaches, and business outcomes for each project.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "What mobile technologies are used in your projects?",
    answer:
      "We use modern mobile technologies including React Native, Flutter, Swift, Kotlin, and cross-platform frameworks. Each case study details the specific technology stack and development approach used.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How do you measure success in mobile app projects?",
    answer:
      "We measure success through metrics like user engagement, app store ratings, download numbers, retention rates, and business impact. Our case studies include quantitative results and user feedback.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can you build similar mobile apps for my business?",
    answer:
      "Yes, we can build similar mobile solutions tailored to your specific business requirements. Contact us to discuss your project and we can provide a detailed proposal based on our proven mobile implementations.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What industries do you serve with mobile solutions?",
    answer:
      "We serve various industries including healthcare, finance, e-commerce, education, and logistics. Our mobile case studies demonstrate our expertise across different sectors and use cases.",
  },
]

export const metadata: Metadata = {
  title: "Mobile App Case Studies | Softree Technology",
  description:
    "Explore our mobile app development case studies showcasing iOS, Android, and cross-platform applications.",
  keywords: [
    "mobile app case studies",
    "iOS development",
    "Android development",
    "React Native",
    "Flutter",
    "mobile app examples",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/case-studies/mobile",
  },
  openGraph: {
    title: "Mobile App Case Studies | Softree Technology",
    description:
      "Mobile app development case studies by Softree Technology.",
    url: "https://www.softreetechnology.com/case-studies/mobile",
    siteName: "Softree Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Technology Mobile Case Studies",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile App Case Studies | Softree Technology",
    description:
      "Mobile app development case studies by Softree Technology.",
    images: ["/og-image.png"],
  },
}

export default function MobileCaseStudiesPagePremium() {
  return (
    <>
      <NavigationClient />
      <main className="relative bg-[#050505]">
        {/* Premium Hero Section */}
        <section className="relative w-full min-h-[60vh] flex flex-col justify-center py-24 md:py-32 lg:py-40 overflow-hidden">
          {/* Ambient Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C86E4B]/15 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-[#1852FF]/10 rounded-full blur-[150px]" />
          </div>

          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />

          {/* Background Grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }} />

          <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
            {/* Outer Shell */}
            <div className="relative max-w-3xl bg-white/5 rounded-3xl p-1 ring-1 ring-white/10">
              {/* Inner Core */}
              <div className="relative rounded-[calc(1.5rem-0.25rem)] bg-[#0a0a1a]/80 p-8 md:p-12 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                {/* Badge */}
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-[#C86E4B]/10 rounded-full blur-lg" />
                  <span className="relative inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C86E4B] px-4 py-2 rounded-full border border-[#C86E4B]/20 bg-[#C86E4B]/5 backdrop-blur-sm">
                    Mobile Development
                  </span>
                </div>

                <h1 className="text-[clamp(36px,5vw,64px)] font-black leading-[1.1] text-white mb-6">
                  Mobile App Case Studies
                </h1>

                <p className="text-sm leading-relaxed text-white/50 font-light max-w-2xl mb-8">
                  Explore how we design and build native and cross-platform mobile applications 
                  that deliver exceptional user experiences and drive business growth across iOS and Android.
                </p>

                {/* Stats */}
                <div className="flex gap-6 flex-wrap">
                  {[
                    { value: "25+", label: "Mobile Apps" },
                    { value: "4.8", label: "App Rating" },
                    { value: "1M+", label: "Downloads" },
                  ].map((stat) => (
                    <div key={stat.label} className="relative">
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-[0.05em]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Case Study Grid */}
        <CaseStudyGridPremium />
        
        <LightContactSection />
        <LightFAQExact faqs={mobileCaseStudyFAQs} />
      </main>
      <Footer />
    </>
  )
}
