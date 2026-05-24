"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import CameraManager from "@/components/profile/common/CameraManager";
import Lights from "@/components/profile/common/Lights";
import { Background } from "@/components/profile/common/Background";

import { Player } from "@/components/profile/character/Player";
import { GRID_CENTER } from "@/components/profile/object/InventoryGridEngine";
import styles from "@/components/profile/Scene.module.scss";

const Scene = () => {
  return (
    <div className={styles.container}>
      <Canvas shadows dpr={[1, 2]}>
        <Lights />
        <Background />
        <Suspense fallback={null}>
          <CameraManager />
          {/* <Floor /> */}
          <Player position={[GRID_CENTER[0], 0, GRID_CENTER[2]]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
