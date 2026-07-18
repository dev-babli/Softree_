/**
 * Grainient palettes for testimonial brand panels.
 * Three-stop: highlight → saturated mid → deep anchor (readable logos on top).
 */

export type TestimonialGrainientColors = {
  color1: string;
  color2: string;
  color3: string;
};

export type TestimonialGrainientPreset = TestimonialGrainientColors & {
  timeSpeed?: number;
  warpStrength?: number;
  grainAmount?: number;
  contrast?: number;
  saturation?: number;
  zoom?: number;
};

type SlideGrainientPreset = {
  dark: TestimonialGrainientPreset;
  light: TestimonialGrainientPreset;
};

const darkBase: Omit<TestimonialGrainientPreset, keyof TestimonialGrainientColors> = {
  timeSpeed: 0.1,
  warpStrength: 1.12,
  grainAmount: 0.09,
  contrast: 1.38,
  saturation: 1.22,
  zoom: 0.9,
};

const lightBase: Omit<TestimonialGrainientPreset, keyof TestimonialGrainientColors> = {
  timeSpeed: 0.13,
  warpStrength: 0.78,
  grainAmount: 0.05,
  contrast: 1.18,
  saturation: 1.08,
  zoom: 0.98,
};

/** Per-slide palettes — dark for Softree slider, light for SoftreeLightTestimonialSlider */
export const TESTIMONIAL_GRAINIENT_PRESETS: Record<string, SlideGrainientPreset> = {
  "natasha-adams": {
    dark: {
      ...darkBase,
      color1: "#FFD0A8",
      color2: "#FF6B1A",
      color3: "#1C0C06",
    },
    light: {
      ...lightBase,
      color1: "#FFF4EB",
      color2: "#FF822D",
      color3: "#FFC9A3",
    },
  },
  "arkady-fedorovtsjev": {
    dark: {
      ...darkBase,
      color1: "#A8C8FF",
      color2: "#2563EB",
      color3: "#071428",
    },
    light: {
      ...lightBase,
      color1: "#EFF6FF",
      color2: "#3B82F6",
      color3: "#93C5FD",
    },
  },
  "asif-mohamed": {
    dark: {
      ...darkBase,
      color1: "#FFD4C4",
      color2: "#FF3366",
      color3: "#2E050C",
    },
    light: {
      ...lightBase,
      color1: "#FFF0EB",
      color2: "#FF5E7E",
      color3: "#FFB0C0",
    },
  },
  "rahi-radhakrishnan": {
    dark: {
      ...darkBase,
      color1: "#FFE8A3",
      color2: "#FF6600",
      color3: "#2A0C02",
    },
    light: {
      ...lightBase,
      color1: "#FEF9C3",
      color2: "#F97316",
      color3: "#FDE047",
    },
  },
  "darrell-trimble": {
    dark: {
      ...darkBase,
      color1: "#FFCCA3",
      color2: "#B91C1C",
      color3: "#2A0505",
    },
    light: {
      ...lightBase,
      color1: "#FFF1F2",
      color2: "#F43F5E",
      color3: "#FECDD3",
    },
  },
};

export const DEFAULT_TESTIMONIAL_GRAINIENT: SlideGrainientPreset = {
  dark: {
    ...darkBase,
    color1: "#FFBC8A",
    color2: "#E85A1A",
    color3: "#140808",
  },
  light: {
    ...lightBase,
    color1: "#FFF7ED",
    color2: "#F97316",
    color3: "#FDBA74",
  },
};

export function getTestimonialGrainientPreset(
  slideId: string,
  theme: "light" | "dark" = "dark",
): TestimonialGrainientPreset {
  const slide = TESTIMONIAL_GRAINIENT_PRESETS[slideId] ?? DEFAULT_TESTIMONIAL_GRAINIENT;
  return slide[theme];
}
