import { SoftreeStoryReelHero } from "@/components/story-reel";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { BentoGridLayout, BentoWireframe } from "@/components/bento-layout";
import {
  demoBlogPosts,
  demoCaseStudies,
  demoStories,
  demoTestimonials,
} from "./demo-content";

export default function StoryReelDemoPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8F9FA] pb-24">
      <SoftreeStoryReelHero stories={demoStories} autoPlayInterval={5500} />

      <section className="bg-[#F3F0EE] px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto w-full max-w-[1100px]">
          <TestimonialSlider
            slides={demoTestimonials}
            eyebrowLabel="Client stories"
            variant="softree"
          />
        </div>
      </section>

      <section className="mt-16 border-t border-black/5 px-4 pt-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#FF5812]">
            Selected Works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            Bento layout
          </h2>
        </div>
        <BentoWireframe stories={demoStories} caseStudies={demoCaseStudies} />
      </section>

      <section className="mt-16 border-t border-[#d7dce9] px-4 pt-16">
        <BentoGridLayout posts={demoBlogPosts} />
      </section>
    </main>
  );
}
