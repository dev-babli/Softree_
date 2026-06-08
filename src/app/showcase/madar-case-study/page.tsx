"use client"

import Link from "next/link"
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import {
  MadarStickyStoryPage,
  YAMAMA_MADAR_DEFAULT,
} from "@/components/case-studies/layouts/variants/madar-sticky-story"

/** Isolated Madar × Yamama case study clone — exact 4-section sticky story */
export default function MadarCaseStudyShowcasePage() {
  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      <NavigationClient />
      <div className="madar-container" style={{ paddingTop: "1rem", paddingBottom: "0.5rem" }}>
        <Link
          href="/"
          className="text-[12px] font-medium text-[#172e64]/45 hover:text-[#172e64]"
        >
          ← Homepage
        </Link>
      </div>
      <MadarStickyStoryPage data={YAMAMA_MADAR_DEFAULT} />
      <Footer />
    </div>
  )
}
