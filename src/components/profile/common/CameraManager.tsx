"use client";

import { OrbitControls, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";

import { GRID_CENTER } from "@/components/profile/inventory/InventoryGridEngine";
import { useInventoryStore } from "@/components/profile/store/useInventoryStore";
import { useProfilePlacementStore } from "@/components/profile/store/useProfilePlacementStore";

const [cx, cy, cz] = GRID_CENTER;

const PERSPECTIVE_POSITION: [number, number, number] = [cx + 15, 15, cz + 15];
const PERSPECTIVE_INVENTORY_POSITION: [number, number, number] = [cx + 20, 22, cz + 20];
const ISOMETRIC_POSITION: [number, number, number] = [cx + 16, 16, cz + 16];
const ISO_ZOOM = 70;
const ISO_INVENTORY_ZOOM = 52;

const CameraManager = () => {
  const cameraMode = useInventoryStore((s) => s.cameraMode);
  const isInventoryOpen = useProfilePlacementStore((s) => s.isInventoryOpen);

  const perspPos = isInventoryOpen ? PERSPECTIVE_INVENTORY_POSITION : PERSPECTIVE_POSITION;
  const isoZoom = isInventoryOpen ? ISO_INVENTORY_ZOOM : ISO_ZOOM;

  return (
    <>
      {cameraMode === "perspective" ? (
        <PerspectiveCamera makeDefault fov={30} position={perspPos} near={0.1} far={200} />
      ) : (
        <OrthographicCamera makeDefault zoom={isoZoom} position={ISOMETRIC_POSITION} near={0.1} far={500} />
      )}

      <OrbitControls
        target={[cx, cy + 4, cz]}
        enablePan
        enableZoom={!isInventoryOpen}
        enableRotate={cameraMode === "perspective" && !isInventoryOpen}
        minDistance={12}
        maxDistance={30}
        minZoom={10}
        maxZoom={100}
        makeDefault
      />
    </>
  );
};

export default CameraManager;
