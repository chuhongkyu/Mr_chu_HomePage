import { RoundedBox } from "@react-three/drei";
import { useTexture } from "@react-three/drei";

import { INVENTORY_GRID } from "@/components/profile/webgl/object/InventoryGridEngine";

const { cellSize } = INVENTORY_GRID;
const GAP = 0.4;

type Props = {
  w: number;
  h: number;
  height: number;
};

const IceCube = ({ w, h, height }: Props) => {
  const matcap = useTexture("/assets/matcap/ice.jpg");

  return (
    <RoundedBox
      position={[0, height / 2, 0]}
      args={[w * cellSize - GAP, height, h * cellSize - GAP]}
      radius={0.3}
      smoothness={4}
      castShadow
      receiveShadow
    >
      <meshMatcapMaterial matcap={matcap} />
    </RoundedBox>
  );
};

export default IceCube;
