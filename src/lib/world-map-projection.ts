/** Flat equirectangular world map — matches SVG land layer and marker math. */
export const FDA_MAP_WIDTH = 1291;
export const FDA_MAP_HEIGHT = 523;

export function projectEquirect(lon: number, lat: number) {
  return {
    x: ((lon + 180) / 360) * FDA_MAP_WIDTH,
    y: ((90 - lat) / 180) * FDA_MAP_HEIGHT,
  };
}

/** Pin anchor as CSS percentages over the SVG map container. */
export function latLonToFdaMapPercent(lat: number, lon: number) {
  const { x, y } = projectEquirect(lon, lat);
  return {
    left: `${(x / FDA_MAP_WIDTH) * 100}%`,
    top: `${(y / FDA_MAP_HEIGHT) * 100}%`,
  };
}

export function ringToSvgPath(ring: number[][]) {
  if (!ring.length) return "";
  return (
    ring
      .map(([lon, lat], i) => {
        const { x, y } = projectEquirect(lon, lat);
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ") + " Z"
  );
}

export function polygonToSvgPath(polygon: number[][][]) {
  return polygon.map((ring) => ringToSvgPath(ring)).join(" ");
}
