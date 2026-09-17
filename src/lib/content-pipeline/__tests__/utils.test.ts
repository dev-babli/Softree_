import { describe, it, expect } from "vitest";
import { slugify, randomKey, stripJsonFence, parseLlmJson } from "../utils";

describe("slugify", () => {
  it("lowercases and hyphenates whitespace", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips characters that are not alphanumeric, space, or hyphen", () => {
    expect(slugify("Node.js & React!")).toBe("nodejs-react");
  });

  it("collapses runs of whitespace into a single hyphen", () => {
    expect(slugify("a   b\t c")).toBe("a-b-c");
  });

  it("trims surrounding whitespace before hyphenating", () => {
    expect(slugify("  spaced out  ")).toBe("spaced-out");
  });

  it("caps the slug at 96 characters", () => {
    const slug = slugify("a".repeat(200));
    expect(slug).toHaveLength(96);
  });

  it("preserves existing hyphens and digits", () => {
    expect(slugify("Power-Platform 2024")).toBe("power-platform-2024");
  });
});

describe("randomKey", () => {
  it("returns a 10-character base36 string", () => {
    const key = randomKey();
    expect(key).toMatch(/^[a-z0-9]{1,10}$/);
    expect(key.length).toBeLessThanOrEqual(10);
  });

  it("produces distinct values across calls", () => {
    const keys = new Set(Array.from({ length: 50 }, () => randomKey()));
    expect(keys.size).toBeGreaterThan(1);
  });
});

describe("stripJsonFence", () => {
  it("extracts JSON from a ```json fenced block", () => {
    const input = '```json\n{"a":1}\n```';
    expect(stripJsonFence(input)).toBe('{"a":1}');
  });

  it("extracts content from an unlabelled fenced block", () => {
    expect(stripJsonFence("```\n[1,2]\n```")).toBe("[1,2]");
  });

  it("trims plain text when there is no fence", () => {
    expect(stripJsonFence("  {}  ")).toBe("{}");
  });
});

describe("parseLlmJson", () => {
  it("parses clean JSON", () => {
    expect(parseLlmJson<{ a: number }>('{"a":1}')).toEqual({ a: 1 });
  });

  it("parses JSON wrapped in a fenced block", () => {
    expect(parseLlmJson<number[]>('```json\n[1,2,3]\n```')).toEqual([1, 2, 3]);
  });

  it("repairs unescaped newlines inside string values", () => {
    const input = '{"text":"line one\nline two"}';
    expect(parseLlmJson<{ text: string }>(input)).toEqual({
      text: "line one\nline two",
    });
  });

  it("strips stray control characters that break JSON.parse", () => {
    const input = '{"text":"a\u0007b"}';
    expect(parseLlmJson<{ text: string }>(input)).toEqual({ text: "ab" });
  });

  it("throws when no repair attempt yields valid JSON", () => {
    expect(() => parseLlmJson("not json at all {")).toThrow();
  });
});
