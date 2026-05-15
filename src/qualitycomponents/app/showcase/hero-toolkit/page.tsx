import TransferredSoftreeHeroToolkit from "@/components/homepage/TransferredSoftreeHeroToolkit";

export const metadata = {
  title: "Hero Toolkit Showcase",
  description: "Standalone showcase for the Softree Hero Toolkit animation.",
};

export default function HeroToolkitShowcase() {
  return (
    <main className="min-h-screen bg-[#f6f6f6]">
      {/* 
        Rendering in isolation ensures no interference from homepage 
        intersection observers, lenis smooth scroll conflicts (if scoped),
        or heavy adjacent components.
      */}
      <TransferredSoftreeHeroToolkit />
      
      {/* 
        Add some padding below so we can actually scroll past the pinned section
        to test the exit behavior and scroll un-pinning.
      */}
      <div className="h-[100vh] w-full flex items-center justify-center bg-zinc-900 text-white">
        <h2 className="text-2xl font-bold">End of Hero Component</h2>
      </div>
    </main>
  );
}
