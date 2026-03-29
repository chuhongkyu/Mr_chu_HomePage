import { Suspense } from "react";

import InventoryItem from "@/components/profile/inventory/InventoryItem";
import { PROFILE_ITEMS } from "@/components/profile/object/profileItems";
import { INVENTORY_GRID } from "@/components/profile/object/InventoryGridEngine";
import { useProfileActivePlacedObjects } from "@/components/profile/store/useProfilePlacementStore";

const { cellSize } = INVENTORY_GRID;

// 씬 로드 시 모든 item 타입의 material을 미리 컴파일 → 첫 배치 시 flash 없음
const WarmupMeshes = () => (
  <group visible={false} position={[-9999, -9999, -9999]}>
    {PROFILE_ITEMS.map((item) => (
      <mesh key={item.code}>
        <boxGeometry args={[item.w * cellSize, item.height, item.h * cellSize]} />
        <meshStandardMaterial
          color={item.color}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
    ))}
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
