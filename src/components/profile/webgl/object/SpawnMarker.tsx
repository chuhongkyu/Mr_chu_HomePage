import * as THREE from "three";

import { STICKMAN_HEIGHT } from "@/components/profile/constants/stickman";
import { useStageEditorStore } from "@/components/profile/store/useStageEditorStore";

const COLOR = "#f97316";

/**
 * Genaimo 캐릭터가 걸어 나올 자리. 편집 중에만 보인다.
 *
 * 세워 둔 캡슐은 그 자리에 섰을 때의 실제 키다. 두 씬은 월드 스케일이 달라서
 * (Genaimo 기준 키 11.6, 당근이네 건물 높이 12) 눈으로 견줘 보지 않으면
 * 캐릭터가 건물만 해진다.
 */
export const SpawnMarker = () => {
  const spawn = useStageEditorStore((s) => s.spawn);

  const height = Math.max(STICKMAN_HEIGHT * spawn.scale, 0.01);
  const radius = height * 0.15;

  return (
    <group position={spawn.position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 1.5, radius * 1.9, 32]} />
        <meshBasicMaterial color={COLOR} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, height / 2, 0]}>
        <capsuleGeometry args={[radius, Math.max(height - radius * 2, 0.01)]} />
        <meshBasicMaterial
          color={COLOR}
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </mesh>

    </group>
  );
};

export default SpawnMarker;
