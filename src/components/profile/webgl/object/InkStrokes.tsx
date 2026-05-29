import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { SLIDE_CONFIGS } from "@/components/profile/constants/slideConfig";
import { usePlayerStore } from "@/components/profile/store/usePlayerStore";
import { GRID_CENTER } from "@/components/profile/webgl/object/InventoryGridEngine";

const BRUSH_INDEX = SLIDE_CONFIGS.findIndex((s) => s.postId === "artme_brush");
const [cx, , cz] = GRID_CENTER;

const TUBE_SEGS = 200;
const RADIAL_SEGS = 8;
const MAX_INDEX = TUBE_SEGS * RADIAL_SEGS * 6;
const DRAW_SPEED = 0.42;
const WAIT_BETWEEN = 0.5;
const MAX_STROKES = 3;

const buildGeo = () => {
  const numPts = 2 + Math.floor(Math.random() * 5); // 5~9개 랜덤
  const length = 10 + Math.random() * 4;
  const angle = Math.random() * Math.PI;
  const dir = new THREE.Vector2(Math.cos(angle), Math.sin(angle));
  const perp = new THREE.Vector2(-dir.y, dir.x);

  // t 값을 불균등하게 배분 (꺾이는 위치가 매번 달라짐)
  const ts = [0, ...Array.from({ length: numPts - 2 }, () => Math.random()), 1]
    .sort((a, b) => a - b)
    .map((v) => v - 0.5);

  // 꺾임 방향도 랜덤 (교대 패턴 제거)
  let side = Math.random() < 0.5 ? 1 : -1;
  const pts = ts.map((t) => {
    side *= -1;
    const sway = side * (0.6 + Math.random() * 1.3);
    const jitter = (Math.random() - 0.5) * 0.5;
    return new THREE.Vector3(
      cx + dir.x * t * length + perp.x * (sway + jitter),
      0.008,
      cz + dir.y * t * length + perp.y * (sway + jitter)
    );
  });

  const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
  const radius = 0.03 + Math.random() * 0.025;
  return new THREE.TubeGeometry(curve, TUBE_SEGS, radius, RADIAL_SEGS, false);
};

type Stroke = { mesh: THREE.Mesh; fraction: number; done: boolean };

export const InkStrokes = () => {
  const slideIndex = usePlayerStore((s) => s.slideIndex);
  const groupRef = useRef<THREE.Group>(null);
  const strokes = useRef<Stroke[]>([]);
  const waitTimer = useRef(0);
  const waiting = useRef(false);
  const totalDrawn = useRef(0);

  const addStroke = () => {
    if (!groupRef.current) return;
    if (totalDrawn.current >= MAX_STROKES) return;

    const mesh = new THREE.Mesh(
      buildGeo(),
      new THREE.MeshBasicMaterial({
        color: "#0a0a0a",
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
      })
    );
    mesh.geometry.setDrawRange(0, 0);
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
    const isBrush = slideIndex === BRUSH_INDEX;

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

    // 첫 선 시작
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
        Math.floor(active.fraction * MAX_INDEX)
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
        addStroke(); // MAX_STROKES 도달 시 내부에서 return
      }
    }
  });

  return <group ref={groupRef} />;
};
