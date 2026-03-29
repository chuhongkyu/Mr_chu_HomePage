import React from "react";
import { Text } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";

import { PROFILE_ITEM_MAP } from "@/components/profile/object/profileItems";
import type { PlacedProfileObject } from "@/components/profile/store/useProfilePlacementStore";
import { useProfilePlacementStore } from "@/components/profile/store/useProfilePlacementStore";
import { gridItemCenter, INVENTORY_GRID } from "@/components/profile/object/InventoryGridEngine";

import { profileDragScreenPosition } from "./dragScreenPosition";

const GAP = 0.4;
const { cellSize } = INVENTORY_GRID;
const DRAG_THRESHOLD_PX = 3;

type Props = {
  item: PlacedProfileObject;
};

const InventoryItem = ({ item }: Props) => {
  const isEditMode = useProfilePlacementStore((s) => s.isEditMode);
  const dragState = useProfilePlacementStore((s) => s.dragState);
  const startDrag = useProfilePlacementStore((s) => s.startDrag);
  const endDrag = useProfilePlacementStore((s) => s.endDrag);
  const cancelDrag = useProfilePlacementStore((s) => s.cancelDrag);

  const itemDef = PROFILE_ITEM_MAP[item.code];
  if (!itemDef) return null;

  const [cx, , cz] = gridItemCenter(item.gridX, item.gridY, itemDef.w, itemDef.h);
  const isBeingDragged =
    dragState?.source === "scene" && dragState?.sourceObjectId === item.id;

  const onPointerDown = React.useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (!isEditMode) return;
      if (!e.nativeEvent.isPrimary) return;
      e.stopPropagation();

      const startX = e.nativeEvent.clientX;
      const startY = e.nativeEvent.clientY;
      let isDragging = false;

      const onPointerMove = (ev: PointerEvent) => {
        if (isDragging) {
          profileDragScreenPosition.x = ev.clientX;
          profileDragScreenPosition.y = ev.clientY;
          return;
        }
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        if (dx * dx + dy * dy >= DRAG_THRESHOLD_PX * DRAG_THRESHOLD_PX) {
          isDragging = true;
          profileDragScreenPosition.x = ev.clientX;
          profileDragScreenPosition.y = ev.clientY;
          profileDragScreenPosition.active = true;
          startDrag("scene", item.code, item.id);
        }
      };

      const cleanup = () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerCancel);
        profileDragScreenPosition.active = false;
        isDragging = false;
      };

      const onPointerUp = () => {
        const wasDragging = isDragging;
        cleanup();
        if (wasDragging) endDrag();
      };

      const onPointerCancel = () => {
        const wasDragging = isDragging;
        cleanup();
        if (wasDragging) cancelDrag();
      };

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerCancel);
    },
    [isEditMode, item.code, item.id, startDrag, endDrag, cancelDrag]
  );

  return (
    <group position={[cx, 0, cz]} visible={!isBeingDragged}>
      <mesh
        position={[0, itemDef.height / 2, 0]}
        castShadow
        receiveShadow
        onPointerDown={isEditMode ? onPointerDown : undefined}
      >
        <boxGeometry args={[itemDef.w * cellSize - GAP, itemDef.height, itemDef.h * cellSize - GAP]} />
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
        maxWidth={itemDef.w * cellSize}
      >
        {itemDef.label}
      </Text>
    </group>
  );
};

export default InventoryItem;
