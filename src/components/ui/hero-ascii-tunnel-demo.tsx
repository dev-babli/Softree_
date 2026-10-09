import { VanishRun } from "@/components/ui/hero-ascii-tunnel";

export default function HeroAsciiTunnelDemo() {
  return (
    <VanishRun className="text-foreground">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Build at the speed of thought
      </h1>
      <p className="text-sm text-muted-foreground">
        A full-bleed ASCII tunnel that reacts to your cursor.
      </p>
      <button className="mt-2 rounded-md bg-[#006bff] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0059d1]">
        Get started
      </button>
    </VanishRun>
  );
}
