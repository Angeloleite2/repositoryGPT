import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Anchor,
  ChevronDown,
  HardHat,
  Minus,
  Plus,
  RotateCcw,
  Warehouse,
  Waves,
  X,
} from "lucide-react";
import { useT } from "@/contexts/LanguageContext";
import { useTr } from "@/lib/useTr";
import { ports, type Port } from "@/data/ports";
import { portCoords } from "@/data/port-coords";
import SmartImage from "@/components/SmartImage";
import StaticNetworkMap from "@/components/StaticNetworkMap";
// Static import: a dynamic CSS import can resolve after the map paints, which
// collapses .mapboxgl-map to 0px and leaves the section black.
import "mapbox-gl/dist/mapbox-gl.css";


/* ------------------------------------------------------------------ data */

const ORANGE = "#E8721C";

// Hosting providers can override this with VITE_MAPBOX_TOKEN. This fallback is
// a public browser token used for the current deployment test.
const FALLBACK_PUBLIC_TOKEN =
  "pk.eyJ1IjoiYW5nZWxvZzJjIiwiYSI6ImNtc2ZobjZlbjA0ZGIzM3EyejY5eGdudGoifQ.ZEWwE1Jzr_jw02hgXLgdQw";

const MAPBOX_TOKEN =
  (import.meta.env.VITE_MAPBOX_TOKEN as string | undefined) ||
  FALLBACK_PUBLIC_TOKEN;

/** ISO codes of the countries where PTP operates (static fallback highlight). */
const PTP_ISO = ["AR", "BR", "PY", "UY", "ES", "NL"];


const MAP_STYLE = "mapbox://styles/mapbox/satellite-streets-v12";

/** Initial framing: the PTP network (South America + Europe reachable). */
const HOME_VIEW = { center: [-52, -18] as [number, number], zoom: 2.4 };

const countryOf = (c: string) => {
  const t = c.split(",").pop()?.trim() ?? c;
  if (t === "Paraguai") return "Paraguay";
  if (t === "Uruguai") return "Uruguay";
  if (t === "Brasil") return "Brasil";
  if (t === "Espanha") return "España";
  if (t === "Holanda") return "Netherlands";
  return t;
};

const countryOrder = [
  "Argentina",
  "Brasil",
  "Paraguay",
  "Uruguay",
  "España",
  "Netherlands",
];

type SiteKind = "port" | "storage" | "project";

const kindOf = (p: Port): SiteKind => {
  if (p.isProject) return "project";
  const type = p.sections[0]?.type ?? "";
  return /armazen|storage|almacen/i.test(type) ? "storage" : "port";
};

const kindIcon: Record<SiteKind, typeof Anchor> = {
  port: Anchor,
  storage: Warehouse,
  project: HardHat,
};

type PortPoint = {
  slug: string;
  port: Port;
  kind: SiteKind;
  lat: number;
  lng: number;
};

type Waterway = {
  name: string;
  kind: "river" | "hidrovia" | "channel";
  rank: number;
  coords: [number, number][];
};

const waterStyle: Record<Waterway["kind"], { color: string }> = {
  hidrovia: { color: "#5FA8DC" },
  channel: { color: "#7FC4E8" },
  river: { color: "#3E7FB4" },
};

/* ------------------------------------------------------------- component */

