import { describe, it, expect } from "vitest";
import {
  FDA_MAP_WIDTH,
  FDA_MAP_HEIGHT,
  projectEquirect,
  latLonToFdaMapPercent,
  ringToSvgPath,
  polygonToSvgPath,
} from "../world-map-projection";

describe("projectEquirect", () => {
  it("maps the map center (lon 0, lat 0) to the pixel center", () => {
    expect(projectEquirect(0, 0)).toEqual({
      x: FDA_MAP_WIDTH / 2,
      y: FDA_MAP_HEIGHT / 2,
    });
  });

  it("maps the top-left corner (lon -180, lat 90) to the origin", () => {
    expect(projectEquirect(-180, 90)).toEqual({ x: 0, y: 0 });
  });

  it("maps the bottom-right corner (lon 180, lat -90) to the map extent", () => {
    expect(projectEquirect(180, -90)).toEqual({
      x: FDA_MAP_WIDTH,
      y: FDA_MAP_HEIGHT,
    });
  });

  it("is linear in longitude and inverted in latitude", () => {
    const west = projectEquirect(-90, 0);
    const east = projectEquirect(90, 0);
    expect(east.x - FDA_MAP_WIDTH / 2).toBeCloseTo(FDA_MAP_WIDTH / 2 - west.x);

    const north = projectEquirect(0, 45);
    const south = projectEquirect(0, -45);
    expect(north.y).toBeLessThan(south.y);
  });
});

describe("latLonToFdaMapPercent", () => {
  it("returns center as 50% / 50%", () => {
    expect(latLonToFdaMapPercent(0, 0)).toEqual({ left: "50%", top: "50%" });
  });

  it("returns corners as 0% and 100%", () => {
    expect(latLonToFdaMapPercent(90, -180)).toEqual({ left: "0%", top: "0%" });
    expect(latLonToFdaMapPercent(-90, 180)).toEqual({
      left: "100%",
      top: "100%",
    });
  });
});

describe("ringToSvgPath", () => {
  it("returns an empty string for an empty ring", () => {
    expect(ringToSvgPath([])).toBe("");
  });

  it("uses M for the first point, L for the rest, and closes with Z", () => {
    const path = ringToSvgPath([
      [0, 0],
      [180, 0],
    ]);
    expect(path).toBe("M645.50,261.50 L1291.00,261.50 Z");
  });

  it("rounds coordinates to two decimals", () => {
    const path = ringToSvgPath([[1, 1]]);
    expect(path).toMatch(/^M\d+\.\d{2},\d+\.\d{2} Z$/);
  });
});

describe("polygonToSvgPath", () => {
  it("concatenates the path of every ring", () => {
    const polygon = [
      [
        [0, 0],
        [180, 0],
      ],
      [[-180, 90]],
    ];
    expect(polygonToSvgPath(polygon)).toBe(
      `${ringToSvgPath(polygon[0])} ${ringToSvgPath(polygon[1])}`,
    );
  });

  it("returns an empty string for an empty polygon", () => {
    expect(polygonToSvgPath([])).toBe("");
  });
});
