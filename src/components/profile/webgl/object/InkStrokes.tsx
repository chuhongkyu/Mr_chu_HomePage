import { useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { usePlayerStore } from "@/components/profile/store/usePlayerStore";
import { GRID_CENTER } from "@/components/profile/webgl/object/InventoryGridEngine";

const [cx, , cz] = GRID_CENTER;

const CURVE_SEGS = 40;
const TOTAL_INDICES = CURVE_SEGS * 6;
const UV_TILES = 1;
const DRAW_SPEED = 0.25;
const WAIT_BETWEEN = 0.4;
const MAX_STROKES = 3;

const buildBrushGeo = () => {
  const numPts = 3 + Math.floor(Math.random() * 4);
  const length = 14 + Math.random() * 8;
  const angle = Math.random() * Math.PI;
  const dir = new THREE.Vector2(Math.cos(angle), Math.sin(angle));
  const perp = new THREE.Vector2(-dir.y, dir.x);

  const ts = [0, ...Array.from({ length: numPts - 2 }, () => Math.random()), 1]
    .sort((a, b) => a - b)
    .map((v) => v - 0.5);

  let side = Math.random() < 0.5 ? 1 : -1;
  const ctrlPts = ts.map((t) => {
    side *= -1;
    const sway = side * (0.6 + Math.random() * 1.3);
    const jitter = (Math.random() - 0.5) * 0.5;
    return new THREE.Vector3(
      cx + dir.x * t * length + perp.x * (sway + jitter),
      0.008,
      cz + dir.y * t * length + perp.y * (sway + jitter)
    );
  });

  const curve = new THREE.CatmullRomCurve3(ctrlPts, false, "catmullrom", 0.5);
  const points = curve.getPoints(CURVE_SEGS);

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= CURVE_SEGS; i++) {
    const t = i / CURVE_SEGS;
    const p = points[i];
    // 양끝 테이퍼: sin 프로파일로 끝이 가늘어짐
    const w =
      (0.45 + Math.random() * 0.15) * (0.08 + 0.92 * Math.sin(t * Math.PI));

    const tangent =
      i < CURVE_SEGS
        ? new THREE.Vector3().subVectors(points[i + 1], p).normalize()
        : new THREE.Vector3().subVectors(p, points[i - 1]).normalize();
    const perpDir = new THREE.Vector3(-tangent.z, 0, tangent.x);

    positions.push(
      p.x - perpDir.x * w,
      p.y,
      p.z - perpDir.z * w,
      p.x + perpDir.x * w,
      p.y,
      p.z + perpDir.z * w
    );
    uvs.push(0, t * UV_TILES, 1, t * UV_TILES);

    if (i > 0) {
      const base = (i - 1) * 2;
      indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return geo;
};

type Stroke = { mesh: THREE.Mesh; fraction: number; done: boolean };

export const InkStrokes = () => {
  const currentPostId = usePlayerStore((s) => s.currentPostId);
  const brushTexture = useTexture("/assets/textures/brush.png", (tex) => {
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.RepeatWrapping;
  });
  const groupRef = useRef<THREE.Group>(null);
  const strokes = useRef<Stroke[]>([]);
  const waitTimer = useRef(0);
  const waiting = useRef(false);
  const totalDrawn = useRef(0);

  const addStroke = () => {
    if (!groupRef.current) return;
    if (totalDrawn.current >= MAX_STROKES) return;

    const geo = buildBrushGeo();
    geo.setDrawRange(0, 0);
    const mat = new THREE.MeshBasicMaterial({
      map: brushTexture,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      alphaTest: 0.05,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    groupRef.current.add(mesh);
    strokes.current.push({ mesh, fraction: 0, done: false });
    totalDrawn.current += 1;
  };

  const clearAll = () => {
    if (!groupRef.current) return;
    strokes.current.forEach((s) => {
      groupRef.current?.remove(s.mesh);
      s.mesh.geometry.dispose();
      (s.mesh.material as THREE.MeshBasicMaterial).dispose();
    });
    strokes.current = [];
    totalDrawn.current = 0;
    waiting.current = false;
  };

  useEffect(() => () => clearAll(), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const isBrush = currentPostId === "artme_brush";

    if (!isBrush) {
      strokes.current.forEach((s) => {
        const mat = s.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, mat.opacity - delta * 2);
        if (mat.opacity <= 0) groupRef.current?.remove(s.mesh);
      });
      strokes.current = strokes.current.filter(
        (s) => (s.mesh.material as THREE.MeshBasicMaterial).opacity > 0
      );
      if (strokes.current.length === 0) {
        totalDrawn.current = 0;
        waiting.current = false;
      }
      return;
    }

    if (
      strokes.current.length === 0 &&
      !waiting.current &&
      totalDrawn.current === 0
    ) {
      addStroke();
    }

    const active = strokes.current.find((s) => !s.done);
    if (active) {
      active.fraction = Math.min(1, active.fraction + delta * DRAW_SPEED);
      active.mesh.geometry.setDrawRange(
        0,
        Math.floor(active.fraction * TOTAL_INDICES)
      );
      if (active.fraction >= 1) {
        active.done = true;
        waitTimer.current = 0;
        waiting.current = true;
      }
    } else if (waiting.current) {
      waitTimer.current += delta;
      if (waitTimer.current >= WAIT_BETWEEN) {
        waiting.current = false;
        addStroke();
      }
    }
  });

  return <group ref={groupRef} />;
};
