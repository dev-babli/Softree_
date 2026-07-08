"use client"

import dynamic from "next/dynamic"

const SoftreeAgenticApp = dynamic(() => import("./softree-agentic/App.jsx"), {
  ssr: false,
})

export default function SoftreeAgenticCaseStudyInteractive() {
  return (
    <div className="overflow-hidden rounded-[12px] bg-[#f0f6f9] shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
      <SoftreeAgenticApp />
    </div>
  )
}
