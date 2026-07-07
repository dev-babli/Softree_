import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  IMAGE_MODEL_CATALOG,
  NVIDIA_FALLBACK_MODEL_KEY,
  getModelById,
  getModelsForProvider,
  getProviderAvailability,
} from "../catalog";

describe("IMAGE_MODEL_CATALOG", () => {
  it("has unique model ids", () => {
    const ids = IMAGE_MODEL_CATALOG.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only contains gemini and nvidia providers", () => {
    for (const model of IMAGE_MODEL_CATALOG) {
      expect(["gemini", "nvidia"]).toContain(model.provider);
    }
  });

  it("includes the NVIDIA fallback model", () => {
    expect(getModelById(NVIDIA_FALLBACK_MODEL_KEY)).toBeDefined();
  });
});

describe("getModelById", () => {
  it("returns the matching model", () => {
    const first = IMAGE_MODEL_CATALOG[0];
    expect(getModelById(first.id)).toBe(first);
  });

  it("returns undefined for an unknown id", () => {
    expect(getModelById("nope")).toBeUndefined();
  });
});

describe("getModelsForProvider", () => {
  it("returns only models for the requested provider", () => {
    const nvidia = getModelsForProvider("nvidia");
    expect(nvidia.length).toBeGreaterThan(0);
    expect(nvidia.every((m) => m.provider === "nvidia")).toBe(true);
  });

  it("partitions the catalog by provider", () => {
    const total =
      getModelsForProvider("gemini").length +
      getModelsForProvider("nvidia").length;
    expect(total).toBe(IMAGE_MODEL_CATALOG.length);
  });
});

describe("getProviderAvailability", () => {
  const KEYS = [
    "GEMINI_API_KEY",
    "GOOGLE_GENAI_API_KEY",
    "NVIDIA_API_KEY",
    "NVAPI_API_KEY",
  ];
  const saved: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const key of KEYS) {
      saved[key] = process.env[key];
      delete process.env[key];
    }
  });

  afterEach(() => {
    for (const key of KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  });

  it("reports both providers unavailable when no keys are set", () => {
    expect(getProviderAvailability()).toEqual({ gemini: false, nvidia: false });
  });

  it("detects gemini via either key name", () => {
    process.env.GOOGLE_GENAI_API_KEY = "abc";
    expect(getProviderAvailability().gemini).toBe(true);
  });

  it("detects nvidia and treats whitespace-only keys as absent", () => {
    process.env.NVIDIA_API_KEY = "   ";
    expect(getProviderAvailability().nvidia).toBe(false);

    process.env.NVIDIA_API_KEY = "key";
    expect(getProviderAvailability().nvidia).toBe(true);
  });
});
