import { describe, it, expect } from "vitest";
import {
  resolveCaseStudyCategory,
  getCaseStudyCategoryLabel,
  getCaseStudyCategoryHref,
  countCaseStudiesByCategory,
  CASE_STUDY_CATEGORY_CONFIG,
} from "../case-study-category";

describe("resolveCaseStudyCategory", () => {
  it("prefers an explicit valid category over everything else", () => {
    expect(
      resolveCaseStudyCategory({ category: "ai", useCase: "Web Platform" }),
    ).toBe("ai");
  });

  it("ignores an invalid explicit category and falls through", () => {
    expect(resolveCaseStudyCategory({ category: "nonsense" })).toBeNull();
  });

  it("maps the manufacturing detail layout to power-platform", () => {
    expect(
      resolveCaseStudyCategory({ detailLayout: "manufacturing-power-platform" }),
    ).toBe("power-platform");
  });

  it("resolves via an exact useCase match", () => {
    expect(resolveCaseStudyCategory({ useCase: "AI Agents" })).toBe("ai");
    expect(resolveCaseStudyCategory({ useCase: "Mobile App" })).toBe("mobile");
  });

  it("resolves via a partial useCase match (case-insensitive)", () => {
    expect(
      resolveCaseStudyCategory({ useCase: "our new mobile app project" }),
    ).toBe("mobile");
  });

  it("resolves via the detail layout map", () => {
    expect(
      resolveCaseStudyCategory({ detailLayout: "neutrino-dashboard-story" }),
    ).toBe("data-analytics");
  });

  it("uses industry when it is itself a valid category key", () => {
    expect(resolveCaseStudyCategory({ industry: "sharepoint" })).toBe(
      "sharepoint",
    );
  });

  it("falls back to keyword rules over the combined haystack", () => {
    expect(
      resolveCaseStudyCategory({ title: "Rebuilt their SharePoint intranet" }),
    ).toBe("sharepoint");
    expect(
      resolveCaseStudyCategory({ industry: "Power BI reporting platform" }),
    ).toBe("data-analytics");
  });

  it("returns null when nothing matches", () => {
    expect(resolveCaseStudyCategory({ title: "a quiet unrelated story" })).toBeNull();
  });
});

describe("getCaseStudyCategoryLabel", () => {
  it("returns the configured title for a resolved category", () => {
    expect(getCaseStudyCategoryLabel({ category: "ai" })).toBe(
      CASE_STUDY_CATEGORY_CONFIG.ai.title,
    );
  });

  it("returns a non-category industry string verbatim", () => {
    expect(getCaseStudyCategoryLabel({ industry: "Healthcare" })).toBe(
      "Healthcare",
    );
  });

  it("uses the fallback when nothing resolves", () => {
    expect(getCaseStudyCategoryLabel({}, "Story")).toBe("Story");
    expect(getCaseStudyCategoryLabel({})).toBe("Case Study");
  });
});

describe("getCaseStudyCategoryHref", () => {
  it("builds a category landing url", () => {
    expect(getCaseStudyCategoryHref("web")).toBe("/case-studies/web");
  });

  it("returns undefined for a null key", () => {
    expect(getCaseStudyCategoryHref(null)).toBeUndefined();
  });
});

describe("countCaseStudiesByCategory", () => {
  it("tallies resolvable studies and skips unresolvable ones", () => {
    const counts = countCaseStudiesByCategory([
      { category: "ai" },
      { category: "ai" },
      { category: "web" },
      { title: "totally unrelated" },
    ]);
    expect(counts).toEqual({ ai: 2, web: 1 });
  });

  it("returns an empty object for an empty list", () => {
    expect(countCaseStudiesByCategory([])).toEqual({});
  });
});
