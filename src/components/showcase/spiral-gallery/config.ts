import type { Object3D } from "three";

export type SpiralGalleryTheme = "light" | "dark";

/** Static shell colors (not in live tuning panel) */
export const SPIRAL_GALLERY_SHELL = {
  theme: "light" as SpiralGalleryTheme,
  cinematicBgInner: "#f5f5f7",
  cinematicBgOuter: "#fafafa",
  frameBg: "#ffffff",
  starfieldEnabled: false,
  fogNear: 22,
  fogFar: 58,
  damping: 0.02,
  scrollSensitivity: 0.0002,
  windEffectStrength: 0.5,
  poleFlare: 0.012,
  /** Multiplier applied to edgeFadeStrength for theme-aware vignette */
  edgeFadeScale: 0.14,
} as const;

export const SPIRAL_GALLERY_SHELL_DARK = {
  theme: "dark" as SpiralGalleryTheme,
  cinematicBgInner: "#141414",
  cinematicBgOuter: "#000000",
  frameBg: "rgb(153, 238, 255)",
  starfieldEnabled: true,
  fogNear: 12,
  fogFar: 55,
  damping: 0.02,
  scrollSensitivity: 0.0002,
  windEffectStrength: 0.5,
  poleFlare: 0.028,
  edgeFadeScale: 1,
} as const;

export const SPIRAL_GALLERY_IMAGES = [
  "https://framerusercontent.com/images/d7l5tpxkSccTmOozS3ZmhEoeDA.jpeg?width=2752&height=1536",
  "https://framerusercontent.com/images/AIlYYVk40lClOP4DQmNJbkKLIvM.png?width=2752&height=1536",
  "https://framerusercontent.com/images/vsoWcY5MGJeXWivfWuoYNov8k.png?width=2752&height=1536",
  "https://framerusercontent.com/images/1fVavaLYF193VlbwuU0gxCOaako.jpeg?width=2752&height=1536",
  "https://framerusercontent.com/images/br9A24wShGj6nSlXBEwGErqUJQI.jpeg?width=2752&height=1536",
  "https://framerusercontent.com/images/ZLsrmW4j6wpU6osHLcKIYpZkHQ.jpeg?width=2752&height=1536",
] as const;

export function buildGalleryImageList(count: number): string[] {
  return Array.from({ length: count }, (_, i) => SPIRAL_GALLERY_IMAGES[i % SPIRAL_GALLERY_IMAGES.length]);
}

export function applyCylinderOrientation(group: Object3D, x: number, y: number, z: number) {
  const radial = Math.hypot(x, z) || 1;
  group.lookAt(x + x / radial, y, z + z / radial);
}

export {
  FRAMER_DEFAULT_TUNING,
  SPIRAL_GALLERY_PRESET,
  computeCardTransform,
} from "./tuning";
export type { SpiralGalleryTuning, SpiralLayoutMode, CardTransform } from "./tuning";
