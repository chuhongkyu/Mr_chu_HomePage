import * as THREE from "three";

import { color } from "@/style/tokens.generated";

export type PlaceholderBoxProps = {
  position?: [number, number, number];
  size?: [number, number, number];
  color?: THREE.ColorRepresentation;
};

/**
 * 내용이 정해지지 않은 씬에 임시로 세우는 상자.
 *
 * 완성된 오브제로 오해하지 않도록 장식 없이 면과 모서리만 둔다.
 * 씬 내용이 정해지면 이 컴포넌트를 통째로 갈아끼운다.
 */
export const PlaceholderBox = ({
  position = [0, 0, 0],
  size = [6, 6, 6],
  color: faceColor = color.gray[300],
}: PlaceholderBoxProps) => {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={faceColor} roughness={0.9} />
      </mesh>

      {/* 면만 있으면 아이소메트릭에서 덩어리로 뭉개진다. 모서리를 그어 형태를 살린다. */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
        <lineBasicMaterial color={color.gray[600]} />
      </lineSegments>
    </group>
  );
};

export default PlaceholderBox;