const NetworkMap = () => {
  const t = useT();
  const { tr } = useTr();

  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<PortPoint | null>(null);
  const [openCountries, setOpenCountries] = useState<string[]>([]);

  const toggleCountry = useCallback((country: string) => {
    setOpenCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  }, []);

  const points = useMemo<PortPoint[]>(
    () =>
      ports.flatMap((p) => {
        const c = portCoords[p.slug];
        if (!c) return [];
        return [{ slug: p.slug, port: p, kind: kindOf(p), lat: c.lat, lng: c.lng }];
      }),
    []
  );

  const pointBySlug = useMemo(() => {
    const map = new Map<string, PortPoint>();
    points.forEach((p) => map.set(p.slug, p));
    return map;
  }, [points]);

  const grouped = useMemo(() => {
    const map = new Map<string, PortPoint[]>();
    points.forEach((pt) => {
      const key = countryOf(pt.port.country);
      map.set(key, [...(map.get(key) ?? []), pt]);
    });
    return countryOrder
      .filter((c) => map.has(c))
      .map((country) => ({ country, items: map.get(country)! }));
  }, [points]);

  const revealPoint = useCallback((pt: PortPoint) => {
    setSelected(pt);
    const country = countryOf(pt.port.country);
    setOpenCountries((prev) => (prev.includes(country) ? prev : [...prev, country]));
  }, []);

  /* ---------------------------------------------------- lazy init on view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInView(true);
        });
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ------------------------------------------------------ map life cycle */
  useEffect(() => {
    if (!inView || mapRef.current) return;
    if (!MAPBOX_TOKEN) {
      setFailed(true);
      return;
    }
    let cancelled = false;
    let watchdog: number | undefined;

    (async () => {
      try {
        const { default: mapboxgl } = await import("mapbox-gl");
        if (cancelled || !containerRef.current) return;

        // No WebGL (old device, disabled GPU, privacy mode) → vector fallback.
        if (typeof (mapboxgl as any).supported === "function" && !(mapboxgl as any).supported()) {
          setFailed(true);
          return;
        }

        // Never initialise into a zero-height container: mapbox would size its
        // canvas to 0 and the section would stay black forever.
        for (let i = 0; i < 60; i += 1) {
          const h = containerRef.current?.getBoundingClientRect().height ?? 0;
          if (h > 50) break;
          await new Promise((r) => requestAnimationFrame(() => r(null)));
        }
        if (cancelled || !containerRef.current) return;


        mapboxgl.accessToken = MAPBOX_TOKEN;
        const map = new mapboxgl.Map({
          container: containerRef.current,
          style: MAP_STYLE,
          projection: { name: "globe" } as any,
          center: HOME_VIEW.center,
          zoom: HOME_VIEW.zoom,
          minZoom: 1,
          maxZoom: 17,
          attributionControl: true,
          cooperativeGestures: false,
        });
        mapRef.current = map;

        // The section animates/grows after mount: keep the WebGL canvas in sync
        // with the container, otherwise the globe renders into a stale viewport.
        if (typeof ResizeObserver !== "undefined") {
          const ro = new ResizeObserver(() => map.resize());
          ro.observe(containerRef.current);
          map.once("remove", () => ro.disconnect());
        }
        requestAnimationFrame(() => map.resize());

        // If tiles never arrive (blocked token, offline, WebGL context lost),
        // never leave the section empty — swap in the vector fallback.
        watchdog = window.setTimeout(() => {
          if (!cancelled && !mapRef.current?.isStyleLoaded?.()) setFailed(true);
        }, 12000);

        map.on("error", (e: any) => {
          const status = e?.error?.status;
          console.error("[NetworkMap] mapbox error", status ?? "", e?.error?.message ?? e);
          if (status === 401 || status === 403 || status === 404) setFailed(true);
        });
        map.on("webglcontextlost", () => setFailed(true));


        map.on("style.load", async () => {
          map.setFog({
            color: "rgb(9, 15, 26)",
            "high-color": "rgb(24, 44, 74)",
            "horizon-blend": 0.06,
            "space-color": "rgb(4, 8, 15)",
            "star-intensity": 0.12,
          } as any);

          /* ---------------------------------------------- waterways layer */
          try {
            const res = await fetch("/geo/waterways.json");
            const raw: Waterway[] = await res.json();
            const features = raw.map((w) => ({
              type: "Feature" as const,
              properties: { name: w.name, kind: w.kind, rank: w.rank },
              geometry: {
                type: "LineString" as const,
                coordinates: w.coords.map(([lat, lng]) => [lng, lat]),
              },
            }));
            if (cancelled || !map.getSource) return;
            map.addSource("ptp-waterways", {
              type: "geojson",
              data: { type: "FeatureCollection", features },
            } as any);
            map.addLayer({
              id: "ptp-waterways-line",
              type: "line",
              source: "ptp-waterways",
              layout: { "line-cap": "round", "line-join": "round" },
              paint: {
                "line-color": [
                  "match",
                  ["get", "kind"],
                  "hidrovia",
                  waterStyle.hidrovia.color,
                  "channel",
                  waterStyle.channel.color,
                  waterStyle.river.color,
                ],
                "line-opacity": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  1,
                  0.55,
                  4,
                  0.8,
                  9,
                  0.5,
                ],
                "line-width": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  1,
                  ["match", ["get", "kind"], "hidrovia", 1.4, "channel", 1, 0.7],
                  6,
                  ["match", ["get", "kind"], "hidrovia", 3, "channel", 2.2, 1.6],
                  12,
                  ["match", ["get", "kind"], "hidrovia", 5, "channel", 4, 3],
                ],
              },
            } as any);
            map.addLayer({
              id: "ptp-waterways-label",
              type: "symbol",
              source: "ptp-waterways",
              minzoom: 3.2,
              layout: {
                "symbol-placement": "line",
                "text-field": ["get", "name"],
                "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
                "text-size": ["interpolate", ["linear"], ["zoom"], 3.5, 10, 9, 13],
                "text-letter-spacing": 0.08,
                "text-max-angle": 40,
              },
              paint: {
                "text-color": "#CFE6F7",
                "text-halo-color": "rgba(6,12,22,0.85)",
                "text-halo-width": 1.4,
              },
            } as any);
          } catch {
            /* waterways are decorative — never block the map */
          }

          /* ---------------------------------------------- terminals layer */
          map.addSource("ptp-terminals", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: points.map((p) => ({
                type: "Feature" as const,
                properties: {
                  slug: p.slug,
                  kind: p.kind,
                  marker: p.kind === "port" ? "P" : p.kind === "storage" ? "S" : "◆",
                  name: tr(p.port.name).split("—")[0].trim(),
                },
                geometry: { type: "Point" as const, coordinates: [p.lng, p.lat] },
              })),
            },
          } as any);

          map.addLayer({
            id: "ptp-terminals-halo",
            type: "circle",
            source: "ptp-terminals",
            paint: {
              "circle-radius": ["interpolate", ["linear"], ["zoom"], 2, 5, 8, 13, 14, 22],
              "circle-color": ORANGE,
              "circle-opacity": ["interpolate", ["linear"], ["zoom"], 2, 0.28, 8, 0.22, 14, 0.16],
            },
          } as any);

          map.addLayer({
            id: "ptp-terminals-dot",
            type: "circle",
            source: "ptp-terminals",
            paint: {
              "circle-radius": ["interpolate", ["linear"], ["zoom"], 2, 3.2, 8, 6, 14, 10],
              "circle-color": ORANGE,
              "circle-stroke-width": ["interpolate", ["linear"], ["zoom"], 2, 1, 8, 1.6, 14, 2.2],
              "circle-stroke-color": "rgba(8,14,24,0.9)",
            },
          } as any);

          map.addLayer({
            id: "ptp-terminals-kind-bg",
            type: "circle",
            source: "ptp-terminals",
            minzoom: 5,
            paint: {
              "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 0, 7, 10, 12, 18, 16, 26],
              "circle-color": "rgba(8,14,24,0.82)",
              "circle-opacity": ["interpolate", ["linear"], ["zoom"], 5, 0, 7, 0.9, 12, 0.85],
              "circle-stroke-width": 1.2,
              "circle-stroke-color": ORANGE,
            },
          } as any);

          map.addLayer({
            id: "ptp-terminals-kind",
            type: "symbol",
            source: "ptp-terminals",
            minzoom: 5,
            layout: {
              "text-field": ["get", "marker"],
              "text-font": ["DIN Pro Bold", "Arial Unicode MS Bold"],
              "text-size": ["interpolate", ["linear"], ["zoom"], 5, 0, 7, 11, 12, 18, 16, 26],
              "text-allow-overlap": true,
            },
            paint: {
              "text-color": "#FFFFFF",
              "text-halo-color": "rgba(8,14,24,0.92)",
              "text-halo-width": 1.2,
            },
          } as any);

          map.addLayer({
            id: "ptp-terminals-label",
            type: "symbol",
            source: "ptp-terminals",
            minzoom: 4.5,
            layout: {
              "text-field": ["get", "name"],
              "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
              "text-size": ["interpolate", ["linear"], ["zoom"], 5, 11, 10, 14, 14, 17],
              "text-offset": [0, 1.35],
              "text-anchor": "top",
              "text-letter-spacing": 0.06,
              "text-allow-overlap": false,
            },
            paint: {
              "text-color": "#FFFFFF",
              "text-halo-color": "rgba(6,12,22,0.9)",
              "text-halo-width": 1.6,
            },
          } as any);

          ["ptp-terminals-dot", "ptp-terminals-halo", "ptp-terminals-kind-bg", "ptp-terminals-kind", "ptp-terminals-label"].forEach(
            (id) => {
              map.on("click", id, (e: any) => {
                const slug = e.features?.[0]?.properties?.slug;
                const pt = slug ? pointBySlug.get(slug) : undefined;
                 if (pt) revealPoint(pt);
              });
               map.on("mouseenter", id, (e: any) => {
                map.getCanvas().style.cursor = "pointer";
                 const slug = e.features?.[0]?.properties?.slug;
                 const pt = slug ? pointBySlug.get(slug) : undefined;
                 if (pt) revealPoint(pt);
              });
              map.on("mouseleave", id, () => {
                map.getCanvas().style.cursor = "";
              });
            }
          );

          if (!cancelled) {
            if (watchdog) window.clearTimeout(watchdog);
            map.resize();
            requestAnimationFrame(() => map.resize());
            setReady(true);
          }
        });
      } catch (error) {
        console.error("[NetworkMap] failed to initialise map", error);
        setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      if (watchdog) window.clearTimeout(watchdog);
    };

  }, [inView, points, pointBySlug, revealPoint, tr]);

  /* dispose on unmount */
  useEffect(
    () => () => {
      mapRef.current?.remove?.();
      mapRef.current = null;
    },
    []
  );

  /* keep labels in the active language */
  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map?.getSource) return;
    const src = map.getSource("ptp-terminals");
    src?.setData?.({
      type: "FeatureCollection",
      features: points.map((p) => ({
        type: "Feature",
        properties: {
          slug: p.slug,
          kind: p.kind,
          marker: p.kind === "port" ? "P" : p.kind === "storage" ? "S" : "◆",
          name: tr(p.port.name).split("—")[0].trim(),
        },
        geometry: { type: "Point", coordinates: [p.lng, p.lat] },
      })),
    });
  }, [ready, points, tr]);

  const flyTo = useCallback((lat: number, lng: number, zoom: number) => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    mapRef.current?.[reduce ? "jumpTo" : "flyTo"]({
      center: [lng, lat],
      zoom,
      duration: 1600,
      essential: true,
    });
  }, []);

  const openPoint = useCallback(
    (pt: PortPoint) => {
      revealPoint(pt);
      flyTo(pt.lat, pt.lng, 11);
    },
    [flyTo, revealPoint]
  );

  const resetView = useCallback(() => {
    setSelected(null);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    mapRef.current?.[reduce ? "jumpTo" : "flyTo"]({
      center: HOME_VIEW.center,
      zoom: HOME_VIEW.zoom,
      duration: 1400,
      essential: true,
    });
  }, []);

  const legend: Array<{ kind: SiteKind; label: string }> = [
    { kind: "port", label: t("globe.legend.port") },
    { kind: "storage", label: t("globe.legend.storage") },
    { kind: "project", label: t("globe.legend.project") },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-background py-24 lg:py-32 border-t border-border overflow-hidden"
    >
      <div className="container-luxury">
        <div className="max-w-2xl mb-14">
          <p className="text-eyebrow mb-6">{t("globe.eyebrow")}</p>
          <h2 className="heading-display">
            {t("globe.title.line1")}
            <br />
            <span className="italic text-secondary">{t("globe.title.line2")}</span>
          </h2>
          <p className="mt-6 text-muted-foreground font-light leading-relaxed">
            {t("globe.intro")}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* terminal index — one accordion per country */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-3 text-xs tracking-[0.22em] uppercase text-muted-foreground">
              <span>{t("globe.list.show")}</span>
              <span className="text-[10px]">{points.length}</span>
            </div>

            <ul className="space-y-4 pt-6">
              {grouped.map(({ country, items }) => {
                const open = openCountries.includes(country);
                return (
                  <li key={country}>
                    <button
                      type="button"
                      data-cursor-hover
                      aria-expanded={open}
                      onClick={() => {
                        toggleCountry(country);
                        if (!open) {
                          const lat =
                            items.reduce((s, i) => s + i.lat, 0) / items.length;
                          const lng =
                            items.reduce((s, i) => s + i.lng, 0) / items.length;
                          flyTo(lat, lng, 6.2);
                        }
                      }}
                      className={`w-full flex items-baseline justify-between gap-3 border-b border-border pb-2 text-left text-xs tracking-[0.22em] uppercase transition-colors ${
                        open ? "text-secondary" : "text-foreground hover:text-secondary"
                      }`}
                    >
                      <span>{tr(country)}</span>
                      <span className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        {items.length}
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-secondary transition-transform duration-300 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.ul
                          key="items"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden mt-2"
                        >
                          {items.map((pt) => {
                            const Icon = kindIcon[pt.kind];
                            return (
                              <li key={pt.slug}>
                                <button
                                  type="button"
                                  data-cursor-hover
                                  onClick={() => openPoint(pt)}
                                  className={`w-full flex items-baseline gap-3 py-1.5 text-left text-sm transition-colors ${
                                    selected?.slug === pt.slug
                                      ? "text-secondary"
                                      : "text-foreground/80 hover:text-secondary"
                                  }`}
                                >
                                  <Icon
                                    className={`w-3 h-3 shrink-0 translate-y-1 ${
                                      pt.kind === "project"
                                        ? "text-secondary/50"
                                        : "text-secondary/75"
                                    }`}
                                  />
                                  <span className="flex-1">{tr(pt.port.name)}</span>
                                  {pt.port.isProject && (
                                    <span className="text-[10px] tracking-[0.18em] uppercase text-secondary/80">
                                      {t("badge.project")}
                                    </span>
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <ul className="mt-8 space-y-2">
              {legend.map(({ kind, label }) => {
                const Icon = kindIcon[kind];
                return (
                  <li
                    key={kind}
                    className="flex items-center gap-3 text-[11px] tracking-[0.14em] uppercase text-muted-foreground"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        background: ORANGE,
                        opacity: kind === "port" ? 1 : kind === "storage" ? 0.75 : 0.45,
                      }}
                    />
                    <Icon className="w-3 h-3 text-secondary/70 shrink-0" />
                    <span>{label}</span>
                  </li>
                );
              })}
              <li className="flex items-center gap-3 text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                <span
                  className="w-4 h-[2px] rounded-full shrink-0"
                  style={{ background: waterStyle.hidrovia.color }}
                />
                <Waves className="w-3 h-3 text-secondary/70 shrink-0" />
                <span>{t("globe.legend.waterway")}</span>
              </li>
            </ul>
          </div>

          {/* map stage */}
          <div className="lg:col-span-8 order-1 lg:order-2 relative w-full">
            <div
              className="relative w-full rounded-lg overflow-hidden border border-border bg-[#060B14]"
              style={{ height: "clamp(360px, 58vh, 620px)" }}
            >
              {/* Vector map: shown as the loading state and as the permanent
                  fallback whenever satellite tiles cannot render. */}
              {(!ready || failed) && (
                <StaticNetworkMap
                  points={points.map((p) => ({
                    slug: p.slug,
                    name: tr(p.port.name),
                    lat: p.lat,
                    lng: p.lng,
                  }))}
                  ptpCountries={PTP_ISO}
                  onSelect={(slug: string) => {
                    const pt = pointBySlug.get(slug);
                    if (pt) revealPoint(pt);
                  }}
                  note={failed ? undefined : t("globe.loading")}
                />
              )}
              {!failed && (
                // Inline styles on purpose: mapbox-gl.css sets `.mapboxgl-map
                // { position: relative }`, which beats Tailwind's `absolute`
                // and collapses the container to 0px height.
                <div
                  ref={containerRef}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                />
              )}


              {/* controls */}
              {ready && !failed && (
                <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                  {[
                    {
                      icon: Plus,
                      action: () => mapRef.current?.zoomIn(),
                      label: "Zoom +",
                    },
                    {
                      icon: Minus,
                      action: () => mapRef.current?.zoomOut(),
                      label: "Zoom −",
                    },
                    { icon: RotateCcw, action: resetView, label: "Reset" },
                  ].map(({ icon: Icon, action, label }) => (
                    <button
                      key={label}
                      type="button"
                      data-cursor-hover
                      aria-label={label}
                      onClick={action}
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-background/70 backdrop-blur-md text-muted-foreground hover:text-secondary hover:border-secondary/50 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              )}

              {/* terminal popup */}
              <AnimatePresence>
                {selected && (
                  <motion.div
                    key={selected.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-3 bottom-3 z-30 w-[min(300px,88%)] rounded-lg overflow-hidden border border-border bg-background/92 backdrop-blur-xl"
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      aria-label={t("globe.close")}
                      data-cursor-hover
                      className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-background/80 text-muted-foreground hover:text-secondary"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    {(selected.port.thumb || selected.port.cover) && (
                      <div className="relative w-full h-32 overflow-hidden bg-muted">
                        <SmartImage
                          src={selected.port.thumb || selected.port.cover!}
                          fallbackSrc={selected.port.cover}
                          alt={tr(selected.port.name)}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}

                    <div className="p-4 space-y-2">
                      <p className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-secondary">
                        {(() => {
                          const Icon = kindIcon[selected.kind];
                          return <Icon className="w-3 h-3 shrink-0" />;
                        })()}
                        <span className="leading-tight">
                          {selected.port.sections
                            .slice(0, 3)
                            .map((s) => tr(s.type))
                            .join(" · ")}
                        </span>
                      </p>
                      <h3 className="text-sm text-foreground leading-snug">
                        {tr(selected.port.name)}
                      </h3>
                      <p className="text-xs text-muted-foreground font-light">
                        {tr(selected.port.city)} · {tr(selected.port.country)}
                      </p>
                      {(() => {
                        const topics = selected.port.sections
                          .flatMap((s) =>
                            (s.highlights ?? []).slice(0, 2)
                          )
                          .slice(0, 3);
                        if (!topics.length) return null;
                        return (
                          <ul className="pt-1 space-y-1">
                            {topics.map((h) => (
                              <li
                                key={h}
                                className="flex gap-2 text-xs text-muted-foreground font-light"
                              >
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-secondary" />
                                <span className="line-clamp-2">{tr(h)}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      })()}
                      <Link
                        to={`/atuacoes/${selected.slug}`}
                        data-cursor-hover
                        className="inline-block pt-1 text-[10px] tracking-[0.22em] uppercase text-secondary hover:underline"
                      >
                        {t("globe.card.cta")}
                      </Link>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkMap;
