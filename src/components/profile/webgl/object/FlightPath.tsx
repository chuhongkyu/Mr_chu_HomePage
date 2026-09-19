import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { PaperAirplane } from "@/components/profile/webgl/object/PaperAirplane";

/** 점선 한 칸의 길이(경로 전체를 1 로 봤을 때). */
const DASH_LENGTH = 0.025;

/** 모델이 +Z 를 앞으로 보고 있다. 진행 방향으로 돌릴 때 기준이 된다. */
const FORWARD = new THREE.Vector3(0, 0, 1);

export type FlightPathProps = {
  /** 비행기가 도는 경로. 월드 좌표. */
  points: readonly (readonly [number, number, number])[];
  /** 끄면 아무것도 그리지 않는다. */
  active?: boolean;
  color?: string;
  /** 점선 개수. 경로가 길면 늘린다. */
  dashes?: number;
  /** 한 바퀴 도는 데 걸리는 시간(초). */
  seconds?: number;
  scale?: number;
};

/**
 * 종이비행기가 흰 점선을 따라 도는 연출.
 *
 * 선을 하나의 긴 관으로 만들지 않는다. 점선으로 끊어야 비행기가 지나간
 * 자취처럼 읽히고, 한 줄로 이으면 그냥 테두리가 된다.
 *
 * 경로를 밖에서 받는다. 예전에는 이 파일이 슬라이드 상태를 직접 읽어
 * 정해진 자리에서만 떴는데, 그러면 다른 씬에서 같은 연출을 쓸 수 없다.
 */
export const FlightPath = ({
  points,
  active = true,
  color = "#ffffff",
  dashes = 26,
  seconds = 9,
  scale = 2.5,
}: FlightPathProps) => {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
        // 닫힌 곡선이라 끝에서 처음으로 튀지 않고 계속 돈다.
        true,
        "catmullrom",
        0.5
      ),
    [points]
  );

  // 점선 전부가 한 재질을 나눠 쓴다. 버릴 때도 한 번만 버리면 된다.
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.5,
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
        new THREE.Mesh(new THREE.TubeGeometry(segment, 6, 0.04, 6, false), material)
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

      {/* 모델이 뒤집혀 있어서 X 로 반 바퀴 돌려 세운다. */}
      <group ref={airplane}>
        <PaperAirplane scale={scale} rotation={[Math.PI, 0, 0]} />
      </group>
    </>
  );
};

export default FlightPath;
