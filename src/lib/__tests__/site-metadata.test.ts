import { describe, it, expect } from "vitest";
import {
  SITE_URL,
  OG_SIZE,
  routeToOgFilename,
  pageOgImage,
  ogImages,
  twitterImages,
  applyPageOg,
} from "../site-metadata";

describe("routeToOgFilename", () => {
  it("maps the root path to 'home'", () => {
    expect(routeToOgFilename("/")).toBe("home");
    expect(routeToOgFilename("")).toBe("home");
  });

  it("strips the leading slash", () => {
    expect(routeToOgFilename("/blog")).toBe("blog");
  });

  it("replaces nested slashes with double dashes", () => {
    expect(routeToOgFilename("/case-studies/ai")).toBe("case-studies--ai");
  });
});

describe("pageOgImage", () => {
  it("builds an absolute PNG url under the site origin", () => {
    const og = pageOgImage("/blog");
    expect(og.url).toBe(`${SITE_URL}/og/pages/blog.png`);
    expect(og.width).toBe(OG_SIZE);
    expect(og.height).toBe(OG_SIZE);
    expect(og.alt).toBe("Softree Technology");
  });

  it("uses the home filename and a custom alt for the root path", () => {
    const og = pageOgImage("/", "Home");
    expect(og.url).toBe(`${SITE_URL}/og/pages/home.png`);
    expect(og.alt).toBe("Home");
  });
});

describe("ogImages / twitterImages", () => {
  it("wraps a single image in an array for open graph", () => {
    const og = pageOgImage("/");
    expect(ogImages(og)).toEqual([og]);
  });

  it("extracts just the url for twitter", () => {
    const og = pageOgImage("/");
    expect(twitterImages(og)).toEqual([og.url]);
  });
});

describe("applyPageOg", () => {
  it("attaches OG and Twitter images while preserving existing metadata", () => {
    const result = applyPageOg("/blog", {
      title: "Blog",
      openGraph: { description: "posts" },
    });

    expect(result.title).toBe("Blog");
    const og = pageOgImage("/blog");
    expect(result.openGraph).toMatchObject({
      description: "posts",
      images: [og],
    });
    expect(result.twitter).toMatchObject({
      card: "summary_large_image",
      images: [og.url],
    });
  });

  it("passes a custom alt through to the generated image", () => {
    const result = applyPageOg("/about", {}, "About Softree");
    const images = ogImages(pageOgImage("/about", "About Softree"));
    expect(result.openGraph).toMatchObject({ images });
  });
});
