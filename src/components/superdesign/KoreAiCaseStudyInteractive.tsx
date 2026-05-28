"use client"

import dynamic from "next/dynamic"

const KoreAiApp = dynamic(() => import("./kore-ai/App.jsx"), {
  ssr: false,
})

export default function KoreAiCaseStudyInteractive() {
  return (
    <div className="overflow-hidden rounded-[12px] bg-[#f0f6f9] shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
      <KoreAiApp />
    </div>
  )
}
