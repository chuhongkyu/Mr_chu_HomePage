"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import CameraManager from "@/components/profile/common/CameraManager";
import Lights from "@/components/profile/common/Lights";
import InventoryDragPreview from "@/components/profile/inventory/InventoryDragPreview";
import InventoryGrid from "@/components/profile/inventory/InventoryGrid";
import InventorySceneRaycaster from "@/components/profile/inventory/InventorySceneRaycaster";
import ItemModels from "@/components/profile/ItemModels";
import { Player } from "@/components/profile/character/Player";
import { GRID_CENTER } from "@/components/profile/object/InventoryGridEngine";
import { useProfilePlacementStore } from "@/components/profile/store/useProfilePlacementStore";

import styles from "@/components/profile/Scene.module.scss";
import Floor from "./common/Floor";

const InventoryLayer = () => {
  const isInventoryOpen = useProfilePlacementStore((s) => s.isInventoryOpen);
  if (!isInventoryOpen) return null;
  return (
    <>
      <InventorySceneRaycaster />
      <InventoryDragPreview />
    </>
  );
};

const Scene = () => {
  return (
    <div className={styles.container}>
      <Canvas shadows>
        <Lights />
        <fog attach={"fog"} args={["#f0eee9", 40, 55]} />
        <Suspense fallback={null}>
          <CameraManager />

          <InventoryGrid />
          <Floor />
          <ItemModels />
          {/* 2x2 cells footprint, centered at grid (3,3)~(5,5) */}
          <Player position={[GRID_CENTER[0] - 6, 0, GRID_CENTER[2] - 6]} />

          <InventoryLayer />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
