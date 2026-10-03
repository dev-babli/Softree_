import { describe, it, expect } from "vitest";
import {
  nvidiaSizeFromAspectRatio,
  openAiSizeFromAspectRatio,
  findModelByKey,
} from "../aspect-ratio";
import { NVIDIA_FALLBACK_MODEL_KEY } from "../catalog";

describe("nvidiaSizeFromAspectRatio", () => {
  it.each([
    ["16:9", { width: 1344, height: 768 }],
    ["9:16", { width: 768, height: 1344 }],
    ["4:3", { width: 1152, height: 896 }],
    ["3:4", { width: 896, height: 1152 }],
    ["3:2", { width: 1216, height: 832 }],
    ["2:3", { width: 832, height: 1216 }],
    ["21:9", { width: 1536, height: 640 }],
    ["1:1", { width: 1024, height: 1024 }],
  ])("maps %s to the expected dimensions", (ratio, expected) => {
    expect(nvidiaSizeFromAspectRatio(ratio)).toEqual(expected);
  });

  it("falls back to a 1:1 square for unknown ratios", () => {
    expect(nvidiaSizeFromAspectRatio("bogus")).toEqual({
      width: 1024,
      height: 1024,
    });
  });

  it("returns landscape dimensions wider than tall for 16:9", () => {
    const { width, height } = nvidiaSizeFromAspectRatio("16:9");
    expect(width).toBeGreaterThan(height);
  });
});

describe("openAiSizeFromAspectRatio", () => {
  it("formats the size as WIDTHxHEIGHT", () => {
    expect(openAiSizeFromAspectRatio("16:9")).toBe("1344x768");
  });

  it("uses the square fallback for unknown ratios", () => {
    expect(openAiSizeFromAspectRatio("nope")).toBe("1024x1024");
  });
});

describe("findModelByKey", () => {
  it("returns the model definition for a known key", () => {
    const model = findModelByKey(NVIDIA_FALLBACK_MODEL_KEY);
    expect(model?.id).toBe(NVIDIA_FALLBACK_MODEL_KEY);
  });

  it("returns undefined for an unknown key", () => {
    expect(findModelByKey("does-not-exist")).toBeUndefined();
  });
});
