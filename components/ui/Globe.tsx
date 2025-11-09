"use client";
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3, WebGLRenderer } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Object3DNode, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string | ((t: number) => string);
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

let numbersOfRings = [0];

// ---- Defensive sanitation helpers (dev logs once) ----
const isFiniteNum = (n: unknown) => typeof n === "number" && Number.isFinite(n);
const coerceNum = (raw: unknown, fallback: number) => {
  const n = typeof raw === "string" ? Number(raw) : (raw as number);
  return Number.isFinite(n) ? n : fallback;
};
let loggedNaNSanitize = false;
let loggedColorSanitize = false;

function ensureColorString(c: Position["color"], fallback = "#ffffff"): string {
  try {
    if (typeof c === "string") return c;
    if (typeof c === "function") {
      const v = c(0);
      if (typeof v === "string") return v;
    }
  } catch {
    // ignore
  }
  if (process.env.NODE_ENV !== "production" && !loggedColorSanitize) {
    // eslint-disable-next-line no-console
    console.warn("[Globe] Invalid color source; using fallback once");
    loggedColorSanitize = true;
  }
  return fallback;
}

function sanitizePositions<T extends Position>(arr: T[]): T[] {
  const sanitized = arr
    .filter((d) => {
      const ok =
        isFiniteNum(coerceNum(d.startLat, NaN)) &&
        isFiniteNum(coerceNum(d.startLng, NaN)) &&
        isFiniteNum(coerceNum(d.endLat, NaN)) &&
        isFiniteNum(coerceNum(d.endLng, NaN)) &&
        isFiniteNum(coerceNum(d.arcAlt, 0));
      return ok;
    })
    .map((d) => ({
      ...d,
      startLat: coerceNum(d.startLat, 0),
      startLng: coerceNum(d.startLng, 0),
      endLat: coerceNum(d.endLat, 0),
      endLng: coerceNum(d.endLng, 0),
      arcAlt: Math.max(0, coerceNum(d.arcAlt, 0.1)),
      order: Math.max(0, Math.floor(coerceNum(d.order, 0))),
      color: ensureColorString(d.color),
    })) as T[];

  if (process.env.NODE_ENV !== "production" && !loggedNaNSanitize) {
    if (sanitized.length !== arr.length) {
      // eslint-disable-next-line no-console
      console.warn(`[Globe] Sanitized ${arr.length - sanitized.length} invalid arc entries`);
    }
    loggedNaNSanitize = true;
  }
  return sanitized;
}

