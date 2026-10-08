import { describe, it, expect } from "vitest";
import { ImageGenerationError, formatProviderError } from "../errors";

describe("ImageGenerationError", () => {
  it("defaults to status 500 and sets the name", () => {
    const err = new ImageGenerationError("boom");
    expect(err.status).toBe(500);
    expect(err.name).toBe("ImageGenerationError");
    expect(err).toBeInstanceOf(Error);
  });

  it("stores an explicit status code", () => {
    expect(new ImageGenerationError("boom", 429).status).toBe(429);
  });
});

describe("formatProviderError", () => {
  it("maps rate-limit errors to a 429 with a provider-specific message", () => {
    const gemini = formatProviderError(new Error("429 quota exceeded"), "gemini");
    expect(gemini.status).toBe(429);
    expect(gemini.message).toContain("Gemini");

    const nvidia = formatProviderError("RESOURCE_EXHAUSTED", "nvidia");
    expect(nvidia.status).toBe(429);
    expect(nvidia.message).toContain("NVIDIA");
  });

  it("extracts and rounds up a retry hint when present", () => {
    const err = formatProviderError(new Error("rate limit, retry in 4.2s"), "nvidia");
    expect(err.message).toContain("Retry in about 5 seconds");
  });

  it("maps auth errors to a 401", () => {
    const err = formatProviderError(new Error("401 unauthorized"), "gemini");
    expect(err.status).toBe(401);
    expect(err.message).toContain("API key");
  });

  it("defaults unknown errors to 500", () => {
    const err = formatProviderError(new Error("something odd happened"), "nvidia");
    expect(err.status).toBe(500);
    expect(err.message).toBe("something odd happened");
  });

  it("truncates very long error messages to 280 chars plus an ellipsis", () => {
    const err = formatProviderError(new Error("x".repeat(400)), "gemini");
    expect(err.message).toHaveLength(281);
    expect(err.message.endsWith("…")).toBe(true);
  });

  it("serializes non-Error, non-string inputs", () => {
    const err = formatProviderError({ detail: "weird" }, "nvidia");
    expect(err.message).toContain("weird");
  });

  it("falls back to a generic message when the payload is empty", () => {
    const err = formatProviderError("", "nvidia");
    expect(err.message).toBe("Image generation failed");
  });
});
