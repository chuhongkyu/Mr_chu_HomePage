import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { profileDragScreenPosition } from "@/components/profile/inventory/dragScreenPosition";
import { useProfilePlacementStore } from "@/components/profile/store/useProfilePlacementStore";
import { INVENTORY_GRID } from "@/components/profile/webgl/object/InventoryGridEngine";

const FLOOR_PLANE = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const tempVec2 = new THREE.Vector2();
const tempVec3 = new THREE.Vector3();
const tempRaycaster = new THREE.Raycaster();

const { originWorld, cellSize, cols, rows } = INVENTORY_GRID;

const worldToGridCoords = (worldX: number, worldZ: number) => {
  const gridX = Math.floor((worldX - originWorld[0]) / cellSize);
  const gridY = Math.floor((worldZ - originWorld[2]) / cellSize);
  const outOfBounds = gridX < 0 || gridX >= cols || gridY < 0 || gridY >= rows;
  return { gridX, gridY, outOfBounds };
};

const InventorySceneRaycaster = () => {
  const isInventoryOpen = useProfilePlacementStore((s) => s.isInventoryOpen);
  const dragState = useProfilePlacementStore((s) => s.dragState);
  const updateDrag = useProfilePlacementStore((s) => s.updateDrag);
  const { camera, gl } = useThree();

  useFrame(() => {
    if (!isInventoryOpen || !dragState || !profileDragScreenPosition.active)
      return;

    const rect = gl.domElement.getBoundingClientRect();
    tempVec2.x =
      ((profileDragScreenPosition.x - rect.left) / rect.width) * 2 - 1;
    tempVec2.y =
      -((profileDragScreenPosition.y - rect.top) / rect.height) * 2 + 1;

    tempRaycaster.setFromCamera(tempVec2, camera);
    const hit = tempRaycaster.ray.intersectPlane(FLOOR_PLANE, tempVec3);

    if (!hit) {
      updateDrag({
        worldPos: [0, 0, 0],
        gridX: null,
        gridY: null,
        outOfBounds: true,
      });
      return;
    }

    const { gridX, gridY, outOfBounds } = worldToGridCoords(
      tempVec3.x,
      tempVec3.z
    );
    updateDrag({
      worldPos: [tempVec3.x, 0, tempVec3.z],
      gridX,
      gridY,
      outOfBounds,
    });
  });

  return null;
};

export default InventorySceneRaycaster;