export function Globe({ globeConfig, data }: WorldProps) {
  const [globeData, setGlobeData] = useState<
    | {
        size: number;
        order: number;
        color: (t: number) => string;
        lat: number;
        lng: number;
      }[]
    | null
  >(null);

  const globeRef = useRef<ThreeGlobe | null>(null);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  useEffect(() => {
    if (globeRef.current) {
      _buildData();
      _buildMaterial();
    }
  }, [globeRef.current]);

  const _buildMaterial = () => {
    if (!globeRef.current) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    globeMaterial.color = new Color(defaultProps.globeColor);
    globeMaterial.emissive = new Color(defaultProps.emissive);
    globeMaterial.emissiveIntensity = defaultProps.emissiveIntensity || 0.1;
    globeMaterial.shininess = defaultProps.shininess || 0.9;
  };

  const _buildData = () => {
    const arcs = sanitizePositions(data);
    let points: {
      size: number;
      order: number;
      color: (t: number) => string;
      lat: number;
      lng: number;
    }[] = [];

    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      const rgb = hexToRgb(arc.color as string) as { r: number; g: number; b: number };
      const colorFn = (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`;

      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: colorFn,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: colorFn,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    // remove duplicates for same lat and lng
    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) => ["lat", "lng"].every((k) => (v2 as any)[k] === (v as any)[k])) === i
    );

    setGlobeData(filteredPoints);
  };

  useEffect(() => {
    if (globeRef.current && globeData) {
      try {
        globeRef.current
          .hexPolygonsData(countries.features)
          .hexPolygonResolution(3)
          .hexPolygonMargin(0.7)
          .showAtmosphere(defaultProps.showAtmosphere)
          .atmosphereColor(defaultProps.atmosphereColor)
          .atmosphereAltitude(defaultProps.atmosphereAltitude)
          .hexPolygonColor(() => defaultProps.polygonColor);
        startAnimation();
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn("[Globe] hex polygon setup skipped due to error", e);
        }
      }
    }
  }, [globeData]);

  const startAnimation = () => {
    if (!globeRef.current || !globeData) return;

    const sanitizedArcs = sanitizePositions(data);

    try {
      globeRef.current
        .arcsData(sanitizedArcs)
        .arcStartLat((d) => (d as Position).startLat)
        .arcStartLng((d) => (d as Position).startLng)
        .arcEndLat((d) => (d as Position).endLat)
        .arcEndLng((d) => (d as Position).endLng)
        .arcColor((e: any) => ensureColorString((e as Position).color))
        .arcAltitude((e) => {
          const alt = (e as Position).arcAlt;
          return Number.isFinite(alt) ? Math.max(0, alt) : 0.1;
        })
        .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
        .arcDashLength(defaultProps.arcLength)
        .arcDashInitialGap((e) => (e as Position).order)
        .arcDashGap(15)
        .arcDashAnimateTime(() => defaultProps.arcTime);

      globeRef.current
        .pointsData(globeData)
        .pointColor((e) => {
          const c = (e as any).color;
          return ensureColorString(typeof c === 'function' ? c(0) : c);
        })
        .pointsMerge(true)
        .pointAltitude(0.0)
        .pointRadius(2);
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn("[Globe] arc/point setup skipped due to error", e);
      }
    }

    try {
      globeRef.current
        .ringsData([])
        .ringColor((e: any) => (t: any) => ensureColorString(e.color(t)))
        .ringMaxRadius(defaultProps.maxRings)
        .ringPropagationSpeed(RING_PROPAGATION_SPEED)
        .ringRepeatPeriod(
          (defaultProps.arcTime * defaultProps.arcLength) / Math.max(1, defaultProps.rings)
        );
    } catch {
      // ignore
    }
  };

  return (
    <>
      <threeGlobe ref={globeRef} />
    </>
  );
}

export function WebGLRendererConfig() {
  const { gl, size, scene, invalidate } = useThree();
  const [contextLost, setContextLost] = useState(false);

  // Separate effect for renderer settings that should update on size changes
  useEffect(() => {
    if (!gl) return;
    
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, [gl, size]);

  // Separate effect for context loss handling - only set up once
  useEffect(() => {
    if (!gl) return;

    const renderer = gl as unknown as WebGLRenderer;
    const canvas = renderer.domElement;

    // Guard against null canvas
    if (!canvas) return;

    const onLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };

    const onRestored = () => {
      setContextLost(false);

      try {
        // Reinitialize renderer settings
        renderer.setPixelRatio(window.devicePixelRatio);
        const currentSize = new Vector3();
        renderer.getSize(currentSize as any);
        renderer.setSize(currentSize.x, currentSize.y);
        renderer.setClearColor(0xffaaff, 0);

        // Traverse scene and mark all materials/geometries for recompilation
        scene.traverse((object: any) => {
          if (object.isMesh) {
            if (object.material) {
              object.material.needsUpdate = true;
            }
            if (object.geometry) {
              const attrs = object.geometry.attributes;
              if (attrs.position) attrs.position.needsUpdate = true;
              if (attrs.normal) attrs.normal.needsUpdate = true;
              if (attrs.uv) attrs.uv.needsUpdate = true;
            }
          }
        });

        // Force a render to restore the scene
        invalidate();
      } catch (error) {
        // Silently handle errors during restoration
      }
    };

    canvas.addEventListener("webglcontextlost", onLost, false);
    canvas.addEventListener("webglcontextrestored", onRestored, false);

    return () => {
      if (canvas) {
        canvas.removeEventListener("webglcontextlost", onLost, false);
        canvas.removeEventListener("webglcontextrestored", onRestored, false);
      }
    };
  }, [gl, scene, invalidate]);

  // Optional: Display a message when context is lost
  if (contextLost && process.env.NODE_ENV !== "production") {
    return (
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="red" transparent opacity={0.1} />
      </mesh>
    );
  }

  return null;
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);
  return (
    <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}