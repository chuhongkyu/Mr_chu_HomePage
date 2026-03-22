"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import CameraManager from "@/components/profile/common/CameraManager";
import FloatingButtons from "@/components/profile/common/FloatingButtons";
import Lights from "@/components/profile/common/Lights";
import InventoryDragPreview from "@/components/profile/inventory/InventoryDragPreview";
import InventoryGrid from "@/components/profile/inventory/InventoryGrid";
import InventorySceneRaycaster from "@/components/profile/inventory/InventorySceneRaycaster";
import ItemModels from "@/components/profile/ItemModels";
import { useProfilePlacementStore } from "@/components/profile/store/useProfilePlacementStore";

import styles from "./Scene.module.scss";

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
        <Suspense fallback={null}>
          <CameraManager />
          <InventoryGrid />
          <ItemModels />
          <InventoryLayer />
        </Suspense>
      </Canvas>

      <FloatingButtons />
    </div>
  );
};

export default Scene;
