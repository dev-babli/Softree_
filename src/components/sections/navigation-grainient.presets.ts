/**
 * Nav mega-menu sidebar Grainient — matches BlogGrid card quality.
 * ONE WebGL context per open menu (left rail only).
 */

export type NavGrainientPreset = {
  color1: string;
  color2: string;
  color3: string;
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  saturation?: number;
  zoom?: number;
};

const railBase: Omit<NavGrainientPreset, "color1" | "color2" | "color3" | "blendAngle"> = {
  timeSpeed: 0.18,
  colorBalance: -0.1,
  warpStrength: 1.15,
  warpSpeed: 1.2,
  warpAmplitude: 42,
  blendSoftness: 0.08,
  rotationAmount: 400,
  noiseScale: 2.3,
  grainAmount: 0.1,
  grainScale: 2.2,
  grainAnimated: false,
  contrast: 1.32,
  saturation: 1.08,
  zoom: 0.88,
};

/** Left-rail palette per mega-menu section */
export const NAV_RAIL_GRAINIENT: Record<string, NavGrainientPreset> = {
  Services: {
    ...railBase,
    color1: "#FFD6CC",
    color2: "#F97316",
    color3: "#FFF1EB",
    warpFrequency: 5.0,
    blendAngle: -12,
  },
  "Case Studies": {
    ...railBase,
    color1: "#C8E0FF",
    color2: "#5C9DFF",
    color3: "#E8F2FF",
    warpFrequency: 4.2,
    blendAngle: -18,
  },
  Blog: {
    ...railBase,
    color1: "#D4C6FF",
    color2: "#8B5CF6",
    color3: "#EDE9FE",
    warpFrequency: 3.8,
    blendAngle: -35,
  },
  Products: {
    ...railBase,
    color1: "#CCFBF1",
    color2: "#0D9488",
    color3: "#F0FDFA",
    warpFrequency: 4.5,
    blendAngle: -24,
  },
  Solutions: {
    ...railBase,
    color1: "#E0E7FF",
    color2: "#4F46E5",
    color3: "#EEF2FF",
    warpFrequency: 4.0,
    blendAngle: -30,
  },
};

/** Full mega-menu panel palette (alias of rail presets for mobile/legacy nav) */
export const NAV_MENU_GRAINIENT = NAV_RAIL_GRAINIENT;

/** Per-column accent preset for mega-menu columns */
export function getNavColumnGrainient(index: number): NavGrainientPreset {
  const keys = Object.keys(NAV_RAIL_GRAINIENT);
  const key = keys[index % keys.length] ?? "Services";
  return NAV_RAIL_GRAINIENT[key] ?? NAV_RAIL_GRAINIENT.Services;
}

/** Column label accent dots — SectionHeader tokens */
export const NAV_COLUMN_ACCENTS = [
  "#FF5812",
  "#1852FF",
  "#FF6B00",
  "#1852FF",
] as const;

export function getNavColumnAccent(index: number): string {
  return NAV_COLUMN_ACCENTS[index % NAV_COLUMN_ACCENTS.length];
}
