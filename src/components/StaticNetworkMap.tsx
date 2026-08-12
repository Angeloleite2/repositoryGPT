import { useEffect, useMemo, useState } from "react";

type Pt = { slug: string; name: string; lat: number; lng: number };

type Props = {
  points: Pt[];
  ptpCountries?: string[];
  onSelect?: (slug: string) => void;
  note?: string;
};

const W = 1000;
const H = 520;

/** Equirectangular projection cropped to the PTP corridor (South America → Europe). */
const BOUNDS = { west: -80, east: 15, north: 58, south: -40 };

const project = (lat: number, lng: number) => {
  const x = ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * W;
  const y = ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * H;
  return [x, y] as const;
};

type Feature = {
  properties: { name: string; iso: string };
  geometry: { type: string; coordinates: unknown };
};

const ringToPath = (ring: [number, number][]) =>
  ring
    .map(([lng, lat], i) => {
      const [x, y] = project(lat, lng);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join("") + "Z";

const featurePaths = (f: Feature): string => {
  const g = f.geometry;
  if (g.type === "Polygon") {
    return (g.coordinates as [number, number][][]).map(ringToPath).join("");
  }
  if (g.type === "MultiPolygon") {
    return (g.coordinates as [number, number][][][])
      .flatMap((poly) => poly.map(ringToPath))
      .join("");
  }
  return "";
};

/**
 * Dependency-free vector world map used whenever the satellite tiles are
 * unavailable (missing/blocked token, WebGL disabled, offline). It always
 * renders something meaningful: real country outlines + the 22 PTP sites.
 */
const StaticNetworkMap = ({ points, ptpCountries = [], onSelect, note }: Props) => {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/geo/countries.geojson")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setFeatures(d.features ?? []);
      })
      .catch(() => {
        /* outlines are decorative — dots still render */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const paths = useMemo(
    () =>
      features.map((f) => ({
        name: f.properties?.name,
        iso: f.properties?.iso,
        d: featurePaths(f),
      })),
    [features]
  );

  return (
    <div className="absolute inset-0 flex flex-col">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="PTP Group network map"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="ptp-ocean" cx="50%" cy="45%" r="75%">
            <stop offset="0%" stopColor="#12233C" />
            <stop offset="100%" stopColor="#060B14" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#ptp-ocean)" />
        {paths.map((p) => {
          const highlighted = ptpCountries.includes(p.iso);
          return (
            <path
              key={p.iso + p.name}
              d={p.d}
              fill={highlighted ? "rgba(232,114,28,0.14)" : "rgba(148,178,209,0.10)"}
              stroke={highlighted ? "rgba(232,114,28,0.55)" : "rgba(148,178,209,0.28)"}
              strokeWidth={0.6}
            />
          );
        })}
        {points.map((pt) => {
          const [x, y] = project(pt.lat, pt.lng);
          return (
            <g
              key={pt.slug}
              onClick={() => onSelect?.(pt.slug)}
              style={{ cursor: onSelect ? "pointer" : "default" }}
            >
              <title>{pt.name}</title>
              <circle cx={x} cy={y} r={7} fill="#E8721C" opacity={0.2} />
              <circle
                cx={x}
                cy={y}
                r={3}
                fill="#E8721C"
                stroke="rgba(8,14,24,0.9)"
                strokeWidth={0.8}
              />
            </g>
          );
        })}
      </svg>
      {note && (
        <p className="absolute bottom-2 left-3 right-3 text-[10px] tracking-[0.14em] uppercase text-muted-foreground/70">
          {note}
        </p>
      )}
    </div>
  );
};

export default StaticNetworkMap;
