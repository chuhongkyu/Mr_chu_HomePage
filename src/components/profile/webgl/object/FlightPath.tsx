import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { usePlayerStore } from "@/components/profile/store/usePlayerStore";
import { GRID_CENTER } from "@/components/profile/webgl/object/InventoryGridEngine";
import { PaperAirplane } from "@/components/profile/webgl/object/PaperAirplane";

const [cx, , cz] = GRID_CENTER;

// 화면 좌 → 우 (카메라가 -X 방향을 바라보므로 Z축이 화면 좌우)
const CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(cx - 2, 5.0, cz + 4),
    new THREE.Vector3(cx - 3, 4.5, cz + 1.5),
    new THREE.Vector3(cx - 3, 4.0, cz + 0),
    new THREE.Vector3(cx - 3, 4.5, cz - 1.5),
    new THREE.Vector3(cx - 2, 5.0, cz - 4),
  ],
  false,
  "catmullrom",
  0.5
);

const SPEED = 0.04;
const _forward = new THREE.Vector3(0, 0, 1);

// 굵은 점선: TubeGeometry 대시 세그먼트
const dashGroup = (() => {
  const group = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0.5,
  });
  const N = 22;
  const DASH_T = 0.025; // 대시 길이 (t 단위)

  for (let i = 0; i < N; i++) {
    const t0 = i / N;
    const t1 = t0 + DASH_T;
    const pts: THREE.Vector3[] = [];
    for (let j = 0; j <= 6; j++) {
      pts.push(CURVE.getPoint(t0 + (t1 - t0) * (j / 6)));
    }
    const geo = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(pts),
      6,
      0.04,
      6,
      false
    );
    group.add(new THREE.Mesh(geo, mat));
  }
  return group;
})();

export const FlightPath = () => {
  const slideIndex = usePlayerStore((s) => s.slideIndex);
  const show = slideIndex === 1;

  const airplaneRef = useRef<THREE.Group>(null);
  const tRef = useRef(0);

  useFrame((_, delta) => {
    if (!show || !airplaneRef.current) return;

    tRef.current = (tRef.current + delta * SPEED) % 1;
    const t = tRef.current;

    const pos = CURVE.getPoint(t);
    const tangent = CURVE.getTangent(t).normalize();

    airplaneRef.current.position.copy(pos);
    airplaneRef.current.quaternion.setFromUnitVectors(_forward, tangent);
  });

  if (!show) return null;

  return (
    <>
      {/* 점선 경로 */}
      <primitive object={dashGroup} />

      {/* 종이 비행기 — rotation으로 모델 방향 보정 */}
      <group ref={airplaneRef}>
        <PaperAirplane scale={2.5} rotation={[Math.PI, 0, 0]} />
      </group>
    </>
  );
};
