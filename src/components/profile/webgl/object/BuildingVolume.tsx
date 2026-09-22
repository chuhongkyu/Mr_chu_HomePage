import { useEffect, useMemo } from "react";
import * as THREE from "three";

import type { BuildingBox } from "@/components/profile/constants/daangnStage";
import { useStageEditorStore } from "@/components/profile/store/useStageEditorStore";

/** 고른 칸만 주황. 다섯 개가 겹쳐 서면 어느 걸 끌고 있는지 알 수 없다. */
const PICKED = "#f97316";
const PLAIN = "#3b82f6";

const Volume = ({ box, picked }: { box: BuildingBox; picked: boolean }) => {
  const geometry = useMemo(
    () => new THREE.BoxGeometry(...box.size),
    [box.size]
  );
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useEffect(
    () => () => {
      geometry.dispose();
      edges.dispose();
    },
    [geometry, edges]
  );

  const color = picked ? PICKED : PLAIN;

  return (
    <group position={box.position}>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={picked ? 0.28 : 0.16}
          depthWrite={false}
        />
      </mesh>

      <lineSegments geometry={edges}>
        <lineBasicMaterial color={color} />
      </lineSegments>
    </group>
  );
};

/**
 * 캐릭터가 못 들어가는 구역들. 편집 중에만 보인다.
 *
 * 평소에는 그리지 않는다. 자리를 고를 때 쓰는 값이라 화면에 나올 이유가 없다.
 */
export const BuildingVolume = () => {
  const boxes = useStageEditorStore((s) => s.boxes);
  const target = useStageEditorStore((s) => s.target);

  return (
    <>
      {boxes.map((box, index) => (
        <Volume key={index} box={box} picked={target === index} />
      ))}
    </>
  );
};

export default BuildingVolume;
