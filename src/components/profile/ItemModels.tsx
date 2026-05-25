import { Suspense } from "react";

import InventoryItem from "@/components/profile/inventory/InventoryItem";
import { useProfileActivePlacedObjects } from "@/components/profile/store/useProfilePlacementStore";
import { INVENTORY_GRID } from "@/components/profile/webgl/object/InventoryGridEngine";
import { PROFILE_ITEM_COMPONENT_REGISTRY } from "@/components/profile/webgl/object/profileItemComponentRegistry";
import { PROFILE_ITEMS } from "@/components/profile/webgl/object/profileItems";

const { cellSize } = INVENTORY_GRID;

// 씬 로드 시 모든 material을 미리 컴파일 → 첫 배치 시 flash 없음
const WarmupMeshes = () => (
  <group visible={false} position={[-9999, -9999, -9999]}>
    {PROFILE_ITEMS.map((item) => {
      const renderer = PROFILE_ITEM_COMPONENT_REGISTRY[item.code];
      return (
        <group key={item.code}>
          {renderer ? (
            renderer(item)
          ) : (
            <mesh>
              <boxGeometry
                args={[item.w * cellSize, item.height, item.h * cellSize]}
              />
              <meshStandardMaterial
                color={item.color}
                roughness={0.4}
                metalness={0.3}
              />
            </mesh>
          )}
        </group>
      );
    })}
  </group>
);

const ItemModels = () => {
  const items = useProfileActivePlacedObjects();

  return (
    <>
      <WarmupMeshes />
      {items.map((item) => (
        <Suspense key={item.id} fallback={null}>
          <InventoryItem item={item} />
        </Suspense>
      ))}
    </>
  );
};

export default ItemModels;
