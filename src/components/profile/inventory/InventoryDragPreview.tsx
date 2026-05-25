import { Suspense, useMemo } from "react";
import * as THREE from "three";

import { useProfilePlacementStore } from "@/components/profile/store/useProfilePlacementStore";
import {
  gridItemCenter,
  INVENTORY_GRID,
} from "@/components/profile/webgl/object/InventoryGridEngine";
import { PROFILE_ITEM_COMPONENT_REGISTRY } from "@/components/profile/webgl/object/profileItemComponentRegistry";
import { PROFILE_ITEM_MAP } from "@/components/profile/webgl/object/profileItems";

const { cellSize } = INVENTORY_GRID;

const InventoryDragPreview = () => {
  const dragState = useProfilePlacementStore((s) => s.dragState);

  if (!dragState || dragState.gridX === null || dragState.gridY === null)
    return null;

  const itemDef = PROFILE_ITEM_MAP[dragState.code];
  if (!itemDef) return null;

  const [cx, , cz] = gridItemCenter(
    dragState.gridX,
    dragState.gridY,
    itemDef.w,
    itemDef.h
  );

  const w = itemDef.w * cellSize - 0.4;
  const h = itemDef.h * cellSize - 0.4;
  const lineColor = dragState.isValidPlacement ? "#22c55e" : "#ef4444";
  const renderer = PROFILE_ITEM_COMPONENT_REGISTRY[itemDef.code];

  return (
    <group position={[cx, 0, cz]}>
      <Suspense fallback={null}>
        {renderer ? (
          renderer(itemDef)
        ) : (
          <mesh position={[0, itemDef.height / 2, 0]}>
            <boxGeometry args={[w, itemDef.height, h]} />
            <meshStandardMaterial
              color={itemDef.color}
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>
        )}
      </Suspense>
      <PreviewBox
        cy={itemDef.height / 2}
        w={w}
        height={itemDef.height}
        h={h}
        lineColor={lineColor}
      />
    </group>
  );
};

type PreviewBoxProps = {
  cy: number;
  w: number;
  height: number;
  h: number;
  lineColor: string;
};

const PreviewBox = ({ cy, w, height, h, lineColor }: PreviewBoxProps) => {
  const boxGeo = useMemo(
    () => new THREE.BoxGeometry(w, height, h),
    [w, height, h]
  );
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(boxGeo), [boxGeo]);

  return (
    <group position={[0, cy, 0]}>
      <mesh geometry={boxGeo}>
        <meshBasicMaterial
          transparent
          opacity={0.1}
          color={lineColor}
          depthWrite={false}
        />
      </mesh>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color={lineColor} />
      </lineSegments>
    </group>
  );
};

export default InventoryDragPreview;
