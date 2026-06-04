import { BENTO_ABSTRACT } from "@/components/bento-layout/bento-media";

export const WHY_US_BACKGROUNDS = {
  experienceMesh: BENTO_ABSTRACT.iridescent,
  satisfaction: BENTO_ABSTRACT.aurora,
  statsGlow: BENTO_ABSTRACT.spectrum,
} as const;

export type MarqueeTile = {
  id: string;
  image: string;
  label: string;
};

export const CAPABILITY_MARQUEE: MarqueeTile[] = [
  { id: "ai", image: BENTO_ABSTRACT.holographic, label: "AI & agents" },
  { id: "power", image: BENTO_ABSTRACT.fluidMesh, label: "Power Platform" },
  { id: "sp", image: BENTO_ABSTRACT.ember, label: "SharePoint" },
  { id: "cloud", image: BENTO_ABSTRACT.cobalt, label: "Cloud & Fabric" },
  { id: "web", image: BENTO_ABSTRACT.liquid, label: "Web & mobile" },
  { id: "data", image: BENTO_ABSTRACT.tealGlow, label: "Data & analytics" },
];

export const SOFTREE_IMPACT_STATS = [
  { value: "150+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
  { value: "12+", label: "Years engineering" },
  { value: "4", label: "Continents served" },
] as const;
