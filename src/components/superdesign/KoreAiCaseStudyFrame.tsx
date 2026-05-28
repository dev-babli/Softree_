"use client"

export default function KoreAiCaseStudyFrame() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
      <iframe
        title="SuperDesign kore.ai case study"
        src="/superdesign/kore-ai/index.html"
        className="h-[85vh] min-h-[780px] w-full border-0"
        loading="lazy"
      />
    </div>
  )
}
