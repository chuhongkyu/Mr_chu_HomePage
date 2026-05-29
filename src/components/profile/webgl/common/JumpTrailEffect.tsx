import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { usePlayerStore } from "@/components/profile/store/usePlayerStore";

export type JumpTrailEffectProps = {
  playerPosition?: [number, number, number];
  color?: THREE.ColorRepresentation;
};

const N_SPARKS = 14;
const CIRCLE_R = 1.4;
const SPARK_LEN = 1.6;
const TUBE_R = 0.04;
const DURATION = 0.45;
const SPARK_DURATIONS = [0.45, 1.2, 0.8] as const;

const buildLightningPts = (
  a: THREE.Vector3,
  b: THREE.Vector3,
  depth: number,
  disp: number
): THREE.Vector3[] => {
  if (depth === 0) return [a, b];
  const t = 0.4 + Math.random() * 0.2;
  const mid = a.clone().lerp(b, t);
  const dir = b.clone().sub(a);
  const perp = new THREE.Vector3(-dir.z, 0, dir.x).normalize();
  mid.addScaledVector(perp, (Math.random() - 0.5) * disp);
  mid.y += (Math.random() - 0.3) * disp * 0.8;
  const left = buildLightningPts(a, mid, depth - 1, disp * 0.55);
  const right = buildLightningPts(mid, b, depth - 1, disp * 0.55);
  return [...left, ...right.slice(1)];
};

export const JumpTrailEffect = ({
  playerPosition = [0, 0, 0],
  color = 0xff9900,
}: JumpTrailEffectProps) => {
  const animation = usePlayerStore((s) => s.animation);
  const threeColor = useMemo(() => new THREE.Color(color), [color]);

  const timerRef = useRef(-1);
  const startPos = useRef(new THREE.Vector3());
  const sparkDurationsRef = useRef<number[]>(Array(N_SPARKS).fill(DURATION));

  const { rootGroup, circleMat, sparkMeshes, sparkMats } = useMemo(() => {
    const group = new THREE.Group();

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

      const longIndices = new Set<number>();
      while (longIndices.size < 2)
        longIndices.add(Math.floor(Math.random() * N_SPARKS));

      for (let i = 0; i < N_SPARKS; i++) {
        sparkDurationsRef.current[i] =
          SPARK_DURATIONS[Math.floor(Math.random() * SPARK_DURATIONS.length)];

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
        const isLong = longIndices.has(i);

        const end = new THREE.Vector3(
          origin.x + radial.x * len,
          isLong ? 2.2 + Math.random() * 1.0 : (Math.random() - 0.3) * 1.2,
          origin.z + radial.z * len
        );

        const zigzag = buildLightningPts(origin.clone(), end, 3, len * 0.45);

        const path = new THREE.CurvePath<THREE.Vector3>();
        for (let j = 0; j < zigzag.length - 1; j++) {
          path.add(new THREE.LineCurve3(zigzag[j], zigzag[j + 1]));
        }

        sparkMeshes[i].geometry.dispose();
        sparkMeshes[i].geometry = new THREE.TubeGeometry(
          path,
          (zigzag.length - 1) * 2,
          TUBE_R,
          4,
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

    const circleFade = Math.pow(1 - t / DURATION, 1.5);
    circleMat.opacity = circleFade * 0.65;

    sparkMats.forEach((m, i) => {
      const dur = sparkDurationsRef.current[i];
      const fade = t >= dur ? 0 : Math.pow(1 - t / dur, 1.5);
      m.opacity = fade * 0.95;
    });
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
