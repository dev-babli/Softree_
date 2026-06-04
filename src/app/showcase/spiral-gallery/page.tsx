"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const SpiralGallery = dynamic(() => import("@/components/showcase/spiral-gallery/SpiralGallery"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center bg-[#fafafa] text-[13px] text-black/40">
      Loading spiral gallery…
    </div>
  ),
});

/** Framer spiral 3D gallery — exact param clone */
export default function SpiralGalleryShowcasePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-6 py-4">
        <Link href="/showcase" className="pointer-events-auto text-[12px] text-black/40 hover:text-black/80">
          ← Showcase
        </Link>
        <Link href="/" className="pointer-events-auto text-[12px] text-black/40 hover:text-black/80">
          Homepage
        </Link>
      </div>

      <main className="mx-auto flex min-h-screen max-w-[1200px] flex-col justify-center px-0 py-16">
        <SpiralGallery className="h-[min(800px,100vh)] w-full" />
      </main>
    </div>
  );
}
