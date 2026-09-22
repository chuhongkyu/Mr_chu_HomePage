import { useEffect, useMemo } from "react";
import * as THREE from "three";

import { useStageEditorStore } from "@/components/profile/store/useStageEditorStore";

/**
 * 그림 속 건물이 차지하는 3D 영역. 편집 중에만 보인다.
 *
 * 평소에는 그리지 않는다. 다음 씬에서 캐릭터가 설 자리를 고를 때 쓰는 값이라
 * 화면에 나올 이유가 없다.
 */
export const BuildingVolume = () => {
  const box = useStageEditorStore((s) => s.box);

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

  return (
    <group position={box.position}>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </mesh>

      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#3b82f6" />
      </lineSegments>
    </group>
  );
};

export default BuildingVolume;
