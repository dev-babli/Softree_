"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FDA_MAP_HEIGHT,
  FDA_MAP_WIDTH,
  polygonToSvgPath,
} from "@/lib/world-map-projection";

type TopologyLike = {
  transform?: { scale?: [number, number]; translate?: [number, number] };
  arcs: number[][][];
  objects?: Record<string, unknown>;
};

type GeometryLike = { type: string; arcs?: unknown; geometries?: unknown[] };

function decodeArcs(topologyUnknown: unknown): number[][][] {
  const topology = topologyUnknown as TopologyLike;
  const t = topology.transform ?? {};
  const scale: [number, number] = t.scale ?? [1, 1];
  const translate: [number, number] = t.translate ?? [0, 0];
  return (topology.arcs || []).map((arc) => {
    let x = 0;
    let y = 0;
    return arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
    });
  });
}

function stitchRing(idxs: number[], arcs: number[][][]): number[][] {
  const out: number[][] = [];
  idxs.forEach((idx, i) => {
    const forward = idx >= 0;
    const arc = forward ? arcs[idx] : [...arcs[~idx]].reverse();
    if (i === 0) out.push(...arc);
    else out.push(...arc.slice(1));
  });
  return out;
}

function collectPolygons(geomUnknown: unknown, arcs: number[][][]): number[][][][] {
  const polys: number[][][][] = [];
  if (!geomUnknown) return polys;
  const geom = geomUnknown as GeometryLike;
  if (geom.type === "Polygon") {
    const ringsIdxs: number[][] = (geom.arcs as number[][]) || [];
    polys.push(ringsIdxs.map((ring) => stitchRing(ring, arcs)) as number[][][]);
  } else if (geom.type === "MultiPolygon") {
    const polysIdxs: number[][][] = (geom.arcs as number[][][]) || [];
    polysIdxs.forEach((p) => {
      polys.push(p.map((ring) => stitchRing(ring, arcs)) as number[][][]);
    });
  } else if (geom.type === "GeometryCollection") {
    (geom.geometries || []).forEach((g) => {
      collectPolygons(g, arcs).forEach((p) => polys.push(p));
    });
  }
  return polys;
}

/** Accurate flat world land — replaces the Webflow globe raster (wrong projection for lat/lon pins). */
export default function FdaWorldMapSvg() {
  const [polygons, setPolygons] = useState<number[][][][] | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
        if (!res.ok) return;
        const topo = await res.json();
        const arcs = decodeArcs(topo);
        const objects = (topo as TopologyLike).objects ?? {};
        const landObj = objects.land ?? objects.countries ?? null;
        const polys = collectPolygons(landObj, arcs);
        if (mounted) setPolygons(polys);
      } catch {
        /* fallback ellipse below */
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const paths = useMemo(() => {
    if (!polygons) return [];
    return polygons
      .map((poly) => polygonToSvgPath(poly))
      .filter((d) => d.length > 0);
  }, [polygons]);

  return (
    <svg
      viewBox={`0 0 ${FDA_MAP_WIDTH} ${FDA_MAP_HEIGHT}`}
      className="fda-world-map-svg"
      role="img"
      aria-label="World map showing Softree delivery hubs"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width={FDA_MAP_WIDTH} height={FDA_MAP_HEIGHT} fill="#fff" />
      {paths.length > 0 ? (
        <g fill="#E3E3E3" fillRule="evenodd">
          {paths.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      ) : (
        <ellipse
          cx={FDA_MAP_WIDTH / 2}
          cy={FDA_MAP_HEIGHT / 2}
          rx={FDA_MAP_WIDTH * 0.46}
          ry={FDA_MAP_HEIGHT * 0.42}
          fill="#E3E3E3"
        />
      )}
    </svg>
  );
}
