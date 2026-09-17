import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  DEFAULT_NVIDIA_RPM,
  resolveNvidiaMaxRpm,
  nvidiaMinIntervalMs,
  isRetryableLlmError,
  withGeminiRetry,
} from "../rate-limit";

describe("resolveNvidiaMaxRpm", () => {
  const KEY = "CONTENT_PIPELINE_NVIDIA_RPM";
  let saved: string | undefined;

  beforeEach(() => {
    saved = process.env[KEY];
    delete process.env[KEY];
  });

  afterEach(() => {
    if (saved === undefined) delete process.env[KEY];
    else process.env[KEY] = saved;
  });

  it("returns the default when the env var is unset", () => {
    expect(resolveNvidiaMaxRpm()).toBe(DEFAULT_NVIDIA_RPM);
  });

  it("parses a positive integer from the env var", () => {
    process.env[KEY] = "12";
    expect(resolveNvidiaMaxRpm()).toBe(12);
  });

  it("ignores non-positive or non-numeric values", () => {
    process.env[KEY] = "0";
    expect(resolveNvidiaMaxRpm()).toBe(DEFAULT_NVIDIA_RPM);
    process.env[KEY] = "-5";
    expect(resolveNvidiaMaxRpm()).toBe(DEFAULT_NVIDIA_RPM);
    process.env[KEY] = "abc";
    expect(resolveNvidiaMaxRpm()).toBe(DEFAULT_NVIDIA_RPM);
  });
});

describe("nvidiaMinIntervalMs", () => {
  it("computes the spacing with a ~8% safety margin", () => {
    expect(nvidiaMinIntervalMs(40)).toBe(Math.ceil((60_000 / 40) * 1.08));
  });

  it("returns a larger interval for a lower rpm", () => {
    expect(nvidiaMinIntervalMs(10)).toBeGreaterThan(nvidiaMinIntervalMs(60));
  });
});

describe("isRetryableLlmError", () => {
  it.each([
    "503 Service Unavailable",
    "429 too many requests",
    "model is overloaded",
    "RESOURCE_EXHAUSTED",
    "deadline exceeded",
    "Unexpected token < in JSON",
  ])("treats %j as retryable", (message) => {
    expect(isRetryableLlmError(new Error(message))).toBe(true);
  });

  it("does not retry unrelated errors", () => {
    expect(isRetryableLlmError(new Error("validation failed"))).toBe(false);
  });

  it("handles non-Error inputs", () => {
    expect(isRetryableLlmError("high demand right now")).toBe(true);
    expect(isRetryableLlmError(null)).toBe(false);
  });
});

describe("withGeminiRetry", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the result without retrying on success", async () => {
    const fn = vi.fn().mockResolvedValue("ok");
    await expect(withGeminiRetry(fn)).resolves.toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries retryable errors with backoff then resolves", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("503 unavailable"))
      .mockResolvedValue("recovered");

    const promise = withGeminiRetry(fn);
    await vi.runAllTimersAsync();
    await expect(promise).resolves.toBe("recovered");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("does not retry non-retryable errors", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("bad request"));
    await expect(withGeminiRetry(fn)).rejects.toThrow("bad request");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("gives up after exhausting the retry budget", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("429 rate limited"));
    const promise = withGeminiRetry(fn, 2);
    const settled = promise.catch((err: Error) => err);
    await vi.runAllTimersAsync();
    const result = await settled;
    expect(result).toBeInstanceOf(Error);
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
