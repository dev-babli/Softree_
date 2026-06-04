import Image from "next/image";
import Link from "next/link";

/** Side-by-side reference — your shared mockup PNG at native 682×1024 */
export default function HeroIntroReferencePage() {
  return (
    <div className="min-h-screen bg-[#eee] py-8">
      <div className="mx-auto mb-6 flex max-w-[682px] justify-between px-4 text-[12px]">
        <Link href="/showcase/hero-intro" className="text-[#111]/50 hover:text-[#111]">
          ← Live build
        </Link>
        <span className="text-[#111]/35">Reference PNG (682×1024)</span>
      </div>
      <Image
        src="/showcase/avoora-reference-full.png"
        alt="Avoora reference mockup"
        width={682}
        height={1024}
        className="mx-auto h-auto w-full max-w-[682px] shadow-lg"
        priority
        unoptimized
      />
    </div>
  );
}
