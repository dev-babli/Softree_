/** Live-tunable spiral gallery params — defaults match Framer HTML */
export type SpiralLayoutMode = "helix" | "rings";

export type SpiralGalleryTuning = {
  layoutMode: SpiralLayoutMode;
  imageCount: number;
  ringCount: number;
  ringStagger: number;

  /** Lower = less S-curve twist (try 0.3–0.8 to flatten the helix) */
  revolutions: number;
  spiralHeight: number;
  verticalCompression: number;
  /** < 1 packs cards closer along the spiral path */
  angularGap: number;
  radius: number;

  itemWidth: number;
  itemHeight: number;
  borderRadius: number;
  cardScaleMin: number;
  cardScaleMax: number;

  cameraDistance: number;
  cameraFov: number;
  globalZOffset: number;
  depthMultiplier: number;

  /** Push toward (+) / away (−) from camera per vertical band */
  topZPush: number;
  centerZPush: number;
  bottomZPush: number;
  /** Scale multiplier per band */
  topScale: number;
  centerScale: number;
  bottomScale: number;
  /** Extra Y shift per band */
  topYOffset: number;
  centerYOffset: number;
  bottomYOffset: number;
  /** Y threshold for top/bottom bands (0–1 of half-height) */
  bandThreshold: number;

  edgeFadeStrength: number;
  autoPlaySpeed: number;
};

export const FRAMER_DEFAULT_TUNING: SpiralGalleryTuning = {
  layoutMode: "helix",
  imageCount: 14,
  ringCount: 3,
  ringStagger: 1.57,

  revolutions: 1.5,
  spiralHeight: 30,
  verticalCompression: 1,
  angularGap: 1,
  radius: 7.7,

  itemWidth: 5,
  itemHeight: 3,
  borderRadius: 0.2,
  cardScaleMin: 0.72,
  cardScaleMax: 1.12,

  cameraDistance: 22,
  cameraFov: 50,
  globalZOffset: 0,
  depthMultiplier: 1,

  topZPush: 0,
  centerZPush: 0,
  bottomZPush: 0,
  topScale: 1,
  centerScale: 1,
  bottomScale: 1,
  topYOffset: 0,
  centerYOffset: 0,
  bottomYOffset: 0,
  bandThreshold: 0.35,

  edgeFadeStrength: 0.5,
  autoPlaySpeed: 0.0003,
};

/** Saved showcase preset — helix layout, larger cards, light-theme tuned */
export const SPIRAL_GALLERY_PRESET: SpiralGalleryTuning = {
  layoutMode: "helix",
  imageCount: 14,
  ringCount: 3,
  ringStagger: 1.57,
  revolutions: 2.4,
  spiralHeight: 31,
  verticalCompression: 1,
  angularGap: 0.8,
  radius: 7.7,
  itemWidth: 5.6,
  itemHeight: 3.4,
  borderRadius: 0.2,
  cardScaleMin: 1.06,
  cardScaleMax: 1.24,
  cameraDistance: 22,
  cameraFov: 50,
  globalZOffset: 0,
  depthMultiplier: 1,
  topZPush: 0,
  centerZPush: 0,
  bottomZPush: 0,
  topScale: 1,
  centerScale: 1,
  bottomScale: 1,
  topYOffset: 0,
  centerYOffset: 0,
  bottomYOffset: 0,
  bandThreshold: 0.35,
  edgeFadeStrength: 0.5,
  autoPlaySpeed: 0.0003,
};

function smoothstep(v: number) {
  const x = Math.max(0, Math.min(1, v));
  return x * x * (3 - 2 * x);
}

function bandWeights(y: number, halfHeight: number, threshold: number) {
  const n = y / halfHeight;
  const top = smoothstep((n - threshold) / (1 - threshold));
  const bottom = smoothstep((-n - threshold) / (1 - threshold));
  const center = Math.max(0, 1 - top - bottom);
  return { top, center, bottom };
}

export type CardTransform = {
  x: number;
  y: number;
  z: number;
  scale: number;
};

export function computeCardTransform(
  index: number,
  offset: number,
  tuning: SpiralGalleryTuning,
): CardTransform {
  const count = Math.max(1, Math.round(tuning.imageCount));
  const halfH = tuning.spiralHeight / 2;

  let x: number;
  let y: number;
  let z: number;

  if (tuning.layoutMode === "rings") {
    const rows = Math.max(1, Math.round(tuning.ringCount));
    const perRow = Math.ceil(count / rows);
    const row = Math.min(rows - 1, Math.floor(index / perRow));
    const slot = index % perRow;
    const rowT = rows === 1 ? 0.5 : row / (rows - 1);
    y = (0.5 - rowT) * tuning.spiralHeight * tuning.verticalCompression;
    const t = ((slot / perRow) * tuning.angularGap + offset) % 1;
    const angle = t * Math.PI * 2 + row * tuning.ringStagger;
    x = Math.cos(angle) * tuning.radius;
    z = Math.sin(angle) * tuning.radius * tuning.depthMultiplier;
  } else {
    const t = (((index / count) * tuning.angularGap + offset) % 1 + 1) % 1;
    const angle = t * tuning.revolutions * Math.PI * 2;
    y = (t * tuning.spiralHeight - halfH) * tuning.verticalCompression;
    x = Math.cos(angle) * tuning.radius;
    z = Math.sin(angle) * tuning.radius * tuning.depthMultiplier;
  }

  const bands = bandWeights(y, halfH, tuning.bandThreshold);
  y +=
    bands.top * tuning.topYOffset +
    bands.center * tuning.centerYOffset +
    bands.bottom * tuning.bottomYOffset;

  z +=
    tuning.globalZOffset +
    bands.top * tuning.topZPush +
    bands.center * tuning.centerZPush +
    bands.bottom * tuning.bottomZPush;

  const front = smoothstep((z / tuning.radius + 1) * 0.5);
  const bandScale =
    bands.top * tuning.topScale +
    bands.center * tuning.centerScale +
    bands.bottom * tuning.bottomScale;
  const scale =
    (tuning.cardScaleMin + (tuning.cardScaleMax - tuning.cardScaleMin) * front) * bandScale;

  return { x, y, z, scale };
}
