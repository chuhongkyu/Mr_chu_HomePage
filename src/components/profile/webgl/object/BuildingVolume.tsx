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
      {/* 뒷면만 그린다. 앞쪽 벽까지 그리면 상자가 카메라와 캐릭터 사이에
          올 때마다 그 벽이 캐릭터 위에 덮여, 반투명하게 지워진 것처럼
          보인다. 뒷면만 남기면 부피는 그대로 읽히면서 앞을 안 가린다. */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color={color}
          side={THREE.BackSide}
          transparent
          opacity={picked ? 0.28 : 0.16}
          depthWrite={false}
        />
      </mesh>

      {/* 선도 깊이를 쓰지 않는다. 불투명으로 두면 가는 선이 캐릭터를
          잘라 먹는다. */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={color} transparent depthWrite={false} />
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
