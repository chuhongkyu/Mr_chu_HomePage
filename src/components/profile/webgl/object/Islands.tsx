import { useEffect, useMemo, useRef } from "react";
import { Float } from "@react-three/drei";
import * as THREE from "three";

import { usePlayerStore } from "@/components/profile/store/usePlayerStore";
import { GRID_CENTER } from "@/components/profile/webgl/object/InventoryGridEngine";
import outlineFrag from "@/shaders/outline.frag.glsl";
import outlineVert from "@/shaders/outline.vert.glsl";

// ── shapes ──────────────────────────────────────────────────────────────────

function shapeElongated(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0, 1.0);
  s.bezierCurveTo(0.7, 1.4, 1.8, 1.2, 2.3, 0.5);
  s.bezierCurveTo(2.9, -0.3, 2.6, -1.1, 1.7, -1.3);
  s.bezierCurveTo(0.8, -1.6, -0.4, -1.4, -1.2, -0.8);
  s.bezierCurveTo(-2.0, -0.1, -1.8, 0.8, -0.9, 1.1);
  s.bezierCurveTo(-0.3, 1.3, -0.1, 0.7, 0, 1.0);
  return s;
}

// ── config ───────────────────────────────────────────────────────────────────

type IslandDef = {
  shape: THREE.Shape;
  offset: [number, number, number];
  color: string;
  scale: number;
  floatSpeed: number;
  floatIntensity: number;
};

const DEFS: IslandDef[] = [
  {
    shape: shapeElongated(),
    offset: [2, 0, -2],
    color: "#78aa50",
    scale: 1,
    floatSpeed: 0.82,
    floatIntensity: 0.4,
  },
];

const EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth: 0.35,
  bevelEnabled: true,
  bevelThickness: 0.06,
  bevelSize: 0.05,
  bevelSegments: 2,
};

// ── Island (single) ──────────────────────────────────────────────────────────

type IslandMeshProps = {
  def: IslandDef;
};

function popScale(t: number): number {
  // 0→0.6: easeOutQuad overshoot to 1.2, 0.6→1: settle to 1.0
  if (t < 0.6) return (2 - t / 0.6) * (t / 0.6) * 1.2;
  return 1.2 - ((t - 0.6) / 0.4) * 0.2;
}

const IslandMesh = ({ def }: IslandMeshProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const { geo, mat, outlineMat } = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(def.shape, EXTRUDE);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshToonMaterial({
      color: new THREE.Color(def.color),
    });
    const outlineMat = new THREE.ShaderMaterial({
      vertexShader: outlineVert,
      fragmentShader: outlineFrag,
      uniforms: { outlineWidth: { value: 0.04 } },
      side: THREE.BackSide,
    });
    return { geo, mat, outlineMat };
  }, [def]);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    group.scale.setScalar(0);

    const start = performance.now();
    const DURATION = 380;
    let raf: number;

    const animate = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      group.scale.setScalar(popScale(t) * def.scale);
      if (t < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [def.scale]);

  useEffect(
    () => () => {
      geo.dispose();
      mat.dispose();
      outlineMat.dispose();
    },
    [geo, mat, outlineMat]
  );

  const pos: [number, number, number] = [
    GRID_CENTER[0] + def.offset[0],
    def.offset[1],
    GRID_CENTER[2] + def.offset[2],
  ];

  return (
    <Float
      speed={def.floatSpeed}
      floatIntensity={def.floatIntensity}
      rotationIntensity={0}
    >
      <group ref={groupRef} position={pos}>
        <mesh geometry={geo} material={mat} castShadow receiveShadow />
        <mesh geometry={geo} material={outlineMat} />
      </group>
    </Float>
  );
};

// ── Islands ──────────────────────────────────────────────────────────────────

export const Islands = () => {
  const slideIndex = usePlayerStore((s) => s.slideIndex);
  const animation = usePlayerStore((s) => s.animation);
  const show = slideIndex === 1 && animation === "idle";

  if (!show) return null;

  return (
    <>
      {DEFS.map((def, i) => (
        <IslandMesh key={i} def={def} />
      ))}
    </>
  );
};
