import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { PaperAirplane } from "@/components/profile/webgl/object/PaperAirplane";

/** 경로 전체를 1 로 봤을 때. */
const DASH_LENGTH = 0.025;

/**
 * 배경(`#e1e1e1`)에서 읽히는 파랑.
 *
 * 흰색은 1.31:1, 하늘색(#33CCF2)은 1.45:1 이라 둘 다 바탕에 묻힌다.
 * 이 값은 5.12:1 이고, 씬의 WebGL 선과 같은 파랑이라 따로 놀지 않는다.
 */
const FLIGHT_BLUE = "#1D4ED8";

/** 0.5 면 바탕에 섞여 2.16:1 까지 떨어진다. */
const DASH_OPACITY = 0.8;

/** 모델이 +Z 를 앞으로 본다. */
const FORWARD = new THREE.Vector3(0, 0, 1);

export type FlightPathProps = {
  /** 월드 좌표. */
  points: readonly (readonly [number, number, number])[];
  active?: boolean;
  color?: string;
  dashes?: number;
  /** 한 바퀴(초). */
  seconds?: number;
  scale?: number;
};

/**
 * 종이비행기가 점선을 따라 도는 연출.
 *
 * 선을 하나의 긴 관으로 잇지 마라. 점선이라야 지나간 자취로 읽히고,
 * 이으면 그냥 테두리가 된다.
 */
export const FlightPath = ({
  points,
  active = true,
  color = FLIGHT_BLUE,
  dashes = 26,
  seconds = 9,
  scale = 5,
}: FlightPathProps) => {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
        // 닫아야 끝에서 처음으로 튀지 않는다.
        true,
        "catmullrom",
        0.5
      ),
    [points]
  );

  // 점선 전부가 나눠 쓴다. 버릴 때도 한 번만.
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: DASH_OPACITY,
        depthWrite: false,
      }),
    [color]
  );

  const dashGroup = useMemo(() => {
    const group = new THREE.Group();

    for (let i = 0; i < dashes; i += 1) {
      const start = i / dashes;
      const segment = new THREE.CatmullRomCurve3(
        Array.from({ length: 7 }, (_, j) =>
          curve.getPoint((start + DASH_LENGTH * (j / 6)) % 1)
        )
      );
      group.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(segment, 6, 0.04, 6, false),
          material
        )
      );
    }

    return group;
  }, [curve, dashes, material]);

  useEffect(
    () => () => {
      dashGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh) child.geometry.dispose();
      });
    },
    [dashGroup]
  );

  useEffect(() => () => material.dispose(), [material]);

  const airplane = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!active || !airplane.current) return;

    const t = (clock.elapsedTime / seconds) % 1;
    airplane.current.position.copy(curve.getPoint(t));
    airplane.current.quaternion.setFromUnitVectors(
      FORWARD,
      curve.getTangent(t).normalize()
    );
  });

  if (!active) return null;

  return (
    <>
      <primitive object={dashGroup} />

      {/* 모델이 뒤집혀 있다. */}
      <group ref={airplane}>
        <PaperAirplane color={color} scale={scale} rotation={[Math.PI, 0, 0]} />
      </group>
    </>
  );
};

export default FlightPath;
