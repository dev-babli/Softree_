import { describe, it, expect } from "vitest";
import {
  plainTextFromBlocks,
  bulletsFromBlocks,
  sentencesFromText,
} from "../portableTextUtils";

describe("plainTextFromBlocks", () => {
  it("returns an empty string for null, undefined, or empty input", () => {
    expect(plainTextFromBlocks()).toBe("");
    expect(plainTextFromBlocks(null)).toBe("");
    expect(plainTextFromBlocks([])).toBe("");
  });

  it("joins child spans within a block with spaces", () => {
    const blocks = [{ children: [{ text: "Hello" }, { text: "world" }] }];
    expect(plainTextFromBlocks(blocks)).toBe("Hello world");
  });

  it("joins multiple blocks and trims the result", () => {
    const blocks = [
      { children: [{ text: "First" }] },
      { children: [{ text: "Second" }] },
    ];
    expect(plainTextFromBlocks(blocks)).toBe("First Second");
  });

  it("tolerates blocks with missing children or text", () => {
    const blocks = [{}, { children: [{}, { text: "kept" }] }];
    expect(plainTextFromBlocks(blocks)).toBe("kept");
  });
});

describe("bulletsFromBlocks", () => {
  it("returns an empty array for empty input", () => {
    expect(bulletsFromBlocks()).toEqual([]);
    expect(bulletsFromBlocks(null)).toEqual([]);
  });

  it("collects bullet list items and normal paragraphs", () => {
    const blocks = [
      { listItem: "bullet", children: [{ text: "point one" }] },
      { style: "normal", children: [{ text: "a paragraph" }] },
      { style: "h2", children: [{ text: "a heading" }] },
    ];
    expect(bulletsFromBlocks(blocks)).toEqual(["point one", "a paragraph"]);
  });

  it("drops entries that resolve to empty strings", () => {
    const blocks = [
      { listItem: "bullet", children: [{ text: "" }] },
      { style: "normal", children: [{ text: "kept" }] },
    ];
    expect(bulletsFromBlocks(blocks)).toEqual(["kept"]);
  });
});

describe("sentencesFromText", () => {
  it("splits on sentence-ending punctuation", () => {
    expect(sentencesFromText("One. Two! Three?")).toEqual([
      "One.",
      "Two!",
      "Three?",
    ]);
  });

  it("caps the number of sentences at the default of 3", () => {
    expect(sentencesFromText("A. B. C. D. E.")).toHaveLength(3);
  });

  it("honours a custom max", () => {
    expect(sentencesFromText("A. B. C. D.", 2)).toEqual(["A.", "B."]);
  });

  it("filters out empty fragments", () => {
    expect(sentencesFromText("   ")).toEqual([]);
  });
});
