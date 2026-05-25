import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { usePlayerStore } from "@/components/profile/store/usePlayerStore";

export type JumpTrailEffectProps = {
  playerPosition?: [number, number, number];
  color?: THREE.ColorRepresentation;
};

const N_SPARKS = 12;
const CIRCLE_R = 1.4;
const SPARK_LEN = 1.2;
const TUBE_R = 0.03;
const DURATION = 0.45;

export const JumpTrailEffect = ({
  playerPosition = [0, 0, 0],
  color = 0xff9900,
}: JumpTrailEffectProps) => {
  const animation = usePlayerStore((s) => s.animation);
  const threeColor = useMemo(() => new THREE.Color(color), [color]);

  const timerRef = useRef(-1);
  const startPos = useRef(new THREE.Vector3());

  const { rootGroup, circleMat, sparkMeshes, sparkMats } = useMemo(() => {
    const group = new THREE.Group();

    // 원 라인 (thin 1px - circle은 1px로 충분)
    const circlePts = Array.from({ length: 65 }, (_, i) => {
      const a = (i / 64) * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(a) * CIRCLE_R,
        0,
        Math.sin(a) * CIRCLE_R
      );
    });
    const cMat = new THREE.LineBasicMaterial({
      color: threeColor,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    group.add(
      new THREE.Line(new THREE.BufferGeometry().setFromPoints(circlePts), cMat)
    );

    // 스파크: TubeGeometry로 굵기 구현
    const meshes: THREE.Mesh[] = [];
    const mats: THREE.MeshBasicMaterial[] = [];
    for (let i = 0; i < N_SPARKS; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: threeColor.clone(),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      // 초기엔 빈 geometry — trigger 시 TubeGeometry로 교체
      const mesh = new THREE.Mesh(new THREE.BufferGeometry(), mat);
      group.add(mesh);
      meshes.push(mesh);
      mats.push(mat);
    }

    return {
      rootGroup: group,
      circleMat: cMat,
      sparkMeshes: meshes,
      sparkMats: mats,
    };
  }, [threeColor]);

  useEffect(() => {
    if (animation !== "jump") return;
    const id = setTimeout(() => {
      startPos.current.set(playerPosition[0], 0, playerPosition[2]);
      rootGroup.position.copy(startPos.current);

      const baseAngle = Math.random() * Math.PI * 2;
      // 8개 중 2개를 롱 스파크로 고정
      const longIndices = new Set<number>();
      while (longIndices.size < 2)
        longIndices.add(Math.floor(Math.random() * N_SPARKS));

      for (let i = 0; i < N_SPARKS; i++) {
        const angle = baseAngle + (i / N_SPARKS) * Math.PI * 2;
        const tilt = angle + (Math.random() - 0.5) * 0.5;
        const radial = new THREE.Vector3(Math.cos(tilt), 0, Math.sin(tilt));
        const perp = new THREE.Vector3(-Math.sin(tilt), 0, Math.cos(tilt));

        const origin = new THREE.Vector3(
          Math.cos(angle) * CIRCLE_R,
          0,
          Math.sin(angle) * CIRCLE_R
        );

        const len = SPARK_LEN * (0.6 + Math.random() * 0.8);

        // 세그먼트 위치도 랜덤 (균등 간격 아님)
        const t1 = 0.2 + Math.random() * 0.2;
        const t2 = t1 + 0.2 + Math.random() * 0.25;
        const t3 = t2 + 0.15 + Math.random() * 0.2;

        const isLong = longIndices.has(i);
        const b1 = (Math.random() - 0.5) * 0.55;
        const b2 = (Math.random() - 0.5) * 0.45;
        const b3 = (Math.random() - 0.5) * 0.3;
        // 롱 스파크 2개는 y가 훨씬 높이 올라감
        const y1 = isLong
          ? 1.8 + Math.random() * 1.2
          : (Math.random() - 0.25) * 1.1;
        const y2 = isLong
          ? 1.0 + Math.random() * 0.8
          : (Math.random() - 0.4) * 0.9;
        const y3 = isLong
          ? 0.3 + Math.random() * 0.5
          : (Math.random() - 0.5) * 0.5;
        const yEnd = (Math.random() - 0.4) * 0.4;

        const pts = [
          origin.clone(),
          new THREE.Vector3(
            origin.x + radial.x * len * t1 + perp.x * b1,
            y1,
            origin.z + radial.z * len * t1 + perp.z * b1
          ),
          new THREE.Vector3(
            origin.x + radial.x * len * t2 + perp.x * b2,
            y2,
            origin.z + radial.z * len * t2 + perp.z * b2
          ),
          new THREE.Vector3(
            origin.x + radial.x * len * t3 + perp.x * b3,
            y3,
            origin.z + radial.z * len * t3 + perp.z * b3
          ),
          new THREE.Vector3(
            origin.x + radial.x * len,
            yEnd,
            origin.z + radial.z * len
          ),
        ];

        // TubeGeometry 교체
        sparkMeshes[i].geometry.dispose();
        sparkMeshes[i].geometry = new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(pts),
          12, // tubular segments
          TUBE_R,
          5, // radial segments
          false
        );
      }

      timerRef.current = 0;
    }, 1600);
    return () => clearTimeout(id);
  }, [animation, playerPosition, rootGroup, sparkMeshes]);

  useFrame((_, delta) => {
    if (timerRef.current < 0) return;
    timerRef.current += delta;
    const t = timerRef.current;

    if (t > DURATION) {
      timerRef.current = -1;
      circleMat.opacity = 0;
      sparkMats.forEach((m) => (m.opacity = 0));
      return;
    }

    const fade = Math.pow(1 - t / DURATION, 1.5);
    circleMat.opacity = fade * 0.65;
    sparkMats.forEach((m) => (m.opacity = fade * 0.95));
  });

  useEffect(() => {
    return () => {
      sparkMeshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      sparkMats.forEach((m) => m.dispose());
      rootGroup.traverse((child) => {
        if (child instanceof THREE.Line) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
    };
  }, [rootGroup, sparkMeshes, sparkMats]);

  return <primitive object={rootGroup} />;
};
