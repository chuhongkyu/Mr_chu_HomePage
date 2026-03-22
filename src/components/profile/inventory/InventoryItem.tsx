import { Text } from "@react-three/drei";

import { PROFILE_ITEM_MAP } from "@/components/profile/constants/profileItems";
import type { PlacedProfileObject } from "@/components/profile/store/useProfilePlacementStore";
import { useProfilePlacementStore } from "@/components/profile/store/useProfilePlacementStore";

import { gridItemCenter } from "./InventoryGridEngine";

const GAP = 0.08;

type Props = {
  item: PlacedProfileObject;
};

const InventoryItem = ({ item }: Props) => {
  const dragState = useProfilePlacementStore((s) => s.dragState);
  const itemDef = PROFILE_ITEM_MAP[item.code];

  if (!itemDef) return null;

  const [cx, , cz] = gridItemCenter(item.gridX, item.gridY, itemDef.w, itemDef.h);
  const isBeingDragged =
    dragState?.source === "scene" && dragState?.sourceObjectId === item.id;

  return (
    <group position={[cx, 0, cz]} visible={!isBeingDragged}>
      <mesh position={[0, itemDef.height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[itemDef.w - GAP, itemDef.height, itemDef.h - GAP]} />
        <meshStandardMaterial
          color={itemDef.color}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      <Text
        position={[0, itemDef.height + 0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={itemDef.w}
      >
        {itemDef.label}
      </Text>
    </group>
  );
};

export default InventoryItem;
